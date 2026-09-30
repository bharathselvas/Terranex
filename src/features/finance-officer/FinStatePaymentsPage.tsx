import { Card, CardContent } from "@/components/ui/card";
import { STATE_PAYMENT_SUMMARIES } from "./financeData";

export default function FinStatePaymentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">State-wise Payments</h1>
        <p className="text-sm text-muted-foreground mt-1">{STATE_PAYMENT_SUMMARIES.length} states</p>
      </div>

      <div className="space-y-4">
        {STATE_PAYMENT_SUMMARIES.map((s) => (
          <Card key={s.state}>
            <CardContent className="p-5">
              <h3 className="font-semibold text-[#0F2340] mb-3">{s.state}</h3>
              <div className="grid grid-cols-6 gap-4 text-center">
                <div><p className="text-xl font-bold text-[#0F2340]">{s.totalProjects}</p><p className="text-xs text-muted-foreground">Projects</p></div>
                <div><p className="text-xl font-bold text-[#0F2340]">{s.totalAwards}</p><p className="text-xs text-muted-foreground">Awards</p></div>
                <div><p className="text-xl font-bold text-[#0F2340]">₹{s.totalAwardAmountCr} Cr</p><p className="text-xs text-muted-foreground">Award Value</p></div>
                <div><p className="text-xl font-bold text-green-700">{s.completedPayments}</p><p className="text-xs text-muted-foreground">Completed</p></div>
                <div><p className="text-xl font-bold text-amber-700">{s.pendingPayments}</p><p className="text-xs text-muted-foreground">Pending</p></div>
                <div><p className="text-xl font-bold text-red-700">{s.failedPayments}</p><p className="text-xs text-muted-foreground">Failed</p></div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Completion: <span className="font-bold">{s.completionPercentage}%</span></p>
                <p className="text-sm text-muted-foreground">Open Exceptions: <span className="font-bold">{s.openExceptions}</span></p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
