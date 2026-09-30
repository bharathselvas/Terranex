// Workflow types — 17-stage lifecycle with gates and transitions

export type WorkflowStage =
  | "proposal"
  | "requirement"
  | "gis_identification"
  | "submission"
  | "scrutiny"
  | "sia"
  | "section_11"
  | "disclosure"
  | "objections"
  | "section_19"
  | "field_verification"
  | "compensation"
  | "award"
  | "payment"
  | "possession"
  | "r_and_r"
  | "closed";

export type StageStatus = "completed" | "in_progress" | "available" | "locked" | "restricted";

export type StageOwner =
  | "ro_ia"
  | "cala"
  | "sia_expert"
  | "citizen"
  | "field_officer"
  | "finance"
  | "rr_officer"
  | "system"
  | "authorized_authority";

export type StageGate = {
  requires: WorkflowStage[];
  owner: StageOwner;
  label: string;
};

export const STAGE_ORDER: WorkflowStage[] = [
  "proposal", "requirement", "gis_identification", "submission",
  "scrutiny", "sia", "section_11", "disclosure", "objections",
  "section_19", "field_verification", "compensation", "award",
  "payment", "possession", "r_and_r", "closed",
];

export const STAGE_GATES: Record<WorkflowStage, StageGate> = {
  proposal: { requires: [], owner: "ro_ia", label: "Project Proposal" },
  requirement: { requires: ["proposal"], owner: "ro_ia", label: "Requirement Definition" },
  gis_identification: { requires: ["requirement"], owner: "ro_ia", label: "GIS Identification" },
  submission: { requires: ["gis_identification"], owner: "ro_ia", label: "Project Submission" },
  scrutiny: { requires: ["submission"], owner: "cala", label: "Scrutiny" },
  sia: { requires: ["scrutiny"], owner: "sia_expert", label: "Social Impact Assessment" },
  section_11: { requires: ["sia"], owner: "cala", label: "Section 11 Notification" },
  disclosure: { requires: ["section_11"], owner: "system", label: "Public Disclosure" },
  objections: { requires: ["disclosure"], owner: "citizen", label: "Objection Window" },
  section_19: { requires: ["objections"], owner: "cala", label: "Section 19 Declaration" },
  field_verification: { requires: ["section_19"], owner: "field_officer", label: "Field Verification" },
  compensation: { requires: ["field_verification"], owner: "authorized_authority", label: "Compensation" },
  award: { requires: ["compensation"], owner: "cala", label: "Award" },
  payment: { requires: ["award"], owner: "finance", label: "Payment" },
  possession: { requires: ["payment"], owner: "field_officer", label: "Possession" },
  r_and_r: { requires: ["possession"], owner: "rr_officer", label: "Rehabilitation & Resettlement" },
  closed: { requires: ["r_and_r"], owner: "system", label: "Closed" },
};

export const STAGE_LABELS: Record<WorkflowStage, string> = {
  proposal: "Proposal",
  requirement: "Requirement",
  gis_identification: "GIS Identification",
  submission: "Submission",
  scrutiny: "Scrutiny",
  sia: "SIA",
  section_11: "Section 11",
  disclosure: "Disclosure",
  objections: "Objections",
  section_19: "Section 19",
  field_verification: "Field Verification",
  compensation: "Compensation",
  award: "Award",
  payment: "Payment",
  possession: "Possession",
  r_and_r: "R&R",
  closed: "Closed",
};

export const STAGE_OWNER_LABELS: Record<StageOwner, string> = {
  ro_ia: "Requiring Organisation",
 cala: "District Collector / CALA",
  sia_expert: "SIA Expert Group",
  citizen: "Citizen / Landowner",
  field_officer: "Field Officer / VAO",
  finance: "Finance Officer",
  rr_officer: "R&R Officer",
  system: "System",
  authorized_authority: "Authorized Authority",
};

export function getStageStatus(
  stage: WorkflowStage,
  completedStages: WorkflowStage[],
  currentStage: WorkflowStage,
): StageStatus {
  if (completedStages.includes(stage)) return "completed";
  if (stage === currentStage) return "in_progress";
  const gate = STAGE_GATES[stage];
  const allReqsMet = gate.requires.every((r) => completedStages.includes(r));
  if (allReqsMet) return "available";
  return "locked";
}

export function canAdvanceStage(
  stage: WorkflowStage,
  completedStages: WorkflowStage[],
): boolean {
  const gate = STAGE_GATES[stage];
  return gate.requires.every((r) => completedStages.includes(r));
}
