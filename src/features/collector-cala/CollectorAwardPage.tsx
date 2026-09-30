import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AWARDS } from "./districtCollectorData";

const statusLabels: Record<string, string> = { draft: "Draft", under_review: "Under Review", approved: "Approved", returned: "Returned" };
const statusColors: Record<string, string> = { draft: "bg-gray-100 text-gray-700", under_review: "bg-amber-100 text-amber-800", approved: "bg-emerald-100 text-emerald-800", returned: "bg-red-100 text-red-800" };

const formatINR = (n: number) => `₹${(n / 100000).toFixed(2)}L`;

export default function CollectorAwardPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const aw = AWARDS.find((a) => a.parcelId === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Award Management</h1>
        <p className="text-sm text-muted-foreground">Final awards — valuation source, evidence review, and approval</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><p className="text-2xl font-bold text-[#0F2340]">{AWARDS.length}</p><p className="text-xs text-muted-foreground">Total Awards</p></div>
            <div><p className="text-2xl font-bold text-emerald-700">{AWARDS.filter((a) => a.status === "approved").length}</p><p className="text-xs text-muted-foreground">Approved</p></div>
            <div><p className="text-2xl font-bold text-amber-700">{AWARDS.filter((a) => a.status === "under_review" || a.status === "draft").length}</p><p className="text-xs text-muted-foreground">Pending</p></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Awards ({AWARDS.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {AWARDS.map((a) => (
                <button
                  key={a.parcelId}
                  onClick={() => setSelected(a.parcelId)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selected === a.parcelId ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{a.landowner}</p>
                    <Badge className={statusColors[a.status]}>{statusLabels[a.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{a.parcelId} &middot; {a.village}</p>
                  <p className="text-xs font-medium text-[#0F2340]">{formatINR(a.totalAmount)}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Award Details</CardTitle>
          </CardHeader>
          <CardContent>
            {aw ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{aw.landowner}</p>
                  <p className="text-xs text-muted-foreground">{aw.parcelId} &middot; {aw.village}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground">Market Value</p><p className="text-sm font-medium">{formatINR(aw.marketValue)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Multiplier</p><p className="text-sm font-medium">{aw.multiplier}x</p></div>
                  <div><p className="text-xs text-muted-foreground">Assets Value</p><p className="text-sm font-medium">{formatINR(aw.assetsValue)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Solatium</p><p className="text-sm font-medium">{formatINR(aw.solatium)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Interest</p><p className="text-sm font-medium">{formatINR(aw.interest)}</p></div>
                  <div><p className="text-xs text-muted-foreground font-semibold">Total Award</p><p className="text-sm font-bold text-[#0F2340]">{formatINR(aw.totalAmount)}</p></div>
                </div>
                {aw.approvedDate && (
                  <div><p className="text-xs text-muted-foreground">Approved Date</p><p className="text-sm font-medium">{aw.approvedDate}</p></div>
                )}
                {aw.status === "under_review" && (
                  <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Approve Award</button>
                )}
                {aw.status === "draft" && (
                  <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Submit for Review</button>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select an award</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
