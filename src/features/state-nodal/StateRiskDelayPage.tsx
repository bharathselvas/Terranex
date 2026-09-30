import { AlertTriangle, Eye, MessageSquare, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RISK_DATA } from "@/features/state-nodal/stateNodalData";
import { stageShortLabel, formatDate } from "@/lib/format";

export function StateRiskDelayPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Risk & Delay Monitor</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">State-wide risk and delay identification across all projects</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Critical</p><p className="mt-1 text-xl font-bold text-red-700">{RISK_DATA.filter((r) => r.risk === "critical").length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">High</p><p className="mt-1 text-xl font-bold text-orange-700">{RISK_DATA.filter((r) => r.risk === "high").length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Medium</p><p className="mt-1 text-xl font-bold text-amber-700">{RISK_DATA.filter((r) => r.risk === "medium").length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Low</p><p className="mt-1 text-xl font-bold text-emerald-700">{RISK_DATA.filter((r) => r.risk === "low").length}</p></CardContent></Card>
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
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Days in Stage</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Reason</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Risk</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Last Activity</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {RISK_DATA.map((r) => (
                  <tr key={r.projectId} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-medium text-[#0F2340]">{r.projectName}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{r.district}</td>
                    <td className="px-4 py-2.5"><Badge variant="secondary" className="text-[9px]">{stageShortLabel(r.stage)}</Badge></td>
                    <td className="px-4 py-2.5 text-right font-medium text-[#0F2340]">{r.daysInStage}</td>
                    <td className="px-4 py-2.5 text-muted-foreground max-w-[200px] truncate">{r.reason}</td>
                    <td className="px-4 py-2.5 text-center">
                      <Badge className={`text-[9px] ${r.risk === "critical" ? "bg-red-100 text-red-800" : r.risk === "high" ? "bg-orange-100 text-orange-800" : r.risk === "medium" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>{r.risk}</Badge>
                    </td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{formatDate(r.lastActivity)}</td>
                    <td className="px-4 py-2.5 text-center">
                      <div className="flex gap-1 justify-center">
                        <Button size="sm" variant="outline" className="h-7 text-[10px]"><Eye className="h-3 w-3 mr-1" /> View</Button>
                        <Button size="sm" variant="outline" className="h-7 text-[10px]"><MessageSquare className="h-3 w-3 mr-1" /> Contact</Button>
                      </div>
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
