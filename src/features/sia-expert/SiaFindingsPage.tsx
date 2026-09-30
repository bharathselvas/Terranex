import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SIA_FINDINGS } from "./siaExpertData";
import { ArrowLeft } from "lucide-react";

const ratingColors: Record<string, string> = {
  low: "bg-green-100 text-green-800 border-green-300",
  moderate: "bg-amber-100 text-amber-800 border-amber-300",
  high: "bg-orange-100 text-orange-800 border-orange-300",
  severe: "bg-red-100 text-red-800 border-red-300",
};

const ratingBg: Record<string, string> = {
  low: "bg-green-50",
  moderate: "bg-amber-50",
  high: "bg-orange-50",
  severe: "bg-red-50",
};

export default function SiaFindingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">SIA Findings</h1>
        <p className="text-sm text-muted-foreground mt-1">Impact ratings across 7 assessment categories</p>
      </div>

      <div className="space-y-4">
        {SIA_FINDINGS.map((f) => (
          <Card key={f.category} className={`border-l-4 border-l-${ratingColors[f.rating].split(" ")[0].replace("bg-", "")}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#0F2340]">{f.label}</h2>
                </div>
                <Badge className={`text-sm font-semibold ${ratingColors[f.rating]}`}>{f.rating.toUpperCase()}</Badge>
              </div>
              
              <div className={`p-4 rounded-lg mb-3 ${ratingBg[f.rating]}`}>
                <p className="text-sm font-medium text-[#0F2340] mb-1">Expert Observation</p>
                <p className="text-sm text-muted-foreground">{f.expertObservation}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Evidence Reference:</span>
                  <p className="mt-1">{f.evidenceReference}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Remarks:</span>
                  <p className="mt-1">{f.remarks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
