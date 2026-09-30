import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MITIGATION_ITEMS } from "./siaExpertData";
import { ArrowLeft } from "lucide-react";

const priorityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

export default function SiaMitigationPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Mitigation & Recommendations</h1>
        <p className="text-sm text-muted-foreground mt-1">{MITIGATION_ITEMS.length} mitigation items documented</p>
      </div>

      <div className="space-y-4">
        {MITIGATION_ITEMS.map((m) => (
          <Card key={m.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-[#0F2340]">{m.impact}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Affected: {m.affectedGroup}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${priorityColors[m.priority]}`}>{m.priority}</Badge>
                  <Badge className={`text-xs ${statusColors[m.status]}`}>{m.status.replace("_", " ")}</Badge>
                </div>
              </div>
              <div className="p-3 rounded bg-gray-50 text-sm mb-3">
                <span className="text-muted-foreground">Recommendation: </span>{m.recommendation}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Responsible: {m.responsibleStakeholder}</span>
                <span>Evidence: {m.evidenceCount} items</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
