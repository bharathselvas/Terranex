import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_INSTRUCTIONS } from "./financeData";
import { Link } from "react-router-dom";

export default function FinFailedPaymentsPage() {
  const failed = PAYMENT_INSTRUCTIONS.filter((p) => p.status === "failed" || p.status === "returned");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Failed / Returned Payments</h1>
        <p className="text-sm text-muted-foreground mt-1">{failed.length} payments failed or returned by external system</p>
      </div>

      <Card className="mb-4 border-red-200 bg-red-50">
        <CardContent className="p-4">
          <p className="text-sm text-red-800 font-medium">These payments need attention — they cannot proceed without remediation.</p>
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
                  <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Failure Reason</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {failed.map((p) => (
                  <tr key={p.paymentId} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{p.paymentId}</td>
                    <td className="p-2 font-medium">{p.beneficiaryName}</td>
                    <td className="p-2 text-right font-medium">₹{p.amount.toLocaleString("en-IN")}</td>
                    <td className="p-2"><Badge className={`text-xs ${p.status === "returned" ? "bg-red-200 text-red-900" : "bg-red-100 text-red-800"}`}>{p.status}</Badge></td>
                    <td className="p-2 text-xs max-w-[250px] truncate">{p.failureReason}</td>
                    <td className="p-2"><Link to={`/app/finance/payment/${p.paymentId}`} className="text-blue-600 hover:underline text-xs">Review</Link></td>
                  </tr>
                ))}
                {failed.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No failed payments.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
