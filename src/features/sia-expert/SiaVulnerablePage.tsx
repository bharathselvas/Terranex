import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AFFECTED_FAMILIES } from "./siaExpertData";
import { ArrowLeft } from "lucide-react";

export default function SiaVulnerablePage() {
  const vulnerable = AFFECTED_FAMILIES.filter((f) => f.vulnerabilityIndicators.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Vulnerable Groups</h1>
        <p className="text-sm text-muted-foreground mt-1">{vulnerable.length} households with vulnerability indicators</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Female-Headed</p>
            <p className="text-2xl font-bold text-[#0F2340]">{AFFECTED_FAMILIES.filter((f) => f.vulnerabilityIndicators.includes("Female-headed household")).length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Elderly Household</p>
            <p className="text-2xl font-bold text-[#0F2340]">{AFFECTED_FAMILIES.filter((f) => f.vulnerabilityIndicators.includes("Elderly household")).length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Person with Disability</p>
            <p className="text-2xl font-bold text-[#0F2340]">{AFFECTED_FAMILIES.filter((f) => f.vulnerabilityIndicators.includes("Person with disability")).length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Family ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Village</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Household</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Vulnerability Indicators</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Displacement</th>
                </tr>
              </thead>
              <tbody>
                {vulnerable.map((f) => (
                  <tr key={f.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{f.id}</td>
                    <td className="p-2 font-medium">{f.name}</td>
                    <td className="p-2">{f.village}</td>
                    <td className="p-2">{f.householdSize}</td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {f.vulnerabilityIndicators.map((v, i) => (
                          <Badge key={i} className="text-xs bg-amber-100 text-amber-800">{v}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge className={`text-xs ${f.displacement === "full" ? "bg-red-100 text-red-800" : f.displacement === "partial" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>{f.displacement}</Badge>
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
