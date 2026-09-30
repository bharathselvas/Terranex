import { useDemoStore } from "../demo/demoStore";
import { STAGE_LABELS, STAGE_GATES } from "../demo/workflowTypes";
import { getLifecycleProgress, formatStageForDisplay } from "../demo/workflowEngine";

// ═══════════════════════════════════════════════════════════════════════
// ProjectContextHeader — persistent header showing current project
// and lifecycle progress, visible on every role dashboard
// ═══════════════════════════════════════════════════════════════════════

export function ProjectContextHeader() {
  const { project, currentStage, completedStages, getCompletedParcelCount, getTotalParcels, getTotalAwardAmount, getTotalPaymentAmount } =
    useDemoStore();

  const progress = getLifecycleProgress(completedStages);
  const completedParcels = getCompletedParcelCount();
  const totalParcels = getTotalParcels();
  const totalAward = getTotalAwardAmount();
  const totalPayment = getTotalPaymentAmount();

  return (
    <div className="border rounded-lg bg-white p-3 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Left: Project info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wide">
              DEMO PROJECT
            </span>
            <span className="text-xs text-slate-500">{project.projectId}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-900 truncate">
            {project.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {project.state} / {project.district} / {project.tehsil} — {project.villages.join(", ")}
          </p>
        </div>

        {/* Right: Metrics */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Current Stage */}
          <div className="text-center">
            <div className="text-[10px] text-slate-500 uppercase">Current Stage</div>
            <div className="text-xs font-semibold text-blue-700">{STAGE_LABELS[currentStage]}</div>
          </div>
          {/* Progress */}
          <div className="text-center">
            <div className="text-[10px] text-slate-500 uppercase">Progress</div>
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray={`${progress}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">
                {progress}%
              </div>
            </div>
          </div>
          {/* Parcels */}
          <div className="text-center">
            <div className="text-[10px] text-slate-500 uppercase">Parcels</div>
            <div className="text-xs font-semibold text-slate-900">{completedParcels}/{totalParcels}</div>
          </div>
          {/* Award */}
          <div className="text-center">
            <div className="text-[10px] text-slate-500 uppercase">Award</div>
            <div className="text-xs font-semibold text-slate-900">₹{(totalAward / 100000).toFixed(1)}L</div>
          </div>
          {/* Payment */}
          <div className="text-center">
            <div className="text-[10px] text-slate-500 uppercase">Paid</div>
            <div className="text-xs font-semibold text-emerald-700">₹{(totalPayment / 100000).toFixed(1)}L</div>
          </div>
        </div>
      </div>
    </div>
  );
}
