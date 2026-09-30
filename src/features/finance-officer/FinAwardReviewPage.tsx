import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_AWARDS, PAYMENT_INSTRUCTIONS, PAYMENT_EXCEPTIONS, PAYMENT_DOCUMENTS } from "./financeData";
import { ArrowLeft, AlertTriangle, CheckCircle2, FileText } from "lucide-react";

const readinessColors: Record<string, string> = {
  ready: "bg-green-100 text-green-800",
  missing_document: "bg-amber-100 text-amber-800",
  verification_required: "bg-orange-100 text-orange-800",
  exception: "bg-red-100 text-red-800",
  blocked: "bg-red-200 text-red-900",
};

export default function FinAwardReviewPage() {
  const { awardId } = useParams();
  const award = PAYMENT_AWARDS.find((a) => a.awardId === awardId) || PAYMENT_AWARDS[0];
  const awardPayments = PAYMENT_INSTRUCTIONS.filter((p) => p.awardId === award.awardId);
  const awardExceptions = PAYMENT_EXCEPTIONS.filter((e) => e.awardId === award.awardId);
  const awardDocs = PAYMENT_DOCUMENTS.filter((d) => d.relatedAward === award.awardId);
  const completedCount = awardDocs.filter((d) => d.status === "available").length;

  const checklist = [
    { label: "Final award available", checked: true },
    { label: "Beneficiary records available", checked: true },
    { label: "Payment details captured", checked: award.bankVerifiedCount === award.beneficiaryCount },
    { label: "Required verification complete", checked: award.bankVerifiedCount === award.beneficiaryCount },
    { label: "Supporting documents available", checked: award.documentsCount === award.documentsTotal },
    { label: "No blocking exception", checked: award.blockingExceptions === 0 },
  ];
  const allReady = checklist.every((c) => c.checked);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/finance/awards" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Awards
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Award Payment Review — {award.awardId}</h1>
        <div className="flex items-center gap-3 mt-2">
          <Badge className={`text-xs ${readinessColors[award.paymentReadiness]}`}>{award.paymentReadiness.replace(/_/g, " ")}</Badge>
          <span className="text-sm text-muted-foreground">₹{(award.awardAmount / 100000).toFixed(2)} L</span>
          <span className="text-sm text-muted-foreground">{award.beneficiaryCount} beneficiaries</span>
        </div>
      </div>

      {/* Award Details */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Award Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Award ID</span><span className="font-mono">{award.awardId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Project</span><span className="font-medium">{award.project}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">State</span><span>{award.state}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">District</span><span>{award.district}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Award Date</span><span>{award.awardDate}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Approved By</span><span>{award.approvedBy}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Award Status</span><Badge className="text-xs bg-green-100 text-green-800">{award.awardStatus}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Award Amount</span><span className="font-bold">₹{(award.awardAmount / 100000).toFixed(2)} L</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Beneficiary Count</span><span className="font-medium">{award.beneficiaryCount}</span></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Payment Package Checklist</h2>
            <div className="space-y-2">
              {checklist.map((c) => (
                <div key={c.label} className={`flex items-center gap-3 p-2 rounded ${c.checked ? "bg-green-50" : "bg-amber-50"}`}>
                  {c.checked ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertTriangle className="h-4 w-4 text-amber-600" />}
                  <span className={`text-sm ${c.checked ? "text-green-800" : "text-amber-800"}`}>{c.label}</span>
                </div>
              ))}
            </div>
            {!allReady && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800 font-medium">⚠ {checklist.filter((c) => !c.checked).length} items require attention</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment Instructions */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Payment Instructions ({awardPayments.length})</h2>
          {awardPayments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No payment instructions initiated for this award.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium text-muted-foreground">Payment ID</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Beneficiary</th>
                    <th className="text-right p-2 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-2 font-medium text-muted-foreground">External Ref</th>
                  </tr>
                </thead>
                <tbody>
                  {awardPayments.map((p) => (
                    <tr key={p.paymentId} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-mono text-xs">{p.paymentId}</td>
                      <td className="p-2">{p.beneficiaryName}</td>
                      <td className="p-2 text-right">₹{p.amount.toLocaleString("en-IN")}</td>
                      <td className="p-2"><Badge className={`text-xs ${p.status === "completed" ? "bg-green-100 text-green-800" : p.status === "failed" || p.status === "returned" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>{p.status.replace(/_/g, " ")}</Badge></td>
                      <td className="p-2 font-mono text-xs">{p.externalReference || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exceptions & Documents */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Exceptions ({awardExceptions.length})</h2>
            {awardExceptions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No exceptions for this award.</p>
            ) : (
              <div className="space-y-2">
                {awardExceptions.map((e) => (
                  <div key={e.exceptionId} className="p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs">{e.exceptionId}</span>
                      <Badge className={`text-xs ${e.severity === "critical" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>{e.severity}</Badge>
                      <Badge className={`text-xs ${e.status === "resolved" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>{e.status.replace(/_/g, " ")}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{e.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Documents ({completedCount}/{awardDocs.length})</h2>
            <div className="space-y-2">
              {awardDocs.map((d) => (
                <div key={d.docId} className={`flex items-center justify-between p-3 rounded ${d.status === "available" ? "bg-green-50" : "bg-red-50"}`}>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{d.type}</p>
                      <p className="text-xs text-muted-foreground">{d.date}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs ${d.status === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{d.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Award Approval Restriction */}
      <Card className="mt-6 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <p className="text-sm text-amber-800">Award approval belongs to the competent statutory authority (District Collector / CALA). The Finance Officer reviews payment readiness only.</p>
        </CardContent>
      </Card>
    </div>
  );
}
