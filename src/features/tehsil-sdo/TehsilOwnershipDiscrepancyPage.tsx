import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OWNERSHIP_DISCREPANCIES } from "./tehsilSdoData";

const statusLabels: Record<string, string> = {
  new: "New", under_review: "Under Review", evidence_requested: "Evidence Requested", resolved: "Resolved", escalated: "Escalated",
};

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800", under_review: "bg-amber-100 text-amber-800",
  evidence_requested: "bg-purple-100 text-purple-800", resolved: "bg-emerald-100 text-emerald-800",
  escalated: "bg-red-100 text-red-800",
};

export default function TehsilOwnershipDiscrepancyPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const disc = OWNERSHIP_DISCREPANCIES.find((d) => d.id === selected);

  const open = OWNERSHIP_DISCREPANCIES.filter((d) => d.status !== "resolved");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Ownership Discrepancies</h1>
        <p className="text-sm text-muted-foreground">Cases where submitted ownership differs from revenue records</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Discrepancies ({open.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {OWNERSHIP_DISCREPANCIES.map((d) => (
                <button key={d.id} onClick={() => setSelected(d.id)} className={`w-full rounded-lg border p-3 text-left transition-colors ${selected === d.id ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{d.parcelId}</p>
                    <Badge className={statusColors[d.status]}>{statusLabels[d.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{d.village} &middot; {d.projectName}</p>
                  <p className="text-xs text-muted-foreground">Recorded: {d.recordedOwner} → Claimed: {d.claimedOwner}</p>
                  <p className="mt-1 text-[10px] text-orange-700">{d.issue}</p>
                  <div className="mt-1 flex gap-2">
                    <span className="text-[10px] text-muted-foreground">{d.ageDays}d age</span>
                    <span className="text-[10px] text-muted-foreground">Officer: {d.assignedOfficer}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Discrepancy Details</CardTitle></CardHeader>
          <CardContent>
            {disc ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{disc.parcelId}</p>
                  <p className="text-xs text-muted-foreground">{disc.projectName} &middot; {disc.village}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground">Recorded Owner</p><p className="text-sm font-medium">{disc.recordedOwner}</p></div>
                  <div><p className="text-xs text-muted-foreground">Claimed Owner</p><p className="text-sm font-medium">{disc.claimedOwner}</p></div>
                  <div><p className="text-xs text-muted-foreground">Issue</p><p className="text-xs">{disc.issue}</p></div>
                  <div><p className="text-xs text-muted-foreground">Status</p><Badge className={statusColors[disc.status]}>{statusLabels[disc.status]}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Assigned Officer</p><p className="text-xs font-medium">{disc.assignedOfficer}</p></div>
                  <div><p className="text-xs text-muted-foreground">Documents</p><p className="text-xs font-medium">{disc.documentsAttached}</p></div>
                  <div><p className="text-xs text-muted-foreground">Field Verified</p><Badge className={disc.fieldVerification ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700"}>{disc.fieldVerification ? "Yes" : "No"}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Age</p><p className="text-xs font-medium">{disc.ageDays} days</p></div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Request Document</button>
                  <button className="rounded-lg border border-[#0F2340] px-4 py-2 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5">Request Field Verification</button>
                  <button className="rounded-lg border border-amber-300 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50">Forward to Collector</button>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select a discrepancy</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
