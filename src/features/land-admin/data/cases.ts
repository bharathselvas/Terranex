// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · District caseload
// -----------------------------------------------------------------------
// ONE generator feeds every screen. The dashboard's six KPI tiles, the case
// table, the GIS polygons, the case workspace, the analytics page and the
// compensation register are all projections of the same array — so a figure
// printed on the dashboard can never disagree with the row behind it.
//
// The generator runs in ordered passes so the dataset stays coherent:
//   1. Assign an acquisition stage from an EXACT quota. Quotas, not weights,
//      are what make the headline figures land on publishable numbers.
//   2. Derive everything downstream FROM the stage, so a completed case always
//      has paid compensation and closed R&R.
//   3. Pin the marginal counts the derivation can't control on its own
//      (verification pool, case status, R&R pending, residual balances).
//   4. Money, then households.
//
// A module-load assertion re-derives the headline figures and throws if they
// drift. Edit a quota without recalibrating and the app fails loudly instead
// of shipping two screens that disagree.
//
// SYNTHETIC DEMO DATA. Not cadastral. Not a government record.
// All names, survey numbers, areas, amounts and references are invented.
// ═══════════════════════════════════════════════════════════════════════

import type {
  AcquisitionStage,
  CaseRecord,
  CaseStatus,
  LandClassification,
  LandUse,
  Landowner,
  Priority,
  RnrStatus,
} from "../lib/types";
import { DEMO_NOW } from "../lib/types";
import { mulberry32, hashString } from "../lib/geo";
import { STAGE_SLA } from "../lib/format";
import { DISTRICT } from "./geography";

const DAY = 86400000;
const isoDay = (d: Date) => d.toISOString().slice(0, 10);
const shift = (from: Date, days: number) => new Date(from.getTime() + days * DAY);

// ── Headline figures. This is the contract the dashboard renders. ────────
export const TARGETS = {
  totalCases: 2481,
  activeCases: 1326,
  compensationPending: 287,
  rnrPending: 143,
  delayedCases: 76,
  parcelsUnderVerification: 118,
} as const;

/** Sums to TARGETS.totalCases. */
const STAGE_QUOTA: Array<[AcquisitionStage, number]> = [
  ["draft", 142],
  ["submitted", 118],
  ["under_verification", 246],
  ["land_valuation", 198],
  ["award_processing", 121],
  ["compensation_approved", 74],
  ["compensation_paid", 38],
  ["rnr_assessment", 26],
  ["rnr_approved", 14],
  ["completed", 1428],
  ["delayed", 76],
];

/** Compensation order exists, cash still owed. */
const COMP_PENDING: ReadonlySet<string> = new Set(["approved", "partially_paid", "delayed"]);
/** R&R obligation is live. */
const RNR_PENDING: ReadonlySet<string> = new Set(["pending", "assessment_completed", "approval_pending"]);

type StallReason = "payment" | "valuation" | "field" | "objection" | "rnr";

/** Sums to the delayed quota (76). `payment` also feeds compensationPending. */
const STALL_QUOTA: Array<[StallReason, number]> = [
  ["payment", 52],
  ["valuation", 11],
  ["field", 8],
  ["objection", 5],
];

/** Mid-verification cases awaiting a field report. */
const MID_VERIFICATION = 110;
/** Verified but flagged for ownership re-check. */
const DISCREPANCIES = 33;
/** Submitted cases already field-checked before the verification pass. */
const PRE_VERIFIED_SUBMITTED = 100;
/** Cases held on litigation or land-ceiling review. */
const ON_HOLD_CASES = 57;

// ── Exact reconcilers ───────────────────────────────────────────────────
// Stage derivation lands these two pools close but not exactly. Each
// reconciler nudges the smallest sensible number of cases — in a fixed,
// documented order — until the marginal count matches its published figure.
// Self-correcting: editing STAGE_QUOTA cannot silently break a headline tile.

/**
 * Land on exactly `target` cases with a live R&R obligation.
 * Promotes the nearest pre-obligation stage first; demotes the furthest
 * post-obligation stage first, so the distribution stays plausible.
 */
function reconcileRnr(drafts: Draft[], target: number): void {
  const count = () => drafts.filter((d) => RNR_PENDING.has(d.rnrStatus)).length;

  if (count() < target) {
    // Promotion ladder: compensation approved → assessment under way →
    // approval awaited. Walk it in that order so we promote the least
    // advanced candidates available.
    const ladder: Array<{ stage: AcquisitionStage; to: RnrStatus }> = [
      { stage: "compensation_approved", to: "pending" },
      { stage: "compensation_paid", to: "assessment_completed" },
      { stage: "award_processing", to: "pending" },
    ];
    for (const rung of ladder) {
      for (const i of shuffleInPlace(
        drafts.map((d, k) => k).filter((k) => drafts[k].stage === rung.stage && drafts[k].rnrStatus === "not_required"),
        0x2b2b + rung.stage.length,
      )) {
        if (count() >= target) return;
        drafts[i].rnrStatus = rung.to;
      }
    }
    return;
  }

  // Demotion ladder — reverse of the promotion order.
  const ladder: Array<{ stage: AcquisitionStage; from: RnrStatus[] }> = [
    { stage: "rnr_approved", from: ["approved"] },
    { stage: "compensation_paid", from: ["pending", "assessment_completed"] },
    { stage: "rnr_assessment", from: ["assessment_completed"] },
  ];
  for (const rung of ladder) {
    for (const i of shuffleInPlace(
      drafts
        .map((d, k) => k)
        .filter((k) => drafts[k].stage === rung.stage && rung.from.includes(drafts[k].rnrStatus)),
      0x7c1c + rung.stage.length,
    )) {
      if (count() <= target) return;
      drafts[i].rnrStatus = "not_required";
    }
  }
}

/**
 * Land on exactly `target` cases where a compensation order exists but the
 * beneficiary has not been paid in full. Promotes a residual balance onto a
 * `compensation_paid` case first; demotes an `rnr_assessment` case first.
 */
function reconcileCompensation(drafts: Draft[], target: number): void {
  const count = () => drafts.filter((d) => COMP_PENDING.has(d.compensationStatus)).length;
  if (count() < target) {
    const ladder: Array<{ stage: AcquisitionStage; to: "partially_paid" }> = [
      { stage: "compensation_paid", to: "partially_paid" },
      { stage: "rnr_approved", to: "partially_paid" },
      { stage: "rnr_assessment", to: "partially_paid" },
    ];
    for (const rung of ladder) {
      for (const i of shuffleInPlace(
        drafts
          .map((d, k) => k)
          .filter((k) => drafts[k].stage === rung.stage && drafts[k].compensationStatus === "paid"),
        0x4d4d + rung.stage.length,
      )) {
        if (count() >= target) return;
        drafts[i].compensationStatus = rung.to;
      }
    }
    return;
  }
  const ladder: AcquisitionStage[] = ["rnr_assessment", "compensation_paid", "rnr_approved"];
  for (const stage of ladder) {
    for (const i of shuffleInPlace(
      drafts.map((d, k) => k).filter((k) => drafts[k].stage === stage && drafts[k].compensationStatus === "partially_paid"),
      0x9e9e + stage.length,
    )) {
      if (count() <= target) return;
      drafts[i].compensationStatus = "paid";
    }
  }
}

// ── Villages ────────────────────────────────────────────────────────────
export interface VillageRef {
  id: string;
  name: string;
  taluk: string;
  district: string;
  surveyStem: number;
}

const VILLAGES: VillageRef[] = DISTRICT.taluks.flatMap((t) =>
  t.villages.map((name) => ({
    id: `v-${name.toLowerCase().replace(/[^a-z]/g, "")}`,
    name,
    taluk: t.name,
    district: DISTRICT.name,
    surveyStem: 100 + (hashString(name) % 260),
  })),
);

// ── Name pools (fictional) ───────────────────────────────────────────────
const MALE = [
  "Suresh", "Ramesh", "Venkataraman", "Muthukumar", "Selvam", "Ganesan",
  "Arunachalam", "Kannan", "Sivakumar", "Palani", "Thirumurugan", "Vijayaraghavan",
  "Natarajan", "Krishnan", "Subramani", "Manickam", "Chandrasekar", "Boopathy",
  "Sathishkumar", "Vadivelu",
];
const FEMALE = [
  "Lakshmi", "Saroja", "Meena", "Kamalavalli", "Rukmani", "Anitha",
  "Vijayalakshmi", "Parvatharani", "Chitra", "Nagalakshmi", "Sumathy", "Jayashree",
  "Dhanalakshmi", "Shanthi", "Vasundhara",
];
const SURNAMES = [
  "Perumal", "Subramanian", "Chandiran", "Sivakumar", "Kannappan", "Muthusamy",
  "Ramasamy", "Natarajan", "Soundararajan", "Kuppusamy", "Venkataraman", "Chinnappan",
  "Srinivasan", "Ganesan", "Manickam", "Balasubramanian", "Selvaraj", "Arjunan",
  "Krishnasamy", "Venkatesan", "Ponnusamy", "Thevar",
];
const OFFICES = [
  "District Revenue Office, Chengalpattu",
  "Sub-Collector Office, Tambaram",
  "Sub-Collector Office, Pallavaram",
  "Sub-Collector Office, Sriperumbudur",
  "Sub-Collector Office, Guduvanchery",
  "Revenue Divisional Office, Madurantakam",
  "Taluk Office, Tambaram",
  "Taluk Office, Chengalpattu",
  "District Survey Office, Chengalpattu",
  "District Planning Office, Chengalpattu",
];
const REVENUE_OFFICERS = [
  "Smt. K. Ananthi, Revenue Officer",
  "Shri. M. Venkatesan, Revenue Officer",
  "Shri. A. Duraisamy, Revenue Officer",
  "Smt. P. Subashini, Revenue Officer",
  "Shri. K. Ramachandran, Revenue Officer",
  "Smt. R. Meenakshi, Revenue Officer",
  "Shri. S. Gopalakrishnan, Revenue Officer",
  "Smt. J. Nandhini, Revenue Officer",
];
const PURPOSES = [
  "Road Infrastructure Development",
  "Water Supply Scheme",
  "Industrial Layout Development",
  "Power Transmission Corridor",
  "Canal Alignment Expansion",
  "Hospital Campus Development",
  "Railway Bypass Project",
  "Storm Water Drainage Works",
  "Public Distribution Warehouse",
  "Residential Relocation Site",
];
const AUTHORITIES = [
  "District Revenue Administration",
  "Highways Department, Chennai Region",
  "Public Works Department",
  "Tamil Nadu Water Board",
  "Electricity Board (TANGEDCO)",
  "Chennai Metropolitan Railway",
  "District Industries Centre",
];
const CLASSIFICATIONS: LandClassification[] = [
  "Dry Agricultural Land",
  "Wet Agricultural Land",
  "Dry Land (Scrub)",
  "Land with Trees",
  "Residential",
  "Commercial",
  "Government Land",
  "Tank / Water Body",
];
const OWNER_CATEGORIES: Landowner["category"][] = [
  "general", "general", "general", "general", "obc", "obc", "sc", "st", "minor",
];

const MALE_NAMES = MALE as readonly string[];
const FEMALE_NAMES = FEMALE as readonly string[];
const ALL_SURNAMES = SURNAMES as readonly string[];
const ALL_OFFICES = OFFICES as readonly string[];
const ALL_OFFICERS = REVENUE_OFFICERS as readonly string[];
const ALL_PURPOSES = PURPOSES as readonly string[];
const ALL_AUTHORITIES = AUTHORITIES as readonly string[];
const ALL_CLASSIFICATIONS = CLASSIFICATIONS as readonly LandClassification[];
const ALL_OWNER_CATS = OWNER_CATEGORIES as readonly Landowner["category"][];

function pick<T>(rnd: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rnd() * arr.length) % arr.length];
}

function shuffleInPlace<T>(arr: T[], seed: number): T[] {
  const rnd = mulberry32(seed);
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function priorityFor(rnd: () => number, stage: AcquisitionStage): Priority {
  if (stage === "delayed") return rnd() < 0.72 ? "critical" : "high";
  if (stage === "completed") return "low";
  if (stage === "draft") return rnd() < 0.1 ? "medium" : "low";
  const r = rnd();
  if (r < 0.14) return "high";
  if (r < 0.44) return "medium";
  return "low";
}

// ── Compilation state ───────────────────────────────────────────────────
/** A case mid-generation. Carries the stall reason the reconcilers act on. */
interface Draft extends CaseRecord {
  stall: StallReason | null;
}

function buildCases(): CaseRecord[] {
  // ── Pass 0: stage quota, scattered deterministically ────────────────
  const stages: AcquisitionStage[] = [];
  for (const [stage, n] of STAGE_QUOTA) for (let k = 0; k < n; k += 1) stages.push(stage);
  shuffleInPlace(stages, 0x7a11ed);

  const drafts: Draft[] = [];
  const delayedIdx: number[] = [];
  const underVerifIdx: number[] = [];
  const earlyIdx: number[] = [];
  const lateIdx: number[] = [];

  for (let i = 0; i < stages.length; i += 1) {
    const stage = stages[i];
    const village = VILLAGES[i % VILLAGES.length];
    const vr = mulberry32(hashString(`${village.id}|${i}|${stage}`));

    const ageDays =
      stage === "completed"
        ? 180 + Math.floor(vr() * 620)
        : stage === "draft"
          ? 3 + Math.floor(vr() * 40)
          : 45 + Math.floor(vr() * 520);

    const created = shift(DEMO_NOW, -ageDays);
    const stageSlaDays = STAGE_SLA[stage] || 30;

    // A delayed case must actually be past its own window.
    const daysPending =
      stage === "delayed"
        ? stageSlaDays + 5 + Math.floor(vr() * 62)
        : stage === "completed"
          ? Math.floor(vr() * 14)
          : Math.floor(vr() * (stageSlaDays + 70));

    const lastUpdated = shift(DEMO_NOW, -Math.floor(vr() * Math.min(Math.max(ageDays, 1), 55)));

    const areaHa = Math.round((0.18 + vr() * 4.6) * 100) / 100;
    const landClassification = pick(vr, ALL_CLASSIFICATIONS);
    const landUse: LandUse =
      landClassification === "Residential"
        ? "residential"
        : landClassification === "Commercial"
          ? "commercial"
          : landClassification === "Dry Land (Scrub)" || landClassification === "Tank / Water Body"
            ? "vacant"
            : vr() < 0.08
              ? "other"
              : "agricultural";

    const ownerIsFemale = vr() < 0.44;
    const owner: Landowner = {
      name: `${ownerIsFemale ? pick(vr, FEMALE_NAMES) : pick(vr, MALE_NAMES)} ${pick(vr, ALL_SURNAMES)}`,
      fatherName: `${pick(vr, MALE_NAMES)} ${pick(vr, ALL_SURNAMES)}`,
      aadhaarMasked: `XXXX XXXX ${1000 + Math.floor(vr() * 8999)}`,
      mobileMasked: `+91 9${8 + Math.floor(vr() * 2)}XXXX${1000 + Math.floor(vr() * 8999)}`,
      category: pick(vr, ALL_OWNER_CATS),
      pattaNo: `${village.surveyStem}/${100 + Math.floor(vr() * 799)}`,
    };

    const notified = stage !== "draft" && stage !== "submitted";
    const declared =
      notified &&
      ["under_verification", "land_valuation", "award_processing", "compensation_approved",
        "compensation_paid", "rnr_assessment", "rnr_approved", "completed", "delayed"].includes(stage);

    const objectionsReceived = stage === "draft" ? 0 : Math.floor(vr() * 6);

    const draft: Draft = {
      id: `case-${String(i + 1).padStart(5, "0")}`,
      caseNo: `TN-ACQ-2026-${String(4821 + i).padStart(6, "0")}`,
      parcelId: `parcel-${String(i + 1).padStart(5, "0")}`,
      surveyNo: `${village.surveyStem}/${1 + Math.floor(vr() * 9)}${vr() < 0.5 ? "A" : "B"}`,
      villageId: village.id,
      village: village.name,
      taluk: village.taluk,
      district: village.district,
      areaHa,
      landClassification,
      landUse,
      status: "active",
      stage,
      priority: priorityFor(vr, stage),
      verification: "verified",
      compensationStatus: "not_initiated",
      rnrStatus: "not_required",
      acquisition: {
        purpose: pick(vr, ALL_PURPOSES),
        authority: pick(vr, ALL_AUTHORITIES),
        governmentOrderRef:
          `G.O.Ms.No.${100 + Math.floor(vr() * 899)}/Revenue(${2018 + Math.floor(vr() * 8)}), ` +
          `dated ${String(1 + Math.floor(vr() * 27)).padStart(2, "0")}/${1 + Math.floor(vr() * 9)}/2026`,
        notificationDate: notified ? isoDay(shift(created, 9 + Math.floor(vr() * 30))) : null,
        declarationDate: declared ? isoDay(shift(created, 55 + Math.floor(vr() * 60))) : null,
        objectionsReceived,
        objectionsDisposed: 0,
      },
      responsibleOffice: pick(vr, ALL_OFFICES),
      revenueOfficer: pick(vr, ALL_OFFICERS),
      createdOn: isoDay(created),
      lastUpdated: isoDay(lastUpdated),
      daysPending,
      stageSlaDays,
      ageDays,
      owner,
      // Seeded here, overwritten by the money and household passes below.
      compensation: {
        marketValuePerAcre: 0,
        estimated: 0,
        approved: 0,
        paid: 0,
        pending: 0,
        approvedOn: null,
        paidOn: null,
        treasuryRef: null,
      },
      affectedHouseholds: 0,
      eligibleHouseholds: 0,
      stall: null,
    };

    switch (stage) {
      case "land_valuation":   draft.compensationStatus = "estimated"; break;
      case "award_processing":
      case "compensation_approved": draft.compensationStatus = "approved"; break;
      case "compensation_paid":
      case "rnr_assessment":   draft.compensationStatus = "partially_paid"; break;
      case "rnr_approved":
      case "completed":        draft.compensationStatus = "paid"; break;
      default:                 draft.compensationStatus = "not_initiated";
    }

    if (stage === "delayed") { delayedIdx.push(i); draft.compensationStatus = "not_initiated"; }
    if (stage === "under_verification") underVerifIdx.push(i);
    if (stage === "draft" || stage === "submitted") earlyIdx.push(i);
    if (stage === "completed" || stage === "compensation_paid" || stage === "rnr_approved") lateIdx.push(i);

    drafts.push(draft);
  }

  // ── Pass 1: delayed stall reasons ────────────────────────────────────
  const stallOrder = shuffleInPlace([...delayedIdx], 0x57a11);
  let cursor = 0;
  for (const [reason, count] of STALL_QUOTA) {
    for (let k = 0; k < count && cursor < stallOrder.length; k += 1) {
      const d = drafts[stallOrder[cursor]];
      d.stall = reason;
      if (reason === "payment") {
        d.compensationStatus = "delayed";
        d.rnrStatus = "pending";
      } else if (reason === "valuation") {
        d.compensationStatus = "estimated";
      } else if (reason === "field") {
        d.verification = "under_verification";
        d.compensationStatus = "not_initiated";
      } else {
        d.compensationStatus = "paid";
        d.rnrStatus = "approval_pending";
      }
      cursor += 1;
    }
  }

  // ── Pass 2: verification pool — exactly TARGETS.parcelsUnderVerification
  const midPool = shuffleInPlace(
    underVerifIdx.filter((i) => drafts[i].verification !== "under_verification"),
    0x1e0f,
  );
  for (let k = 0; k < MID_VERIFICATION; k += 1) drafts[midPool[k]].verification = "under_verification";
  for (let k = MID_VERIFICATION; k < MID_VERIFICATION + DISCREPANCIES; k += 1) {
    if (k < midPool.length) drafts[midPool[k]].verification = "discrepancy";
  }
  // Early cases: drafts are unread, most submitted cases are already checked.
  const submittedIdx = earlyIdx.filter((i) => drafts[i].stage === "submitted");
  const verifiedSubmitted = new Set(shuffleInPlace([...submittedIdx], 0x33aa).slice(0, PRE_VERIFIED_SUBMITTED));
  for (const i of earlyIdx) {
    drafts[i].verification = verifiedSubmitted.has(i) ? "verified" : "not_started";
  }

  // ── Pass 3: case status — exact active / on-hold / closed split ───────
  const closeSet = new Set(shuffleInPlace([...lateIdx], 0x0ff1).slice(0, TARGETS.totalCases - TARGETS.activeCases - ON_HOLD_CASES));
  const holdSet = new Set(shuffleInPlace([...earlyIdx], 0x0ff2).slice(0, ON_HOLD_CASES));
  drafts.forEach((d, i) => {
    const status: CaseStatus = closeSet.has(i) ? "closed" : holdSet.has(i) ? "on_hold" : "active";
    d.status = status;
  });

  // ── Pass 4: exact reconcilers ────────────────────────────────────────
  // Stage derivation gets these pools close but not exact. Rather than
  // hand-tuning a second set of magic numbers that silently rot whenever a
  // quota is edited, promote or demote deterministically until the target is
  // hit. Self-correcting means changing STAGE_QUOTA cannot break a headline tile.
  for (const d of drafts) {
    if (d.stage === "compensation_paid") d.rnrStatus = "pending";
    if (d.stage === "rnr_assessment") d.rnrStatus = "assessment_completed";
    if (d.stage === "rnr_approved") d.rnrStatus = "approved";
    if (d.stage === "completed") d.rnrStatus = "completed";
  }
  reconcileRnr(drafts, TARGETS.rnrPending);

  // ── Pass 5: compensation order vs. cash actually released ─────────────
  for (const d of drafts) {
    if (d.compensationStatus === "partially_paid" && d.stage === "compensation_paid") {
      d.compensationStatus = "paid";
    }
  }
  reconcileCompensation(drafts, TARGETS.compensationPending);

  // ── Pass 6: money ────────────────────────────────────────────────────
  for (const d of drafts) {
    const dr = mulberry32(hashString(`money|${d.id}`));
    const built = d.landClassification === "Commercial" || d.landClassification === "Residential";
    const rate = built
      ? 2_400_000 + Math.floor(dr() * 3_600_000)
      : 1_450_000 + Math.floor(dr() * 1_150_000);
    const acres = d.areaHa * 2.4711;
    const estimated = Math.round(((acres * rate) / 5000) * 1) * 5000;
    const hasOrder = d.compensationStatus !== "not_initiated" && d.compensationStatus !== "estimated";
    const approved = hasOrder ? Math.round((estimated * (0.88 + dr() * 0.06)) / 5000) * 5000 : 0;
    const paid =
      d.compensationStatus === "paid"
        ? approved
        : d.compensationStatus === "partially_paid"
          ? Math.round((approved * (0.35 + dr() * 0.4)) / 5000) * 5000
          : 0;
    d.compensation = {
      marketValuePerAcre: rate,
      estimated,
      approved,
      paid,
      pending: Math.max(0, approved - paid),
      approvedOn: approved > 0 ? isoDay(shift(new Date(d.lastUpdated), -Math.floor(dr() * 40))) : null,
      paidOn: paid >= approved && approved > 0 ? isoDay(shift(new Date(d.lastUpdated), -Math.floor(dr() * 25))) : null,
      treasuryRef: paid > 0 ? `TR/2026/${400000 + Math.floor(dr() * 99999)}` : null,
    };
  }

  // ── Pass 7: households ───────────────────────────────────────────────
  for (const d of drafts) {
    const dr = mulberry32(hashString(`hh|${d.id}`));
    const affected =
      d.landUse === "agricultural"
        ? Math.max(1, Math.round(d.areaHa * (0.6 + dr() * 1.5)))
        : Math.max(0, Math.round(d.areaHa * (0.3 + dr() * 0.8)));
    d.affectedHouseholds = affected;
    d.eligibleHouseholds =
      d.rnrStatus === "not_required" ? 0 : Math.min(affected, Math.max(1, Math.round(affected * (0.7 + dr() * 0.3))));
  }

  // ── Pass 8: objection disposal follows the stage ─────────────────────
  for (const d of drafts) {
    if (d.acquisition.objectionsReceived > 0 && d.stage !== "draft") {
      d.acquisition.objectionsDisposed = Math.min(
        d.acquisition.objectionsReceived,
        Math.floor(d.acquisition.objectionsReceived * 0.8),
      );
    }
  }

  return drafts;
}

export const CASES: CaseRecord[] = buildCases();

// ── The hero case, hand-authored and pinned into a real slot ────────────
// It overwrites one delayed-at-payment case, so every quota above is
// untouched while the numbers a judge will read off this case are exact.
export const HERO_CASE_NO = "TN-ACQ-2026-004821";

const HERO: CaseRecord = {
  id: "case-004821",
  caseNo: HERO_CASE_NO,
  parcelId: "parcel-004821",
  surveyNo: "184/2A",
  villageId: "v-perungalathur",
  village: "Perungalathur",
  taluk: "Tambaram",
  district: "Chengalpattu",
  areaHa: 1.84,
  landClassification: "Dry Agricultural Land",
  landUse: "agricultural",
  status: "active",
  stage: "delayed",
  priority: "high",
  verification: "verified",
  compensationStatus: "delayed",
  rnrStatus: "approval_pending",
  acquisition: {
    purpose: "Road Infrastructure Development",
    authority: "District Revenue Administration",
    governmentOrderRef: "G.O.Ms.No.642/Revenue(2019), dated 06/01/2026",
    notificationDate: "2026-01-21",
    declarationDate: "2026-02-18",
    objectionsReceived: 2,
    objectionsDisposed: 2,
  },
  compensation: {
    marketValuePerAcre: 2_180_000,
    estimated: 3_840_000,
    approved: 3_675_000,
    paid: 0,
    pending: 3_675_000,
    approvedOn: "2026-03-04",
    paidOn: null,
    treasuryRef: null,
  },
  affectedHouseholds: 4,
  eligibleHouseholds: 4,
  responsibleOffice: "Sub-Collector Office, Tambaram",
  revenueOfficer: "Smt. K. Ananthi, Revenue Officer",
  createdOn: "2026-01-12",
  lastUpdated: "2026-03-29",
  daysPending: 94,
  stageSlaDays: 60,
  ageDays: 261,
  owner: {
    name: "R. Subramanian",
    fatherName: "Ramasamy",
    aadhaarMasked: "XXXX XXXX 4417",
    mobileMasked: "+91 98XXXX2231",
    category: "general",
    pattaNo: "184/119",
  },
};

(function installHero() {
  const idx = CASES.findIndex((c) => c.stage === "delayed" && c.compensationStatus === "delayed");
  if (idx >= 0) CASES[idx] = HERO;
  else CASES.push(HERO);
})();

export const HERO_CASE: CaseRecord = HERO;

// ── Self-check: fail loudly rather than ship two disagreeing screens ─────
(function assertHeadlines() {
  const got = {
    totalCases: CASES.length,
    activeCases: CASES.filter((c) => c.status === "active").length,
    compensationPending: CASES.filter((c) => COMP_PENDING.has(c.compensationStatus)).length,
    rnrPending: CASES.filter((c) => RNR_PENDING.has(c.rnrStatus)).length,
    delayedCases: CASES.filter((c) => c.stage === "delayed").length,
    parcelsUnderVerification: CASES.filter((c) => c.verification === "under_verification").length,
  };
  const drift = (Object.keys(TARGETS) as Array<keyof typeof TARGETS>)
    .filter((k) => got[k] !== TARGETS[k])
    .map((k) => `${k}: got ${got[k]}, expected ${TARGETS[k]}`);

  if (drift.length > 0) {
    throw new Error(
      `[Terranex] Dataset calibration drift — ${drift.join("; ")}. ` +
        `Re-run the quota passes in data/cases.ts before shipping.`,
    );
  }
})();

// ── Lookups ─────────────────────────────────────────────────────────────
export const CASES_BY_ID = new Map(CASES.map((c) => [c.id, c]));
export const CASES_BY_NO = new Map(CASES.map((c) => [c.caseNo, c]));
export { VILLAGES };

export function findCaseById(id: string | undefined): CaseRecord | undefined {
  if (!id) return undefined;
  return CASES_BY_ID.get(id) ?? CASES_BY_NO.get(id);
}

export function casesForVillage(villageId: string): CaseRecord[] {
  return CASES.filter((c) => c.villageId === villageId);
}

/** One-line issue for the dashboard's priority table. */
export function delayIssue(c: CaseRecord): string {
  if (c.stage !== "delayed") {
    return c.rnrStatus === "approval_pending" || c.rnrStatus === "pending"
      ? "R&R approval pending"
      : c.compensationStatus === "paid"
        ? "Possession handover"
        : "Processing on schedule";
  }
  switch (c.compensationStatus) {
    case "delayed":
      return "Compensation pending";
    case "estimated":
      return "Valuation report awaited";
    case "not_initiated":
      return c.verification === "under_verification" ? "Field verification pending" : "Award proclamation pending";
    default:
      return "Payment not released";
  }
}

export { COMP_PENDING, RNR_PENDING };

