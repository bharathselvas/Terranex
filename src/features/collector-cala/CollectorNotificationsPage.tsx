import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DISTRICT_NOTIFICATIONS } from "./districtCollectorData";

const priorityColor = (p: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[p] ?? "bg-gray-100 text-gray-700";
};

export default function CollectorNotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "critical">("all");

  const filtered = DISTRICT_NOTIFICATIONS.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "critical") return n.priority === "critical";
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">District Notifications</h1>
        <p className="text-sm text-muted-foreground">Alerts, escalations, and workflow notifications</p>
      </div>

      <div className="flex gap-2">
        {(["all", "unread", "critical"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f ? "bg-[#0F2340] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f === "all" ? "All" : f === "unread" ? "Unread" : "Critical"}
          </button>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0F2340]">Notifications ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filtered.map((n: { id: string; title: string; message: string; priority: string; timestamp: string; read: boolean; project?: string }) => (
              <div key={n.id} className={`rounded-lg border p-3 ${!n.read ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {!n.read && <div className="h-2 w-2 rounded-full bg-[#0F2340]" />}
                    <p className="text-sm font-medium">{n.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColor(n.priority)}>{n.priority}</Badge>
                    <span className="text-[10px] text-muted-foreground">{n.timestamp}</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{n.message}</p>
                {n.project && <p className="text-[10px] text-muted-foreground">Project: {n.project}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
