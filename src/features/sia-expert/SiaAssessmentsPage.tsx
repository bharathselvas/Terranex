import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SIA_ASSESSMENTS } from "./siaExpertData";
import { ChevronRight, BarChart3 } from "lucide-react";

const statusColors: Record<string, string> = {
  assigned: "bg-blue-100 text-blue-800",
  in_progress: "bg-amber-100 text-amber-800",
  consultation_pending: "bg-orange-100 text-orange-800",
  evidence_pending: "bg-red-100 text-red-800",
  draft: "bg-purple-100 text-purple-800",
  ready_for_submission: "bg-indigo-100 text-indigo-800",
  submitted: "bg-emerald-100 text-emerald-800",
  accepted: "bg-green-100 text-green-800",
  clarification_required: "bg-rose-100 text-rose-800",
};

const statusLabels: Record<string, string> = {
  assigned: "Assigned",
  in_progress: "In Progress",
  consultation_pending: "Consultation Pending",
  evidence_pending: "Evidence Pending",
  draft: "Draft",
  ready_for_submission: "Ready for Submission",
  submitted: "Submitted",
  accepted: "Accepted",
  clarification_required: "Clarification Required",
};

export default function SiaAssessmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <BarChart3 className="h-4 w-4" />
          <span>Workspace / SIA Expert Group / Assessments</span>
        </div>
        <h1 className="text-2xl font-bold text-[#0F2340]">My Assessments</h1>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">SIA ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Project</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Requiring Org</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">State</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">District</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Villages</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Families</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Progress</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Consultation</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Evidence</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Due</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {SIA_ASSESSMENTS.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs font-medium">{a.id}</td>
                    <td className="p-2 max-w-[180px] truncate">{a.projectName}</td>
                    <td className="p-2">{a.requiringOrg}</td>
                    <td className="p-2">{a.state}</td>
                    <td className="p-2">{a.district}</td>
                    <td className="p-2">{a.villages.length}</td>
                    <td className="p-2 text-center">{a.affectedFamilies}</td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${a.progress}%` }} />
                        </div>
                        <span className="text-xs">{a.progress}%</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge className={`text-xs ${a.consultationStatus === "completed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                        {a.consultationStatus}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Badge className={`text-xs ${a.evidenceStatus === "complete" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {a.evidenceStatus}
                      </Badge>
                    </td>
                    <td className="p-2 text-xs">{a.dueDate}</td>
                    <td className="p-2">
                      <Badge className={`text-xs ${statusColors[a.status]}`}>{statusLabels[a.status]}</Badge>
                    </td>
                    <td className="p-2">
                      <Link to={`/app/sia/workspace/${a.id}`} className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                        Open <ChevronRight className="h-3 w-3" />
                      </Link>
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
