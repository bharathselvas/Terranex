import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpRight, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MINISTRY_PROJECTS } from "@/features/ministry/ministryData";
import { stageLabel } from "@/lib/format";

const RISK_COLORS: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
  on_track: "bg-emerald-100 text-emerald-800",
};

export function MinistryProjectsPage() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  const states = [...new Set(MINISTRY_PROJECTS.map((p) => p.state))].sort();
  const risks = ["critical", "high", "medium", "low", "on_track"];

  const filtered = MINISTRY_PROJECTS.filter((p) => {
    const matchSearch = !search || p.projectName.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchState = stateFilter === "all" || p.state === stateFilter;
    const matchRisk = riskFilter === "all" || p.risk === riskFilter;
    return matchSearch && matchState && matchRisk;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">MoRTH Projects</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ministry projects under land acquisition monitoring
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="all">All States</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="all">All Risk Levels</option>
              {risks.map((r) => (
                <option key={r} value={r}>{r.replace("_", " ").toUpperCase()}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Projects table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Project ID</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Project Name</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Agency</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">State / District</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-700">Parcels</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Current Stage</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-700">Progress</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Risk</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">Budget (Cr)</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <tr key={project.id} className="border-b last:border-0 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{project.id}</td>
                    <td className="px-4 py-3 font-medium text-[#0F2340]">{project.projectName}</td>
                    <td className="px-4 py-3 text-slate-600">{project.implementingAgency}</td>
                    <td className="px-4 py-3 text-slate-600">{project.state} / {project.district}</td>
                    <td className="px-4 py-3 text-center">{project.parcels}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="text-[11px]">{stageLabel(project.currentStage)}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1A3560] rounded-full" style={{ width: `${project.progress}%` }} />
                        </div>
                        <span className="text-xs text-slate-600">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`text-[11px] ${RISK_COLORS[project.risk]}`}>
                        {project.risk.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">₹ {project.budgetCr.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <Button asChild variant="ghost" size="sm">
                        <Link to={`/app/ministry/project/${project.id}`}>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No projects match your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
