import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════
// MetricCard — compact KPI card for dashboards
// ═══════════════════════════════════════════════════════════════════════

export function MetricCard({
  label,
  value,
  icon,
  color = "slate",
  className,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: "slate" | "blue" | "emerald" | "amber" | "red" | "purple" | "rose" | "orange" | "indigo";
  className?: string;
}) {
  const colors: Record<string, string> = {
    slate: "border-l-slate-400",
    blue: "border-l-blue-500",
    emerald: "border-l-emerald-500",
    amber: "border-l-amber-500",
    red: "border-l-red-500",
    purple: "border-l-purple-500",
    rose: "border-l-rose-500",
    orange: "border-l-orange-500",
    indigo: "border-l-indigo-500",
  };

  const iconColors: Record<string, string> = {
    slate: "text-slate-400",
    blue: "text-blue-500",
    emerald: "text-emerald-500",
    amber: "text-amber-500",
    red: "text-red-500",
    purple: "text-purple-500",
    rose: "text-rose-500",
    orange: "text-orange-500",
    indigo: "text-indigo-500",
  };

  return (
    <div className={cn(`border-l-4 bg-white rounded-lg p-3 shadow-sm`, colors[color], className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wide font-medium">{label}</p>
          <p className="text-lg font-bold text-[#0F2340] mt-0.5">{value}</p>
        </div>
        {icon && <div className={iconColors[color]}>{icon}</div>}
      </div>
    </div>
  );
}
