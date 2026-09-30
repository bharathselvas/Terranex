import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Crosshair, Layers3, Maximize2, Satellite } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MapController, ScaleBar, ZoomWatcher, type MapCommand, type MapCommandSpec } from "./MapPrimitives";
import {
  AdministrativeBoundaryLayer,
  InfrastructureLayer,
  ProjectBoundaryLayer,
  SettlementLayer,
} from "./BoundaryLayers";
import { ParcelLayer } from "./ParcelLayer";
import { MapLegend } from "./MapLegend";
import { DEFAULT_FILTERS, MapToolbar, filtersAreActive, type GisFilters } from "./MapToolbar";
import { ParcelDetailPanel } from "./ParcelDetailPanel";
import {
  ACQUISITION_STATUS_LABEL,
  DEFAULT_LAYERS,
  type GeoParcel,
  type LandUse,
  type MapLayerKey,
} from "./types";
import {
  ADMIN_BOUNDARY,
  DETAIL_PANEL_WIDTH,
  GIS_STATS,
  HERO_PARCEL,
  INFRASTRUCTURE,
  MAP_ORIGIN,
  PARCEL_EXTENT,
  PROJECT,
  PROJECT_BOUNDARY,
  SETTLEMENTS,
  TERRANEX_CASES,
  TERRANEX_PARCELS,
} from "./geoData";

const ALL = "all";
const LABEL_ZOOM_THRESHOLD = 17;
const FOCUS_ZOOM = 17;

function Stat({ label, value, tone }: { label: string; value: number; tone?: "danger" | "default" }) {
  return (
    <div className="min-w-0 px-3 first:pl-0">
      <p className="truncate text-[9.5px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p
        className={cn(
          "text-[17px] font-semibold leading-tight tabular-nums",
          tone === "danger" ? "text-[#B42318]" : "text-[#0F2340]",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function GisPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<GisFilters>(DEFAULT_FILTERS);
  const [layers, setLayers] = useState<Record<MapLayerKey, boolean>>(DEFAULT_LAYERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [labelAll, setLabelAll] = useState(false);
  const [command, setCommand] = useState<MapCommand>({ kind: "reset", token: 0 });
  const [basemap, setBasemap] = useState<"street" | "satellite">("street");

  const token = useRef(0);
  const issue = useCallback((spec: MapCommandSpec) => {
    token.current += 1;
    setCommand({ ...spec, token: token.current } as MapCommand);
  }, []);

  const landUses = useMemo<LandUse[]>(
    () => Array.from(new Set(TERRANEX_PARCELS.map((p) => p.landUse))).sort(),
    [],
  );

  /** Search + filters, applied in that order so counts always reflect the map. */
  const matched = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TERRANEX_PARCELS.filter((p) => {
      if (filters.blockedOnly && p.acquisitionStatus !== "blocked") return false;
      if (filters.status !== ALL && p.acquisitionStatus !== filters.status) return false;
      if (filters.landUse !== ALL && p.landUse !== filters.landUse) return false;
      if (filters.caseId !== ALL && p.caseId !== filters.caseId) return false;
      if (q) {
        const hit =
          p.surveyNumber.toLowerCase().includes(q) ||
          p.parcelId.toLowerCase().includes(q) ||
          (p.caseId ?? "").toLowerCase().includes(q) ||
          p.jurisdiction.village.toLowerCase().includes(q) ||
          p.ownerName.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [query, filters]);

  const matchedIds = useMemo(() => new Set(matched.map((p) => p.id)), [matched]);

  /** Labels that stay on at any zoom: the selected parcel, the hero, and hits. */
  const pinnedLabelIds = useMemo(() => {
    const set = new Set<string>();
    if (selectedId) set.add(selectedId);
    if (matched.length <= 12) for (const p of matched) set.add(p.id);
    return set;
  }, [selectedId, matched]);

  const selected = useMemo<GeoParcel | null>(
    () => TERRANEX_PARCELS.find((p) => p.id === selectedId) ?? null,
    [selectedId],
  );

  const selectParcel = useCallback(
    (parcel: GeoParcel, opts?: { fly?: boolean }) => {
      setSelectedId(parcel.id);
      if (opts?.fly !== false) {
        issue({
          kind: "focusParcel",
          position: parcel.centroid,
          zoom: FOCUS_ZOOM,
          insetRight: DETAIL_PANEL_WIDTH,
        });
      }
    },
    [issue],
  );

  const closePanel = useCallback(() => {
    setSelectedId(null);
  }, []);

  /**
   * The demo spine: typing a unique survey number frames and opens it, so the
   * walk from "search" to "blocked case" is two keystrokes rather than a hunt.
   */
  const lastQuery = useRef("");
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q === lastQuery.current) return;
    lastQuery.current = q;
    if (q.length < 2) return;
    const exact = TERRANEX_PARCELS.find(
      (p) => p.surveyNumber.toLowerCase() === q || p.parcelId.toLowerCase() === q,
    );
    const pool = exact ? [exact] : TERRANEX_PARCELS.filter((p) => matchedIds.has(p.id));
    if (pool.length === 1) selectParcel(pool[0]);
  }, [query, matchedIds, selectParcel]);

  const toggleLayer = useCallback((key: MapLayerKey) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const visibleBlocked = useMemo(
    () => TERRANEX_PARCELS.filter((p) => p.acquisitionStatus === "blocked"),
    [],
  );

  const results = query.trim().length > 0 ? matched.slice(0, 40) : [];
  const total = TERRANEX_PARCELS.length;

  return (
    <div className="flex h-[calc(100vh-136px)] min-h-[600px] flex-col gap-2.5">
      {/* ══ Context bar ══════════════════════════════════════════════ */}
      <header className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border bg-white px-3.5 py-2.5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-[15px] font-bold tracking-tight text-[#0F2340]">TERRANEX</h1>
            <Badge variant="outline" className="text-[9px] tracking-wider">
              SYNTHETIC DEMO DATA
            </Badge>
          </div>
          <p className="truncate text-[10.5px] text-muted-foreground">
            Every Parcel. Every Case. One Traceable Workflow.
          </p>
        </div>

        <div className="ml-auto flex min-w-0 items-center gap-2 border-l pl-3">
          <div className="min-w-0">
            <p className="text-[9.5px] uppercase tracking-wider text-slate-500">Project</p>
            <p className="truncate text-[12px] font-semibold text-[#0F2340]">{PROJECT.title}</p>
          </div>
          <Badge variant="muted" className="shrink-0 text-[9.5px]">
            {PROJECT_BOUNDARY.corridorKm} km corridor
          </Badge>
        </div>

        <div className="flex items-stretch divide-x border-l pl-1">
          <Stat label="Project parcels" value={GIS_STATS.total} />
          <Stat label="In acquisition" value={GIS_STATS.inAcquisition} />
          <Stat label="Comp. pending" value={GIS_STATS.compensationPending} />
          <Stat label="Possession pend." value={GIS_STATS.possessionPending} />
          <Stat label="Blocked" value={GIS_STATS.blocked} tone="danger" />
        </div>
      </header>

      {/* ══ Workstation ═════════════════════════════════════════════ */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2.5 lg:grid-cols-[236px_minmax(0,1fr)]">
        {/* ── Left rail ──────────────────────────────────────────── */}
        <div className="hidden min-h-0 flex-col gap-2.5 lg:flex">
          <div className="min-h-0 flex-1 overflow-hidden rounded-lg border bg-white">
            <MapToolbar
              query={query}
              onQueryChange={setQuery}
              filters={filters}
              onFiltersChange={setFilters}
              layers={layers}
              onLayerToggle={toggleLayer}
              cases={TERRANEX_CASES}
              landUses={landUses}
              matchCount={matched.length}
              totalCount={total}
            />
          </div>

          {/* Search results — the clickable path to selection */}
          {results.length > 0 && (
            <div className="max-h-[188px] shrink-0 overflow-y-auto rounded-lg border bg-white p-1.5">
              <p className="px-1 pb-1 text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">
                {results.length} result{results.length === 1 ? "" : "s"}
              </p>
              <ul className="space-y-0.5">
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => selectParcel(p)}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded px-1.5 py-1 text-left transition-colors hover:bg-slate-50",
                        p.id === selectedId && "bg-[#0F2340]/6 ring-1 ring-[#0F2340]/25",
                      )}
                    >
                      <span className="min-w-0">
                        <span className="gov-mono block truncate text-[#0F2340]">{p.surveyNumber}</span>
                        <span className="block truncate text-[9.5px] text-slate-500">
                          {p.caseId ?? "Not requisitioned"} · {p.areaHa.toFixed(2)} ha
                        </span>
                      </span>
                      <span
                        className="h-2 w-2 shrink-0 rounded-[2px]"
                        style={{
                          background:
                            p.acquisitionStatus === "blocked"
                              ? "#B42318"
                              : p.acquisitionStatus === "possession_completed"
                                ? "#0F7A5A"
                                : "#9A6B00",
                        }}
                        title={ACQUISITION_STATUS_LABEL[p.acquisitionStatus]}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Map canvas ────────────────────────────────────────── */}
        <div className="relative min-h-[420px] overflow-hidden rounded-lg border bg-[#E8EDF5]">
          <MapContainer
            center={[MAP_ORIGIN.center[1], MAP_ORIGIN.center[0]]}
            zoom={MAP_ORIGIN.zoom}
            minZoom={12}
            maxZoom={19}
            zoomControl
            scrollWheelZoom
            className="h-full w-full"
            style={{ background: "#E8EDF5" }}
          >
            <TileLayer
              key={basemap}
              attribution={
                basemap === "street"
                  ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  : 'Imagery &copy; Esri, Maxar, Earthstar Geographics'
              }
              url={
                basemap === "street"
                  ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              }
              maxZoom={19}
            />

            <MapController command={command} />
            <ZoomWatcher threshold={LABEL_ZOOM_THRESHOLD} onCross={(_z, above) => setLabelAll(above)} />
            <ScaleBar />

            {layers.adminBoundary && <AdministrativeBoundaryLayer shape={ADMIN_BOUNDARY} />}
            {layers.infrastructure && <InfrastructureLayer lines={INFRASTRUCTURE} />}
            <SettlementLayer points={SETTLEMENTS} />
            {layers.projectBoundary && <ProjectBoundaryLayer shape={PROJECT_BOUNDARY} />}

            {layers.parcels && (
              <ParcelLayer
                parcels={matched}
                selectedId={selectedId}
                pinnedLabelIds={pinnedLabelIds}
                labelAll={labelAll}
                acquisitionStatusLayer={layers.acquisitionStatus}
                blockedLayer={layers.blocked}
                onSelect={(p) => selectParcel(p, { fly: false })}
              />
            )}
          </MapContainer>

          {/* ── Floating controls ───────────────────────────────── */}
          <div className="pointer-events-none absolute right-2.5 top-2.5 z-[1000] flex flex-col gap-1.5">
            <div className="pointer-events-auto flex overflow-hidden rounded-md border bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setBasemap("street")}
                title="Street basemap (OpenStreetMap)"
                className={cn(
                  "px-2 py-1.5 text-[10.5px] font-medium transition-colors",
                  basemap === "street" ? "bg-[#0F2340] text-white" : "text-slate-600 hover:bg-slate-50",
                )}
              >
                Street
              </button>
              <button
                type="button"
                onClick={() => setBasemap("satellite")}
                title="Satellite imagery (Esri World Imagery)"
                className={cn(
                  "flex items-center gap-1 px-2 py-1.5 text-[10.5px] font-medium transition-colors",
                  basemap === "satellite" ? "bg-[#0F2340] text-white" : "text-slate-600 hover:bg-slate-50",
                )}
              >
                <Satellite className="h-3 w-3" /> Satellite
              </button>
            </div>

            <div className="pointer-events-auto flex flex-col overflow-hidden rounded-md border bg-white shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 justify-start rounded-none px-2 text-[10.5px]"
                onClick={() => issue({ kind: "fitParcels", positions: PARCEL_EXTENT })}
              >
                <Maximize2 className="h-3 w-3" /> Frame project
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 justify-start rounded-none px-2 text-[10.5px]"
                onClick={() => issue({ kind: "fitParcels", positions: matched.flatMap((p) => p.geometry.coordinates) })}
                disabled={matched.length === 0}
              >
                <Layers3 className="h-3 w-3" /> Fit results ({matched.length})
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 justify-start rounded-none px-2 text-[10.5px]"
                onClick={() => selectParcel(HERO_PARCEL)}
              >
                <Crosshair className="h-3 w-3" /> Go to 1042/3A
              </Button>
            </div>
          </div>

          {/* ── Legend ───────────────────────────────────────────── */}
          <div className="pointer-events-none absolute bottom-8 left-2.5 z-[1000]">
            <MapLegend showStatus={layers.acquisitionStatus} showBlocked={layers.blocked} />
          </div>

          {/* ── Empty state ─────────────────────────────────────── */}
          {matched.length === 0 && (
            <div className="pointer-events-none absolute inset-0 z-[900] flex items-center justify-center">
              <div className="rounded-md border bg-white/95 px-4 py-3 text-center shadow-sm">
                <p className="text-[12px] font-semibold text-[#0F2340]">No parcels match the current view</p>
                <p className="mt-0.5 text-[10.5px] text-slate-500">
                  {total} synthetic parcels are loaded. Clear the search or reset filters.
                </p>
                {(filtersAreActive(filters) || query) && (
                  <Button
                    size="sm"
                    className="mt-2 h-7 text-[11px]"
                    onClick={() => {
                      setQuery("");
                      setFilters(DEFAULT_FILTERS);
                    }}
                  >
                    Reset view
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* ── Blocked ticker ──────────────────────────────────── */}
          {layers.blocked && visibleBlocked.length > 0 && (
            <div className="pointer-events-auto absolute bottom-2.5 left-1/2 z-[1000] -translate-x-1/2">
              <button
                type="button"
                onClick={() => setFilters({ ...DEFAULT_FILTERS, blockedOnly: true })}
                className="flex items-center gap-2 rounded-full border border-[#B42318]/40 bg-white/97 px-3 py-1.5 shadow-sm transition-colors hover:bg-[#B42318]/6"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#B42318]" />
                <span className="text-[11px] font-semibold text-[#B42318]">
                  {visibleBlocked.length} blocked
                </span>
                <span className="text-[10.5px] text-slate-600">— evidence gate unmet</span>
              </button>
            </div>
          )}

          {/* ── Detail panel ────────────────────────────────────── */}
          {selected && (
            <ParcelDetailPanel
              parcel={selected}
              onClose={closePanel}
              onZoomToParcel={(p) => selectParcel(p)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
