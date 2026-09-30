import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OBJECTIONS, type ObjectionEntry } from "./districtCollectorData";

const categoryLabels: Record<string, string> = {
  ownership: "Ownership", measurement: "Measurement", land_requirement: "Land Requirement",
  compensation: "Compensation", livelihood: "Livelihood", procedural: "Procedural", other: "Other",
};

const statusLabels: Record<string, string> = {
  filed: "Filed", review: "Under Review", hearing: "Hearing Scheduled", decision_pending: "Decision Pending",
  resolved: "Resolved", escalated: "Escalated",
};

const statusColors: Record<string, string> = {
  filed: "bg-blue-100 text-blue-800", review: "bg-amber-100 text-amber-800", hearing: "bg-purple-100 text-purple-800",
  decision_pending: "bg-orange-100 text-orange-800", resolved: "bg-emerald-100 text-emerald-800", escalated: "bg-red-100 text-red-800",
};

const decisionLabels: Record<string, string> = {
  upheld: "Upheld", partially_upheld: "Partially Upheld", rejected: "Rejected", requires_verification: "Requires Verification",
};

const decisionColors: Record<string, string> = {
  upheld: "bg-emerald-100 text-emerald-800", partially_upheld: "bg-amber-100 text-amber-800",
  rejected: "bg-red-100 text-red-800", requires_verification: "bg-orange-100 text-orange-800",
};

export default function CollectorObjectionHearingPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const obj = OBJECTIONS.find((o) => o.id === selected);

  const openObjections = OBJECTIONS.filter((o) => o.status !== "resolved");
  const resolvedObjections = OBJECTIONS.filter((o) => o.status === "resolved");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Objections &amp; Hearings</h1>
        <p className="text-sm text-muted-foreground">Track objections, hearing decisions, and reasoning documentation</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Open Objections ({openObjections.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {openObjections.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setSelected(o.id)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selected === o.id ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{o.landownerName}</p>
                    <Badge className={statusColors[o.status]}>{statusLabels[o.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{o.parcelId} &middot; {o.village}</p>
                  <p className="text-xs text-muted-foreground">{o.projectName}</p>
                  <div className="mt-1 flex gap-2">
                    <Badge variant="outline" className="text-[10px]">{categoryLabels[o.category]}</Badge>
                    <span className="text-[10px] text-muted-foreground">Filed: {o.filedDate}</span>
                    {o.hearingScheduledDate && <span className="text-[10px] text-muted-foreground">Hearing: {o.hearingScheduledDate}</span>}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Objection Details</CardTitle>
          </CardHeader>
          <CardContent>
            {obj ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{obj.landownerName}</p>
                  <p className="text-xs text-muted-foreground">{obj.parcelId} &middot; {obj.village}</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <div><p className="text-xs text-muted-foreground">Category</p><Badge variant="outline">{categoryLabels[obj.category]}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Description</p><p className="text-xs">{obj.description}</p></div>
                  <div><p className="text-xs text-muted-foreground">Representative</p><p className="text-xs font-medium">{obj.representative}</p></div>
                  <div><p className="text-xs text-muted-foreground">Assigned Officer</p><p className="text-xs font-medium">{obj.assignedOfficer}</p></div>
                  <div><p className="text-xs text-muted-foreground">Filed Date</p><p className="text-xs">{obj.filedDate}</p></div>
                  <div><p className="text-xs text-muted-foreground">Hearing Scheduled</p><p className="text-xs font-medium">{obj.hearingScheduledDate || "—"}</p></div>
                  {obj.decision && (
                    <div><p className="text-xs text-muted-foreground">Decision</p><Badge className={decisionColors[obj.decision]}>{decisionLabels[obj.decision]}</Badge></div>
                  )}
                  {obj.reasoning && (
                    <div><p className="text-xs text-muted-foreground">Reasoning</p><p className="text-xs">{obj.reasoning}</p></div>
                  )}
                </div>
                <div className="flex gap-2">
                  {obj.status === "hearing" && (
                    <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Record Hearing Decision</button>
                  )}
                  {obj.status === "review" && (
                    <button className="rounded-lg border border-[#0F2340] px-4 py-2 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5">Schedule Hearing</button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select an objection</div>
            )}
          </CardContent>
        </Card>
      </div>

      {resolvedObjections.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Resolved ({resolvedObjections.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {resolvedObjections.map((o) => (
                <div key={o.id} className="flex items-center justify-between rounded border p-2">
                  <div>
                    <p className="text-xs font-medium">{o.landownerName} &middot; {o.parcelId}</p>
                    <p className="text-[10px] text-muted-foreground">{o.projectName}</p>
                  </div>
                  <Badge className={decisionColors[o.decision ?? "upheld"]}>{decisionLabels[o.decision ?? "upheld"]}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
