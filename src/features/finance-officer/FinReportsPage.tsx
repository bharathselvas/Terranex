import { Card, CardContent } from "@/components/ui/card";
import { PROJECT_PAYMENT_SUMMARIES, STATE_PAYMENT_SUMMARIES } from "./financeData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const PIE_COLORS = ["#16a34a", "#2563eb", "#d97706", "#dc2626", "#9333ea"];

export default function FinReportsPage() {
  const stateBarData = STATE_PAYMENT_SUMMARIES.map((s) => ({ name: s.state, completed: s.completedPayments, pending: s.pendingPayments }));
  const projectPieData = [
    { name: "Completed", value: PROJECT_PAYMENT_SUMMARIES.reduce((a, p) => a + p.completedPayments, 0) },
    { name: "Pending", value: PROJECT_PAYMENT_SUMMARIES.reduce((a, p) => a + p.pendingPayments, 0) },
    { name: "Failed", value: PROJECT_PAYMENT_SUMMARIES.reduce((a, p) => a + p.failedPayments, 0) },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Finance Reports</h1>
        <p className="text-sm text-muted-foreground mt-1">Aggregated payment performance metrics</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">State-wise Payments</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stateBarData} margin={{ left: 10 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="completed" stackId="a" fill="#16a34a" name="Completed" />
                <Bar dataKey="pending" stackId="a" fill="#d97706" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Overall Status</h2>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie data={projectPieData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {projectPieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 text-sm">
                {projectPieData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: PIE_COLORS[i] }} />
                    <span className="text-muted-foreground">{d.name}:</span>
                    <span className="font-medium">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Project Payment Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Project</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Total Awards</th>
                  <th className="text-right p-2 font-medium text-muted-foreground">Amount (₹ Cr)</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Completed</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Pending</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Failed</th>
                  <th className="text-right p-2 font-medium text-muted-foreground">Completion %</th>
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
