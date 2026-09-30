import type { LifecycleStage } from "@/types/domain";

export type DistrictProfile = {
  id: string;
  name: string;
  code: string;
  collector: string;
  designation: string;
  state: string;
  contact: string;
  activeProjects: number;
  totalParcels: number;
  totalTehsils: number;
  totalVillages: number;
};

export const DISTRICT_PROFILE: DistrictProfile = {
  id: "dist-pune",
  name: "Pune",
  code: "PN",
  collector: "Dr. Suhas Diwase, IAS",
  designation: "District Collector & Competent Acquisition Authority (CALA)",
  state: "Maharashtra",
  contact: "collector.pune@maharashtra.gov.in",
  activeProjects: 12,
  totalParcels: 8421,
  totalTehsils: 14,
  totalVillages: 182,
};

export type DashboardKPI = {
  label: string;
  value: string;
  subtext: string;
  color?: string;
};

export const DASHBOARD_KPIS: DashboardKPI[] = [
  { label: "Active Projects", value: "12", subtext: "Across Pune district" },
  { label: "Active Parcels", value: "8,421", subtext: "Under acquisition" },
  { label: "Awaiting Scrutiny", value: "3", subtext: "Require Collector review" },
  { label: "SIA Pending", value: "2", subtext: "In progress / not started" },
  { label: "Objections Pending", value: "7", subtext: "Open / under review" },
  { label: "Declarations Pending", value: "2", subtext: "Awaiting Section 19" },
  { label: "Field Verification Pending", value: "4", subtext: "Parcels to verify" },
  { label: "Awards Pending", value: "3", subtext: "Draft awards to approve" },
  { label: "Compensation Assessed", value: "₹420 Cr", subtext: "Total assessed", color: "text-[#0F2340]" },
  { label: "Payment Completed", value: "₹310 Cr", subtext: "73.8% disbursed", color: "text-emerald-700" },
  { label: "Overdue Cases", value: "2", subtext: "SLA breached", color: "text-red-700" },
  { label: "Open Grievances", value: "4", subtext: "2 blocking", color: "text-amber-700" },
];

export type WorkQueueItem = {
  id: string;
  category: "requires_decision" | "requires_review" | "approaching_deadline" | "escalated";
  projectName: string;
  parcelId: string;
  parcelVillage: string;
  currentStage: LifecycleStage;
  requiredAction: string;
  ageDays: number;
  deadline: string;
  risk: "critical" | "high" | "medium" | "low";
  lastActivity: string;
};

export const WORK_QUEUE: WorkQueueItem[] = [
  { id: "wq-001", category: "requires_decision", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004821", parcelVillage: "Haveli", currentStage: "objections_hearing", requiredAction: "Objection hearing decision — parcel ownership dispute", ageDays: 18, deadline: "2026-09-15", risk: "critical", lastActivity: "2026-09-01" },
  { id: "wq-002", category: "requires_decision", projectName: "Pune Ring Road Phase II", parcelId: "MH-PN-005102", parcelVillage: "Mulshi", currentStage: "scrutiny", requiredAction: "Scrutiny review — project submission package", ageDays: 12, deadline: "2026-09-20", risk: "high", lastActivity: "2026-09-03" },
  { id: "wq-003", category: "requires_review", projectName: "Pune Metro Line 3", parcelId: "MH-PN-006201", parcelVillage: "Haveli", currentStage: "field_verification", requiredAction: "Review field verification evidence — GPS discrepancy", ageDays: 8, deadline: "2026-09-25", risk: "medium", lastActivity: "2026-09-04" },
  { id: "wq-004", category: "requires_review", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004903", parcelVillage: "Mulshi", currentStage: "compensation", requiredAction: "Review compensation calculation — asset verification pending", ageDays: 15, deadline: "2026-09-18", risk: "high", lastActivity: "2026-09-02" },
  { id: "wq-005", category: "approaching_deadline", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004821", parcelVillage: "Haveli", currentStage: "objections_hearing", requiredAction: "Objection hearing — 5 days until statutory deadline", ageDays: 55, deadline: "2026-09-10", risk: "critical", lastActivity: "2026-09-05" },
  { id: "wq-006", category: "approaching_deadline", projectName: "Pune Ring Road Phase II", parcelId: "MH-PN-005102", parcelVillage: "Mulshi", currentStage: "sia", requiredAction: "SIA deadline approaching — 15 days remaining", ageDays: 165, deadline: "2026-09-12", risk: "critical", lastActivity: "2026-09-05" },
  { id: "wq-007", category: "escalated", projectName: "Pune Ring Road Phase II", parcelId: "MH-PN-005201", parcelVillage: "Haveli", currentStage: "compensation", requiredAction: "State Nodal Officer escalation — compensation dispute", ageDays: 22, deadline: "2026-09-14", risk: "high", lastActivity: "2026-09-02" },
  { id: "wq-008", category: "requires_decision", projectName: "Satara Bypass Road", parcelId: "MH-PN-007101", parcelVillage: "Baramati", currentStage: "award", requiredAction: "Approve draft award — 3 parcels ready", ageDays: 10, deadline: "2026-09-22", risk: "medium", lastActivity: "2026-09-04" },
];

export type IncomingProject = {
  id: string;
  projectName: string;
  projectCode: string;
  roIa: string;
  state: string;
  district: string;
  estimatedParcels: number;
  areaHa: number;
  submittedDate: string;
  status: "received" | "under_scrutiny" | "clarification_required" | "accepted" | "returned";
  priority: "critical" | "high" | "medium" | "low";
};

export const INCOMING_PROJECTS: IncomingProject[] = [
  { id: "proj-in-001", projectName: "NH-544 Pune–Satara Six-Laning", projectCode: "NH-544/PN", roIa: "NHAI — Pune Region", state: "Maharashtra", district: "Pune", estimatedParcels: 842, areaHa: 1640, submittedDate: "2026-04-15", status: "accepted", priority: "high" },
  { id: "proj-in-002", projectName: "Pune Ring Road Phase II", projectCode: "PRR-02/PN", roIa: "Maharashtra MRIDC", state: "Maharashtra", district: "Pune", estimatedParcels: 2100, areaHa: 3200, submittedDate: "2026-03-20", status: "under_scrutiny", priority: "critical" },
  { id: "proj-in-003", projectName: "Pune Metro Line 3", projectCode: "PML-3/PN", roIa: "Pune Metro Rail Corp", state: "Maharashtra", district: "Pune", estimatedParcels: 320, areaHa: 180, submittedDate: "2026-05-01", status: "accepted", priority: "medium" },
  { id: "proj-in-004", projectName: "Pune–Mumbai Hyperloop Corridor", projectCode: "PMHC/PN", roIa: "Hyperloop Transport Tech", state: "Maharashtra", district: "Pune", estimatedParcels: 160, areaHa: 240, submittedDate: "2026-08-01", status: "received", priority: "low" },
  { id: "proj-in-005", projectName: "Hinjewadi IT Park Expansion", projectCode: "HITE/PN", roIa: "MIIDC", state: "Maharashtra", district: "Pune", estimatedParcels: 280, areaHa: 420, submittedDate: "2026-07-10", status: "clarification_required", priority: "medium" },
];

export type DistrictProject = {
  id: string;
  projectName: string;
  projectCode: string;
  roIa: string;
  parcels: number;
  areaHa: number;
  currentStage: LifecycleStage;
  progress: number;
  risk: "critical" | "high" | "medium" | "low" | "on_track";
  lastActivity: string;
  budgetCr: number;
  status: "active" | "completed" | "on_hold";
  affectedFamilies: number;
};

export const DISTRICT_PROJECTS: DistrictProject[] = [
  { id: "proj-001", projectName: "NH-544 Pune–Satara Expansion", projectCode: "NH-544/PN", roIa: "NHAI", parcels: 842, areaHa: 1640, currentStage: "objections_hearing", progress: 52, risk: "high", lastActivity: "2026-09-05", budgetCr: 4200, status: "active", affectedFamilies: 1240 },
  { id: "proj-002", projectName: "Pune Ring Road Phase II", projectCode: "PRR-02/PN", roIa: "MRIDC", parcels: 2100, areaHa: 3200, currentStage: "sia", progress: 38, risk: "critical", lastActivity: "2026-09-05", budgetCr: 8500, status: "active", affectedFamilies: 2100 },
  { id: "proj-003", projectName: "Pune Metro Line 3", projectCode: "PML-3/PN", roIa: "Pune Metro Rail Corp", parcels: 320, areaHa: 180, currentStage: "field_verification", progress: 62, risk: "on_track", lastActivity: "2026-09-04", budgetCr: 4500, status: "active", affectedFamilies: 640 },
  { id: "proj-004", projectName: "Satara Bypass Road", projectCode: "SBR/PN", roIa: "NHAI", parcels: 442, areaHa: 780, currentStage: "award", progress: 82, risk: "low", lastActivity: "2026-08-30", budgetCr: 1800, status: "active", affectedFamilies: 580 },
  { id: "proj-005", projectName: "Pune–Mumbai Hyperloop Corridor", projectCode: "PMHC/PN", roIa: "Hyperloop Transport Tech", parcels: 160, areaHa: 240, currentStage: "project_proposal", progress: 8, risk: "low", lastActivity: "2026-09-01", budgetCr: 12000, status: "active", affectedFamilies: 180 },
  { id: "proj-006", projectName: "Hinjewadi IT Park Expansion", projectCode: "HITE/PN", roIa: "MIIDC", parcels: 280, areaHa: 420, currentStage: "land_requirement", progress: 12, risk: "medium", lastActivity: "2026-08-22", budgetCr: 900, status: "active", affectedFamilies: 340 },
  { id: "proj-007", projectName: "Pune–Nashik Highway Spur", projectCode: "PNHS/PN", roIa: "NHAI", parcels: 540, areaHa: 980, currentStage: "declaration", progress: 58, risk: "medium", lastActivity: "2026-09-02", budgetCr: 2200, status: "active", affectedFamilies: 620 },
  { id: "proj-008", projectName: "Kothrud Bus Rapid Transit", projectCode: "KBRT/PN", roIa: "PMPML", parcels: 120, areaHa: 65, currentStage: "preliminary_notification", progress: 45, risk: "on_track", lastActivity: "2026-09-03", budgetCr: 350, status: "active", affectedFamilies: 160 },
];

export type ScrutinyChecklist = {
  projectId: string;
  items: {
    label: string;
    status: "complete" | "incomplete" | "warning";
    evidence: string;
    remarks: string;
  }[];
  overallStatus: "complete" | "incomplete" | "in_progress";
  completedDate?: string;
};

export const SCRUTINY_CHECKLISTS: ScrutinyChecklist[] = [
  {
    projectId: "proj-001",
    items: [
      { label: "Project purpose documented", status: "complete", evidence: "Project proposal v1.2", remarks: "Highway expansion purpose clearly stated" },
      { label: "Competent authority information available", status: "complete", evidence: "NHAI authorization letter", remarks: "NHAI designated as competent authority" },
      { label: "Land requirement documented", status: "complete", evidence: "Land requirement document v1.0", remarks: "1,640 Ha across 842 parcels" },
      { label: "GIS footprint available", status: "complete", evidence: "GIS footprint plan v1.1", remarks: "Footprint confirmed by survey team" },
      { label: "Preliminary parcel list available", status: "complete", evidence: "Parcel register extract", remarks: "842 parcels identified across 8 villages" },
      { label: "Jurisdiction confirmed", status: "complete", evidence: "District boundary verification", remarks: "All parcels within Pune district" },
      { label: "Stakeholder information available", status: "complete", evidence: "Stakeholder registry", remarks: "RO/IA, State, District stakeholders identified" },
      { label: "Supporting document requires clarification", status: "warning", evidence: "Land record extract — 12 parcels", remarks: "12 parcels have pending ownership verification" },
    ],
    overallStatus: "complete",
    completedDate: "2026-08-20",
  },
  {
    projectId: "proj-002",
    items: [
      { label: "Project purpose documented", status: "complete", evidence: "Project proposal v1.0", remarks: "Ring road construction purpose" },
      { label: "Competent authority information available", status: "complete", evidence: "MRIDC authorization", remarks: "MRIDC designated" },
      { label: "Land requirement documented", status: "incomplete", evidence: "Draft land requirement", remarks: "Awaiting final parcel count from RO" },
      { label: "GIS footprint available", status: "incomplete", evidence: "—", remarks: "GIS footprint pending from RO" },
      { label: "Preliminary parcel list available", status: "incomplete", evidence: "—", remarks: "Parcel list not yet submitted" },
      { label: "Jurisdiction confirmed", status: "complete", evidence: "District boundary", remarks: "Within Pune district" },
      { label: "Stakeholder information available", status: "complete", evidence: "Stakeholder registry", remarks: "All stakeholders identified" },
      { label: "Supporting document requires clarification", status: "incomplete", evidence: "—", remarks: "Awaiting RO submission" },
    ],
    overallStatus: "in_progress",
  },
];

export type SiaProject = {
  projectId: string;
  projectName: string;
  affectedVillages: string[];
  affectedFamilies: number;
  siaAuthority: string;
  status: "not_started" | "assigned" | "in_progress" | "submitted" | "under_review" | "completed" | "returned";
  startDate: string;
  targetDate: string;
  reportStatus: "draft" | "submitted" | "under_review" | "approved" | "pending";
};

export const SIA_DATA: SiaProject[] = [
  { projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", affectedVillages: ["Haveli", "Mulshi", "Baramati"], affectedFamilies: 1240, siaAuthority: "SIA Expert Group — Pune", status: "completed", startDate: "2026-03-10", targetDate: "2026-09-10", reportStatus: "approved" },
  { projectId: "proj-002", projectName: "Pune Ring Road Phase II", affectedVillages: ["Haveli", "Mulshi", "Shirur"], affectedFamilies: 2100, siaAuthority: "SIA Expert Group — Pune", status: "in_progress", startDate: "2026-03-25", targetDate: "2026-09-12", reportStatus: "draft" },
  { projectId: "proj-005", projectName: "Pune–Mumbai Hyperloop Corridor", affectedVillages: ["Mulshi"], affectedFamilies: 180, siaAuthority: "SIA Expert Group — Pune", status: "not_started", startDate: "", targetDate: "", reportStatus: "pending" },
];

export type NotificationEntry = {
  projectId: string;
  projectName: string;
  notificationType: "section_11" | "disclosure" | "section_19";
  stage: LifecycleStage;
  prereqScrutiny: boolean;
  prereqSia: boolean;
  prereqFootprint: boolean;
  prereqParcels: boolean;
  notificationNumber: string;
  villages: string[];
  parcelCount: number;
  publicationDate: string;
  objectionStartDate: string;
  objectionDeadline: string;
  status: "draft" | "ready" | "published" | "pending";
  disclosureChannels: {
    channel: string;
    status: "pending" | "prepared" | "published" | "failed";
  }[];
};

export const NOTIFICATION_DATA: NotificationEntry[] = [
  {
    projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", notificationType: "section_11", stage: "preliminary_notification",
    prereqScrutiny: true, prereqSia: true, prereqFootprint: true, prereqParcels: true,
    notificationNumber: "SR-11/2026/PN/001", villages: ["Haveli", "Mulshi"], parcelCount: 842,
    publicationDate: "2026-06-15", objectionStartDate: "2026-06-16", objectionDeadline: "2026-08-15",
    status: "published",
    disclosureChannels: [
      { channel: "Portal", status: "published" },
      { channel: "Notice Board", status: "published" },
      { channel: "SMS", status: "published" },
      { channel: "Email", status: "published" },
      { channel: "Registered Post", status: "published" },
      { channel: "IVR", status: "published" },
    ],
  },
  {
    projectId: "proj-008", projectName: "Kothrud Bus Rapid Transit", notificationType: "section_11", stage: "preliminary_notification",
    prereqScrutiny: true, prereqSia: true, prereqFootprint: true, prereqParcels: true,
    notificationNumber: "SR-11/2026/PN/002", villages: ["Kothrud"], parcelCount: 120,
    publicationDate: "2026-09-10", objectionStartDate: "2026-09-11", objectionDeadline: "2026-11-10",
    status: "ready",
    disclosureChannels: [
      { channel: "Portal", status: "prepared" },
      { channel: "Notice Board", status: "prepared" },
      { channel: "SMS", status: "pending" },
      { channel: "Email", status: "pending" },
      { channel: "Registered Post", status: "pending" },
      { channel: "IVR", status: "pending" },
    ],
  },
];

export type ObjectionEntry = {
  id: string;
  projectId: string;
  projectName: string;
  parcelId: string;
  landownerName: string;
  village: string;
  category: "ownership" | "measurement" | "land_requirement" | "compensation" | "livelihood" | "procedural" | "other";
  description: string;
  filedDate: string;
  hearingNoticeDate: string;
  hearingScheduledDate: string;
  hearingAttended: boolean;
  representative: string;
  status: "filed" | "review" | "hearing" | "decision_pending" | "resolved" | "escalated";
  decision?: "upheld" | "partially_upheld" | "rejected" | "requires_verification";
  reasoning?: string;
  assignedOfficer: string;
};

export const OBJECTIONS: ObjectionEntry[] = [
  { id: "obj-001", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004821", landownerName: "Shri. Rajesh Kumar Patil", village: "Haveli", category: "ownership", description: "Dispute over recorded ownership — claimant states inherited rights not reflected in 7/12 extract", filedDate: "2026-07-01", hearingNoticeDate: "2026-07-15", hearingScheduledDate: "2026-09-10", hearingAttended: false, representative: "Adv. S. Kulkarni", status: "hearing", assignedOfficer: "Tehsildar, Haveli" },
  { id: "obj-002", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004903", landownerName: "Smt. Anita Kamble", village: "Mulshi", category: "compensation", description: "Compensation amount does not reflect current market value of agricultural land", filedDate: "2026-07-05", hearingNoticeDate: "2026-07-20", hearingScheduledDate: "2026-09-12", hearingAttended: false, representative: "Self", status: "review", assignedOfficer: "Tehsildar, Mulshi" },
  { id: "obj-003", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-005001", landownerName: "Shri. V. Jadhav", village: "Haveli", category: "measurement", description: "Discrepancy in land area — survey shows 2.4 ha but notification states 2.8 ha", filedDate: "2026-07-10", hearingNoticeDate: "2026-07-25", hearingScheduledDate: "2026-09-15", hearingAttended: false, representative: "Adv. M. Deshmukh", status: "filed", assignedOfficer: "Tehsildar, Haveli" },
  { id: "obj-004", projectId: "proj-002", projectName: "Pune Ring Road Phase II", parcelId: "MH-PN-005102", landownerName: "Shri. R. Bhosale", village: "Mulshi", category: "livelihood", description: "Loss of irrigation well and agricultural income — requesting enhanced R&R", filedDate: "2026-08-01", hearingNoticeDate: "2026-08-15", hearingScheduledDate: "2026-09-18", hearingAttended: false, representative: "Self", status: "review", assignedOfficer: "Tehsildar, Mulshi" },
  { id: "obj-005", projectId: "proj-002", projectName: "Pune Ring Road Phase II", parcelId: "MH-PN-005201", landownerName: "Smt. P. Shinde", village: "Haveli", category: "procedural", description: "Section 11 notification not served personally — only published in newspaper", filedDate: "2026-08-05", hearingNoticeDate: "2026-08-20", hearingScheduledDate: "2026-09-20", hearingAttended: false, representative: "Adv. S. Kulkarni", status: "filed", assignedOfficer: "Tehsildar, Haveli" },
  { id: "obj-006", projectId: "proj-008", projectName: "Kothrud Bus Rapid Transit", parcelId: "MH-PN-008301", landownerName: "Shri. A. Deshmukh", village: "Kothrud", category: "compensation", description: "Compensation below circle rate — requesting revision based on recent transactions", filedDate: "2026-08-10", hearingNoticeDate: "2026-08-25", hearingScheduledDate: "2026-09-22", hearingAttended: false, representative: "Self", status: "filed", assignedOfficer: "Tehsildar, Haveli" },
  { id: "obj-007", projectId: "proj-008", projectName: "Kothrud Bus Rapid Transit", parcelId: "MH-PN-008302", landownerName: "Shri. K. Waghmare", village: "Kothrud", category: "other", description: "Heritage tree on parcel — requesting exclusion or special consideration", filedDate: "2026-08-12", hearingNoticeDate: "2026-08-28", hearingScheduledDate: "2026-09-25", hearingAttended: false, representative: "Self", status: "filed", assignedOfficer: "Tehsildar, Haveli" },
];

export type FieldVerification = {
  id: string;
  projectId: string;
  projectName: string;
  parcelId: string;
  village: string;
  assignedOfficer: string;
  assignedDate: string;
  status: "assigned" | "in_progress" | "completed" | "discrepancy" | "overdue";
  gpsVerified: boolean;
  documentsCount: number;
  risk: "critical" | "high" | "medium" | "low";
  ownershipMatch: boolean;
  areaMatch: boolean;
  recordedOwner: string;
  claimedOwner: string;
  recordedArea: number;
  claimedArea: number;
};

export const FIELD_VERIFICATION: FieldVerification[] = [
  { id: "fv-001", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004821", village: "Haveli", assignedOfficer: "Shri. M. Kamble", assignedDate: "2026-08-01", status: "completed", gpsVerified: true, documentsCount: 5, risk: "low", ownershipMatch: true, areaMatch: true, recordedOwner: "Rajesh Kumar Patil", claimedOwner: "Rajesh Kumar Patil", recordedArea: 1.82, claimedArea: 1.82 },
  { id: "fv-002", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004903", village: "Mulshi", assignedOfficer: "Shri. M. Kamble", assignedDate: "2026-08-05", status: "discrepancy", gpsVerified: true, documentsCount: 3, risk: "high", ownershipMatch: true, areaMatch: false, recordedOwner: "Anita Kamble", claimedOwner: "Anita Kamble", recordedArea: 2.40, claimedArea: 2.54 },
  { id: "fv-003", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-005001", village: "Haveli", assignedOfficer: "Smt. L. More", assignedDate: "2026-08-10", status: "completed", gpsVerified: true, documentsCount: 4, risk: "low", ownershipMatch: true, areaMatch: true, recordedOwner: "V. Jadhav", claimedOwner: "V. Jadhav", recordedArea: 2.40, claimedArea: 2.40 },
  { id: "fv-004", projectId: "proj-003", projectName: "Pune Metro Line 3", parcelId: "MH-PN-006201", village: "Haveli", assignedOfficer: "Shri. M. Kamble", assignedDate: "2026-08-15", status: "in_progress", gpsVerified: false, documentsCount: 2, risk: "medium", ownershipMatch: false, areaMatch: false, recordedOwner: "Suresh patil", claimedOwner: "Suresh Patil", recordedArea: 1.20, claimedArea: 1.35 },
  { id: "fv-005", projectId: "proj-003", projectName: "Pune Metro Line 3", parcelId: "MH-PN-006202", village: "Haveli", assignedOfficer: "Smt. L. More", assignedDate: "2026-08-20", status: "assigned", gpsVerified: false, documentsCount: 0, risk: "low", ownershipMatch: false, areaMatch: false, recordedOwner: "—", claimedOwner: "—", recordedArea: 0, claimedArea: 0 },
  { id: "fv-006", projectId: "proj-007", projectName: "Pune–Nashik Highway Spur", parcelId: "MH-PN-009101", village: "Ambegaon", assignedOfficer: "Shri. M. Kamble", assignedDate: "2026-08-12", status: "overdue", gpsVerified: false, documentsCount: 1, risk: "critical", ownershipMatch: false, areaMatch: false, recordedOwner: "—", claimedOwner: "—", recordedArea: 0, claimedArea: 0 },
];

export type CompensationParcel = {
  parcelId: string;
  projectId: string;
  projectName: string;
  village: string;
  landowner: string;
  landClassification: string;
  areaHa: number;
  marketValuePerHa: number;
  multiplier: number;
  assetsValue: number;
  solatium: number;
  interest: number;
  indicativeCompensation: number;
  status: "pending_valuation" | "draft" | "under_review" | "approved" | "payment_pending" | "paid";
  assets: { type: string; quantity: number; value: number; evidence: boolean }[];
};

export const COMPENSATION_DATA: CompensationParcel[] = [
  {
    parcelId: "MH-PN-004821", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Haveli", landowner: "Rajesh Kumar Patil", landClassification: "Agricultural", areaHa: 1.82,
    marketValuePerHa: 8000000, multiplier: 1.25, assetsValue: 184000, solatium: 229200, interest: 91680, indicativeCompensation: 18420000,
    status: "under_review",
    assets: [
      { type: "Mango Tree", quantity: 18, value: 72000, evidence: true },
      { type: "Well", quantity: 1, value: 85000, evidence: true },
      { type: "Boundary Wall", quantity: 1, value: 27000, evidence: true },
    ],
  },
  {
    parcelId: "MH-PN-004903", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Mulshi", landowner: "Anita Kamble", landClassification: "Agricultural", areaHa: 2.40,
    marketValuePerHa: 7500000, multiplier: 1.25, assetsValue: 96000, solatium: 217500, interest: 87000, indicativeCompensation: 22170000,
    status: "draft",
    assets: [
      { type: "Coconut Tree", quantity: 12, value: 48000, evidence: true },
      { type: "Tube Well", quantity: 1, value: 48000, evidence: true },
    ],
  },
  {
    parcelId: "MH-PN-005001", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Haveli", landowner: "V. Jadhav", landClassification: "Agricultural", areaHa: 2.40,
    marketValuePerHa: 8000000, multiplier: 1.25, assetsValue: 120000, solatium: 240000, interest: 96000, indicativeCompensation: 24120000,
    status: "approved",
    assets: [
      { type: "Mango Tree", quantity: 8, value: 32000, evidence: true },
      { type: "Pomegranate Tree", quantity: 12, value: 36000, evidence: true },
      { type: "Well", quantity: 1, value: 52000, evidence: true },
    ],
  },
  {
    parcelId: "MH-PN-007101", projectId: "proj-004", projectName: "Satara Bypass Road", village: "Baramati", landowner: "Shri. S. Bhosale", landClassification: "Agricultural", areaHa: 3.20,
    marketValuePerHa: 6500000, multiplier: 1.25, assetsValue: 156000, solatium: 243750, interest: 97500, indicativeCompensation: 26197500,
    status: "payment_pending",
    assets: [
      { type: "Banana Plantation", quantity: 200, value: 80000, evidence: true },
      { type: "Drip Irrigation", quantity: 1, value: 76000, evidence: true },
    ],
  },
];

export type AwardEntry = {
  parcelId: string;
  projectId: string;
  projectName: string;
  landowner: string;
  village: string;
  marketValue: number;
  multiplier: number;
  assetsValue: number;
  solatium: number;
  interest: number;
  totalAmount: number;
  status: "draft" | "under_review" | "approved" | "returned";
  approvedDate?: string;
};

export const AWARDS: AwardEntry[] = [
  { parcelId: "MH-PN-005001", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", landowner: "V. Jadhav", village: "Haveli", marketValue: 19200000, multiplier: 1.25, assetsValue: 120000, solatium: 2400000, interest: 960000, totalAmount: 24120000, status: "approved", approvedDate: "2026-09-01" },
  { parcelId: "MH-PN-004821", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", landowner: "Rajesh Kumar Patil", village: "Haveli", marketValue: 14560000, multiplier: 1.25, assetsValue: 184000, solatium: 1820000, interest: 728000, totalAmount: 18420000, status: "under_review" },
  { parcelId: "MH-PN-007101", projectId: "proj-004", projectName: "Satara Bypass Road", landowner: "Shri. S. Bhosale", village: "Baramati", marketValue: 20800000, multiplier: 1.25, assetsValue: 156000, solatium: 2600000, interest: 1040000, totalAmount: 26197500, status: "draft" },
];

export type PaymentEntry = {
  parcelId: string;
  projectId: string;
  landowner: string;
  awardAmount: number;
  status: "pending" | "initiated" | "completed" | "failed" | "pending_verification";
  reference: string;
  initiatedDate: string;
  completedDate: string;
};

export const PAYMENTS: PaymentEntry[] = [
  { parcelId: "MH-PN-005001", projectId: "proj-001", landowner: "V. Jadhav", awardAmount: 24120000, status: "completed", reference: "PFMS-2026-PN-001", initiatedDate: "2026-09-02", completedDate: "2026-09-04" },
  { parcelId: "MH-PN-007101", projectId: "proj-004", landowner: "Shri. S. Bhosale", awardAmount: 26197500, status: "initiated", reference: "PFMS-2026-PN-002", initiatedDate: "2026-09-05", completedDate: "" },
  { parcelId: "MH-PN-004821", projectId: "proj-001", landowner: "Rajesh Kumar Patil", awardAmount: 18420000, status: "pending", reference: "", initiatedDate: "", completedDate: "" },
];

export type PossessionEntry = {
  parcelId: string;
  projectId: string;
  projectName: string;
  landowner: string;
  compensationStatus: string;
  possessionStatus: "pending" | "scheduled" | "field_completed" | "under_review" | "recorded" | "disputed" | "resisted";
  gpsVerified: boolean;
  photosCount: number;
  officer: string;
  timestamp: string;
  hasCertificate: boolean;
  blockingIssues: string[];
};

export const POSSESSIONS: PossessionEntry[] = [
  { parcelId: "MH-PN-005001", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", landowner: "V. Jadhav", compensationStatus: "Paid", possessionStatus: "recorded", gpsVerified: true, photosCount: 6, officer: "Shri. M. Kamble", timestamp: "2026-09-03T14:30:00", hasCertificate: true, blockingIssues: [] },
  { parcelId: "MH-PN-004821", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", landowner: "Rajesh Kumar Patil", compensationStatus: "Pending", possessionStatus: "pending", gpsVerified: false, photosCount: 0, officer: "", timestamp: "", hasCertificate: false, blockingIssues: ["Compensation not completed", "Objection pending"] },
  { parcelId: "MH-PN-007101", projectId: "proj-004", projectName: "Satara Bypass Road", landowner: "Shri. S. Bhosale", compensationStatus: "Payment Initiated", possessionStatus: "scheduled", gpsVerified: false, photosCount: 0, officer: "Shri. M. Kamble", timestamp: "", hasCertificate: false, blockingIssues: ["Payment not confirmed"] },
];

export type RnrEntry = {
  projectId: string;
  projectName: string;
  affectedFamilies: number;
  components: {
    housing: string;
    subsistence: string;
    transport: string;
    livelihood: string;
    employment: string;
    skillTraining: string;
  };
};

export const RNR_DATA: RnrEntry[] = [
  { projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", affectedFamilies: 1240, components: { housing: "in_progress", subsistence: "completed", transport: "in_progress", livelihood: "pending", employment: "pending", skillTraining: "not_applicable" } },
  { projectId: "proj-003", projectName: "Pune Metro Line 3", affectedFamilies: 640, components: { housing: "pending", subsistence: "pending", transport: "not_applicable", livelihood: "pending", employment: "pending", skillTraining: "not_applicable" } },
  { projectId: "proj-008", projectName: "Kothrud Bus Rapid Transit", affectedFamilies: 160, components: { housing: "not_applicable", subsistence: "completed", transport: "not_applicable", livelihood: "completed", employment: "not_applicable", skillTraining: "completed" } },
];

export type GrievanceEntry = {
  id: string;
  projectId: string;
  projectName: string;
  parcelId: string;
  category: "compensation" | "process" | "rehabilitation" | "environmental" | "social" | "other";
  priority: "critical" | "high" | "medium" | "low";
  filedDate: string;
  status: "open" | "under_review" | "awaiting_evidence" | "escalated" | "resolved";
  assignedAuthority: string;
  workflowImpact?: string;
};

export const GRIEVANCES: GrievanceEntry[] = [
  { id: "gri-001", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004821", category: "compensation", priority: "high", filedDate: "2026-07-15", status: "under_review", assignedAuthority: "Tehsildar, Haveli", workflowImpact: "Objection hearing paused — awaiting grievance resolution" },
  { id: "gri-002", projectId: "proj-002", projectName: "Pune Ring Road Phase II", parcelId: "MH-PN-005102", category: "rehabilitation", priority: "critical", filedDate: "2026-08-01", status: "open", assignedAuthority: "District Collector, Pune", workflowImpact: "Compensation approval paused until grievance adjudicated" },
  { id: "gri-003", projectId: "proj-008", projectName: "Kothrud Bus Rapid Transit", parcelId: "MH-PN-008301", category: "process", priority: "medium", filedDate: "2026-08-10", status: "open", assignedAuthority: "Tehsildar, Haveli" },
  { id: "gri-004", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-005001", category: "environmental", priority: "low", filedDate: "2026-08-20", status: "resolved", assignedAuthority: "Tehsildar, Haveli" },
];

export type TehsilData = {
  name: string;
  sdo: string;
  activeCases: number;
  pendingVerification: number;
  overdue: number;
  risk: "critical" | "high" | "medium" | "low";
};

export const TEHSILS: TehsilData[] = [
  { name: "Haveli", sdo: "Smt. Kavita Patil", activeCases: 42, pendingVerification: 8, overdue: 2, risk: "high" },
  { name: "Mulshi", sdo: "Shri. A. Gavhane", activeCases: 28, pendingVerification: 6, overdue: 1, risk: "medium" },
  { name: "Baramati", sdo: "Shri. R. Shinde", activeCases: 18, pendingVerification: 4, overdue: 0, risk: "low" },
  { name: "Shirur", sdo: "Smt. P. More", activeCases: 15, pendingVerification: 3, overdue: 0, risk: "low" },
  { name: "Ambegaon", sdo: "Shri. S. Jadhav", activeCases: 12, pendingVerification: 5, overdue: 1, risk: "medium" },
  { name: "Purandar", sdo: "Shri. V. Kamble", activeCases: 8, pendingVerification: 2, overdue: 0, risk: "low" },
];

export type FieldOfficer = {
  name: string;
  tehsil: string;
  assignedCases: number;
  completed: number;
  pending: number;
  overdue: number;
};

export const FIELD_OFFICERS: FieldOfficer[] = [
  { name: "Shri. M. Kamble", tehsil: "Haveli", assignedCases: 15, completed: 10, pending: 4, overdue: 1 },
  { name: "Smt. L. More", tehsil: "Mulshi", assignedCases: 12, completed: 8, pending: 3, overdue: 1 },
  { name: "Shri. D. Pawar", tehsil: "Baramati", assignedCases: 8, completed: 6, pending: 2, overdue: 0 },
  { name: "Smt. R. Bhatt", tehsil: "Shirur", assignedCases: 6, completed: 4, pending: 2, overdue: 0 },
  { name: "Shri. N. Gaware", tehsil: "Ambegaon", assignedCases: 10, completed: 5, pending: 4, overdue: 1 },
];

export type AuditEntry = {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  project: string;
  parcel?: string;
  previousStage: string;
  newStage: string;
  justification: string;
  amount?: string;
};

export const AUDIT_DATA: AuditEntry[] = [
  { id: "aud-001", timestamp: "2026-09-05T14:32:00", actor: "Dr. Suhas Diwase", role: "District Collector / CALA", action: "Approved Draft Award", project: "NH-544 Pune–Satara Expansion", parcel: "MH-PN-005001", previousStage: "award", newStage: "award", justification: "Field verification evidence reviewed. Valuation source confirmed. Supporting documents verified.", amount: "₹24,12,000" },
  { id: "aud-002", timestamp: "2026-09-04T11:15:00", actor: "Dr. Suhas Diwase", role: "District Collector / CALA", action: "Recorded Objection Decision", project: "NH-544 Pune–Satara Expansion", parcel: "MH-PN-004903", previousStage: "objections_hearing", newStage: "objections_hearing", justification: "Hearing conducted. Evidence reviewed. Objection partially upheld — enhanced compensation directed." },
  { id: "aud-003", timestamp: "2026-09-03T09:45:00", actor: "Dr. Suhas Diwase", role: "District Collector / CALA", action: "Completed Scrutiny", project: "NH-544 Pune–Satara Expansion", previousStage: "scrutiny", newStage: "scrutiny", justification: "All scrutiny checklist items verified. Supporting documents confirmed. Project accepted for SIA." },
  { id: "aud-004", timestamp: "2026-09-02T16:00:00", actor: "Dr. Suhas Diwase", role: "District Collector / CALA", action: "Assigned Field Verification", project: "Pune Metro Line 3", parcel: "MH-PN-006201", previousStage: "field_verification", newStage: "field_verification", justification: "Field verification assigned to Shri. M. Kamble. GPS coordinates to be verified." },
  { id: "aud-005", timestamp: "2026-09-01T10:30:00", actor: "Dr. Suhas Diwase", role: "District Collector / CALA", action: "Generated Section 11 Notification", project: "Kothrud Bus Rapid Transit", previousStage: "preliminary_notification", newStage: "preliminary_notification", justification: "Prerequisites verified. Draft notification generated. Ready for signature and publication." },
  { id: "aud-006", timestamp: "2026-08-30T14:20:00", actor: "Dr. Suhas Diwase", role: "District Collector / CALA", action: "Reviewed SIA Report", project: "NH-544 Pune–Satara Expansion", previousStage: "sia", newStage: "sia", justification: "SIA report reviewed. Social impact assessment complete. No blocking findings." },
  { id: "aud-007", timestamp: "2026-08-28T11:00:00", actor: "Dr. Suhas Diwase", role: "District Collector / CALA", action: "Escalated Case to State", project: "Pune Ring Road Phase II", previousStage: "compensation", newStage: "compensation", justification: "Compensation dispute escalated to State Nodal Officer for coordination." },
  { id: "aud-008", timestamp: "2026-08-25T09:30:00", actor: "Shri. M. Kamble", role: "Field Officer", action: "Submitted Field Verification", project: "NH-544 Pune–Satara Expansion", parcel: "MH-PN-004821", previousStage: "field_verification", newStage: "field_verification", justification: "GPS verified. Ownership confirmed. Area matches records. 5 documents attached." },
  { id: "aud-009", timestamp: "2026-08-20T15:45:00", actor: "Dr. Suhas Diwase", role: "District Collector / CALA", action: "Accepted Incoming Project", project: "Pune Metro Line 3", previousStage: "submission", newStage: "submission", justification: "Project submission reviewed. All documents received. Accepted for scrutiny." },
  { id: "aud-010", timestamp: "2026-08-18T10:00:00", actor: "Dr. Suhas Diwase", role: "District Collector / CALA", action: "Viewed District GIS", project: "District Overview", previousStage: "—", newStage: "—", justification: "Reviewed district-wide project footprints and parcel distribution." },
];

export type ReportEntry = {
  id: string;
  name: string;
  description: string;
  category: "progress" | "financial" | "operational" | "compliance";
};

export const REPORTS: ReportEntry[] = [
  { id: "rpt-001", name: "Acquisition Progress", description: "Overall acquisition progress across Pune district", category: "progress" },
  { id: "rpt-002", name: "Scrutiny Report", description: "Scrutiny completion status for all projects", category: "operational" },
  { id: "rpt-003", name: "SIA Status", description: "Social Impact Assessment progress", category: "compliance" },
  { id: "rpt-004", name: "Notification Report", description: "Section 11 and Declaration notification tracking", category: "compliance" },
  { id: "rpt-005", name: "Objection & Hearing Report", description: "Objection filing, hearing, and decision status", category: "compliance" },
  { id: "rpt-006", name: "Declaration Report", description: "Section 19 Declaration status", category: "compliance" },
  { id: "rpt-007", name: "Field Verification Report", description: "Field verification assignment and completion", category: "operational" },
  { id: "rpt-008", name: "Compensation Report", description: "Compensation assessment, award, and payment", category: "financial" },
  { id: "rpt-009", name: "Award Report", description: "Award approval and status tracking", category: "financial" },
  { id: "rpt-010", name: "Payment Report", description: "Payment initiation and completion status", category: "financial" },
  { id: "rpt-011", name: "Possession Report", description: "Possession recording and evidence status", category: "operational" },
  { id: "rpt-012", name: "R&R Report", description: "Rehabilitation and resettlement progress", category: "operational" },
  { id: "rpt-013", name: "Grievance Report", description: "Grievance filing and resolution status", category: "compliance" },
  { id: "rpt-014", name: "Delay & Risk Report", description: "Overdue cases and risk identification", category: "compliance" },
];

export type DistrictNotification = {
  id: string;
  title: string;
  message: string;
  priority: "critical" | "high" | "medium" | "low";
  timestamp: string;
  read: boolean;
  project?: string;
  parcel?: string;
};

export const DISTRICT_NOTIFICATIONS: DistrictNotification[] = [
  { id: "notif-001", title: "Objection hearing overdue", message: "NH-544 parcel MH-PN-004821 — objection hearing overdue by 5 days.", priority: "critical", timestamp: "2026-09-05T14:30:00", read: false, project: "NH-544 Pune–Satara Expansion", parcel: "MH-PN-004821" },
  { id: "notif-002", title: "SIA deadline approaching", message: "Pune Ring Road Phase II — SIA deadline in 7 days.", priority: "critical", timestamp: "2026-09-05T10:00:00", read: false, project: "Pune Ring Road Phase II" },
  { id: "notif-003", title: "Field verification overdue", message: "Pune–Nashik Highway Spur — field verification overdue for parcel MH-PN-009101.", priority: "high", timestamp: "2026-09-04T16:00:00", read: false, project: "Pune–Nashik Highway Spur", parcel: "MH-PN-009101" },
  { id: "notif-004", title: "Award approved", message: "Award for MH-PN-005001 approved. Payment can be initiated.", priority: "low", timestamp: "2026-09-04T11:15:00", read: true, project: "NH-544 Pune–Satara Expansion", parcel: "MH-PN-005001" },
  { id: "notif-005", title: "State escalation received", message: "State Nodal Officer escalated compensation dispute for MH-PN-005201.", priority: "high", timestamp: "2026-09-03T09:00:00", read: true, project: "Pune Ring Road Phase II", parcel: "MH-PN-005201" },
  { id: "notif-006", title: "Grievance blocking compensation", message: "Grievance gri-002 is blocking compensation approval for Pune Ring Road Phase II.", priority: "high", timestamp: "2026-09-02T14:00:00", read: true, project: "Pune Ring Road Phase II" },
  { id: "notif-007", title: "Notification ready for signature", message: "Section 11 notification for Kothrud BRT ready for Collector signature.", priority: "medium", timestamp: "2026-09-01T10:30:00", read: true, project: "Kothrud Bus Rapid Transit" },
  { id: "notif-008", title: "Monthly report reminder", message: "District monthly acquisition report due by September 18.", priority: "medium", timestamp: "2026-08-28T09:00:00", read: true },
];

export type DeclarationEntry = {
  projectId: string;
  projectName: string;
  prereqScrutiny: boolean;
  prereqSia: boolean;
  prereqSection11: boolean;
  prereqDisclosure: boolean;
  prereqObjectionWindow: boolean;
  prereqObjectionsResolved: boolean;
  unresolvedObjections: number;
  parcelCount: number;
  status: "blocked" | "ready" | "draft" | "finalized" | "published";
};

export const DECLARATIONS: DeclarationEntry[] = [
  { projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", prereqScrutiny: true, prereqSia: true, prereqSection11: true, prereqDisclosure: true, prereqObjectionWindow: true, prereqObjectionsResolved: false, unresolvedObjections: 3, parcelCount: 842, status: "blocked" },
  { projectId: "proj-007", projectName: "Pune–Nashik Highway Spur", prereqScrutiny: true, prereqSia: true, prereqSection11: true, prereqDisclosure: true, prereqObjectionWindow: true, prereqObjectionsResolved: true, unresolvedObjections: 0, parcelCount: 540, status: "ready" },
  { projectId: "proj-008", projectName: "Kothrud Bus Rapid Transit", prereqScrutiny: true, prereqSia: true, prereqSection11: false, prereqDisclosure: false, prereqObjectionWindow: false, prereqObjectionsResolved: true, unresolvedObjections: 2, parcelCount: 120, status: "blocked" },
];

export type ParcelRegisterEntry = {
  id: string;
  ulpin: string;
  projectId: string;
  projectName: string;
  village: string;
  tehsil: string;
  areaHa: number;
  ownerVerification: "verified" | "discrepancy" | "pending";
  currentStage: LifecycleStage;
  compensation: "none" | "assessed" | "awarded" | "paid";
  possession: "none" | "pending" | "recorded" | "disputed";
  risk: "critical" | "high" | "medium" | "low";
};

export const PARCEL_REGISTER: ParcelRegisterEntry[] = [
  { id: "pr-001", ulpin: "MH-PN-004821", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Haveli", tehsil: "Haveli", areaHa: 1.82, ownerVerification: "verified", currentStage: "objections_hearing", compensation: "assessed", possession: "pending", risk: "high" },
  { id: "pr-002", ulpin: "MH-PN-004903", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Mulshi", tehsil: "Mulshi", areaHa: 2.40, ownerVerification: "discrepancy", currentStage: "compensation", compensation: "assessed", possession: "pending", risk: "high" },
  { id: "pr-003", ulpin: "MH-PN-005001", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Haveli", tehsil: "Haveli", areaHa: 2.40, ownerVerification: "verified", currentStage: "award", compensation: "awarded", possession: "recorded", risk: "low" },
  { id: "pr-004", ulpin: "MH-PN-005102", projectId: "proj-002", projectName: "Pune Ring Road Phase II", village: "Mulshi", tehsil: "Mulshi", areaHa: 3.50, ownerVerification: "pending", currentStage: "sia", compensation: "none", possession: "none", risk: "critical" },
  { id: "pr-005", ulpin: "MH-PN-006201", projectId: "proj-003", projectName: "Pune Metro Line 3", village: "Haveli", tehsil: "Haveli", areaHa: 1.20, ownerVerification: "discrepancy", currentStage: "field_verification", compensation: "none", possession: "none", risk: "medium" },
  { id: "pr-006", ulpin: "MH-PN-007101", projectId: "proj-004", projectName: "Satara Bypass Road", village: "Baramati", tehsil: "Baramati", areaHa: 3.20, ownerVerification: "verified", currentStage: "possession", compensation: "awarded", possession: "pending", risk: "low" },
  { id: "pr-007", ulpin: "MH-PN-008301", projectId: "proj-008", projectName: "Kothrud Bus Rapid Transit", village: "Kothrud", tehsil: "Haveli", areaHa: 0.80, ownerVerification: "verified", currentStage: "preliminary_notification", compensation: "none", possession: "none", risk: "low" },
  { id: "pr-008", ulpin: "MH-PN-009101", projectId: "proj-007", projectName: "Pune–Nashik Highway Spur", village: "Ambegaon", tehsil: "Ambegaon", areaHa: 4.10, ownerVerification: "pending", currentStage: "declaration", compensation: "assessed", possession: "none", risk: "medium" },
];

export type StatutoryTimeline = {
  projectId: string;
  projectName: string;
  stage: LifecycleStage;
  startDate: string;
  daysElapsed: number;
  expectedDuration: number;
  remaining: number;
  status: "on_track" | "approaching_deadline" | "overdue" | "blocked";
};

export const STATUTORY_TIMELINES: StatutoryTimeline[] = [
  { projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", stage: "objections_hearing", startDate: "2026-07-12", daysElapsed: 55, expectedDuration: 60, remaining: 5, status: "approaching_deadline" },
  { projectId: "proj-002", projectName: "Pune Ring Road Phase II", stage: "sia", startDate: "2026-03-25", daysElapsed: 165, expectedDuration: 180, remaining: 15, status: "approaching_deadline" },
  { projectId: "proj-003", projectName: "Pune Metro Line 3", stage: "field_verification", startDate: "2026-08-10", daysElapsed: 26, expectedDuration: 30, remaining: 4, status: "on_track" },
  { projectId: "proj-004", projectName: "Satara Bypass Road", stage: "award", startDate: "2026-08-15", daysElapsed: 21, expectedDuration: 30, remaining: 9, status: "on_track" },
  { projectId: "proj-007", projectName: "Pune–Nashik Highway Spur", stage: "declaration", startDate: "2026-08-01", daysElapsed: 35, expectedDuration: 30, remaining: -5, status: "overdue" },
  { projectId: "proj-008", projectName: "Kothrud Bus Rapid Transit", stage: "preliminary_notification", startDate: "2026-08-20", daysElapsed: 16, expectedDuration: 14, remaining: -2, status: "overdue" },
];

export type RiskItem = {
  projectId: string;
  projectName: string;
  stage: LifecycleStage;
  daysInStage: number;
  risk: "critical" | "high" | "medium" | "low";
  reason: string;
  lastActivity: string;
};

export const RISK_DATA: RiskItem[] = [
  { projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", stage: "objections_hearing", daysInStage: 55, risk: "critical", reason: "Objection hearing approaching 60-day deadline — 5 days remaining", lastActivity: "2026-09-05" },
  { projectId: "proj-002", projectName: "Pune Ring Road Phase II", stage: "sia", daysInStage: 165, risk: "critical", reason: "SIA deadline approaching — 15 days remaining of 180-day limit", lastActivity: "2026-09-05" },
  { projectId: "proj-007", projectName: "Pune–Nashik Highway Spur", stage: "declaration", daysInStage: 35, risk: "high", reason: "Declaration overdue — exceeded 30-day SLA", lastActivity: "2026-09-02" },
  { projectId: "proj-006", projectName: "Hinjewadi IT Park Expansion", stage: "land_requirement", daysInStage: 42, risk: "medium", reason: "Land requirement stage exceeding expected timeline", lastActivity: "2026-08-22" },
];
