import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SIA_ASSESSMENTS, WORK_QUEUE, SIA_AUDIT_TRAIL } from "./siaExpertData";
import { LayoutDashboard, Clock, AlertTriangle, FileText, Send, ChevronRight, BarChart3 } from "lucide-react";
import { ProjectContextHeader } from "@/features/demo/ProjectContextHeader";
import { LifecycleStepper } from "@/features/demo/LifecycleStepper";

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

const priorityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

export default function SiaDashboardPage() {
  const assignedCount = SIA_ASSESSMENTS.filter((a) => a.status === "assigned" || a.status === "in_progress").length;
  const inProgressCount = SIA_ASSESSMENTS.filter((a) => a.status === "in_progress").length;
  const consultationPending = SIA_ASSESSMENTS.filter((a) => a.consultationStatus !== "completed").length;
  const draftCount = SIA_ASSESSMENTS.filter((a) => a.status === "draft").length;
  const submittedCount = SIA_ASSESSMENTS.filter((a) => a.status === "submitted").length;
  const clarificationCount = SIA_ASSESSMENTS.filter((a) => a.status === "clarification_required").length;
  const evidencePendingCount = SIA_ASSESSMENTS.filter((a) => a.evidenceStatus !== "complete").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ProjectContextHeader />
      <LifecycleStepper />

      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <LayoutDashboard className="h-4 w-4" />
          <span>Workspace / SIA Expert Group</span>
        </div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Social Impact Assessment Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">SIA Expert Group — Independent expert assessment workspace</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Assigned Assessments</p>
                <p className="text-2xl font-bold text-[#0F2340]">{assignedCount}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-[#0F2340]">{inProgressCount}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Consultations Pending</p>
                <p className="text-2xl font-bold text-[#0F2340]">{consultationPending}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Reports Drafted</p>
                <p className="text-2xl font-bold text-[#0F2340]">{draftCount}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-emerald-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Submitted</p>
                <p className="text-2xl font-bold text-[#0F2340]">{submittedCount}</p>
              </div>
              <Send className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-rose-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Clarification Required</p>
                <p className="text-2xl font-bold text-[#0F2340]">{clarificationCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-rose-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Evidence Incomplete</p>
                <p className="text-2xl font-bold text-[#0F2340]">{evidencePendingCount}</p>
              </div>
              <FileText className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#1B5E20]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold text-[#0F2340]">{SIA_ASSESSMENTS.length}</p>
              </div>
              <LayoutDashboard className="h-8 w-8 text-[#1B5E20]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessments Table */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#0F2340]">Active Assessments</h2>
            <Link to="/app/sia/assessments" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">SIA ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Project</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">District</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Families</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Progress</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Due</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {SIA_ASSESSMENTS.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs font-medium">{a.id}</td>
                    <td className="p-2 max-w-[200px] truncate">{a.projectName}</td>
                    <td className="p-2">{a.district}</td>
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
                      <Badge className={`text-xs ${statusColors[a.status]}`}>{statusLabels[a.status]}</Badge>
                    </td>
                    <td className="p-2 text-xs">{a.dueDate}</td>
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

      {/* Work Queue */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">My Work Queue</h2>
            <div className="space-y-3">
              {WORK_QUEUE.slice(0, 5).map((w) => (
                <div key={w.id} className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{w.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{w.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`text-xs ${priorityColors[w.priority]}`}>{w.priority}</Badge>
                      <span className="text-xs text-muted-foreground">Due: {w.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {SIA_AUDIT_TRAIL.slice(-6).reverse().map((a) => (
                <div key={a.id} className="flex gap-3 text-sm">
                  <div className="w-1 bg-blue-200 rounded-full flex-shrink-0" />
                  <div>
                    <p className="font-medium">{a.action}</p>
                    <p className="text-xs text-muted-foreground">{a.timestamp} — {a.actor}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
