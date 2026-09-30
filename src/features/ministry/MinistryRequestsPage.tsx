import { Send, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MINISTRY_REQUESTS } from "@/features/ministry/ministryData";
import { formatDate } from "@/lib/format";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-slate-100 text-slate-800",
  sent: "bg-blue-100 text-blue-800",
  acknowledged: "bg-amber-100 text-amber-800",
  in_progress: "bg-violet-100 text-violet-800",
  responded: "bg-emerald-100 text-emerald-800",
  closed: "bg-zinc-100 text-zinc-800",
};

const STATUS_ICONS: Record<string, typeof Send> = {
  draft: Clock,
  sent: Send,
  acknowledged: AlertCircle,
  in_progress: Clock,
  responded: CheckCircle,
  closed: CheckCircle,
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

export function MinistryRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Send className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Requests & Clarifications</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ministry requests for clarification or information from state/district authorities
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {MINISTRY_REQUESTS.map((req) => {
          const StatusIcon = STATUS_ICONS[req.status] || Clock;
          return (
            <Card key={req.id}>
              <CardContent className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`text-[10px] ${STATUS_COLORS[req.status]}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {req.status.replace("_", " ")}
                      </Badge>
                      <Badge className={`text-[10px] ${PRIORITY_COLORS[req.priority]}`}>
                        {req.priority}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">{req.category}</Badge>
                    </div>
                    <p className="text-sm font-medium text-[#0F2340]">{req.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground">
                      <span>Project: {req.projectName}</span>
                      <span>To: {req.recipient}</span>
                      <span>Created: {formatDate(req.createdDate)}</span>
                      <span>Updated: {formatDate(req.lastUpdated)}</span>
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
