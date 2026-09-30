import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENTS } from "./districtCollectorData";

const statusLabels: Record<string, string> = { pending: "Pending", initiated: "Initiated", completed: "Completed", failed: "Failed", pending_verification: "Pending Verification" };
const statusColors: Record<string, string> = { pending: "bg-gray-100 text-gray-700", initiated: "bg-blue-100 text-blue-800", completed: "bg-emerald-100 text-emerald-800", failed: "bg-red-100 text-red-800", pending_verification: "bg-amber-100 text-amber-800" };

const formatINR = (n: number) => `₹${(n / 100000).toFixed(2)}L`;

export default function CollectorPaymentPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const pay = PAYMENTS.find((p) => p.parcelId === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Payment Management</h1>
        <p className="text-sm text-muted-foreground">Award payment tracking — PFMS integration and disbursement</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div><p className="text-2xl font-bold text-[#0F2340]">{PAYMENTS.length}</p><p className="text-xs text-muted-foreground">Total</p></div>
            <div><p className="text-2xl font-bold text-emerald-700">{PAYMENTS.filter((p) => p.status === "completed").length}</p><p className="text-xs text-muted-foreground">Completed</p></div>
            <div><p className="text-2xl font-bold text-blue-700">{PAYMENTS.filter((p) => p.status === "initiated").length}</p><p className="text-xs text-muted-foreground">Initiated</p></div>
            <div><p className="text-2xl font-bold text-gray-700">{PAYMENTS.filter((p) => p.status === "pending").length}</p><p className="text-xs text-muted-foreground">Pending</p></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Payments ({PAYMENTS.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {PAYMENTS.map((p) => (
                <button
                  key={p.parcelId}
                  onClick={() => setSelected(p.parcelId)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selected === p.parcelId ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{p.landowner}</p>
                    <Badge className={statusColors[p.status]}>{statusLabels[p.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.parcelId} &middot; {p.projectId}</p>
                  <p className="text-xs font-medium text-[#0F2340]">{formatINR(p.awardAmount)}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            {pay ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{pay.landowner}</p>
                  <p className="text-xs text-muted-foreground">{pay.parcelId}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground">Award Amount</p><p className="text-sm font-bold text-[#0F2340]">{formatINR(pay.awardAmount)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Status</p><Badge className={statusColors[pay.status]}>{statusLabels[pay.status]}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Reference</p><p className="text-xs font-medium">{pay.reference || "—"}</p></div>
                  <div><p className="text-xs text-muted-foreground">Initiated</p><p className="text-xs font-medium">{pay.initiatedDate || "—"}</p></div>
                  <div><p className="text-xs text-muted-foreground">Completed</p><p className="text-xs font-medium">{pay.completedDate || "—"}</p></div>
                </div>
                {pay.status === "completed" && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
                    <p className="text-xs text-emerald-700">Payment completed successfully. Possession can proceed.</p>
                  </div>
                )}
                {pay.status === "pending" && (
                  <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Initiate Payment via PFMS</button>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select a payment</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
