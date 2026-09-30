import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BENEFICIARY_RECORDS, PAYMENT_INSTRUCTIONS, PAYMENT_EXCEPTIONS } from "./financeData";
import { ArrowLeft, Shield } from "lucide-react";

const verificationColors: Record<string, string> = {
  verified: "bg-green-100 text-green-800",
  not_verified: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
  pending: "bg-blue-100 text-blue-800",
};

export default function FinBeneficiaryDetailPage() {
  const { beneficiaryId } = useParams();
  const beneficiary = BENEFICIARY_RECORDS.find((b) => b.beneficiaryId === beneficiaryId) || BENEFICIARY_RECORDS[0];
  const payments = PAYMENT_INSTRUCTIONS.filter((p) => p.beneficiaryId === beneficiary.beneficiaryId);
  const exceptions = PAYMENT_EXCEPTIONS.filter((e) => e.beneficiaryId === beneficiary.beneficiaryId);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/finance/beneficiaries" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Beneficiaries
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Beneficiary Detail — {beneficiary.name}</h1>
        <Badge className={`text-xs ${verificationColors[beneficiary.bankVerification]}`}>{beneficiary.bankVerification.replace(/_/g, " ")}</Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" /> Personal Details
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Beneficiary ID</span><span className="font-mono">{beneficiary.beneficiaryId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{beneficiary.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Family ID</span><span className="font-mono">{beneficiary.familyId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">State</span><span>{beneficiary.state}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">District</span><span>{beneficiary.district}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Award</span><span className="font-mono">{beneficiary.awardId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Award Amount</span><span className="font-bold">₹{beneficiary.awardAmount.toLocaleString("en-IN")}</span></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Bank Account Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Account Number</span><span className="font-mono">{beneficiary.maskedAccount}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">IFSC Code</span><span className="font-mono">{beneficiary.ifsc}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Bank</span><span>{beneficiary.bankName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Account Source</span><span>{beneficiary.accountSource.replace(/_/g, " ")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Bank Verification</span><Badge className={`text-xs ${verificationColors[beneficiary.bankVerification]}`}>{beneficiary.bankVerification.replace(/_/g, " ")}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Last Verified</span><span>{beneficiary.verificationDate || "—"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge className={`text-xs ${beneficiary.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{beneficiary.status}</Badge></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Payment History ({payments.length})</h2>
          {payments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No payment records for this beneficiary.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium text-muted-foreground">Payment ID</th>
                    <th className="text-right p-2 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">External Ref</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.paymentId} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-mono text-xs">{p.paymentId}</td>
                      <td className="p-2 text-right">₹{p.amount.toLocaleString("en-IN")}</td>
                      <td className="p-2"><Badge className={`text-xs ${p.status === "completed" ? "bg-green-100 text-green-800" : p.status === "failed" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>{p.status.replace(/_/g, " ")}</Badge></td>
                      <td className="p-2 font-mono text-xs">{p.externalReference || "—"}</td>
                      <td className="p-2 text-xs">{p.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exceptions */}
      {exceptions.length > 0 && (
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Exceptions ({exceptions.length})</h2>
            <div className="space-y-2">
              {exceptions.map((e) => (
                <div key={e.exceptionId} className="p-3 bg-red-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{e.exceptionId}</span>
                    <Badge className={`text-xs ${e.severity === "critical" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>{e.severity}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{e.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
