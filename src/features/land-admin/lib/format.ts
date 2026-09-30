// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Formatting
// Indian number grouping and the date shapes a revenue officer actually reads.
// ═══════════════════════════════════════════════════════════════════════

const GROUPED = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const GROUPED2 = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

/** ₹36,75,000 — full Indian grouping, no abbreviations. */
export function inr(amount: number): string {
  return `₹${GROUPED.format(Math.round(amount))}`;
}

/** ₹36.75 L / ₹1.24 Cr — for KPI tiles where width is scarce. */
export function inrCompact(amount: number): string {
  if (amount >= 1e7) return `₹${(amount / 1e7).toFixed(2)} Cr`;
  if (amount >= 1e5) return `₹${(amount / 1e5).toFixed(2)} L`;
  return `₹${GROUPED.format(Math.round(amount))}`;
}

export function num(n: number): string {
  return GROUPED.format(n);
}

export function ha(area: number): string {
  return `${GROUPED2.format(area)} ha`;
}

export function pct(part: number, whole: number): string {
  if (whole === 0) return "0%";
  return `${((part / whole) * 100).toFixed(1)}%`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** 12 Jan 2026 */
export function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** 12 Jan 2026, 03:20 PM */
export function fmtDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const h = d.getHours();
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${fmtDate(iso)}, ${String(h12).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} ${suffix}`;
}

/** 30 Sep 2026, 10:42 AM — used for the fixed demo clock. */
export function fmtStamp(d: Date): string {
  const h = d.getHours();
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}, ${String(h12).padStart(2, "0")}:${String(
    d.getMinutes(),
  ).padStart(2, "0")} ${suffix}`;
}

/** 1.84 ha → "1.84 hectare" / "1.84 hectares" */
export function haWords(area: number): string {
  const n = GROUPED2.format(area);
  return `${n} ${Math.abs(area - 1) < 0.005 ? "hectare" : "hectares"}`;
}

export function days(n: number): string {
  return `${GROUPED.format(n)} ${n === 1 ? "day" : "days"}`;
}

/** "2h 14m" for the notification feed. */
export function relativeFrom(iso: string, now: Date): string {
  const diff = now.getTime() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const d = Math.round(hrs / 24);
  if (d < 30) return `${d}d ago`;
  return fmtDate(iso);
}

export const STAGE_LABELS: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_verification: "Under Verification",
  land_valuation: "Land Valuation",
  award_processing: "Award Processing",
  compensation_approved: "Compensation Approved",
  compensation_paid: "Compensation Paid",
  rnr_assessment: "R&R Assessment",
  rnr_approved: "R&R Approved",
  completed: "Completed",
  delayed: "Delayed",
};

export const STAGE_SHORT: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_verification: "Verification",
  land_valuation: "Valuation",
  award_processing: "Award",
  compensation_approved: "Comp. Approved",
  compensation_paid: "Comp. Paid",
  rnr_assessment: "R&R Assessment",
  rnr_approved: "R&R Approved",
  completed: "Completed",
  delayed: "Delayed",
};

/** Statutory windows, in days, that a district office actually works to. */
export const STAGE_SLA: Record<string, number> = {
  draft: 15,
  submitted: 10,
  under_verification: 30,
  land_valuation: 45,
  award_processing: 60,
  compensation_approved: 30,
  compensation_paid: 60,
  rnr_assessment: 90,
  rnr_approved: 60,
  completed: 0,
  delayed: 30,
};

export const COMPENSATION_LABELS: Record<string, string> = {
  not_initiated: "Not Initiated",
  estimated: "Estimated",
  under_approval: "Under Approval",
  approved: "Approved",
  partially_paid: "Partially Paid",
  paid: "Paid",
  delayed: "Delayed",
};

export const RNR_LABELS: Record<string, string> = {
  not_required: "Not Required",
  pending: "Pending",
  assessment_completed: "Assessment Completed",
  approval_pending: "Approval Pending",
  approved: "Approved",
  completed: "Completed",
};

export const VERIFICATION_LABELS: Record<string, string> = {
  not_started: "Not Started",
  under_verification: "Under Verification",
  verified: "Verified",
  discrepancy: "Discrepancy",
};
