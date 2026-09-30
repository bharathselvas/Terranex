import type { WorkflowStage, StageOwner } from "./workflowTypes";
import { STAGE_GATES } from "./workflowTypes";

// ═══════════════════════════════════════════════════════════════════════
// Demo RBAC — maps roles to allowed actions per stage
// ═══════════════════════════════════════════════════════════════════════

export type DemoRole =
  | "national_admin"
  | "ministry_nodal"
  | "ro_ia"
  | "state_nodal"
  | "collector"
  | "tehsil"
  | "field_officer"
  | "sia_expert"
  | "rr_officer"
  | "finance"
  | "citizen";

export type DemoAction =
  | "view_project"
  | "edit_project"
  | "advance_stage"
  | "view_parcels"
  | "edit_parcel"
  | "verify_parcel"
  | "create_award"
  | "view_awards"
  | "initiate_payment"
  | "view_payments"
  | "retry_payment"
  | "view_audit"
  | "view_timeline"
  | "submit_objection"
  | "view_objection"
  | "decide_objection"
  | "manage_rr"
  | "view_sia"
  | "edit_sia"
  | "view_notifications"
  | "manage_documents"
  | "run_demo"
  | "reset_demo";

type PermissionEntry = {
  roles: DemoRole[];
  stages: WorkflowStage[] | "all";
};

const PERMISSIONS: PermissionEntry[] = [
  // View project — everyone
  { roles: ["national_admin", "ministry_nodal", "ro_ia", "state_nodal", "collector", "tehsil", "field_officer", "sia_expert", "rr_officer", "finance", "citizen"], stages: "all" },
  // Edit project — RO only, early stages
  { roles: ["ro_ia"], stages: ["proposal", "requirement", "gis_identification", "submission"] },
  // Advance stage — stage owner roles
  { roles: ["ro_ia"], stages: ["proposal", "requirement", "gis_identification", "submission"] },
  { roles: ["collector"], stages: ["scrutiny", "section_11", "section_19", "award"] },
  { roles: ["sia_expert"], stages: ["sia"] },
  { roles: ["field_officer"], stages: ["field_verification", "possession"] },
  { roles: ["finance"], stages: ["payment"] },
  { roles: ["rr_officer"], stages: ["r_and_r"] },
  // View parcels — most roles
  { roles: ["national_admin", "ministry_nodal", "ro_ia", "state_nodal", "collector", "tehsil", "field_officer", "sia_expert", "rr_officer", "finance"], stages: "all" },
  // Citizen sees only their own
  { roles: ["citizen"], stages: ["disclosure", "objections", "section_19", "field_verification", "compensation", "award", "payment", "possession", "r_and_r", "closed"] },
  // Verify parcel — field officer
  { roles: ["field_officer"], stages: ["field_verification"] },
  // Awards — collector + finance
  { roles: ["collector"], stages: ["compensation", "award"] },
  { roles: ["finance"], stages: ["award", "payment"] },
  // Payment — finance
  { roles: ["finance"], stages: ["payment"] },
  // Objections — citizen submits, collector decides
  { roles: ["citizen"], stages: ["objections"] },
  { roles: ["collector"], stages: ["objections"] },
  // R&R — rr_officer
  { roles: ["rr_officer"], stages: ["r_and_r"] },
  // SIA — sia_expert
  { roles: ["sia_expert"], stages: ["sia"] },
  // Audit — most roles
  { roles: ["national_admin", "ministry_nodal", "ro_ia", "state_nodal", "collector", "tehsil", "field_officer", "sia_expert", "rr_officer", "finance"], stages: "all" },
  // Demo controls — national admin + collector
  { roles: ["national_admin", "collector"], stages: "all" },
];

/**
 * Check if a role has a specific permission for a specific stage
 */
export function hasDemoPermission(
  role: DemoRole,
  action: DemoAction,
  stage: WorkflowStage,
): boolean {
  // Run demo / reset demo — only national_admin + collector
  if (action === "run_demo" || action === "reset_demo") {
    return role === "national_admin" || role === "collector";
  }

  // All roles can view project, view timeline, view notifications
  if (action === "view_project" || action === "view_timeline" || action === "view_notifications") {
    return true;
  }

  // Check permissions table
  const relevant = PERMISSIONS.filter(
    (p) =>
      p.roles.includes(role) &&
      (p.stages === "all" || p.stages.includes(stage)),
  );

  if (relevant.length === 0) return false;

  // Map action to required capability
  const actionMap: Partial<Record<DemoAction, string>> = {
    advance_stage: "advance_stage",
    view_parcels: "view_parcels",
    edit_parcel: "edit_parcel",
    verify_parcel: "verify_parcel",
    create_award: "create_award",
    view_awards: "view_awards",
    initiate_payment: "initiate_payment",
    view_payments: "view_payments",
    retry_payment: "retry_payment",
    submit_objection: "submit_objection",
    view_objection: "view_objection",
    decide_objection: "decide_objection",
    manage_rr: "manage_rr",
    view_sia: "view_sia",
    edit_sia: "edit_sia",
    manage_documents: "manage_documents",
    edit_project: "edit_project",
  };

  return relevant.some((p) => {
    const cap = actionMap[action];
    if (!cap) return true;
    return p.stages === "all" || p.stages.includes(stage);
  });
}

/**
 * Get the restriction message for an unauthorized action
 */
export function getRestrictionMessage(
  role: DemoRole,
  action: DemoAction,
  stage: WorkflowStage,
): string {
  const gate = STAGE_GATES[stage];
  const ownerLabel = gate.label;

  return `This action is restricted. The "${ownerLabel}" stage is owned by ${ownerLabel} and requires authorization from ${gate.owner}. Your current role (${role}) does not have permission for this action.`;
}

/**
 * Get all stages where a role can take actions
 */
export function getRoleActiveStages(role: DemoRole): WorkflowStage[] {
  const stages: WorkflowStage[] = [];
  const allStages: WorkflowStage[] = [
    "proposal", "requirement", "gis_identification", "submission",
    "scrutiny", "sia", "section_11", "disclosure", "objections",
    "section_19", "field_verification", "compensation", "award",
    "payment", "possession", "r_and_r", "closed",
  ];
  for (const stage of allStages) {
    if (hasDemoPermission(role, "advance_stage", stage)) {
      stages.push(stage);
    }
  }
  return stages;
}

/**
 * Map internal RoleId to DemoRole
 */
export function mapRoleIdToDemoRole(roleId: string): DemoRole {
  const map: Record<string, DemoRole> = {
    national_admin: "national_admin",
    ministry_nodal: "ministry_nodal",
    ro_ia: "ro_ia",
    state_nodal: "state_nodal",
    collector: "collector",
    tehsil: "tehsil",
    field_officer: "field_officer",
    sia_expert: "sia_expert",
    rr_officer: "rr_officer",
    finance: "finance",
    citizen: "citizen",
  };
  return map[roleId] ?? "national_admin";
}
