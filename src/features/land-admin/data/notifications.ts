// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Notification feed
// Built from the real caseload rather than a hand-written list, so an alert
// that names a case links to a case that exists, with a stage that matches
// what the case page will show.
//
// SYNTHETIC DEMO DATA.
// ═══════════════════════════════════════════════════════════════════════

import type { NotificationItem } from "../lib/types";
import { DEMO_NOW } from "../lib/types";
import { CASES, HERO_CASE } from "./cases";
import { STAGE_LABELS } from "../lib/format";


const MIN = 60000;
const ago = (mins: number) => new Date(DEMO_NOW.getTime() - mins * MIN).toISOString();

function build(): NotificationItem[] {
  const delayed = CASES.filter((c) => c.stage === "delayed");
  const compPending = CASES.filter((c) => c.compensationStatus === "delayed");
  const rnrPending = CASES.filter((c) => c.rnrStatus === "approval_pending");
  const underVerif = CASES.filter((c) => c.verification === "under_verification");
  const discrepancies = CASES.filter((c) => c.verification === "discrepancy");
  const closed = CASES.filter((c) => c.status === "closed");

  const out: NotificationItem[] = [];
  const push = (n: Omit<NotificationItem, "id" | "read">) => {
    out.push({ ...n, id: `ntf-${out.length + 1}`, read: false });
  };

  // The hero case leads the feed — the walkthrough opens on it.
  push({
    caseId: HERO_CASE.id,
    title: `Compensation overdue — ${HERO_CASE.caseNo}`,
    body: `₹${(HERO_CASE.compensation.pending / 100000).toFixed(2)} lakh approved but not released for ${HERO_CASE.village}, S.No. ${HERO_CASE.surveyNo}. Running ${HERO_CASE.daysPending} days past the statutory window.`,
    at: ago(18),
    tone: "critical",
    office: HERO_CASE.responsibleOffice,
  });

  if (delayed[1]) {
    const c = delayed[1];
    push({
      caseId: c.id,
      title: `Case flagged delayed — ${c.caseNo}`,
      body: `${c.village}, S.No. ${c.surveyNo} has run ${c.daysPending} days in ${STAGE_LABELS[c.stage]}. Escalation due to the District Collector.`,
      at: ago(52),
      tone: "critical",
      office: c.responsibleOffice,
    });
  }

  if (compPending[2]) {
    const c = compPending[2];
    push({
      caseId: c.id,
      title: `Treasury query — ${c.caseNo}`,
      body: `Payment instruction for ${c.village}, S.No. ${c.surveyNo} returned unprocessed. Bank details re-verification required.`,
      at: ago(96),
      tone: "warning",
      office: "District Treasury, Chengalpattu",
    });
  }

  if (rnrPending[0]) {
    const c = rnrPending[0];
    push({
      caseId: c.id,
      title: `R&R approval awaited — ${c.caseNo}`,
      body: `${c.eligibleHouseholds} eligible household${c.eligibleHouseholds === 1 ? "" : "s"} at ${c.village}. Plan forwarded to the Commissionerate.`,
      at: ago(190),
      tone: "warning",
      office: "R&R Commissionerate, Chennai",
    });
  }

  if (underVerif[0]) {
    const c = underVerif[0];
    push({
      caseId: c.id,
      title: `Field report pending — ${c.caseNo}`,
      body: `GPS-tagged verification report not uploaded for ${c.village}, S.No. ${c.surveyNo}. Assigned to ${c.revenueOfficer}.`,
      at: ago(320),
      tone: "info",
      office: c.responsibleOffice,
    });
  }

  if (discrepancies[0]) {
    const c = discrepancies[0];
    push({
      caseId: c.id,
      title: `Ownership discrepancy — ${c.caseNo}`,
      body: `Recorded extent in the patta register differs from the notified extent at ${c.village}, S.No. ${c.surveyNo}. Re-verification ordered.`,
      at: ago(540),
      tone: "warning",
      office: c.responsibleOffice,
    });
  }

  if (closed[0]) {
    const c = closed[0];
    push({
      caseId: c.id,
      title: `Possession handed over — ${c.caseNo}`,
      body: `Possession certificate issued at ${c.village}, S.No. ${c.surveyNo}. ${c.affectedHouseholds} household${c.affectedHouseholds === 1 ? "" : "s"} settled.`,
      at: ago(760),
      tone: "success",
      office: c.responsibleOffice,
    });
  }

  push({
    caseId: null,
    title: "Valuation circular revised",
    body: "State Valuation Committee has revised the circular rate for dry agricultural land in the Tambalam block. Re-valuation required for open cases filed before the revision.",
    at: ago(1_180),
    tone: "info",
    office: "District Valuation Committee",
  });

  push({
    caseId: null,
    title: "Gram sabha schedule published",
    body: "Public consultation for the Western Connector alignment is scheduled across 4 villages. Objection window closes in 21 days.",
    at: ago(1_640),
    tone: "info",
    office: "District Revenue Office, Chengalpattu",
  });

  push({
    caseId: null,
    title: "Survey equipment calibration due",
    body: "Total-station units in the district survey office require annual calibration before the next field season.",
    at: ago(2_200),
    tone: "warning",
    office: "District Survey Office, Chengalpattu",
  });

  return out.map((n, i) => ({ ...n, read: i >= 5 }));
}

export const NOTIFICATIONS: NotificationItem[] = build();

export const UNREAD_COUNT = NOTIFICATIONS.filter((n) => !n.read).length;
