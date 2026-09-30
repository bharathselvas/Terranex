import { Link } from "react-router-dom";
import { LayoutDashboard, MapPin, IndianRupee, TrendingUp, AlertTriangle, ArrowUpRight, Users, Building2, ChevronRight, ClipboardCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STATE_PROFILE, DASHBOARD_KPIS, STATE_PIPELINE } from "@/features/state-nodal/stateNodalData";
import { STAGES } from "@/lib/stages";
import { stageShortLabel, stageGroupColor } from "@/lib/format";

export function StateOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">State Acquisition Overview</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Monitor and coordinate land acquisition across {STATE_PROFILE.name}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{STATE_PROFILE.nodalOfficer} · {STATE_PROFILE.designation}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <Link to="/app/state-nodal/projects">View Projects <ArrowUpRight className="h-4 w-4 ml-1" /></Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/app/state-nodal/work-queue">Work Queue <ClipboardCheck className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-[11px] text-amber-800">
        State-level coordination review only. Statutory actions require District Collector / CALA authority.
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {DASHBOARD_KPIS.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium text-muted-foreground">{kpi.label}</p>
                <MapPin className="h-4 w-4 text-slate-400" />
              </div>
              <p className={`mt-1 text-xl font-bold ${kpi.color ?? "text-[#0F2340]"}`}>{kpi.value}</p>
              <p className="text-[11px] text-muted-foreground">{kpi.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="text-sm font-semibold text-[#0F2340] mb-4">Acquisition Pipeline</h2>
          <div className="space-y-1.5">
            {STATE_PIPELINE.filter((s) => s.count > 0).map((s) => {
              const stageMeta = STAGES.find((st) => st.id === s.stage);
              const groupColor = stageGroupColor(stageMeta?.group ?? "initiation");
              return (
                <div key={s.stage} className="flex items-center gap-2">
                  <span className="w-[120px] shrink-0 text-[11px] font-medium text-slate-700 truncate">
                    {stageShortLabel(s.stage)}
                  </span>
                  <div className="flex-1 h-5 bg-slate-100 rounded-sm overflow-hidden">
                    <div className={`h-full ${groupColor} rounded-sm`} style={{ width: `${Math.max(s.percentage * 2, 2)}%` }} />
                  </div>
                  <span className="w-[24px] shrink-0 text-right text-[11px] font-medium text-slate-700">{s.count}</span>
                  <span className="w-[50px] shrink-0 text-right text-[10px] text-muted-foreground">{s.parcels.toLocaleString()}p</span>
                  {s.delayed > 0 && (
                    <Badge className="bg-red-100 text-red-800 text-[9px] shrink-0">{s.delayed} delayed</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Link to="/app/state-nodal/risk" className="group">
          <Card className="hover:bg-slate-50 transition-colors h-full">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0F2340]">Risk & Delays</p>
                  <p className="text-[11px] text-muted-foreground">3 critical / high risk projects</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 ml-auto group-hover:text-slate-600" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/app/state-nodal/work-queue" className="group">
          <Card className="hover:bg-slate-50 transition-colors h-full">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 shrink-0">
                  <ClipboardCheck className="h-5 w-5 text-amber-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0F2340]">Work Queue</p>
                  <p className="text-[11px] text-muted-foreground">5 pending items · 1 overdue</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 ml-auto group-hover:text-slate-600" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/app/state-nodal/compensation" className="group">
          <Card className="hover:bg-slate-50 transition-colors h-full">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 shrink-0">
                  <IndianRupee className="h-5 w-5 text-emerald-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0F2340]">Compensation</p>
                  <p className="text-[11px] text-muted-foreground">₹1,104 Cr disbursed of ₹1,482 Cr</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 ml-auto group-hover:text-slate-600" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
