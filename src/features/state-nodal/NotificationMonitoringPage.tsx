import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NOTIFICATION_DATA } from "@/features/state-nodal/stateNodalData";
import { stageShortLabel, formatDate } from "@/lib/format";

const TYPE_LABELS: Record<string, string> = {
  section_11: "Section 11 Preliminary Notification",
  disclosure: "Public Disclosure",
  section_19: "Section 19 Declaration",
  other: "Other",
};

export function NotificationMonitoringPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Notification Monitoring</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Statutory notification publication and objection window tracking</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-[11px] text-blue-800">
        The State Nodal Officer monitors notification publication and timeline status. Notifications are issued by statutory authorities.
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Total Notifications</p><p className="mt-1 text-xl font-bold text-[#0F2340]">{NOTIFICATION_DATA.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Published</p><p className="mt-1 text-xl font-bold text-emerald-700">{NOTIFICATION_DATA.filter((n) => n.publicationStatus === "published").length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Pending</p><p className="mt-1 text-xl font-bold text-amber-700">{NOTIFICATION_DATA.filter((n) => n.publicationStatus === "pending").length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Objection Windows Open</p><p className="mt-1 text-xl font-bold text-blue-700">{NOTIFICATION_DATA.filter((n) => n.objectionWindowRemaining > 0).length}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Project</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">District</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Notification</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Stage</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Issue Date</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Publication</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Objection Window</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {NOTIFICATION_DATA.map((n, i) => (
                  <tr key={`${n.projectId}-${i}`} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-medium text-[#0F2340]">{n.projectName}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{n.district}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{TYPE_LABELS[n.notificationType]}</td>
                    <td className="px-4 py-2.5"><Badge variant="secondary" className="text-[9px]">{stageShortLabel(n.stage)}</Badge></td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{n.issueDate ? formatDate(n.issueDate) : "—"}</td>
                    <td className="px-4 py-2.5">
                      <Badge className={`text-[9px] ${n.publicationStatus === "published" ? "bg-emerald-100 text-emerald-800" : n.publicationStatus === "pending" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"}`}>{n.publicationStatus}</Badge>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      {n.objectionWindowRemaining > 0 ? (
                        <span className="text-amber-700 font-medium">{n.objectionWindowRemaining} days remaining</span>
                      ) : (
                        <span className="text-muted-foreground">Closed</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <Badge className={`text-[9px] ${n.status === "active" ? "bg-blue-100 text-blue-800" : n.status === "completed" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"}`}>{n.status}</Badge>
                    </td>
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
