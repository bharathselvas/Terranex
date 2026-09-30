import { useDemoStore } from "@/features/demo/demoStore";

// ═══════════════════════════════════════════════════════════════════════
// ProjectTimelinePage — chronological event timeline
// ═══════════════════════════════════════════════════════════════════════

export default function ProjectTimelinePage() {
  const { audit } = useDemoStore();
  const sorted = [...audit].sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-[#0F2340]">Project Timeline</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
        <div className="space-y-1">
          {sorted.map((event) => (
            <div key={event.id} className="flex gap-3 items-start pl-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-500 mt-1.5 shrink-0 z-10" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">{event.timestamp}</span>
                  <span className="text-xs font-semibold text-slate-800">{event.actor}</span>
                </div>
                <p className="text-xs text-slate-700 mt-0.5">{event.action}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {event.entity} · {event.previousState ? `${event.previousState} → ` : ""}{event.newState}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
