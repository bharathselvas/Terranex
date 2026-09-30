import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ExternalLink,
  Clock3,
  TrendingUp,
  Shield,
  AlertOctagon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RISK_PROJECTS } from "@/features/admin/adminData";
import { stageShortLabel, formatDate } from "@/lib/format";

export function RiskDelayMonitorPage() {
  const [severityFilter, setSeverityFilter] = useState<"all" | "critical" | "high">("all");

  const filtered = RISK_PROJECTS.filter((p) => {
    if (severityFilter !== "all" && p.risk !== severityFilter) return false;
    return true;
  });

  const criticalCount = RISK_PROJECTS.filter((p) => p.risk === "critical").length;
  const highCount = RISK_PROJECTS.filter((p) => p.risk === "high").length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Risk & Delay Monitor</h1>
          <p className="text-xs text-muted-foreground">Projects exceeding or approaching statutory timelines</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#B42318]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Critical</p>
              <AlertOctagon className="h-4 w-4 text-[#B42318]" />
            </div>
            <p className="mt-1 text-2xl font-bold text-[#B42318]">{criticalCount}</p>
            <p className="text-[11px] text-muted-foreground">Immediate action required</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">High Risk</p>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <p className="mt-1 text-2xl font-bold text-amber-600">{highCount}</p>
            <p className="text-[11px] text-muted-foreground">Nearing timeline breach</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Total At Risk</p>
              <Shield className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="mt-1 text-2xl font-bold text-[#0F2340]">{RISK_PROJECTS.length}</p>
            <p className="text-[11px] text-muted-foreground">Projects under monitoring</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-slate-400">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Avg. Days Over</p>
              <Clock3 className="h-4 w-4 text-slate-500" />
            </div>
            <p className="mt-1 text-2xl font-bold text-[#0F2340]">
              {Math.round(RISK_PROJECTS.reduce((s, p) => s + (p.daysInStage - p.expectedDuration), 0) / RISK_PROJECTS.length)}d
            </p>
            <p className="text-[11px] text-muted-foreground">Beyond expected duration</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "critical", "high"] as const).map((f) => (
          <Button
            key={f}
            variant={severityFilter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setSeverityFilter(f)}
            className="h-8 text-xs"
          >
            {f === "all" ? "All" : f === "critical" ? `Critical (${criticalCount})` : `High (${highCount})`}
          </Button>
        ))}
      </div>

      {/* Risk Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Project</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">State</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">District</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Stage</th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Days in Stage</th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Expected</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Risk</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Reason</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-3 py-2.5">
                      <p className="font-medium text-slate-800">{p.projectName}</p>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-700">{p.state}</td>
                    <td className="px-3 py-2.5 text-xs text-slate-700">{p.district}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant="secondary" className="text-[10px]">{stageShortLabel(p.currentStage)}</Badge>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <span className={`text-xs font-semibold ${p.daysInStage > p.expectedDuration ? "text-[#B42318]" : "text-slate-700"}`}>
                        {p.daysInStage}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right text-xs text-muted-foreground">{p.expectedDuration}d</td>
                    <td className="px-3 py-2.5">
                      <Badge variant={p.risk === "critical" ? "danger" : "warning"} className="text-[10px] capitalize">
                        {p.risk}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-600 max-w-[300px]">
                      <p className="line-clamp-2">{p.reason}</p>
                    </td>
                    <td className="px-3 py-2.5 text-[11px] text-muted-foreground">{formatDate(p.lastActivity)}</td>
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
