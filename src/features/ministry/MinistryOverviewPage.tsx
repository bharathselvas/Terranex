import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  IndianRupee,
  Users2,
  AlertTriangle,
  ArrowUpRight,
  FileText,
  Clock3,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MINISTRY_KPIS,
  MINISTRY_PIPELINE,
  MINISTRY_RISK_PROJECTS,
  WORK_QUEUE,
  MINISTRY_PROFILE,
} from "@/features/ministry/ministryData";
import { STAGES } from "@/lib/stages";
import { stageShortLabel, stageGroupColor } from "@/lib/format";

const KPI_ICONS = [Building2, MapPin, MapPin, FileText, MapPin, IndianRupee, IndianRupee, Users2, Users2, AlertTriangle];

export function MinistryOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">
              {MINISTRY_PROFILE.name}
            </h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ministry Nodal Officer Dashboard — {MINISTRY_PROFILE.nodalOfficer}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Demo data — not actual Government of India figures
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/app/ministry/projects">
              View Projects <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/app/ministry/work-queue">
              Work Queue <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {MINISTRY_KPIS.map((kpi, i) => {
          const Icon = KPI_ICONS[i] ?? Building2;
          return (
            <Card key={kpi.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-medium text-muted-foreground">{kpi.label}</p>
                  <Icon className="h-4 w-4 text-slate-500" />
                </div>
                <p className="mt-1 text-xl font-bold text-[#0F2340]">{kpi.value}</p>
                <p className="text-[11px] text-muted-foreground">{kpi.subtext}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Ministry Acquisition Pipeline */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#0F2340]">MoRTH Acquisition Pipeline</h2>
              <p className="text-[11px] text-muted-foreground">
                Ministry projects/parcels distributed across the statutory lifecycle
              </p>
            </div>
            <Badge variant="secondary" className="text-[11px]">
              {MINISTRY_PIPELINE.reduce((sum, ps) => sum + ps.count, 0)} projects
            </Badge>
          </div>

          <div className="space-y-1.5">
            {MINISTRY_PIPELINE.map((ps) => {
              const stageMeta = STAGES.find((s) => s.id === ps.stage);
              const groupColor = stageGroupColor(stageMeta?.group ?? "initiation");
              return (
                <div key={ps.stage} className="flex items-center gap-2">
                  <span className="w-[120px] shrink-0 text-[11px] font-medium text-slate-700 truncate">
                    {stageShortLabel(ps.stage)}
                  </span>
                  <div className="flex-1 h-5 bg-slate-100 rounded-sm overflow-hidden relative">
                    <div
                      className={`h-full ${groupColor} rounded-sm transition-all`}
                      style={{ width: `${Math.max(ps.percentage * 2.5, 2)}%`, opacity: 0.85 }}
                    />
                  </div>
                  <span className="w-[40px] shrink-0 text-right text-[11px] font-medium text-slate-700">
                    {ps.count}
                  </span>
                  <span className="w-[40px] shrink-0 text-right text-[11px] text-muted-foreground">
                    {ps.percentage}%
                  </span>
                  {ps.risk === "high" && (
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" title="High risk" />
                  )}
                  {ps.risk === "medium" && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" title="Medium risk" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t">
            {[
              { label: "Initiation", color: "bg-slate-600" },
              { label: "Assessment", color: "bg-amber-600" },
              { label: "Notification", color: "bg-blue-600" },
              { label: "Adjudication", color: "bg-violet-600" },
              { label: "Settlement", color: "bg-emerald-600" },
              { label: "Closure", color: "bg-zinc-700" },
            ].map((g) => (
              <span key={g.label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className={`w-2.5 h-2.5 rounded-sm ${g.color}`} />
                {g.label}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick links grid */}
      <div className="grid gap-3 md:grid-cols-3">
        <Link to="/app/ministry/risk" className="group">
          <Card className="transition-colors hover:bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                  <AlertTriangle className="h-5 w-5 text-[#B42318]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0F2340]">Risk & Delay Monitor</p>
                  <p className="text-[11px] text-muted-foreground">
                    {MINISTRY_RISK_PROJECTS.length} projects requiring attention
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/app/ministry/work-queue" className="group">
          <Card className="transition-colors hover:bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <Clock3 className="h-5 w-5 text-amber-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0F2340]">Work Queue</p>
                  <p className="text-[11px] text-muted-foreground">
                    {WORK_QUEUE.length} actionable items
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/app/ministry/compensation" className="group">
          <Card className="transition-colors hover:bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0F2340]">Compensation Monitor</p>
                  <p className="text-[11px] text-muted-foreground">
                    78.8% disbursement rate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
