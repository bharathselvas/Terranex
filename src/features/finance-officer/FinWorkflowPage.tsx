import { Card, CardContent } from "@/components/ui/card";
import { PAYMENT_AWARDS } from "./financeData";
import { Link } from "react-router-dom";

export default function FinWorkflowPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Payment Workflow</h1>
        <p className="text-sm text-muted-foreground mt-1">End-to-end payment lifecycle</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-6">Payment Lifecycle Stages</h2>
          <div className="flex items-start gap-2 overflow-x-auto pb-4">
            {[
              { stage: "Award Approved", desc: "Competent authority approves award", color: "bg-green-100 border-green-400" },
              { stage: "Payment Package", desc: "Finance officer verifies readiness", color: "bg-blue-100 border-blue-400" },
              { stage: "Mock Initiation", desc: "Payment instruction sent to mock PFMS", color: "bg-purple-100 border-purple-400" },
              { stage: "External Processing", desc: "Simulated bank processing", color: "bg-amber-100 border-amber-400" },
              { stage: "Confirmation", desc: "External system returns status", color: "bg-green-100 border-green-400" },
              { stage: "Verification", desc: "Beneficiary verification (if needed)", color: "bg-cyan-100 border-cyan-400" },
            ].map((s, i) => (
              <div key={s.stage} className="flex items-start">
                <div className={`min-w-[160px] p-4 rounded-lg border-2 ${s.color}`}>
                  <p className="font-medium text-sm">{s.stage}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                </div>
                {i < 5 && <div className="w-8 h-0.5 bg-gray-300 mt-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <p className="text-sm text-amber-800 font-medium">Important: Finance Officer does NOT approve awards, authorize possession, or directly transfer funds.</p>
          <p className="text-xs text-amber-700 mt-1">This role prepares payment packages, initiates mock payments, monitors status, reconciles records, and manages exceptions.</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Payment Ready Awards</h2>
          <div className="space-y-3">
            {PAYMENT_AWARDS.filter((a) => a.paymentReadiness === "ready").map((a) => (
              <div key={a.awardId} className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-xs text-green-800">{a.awardId}</p>
                    <p className="font-medium text-sm text-green-900">{a.project}</p>
                    <p className="text-xs text-green-700">{a.beneficiaryCount} beneficiaries — ₹{(a.awardAmount / 100000).toFixed(2)} L</p>
                  </div>
                  <Link to={`/app/finance/award/${a.awardId}`} className="text-blue-600 hover:underline text-xs px-3 py-1 bg-white rounded border">Initiate</Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
