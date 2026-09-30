import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PUBLIC_ASSETS } from "./siaExpertData";
import { ArrowLeft, Building2, Plus } from "lucide-react";

const severityColors: Record<string, string> = {
  none: "bg-green-100 text-green-800",
  minor: "bg-blue-100 text-blue-800",
  moderate: "bg-amber-100 text-amber-800",
  major: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

export default function SiaPublicAssetsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Workspace
          </Link>
          <h1 className="text-2xl font-bold text-[#0F2340]">Public / Common Assets</h1>
          <p className="text-sm text-muted-foreground mt-1">{PUBLIC_ASSETS.length} assets identified across 4 villages</p>
        </div>
        <button className="bg-[#1B5E20] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#2E7D32]">
          <Plus className="h-4 w-4" /> Add Asset
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {["critical", "major", "moderate", "minor"].map((sev) => {
          const count = PUBLIC_ASSETS.filter((a) => a.severity === sev).length;
          return (
            <Card key={sev} className={`border-l-4 border-l-${severityColors[sev].split(" ")[0].replace("bg-", "")}`}>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground capitalize">{sev} Severity</p>
                <p className="text-2xl font-bold text-[#0F2340]">{count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Assets Table */}
      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Asset ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Village</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Location</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Impact</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Severity</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Evidence</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {PUBLIC_ASSETS.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{a.id}</td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {a.assetType}
                      </div>
                    </td>
                    <td className="p-2">{a.village}</td>
                    <td className="p-2 text-xs max-w-[180px] truncate">{a.location}</td>
                    <td className="p-2 text-xs max-w-[200px] truncate">{a.impact}</td>
                    <td className="p-2">
                      <Badge className={`text-xs ${severityColors[a.severity]}`}>{a.severity}</Badge>
                    </td>
                    <td className="p-2 text-center">{a.evidenceCount}</td>
                    <td className="p-2 text-xs max-w-[200px] truncate text-muted-foreground">{a.remarks}</td>
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
