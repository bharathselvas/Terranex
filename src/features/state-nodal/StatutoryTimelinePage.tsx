import { Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STATUTORY_TIMELINES } from "@/features/state-nodal/stateNodalData";
import { stageShortLabel, formatDate } from "@/lib/format";

const STATUS_LABELS: Record<string, string> = {
  on_track: "On Track",
  approaching_deadline: "Approaching Deadline",
  at_risk: "At Risk",
  overdue: "Overdue",
};

const STATUS_COLORS: Record<string, string> = {
  on_track: "bg-emerald-100 text-emerald-800",
  approaching_deadline: "bg-amber-100 text-amber-800",
  at_risk: "bg-orange-100 text-orange-800",
  overdue: "bg-red-100 text-red-800",
};

export function StatutoryTimelinePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Statutory Timeline Monitor</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Project timelines against expected statutory/process durations</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-[11px] text-blue-800">
        The system monitors timelines — it does not make legal decisions. Overdue items require district/authority action.
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">On Track</p><p className="mt-1 text-xl font-bold text-emerald-700">{STATUTORY_TIMELINES.filter((t) => t.status === "on_track").length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Approaching Deadline</p><p className="mt-1 text-xl font-bold text-amber-700">{STATUTORY_TIMELINES.filter((t) => t.status === "approaching_deadline").length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">At Risk</p><p className="mt-1 text-xl font-bold text-orange-700">{STATUTORY_TIMELINES.filter((t) => t.status === "at_risk").length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Overdue</p><p className="mt-1 text-xl font-bold text-red-700">{STATUTORY_TIMELINES.filter((t) => t.status === "overdue").length}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Project</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">District</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Stage</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Days Elapsed</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Expected</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Remaining</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {STATUTORY_TIMELINES.map((t) => (
                  <tr key={t.projectId} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-medium text-[#0F2340]">{t.projectName}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{t.district}</td>
                    <td className="px-4 py-2.5"><Badge variant="secondary" className="text-[9px]">{stageShortLabel(t.stage)}</Badge></td>
                    <td className="px-4 py-2.5 text-right font-medium text-[#0F2340]">{t.daysElapsed}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{t.expectedDuration} days</td>
                    <td className="px-4 py-2.5 text-right">
                      <span className={t.remaining <= 0 ? "text-red-700 font-medium" : t.remaining <= 10 ? "text-amber-700 font-medium" : "text-slate-700"}>
                        {t.remaining <= 0 ? `${Math.abs(t.remaining)} days overdue` : `${t.remaining} days`}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <Badge className={`text-[9px] ${STATUS_COLORS[t.status]}`}>{STATUS_LABELS[t.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
