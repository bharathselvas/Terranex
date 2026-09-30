import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  TEHSIL_PROJECTS,
  VILLAGES,
  PARCELS,
  WORK_QUEUE,
  OWNERSHIP_DISCREPANCIES,
  FIELD_OFFICERS,
  TEHSIL_PROFILE,
  TEHSIL_NOTIFICATIONS,
} from "./tehsilSdoData";

const riskColor = (r: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800", on_track: "bg-blue-100 text-blue-800" };
  return m[r] ?? "bg-gray-100 text-gray-700";
};

export default function TehsilOverviewPage() {
  const unreadNotifs = TEHSIL_NOTIFICATIONS.filter((n) => !n.read);
  const overdueTasks = WORK_QUEUE.filter((wq) => wq.status === "overdue");
  const criticalQueue = WORK_QUEUE.filter((wq) => wq.priority === "critical");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]">Tehsil Operations</h1>
          <p className="text-sm text-muted-foreground">Coordinate land acquisition cases, field verification and land-record activities within {TEHSIL_PROFILE.name} Tehsil</p>
        </div>
        <div className="flex gap-2">
          <Link to="/app/tehsil/notifications" className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">
            Notifications {unreadNotifs.length > 0 && <Badge className="ml-1 bg-red-500">{unreadNotifs.length}</Badge>}
          </Link>
          <Link to="/app/tehsil/work-queue" className="rounded-lg border border-[#0F2340] px-4 py-2 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5">
            View Queue
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Active Projects</p><p className="text-2xl font-bold text-[#0F2340]">{TEHSIL_PROJECTS.length}</p><p className="text-[10px] text-muted-foreground">Assigned to Haveli</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Villages Covered</p><p className="text-2xl font-bold text-[#0F2340]">{VILLAGES.length}</p><p className="text-[10px] text-muted-foreground">Active villages</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Active Parcels</p><p className="text-2xl font-bold text-[#0F2340]">{PARCELS.length.toLocaleString()}</p><p className="text-[10px] text-muted-foreground">Under verification</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Field Tasks</p><p className="text-2xl font-bold text-[#0F2340]">{FIELD_OFFICERS.reduce((s, f) => s + f.activeTasks, 0)}</p><p className="text-[10px] text-muted-foreground">Active assignments</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Verification Pending</p><p className="text-2xl font-bold text-amber-700">{PARCELS.filter((p) => p.fieldVerification !== "accepted").length}</p><p className="text-[10px] text-muted-foreground">Awaiting review</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Ownership Issues</p><p className="text-2xl font-bold text-orange-700">{OWNERSHIP_DISCREPANCIES.length}</p><p className="text-[10px] text-muted-foreground">Discrepancies</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Documents Pending</p><p className="text-2xl font-bold text-amber-700">{PARCELS.filter((p) => p.documentsCount === 0).length}</p><p className="text-[10px] text-muted-foreground">No documents</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Overdue Tasks</p><p className="text-2xl font-bold text-red-700">{overdueTasks.length}</p><p className="text-[10px] text-muted-foreground">Past deadline</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Critical Queue ({criticalQueue.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criticalQueue.map((wq) => (
                <div key={wq.id} className="rounded-lg border border-red-200 bg-red-50/50 p-3">
                  <p className="text-sm font-medium">{wq.projectName}</p>
                  <p className="text-xs text-muted-foreground">{wq.parcelId} &middot; {wq.parcelVillage}</p>
                  <p className="mt-1 text-xs text-red-700">{wq.task}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge className="text-[10px]">{wq.ageDays}d age</Badge>
                    <span className="text-[10px] text-muted-foreground">Due: {wq.priority === "critical" ? "ASAP" : "Check queue"}</span>
                  </div>
                </div>
              ))}
              {criticalQueue.length === 0 && <p className="text-sm text-muted-foreground">No critical items.</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Village Status</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {VILLAGES.slice(0, 5).map((v) => (
                <div key={v.id} className="flex items-center justify-between rounded border p-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium">{v.name}</p>
                    <p className="text-[10px] text-muted-foreground">{v.affectedParcels} parcels &middot; {v.verificationProgress}% verified</p>
                  </div>
                  <Badge className={`text-[10px] ${riskColor(v.risk)}`}>{v.risk}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Field Officers</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {FIELD_OFFICERS.map((fo) => (
                <div key={fo.id} className="flex items-center justify-between rounded border p-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium">{fo.name}</p>
                    <p className="text-[10px] text-muted-foreground">{fo.village} &middot; {fo.activeTasks} active</p>
                  </div>
                  <Badge className={`text-[10px] ${fo.status === "online" ? "bg-emerald-100 text-emerald-800" : fo.status === "offline" ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-800"}`}>{fo.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
