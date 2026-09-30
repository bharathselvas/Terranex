import { Link } from "react-router-dom";
import {
  AlertOctagon,
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  Crosshair,
  FileText,
  Gavel,
  MapPin,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatINR } from "@/lib/format";
import {
  ACQUISITION_STATUS_COLOR,
  ACQUISITION_STATUS_LABEL,
  COMPENSATION_STATUS_LABEL,
  LAND_USE_LABEL,
  POSSESSION_STATUS_LABEL,
  type GeoParcel,
} from "./types";
import { HERO_FIELD_TASK_ID, HERO_CASE_STORE_ID, PROJECT } from "./geoData";

function Row({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[10.5px] uppercase tracking-wide text-slate-500">{label}</span>
      <span
        className={
          mono
            ? "gov-mono truncate text-right text-[#0F2340]"
            : "truncate text-right text-[11.5px] font-medium text-slate-800"
        }
      >
        {value}
      </span>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {icon}
        {title}
      </h3>
      {children}
    </section>
  );
}

/** The single next action implied by a parcel's workflow position. */
function nextAction(p: GeoParcel): string {
  switch (p.acquisitionStatus) {
    case "not_started":
      return "Awaiting inclusion in the land requirement schedule.";
    case "survey_completed":
      return "Cadastral survey complete — awaiting SIA scoping.";
    case "sia_completed":
      return "Social impact assessment closed — awaiting u/s 19 declaration.";
    case "declaration_issued":
      return "Declaration issued — compensation assessment in progress.";
    case "compensation_pending":
      return "Compensation assessment open with the District Collectorate.";
    case "award_passed":
      return "Award passed — payment instruction pending with Finance.";
    case "possession_pending":
      return "Payment cleared — possession date to be scheduled.";
    case "possession_completed":
      return "Possession recorded. No further acquisition action required.";
    case "blocked":
      return "Stage transition refused until the evidence gate is cleared.";
  }
}

type ParcelDetailPanelProps = {
  parcel: GeoParcel;
  onClose: () => void;
  onZoomToParcel: (parcel: GeoParcel) => void;
};

export function ParcelDetailPanel({ parcel, onClose, onZoomToParcel }: ParcelDetailPanelProps) {
  const b = parcel.blocker;
  const palette = ACQUISITION_STATUS_COLOR[parcel.acquisitionStatus];
  const totalEvidence = (b?.requiredEvidence.length ?? 0) + (b?.satisfiedEvidence.length ?? 0);
  const satisfied = b?.satisfiedEvidence.length ?? 0;

  return (
    <aside
      className="absolute inset-y-0 right-0 z-[1000] flex w-[340px] flex-col border-l bg-white shadow-[-8px_0_24px_-16px_rgba(15,35,64,0.35)]"
      aria-label={`Parcel details for ${parcel.surveyNumber}`}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="flex items-start justify-between gap-2 border-b bg-slate-50 px-3 py-2.5">
        <div className="min-w-0">
          <p className="gov-mono text-[13px] font-semibold text-[#0F2340]">{parcel.surveyNumber}</p>
          <p className="gov-mono text-[10px] text-slate-500">{parcel.parcelId}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onZoomToParcel(parcel)}
            title="Zoom to parcel"
            aria-label="Zoom to parcel"
            className="rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-200 hover:text-[#0F2340]"
          >
            <Crosshair className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close parcel details"
            className="rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-200 hover:text-[#0F2340]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* ── Stage + status strip ───────────────────────────────── */}
      <div
        className="flex items-center justify-between gap-2 border-b px-3 py-2"
        style={{ borderLeft: `3px solid ${palette.stroke}` }}
      >
        <div className="min-w-0">
          <p className="text-[9.5px] uppercase tracking-wider text-slate-500">Current stage</p>
          <p className="truncate text-[12px] font-semibold text-slate-900">{parcel.workflowStage}</p>
        </div>
        <Badge
          variant={parcel.acquisitionStatus === "blocked" ? "danger" : "secondary"}
          className="shrink-0 text-[9.5px] tracking-wide"
        >
          {parcel.acquisitionStatus === "blocked"
            ? "BLOCKED"
            : ACQUISITION_STATUS_LABEL[parcel.acquisitionStatus].toUpperCase()}
        </Badge>
      </div>

      <div className="min-h-0 flex-1 space-y-3.5 overflow-y-auto px-3 py-3">
        {/* ── Blocker ──────────────────────────────────────────── */}
        {b && (
          <div className="rounded-md border border-[#B42318]/35 bg-[#B42318]/[0.06] p-2.5">
            <div className="flex items-start gap-2">
              <AlertOctagon className="mt-0.5 h-4 w-4 shrink-0 text-[#B42318]" />
              <div className="min-w-0">
                <p className="text-[11.5px] font-semibold uppercase tracking-wide text-[#B42318]">
                  Blocked — {b.summary}
                </p>
                <p className="gov-mono mt-0.5 text-[9.5px] text-[#B42318]/80">{b.gate}</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-700">{b.reason}</p>

            <div className="mt-2.5">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-[9.5px] font-semibold uppercase tracking-wider text-slate-600">
                  Required evidence
                </p>
                <span className="gov-mono text-[9.5px] text-slate-500">
                  {satisfied}/{totalEvidence}
                </span>
              </div>
              <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-[#0F7A5A] transition-all"
                  style={{ width: `${totalEvidence === 0 ? 0 : (satisfied / totalEvidence) * 100}%` }}
                />
              </div>
              <ul className="space-y-1">
                {b.satisfiedEvidence.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                    <CheckCircle2 className="mt-px h-3 w-3 shrink-0 text-[#0F7A5A]" />
                    <span className="line-through decoration-slate-400/70">{item}</span>
                  </li>
                ))}
                {b.requiredEvidence.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-[11px] font-medium text-[#B42318]">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-[1px] border border-[#B42318]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="my-2.5" />
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[9.5px] uppercase tracking-wider text-slate-500">Responsible role</p>
                <p className="text-[11.5px] font-semibold text-slate-900">{b.responsibleRoleLabel}</p>
              </div>
              <Button size="sm" asChild className="h-7 shrink-0 text-[11px]">
                <Link to={`/app/fo/task/${parcel.fieldTaskId ?? HERO_FIELD_TASK_ID}`}>
                  View field task <ArrowUpRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
            <p className="mt-1.5 text-[10px] text-slate-500">
              {b.responsibleOfficer} · raised {b.raisedAt.slice(0, 10)}
            </p>
          </div>
        )}

        {/* ── Parcel ────────────────────────────────────────────── */}
        <Section title="Parcel">
          <div className="space-y-1.5">
            <Row label="Survey No" value={parcel.surveyNumber} mono />
            <Row label="Parcel ID" value={parcel.parcelId} mono />
            <Row label="Area" value={`${parcel.areaHa.toFixed(2)} ha`} />
            <Row label="Land type" value={LAND_USE_LABEL[parcel.landUse]} />
            <Row label="Owner" value={parcel.ownerName} />
            <Row label="Khata / ULPIN" value={`${parcel.khataNo} · ${parcel.ulpin}`} mono />
          </div>
        </Section>

        <Separator />

        {/* ── Acquisition case ──────────────────────────────────── */}
        <Section title="Acquisition case" icon={<FileText className="h-3 w-3" />}>
          <div className="space-y-1.5">
            <Row label="Case" value={parcel.caseId ?? "Not requisitioned"} mono />
            <Row label="Project" value={PROJECT.title} />
            <Row label="Current stage" value={parcel.workflowStage} />
            <Row
              label="Status"
              value={
                parcel.acquisitionStatus === "blocked" ? (
                  <span className="font-semibold text-[#B42318]">BLOCKED</span>
                ) : (
                  ACQUISITION_STATUS_LABEL[parcel.acquisitionStatus]
                )
              }
            />
            <Row label="Compensation" value={formatINR(parcel.compensationAmount)} />
            <Row label="Compensation status" value={COMPENSATION_STATUS_LABEL[parcel.compensationStatus]} />
            <Row label="Possession" value={POSSESSION_STATUS_LABEL[parcel.possessionStatus]} />
          </div>
          {!parcel.blocker && (
            <p className="rounded border bg-slate-50 px-2 py-1.5 text-[10.5px] leading-relaxed text-slate-600">
              {nextAction(parcel)}
            </p>
          )}
        </Section>

        <Separator />

        {/* ── Jurisdiction ──────────────────────────────────────── */}
        <Section title="Jurisdiction" icon={<MapPin className="h-3 w-3" />}>
          <div className="space-y-1.5">
            <Row label="State" value={parcel.jurisdiction.state} />
            <Row label="District" value={parcel.jurisdiction.district} />
            <Row label="Taluk" value={parcel.jurisdiction.tehsil} />
            <Row label="Village" value={parcel.jurisdiction.village} />
            <Row label="Authority" value={parcel.responsibleAuthority} />
          </div>
        </Section>
      </div>

      {/* ── Footer actions ────────────────────────────────────── */}
      <footer className="space-y-1.5 border-t bg-slate-50 px-3 py-2.5">
        {parcel.fieldTaskId && (
          <Button size="sm" asChild className="w-full justify-between text-[11.5px]">
            <Link to={`/app/fo/task/${parcel.fieldTaskId}`}>
              <span className="flex items-center gap-1.5">
                <ClipboardCheck className="h-3.5 w-3.5" /> View field task
              </span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
        <div className="flex gap-1.5">
          {parcel.caseId && (
            <Button variant="outline" size="sm" asChild className="h-7 flex-1 text-[11px]">
              <Link to={`/app/cases/${parcel.caseId === "CASE-402" ? HERO_CASE_STORE_ID : parcel.caseId}`}>
                <Gavel className="h-3 w-3" /> Open case
              </Link>
            </Button>
          )}
          <Button variant="outline" size="sm" className="h-7 flex-1 text-[11px]" onClick={onClose}>
            Close
          </Button>
        </div>
      </footer>
    </aside>
  );
}
