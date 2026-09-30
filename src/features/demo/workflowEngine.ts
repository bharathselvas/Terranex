import type { WorkflowStage, StageOwner } from "./workflowTypes";
import { STAGE_GATES, STAGE_ORDER } from "./workflowTypes";

// ═══════════════════════════════════════════════════════════════════════
// Workflow Engine — stage gates, transitions, and role permissions
// ═══════════════════════════════════════════════════════════════════════

export type TransitionResult =
  | { ok: true }
  | { ok: false; reason: string };

/**
 * Can the given role advance this parcel/project from the given stage?
 */
export function canRoleAdvance(
  stage: WorkflowStage,
  owner: StageOwner,
  completedStages: WorkflowStage[],
): TransitionResult {
  const gate = STAGE_GATES[stage];

  // Check prerequisites
  const missing = gate.requires.filter((r) => !completedStages.includes(r));
  if (missing.length > 0) {
    return {
      ok: false,
      reason: `Prerequisites not met: ${missing.join(", ")}`,
    };
  }

  // Check ownership
  if (gate.owner !== "system" && gate.owner !== owner) {
    return {
      ok: false,
      reason: `This stage is owned by ${STAGE_GATES[stage].label} owner (${gate.owner}). Your role (${owner}) is not authorized.`,
    };
  }

  return { ok: true };
}

/**
 * Get all stages that can be advanced right now
 */
export function getAdvancableStages(
  completedStages: WorkflowStage[],
): WorkflowStage[] {
  return STAGE_ORDER.filter((stage) => {
    const gate = STAGE_GATES[stage];
    return gate.requires.every((r) => completedStages.includes(r)) && !completedStages.includes(stage);
  });
}

/**
 * Get the next available stage after completing a given stage
 */
export function getNextStage(
  currentStage: WorkflowStage,
): WorkflowStage | null {
  const idx = STAGE_ORDER.indexOf(currentStage);
  if (idx < 0 || idx >= STAGE_ORDER.length - 1) return null;
  return STAGE_ORDER[idx + 1];
}

/**
 * Get the previous stage
 */
export function getPreviousStage(
  currentStage: WorkflowStage,
): WorkflowStage | null {
  const idx = STAGE_ORDER.indexOf(currentStage);
  if (idx <= 0) return null;
  return STAGE_ORDER[idx - 1];
}

/**
 * Get progress percentage through the lifecycle
 */
export function getLifecycleProgress(completedStages: WorkflowStage[]): number {
  return Math.round((completedStages.length / STAGE_ORDER.length) * 100);
}

/**
 * Get stages grouped by phase (for the stepper)
 */
export function getStagePhase(stage: WorkflowStage): number {
  if (stage === "proposal" || stage === "requirement" || stage === "gis_identification" || stage === "submission") return 0;
  if (stage === "scrutiny" || stage === "sia") return 1;
  if (stage === "section_11" || stage === "disclosure" || stage === "objections" || stage === "section_19") return 2;
  if (stage === "field_verification" || stage === "compensation" || stage === "award") return 3;
  if (stage === "payment" || stage === "possession") return 4;
  if (stage === "r_and_r" || stage === "closed") return 5;
  return 0;
}

export const PHASE_LABELS = [
  "Initiation",
  "Assessment",
  "Notification & Objections",
  "Verification & Award",
  "Payment & Possession",
  "Closure",
];

/**
 * Get the transition message for advancing to a given stage
 */
export function getTransitionMessage(fromStage: WorkflowStage, toStage: WorkflowStage): string {
  const fromGate = STAGE_GATES[fromStage];
  const toGate = STAGE_GATES[toStage];
  return `${fromGate.label} → ${toGate.label}`;
}

/**
 * Map RoleId to StageOwner for RBAC enforcement
 */
export function roleIdToStageOwner(roleId: string): StageOwner | null {
  const map: Record<string, StageOwner> = {
    ro_ia: "ro_ia",
    ministry: "ro_ia",
    state_nodal: "ro_ia",
    collector: "cala",
    field_officer: "field_officer",
    sia_expert: "sia_expert",
    rr_officer: "rr_officer",
    finance: "finance",
  };
  return map[roleId] ?? null;
}

/**
 * Get role restrictions for a given stage — which roles can advance it
 */
export function getAuthorizedRolesForStage(stage: WorkflowStage): StageOwner[] {
  const gate = STAGE_GATES[stage];
  if (gate.owner === "system") return ["ro_ia", "cala", "field_officer", "sia_expert", "rr_officer", "finance"];
  return [gate.owner];
}

/**
 * Format a WorkflowStage for display
 */
export function formatStageForDisplay(stage: WorkflowStage): string {
  const labels: Record<WorkflowStage, string> = {
    proposal: "Proposal",
    requirement: "Requirement",
    gis_identification: "GIS Identification",
    submission: "Submission",
    scrutiny: "Scrutiny",
    sia: "Social Impact Assessment",
    section_11: "Section 11 Notification",
    disclosure: "Public Disclosure",
    objections: "Objection Window",
    section_19: "Section 19 Declaration",
    field_verification: "Field Verification",
    compensation: "Compensation",
    award: "Award",
    payment: "Payment",
    possession: "Possession",
    r_and_r: "Rehabilitation & Resettlement",
    closed: "Closed",
  };
  return labels[stage];
}
