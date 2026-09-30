import {
  ACQUISITION_STATUS_COLOR,
  ACQUISITION_STATUS_LABEL,
  ACQUISITION_STATUS_ORDER,
} from "./types";

type MapLegendProps = {
  showStatus: boolean;
  showBlocked: boolean;
};

function Swatch({ fill, stroke, dashed }: { fill?: string; stroke: string; dashed?: boolean }) {
  return (
    <span
      className="inline-block h-2.5 w-2.5 shrink-0 rounded-[2px]"
      style={{
        background: fill ?? "transparent",
        border: dashed ? `1.5px dashed ${stroke}` : `1px solid ${stroke}`,
      }}
    />
  );
}

/**
 * Legend is rendered as a real map overlay. Every entry corresponds to something
 * that is actually drawn — there are no aspirational legend keys.
 */
export function MapLegend({ showStatus, showBlocked }: MapLegendProps) {
  return (
    <div className="rounded-md border bg-white/95 px-2.5 py-2 shadow-sm backdrop-blur">
      {showStatus && (
      <>
      <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wider text-slate-500">
        Acquisition status
      </p>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
        {ACQUISITION_STATUS_ORDER.filter((s) => (showBlocked ? true : s !== "blocked")).map((s) => {
          const c = ACQUISITION_STATUS_COLOR[s];
          return (
            <li key={s} className="flex items-center gap-1.5">
              <Swatch fill={c.fill} stroke={c.stroke} dashed={s === "blocked"} />
              <span className="whitespace-nowrap text-[9.5px] leading-none text-slate-700">
                {ACQUISITION_STATUS_LABEL[s]}
              </span>
            </li>
          );
        })}
      </ul>
      </>
      )}

      <div className={`border-t ${showStatus ? "mt-2 pt-1.5" : ""}`}>
        <ul className="space-y-1">
          <li className="flex items-center gap-1.5">
            <Swatch stroke="#1A3560" dashed />
            <span className="text-[9.5px] leading-none text-slate-700">Project boundary</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Swatch fill="#94A3B8" stroke="#64748b" dashed />
            <span className="text-[9.5px] leading-none text-slate-700">Administrative extent</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-[3px] w-4 shrink-0 rounded-full bg-[#0F2340]" />
            <span className="text-[9.5px] leading-none text-slate-700">Proposed alignment</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-[2px] w-4 shrink-0 rounded-full bg-[#0E7490]" />
            <span className="text-[9.5px] leading-none text-slate-700">Irrigation channel</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
