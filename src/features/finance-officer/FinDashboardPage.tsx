import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FINANCE_PROJECT, PAYMENT_INSTRUCTIONS, PAYMENT_EXCEPTIONS, PAYMENT_AWARDS, FINANCE_AUDIT_TRAIL, PAYMENT_WORK_QUEUE } from "./financeData";
import { LayoutDashboard, IndianRupee, CheckCircle2, AlertTriangle, ChevronRight, XCircle, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ProjectContextHeader } from "@/features/demo/ProjectContextHeader";
import { LifecycleStepper } from "@/features/demo/LifecycleStepper";

const priorityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

const PIE_COLORS = ["#16a34a", "#2563eb", "#d97706", "#dc2626", "#9333ea"];

export default function FinDashboardPage() {
  const pending = PAYMENT_INSTRUCTIONS.filter((p) => p.status === "pending").length;
  const initiated = PAYMENT_INSTRUCTIONS.filter((p) => p.status === "initiated").length;
  const completed = PAYMENT_INSTRUCTIONS.filter((p) => p.status === "completed").length;
  const failed = PAYMENT_INSTRUCTIONS.filter((p) => p.status === "failed" || p.status === "returned").length;
  const pendingVerif = PAYMENT_INSTRUCTIONS.filter((p) => p.status === "pending_verification").length;
  const openExceptions = PAYMENT_EXCEPTIONS.filter((e) => e.status !== "resolved").length;
  const paymentReady = PAYMENT_AWARDS.filter((a) => a.paymentReadiness === "ready").length;

  const statusPieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "Initiated", value: initiated },
    { name: "Failed/Returned", value: failed },
    { name: "Pending Verif.", value: pendingVerif },
  ].filter((d) => d.value > 0);

  const awardBarData = PAYMENT_AWARDS.slice(0, 5).map((a) => ({
    name: a.awardId.split("-").pop(),
    amount: Math.round(a.awardAmount / 100000),
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ProjectContextHeader />
      <LifecycleStepper />

      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <LayoutDashboard className="h-4 w-4" />
          <span>Workspace / Finance Officer</span>
        </div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Finance & Payment Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Mock / Sandbox Values — Not real government financial data</p>
      </div>

      {/* KPI Row 1 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <Card className="border-l-4 border-l-emerald-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Payment-Ready Awards</p>
                <p className="text-2xl font-bold text-[#0F2340]">{paymentReady}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-[#0F2340]">{pending}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Initiated</p>
                <p className="text-2xl font-bold text-[#0F2340]">{initiated}</p>
              </div>
              <IndianRupee className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-[#0F2340]">{completed}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Row 2 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-red-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Failed / Returned</p>
                <p className="text-2xl font-bold text-[#0F2340]">{failed}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Pending Verification</p>
                <p className="text-2xl font-bold text-[#0F2340]">{pendingVerif}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-rose-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Beneficiaries</p>
                <p className="text-2xl font-bold text-[#0F2340]">{FINANCE_PROJECT.beneficiaries}</p>
              </div>
              <IndianRupee className="h-8 w-8 text-rose-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Exceptions</p>
                <p className="text-2xl font-bold text-[#0F2340]">{openExceptions}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Value Summary */}
      <Card className="mb-6 border-[#0F2340]">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Payment Value Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xl font-bold text-[#0F2340]">₹{FINANCE_PROJECT.awardValueCr} Cr</p>
              <p className="text-xs text-muted-foreground">Awards Approved</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-700">₹{(FINANCE_PROJECT.awardValueCr - FINANCE_PROJECT.completedCr - FINANCE_PROJECT.pendingCr - FINANCE_PROJECT.failedCr - FINANCE_PROJECT.pendingVerificationCr).toFixed(1)} Cr</p>
              <p className="text-xs text-muted-foreground">Payment Initiated</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xl font-bold text-green-700">₹{FINANCE_PROJECT.completedCr} Cr</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <p className="text-xl font-bold text-amber-700">₹{FINANCE_PROJECT.pendingCr} Cr</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-xl font-bold text-red-700">₹{FINANCE_PROJECT.failedCr} Cr</p>
              <p className="text-xs text-muted-foreground">Failed / Returned</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-xl font-bold text-purple-700">₹{FINANCE_PROJECT.pendingVerificationCr} Cr</p>
              <p className="text-xs text-muted-foreground">Pending Verification</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Payment Status Distribution</h2>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie data={statusPieData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {statusPieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 text-sm">
                {statusPieData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span className="text-muted-foreground">{d.name}:</span>
                    <span className="font-medium">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Award Values (₹ Lakhs)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={awardBarData} margin={{ left: 10 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="amount" fill="#0F7A5A" name="Amount (₹ Lakhs)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Payment Cases */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#0F2340]">Recent Payments</h2>
              <Link to="/app/finance/cases" className="text-sm text-blue-600 hover:underline flex items-center gap-1">View All <ChevronRight className="h-3 w-3" /></Link>
            </div>
            <div className="space-y-3">
              {PAYMENT_INSTRUCTIONS.slice(0, 4).map((p) => (
                <div key={p.paymentId} className="p-3 rounded-lg border bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs">{p.paymentId}</span>
                    <Badge className={`text-xs ${p.status === "completed" ? "bg-green-100 text-green-800" : p.status === "failed" || p.status === "returned" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>{p.status.replace(/_/g, " ")}</Badge>
                  </div>
                  <p className="text-sm font-medium mt-1">{p.beneficiaryName}</p>
                  <p className="text-xs text-muted-foreground">₹{p.amount.toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exceptions */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#0F2340]">Open Exceptions</h2>
              <Link to="/app/finance/exceptions" className="text-sm text-blue-600 hover:underline flex items-center gap-1">View All <ChevronRight className="h-3 w-3" /></Link>
            </div>
            <div className="space-y-3">
              {PAYMENT_EXCEPTIONS.filter((e) => e.status !== "resolved").slice(0, 4).map((e) => (
                <div key={e.exceptionId} className="p-3 rounded-lg border bg-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{e.exceptionId}</span>
                    <Badge className={`text-xs ${e.severity === "critical" ? "bg-red-100 text-red-800" : e.severity === "high" ? "bg-orange-100 text-orange-800" : "bg-amber-100 text-amber-800"}`}>{e.severity}</Badge>
                  </div>
                  <p className="text-sm mt-1 truncate">{e.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Due: {e.dueDate}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Work Queue */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#0F2340]">My Work Queue</h2>
              <Link to="/app/finance/work-queue" className="text-sm text-blue-600 hover:underline flex items-center gap-1">View All <ChevronRight className="h-3 w-3" /></Link>
            </div>
            <div className="space-y-3">
              {PAYMENT_WORK_QUEUE.slice(0, 4).map((w) => (
                <div key={w.id} className="p-3 rounded-lg border bg-gray-50">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium flex-1">{w.title}</p>
                    <Badge className={`text-xs ${priorityColors[w.priority]}`}>{w.priority}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Due: {w.dueDate}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {FINANCE_AUDIT_TRAIL.slice(-5).reverse().map((a) => (
              <div key={a.id} className="flex gap-3 text-sm">
                <div className="w-1 bg-blue-200 rounded-full flex-shrink-0" />
                <div>
                  <p className="font-medium">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
