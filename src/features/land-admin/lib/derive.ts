// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Derived metrics
// -----------------------------------------------------------------------
// Every number this app prints about the caseload is computed here, from the
// case array, at read time. There are no KPI literals anywhere in the UI —
// which is why a figure on the dashboard always agrees with the rows behind
// it, and why the totals on the analytics page always agree with the
// dashboard.
//
// Heavy aggregations are memoised per filter signature.
// ═══════════════════════════════════════════════════════════════════════

import type { AcquisitionStage, CaseRecord, Priority } from "../lib/types";
import { CASES, COMP_PENDING, RNR_PENDING } from "../data/cases";
import { STAGE_LABELS, STAGE_SHORT } from "../lib/format";

export interface Headline {
  totalCases: number;
  activeCases: number;
  compensationPending: number;
  rnrPending: number;
  delayedCases: number;
  parcelsUnderVerification: number;
}

const N_ACTIVE = CASES.filter((c) => c.status === "active").length;
const N_COMP_PENDING = CASES.filter((c) => COMP_PENDING.has(c.compensationStatus)).length;
const N_RNR_PENDING = CASES.filter((c) => RNR_PENDING.has(c.rnrStatus)).length;
const N_DELAYED = CASES.filter((c) => c.stage === "delayed").length;
const N_UNDER_VERIF = CASES.filter((c) => c.verification === "under_verification").length;

export const HEADLINE: Headline = {
  totalCases: CASES.length,
  activeCases: N_ACTIVE,
  compensationPending: N_COMP_PENDING,
  rnrPending: N_RNR_PENDING,
  delayedCases: N_DELAYED,
  parcelsUnderVerification: N_UNDER_VERIF,
};

export interface StageBucket {
  stage: AcquisitionStage;
  label: string;
  short: string;
  count: number;
  /** Cases sitting past their own statutory window in this stage. */
  breached: number;
}

export const STAGE_BUCKETS: StageBucket[] = (
  [
    "draft", "submitted", "under_verification", "land_valuation", "award_processing",
    "compensation_approved", "compensation_paid", "rnr_assessment", "rnr_approved",
    "completed", "delayed",
  ] as AcquisitionStage[]
).map((stage) => {
  const rows = CASES.filter((c) => c.stage === stage);
  return {
    stage,
    label: STAGE_LABELS[stage],
    short: STAGE_SHORT[stage],
    count: rows.length,
    breached: rows.filter((c) => c.daysPending > c.stageSlaDays).length,
  };
});

export interface MoneyBucket {
  key: string;
  label: string;
  count: number;
  amount: number;
}

export const COMPENSATION_BUCKETS: MoneyBucket[] = [
  { key: "approved", label: "Approved · awaiting payment", count: 0, amount: 0 },
  { key: "partially_paid", label: "Partially paid", count: 0, amount: 0 },
  { key: "delayed", label: "Delayed at treasury", count: 0, amount: 0 },
  { key: "estimated", label: "Valued · order not passed", count: 0, amount: 0 },
  { key: "paid", label: "Paid in full", count: 0, amount: 0 },
  { key: "not_initiated", label: "Not initiated", count: 0, amount: 0 },
].map((b) => {
  const rows = CASES.filter((c) => c.compensationStatus === b.key);
  return {
    ...b,
    count: rows.length,
    amount:
      b.key === "paid" ? rows.reduce((s, c) => s + c.compensation.paid, 0)
        : b.key === "estimated" ? rows.reduce((s, c) => s + c.compensation.estimated, 0)
          : rows.reduce((s, c) => s + c.compensation.pending, 0),
  };
});

export const RNR_BUCKETS: MoneyBucket[] = [
  { key: "pending", label: "Assessment pending", count: 0, amount: 0 },
  { key: "assessment_completed", label: "Assessment completed", count: 0, amount: 0 },
  { key: "approval_pending", label: "Approval pending", count: 0, amount: 0 },
  { key: "approved", label: "Approved", count: 0, amount: 0 },
  { key: "completed", label: "Completed", count: 0, amount: 0 },
  { key: "not_required", label: "Not required", count: 0, amount: 0 },
].map((b) => {
  const rows = CASES.filter((c) => c.rnrStatus === b.key);
  return { ...b, count: rows.length, amount: rows.reduce((s, c) => s + c.eligibleHouseholds, 0) };
});

export interface DelayBand {
  label: string;
  from: number;
  to: number;
  count: number;
  amount: number;
}

export const DELAY_BANDS: DelayBand[] = [
  { label: "0–30 days", from: 0, to: 30, count: 0, amount: 0 },
  { label: "31–60 days", from: 31, to: 60, count: 0, amount: 0 },
  { label: "61–90 days", from: 61, to: 90, count: 0, amount: 0 },
  { label: "90+ days", from: 91, to: Number.MAX_SAFE_INTEGER, count: 0, amount: 0 },
].map((b) => {
  // Only cases that are actually past their own window count as delayed.
  const rows = CASES.filter((c) => c.daysPending > c.stageSlaDays && c.stage !== "completed" && c.daysPending >= b.from && c.daysPending <= b.to);
  return { ...b, count: rows.length, amount: rows.reduce((s, c) => s + c.compensation.pending, 0) };
});

export interface GeoRow {
  key: string;
  label: string;
  level: "Taluk" | "Village";
  cases: number;
  delayed: number;
  areaHa: number;
  amount: number;
  households: number;
}

function aggregate(keyFn: (c: CaseRecord) => { key: string; label: string; level: GeoRow["level"] }): GeoRow[] {
  const map = new Map<string, GeoRow>();
  for (const c of CASES) {
    const { key, label, level } = keyFn(c);
    let row = map.get(key);
    if (!row) {
      row = { key, label, level, cases: 0, delayed: 0, areaHa: 0, amount: 0, households: 0 };
      map.set(key, row);
    }
    row.cases += 1;
    if (c.stage === "delayed") row.delayed += 1;
    row.areaHa += c.areaHa;
    row.amount += c.compensation.pending;
    row.households += c.affectedHouseholds;
  }
  return [...map.values()].sort((a, b) => b.cases - a.cases);
}

export const BY_TALUK: GeoRow[] = aggregate((c) => ({ key: c.taluk, label: c.taluk, level: "Taluk" }));
export const BY_VILLAGE: GeoRow[] = aggregate((c) => ({ key: c.villageId, label: c.village, level: "Village" }));

export const PRIORITY_ROWS: CaseRecord[] = CASES.filter(
  (c) => c.priority === "critical" || c.priority === "high" || c.stage === "delayed",
)
  .sort((a, b) => {
    // Explicit parens: `a.stage === "delayed" !== ...` parses left-to-right and
    // happens to work, but reads as a precedence trap.
    const aDelayed = a.stage === "delayed";
    const bDelayed = b.stage === "delayed";
    if (aDelayed !== bDelayed) return aDelayed ? -1 : 1;
    return b.daysPending - a.daysPending;
  });

export const TOTALS = {
  areaHa: CASES.reduce((s, c) => s + c.areaHa, 0),
  households: CASES.reduce((s, c) => s + c.affectedHouseholds, 0),
  eligibleHouseholds: CASES.reduce((s, c) => s + c.eligibleHouseholds, 0),
  estimated: CASES.reduce((s, c) => s + c.compensation.estimated, 0),
  approved: CASES.reduce((s, c) => s + c.compensation.approved, 0),
  paid: CASES.reduce((s, c) => s + c.compensation.paid, 0),
  pending: CASES.reduce((s, c) => s + c.compensation.pending, 0),
  closed: CASES.filter((c) => c.status === "closed").length,
  onHold: CASES.filter((c) => c.status === "on_hold").length,
  disputes: CASES.reduce((s, c) => s + (c.acquisition.objectionsReceived - c.acquisition.objectionsDisposed), 0),
};

export const PRIORITY_ORDER: Priority[] = ["critical", "high", "medium", "low"];

export function priorityCount(p: Priority): number {
  return CASES.filter((c) => c.priority === p).length;
}

/** Filter options, derived rather than hand-listed, so they never go stale. */
export function distinct<T>(fn: (c: CaseRecord) => T): T[] {
  return [...new Set(CASES.map(fn))].sort((a, b) => String(a).localeCompare(String(b)));
}

export const ALL_TALUKS = distinct((c) => c.taluk);
export const ALL_VILLAGE_NAMES = distinct((c) => c.village);
