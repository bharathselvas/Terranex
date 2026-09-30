import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RISK_PROJECTS } from "@/features/requiring-org/roIAData";
import { stageLabel, formatDate } from "@/lib/format";

const RISK_COLORS: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
};

export function RiskDelayPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[#B42318]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Risk & Delay Monitor</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Projects exceeding statutory timelines or at risk
          </p>
        </div>
        <Badge variant="secondary" className="text-[11px]">
          {RISK_PROJECTS.length} at risk
        </Badge>
      </div>

      <div className="space-y-3">
        {RISK_PROJECTS.map((project, idx) => (
          <Card key={idx} className={project.risk === "critical" ? "border-red-200" : "border-orange-200"}>
            <CardContent className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`text-[10px] ${RISK_COLORS[project.risk]}`}>{project.risk.toUpperCase()}</Badge>
                    <span className="text-[11px] text-muted-foreground">{project.state} / {project.district}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#0F2340]">{project.projectName}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{project.projectId}</p>
                  <div className="mt-2 p-2 bg-red-50 rounded text-[11px] text-red-800">{project.reason}</div>
                  <div className="mt-2 p-2 bg-blue-50 rounded text-[11px] text-blue-800">
                    <span className="font-medium">Recommended:</span> {project.recommendedAction}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground">
                    <span>Stage: <Badge variant="secondary" className="text-[10px]">{stageLabel(project.currentStage)}</Badge></span>
                    <span>{project.daysInStage} days in stage (expected: {project.expectedDuration})</span>
                    <span>Last activity: {formatDate(project.lastActivity)}</span>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="shrink-0">
                  <a href={`/app/ro/project/${project.projectId}`}>
                    View Project <ArrowUpRight className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
