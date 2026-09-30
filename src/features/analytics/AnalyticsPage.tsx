import { BarChart3, TrendingUp, Clock3 } from "lucide-react";
import { useCaseStore } from "@/stores/caseStore";
import { STAGES } from "@/lib/stages";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const PIE_COLORS = ["#0F2340", "#1A3560", "#2E5A8B", "#0F7A5A", "#9A6B00", "#B42318", "#6B7280", "#7C3AED"];

export function AnalyticsPage() {
  const { cases } = useCaseStore();

  const byStage = STAGES.map((s) => ({
    stage: s.shortLabel,
    count: cases.filter((c) => c.stage === s.id).length,
  })).filter((d) => d.count > 0);

  const byDistrict = Array.from(
    cases.reduce((m, c) => m.set(c.jurisdiction.district, (m.get(c.jurisdiction.district) ?? 0) + 1), new Map<string, number>()),
  ).map(([district, count]) => ({ district, count }));

  const bySla = [
    { name: "Overdue", value: cases.filter((c) => c.slaStatus === "overdue").length },
    { name: "Due soon", value: cases.filter((c) => c.slaStatus === "due_soon").length },
    { name: "On track", value: cases.filter((c) => c.slaStatus === "on_track").length },
    { name: "No SLA", value: cases.filter((c) => !c.slaStatus).length },
  ].filter((d) => d.value > 0);

  const totalArea = cases.reduce((s, c) => s + c.areaHa, 0);
  const totalSanctioned = cases.reduce((s, c) => s + (c.amountSanctionedCr ?? 0), 0);
  const active = cases.filter((c) => c.status === "active").length;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Analytics</h1>
        <p className="text-xs text-muted-foreground">Portfolio view over the same shared case registry — no separate reporting store.</p>
      </div>

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5" /> Total cases</p>
            <p className="mt-1 text-2xl font-bold text-[#0F2340]">{cases.length}</p>
            <p className="text-xs text-muted-foreground">{active} active · {cases.length - active} closed/on hold</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> Area under acquisition</p>
            <p className="mt-1 text-2xl font-bold text-[#0F2340]">{totalArea.toFixed(1)} Ha</p>
            <p className="text-xs text-muted-foreground">{cases.length ? (totalArea / cases.length).toFixed(1) : "0"} Ha avg / case</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Amount sanctioned</p>
            <p className="mt-1 text-2xl font-bold text-[#0F2340]">₹ {totalSanctioned.toFixed(2)} Cr</p>
            <p className="text-xs text-muted-foreground">Across {cases.filter((c) => c.amountSanctionedCr != null).length} cases with sanction</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> SLA breaches</p>
            <p className="mt-1 text-2xl font-bold text-[#B42318]">{cases.filter((c) => c.slaStatus === "overdue").length}</p>
            <p className="text-xs text-muted-foreground">+ {cases.filter((c) => c.slaStatus === "due_soon").length} due soon</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cases by stage</CardTitle>
            <CardDescription>Counts across the 17-stage lifecycle</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byStage}>
                <XAxis dataKey="stage" tick={{ fontSize: 11 }} interval={0} angle={-18} dy={10} height={50} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#0F2340" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cases by district</CardTitle>
            <CardDescription>Jurisdiction distribution (mock)</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byDistrict} layout="vertical">
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="district" tick={{ fontSize: 11 }} width={90} />
                <Tooltip />
                <Bar dataKey="count" fill="#2E5A8B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">SLA health</CardTitle>
            <CardDescription>One national ledger, one SLA clock</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={bySla} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={88} label={({ name, value }) => `${name}: ${value}`}>
                  {bySla.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Notes</CardTitle>
            <CardDescription>What&apos;s mock vs. future API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-slate-700">
            <p>Charts read directly from <span className="gov-mono">useCaseStore.cases</span> — advancing a case in <span className="gov-mono">/app/cases/:id</span> moves the bars and SLA pie immediately. Later build will back this with a read model API.</p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary">Mock: counts & SLA</Badge>
              <Badge variant="outline">Later: PostGIS + time-series</Badge>
              <Badge variant="muted">No backend yet</Badge>
            </div>
            <p className="text-muted-foreground">Recharts here is the same library the Final Build Plan calls for — kept unstyled so it fits the institutional theme.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
