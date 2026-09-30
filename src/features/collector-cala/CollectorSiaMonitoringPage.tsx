import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SIA_DATA } from "./districtCollectorData";

const statusLabels: Record<string, string> = {
  not_started: "Not Started", assigned: "Assigned", in_progress: "In Progress", submitted: "Submitted",
  under_review: "Under Review", completed: "Completed", returned: "Returned",
};

const statusColors: Record<string, string> = {
  not_started: "bg-gray-100 text-gray-700", assigned: "bg-blue-100 text-blue-800", in_progress: "bg-amber-100 text-amber-800",
  submitted: "bg-purple-100 text-purple-800", under_review: "bg-orange-100 text-orange-800",
  completed: "bg-emerald-100 text-emerald-800", returned: "bg-red-100 text-red-800",
};

const reportColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700", submitted: "bg-blue-100 text-blue-800", under_review: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800", pending: "bg-gray-100 text-gray-700",
};

export default function CollectorSiaMonitoringPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const sia = SIA_DATA.find((s) => s.projectId === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">SIA Monitoring</h1>
        <p className="text-sm text-muted-foreground">Social Impact Assessment progress tracking</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Projects ({SIA_DATA.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {SIA_DATA.map((s) => (
                <button
                  key={s.projectId}
                  onClick={() => setSelected(s.projectId)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selected === s.projectId ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{s.projectName}</p>
                    <Badge className={statusColors[s.status]}>{statusLabels[s.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.affectedFamilies} families &middot; {s.affectedVillages.join(", ")}</p>
                  {s.startDate && <p className="text-[10px] text-muted-foreground">Started: {s.startDate} &middot; Target: {s.targetDate}</p>}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">SIA Details</CardTitle>
          </CardHeader>
          <CardContent>
            {sia ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{sia.projectName}</p>
                  <p className="text-xs text-muted-foreground">Authority: {sia.siaAuthority}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground">Status</p><Badge className={statusColors[sia.status]}>{statusLabels[sia.status]}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Report</p><Badge className={reportColors[sia.reportStatus]}>{sia.reportStatus}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Start Date</p><p className="text-sm font-medium">{sia.startDate || "—"}</p></div>
                  <div><p className="text-xs text-muted-foreground">Target Date</p><p className="text-sm font-medium">{sia.targetDate || "—"}</p></div>
                  <div><p className="text-xs text-muted-foreground">Affected Families</p><p className="text-sm font-medium">{sia.affectedFamilies.toLocaleString()}</p></div>
                  <div><p className="text-xs text-muted-foreground">Villages</p><p className="text-sm font-medium">{sia.affectedVillages.join(", ")}</p></div>
                </div>
                {sia.status === "in_progress" && (
                  <div className="flex gap-2">
                    <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Review SIA Report</button>
                    <button className="rounded-lg border border-amber-300 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50">Request Clarification</button>
                  </div>
                )}
                {sia.status === "completed" && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
                    <p className="text-xs text-emerald-700">SIA completed. Report approved. Ready for Section 11 notification.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select a project</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
