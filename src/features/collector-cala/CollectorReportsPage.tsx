import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REPORTS, DISTRICT_PROJECTS, DISTRICT_PROFILE, COMPENSATION_DATA, AWARDS, PAYMENTS, POSSESSIONS, GRIEVANCES, OBJECTIONS } from "./districtCollectorData";

const formatINR = (n: number) => `₹${(n / 100000).toFixed(2)}L`;

const categoryColors: Record<string, string> = {
  progress: "bg-blue-100 text-blue-800", financial: "bg-emerald-100 text-emerald-800",
  operational: "bg-amber-100 text-amber-800", compliance: "bg-purple-100 text-purple-800",
};

export default function CollectorReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Reports &amp; MIS</h1>
        <p className="text-sm text-muted-foreground">{DISTRICT_PROFILE.name} District &middot; Operational dashboards and compliance reports</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Active Projects</p>
            <p className="text-2xl font-bold text-[#0F2340]">{DISTRICT_PROJECTS.filter((p) => p.status === "active").length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Parcels</p>
            <p className="text-2xl font-bold text-[#0F2340]">{DISTRICT_PROJECTS.reduce((s, p) => s + p.parcels, 0).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Open Objections</p>
            <p className="text-2xl font-bold text-amber-700">{OBJECTIONS.filter((o) => o.status !== "resolved").length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Open Grievances</p>
            <p className="text-2xl font-bold text-red-700">{GRIEVANCES.filter((g) => g.status !== "resolved").length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Compensation Assessed</p>
            <p className="text-xl font-bold text-[#0F2340]">{formatINR(COMPENSATION_DATA.reduce((s, c) => s + c.indicativeCompensation, 0))}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Awards Approved</p>
            <p className="text-xl font-bold text-emerald-700">{AWARDS.filter((a) => a.status === "approved").length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Payments Completed</p>
            <p className="text-xl font-bold text-emerald-700">{PAYMENTS.filter((p) => p.status === "completed").length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Possessions Recorded</p>
            <p className="text-xl font-bold text-emerald-700">{POSSESSIONS.filter((p) => p.possessionStatus === "recorded").length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0F2340]">Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {REPORTS.map((r) => (
              <div key={r.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium">{r.name}</p>
                  <Badge className={`text-[10px] ${categoryColors[r.category]}`}>{r.category}</Badge>
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">{r.description}</p>
                <button className="mt-2 rounded bg-[#0F2340] px-2 py-1 text-[10px] text-white hover:bg-[#1a3560]">Generate</button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
