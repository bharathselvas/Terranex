import type { RoleId } from "./rbac";

// ── Lifecycle ──
export type LifecycleStage =
  | "project_proposal"
  | "land_requirement"
  | "gis_identification"
  | "submission"
  | "scrutiny"
  | "sia"
  | "preliminary_notification"
  | "public_disclosure"
  | "objections_hearing"
  | "declaration"
  | "field_verification"
  | "compensation"
  | "award"
  | "payment"
  | "possession"
  | "r_and_r"
  | "closed";

// Spec-canonical StageMeta — mirrors src/lib/stages.ts StageMeta for ergonomic imports
// Responsible role singular in spec, plural at runtime (multi-owner stages).
export type StageMeta = {
  id: LifecycleStage;
  label: string;
  shortLabel: string;
  order: number;
  statutoryReference: string;
  /** alias of statutoryReference — some consumers use statutoryRef */
  statutoryRef: string;
  slaDays: number;
  responsibleRoleId: RoleId;
  responsibleRoles: RoleId[];
};

// ── Jurisdiction ──
export type Jurisdiction = {
  state: string;
  stateCode: string;
  district: string;
  tehsil: string;
  village: string;
};

// ── Project ──
export type ProjectCategory = "industrial" | "infrastructure" | "irrigation" | "defence" | "housing" | "mining";

export type Project = {
  id: string;
  code: string;
  title: string;
  description: string;
  category: ProjectCategory;
  requiringOrg: string;
  requiringOrgCode: string;
  ministry: string;
  state: string;
  stateCode: string;
  district: string;
  budgetCr: number;
  statusStage: LifecycleStage;
  nodalOfficer: string;
  createdAt: string;
  updatedAt: string;
};

// ── Parcel ──
export type LandType = "agricultural" | "barren" | "commercial" | "residential" | "forest" | "government" | "industrial";

export type Landowner = {
  name: string;
  khataNo: string;
  khasraNo?: string;
  aadhaarMasked: string;
  mobileMasked: string;
  category: "general" | "sc" | "st" | "obc";
};

export type Parcel = {
  id: string;
  projectId: string;
  caseId: string;
  surveyNo: string;
  village: string;
  tehsil: string;
  district: string;
  state: string;
  stateCode: string;
  areaHa: number;
  areaSqm: number;
  landType: LandType;
  owner: Landowner;
  marketValuePerHa: number;
  compensationAmount: number;
  compensationStatus: "pending" | "assessed" | "awarded" | "paid" | "disputed";
  coordinates: [number, number];
  /** current stage when parcel is viewed standalone — aligns with spec's Parcel.currentStage */
  stage: LifecycleStage;
  /** spec alias for stage */
  currentStage?: LifecycleStage;
};

// ── Evidence-gated blocker ──
// An open blocker prevents a case from advancing past its current stage. This is
// the only place in the domain model where evidence actually gates a transition
// rather than merely being displayed alongside one.
export type ParcelBlocker = {
  status: "BLOCKED";
  /** Short headline, e.g. "Possession Evidence Missing". */
  summary: string;
  /** Full sentence explaining what is missing and why it is required. */
  reason: string;
  /** Statutory gate this blocker holds, e.g. "RFCTLARR §38 — Taking Possession". */
  gate: string;
  requiredEvidence: string[];
  satisfiedEvidence: string[];
  responsibleRole: RoleId;
  responsibleRoleLabel: string;
  responsibleOfficer: string;
  raisedAt: string;
};

// ── Case ──
// Canonical name is AcquisitionCase; `Case` is the spec's shorthand alias.
export type CasePriority = "normal" | "urgent" | "critical";
export type CaseStatus = "active" | "on_hold" | "closed" | "withdrawn";

export type AcquisitionCase = {
  id: string;
  caseNo: string;
  projectId: string;
  jurisdiction: Jurisdiction;
  stage: LifecycleStage;
  status: CaseStatus;
  priority: CasePriority;
  parcelsCount: number;
  areaHa: number;
  amountSanctionedCr: number | null;
  /** spec name */
  amountSanctioned?: number | null;
  objectionsCount: number;
  documentsCount: number;
  assigneeRoleId: RoleId;
  assigneeName: string;
  /** spec alias: 0-100 derived from stage order */
  progress?: number;
  createdAt: string;
  /** spec alias for createdAt */
  created?: string;
  updatedAt: string;
  /** spec alias for updatedAt */
  updated?: string;
  slaDueAt: string | null;
  /** spec alias for slaDueAt */
  slaDue?: string | null;
  slaStatus: "on_track" | "due_soon" | "overdue" | null;
  title: string;
  /** Open evidence gate. While set, stage advancement is refused. */
  blocker?: ParcelBlocker | null;
  /** Field-officer task that would clear `blocker`, for the GIS → field bridge. */
  fieldTaskId?: string | null;
  // Optional spec stats bag — kept flat for BC compatibility
  stats?: { parcelsCount: number; objectionsCount: number; amountSanctioned: number | null };
  dates?: { created: string; updated: string; slaDue: string | null };
};
// Spec alias
export type Case = AcquisitionCase;

// ── Objection ──
export type ObjectionStatus = "filed" | "under_review" | "heard" | "allowed" | "rejected" | "withdrawn";

export type Objection = {
  id: string;
  caseId: string;
  parcelId: string | null;
  filedBy: string;
  filedByRole: RoleId;
  date: string;
  grounds: string;
  status: ObjectionStatus;
  hearingDate: string | null;
};

// ── Document ──
export type DocumentType =
  | "proposal"
  | "requisition"
  | "gis_report"
  | "sia_report"
  | "notification_11_1"
  | "public_notice"
  | "objection_record"
  | "declaration_19_1"
  | "field_report"
  | "panchnama"
  | "compensation_sheet"
  | "award_order"
  | "payment_challan"
  | "possession_certificate"
  | "rr_entitlement"
  | "other";

export type Document = {
  id: string;
  caseId: string;
  stage: LifecycleStage;
  title: string;
  type: DocumentType;
  fileName: string;
  sizeKb: number;
  uploadedBy: string;
  uploadedByRole: RoleId;
  date: string;
  verified: boolean;
  verifiedBy: string | null;
};

// ── Payment ──
export type PaymentStatus = "pending" | "sanctioned" | "disbursed" | "failed" | "on_hold";

export type Payment = {
  id: string;
  caseId: string;
  parcelId: string;
  payee: string;
  khataNo: string;
  amount: number;
  status: PaymentStatus;
  utr: string | null;
  sanctionDate: string | null;
  disbursedAt: string | null;
  mode: "pfms" | "cheque" | "dbt";
};

// ── Audit ──
export type AuditEvent = {
  id: string;
  caseId: string;
  at: string;
  actorName: string;
  actorRole: RoleId;
  action: string;
  stage: LifecycleStage | null;
  before: string | null;
  after: string | null;
  ip?: string;
};

// ── Field Evidence ──
export type FieldEvidence = {
  id: string;
  caseId: string;
  parcelId: string;
  capturedBy: string;
  capturedAt: string;
  type: "photo" | "video" | "measurement" | "panchnama";
  notes: string;
  gps: [number, number];
};

// ── Grievance ──
export type GrievanceStatus = "open" | "in_progress" | "resolved" | "escalated" | "closed";

export type Grievance = {
  id: string;
  caseId: string | null;
  filedBy: string;
  category: "compensation" | "possession" | "rr" | "procedural" | "other";
  subject: string;
  date: string;
  status: GrievanceStatus;
  assignedTo: RoleId | null;
};

// ── Notification ──
export type AppNotification = {
  id: string;
  caseId: string | null;
  title: string;
  body: string;
  type: "info" | "action_required" | "sla_warning" | "payment" | "hearing";
  createdAt: string;
  read: boolean;
  targetRoles: RoleId[];
};
