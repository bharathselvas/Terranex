import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_VERIFICATION, FIELD_OFFICERS, type FieldVerification } from "./districtCollectorData";

const statusLabels: Record<string, string> = {
  assigned: "Assigned", in_progress: "In Progress", completed: "Completed", discrepancy: "Discrepancy", overdue: "Overdue",
};

const statusColors: Record<string, string> = {
  assigned: "bg-blue-100 text-blue-800", in_progress: "bg-amber-100 text-amber-800", completed: "bg-emerald-100 text-emerald-800",
  discrepancy: "bg-red-100 text-red-800", overdue: "bg-red-100 text-red-800",
};

const riskColor = (r: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[r] ?? "bg-gray-100 text-gray-700";
};

export default function CollectorFieldVerificationPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const fv = FIELD_VERIFICATION.find((f) => f.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Field Verification</h1>
        <p className="text-sm text-muted-foreground">GPS verification, owner verification, and area validation</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="shadow-sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-bold text-[#0F2340]">{FIELD_VERIFICATION.length}</p><p className="text-xs text-muted-foreground">Total Assigned</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-bold text-emerald-700">{FIELD_VERIFICATION.filter((f) => f.status === "completed").length}</p><p className="text-xs text-muted-foreground">Completed</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-bold text-amber-700">{FIELD_VERIFICATION.filter((f) => f.status === "in_progress").length}</p><p className="text-xs text-muted-foreground">In Progress</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-bold text-red-700">{FIELD_VERIFICATION.filter((f) => f.status === "discrepancy" || f.status === "overdue").length}</p><p className="text-xs text-muted-foreground">Issues</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Verification Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {FIELD_VERIFICATION.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelected(f.id)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selected === f.id ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{f.parcelId}</p>
                    <Badge className={statusColors[f.status]}>{statusLabels[f.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{f.projectName} &middot; {f.village}</p>
                  <p className="text-xs text-muted-foreground">Officer: {f.assignedOfficer}</p>
                  <div className="mt-1 flex gap-2">
                    <Badge className={riskColor(f.risk)}>{f.risk}</Badge>
                    {f.gpsVerified && <Badge className="bg-blue-100 text-blue-800">GPS ✓</Badge>}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Verification Details</CardTitle>
          </CardHeader>
          <CardContent>
            {fv ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{fv.parcelId}</p>
                  <p className="text-xs text-muted-foreground">{fv.projectName} &middot; {fv.village}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground">GPS Verified</p><Badge className={fv.gpsVerified ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}>{fv.gpsVerified ? "Yes" : "No"}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Documents</p><p className="text-sm font-medium">{fv.documentsCount}</p></div>
                  <div><p className="text-xs text-muted-foreground">Ownership Match</p><Badge className={fv.ownershipMatch ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}>{fv.ownershipMatch ? "Match" : "Mismatch"}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Area Match</p><Badge className={fv.areaMatch ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}>{fv.areaMatch ? "Match" : "Mismatch"}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Recorded Owner</p><p className="text-xs font-medium">{fv.recordedOwner}</p></div>
                  <div><p className="text-xs text-muted-foreground">Claimed Owner</p><p className="text-xs font-medium">{fv.claimedOwner}</p></div>
                  <div><p className="text-xs text-muted-foreground">Recorded Area</p><p className="text-xs font-medium">{fv.recordedArea} ha</p></div>
                  <div><p className="text-xs text-muted-foreground">Claimed Area</p><p className="text-xs font-medium">{fv.claimedArea} ha</p></div>
                </div>
                {fv.status === "discrepancy" && (
                  <div className="rounded-lg border border-red-200 bg-red-50/50 p-3">
                    <p className="text-xs font-medium text-red-800">Discrepancy Detected</p>
                    <p className="text-[10px] text-red-700">Area mismatch: {fv.recordedArea} ha vs {fv.claimedArea} ha ({Math.abs(fv.claimedArea - fv.recordedArea).toFixed(2)} ha difference)</p>
                  </div>
                )}
                {fv.status === "assigned" && (
                  <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Start Verification</button>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select a verification</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0F2340]">Field Officers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            {FIELD_OFFICERS.map((fo) => (
              <div key={fo.name} className="rounded-lg border p-3">
                <p className="text-sm font-medium">{fo.name}</p>
                <p className="text-xs text-muted-foreground">{fo.tehsil}</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-[10px]"><span>Assigned</span><span className="font-medium">{fo.assignedCases}</span></div>
                  <div className="flex justify-between text-[10px]"><span>Completed</span><span className="font-medium text-emerald-700">{fo.completed}</span></div>
                  <div className="flex justify-between text-[10px]"><span>Pending</span><span className="font-medium text-amber-700">{fo.pending}</span></div>
                  {fo.overdue > 0 && <div className="flex justify-between text-[10px]"><span>Overdue</span><span className="font-medium text-red-700">{fo.overdue}</span></div>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
