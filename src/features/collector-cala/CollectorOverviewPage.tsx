import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  DASHBOARD_KPIS,
  WORK_QUEUE,
  DISTRICT_PROJECTS,
  GRIEVANCES,
  DISTRICT_NOTIFICATIONS,
  STATUTORY_TIMELINES,
  DISTRICT_PROFILE,
} from "./districtCollectorData";
import { ProjectContextHeader } from "@/features/demo/ProjectContextHeader";
import { LifecycleStepper } from "@/features/demo/LifecycleStepper";

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

export default function CollectorOverviewPage() {
  const kpis = DASHBOARD_KPIS.slice(0, 4);
  const overdueTimelines = STATUTORY_TIMELINES.filter((t) => t.status === "overdue" || t.status === "approaching_deadline");
  const openGrievances = GRIEVANCES.filter((g) => g.status !== "resolved");
  const unreadNotifs = DISTRICT_NOTIFICATIONS.filter((n) => !n.read);
  const criticalQueue = WORK_QUEUE.filter((wq) => wq.risk === "critical").slice(0, 3);
  const activeProjects = DISTRICT_PROJECTS.filter((p) => p.status === "active").slice(0, 4);

  return (
    <div className="space-y-6">
      <ProjectContextHeader />
      <LifecycleStepper />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]">District Collector Dashboard</h1>
          <p className="text-sm text-muted-foreground">{DISTRICT_PROFILE.name} District &middot; {DISTRICT_PROFILE.designation}</p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/app/collector/notifications"
            className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]"
          >
            Notifications {unreadNotifs.length > 0 && <Badge className="ml-1 bg-red-500">{unreadNotifs.length}</Badge>}
          </Link>
          <Link
            to="/app/collector/work-queue"
            className="rounded-lg border border-[#0F2340] px-4 py-2 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5"
          >
            View Queue
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${kpi.color ?? ""}`}>{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {criticalQueue.length > 0 && (
        <Card className="border-red-200 bg-red-50/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-red-800">Critical Items Requiring Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criticalQueue.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-red-200 bg-white p-3">
                  <div>
                    <p className="text-sm font-medium">{item.projectName}</p>
                    <p className="text-xs text-muted-foreground">{item.parcelId} &middot; {item.parcelVillage}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={riskColor(item.risk)}>{item.risk}</Badge>
                    <p className="mt-1 text-xs text-muted-foreground">{item.requiredAction}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeProjects.map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{p.projectName}</p>
                    <p className="text-xs text-muted-foreground">{p.parcels} parcels &middot; {p.areaHa.toLocaleString()} ha</p>
                  </div>
                  <Badge className={riskColor(p.risk)}>{p.risk}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Statutory Timelines at Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueTimelines.map((t) => (
                <div key={t.projectId} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{t.projectName}</p>
                    <p className="text-xs text-muted-foreground">{t.stage} &middot; {t.daysElapsed}d elapsed</p>
                  </div>
                  <Badge className={riskColor(t.status === "overdue" ? "critical" : "high")}>
                    {t.remaining > 0 ? `${t.remaining}d left` : `${Math.abs(t.remaining)}d overdue`}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Open Grievances</CardTitle>
          </CardHeader>
          <CardContent>
            {openGrievances.length === 0 ? (
              <p className="text-sm text-muted-foreground">No open grievances.</p>
            ) : (
              <div className="space-y-2">
                {openGrievances.slice(0, 4).map((g) => (
                  <div key={g.id} className="flex items-center justify-between rounded border p-2">
                    <div>
                      <p className="text-xs font-medium">{g.id} &middot; {g.category}</p>
                      <p className="text-xs text-muted-foreground">{g.projectName}</p>
                    </div>
                    <Badge className={riskColor(g.priority)}>{g.priority}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Unread Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {unreadNotifs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No unread notifications.</p>
            ) : (
              <div className="space-y-2">
                {unreadNotifs.slice(0, 4).map((n) => (
                  <div key={n.id} className="flex items-center justify-between rounded border p-2">
                    <div>
                      <p className="text-xs font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.message}</p>
                    </div>
                    <Badge className={riskColor(n.priority)}>{n.priority}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
