import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RESETTLEMENT_SITES, FAMILY_ALLOCATIONS, SITE_READINESS } from "./rrOfficerData";
import { ArrowLeft, MapPin, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const siteStatusColors: Record<string, string> = {
  identified: "bg-blue-100 text-blue-800",
  planning: "bg-indigo-100 text-indigo-800",
  under_development: "bg-amber-100 text-amber-800",
  ready: "bg-green-100 text-green-800",
  partially_occupied: "bg-purple-100 text-purple-800",
  operational: "bg-emerald-100 text-emerald-800",
};

const allocColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  allocated: "bg-blue-100 text-blue-800",
  move_planned: "bg-indigo-100 text-indigo-800",
  relocated: "bg-purple-100 text-purple-800",
  verified: "bg-green-100 text-green-800",
};

const readinessLabels: Record<string, string> = {
  roadAccess: "Road Access",
  water: "Water",
  electricity: "Electricity",
  drainage: "Drainage",
  housing: "Housing",
  communityInfrastructure: "Community Infra",
  healthAccess: "Health Access",
  educationAccess: "Education Access",
  livelihoodAccess: "Livelihood Access",
};

export default function RrAllocationPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Family Allocation & Resettlement</h1>
        <p className="text-sm text-muted-foreground mt-1">{FAMILY_ALLOCATIONS.length} allocations tracked</p>
      </div>

      {/* Site Readiness for primary site */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Site Readiness — {SITE_READINESS.siteId}</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {Object.entries(SITE_READINESS).filter(([key]) => key !== "siteId").map(([key, value]) => (
              <div key={key} className={`flex items-center gap-2 p-3 rounded-lg ${value === "ready" ? "bg-green-50" : value === "partial" ? "bg-amber-50" : value === "pending" ? "bg-red-50" : "bg-gray-50"}`}>
                {value === "ready" ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : value === "partial" ? <Clock className="h-4 w-4 text-amber-600" /> : <AlertTriangle className="h-4 w-4 text-red-600" />}
                <div>
                  <p className="text-sm font-medium">{readinessLabels[key]}</p>
                  <Badge className={`text-xs ${value === "ready" ? "bg-green-100 text-green-800" : value === "partial" ? "bg-amber-100 text-amber-800" : value === "pending" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-600"}`}>{value}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Site Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {RESETTLEMENT_SITES.map((site) => (
          <Card key={site.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#0F2340]">{site.id}</h3>
                    <Badge className={`text-xs ${siteStatusColors[site.status]}`}>{site.status.replace(/_/g, " ")}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {site.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#0F2340]">{site.siteReadiness}%</p>
                  <p className="text-xs text-muted-foreground">Readiness</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${site.siteReadiness}%` }} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Planned: </span><span className="font-medium">{site.familiesPlanned}</span></div>
                <div><span className="text-muted-foreground">Allocated: </span><span className="font-medium">{site.familiesAllocated}</span></div>
                <div><span className="text-muted-foreground">Utilities: </span><Badge className={`text-xs ${site.utilities === "ready" ? "bg-green-100 text-green-800" : site.utilities === "partial" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}>{site.utilities}</Badge></div>
                <div><span className="text-muted-foreground">Housing: </span><Badge className={`text-xs ${site.housing === "ready" ? "bg-green-100 text-green-800" : site.housing === "partial" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}>{site.housing}</Badge></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Allocation Table */}
      <Card>
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Family Allocations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Family</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Original Village</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">New Site</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">House/Site Ref</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Move Date</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Evidence</th>
                </tr>
              </thead>
              <tbody>
                {FAMILY_ALLOCATIONS.map((a) => (
                  <tr key={a.familyId} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{a.familyName}</td>
                    <td className="p-2">{a.originalVillage}</td>
                    <td className="p-2">{a.newSite}</td>
                    <td className="p-2"><Badge className={`text-xs ${allocColors[a.allocationStatus]}`}>{a.allocationStatus.replace(/_/g, " ")}</Badge></td>
                    <td className="p-2 font-mono text-xs">{a.houseSiteRef || "—"}</td>
                    <td className="p-2 text-xs">{a.moveDate || "—"}</td>
                    <td className="p-2 text-center">{a.evidenceCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button className="bg-[#1B5E20] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2E7D32]">
              Assign Site
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
