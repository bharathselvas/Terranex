import { useState } from "react";
import { Link } from "react-router-dom";
import { Inbox, Search, Filter, ArrowUpRight, CheckCircle, XCircle, RefreshCw, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { INCOMING_PROJECTS } from "@/features/state-nodal/stateNodalData";
import { formatDate } from "@/lib/format";

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  under_review: "Under Review",
  clarification_required: "Clarification Required",
  accepted: "Accepted for Routing",
  routed: "Routed to District",
  returned: "Returned",
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  under_review: "bg-amber-100 text-amber-800",
  clarification_required: "bg-orange-100 text-orange-800",
  accepted: "bg-emerald-100 text-emerald-800",
  routed: "bg-violet-100 text-violet-800",
  returned: "bg-red-100 text-red-800",
};

export function IncomingProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = INCOMING_PROJECTS.filter((p) => {
    const matchSearch = !search || p.projectName.toLowerCase().includes(search.toLowerCase()) || p.implementingAgency.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Inbox className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Incoming Projects</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Projects submitted/routed from Ministry, RO/IA for state-level coordination</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-[11px] text-amber-800">
        State-level coordination review. Accept for routing, request clarification, or return for correction.
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border bg-white pl-9 pr-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-1">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {["all", "new", "under_review", "clarification_required", "accepted", "routed", "returned"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${statusFilter === s ? "bg-[#0F2340] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              {s === "all" ? "All" : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((project) => (
          <Card key={project.id} className="hover:bg-slate-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#0F2340]">{project.projectName}</h3>
                    <Badge className={`text-[9px] ${STATUS_COLORS[project.status]}`}>{STATUS_LABELS[project.status]}</Badge>
                    <Badge variant="secondary" className="text-[9px]">{project.priority}</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-1">
                    {project.ministry} · {project.implementingAgency} · {project.sector}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Districts: {project.districts.join(", ")} · {project.estimatedParcels.toLocaleString()} parcels · {project.estimatedAreaHa.toLocaleString()} Ha
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Submitted: {formatDate(project.submissionDate)}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/app/state-nodal/project-review/${project.id}`}>
                      <Eye className="h-4 w-4 mr-1" /> Review
                    </Link>
                  </Button>
                  {project.status === "new" && (
                    <>
                      <Button size="sm" variant="outline" className="text-emerald-700 border-emerald-200 hover:bg-emerald-50">
                        <CheckCircle className="h-4 w-4 mr-1" /> Accept
                      </Button>
                      <Button size="sm" variant="outline" className="text-amber-700 border-amber-200 hover:bg-amber-50">
                        <RefreshCw className="h-4 w-4 mr-1" /> Clarify
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
                        <XCircle className="h-4 w-4 mr-1" /> Return
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No incoming projects match your filters.</CardContent></Card>
        )}
      </div>
    </div>
  );
}
