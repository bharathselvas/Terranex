import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle2, Circle, AlertTriangle } from "lucide-react";

const PAYMENT_STEPS = [
  { label: "Payment Package Prepared", status: "completed" as const },
  { label: "Payment Initiated", status: "completed" as const },
  { label: "External Processing", status: "in_progress" as const },
  { label: "Payment Completed", status: "pending" as const },
];

export default function CitizenPaymentStatusPage() {
  const [showFailed] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-[#0F2340] p-2 rounded-lg">
          <CreditCard className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Payment Status</h1>
          <p className="text-sm text-muted-foreground">Track your compensation payment</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#0F2340]">Payment Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-slate-200" />
              <div className="space-y-4">
                {PAYMENT_STEPS.map((step, idx) => (
                  <div key={idx} className="relative flex items-center gap-4 pl-1">
                    <div className="relative z-10">
                      {step.status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-[#0F7A5A]" />
                      ) : step.status === "in_progress" ? (
                        <div className="h-5 w-5 rounded-full border-2 border-amber-500 bg-amber-100 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                        </div>
                      ) : (
                        <Circle className="h-5 w-5 text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className={`text-sm ${step.status === "pending" ? "text-slate-400" : "text-slate-700"}`}>
                        {step.label}
                      </span>
                      {step.status === "completed" && <Badge variant="success" className="text-xs">Done</Badge>}
                      {step.status === "in_progress" && <Badge variant="warning" className="text-xs">Processing</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#0F2340]">Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Payment Reference</span>
              <span className="text-sm font-medium">MOCK-PFMS-88214</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-sm font-medium text-[#0F7A5A]">₹4,82,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Date</span>
              <span className="text-sm font-medium">10 Sep 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant="warning">Processing</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {showFailed && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="space-y-3">
                <h3 className="font-semibold text-red-800">Payment Needs Attention</h3>
                <p className="text-sm text-red-700">
                  Your compensation payment could not be completed. This may be due to incorrect bank details, an inactive account, or a temporary processing issue. Please take the required action or contact support for assistance.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive">View Required Action</Button>
                  <Button size="sm" variant="outline">Contact Support</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-center text-muted-foreground">
        This demonstration uses mock payment data. No real financial transactions are involved.
      </p>
    </div>
  );
}
