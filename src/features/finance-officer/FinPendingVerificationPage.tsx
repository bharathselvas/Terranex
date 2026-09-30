import { Card, CardContent } from "@/components/ui/card";
import { PAYMENT_INSTRUCTIONS } from "./financeData";
import { Link } from "react-router-dom";

export default function FinPendingVerificationPage() {
  const pending = PAYMENT_INSTRUCTIONS.filter((p) => p.status === "pending_verification");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Pending Verification</h1>
        <p className="text-sm text-muted-foreground mt-1">{pending.length} payments awaiting beneficiary verification</p>
      </div>

      <Card className="mb-4 border-purple-200 bg-purple-50">
        <CardContent className="p-4">
          <p className="text-sm text-purple-800 font-medium">These payments require beneficiary verification to complete.</p>
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
                  <th className="text-left p-2 font-medium text-muted-foreground">Completed</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((p) => (
                  <tr key={p.paymentId} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{p.paymentId}</td>
                    <td className="p-2 font-medium">{p.beneficiaryName}</td>
                    <td className="p-2 text-right font-medium">₹{p.amount.toLocaleString("en-IN")}</td>
                    <td className="p-2 font-mono text-xs">{p.externalReference || "—"}</td>
                    <td className="p-2 text-xs">{p.completedDate || "—"}</td>
                    <td className="p-2"><Link to={`/app/finance/payment/${p.paymentId}`} className="text-blue-600 hover:underline text-xs">Verify</Link></td>
                  </tr>
                ))}
                {pending.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No payments pending verification.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
