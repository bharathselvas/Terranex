// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · GIS Parcel Map
// -----------------------------------------------------------------------
// A real Leaflet map. Real OSM / Esri / OpenTopo tiles, real parcel polygons
// with real areas (shoelace), real click handling, a real search that flies
// the camera, and a real two-way bridge to the case workspace:
//
//   case page  →  "View Parcel on Map"  →  /gis?parcel=<id>
//   map popup  →  "View Case"           →  /cases/<caseId>
//
// The polygons are synthetic. They are generated over a real anchor in
// Chengalpattu District, so the basemap shows plausible terrain, but the
// boundaries correspond to no real record.
// ═══════════════════════════════════════════════════════════════════════

import React from "react";
import { MapContainer, Polygon, Polyline, Marker, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Layers, Locate, Minus, Plus, ScanSearch, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DISTRICT, PARCELS, VILLAGE_FOOTPRINTS, findCaseById, expandRing, inr, num, parcelForCase, ringBounds } from "../data";
import { toLatLngs } from "../lib/geo";
import { PARCEL_STATUS_BANDS, bandFor, useLandAdmin } from "../store/landAdminStore";
import type { LngLat, Parcel } from "../lib/types";
import { CompensationPill, Pill, RnrPill } from "../components/ui";

const BASEMAPS = {
  satellite: {
    label: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Imagery &copy; Esri, Maxar, Earthstar Geographics",
  },
  street: {
    label: "Street",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  terrain: {
    label: "Terrain",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
  },
} as const;

type BasemapKey = keyof typeof BASEMAPS;

/** Broad secondary roads + a watercourse, drawn as map context. */
const CONTEXT_LINES: Array<{ coords: LngLat[]; label: string; kind: "road" | "water" }> = [
  { kind: "road", label: "SH 58 · Tambaram–Guduvanchery", coords: [[79.808, 12.792], [79.828, 12.826], [79.850, 12.862], [79.872, 12.898]] },
  { kind: "road", label: "SH 115 · Chengalpattu–Sriperumbudur", coords: [[79.828, 12.812], [79.852, 12.850], [79.878, 12.888]] },
  { kind: "road", label: "NH 32 (GST Road)", coords: [[79.796, 12.768], [79.846, 12.818], [79.896, 12.868]] },
  { kind: "water", label: "Kanchipuram river channel", coords: [[79.802, 12.786], [79.826, 12.824], [79.850, 12.864], [79.878, 12.900]] },
];

// ── Map helpers ─────────────────────────────────────────────────────────
function FlyTo({ target, zoom }: { target: LngLat | null; zoom: number }) {
  const map = useMap();
  React.useEffect(() => {
    if (target) map.flyTo(L.latLng(target[1], target[0]), zoom, { duration: 0.8 });
  }, [map, target, zoom]);
  return null;
}

function FitBounds({ bounds, pad }: { bounds: [LngLat, LngLat] | null; pad: number }) {
  const map = useMap();
  const key = bounds ? bounds.join(",") : "";
  React.useEffect(() => {
    if (!bounds) return;
    const [[w, s], [e, n]] = bounds;
    map.fitBounds(L.latLngBounds(L.latLng(s, w), L.latLng(n, e)), { padding: [pad, pad] });
  }, [map, key, pad]);
  return null;
}

function ZoomControl() {
  const map = useMap();
  return (
    <div className="absolute right-3 bottom-3 z-[500] flex flex-col border border-slate-300 bg-white shadow">
      <button type="button" onClick={() => map.zoomIn()} aria-label="Zoom in" className="p-1.5 text-slate-700 hover:bg-slate-100">
        <Plus className="h-3.5 w-3.5" />
      </button>
      <div className="border-t border-slate-200" />
      <button type="button" onClick={() => map.zoomOut()} aria-label="Zoom out" className="p-1.5 text-slate-700 hover:bg-slate-100">
        <Minus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function ScaleControl() {
  const map = useMap();
  React.useEffect(() => {
    const c = L.control.scale({ position: "bottomleft", imperial: false, maxWidth: 120 });
    c.addTo(map);
    return () => {
      c.remove();
    };
  }, [map]);
  return null;
}

/** Clicking bare basemap clears the selection — standard GIS behaviour. */
function DeselectOnBackground({ onClear }: { onClear: () => void }) {
  useMapEvents({ click: onClear });
  return null;
}

// ── Parcel shape ────────────────────────────────────────────────────────
const ParcelShape = React.memo(function ParcelShape({
  parcel,
  bandKey,
  color,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  parcel: Parcel;
  bandKey: string;
  color: string;
  selected: boolean;
  hovered: boolean;
  onSelect: () => void;
  onHover: (v: boolean) => void;
}) {
  const label = React.useMemo(
    () =>
      L.divIcon({
        className: "trx-label",
        html: `<span class="trx-label--${selected ? "selected" : bandKey === "delayed" ? "blocked" : "none"}">${parcel.surveyNo}</span>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      }),
    [parcel.surveyNo, selected, bandKey],
  );

  return (
    <>
      <Polygon
        positions={toLatLngs(parcel.ring)}
        pathOptions={{
          color: selected ? "#0F2340" : color,
          weight: selected ? 3 : hovered ? 2.5 : 1.6,
          fillColor: color,
          fillOpacity: selected ? 0.55 : hovered ? 0.45 : 0.26,
          dashArray: bandKey === "not_started" ? "4 3" : undefined,
        }}
        eventHandlers={{ click: (e) => { L.DomEvent.stopPropagation(e); onSelect(); }, mouseover: () => onHover(true), mouseout: () => onHover(false) }}
      >
        <Tooltip direction="top" offset={[0, -4]} opacity={0.96}>
          <span className="font-semibold">S.No. {parcel.surveyNo}</span>
          <br />
          {parcel.areaHa} ha · {parcel.village}
        </Tooltip>
      </Polygon>
      <Marker position={parcel.centroid} icon={label} interactive={false} keyboard={false} />
    </>
  );
});

// ── Page ────────────────────────────────────────────────────────────────
export function GisPage() {
  const [params] = useSearchParams();

  const basemap = useLandAdmin((s) => s.basemap);
  const setBasemap = useLandAdmin((s) => s.setBasemap);
  const selectedId = useLandAdmin((s) => s.selectedParcelId);
  const selectParcel = useLandAdmin((s) => s.selectParcel);
  const bandFilter = useLandAdmin((s) => s.parcelStatusFilter);
  const toggleBand = useLandAdmin((s) => s.toggleParcelStatus);

  const [query, setQuery] = React.useState("");
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [showLegend, setShowLegend] = React.useState(true);
  const [showLayers] = React.useState(true);
  const [contextOn, setContextOn] = React.useState(true);
  // Open on the first survey block rather than the whole district: a 300 m
  // parcel is a 20 px dot at district zoom, and the point of the screen is the
  // parcel shape. "District view" in the toolbar steps back out.
  const [fly, setFly] = React.useState<{ target: LngLat; zoom: number } | null>(() => {
    const first = PARCELS[0];
    return first ? { target: first.centroid, zoom: 17 } : null;
  });

  const selected = React.useMemo(() => PARCELS.find((p) => p.id === selectedId) ?? null, [selectedId]);

  // Deep link from a case page: /gis?parcel=<parcelId> or ?case=<caseId>
  React.useEffect(() => {
    const p = params.get("parcel");
    const c = params.get("case");
    if (!p && !c) return;
    const target = p ? PARCELS.find((x) => x.id === p) : parcelForCase(c!);
    if (target) {
      selectParcel(target.id);
      setFly({ target: target.centroid, zoom: 18 });
    }
  }, [params, selectParcel]);

  const visible = React.useMemo(
    () => (bandFilter.length === 0 ? PARCELS : PARCELS.filter((p) => bandFilter.includes(bandFor(findCaseById(p.caseId)!).key))),
    [bandFilter],
  );

  const searchResults = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return PARCELS.filter((p) => {
      const c = findCaseById(p.caseId);
      return (
        p.surveyNo.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q) ||
        p.taluk.toLowerCase().includes(q) ||
        (c?.caseNo.toLowerCase().includes(q) ?? false)
      );
    }).slice(0, 8);
  }, [query]);

  const counts = React.useMemo(() => {
    const m = new Map<string, number>();
    for (const p of PARCELS) {
      const k = bandFor(findCaseById(p.caseId)!).key;
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return m;
  }, []);

  const [searchResultsOpen, setSearchResultsOpen] = React.useState(false);

  const goTo = React.useCallback(
    (p: Parcel) => {
      setQuery("");
      setSearchResultsOpen(false);
      selectParcel(p.id);
      setFly({ target: p.centroid, zoom: 18 });
    },
    [selectParcel],
  );

  const resetView = () => {
    selectParcel(null);
    setFly({ target: DISTRICT.centre, zoom: 13 });
  };

  return (
    <div className="flex h-[calc(100vh-96px)] min-h-[560px] flex-col">
      {/* ── Toolbar ──────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-300 bg-white px-3 py-2">
        <div className="relative min-w-[240px] flex-1 sm:max-w-[420px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchResultsOpen(true);
            }}
            onFocus={() => setSearchResultsOpen(true)}
            placeholder="Search Survey Number, Case ID or Village…"
            aria-label="Search survey number, case ID or village"
            className="w-full border border-slate-300 py-1.5 pl-8 pr-7 text-[12.5px] placeholder:text-slate-400 focus:border-[#0F2340] focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          {searchResultsOpen && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-[800] mt-1 max-h-72 overflow-y-auto border border-slate-300 bg-white shadow-lg">
              {searchResults.map((p) => {
                const c = findCaseById(p.caseId);
                const band = bandFor(c!);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => goTo(p)}
                    className="flex w-full items-center gap-2 border-b border-slate-100 px-2.5 py-1.5 text-left last:border-0 hover:bg-blue-50"
                  >
                    <span className="h-2.5 w-2.5 shrink-0" style={{ background: band.color }} aria-hidden />
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[12px] font-medium text-slate-900">S.No. {p.surveyNo}</span>
                      <span className="block truncate text-[11px] text-slate-500">
                        {p.village} · {p.taluk} · {p.areaHa} ha
                      </span>
                    </span>
                    {c && <span className="shrink-0 font-mono text-[10.5px] text-slate-400">{c.caseNo}</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Basemap switch */}
        <div className="flex border border-slate-300" role="group" aria-label="Basemap">
          {(Object.keys(BASEMAPS) as BasemapKey[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setBasemap(k)}
              className={cn(
                "px-2.5 py-1.5 text-[11.5px] font-medium",
                basemap === k ? "bg-[#0F2340] text-white" : "bg-white text-slate-600 hover:bg-slate-50",
              )}
            >
              {BASEMAPS[k].label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setContextOn((v) => !v)}
          className={cn("flex items-center gap-1.5 border px-2.5 py-1.5 text-[11.5px] font-medium", contextOn ? "border-slate-400 bg-slate-100 text-slate-800" : "border-slate-300 text-slate-600")}
        >
          <Layers className="h-3.5 w-3.5" /> Context
        </button>

        <button
          type="button"
          onClick={() => setShowLegend((v) => !v)}
          className={cn("flex items-center gap-1.5 border px-2.5 py-1.5 text-[11.5px] font-medium", showLegend ? "border-slate-400 bg-slate-100 text-slate-800" : "border-slate-300 text-slate-600")}
        >
          <CheckCircle2 className="h-3.5 w-3.5" /> Legend
        </button>

        <button
          type="button"
          onClick={resetView}
          className="flex items-center gap-1.5 border border-slate-300 px-2.5 py-1.5 text-[11.5px] font-medium text-slate-600 hover:bg-slate-50"
        >
          <Locate className="h-3.5 w-3.5" /> District view
        </button>

        <span className="ml-auto font-mono text-[10.5px] text-slate-400">
          {visible.length} / {PARCELS.length} parcels · synthetic geometry
        </span>
      </div>

      {/* ── Map + panels ─────────────────────────────────────────────── */}
      <div className="relative min-h-0 flex-1">
        <MapContainer
          center={[DISTRICT.centre[1], DISTRICT.centre[0]]}
          zoom={13}
          minZoom={10}
          maxZoom={19}
          zoomControl={false}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer key={basemap} url={BASEMAPS[basemap].url} attribution={BASEMAPS[basemap].attribution} maxZoom={19} />
          <ScaleControl />
          <ZoomControl />
          <DeselectOnBackground onClear={() => selectParcel(null)} />
          <FlyTo target={fly?.target ?? null} zoom={fly?.zoom ?? 11} />
          {selected && <FitBounds bounds={ringBounds(selected.ring)} pad={110} />}

          {/* Village survey-block outlines, drawn beneath the parcels. */}
          {VILLAGE_FOOTPRINTS.map((v) => (
            <Polygon
              key={`halo-${v.id}`}
              positions={toLatLngs(expandRing(v.ring, 40))}
              pathOptions={{ color: "#0F2340", weight: 1.2, dashArray: "6 4", fill: false, interactive: false }}
            />
          ))}

          {contextOn &&
            CONTEXT_LINES.map((l) => (
              <Polyline
                key={l.label}
                positions={l.coords.map(([lng, lat]) => [lat, lng] as [number, number])}
                pathOptions={{ color: l.kind === "water" ? "#38BDF8" : "#F59E0B", weight: l.kind === "water" ? 3 : 2.5, opacity: 0.75 }}
              >
                <Tooltip sticky className="text-[11px]">
                  {l.label}
                </Tooltip>
              </Polyline>
            ))}

          {visible.map((p) => {
            const c = findCaseById(p.caseId);
            if (!c) return null;
            const band = bandFor(c);
            return (
              <ParcelShape
                key={p.id}
                parcel={p}
                bandKey={band.key}
                color={band.color}
                selected={selectedId === p.id}
                hovered={hovered === p.id}
                onSelect={() => selectParcel(p.id)}
                onHover={(v) => setHovered(v ? p.id : null)}
              />
            );
          })}
        </MapContainer>

        {/* Legend / filter */}
        {showLegend && (
          <div className="absolute left-3 top-3 z-[600] w-[212px] border border-slate-300 bg-white shadow-md">
            <p className="border-b border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-slate-600">
              Acquisition status
            </p>
            <div className="p-1.5">
              {PARCEL_STATUS_BANDS.map((b) => {
                const on = bandFilter.includes(b.key);
                const count = counts.get(b.key) ?? 0;
                return (
                  <button
                    key={b.key}
                    type="button"
                    onClick={() => toggleBand(b.key)}
                    className={cn(
                      "flex w-full items-center gap-2 px-1.5 py-1 text-left text-[11.5px] hover:bg-slate-50",
                      on && "bg-blue-50 font-semibold text-[#0F2340]",
                    )}
                    aria-pressed={on}
                  >
                    <span className="h-3 w-3 shrink-0 border border-black/15" style={{ background: b.color, opacity: on || bandFilter.length === 0 ? 1 : 0.3 }} aria-hidden />
                    <span className="min-w-0 flex-1 truncate text-slate-700">{b.label}</span>
                    <span className="font-mono text-[10.5px] text-slate-500">{count}</span>
                  </button>
                );
              })}
              {bandFilter.length > 0 && (
                <button
                  type="button"
                  onClick={() => bandFilter.forEach((k) => toggleBand(k))}
                  className="mt-1 w-full border-t border-slate-200 px-1.5 pt-1.5 text-[11px] text-slate-500 hover:text-slate-800"
                >
                  Clear filter
                </button>
              )}
            </div>
            <p className="border-t border-slate-200 px-2.5 py-1.5 text-[10px] leading-snug text-slate-400">
              Dashed outline = village survey block. Boundaries are synthetic demonstration geometry.
            </p>
          </div>
        )}

        {/* Selected parcel detail */}
        {selected && <ParcelDetailCard parcel={selected} onClose={() => selectParcel(null)} />}

        {/* Context list */}
        {showLayers && !selected && (
          <div className="absolute right-3 top-3 z-[600] max-h-[calc(100%-2.75rem)] w-[248px] overflow-y-auto border border-slate-300 bg-white shadow-md">
            <p className="sticky top-0 border-b border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-slate-600">
              Survey blocks in view
            </p>
            <div className="p-1">
              {Array.from(new Set(PARCELS.map((p) => p.villageId))).map((vid) => {
                const rows = PARCELS.filter((p) => p.villageId === vid);
                return (
                  <div key={vid} className="mb-1 last:mb-0">
                    <p className="px-1.5 py-1 text-[11px] font-semibold text-slate-700">
                      {rows[0].village} <span className="font-normal text-slate-400">· {rows[0].taluk}</span>
                    </p>
                    {rows.map((p) => {
                      const c = findCaseById(p.caseId);
                      if (!c) return null;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => goTo(p)}
                          className="flex w-full items-center gap-1.5 px-1.5 py-1 text-left text-[11px] hover:bg-blue-50"
                        >
                          <span className="h-2 w-2 shrink-0" style={{ background: bandFor(c).color }} aria-hidden />
                          <span className="font-mono text-slate-800">{p.surveyNo}</span>
                          <span className="ml-auto shrink-0 font-mono text-[9.5px] text-slate-400">{p.areaHa} ha</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Docked detail card shown when a parcel is selected. */
function ParcelDetailCard({ parcel, onClose }: { parcel: Parcel; onClose: () => void }) {
  const c = findCaseById(parcel.caseId);
  if (!c) return null;
  const band = bandFor(c);

  return (
    <div className="absolute bottom-3 left-3 z-[600] w-[320px] border border-slate-300 bg-white shadow-xl">
      <div className="flex items-start justify-between gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
        <div className="min-w-0">
          <p className="font-mono text-[13px] font-semibold leading-tight text-[#0F2340]">S.No. {parcel.surveyNo}</p>
          <p className="truncate text-[10.5px] text-slate-500">
            {parcel.village} · {parcel.taluk} · {parcel.district}
          </p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close parcel details" className="shrink-0 p-0.5 text-slate-400 hover:text-slate-700">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-2.5 p-3">
        <div className="grid grid-cols-2 gap-2">
          <Cell k="Area" v={`${parcel.areaHa} ha`} mono />
          <Cell k="Classification" v={parcel.landClassification} />
        </div>

        <div className="border-t border-slate-200 pt-2.5">
          <Link to={`/land-admin/cases/${c.id}`} className="font-mono text-[12.5px] font-semibold text-[#0F2340] hover:underline">
            {c.caseNo}
          </Link>
          <p className="mt-0.5 text-[11px] text-slate-500">{c.acquisition.purpose}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          <Pill tone="slate" dot>
            <span style={{ color: band.color }}>●</span> {band.label}
          </Pill>
          <CompensationPill status={c.compensationStatus} />
          <RnrPill status={c.rnrStatus} />
        </div>

        <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11.5px]">
          <Cell k="Approved" v={inr(c.compensation.approved)} small />
          <Cell k="Paid" v={inr(c.compensation.paid)} small />
          <Cell k="Households" v={num(c.affectedHouseholds)} small />
          <Cell k="Days pending" v={`${c.daysPending} / ${c.stageSlaDays}`} small tone={c.daysPending > c.stageSlaDays ? "red" : undefined} />
        </dl>

        <div className="flex gap-2 pt-0.5">
          <Link
            to={`/land-admin/cases/${c.id}`}
            className="flex flex-1 items-center justify-center gap-1.5 bg-[#0F2340] py-1.5 text-[12px] font-semibold text-white hover:bg-[#1A3560]"
          >
            View Case
          </Link>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(`${c.caseNo} · S.No. ${parcel.surveyNo} · ${parcel.village}`).catch(() => {});
            }}
            title="Copy case reference"
            className="border border-slate-300 px-2.5 text-[11.5px] text-slate-600 hover:bg-slate-50"
          >
            <ScanSearch className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Cell({ k, v, mono, small, tone }: { k: string; v: string; mono?: boolean; small?: boolean; tone?: "red" }) {
  return (
    <div className="min-w-0">
      <dt className="text-[9.5px] font-medium uppercase tracking-wide text-slate-500">{k}</dt>
      <dd
        className={cn(
          "truncate text-slate-900",
          small ? "text-[11.5px]" : "text-[12.5px]",
          mono && "font-mono tabular-nums",
          tone === "red" && "font-semibold text-red-700",
        )}
        title={v}
      >
        {v}
      </dd>
    </div>
  );
}
