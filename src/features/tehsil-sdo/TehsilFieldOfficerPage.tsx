import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_OFFICERS } from "./tehsilSdoData";

const statusColors: Record<string, string> = {
  online: "bg-emerald-100 text-emerald-800", offline: "bg-gray-100 text-gray-700", syncing: "bg-blue-100 text-blue-800",
};

export default function TehsilFieldOfficerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Field Officer Management</h1>
        <p className="text-sm text-muted-foreground">Officers assigned to Haveli Tehsil — task coordination and status</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><p className="text-2xl font-bold text-[#0F2340]">{FIELD_OFFICERS.length}</p><p className="text-xs text-muted-foreground">Total Officers</p></div>
            <div><p className="text-2xl font-bold text-emerald-700">{FIELD_OFFICERS.filter((f) => f.status === "online").length}</p><p className="text-xs text-muted-foreground">Online</p></div>
            <div><p className="text-2xl font-bold text-red-700">{FIELD_OFFICERS.reduce((s, f) => s + f.overdue, 0)}</p><p className="text-xs text-muted-foreground">Overdue Tasks</p></div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {FIELD_OFFICERS.map((fo) => (
          <Card key={fo.id} className="shadow-sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{fo.name}</p>
                  <p className="text-xs text-muted-foreground">{fo.village} &middot; Tehsil: {fo.tehsil}</p>
                </div>
                <Badge className={statusColors[fo.status]}>{fo.status}</Badge>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-2">
                <div className="rounded border p-2 text-center"><p className="text-lg font-bold text-[#0F2340]">{fo.activeTasks}</p><p className="text-[10px] text-muted-foreground">Active</p></div>
                <div className="rounded border p-2 text-center"><p className="text-lg font-bold text-emerald-700">{fo.completed}</p><p className="text-[10px] text-muted-foreground">Completed</p></div>
                <div className="rounded border p-2 text-center"><p className="text-lg font-bold text-amber-700">{fo.pending}</p><p className="text-[10px] text-muted-foreground">Pending</p></div>
                <div className="rounded border p-2 text-center"><p className={`text-lg font-bold ${fo.overdue > 0 ? "text-red-700" : "text-emerald-700"}`}>{fo.overdue}</p><p className="text-[10px] text-muted-foreground">Overdue</p></div>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">Last sync: {fo.lastSync}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
