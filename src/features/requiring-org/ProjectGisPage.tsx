import { MapPin, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RO_PROJECTS, PARCELS_DATA } from "@/features/requiring-org/roIAData";
import { stageLabel } from "@/lib/format";

export function ProjectGisPage() {
  const project = RO_PROJECTS[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Project GIS</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Project-focused geographic view — {project.projectName}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-[500px]">
            <CardContent className="p-0 h-full relative overflow-hidden bg-slate-100">
              <svg viewBox="0 0 800 600" className="w-full h-full" style={{ background: "linear-gradient(135deg, #e0e7ef 0%, #c7d2de 100%)" }}>
                <path d="M100,200 L700,200 L700,400 L100,400 Z" fill="none" stroke="#1a3560" strokeWidth="2" strokeDasharray="8 4" opacity="0.4" />
                <text x="400" y="180" textAnchor="middle" fill="#0F2340" fontSize="12" fontWeight="600">Project Boundary — {project.projectName}</text>
                <rect x="200" y="250" width="120" height="80" fill="#2a4a6b" opacity="0.15" stroke="#1a3560" strokeWidth="1" rx="4" />
                <text x="260" y="295" textAnchor="middle" fill="#0F2340" fontSize="9">Pune (842 parcels)</text>
                <rect x="400" y="280" width="100" height="60" fill="#2a4a6b" opacity="0.15" stroke="#1a3560" strokeWidth="1" rx="4" />
                <text x="450" y="315" textAnchor="middle" fill="#0F2340" fontSize="9">Satara (442 parcels)</text>
                <line x1="320" y1="290" x2="400" y2="310" stroke="#1a3560" strokeWidth="1" strokeDasharray="4 2" />
              </svg>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <p className="text-[10px] font-semibold text-slate-700 mb-2">Layers</p>
                <div className="space-y-1">
                  {["Project Boundary", "Acquisition Parcels", "Excluded Parcels", "State Boundary", "District Boundary", "Village Boundary", "Objection Parcels", "Compensation Status", "Possession Status", "R&R Status"].map((l) => (
                    <label key={l} className="flex items-center gap-1.5 text-[10px] text-slate-600">
                      <input type="checkbox" defaultChecked className="rounded" />
                      {l}
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Parcel Details</h3>
              <div className="space-y-2">
                {PARCELS_DATA.slice(0, 4).map((p) => (
                  <div key={p.id} className="border rounded p-2 text-[11px]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-[#0F2340]">{p.ulpin}</span>
                      <Badge variant="secondary" className="text-[9px]">{stageLabel(p.stage)}</Badge>
                    </div>
                    <p className="text-muted-foreground">{p.surveyNo} • {p.village} • {p.areaHa} Ha</p>
                    <p className="text-muted-foreground">{p.owner} • {p.landClassification}</p>
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
