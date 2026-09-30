// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Case records
// -----------------------------------------------------------------------
// Documents, timeline events and affected households. All three are derived
// ON DEMAND from the case record, so opening any of the 2,481 cases produces
// a plausible, internally consistent file rather than a generic placeholder.
//
// Nothing is stored: memoised per case id, so a case you open twice shows
// the same dates, the same actor and the same rejection reason.
//
// SYNTHETIC DEMO DATA. Not a government record.
// ═══════════════════════════════════════════════════════════════════════

import type { CaseDocument, CaseRecord, Household, TimelineEvent } from "../lib/types";
import { mulberry32, hashString } from "../lib/geo";

const DAY = 86400000;
const shift = (from: Date, d: number) => new Date(from.getTime() + d * DAY);
const isoDay = (d: Date) => d.toISOString().slice(0, 10);

const FIELD_TEAMS = [
  "Shri. M. Venkatesan, Revenue Officer",
  "Smt. P. Subashini, Revenue Officer",
  "Shri. A. Duraisamy, Revenue Officer",
  "Smt. R. Meenakshi, Revenue Officer",
  "District Survey Office, Chengalpattu",
];
const ASSESSORS = [
  "Shri. K. Ramachandran, Sub-Registrar",
  "Smt. J. Nandhini, Valuation Committee",
  "District Valuation Committee",
];
const CLERKS = [
  "Shri. S. Gopalakrishnan, Revenue Officer",
  "Smt. K. Ananthi, Revenue Officer",
  "Taluk Office, Tambaram",
];
const STATE_OFFICES = [
  "R&R Commissionerate, Chennai",
  "State Rehabilitation Directorate",
  "Board of Revenue, Tamil Nadu",
];

// ── Documents ───────────────────────────────────────────────────────────
interface DocSpec {
  name: string;
  type: CaseDocument["type"];
  /** Earliest stage at which this document can exist. */
  from: Array<CaseRecord["stage"]>;
  /** How often it lands in each verification state. */
  weight: { verified: number; pending: number; rejected: number };
}

/** Every stage except `draft` — the bundle a requisition must carry. */
const ALL_NON_DRAFT: Array<CaseRecord["stage"]> = [
  "submitted", "under_verification", "land_valuation", "award_processing",
  "compensation_approved", "compensation_paid", "rnr_assessment", "rnr_approved",
  "completed", "delayed",
];

const DOC_SPECS: DocSpec[] = [
  { name: "Land Ownership Record", type: "Land Ownership Record", from: ALL_NON_DRAFT, weight: { verified: 8, pending: 2, rejected: 1 } },
  { name: "Survey Sketch", type: "Survey Sketch", from: ALL_NON_DRAFT, weight: { verified: 6, pending: 4, rejected: 1 } },
  { name: "Notification (s.11(1))", type: "Notification", from: ["under_verification", "land_valuation", "award_processing", "compensation_approved", "compensation_paid", "rnr_assessment", "rnr_approved", "completed", "delayed"], weight: { verified: 9, pending: 1, rejected: 0 } },
  { name: "Land Valuation Report", type: "Land Valuation Report", from: ["land_valuation", "award_processing", "compensation_approved", "compensation_paid", "rnr_assessment", "rnr_approved", "completed", "delayed"], weight: { verified: 5, pending: 4, rejected: 1 } },
  { name: "Award Proceedings", type: "Award Proceedings", from: ["award_processing", "compensation_approved", "compensation_paid", "rnr_assessment", "rnr_approved", "completed", "delayed"], weight: { verified: 6, pending: 3, rejected: 1 } },
  { name: "Compensation Order", type: "Compensation Order", from: ["compensation_approved", "compensation_paid", "rnr_assessment", "rnr_approved", "completed", "delayed"], weight: { verified: 7, pending: 3, rejected: 0 } },
  { name: "R&R Assessment", type: "R&R Assessment", from: ["rnr_assessment", "rnr_approved", "completed", "delayed"], weight: { verified: 4, pending: 5, rejected: 1 } },
  { name: "Identity Verification", type: "Identity Verification", from: ["under_verification", "land_valuation", "award_processing", "compensation_approved", "compensation_paid", "rnr_assessment", "rnr_approved", "completed", "delayed"], weight: { verified: 7, pending: 3, rejected: 1 } },
  { name: "Bank Details Verification", type: "Bank Details", from: ["compensation_approved", "compensation_paid", "rnr_assessment", "rnr_approved", "completed", "delayed"], weight: { verified: 6, pending: 3, rejected: 1 } },
  { name: "Objection Disposal Report", type: "Supporting Document", from: ["award_processing", "compensation_approved", "compensation_paid", "rnr_assessment", "rnr_approved", "completed", "delayed"], weight: { verified: 7, pending: 2, rejected: 1 } },
];

const REJECTION_REASONS = [
  "Illegible scan — patta number not readable.",
  "Signature block incomplete.",
  "Survey sketch does not match the notified extent.",
  "Bank account number failed validation at the treasury.",
  "Aadhaar mask insufficient for record matching.",
];

const docCache = new Map<string, CaseDocument[]>();

export function documentsForCase(c: CaseRecord): CaseDocument[] {
  const hit = docCache.get(c.id);
  if (hit) return hit;

  const rnd = mulberry32(hashString(`docs|${c.id}`));
  const created = new Date(c.createdOn);
  const eligible = DOC_SPECS.filter((s) => s.from.includes(c.stage));

  const out: CaseDocument[] = eligible.map((spec, i) => {
    const roll = rnd() * 10;
    const status: CaseDocument["status"] =
      roll < spec.weight.verified ? "verified" : roll < spec.weight.verified + spec.weight.pending ? "pending_verification" : "rejected";

    // Land between case creation and its last update. Using `ageDays` here
    // would date documents AFTER the case was last touched — the bundle would
    // appear to post-date the whole proceeding.
    const lastTouched = new Date(c.lastUpdated);
    const lifetime = Math.max(4, Math.floor((lastTouched.getTime() - created.getTime()) / DAY));
    const uploaded = shift(created, 1 + Math.floor(rnd() * Math.max(1, lifetime - 1)));
    const uploader = spec.type === "Land Valuation Report" || spec.type === "Award Proceedings" ? pick(rnd, ASSESSORS) : pick(rnd, CLERKS);

    return {
      id: `${c.id}-doc-${i + 1}`,
      caseId: c.id,
      name: spec.name,
      type: spec.type,
      uploadedOn: isoDay(uploaded),
      uploadedBy: uploader,
      fileSizeKb: 40 + Math.floor(rnd() * 3600),
      status,
      rejectionReason: status === "rejected" ? pick(rnd, REJECTION_REASONS) : undefined,
    };
  });

  docCache.set(c.id, out);
  return out;
}

function pick<T>(rnd: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rnd() * arr.length) % arr.length];
}

// ── Timeline ────────────────────────────────────────────────────────────
interface StageEvent {
  title: string;
  detail: string;
  actor: readonly string[];
  /** Fraction of the case's lifetime at which this lands. */
  at: number;
  /** Statutory window, used to decide whether this step overran. */
  windowDays: number;
}

const STAGE_EVENTS: Record<CaseRecord["stage"], StageEvent[]> = {
  draft: [
    { title: "Case created", detail: "Land requirement intimation received from the requiring authority.", actor: CLERKS, at: 0, windowDays: 15 },
    { title: "Draft case opened", detail: "Case number allotted and indexed in the district register.", actor: CLERKS, at: 0.25, windowDays: 15 },
  ],
  submitted: [
    { title: "Case created", detail: "Land requirement intimation received from the requiring authority.", actor: CLERKS, at: 0, windowDays: 15 },
    { title: "Submitted to Sub-Collector", detail: "Requisition bundle forwarded for jurisdiction check.", actor: CLERKS, at: 0.3, windowDays: 10 },
  ],
  under_verification: [
    { title: "Case created", detail: "Land requirement intimation received from the requiring authority.", actor: CLERKS, at: 0, windowDays: 15 },
    { title: "Notification (s.11(1)) issued", detail: "Individual notice served on the recorded landholder.", actor: CLERKS, at: 0.22, windowDays: 14 },
    { title: "Field verification ordered", detail: "Survey team assigned for boundary and land-use check.", actor: FIELD_TEAMS, at: 0.45, windowDays: 30 },
    { title: "Field verification report awaited", detail: "GPS-tagged report not yet uploaded by the field team.", actor: FIELD_TEAMS, at: 0.8, windowDays: 30 },
  ],
  land_valuation: [
    { title: "Case created", detail: "Land requirement intimation received from the requiring authority.", actor: CLERKS, at: 0, windowDays: 15 },
    { title: "Land verification completed", detail: "Extent and land classification confirmed against the patta register.", actor: FIELD_TEAMS, at: 0.25, windowDays: 30 },
    { title: "Declaration (s.19) published", detail: "Declaration published in the district gazette and on the notice board.", actor: CLERKS, at: 0.5, windowDays: 30 },
    { title: "Land valuation report awaited", detail: "Sub-Registrar's valuation is with the committee.", actor: ASSESSORS, at: 0.82, windowDays: 45 },
  ],
  award_processing: [
    { title: "Case created", detail: "Land requirement intimation received from the requiring authority.", actor: CLERKS, at: 0, windowDays: 15 },
    { title: "Land verification completed", detail: "Extent and land classification confirmed against the patta register.", actor: FIELD_TEAMS, at: 0.2, windowDays: 30 },
    { title: "Declaration (s.19) published", detail: "Declaration published in the district gazette and on the notice board.", actor: CLERKS, at: 0.4, windowDays: 30 },
    { title: "Valuation submitted", detail: "Market value circulated and approved by the valuation committee.", actor: ASSESSORS, at: 0.6, windowDays: 45 },
    { title: "Award prepared", detail: "Draft award circulated for hearing.", actor: ASSESSORS, at: 0.85, windowDays: 60 },
  ],
  compensation_approved: [
    { title: "Case created", detail: "Land requirement intimation received from the requiring authority.", actor: CLERKS, at: 0, windowDays: 15 },
    { title: "Land verification completed", detail: "Extent and land classification confirmed against the patta register.", actor: FIELD_TEAMS, at: 0.18, windowDays: 30 },
    { title: "Declaration (s.19) published", detail: "Declaration published in the district gazette and on the notice board.", actor: CLERKS, at: 0.35, windowDays: 30 },
    { title: "Valuation submitted", detail: "Market value circulated and approved by the valuation committee.", actor: ASSESSORS, at: 0.55, windowDays: 45 },
    { title: "Award proclaimed", detail: "Award hearing concluded and award issued.", actor: ASSESSORS, at: 0.75, windowDays: 60 },
    { title: "Compensation approved", detail: "Compensation order sanctioned for disbursement.", actor: ASSESSORS, at: 0.92, windowDays: 30 },
  ],
  compensation_paid: [
    { title: "Case created", detail: "Land requirement intimation received from the requiring authority.", actor: CLERKS, at: 0, windowDays: 15 },
    { title: "Valuation submitted", detail: "Market value circulated and approved by the valuation committee.", actor: ASSESSORS, at: 0.4, windowDays: 45 },
    { title: "Award proclaimed", detail: "Award hearing concluded and award issued.", actor: ASSESSORS, at: 0.6, windowDays: 60 },
    { title: "Compensation approved", detail: "Compensation order sanctioned for disbursement.", actor: ASSESSORS, at: 0.78, windowDays: 30 },
    { title: "Treasury reference allotted", detail: "Payment instruction raised against the sanctioned order.", actor: CLERKS, at: 0.93, windowDays: 60 },
  ],
  rnr_assessment: [
    { title: "Case created", detail: "Land requirement intimation received from the requiring authority.", actor: CLERKS, at: 0, windowDays: 15 },
    { title: "Award proclaimed", detail: "Award hearing concluded and award issued.", actor: ASSESSORS, at: 0.45, windowDays: 60 },
    { title: "Compensation approved", detail: "Compensation order sanctioned for disbursement.", actor: ASSESSORS, at: 0.65, windowDays: 30 },
    { title: "R&R assessment under way", detail: "Household-wise eligibility and entitlement being compiled.", actor: STATE_OFFICES, at: 0.88, windowDays: 90 },
  ],
  rnr_approved: [
    { title: "Case created", detail: "Land requirement intimation received from the requiring authority.", actor: CLERKS, at: 0, windowDays: 15 },
    { title: "Compensation approved", detail: "Compensation order sanctioned for disbursement.", actor: ASSESSORS, at: 0.5, windowDays: 30 },
    { title: "R&R assessment completed", detail: "Beneficiary list finalised at taluk level.", actor: STATE_OFFICES, at: 0.75, windowDays: 90 },
    { title: "R&R plan sent for State approval", detail: "Plan forwarded to the Commissionerate for sanction.", actor: STATE_OFFICES, at: 0.94, windowDays: 60 },
  ],
  completed: [
    { title: "Case created", detail: "Land requirement intimation received from the requiring authority.", actor: CLERKS, at: 0, windowDays: 15 },
    { title: "Award proclaimed", detail: "Award hearing concluded and award issued.", actor: ASSESSORS, at: 0.35, windowDays: 60 },
    { title: "Compensation approved", detail: "Compensation order sanctioned for disbursement.", actor: ASSESSORS, at: 0.55, windowDays: 30 },
    { title: "R&R plan sanctioned", detail: "Commissionerate approved the rehabilitation and resettlement plan.", actor: STATE_OFFICES, at: 0.75, windowDays: 90 },
    { title: "Possession handed over", detail: "Possession certificate issued and site handed to the authority.", actor: CLERKS, at: 0.95, windowDays: 14 },
  ],
  delayed: [
    { title: "Case created", detail: "Land requirement intimation received from the requiring authority.", actor: CLERKS, at: 0, windowDays: 15 },
    { title: "Land verification completed", detail: "Extent and land classification confirmed against the patta register.", actor: FIELD_TEAMS, at: 0.2, windowDays: 30 },
    { title: "Valuation submitted", detail: "Market value circulated and approved by the valuation committee.", actor: ASSESSORS, at: 0.42, windowDays: 45 },
    { title: "Award proclaimed", detail: "Award hearing concluded and award issued.", actor: ASSESSORS, at: 0.6, windowDays: 60 },
    { title: "Compensation approved", detail: "Compensation order sanctioned for disbursement.", actor: ASSESSORS, at: 0.78, windowDays: 30 },
    { title: "Delay — awaiting treasury action", detail: "Payment instruction raised but not cleared at the district treasury.", actor: CLERKS, at: 0.95, windowDays: 30 },
  ],
};

/** The hero walkthrough's timeline, written out exactly as briefed. */
/** Which office performs each step of the hero case's timeline. */
const HERO_ACTORS: string[] = [
  CLERKS[0],        // case created
  FIELD_TEAMS[0],   // land verification
  ASSESSORS[0],     // valuation submitted
  ASSESSORS[1],     // award prepared
  ASSESSORS[0],     // compensation approved
  CLERKS[0],        // payment pending
  STATE_OFFICES[0], // R&R assessment
];

const HERO_TIMELINE: Array<[string, string, string]> = [
  ["2026-01-12", "Case created", "Land requirement received for the Western Connector alignment."],
  ["2026-01-21", "Land verification completed", "Extent 1.84 ha confirmed against patta register 184/119."],
  ["2026-02-03", "Valuation submitted", "Market value ₹21,80,000 per standard acre approved by the committee."],
  ["2026-02-18", "Award prepared", "Draft award circulated for hearing; 2 objections received."],
  ["2026-03-04", "Compensation approved", "Compensation order sanctioned at ₹36,75,000."],
  ["2026-03-18", "Payment pending", "Payment instruction raised; not cleared at the district treasury."],
  ["2026-03-29", "R&R assessment completed", "4 of 4 affected households assessed and found eligible."],
];

const timelineCache = new Map<string, TimelineEvent[]>();

export function timelineForCase(c: CaseRecord): TimelineEvent[] {
  const hit = timelineCache.get(c.id);
  if (hit) return hit;

  const rnd = mulberry32(hashString(`tl|${c.id}`));
  const created = new Date(c.createdOn);

  let events: TimelineEvent[];
  if (c.caseNo === "TN-ACQ-2026-004821") {
    events = HERO_TIMELINE.map(([date, title, detail], i) => ({
      id: `${c.id}-tl-${i + 1}`,
      caseId: c.id,
      date,
      title,
      detail,
      actor: HERO_ACTORS[i] ?? CLERKS[0],
      office: c.responsibleOffice,
      state: i < HERO_TIMELINE.length - 1 ? ("completed" as const) : ("current" as const),
      isDelay: i === 5,
      delayDays: i === 5 ? 94 : undefined,
    }));
  } else {
    const specs = STAGE_EVENTS[c.stage];
    events = specs.map((spec, i) => {
      const date = shift(created, Math.round(c.ageDays * spec.at));
      // A step that sat past its own window is what makes the case delayed.
      const overran = c.stage === "delayed" ? spec.at > 0.7 : rnd() < 0.22;
      return {
        id: `${c.id}-tl-${i + 1}`,
        caseId: c.id,
        date: isoDay(date),
        title: spec.title,
        detail: spec.detail,
        actor: pick(rnd, spec.actor),
        office: c.responsibleOffice,
        state: i < specs.length - 1 ? ("completed" as const) : ("current" as const),
        isDelay: overran,
        delayDays: overran ? 5 + Math.floor(rnd() * 80) : undefined,
      };
    });
  }

  timelineCache.set(c.id, events);
  return events;
}

// ── Households ──────────────────────────────────────────────────────────
const HH_CATEGORIES: Array<{ key: Household["category"]; label: string }> = [
  { key: "small_farmer", label: "Small Farmer" },
  { key: "marginal_farmer", label: "Marginal Farmer" },
  { key: "landless_labour", label: "Landless Labour" },
  { key: "artisan", label: "Artisan" },
  { key: "tenant", label: "Tenant" },
];
export const HOUSEHOLD_CATEGORY_LABEL: Record<Household["category"], string> = Object.fromEntries(
  HH_CATEGORIES.map((h) => [h.key, h.label]),
) as Record<Household["category"], string>;

const RESEATLEMENT_OPTIONS = [
  "Alternate land allotment",
  "House-site plot",
  "Compensation in lieu of land",
  "Voucher for employment",
  "Land-for-land (within the project)",
  "Non-monetary resettlement package",
];

const MALE = ["Suresh", "Ramesh", "Venkataraman", "Muthukumar", "Selvam", "Ganesan", "Kannan", "Sivakumar", "Natarajan", "Krishnan", "Subramani", "Manickam", "Chandrasekar", "Boopathy"];
const FEMALE = ["Lakshmi", "Saroja", "Meena", "Kamalavalli", "Rukmani", "Anitha", "Vijayalakshmi", "Parvatharani", "Chitra", "Nagalakshmi", "Sumathy", "Jayashree", "Dhanalakshmi", "Shanthi"];
const SURNAMES = ["Perumal", "Subramanian", "Chandiran", "Sivakumar", "Kannappan", "Muthusamy", "Ramasamy", "Natarajan", "Soundararajan", "Kuppusamy", "Venkataraman", "Chinnappan", "Srinivasan", "Ganesan", "Manickam", "Balasubramanian", "Selvaraj", "Arjunan", "Krishnasamy", "Venkatesan"];

const hhCache = new Map<string, Household[]>();

export function householdsForCase(c: CaseRecord): Household[] {
  const hit = hhCache.get(c.id);
  if (hit) return hit;

  const rnd = mulberry32(hashString(`households|${c.id}`));
  const total = c.affectedHouseholds;
  const out: Household[] = [];
  // Eligible households are always a prefix of the affected list, so the two
  // numbers on the case header can never contradict the table beneath them.
  const eligibleCount = Math.min(total, c.eligibleHouseholds);

  for (let i = 0; i < total; i += 1) {
    const eligible = i < eligibleCount;
    const cat = HH_CATEGORIES[Math.floor(rnd() * HH_CATEGORIES.length)].key;
    const female = rnd() < 0.32;
    out.push({
      id: `${c.id}-hh-${i + 1}`,
      caseId: c.id,
      parcelId: c.parcelId,
      surveyNo: c.surveyNo,
      village: c.village,
      headOfHousehold: `${female ? pick(rnd, FEMALE) : pick(rnd, MALE)} ${pick(rnd, SURNAMES)}`,
      category: cat,
      familySize: 1 + Math.floor(rnd() * 6),
      monthlyIncome: 6_000 + Math.floor(rnd() * 26_000),
      eligible,
      resettlementOption: eligible && c.rnrStatus !== "not_required" ? pick(rnd, RESEATLEMENT_OPTIONS) : null,
    });
  }

  hhCache.set(c.id, out);
  return out;
}

export { RESEATLEMENT_OPTIONS };
