import { Link, Navigate } from "react-router-dom";
import {
  AlertTriangle,
  Files,
  Clock3,
  IndianRupee,
  ArrowUpRight,
  FileWarning,
  ScrollText,
  MapPin,
  ClipboardCheck,
  Home,
  Users2,
  Building2,
  Scale,
  Banknote,
  CheckCircle2,
  CircleDot,
  User,
} from "lucide-react";
import { useSessionStore } from "@/stores/sessionStore";
import { useCaseStore } from "@/stores/caseStore";
import { ROLE_BY_ID, type RoleId } from "@/types/rbac";
import { MOCK_PARCELS } from "@/mocks/parcels";
import { MOCK_DOCUMENTS, MOCK_OBJECTIONS, MOCK_PAYMENTS, MOCK_GRIEVANCES, MOCK_NOTIFICATIONS } from "@/mocks/audit";
import type { AcquisitionCase, Payment } from "@/types/domain";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StageStepper } from "@/components/domain/StageStepper";
import { formatDate, formatINR } from "@/lib/format";

export function OverviewPage() {
  const { user } = useSessionStore();
  const { cases, audit } = useCaseStore();

  // National Admin gets a dedicated overview page
  if (user.roleId === "national_admin") {
    return <Navigate to="/app/admin/overview" replace />;
  }

  // Ministry Nodal Officer gets a dedicated overview page
  if (user.roleId === "ministry_nodal") {
    return <Navigate to="/app/ministry/overview" replace />;
  }

  // Requiring Organisation / Implementing Agency gets a dedicated overview page
  if (user.roleId === "requiring_org") {
    return <Navigate to="/app/ro/dashboard" replace />;
  }

  // State Nodal Officer gets a dedicated overview page
  if (user.roleId === "state_nodal") {
    return <Navigate to="/app/state-nodal/overview" replace />;
  }

  // District Collector / CALA gets a dedicated overview page
  if (user.roleId === "collector_cala") {
    return <Navigate to="/app/collector/overview" replace />;
  }

  // Tehsil / SDO gets a dedicated overview page
  if (user.roleId === "tehsil_sdo") {
    return <Navigate to="/app/tehsil/overview" replace />;
  }

  // Field Officer / VAO gets a dedicated overview page
  if (user.roleId === "field_officer") {
    return <Navigate to="/app/fo/home" replace />;
  }

  // SIA Expert Group gets a dedicated dashboard
  if (user.roleId === "sia_expert") {
    return <Navigate to="/app/sia/dashboard" replace />;
  }

  // R&R Officer gets a dedicated dashboard
  if (user.roleId === "rnr_officer") {
    return <Navigate to="/app/rr/dashboard" replace />;
  }

  // Finance Officer gets a dedicated dashboard
  if (user.roleId === "finance_officer") {
    return <Navigate to="/app/finance/dashboard" replace />;
  }

  // Citizen / Landowner gets a separate citizen portal
  if (user.roleId === "citizen") {
    return <Navigate to="/citizen" replace />;
  }

  const role = ROLE_BY_ID[user.roleId as RoleId];

  const activeCases = cases.filter((c) => c.status === "active");
  const overdue = cases.filter((c) => c.slaStatus === "overdue");
  const dueSoon = cases.filter((c) => c.slaStatus === "due_soon");
  const paymentsDue = cases.filter((c) => c.stage === "payment" || c.stage === "compensation");
  const recentCases = [...cases].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);

  // Role-specific case subsets
  const myCases = cases.filter((c) => c.assigneeRoleId === user.roleId);
  const pendingScrutiny = cases.filter((c) => c.stage === "scrutiny");
  const fieldTasks = cases.filter((c) => c.stage === "field_verification");
  const paymentQueue = MOCK_PAYMENTS.filter((p) => p.status === "pending" || p.status === "sanctioned");
  const unreadNotifs = MOCK_NOTIFICATIONS.filter((n) => !n.read);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">
            {role?.shortLabel ?? user.roleId} Workspace
          </h1>
          <p className="text-xs text-muted-foreground">
            {user.name} · {role?.label} · {user.jurisdiction}
          </p>
        </div>
        <Button asChild size="sm">
          <Link to="/app/cases">
            View all cases <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Role-specific KPI cards — national_admin is redirected to /app/admin/overview above */}
      {((user.roleId as string) === "collector_cala") && <CollectorKPIs cases={cases} myCases={myCases} overdue={overdue} pendingScrutiny={pendingScrutiny} />}
      {((user.roleId as string) === "field_officer") && <FieldOfficerKPIs fieldTasks={fieldTasks} />}
      {((user.roleId as string) === "finance_officer") && <FinanceKPIs paymentQueue={paymentQueue} paymentsDue={paymentsDue} />}
      {user.roleId === "citizen" && <CitizenKPIs />}
      {((user.roleId as string) === "sia_expert") && <SiaKPIs />}
      {((user.roleId as string) === "rnr_officer") && <RnrKPIs />}
      {((user.roleId as string) === "tehsil_sdo") && <TehsilKpi cases={cases} overdue={overdue} />}
      {((user.roleId as string) === "requiring_org") && <RequiringOrgKPIs />}
      {((user.roleId as string) === "state_nodal") && <StateNodalKPIs cases={cases} overdue={overdue} />}

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Golden Path tracker */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock3 className="h-4 w-4 text-slate-500" /> Golden Path — Case Tracker
            </CardTitle>
            <CardDescription>Shared cases — row stepper shows lifecycle position.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentCases.map((c) => (
              <Link
                key={c.id}
                to={`/app/cases/${c.id}`}
                className="block rounded-lg border bg-white p-3 transition-colors hover:bg-slate-50"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="gov-mono text-[#0F2340]">{c.caseNo}</p>
                    <p className="line-clamp-1 text-sm font-medium text-slate-800">{c.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.jurisdiction.district} · {c.jurisdiction.tehsil} · {c.jurisdiction.village} &nbsp;·&nbsp; {c.parcelsCount} parcels · {c.areaHa} Ha
                      {c.amountSanctionedCr != null && ` · ₹ ${c.amountSanctionedCr} Cr`}
                    </p>
                  </div>
                  <Badge variant={c.slaStatus === "overdue" ? "danger" : c.slaStatus === "due_soon" ? "warning" : "secondary"} className="shrink-0 text-[11px]">
                    {c.stage.replace(/_/g, " ")}
                  </Badge>
                </div>
                <StageStepper currentStageId={c.stage} size="sm" className="mt-2" />
                <p className="mt-1 text-[11px] text-muted-foreground">Updated {formatDate(c.updatedAt)} · Assignee: {c.assigneeName}</p>
              </Link>
            ))}
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/app/cases">View all {cases.length} cases</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Right column — role-specific side panel */}
        <div className="space-y-4">
          {/* Alerts — always visible */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-amber-600" /> Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {overdue.slice(0, 3).map((c) => (
                <div key={c.id} className="rounded-md border border-red-200 bg-red-50 px-3 py-2">
                  <p className="gov-mono text-[#B42318]">{c.caseNo}</p>
                  <p className="text-xs font-medium text-red-900">{c.title}</p>
                  <p className="text-[11px] text-red-700">SLA overdue — {c.stage.replace(/_/g, " ")} · Due {c.slaDueAt}</p>
                </div>
              ))}
              {overdue.length === 0 && <p className="text-xs text-muted-foreground">No overdue cases.</p>}
              {dueSoon.slice(0, 2).map((c) => (
                <div key={c.id} className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
                  <p className="gov-mono text-amber-800">{c.caseNo}</p>
                  <p className="line-clamp-1 text-xs font-medium text-amber-900">{c.title}</p>
                  <p className="text-[11px] text-amber-700">Due soon — {c.slaDueAt}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Audit */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <ScrollText className="h-4 w-4 text-slate-500" /> Recent Audit
              </CardTitle>
              <CardDescription>Latest actions across all cases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {audit.slice(0, 5).map((e) => (
                <div key={e.id} className="border-l-2 border-slate-200 pl-3">
                  <p className="line-clamp-1 text-xs font-medium text-slate-800">{e.action}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {e.actorName} · {e.actorRole.replace(/_/g, " ")} · {formatDate(e.at.slice(0, 10))}
                  </p>
                  {e.before && e.after && (
                    <p className="gov-mono text-[11px] text-muted-foreground">
                      {e.before} → {e.after}
                    </p>
                  )}
                </div>
              ))}
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link to="/app/audit">View audit trail</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── Role-specific KPI components ──

function CollectorKPIs({ cases, myCases, overdue, pendingScrutiny }: { cases: AcquisitionCase[]; myCases: AcquisitionCase[]; overdue: AcquisitionCase[]; pendingScrutiny: AcquisitionCase[] }) {
  const puneCases = cases.filter((c) => c.jurisdiction.district === "Pune");
  const hearings = MOCK_OBJECTIONS.filter((o) => o.hearingDate && o.status !== "heard");
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">My District Cases</p>
            <Scale className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{puneCases.length}</p>
          <p className="text-xs text-muted-foreground">Pune district</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Awaiting Scrutiny</p>
            <FileWarning className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{pendingScrutiny.length}</p>
          <p className="text-xs text-muted-foreground">Collector review pending</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Overdue</p>
            <AlertTriangle className="h-4 w-4 text-[#B42318]" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#B42318]">{overdue.length}</p>
          <p className="text-xs text-muted-foreground">SLA breached</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Hearings Pending</p>
            <ScrollText className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{hearings.length}</p>
          <p className="text-xs text-muted-foreground">Objections to hear</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Assigned to Me</p>
            <User className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{myCases.length}</p>
          <p className="text-xs text-muted-foreground">{myCases.filter((c) => c.status === "active").length} active</p>
        </CardContent>
      </Card>
    </div>
  );
}

function FieldOfficerKPIs({ fieldTasks }: { fieldTasks: AcquisitionCase[] }) {
  const myParcels = MOCK_PARCELS.filter((p) => p.stage === "field_verification" || p.stage === "compensation");
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Field Tasks</p>
            <ClipboardCheck className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{fieldTasks.length}</p>
          <p className="text-xs text-muted-foreground">Awaiting field verification</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Parcels to Measure</p>
            <MapPin className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{myParcels.length}</p>
          <p className="text-xs text-muted-foreground">{myParcels.reduce((s, p) => s + p.areaHa, 0).toFixed(1)} Ha total</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Villages</p>
            <Home className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">
            {Array.from(new Set(myParcels.map((p) => p.village))).length}
          </p>
          <p className="text-xs text-muted-foreground">Active survey areas</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Grievances</p>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">
            {MOCK_GRIEVANCES.filter((g) => g.status === "open" || g.status === "escalated").length}
          </p>
          <p className="text-xs text-muted-foreground">Open / escalated</p>
        </CardContent>
      </Card>
    </div>
  );
}

function FinanceKPIs({ paymentQueue, paymentsDue }: { paymentQueue: Payment[]; paymentsDue: AcquisitionCase[] }) {
  const totalPending = paymentQueue.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  const totalSanctioned = paymentQueue.filter((p) => p.status === "sanctioned").reduce((s, p) => s + p.amount, 0);
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Payment Queue</p>
            <Banknote className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{paymentQueue.length}</p>
          <p className="text-xs text-muted-foreground">Pending / sanctioned</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Awaiting Sanction</p>
            <Clock3 className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{paymentQueue.filter((p) => p.status === "pending").length}</p>
          <p className="text-xs text-muted-foreground">{formatINR(totalPending)} total</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Sanctioned (Disbursing)</p>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{paymentQueue.filter((p) => p.status === "sanctioned").length}</p>
          <p className="text-xs text-muted-foreground">{formatINR(totalSanctioned)} total</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Cases at Payment</p>
            <Files className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{paymentsDue.length}</p>
          <p className="text-xs text-muted-foreground">Compensation / payment stage</p>
        </CardContent>
      </Card>
    </div>
  );
}

function CitizenKPIs() {
  const myParcels = MOCK_PARCELS.filter((p) => p.owner.name.includes("Khomane") || p.owner.name.includes("Patil"));
  const myGrievances = MOCK_GRIEVANCES.filter((g) => g.filedBy.includes("Kale") || g.filedBy.includes("Rathod"));
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">My Land Holdings</p>
            <MapPin className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{myParcels.length}</p>
          <p className="text-xs text-muted-foreground">{myParcels.reduce((s, p) => s + p.areaHa, 0).toFixed(1)} Ha affected</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Compensation</p>
            <IndianRupee className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">
            {formatINR(myParcels.reduce((s, p) => s + p.compensationAmount, 0))}
          </p>
          <p className="text-xs text-muted-foreground">Total assessed</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">My Objections</p>
            <FileWarning className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{MOCK_OBJECTIONS.length}</p>
          <p className="text-xs text-muted-foreground">{MOCK_OBJECTIONS.filter((o) => o.status === "under_review").length} under review</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Grievances</p>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{myGrievances.length}</p>
          <p className="text-xs text-muted-foreground">{myGrievances.filter((g) => g.status === "escalated").length} escalated</p>
        </CardContent>
      </Card>
    </div>
  );
}

function SiaKPIs() {
  const siaCases = MOCK_DOCUMENTS.filter((d) => d.type === "sia_report");
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">SIA Assignments</p>
            <Users2 className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">1</p>
          <p className="text-xs text-muted-foreground">Active SIA case</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">SIA Reports</p>
            <ScrollText className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{siaCases.length}</p>
          <p className="text-xs text-muted-foreground">{siaCases.filter((d) => d.verified).length} verified</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Pending Objections</p>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">
            {MOCK_OBJECTIONS.filter((o) => o.status === "under_review").length}
          </p>
          <p className="text-xs text-muted-foreground">Under review</p>
        </CardContent>
      </Card>
    </div>
  );
}

function RnrKPIs() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">R&R Cases</p>
            <Home className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">1</p>
          <p className="text-xs text-muted-foreground">Active R&R case</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Grievances</p>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">
            {MOCK_GRIEVANCES.filter((g) => g.category === "rr").length}
          </p>
          <p className="text-xs text-muted-foreground">R&R related</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Entitlements Pending</p>
            <CircleDot className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">0</p>
          <p className="text-xs text-muted-foreground">Mock — to be wired</p>
        </CardContent>
      </Card>
    </div>
  );
}

function TehsilKpi({ cases, overdue }: { cases: AcquisitionCase[]; overdue: AcquisitionCase[] }) {
  const tehsilCases = cases.filter((c) => c.jurisdiction.tehsil === "Haveli");
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Tehsil Cases</p>
            <Scale className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{tehsilCases.length}</p>
          <p className="text-xs text-muted-foreground">Haveli tehsil</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Overdue</p>
            <AlertTriangle className="h-4 w-4 text-[#B42318]" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#B42318]">{overdue.length}</p>
          <p className="text-xs text-muted-foreground">SLA breached</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Hearings</p>
            <ScrollText className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">
            {MOCK_OBJECTIONS.filter((o) => o.hearingDate && o.status !== "heard").length}
          </p>
          <p className="text-xs text-muted-foreground">Pending hearings</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Scrutiny</p>
            <FileWarning className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">
            {cases.filter((c) => c.stage === "scrutiny").length}
          </p>
          <p className="text-xs text-muted-foreground">Awaiting review</p>
        </CardContent>
      </Card>
    </div>
  );
}

function MinistryKPIs({ cases, overdue }: { cases: AcquisitionCase[]; overdue: AcquisitionCase[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Ministry Projects</p>
            <Building2 className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">2</p>
          <p className="text-xs text-muted-foreground">MoRTH projects</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Total Cases</p>
            <Files className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{cases.length}</p>
          <p className="text-xs text-muted-foreground">{cases.filter((c) => c.status === "active").length} active</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">SLA Breaches</p>
            <AlertTriangle className="h-4 w-4 text-[#B42318]" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#B42318]">{overdue.length}</p>
          <p className="text-xs text-muted-foreground">Nationwide</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Budget</p>
            <IndianRupee className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">
            ₹{cases.reduce((s, c) => s + (c.amountSanctionedCr ?? 0), 0).toFixed(1)} Cr
          </p>
          <p className="text-xs text-muted-foreground">Sanctioned amount</p>
        </CardContent>
      </Card>
    </div>
  );
}

function RequiringOrgKPIs() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">My Projects</p>
            <Building2 className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">2</p>
          <p className="text-xs text-muted-foreground">NHAI Pune region</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Active Cases</p>
            <Files className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">4</p>
          <p className="text-xs text-muted-foreground">Across 2 projects</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Submissions</p>
            <CircleDot className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">0</p>
          <p className="text-xs text-muted-foreground">Mock — pending actions</p>
        </CardContent>
      </Card>
    </div>
  );
}

function StateNodalKPIs({ cases, overdue }: { cases: AcquisitionCase[]; overdue: AcquisitionCase[] }) {
  const mhCases = cases.filter((c) => c.jurisdiction.state === "Maharashtra");
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">State Cases</p>
            <MapPin className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{mhCases.length}</p>
          <p className="text-xs text-muted-foreground">Maharashtra</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Districts</p>
            <Building2 className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">
            {Array.from(new Set(mhCases.map((c) => c.jurisdiction.district))).length}
          </p>
          <p className="text-xs text-muted-foreground">Active districts</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">SLA Breaches</p>
            <AlertTriangle className="h-4 w-4 text-[#B42318]" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#B42318]">{overdue.length}</p>
          <p className="text-xs text-muted-foreground">Statewide</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Total Area</p>
            <MapPin className="h-4 w-4 text-slate-500" />
          </div>
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">
            {mhCases.reduce((s, c) => s + c.areaHa, 0).toFixed(1)} Ha
          </p>
          <p className="text-xs text-muted-foreground">Under acquisition</p>
        </CardContent>
      </Card>
    </div>
  );
}
