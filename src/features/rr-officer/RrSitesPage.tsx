import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RESETTLEMENT_SITES } from "./rrOfficerData";
import { ArrowLeft, MapPin } from "lucide-react";

const statusColors: Record<string, string> = {
  identified: "bg-blue-100 text-blue-800",
  planning: "bg-indigo-100 text-indigo-800",
  under_development: "bg-amber-100 text-amber-800",
  ready: "bg-green-100 text-green-800",
  partially_occupied: "bg-purple-100 text-purple-800",
  operational: "bg-emerald-100 text-emerald-800",
};

export default function RrSitesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Resettlement Sites</h1>
        <p className="text-sm text-muted-foreground mt-1">{RESETTLEMENT_SITES.length} sites tracked</p>
      </div>

      <div className="space-y-6">
        {RESETTLEMENT_SITES.map((site) => (
          <Card key={site.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#0F2340]">{site.id}</h3>
                    <Badge className={`text-xs ${statusColors[site.status]}`}>{site.status.replace(/_/g, " ")}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {site.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#0F2340]">{site.siteReadiness}%</p>
                  <p className="text-xs text-muted-foreground">Readiness</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${site.siteReadiness}%` }} />
              </div>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div><span className="text-muted-foreground">Families Planned: </span><span className="font-medium">{site.familiesPlanned}</span></div>
                <div><span className="text-muted-foreground">Allocated: </span><span className="font-medium">{site.familiesAllocated}</span></div>
                <div><span className="text-muted-foreground">Utilities: </span><Badge className={`text-xs ${site.utilities === "ready" ? "bg-green-100 text-green-800" : site.utilities === "partial" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}>{site.utilities}</Badge></div>
                <div><span className="text-muted-foreground">Housing: </span><Badge className={`text-xs ${site.housing === "ready" ? "bg-green-100 text-green-800" : site.housing === "partial" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}>{site.housing}</Badge></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
