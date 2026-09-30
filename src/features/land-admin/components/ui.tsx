// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Shared presentational components
// Government-system visual language: thin borders, navy headings, restrained
// accents, dense-but-readable tables. No gradients, no playful motion.
// ═══════════════════════════════════════════════════════════════════════

import React from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Clock,
  FileWarning,
  Info,
  Loader2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AcquisitionStage, CaseStatus, Priority } from "../lib/types";
import {
  COMPENSATION_LABELS,
  RNR_LABELS,
  STAGE_LABELS,
  STAGE_SHORT,
  VERIFICATION_LABELS,
  inr,
  num,
} from "../lib/format";

// ── Demo banner ─────────────────────────────────────────────────────────
export function DemoBanner({ stamp }: { stamp: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-amber-300 bg-amber-50 px-4 py-1.5 text-[11px] text-amber-900">
      <span className="flex items-center gap-1.5 font-semibold tracking-wide">
        <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
        DEMO ENVIRONMENT · DATA IS MOCKED FOR SIH 2026
      </span>
      <span className="text-amber-800">
        Synthetic caseload · no live government database is connected · demo clock{" "}
        <span className="font-semibold">{stamp}</span>
      </span>
    </div>
  );
}

// ── Status pill ─────────────────────────────────────────────────────────
type PillTone = "slate" | "blue" | "amber" | "green" | "red" | "violet" | "teal";

const PILL_TONE: Record<PillTone, string> = {
  slate: "border-slate-300 bg-slate-100 text-slate-700",
  blue: "border-blue-300 bg-blue-50 text-blue-800",
  amber: "border-amber-300 bg-amber-50 text-amber-800",
  green: "border-emerald-300 bg-emerald-50 text-emerald-800",
  red: "border-red-300 bg-red-50 text-red-800",
  violet: "border-violet-300 bg-violet-50 text-violet-800",
  teal: "border-teal-300 bg-teal-50 text-teal-800",
};

export function Pill({
  tone = "slate",
  children,
  dot,
  title,
  className,
}: {
  tone?: PillTone;
  children: React.ReactNode;
  dot?: boolean;
  title?: string;
  className?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded border px-1.5 py-0.5 text-[11px] font-medium leading-4",
        PILL_TONE[tone],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}

const STAGE_TONE: Record<AcquisitionStage, PillTone> = {
  draft: "slate",
  submitted: "blue",
  under_verification: "violet",
  land_valuation: "amber",
  award_processing: "amber",
  compensation_approved: "teal",
  compensation_paid: "teal",
  rnr_assessment: "violet",
  rnr_approved: "teal",
  completed: "green",
  delayed: "red",
};

export function StagePill({ stage, short }: { stage: AcquisitionStage; short?: boolean }) {
  return (
    <Pill tone={STAGE_TONE[stage]} dot>
      {short ? STAGE_SHORT[stage] : STAGE_LABELS[stage]}
    </Pill>
  );
}

const PRIORITY_TONE: Record<Priority, PillTone> = {
  critical: "red",
  high: "amber",
  medium: "blue",
  low: "slate",
};

export function PriorityPill({ priority }: { priority: Priority }) {
  return <Pill tone={PRIORITY_TONE[priority]}>{priority[0].toUpperCase() + priority.slice(1)}</Pill>;
}

const COMP_TONE: Record<string, PillTone> = {
  not_initiated: "slate",
  estimated: "amber",
  under_approval: "amber",
  approved: "blue",
  partially_paid: "teal",
  paid: "green",
  delayed: "red",
};

export function CompensationPill({ status }: { status: string }) {
  return (
    <Pill tone={COMP_TONE[status] ?? "slate"}>
      {COMPENSATION_LABELS[status] ?? status}
    </Pill>
  );
}

const RNR_TONE: Record<string, PillTone> = {
  not_required: "slate",
  pending: "amber",
  assessment_completed: "blue",
  approval_pending: "violet",
  approved: "teal",
  completed: "green",
};

export function RnrPill({ status }: { status: string }) {
  return (
    <Pill tone={RNR_TONE[status] ?? "slate"}>
      {RNR_LABELS[status] ?? status}
    </Pill>
  );
}

const VERIF_TONE: Record<string, PillTone> = {
  not_started: "slate",
  under_verification: "blue",
  verified: "green",
  discrepancy: "red",
};

export function VerificationPill({ status }: { status: string }) {
  return (
    <Pill tone={VERIF_TONE[status] ?? "slate"}>
      {VERIFICATION_LABELS[status] ?? status}
    </Pill>
  );
}

export function CaseStatusPill({ status }: { status: CaseStatus }) {
  const tone: PillTone = status === "active" ? "blue" : status === "closed" ? "green" : "amber";
  return <Pill tone={tone} dot>{status === "on_hold" ? "On Hold" : status[0].toUpperCase() + status.slice(1)}</Pill>;
}

// ── KPI card ────────────────────────────────────────────────────────────
export function KpiCard({
  label,
  value,
  sub,
  tone = "slate",
  icon,
  to,
  hint,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: PillTone;
  icon?: React.ReactNode;
  /** Makes the whole card a link — the dashboard tiles navigate. */
  to?: string;
  hint?: string;
}) {
  const accent: Record<PillTone, string> = {
    slate: "border-l-slate-400",
    blue: "border-l-blue-600",
    amber: "border-l-amber-500",
    green: "border-l-emerald-600",
    red: "border-l-red-700",
    violet: "border-l-violet-600",
    teal: "border-l-teal-600",
  };
  const body = (
    <div
      className={cn(
        "flex h-full items-start gap-3 border border-slate-200 border-l-[3px] bg-white p-4 transition-colors",
        accent[tone],
        to && "hover:bg-slate-50",
      )}
    >
      {icon && <div className="mt-0.5 text-slate-400">{icon}</div>}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-medium uppercase tracking-wide text-slate-500" title={hint ?? label}>
          {label}
        </p>
        <p className="mt-1 font-mono text-2xl font-semibold leading-none tracking-tight text-slate-900">{value}</p>
        {sub && <p className="mt-1.5 truncate text-[11px] text-slate-500">{sub}</p>}
      </div>
      {to && <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-300" aria-hidden />}
    </div>
  );
  return to ? (
    <Link to={to} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
      {body}
    </Link>
  ) : (
    body
  );
}

// ── Panel ───────────────────────────────────────────────────────────────
export function Panel({
  title,
  subtitle,
  actions,
  children,
  className,
  bodyClassName,
  dense,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  dense?: boolean;
}) {
  return (
    <section className={cn("border border-slate-200 bg-white", className)}>
      {(title || actions) && (
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/70 px-4 py-2.5">
          <div className="min-w-0">
            {title && <h2 className="text-[13px] font-semibold text-slate-800">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-[11px] text-slate-500">{subtitle}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={cn(dense ? "" : "p-4", bodyClassName)}>{children}</div>
    </section>
  );
}

// ── Data table ──────────────────────────────────────────────────────────
export interface Column<T> {
  key: string;
  header: React.ReactNode;
  cell: (row: T, index: number) => React.ReactNode;
  align?: "left" | "right" | "center";
  /** Supplying this makes the header a sort toggle. */
  sortable?: (row: T) => string | number;
  width?: string;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  empty,
  initialSort,
  dense,
  maxHeight,
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  empty?: React.ReactNode;
  initialSort?: { key: string; dir: "asc" | "desc" };
  dense?: boolean;
  maxHeight?: number;
}) {
  const [sort, setSort] = React.useState<{ key: string; dir: "asc" | "desc" } | null>(initialSort ?? null);

  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortable) return rows;
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = col.sortable!(a);
      const bv = col.sortable!(b);
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [rows, sort, columns]);

  if (rows.length === 0 && empty) {
    return <div className={maxHeight ? "overflow-auto" : undefined}>{empty}</div>;
  }

  const pad = dense ? "px-2.5 py-1.5" : "px-3 py-2";

  return (
    <div className="overflow-x-auto" style={maxHeight ? { maxHeight, overflowY: "auto" } : undefined}>
      <table className="w-full min-w-full border-collapse text-[12.5px]">
        <thead className="sticky top-0 z-10">
          <tr className="border-b border-slate-300 bg-slate-100">
            {columns.map((c) => {
              const active = sort?.key === c.key;
              return (
                <th
                  key={c.key}
                  scope="col"
                  style={c.width ? { width: c.width } : undefined}
                  className={cn(
                    pad,
                    "text-left font-semibold uppercase tracking-wide text-[10.5px] text-slate-600",
                    c.align === "right" && "text-right",
                    c.align === "center" && "text-center",
                  )}
                >
                  {c.sortable ? (
                    <button
                      type="button"
                      onClick={() =>
                        setSort((s) =>
                          s?.key === c.key ? { key: c.key, dir: s.dir === "asc" ? "desc" : "asc" } : { key: c.key, dir: "desc" },
                        )
                      }
                      className={cn(
                        "inline-flex items-center gap-1 uppercase tracking-wide hover:text-slate-900",
                        c.align === "right" && "flex-row-reverse",
                        active && "text-slate-900",
                      )}
                    >
                      {c.header}
                      <span className={cn("text-[9px]", active ? "opacity-100" : "opacity-30")}>
                        {active ? (sort!.dir === "asc" ? "\u25B2" : "\u25BC") : "\u25BC"}
                      </span>
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={rowKey(row, i)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                "border-b border-slate-100 align-middle",
                onRowClick && "cursor-pointer hover:bg-blue-50/50",
                !onRowClick && i % 2 === 1 && "bg-slate-50/40",
              )}
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={cn(
                    pad,
                    "text-slate-700",
                    c.align === "right" && "text-right",
                    c.align === "center" && "text-center",
                  )}
                >
                  {c.cell(row, i)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Field row (label / value pairs) ─────────────────────────────────────
export function FieldGrid({ items, cols = 2 }: { items: Array<[string, React.ReactNode]>; cols?: 1 | 2 | 3 }) {
  return (
    <dl className={cn("grid gap-x-6 gap-y-3", cols === 1 ? "grid-cols-1" : cols === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2")}>
      {items.map(([k, v]) => (
        <div key={k} className="min-w-0">
          <dt className="text-[10.5px] font-medium uppercase tracking-wide text-slate-500">{k}</dt>
          <dd className="mt-0.5 break-words text-[13px] text-slate-900">{v ?? "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

// ── Breadcrumbs ─────────────────────────────────────────────────────────
export function Breadcrumbs({ items }: { items: Array<{ label: string; to?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-[11.5px] text-slate-500">
      {items.map((it, i) => (
        <React.Fragment key={`${it.label}-${i}`}>
          {i > 0 && <ChevronRight className="h-3 w-3 text-slate-300" aria-hidden />}
          {it.to && i < items.length - 1 ? (
            <Link to={it.to} className="text-slate-600 underline-offset-2 hover:text-blue-700 hover:underline">
              {it.label}
            </Link>
          ) : (
            <span className={cn(i === items.length - 1 && "font-medium text-slate-800")} aria-current={i === items.length - 1 ? "page" : undefined}>
              {it.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// ── Empty state ─────────────────────────────────────────────────────────
export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-3 text-slate-300">{icon ?? <CircleDashed className="h-9 w-9" aria-hidden />}</div>
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      <p className="mt-1 max-w-md text-[12.5px] leading-relaxed text-slate-500">{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ── Tooltip (CSS-only, no portal needed) ────────────────────────────────
export function Tip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="group/tip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 hidden w-max max-w-[260px] -translate-x-1/2 rounded border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] font-normal leading-snug text-white shadow-lg group-hover/tip:block"
      >
        {label}
      </span>
    </span>
  );
}

// ── Skeleton ────────────────────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded bg-slate-200", className)} />;
}

export function LoadingBlock({ label = "Loading records…" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-10 text-[12.5px] text-slate-500">
      <Loader2 className="h-4 w-4 animate-spin text-slate-400" aria-hidden />
      {label}
    </div>
  );
}

// ── Toast host ──────────────────────────────────────────────────────────
const TOAST_TONE: Record<string, { cls: string; Icon: React.ComponentType<{ className?: string }> }> = {
  info: { cls: "border-slate-300 bg-white text-slate-800", Icon: Info },
  success: { cls: "border-emerald-300 bg-emerald-50 text-emerald-900", Icon: CheckCircle2 },
  warning: { cls: "border-amber-300 bg-amber-50 text-amber-900", Icon: FileWarning },
  critical: { cls: "border-red-300 bg-red-50 text-red-900", Icon: AlertTriangle },
};

export function ToastHost({ toasts, onDismiss }: { toasts: Array<{ id: string; title: string; detail?: string; tone: string }>; onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null;
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[1200] flex w-[340px] flex-col gap-2" role="status" aria-live="polite">
      {toasts.map((t) => {
        const cfg = TOAST_TONE[t.tone] ?? TOAST_TONE.info;
        return (
          <div key={t.id} className={cn("pointer-events-auto flex items-start gap-2.5 border p-3 shadow-lg", cfg.cls)}>
            <cfg.Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-semibold leading-snug">{t.title}</p>
              {t.detail && <p className="mt-0.5 text-[11px] leading-snug opacity-80">{t.detail}</p>}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(t.id)}
              aria-label="Dismiss notification"
              className="shrink-0 rounded p-0.5 opacity-50 hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ── Confirm dialog ──────────────────────────────────────────────────────
export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel,
  tone,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  tone: "primary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center bg-slate-900/40 p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="w-full max-w-md border border-slate-300 bg-white shadow-2xl">
        <div className="flex items-start gap-3 border-b border-slate-200 p-4">
          <AlertTriangle className={cn("mt-0.5 h-5 w-5 shrink-0", tone === "danger" ? "text-red-600" : "text-amber-600")} />
          <div>
            <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
            <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{body}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2 p-3">
          <button type="button" onClick={onCancel} className="border border-slate-300 px-3 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              "px-3 py-1.5 text-[12.5px] font-semibold text-white",
              tone === "danger" ? "bg-red-700 hover:bg-red-800" : "bg-[#0F2340] hover:bg-[#1A3560]",
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Progress bar ────────────────────────────────────────────────────────
export function Meter({ value, max, tone = "blue", label }: { value: number; max: number; tone?: PillTone; label?: string }) {
  const w = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const fill: Record<PillTone, string> = {
    slate: "bg-slate-500",
    blue: "bg-blue-600",
    amber: "bg-amber-500",
    green: "bg-emerald-600",
    red: "bg-red-700",
    violet: "bg-violet-600",
    teal: "bg-teal-600",
  };
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 min-w-[48px] flex-1 bg-slate-200" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
        <div className={cn("h-full", fill[tone])} style={{ width: `${w}%` }} />
      </div>
      {label && <span className="shrink-0 font-mono text-[11px] text-slate-600">{label}</span>}
    </div>
  );
}

// ── Stat strip ──────────────────────────────────────────────────────────
export function MoneyRow({ items }: { items: Array<{ label: string; value: number; tone?: "default" | "muted" | "due" }> }) {
  return (
    <div className="grid grid-cols-2 gap-px border border-slate-200 bg-slate-200 sm:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="bg-white px-3 py-2.5">
          <p className="text-[10.5px] font-medium uppercase tracking-wide text-slate-500">{it.label}</p>
          <p
            className={cn(
              "mt-0.5 font-mono text-[15px] font-semibold tabular-nums",
              it.tone === "due" ? "text-red-700" : it.tone === "muted" ? "text-slate-400" : "text-slate-900",
            )}
          >
            {inr(it.value)}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CountRow({ items }: { items: Array<{ label: string; value: number | string }> }) {
  return (
    <div className="grid grid-cols-2 gap-px border border-slate-200 bg-slate-200 sm:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="bg-white px-3 py-2.5">
          <p className="text-[10.5px] font-medium uppercase tracking-wide text-slate-500">{it.label}</p>
          <p className="mt-0.5 font-mono text-[15px] font-semibold tabular-nums text-slate-900">
            {typeof it.value === "number" ? num(it.value) : it.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export { Clock };
