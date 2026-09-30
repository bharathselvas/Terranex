import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { POSSESSION_DATA } from "@/features/state-nodal/stateNodalData";

export function StatePossessionPage() {
  const totalEligible = POSSESSION_DATA.reduce((s, d) => s + d.eligible, 0);
  const totalCompleted = POSSESSION_DATA.reduce((s, d) => s + d.completed, 0);
  const totalPending = POSSESSION_DATA.reduce((s, d) => s + d.pending, 0);
  const totalDisputed = POSSESSION_DATA.reduce((s, d) => s + d.disputed, 0);
  const pct = totalEligible > 0 ? Math.round((totalCompleted / totalEligible) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Possession Monitoring</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">State-wide possession completion status</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-[11px] text-blue-800">
        Possession is recorded by the Field Officer / VAO. The State Nodal Officer monitors completion status only.
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Eligible Parcels</p><p className="mt-1 text-xl font-bold text-[#0F2340]">{totalEligible.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Completed</p><p className="mt-1 text-xl font-bold text-emerald-700">{totalCompleted.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Pending</p><p className="mt-1 text-xl font-bold text-amber-700">{totalPending.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Disputed</p><p className="mt-1 text-xl font-bold text-red-700">{totalDisputed.toLocaleString()}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">District</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Project</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Eligible</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Completed</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Pending</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Disputed</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Progress</th>
                </tr>
              </thead>
              <tbody>
                {POSSESSION_DATA.map((d) => {
                  const rowPct = d.eligible > 0 ? Math.round((d.completed / d.eligible) * 100) : 0;
                  return (
                    <tr key={`${d.district}-${d.project}`} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-medium text-[#0F2340]">{d.district}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{d.project}</td>
                      <td className="px-4 py-2.5 text-right text-[#0F2340]">{d.eligible}</td>
                      <td className="px-4 py-2.5 text-right text-emerald-700 font-medium">{d.completed}</td>
                      <td className="px-4 py-2.5 text-right text-amber-700 font-medium">{d.pending}</td>
                      <td className="px-4 py-2.5 text-right">
                        {d.disputed > 0 ? <span className="text-red-700 font-medium">{d.disputed}</span> : <span className="text-muted-foreground">0</span>}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${rowPct}%` }} />
                          </div>
                          <span className="text-[10px] font-medium">{rowPct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
