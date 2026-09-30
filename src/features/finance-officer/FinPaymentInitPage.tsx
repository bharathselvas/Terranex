import { Card, CardContent } from "@/components/ui/card";
import { PAYMENT_AWARDS } from "./financeData";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function FinPaymentInitPage() {
  const ready = PAYMENT_AWARDS.filter((a) => a.paymentReadiness === "ready");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Initiate Mock Payments</h1>
        <p className="text-sm text-muted-foreground mt-1">{ready.length} awards ready for payment initiation</p>
      </div>

      <Card className="mb-4 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800 font-medium">MOCK INTEGRATION — No real payment will be made</p>
          <p className="text-xs text-blue-700 mt-1">This page simulates sending payment instructions to an external system (PFMS). All data shown is for demonstration.</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {ready.map((a) => (
          <Card key={a.awardId} className="hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="font-mono text-xs">{a.awardId}</span>
                  </div>
                  <h3 className="font-medium text-[#0F2340] mt-1">{a.project}</h3>
                  <p className="text-sm text-muted-foreground">{a.beneficiaryCount} beneficiaries — ₹{(a.awardAmount / 100000).toFixed(2)} L</p>
                  <p className="text-xs text-muted-foreground mt-1">Bank verified: {a.bankVerifiedCount}/{a.beneficiaryCount} — Documents: {a.documentsCount}/{a.documentsTotal}</p>
                </div>
                <div className="text-right">
                  <Link to={`/app/finance/award/${a.awardId}`} className="inline-block px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700">Initiate Payment</Link>
                  <p className="text-xs text-muted-foreground mt-2">Mock PFMS adapter</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {ready.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No awards are currently ready for payment initiation.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
