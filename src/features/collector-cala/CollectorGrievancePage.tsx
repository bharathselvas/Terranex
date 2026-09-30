import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GRIEVANCES } from "./districtCollectorData";

const statusLabels: Record<string, string> = {
  open: "Open", under_review: "Under Review", awaiting_evidence: "Awaiting Evidence",
  escalated: "Escalated", resolved: "Resolved",
};

const statusColors: Record<string, string> = {
  open: "bg-blue-100 text-blue-800", under_review: "bg-amber-100 text-amber-800",
  awaiting_evidence: "bg-purple-100 text-purple-800", escalated: "bg-red-100 text-red-800",
  resolved: "bg-emerald-100 text-emerald-800",
};

const priorityColor = (p: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[p] ?? "bg-gray-100 text-gray-700";
};

export default function CollectorGrievancePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const grievance = GRIEVANCES.find((g) => g.id === selected);

  const open = GRIEVANCES.filter((g) => g.status !== "resolved");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Grievance Management</h1>
        <p className="text-sm text-muted-foreground">Log, assign, adjudicate, and resolve land acquisition grievances</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div><p className="text-2xl font-bold text-[#0F2340]">{GRIEVANCES.length}</p><p className="text-xs text-muted-foreground">Total</p></div>
            <div><p className="text-2xl font-bold text-red-700">{GRIEVANCES.filter((g) => g.status === "open" || g.status === "escalated").length}</p><p className="text-xs text-muted-foreground">Open</p></div>
            <div><p className="text-2xl font-bold text-amber-700">{GRIEVANCES.filter((g) => g.status === "under_review" || g.status === "awaiting_evidence").length}</p><p className="text-xs text-muted-foreground">In Review</p></div>
            <div><p className="text-2xl font-bold text-emerald-700">{GRIEVANCES.filter((g) => g.status === "resolved").length}</p><p className="text-xs text-muted-foreground">Resolved</p></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Grievances ({open.length} open)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {GRIEVANCES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelected(g.id)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selected === g.id ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{g.id}</p>
                    <div className="flex gap-1">
                      <Badge className={priorityColor(g.priority)}>{g.priority}</Badge>
                      <Badge className={statusColors[g.status]}>{statusLabels[g.status]}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{g.projectName} &middot; {g.parcelId}</p>
                  <p className="text-xs text-muted-foreground">{g.category} &middot; Filed: {g.filedDate}</p>
                  {g.workflowImpact && <p className="mt-1 text-[10px] text-amber-700">{g.workflowImpact}</p>}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Grievance Details</CardTitle>
          </CardHeader>
          <CardContent>
            {grievance ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{grievance.id}</p>
                  <p className="text-xs text-muted-foreground">{grievance.projectName}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground">Category</p><p className="text-sm font-medium capitalize">{grievance.category}</p></div>
                  <div><p className="text-xs text-muted-foreground">Priority</p><Badge className={priorityColor(grievance.priority)}>{grievance.priority}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Status</p><Badge className={statusColors[grievance.status]}>{statusLabels[grievance.status]}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Filed</p><p className="text-sm font-medium">{grievance.filedDate}</p></div>
                  <div className="col-span-2"><p className="text-xs text-muted-foreground">Assigned Authority</p><p className="text-sm font-medium">{grievance.assignedAuthority}</p></div>
                  {grievance.workflowImpact && (
                    <div className="col-span-2 rounded-lg border border-amber-200 bg-amber-50/50 p-2">
                      <p className="text-xs font-medium text-amber-800">Workflow Impact</p>
                      <p className="text-[10px] text-amber-700">{grievance.workflowImpact}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {grievance.status === "open" && (
                    <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Assign for Review</button>
                  )}
                  {grievance.status === "under_review" && (
                    <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Record Decision</button>
                  )}
                  {grievance.status === "escalated" && (
                    <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Resolve Grievance</button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select a grievance</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
