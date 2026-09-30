import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { WORK_QUEUE } from "./tehsilSdoData";

const riskColor = (r: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[r] ?? "bg-gray-100 text-gray-700";
};

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700", in_progress: "bg-blue-100 text-blue-800",
  submitted: "bg-amber-100 text-amber-800", overdue: "bg-red-100 text-red-800",
};

export default function TehsilCriticalCasesPage() {
  const critical = WORK_QUEUE.filter((wq) => wq.priority === "critical" || wq.status === "overdue");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Critical Cases</h1>
        <p className="text-sm text-muted-foreground">Cases requiring immediate attention — overdue or critical priority</p>
      </div>

      <Card className="border-red-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-red-800">Critical &amp; Overdue ({critical.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {critical.map((wq) => (
              <div key={wq.id} className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50/50 p-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{wq.projectName}</p>
                  <p className="text-xs text-muted-foreground">{wq.parcelId} &middot; {wq.parcelVillage}</p>
                  <p className="mt-1 text-xs text-red-700">{wq.task}</p>
                  <p className="text-[10px] text-muted-foreground">Officer: {wq.assignedOfficer} &middot; {wq.ageDays}d age</p>
                </div>
                <div className="ml-4 flex flex-col items-end gap-1">
                  <Badge className={riskColor(wq.priority)}>{wq.priority}</Badge>
                  <Badge className={statusColors[wq.status]}>{wq.status}</Badge>
                </div>
              </div>
            ))}
            {critical.length === 0 && <p className="text-sm text-muted-foreground">No critical cases.</p>}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Link to="/app/tehsil/work-queue" className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">View Full Work Queue</Link>
      </div>
    </div>
  );
}
