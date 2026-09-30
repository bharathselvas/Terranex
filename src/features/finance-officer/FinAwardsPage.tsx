import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_AWARDS } from "./financeData";
import { ArrowLeft } from "lucide-react";

const readinessColors: Record<string, string> = {
  ready: "bg-green-100 text-green-800",
  missing_document: "bg-amber-100 text-amber-800",
  verification_required: "bg-orange-100 text-orange-800",
  exception: "bg-red-100 text-red-800",
  blocked: "bg-red-200 text-red-900",
};

export default function FinAwardsPage() {
  const readyCount = PAYMENT_AWARDS.filter((a) => a.paymentReadiness === "ready").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/finance/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Payment-Ready Awards</h1>
        <p className="text-sm text-muted-foreground mt-1">{readyCount} of {PAYMENT_AWARDS.length} awards ready for payment</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Ready</p>
            <p className="text-2xl font-bold text-[#0F2340]">{readyCount}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Verification Required</p>
            <p className="text-2xl font-bold text-[#0F2340]">{PAYMENT_AWARDS.filter((a) => a.paymentReadiness === "verification_required" || a.paymentReadiness === "missing_document").length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Exception / Blocked</p>
            <p className="text-2xl font-bold text-[#0F2340]">{PAYMENT_AWARDS.filter((a) => a.paymentReadiness === "exception" || a.paymentReadiness === "blocked").length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Award ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Project</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">District</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Beneficiaries</th>
                  <th className="text-right p-2 font-medium text-muted-foreground">Award Amount</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Bank Verified</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Documents</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Exceptions</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Readiness</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {PAYMENT_AWARDS.map((a) => (
                  <tr key={a.awardId} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{a.awardId}</td>
                    <td className="p-2 text-xs max-w-[200px] truncate">{a.project}</td>
                    <td className="p-2">{a.district}</td>
                    <td className="p-2 text-center">{a.beneficiaryCount}</td>
                    <td className="p-2 text-right font-medium">₹{(a.awardAmount / 100000).toFixed(2)} L</td>
                    <td className="p-2 text-center">
                      <span className={`font-medium ${a.bankVerifiedCount === a.beneficiaryCount ? "text-green-700" : "text-amber-700"}`}>{a.bankVerifiedCount}/{a.beneficiaryCount}</span>
                    </td>
                    <td className="p-2 text-center">
                      <span className={`font-medium ${a.documentsCount === a.documentsTotal ? "text-green-700" : "text-amber-700"}`}>{a.documentsCount}/{a.documentsTotal}</span>
                    </td>
                    <td className="p-2 text-center">
                      {a.blockingExceptions > 0 ? <Badge className="text-xs bg-red-100 text-red-800">{a.blockingExceptions}</Badge> : <span className="text-green-700">0</span>}
                    </td>
                    <td className="p-2"><Badge className={`text-xs ${readinessColors[a.paymentReadiness]}`}>{a.paymentReadiness.replace(/_/g, " ")}</Badge></td>
                    <td className="p-2">
                      <Link to={`/app/finance/award/${a.awardId}`} className="text-blue-600 hover:underline text-xs">Review</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
