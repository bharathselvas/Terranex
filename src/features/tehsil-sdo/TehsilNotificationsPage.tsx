import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TEHSIL_NOTIFICATIONS } from "./tehsilSdoData";

const priorityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800",
};

export default function TehsilNotificationsPage() {
  const unread = TEHSIL_NOTIFICATIONS.filter((n) => !n.read);
  const read = TEHSIL_NOTIFICATIONS.filter((n) => n.read);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Notifications</h1>
        <p className="text-sm text-muted-foreground">Tehsil notifications and alerts ({unread.length} unread)</p>
      </div>

      {unread.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-red-800">Unread</h2>
          {unread.map((n) => (
            <Card key={n.id} className="border-l-4 border-l-blue-500 shadow-sm">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.message}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{n.timestamp}</p>
                  </div>
                  <Badge className={priorityColors[n.priority]}>{n.priority}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {read.length > 0 && <h2 className="text-sm font-semibold text-gray-500">Read</h2>}
        {read.map((n) => (
          <Card key={n.id} className="shadow-sm opacity-70">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.message}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{n.timestamp}</p>
                </div>
                <Badge className={priorityColors[n.priority]}>{n.priority}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
