import { useState } from "react";
import { ScrollText, Search, Eye, Reply, Forward, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STATE_REQUESTS } from "@/features/state-nodal/stateNodalData";
import { formatDate } from "@/lib/format";

const TYPE_LABELS: Record<string, string> = {
  project_information: "Project Information",
  district_status: "District Status",
  parcel_clarification: "Parcel Clarification",
  document_request: "Document Request",
  timeline_update: "Timeline Update",
  sia_update: "SIA Update",
  compensation_update: "Compensation Update",
  possession_update: "Possession Update",
  rnr_update: "R&R Update",
};

export function RequestsClarificationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = STATE_REQUESTS.filter((r) => {
    const matchSearch = !search || r.project.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Requests & Clarifications</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Coordination requests between State, Districts, RO/IA, and Ministry</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search requests..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-md border bg-white pl-9 pr-3 py-2 text-sm" />
        </div>
        <div className="flex gap-1">
          {["all", "pending", "in_progress", "completed", "overdue"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${statusFilter === s ? "bg-[#0F2340] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {s === "all" ? "All" : s.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((r) => (
          <Card key={r.id} className="hover:bg-slate-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-[9px]">{TYPE_LABELS[r.type]}</Badge>
                    <Badge className={`text-[9px] ${r.priority === "critical" ? "bg-red-100 text-red-800" : r.priority === "high" ? "bg-orange-100 text-orange-800" : r.priority === "medium" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"}`}>{r.priority}</Badge>
                  </div>
                  <p className="text-sm font-medium text-[#0F2340]">{r.description}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    From: {r.from} → To: {r.to} · {r.project} · {r.district}
                  </p>
                  <p className="text-[11px] text-muted-foreground">Created: {formatDate(r.createdDate)} · Due: {formatDate(r.dueDate)}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge className={`text-[9px] ${r.status === "completed" ? "bg-emerald-100 text-emerald-800" : r.status === "overdue" ? "bg-red-100 text-red-800" : r.status === "in_progress" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"}`}>{r.status.replace(/_/g, " ")}</Badge>
                  <div className="flex gap-1 mt-1">
                    <Button size="sm" variant="outline" className="h-7 text-[10px]"><Eye className="h-3 w-3 mr-1" /> View</Button>
                    <Button size="sm" variant="outline" className="h-7 text-[10px]"><Reply className="h-3 w-3 mr-1" /> Respond</Button>
                    <Button size="sm" variant="outline" className="h-7 text-[10px]"><Forward className="h-3 w-3 mr-1" /> Forward</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
