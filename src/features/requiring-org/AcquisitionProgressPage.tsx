import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RO_PROJECTS } from "@/features/requiring-org/roIAData";
import { STAGES } from "@/lib/stages";
import { stageShortLabel, stageGroupColor } from "@/lib/format";

export function AcquisitionProgressPage() {
  const stageCounts = STAGES.map((stage) => ({
    stage: stage.id,
    count: RO_PROJECTS.filter((p) => p.currentStage === stage.id).length,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Acquisition Progress</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Portfolio-wide acquisition progress across NHAI projects</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="text-sm font-semibold text-[#0F2340] mb-4">Project Pipeline</h2>
          <div className="space-y-1.5">
            {stageCounts.filter((s) => s.count > 0).map((s) => {
              const stageMeta = STAGES.find((st) => st.id === s.stage);
              const groupColor = stageGroupColor(stageMeta?.group ?? "initiation");
              return (
                <div key={s.stage} className="flex items-center gap-2">
                  <span className="w-[140px] shrink-0 text-[11px] font-medium text-slate-700 truncate">
                    {stageShortLabel(s.stage)}
                  </span>
                  <div className="flex-1 h-5 bg-slate-100 rounded-sm overflow-hidden">
                    <div className={`h-full ${groupColor} rounded-sm`} style={{ width: `${Math.max(s.count * 25, 4)}%` }} />
                  </div>
                  <span className="w-[30px] shrink-0 text-right text-[11px] font-medium text-slate-700">{s.count}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {RO_PROJECTS.filter((p) => p.status === "active").map((project) => (
          <Card key={project.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-[#0F2340]">{project.projectName}</h3>
                <Badge variant="secondary" className="text-[10px]">{stageShortLabel(project.currentStage)}</Badge>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#1A3560] rounded-full" style={{ width: `${project.progress}%` }} />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">{project.progress}% complete • {project.parcels.toLocaleString()} parcels</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
