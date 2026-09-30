import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_TASKS } from "./rrOfficerData";
import { ArrowLeft, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const statusColors: Record<string, string> = {
  assigned: "bg-blue-100 text-blue-800",
  in_progress: "bg-amber-100 text-amber-800",
  completed: "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
};

const statusIcons: Record<string, typeof CheckCircle2> = {
  assigned: Clock,
  in_progress: Clock,
  completed: CheckCircle2,
  overdue: AlertTriangle,
};

export default function RrFieldCoordinationPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Field Coordination</h1>
        <p className="text-sm text-muted-foreground mt-1">{FIELD_TASKS.length} field tasks tracked</p>
      </div>

      <div className="space-y-4">
        {FIELD_TASKS.map((t) => {
          const Icon = statusIcons[t.status];
          return (
            <Card key={t.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${t.status === "overdue" ? "bg-red-50" : t.status === "completed" ? "bg-green-50" : "bg-blue-50"}`}>
                    <Icon className={`h-5 w-5 ${t.status === "overdue" ? "text-red-600" : t.status === "completed" ? "text-green-600" : "text-blue-600"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#0F2340]">{t.task}</h3>
                      <Badge className={`text-xs ${statusColors[t.status]}`}>{t.status.replace(/_/g, " ")}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Assigned to: {t.assignedTo} ({t.role})</span>
                      <span>Village: {t.village}</span>
                      <span>Due: {t.dueDate}</span>
                      <span>Case: {t.caseId}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
