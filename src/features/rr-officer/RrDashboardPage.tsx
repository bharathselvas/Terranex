import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RR_CASES, RR_PROJECT, WORK_QUEUE, GRIEVANCES, COMPONENT_PROGRESS, RR_AUDIT_TRAIL, RESETTLEMENT_SITES } from "./rrOfficerData";
import { LayoutDashboard, Users, AlertTriangle, CheckCircle2, Clock, FileText, ChevronRight, Home, BarChart3, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ProjectContextHeader } from "@/features/demo/ProjectContextHeader";
import { LifecycleStepper } from "@/features/demo/LifecycleStepper";

const priorityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800",
  verification_required: "bg-amber-100 text-amber-800",
  under_review: "bg-blue-100 text-blue-800",
  plan_active: "bg-indigo-100 text-indigo-800",
  partially_delivered: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  on_hold: "bg-yellow-100 text-yellow-800",
  grievance: "bg-red-100 text-red-800",
  escalated: "bg-red-200 text-red-900",
};

const PIE_COLORS = ["#16a34a", "#2563eb", "#d97706", "#9333ea"];

export default function RrDashboardPage() {
  const activeCases = RR_CASES.filter((c) => c.status !== "completed").length;
  const familiesIdentified = RR_CASES.length;
  const verificationPending = RR_CASES.filter((c) => c.verification === "pending").length;
  const plansActive = RR_CASES.filter((c) => c.status === "plan_active" || c.status === "partially_delivered").length;
  const componentsPending = RR_CASES.reduce((sum, c) => sum + (c.componentsTotal - c.componentsDelivered), 0);
  const componentsDelivered = RR_CASES.reduce((sum, c) => sum + c.componentsDelivered, 0);
  const openGrievances = GRIEVANCES.filter((g) => g.status !== "resolved" && g.status !== "escalated").length;
  const criticalCases = RR_CASES.filter((c) => c.priority === "critical").length;
  const sitesReady = RESETTLEMENT_SITES.filter((s) => s.status === "operational" || s.status === "partially_occupied").length;

  const componentBarData = [
    { name: "Housing", completed: COMPONENT_PROGRESS.housing.completed, pending: COMPONENT_PROGRESS.housing.applicable - COMPONENT_PROGRESS.housing.completed },
    { name: "Subsistence", completed: COMPONENT_PROGRESS.subsistence.completed, pending: COMPONENT_PROGRESS.subsistence.applicable - COMPONENT_PROGRESS.subsistence.completed },
    { name: "Transport", completed: COMPONENT_PROGRESS.transportation.completed, pending: COMPONENT_PROGRESS.transportation.applicable - COMPONENT_PROGRESS.transportation.completed },
    { name: "Livelihood", completed: COMPONENT_PROGRESS.livelihood.completed, pending: COMPONENT_PROGRESS.livelihood.applicable - COMPONENT_PROGRESS.livelihood.completed },
    { name: "Employment", completed: COMPONENT_PROGRESS.employment.completed, pending: COMPONENT_PROGRESS.employment.applicable - COMPONENT_PROGRESS.employment.completed },
    { name: "Skill Dev", completed: COMPONENT_PROGRESS.skillDev.completed, pending: COMPONENT_PROGRESS.skillDev.applicable - COMPONENT_PROGRESS.skillDev.completed },
  ];

  const statusPieData = [
    { name: "Completed", value: RR_CASES.filter((c) => c.status === "completed").length },
    { name: "In Progress", value: RR_CASES.filter((c) => c.status === "plan_active" || c.status === "partially_delivered").length },
    { name: "Pending", value: RR_CASES.filter((c) => c.status === "draft" || c.status === "verification_required").length },
    { name: "Grievance", value: RR_CASES.filter((c) => c.status === "grievance" || c.status === "escalated").length },
  ].filter((d) => d.value > 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ProjectContextHeader />
      <LifecycleStepper />

      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <LayoutDashboard className="h-4 w-4" />
          <span>Workspace / R&R Officer</span>
        </div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Rehabilitation & Resettlement Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Operational tracking — not legal compliance scores</p>
      </div>

      {/* KPI Row 1 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Cases</p>
                <p className="text-2xl font-bold text-[#0F2340]">{activeCases}</p>
              </div>
              <Home className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Families Identified</p>
                <p className="text-2xl font-bold text-[#0F2340]">{familiesIdentified}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Verification Pending</p>
                <p className="text-2xl font-bold text-[#0F2340]">{verificationPending}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">R&R Plans Active</p>
                <p className="text-2xl font-bold text-[#0F2340]">{plansActive}</p>
              </div>
              <FileText className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Row 2 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-orange-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Components Pending</p>
                <p className="text-2xl font-bold text-[#0F2340]">{componentsPending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Components Delivered</p>
                <p className="text-2xl font-bold text-[#0F2340]">{componentsDelivered}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-rose-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Open Grievances</p>
                <p className="text-2xl font-bold text-[#0F2340]">{openGrievances}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-rose-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Critical Cases</p>
                <p className="text-2xl font-bold text-[#0F2340]">{criticalCases}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Overview */}
      <Card className="mb-6 border-[#0F2340]">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[#0F2340]">Project R&R Overview</h2>
              <p className="text-sm text-muted-foreground">{RR_PROJECT.projectName}</p>
            </div>
            <Link to="/app/rr/project-overview" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              Full View <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-[#0F2340]">{RR_PROJECT.affectedFamilies}</p>
              <p className="text-xs text-muted-foreground">Affected Families</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-[#0F2340]">{RR_PROJECT.rrApplicable}</p>
              <p className="text-xs text-muted-foreground">R&R Applicable</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">{RR_PROJECT.rrCompleted}</p>
              <p className="text-xs text-muted-foreground">R&R Completed</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">{RR_PROJECT.inProgress}</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <p className="text-2xl font-bold text-amber-700">{RR_PROJECT.pendingVerification}</p>
              <p className="text-xs text-muted-foreground">Pending Verification</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-700">{sitesReady}/{RESETTLEMENT_SITES.length}</p>
              <p className="text-xs text-muted-foreground">Sites Ready</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-green-600 h-3 rounded-full" style={{ width: `${(RR_PROJECT.rrCompleted / RR_PROJECT.rrApplicable) * 100}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-right">{Math.round((RR_PROJECT.rrCompleted / RR_PROJECT.rrApplicable) * 100)}% overall completion</p>
        </CardContent>
      </Card>

      {/* Component Progress & Status Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" /> Component Delivery Status
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={componentBarData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="completed" stackId="a" fill="#16a34a" name="Completed" />
                <Bar dataKey="pending" stackId="a" fill="#e5e7eb" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-2">Operational tracking status — not legal compliance scores</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Case Status Distribution</h2>
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
      </div>

      {/* Cases Table */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#0F2340]">R&R Cases</h2>
            <Link to="/app/rr/cases" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View All <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Case ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Family</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Village</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Progress</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Priority</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {RR_CASES.slice(0, 5).map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{c.id}</td>
                    <td className="p-2 font-medium">{c.familyName}</td>
                    <td className="p-2">{c.village}</td>
                    <td className="p-2"><Badge className={`text-xs ${statusColors[c.status]}`}>{c.status.replace(/_/g, " ")}</Badge></td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(c.componentsDelivered / c.componentsTotal) * 100}%` }} />
                        </div>
                        <span className="text-xs">{c.componentsDelivered}/{c.componentsTotal}</span>
                      </div>
                    </td>
                    <td className="p-2"><Badge className={`text-xs ${priorityColors[c.priority]}`}>{c.priority}</Badge></td>
                    <td className="p-2">
                      <Link to={`/app/rr/case/${c.id}`} className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                        Open <ChevronRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Work Queue */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">My Work Queue</h2>
            <div className="space-y-3">
              {WORK_QUEUE.slice(0, 4).map((w) => (
                <div key={w.id} className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{w.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{w.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`text-xs ${priorityColors[w.priority]}`}>{w.priority}</Badge>
                      <span className="text-xs text-muted-foreground">Due: {w.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/app/rr/work-queue" className="text-sm text-blue-600 hover:underline mt-3 flex items-center gap-1">
              View All <ChevronRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* Grievances */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Open Grievances</h2>
            <div className="space-y-3">
              {GRIEVANCES.filter((g) => g.status !== "resolved").slice(0, 4).map((g) => (
                <div key={g.id} className="p-3 rounded-lg border bg-gray-50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs">{g.id}</span>
                    <Badge className={`text-xs ${priorityColors[g.priority]}`}>{g.priority}</Badge>
                  </div>
                  <p className="text-sm">{g.family}</p>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{g.description}</p>
                </div>
              ))}
            </div>
            <Link to="/app/rr/grievances" className="text-sm text-blue-600 hover:underline mt-3 flex items-center gap-1">
              View All <ChevronRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {RR_AUDIT_TRAIL.slice(-5).reverse().map((a) => (
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
    </div>
  );
}
