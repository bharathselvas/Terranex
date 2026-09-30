import React from "react";
import { useDemoStore } from "../demo/demoStore";
import { STAGE_ORDER, STAGE_LABELS, STAGE_GATES } from "../demo/workflowTypes";
import { getStagePhase, PHASE_LABELS } from "../demo/workflowEngine";
import type { WorkflowStage } from "../demo/workflowTypes";

// ═══════════════════════════════════════════════════════════════════════
// LifecycleStepper — 17-stage progress bar with phases
// Shows the full project lifecycle with completion indicators
// ═══════════════════════════════════════════════════════════════════════

export function LifecycleStepper() {
  const { currentStage, completedStages } = useDemoStore();

  const currentPhase = getStagePhase(currentStage);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col gap-2 min-w-[900px]">
        {/* Phase labels */}
        <div className="flex gap-1">
          {PHASE_LABELS.map((label, i) => (
            <div
              key={label}
              className={`flex-1 text-center text-[10px] font-medium px-1 py-0.5 rounded ${
                i < currentPhase
                  ? "bg-emerald-100 text-emerald-800"
                  : i === currentPhase
                    ? "bg-blue-100 text-blue-800"
                    : "bg-slate-50 text-slate-400"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Stage dots */}
        <div className="flex items-center gap-0">
          {STAGE_ORDER.map((stage, idx) => {
            const isCompleted = completedStages.includes(stage);
            const isCurrent = stage === currentStage;
            const phase = getStagePhase(stage);

            return (
              <React.Fragment key={stage}>
                <div className="flex flex-col items-center flex-1 min-w-[50px]">
                  {/* Dot */}
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px] font-bold shrink-0 ${
                      isCompleted
                        ? "bg-emerald-500 border-emerald-600 text-white"
                        : isCurrent
                          ? "bg-blue-500 border-blue-600 text-white animate-pulse"
                          : "bg-white border-slate-300 text-slate-400"
                    }`}
                  >
                    {isCompleted ? "✓" : idx + 1}
                  </div>
                  {/* Label */}
                  <span
                    className={`text-[9px] mt-1 text-center leading-tight ${
                      isCompleted
                        ? "text-emerald-700 font-medium"
                        : isCurrent
                          ? "text-blue-700 font-semibold"
                          : "text-slate-400"
                    }`}
                  >
                    {STAGE_LABELS[stage]}
                  </span>
                </div>
                {/* Connector line */}
                {idx < STAGE_ORDER.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 min-w-[4px] mt-[-12px] ${
                      isCompleted ? "bg-emerald-400" : "bg-slate-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
