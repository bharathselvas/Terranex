import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMPENSATION_DATA } from "./districtCollectorData";

const statusLabels: Record<string, string> = {
  pending_valuation: "Pending Valuation", draft: "Draft", under_review: "Under Review",
  approved: "Approved", payment_pending: "Payment Pending", paid: "Paid",
};

const statusColors: Record<string, string> = {
  pending_valuation: "bg-gray-100 text-gray-700", draft: "bg-blue-100 text-blue-800",
  under_review: "bg-amber-100 text-amber-800", approved: "bg-emerald-100 text-emerald-800",
  payment_pending: "bg-purple-100 text-purple-800", paid: "bg-emerald-100 text-emerald-800",
};

const formatINR = (n: number) => `₹${(n / 100000).toFixed(2)}L`;

export default function CollectorCompensationPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const cp = COMPENSATION_DATA.find((c) => c.parcelId === selected);

  const totalIndicative = COMPENSATION_DATA.reduce((sum, c) => sum + c.indicativeCompensation, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Compensation Management</h1>
        <p className="text-sm text-muted-foreground">Market value assessment, asset valuation, and compensation calculation</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><p className="text-2xl font-bold text-[#0F2340]">{COMPENSATION_DATA.length}</p><p className="text-xs text-muted-foreground">Parcels</p></div>
            <div><p className="text-2xl font-bold text-amber-700">{COMPENSATION_DATA.filter((c) => c.status === "draft" || c.status === "under_review").length}</p><p className="text-xs text-muted-foreground">Under Review</p></div>
            <div><p className="text-2xl font-bold text-emerald-700">{formatINR(totalIndicative)}</p><p className="text-xs text-muted-foreground">Total Indicative</p></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Parcels ({COMPENSATION_DATA.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {COMPENSATION_DATA.map((c) => (
                <button
                  key={c.parcelId}
                  onClick={() => setSelected(c.parcelId)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selected === c.parcelId ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{c.landowner}</p>
                    <Badge className={statusColors[c.status]}>{statusLabels[c.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.parcelId} &middot; {c.village}</p>
                  <p className="text-xs text-muted-foreground">{c.areaHa} ha &middot; {c.landClassification}</p>
                  <p className="text-xs font-medium text-[#0F2340]">{formatINR(c.indicativeCompensation)}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Compensation Details</CardTitle>
          </CardHeader>
          <CardContent>
            {cp ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{cp.landowner}</p>
                  <p className="text-xs text-muted-foreground">{cp.parcelId} &middot; {cp.village}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground">Land Classification</p><p className="text-sm font-medium">{cp.landClassification}</p></div>
                  <div><p className="text-xs text-muted-foreground">Area</p><p className="text-sm font-medium">{cp.areaHa} ha</p></div>
                  <div><p className="text-xs text-muted-foreground">Market Value / ha</p><p className="text-sm font-medium">{formatINR(cp.marketValuePerHa)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Multiplier</p><p className="text-sm font-medium">{cp.multiplier}x</p></div>
                  <div><p className="text-xs text-muted-foreground">Assets Value</p><p className="text-sm font-medium">{formatINR(cp.assetsValue)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Solatium</p><p className="text-sm font-medium">{formatINR(cp.solatium)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Interest</p><p className="text-sm font-medium">{formatINR(cp.interest)}</p></div>
                  <div><p className="text-xs text-muted-foreground font-semibold">Indicative Total</p><p className="text-sm font-bold text-[#0F2340]">{formatINR(cp.indicativeCompensation)}</p></div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold text-[#0F2340]">Assets ({cp.assets.length})</p>
                  <div className="space-y-1">
                    {cp.assets.map((a, i) => (
                      <div key={i} className="flex items-center justify-between rounded border p-2">
                        <span className="text-xs">{a.type} &times; {a.quantity}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">{formatINR(a.value)}</span>
                          <Badge className={a.evidence ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}>
                            {a.evidence ? "Evidence ✓" : "No Evidence"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {cp.status === "draft" && (
                  <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Submit for Review</button>
                )}
                {cp.status === "under_review" && (
                  <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Approve Compensation</button>
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
