// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Case workspace
// The government case file. Seven sections on one page: parcel, acquisition,
// compensation, R&R, households, documents and timeline — plus the two-way
// bridge to the map.
//
// Documents are the only thing here an officer can actually change, and those
// decisions persist (see store/landAdminStore.ts). Everything else is the
// case record as generated.
// ═══════════════════════════════════════════════════════════════════════

import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Flag,
  Gavel,
  MapPin,
  Printer,
  ShieldAlert,
  Users,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CaseStatusPill,
  CompensationPill,
  CountRow,
  DataTable,
  EmptyState,
  FieldGrid,
  Meter,
  MoneyRow,
  Panel,
  PriorityPill,
  RnrPill,
  StagePill,
  Tip,
  VerificationPill,
} from "../components/ui";
import {
  HOUSEHOLD_CATEGORY_LABEL,
  findCaseById,
  householdsForCase,
  documentsForCase,
  timelineForCase,
  delayIssue,
  fmtDate,
  haWords,
  inr,
  num,
  parcelForCase,
} from "../data";
import type { CaseDocument, TimelineEvent } from "../lib/types";
import { useLandAdmin } from "../store/landAdminStore";

export function CaseDetailPage() {
  const { caseId } = useParams<{ caseId: string }>();
  const nav = useNavigate();
  const c = findCaseById(caseId);

  const docDecisions = useLandAdmin((s) => s.docDecisions);
  const reviewDocument = useLandAdmin((s) => s.reviewDocument);
  const requestConfirm = useLandAdmin((s) => s.requestConfirm);
  const cancelConfirm = useLandAdmin((s) => s.cancelConfirm);
  const pushToast = useLandAdmin((s) => s.pushToast);

  const docs = React.useMemo(() => (c ? documentsForCase(c) : []), [c]);
  const households = React.useMemo(() => (c ? householdsForCase(c) : []), [c]);
  const timeline = React.useMemo(() => (c ? timelineForCase(c) : []), [c]);
  const parcel = React.useMemo(() => (c ? parcelForCase(c.id) : undefined), [c]);

  if (!c) {
    return (
      <div className="mx-auto max-w-2xl p-8">
        <EmptyState
          icon={<FileText className="h-9 w-9" />}
          title="Case not found"
          body="No case in the district register matches this reference. It may have been closed and archived, or the link may be mistyped."
          action={
            <Link to="/land-admin/cases" className="border border-[#0F2340] bg-[#0F2340] px-3 py-1.5 text-[12.5px] font-semibold text-white hover:bg-[#1A3560]">
              Back to Case Register
            </Link>
          }
        />
      </div>
    );
  }

  const breached = c.daysPending > c.stageSlaDays;
  const resolvedDocs = docs.map((d) => {
    const decision = docDecisions[`${c.id}:${d.id}`];
    return decision ? { ...d, status: decision.status } : d;
  });
  const verifiedCount = resolvedDocs.filter((d) => d.status === "verified").length;

  return (
    <div className="mx-auto max-w-[1680px] space-y-3 p-4">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="border border-slate-300 bg-white">
        <div className="flex flex-wrap items-start gap-3 border-b border-slate-200 px-4 py-3">
          <button
            type="button"
            onClick={() => nav("/land-admin/cases")}
            className="mt-0.5 border border-slate-300 p-1.5 text-slate-600 hover:bg-slate-50"
            aria-label="Back to case register"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-mono text-[17px] font-semibold tracking-tight text-[#0F2340]">Case {c.caseNo}</h1>
              <StagePill stage={c.stage} />
              <CaseStatusPill status={c.status} />
              <PriorityPill priority={c.priority} />
            </div>
            <p className="mt-1 text-[12.5px] text-slate-600">
              {c.acquisition.purpose} · {c.acquisition.authority}
            </p>
            <p className="mt-0.5 text-[11.5px] text-slate-500">
              {c.responsibleOffice} · {c.revenueOfficer} · Opened {fmtDate(c.createdOn)} · Last updated {fmtDate(c.lastUpdated)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {parcel ? (
              <Link
                to={`/land-admin/gis?parcel=${parcel.id}`}
                className="flex items-center gap-1.5 border border-[#0F2340] bg-[#0F2340] px-3 py-1.5 text-[12.5px] font-semibold text-white hover:bg-[#1A3560]"
              >
                <MapPin className="h-3.5 w-3.5" /> View Parcel on Map
              </Link>
            ) : (
              <Tip label="This case's parcel is not part of the drawn survey blocks on the demo map layer.">
                <span className="flex cursor-help items-center gap-1.5 border border-slate-300 px-3 py-1.5 text-[12.5px] text-slate-400">
                  <MapPin className="h-3.5 w-3.5" /> Not on map layer
                </span>
              </Tip>
            )}
            <button
              type="button"
              onClick={() => {
                pushToast({
                  tone: "info",
                  title: "Case file queued for print",
                  detail: `${c.caseNo} · ${resolvedDocs.length} documents · ${households.length} households`,
                });
              }}
              className="flex items-center gap-1.5 border border-slate-300 px-3 py-1.5 text-[12.5px] font-medium text-slate-600 hover:bg-slate-50"
            >
              <Printer className="h-3.5 w-3.5" /> Print file
            </button>
          </div>
        </div>

        {/* Delay banner */}
        {breached && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-red-200 bg-red-50 px-4 py-2 text-[12px] text-red-900">
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldAlert className="h-3.5 w-3.5" /> Case delayed
            </span>
            <span>
              {delayIssue(c)} — {c.daysPending} days in the current stage against a statutory window of {c.stageSlaDays} days.
            </span>
            <span className="ml-auto font-mono font-semibold">{c.daysPending - c.stageSlaDays} days over</span>
          </div>
        )}

        {/* Headline strip */}
        <div className="grid grid-cols-2 divide-x divide-slate-200 border-b border-slate-200 sm:grid-cols-4">
          <HeaderStat label="Parcel area" value={haWords(c.areaHa)} />
          <HeaderStat label="Compensation pending" value={inr(c.compensation.pending)} tone={c.compensation.pending > 0 ? "red" : undefined} />
          <HeaderStat label="Affected households" value={num(c.affectedHouseholds)} />
          <HeaderStat label="Documents verified" value={`${verifiedCount} / ${resolvedDocs.length}`} />
        </div>

        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5">
          <StagePill stage={c.stage} />
          <VerificationPill status={c.verification} />
          <CompensationPill status={c.compensationStatus} />
          <RnrPill status={c.rnrStatus} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        <div className="space-y-3 xl:col-span-2">
          {/* ── 1. Parcel ───────────────────────────────────────────── */}
          <Panel title={<span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-slate-400" />1 · Parcel Information</span>}>
            <FieldGrid
              items={[
                ["Survey Number", <span className="font-mono font-medium">{c.surveyNo}</span>],
                ["Parcel ID", <span className="font-mono text-slate-600">{c.parcelId}</span>],
                ["Village", c.village],
                ["Taluk", c.taluk],
                ["District", c.district],
                ["Area", haWords(c.areaHa)],
                ["Land Classification", c.landClassification],
                ["Patta / Khasra No.", <span className="font-mono text-slate-600">{c.owner.pattaNo}</span>],
                [
                  "Map geometry",
                  parcel ? (
                    <Link to={`/land-admin/gis?parcel=${parcel.id}`} className="font-medium text-blue-700 underline-offset-2 hover:underline">
                      Drawn on GIS layer · {parcel.areaHa} ha {parcel.surveyNo === c.surveyNo ? "(matches record)" : ""}
                    </Link>
                  ) : (
                    <span className="text-slate-400">Not on the demo map layer</span>
                  ),
                ],
              ]}
              cols={3}
            />
          </Panel>

          {/* ── 2. Acquisition ───────────────────────────────────────── */}
          <Panel title={<span className="flex items-center gap-1.5"><Gavel className="h-3.5 w-3.5 text-slate-400" />2 · Acquisition</span>}>
            <FieldGrid
              items={[
                ["Purpose", c.acquisition.purpose],
                ["Authority", c.acquisition.authority],
                ["Acquisition Stage", <StagePill stage={c.stage} short />],
                ["Government Order", <span className="text-[12px] text-slate-600">{c.acquisition.governmentOrderRef}</span>],
                ["Notification (s.11(1))", c.acquisition.notificationDate ? fmtDate(c.acquisition.notificationDate) : "Not issued"],
                ["Declaration (s.19)", c.acquisition.declarationDate ? fmtDate(c.acquisition.declarationDate) : "Not published"],
                [
                  "Objections",
                  <span className="font-mono tabular-nums">
                    {c.acquisition.objectionsDisposed} disposed / {c.acquisition.objectionsReceived} received
                  </span>,
                ],
                [
                  "Stage window",
                  <span className={cn("font-mono tabular-nums", breached && "font-semibold text-red-700")}>
                    {c.daysPending} of {c.stageSlaDays} days used
                  </span>,
                ],
              ]}
              cols={2}
            />
            <div className="mt-3">
              <Meter
                value={Math.min(c.daysPending, c.stageSlaDays)}
                max={c.stageSlaDays}
                tone={breached ? "red" : "blue"}
                label={`${Math.min(100, Math.round((c.daysPending / Math.max(c.stageSlaDays, 1)) * 100))}% of window`}
              />
            </div>
          </Panel>

          {/* ── 3. Compensation ─────────────────────────────────────── */}
          <Panel title={<span className="flex items-center gap-1.5"><span className="font-mono text-slate-400">₹</span>3 · Compensation</span>}>
            <MoneyRow
              items={[
                { label: "Estimated", value: c.compensation.estimated, tone: "muted" },
                { label: "Approved", value: c.compensation.approved },
                { label: "Paid", value: c.compensation.paid, tone: "muted" },
                { label: "Pending", value: c.compensation.pending, tone: c.compensation.pending > 0 ? "due" : "muted" },
              ]}
            />
            <FieldGrid
              cols={3}
              items={[
                ["Market value per acre", <span className="font-mono tabular-nums">{inr(c.compensation.marketValuePerAcre)}</span>],
                ["Compensation order passed", c.compensation.approvedOn ? fmtDate(c.compensation.approvedOn) : "Not passed"],
                ["Payment released", c.compensation.paidOn ? fmtDate(c.compensation.paidOn) : "Not released"],
                ["Treasury reference", c.compensation.treasuryRef ? <span className="font-mono text-slate-600">{c.compensation.treasuryRef}</span> : "—"],
                ["Status", <CompensationPill status={c.compensationStatus} />],
                ["Landholder", c.owner.name],
              ]}
            />
          </Panel>

          {/* ── 4. R&R ──────────────────────────────────────────────── */}
          <Panel
            title={<span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-slate-400" />4 · Rehabilitation &amp; Resettlement</span>}
            actions={<RnrPill status={c.rnrStatus} />}
          >
            {c.rnrStatus === "not_required" ? (
              <EmptyState
                icon={<Users className="h-8 w-8" />}
                title="No R&R obligation"
                body="This parcel does not attract rehabilitation and resettlement entitlement under the current notification — no affected household qualifies."
              />
            ) : (
              <>
                <CountRow
                  items={[
                    { label: "Affected households", value: c.affectedHouseholds },
                    { label: "Eligible households", value: c.eligibleHouseholds },
                    { label: "Pending assessment", value: Math.max(0, c.affectedHouseholds - c.eligibleHouseholds) },
                    { label: "Approval stage", value: c.rnrStatus === "completed" ? "Closed" : c.rnrStatus === "approved" ? "State" : "District" },
                  ]}
                />
                <div className="mt-3">
                  <FieldGrid
                    cols={2}
                    items={[
                      ["Assessment", c.rnrStatus === "pending" ? <span className="text-amber-700">Pending</span> : <span className="text-emerald-700">Completed</span>],
                      ["Approval", ["approved", "completed"].includes(c.rnrStatus) ? <span className="text-emerald-700">Sanctioned</span> : <span className="text-red-700">Pending</span>],
                    ]}
                  />
                </div>
              </>
            )}
          </Panel>

          {/* ── 5. Documents ────────────────────────────────────────── */}
          <Panel
            title={<span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-slate-400" />5 · Documents ({resolvedDocs.length})</span>}
            subtitle={`${verifiedCount} verified · ${resolvedDocs.filter((d) => d.status === "pending_verification").length} pending verification · ${resolvedDocs.filter((d) => d.status === "rejected").length} returned`}
            dense
          >
            {resolvedDocs.length === 0 ? (
              <EmptyState
                icon={<FileText className="h-8 w-8" />}
                title="No documents on file"
                body="Nothing has been uploaded against this case yet. Documents appear here as the requisition bundle is assembled by the revenue office."
              />
            ) : (
              <DataTable
                dense
                rows={resolvedDocs}
                rowKey={(d: CaseDocument) => d.id}
                columns={[
                  { key: "name", header: "Document", cell: (d: CaseDocument) => <span className="font-medium text-slate-800">{d.name}</span> },
                  { key: "type", header: "Type", width: "150px", cell: (d: CaseDocument) => <span className="text-slate-600">{d.type}</span> },
                  { key: "uploadedOn", header: "Uploaded", width: "104px", sortable: (d: CaseDocument) => d.uploadedOn, cell: (d: CaseDocument) => <span className="font-mono text-slate-600">{fmtDate(d.uploadedOn)}</span> },
                  { key: "uploadedBy", header: "Uploaded by", width: "190px", cell: (d: CaseDocument) => <span className="text-slate-600">{d.uploadedBy}</span> },
                  { key: "size", header: "Size", width: "72px", align: "right", cell: (d: CaseDocument) => <span className="font-mono text-slate-500">{num(d.fileSizeKb)} KB</span> },
                  {
                    key: "status",
                    header: "Verification",
                    width: "150px",
                    cell: (d: CaseDocument) => <DocStatus status={d.status} />,
                  },
                  {
                    key: "action",
                    header: "Action",
                    width: "176px",
                    cell: (d: CaseDocument) => (
                      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                        <DocBtn
                          label="Verify"
                          icon={<CheckCircle2 className="h-3 w-3" />}
                          done={d.status === "verified"}
                          onClick={() =>
                            requestConfirm({
                              title: "Verify this document?",
                              body: `${d.name} on ${c.caseNo} will be marked verified against your name. This is recorded in the demo case file.`,
                              confirmLabel: "Mark verified",
                              tone: "primary",
                              onConfirm: () => {
                                reviewDocument(c, d, "verified");
                                cancelConfirm();
                              },
                            })
                          }
                        />
                        <DocBtn
                          label="Return"
                          icon={<XCircle className="h-3 w-3" />}
                          done={d.status === "rejected"}
                          onClick={() =>
                            requestConfirm({
                              title: "Return this document?",
                              body: `${d.name} on ${c.caseNo} will be returned to the uploading office for correction and will show as rejected in the case file.`,
                              confirmLabel: "Return for correction",
                              tone: "danger",
                              onConfirm: () => {
                                reviewDocument(c, d, "rejected");
                                cancelConfirm();
                              },
                            })
                          }
                        />
                      </div>
                    ),
                  },
                ]}
              />
            )}
          </Panel>
        </div>

        {/* ── Right rail: timeline + households + landowner ─────────── */}
        <div className="space-y-3">
          <Panel title={<span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-slate-400" />6 · Case Timeline</span>} subtitle={`${timeline.length} recorded events`}>
            <Timeline events={timeline} />
          </Panel>

          <Panel title={<span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-slate-400" />7 · Affected Households ({households.length})</span>} dense>
            {households.length === 0 ? (
              <EmptyState
                icon={<Users className="h-8 w-8" />}
                title="No affected households"
                body="No household is recorded against this parcel. This is expected for government land and for acquisitions where the holder is a single owner in occupation."
              />
            ) : (
              <div className="max-h-[420px] overflow-y-auto">
                <table className="w-full text-[12px]">
                  <thead className="sticky top-0 bg-slate-100">
                    <tr className="border-b border-slate-300 text-left text-[10px] uppercase tracking-wide text-slate-600">
                      <th className="px-3 py-1.5 font-semibold">Head of household</th>
                      <th className="px-2 py-1.5 font-semibold">Category</th>
                      <th className="px-2 py-1.5 text-right font-semibold">Members</th>
                      <th className="px-3 py-1.5 font-semibold">R&amp;R</th>
                    </tr>
                  </thead>
                  <tbody>
                    {households.map((h, i) => (
                      <tr key={h.id} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/40" : ""}`}>
                        <td className="px-3 py-1.5 text-slate-800">
                          {h.headOfHousehold}
                          <span className="block font-mono text-[10px] text-slate-400">{h.id.split("-").pop()}</span>
                        </td>
                        <td className="px-2 py-1.5 text-slate-600">{HOUSEHOLD_CATEGORY_LABEL[h.category]}</td>
                        <td className="px-2 py-1.5 text-right font-mono tabular-nums text-slate-700">{h.familySize}</td>
                        <td className="px-3 py-1.5">
                          {h.eligible ? (
                            <span className="text-emerald-700" title={h.resettlementOption ?? "Eligible"}>
                              Eligible
                            </span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>

          <Panel title="Recorded Landholder">
            <FieldGrid
              cols={1}
              items={[
                ["Name", c.owner.name],
                ["Father / spouse", c.owner.fatherName],
                ["Patta number", <span className="font-mono text-slate-600">{c.owner.pattaNo}</span>],
                ["Social category", <span className="capitalize">{c.owner.category === "minor" ? "Minor" : c.owner.category.toUpperCase()}</span>],
                ["Aadhaar", <span className="font-mono text-slate-600">{c.owner.aadhaarMasked}</span>],
                ["Contact", <span className="font-mono text-slate-600">{c.owner.mobileMasked}</span>],
              ]}
            />
            <p className="mt-3 flex items-start gap-1.5 border-t border-slate-200 pt-2.5 text-[10.5px] leading-relaxed text-slate-400">
              <Flag className="mt-px h-3 w-3 shrink-0" aria-hidden />
              Identifiers are masked and every record in this demo is synthetic. No real landholder data is held or displayed.
            </p>
          </Panel>
        </div>
      </div>

      <p className="pb-1 text-center text-[10.5px] text-slate-400">
        <AlertTriangle className="mr-1 inline h-3 w-3 align-[-1px]" aria-hidden />
        DEMO ENVIRONMENT · case file generated for SIH 2026 · document decisions are stored locally in this browser only
      </p>
    </div>
  );
}

function HeaderStat({ label, value, tone }: { label: string; value: string; tone?: "red" }) {
  return (
    <div className="px-4 py-2.5">
      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={cn("mt-0.5 font-mono text-[15px] font-semibold tabular-nums", tone === "red" ? "text-red-700" : "text-slate-900")}>{value}</p>
    </div>
  );
}

function DocStatus({ status }: { status: CaseDocument["status"] }) {
  if (status === "verified") return <span className="inline-flex items-center gap-1 text-emerald-700"><CheckCircle2 className="h-3 w-3" /> Verified</span>;
  if (status === "rejected") return <span className="inline-flex items-center gap-1 text-red-700"><XCircle className="h-3 w-3" /> Rejected</span>;
  return <span className="inline-flex items-center gap-1 text-amber-700"><Clock className="h-3 w-3" /> Pending Verification</span>;
}

function DocBtn({
  label,
  icon,
  done,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  done: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 border px-1.5 py-0.5 text-[11px] font-medium",
        done ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

/** Vertical case timeline: completed / current / pending with delays called out. */
export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative space-y-0">
      {events.map((e, i) => {
        const last = i === events.length - 1;
        return (
          <li key={e.id} className="relative flex gap-3 pb-4 last:pb-0">
            {!last && <span className="absolute left-[5px] top-3 h-full w-px bg-slate-200" aria-hidden />}
            <span
              className={cn(
                "relative z-10 mt-1 h-[11px] w-[11px] shrink-0 rounded-full border-2 bg-white",
                e.state === "completed" && "border-emerald-600",
                e.state === "current" && "border-[#0F2340]",
                e.state === "pending" && "border-slate-300",
              )}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <p className={cn("text-[12.5px] font-semibold", e.state === "current" ? "text-[#0F2340]" : "text-slate-800")}>{e.title}</p>
                <span className="font-mono text-[10.5px] text-slate-500">{fmtDate(e.date)}</span>
                {e.state === "current" && (
                  <span className="border border-[#0F2340] px-1 text-[9.5px] font-semibold uppercase tracking-wide text-[#0F2340]">Current</span>
                )}
              </div>
              <p className="mt-0.5 text-[11.5px] leading-snug text-slate-600">{e.detail}</p>
              <p className="mt-0.5 text-[10.5px] text-slate-400">
                {e.actor} · {e.office}
              </p>
              {e.isDelay && (
                <p className="mt-1 inline-flex items-center gap-1 border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-[10.5px] font-medium text-amber-900">
                  <AlertTriangle className="h-2.5 w-2.5" aria-hidden />
                  {e.delayDays ? `Ran ${e.delayDays} days over the statutory window` : "Outside the statutory window"}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
