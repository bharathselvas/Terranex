import { Card, CardContent } from "@/components/ui/card";
import { PAYMENT_INSTRUCTIONS } from "./financeData";
import { Link } from "react-router-dom";

export default function FinInitiatedPaymentsPage() {
  const initiated = PAYMENT_INSTRUCTIONS.filter((p) => p.status === "initiated");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Initiated Payments</h1>
        <p className="text-sm text-muted-foreground mt-1">{initiated.length} payments in external processing</p>
      </div>

      <Card className="mb-4 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <p className="text-sm text-amber-800 font-medium">MOCK PFMS — Simulated External Reference</p>
          <p className="text-xs text-amber-700 mt-1">These show simulated external references from the mock PFMS adapter.</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Payment ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Beneficiary</th>
                  <th className="text-right p-2 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">External Ref</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Initiated</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {initiated.map((p) => (
                  <tr key={p.paymentId} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{p.paymentId}</td>
                    <td className="p-2 font-medium">{p.beneficiaryName}</td>
                    <td className="p-2 text-right font-medium">₹{p.amount.toLocaleString("en-IN")}</td>
                    <td className="p-2 font-mono text-xs">{p.externalReference || "—"}</td>
                    <td className="p-2 text-xs">{p.initiatedDate || "—"}</td>
                    <td className="p-2"><Link to={`/app/finance/payment/${p.paymentId}`} className="text-blue-600 hover:underline text-xs">Track</Link></td>
                  </tr>
                ))}
                {initiated.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No initiated payments.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
