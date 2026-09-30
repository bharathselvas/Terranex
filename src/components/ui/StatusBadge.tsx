import React from "react";

// ═══════════════════════════════════════════════════════════════════════
// StatusBadge — standardized status display across all roles
// ═══════════════════════════════════════════════════════════════════════

export type StatusVariant =
  | "completed"
  | "in_progress"
  | "pending"
  | "locked"
  | "restricted"
  | "at_risk"
  | "action_required"
  | "draft"
  | "submitted"
  | "approved"
  | "rejected"
  | "failed"
  | "returned"
  | "upheld"
  | "partially_upheld"
  | "not_applicable"
  | "available"
  | "scheduled"
  | "active"
  | "exempted"
  | "objected"
  | "delivered"
  | "not_delivered"
  | "escalated"
  | "resolved"
  | "overdue"
  | "on_track"
  | "initiated"
  | "verified"
  | "discrepancy"
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "info"
  | "success"
  | "warning"
  | "danger";

const VARIANT_STYLES: Record<StatusVariant, string> = {
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200",
  pending: "bg-slate-100 text-slate-700 border-slate-200",
  locked: "bg-slate-100 text-slate-500 border-slate-200",
  restricted: "bg-red-100 text-red-700 border-red-200",
  at_risk: "bg-amber-100 text-amber-800 border-amber-200",
  action_required: "bg-orange-100 text-orange-800 border-orange-200",
  draft: "bg-slate-100 text-slate-600 border-slate-200",
  submitted: "bg-blue-100 text-blue-800 border-blue-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  failed: "bg-red-100 text-red-800 border-red-200",
  returned: "bg-orange-100 text-orange-800 border-orange-200",
  upheld: "bg-emerald-100 text-emerald-800 border-emerald-200",
  partially_upheld: "bg-amber-100 text-amber-800 border-amber-200",
  not_applicable: "bg-slate-50 text-slate-400 border-slate-100",
  available: "bg-blue-100 text-blue-800 border-blue-200",
  scheduled: "bg-purple-100 text-purple-800 border-purple-200",
  active: "bg-blue-100 text-blue-800 border-blue-200",
  exempted: "bg-slate-100 text-slate-500 border-slate-200",
  objected: "bg-red-100 text-red-800 border-red-200",
  delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  not_delivered: "bg-amber-100 text-amber-800 border-amber-200",
  escalated: "bg-red-200 text-red-900 border-red-300",
  resolved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  overdue: "bg-red-100 text-red-800 border-red-200",
  on_track: "bg-blue-100 text-blue-800 border-blue-200",
  initiated: "bg-blue-100 text-blue-800 border-blue-200",
  verified: "bg-emerald-100 text-emerald-800 border-emerald-200",
  discrepancy: "bg-amber-100 text-amber-800 border-amber-200",
  critical: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  low: "bg-blue-100 text-blue-800 border-blue-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
  success: "bg-emerald-100 text-emerald-800 border-emerald-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  danger: "bg-red-100 text-red-800 border-red-200",
};

const VARIANT_ICONS: Record<StatusVariant, React.ReactNode> = {
  completed: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />,
  in_progress: <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />,
  pending: <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />,
  locked: <span className="text-[10px]">🔒</span>,
  restricted: <span className="text-[10px]">⛔</span>,
  at_risk: <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />,
  action_required: <span className="text-[10px]">!</span>,
  draft: <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />,
  submitted: <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />,
  approved: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />,
  rejected: <span className="w-1.5 h-1.5 rounded-full bg-red-500" />,
  failed: <span className="w-1.5 h-1.5 rounded-full bg-red-500" />,
  returned: <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />,
  upheld: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />,
  partially_upheld: <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />,
  not_applicable: <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />,
  available: <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />,
  scheduled: <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />,
  active: <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />,
  exempted: <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />,
  objected: <span className="w-1.5 h-1.5 rounded-full bg-red-500" />,
  delivered: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />,
  not_delivered: <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />,
  escalated: <span className="text-[10px]">↑</span>,
  resolved: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />,
  overdue: <span className="w-1.5 h-1.5 rounded-full bg-red-500" />,
  on_track: <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />,
  initiated: <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />,
  verified: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />,
  discrepancy: <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />,
  critical: <span className="w-1.5 h-1.5 rounded-full bg-red-500" />,
  high: <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />,
  medium: <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />,
  low: <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />,
  info: <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />,
  success: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />,
  warning: <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />,
  danger: <span className="w-1.5 h-1.5 rounded-full bg-red-500" />,
};

const LABEL_OVERRIDES: Partial<Record<StatusVariant, string>> = {
  in_progress: "In Progress",
  at_risk: "At Risk",
  action_required: "Action Required",
  not_applicable: "N/A",
  not_delivered: "Not Delivered",
  on_track: "On Track",
};

export function StatusBadge({
  status,
  label,
  size = "sm",
  className = "",
}: {
  status: StatusVariant;
  label?: string;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const displayLabel = label ?? LABEL_OVERRIDES[status] ?? status.replace(/_/g, " ");
  const sizeClasses = {
    xs: "text-[10px] px-1.5 py-0.5 gap-1",
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-2.5 py-1 gap-1.5",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border capitalize ${VARIANT_STYLES[status]} ${sizeClasses[size]} ${className}`}
    >
      {VARIANT_ICONS[status]}
      {displayLabel}
    </span>
  );
}
