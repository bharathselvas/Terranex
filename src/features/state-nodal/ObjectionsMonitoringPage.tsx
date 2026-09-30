import { MessageSquareWarning } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OBJECTIONS_DATA } from "@/features/state-nodal/stateNodalData";
import { formatDate } from "@/lib/format";

export function ObjectionsMonitoringPage() {
  const open = OBJECTIONS_DATA.filter((o) => o.status === "open").length;
  const underReview = OBJECTIONS_DATA.filter((o) => o.status === "under_review").length;
  const hearing = OBJECTIONS_DATA.filter((o) => o.status === "hearing").length;
  const resolved = OBJECTIONS_DATA.filter((o) => o.status === "resolved").length;
  const escalated = OBJECTIONS_DATA.filter((o) => o.status === "escalated").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquareWarning className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Objections Monitoring</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">State-wide objection status — monitor and escalate, do not adjudicate</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-[11px] text-amber-800">
        The State Nodal Officer monitors and can escalate objections. Objection adjudication is the authority of the District Collector / CALA.
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Open</p><p className="mt-1 text-xl font-bold text-blue-700">{open}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Under Review</p><p className="mt-1 text-xl font-bold text-amber-700">{underReview}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Hearing</p><p className="mt-1 text-xl font-bold text-violet-700">{hearing}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Resolved</p><p className="mt-1 text-xl font-bold text-emerald-700">{resolved}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Escalated</p><p className="mt-1 text-xl font-bold text-red-700">{escalated}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Case ID</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Project</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">District</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Category</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Filed</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Current Authority</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {OBJECTIONS_DATA.map((o) => (
                  <tr key={o.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-medium text-[#0F2340]">{o.id.toUpperCase()}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{o.projectName}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{o.district}</td>
                    <td className="px-4 py-2.5"><Badge variant="secondary" className="text-[9px] capitalize">{o.category}</Badge></td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{formatDate(o.filedDate)}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{o.currentAuthority}</td>
                    <td className="px-4 py-2.5 text-center">
                      <Badge className={`text-[9px] ${o.status === "resolved" ? "bg-emerald-100 text-emerald-800" : o.status === "escalated" ? "bg-red-100 text-red-800" : o.status === "hearing" ? "bg-violet-100 text-violet-800" : o.status === "under_review" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>{o.status.replace(/_/g, " ")}</Badge>
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
