import { useState } from "react";
import { MapPin, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MINISTRY_STATE_PROGRESS } from "@/features/ministry/ministryData";

const RISK_COLORS: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
  on_track: "bg-emerald-100 text-emerald-800",
};

export function MinistryGisPage() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [mapStyle, setMapStyle] = useState<"satellite" | "terrain">("satellite");

  const selectedData = MINISTRY_STATE_PROGRESS.find((s) => s.state === selectedState);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">MoRTH GIS Monitor</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ministry-level geographic view of acquisition projects across India
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Map placeholder */}
        <div className="lg:col-span-2">
          <Card className="h-[500px]">
            <CardContent className="p-0 h-full relative overflow-hidden bg-slate-100">
              {/* SVG Map of India */}
              <svg viewBox="0 0 800 700" className="w-full h-full" style={{ background: "linear-gradient(135deg, #e0e7ef 0%, #c7d2de 100%)" }}>
                {/* Simplified India outline */}
                <path
                  d="M250,50 L350,40 L450,60 L550,80 L650,120 L700,200 L720,300 L700,400 L650,500 L600,550 L550,580 L500,600 L450,620 L400,630 L350,620 L300,590 L250,550 L200,500 L180,450 L170,400 L180,350 L200,300 L220,250 L230,200 L240,150 L250,50Z"
                  fill="#2a4a6b"
                  stroke="#1a3560"
                  strokeWidth="2"
                  opacity="0.3"
                />

                {/* State markers */}
                {MINISTRY_STATE_PROGRESS.map((state) => {
                  const [lat, lng] = state.center;
                  const x = ((lng - 68) / 24) * 600 + 150;
                  const y = ((35 - lat) / 20) * 500 + 50;
                  const isSelected = selectedState === state.state;

                  return (
                    <g key={state.state} onClick={() => setSelectedState(state.state === selectedState ? null : state.state)} className="cursor-pointer">
                      <circle
                        cx={x}
                        cy={y}
                        r={Math.max(8, state.projects * 2)}
                        fill={state.risk === "critical" ? "#B42318" : state.risk === "high" ? "#E76F00" : state.risk === "medium" ? "#D97706" : state.risk === "on_track" ? "#0F7A5A" : "#2563EB"}
                        opacity={isSelected ? 1 : 0.7}
                        stroke={isSelected ? "#0F2340" : "white"}
                        strokeWidth={isSelected ? 3 : 1}
                      />
                      <text
                        x={x}
                        y={y - Math.max(8, state.projects * 2) - 6}
                        textAnchor="middle"
                        fill="#0F2340"
                        fontSize="10"
                        fontWeight="600"
                      >
                        {state.state}
                      </text>
                      <text
                        x={x}
                        y={y + 4}
                        textAnchor="middle"
                        fill="white"
                        fontSize="9"
                        fontWeight="500"
                      >
                        {state.projects}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <p className="text-[10px] font-semibold text-slate-700 mb-2">Risk Level</p>
                <div className="space-y-1">
                  {[
                    { label: "Critical", color: "bg-red-600" },
                    { label: "High", color: "bg-orange-500" },
                    { label: "Medium", color: "bg-amber-500" },
                    { label: "On Track", color: "bg-emerald-600" },
                    { label: "Low", color: "bg-blue-500" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <span className="text-[10px] text-slate-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => setMapStyle("satellite")}
                  className={`px-2 py-1 rounded text-[10px] font-medium ${mapStyle === "satellite" ? "bg-[#0F2340] text-white" : "bg-white/90 text-slate-700"}`}
                >
                  Satellite
                </button>
                <button
                  onClick={() => setMapStyle("terrain")}
                  className={`px-2 py-1 rounded text-[10px] font-medium ${mapStyle === "terrain" ? "bg-[#0F2340] text-white" : "bg-white/90 text-slate-700"}`}
                >
                  Terrain
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar details */}
        <div className="space-y-4">
          {selectedData ? (
            <>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-[#0F2340]">{selectedData.state}</h3>
                    <Badge className={`text-[10px] ${RISK_COLORS[selectedData.risk]}`}>
                      {selectedData.risk.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projects</span>
                      <span className="font-medium">{selectedData.projects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Parcels</span>
                      <span className="font-medium">{selectedData.parcels.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{selectedData.progress}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Compensation Assessed</span>
                      <span className="font-medium">{selectedData.compensationAssessed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Compensation Disbursed</span>
                      <span className="font-medium">{selectedData.compensationDisbursed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Possession</span>
                      <span className="font-medium">{selectedData.possessionComplete} / {selectedData.possessionPending}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">R&R</span>
                      <span className="font-medium">{selectedData.rrComplete} / {selectedData.rrPending}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delayed</span>
                      <span className={`font-medium ${selectedData.delayed > 0 ? "text-red-600" : ""}`}>
                        {selectedData.delayed}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Click a state marker on the map to view details</p>
              </CardContent>
            </Card>
          )}

          {/* State summary cards */}
          <div className="space-y-2">
            {MINISTRY_STATE_PROGRESS.filter((s) => s.delayed > 0).map((state) => (
              <Card key={state.state} className="cursor-pointer hover:bg-slate-50" onClick={() => setSelectedState(state.state)}>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-[#0F2340] truncate">{state.state}</p>
                      <p className="text-[10px] text-muted-foreground">{state.delayed} delayed project(s)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
