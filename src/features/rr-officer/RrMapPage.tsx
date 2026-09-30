import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RR_CASES, RESETTLEMENT_SITES, FAMILY_ALLOCATIONS, GRIEVANCES } from "./rrOfficerData";
import { ArrowLeft, MapPin } from "lucide-react";

const siteStatusColors: Record<string, string> = {
  identified: "bg-blue-100 text-blue-800",
  planning: "bg-indigo-100 text-indigo-800",
  under_development: "bg-amber-100 text-amber-800",
  ready: "bg-green-100 text-green-800",
  partially_occupied: "bg-purple-100 text-purple-800",
  operational: "bg-emerald-100 text-emerald-800",
};

export default function RrMapPage() {
  const villages = [...new Set(RR_CASES.map((c) => c.village))];
  const grievanceVillages = [...new Set(GRIEVANCES.filter((g) => g.status !== "resolved").map((g) => {
    const c = RR_CASES.find((cc) => cc.familyId === g.familyId);
    return c?.village || "";
  }).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">R&R Map View</h1>
        <p className="text-sm text-muted-foreground mt-1">Geographic overview of R&R operations</p>
      </div>

      {/* Mock Map */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Geographic Overview</h2>
          <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-amber-50 rounded-lg border-2 border-dashed border-gray-300 min-h-[400px] p-6">
            {/* Village markers */}
            {villages.map((v, i) => {
              const caseCount = RR_CASES.filter((c) => c.village === v).length;
              const hasGrievance = grievanceVillages.includes(v);
              const positions = [
                { top: "20%", left: "25%" },
                { top: "35%", left: "55%" },
                { top: "25%", left: "75%" },
                { top: "60%", left: "40%" },
              ];
              const pos = positions[i % positions.length];
              return (
                <div key={v} className="absolute" style={{ top: pos.top, left: pos.left }}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${hasGrievance ? "bg-red-500" : "bg-blue-600"} shadow-lg cursor-pointer`}>
                    {caseCount}
                  </div>
                  <p className="text-xs font-medium text-center mt-1 bg-white rounded px-1 shadow">{v}</p>
                </div>
              );
            })}

            {/* Resettlement Site markers */}
            {RESETTLEMENT_SITES.map((s, i) => {
              const positions = [
                { top: "50%", left: "30%" },
                { top: "45%", left: "60%" },
                { top: "70%", left: "50%" },
                { top: "40%", left: "80%" },
              ];
              const pos = positions[i % positions.length];
              return (
                <div key={s.id} className="absolute" style={{ top: pos.top, left: pos.left }}>
                  <div className={`w-12 h-8 rounded flex items-center justify-center text-white text-[10px] font-bold ${s.status === "operational" ? "bg-green-600" : s.status === "partially_occupied" ? "bg-purple-600" : "bg-amber-600"} shadow-lg cursor-pointer`}>
                    {s.id.split("-").pop()}
                  </div>
                  <p className="text-[10px] text-center mt-1 bg-white rounded px-1 shadow max-w-[100px] truncate">{s.location}</p>
                </div>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 text-xs space-y-1">
              <p className="font-semibold mb-2">Legend</p>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-600" />
                <span>Affected Village</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500" />
                <span>Village with Grievance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-600" />
                <span>Resettlement Site (Operational)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-purple-600" />
                <span>Resettlement Site (Partial)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-600" />
                <span>Resettlement Site (Developing)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Site Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Resettlement Sites</h2>
            <div className="space-y-3">
              {RESETTLEMENT_SITES.map((s) => (
                <div key={s.id} className="p-3 bg-gray-50 rounded flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs">{s.id}</span>
                      <Badge className={`text-xs ${siteStatusColors[s.status]}`}>{s.status.replace(/_/g, " ")}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {s.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{s.familiesAllocated}/{s.familiesPlanned}</p>
                    <p className="text-xs text-muted-foreground">families</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Allocation Status</h2>
            <div className="space-y-3">
              {FAMILY_ALLOCATIONS.map((a) => (
                <div key={a.familyId} className="p-3 bg-gray-50 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{a.familyName}</p>
                      <p className="text-xs text-muted-foreground">{a.originalVillage} → {a.newSite}</p>
                    </div>
                    <Badge className={`text-xs ${a.allocationStatus === "relocated" ? "bg-green-100 text-green-800" : a.allocationStatus === "allocated" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"}`}>{a.allocationStatus.replace(/_/g, " ")}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
