import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AFFECTED_FAMILIES } from "./siaExpertData";
import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";

const assessmentStatusColors: Record<string, string> = {
  not_started: "bg-gray-100 text-gray-800",
  in_progress: "bg-amber-100 text-amber-800",
  completed: "bg-green-100 text-green-800",
};

export default function SiaFamiliesPage() {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const family = AFFECTED_FAMILIES.find((f) => f.id === selectedFamily);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Affected Family Register</h1>
        <p className="text-sm text-muted-foreground mt-1">{AFFECTED_FAMILIES.length} families identified across 4 villages</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Table */}
        <Card>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium text-muted-foreground">ID</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Name</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Village</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Land</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {AFFECTED_FAMILIES.map((f) => (
                    <tr key={f.id} className={`border-b hover:bg-gray-50 cursor-pointer ${selectedFamily === f.id ? "bg-blue-50" : ""}`} onClick={() => setSelectedFamily(f.id)}>
                      <td className="p-2 font-mono text-xs">{f.id}</td>
                      <td className="p-2 font-medium">{f.name}</td>
                      <td className="p-2">{f.village}</td>
                      <td className="p-2">{f.landHolding}</td>
                      <td className="p-2"><Badge className={`text-xs ${assessmentStatusColors[f.assessmentStatus]}`}>{f.assessmentStatus}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Detail Panel */}
        {family ? (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-5">
                <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Household</h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Family ID:</span> <span className="font-mono">{family.id}</span></div>
                  <div><span className="text-muted-foreground">Head of Family:</span> <span className="font-medium">{family.headOfFamily}</span></div>
                  <div><span className="text-muted-foreground">Household Size:</span> <span>{family.householdSize}</span></div>
                  <div><span className="text-muted-foreground">Village:</span> <span>{family.village}</span></div>
                  <div><span className="text-muted-foreground">Occupation:</span> <span>{family.occupation}</span></div>
                  <div><span className="text-muted-foreground">Income Source:</span> <span>{family.incomeSource}</span></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Land</h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">ULPIN:</span> <span className="font-mono text-xs">{family.ulpin}</span></div>
                  <div><span className="text-muted-foreground">Parcel:</span> <span className="font-mono text-xs">{family.parcelId}</span></div>
                  <div><span className="text-muted-foreground">Area:</span> <span>{family.landHolding}</span></div>
                  <div><span className="text-muted-foreground">Use:</span> <span>{family.landUse}</span></div>
                  <div><span className="text-muted-foreground">Displacement:</span> <Badge className={`text-xs ${family.displacement === "full" ? "bg-red-100 text-red-800" : family.displacement === "partial" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>{family.displacement}</Badge></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Impact</h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">{family.residentialDisplacement ? <CheckCircle2 className="h-4 w-4 text-red-600" /> : <span className="h-4 w-4" />} Residential Displacement</div>
                  <div className="flex items-center gap-2">{family.agriculturalImpact ? <CheckCircle2 className="h-4 w-4 text-amber-600" /> : <span className="h-4 w-4" />} Agricultural Impact</div>
                  <div className="flex items-center gap-2">{family.commercialImpact ? <CheckCircle2 className="h-4 w-4 text-amber-600" /> : <span className="h-4 w-4" />} Commercial Impact</div>
                  <div className="flex items-center gap-2">{family.communityImpact ? <CheckCircle2 className="h-4 w-4 text-amber-600" /> : <span className="h-4 w-4" />} Community Impact</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Vulnerability</h2>
                <div className="space-y-2">
                  {family.vulnerabilityIndicators.map((v, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-3 w-3 text-amber-500" />
                      {v}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <p>Select a family from the table to view details</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
