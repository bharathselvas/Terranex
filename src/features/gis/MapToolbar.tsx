import { Search, X, Layers, SlidersHorizontal, AlertOctagon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ACQUISITION_STATUS_LABEL,
  ACQUISITION_STATUS_ORDER,
  DEFAULT_LAYERS,
  LAND_USE_LABEL,
  MAP_LAYER_LABELS,
  type AcquisitionStatus,
  type AcquisitionCaseRef,
  type LandUse,
  type MapLayerKey,
} from "./types";
import { cn } from "@/lib/utils";

const ALL = "all";

export type GisFilters = {
  status: AcquisitionStatus | typeof ALL;
  landUse: LandUse | typeof ALL;
  caseId: string | typeof ALL;
  blockedOnly: boolean;
};

export const DEFAULT_FILTERS: GisFilters = {
  status: ALL,
  landUse: ALL,
  caseId: ALL,
  blockedOnly: false,
};

export function filtersAreActive(f: GisFilters): boolean {
  return (
    f.status !== ALL || f.landUse !== ALL || f.caseId !== ALL || f.blockedOnly
  );
}

type MapToolbarProps = {
  query: string;
  onQueryChange: (v: string) => void;
  filters: GisFilters;
  onFiltersChange: (next: GisFilters) => void;
  layers: Record<MapLayerKey, boolean>;
  onLayerToggle: (key: MapLayerKey) => void;
  cases: AcquisitionCaseRef[];
  landUses: LandUse[];
  matchCount: number;
  totalCount: number;
};

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      {children}
    </div>
  );
}

function toggleFilter<K extends keyof GisFilters>(current: GisFilters, key: K, value: GisFilters[K]) {
  return { ...current, [key]: value } satisfies GisFilters;
}

export function MapToolbar({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
  layers,
  onLayerToggle,
  cases,
  landUses,
  matchCount,
  totalCount,
}: MapToolbarProps) {
  const hasQuery = query.trim().length > 0;
  const selectClass = "h-8 text-xs";

  return (
    <div className="flex h-full flex-col gap-3.5 overflow-y-auto p-3">
      {/* ── Search ─────────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Search</p>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Parcel / survey / case…"
            className="h-8 pl-8 pr-7 text-xs"
            aria-label="Search parcel, survey number, case or village"
          />
          {hasQuery && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="absolute right-1.5 top-1.5 rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <p className="text-[10px] text-slate-500">
          {hasQuery ? (
            <>
              <span className="font-semibold text-[#0F2340]">{matchCount}</span> of {totalCount} parcels match
            </>
          ) : (
            <>Survey no · parcel ID · case ID · village</>
          )}
        </p>
      </div>

      {/* ── Filters ────────────────────────────────────────────────── */}
      <div className="space-y-2.5 border-t pt-3">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            <SlidersHorizontal className="h-3 w-3" /> Filters
          </p>
          {filtersAreActive(filters) && (
            <Button
              variant="ghost"
              size="sm"
              className="h-5 px-1.5 text-[10px] text-slate-500 hover:text-[#0F2340]"
              onClick={() => onFiltersChange(DEFAULT_FILTERS)}
            >
              Reset
            </Button>
          )}
        </div>

        <FilterGroup label="Acquisition status">
          <Select
            value={filters.status}
            onValueChange={(v) =>
              onFiltersChange(toggleFilter(filters, "status", v as AcquisitionStatus | typeof ALL))
            }
          >
            <SelectTrigger className={selectClass} aria-label="Filter by acquisition status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All statuses</SelectItem>
              {ACQUISITION_STATUS_ORDER.map((s) => (
                <SelectItem key={s} value={s}>
                  {ACQUISITION_STATUS_LABEL[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterGroup>

        <FilterGroup label="Land use">
          <Select
            value={filters.landUse}
            onValueChange={(v) => onFiltersChange(toggleFilter(filters, "landUse", v as LandUse | typeof ALL))}
          >
            <SelectTrigger className={selectClass} aria-label="Filter by land use">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All land use</SelectItem>
              {landUses.map((l) => (
                <SelectItem key={l} value={l}>
                  {LAND_USE_LABEL[l]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterGroup>

        <FilterGroup label="Acquisition case">
          <Select
            value={filters.caseId}
            onValueChange={(v) => onFiltersChange(toggleFilter(filters, "caseId", v as string))}
          >
            <SelectTrigger className={selectClass} aria-label="Filter by acquisition case">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All cases</SelectItem>
              {cases.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.label}
                  {c.blocked ? " · blocked" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterGroup>

        <button
          type="button"
          onClick={() => onFiltersChange(toggleFilter(filters, "blockedOnly", !filters.blockedOnly))}
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-md border px-2.5 py-1.5 text-left text-[11px] font-medium transition-colors",
            filters.blockedOnly
              ? "border-[#B42318] bg-[#B42318]/8 text-[#B42318]"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
          )}
          aria-pressed={filters.blockedOnly}
        >
          <span className="flex items-center gap-1.5">
            <AlertOctagon className="h-3.5 w-3.5" />
            Blocked cases only
          </span>
          <span
            className={cn(
              "h-3 w-3 rounded-[3px] border",
              filters.blockedOnly ? "border-[#B42318] bg-[#B42318]" : "border-slate-300 bg-white",
            )}
          />
        </button>
      </div>

      {/* ── Layers ─────────────────────────────────────────────────── */}
      <div className="space-y-2 border-t pt-3">
        <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          <Layers className="h-3 w-3" /> Layers
        </p>
        <ul className="space-y-0.5">
          {(Object.keys(MAP_LAYER_LABELS) as MapLayerKey[]).map((key) => {
            const on = layers[key];
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => onLayerToggle(key)}
                  aria-pressed={on}
                  className="flex w-full items-center gap-2 rounded px-1.5 py-1 text-left text-[11px] text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <span
                    className={cn(
                      "flex h-3 w-3 shrink-0 items-center justify-center rounded-[3px] border transition-colors",
                      on ? "border-[#0F2340] bg-[#0F2340]" : "border-slate-300 bg-white",
                    )}
                  >
                    {on && <span className="h-1.5 w-1.5 rounded-[1px] bg-white" />}
                  </span>
                  {MAP_LAYER_LABELS[key]}
                </button>
              </li>
            );
          })}
        </ul>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-full px-1 text-[10px] text-slate-500"
          onClick={() =>
            (Object.keys(DEFAULT_LAYERS) as MapLayerKey[]).forEach((k) => {
              if (DEFAULT_LAYERS[k] !== layers[k]) onLayerToggle(k);
            })
          }
        >
          Restore default layers
        </Button>
      </div>

      <div className="mt-auto border-t pt-3">
        <Badge variant="muted" className="w-full justify-center text-[9px] tracking-wider">
          Synthetic demo data
        </Badge>
      </div>
    </div>
  );
}
