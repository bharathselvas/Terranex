import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STATE_NOTIFICATIONS } from "@/features/state-nodal/stateNodalData";
import { formatDateTime } from "@/lib/format";

const PRIORITY_COLORS: Record<string, string> = {
  critical: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  low: "bg-blue-100 text-blue-800 border-blue-200",
};

const PRIORITY_DOT: Record<string, string> = {
  critical: "bg-red-600",
  high: "bg-orange-500",
  medium: "bg-amber-500",
  low: "bg-blue-500",
};

export function StateNotificationsPage() {
  const unread = STATE_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Notifications</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{unread} unread notifications</p>
        </div>
      </div>

      <div className="space-y-2">
        {STATE_NOTIFICATIONS.map((n) => (
          <Card key={n.id} className={`hover:bg-slate-50 transition-colors cursor-pointer ${!n.read ? "border-l-2 border-l-[#0F2340]" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`h-2.5 w-2.5 rounded-full mt-1.5 shrink-0 ${PRIORITY_DOT[n.priority]}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className={`text-sm font-semibold ${n.read ? "text-slate-600" : "text-[#0F2340]"}`}>{n.title}</h3>
                    <Badge className={`text-[9px] ${PRIORITY_COLORS[n.priority]}`}>{n.priority}</Badge>
                    {!n.read && <Badge className="bg-[#0F2340] text-white text-[9px]">New</Badge>}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{n.message}</p>
                  {n.project && <p className="text-[11px] text-muted-foreground mt-0.5">Project: {n.project} · District: {n.district}</p>}
                  <p className="text-[10px] text-muted-foreground mt-0.5">{formatDateTime(n.timestamp)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
