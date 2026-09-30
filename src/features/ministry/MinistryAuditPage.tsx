import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MINISTRY_AUDIT_TRAIL } from "@/features/ministry/ministryData";

export function MinistryAuditPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Audit Trail</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ministry-level audit trail — all actions and state changes across MoRTH projects
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-slate-200" />

        <div className="space-y-1">
          {MINISTRY_AUDIT_TRAIL.map((entry) => (
            <div key={entry.id} className="relative flex gap-4 py-3">
              {/* Timeline dot */}
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-slate-200 shrink-0">
                <Clock className="h-4 w-4 text-slate-500" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0F2340]">{entry.action}</p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                          <span className="font-medium text-slate-700">{entry.actor}</span>
                          <span>({entry.role}, {entry.organization})</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1.5">{entry.justification}</p>
                        {entry.previousState && entry.newState && (
                          <div className="flex items-center gap-2 mt-1.5 text-[11px]">
                            <Badge variant="secondary" className="text-[10px]">{entry.previousState}</Badge>
                            <span className="text-muted-foreground">→</span>
                            <Badge variant="secondary" className="text-[10px]">{entry.newState}</Badge>
                          </div>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                        <Badge variant="outline" className="text-[9px] mt-1">{entry.project}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
