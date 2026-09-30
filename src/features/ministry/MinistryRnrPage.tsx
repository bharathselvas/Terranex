import { Users, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MINISTRY_RNR } from "@/features/ministry/ministryData";

export function MinistryRnrPage() {
  const totalFamilies = MINISTRY_RNR.reduce((sum, r) => sum + r.affectedFamilies, 0);
  const totalRrApplicable = MINISTRY_RNR.reduce((sum, r) => sum + r.rrApplicable, 0);
  const totalCompleted = MINISTRY_RNR.reduce((sum, r) => sum + r.completed, 0);
  const totalPending = MINISTRY_RNR.reduce((sum, r) => sum + r.pending, 0);
  const totalAtRisk = MINISTRY_RNR.reduce((sum, r) => sum + r.atRisk, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">R&R Monitor</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Rehabilitation & Resettlement status across MoRTH projects
          </p>
        </div>
        {totalAtRisk > 0 && (
          <Badge className="bg-red-100 text-red-800 text-[11px]">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {totalAtRisk} at risk
          </Badge>
        )}
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-[11px] font-medium text-muted-foreground">Total Affected Families</p>
            <p className="mt-1 text-xl font-bold text-[#0F2340]">{totalFamilies.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[11px] font-medium text-muted-foreground">R&R Applicable</p>
            <p className="mt-1 text-xl font-bold text-[#0F2340]">{totalRrApplicable.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[11px] font-medium text-muted-foreground">Completed</p>
            <p className="mt-1 text-xl font-bold text-emerald-700">{totalCompleted.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[11px] font-medium text-muted-foreground">Pending</p>
            <p className="mt-1 text-xl font-bold text-amber-700">{totalPending.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Project-wise R&R breakdown */}
      <div className="space-y-4">
        {MINISTRY_RNR.map((rnr) => {
          const completionRate = rnr.rrApplicable > 0 ? Math.round((rnr.completed / rnr.rrApplicable) * 100) : 0;
          return (
            <Card key={rnr.projectId}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#0F2340]">{rnr.projectName}</h3>
                    <p className="text-[11px] text-muted-foreground">{rnr.state} — {rnr.affectedFamilies} affected families</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#0F2340]">{completionRate}%</p>
                    <p className="text-[10px] text-muted-foreground">{rnr.completed} / {rnr.rrApplicable} completed</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>

                {/* R&R components grid */}
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(rnr.components).map(([key, val]) => {
                    const total = val.completed + val.pending;
                    const pct = total > 0 ? Math.round((val.completed / total) * 100) : 0;
                    return (
                      <div key={key} className="bg-slate-50 rounded p-2">
                        <p className="text-[10px] font-medium text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#1A3560] rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-medium text-slate-700">{pct}%</span>
                        </div>
                        <p className="text-[9px] text-muted-foreground mt-0.5">
                          {val.completed} / {total}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
