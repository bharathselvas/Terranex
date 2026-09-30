import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DISTRICT_REQUESTS } from "./tehsilSdoData";

const statusLabels: Record<string, string> = {
  pending: "Pending", accepted: "Accepted", in_progress: "In Progress", submitted: "Submitted", escalated: "Escalated",
};

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700", accepted: "bg-blue-100 text-blue-800",
  in_progress: "bg-amber-100 text-amber-800", submitted: "bg-emerald-100 text-emerald-800",
  escalated: "bg-red-100 text-red-800",
};

const priorityColor = (p: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[p] ?? "bg-gray-100 text-gray-700";
};

export default function TehsilDistrictRequestsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const req = DISTRICT_REQUESTS.find((r) => r.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">District Requests</h1>
        <p className="text-sm text-muted-foreground">Tasks assigned by District Collector / CALA</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Requests ({DISTRICT_REQUESTS.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {DISTRICT_REQUESTS.map((r) => (
                <button key={r.id} onClick={() => setSelected(r.id)} className={`w-full rounded-lg border p-3 text-left transition-colors ${selected === r.id ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{r.requestType}</p>
                    <Badge className={priorityColor(r.priority)}>{r.priority}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.parcelId} &middot; {r.village}</p>
                  <p className="text-[10px] text-muted-foreground">{r.projectName}</p>
                  <p className="mt-1 text-[10px] text-[#0F2340]">{r.description}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge className={statusColors[r.status]}>{statusLabels[r.status]}</Badge>
                    <span className="text-[10px] text-muted-foreground">Due: {r.dueDate}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Request Details</CardTitle></CardHeader>
          <CardContent>
            {req ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{req.requestType}</p>
                  <p className="text-xs text-muted-foreground">{req.parcelId} &middot; {req.village}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground">Project</p><p className="text-xs font-medium">{req.projectName}</p></div>
                  <div><p className="text-xs text-muted-foreground">Priority</p><Badge className={priorityColor(req.priority)}>{req.priority}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Status</p><Badge className={statusColors[req.status]}>{statusLabels[req.status]}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Due Date</p><p className="text-xs font-medium">{req.dueDate}</p></div>
                  <div><p className="text-xs text-muted-foreground">Assigned Officer</p><p className="text-xs font-medium">{req.assignedOfficer}</p></div>
                  <div className="col-span-2"><p className="text-xs text-muted-foreground">Description</p><p className="text-xs">{req.description}</p></div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Accept Request</button>
                  <button className="rounded-lg border border-[#0F2340] px-4 py-2 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5">Submit Evidence</button>
                  <button className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50">Escalate</button>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select a request</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
