import { Bell, AlertTriangle, IndianRupee, Clock3, Info } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/mocks/audit";
import { formatDateTime } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TYPE_META: Record<string, { label: string; variant: "info" | "warning" | "danger" | "success" | "secondary"; icon: typeof Info }> = {
  action_required: { label: "Action required", variant: "warning", icon: AlertTriangle },
  sla_warning: { label: "SLA warning", variant: "danger", icon: Clock3 },
  payment: { label: "Payment", variant: "success", icon: IndianRupee },
  hearing: { label: "Hearing", variant: "info", icon: Info },
  info: { label: "Info", variant: "secondary", icon: Info },
};

export function NotificationsPage() {
  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Notifications</h1>
          <p className="text-xs text-muted-foreground">Cross-role inbox — SLA alerts, hearing notices, payment updates, and stage actions.</p>
        </div>
        <Badge variant={unread ? "warning" : "secondary"} className="gap-1.5">
          <Bell className="h-3.5 w-3.5" /> {unread} unread · {MOCK_NOTIFICATIONS.length} total
        </Badge>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Bell className="h-4 w-4 text-slate-500" /> Inbox (mock)
          </CardTitle>
          <CardDescription>Same notification bus for every role — targetRoles drives visibility (wire-up in a later build).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {MOCK_NOTIFICATIONS.map((n) => {
            const meta = TYPE_META[n.type] ?? TYPE_META.info;
            const Icon = meta.icon;
            return (
              <div key={n.id} className={`flex gap-3 rounded-lg border p-3 ${!n.read ? "border-amber-200 bg-amber-50/60" : "bg-white"}`}>
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-white">
                  <Icon className="h-3.5 w-3.5 text-slate-600" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-slate-900">{n.title}</p>
                    <Badge variant={meta.variant as never} className="text-[11px]">
                      {meta.label}
                    </Badge>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden />}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-700">{n.body}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {formatDateTime(n.createdAt)} · Case <span className="gov-mono">{n.caseId ?? "—"}</span> · To:{" "}
                    {n.targetRoles.join(", ").replace(/_/g, " ")}
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
