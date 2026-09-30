import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { POSSESSIONS } from "./districtCollectorData";

const statusLabels: Record<string, string> = {
  pending: "Pending", scheduled: "Scheduled", field_completed: "Field Completed",
  under_review: "Under Review", recorded: "Recorded", disputed: "Disputed", resisted: "Resisted",
};

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700", scheduled: "bg-blue-100 text-blue-800", field_completed: "bg-amber-100 text-amber-800",
  under_review: "bg-purple-100 text-purple-800", recorded: "bg-emerald-100 text-emerald-800",
  disputed: "bg-red-100 text-red-800", resisted: "bg-red-100 text-red-800",
};

export default function CollectorPossessionPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const pos = POSSESSIONS.find((p) => p.parcelId === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Possession Management</h1>
        <p className="text-sm text-muted-foreground">Physical handover recording — evidence, GPS, photos, certificate</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div><p className="text-2xl font-bold text-[#0F2340]">{POSSESSIONS.length}</p><p className="text-xs text-muted-foreground">Total</p></div>
            <div><p className="text-2xl font-bold text-emerald-700">            {POSSESSIONS.filter((p) => p.possessionStatus === "recorded").length}</p><p className="text-xs text-muted-foreground">Recorded</p></div>
            <div><p className="text-2xl font-bold text-amber-700">{POSSESSIONS.filter((p) => p.possessionStatus === "scheduled" || p.possessionStatus === "field_completed").length}</p><p className="text-xs text-muted-foreground">In Progress</p></div>
            <div><p className="text-2xl font-bold text-red-700">{POSSESSIONS.filter((p) => p.possessionStatus === "disputed" || p.possessionStatus === "resisted").length}</p><p className="text-xs text-muted-foreground">Blocked</p></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Parcels ({POSSESSIONS.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {POSSESSIONS.map((p) => (
                <button
                  key={p.parcelId}
                  onClick={() => setSelected(p.parcelId)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selected === p.parcelId ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{p.landowner}</p>
                    <Badge className={statusColors[p.possessionStatus]}>{statusLabels[p.possessionStatus]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.parcelId} &middot; {p.projectName}</p>
                  <p className="text-xs text-muted-foreground">Compensation: {p.compensationStatus}</p>
                  <div className="mt-1 flex gap-2">
                    {p.gpsVerified && <Badge className="bg-blue-100 text-blue-800">GPS ✓</Badge>}
                    {p.hasCertificate && <Badge className="bg-emerald-100 text-emerald-800">Certificate ✓</Badge>}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Possession Details</CardTitle>
          </CardHeader>
          <CardContent>
            {pos ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{pos.landowner}</p>
                  <p className="text-xs text-muted-foreground">{pos.parcelId} &middot; {pos.projectName}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground">Possession Status</p><Badge className={statusColors[pos.possessionStatus]}>{statusLabels[pos.possessionStatus]}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Compensation</p><p className="text-xs font-medium">{pos.compensationStatus}</p></div>
                  <div><p className="text-xs text-muted-foreground">GPS Verified</p><Badge className={pos.gpsVerified ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}>{pos.gpsVerified ? "Yes" : "No"}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Photos</p><p className="text-xs font-medium">{pos.photosCount}</p></div>
                  <div><p className="text-xs text-muted-foreground">Officer</p><p className="text-xs font-medium">{pos.officer || "—"}</p></div>
                  <div><p className="text-xs text-muted-foreground">Certificate</p><Badge className={pos.hasCertificate ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700"}>{pos.hasCertificate ? "Issued" : "Not Issued"}</Badge></div>
                </div>
                {pos.blockingIssues.length > 0 && (
                  <div className="rounded-lg border border-red-200 bg-red-50/50 p-3">
                    <p className="text-xs font-medium text-red-800">Blocking Issues</p>
                    {pos.blockingIssues.map((issue, i) => (
                      <p key={i} className="text-[10px] text-red-700">• {issue}</p>
                    ))}
                  </div>
                )}
                {pos.possessionStatus === "pending" && pos.blockingIssues.length === 0 && (
                  <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Schedule Possession</button>
                )}
                {pos.possessionStatus === "field_completed" && (
                  <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Review &amp; Record</button>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select a parcel</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
