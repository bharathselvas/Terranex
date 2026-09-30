import { Users, AlertTriangle, Eye, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SIA_DATA } from "@/features/state-nodal/stateNodalData";

export function SiaMonitoringPage() {
  const inProgress = SIA_DATA.filter((s) => s.status === "in_progress").length;
  const completed = SIA_DATA.filter((s) => s.status === "completed").length;
  const delayed = SIA_DATA.filter((s) => s.status === "delayed").length;
  const pending = SIA_DATA.filter((s) => s.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">SIA Monitoring</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Social Impact Assessment status across state projects</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-[11px] text-blue-800">
        The State Nodal Officer monitors SIA activity. SIA completion requires the authorized SIA authority — you cannot approve/fabricate SIA completion.
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Requiring SIA</p><p className="mt-1 text-xl font-bold text-[#0F2340]">{SIA_DATA.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">In Progress</p><p className="mt-1 text-xl font-bold text-blue-700">{inProgress}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Completed</p><p className="mt-1 text-xl font-bold text-emerald-700">{completed}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Delayed</p><p className="mt-1 text-xl font-bold text-red-700">{delayed}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Project</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">District</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">SIA Authority</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Families</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Report</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Risk</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {SIA_DATA.map((s) => (
                  <tr key={s.projectId} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-medium text-[#0F2340]">{s.projectName}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{s.district}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{s.siaAuthority}</td>
                    <td className="px-4 py-2.5 text-right text-[#0F2340]">{s.affectedFamilies.toLocaleString()}</td>
                    <td className="px-4 py-2.5"><Badge variant="secondary" className="text-[9px]">{s.reportStatus.replace(/_/g, " ")}</Badge></td>
                    <td className="px-4 py-2.5 text-center">
                      <Badge className={`text-[9px] ${s.status === "completed" ? "bg-emerald-100 text-emerald-800" : s.status === "delayed" ? "bg-red-100 text-red-800" : s.status === "in_progress" ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-700"}`}>{s.status.replace(/_/g, " ")}</Badge>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <Badge className={`text-[9px] ${s.risk === "critical" ? "bg-red-100 text-red-800" : s.risk === "high" ? "bg-orange-100 text-orange-800" : "bg-slate-100 text-slate-700"}`}>{s.risk}</Badge>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <div className="flex gap-1 justify-center">
                        <Button size="sm" variant="outline" className="h-7 text-[10px]"><Eye className="h-3 w-3 mr-1" /> View</Button>
                        <Button size="sm" variant="outline" className="h-7 text-[10px]"><RefreshCw className="h-3 w-3 mr-1" /> Update</Button>
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
