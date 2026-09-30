import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STATE_PIPELINE, STATE_PROJECTS } from "@/features/state-nodal/stateNodalData";
import { STAGES } from "@/lib/stages";
import { stageShortLabel, stageGroupColor } from "@/lib/format";

export function StatePipelinePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">State Acquisition Pipeline</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Complete 17-stage lifecycle — projects and parcels at each stage</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="text-sm font-semibold text-[#0F2340] mb-4">Pipeline Overview</h2>
          <div className="space-y-1.5">
            {STATE_PIPELINE.map((s) => {
              const stageMeta = STAGES.find((st) => st.id === s.stage);
              const groupColor = stageGroupColor(stageMeta?.group ?? "initiation");
              return (
                <div key={s.stage} className="flex items-center gap-2">
                  <span className="w-[130px] shrink-0 text-[11px] font-medium text-slate-700 truncate">
                    {stageShortLabel(s.stage)}
                  </span>
                  <div className="flex-1 h-6 bg-slate-100 rounded-sm overflow-hidden">
                    <div className={`h-full ${groupColor} rounded-sm flex items-center px-2`} style={{ width: `${Math.max(s.percentage * 2.5, s.count > 0 ? 3 : 0.5)}%` }}>
                      {s.count > 0 && <span className="text-[10px] font-medium text-white">{s.count}</span>}
                    </div>
                  </div>
                  <span className="w-[60px] shrink-0 text-right text-[11px] text-slate-600">{s.parcels.toLocaleString()} parcels</span>
                  <span className="w-[40px] shrink-0 text-right text-[11px] font-medium text-slate-700">{s.percentage.toFixed(1)}%</span>
                  {s.delayed > 0 && (
                    <Badge className="bg-red-100 text-red-800 text-[9px] shrink-0">{s.delayed} delayed</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {STAGES.filter((stage) => {
          const p = STATE_PIPELINE.find((s) => s.stage === stage.id);
          return p && p.count > 0;
        }).map((stage) => {
          const pipeline = STATE_PIPELINE.find((s) => s.stage === stage.id)!;
          const projects = STATE_PROJECTS.filter((p) => p.currentStage === stage.id);
          return (
            <Card key={stage.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-[#0F2340]">{stage.label}</h3>
                  <Badge variant="secondary" className="text-[10px]">{pipeline.count} projects</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2">{pipeline.parcels.toLocaleString()} parcels · SLA: {stage.slaDays} days</p>
                <div className="space-y-1">
                  {projects.slice(0, 3).map((proj) => (
                    <div key={proj.id} className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-600 truncate">{proj.projectName}</span>
                      <Badge className={`text-[9px] ${proj.risk === "critical" ? "bg-red-100 text-red-800" : proj.risk === "high" ? "bg-orange-100 text-orange-800" : "bg-slate-100 text-slate-700"}`}>{proj.risk}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
