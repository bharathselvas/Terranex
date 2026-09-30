import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_EXCEPTIONS } from "./financeData";
import { Link } from "react-router-dom";

const severityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

const statusColors: Record<string, string> = {
  open: "bg-red-100 text-red-800",
  in_review: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  escalation_pending: "bg-purple-100 text-purple-800",
  blocked: "bg-red-200 text-red-900",
};

const _CATEGORY_OPTIONS = ["all", "bank_account_issue", "ifsc_mismatch", "account_frozen", "pfms_rejection", "duplicate_payment", "beneficiary_deceased", "data_mismatch", "missing_documents"];

export default function FinExceptionPage() {
  const openCount = PAYMENT_EXCEPTIONS.filter((e) => e.status !== "resolved").length;
  const criticalCount = PAYMENT_EXCEPTIONS.filter((e) => e.severity === "critical" && e.status !== "resolved").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Payment Exceptions</h1>
        <p className="text-sm text-muted-foreground mt-1">{openCount} open exceptions, {criticalCount} critical</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-red-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Critical / High</p>
            <p className="text-2xl font-bold text-[#0F2340]">{criticalCount}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Medium</p>
            <p className="text-2xl font-bold text-[#0F2340]">{PAYMENT_EXCEPTIONS.filter((e) => e.severity === "medium" && e.status !== "resolved").length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Low</p>
            <p className="text-2xl font-bold text-[#0F2340]">{PAYMENT_EXCEPTIONS.filter((e) => e.severity === "low" && e.status !== "resolved").length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Exception ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Payment ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Award</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Severity</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Due</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Assigned</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {PAYMENT_EXCEPTIONS.map((e) => (
                  <tr key={e.exceptionId} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{e.exceptionId}</td>
                    <td className="p-2 font-mono text-xs">{e.paymentId || "—"}</td>
                    <td className="p-2 font-mono text-xs">{e.awardId}</td>
                    <td className="p-2 text-xs">{e.category.replace(/_/g, " ")}</td>
                    <td className="p-2"><Badge className={`text-xs ${severityColors[e.severity]}`}>{e.severity}</Badge></td>
                    <td className="p-2"><Badge className={`text-xs ${statusColors[e.status]}`}>{e.status.replace(/_/g, " ")}</Badge></td>
                    <td className="p-2 text-xs">{e.dueDate}</td>
                    <td className="p-2 text-xs">{e.assignedTo || "—"}</td>
                    <td className="p-2"><Link to={`/app/finance/exception/${e.exceptionId}`} className="text-blue-600 hover:underline text-xs">Review</Link></td>
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
