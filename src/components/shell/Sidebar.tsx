import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Files,
  Map as MapIcon,
  FolderArchive,
  Bell,
  ScrollText,
  BarChart3,
  MessageSquareWarning,
  AlertTriangle,
  Search,
  Home,
  IndianRupee,
  ClipboardCheck,
  Users2,
  Shield,
  Building2,
  Users,
  GitBranch,
  Workflow,
  FileText,
  Activity,
  Wifi,
  WifiOff,
  Settings,
  LineChart,
  CheckCircle2,
  RefreshCw,
  Lock,
  Send,
  Truck,
  Sprout,
  Briefcase,
  GraduationCap,
  ArrowRightLeft,
  CreditCard,
  Wallet,
  Banknote,
  CircleDollarSign,
  BadgeCheck,
  Receipt,
  BookOpen,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSessionStore } from "@/stores/sessionStore";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const PRIMARY_NAV = [
  { to: "/app/overview", label: "Overview", icon: LayoutDashboard },
  { to: "/app/cases", label: "Cases", icon: Files },
  { to: "/app/gis", label: "GIS", icon: MapIcon },
  { to: "/app/documents", label: "Documents", icon: FolderArchive },
  { to: "/app/notifications", label: "Notifications", icon: Bell },
  { to: "/app/audit", label: "Audit", icon: ScrollText },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/grievances", label: "Grievances", icon: MessageSquareWarning },
] as const;

const MINISTRY_NAV = {
  overview: [
    { to: "/app/ministry/overview", label: "Ministry Overview", icon: LayoutDashboard },
    { to: "/app/ministry/projects", label: "MoRTH Projects", icon: Files },
    { to: "/app/ministry/work-queue", label: "Work Queue", icon: ClipboardCheck },
  ],
  monitoring: [
    { to: "/app/ministry/state-monitoring", label: "State Monitoring", icon: MapIcon },
    { to: "/app/ministry/gis", label: "Ministry GIS", icon: MapIcon },
    { to: "/app/ministry/risk", label: "Risk & Delays", icon: AlertTriangle },
    { to: "/app/ministry/compensation", label: "Compensation", icon: IndianRupee },
    { to: "/app/ministry/possession", label: "Possession", icon: MapIcon },
    { to: "/app/ministry/rnr", label: "R&R Monitor", icon: Users },
  ],
  governance: [
    { to: "/app/ministry/organizations", label: "Organizations", icon: Building2 },
    { to: "/app/ministry/stakeholders", label: "Stakeholders", icon: Users },
    { to: "/app/ministry/requests", label: "Requests & Clarifications", icon: ScrollText },
  ],
  records: [
    { to: "/app/ministry/documents", label: "Documents", icon: FileText },
    { to: "/app/ministry/objections", label: "Objections", icon: MessageSquareWarning },
    { to: "/app/ministry/audit", label: "Audit Trail", icon: ScrollText },
  ],
  system: [
    { to: "/app/ministry/reports", label: "Reports & MIS", icon: LineChart },
    { to: "/app/ministry/notifications", label: "Notifications", icon: Bell },
    { to: "/app/ministry/profile", label: "Ministry Profile", icon: Settings },
  ],
};

const RO_NAV = {
  workspace: [
    { to: "/app/ro/dashboard", label: "Project Dashboard", icon: LayoutDashboard },
    { to: "/app/ro/projects", label: "My Projects", icon: Files },
    { to: "/app/ro/work-queue", label: "My Work Queue", icon: ClipboardCheck },
  ],
  creation: [
    { to: "/app/ro/create", label: "Create Project", icon: FileText },
  ],
  monitoring: [
    { to: "/app/ro/progress", label: "Acquisition Progress", icon: BarChart3 },
    { to: "/app/ro/gis", label: "Project GIS", icon: MapIcon },
    { to: "/app/ro/risk", label: "Risk & Delays", icon: AlertTriangle },
  ],
  coordination: [
    { to: "/app/ro/requests", label: "Authority Requests", icon: ScrollText },
    { to: "/app/ro/objections", label: "Objections & Grievances", icon: MessageSquareWarning },
  ],
  records: [
    { to: "/app/ro/documents", label: "Documents", icon: FileText },
    { to: "/app/ro/audit", label: "Audit Trail", icon: ScrollText },
  ],
  outcomes: [
    { to: "/app/ro/compensation", label: "Compensation", icon: IndianRupee },
    { to: "/app/ro/possession", label: "Possession", icon: MapIcon },
    { to: "/app/ro/rnr", label: "R&R", icon: Users },
  ],
  reports: [
    { to: "/app/ro/reports", label: "Project Reports", icon: LineChart },
  ],
};

const STATE_NODAL_NAV = {
  workspace: [
    { to: "/app/state-nodal/overview", label: "State Overview", icon: LayoutDashboard },
    { to: "/app/state-nodal/work-queue", label: "My Work Queue", icon: ClipboardCheck },
    { to: "/app/state-nodal/projects", label: "State Projects", icon: Files },
  ],
  coordination: [
    { to: "/app/state-nodal/incoming", label: "Incoming Projects", icon: Shield },
    { to: "/app/state-nodal/routing", label: "District Routing", icon: GitBranch },
    { to: "/app/state-nodal/districts", label: "Districts", icon: Building2 },
    { to: "/app/state-nodal/departments", label: "State Departments", icon: Building2 },
    { to: "/app/state-nodal/stakeholders", label: "Stakeholders", icon: Users },
    { to: "/app/state-nodal/requests", label: "Requests & Clarifications", icon: ScrollText },
  ],
  monitoring: [
    { to: "/app/state-nodal/pipeline", label: "Acquisition Pipeline", icon: BarChart3 },
    { to: "/app/state-nodal/timeline", label: "Statutory Timeline", icon: Activity },
    { to: "/app/state-nodal/gis", label: "State GIS", icon: MapIcon },
    { to: "/app/state-nodal/risk", label: "Risk & Delays", icon: AlertTriangle },
  ],
  acquisition: [
    { to: "/app/state-nodal/sia", label: "SIA Monitoring", icon: Users },
    { to: "/app/state-nodal/notifications-monitor", label: "Notifications", icon: Bell },
    { to: "/app/state-nodal/objections", label: "Objections", icon: MessageSquareWarning },
    { to: "/app/state-nodal/compensation", label: "Compensation", icon: IndianRupee },
    { to: "/app/state-nodal/possession", label: "Possession", icon: MapIcon },
    { to: "/app/state-nodal/rnr", label: "R&R", icon: Users },
  ],
  records: [
    { to: "/app/state-nodal/documents", label: "Documents", icon: FileText },
    { to: "/app/state-nodal/audit", label: "Audit Trail", icon: ScrollText },
  ],
  reports: [
    { to: "/app/state-nodal/mis", label: "State MIS", icon: LineChart },
    { to: "/app/state-nodal/notifications", label: "Notifications", icon: Bell },
  ],
};

const COLLECTOR_NAV = {
  overview: [
    { to: "/app/collector/overview", label: "District Overview", icon: LayoutDashboard },
    { to: "/app/collector/command-centre", label: "Command Centre", icon: LayoutDashboard },
    { to: "/app/collector/work-queue", label: "Work Queue", icon: ClipboardCheck },
  ],
  acquisition: [
    { to: "/app/collector/incoming", label: "Incoming Projects", icon: Shield },
    { to: "/app/collector/pipeline", label: "Project Pipeline", icon: BarChart3 },
    { to: "/app/collector/workspace", label: "Project Workspace", icon: Files },
    { to: "/app/collector/timeline", label: "Statutory Timeline", icon: Activity },
    { to: "/app/collector/sia", label: "SIA Monitoring", icon: Users },
    { to: "/app/collector/notifications-mgmt", label: "Notification Management", icon: Bell },
    { to: "/app/collector/objections", label: "Objections & Hearings", icon: MessageSquareWarning },
    { to: "/app/collector/declarations", label: "Declarations", icon: FileText },
  ],
  field: [
    { to: "/app/collector/field-verification", label: "Field Verification", icon: ClipboardCheck },
    { to: "/app/collector/compensation", label: "Compensation", icon: IndianRupee },
    { to: "/app/collector/awards", label: "Awards", icon: FileText },
    { to: "/app/collector/payments", label: "Payments", icon: IndianRupee },
    { to: "/app/collector/possession", label: "Possession", icon: MapIcon },
    { to: "/app/collector/rnr", label: "R&R", icon: Users },
    { to: "/app/collector/grievances", label: "Grievances", icon: MessageSquareWarning },
  ],
  records: [
    { to: "/app/collector/gis", label: "District GIS", icon: MapIcon },
    { to: "/app/collector/assets", label: "Asset Valuation", icon: IndianRupee },
    { to: "/app/collector/parcels", label: "Parcel Register", icon: Files },
    { to: "/app/collector/documents", label: "Documents", icon: FileText },
    { to: "/app/collector/audit", label: "Audit Trail", icon: ScrollText },
    { to: "/app/collector/stakeholders", label: "District Stakeholders", icon: Users },
    { to: "/app/collector/tehsils", label: "Tehsil / SDO", icon: Building2 },
  ],
  reports: [
    { to: "/app/collector/reports", label: "Reports & MIS", icon: LineChart },
    { to: "/app/collector/notifications", label: "Notifications", icon: Bell },
    { to: "/app/collector/risk", label: "Risk & Delays", icon: AlertTriangle },
  ],
};

const TEHSIL_NAV = {
  overview: [
    { to: "/app/tehsil/overview", label: "Tehsil Overview", icon: LayoutDashboard },
    { to: "/app/tehsil/critical", label: "Critical Cases", icon: AlertTriangle },
    { to: "/app/tehsil/work-queue", label: "Work Queue", icon: ClipboardCheck },
  ],
  operations: [
    { to: "/app/tehsil/projects", label: "Assigned Projects", icon: Files },
    { to: "/app/tehsil/village-register", label: "Village Register", icon: Building2 },
    { to: "/app/tehsil/parcel-register", label: "Parcel Register", icon: Files },
    { to: "/app/tehsil/land-records", label: "Land Records", icon: FileText },
    { to: "/app/tehsil/discrepancy", label: "Ownership Discrepancy", icon: AlertTriangle },
  ],
  field: [
    { to: "/app/tehsil/field-officers", label: "Field Officers", icon: Users },
    { to: "/app/tehsil/field-verification", label: "Field Verification", icon: ClipboardCheck },
    { to: "/app/tehsil/gps-photo", label: "GPS / Photo Evidence", icon: MapIcon },
    { to: "/app/tehsil/village-coordination", label: "Village Coordination", icon: Workflow },
  ],
  support: [
    { to: "/app/tehsil/objection-support", label: "Objection Support", icon: MessageSquareWarning },
    { to: "/app/tehsil/compensation-support", label: "Compensation Support", icon: IndianRupee },
    { to: "/app/tehsil/possession", label: "Possession Readiness", icon: MapIcon },
    { to: "/app/tehsil/rnr", label: "R&R Field Data", icon: Users },
    { to: "/app/tehsil/district-requests", label: "District Requests", icon: ScrollText },
  ],
  monitoring: [
    { to: "/app/tehsil/gis", label: "Tehsil GIS", icon: MapIcon },
    { to: "/app/tehsil/timeline", label: "Timeline", icon: Activity },
    { to: "/app/tehsil/risk", label: "Risks & Delays", icon: AlertTriangle },
  ],
  records: [
    { to: "/app/tehsil/documents", label: "Documents", icon: FileText },
    { to: "/app/tehsil/audit", label: "Audit Trail", icon: ScrollText },
    { to: "/app/tehsil/reports", label: "Reports & MIS", icon: LineChart },
    { to: "/app/tehsil/notifications", label: "Notifications", icon: Bell },
  ],
};

const FIELD_OFFICER_NAV = {
  home: [
    { to: "/app/fo/home", label: "Field Home", icon: LayoutDashboard },
    { to: "/app/fo/tasks", label: "My Tasks", icon: ClipboardCheck },
    { to: "/app/fo/map", label: "Field Map", icon: MapIcon },
  ],
  evidence: [
    { to: "/app/fo/gallery", label: "Photo Evidence", icon: MapIcon },
    { to: "/app/fo/documents", label: "Documents", icon: FileText },
    { to: "/app/fo/observations", label: "Observations", icon: ScrollText },
  ],
  verification: [
    { to: "/app/fo/owner-verify", label: "Owner Verification", icon: Users },
    { to: "/app/fo/assets", label: "Asset Verification", icon: Home },
    { to: "/app/fo/measurement", label: "Measurement", icon: MapIcon },
  ],
  operations: [
    { to: "/app/fo/interaction", label: "Landowner Interaction", icon: Users },
    { to: "/app/fo/objection-evidence", label: "Objection Evidence", icon: MessageSquareWarning },
    { to: "/app/fo/possession", label: "Possession Visit", icon: MapIcon },
    { to: "/app/fo/rnr", label: "R&R Field Data", icon: Users },
  ],
  records: [
    { to: "/app/fo/completed", label: "Completed Work", icon: CheckCircle2 },
    { to: "/app/fo/performance", label: "Performance", icon: BarChart3 },
    { to: "/app/fo/sync", label: "Sync Centre", icon: RefreshCw },
    { to: "/app/fo/audit", label: "Audit Trail", icon: ScrollText },
    { to: "/app/fo/notifications", label: "Notifications", icon: Bell },
    { to: "/app/fo/role", label: "My Role", icon: Shield },
    { to: "/app/fo/offline", label: "Offline Mode", icon: WifiOff },
  ],
};

const SIA_NAV = {
  workspace: [
    { to: "/app/sia/dashboard", label: "SIA Dashboard", icon: LayoutDashboard },
    { to: "/app/sia/assessments", label: "My Assessments", icon: Files },
    { to: "/app/sia/work-queue", label: "Work Queue", icon: ClipboardCheck },
  ],
  assessment: [
    { to: "/app/sia/workspace/SIA-2026-0042", label: "Assigned Project", icon: Users2 },
    { to: "/app/sia/families", label: "Affected Families", icon: Users },
    { to: "/app/sia/livelihood", label: "Livelihood & Displacement", icon: Home },
    { to: "/app/sia/public-assets", label: "Public Assets", icon: Building2 },
    { to: "/app/sia/vulnerable", label: "Vulnerable Groups", icon: AlertTriangle },
  ],
  consultation: [
    { to: "/app/sia/gram-sabha", label: "Gram Sabha", icon: Users2 },
    { to: "/app/sia/public-consultation", label: "Public Consultations", icon: Users2 },
    { to: "/app/sia/stakeholder", label: "Stakeholder Consultations", icon: Users },
  ],
  evidence: [
    { to: "/app/sia/evidence", label: "Evidence Centre", icon: FolderArchive },
    { to: "/app/sia/gis-map", label: "GIS / Map", icon: MapIcon },
  ],
  reports: [
    { to: "/app/sia/findings", label: "SIA Findings", icon: ScrollText },
    { to: "/app/sia/mitigation", label: "Mitigation", icon: Shield },
    { to: "/app/sia/completeness", label: "Completeness Check", icon: CheckCircle2 },
    { to: "/app/sia/draft-report", label: "SIA Draft Report", icon: FileText },
    { to: "/app/sia/submission", label: "Submit SIA", icon: Send },
    { to: "/app/sia/clarifications", label: "Clarifications", icon: MessageSquareWarning },
  ],
  records: [
    { to: "/app/sia/version-history", label: "Version History", icon: ScrollText },
    { to: "/app/sia/audit", label: "Audit Trail", icon: ScrollText },
    { to: "/app/sia/statutory-gate", label: "Statutory Gate", icon: Lock },
    { to: "/app/sia/notifications", label: "Notifications", icon: Bell },
    { to: "/app/sia/role", label: "My Role", icon: Shield },
  ],
};

const RR_NAV = {
  workspace: [
    { to: "/app/rr/dashboard", label: "R&R Dashboard", icon: LayoutDashboard },
    { to: "/app/rr/work-queue", label: "Work Queue", icon: ClipboardCheck },
    { to: "/app/rr/cases", label: "R&R Cases", icon: Files },
    { to: "/app/rr/project-overview", label: "Project Overview", icon: BarChart3 },
    { to: "/app/rr/map", label: "R&R Map", icon: MapIcon },
  ],
  beneficiaries: [
    { to: "/app/rr/families", label: "Affected Families", icon: Users },
    { to: "/app/rr/vulnerability", label: "Vulnerability", icon: AlertTriangle },
    { to: "/app/rr/verification", label: "Verification", icon: CheckCircle2 },
  ],
  components: [
    { to: "/app/rr/housing", label: "Housing", icon: Home },
    { to: "/app/rr/subsistence", label: "Subsistence", icon: IndianRupee },
    { to: "/app/rr/transportation", label: "Transportation", icon: Truck },
    { to: "/app/rr/livelihood", label: "Livelihood", icon: Sprout },
    { to: "/app/rr/employment", label: "Employment", icon: Briefcase },
    { to: "/app/rr/skill-dev", label: "Skill Development", icon: GraduationCap },
    { to: "/app/rr/special-support", label: "Special Support", icon: Shield },
    { to: "/app/rr/components", label: "All Components", icon: Files },
  ],
  resettlement: [
    { to: "/app/rr/sites", label: "Resettlement Sites", icon: MapIcon },
    { to: "/app/rr/site-readiness", label: "Site Readiness", icon: CheckCircle2 },
    { to: "/app/rr/allocation", label: "Family Allocation", icon: Users },
  ],
  coordination: [
    { to: "/app/rr/field-coordination", label: "Field Officers", icon: Users2 },
    { to: "/app/rr/requests", label: "Requests & Clarifications", icon: MessageSquareWarning },
    { to: "/app/rr/evidence", label: "Evidence", icon: FolderArchive },
    { to: "/app/rr/grievances", label: "Grievances", icon: MessageSquareWarning },
  ],
  records: [
    { to: "/app/rr/completion", label: "Completion Check", icon: CheckCircle2 },
    { to: "/app/rr/mis", label: "R&R MIS", icon: BarChart3 },
    { to: "/app/rr/audit", label: "Audit Trail", icon: ScrollText },
    { to: "/app/rr/workflow", label: "Workflow", icon: Lock },
    { to: "/app/rr/notifications", label: "Notifications", icon: Bell },
    { to: "/app/rr/role", label: "My Role", icon: Shield },
  ],
};

const FINANCE_NAV = {
  workspace: [
    { to: "/app/finance/dashboard", label: "Finance Dashboard", icon: LayoutDashboard },
    { to: "/app/finance/work-queue", label: "Work Queue", icon: ClipboardCheck },
    { to: "/app/finance/cases", label: "Payment Cases", icon: Files },
  ],
  payments: [
    { to: "/app/finance/awards", label: "Payment-Ready Awards", icon: BadgeCheck },
    { to: "/app/finance/init", label: "Initiate Mock Payment", icon: ArrowRightLeft },
    { to: "/app/finance/pending", label: "Pending Payments", icon: Clock },
    { to: "/app/finance/initiated", label: "Initiated", icon: ArrowRightLeft },
    { to: "/app/finance/completed", label: "Completed", icon: CheckCircle2 },
    { to: "/app/finance/failed", label: "Failed / Returned", icon: AlertTriangle },
    { to: "/app/finance/pending-verification", label: "Pending Verification", icon: Shield },
  ],
  reconciliation: [
    { to: "/app/finance/reconciliation", label: "Reconciliation", icon: ArrowRightLeft },
    { to: "/app/finance/beneficiaries", label: "Beneficiaries", icon: Users },
    { to: "/app/finance/exceptions", label: "Exceptions", icon: AlertTriangle },
    { to: "/app/finance/delays", label: "Payment Delays", icon: Clock },
  ],
  monitoring: [
    { to: "/app/finance/project-payments", label: "Project Payments", icon: Files },
    { to: "/app/finance/state-payments", label: "State Payments", icon: MapIcon },
    { to: "/app/finance/district-payments", label: "District Payments", icon: Building2 },
  ],
  records: [
    { to: "/app/finance/documents", label: "Documents", icon: FileText },
    { to: "/app/finance/audit", label: "Audit Trail", icon: ScrollText },
  ],
  reports: [
    { to: "/app/finance/reports", label: "Reports & MIS", icon: LineChart },
    { to: "/app/finance/workflow", label: "Workflow", icon: Lock },
    { to: "/app/finance/role", label: "My Role", icon: Shield },
  ],
};

const ADMIN_NAV = {
  overview: [
    { to: "/app/admin/overview", label: "National Overview", icon: LayoutDashboard },
  ],
  monitoring: [
    { to: "/app/admin/monitoring", label: "Projects", icon: Files },
    { to: "/app/admin/monitoring", label: "States & UTs", icon: MapIcon },
    { to: "/app/admin/monitoring", label: "Ministries", icon: Building2 },
    { to: "/app/admin/gis", label: "National GIS", icon: MapIcon },
    { to: "/app/admin/risk", label: "Risk & Delays", icon: AlertTriangle },
  ],
  governance: [
    { to: "/app/admin/organizations", label: "Organizations", icon: Building2 },
    { to: "/app/admin/users", label: "Users & Roles", icon: Users },
    { to: "/app/admin/hierarchy", label: "Hierarchy", icon: GitBranch },
    { to: "/app/admin/workflow", label: "Workflow Config", icon: Workflow },
  ],
  records: [
    { to: "/app/admin/documents", label: "Documents", icon: FileText },
    { to: "/app/admin/audit", label: "Audit Trail", icon: ScrollText },
  ],
  system: [
    { to: "/app/admin/integrations", label: "Integrations", icon: Wifi },
    { to: "/app/admin/alerts", label: "Alerts", icon: Bell },
    { to: "/app/admin/reports", label: "Reports & MIS", icon: LineChart },
  ],
};

type Shortcut = { to: string; label: string; icon: typeof Search };

function roleShortcuts(roleId: string): Shortcut[] {
  switch (roleId) {
    case "field_officer":
      return [{ to: "/app/cases", label: "My Field Tasks", icon: ClipboardCheck }];
    case "finance_officer":
      return [];
    case "citizen":
      return [{ to: "/app/grievances", label: "My Land & Objections", icon: Home }];
    case "sia_expert":
      return [
        { to: "/app/cases", label: "SIA Assignments", icon: Users2 },
        { to: "/app/documents", label: "SIA Reports", icon: FolderArchive },
      ];
    case "rnr_officer":
      return [{ to: "/app/cases", label: "R&R Entitlements", icon: Home }];
    case "tehsil_sdo":
      return [{ to: "/app/cases", label: "Hearings & Scrutiny", icon: ScrollText }];
    case "collector_cala":
      return [{ to: "/app/collector/command-centre", label: "Command Centre", icon: ClipboardCheck }];
    case "requiring_org":
      return [{ to: "/app/cases", label: "My Projects", icon: Files }];
    default:
      return [];
  }
}

/**
 * Institutional sidebar — 260px, white, border-r.
 * One platform skin for all 11 roles; nav adapts subtly via WORKSPACE shortcuts.
 * National Admin gets a dedicated admin navigation with grouped sections.
 */
export function Sidebar() {
  const { user } = useSessionStore();
  const shortcuts = roleShortcuts(user.roleId);
  const isAdmin = user.roleId === "national_admin";
  const isMinistry = user.roleId === "ministry_nodal";
  const isRO = user.roleId === "requiring_org";
  const isStateNodal = user.roleId === "state_nodal";
  const isCollector = user.roleId === "collector_cala";
  const isTehsil = user.roleId === "tehsil_sdo";
  const isFieldOfficer = user.roleId === "field_officer";
  const isSiaExpert = user.roleId === "sia_expert";
  const isRrOfficer = user.roleId === "rnr_officer";
  const isFinanceOfficer = user.roleId === "finance_officer";

  return (
    <aside className="hidden w-[260px] shrink-0 flex-col border-r bg-white lg:flex">
      {/* Jurisdiction + role badge — top block */}
      <div className="p-3">
        <div className="rounded-md border bg-slate-50 px-3 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Jurisdiction</p>
          <p className="text-xs font-medium leading-tight text-[#0F2340]">{user.jurisdiction}</p>
          <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{user.name}</p>
          <Badge variant="secondary" className="mt-1.5 text-[11px]">
            {user.roleId.replace(/_/g, " ")}
          </Badge>
        </div>
      </div>

      <nav className="flex-1 space-y-4 overflow-auto px-2 py-2">
        {isAdmin ? (
          <>
            {/* Admin navigation — grouped sections */}
            {Object.entries(ADMIN_NAV).map(([section, items]) => (
              <div key={section}>
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground capitalize">
                  {section}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item.to + item.label}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                            isActive ? "bg-[#0F2340] text-white" : "text-slate-700 hover:bg-slate-100",
                          )
                        }
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : isMinistry ? (
          <>
            {/* Ministry navigation — grouped sections */}
            {Object.entries(MINISTRY_NAV).map(([section, items]) => (
              <div key={section}>
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground capitalize">
                  {section}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item.to + item.label}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                            isActive ? "bg-[#0F2340] text-white" : "text-slate-700 hover:bg-slate-100",
                          )
                        }
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : isRO ? (
          <>
            {/* RO/IA navigation — grouped sections */}
            {Object.entries(RO_NAV).map(([section, items]) => (
              <div key={section}>
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground capitalize">
                  {section}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item.to + item.label}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                            isActive ? "bg-[#0F2340] text-white" : "text-slate-700 hover:bg-slate-100",
                          )
                        }
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : isStateNodal ? (
          <>
            {/* State Nodal Officer navigation — grouped sections */}
            {Object.entries(STATE_NODAL_NAV).map(([section, items]) => (
              <div key={section}>
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground capitalize">
                  {section}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item.to + item.label}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                            isActive ? "bg-[#0F2340] text-white" : "text-slate-700 hover:bg-slate-100",
                          )
                        }
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : isCollector ? (
          <>
            {/* District Collector / CALA navigation — grouped sections */}
            {Object.entries(COLLECTOR_NAV).map(([section, items]) => (
              <div key={section}>
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground capitalize">
                  {section}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item.to + item.label}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                            isActive ? "bg-[#0F2340] text-white" : "text-slate-700 hover:bg-slate-100",
                          )
                        }
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : isTehsil ? (
          <>
            {Object.entries(TEHSIL_NAV).map(([section, items]) => (
              <div key={section}>
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground capitalize">
                  {section}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item.to + item.label}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                            isActive ? "bg-[#0F2340] text-white" : "text-slate-700 hover:bg-slate-100",
                          )
                        }
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : isFieldOfficer ? (
          <>
            {Object.entries(FIELD_OFFICER_NAV).map(([section, items]) => (
              <div key={section}>
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground capitalize">
                  {section}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item.to + item.label}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                            isActive ? "bg-[#0F2340] text-white" : "text-slate-700 hover:bg-slate-100",
                          )
                        }
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : isSiaExpert ? (
          <>
            {Object.entries(SIA_NAV).map(([section, items]) => (
              <div key={section}>
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground capitalize">
                  {section}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item.to + item.label}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                            isActive ? "bg-[#0F2340] text-white" : "text-slate-700 hover:bg-slate-100",
                          )
                        }
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : isRrOfficer ? (
          <>
            {Object.entries(RR_NAV).map(([section, items]) => (
              <div key={section}>
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground capitalize">
                  {section}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item.to + item.label}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                            isActive ? "bg-[#0F2340] text-white" : "text-slate-700 hover:bg-slate-100",
                          )
                        }
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : isFinanceOfficer ? (
          <>
            {Object.entries(FINANCE_NAV).map(([section, items]) => (
              <div key={section}>
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground capitalize">
                  {section}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item.to + item.label}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                            isActive ? "bg-[#0F2340] text-white" : "text-slate-700 hover:bg-slate-100",
                          )
                        }
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : (
          <>
            {/* Standard navigation for other roles */}
            <div>
              <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Primary</p>
              <ul className="space-y-0.5">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                          isActive ? "bg-[#0F2340] text-white" : "text-slate-700 hover:bg-slate-100",
                        )
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {shortcuts.length > 0 && (
              <div>
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Workspace</p>
                <ul className="space-y-0.5">
                  {shortcuts.map((s) => (
                    <li key={s.to + s.label}>
                      <NavLink
                        to={s.to}
                        className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      >
                        <s.icon className="h-4 w-4 shrink-0" />
                        {s.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <Separator />

        {/* SLA mini widget */}
        <div className="rounded-md border bg-amber-50 px-3 py-2.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
            <AlertTriangle className="h-3.5 w-3.5" /> SLA Watch
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-amber-800">
            {isAdmin
              ? "38 projects delayed · 7 critical. Monitor Risk → Delay Monitor."
              : isMinistry
                ? "7 projects delayed · 6 risk items. Monitor Risk & Delay page."
                : isRO
                  ? "3 projects at risk · 7 work items. Review Work Queue → respond to requests."
                  : isStateNodal
                    ? "5 projects delayed · 3 critical. Review Risk & Delay → route incoming projects."
                      : isCollector
                        ? "2 projects overdue · 7 objections pending. Review Command Centre → respond to objections."
                        : isTehsil
                          ? "2 projects overdue · 4 ownership issues. Review Work Queue → verify field evidence."
                            : isFieldOfficer
                              ? "1 overdue task · 5 pending. Open Tasks → complete field visits."
                              : isSiaExpert
                                ? "1 SIA due in 3 days · 2 consultations pending. Review Work Queue → complete assessments."
                                : isRrOfficer
                                  ? "2 critical grievances · 3 housing verifications pending. Review Cases → resolve issues."
                                  : isFinanceOfficer
                                    ? "2 payments failed · 3 awards ready. Review Dashboard → initiate payments."
                                    : "2 cases overdue · 3 due this week. Review Cases → filter by SLA."}
          </p>
          <Badge variant="warning" className="mt-2 text-[11px]">
            Action needed
          </Badge>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t px-3 py-3">
        <p className="text-[11px] font-medium text-muted-foreground">Gov Platform — DoLR</p>
        <p className="text-[11px] leading-snug text-muted-foreground">National platform — all roles act on shared records</p>
      </div>
    </aside>
  );
}
