import type { LifecycleStage } from "@/types/domain";
import type { RoleId } from "@/types/rbac";

export type StageMeta = {
  id: LifecycleStage;
  label: string;
  shortLabel: string;
  order: number;
  statutoryRef: string;
  /** spec alias for statutoryRef */
  statutoryReference: string;
  slaDays: number;
  responsibleRoleId: RoleId;
  responsibleRoles: RoleId[];
  group: "initiation" | "assessment" | "notification" | "adjudication" | "settlement" | "closure";
};

export const STAGES: StageMeta[] = [
  {
    id: "project_proposal",
    label: "Project Proposal",
    shortLabel: "Proposal",
    order: 1,
    statutoryRef: "RFCTLARR §4 — Preparation of SIA",
    statutoryReference: "RFCTLARR §4 — Preparation of SIA",
    slaDays: 14,
    responsibleRoleId: "requiring_org",
    responsibleRoles: ["requiring_org", "ministry_nodal"],
    group: "initiation",
  },
  {
    id: "land_requirement",
    label: "Land Requirement",
    shortLabel: "Requirement",
    order: 2,
    statutoryRef: "RFCTLARR §4(1)",
    statutoryReference: "RFCTLARR §4(1)",
    slaDays: 7,
    responsibleRoleId: "requiring_org",
    responsibleRoles: ["requiring_org", "collector_cala"],
    group: "initiation",
  },
  {
    id: "gis_identification",
    label: "GIS Land Identification",
    shortLabel: "GIS ID",
    order: 3,
    statutoryRef: "DoLR GIS Guidelines 2023",
    statutoryReference: "DoLR GIS Guidelines 2023",
    slaDays: 14,
    responsibleRoleId: "collector_cala",
    responsibleRoles: ["collector_cala", "field_officer", "tehsil_sdo"],
    group: "initiation",
  },
  {
    id: "submission",
    label: "Submission",
    shortLabel: "Submission",
    order: 4,
    statutoryRef: "RFCTLARR §6 — Submission to Collector",
    statutoryReference: "RFCTLARR §6 — Submission to Collector",
    slaDays: 7,
    responsibleRoleId: "requiring_org",
    responsibleRoles: ["requiring_org", "collector_cala"],
    group: "initiation",
  },
  {
    id: "scrutiny",
    label: "Scrutiny",
    shortLabel: "Scrutiny",
    order: 5,
    statutoryRef: "RFCTLARR §7 — Scrutiny by Collector",
    statutoryReference: "RFCTLARR §7 — Scrutiny by Collector",
    slaDays: 21,
    responsibleRoleId: "collector_cala",
    responsibleRoles: ["collector_cala", "tehsil_sdo", "state_nodal"],
    group: "assessment",
  },
  {
    id: "sia",
    label: "Social Impact Assessment",
    shortLabel: "SIA",
    order: 6,
    statutoryRef: "RFCTLARR Ch. II (§4–§9)",
    statutoryReference: "RFCTLARR Ch. II (§4–§9)",
    slaDays: 180,
    responsibleRoleId: "sia_expert",
    responsibleRoles: ["sia_expert", "collector_cala", "state_nodal"],
    group: "assessment",
  },
  {
    id: "preliminary_notification",
    label: "Preliminary Notification",
    shortLabel: "11(1) Notice",
    order: 7,
    statutoryRef: "RFCTLARR §11 — Preliminary Notification",
    statutoryReference: "RFCTLARR §11 — Preliminary Notification",
    slaDays: 14,
    responsibleRoleId: "collector_cala",
    responsibleRoles: ["collector_cala", "state_nodal"],
    group: "notification",
  },
  {
    id: "public_disclosure",
    label: "Public Disclosure",
    shortLabel: "Disclosure",
    order: 8,
    statutoryRef: "RFCTLARR §11(3) — Public Display",
    statutoryReference: "RFCTLARR §11(3) — Public Display",
    slaDays: 30,
    responsibleRoleId: "collector_cala",
    responsibleRoles: ["collector_cala", "tehsil_sdo", "field_officer"],
    group: "notification",
  },
  {
    id: "objections_hearing",
    label: "Objections & Hearing",
    shortLabel: "Objections",
    order: 9,
    statutoryRef: "RFCTLARR §15 — Hearing of Objections",
    statutoryReference: "RFCTLARR §15 — Hearing of Objections",
    slaDays: 60,
    responsibleRoleId: "collector_cala",
    responsibleRoles: ["collector_cala", "tehsil_sdo"],
    group: "adjudication",
  },
  {
    id: "declaration",
    label: "Declaration",
    shortLabel: "19(1) Decl.",
    order: 10,
    statutoryRef: "RFCTLARR §19 — Declaration",
    statutoryReference: "RFCTLARR §19 — Declaration",
    slaDays: 30,
    responsibleRoleId: "collector_cala",
    responsibleRoles: ["collector_cala", "state_nodal", "national_admin"],
    group: "adjudication",
  },
  {
    id: "field_verification",
    label: "Field Verification",
    shortLabel: "Field Verify",
    order: 11,
    statutoryRef: "RFCTLARR §20 — Survey & Measurement",
    statutoryReference: "RFCTLARR §20 — Survey & Measurement",
    slaDays: 30,
    responsibleRoleId: "field_officer",
    responsibleRoles: ["field_officer", "tehsil_sdo", "collector_cala"],
    group: "adjudication",
  },
  {
    id: "compensation",
    label: "Compensation Assessment",
    shortLabel: "Compensation",
    order: 12,
    statutoryRef: "RFCTLARR §26–§30 — Determination of Compensation",
    statutoryReference: "RFCTLARR §26–§30 — Determination of Compensation",
    slaDays: 45,
    responsibleRoleId: "collector_cala",
    responsibleRoles: ["collector_cala", "finance_officer"],
    group: "settlement",
  },
  {
    id: "award",
    label: "Award",
    shortLabel: "Award",
    order: 13,
    statutoryRef: "RFCTLARR §23 / §37 — Award Enquiry",
    statutoryReference: "RFCTLARR §23 / §37 — Award Enquiry",
    slaDays: 30,
    responsibleRoleId: "collector_cala",
    responsibleRoles: ["collector_cala", "finance_officer"],
    group: "settlement",
  },
  {
    id: "payment",
    label: "Payment",
    shortLabel: "Payment",
    order: 14,
    statutoryRef: "RFCTLARR §31–§33 — Payment & Possession",
    statutoryReference: "RFCTLARR §31–§33 — Payment & Possession",
    slaDays: 30,
    responsibleRoleId: "finance_officer",
    responsibleRoles: ["finance_officer", "collector_cala"],
    group: "settlement",
  },
  {
    id: "possession",
    label: "Possession",
    shortLabel: "Possession",
    order: 15,
    statutoryRef: "RFCTLARR §38 — Taking Possession",
    statutoryReference: "RFCTLARR §38 — Taking Possession",
    slaDays: 14,
    responsibleRoleId: "collector_cala",
    responsibleRoles: ["collector_cala", "tehsil_sdo", "field_officer"],
    group: "settlement",
  },
  {
    id: "r_and_r",
    label: "Rehabilitation & Resettlement",
    shortLabel: "R&R",
    order: 16,
    statutoryRef: "RFCTLARR Ch. V–VI — R&R Scheme",
    statutoryReference: "RFCTLARR Ch. V–VI — R&R Scheme",
    slaDays: 90,
    responsibleRoleId: "rnr_officer",
    responsibleRoles: ["rnr_officer", "collector_cala", "state_nodal"],
    group: "closure",
  },
  {
    id: "closed",
    label: "Closed",
    shortLabel: "Closed",
    order: 17,
    statutoryRef: "RFCTLARR §49 — Completion",
    statutoryReference: "RFCTLARR §49 — Completion",
    slaDays: 0,
    responsibleRoleId: "collector_cala",
    responsibleRoles: ["collector_cala", "national_admin"],
    group: "closure",
  },
];

export const STAGE_ORDER: Record<LifecycleStage, number> = Object.fromEntries(
  STAGES.map((s) => [s.id, s.order]),
) as Record<LifecycleStage, number>;

export const STAGE_BY_ID: Record<LifecycleStage, StageMeta> = Object.fromEntries(
  STAGES.map((s) => [s.id, s]),
) as Record<LifecycleStage, StageMeta>;

export function nextStage(current: LifecycleStage): LifecycleStage | null {
  const idx = STAGES.findIndex((s) => s.id === current);
  if (idx === -1 || idx === STAGES.length - 1) return null;
  return STAGES[idx + 1].id;
}

export function prevStage(current: LifecycleStage): LifecycleStage | null {
  const idx = STAGES.findIndex((s) => s.id === current);
  if (idx <= 0) return null;
  return STAGES[idx - 1].id;
}

export function stageProgress(stage: LifecycleStage): number {
  const meta = STAGE_BY_ID[stage];
  if (!meta) return 0;
  return Math.round((meta.order / STAGES.length) * 100);
}
