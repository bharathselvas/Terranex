import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { SIA_PROJECT } from "./siaExpertData";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const MAP_LEGEND = [
  { label: "Project Footprint", color: "bg-blue-500", shape: "w-4 h-4 rounded" },
  { label: "Affected Parcel", color: "bg-red-400", shape: "w-4 h-4 rounded-sm" },
  { label: "Village", color: "bg-green-500", shape: "w-4 h-4 rounded-full" },
  { label: "Consultation", color: "bg-amber-500", shape: "w-4 h-4 rounded-full" },
  { label: "Public Asset", color: "bg-purple-500", shape: "w-4 h-4 rotate-45" },
  { label: "Assessment Evidence", color: "bg-cyan-500", shape: "w-4 h-4 rounded-sm" },
];

export default function SiaGisMapPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">GIS / Map View</h1>
        <p className="text-sm text-muted-foreground mt-1">Project footprint and affected areas — {SIA_PROJECT.projectName}</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Map Panel */}
        <div className="md:col-span-3">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-green-100 via-green-50 to-blue-50 h-[500px] relative">
              {/* Mock map overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Project corridor */}
                  <div className="absolute top-[20%] left-[15%] w-[70%] h-[8%] bg-blue-200 border-2 border-blue-500 rounded-lg opacity-60" />
                  
                  {/* Village markers */}
                  <div className="absolute top-[25%] left-[20%] w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">K</div>
                  <div className="absolute top-[35%] left-[35%] w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">W</div>
                  <div className="absolute top-[45%] left-[50%] w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">R</div>
                  <div className="absolute top-[55%] left-[65%] w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">BR</div>
                  
                  {/* Affected parcels */}
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`absolute w-3 h-3 bg-red-400 border border-red-600 rounded-sm`} style={{ top: `${20 + Math.random() * 30}%`, left: `${15 + Math.random() * 60}%` }} />
                  ))}
                  
                  {/* Consultation markers */}
                  <div className="absolute top-[22%] left-[22%] w-5 h-5 bg-amber-500 rounded-full border-2 border-white shadow" />
                  <div className="absolute top-[37%] left-[37%] w-5 h-5 bg-amber-500 rounded-full border-2 border-white shadow" />
                  <div className="absolute top-[47%] left-[52%] w-5 h-5 bg-amber-500 rounded-full border-2 border-white shadow" />
                  <div className="absolute top-[57%] left-[67%] w-5 h-5 bg-amber-500 rounded-full border-2 border-white shadow" />
                  
                  {/* Public assets */}
                  <div className="absolute top-[30%] left-[28%] w-4 h-4 bg-purple-500 rotate-45 border border-purple-700 shadow" />
                  <div className="absolute top-[42%] left-[45%] w-4 h-4 bg-purple-500 rotate-45 border border-purple-700 shadow" />
                  <div className="absolute top-[52%] left-[58%] w-4 h-4 bg-purple-500 rotate-45 border border-purple-700 shadow" />
                  
                  {/* Corridor label */}
                  <div className="absolute top-[15%] left-[45%] bg-white px-3 py-1 rounded shadow text-xs font-medium text-blue-800">
                    NH-544 Corridor
                  </div>
                </div>
              </div>
              
              {/* Map attribution */}
              <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs text-muted-foreground">
                Mock GIS View — Not real spatial data
              </div>
            </div>
          </Card>
        </div>

        {/* Legend & Info */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#0F2340] mb-3 text-sm">Map Legend</h3>
              <div className="space-y-2">
                {MAP_LEGEND.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`${item.shape} ${item.color}`} />
                    <span className="text-xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#0F2340] mb-3 text-sm">Project Info</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Footprint</span><span>{SIA_PROJECT.footprint}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Parcels</span><span>{SIA_PROJECT.affectedParcels}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Families</span><span>{SIA_PROJECT.estimatedFamilies}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Villages</span><span>{SIA_PROJECT.villages.length}</span></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                <p className="text-xs text-amber-800">This is a mock GIS visualization for demonstration purposes. Not real spatial analysis.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
