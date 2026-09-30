import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_EXCEPTIONS } from "./financeData";
import { ArrowLeft } from "lucide-react";

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

export default function FinExceptionDetailPage() {
  const { exceptionId } = useParams();
  const exception = PAYMENT_EXCEPTIONS.find((e) => e.exceptionId === exceptionId) || PAYMENT_EXCEPTIONS[0];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/finance/exceptions" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Exceptions
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Exception Detail — {exception.exceptionId}</h1>
        <div className="flex items-center gap-3 mt-2">
          <Badge className={`text-xs ${severityColors[exception.severity]}`}>{exception.severity}</Badge>
          <Badge className={`text-xs ${statusColors[exception.status]}`}>{exception.status.replace(/_/g, " ")}</Badge>
          <Badge className="text-xs bg-gray-100 text-gray-800">{exception.category.replace(/_/g, " ")}</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Exception Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Exception ID</span><span className="font-mono">{exception.exceptionId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment ID</span><span className="font-mono">{exception.paymentId || "—"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Award ID</span><span className="font-mono">{exception.awardId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Beneficiary</span><span>{exception.beneficiaryName || "—"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span>{exception.category.replace(/_/g, " ")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Description</span><span className="text-right max-w-[200px]">{exception.description}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Due Date</span><span>{exception.dueDate}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Assigned To</span><span>{exception.assignedTo || "—"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">External Ref</span><span className="font-mono">{exception.externalReference || "—"}</span></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Resolution Actions</h2>
            <div className="space-y-3">
              {exception.status === "open" && (
                <>
                  <button className="w-full text-left p-3 bg-blue-50 rounded hover:bg-blue-100 text-sm font-medium text-blue-800">Mark In Review</button>
                  <button className="w-full text-left p-3 bg-purple-50 rounded hover:bg-purple-100 text-sm font-medium text-purple-800">Escalate to Competent Authority</button>
                  <button className="w-full text-left p-3 bg-red-50 rounded hover:bg-red-100 text-sm font-medium text-red-800">Flag for Manual Intervention</button>
                </>
              )}
              {exception.status === "in_review" && (
                <>
                  <button className="w-full text-left p-3 bg-green-50 rounded hover:bg-green-100 text-sm font-medium text-green-800">Mark Resolved</button>
                  <button className="w-full text-left p-3 bg-purple-50 rounded hover:bg-purple-100 text-sm font-medium text-purple-800">Escalate to Competent Authority</button>
                  <button className="w-full text-left p-3 bg-red-50 rounded hover:bg-red-100 text-sm font-medium text-red-800">Flag for Manual Intervention</button>
                </>
              )}
              {exception.status === "resolved" && (
                <div className="p-3 bg-green-50 rounded">
                  <p className="text-sm text-green-800 font-medium">✓ This exception has been resolved.</p>
                </div>
              )}
              {exception.status === "escalation_pending" && (
                <div className="p-3 bg-purple-50 rounded">
                  <p className="text-sm text-purple-800 font-medium">Escalation pending — awaiting competent authority action.</p>
                </div>
              )}
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded">
              <p className="text-xs text-amber-800">Role restriction: Finance Officer cannot directly approve awards or authorize payments. Escalate as needed.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {exception.resolution && (
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-2">Resolution Note</h2>
            <p className="text-sm">{exception.resolution}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
