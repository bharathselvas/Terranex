import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GRIEVANCES } from "./rrOfficerData";
import { ArrowLeft } from "lucide-react";

const priorityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

const statusColors: Record<string, string> = {
  open: "bg-red-100 text-red-800",
  under_review: "bg-amber-100 text-amber-800",
  awaiting_evidence: "bg-orange-100 text-orange-800",
  action_required: "bg-rose-100 text-rose-800",
  resolved: "bg-green-100 text-green-800",
  escalated: "bg-red-200 text-red-900",
};

const categoryColors: Record<string, string> = {
  housing: "bg-blue-100 text-blue-800",
  livelihood: "bg-green-100 text-green-800",
  relocation: "bg-purple-100 text-purple-800",
  support_delivery: "bg-amber-100 text-amber-800",
  employment: "bg-cyan-100 text-cyan-800",
  skill_training: "bg-indigo-100 text-indigo-800",
  other: "bg-gray-100 text-gray-800",
};

export default function RrGrievancesPage() {
  const openCount = GRIEVANCES.filter((g) => g.status !== "resolved").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Grievances</h1>
        <p className="text-sm text-muted-foreground mt-1">{openCount} open / {GRIEVANCES.length} total</p>
      </div>

      <div className="space-y-4">
        {GRIEVANCES.map((g) => (
          <Card key={g.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#0F2340]">{g.id}</h3>
                    <Badge className={`text-xs ${priorityColors[g.priority]}`}>{g.priority}</Badge>
                    <Badge className={`text-xs ${statusColors[g.status]}`}>{g.status.replace(/_/g, " ")}</Badge>
                    <Badge className={`text-xs ${categoryColors[g.category]}`}>{g.category.replace(/_/g, " ")}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Family: {g.family} ({g.familyId})</p>
                </div>
              </div>
              <p className="text-sm mb-3">{g.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Component: {g.relatedComponent}</span>
                <span>Assigned: {g.assignedTo}</span>
                <span>Due: {g.dueDate}</span>
                <span>Filed: {g.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
