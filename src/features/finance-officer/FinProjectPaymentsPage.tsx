import { Card, CardContent } from "@/components/ui/card";
import { PROJECT_PAYMENT_SUMMARIES } from "./financeData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function FinProjectPaymentsPage() {
  const barData = PROJECT_PAYMENT_SUMMARIES.map((p) => ({
    name: p.project.split(" ").slice(0, 3).join(" "),
    completed: p.completedPayments,
    pending: p.pendingPayments,
    failed: p.failedPayments,
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Project-wise Payments</h1>
        <p className="text-sm text-muted-foreground mt-1">{PROJECT_PAYMENT_SUMMARIES.length} projects</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-5">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ left: 20 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="completed" stackId="a" fill="#16a34a" name="Completed" />
              <Bar dataKey="pending" stackId="a" fill="#d97706" name="Pending" />
              <Bar dataKey="failed" stackId="a" fill="#dc2626" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Project</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Awards</th>
                  <th className="text-right p-2 font-medium text-muted-foreground">Amount (₹ Cr)</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Completed</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Pending</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Failed</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Exceptions</th>
                  <th className="text-right p-2 font-medium text-muted-foreground">Completion</th>
                </tr>
              </thead>
              <tbody>
                {PROJECT_PAYMENT_SUMMARIES.map((p) => (
                  <tr key={p.projectId} className="border-b hover:bg-gray-50">
                    <td className="p-2 text-xs max-w-[200px] truncate">{p.project}</td>
                    <td className="p-2 text-center">{p.totalAwards}</td>
                    <td className="p-2 text-right font-medium">₹{p.totalAwardAmountCr}</td>
                    <td className="p-2 text-center text-green-700">{p.completedPayments}</td>
                    <td className="p-2 text-center text-amber-700">{p.pendingPayments}</td>
                    <td className="p-2 text-center text-red-700">{p.failedPayments}</td>
                    <td className="p-2 text-center">{p.openExceptions}</td>
                    <td className="p-2 text-right font-bold">{p.completionPercentage}%</td>
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
