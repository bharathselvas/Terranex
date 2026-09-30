import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { RR_NOTIFICATIONS } from "./rrOfficerData";
import { ArrowLeft, AlertTriangle, Info } from "lucide-react";

const typeIcons: Record<string, typeof Info> = {
  info: Info,
  warning: AlertTriangle,
  urgent: AlertTriangle,
};

const typeColors: Record<string, string> = {
  info: "bg-blue-100 text-blue-800",
  warning: "bg-amber-100 text-amber-800",
  urgent: "bg-red-100 text-red-800",
};

export default function RrNotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Notifications</h1>
        <p className="text-sm text-muted-foreground mt-1">{RR_NOTIFICATIONS.filter((n) => !n.read).length} unread</p>
      </div>

      <div className="space-y-3">
        {RR_NOTIFICATIONS.map((n) => {
          const Icon = typeIcons[n.type];
          return (
            <Card key={n.id} className={`hover:shadow-md transition-shadow ${!n.read ? "border-l-4 border-l-blue-500" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${typeColors[n.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${!n.read ? "text-[#0F2340]" : "text-gray-600"}`}>{n.title}</h3>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{n.timestamp}</p>
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
