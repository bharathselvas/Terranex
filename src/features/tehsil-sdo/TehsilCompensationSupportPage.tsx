import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMPENSATION_SUPPORT } from "./tehsilSdoData";

const statusLabels: Record<string, string> = {
  pending: "Pending", submitted: "Submitted", awaiting_collector: "Awaiting Collector",
};

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700", submitted: "bg-emerald-100 text-emerald-800",
  awaiting_collector: "bg-amber-100 text-amber-800",
};

export default function TehsilCompensationSupportPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const cs = COMPENSATION_SUPPORT.find((c) => c.parcelId === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Compensation Support</h1>
        <p className="text-sm text-muted-foreground">Verify factual inputs — land area, classification, assets, structures</p>
      </div>

      <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
        <CardContent className="pt-4">
          <p className="text-xs text-amber-800">Tehsil verifies factual inputs only. Final compensation approval rests with District Collector / CALA.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Parcels ({COMPENSATION_SUPPORT.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {COMPENSATION_SUPPORT.map((c) => (
                <button key={c.parcelId} onClick={() => setSelected(c.parcelId)} className={`w-full rounded-lg border p-3 text-left transition-colors ${selected === c.parcelId ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{c.parcelId}</p>
                    <Badge className={statusColors[c.verificationStatus]}>{statusLabels[c.verificationStatus]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.village} &middot; {c.owner}</p>
                  <p className="text-xs font-medium text-[#0F2340]">{c.indicativeAmount}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Verification Details</CardTitle></CardHeader>
          <CardContent>
            {cs ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{cs.parcelId}</p>
                  <p className="text-xs text-muted-foreground">{cs.projectName} &middot; {cs.village}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground">Owner</p><p className="text-sm font-medium">{cs.owner}</p></div>
                  <div><p className="text-xs text-muted-foreground">Land Area</p><p className="text-sm font-medium">{cs.landArea} ha</p></div>
                  <div><p className="text-xs text-muted-foreground">Classification</p><p className="text-sm font-medium">{cs.classification}</p></div>
                  <div><p className="text-xs text-muted-foreground">Market Value Source</p><p className="text-xs font-medium">{cs.marketValueSource}</p></div>
                  <div><p className="text-xs text-muted-foreground">Indicative Amount</p><p className="text-sm font-bold text-[#0F2340]">{cs.indicativeAmount}</p></div>
                  <div><p className="text-xs text-muted-foreground">Status</p><Badge className={statusColors[cs.verificationStatus]}>{statusLabels[cs.verificationStatus]}</Badge></div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold text-[#0F2340]">Verification</p>
                  <div className="space-y-1">
                    {[
                      { label: "Area Verified", verified: cs.areaVerified },
                      { label: "Classification Verified", verified: cs.classificationVerified },
                      { label: "Assets Verified", verified: cs.assetsVerified },
                    ].map((v) => (
                      <div key={v.label} className={`flex items-center justify-between rounded border p-2 ${v.verified ? "border-emerald-300 bg-emerald-50/50" : "border-red-300 bg-red-50/50"}`}>
                        <span className="text-xs">{v.label}</span>
                        <div className={`h-2 w-2 rounded-full ${v.verified ? "bg-emerald-500" : "bg-red-500"}`} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Submit Verified Inputs</button>
                </div>
                <p className="text-xs text-muted-foreground">Then show: <strong>Awaiting Collector / CALA Review</strong></p>
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
