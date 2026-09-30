import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WORK_QUEUE } from "./siaExpertData";
import { ChevronRight, AlertTriangle, Clock, FileText, CheckCircle2 } from "lucide-react";

const priorityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

const typeIcons: Record<string, typeof CheckCircle2> = {
  new_assignment: FileText,
  consultation_pending: AlertTriangle,
  evidence_incomplete: AlertTriangle,
  draft_report: FileText,
  clarification_request: AlertTriangle,
  submission_due: Clock,
};

export default function SiaWorkQueuePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Clock className="h-4 w-4" />
          <span>Workspace / SIA Expert Group / Work Queue</span>
        </div>
        <h1 className="text-2xl font-bold text-[#0F2340]">My Work Queue</h1>
        <p className="text-sm text-muted-foreground mt-1">Tasks requiring action across all assigned assessments</p>
      </div>

      <div className="space-y-4">
        {WORK_QUEUE.map((w) => {
          const Icon = typeIcons[w.type] || FileText;
          return (
            <Card key={w.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-lg ${w.priority === "critical" ? "bg-red-50" : w.priority === "high" ? "bg-orange-50" : "bg-gray-50"}`}>
                    <Icon className={`h-5 w-5 ${w.priority === "critical" ? "text-red-600" : w.priority === "high" ? "text-orange-600" : "text-gray-600"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#0F2340]">{w.title}</h3>
                      <Badge className={`text-xs ${priorityColors[w.priority]}`}>{w.priority}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{w.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span>Due: {w.dueDate}</span>
                      {w.assessmentId && (
                        <Link to={`/app/sia/workspace/${w.assessmentId}`} className="text-blue-600 hover:underline flex items-center gap-1">
                          View Assessment <ChevronRight className="h-3 w-3" />
                        </Link>
                      )}
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
