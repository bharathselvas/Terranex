import { Card, CardContent } from "@/components/ui/card";
import { FINANCE_PROJECT } from "./financeData";

export default function FinDistrictPaymentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">District-wise Payments</h1>
        <p className="text-sm text-muted-foreground mt-1">District-level payment status for {FINANCE_PROJECT.state}</p>
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">{FINANCE_PROJECT.district}</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-[#0F2340]">{FINANCE_PROJECT.awardsApproved}</p>
              <p className="text-xs text-muted-foreground">Total Awards</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">₹{FINANCE_PROJECT.completedCr} Cr</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-2xl font-bold text-amber-700">₹{FINANCE_PROJECT.pendingCr} Cr</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-700">₹{FINANCE_PROJECT.failedCr} Cr</p>
              <p className="text-xs text-muted-foreground">Failed</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-700">{Math.round(((FINANCE_PROJECT.completedCr) / FINANCE_PROJECT.awardValueCr) * 100)}%</p>
            <p className="text-sm text-muted-foreground">Overall Completion</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
