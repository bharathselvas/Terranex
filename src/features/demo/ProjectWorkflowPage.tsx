import { useDemoStore } from "@/features/demo/demoStore";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { STAGE_ORDER, STAGE_LABELS, STAGE_GATES } from "@/features/demo/workflowTypes";
import { getStagePhase, PHASE_LABELS } from "@/features/demo/workflowEngine";

// ═══════════════════════════════════════════════════════════════════════
// ProjectWorkflowPage — 17-stage lifecycle with status and details
// ═══════════════════════════════════════════════════════════════════════

export default function ProjectWorkflowPage() {
  const { completedStages, currentStage } = useDemoStore();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-[#0F2340]">17-Stage Lifecycle</h3>

      {PHASE_LABELS.map((phase, phaseIdx) => {
        const phaseStages = STAGE_ORDER.filter((s) => getStagePhase(s) === phaseIdx);
        return (
          <div key={phase} className="border rounded-lg bg-white shadow-sm">
            <div className="px-4 py-2 bg-slate-50 border-b rounded-t-lg">
              <h4 className="text-xs font-semibold text-slate-700">Phase {phaseIdx + 1}: {phase}</h4>
            </div>
            <div className="divide-y">
              {phaseStages.map((stage) => {
                const isCompleted = completedStages.includes(stage);
                const isCurrent = stage === currentStage;
                const gate = STAGE_GATES[stage];
                return (
                  <div
                    key={stage}
                    className={`px-4 py-3 flex items-center gap-3 ${
                      isCurrent ? "bg-blue-50" : isCompleted ? "bg-emerald-50/50" : ""
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isCurrent
                            ? "bg-blue-500 text-white"
                            : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {isCompleted ? "✓" : STAGE_ORDER.indexOf(stage) + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-800">{STAGE_LABELS[stage]}</span>
                        <StatusBadge
                          status={isCompleted ? "completed" : isCurrent ? "in_progress" : "locked"}
                          size="xs"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Owner: {gate.owner.replace(/_/g, " ")}
                        {gate.requires.length > 0 && (
                          <span className="ml-2">Requires: {gate.requires.map((r) => STAGE_LABELS[r]).join(", ")}</span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
