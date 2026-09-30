import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_VERIFICATION_SUBMISSIONS } from "./tehsilSdoData";

const statusLabels: Record<string, string> = {
  submitted: "Submitted", accepted: "Accepted", discrepancy: "Discrepancy", needs_review: "Needs Review",
};

const statusColors: Record<string, string> = {
  submitted: "bg-amber-100 text-amber-800", accepted: "bg-emerald-100 text-emerald-800",
  discrepancy: "bg-red-100 text-red-800", needs_review: "bg-orange-100 text-orange-800",
};

export default function TehsilFieldVerificationPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const fv = FIELD_VERIFICATION_SUBMISSIONS.find((f) => f.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Field Verification</h1>
        <p className="text-sm text-muted-foreground">Review field submissions — GPS, photos, evidence, discrepancies</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="shadow-sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-bold text-[#0F2340]">{FIELD_VERIFICATION_SUBMISSIONS.length}</p><p className="text-xs text-muted-foreground">Total</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-bold text-emerald-700">{FIELD_VERIFICATION_SUBMISSIONS.filter((f) => f.status === "accepted").length}</p><p className="text-xs text-muted-foreground">Accepted</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-bold text-amber-700">{FIELD_VERIFICATION_SUBMISSIONS.filter((f) => f.status === "submitted").length}</p><p className="text-xs text-muted-foreground">Submitted</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-bold text-red-700">{FIELD_VERIFICATION_SUBMISSIONS.filter((f) => f.status === "discrepancy").length}</p><p className="text-xs text-muted-foreground">Discrepancy</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Submissions</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {FIELD_VERIFICATION_SUBMISSIONS.map((f) => (
                <button key={f.id} onClick={() => setSelected(f.id)} className={`w-full rounded-lg border p-3 text-left transition-colors ${selected === f.id ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{f.parcelId}</p>
                    <Badge className={statusColors[f.status]}>{statusLabels[f.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{f.projectName} &middot; {f.village}</p>
                  <p className="text-[10px] text-muted-foreground">Officer: {f.officer} &middot; {f.submittedDate || "In progress"}</p>
                  <div className="mt-1 flex gap-2">
                    {f.gpsLat !== 0 && <Badge className="bg-blue-100 text-blue-800 text-[10px]">GPS ✓</Badge>}
                    {f.photosCount > 0 && <Badge className="bg-blue-100 text-blue-800 text-[10px]">{f.photosCount} photos</Badge>}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Submission Details</CardTitle></CardHeader>
          <CardContent>
            {fv ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{fv.parcelId}</p>
                  <p className="text-xs text-muted-foreground">{fv.projectName} &middot; {fv.village}</p>
                </div>

                {fv.gpsLat !== 0 && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-3">
                    <p className="mb-2 text-xs font-semibold text-blue-800">GPS EVIDENCE</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div><p className="text-[10px] text-muted-foreground">Latitude</p><p className="text-xs font-medium">{fv.gpsLat}</p></div>
                      <div><p className="text-[10px] text-muted-foreground">Longitude</p><p className="text-xs font-medium">{fv.gpsLng}</p></div>
                      <div><p className="text-[10px] text-muted-foreground">Captured</p><p className="text-xs font-medium">{fv.gpsTimestamp}</p></div>
                      <div><p className="text-[10px] text-muted-foreground">Device</p><p className="text-xs font-medium">{fv.deviceInfo}</p></div>
                    </div>
                    <p className="mt-2 text-[10px] text-blue-600 italic">Demo / Mock Evidence</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground">Owner Match</p><Badge className={fv.ownerMatch ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}>{fv.ownerMatch ? "Match" : "Mismatch"}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Area Match</p><Badge className={fv.areaMatch ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}>{fv.areaMatch ? "Match" : "Mismatch"}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Recorded Area</p><p className="text-xs font-medium">{fv.recordedArea} ha</p></div>
                  <div><p className="text-xs text-muted-foreground">Measured Area</p><p className="text-xs font-medium">{fv.measuredArea} ha</p></div>
                  <div><p className="text-xs text-muted-foreground">Photos</p><p className="text-xs font-medium">{fv.photosCount}</p></div>
                  <div><p className="text-xs text-muted-foreground">Documents</p><p className="text-xs font-medium">{fv.documentsCount}</p></div>
                </div>

                {fv.assetsVerified.length > 0 && (
                  <div><p className="text-xs text-muted-foreground">Assets Verified</p><div className="flex flex-wrap gap-1 mt-1">{fv.assetsVerified.map((a) => <Badge key={a} variant="outline" className="text-[10px]">{a}</Badge>)}</div></div>
                )}

                <p className="text-xs text-muted-foreground">{fv.remarks}</p>

                <div className="flex gap-2">
                  {fv.status === "submitted" && <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Accept Verification</button>}
                  {fv.status === "discrepancy" && <button className="rounded-lg border border-amber-300 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50">Request Reverification</button>}
                  <button className="rounded-lg border border-[#0F2340] px-4 py-2 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5">Forward to Collector</button>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select a submission</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
