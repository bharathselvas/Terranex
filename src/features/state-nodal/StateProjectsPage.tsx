import { useState } from "react";
import { Link } from "react-router-dom";
import { Files, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STATE_PROJECTS } from "@/features/state-nodal/stateNodalData";
import { stageShortLabel, formatDate } from "@/lib/format";

export function StateProjectsPage() {
  const [search, setSearch] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");

  const districts = Array.from(new Set(STATE_PROJECTS.map((p) => p.district)));
  const stages = Array.from(new Set(STATE_PROJECTS.map((p) => p.currentStage)));

  const filtered = STATE_PROJECTS.filter((p) => {
    const matchSearch = !search || p.projectName.toLowerCase().includes(search.toLowerCase());
    const matchDistrict = districtFilter === "all" || p.district === districtFilter;
    const matchStage = stageFilter === "all" || p.currentStage === stageFilter;
    return matchSearch && matchDistrict && matchStage;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Files className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">State Projects</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{STATE_PROJECTS.length} projects across Maharashtra</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-md border bg-white pl-9 pr-3 py-2 text-sm" />
        </div>
        <select value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)} className="rounded-md border bg-white px-3 py-2 text-[11px]">
          <option value="all">All Districts</option>
          {districts.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} className="rounded-md border bg-white px-3 py-2 text-[11px]">
          <option value="all">All Stages</option>
          {stages.map((s) => <option key={s} value={s}>{stageShortLabel(s)}</option>)}
        </select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Project</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">District</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Ministry</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Parcels</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Stage</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Progress</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Risk</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-2.5">
                      <Link to={`/app/state-nodal/project/${p.id}`} className="font-medium text-[#0F2340] hover:underline">{p.projectName}</Link>
                      <p className="text-[10px] text-muted-foreground">{p.implementingAgency}</p>
                    </td>
                    <td className="px-4 py-2.5 text-[#0F2340]">{p.district}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{p.ministry}</td>
                    <td className="px-4 py-2.5 text-right text-[#0F2340]">{p.parcels.toLocaleString()}</td>
                    <td className="px-4 py-2.5"><Badge variant="secondary" className="text-[9px]">{stageShortLabel(p.currentStage)}</Badge></td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1A3560] rounded-full" style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="text-[10px] font-medium">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <Badge className={`text-[9px] ${p.risk === "critical" ? "bg-red-100 text-red-800" : p.risk === "high" ? "bg-orange-100 text-orange-800" : p.risk === "medium" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>{p.risk}</Badge>
                    </td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{formatDate(p.lastActivity)}</td>
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
