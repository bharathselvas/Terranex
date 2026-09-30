// Field Officer data types and mock data

// ── Field Task ──
export type FieldTaskStatus =
  | "assigned"
  | "accepted"
  | "in_progress"
  | "draft_saved"
  | "submitted"
  | "needs_reverification"
  | "completed"
  | "overdue";

export type FieldTaskType =
  | "ownership_verification"
  | "asset_verification"
  | "field_verification"
  | "possession_evidence"
  | "rr_enumeration"
  | "objection_evidence";

export type FieldTask = {
  id: string;
  projectId: string;
  projectName: string;
  parcelId: string;
  village: string;
  tehsil: string;
  district: string;
  taskType: FieldTaskType;
  assignedBy: string;
  assignedByRole: string;
  dueDate: string;
  status: FieldTaskStatus;
  priority: "critical" | "high" | "medium" | "low";
  distanceKm: number;
  evidenceCount: number;
  evidenceRequired: number;
  gpsCaptured: boolean;
  photosCount: number;
  ownerVerified: boolean;
  assetsEnumerated: boolean;
  observationsCount: number;
  documentsCount: number;
  draftSaved: boolean;
  submittedAt?: string;
};

// ── GPS Record ──
export type GpsRecord = {
  id: string;
  parcelId: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  capturedAt: string;
  officer: string;
  officerId: string;
  status: "captured" | "verified" | "synced";
};

// ── Photo Evidence ──
export type PhotoCategory =
  | "parcel_overview"
  | "boundary"
  | "structure"
  | "tree"
  | "well"
  | "occupancy"
  | "document"
  | "possession"
  | "other";

export type PhotoEvidence = {
  id: string;
  parcelId: string;
  category: PhotoCategory;
  gpsLat: number;
  gpsLng: number;
  capturedAt: string;
  officer: string;
  officerId: string;
  status: "draft" | "captured" | "pending_sync" | "synced" | "submitted";
  fileSize: string;
};

// ── Document Record ──
export type DocumentType =
  | "land_record"
  | "ownership_proof"
  | "identity"
  | "mutation_record"
  | "tax_record"
  | "other";

export type DocumentRecord = {
  id: string;
  parcelId: string;
  documentType: DocumentType;
  title: string;
  capturedBy: string;
  capturedAt: string;
  status: "draft" | "captured" | "pending_sync" | "synced" | "submitted";
  fileSize: string;
};

// ── Owner Verification ──
export type OwnerVerification = {
  id: string;
  parcelId: string;
  ulpin: string;
  surveyNumber: string;
  recordedOwner: string;
  recordedArea: number;
  classification: string;
  claimedOwner: string;
  observedArea: number;
  occupancy: string;
  match: boolean;
  remarks: string;
  status: "pending" | "matched" | "mismatch" | "submitted";
};

// ── Asset Record ──
export type AssetType = "tree" | "structure" | "well" | "other";

export type AssetRecord = {
  id: string;
  parcelId: string;
  assetType: AssetType;
  subType: string;
  quantity: number;
  condition: string;
  dimensions?: string;
  remarks: string;
  photosCount: number;
  gpsVerified: boolean;
};

// ── Measurement ──
export type Measurement = {
  id: string;
  parcelId: string;
  recordedArea: number;
  observedArea: number;
  unit: string;
  boundaryNotes: string;
  surveyNotes: string;
  discrepancy: boolean;
  difference: number;
};

// ── Field Observation ──
export type ObservationCategory =
  | "boundary"
  | "ownership"
  | "cultivation"
  | "structure"
  | "access"
  | "occupancy"
  | "environmental"
  | "other";

export type FieldObservation = {
  id: string;
  parcelId: string;
  category: ObservationCategory;
  text: string;
  timestamp: string;
  officer: string;
  relatedEvidenceIds: string[];
};

// ── Landowner Interaction ──
export type InteractionResult =
  | "owner_present"
  | "owner_not_present"
  | "representative_present"
  | "unable_to_contact"
  | "refused_interaction";

export type LandownerInteraction = {
  id: string;
  parcelId: string;
  landowner: string;
  visitDate: string;
  officer: string;
  result: InteractionResult;
  remarks: string;
};

// ── Objection Evidence ──
export type ObjectionEvidence = {
  id: string;
  objectionId: string;
  parcelId: string;
  category: string;
  issue: string;
  landownerStatement: string;
  requiredEvidence: string[];
  collectedEvidence: string[];
  status: "pending" | "evidence_collected" | "submitted";
  decisionAuthority: string;
};

// ── Possession Evidence ──
export type PossessionPrereq = {
  label: string;
  status: "completed" | "pending" | "blocked";
};

export type PossessionEvidence = {
  id: string;
  parcelId: string;
  projectName: string;
  village: string;
  landowner: string;
  date: string;
  prerequisites: PossessionPrereq[];
  photosCount: number;
  gpsCaptured: boolean;
  boundaryEvidence: boolean;
  officerRemarks: string;
  status: "not_ready" | "ready" | "evidence_collected" | "submitted";
};

// ── R&R Field Data ──
export type RnrFieldEntry = {
  id: string;
  familyId: string;
  parcelId: string;
  village: string;
  householdSize: number;
  housing: string;
  livelihood: string;
  transport: string;
  employment: string;
  skillTraining: string;
  specialSupport: string;
  status: "not_started" | "in_progress" | "collected" | "submitted" | "needs_review";
};

// ── Field Report ──
export type FieldReportStatus = "draft" | "submitted" | "under_review" | "accepted" | "needs_reverification";

export type FieldReport = {
  id: string;
  parcelId: string;
  projectName: string;
  village: string;
  officer: string;
  visitDate: string;
  taskType: FieldTaskType;
  status: FieldReportStatus;
  sections: string[];
  submittedAt?: string;
  reviewedBy?: string;
  reviewRemarks?: string;
};

// ── Reverification Request ──
export type ReverificationRequest = {
  id: string;
  parcelId: string;
  requestedBy: string;
  requestedByRole: string;
  reason: string;
  requiredItems: string[];
  dueDate: string;
  status: "pending" | "in_progress" | "resubmitted";
};

// ── Sync Item ──
export type SyncItem = {
  id: string;
  parcelId: string;
  category: "photo" | "field_report" | "gps_record" | "verification" | "possession_evidence" | "document";
  description: string;
  fileSize: string;
  status: "queued" | "uploading" | "synced" | "failed";
  errorMessage?: string;
  timestamp: string;
};

// ── Notification ──
export type FoNotification = {
  id: string;
  title: string;
  message: string;
  priority: "critical" | "high" | "medium" | "low";
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionTaskId?: string;
};

// ── Audit Entry ──
export type FoAuditEntry = {
  id: string;
  timestamp: string;
  action: string;
  evidence?: string;
  parcelId: string;
};

// ── Completed Work ──
export type CompletedWork = {
  id: string;
  projectId: string;
  projectName: string;
  parcelId: string;
  taskType: FieldTaskType;
  submittedAt: string;
  reviewedBy?: string;
  status: "submitted" | "accepted" | "needs_correction";
};

// ── Performance ──
export type FoPerformance = {
  tasksCompleted: number;
  tasksPending: number;
  tasksOverdue: number;
  evidenceSubmitted: number;
  reverificationRate: number;
  lastSync: string;
};

// ═══════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════

export const FIELD_TASKS: FieldTask[] = [
  // ── Terranex golden-path task ────────────────────────────────────────────
  // Synthetic. Target of the GIS → case → field-task bridge on /app/gis:
  // parcel 1042/3A (CASE-402) is BLOCKED on missing possession evidence, and
  // this is the task that would clear it. See src/features/gis/geoData.ts.
  {
    id: "ft-402", projectId: "PRJ-NH47-P03", projectName: "NH-47 Expansion — Package 03",
    parcelId: "PAR-1042-3A", village: "Synthetic Village", tehsil: "Synthetic Taluk", district: "Synthetic District",
    taskType: "possession_evidence", assignedBy: "Collector / CALA", assignedByRole: "Collector / CALA",
    dueDate: "2026-09-24T18:00:00", status: "assigned", priority: "critical", distanceKm: 1.4,
    evidenceCount: 2, evidenceRequired: 6, gpsCaptured: false, photosCount: 0,
    ownerVerified: true, assetsEnumerated: false, observationsCount: 0, documentsCount: 2,
    draftSaved: false,
  },
  {
    id: "ft-001", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion",
    parcelId: "MH-PN-004821", village: "Hinjewadi", tehsil: "Haveli", district: "Pune",
    taskType: "ownership_verification", assignedBy: "Smt. Kavita Patil", assignedByRole: "SDO / Tehsildar",
    dueDate: "2026-09-10T18:00:00", status: "in_progress", priority: "high", distanceKm: 3.2,
    evidenceCount: 4, evidenceRequired: 8, gpsCaptured: true, photosCount: 3,
    ownerVerified: false, assetsEnumerated: false, observationsCount: 1, documentsCount: 1,
    draftSaved: true,
  },
  {
    id: "ft-002", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion",
    parcelId: "MH-PN-005001", village: "Hinjewadi", tehsil: "Haveli", district: "Pune",
    taskType: "asset_verification", assignedBy: "Smt. Kavita Patil", assignedByRole: "SDO / Tehsildar",
    dueDate: "2026-09-10T18:00:00", status: "assigned", priority: "high", distanceKm: 3.5,
    evidenceCount: 0, evidenceRequired: 6, gpsCaptured: false, photosCount: 0,
    ownerVerified: false, assetsEnumerated: false, observationsCount: 0, documentsCount: 0,
    draftSaved: false,
  },
  {
    id: "ft-003", projectId: "proj-002", projectName: "Pune Ring Road Phase II",
    parcelId: "MH-PN-009501", village: "Wakad", tehsil: "Haveli", district: "Pune",
    taskType: "field_verification", assignedBy: "Smt. Kavita Patil", assignedByRole: "SDO / Tehsildar",
    dueDate: "2026-09-09T18:00:00", status: "overdue", priority: "critical", distanceKm: 8.1,
    evidenceCount: 2, evidenceRequired: 10, gpsCaptured: true, photosCount: 2,
    ownerVerified: false, assetsEnumerated: false, observationsCount: 0, documentsCount: 0,
    draftSaved: false,
  },
  {
    id: "ft-004", projectId: "proj-003", projectName: "Pune Metro Line 3",
    parcelId: "MH-PN-006201", village: "Kharadi", tehsil: "Haveli", district: "Pune",
    taskType: "ownership_verification", assignedBy: "Smt. Kavita Patil", assignedByRole: "SDO / Tehsildar",
    dueDate: "2026-09-11T18:00:00", status: "assigned", priority: "medium", distanceKm: 12.4,
    evidenceCount: 0, evidenceRequired: 8, gpsCaptured: false, photosCount: 0,
    ownerVerified: false, assetsEnumerated: false, observationsCount: 0, documentsCount: 0,
    draftSaved: false,
  },
  {
    id: "ft-005", projectId: "proj-004", projectName: "Satara Bypass Road",
    parcelId: "MH-PN-007101", village: "Manjri", tehsil: "Haveli", district: "Pune",
    taskType: "possession_evidence", assignedBy: "Smt. Kavita Patil", assignedByRole: "SDO / Tehsildar",
    dueDate: "2026-09-12T18:00:00", status: "assigned", priority: "medium", distanceKm: 15.6,
    evidenceCount: 0, evidenceRequired: 6, gpsCaptured: false, photosCount: 0,
    ownerVerified: false, assetsEnumerated: false, observationsCount: 0, documentsCount: 0,
    draftSaved: false,
  },
  {
    id: "ft-006", projectId: "proj-005", projectName: "Pune–Nashik Highway Spur",
    parcelId: "MH-PN-009101", village: "Hinjewadi", tehsil: "Haveli", district: "Pune",
    taskType: "objection_evidence", assignedBy: "Smt. Kavita Patil", assignedByRole: "SDO / Tehsildar",
    dueDate: "2026-09-08T18:00:00", status: "submitted", priority: "high", distanceKm: 3.8,
    evidenceCount: 6, evidenceRequired: 6, gpsCaptured: true, photosCount: 4,
    ownerVerified: true, assetsEnumerated: true, observationsCount: 2, documentsCount: 1,
    draftSaved: false, submittedAt: "2026-09-08T14:32:00",
  },
  {
    id: "ft-007", projectId: "proj-003", projectName: "Pune Metro Line 3",
    parcelId: "MH-PN-009201", village: "Kharadi", tehsil: "Haveli", district: "Pune",
    taskType: "rr_enumeration", assignedBy: "Smt. Kavita Patil", assignedByRole: "SDO / Tehsildar",
    dueDate: "2026-09-10T18:00:00", status: "accepted", priority: "medium", distanceKm: 11.2,
    evidenceCount: 1, evidenceRequired: 5, gpsCaptured: false, photosCount: 0,
    ownerVerified: false, assetsEnumerated: false, observationsCount: 0, documentsCount: 1,
    draftSaved: false,
  },
  {
    id: "ft-008", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion",
    parcelId: "MH-PN-004821", village: "Hinjewadi", tehsil: "Haveli", district: "Pune",
    taskType: "field_verification", assignedBy: "Smt. Kavita Patil", assignedByRole: "SDO / Tehsildar",
    dueDate: "2026-09-07T18:00:00", status: "completed", priority: "high", distanceKm: 3.2,
    evidenceCount: 8, evidenceRequired: 8, gpsCaptured: true, photosCount: 5,
    ownerVerified: true, assetsEnumerated: true, observationsCount: 2, documentsCount: 1,
    draftSaved: false, submittedAt: "2026-09-07T15:45:00",
  },
  {
    id: "ft-009", projectId: "proj-006", projectName: "Hinjewadi IT Park Expansion",
    parcelId: "MH-PN-008301", village: "Hinjewadi", tehsil: "Haveli", district: "Pune",
    taskType: "asset_verification", assignedBy: "Smt. Kavita Patil", assignedByRole: "SDO / Tehsildar",
    dueDate: "2026-09-13T18:00:00", status: "assigned", priority: "low", distanceKm: 2.8,
    evidenceCount: 0, evidenceRequired: 6, gpsCaptured: false, photosCount: 0,
    ownerVerified: false, assetsEnumerated: false, observationsCount: 0, documentsCount: 0,
    draftSaved: false,
  },
  {
    id: "ft-010", projectId: "proj-007", projectName: "Kothrud Bus Rapid Transit",
    parcelId: "MH-PN-009601", village: "Wakad", tehsil: "Haveli", district: "Pune",
    taskType: "ownership_verification", assignedBy: "Smt. Kavita Patil", assignedByRole: "SDO / Tehsildar",
    dueDate: "2026-09-14T18:00:00", status: "assigned", priority: "low", distanceKm: 7.5,
    evidenceCount: 0, evidenceRequired: 8, gpsCaptured: false, photosCount: 0,
    ownerVerified: false, assetsEnumerated: false, observationsCount: 0, documentsCount: 0,
    draftSaved: false,
  },
  {
    id: "ft-011", projectId: "proj-008", projectName: "Hadapsar Metro Extension",
    parcelId: "MH-PN-009401", village: "Hadapsar", tehsil: "Haveli", district: "Pune",
    taskType: "field_verification", assignedBy: "Smt. Kavita Patil", assignedByRole: "SDO / Tehsildar",
    dueDate: "2026-09-06T18:00:00", status: "needs_reverification", priority: "high", distanceKm: 9.8,
    evidenceCount: 5, evidenceRequired: 8, gpsCaptured: true, photosCount: 3,
    ownerVerified: true, assetsEnumerated: false, observationsCount: 1, documentsCount: 0,
    draftSaved: false,
  },
  {
    id: "ft-012", projectId: "proj-002", projectName: "Pune Ring Road Phase II",
    parcelId: "MH-PN-005102", village: "Wakad", tehsil: "Haveli", district: "Pune",
    taskType: "ownership_verification", assignedBy: "Smt. Kavita Patil", assignedByRole: "SDO / Tehsildar",
    dueDate: "2026-09-10T18:00:00", status: "assigned", priority: "medium", distanceKm: 8.3,
    evidenceCount: 0, evidenceRequired: 8, gpsCaptured: false, photosCount: 0,
    ownerVerified: false, assetsEnumerated: false, observationsCount: 0, documentsCount: 0,
    draftSaved: false,
  },
];

export const GPS_RECORDS: GpsRecord[] = [
  { id: "gps-001", parcelId: "MH-PN-004821", latitude: 18.5981, longitude: 73.7354, accuracy: 8, capturedAt: "2026-09-08T14:42:18", officer: "Shri. M. Kamble", officerId: "FO-042", status: "verified" },
  { id: "gps-002", parcelId: "MH-PN-009101", latitude: 18.6012, longitude: 73.7289, accuracy: 5, capturedAt: "2026-09-08T10:15:00", officer: "Shri. M. Kamble", officerId: "FO-042", status: "synced" },
  { id: "gps-003", parcelId: "MH-PN-009501", latitude: 18.5845, longitude: 73.7612, accuracy: 12, capturedAt: "2026-09-07T09:30:00", officer: "Shri. M. Kamble", officerId: "FO-042", status: "captured" },
];

export const PHOTO_EVIDENCE: PhotoEvidence[] = [
  { id: "ph-001", parcelId: "MH-PN-004821", category: "parcel_overview", gpsLat: 18.5981, gpsLng: 73.7354, capturedAt: "2026-09-08T14:43:00", officer: "Shri. M. Kamble", officerId: "FO-042", status: "submitted", fileSize: "3.2 MB" },
  { id: "ph-002", parcelId: "MH-PN-004821", category: "boundary", gpsLat: 18.5982, gpsLng: 73.7355, capturedAt: "2026-09-08T14:45:00", officer: "Shri. M. Kamble", officerId: "FO-042", status: "submitted", fileSize: "2.8 MB" },
  { id: "ph-003", parcelId: "MH-PN-004821", category: "structure", gpsLat: 18.5980, gpsLng: 73.7353, capturedAt: "2026-09-08T14:48:00", officer: "Shri. M. Kamble", officerId: "FO-042", status: "submitted", fileSize: "4.1 MB" },
  { id: "ph-004", parcelId: "MH-PN-009101", category: "parcel_overview", gpsLat: 18.6012, gpsLng: 73.7289, capturedAt: "2026-09-08T10:16:00", officer: "Shri. M. Kamble", officerId: "FO-042", status: "synced", fileSize: "3.5 MB" },
  { id: "ph-005", parcelId: "MH-PN-009101", category: "tree", gpsLat: 18.6013, gpsLng: 73.7290, capturedAt: "2026-09-08T10:20:00", officer: "Shri. M. Kamble", officerId: "FO-042", status: "synced", fileSize: "2.9 MB" },
  { id: "ph-006", parcelId: "MH-PN-009201", category: "occupancy", gpsLat: 18.5890, gpsLng: 73.7420, capturedAt: "2026-09-07T11:00:00", officer: "Shri. M. Kamble", officerId: "FO-042", status: "submitted", fileSize: "3.0 MB" },
];

export const DOCUMENT_RECORDS: DocumentRecord[] = [
  { id: "doc-001", parcelId: "MH-PN-004821", documentType: "land_record", title: "7/12 Extract — Hinjewadi", capturedBy: "Shri. M. Kamble", capturedAt: "2026-09-08T14:50:00", status: "submitted", fileSize: "1.2 MB" },
  { id: "doc-002", parcelId: "MH-PN-009101", documentType: "ownership_proof", title: "Sale Deed — 2018", capturedBy: "Shri. M. Kamble", capturedAt: "2026-09-08T10:25:00", status: "synced", fileSize: "2.1 MB" },
  { id: "doc-003", parcelId: "MH-PN-009201", documentType: "tax_record", title: "Property Tax Receipt — 2025", capturedBy: "Shri. M. Kamble", capturedAt: "2026-09-07T11:05:00", status: "submitted", fileSize: "0.8 MB" },
];

export const OWNER_VERIFICATION: OwnerVerification = {
  id: "ov-001", parcelId: "MH-PN-004821", ulpin: "MH-PN-004821", surveyNumber: "Survey 48/2",
  recordedOwner: "Rajesh Kumar Patil", recordedArea: 1.82, classification: "Agricultural (Class I)",
  claimedOwner: "Rajesh Kumar Patil", observedArea: 1.78, occupancy: "Self-cultivated",
  match: true, remarks: "Owner present. Land under active cultivation. Boundaries match survey records.",
  status: "matched",
};

export const ASSET_RECORDS: AssetRecord[] = [
  { id: "ast-001", parcelId: "MH-PN-004821", assetType: "tree", subType: "Mango Tree", quantity: 18, condition: "Good", remarks: "Mature trees, well-maintained. Aged 12–15 years.", photosCount: 3, gpsVerified: true },
  { id: "ast-002", parcelId: "MH-PN-004821", assetType: "structure", subType: "Residential", quantity: 1, condition: "Occupied", dimensions: "920 sq ft (RCC + Tin roof)", remarks: "Single-story residential structure. Owner resides here.", photosCount: 4, gpsVerified: true },
  { id: "ast-003", parcelId: "MH-PN-004821", assetType: "well", subType: "Borewell", quantity: 1, condition: "Functional", remarks: "Borewell depth ~60m. Currently operational.", photosCount: 1, gpsVerified: true },
  { id: "ast-004", parcelId: "MH-PN-009101", assetType: "tree", subType: "Coconut Tree", quantity: 24, condition: "Good", remarks: "Coconut plantation along boundary.", photosCount: 2, gpsVerified: true },
  { id: "ast-005", parcelId: "MH-PN-009101", assetType: "structure", subType: "Farm Shed", quantity: 1, condition: "Fair", dimensions: "400 sq ft (Tin)", remarks: "Agricultural storage shed.", photosCount: 1, gpsVerified: true },
];

export const MEASUREMENTS: Measurement[] = [
  { id: "ms-001", parcelId: "MH-PN-004821", recordedArea: 1.82, observedArea: 1.78, unit: "ha", boundaryNotes: "Northern boundary matches survey peg. Eastern boundary slight encroachment by neighbor.", surveyNotes: "Total area 0.04 ha less than recorded. Possible survey error in original measurement.", discrepancy: true, difference: 0.04 },
  { id: "ms-002", parcelId: "MH-PN-006201", recordedArea: 1.20, observedArea: 1.35, unit: "ha", boundaryNotes: "Western boundary extends beyond recorded line.", surveyNotes: "0.15 ha more than recorded. Possible unrecorded subdivision.", discrepancy: true, difference: 0.15 },
];

export const FIELD_OBSERVATIONS: FieldObservation[] = [
  { id: "fo-obs-001", parcelId: "MH-PN-004821", category: "cultivation", text: "Active mango orchard with 18 mature trees. intercropped with vegetables. Well-maintained irrigation.", timestamp: "2026-09-08T14:55:00", officer: "Shri. M. Kamble", relatedEvidenceIds: ["ph-001", "ph-005"] },
  { id: "fo-obs-002", parcelId: "MH-PN-004821", category: "boundary", text: "Northern boundary clear. Eastern boundary has minor encroachment (~0.5m) by adjacent plot owner. Needs survey clarification.", timestamp: "2026-09-08T15:00:00", officer: "Shri. M. Kamble", relatedEvidenceIds: ["ph-002"] },
  { id: "fo-obs-003", parcelId: "MH-PN-009101", category: "access", text: "Access road via village road. No encumbrance on access.", timestamp: "2026-09-08T10:30:00", officer: "Shri. M. Kamble", relatedEvidenceIds: ["ph-004"] },
];

export const LANDOWNER_INTERACTIONS: LandownerInteraction[] = [
  { id: "loi-001", parcelId: "MH-PN-004821", landowner: "Rajesh Kumar Patil", visitDate: "2026-09-08T14:40:00", officer: "Shri. M. Kamble", result: "owner_present", remarks: "Owner cooperative. Confirmed all details. Provided 7/12 extract and tax receipt." },
  { id: "loi-002", parcelId: "MH-PN-009101", landowner: "Suresh Jadhav", visitDate: "2026-09-08T10:10:00", officer: "Shri. M. Kamble", result: "owner_present", remarks: "Owner present. Expressed concern about compensation amount. Will file objection." },
];

export const OBJECTION_EVIDENCE: ObjectionEvidence[] = [
  {
    id: "oe-001", objectionId: "obj-003", parcelId: "MH-PN-009101", category: "compensation",
    issue: "Landowner disputes compensation assessment. Claims higher market value.",
    landownerStatement: "The land is worth more than assessed. Neighboring plot sold for ₹45L in 2025.",
    requiredEvidence: ["Site photographs", "GPS coordinates", "Comparable sale records", "Landowner statement"],
    collectedEvidence: ["Site photographs", "GPS coordinates", "Landowner statement"],
    status: "evidence_collected", decisionAuthority: "District Collector / CALA",
  },
];

export const POSSESSION_EVIDENCE_DATA: PossessionEvidence = {
  id: "pe-001", parcelId: "MH-PN-007101", projectName: "Satara Bypass Road",
  village: "Manjri", landowner: "Prakash Shinde", date: "2026-09-12",
  prerequisites: [
    { label: "Compensation", status: "completed" },
    { label: "Blocking Discrepancy", status: "completed" },
    { label: "Grievance", status: "completed" },
    { label: "Field Verification", status: "completed" },
  ],
  photosCount: 0, gpsCaptured: false, boundaryEvidence: false, officerRemarks: "",
  status: "ready",
};

export const RNR_FIELD_DATA: RnrFieldEntry[] = [
  {
    id: "rnr-001", familyId: "FAM-001", parcelId: "MH-PN-009201", village: "Kharadi",
    householdSize: 5, housing: "Own house (1200 sq ft, RCC)", livelihood: "Farming + wage labor",
    transport: "Motorcycle + bicycle", employment: "MGNREGA card holder",
    skillTraining: "None currently", specialSupport: "Elderly mother (78 years)",
    status: "collected",
  },
  {
    id: "rnr-002", familyId: "FAM-002", parcelId: "MH-PN-009201", village: "Kharadi",
    householdSize: 3, housing: "Rented room (400 sq ft)", livelihood: "Daily wage labor",
    transport: "Bicycle", employment: "Construction laborer",
    skillTraining: "None", specialSupport: "None",
    status: "in_progress",
  },
];

export const FIELD_REPORTS: FieldReport[] = [
  {
    id: "fr-001", parcelId: "MH-PN-004821", projectName: "NH-544 Pune–Satara Expansion",
    village: "Hinjewadi", officer: "Shri. M. Kamble", visitDate: "2026-09-07",
    taskType: "field_verification", status: "accepted",
    sections: ["Location", "Owner Verification", "Land Details", "Assets", "Observations", "Documents", "Photos"],
    submittedAt: "2026-09-07T15:45:00", reviewedBy: "Smt. Kavita Patil",
  },
  {
    id: "fr-002", parcelId: "MH-PN-009101", projectName: "Pune–Nashik Highway Spur",
    village: "Hinjewadi", officer: "Shri. M. Kamble", visitDate: "2026-09-08",
    taskType: "objection_evidence", status: "submitted",
    sections: ["Location", "Owner Verification", "Land Details", "Assets", "Observations", "Photos", "Discrepancies"],
    submittedAt: "2026-09-08T14:32:00",
  },
];

export const REVERIFICATION_REQUESTS: ReverificationRequest[] = [
  {
    id: "rv-001", parcelId: "MH-PN-009401", requestedBy: "Smt. Kavita Patil",
    requestedByRole: "SDO / Tehsildar", reason: "Boundary evidence insufficient. Need additional boundary photographs from eastern and southern sides.",
    requiredItems: ["2 additional boundary photographs (east)", "2 additional boundary photographs (south)", "Updated GPS waypoints along boundary"],
    dueDate: "2026-09-10T18:00:00", status: "pending",
  },
];

export const SYNC_ITEMS: SyncItem[] = [
  { id: "si-001", parcelId: "MH-PN-004821", category: "photo", description: "Photo — Parcel Overview", fileSize: "3.2 MB", status: "queued", timestamp: "2026-09-08T14:43:00" },
  { id: "si-002", parcelId: "MH-PN-004821", category: "photo", description: "Photo — Boundary", fileSize: "2.8 MB", status: "queued", timestamp: "2026-09-08T14:45:00" },
  { id: "si-003", parcelId: "MH-PN-004821", category: "photo", description: "Photo — Structure", fileSize: "4.1 MB", status: "queued", timestamp: "2026-09-08T14:48:00" },
  { id: "si-004", parcelId: "MH-PN-004821", category: "field_report", description: "Field Report — Ownership Verification", fileSize: "12 KB", status: "queued", timestamp: "2026-09-08T15:02:00" },
  { id: "si-005", parcelId: "MH-PN-004821", category: "gps_record", description: "GPS Record", fileSize: "0.5 KB", status: "synced", timestamp: "2026-09-08T14:42:00" },
  { id: "si-006", parcelId: "MH-PN-009101", category: "verification", description: "Owner Verification", fileSize: "2 KB", status: "queued", timestamp: "2026-09-08T10:35:00" },
  { id: "si-007", parcelId: "MH-PN-009101", category: "document", description: "Sale Deed Copy", fileSize: "2.1 MB", status: "failed", errorMessage: "Upload failed — retry when network is available.", timestamp: "2026-09-08T10:25:00" },
];

export const FO_NOTIFICATIONS: FoNotification[] = [
  { id: "fn-001", title: "New Field Assignment", message: "NH-544 Expansion — Parcel MH-PN-005001. Asset verification assigned.", priority: "high", timestamp: "2026-09-08T09:00:00", read: false, actionLabel: "View Task", actionTaskId: "ft-002" },
  { id: "fn-002", title: "Reverification Required", message: "MH-PN-009401 — Boundary evidence insufficient. 2 additional photos needed.", priority: "high", timestamp: "2026-09-07T16:00:00", read: false, actionLabel: "Open Task", actionTaskId: "ft-011" },
  { id: "fn-003", title: "Sync Complete", message: "7 records uploaded successfully.", priority: "low", timestamp: "2026-09-07T14:32:00", read: true },
  { id: "fn-004", title: "Task Overdue", message: "MH-PN-009501 — Field verification overdue by 1 day.", priority: "critical", timestamp: "2026-09-08T08:00:00", read: false, actionLabel: "Open Task", actionTaskId: "ft-003" },
  { id: "fn-005", title: "Report Accepted", message: "MH-PN-004821 — Field verification report accepted by Tehsil.", priority: "low", timestamp: "2026-09-07T16:00:00", read: true },
  { id: "fn-006", title: "Assignment Reminder", message: "3 tasks due tomorrow. Please ensure field visits are scheduled.", priority: "medium", timestamp: "2026-09-08T07:00:00", read: true },
];

export const FO_AUDIT_ENTRIES: FoAuditEntry[] = [
  { id: "fa-001", timestamp: "2026-09-08T15:02:00", action: "Field Report Submitted", parcelId: "MH-PN-009101" },
  { id: "fa-002", timestamp: "2026-09-08T14:58:00", action: "Asset Enumeration Completed", evidence: "5 assets recorded", parcelId: "MH-PN-004821" },
  { id: "fa-003", timestamp: "2026-09-08T14:51:00", action: "Owner Verification Completed", evidence: "Owner match confirmed", parcelId: "MH-PN-004821" },
  { id: "fa-004", timestamp: "2026-09-08T14:48:00", action: "3 Photos Captured", evidence: "Overview, Boundary, Structure", parcelId: "MH-PN-004821" },
  { id: "fa-005", timestamp: "2026-09-08T14:42:00", action: "GPS Captured", evidence: "18.5981, 73.7354 — ±8m", parcelId: "MH-PN-004821" },
  { id: "fa-006", timestamp: "2026-09-08T14:40:00", action: "Field Visit Started", parcelId: "MH-PN-004821" },
  { id: "fa-007", timestamp: "2026-09-08T10:35:00", action: "Owner Verification Completed", evidence: "Owner match confirmed", parcelId: "MH-PN-009101" },
  { id: "fa-008", timestamp: "2026-09-08T10:20:00", action: "5 Photos Captured", evidence: "Overview, Trees, Structure", parcelId: "MH-PN-009101" },
];

export const COMPLETED_WORK: CompletedWork[] = [
  { id: "cw-001", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004821", taskType: "field_verification", submittedAt: "2026-09-07T15:45:00", reviewedBy: "Smt. Kavita Patil", status: "accepted" },
  { id: "cw-002", projectId: "proj-005", projectName: "Pune–Nashik Highway Spur", parcelId: "MH-PN-009101", taskType: "objection_evidence", submittedAt: "2026-09-08T14:32:00", status: "submitted" },
];

export const FO_PERFORMANCE: FoPerformance = {
  tasksCompleted: 8, tasksPending: 3, tasksOverdue: 1,
  evidenceSubmitted: 24, reverificationRate: 8.3, lastSync: "2026-09-08T14:32:00",
};
