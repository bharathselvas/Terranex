import { MapPin, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DISTRICT_DATA, STATE_PROJECTS } from "@/features/state-nodal/stateNodalData";

export function StateGisPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">State GIS</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Geographic view — Maharashtra state-wide project and parcel distribution</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-[560px]">
            <CardContent className="p-0 h-full relative overflow-hidden bg-slate-100">
              <svg viewBox="0 0 800 600" className="w-full h-full" style={{ background: "linear-gradient(135deg, #e0e7ef 0%, #c7d2de 100%)" }}>
                <path d="M150,100 L650,100 L700,200 L680,400 L600,500 L400,550 L200,500 L120,400 L100,200 Z" fill="none" stroke="#1a3560" strokeWidth="2" strokeDasharray="8 4" opacity="0.4" />
                <text x="400" y="80" textAnchor="middle" fill="#0F2340" fontSize="14" fontWeight="700">Maharashtra — State Boundary</text>

                {DISTRICT_DATA.map((d, i) => {
                  const cx = 200 + (i % 4) * 140 + (i >= 4 ? 70 : 0);
                  const cy = 160 + Math.floor(i / 4) * 140;
                  const size = Math.max(40, Math.min(70, d.parcels / 150));
                  return (
                    <g key={d.id}>
                      <rect x={cx - size / 2} y={cy - size / 2} width={size} height={size} fill="#2a4a6b" opacity="0.12" stroke="#1a3560" strokeWidth="1" rx="6" />
                      <text x={cx} y={cy - 8} textAnchor="middle" fill="#0F2340" fontSize="10" fontWeight="600">{d.name}</text>
                      <text x={cx} y={cy + 6} textAnchor="middle" fill="#0F2340" fontSize="8">{d.projects} projects</text>
                      <text x={cx} y={cy + 18} textAnchor="middle" fill="#64748b" fontSize="7">{d.parcels.toLocaleString()} parcels</text>
                    </g>
                  );
                })}

                {STATE_PROJECTS.slice(0, 6).map((p, i) => {
                  const district = DISTRICT_DATA.find((d) => d.name === p.district);
                  if (!district) return null;
                  const idx = DISTRICT_DATA.indexOf(district);
                  const cx = 200 + (idx % 4) * 140 + (idx >= 4 ? 70 : 0) + (i * 12 - 30);
                  const cy = 160 + Math.floor(idx / 4) * 140 + 35 + (i * 8);
                  return (
                    <circle key={p.id} cx={cx} cy={cy} r={4} fill={p.risk === "critical" ? "#dc2626" : p.risk === "high" ? "#ea580c" : "#1a3560"} opacity="0.7" />
                  );
                })}
              </svg>

              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <p className="text-[10px] font-semibold text-slate-700 mb-2">Layers</p>
                <div className="space-y-1">
                  {["State Boundary", "District Boundaries", "Project Footprints", "Acquisition Parcels", "Risk Indicators", "Compensation Status", "Possession Status", "R&R Status", "Notification Coverage"].map((l) => (
                    <label key={l} className="flex items-center gap-1.5 text-[10px] text-slate-600">
                      <input type="checkbox" defaultChecked className="rounded" />
                      {l}
                    </label>
                  ))}
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <p className="text-[10px] font-semibold text-slate-700 mb-1">Legend</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px]"><div className="w-3 h-3 rounded bg-red-600" /> Critical</div>
                  <div className="flex items-center gap-1.5 text-[10px]"><div className="w-3 h-3 rounded bg-orange-500" /> High Risk</div>
                  <div className="flex items-center gap-1.5 text-[10px]"><div className="w-3 h-3 rounded bg-[#1a3560]" /> Normal</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-[#0F2340] mb-3">District Summary</h3>
              <div className="space-y-2">
                {DISTRICT_DATA.slice(0, 6).map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-2 border rounded text-[11px]">
                    <div>
                      <p className="font-medium text-[#0F2340]">{d.name}</p>
                      <p className="text-muted-foreground">{d.projects} projects · {d.parcels.toLocaleString()} parcels</p>
                    </div>
                    <Badge className={`text-[9px] ${d.risk === "critical" ? "bg-red-100 text-red-800" : d.risk === "high" ? "bg-orange-100 text-orange-800" : "bg-slate-100 text-slate-700"}`}>{d.risk}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
