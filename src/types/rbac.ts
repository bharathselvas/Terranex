import type { AcquisitionCase, LifecycleStage } from "./domain";

export type RoleId =
  | "national_admin"
  | "ministry_nodal"
  | "requiring_org"
  | "state_nodal"
  | "collector_cala"
  | "tehsil_sdo"
  | "field_officer"
  | "sia_expert"
  | "rnr_officer"
  | "finance_officer"
  | "citizen";

export type JurisdictionScope =
  | "national"
  | "ministry"
  | "state"
  | "district"
  | "tehsil"
  | "village"
  | "project";

export type RoleMeta = {
  id: RoleId;
  label: string;
  shortLabel: string;
  description: string;
  level: number;
  scope: JurisdictionScope;
  color: string;
  icon: string;
  /** spec name */
  iconName: string;
  jurisdictionHint: string;
};

export type Role = RoleMeta;

// Keep order = hierarchy (1 = apex)
export const ROLES: RoleMeta[] = [
  {
    id: "national_admin",
    label: "National Admin / DoLR",
    shortLabel: "DoLR Admin",
    description: "Department of Land Resources — national oversight & audit",
    level: 1,
    scope: "national",
    color: "#0F2340",
    icon: "Shield",
    iconName: "Shield",
    jurisdictionHint: "All States & UTs",
  },
  {
    id: "ministry_nodal",
    label: "Ministry Nodal Officer",
    shortLabel: "Ministry Nodal",
    description: "Sponsoring ministry — sanctions & monitors projects",
    level: 2,
    scope: "ministry",
    color: "#1A3560",
    icon: "Building2",
    iconName: "Building2",
    jurisdictionHint: "MoRTH / MoD / Central Ministries",
  },
  {
    id: "requiring_org",
    label: "Requiring Organization",
    shortLabel: "Requiring Org",
    description: "Project proponent — NHAI, Railways, state PWD, etc.",
    level: 3,
    scope: "project",
    color: "#243E6B",
    icon: "Briefcase",
    iconName: "Briefcase",
    jurisdictionHint: "Own projects only",
  },
  {
    id: "state_nodal",
    label: "State Nodal Officer",
    shortLabel: "State Nodal",
    description: "State revenue department — coordinates all districts",
    level: 4,
    scope: "state",
    color: "#2E4A7A",
    icon: "MapPinned",
    iconName: "MapPinned",
    jurisdictionHint: "Maharashtra / MP / Odisha",
  },
  {
    id: "collector_cala",
    label: "District Collector / CALA",
    shortLabel: "Collector / CALA",
    description: "Competent Authority — statutory decision-maker for acquisition",
    level: 5,
    scope: "district",
    color: "#334E83",
    icon: "Scale",
    iconName: "Scale",
    jurisdictionHint: "District jurisdiction",
  },
  {
    id: "tehsil_sdo",
    label: "Tehsil / Sub-Divisional Officer",
    shortLabel: "Tehsil / SDO",
    description: "Sub-division & tehsil-level scrutiny and hearings",
    level: 6,
    scope: "tehsil",
    color: "#4A6FA5",
    icon: "Landmark",
    iconName: "Landmark",
    jurisdictionHint: "Tehsil jurisdiction",
  },
  {
    id: "field_officer",
    label: "Field Officer / VAO",
    shortLabel: "Field Officer",
    description: "Village-level verification, measurement, evidence capture",
    level: 7,
    scope: "village",
    color: "#5B7FB8",
    icon: "ClipboardCheck",
    iconName: "ClipboardCheck",
    jurisdictionHint: "Village / circle",
  },
  {
    id: "sia_expert",
    label: "SIA Expert Group",
    shortLabel: "SIA Expert",
    description: "Independent social impact assessment team",
    level: 8,
    scope: "district",
    color: "#6B5B95",
    icon: "Users2",
    iconName: "Users2",
    jurisdictionHint: "Assigned SIA cases",
  },
  {
    id: "rnr_officer",
    label: "R&R Officer",
    shortLabel: "R&R Officer",
    description: "Rehabilitation & Resettlement entitlements",
    level: 9,
    scope: "district",
    color: "#2A9D8F",
    icon: "Home",
    iconName: "Home",
    jurisdictionHint: "R&R colonies & entitlements",
  },
  {
    id: "finance_officer",
    label: "Finance / Payment Officer",
    shortLabel: "Finance Officer",
    description: "Compensation computation, sanction & disbursement",
    level: 10,
    scope: "district",
    color: "#0F7A5A",
    icon: "IndianRupee",
    iconName: "IndianRupee",
    jurisdictionHint: "Payment queue",
  },
  {
    id: "citizen",
    label: "Citizen / Landowner",
    shortLabel: "Citizen",
    description: "Affected landholder — notices, objections, compensation tracking",
    level: 11,
    scope: "village",
    color: "#9A6B00",
    icon: "User",
    iconName: "User",
    jurisdictionHint: "Own holdings only",
  },
];

export const ROLE_BY_ID: Record<RoleId, RoleMeta> = Object.fromEntries(
  ROLES.map((r) => [r.id, r]),
) as Record<RoleId, RoleMeta>;

export function roleLabel(id: RoleId): string {
  return ROLE_BY_ID[id]?.label ?? id;
}

export function isAdminRole(id: RoleId): boolean {
  return id === "national_admin" || id === "state_nodal";
}

// ── Spec helpers: canAccess + jurisdictionFilter ──

const STAGE_ROLE_MAP: Record<string, string[]> = {
  project_proposal: ["requiring_org", "ministry_nodal"],
  land_requirement: ["requiring_org", "collector_cala"],
  gis_identification: ["collector_cala", "field_officer", "tehsil_sdo"],
  submission: ["requiring_org", "collector_cala"],
  scrutiny: ["collector_cala", "tehsil_sdo", "state_nodal"],
  sia: ["sia_expert", "collector_cala", "state_nodal"],
  preliminary_notification: ["collector_cala", "state_nodal"],
  public_disclosure: ["collector_cala", "tehsil_sdo", "field_officer"],
  objections_hearing: ["collector_cala", "tehsil_sdo"],
  declaration: ["collector_cala", "state_nodal", "national_admin"],
  field_verification: ["field_officer", "tehsil_sdo", "collector_cala"],
  compensation: ["collector_cala", "finance_officer"],
  award: ["collector_cala", "finance_officer"],
  payment: ["finance_officer", "collector_cala"],
  possession: ["collector_cala", "tehsil_sdo", "field_officer"],
  r_and_r: ["rnr_officer", "collector_cala", "state_nodal"],
  closed: ["collector_cala", "national_admin"],
};

function stageRoles(stage: LifecycleStage): string[] {
  return STAGE_ROLE_MAP[stage] ?? [];
}

/**
 * Whether a role may act on / view a given stage.
 */
export function canAccess(roleId: RoleId, stage: LifecycleStage): boolean {
  if (roleId === "national_admin" || roleId === "state_nodal") return true;
  if (roleId === "citizen") {
    return (
      stage === "preliminary_notification" ||
      stage === "public_disclosure" ||
      stage === "objections_hearing" ||
      stage === "compensation" ||
      stage === "award" ||
      stage === "payment" ||
      stage === "possession" ||
      stage === "r_and_r" ||
      stage === "closed"
    );
  }
  const roles = stageRoles(stage);
  if (roles.length === 0) return true;
  return (roles as string[]).includes(roleId);
}

export type JurisdictionFilterResult = { visible: boolean; reason: string };

/**
 * Whether a case is visible under a role's jurisdiction scope.
 */
export function jurisdictionFilter(roleId: RoleId, c: AcquisitionCase): JurisdictionFilterResult {
  const meta = ROLE_BY_ID[roleId];
  if (!meta) return { visible: true, reason: "unknown role — permissive" };
  switch (meta.scope) {
    case "national":
    case "ministry":
      return { visible: true, reason: `${meta.scope} scope — all cases visible` };
    case "state":
      return { visible: true, reason: "state scope — all districts in state visible (mock: all shown)" };
    case "district": {
      const expected =
        roleId === "collector_cala"
          ? "Pune"
          : roleId === "sia_expert"
            ? "Khordha"
            : roleId === "rnr_officer" || roleId === "finance_officer"
              ? "Pune"
              : null;
      if (!expected) return { visible: true, reason: "district scope — permissive in mock" };
      const visible = c.jurisdiction.district === expected;
      return { visible, reason: visible ? `district match: ${expected}` : `outside district ${expected}` };
    }
    case "tehsil": {
      const visible = c.jurisdiction.tehsil === "Haveli";
      return { visible, reason: visible ? "tehsil match: Haveli" : "outside tehsil Haveli" };
    }
    case "village":
    case "project":
      return { visible: true, reason: `${meta.scope} scope — filtered to related holdings in UI (mock: all shown)` };
    default:
      return { visible: true, reason: "permissive" };
  }
}
