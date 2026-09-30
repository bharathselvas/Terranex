import { STAGES, STAGE_BY_ID } from "@/lib/stages";
import type { LifecycleStage } from "@/types/domain";
import { cn } from "@/lib/utils";

type Props = {
  currentStageId: LifecycleStage;
  size?: "sm" | "md";
  /** When true dots are focusable and wrapped with button semantics; for now decoration only. */
  interactive?: boolean;
  className?: string;
};

/**
 * Monochrome + subtle group tiling by border tone is the default (institutional).
 * Group DOT color is kept but muted so the pipeline reads as ONE line, not a rainbow.
 * Past = filled navy, current = white dot with navy ring + outer ring, future = muted border fill.
 */
const GROUP_DOT_FILL: Record<string, string> = {
  initiation: "bg-slate-700",
  assessment: "bg-amber-700",
  notification: "bg-blue-700",
  adjudication: "bg-violet-700",
  settlement: "bg-emerald-700",
  closure: "bg-zinc-700",
};

export function StageStepper({ currentStageId, size = "md", interactive: _interactive, className }: Props) {
  const currentOrder = STAGE_BY_ID[currentStageId]?.order ?? 1;
  const dot = size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5";
  const ring = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <ol className="flex min-w-max items-center gap-0 py-2">
        {STAGES.map((stage, idx) => {
          const isPast = stage.order < currentOrder;
          const isCurrent = stage.id === currentStageId;
          const isFuture = stage.order > currentOrder;

          return (
            <li key={stage.id} className="flex items-center">
              {idx > 0 && (
                <span className={cn("h-px w-6 sm:w-8", isPast ? "bg-[#0F2340]" : "bg-slate-200")} aria-hidden />
              )}
              <span
                className={cn("group relative flex flex-col items-center gap-1", isCurrent && "z-10")}
                title={`${stage.label} — ${stage.statutoryRef} · SLA ${stage.slaDays}d · ${stage.group}`}
              >
                <span
                  className={cn(
                    "flex items-center justify-center rounded-full transition-colors",
                    isCurrent ? cn(ring, "bg-white ring-2 ring-[#0F2340] ring-offset-2") : dot,
                    isPast && !isCurrent && GROUP_DOT_FILL[stage.group],
                    isCurrent && "bg-[#0F2340]",
                    isFuture && "bg-slate-300",
                  )}
                  aria-hidden
                >
                  {isCurrent && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  {isPast && !isCurrent && <span className="h-1 w-1 rounded-full bg-white/90" />}
                </span>
                <span
                  className={cn(
                    "whitespace-nowrap text-[10px] leading-none tracking-wide",
                    isCurrent ? "font-semibold text-[#0F2340]" : isPast ? "text-slate-600" : "text-slate-400",
                    size === "sm" && "hidden sm:block",
                  )}
                >
                  {stage.shortLabel}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
