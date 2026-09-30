import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  ArrowUpRight,
  AlertTriangle,
  MapPin,
  IndianRupee,
  Building2,
  Files,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MONITORING_PROJECTS } from "@/features/admin/adminData";
import { stageShortLabel, formatDate } from "@/lib/format";

const RISK_VARIANT: Record<string, "danger" | "warning" | "info" | "success" | "secondary"> = {
  critical: "danger",
  high: "warning",
  medium: "info",
  low: "secondary",
  on_track: "success",
};

const STATES = [...new Set(MONITORING_PROJECTS.map((p) => p.state))].sort();
const MINISTRIES = [...new Set(MONITORING_PROJECTS.map((p) => p.ministry))].sort();
const STAGE_OPTIONS = [...new Set(MONITORING_PROJECTS.map((p) => p.currentStage))];

export function NationalMonitoringPage() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [ministryFilter, setMinistryFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  const filtered = MONITORING_PROJECTS.filter((p) => {
    if (search && !p.projectName.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (stateFilter !== "all" && p.state !== stateFilter) return false;
    if (ministryFilter !== "all" && p.ministry !== ministryFilter) return false;
    if (stageFilter !== "all" && p.currentStage !== stageFilter) return false;
    if (riskFilter !== "all" && p.risk !== riskFilter) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">National Monitoring</h1>
          <p className="text-xs text-muted-foreground">Track all acquisition projects across states and ministries</p>
        </div>
        <Badge variant="secondary" className="text-[11px]">{filtered.length} projects</Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-[160px] h-9 text-sm">
                <SelectValue placeholder="State / UT" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {STATES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={ministryFilter} onValueChange={setMinistryFilter}>
              <SelectTrigger className="w-[180px] h-9 text-sm">
                <SelectValue placeholder="Ministry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ministries</SelectItem>
                {MINISTRIES.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-[160px] h-9 text-sm">
                <SelectValue placeholder="Current Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {STAGE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>{stageShortLabel(s)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[140px] h-9 text-sm">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="on_track">On Track</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Project ID</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Project Name</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Ministry</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">State</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">District</th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Parcels</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Stage</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Progress</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Risk</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Last Activity</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2.5">
                      <span className="gov-mono text-[#0F2340]">{p.id}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="font-medium text-slate-800 max-w-[250px] truncate">{p.projectName}</p>
                      <p className="text-[11px] text-muted-foreground">{p.implementingAgency}</p>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-700">{p.ministry}</td>
                    <td className="px-3 py-2.5 text-xs text-slate-700">{p.state}</td>
                    <td className="px-3 py-2.5 text-xs text-slate-700">{p.district}</td>
                    <td className="px-3 py-2.5 text-right text-xs font-medium text-slate-700">{p.parcels.toLocaleString("en-IN")}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant="secondary" className="text-[10px]">{stageShortLabel(p.currentStage)}</Badge>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0F2340] rounded-full" style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="text-[11px] text-muted-foreground">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <Badge variant={RISK_VARIANT[p.risk]} className="text-[10px] capitalize">
                        {p.risk === "on_track" ? "On Track" : p.risk}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5 text-[11px] text-muted-foreground">{formatDate(p.lastActivity)}</td>
                    <td className="px-3 py-2.5">
                      <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-[11px]">
                        <Link to={`/app/admin/projects/${p.id}`}>
                          View <ExternalLink className="h-3 w-3 ml-1" />
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
              No projects match the current filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
