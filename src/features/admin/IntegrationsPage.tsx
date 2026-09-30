import {
  Wifi,
  WifiOff,
  RefreshCw,
  Settings,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { INTEGRATIONS } from "@/features/admin/adminData";
import { formatDateTime, formatDate } from "@/lib/format";

const STATUS_CONFIG = {
  connected: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", badge: "success" as const, label: "Connected" },
  mock: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", badge: "warning" as const, label: "Mock / Sandbox" },
  error: { icon: XCircle, color: "text-[#B42318]", bg: "bg-red-50", badge: "danger" as const, label: "Error" },
};

export function IntegrationsPage() {
  const connected = INTEGRATIONS.filter((i) => i.status === "connected").length;
  const mock = INTEGRATIONS.filter((i) => i.status === "mock").length;
  const error = INTEGRATIONS.filter((i) => i.status === "error").length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">System Integrations</h1>
          <p className="text-xs text-muted-foreground">Monitor external system adapters and data synchronization</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Connected</p>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="mt-1 text-2xl font-bold text-emerald-600">{connected}</p>
            <p className="text-[11px] text-muted-foreground">Live integrations</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Mock / Sandbox</p>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <p className="mt-1 text-2xl font-bold text-amber-600">{mock}</p>
            <p className="text-[11px] text-muted-foreground">Sandbox mode</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#B42318]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Error</p>
              <XCircle className="h-4 w-4 text-[#B42318]" />
            </div>
            <p className="mt-1 text-2xl font-bold text-[#B42318]">{error}</p>
            <p className="text-[11px] text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Integration Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {INTEGRATIONS.map((intg) => {
          const config = STATUS_CONFIG[intg.status];
          const StatusIcon = config.icon;
          return (
            <Card key={intg.id} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bg}`}>
                      <StatusIcon className={`h-5 w-5 ${config.color}`} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#0F2340]">{intg.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{intg.description}</p>
                    </div>
                  </div>
                  <Badge variant={config.badge} className="text-[10px]">{config.label}</Badge>
                </div>

                <Separator className="my-3" />

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Transactions</p>
                    <p className="text-sm font-bold text-[#0F2340]">{intg.transactions.toLocaleString("en-IN")}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Failed</p>
                    <p className={`text-sm font-bold ${intg.failed > 0 ? "text-[#B42318]" : "text-emerald-600"}`}>
                      {intg.failed}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Last Sync</p>
                    <p className="text-[11px] font-medium text-slate-700">
                      {new Date(intg.lastSync).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-3 pt-3 border-t">
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-[11px]">
                    <ExternalLink className="h-3 w-3 mr-1" /> View Logs
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-[11px]">
                    <Settings className="h-3 w-3 mr-1" /> Configuration
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-[11px]">
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
