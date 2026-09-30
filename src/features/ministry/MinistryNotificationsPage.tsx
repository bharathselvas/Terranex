import { Bell, AlertTriangle, Clock, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MINISTRY_NOTIFICATIONS } from "@/features/ministry/ministryData";

const SEVERITY_COLORS: Record<string, string> = {
  critical: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  low: "bg-blue-100 text-blue-800 border-blue-200",
};

const SEVERITY_ICONS: Record<string, typeof Bell> = {
  critical: AlertTriangle,
  high: AlertTriangle,
  medium: Clock,
  low: Info,
};

export function MinistryNotificationsPage() {
  const unreadCount = MINISTRY_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Notifications</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            MoRTH notifications — alerts, SLA breaches, and updates
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-red-100 text-red-800 text-[11px]">
            {unreadCount} unread
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {MINISTRY_NOTIFICATIONS.map((notif) => {
          const SeverityIcon = SEVERITY_ICONS[notif.severity] || Bell;
          return (
            <Card
              key={notif.id}
              className={`${notif.read ? "opacity-60" : ""} ${SEVERITY_COLORS[notif.severity].split(" ").filter((c) => c.startsWith("border-")).join(" ")}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${SEVERITY_COLORS[notif.severity].split(" ").filter((c) => !c.startsWith("border-")).join(" ")}`}>
                    <SeverityIcon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`text-[9px] ${SEVERITY_COLORS[notif.severity].split(" ").filter((c) => !c.startsWith("border-")).join(" ")}`}>
                        {notif.severity}
                      </Badge>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-[#0F2340]">{notif.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{notif.description}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                      <span>Project: {notif.project}</span>
                      <span>{new Date(notif.timestamp).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
