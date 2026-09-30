import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RR_PLAN_COMPONENTS } from "./rrOfficerData";
import { ArrowLeft } from "lucide-react";

const statusColors: Record<string, string> = {
  not_applicable: "bg-gray-100 text-gray-600",
  pending_verification: "bg-amber-100 text-amber-800",
  planned: "bg-blue-100 text-blue-800",
  in_progress: "bg-indigo-100 text-indigo-800",
  delivered: "bg-purple-100 text-purple-800",
  verified: "bg-green-100 text-green-800",
  under_review: "bg-orange-100 text-orange-800",
  requires_review: "bg-rose-100 text-rose-800",
};

const COMPONENTS = ["Subsistence", "Transportation", "Livelihood", "Employment", "Skill Development", "Special Support"];

export default function RrComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">R&R Components</h1>
        <p className="text-sm text-muted-foreground mt-1">All rehabilitation & resettlement components</p>
      </div>

      <div className="space-y-4">
        {COMPONENTS.map((name) => {
          const comp = RR_PLAN_COMPONENTS.find((c) => c.name === name);
          return (
            <Card key={name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-[#0F2340]">{name}</h3>
                  <Badge className={`text-xs ${statusColors[comp?.status || "pending_verification"]}`}>{comp?.status?.replace(/_/g, " ") || "Not set"}</Badge>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Applicable: </span>
                    <span className="font-medium">{comp?.applicable ? "Yes" : "No"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Target: </span>
                    <span>{comp?.targetDate || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Evidence: </span>
                    <span>{comp?.evidenceCount || 0} items</span>
                  </div>
                </div>
                {comp?.remarks && <p className="text-xs text-muted-foreground mt-2 p-2 bg-gray-50 rounded">{comp.remarks}</p>}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
