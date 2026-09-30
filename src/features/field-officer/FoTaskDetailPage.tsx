import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_TASKS } from "./fieldOfficerData";
import { ArrowLeft, MapPin, CheckCircle2, Camera, FileText, User, Home } from "lucide-react";

const statusColors: Record<string, string> = {
  assigned: "bg-blue-100 text-blue-800", accepted: "bg-indigo-100 text-indigo-800",
  in_progress: "bg-amber-100 text-amber-800", draft_saved: "bg-purple-100 text-purple-800",
  submitted: "bg-emerald-100 text-emerald-800", needs_reverification: "bg-orange-100 text-orange-800",
  completed: "bg-emerald-100 text-emerald-800", overdue: "bg-red-100 text-red-800",
};

const taskTypeLabels: Record<string, string> = {
  ownership_verification: "Ownership Verification",
  asset_verification: "Asset Verification",
  field_verification: "Field Verification",
  possession_evidence: "Possession Evidence",
  rr_enumeration: "R&R Enumeration",
  objection_evidence: "Objection Evidence",
};

export default function FoTaskDetailPage() {
  const { taskId } = useParams();
  const task = FIELD_TASKS.find((t) => t.id === taskId) ?? FIELD_TASKS[0];

  const evidenceItems = [
    { label: "GPS Location", done: task.gpsCaptured, icon: MapPin, link: `/app/fo/gps/${task.id}` },
    { label: "Photos Captured", done: task.photosCount > 0, icon: Camera, detail: `${task.photosCount} photos`, link: `/app/fo/gallery/${task.id}` },
    { label: "Owner Verified", done: task.ownerVerified, icon: User, link: `/app/fo/owner-verify/${task.id}` },
    { label: "Assets Enumerated", done: task.assetsEnumerated, icon: Home, detail: `${task.assetsEnumerated ? "Done" : "Pending"}`, link: `/app/fo/assets/${task.id}` },
    { label: "Observations", done: task.observationsCount > 0, icon: FileText, detail: `${task.observationsCount} recorded`, link: `/app/fo/observations/${task.id}` },
    { label: "Documents", done: task.documentsCount > 0, icon: FileText, detail: `${task.documentsCount} attached`, link: `/app/fo/documents/${task.id}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/app/fo/tasks" className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">{task.projectName}</h1>
          <p className="text-sm text-muted-foreground">Task Detail — {task.parcelId}</p>
        </div>
      </div>

      {/* Task Info */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-[10px] text-muted-foreground">Parcel</p><p className="text-sm font-medium">{task.parcelId}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Village</p><p className="text-sm font-medium">{task.village}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Tehsil</p><p className="text-sm font-medium">{task.tehsil}</p></div>
            <div><p className="text-[10px] text-muted-foreground">District</p><p className="text-sm font-medium">{task.district}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Task Type</p><p className="text-sm font-medium">{taskTypeLabels[task.taskType]}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Assigned By</p><p className="text-sm font-medium">{task.assignedBy}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Due Date</p><p className="text-sm font-medium">{task.dueDate.replace("T", " ")}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Distance</p><p className="text-sm font-medium">{task.distanceKm} km</p></div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Badge className={statusColors[task.status]}>{task.status.replace(/_/g, " ")}</Badge>
            <Badge className={`${task.priority === "critical" ? "bg-red-100 text-red-800" : task.priority === "high" ? "bg-orange-100 text-orange-800" : "bg-amber-100 text-amber-800"}`}>{task.priority}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Required Evidence */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Required Evidence</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {evidenceItems.map((item) => (
              <Link key={item.label} to={item.link} className={`flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-slate-50 ${item.done ? "border-emerald-300 bg-emerald-50/50" : "border-gray-200"}`}>
                <div className="flex items-center gap-3">
                  <item.icon className={`h-4 w-4 ${item.done ? "text-emerald-600" : "text-gray-400"}`} />
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    {item.detail && <p className="text-[10px] text-muted-foreground">{item.detail}</p>}
                  </div>
                </div>
                {item.done ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <span className="text-xs text-muted-foreground">Pending</span>}
              </Link>
            ))}
          </div>
          <div className="mt-3">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-[#0F2340]" style={{ width: `${(task.evidenceCount / task.evidenceRequired) * 100}%` }} />
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">{task.evidenceCount} / {task.evidenceRequired} evidence items collected</p>
          </div>
        </CardContent>
      </Card>

      {/* Start Visit */}
      {(task.status === "assigned" || task.status === "accepted") && (
        <Link to={`/app/fo/visit/${task.id}`} className="block">
          <Card className="border-[#0F2340] bg-[#0F2340] text-white shadow-md">
            <CardContent className="p-5 text-center">
              <p className="text-lg font-bold">Start Field Visit</p>
              <p className="text-xs text-blue-200">Begin GPS, photo, and evidence collection</p>
            </CardContent>
          </Card>
        </Link>
      )}

      {/* Submit */}
      {task.status === "in_progress" || task.status === "draft_saved" ? (
        <Link to={`/app/fo/submit/${task.id}`} className="block">
          <Card className="border-emerald-600 bg-emerald-600 text-white shadow-md">
            <CardContent className="p-5 text-center">
              <p className="text-lg font-bold">Submit Field Report</p>
              <p className="text-xs text-emerald-100">{task.evidenceCount}/{task.evidenceRequired} evidence collected</p>
            </CardContent>
          </Card>
        </Link>
      ) : null}
    </div>
  );
}
