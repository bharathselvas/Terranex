import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  DASHBOARD_KPIS,
  WORK_QUEUE,
  DISTRICT_PROJECTS,
  TEHSILS,
  FIELD_OFFICERS,
  GRIEVANCES,
  STATUTORY_TIMELINES,
  DISTRICT_NOTIFICATIONS,
  DISTRICT_PROFILE,
} from "./districtCollectorData";

const riskColor = (risk: string) => {
  const m: Record<string, string> = {
    critical: "bg-red-100 text-red-800",
    high: "bg-orange-100 text-orange-800",
    medium: "bg-amber-100 text-amber-800",
    low: "bg-emerald-100 text-emerald-800",
    on_track: "bg-blue-100 text-blue-800",
  };
  return m[risk] ?? "bg-gray-100 text-gray-700";
};

const stageShort = (s: string) => {
  const m: Record<string, string> = {
    project_proposal: "Proposal",
    land_requirement: "Land Req",
    gis_identification: "GIS ID",
    submission: "Submission",
    scrutiny: "Scrutiny",
    sia: "SIA",
    preliminary_notification: "Prelim Ntf",
    public_disclosure: "Disclosure",
    objections_hearing: "Objections",
    declaration: "Declaration",
    field_verification: "FV",
    compensation: "Compensation",
    award: "Award",
    payment: "Payment",
    possession: "Possession",
    r_and_r: "R&R",
    closed: "Closed",
  };
  return m[s] ?? s;
};

export default function CommandCentrePage() {
  const criticalQueue = WORK_QUEUE.filter((wq) => wq.category === "requires_decision" || wq.category === "escalated");
  const overdueTimelines = STATUTORY_TIMELINES.filter((t) => t.status === "overdue" || t.status === "approaching_deadline");
  const activeProjects = DISTRICT_PROJECTS.filter((p) => p.status === "active");
  const unreadNotifs = DISTRICT_NOTIFICATIONS.filter((n) => !n.read);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]">Command Centre</h1>
          <p className="text-sm text-muted-foreground">{DISTRICT_PROFILE.name} District &middot; {DISTRICT_PROFILE.collector}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/app/collector/notifications" className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">
            Notifications {unreadNotifs.length > 0 && <Badge className="ml-1 bg-red-500">{unreadNotifs.length}</Badge>}
          </Link>
          <Link to="/app/collector/reports" className="rounded-lg border border-[#0F2340] px-4 py-2 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5">
            Reports
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {DASHBOARD_KPIS.map((kpi) => (
          <Card key={kpi.label} className="shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-xl font-bold ${kpi.color ?? ""}`}>{kpi.value}</div>
              <p className="text-[10px] text-muted-foreground">{kpi.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Active Projects ({activeProjects.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activeProjects.slice(0, 6).map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded border p-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">{p.projectName}</p>
                    <p className="text-[10px] text-muted-foreground">{p.parcels} parcels &middot; {stageShort(p.currentStage)}</p>
                  </div>
                  <Badge className={riskColor(p.risk)}>{p.risk}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Requires Decision ({criticalQueue.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criticalQueue.map((wq) => (
                <div key={wq.id} className="rounded border border-orange-200 bg-orange-50/50 p-2">
                  <p className="text-xs font-medium">{wq.projectName}</p>
                  <p className="text-[10px] text-muted-foreground">{wq.parcelId} &middot; {wq.parcelVillage}</p>
                  <p className="mt-1 text-[10px] text-orange-700">{wq.requiredAction}</p>
                </div>
              ))}
              {criticalQueue.length === 0 && <p className="text-xs text-muted-foreground">No critical items.</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Statutory Timelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {overdueTimelines.map((t) => (
                <div key={t.projectId} className="flex items-center justify-between rounded border p-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">{t.projectName}</p>
                    <p className="text-[10px] text-muted-foreground">{stageShort(t.stage)} &middot; {t.daysElapsed}d / {t.expectedDuration}d</p>
                  </div>
                  <Badge className={riskColor(t.status === "overdue" ? "critical" : "high")}>
                    {t.remaining > 0 ? `${t.remaining}d left` : `${Math.abs(t.remaining)}d overdue`}
                  </Badge>
                </div>
              ))}
              {overdueTimelines.length === 0 && <p className="text-xs text-muted-foreground">All timelines on track.</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Tehsil Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {TEHSILS.map((t) => (
                <div key={t.name} className="flex items-center justify-between rounded border p-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">{t.sdo} &middot; {t.activeCases} cases</p>
                  </div>
                  <Badge className={riskColor(t.risk)}>{t.risk}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Field Officers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {FIELD_OFFICERS.map((fo) => (
                <div key={fo.name} className="flex items-center justify-between rounded border p-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium">{fo.name}</p>
                    <p className="text-[10px] text-muted-foreground">{fo.tehsil} &middot; {fo.assignedCases} assigned</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-emerald-700">{fo.completed} done</p>
                    {fo.overdue > 0 && <p className="text-[10px] text-red-700">{fo.overdue} overdue</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Grievances &amp; Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {GRIEVANCES.filter((g) => g.status !== "resolved").slice(0, 5).map((g) => (
                <div key={g.id} className="flex items-center justify-between rounded border p-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium">{g.id} &middot; {g.category}</p>
                    <p className="text-[10px] text-muted-foreground">{g.projectName}</p>
                  </div>
                  <Badge className={riskColor(g.priority)}>{g.priority}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
