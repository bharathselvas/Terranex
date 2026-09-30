import { useState } from "react";
import { ClipboardCheck, Search, Filter, AlertTriangle, Clock, Eye, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WORK_QUEUE } from "@/features/state-nodal/stateNodalData";
import { formatDate } from "@/lib/format";

const TYPE_LABELS: Record<string, string> = {
  incoming_project: "Incoming Project",
  clarification: "Clarification",
  district_status: "District Status",
  sia_update: "SIA Update",
  compensation: "Compensation",
  notification: "Notification",
  risk: "Risk",
  request: "Request",
};

export function StateWorkQueuePage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = WORK_QUEUE.filter((w) => {
    const matchSearch = !search || w.title.toLowerCase().includes(search.toLowerCase()) || w.project.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || w.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const pending = WORK_QUEUE.filter((w) => w.status === "pending").length;
  const overdue = WORK_QUEUE.filter((w) => w.status === "overdue").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">My Work Queue</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{pending} pending · {overdue} overdue</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search work items..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-md border bg-white pl-9 pr-3 py-2 text-sm" />
        </div>
        <div className="flex gap-1">
          {["all", "pending", "in_progress", "overdue", "completed"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${statusFilter === s ? "bg-[#0F2340] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {s === "all" ? "All" : s.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((w) => (
          <Card key={w.id} className={`hover:bg-slate-50 transition-colors ${w.status === "overdue" ? "border-l-2 border-l-red-500" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-[9px]">{TYPE_LABELS[w.type]}</Badge>
                    <Badge className={`text-[9px] ${w.priority === "critical" ? "bg-red-100 text-red-800" : w.priority === "high" ? "bg-orange-100 text-orange-800" : w.priority === "medium" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"}`}>{w.priority}</Badge>
                    {w.status === "overdue" && <Badge className="bg-red-100 text-red-800 text-[9px]"><AlertTriangle className="h-3 w-3 mr-0.5" /> Overdue</Badge>}
                  </div>
                  <p className="text-sm font-medium text-[#0F2340]">{w.title}</p>
                  <p className="text-[11px] text-muted-foreground">{w.description}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {w.project} · {w.district} · Due: {formatDate(w.dueDate)} · Assigned: {w.assignedTo}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="sm" variant="outline" className="h-7 text-[10px]"><Eye className="h-3 w-3 mr-1" /> View</Button>
                  <Button size="sm" variant="outline" className="h-7 text-[10px]"><MessageSquare className="h-3 w-3 mr-1" /> Respond</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
