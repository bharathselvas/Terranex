import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WORK_QUEUE } from "./tehsilSdoData";

const riskColor = (r: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[r] ?? "bg-gray-100 text-gray-700";
};

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700", in_progress: "bg-blue-100 text-blue-800",
  submitted: "bg-amber-100 text-amber-800", overdue: "bg-red-100 text-red-800",
};

export default function TehsilTimelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Tehsil Timeline</h1>
        <p className="text-sm text-muted-foreground">Local operational timelines — task deadlines and SLA tracking</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><p className="text-2xl font-bold text-emerald-700">{WORK_QUEUE.filter((wq) => wq.ageDays < 10).length}</p><p className="text-xs text-muted-foreground">On Track</p></div>
            <div><p className="text-2xl font-bold text-amber-700">{WORK_QUEUE.filter((wq) => wq.ageDays >= 10 && wq.ageDays < 20).length}</p><p className="text-xs text-muted-foreground">Approaching</p></div>
            <div><p className="text-2xl font-bold text-red-700">{WORK_QUEUE.filter((wq) => wq.ageDays >= 20 || wq.status === "overdue").length}</p><p className="text-xs text-muted-foreground">Overdue</p></div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Tasks by Age</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {WORK_QUEUE.sort((a, b) => b.ageDays - a.ageDays).map((wq) => (
              <div key={wq.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{wq.parcelId}</p>
                  <p className="text-xs text-muted-foreground">{wq.projectName} &middot; {wq.parcelVillage}</p>
                  <p className="text-[10px] text-muted-foreground">{wq.task}</p>
                </div>
                <div className="ml-4 flex flex-col items-end gap-1">
                  <Badge className={riskColor(wq.priority)}>{wq.priority}</Badge>
                  <Badge className={statusColors[wq.status]}>{wq.status}</Badge>
                  <div className="mt-1 h-1.5 w-16 rounded-full bg-gray-200">
                    <div className={`h-1.5 rounded-full ${wq.ageDays >= 20 ? "bg-red-500" : wq.ageDays >= 10 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${Math.min(100, (wq.ageDays / 20) * 100)}%` }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground">{wq.ageDays}d</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
