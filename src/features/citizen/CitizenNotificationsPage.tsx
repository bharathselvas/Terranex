import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Bell,
  FileText,
  MessageSquare,
  Award,
  DollarSign,
  Home,
  FolderOpen,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CITIZEN_NOTIFICATIONS } from "./citizenData";
import type { CitizenNotification } from "./citizenData";

const TYPE_ICONS: Record<CitizenNotification["type"], typeof Bell> = {
  notice: FileText,
  objection: MessageSquare,
  award: Award,
  payment: DollarSign,
  rr: Home,
  document: FolderOpen,
  grievance: AlertCircle,
};

const TYPE_COLORS: Record<CitizenNotification["type"], string> = {
  notice: "text-blue-600",
  objection: "text-amber-600",
  award: "text-emerald-600",
  payment: "text-green-600",
  rr: "text-purple-600",
  document: "text-slate-600",
  grievance: "text-red-600",
};

export default function CitizenNotificationsPage() {
  const [notifications, setNotifications] = useState(CITIZEN_NOTIFICATIONS);

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 flex items-center gap-2 text-amber-800 text-xs font-medium">
        <AlertTriangle className="h-4 w-4" />
        MOCK / SANDBOX — All notifications are fictional demonstration data
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0F2340]">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up"}
          </p>
        </div>
        <Bell className="h-8 w-8 text-[#0F2340]" />
      </div>

      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = TYPE_ICONS[n.type];
          const color = TYPE_COLORS[n.type];
          return (
            <Link key={n.id} to={n.link} onClick={() => toggleRead(n.id)}>
              <Card
                className={`transition-colors hover:bg-slate-50 cursor-pointer ${
                  !n.read ? "border-l-4 border-l-[#0F2340]" : ""
                }`}
              >
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={`mt-0.5 ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{n.title}</p>
                      {!n.read && (
                        <Badge variant="info" className="shrink-0 text-[10px] px-1.5 py-0">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{n.date}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
