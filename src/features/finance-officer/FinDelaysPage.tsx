import { Card, CardContent } from "@/components/ui/card";
import { PAYMENT_AWARDS } from "./financeData";

export default function FinDelaysPage() {
  const totalAwards = PAYMENT_AWARDS.length;
  const readyAwards = PAYMENT_AWARDS.filter((a) => a.paymentReadiness === "ready").length;
  const blockedAwards = PAYMENT_AWARDS.filter((a) => a.paymentReadiness === "blocked").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Payment Delays</h1>
        <p className="text-sm text-muted-foreground mt-1">Awards with payment readiness issues</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Not Ready</p>
            <p className="text-2xl font-bold text-[#0F2340]">{totalAwards - readyAwards}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Blocked</p>
            <p className="text-2xl font-bold text-[#0F2340]">{blockedAwards}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Ready</p>
            <p className="text-2xl font-bold text-[#0F2340]">{readyAwards}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Awards Not Ready for Payment</h2>
          <div className="space-y-3">
            {PAYMENT_AWARDS.filter((a) => a.paymentReadiness !== "ready").map((a) => (
              <div key={a.awardId} className={`p-4 rounded-lg border ${a.paymentReadiness === "blocked" ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-xs">{a.awardId}</p>
                    <p className="font-medium text-sm mt-1">{a.project}</p>
                    <p className="text-xs text-muted-foreground mt-1">Bank verified: {a.bankVerifiedCount}/{a.beneficiaryCount} — Docs: {a.documentsCount}/{a.documentsTotal} — Exceptions: {a.blockingExceptions}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{a.paymentReadiness.replace(/_/g, " ")}</p>
                    {a.blockingExceptions > 0 && <p className="text-xs text-red-700 mt-1">{a.blockingExceptions} blocking exceptions</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
