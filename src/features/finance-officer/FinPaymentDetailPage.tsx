import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_INSTRUCTIONS, PAYMENT_EXCEPTIONS, BENEFICIARY_RECORDS, FINANCE_AUDIT_TRAIL } from "./financeData";
import { ArrowLeft, CheckCircle2, Clock, ExternalLink, Shield } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  initiated: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  returned: "bg-red-200 text-red-900",
  pending_verification: "bg-purple-100 text-purple-800",
};

export default function FinPaymentDetailPage() {
  const { paymentId } = useParams();
  const payment = PAYMENT_INSTRUCTIONS.find((p) => p.paymentId === paymentId) || PAYMENT_INSTRUCTIONS[0];
  const beneficiary = BENEFICIARY_RECORDS.find((b) => b.beneficiaryId === payment.beneficiaryId);
  const exceptions = PAYMENT_EXCEPTIONS.filter((e) => e.paymentId === payment.paymentId);
  const auditEntries = FINANCE_AUDIT_TRAIL.filter((a) => a.details.includes(payment.paymentId));

  const timeline = [
    { label: "Award Approved", done: true },
    { label: "Payment Package Prepared", done: true },
    { label: "Payment Instruction Initiated", done: payment.status !== "pending" },
    { label: "External Processing", done: payment.status === "completed" || payment.status === "failed" || payment.status === "returned" || payment.status === "pending_verification", current: payment.status === "initiated" },
    { label: "Payment Confirmation", done: payment.status === "completed" },
    { label: "Beneficiary Verification", done: payment.status === "completed", current: payment.status === "pending_verification" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/finance/cases" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Cases
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Payment Detail — {payment.paymentId}</h1>
        <div className="flex items-center gap-3 mt-2">
          <Badge className={`text-xs ${statusColors[payment.status]}`}>{payment.status.replace(/_/g, " ")}</Badge>
          <span className="text-sm text-muted-foreground">₹{payment.amount.toLocaleString("en-IN")}</span>
          <span className="text-sm text-muted-foreground">{payment.beneficiaryName}</span>
        </div>
      </div>

      {/* MOCK Banner */}
      <Card className="mb-6 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <p className="text-sm text-amber-800 font-medium">MOCK INTEGRATION — NO REAL PAYMENT WAS MADE</p>
          <p className="text-xs text-amber-700 mt-1">This simulates external PFMS interaction for demonstration purposes only.</p>
        </CardContent>
      </Card>

      {/* Payment Timeline */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Payment Timeline</h2>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {timeline.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center min-w-[100px] p-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step.done ? "border-green-500 bg-green-50" : step.current ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}`}>
                    {step.done ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : step.current ? <Clock className="h-4 w-4 text-blue-600" /> : <span className="text-xs text-gray-400">{i + 1}</span>}
                  </div>
                  <p className="text-[10px] text-center mt-1 max-w-[90px]">{step.label}</p>
                </div>
                {i < timeline.length - 1 && <div className={`w-6 h-0.5 ${step.done ? "bg-green-400" : "bg-gray-300"}`} />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Payment Details */}
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Payment Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Payment ID</span><span className="font-mono">{payment.paymentId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Beneficiary</span><span className="font-medium">{payment.beneficiaryName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Family ID</span><span className="font-mono">{payment.familyId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Award</span><span className="font-mono">{payment.awardId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="font-bold">₹{payment.amount.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Initiated</span><span>{payment.initiatedDate || "—"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Completed</span><span>{payment.completedDate || "—"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Failed</span><span>{payment.failedDate || "—"}</span></div>
              {payment.failureReason && (
                <div className="p-3 bg-red-50 rounded mt-2">
                  <p className="text-xs text-red-800 font-medium">Failure Reason</p>
                  <p className="text-sm text-red-700">{payment.failureReason}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* External System */}
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4 flex items-center gap-2">
              <ExternalLink className="h-5 w-5" /> External Payment System
            </h2>
            {payment.externalReference ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">PFMS Adapter</span><Badge className="text-xs bg-blue-100 text-blue-800">MOCK</Badge></div>
                <div className="flex justify-between"><span className="text-muted-foreground">External Reference</span><span className="font-mono">{payment.externalReference}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge className={`text-xs ${statusColors[payment.status]}`}>{payment.status.replace(/_/g, " ")}</Badge></div>
                {payment.completedDate && (
                  <div className="p-3 bg-green-50 rounded mt-2">
                    <p className="text-sm text-green-800 font-medium">✓ External confirmation received</p>
                    <p className="text-xs text-green-700 mt-1">Payment completed on {payment.completedDate}</p>
                  </div>
                )}
                {(payment.status === "failed" || payment.status === "returned") && (
                  <div className="p-3 bg-red-50 rounded mt-2">
                    <p className="text-sm text-red-800 font-medium">✕ Payment failed/returned</p>
                    <p className="text-xs text-red-700 mt-1">{payment.failureReason}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No external reference — payment not yet initiated.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Beneficiary Payment Details (Masked) */}
      {beneficiary && (
        <Card className="mb-6">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" /> Beneficiary Payment Details
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Beneficiary ID</span><span className="font-mono">{beneficiary.beneficiaryId}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{beneficiary.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Account</span><span className="font-mono">{beneficiary.maskedAccount}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">IFSC</span><span className="font-mono">{beneficiary.ifsc}</span></div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Verification</span><Badge className={`text-xs ${beneficiary.bankVerification === "verified" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{beneficiary.bankVerification.replace(/_/g, " ")}</Badge></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Source</span><span>Officer-entered / Mock</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Last Verified</span><span>{beneficiary.verificationDate || "—"}</span></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 p-2 bg-gray-50 rounded">Sensitive payment information is restricted to authorized finance workflows.</p>
          </CardContent>
        </Card>
      )}

      {/* Exceptions */}
      {exceptions.length > 0 && (
        <Card className="mb-6">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Related Exceptions</h2>
            <div className="space-y-2">
              {exceptions.map((e) => (
                <div key={e.exceptionId} className="p-3 bg-red-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{e.exceptionId}</span>
                    <Badge className={`text-xs ${e.severity === "critical" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>{e.severity}</Badge>
                    <Badge className={`text-xs ${e.status === "resolved" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>{e.status.replace(/_/g, " ")}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{e.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audit */}
      <Card>
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Audit Trail</h2>
          <div className="relative ml-4">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200" />
            <div className="space-y-3">
              {auditEntries.length === 0 ? (
                <p className="text-sm text-muted-foreground">No audit entries for this payment.</p>
              ) : (
                auditEntries.map((a) => (
                  <div key={a.id} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white" />
                    <div className="p-3 rounded-lg border bg-gray-50">
                      <p className="font-medium text-sm">{a.action}</p>
                      <p className="text-xs text-muted-foreground">{a.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">{a.timestamp} — {a.actor}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
