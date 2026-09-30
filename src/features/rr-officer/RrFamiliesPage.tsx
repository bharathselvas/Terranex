import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FAMILY_PROFILES } from "./rrOfficerData";
import { ArrowLeft } from "lucide-react";

export default function RrFamiliesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Affected Families</h1>
        <p className="text-sm text-muted-foreground mt-1">{FAMILY_PROFILES.length} families in active R&R cases</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Family ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Head of Household</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Village</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Household</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Occupation</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Displacement</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Livelihood Impact</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Vulnerability</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Contact</th>
                </tr>
              </thead>
              <tbody>
                {FAMILY_PROFILES.map((f) => (
                  <tr key={f.familyId} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{f.familyId}</td>
                    <td className="p-2 font-medium">{f.headOfHousehold}</td>
                    <td className="p-2">{f.village}</td>
                    <td className="p-2 text-center">{f.householdSize}</td>
                    <td className="p-2">{f.occupation}</td>
                    <td className="p-2">
                      <Badge className={`text-xs ${f.displacementStatus === "full" ? "bg-red-100 text-red-800" : f.displacementStatus === "partial" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>{f.displacementStatus}</Badge>
                    </td>
                    <td className="p-2">
                      <Badge className={`text-xs ${f.livelihoodImpact === "full" ? "bg-red-100 text-red-800" : f.livelihoodImpact === "partial" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>{f.livelihoodImpact}</Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {f.vulnerabilityIndicators.filter((v) => v.verified).map((v, i) => (
                          <Badge key={i} className="text-xs bg-amber-100 text-amber-800">{v.indicator}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge className={`text-xs ${f.contactStatus === "available" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{f.contactStatus}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
