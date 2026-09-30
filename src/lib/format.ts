import type { LifecycleStage } from "@/types/domain";
import { STAGE_BY_ID } from "@/lib/stages";

const INR_FMT = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

export function formatINR(amount: number): string {
  if (amount >= 1e7) return `₹ ${(amount / 1e7).toFixed(2)} Cr`;
  if (amount >= 1e5) return `₹ ${(amount / 1e5).toFixed(2)} Lakh`;
  return `₹ ${INR_FMT.format(amount)}`;
}

export function formatINRCompact(amount: number): string {
  if (amount >= 1e7) return `₹${(amount / 1e7).toFixed(2)}Cr`;
  if (amount >= 1e5) return `₹${(amount / 1e5).toFixed(2)}L`;
  return `₹${INR_FMT.format(amount)}`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function maskAadhaar(masked: string): string {
  return masked;
}

export function stageLabel(id: LifecycleStage): string {
  return STAGE_BY_ID[id]?.label ?? id;
}

export function stageShortLabel(id: LifecycleStage): string {
  return STAGE_BY_ID[id]?.shortLabel ?? id;
}

export function stageGroupColor(group: string): string {
  const map: Record<string, string> = {
    initiation: "bg-slate-600",
    assessment: "bg-amber-600",
    notification: "bg-blue-600",
    adjudication: "bg-violet-600",
    settlement: "bg-emerald-600",
    closure: "bg-zinc-700",
  };
  return map[group] ?? "bg-slate-500";
}

export function slaBadge(slaStatus: string | null): { label: string; variant: "success" | "warning" | "danger" | "muted" | "info" } {
  switch (slaStatus) {
    case "overdue":
      return { label: "SLA Overdue", variant: "danger" };
    case "due_soon":
      return { label: "Due Soon", variant: "warning" };
    case "on_track":
      return { label: "On Track", variant: "success" };
    default:
      return { label: "—", variant: "muted" };
  }
}

export function stageColor(stageId: LifecycleStage): string {
  const meta = STAGE_BY_ID[stageId];
  if (!meta) return "bg-slate-500";
  return stageGroupColor(meta.group);
}

export function daysUntil(iso: string | null): number | null {
  if (!iso) return null;
  const d = new Date(iso).getTime() - Date.now();
  return Math.ceil(d / 86400000);
}
