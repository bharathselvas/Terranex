import { useState } from "react";
import {
  Bell,
  AlertTriangle,
  AlertOctagon,
  Info,
  CheckCircle2,
  Shield,
  Wifi,
  Clock,
  Database,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ADMIN_ALERTS } from "@/features/admin/adminData";
import { formatDateTime } from "@/lib/format";

const SEVERITY_CONFIG = {
  critical: { icon: AlertOctagon, color: "text-[#B42318]", bg: "bg-red-50", border: "border-red-200", badge: "danger" as const },
  high: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", badge: "warning" as const },
  medium: { icon: Info, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", badge: "info" as const },
  low: { icon: Info, color: "text-slate-500", bg: "bg-slate-50", border: "border-slate-200", badge: "secondary" as const },
};

const CATEGORY_ICONS: Record<string, typeof Bell> = {
  workflow: Clock,
  integration: Wifi,
  security: Shield,
  delays: AlertTriangle,
  data_quality: Database,
  system: Info,
};

export function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = ADMIN_ALERTS.filter((a) => {
    if (severityFilter !== "all" && a.severity !== severityFilter) return false;
    if (categoryFilter !== "all" && a.category !== categoryFilter) return false;
    return true;
  });

  const unacknowledged = ADMIN_ALERTS.filter((a) => !a.acknowledged).length;
  const critical = ADMIN_ALERTS.filter((a) => a.severity === "critical").length;
  const high = ADMIN_ALERTS.filter((a) => a.severity === "high").length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">System Alerts</h1>
          <p className="text-xs text-muted-foreground">Workflow, integration, security, delay, and system alerts</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#B42318]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Critical</p>
              <AlertOctagon className="h-4 w-4 text-[#B42318]" />
            </div>
            <p className="mt-1 text-2xl font-bold text-[#B42318]">{critical}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">High</p>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <p className="mt-1 text-2xl font-bold text-amber-600">{high}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Unacknowledged</p>
              <Bell className="h-4 w-4 text-blue-600" />
            </div>
            <p className="mt-1 text-2xl font-bold text-blue-600">{unacknowledged}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-slate-400">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Total</p>
              <Bell className="h-4 w-4 text-slate-500" />
            </div>
            <p className="mt-1 text-2xl font-bold text-[#0F2340]">{ADMIN_ALERTS.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="flex gap-1">
          {["all", "critical", "high", "medium", "low"].map((f) => (
            <Button
              key={f}
              variant={severityFilter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setSeverityFilter(f)}
              className="h-8 text-xs capitalize"
            >
              {f}
            </Button>
          ))}
        </div>
        <div className="w-px bg-slate-200" />
        <div className="flex gap-1">
          {["all", "workflow", "integration", "security", "delays", "data_quality", "system"].map((f) => (
            <Button
              key={f}
              variant={categoryFilter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(f)}
              className="h-8 text-[11px] capitalize"
            >
              {f === "data_quality" ? "Data Quality" : f}
            </Button>
          ))}
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-2">
        {filtered.map((alert) => {
          const config = SEVERITY_CONFIG[alert.severity];
          const CatIcon = CATEGORY_ICONS[alert.category] ?? Bell;
          return (
            <Card key={alert.id} className={`${alert.acknowledged ? "opacity-60" : ""} ${config.border} border-l-4`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${config.bg} shrink-0`}>
                    <CatIcon className={`h-4 w-4 ${config.color}`} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={config.badge} className="text-[10px] uppercase">{alert.severity}</Badge>
                      <Badge variant="secondary" className="text-[10px] capitalize">{alert.category.replace("_", " ")}</Badge>
                      {alert.acknowledged && (
                        <Badge variant="outline" className="text-[10px]">Acknowledged</Badge>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mt-1">{alert.title}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{alert.description}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{formatDateTime(alert.timestamp)}</p>
                  </div>
                  {!alert.acknowledged && (
                    <Button variant="outline" size="sm" className="h-7 text-[11px] shrink-0">
                      Acknowledge
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
