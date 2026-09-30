import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  ExternalLink,
  Layers,
  AlertTriangle,
  Building2,
  IndianRupee,
  Home,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { STATE_SUMMARIES, MONITORING_PROJECTS } from "@/features/admin/adminData";
import { stageShortLabel, formatINR } from "@/lib/format";

const stateIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:28px;height:28px;border-radius:50%;background:#0F2340;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center"><div style="width:8px;height:8px;border-radius:50%;background:white"></div></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const riskIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:24px;height:24px;border-radius:50%;background:#B42318;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center"><div style="width:6px;height:6px;border-radius:50%;background:white"></div></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const activeIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:20px;height:20px;border-radius:50%;background:#0F7A5A;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.25)"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

type LayerKey = "active" | "delayed" | "compensation" | "rr" | "conflicts";

const LAYERS: { key: LayerKey; label: string; color: string }[] = [
  { key: "active", label: "Active Projects", color: "#0F7A5A" },
  { key: "delayed", label: "Delayed Projects", color: "#B42318" },
  { key: "compensation", label: "Compensation", color: "#1D4ED8" },
  { key: "rr", label: "R&R", color: "#7C3AED" },
  { key: "conflicts", label: "Project Conflicts", color: "#C96A1A" },
];

function MapFlyTo({ center }: { center: [number, number] | null }) {
  const map = useMap();
  if (center) {
    map.flyTo(center, 7, { duration: 1 });
  }
  return null;
}

export function NationalGisPage() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [activeLayers, setActiveLayers] = useState<Set<LayerKey>>(new Set(["active"]));
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);

  const toggleLayer = (key: LayerKey) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const stateData = STATE_SUMMARIES.find((s) => s.state === selectedState);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">National GIS</h1>
          <p className="text-xs text-muted-foreground">India-wide land acquisition command center</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        {/* Map */}
        <Card className="overflow-hidden">
          <div className="h-[600px] relative">
            <MapContainer
              center={[22.5, 82]}
              zoom={5}
              className="h-full w-full"
              zoomControl={true}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {flyTarget && <MapFlyTo center={flyTarget} />}
              {STATE_SUMMARIES.map((s) => {
                const showMarker = activeLayers.has("active") ||
                  (activeLayers.has("delayed") && s.delayed > 0) ||
                  (activeLayers.has("compensation"));
                if (!showMarker) return null;
                const icon = activeLayers.has("delayed") && s.delayed > 0 ? riskIcon : stateIcon;
                return (
                  <Marker
                    key={s.state}
                    position={s.center}
                    icon={icon}
                    eventHandlers={{
                      click: () => {
                        setSelectedState(s.state);
                        setFlyTarget(s.center);
                      },
                    }}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <p className="font-semibold text-sm">{s.state}</p>
                        <p className="text-xs text-slate-600 mt-1">Projects: {s.projects}</p>
                        <p className="text-xs text-slate-600">Parcels: {s.parcels.toLocaleString("en-IN")}</p>
                        <p className="text-xs text-slate-600">Active: {s.activeAcquisitions}</p>
                        <p className="text-xs text-slate-600">Delayed: {s.delayed}</p>
                        <p className="text-xs text-emerald-600 font-medium mt-1">Disbursed: {s.compensationDisbursed}</p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>

            {/* Layer controls overlay */}
            <div className="absolute top-3 right-3 z-[1000] bg-white rounded-lg border shadow-md p-3">
              <p className="text-[11px] font-semibold text-slate-700 mb-2 flex items-center gap-1">
                <Layers className="h-3.5 w-3.5" /> Layers
              </p>
              {LAYERS.map((l) => (
                <label key={l.key} className="flex items-center gap-2 cursor-pointer py-0.5">
                  <input
                    type="checkbox"
                    checked={activeLayers.has(l.key)}
                    onChange={() => toggleLayer(l.key)}
                    className="h-3.5 w-3.5 rounded border-slate-300"
                  />
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: l.color }} />
                  <span className="text-[11px] text-slate-700">{l.label}</span>
                </label>
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur rounded-lg border p-2.5">
              <p className="text-[10px] font-semibold text-slate-600 mb-1">State Markers</p>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] text-slate-600">
                  <span className="w-3 h-3 rounded-full bg-[#0F2340] border-2 border-white shadow" /> Normal
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-slate-600">
                  <span className="w-3 h-3 rounded-full bg-[#B42318] border-2 border-white shadow" /> Delayed
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Side panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">State Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {stateData ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-base font-semibold text-[#0F2340]">{stateData.state}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-md bg-slate-50 p-2">
                      <p className="text-[10px] text-muted-foreground">Projects</p>
                      <p className="text-lg font-bold text-[#0F2340]">{stateData.projects}</p>
                    </div>
                    <div className="rounded-md bg-slate-50 p-2">
                      <p className="text-[10px] text-muted-foreground">Parcels</p>
                      <p className="text-lg font-bold text-[#0F2340]">{stateData.parcels.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="rounded-md bg-slate-50 p-2">
                      <p className="text-[10px] text-muted-foreground">Active</p>
                      <p className="text-lg font-bold text-emerald-600">{stateData.activeAcquisitions}</p>
                    </div>
                    <div className="rounded-md bg-slate-50 p-2">
                      <p className="text-[10px] text-muted-foreground">Delayed</p>
                      <p className="text-lg font-bold text-[#B42318]">{stateData.delayed}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-[11px] text-muted-foreground">Compensation Disbursed</p>
                    <p className="text-sm font-semibold text-emerald-600">{stateData.compensationDisbursed}</p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/app/admin/monitoring">
                      View Projects <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <MapPin className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Click a state marker to view details</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* State list */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">States & UTs</CardTitle>
            </CardHeader>
            <CardContent className="p-0 max-h-[300px] overflow-auto">
              {STATE_SUMMARIES.map((s) => (
                <button
                  key={s.state}
                  onClick={() => {
                    setSelectedState(s.state);
                    setFlyTarget(s.center);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs border-b last:border-0 hover:bg-slate-50 transition-colors ${selectedState === s.state ? "bg-slate-50" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">{s.state}</span>
                    <span className="text-[10px] text-muted-foreground">{s.projects} projects</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{s.parcels.toLocaleString("en-IN")} parcels</span>
                    {s.delayed > 0 && (
                      <span className="text-[10px] text-[#B42318] font-medium">{s.delayed} delayed</span>
                    )}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
