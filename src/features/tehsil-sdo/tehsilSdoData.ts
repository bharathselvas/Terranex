import type { LifecycleStage } from "@/types/domain";

export type TehsilProfile = {
  id: string;
  name: string;
  district: string;
  state: string;
  sdo: string;
  designation: string;
  contact: string;
  totalVillages: number;
  totalParcels: number;
  activeProjects: number;
};

export const TEHSIL_PROFILE: TehsilProfile = {
  id: "tehsil-haveli",
  name: "Haveli",
  district: "Pune",
  state: "Maharashtra",
  sdo: "Smt. Kavita Patil",
  designation: "Sub-Divisional Officer / Tehsildar — Haveli",
  contact: "sdo.haveli@maharashtra.gov.in",
  totalVillages: 42,
  totalParcels: 2184,
  activeProjects: 8,
};

export type TehsilProject = {
  id: string;
  projectName: string;
  projectCode: string;
  roIa: string;
  collectorAssigned: string;
  villages: string[];
  parcels: number;
  areaHa: number;
  currentStage: LifecycleStage;
  progress: number;
  risk: "critical" | "high" | "medium" | "low" | "on_track";
  lastActivity: string;
  fieldTasks: number;
  verificationPending: number;
  ownershipIssues: number;
};

export const TEHSIL_PROJECTS: TehsilProject[] = [
  { id: "proj-001", projectName: "NH-544 Pune–Satara Expansion", projectCode: "NH-544/PN", roIa: "NHAI", collectorAssigned: "Dr. Suhas Diwase, IAS", villages: ["Hinjewadi", "Wakad", "Manjri"], parcels: 428, areaHa: 820, currentStage: "objections_hearing", progress: 52, risk: "high", lastActivity: "2026-09-05", fieldTasks: 12, verificationPending: 8, ownershipIssues: 5 },
  { id: "proj-002", projectName: "Pune Ring Road Phase II", projectCode: "PRR-02/PN", roIa: "MRIDC", collectorAssigned: "Dr. Suhas Diwase, IAS", villages: ["Hinjewadi", "Wakad"], parcels: 312, areaHa: 580, currentStage: "sia", progress: 38, risk: "critical", lastActivity: "2026-09-05", fieldTasks: 8, verificationPending: 14, ownershipIssues: 7 },
  { id: "proj-003", projectName: "Pune Metro Line 3", projectCode: "PML-3/PN", roIa: "Pune Metro Rail Corp", collectorAssigned: "Dr. Suhas Diwase, IAS", villages: ["Kharadi", "Hadapsar"], parcels: 186, areaHa: 95, currentStage: "field_verification", progress: 62, risk: "on_track", lastActivity: "2026-09-04", fieldTasks: 6, verificationPending: 4, ownershipIssues: 2 },
  { id: "proj-004", projectName: "Satara Bypass Road", projectCode: "SBR/PN", roIa: "NHAI", collectorAssigned: "Dr. Suhas Diwase, IAS", villages: ["Manjri"], parcels: 210, areaHa: 380, currentStage: "award", progress: 82, risk: "low", lastActivity: "2026-08-30", fieldTasks: 2, verificationPending: 1, ownershipIssues: 0 },
  { id: "proj-005", projectName: "Pune–Nashik Highway Spur", projectCode: "PNHS/PN", roIa: "NHAI", collectorAssigned: "Dr. Suhas Diwase, IAS", villages: ["Hinjewadi", "Kharadi"], parcels: 280, areaHa: 480, currentStage: "declaration", progress: 58, risk: "medium", lastActivity: "2026-09-02", fieldTasks: 5, verificationPending: 3, ownershipIssues: 1 },
  { id: "proj-006", projectName: "Hinjewadi IT Park Expansion", projectCode: "HITE/PN", roIa: "MIIDC", collectorAssigned: "Dr. Suhas Diwase, IAS", villages: ["Hinjewadi"], parcels: 142, areaHa: 210, currentStage: "land_requirement", progress: 12, risk: "low", lastActivity: "2026-08-22", fieldTasks: 3, verificationPending: 2, ownershipIssues: 0 },
  { id: "proj-007", projectName: "Kothrud Bus Rapid Transit", projectCode: "KBRT/PN", roIa: "PMPML", collectorAssigned: "Dr. Suhas Diwase, IAS", villages: ["Wakad"], parcels: 86, areaHa: 32, currentStage: "preliminary_notification", progress: 45, risk: "on_track", lastActivity: "2026-09-03", fieldTasks: 4, verificationPending: 2, ownershipIssues: 1 },
  { id: "proj-008", projectName: "Hadapsar Metro Extension", projectCode: "HME/PN", roIa: "Pune Metro Rail Corp", collectorAssigned: "Dr. Suhas Diwase, IAS", villages: ["Hadapsar"], parcels: 140, areaHa: 65, currentStage: "field_verification", progress: 55, risk: "medium", lastActivity: "2026-09-01", fieldTasks: 5, verificationPending: 3, ownershipIssues: 1 },
];

export type VillageData = {
  id: string;
  name: string;
  tehsil: string;
  district: string;
  projectCount: number;
  affectedParcels: number;
  affectedFamilies: number;
  fieldOfficer: string;
  verificationProgress: number;
  openObjections: number;
  risk: "critical" | "high" | "medium" | "low";
  gpsVerified: number;
  totalParcels: number;
};

export const VILLAGES: VillageData[] = [
  { id: "vil-001", name: "Hinjewadi", tehsil: "Haveli", district: "Pune", projectCount: 4, affectedParcels: 428, affectedFamilies: 740, fieldOfficer: "Shri. M. Kamble", verificationProgress: 74, openObjections: 6, risk: "high", gpsVerified: 317, totalParcels: 428 },
  { id: "vil-002", name: "Wakad", tehsil: "Haveli", district: "Pune", projectCount: 3, affectedParcels: 216, affectedFamilies: 380, fieldOfficer: "Smt. L. More", verificationProgress: 91, openObjections: 2, risk: "low", gpsVerified: 197, totalParcels: 216 },
  { id: "vil-003", name: "Manjri", tehsil: "Haveli", district: "Pune", projectCount: 2, affectedParcels: 142, affectedFamilies: 210, fieldOfficer: "Shri. M. Kamble", verificationProgress: 58, openObjections: 4, risk: "medium", gpsVerified: 82, totalParcels: 142 },
  { id: "vil-004", name: "Kharadi", tehsil: "Haveli", district: "Pune", projectCount: 2, affectedParcels: 198, affectedFamilies: 320, fieldOfficer: "Smt. L. More", verificationProgress: 65, openObjections: 3, risk: "medium", gpsVerified: 129, totalParcels: 198 },
  { id: "vil-005", name: "Hadapsar", tehsil: "Haveli", district: "Pune", projectCount: 2, affectedParcels: 160, affectedFamilies: 260, fieldOfficer: "Shri. D. Pawar", verificationProgress: 82, openObjections: 1, risk: "low", gpsVerified: 131, totalParcels: 160 },
  { id: "vil-006", name: "Undri", tehsil: "Haveli", district: "Pune", projectCount: 1, affectedParcels: 92, affectedFamilies: 140, fieldOfficer: "Shri. D. Pawar", verificationProgress: 45, openObjections: 2, risk: "medium", gpsVerified: 41, totalParcels: 92 },
  { id: "vil-007", name: "Kondhwa", tehsil: "Haveli", district: "Pune", projectCount: 1, affectedParcels: 78, affectedFamilies: 120, fieldOfficer: "Smt. L. More", verificationProgress: 88, openObjections: 0, risk: "low", gpsVerified: 69, totalParcels: 78 },
  { id: "vil-008", name: "Wanawadi", tehsil: "Haveli", district: "Pune", projectCount: 1, affectedParcels: 64, affectedFamilies: 95, fieldOfficer: "Shri. D. Pawar", verificationProgress: 72, openObjections: 1, risk: "low", gpsVerified: 46, totalParcels: 64 },
];

export type ParcelData = {
  id: string;
  ulpin: string;
  projectId: string;
  projectName: string;
  village: string;
  areaHa: number;
  ownerName: string;
  ownerStatus: "verified" | "discrepancy" | "pending";
  currentStage: LifecycleStage;
  fieldVerification: "assigned" | "in_progress" | "submitted" | "accepted" | "discrepancy";
  gpsVerified: boolean;
  documentsCount: number;
  compensation: "none" | "assessed" | "awarded" | "paid";
  possession: "none" | "pending" | "ready" | "recorded";
  risk: "critical" | "high" | "medium" | "low";
  lastActivity: string;
};

export const PARCELS: ParcelData[] = [
  { id: "pr-001", ulpin: "MH-PN-004821", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Hinjewadi", areaHa: 1.82, ownerName: "Rajesh Kumar Patil", ownerStatus: "verified", currentStage: "objections_hearing", fieldVerification: "accepted", gpsVerified: true, documentsCount: 5, compensation: "assessed", possession: "pending", risk: "high", lastActivity: "2026-09-05" },
  { id: "pr-002", ulpin: "MH-PN-004903", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Manjri", areaHa: 2.40, ownerName: "Anita Kamble", ownerStatus: "discrepancy", currentStage: "compensation", fieldVerification: "discrepancy", gpsVerified: true, documentsCount: 3, compensation: "assessed", possession: "pending", risk: "high", lastActivity: "2026-09-04" },
  { id: "pr-003", ulpin: "MH-PN-005001", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Hinjewadi", areaHa: 2.40, ownerName: "V. Jadhav", ownerStatus: "verified", currentStage: "award", fieldVerification: "accepted", gpsVerified: true, documentsCount: 4, compensation: "awarded", possession: "recorded", risk: "low", lastActivity: "2026-09-03" },
  { id: "pr-004", ulpin: "MH-PN-005102", projectId: "proj-002", projectName: "Pune Ring Road Phase II", village: "Wakad", areaHa: 3.50, ownerName: "R. Bhosale", ownerStatus: "pending", currentStage: "sia", fieldVerification: "assigned", gpsVerified: false, documentsCount: 1, compensation: "none", possession: "none", risk: "critical", lastActivity: "2026-09-05" },
  { id: "pr-005", ulpin: "MH-PN-006201", projectId: "proj-003", projectName: "Pune Metro Line 3", village: "Kharadi", areaHa: 1.20, ownerName: "Suresh Patil", ownerStatus: "discrepancy", currentStage: "field_verification", fieldVerification: "submitted", gpsVerified: false, documentsCount: 2, compensation: "none", possession: "none", risk: "medium", lastActivity: "2026-09-03" },
  { id: "pr-006", ulpin: "MH-PN-007101", projectId: "proj-004", projectName: "Satara Bypass Road", village: "Manjri", areaHa: 3.20, ownerName: "S. Bhosale", ownerStatus: "verified", currentStage: "possession", fieldVerification: "accepted", gpsVerified: true, documentsCount: 6, compensation: "awarded", possession: "ready", risk: "low", lastActivity: "2026-08-30" },
  { id: "pr-007", ulpin: "MH-PN-008301", projectId: "proj-007", projectName: "Kothrud Bus Rapid Transit", village: "Wakad", areaHa: 0.80, ownerName: "A. Deshmukh", ownerStatus: "verified", currentStage: "preliminary_notification", fieldVerification: "accepted", gpsVerified: true, documentsCount: 4, compensation: "none", possession: "none", risk: "low", lastActivity: "2026-09-03" },
  { id: "pr-008", ulpin: "MH-PN-009101", projectId: "proj-005", projectName: "Pune–Nashik Highway Spur", village: "Hinjewadi", areaHa: 4.10, ownerName: "K. Waghmare", ownerStatus: "pending", currentStage: "declaration", fieldVerification: "in_progress", gpsVerified: false, documentsCount: 1, compensation: "assessed", possession: "none", risk: "medium", lastActivity: "2026-09-02" },
  { id: "pr-009", ulpin: "MH-PN-009201", projectId: "proj-003", projectName: "Pune Metro Line 3", village: "Hadapsar", areaHa: 1.50, ownerName: "P. Shinde", ownerStatus: "verified", currentStage: "field_verification", fieldVerification: "submitted", gpsVerified: true, documentsCount: 3, compensation: "none", possession: "none", risk: "low", lastActivity: "2026-09-04" },
  { id: "pr-010", ulpin: "MH-PN-009301", projectId: "proj-006", projectName: "Hinjewadi IT Park Expansion", village: "Hinjewadi", areaHa: 2.80, ownerName: "R. Bhatt", ownerStatus: "verified", currentStage: "land_requirement", fieldVerification: "assigned", gpsVerified: false, documentsCount: 0, compensation: "none", possession: "none", risk: "low", lastActivity: "2026-08-22" },
  { id: "pr-011", ulpin: "MH-PN-009401", projectId: "proj-008", projectName: "Hadapsar Metro Extension", village: "Hadapsar", areaHa: 0.90, ownerName: "N. Gaware", ownerStatus: "discrepancy", currentStage: "field_verification", fieldVerification: "submitted", gpsVerified: true, documentsCount: 2, compensation: "none", possession: "none", risk: "medium", lastActivity: "2026-09-01" },
  { id: "pr-012", ulpin: "MH-PN-009501", projectId: "proj-002", projectName: "Pune Ring Road Phase II", village: "Wakad", areaHa: 1.80, ownerName: "D. Pawar", ownerStatus: "verified", currentStage: "sia", fieldVerification: "in_progress", gpsVerified: false, documentsCount: 1, compensation: "none", possession: "none", risk: "high", lastActivity: "2026-09-05" },
];

export type FieldOfficerData = {
  id: string;
  name: string;
  village: string;
  tehsil: string;
  activeTasks: number;
  completed: number;
  pending: number;
  overdue: number;
  lastSync: string;
  status: "online" | "offline" | "syncing";
};

export const FIELD_OFFICERS: FieldOfficerData[] = [
  { id: "fo-001", name: "Shri. M. Kamble", village: "Hinjewadi", tehsil: "Haveli", activeTasks: 18, completed: 42, pending: 3, overdue: 1, lastSync: "2026-09-05T14:32:00", status: "online" },
  { id: "fo-002", name: "Smt. L. More", village: "Wakad", tehsil: "Haveli", activeTasks: 12, completed: 38, pending: 2, overdue: 0, lastSync: "2026-09-05T14:28:00", status: "online" },
  { id: "fo-003", name: "Shri. D. Pawar", village: "Kharadi", tehsil: "Haveli", activeTasks: 8, completed: 24, pending: 2, overdue: 1, lastSync: "2026-09-05T13:45:00", status: "offline" },
  { id: "fo-004", name: "Smt. R. Bhatt", village: "Manjri", tehsil: "Haveli", activeTasks: 10, completed: 30, pending: 1, overdue: 0, lastSync: "2026-09-05T14:10:00", status: "online" },
  { id: "fo-005", name: "Shri. N. Gaware", village: "Hadapsar", tehsil: "Haveli", activeTasks: 6, completed: 18, pending: 1, overdue: 0, lastSync: "2026-09-05T12:20:00", status: "syncing" },
];

export type WorkQueueItem = {
  id: string;
  category: "field_verification_review" | "land_record_review" | "ownership_discrepancy" | "collector_request" | "overdue";
  projectName: string;
  parcelId: string;
  parcelVillage: string;
  task: string;
  assignedOfficer: string;
  ageDays: number;
  priority: "critical" | "high" | "medium" | "low";
  status: "pending" | "in_progress" | "submitted" | "overdue";
};

export const WORK_QUEUE: WorkQueueItem[] = [
  { id: "wq-001", category: "ownership_discrepancy", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004903", parcelVillage: "Manjri", task: "Ownership discrepancy — submitted vs recorded owner mismatch", assignedOfficer: "Smt. R. Bhatt", ageDays: 12, priority: "high", status: "in_progress" },
  { id: "wq-002", category: "field_verification_review", projectName: "Pune Metro Line 3", parcelId: "MH-PN-006201", parcelVillage: "Kharadi", task: "Field verification submitted — GPS area discrepancy detected", assignedOfficer: "Shri. D. Pawar", ageDays: 8, priority: "medium", status: "submitted" },
  { id: "wq-003", category: "collector_request", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004821", parcelVillage: "Hinjewadi", task: "Verify ownership documents for objection hearing — due 10 Sep", assignedOfficer: "Shri. M. Kamble", ageDays: 5, priority: "critical", status: "pending" },
  { id: "wq-004", category: "land_record_review", projectName: "Pune Ring Road Phase II", parcelId: "MH-PN-005102", parcelVillage: "Wakad", task: "Land record verification — mutation status pending", assignedOfficer: "Smt. L. More", ageDays: 15, priority: "high", status: "in_progress" },
  { id: "wq-005", category: "field_verification_review", projectName: "Hadapsar Metro Extension", parcelId: "MH-PN-009401", parcelVillage: "Hadapsar", task: "Field verification submitted — ownership discrepancy detected", assignedOfficer: "Shri. N. Gaware", ageDays: 6, priority: "medium", status: "submitted" },
  { id: "wq-006", category: "overdue", projectName: "Pune–Nashik Highway Spur", parcelId: "MH-PN-009101", parcelVillage: "Hinjewadi", task: "Field verification overdue — 3 days past deadline", assignedOfficer: "Shri. M. Kamble", ageDays: 18, priority: "critical", status: "overdue" },
  { id: "wq-007", category: "collector_request", projectName: "Pune Ring Road Phase II", parcelId: "MH-PN-005201", parcelVillage: "Wakad", task: "Collect missing document — 7/12 extract for parcel", assignedOfficer: "Smt. L. More", ageDays: 3, priority: "high", status: "pending" },
  { id: "wq-008", category: "ownership_discrepancy", projectName: "Hadapsar Metro Extension", parcelId: "MH-PN-009401", parcelVillage: "Hadapsar", task: "Ownership claimed by different person — evidence required", assignedOfficer: "Shri. N. Gaware", ageDays: 10, priority: "high", status: "in_progress" },
  { id: "wq-009", category: "land_record_review", projectName: "Pune Metro Line 3", parcelId: "MH-PN-009201", parcelVillage: "Hadapsar", task: "Land area discrepancy — survey vs notification", assignedOfficer: "Shri. D. Pawar", ageDays: 7, priority: "medium", status: "pending" },
  { id: "wq-010", category: "field_verification_review", projectName: "Pune Ring Road Phase II", parcelId: "MH-PN-009501", parcelVillage: "Wakad", task: "Field verification in progress — awaiting GPS data", assignedOfficer: "Smt. L. More", ageDays: 4, priority: "low", status: "in_progress" },
];

export type FieldVerificationSubmission = {
  id: string;
  parcelId: string;
  projectId: string;
  projectName: string;
  village: string;
  officer: string;
  submittedDate: string;
  gpsLat: number;
  gpsLng: number;
  gpsTimestamp: string;
  deviceInfo: string;
  photosCount: number;
  documentsCount: number;
  ownerMatch: boolean;
  areaMatch: boolean;
  recordedArea: number;
  measuredArea: number;
  status: "submitted" | "accepted" | "discrepancy" | "needs_review";
  remarks: string;
  assetsVerified: string[];
};

export const FIELD_VERIFICATION_SUBMISSIONS: FieldVerificationSubmission[] = [
  { id: "fv-001", parcelId: "MH-PN-004821", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Hinjewadi", officer: "Shri. M. Kamble", submittedDate: "2026-09-03", gpsLat: 18.5204, gpsLng: 73.8567, gpsTimestamp: "2026-09-03T14:42:00", deviceInfo: "Samsung Galaxy S24 — FO-042", photosCount: 6, documentsCount: 5, ownerMatch: true, areaMatch: true, recordedArea: 1.82, measuredArea: 1.82, status: "accepted", remarks: "Ownership confirmed. Area matches records. 6 photos attached.", assetsVerified: ["Mango Tree", "Well", "Boundary Wall"] },
  { id: "fv-002", parcelId: "MH-PN-004903", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Manjri", officer: "Smt. R. Bhatt", submittedDate: "2026-09-04", gpsLat: 18.4876, gpsLng: 73.8421, gpsTimestamp: "2026-09-04T11:15:00", deviceInfo: "Samsung Galaxy S23 — FO-038", photosCount: 4, documentsCount: 3, ownerMatch: true, areaMatch: false, recordedArea: 2.40, measuredArea: 2.26, status: "discrepancy", remarks: "Area mismatch detected — 0.14 ha difference. Requires review.", assetsVerified: ["Coconut Tree", "Tube Well"] },
  { id: "fv-003", parcelId: "MH-PN-006201", projectId: "proj-003", projectName: "Pune Metro Line 3", village: "Kharadi", officer: "Shri. D. Pawar", submittedDate: "2026-09-03", gpsLat: 18.5632, gpsLng: 73.9124, gpsTimestamp: "2026-09-03T16:20:00", deviceInfo: "Google Pixel 8 — FO-045", photosCount: 5, documentsCount: 2, ownerMatch: true, areaMatch: false, recordedArea: 1.20, measuredArea: 1.35, status: "discrepancy", remarks: "Area discrepancy — 0.15 ha difference. GPS coordinates verified.", assetsVerified: ["Boundary Wall"] },
  { id: "fv-004", parcelId: "MH-PN-009201", projectId: "proj-003", projectName: "Pune Metro Line 3", village: "Hadapsar", officer: "Shri. N. Gaware", submittedDate: "2026-09-04", gpsLat: 18.5012, gpsLng: 73.8890, gpsTimestamp: "2026-09-04T10:30:00", deviceInfo: "Samsung Galaxy A54 — FO-050", photosCount: 3, documentsCount: 3, ownerMatch: true, areaMatch: true, recordedArea: 1.50, measuredArea: 1.50, status: "accepted", remarks: "Verification complete. Owner and area confirmed.", assetsVerified: ["Pomegranate Tree", "Fence"] },
  { id: "fv-005", parcelId: "MH-PN-009401", projectId: "proj-008", projectName: "Hadapsar Metro Extension", village: "Hadapsar", officer: "Shri. N. Gaware", submittedDate: "2026-09-01", gpsLat: 18.4987, gpsLng: 73.8945, gpsTimestamp: "2026-09-01T13:50:00", deviceInfo: "Samsung Galaxy A54 — FO-050", photosCount: 4, documentsCount: 2, ownerMatch: false, areaMatch: true, recordedArea: 0.90, measuredArea: 0.90, status: "discrepancy", remarks: "Ownership discrepancy — claimed owner differs from records.", assetsVerified: ["Well", "Mango Tree"] },
  { id: "fv-006", parcelId: "MH-PN-009501", projectId: "proj-002", projectName: "Pune Ring Road Phase II", village: "Wakad", officer: "Smt. L. More", submittedDate: "", gpsLat: 0, gpsLng: 0, gpsTimestamp: "", deviceInfo: "", photosCount: 0, documentsCount: 0, ownerMatch: false, areaMatch: false, recordedArea: 1.80, measuredArea: 0, status: "needs_review", remarks: "Field verification in progress — awaiting GPS data.", assetsVerified: [] },
];

export type OwnershipDiscrepancy = {
  id: string;
  parcelId: string;
  projectId: string;
  projectName: string;
  village: string;
  recordedOwner: string;
  claimedOwner: string;
  issue: string;
  ageDays: number;
  status: "new" | "under_review" | "evidence_requested" | "resolved" | "escalated";
  assignedOfficer: string;
  documentsAttached: number;
  fieldVerification: boolean;
};

export const OWNERSHIP_DISCREPANCIES: OwnershipDiscrepancy[] = [
  { id: "od-001", parcelId: "MH-PN-004903", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Manjri", recordedOwner: "Anita Kamble", claimedOwner: "Suresh Kamble (son)", issue: "Inherited rights not reflected in 7/12 extract", ageDays: 12, status: "under_review", assignedOfficer: "Smt. R. Bhatt", documentsAttached: 2, fieldVerification: true },
  { id: "od-002", parcelId: "MH-PN-009401", projectId: "proj-008", projectName: "Hadapsar Metro Extension", village: "Hadapsar", recordedOwner: "N. Gaware", claimedOwner: "Priya Gaware (wife)", issue: "Property transfer not recorded — mutation pending", ageDays: 10, status: "evidence_requested", assignedOfficer: "Shri. N. Gaware", documentsAttached: 1, fieldVerification: true },
  { id: "od-003", parcelId: "MH-PN-006201", projectId: "proj-003", projectName: "Pune Metro Line 3", village: "Kharadi", recordedOwner: "Suresh Patil", claimedOwner: "Suresh Patil", issue: "Name spelling discrepancy — survey vs revenue records", ageDays: 8, status: "new", assignedOfficer: "Shri. D. Pawar", documentsAttached: 0, fieldVerification: false },
  { id: "od-004", parcelId: "MH-PN-009101", projectId: "proj-005", projectName: "Pune–Nashik Highway Spur", village: "Hinjewadi", recordedOwner: "K. Waghmare", claimedOwner: "K. Waghmare", issue: "Joint ownership — co-owners not reflected in notification", ageDays: 15, status: "escalated", assignedOfficer: "Shri. M. Kamble", documentsAttached: 3, fieldVerification: false },
  { id: "od-005", parcelId: "MH-PN-005102", projectId: "proj-002", projectName: "Pune Ring Road Phase II", village: "Wakad", recordedOwner: "R. Bhosale", claimedOwner: "Rajendra Bhosale", issue: "Father-son dispute — succession not updated", ageDays: 18, status: "under_review", assignedOfficer: "Smt. L. More", documentsAttached: 1, fieldVerification: false },
];

export type LandRecordEntry = {
  id: string;
  ulpin: string;
  surveyNumber: string;
  village: string;
  recordedOwner: string;
  areaHa: number;
  classification: string;
  mutationStatus: "complete" | "pending" | "disputed";
  recordDate: string;
  fieldMatch: boolean;
};

export const LAND_RECORDS: LandRecordEntry[] = [
  { id: "lr-001", ulpin: "MH-PN-004821", surveyNumber: "HIN-42/1", village: "Hinjewadi", recordedOwner: "Rajesh Kumar Patil", areaHa: 1.82, classification: "Agricultural", mutationStatus: "complete", recordDate: "2025-03-15", fieldMatch: true },
  { id: "lr-002", ulpin: "MH-PN-004903", surveyNumber: "MAN-18/3", village: "Manjri", recordedOwner: "Anita Kamble", areaHa: 2.40, classification: "Agricultural", mutationStatus: "pending", recordDate: "2024-11-20", fieldMatch: false },
  { id: "lr-003", ulpin: "MH-PN-005001", surveyNumber: "HIN-42/2", village: "Hinjewadi", recordedOwner: "V. Jadhav", areaHa: 2.40, classification: "Agricultural", mutationStatus: "complete", recordDate: "2025-01-10", fieldMatch: true },
  { id: "lr-004", ulpin: "MH-PN-005102", surveyNumber: "WAK-07/1", village: "Wakad", recordedOwner: "R. Bhosale", areaHa: 3.50, classification: "Agricultural", mutationStatus: "disputed", recordDate: "2023-09-05", fieldMatch: false },
  { id: "lr-005", ulpin: "MH-PN-006201", surveyNumber: "KHA-22/4", village: "Kharadi", recordedOwner: "Suresh Patil", areaHa: 1.20, classification: "Agricultural", mutationStatus: "complete", recordDate: "2025-06-12", fieldMatch: true },
  { id: "lr-006", ulpin: "MH-PN-007101", surveyNumber: "MAN-31/2", village: "Manjri", recordedOwner: "S. Bhosale", areaHa: 3.20, classification: "Agricultural", mutationStatus: "complete", recordDate: "2025-02-28", fieldMatch: true },
  { id: "lr-007", ulpin: "MH-PN-008301", surveyNumber: "WAK-15/1", village: "Wakad", recordedOwner: "A. Deshmukh", areaHa: 0.80, classification: "Residential", mutationStatus: "complete", recordDate: "2024-08-18", fieldMatch: true },
  { id: "lr-008", ulpin: "MH-PN-009101", surveyNumber: "HIN-55/3", village: "Hinjewadi", recordedOwner: "K. Waghmare", areaHa: 4.10, classification: "Agricultural", mutationStatus: "pending", recordDate: "2024-07-22", fieldMatch: false },
  { id: "lr-009", ulpin: "MH-PN-009201", surveyNumber: "HAD-09/2", village: "Hadapsar", recordedOwner: "P. Shinde", areaHa: 1.50, classification: "Agricultural", mutationStatus: "complete", recordDate: "2025-04-10", fieldMatch: true },
  { id: "lr-010", ulpin: "MH-PN-009401", surveyNumber: "HAD-12/1", village: "Hadapsar", recordedOwner: "N. Gaware", areaHa: 0.90, classification: "Agricultural", mutationStatus: "pending", recordDate: "2024-05-15", fieldMatch: false },
];

export type DistrictRequest = {
  id: string;
  projectName: string;
  parcelId: string;
  village: string;
  requestType: string;
  description: string;
  dueDate: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "pending" | "accepted" | "in_progress" | "submitted" | "escalated";
  assignedOfficer: string;
};

export const DISTRICT_REQUESTS: DistrictRequest[] = [
  { id: "dr-001", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004821", village: "Hinjewadi", requestType: "Verify Ownership", description: "Verify ownership documents for objection hearing — MH-PN-004821", dueDate: "2026-09-10", priority: "critical", status: "pending", assignedOfficer: "Shri. M. Kamble" },
  { id: "dr-002", projectName: "Pune Ring Road Phase II", parcelId: "MH-PN-005102", village: "Wakad", requestType: "Collect Missing Document", description: "Collect 7/12 extract for parcel MH-PN-005102 — mutation pending", dueDate: "2026-09-12", priority: "high", status: "in_progress", assignedOfficer: "Smt. L. More" },
  { id: "dr-003", projectName: "Pune Metro Line 3", parcelId: "MH-PN-006201", village: "Kharadi", requestType: "Reverify Area", description: "Re-verify land area — 0.15 ha discrepancy detected in field measurement", dueDate: "2026-09-15", priority: "medium", status: "accepted", assignedOfficer: "Shri. D. Pawar" },
  { id: "dr-004", projectName: "Hadapsar Metro Extension", parcelId: "MH-PN-009401", village: "Hadapsar", requestType: "Verify Ownership", description: "Verify ownership — claimed owner differs from revenue records", dueDate: "2026-09-14", priority: "high", status: "pending", assignedOfficer: "Shri. N. Gaware" },
  { id: "dr-005", projectName: "Pune–Nashik Highway Spur", parcelId: "MH-PN-009101", village: "Hinjewadi", requestType: "Reassign Field Officer", description: "Reassign field officer — current officer overdue on task", dueDate: "2026-09-08", priority: "critical", status: "escalated", assignedOfficer: "Shri. M. Kamble" },
  { id: "dr-006", projectName: "Satara Bypass Road", parcelId: "MH-PN-007101", village: "Manjri", requestType: "Prepare Possession File", description: "Prepare possession readiness file for MH-PN-007101", dueDate: "2026-09-20", priority: "medium", status: "accepted", assignedOfficer: "Smt. R. Bhatt" },
];

export type ObjectionSupportEntry = {
  id: string;
  projectId: string;
  projectName: string;
  parcelId: string;
  village: string;
  category: "ownership" | "measurement" | "compensation" | "procedural" | "other";
  filedDate: string;
  status: "new" | "evidence_collection" | "land_record_check" | "hearing_prep" | "submitted_to_collector";
  assignedTask: string;
  evidenceCollected: number;
  evidenceRequired: number;
};

export const OBJECTION_SUPPORT: ObjectionSupportEntry[] = [
  { id: "os-001", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004821", village: "Hinjewadi", category: "ownership", filedDate: "2026-07-01", status: "hearing_prep", assignedTask: "Prepare ownership evidence for hearing — 10 Sep", evidenceCollected: 4, evidenceRequired: 5 },
  { id: "os-002", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", parcelId: "MH-PN-004903", village: "Manjri", category: "measurement", filedDate: "2026-07-10", status: "evidence_collection", assignedTask: "Collect land measurement evidence — discrepancy case", evidenceCollected: 2, evidenceRequired: 4 },
  { id: "os-003", projectId: "proj-002", projectName: "Pune Ring Road Phase II", parcelId: "MH-PN-005102", village: "Wakad", category: "compensation", filedDate: "2026-08-01", status: "land_record_check", assignedTask: "Verify land records for compensation dispute", evidenceCollected: 1, evidenceRequired: 3 },
  { id: "os-004", projectId: "proj-008", projectName: "Hadapsar Metro Extension", parcelId: "MH-PN-009401", village: "Hadapsar", category: "ownership", filedDate: "2026-08-10", status: "evidence_collection", assignedTask: "Collect ownership transfer documents — mutation pending", evidenceCollected: 0, evidenceRequired: 3 },
];

export type CompensationSupportEntry = {
  parcelId: string;
  projectId: string;
  projectName: string;
  village: string;
  owner: string;
  landArea: number;
  classification: string;
  marketValueSource: string;
  assetsVerified: boolean;
  areaVerified: boolean;
  classificationVerified: boolean;
  indicativeAmount: string;
  verificationStatus: "pending" | "submitted" | "awaiting_collector";
};

export const COMPENSATION_SUPPORT: CompensationSupportEntry[] = [
  { parcelId: "MH-PN-004821", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Hinjewadi", owner: "Rajesh Kumar Patil", landArea: 1.82, classification: "Agricultural", marketValueSource: "Circle Rate 2025-26", assetsVerified: true, areaVerified: true, classificationVerified: true, indicativeAmount: "₹18.42L", verificationStatus: "submitted" },
  { parcelId: "MH-PN-004903", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Manjri", owner: "Anita Kamble", landArea: 2.40, classification: "Agricultural", marketValueSource: "Circle Rate 2025-26", assetsVerified: true, areaVerified: false, classificationVerified: true, indicativeAmount: "₹22.17L", verificationStatus: "pending" },
  { parcelId: "MH-PN-005001", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", village: "Hinjewadi", owner: "V. Jadhav", landArea: 2.40, classification: "Agricultural", marketValueSource: "Circle Rate 2025-26", assetsVerified: true, areaVerified: true, classificationVerified: true, indicativeAmount: "₹24.12L", verificationStatus: "submitted" },
  { parcelId: "MH-PN-007101", projectId: "proj-004", projectName: "Satara Bypass Road", village: "Manjri", owner: "S. Bhosale", landArea: 3.20, classification: "Agricultural", marketValueSource: "Circle Rate 2025-26", assetsVerified: true, areaVerified: true, classificationVerified: true, indicativeAmount: "₹26.20L", verificationStatus: "awaiting_collector" },
];

export type PossessionReadinessEntry = {
  parcelId: string;
  projectName: string;
  village: string;
  compensationStatus: string;
  fieldVerification: string;
  openDiscrepancy: string;
  blockingGrievance: string;
  readiness: "ready" | "not_ready" | "partial";
};

export const POSSESSION_READINESS: PossessionReadinessEntry[] = [
  { parcelId: "MH-PN-005001", projectName: "NH-544 Pune–Satara Expansion", village: "Hinjewadi", compensationStatus: "Completed", fieldVerification: "Completed", openDiscrepancy: "None", blockingGrievance: "None", readiness: "ready" },
  { parcelId: "MH-PN-004821", projectName: "NH-544 Pune–Satara Expansion", village: "Hinjewadi", compensationStatus: "Assessed", fieldVerification: "Completed", openDiscrepancy: "None", blockingGrievance: "Objection pending", readiness: "not_ready" },
  { parcelId: "MH-PN-007101", projectName: "Satara Bypass Road", village: "Manjri", compensationStatus: "Awarded", fieldVerification: "Completed", openDiscrepancy: "None", blockingGrievance: "None", readiness: "ready" },
  { parcelId: "MH-PN-004903", projectName: "NH-544 Pune–Satara Expansion", village: "Manjri", compensationStatus: "Assessed", fieldVerification: "Discrepancy", openDiscrepancy: "Area mismatch 0.14 ha", blockingGrievance: "None", readiness: "not_ready" },
  { parcelId: "MH-PN-008301", projectName: "Kothrud Bus Rapid Transit", village: "Wakad", compensationStatus: "Pending", fieldVerification: "Completed", openDiscrepancy: "None", blockingGrievance: "None", readiness: "partial" },
];

export type RnrFieldEntry = {
  familyId: string;
  village: string;
  parcelId: string;
  projectName: string;
  householdSize: number;
  housing: string;
  livelihood: string;
  transport: string;
  employment: string;
  skillTraining: string;
  specialSupport: string;
  status: "not_collected" | "collected" | "under_review" | "submitted";
};

export const RNR_FIELD_DATA: RnrFieldEntry[] = [
  { familyId: "FAM-001", village: "Hinjewadi", parcelId: "MH-PN-004821", projectName: "NH-544 Pune–Satara Expansion", householdSize: 5, housing: "Own house — pucca", livelihood: "Agriculture + dairy", transport: "Bicycle + tractor", employment: "Agricultural labor", skillTraining: "Not applicable", specialSupport: "None", status: "submitted" },
  { familyId: "FAM-002", village: "Manjri", parcelId: "MH-PN-004903", projectName: "NH-544 Pune–Satara Expansion", householdSize: 4, housing: "Own house — semi-pucca", livelihood: "Agriculture", transport: "Motorcycle", employment: "Farm worker", skillTraining: "Requested — tailoring", specialSupport: "Elderly parent", status: "collected" },
  { familyId: "FAM-003", village: "Wakad", parcelId: "MH-PN-005102", projectName: "Pune Ring Road Phase II", householdSize: 6, housing: "Rented — kuccha", livelihood: "Small shop", transport: "Bicycle", employment: "Shop owner", skillTraining: "Not applicable", specialSupport: "None", status: "under_review" },
  { familyId: "FAM-004", village: "Kharadi", parcelId: "MH-PN-006201", projectName: "Pune Metro Line 3", householdSize: 3, housing: "Own house — pucca", livelihood: "Government job", transport: "Motorcycle", employment: "Salaried", skillTraining: "Not applicable", specialSupport: "None", status: "submitted" },
  { familyId: "FAM-005", village: "Hadapsar", parcelId: "MH-PN-009401", projectName: "Hadapsar Metro Extension", householdSize: 5, housing: "Own house — semi-pucca", livelihood: "Agriculture + poultry", transport: "Bicycle", employment: "Farm + poultry", skillTraining: "Requested — carpentry", specialSupport: "Disabled child", status: "collected" },
  { familyId: "FAM-006", village: "Hinjewadi", parcelId: "MH-PN-009101", projectName: "Pune–Nashik Highway Spur", householdSize: 4, housing: "Own house — pucca", livelihood: "Agriculture", transport: "Motorcycle", employment: "Agricultural labor", skillTraining: "Not applicable", specialSupport: "None", status: "not_collected" },
];

export type TehsilAuditEntry = {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  project: string;
  parcel?: string;
  village: string;
  previousState: string;
  newState: string;
  details: string;
};

export const TEHSIL_AUDIT: TehsilAuditEntry[] = [
  { id: "ta-001", timestamp: "2026-09-05T15:14:00", actor: "Smt. Kavita Patil", role: "SDO / Tehsildar", action: "Submitted Ownership Verification", project: "NH-544 Pune–Satara Expansion", parcel: "MH-PN-004821", village: "Hinjewadi", previousState: "Under Review", newState: "Evidence matches submitted owner", details: "Ownership verified. Forwarded to District Collector / CALA." },
  { id: "ta-002", timestamp: "2026-09-05T14:32:00", actor: "Shri. M. Kamble", role: "Field Officer", action: "Submitted Field Verification", project: "NH-544 Pune–Satara Expansion", parcel: "MH-PN-004821", village: "Hinjewadi", previousState: "Assigned", newState: "Verification Complete", details: "GPS verified. Owner confirmed. Area matches. 6 photos attached." },
  { id: "ta-003", timestamp: "2026-09-05T11:20:00", actor: "Smt. Kavita Patil", role: "SDO / Tehsildar", action: "Assigned Field Task", project: "Pune Ring Road Phase II", parcel: "MH-PN-009501", village: "Wakad", previousState: "Unassigned", newState: "Assigned to Smt. L. More", details: "Field verification assigned. GPS coordinates to be captured." },
  { id: "ta-004", timestamp: "2026-09-04T16:45:00", actor: "Shri. D. Pawar", role: "Field Officer", action: "Submitted Field Verification", project: "Pune Metro Line 3", parcel: "MH-PN-006201", village: "Kharadi", previousState: "In Progress", newState: "Discrepancy Detected", details: "Area mismatch: 1.20 ha recorded vs 1.35 ha measured. 0.15 ha difference." },
  { id: "ta-005", timestamp: "2026-09-04T10:15:00", actor: "Smt. Kavita Patil", role: "SDO / Tehsildar", action: "Forwarded to Collector", project: "NH-544 Pune–Satara Expansion", parcel: "MH-PN-005001", village: "Hinjewadi", previousState: "Verified", newState: "Forwarded to District Collector / CALA", details: "All verification complete. Award approval recommended." },
  { id: "ta-006", timestamp: "2026-09-03T09:30:00", actor: "Shri. M. Kamble", role: "Field Officer", action: "Started Field Verification", project: "Pune–Nashik Highway Spur", parcel: "MH-PN-009101", village: "Hinjewadi", previousState: "Assigned", newState: "In Progress", details: "Field verification initiated. GPS coordinates being captured." },
  { id: "ta-007", timestamp: "2026-09-02T14:00:00", actor: "Smt. Kavita Patil", role: "SDO / Tehsildar", action: "Reviewed Land Record", project: "Pune Ring Road Phase II", parcel: "MH-PN-005102", village: "Wakad", previousState: "Pending Review", newState: "Mutation Status: Disputed", details: "Land record discrepancy — father-son succession dispute. Mutation not updated." },
  { id: "ta-008", timestamp: "2026-09-01T11:00:00", actor: "Shri. N. Gaware", role: "Field Officer", action: "Submitted Field Verification", project: "Hadapsar Metro Extension", parcel: "MH-PN-009401", village: "Hadapsar", previousState: "In Progress", newState: "Ownership Discrepancy", details: "Ownership mismatch — claimed owner (wife) differs from records (husband). Mutation pending." },
];

export type TehsilReportEntry = {
  id: string;
  name: string;
  description: string;
  category: "verification" | "land_record" | "field" | "objection" | "possession" | "delay";
};

export const TEHSIL_REPORTS: TehsilReportEntry[] = [
  { id: "tr-001", name: "Parcel Verification Status", description: "Verification progress across all parcels in Haveli Tehsil", category: "verification" },
  { id: "tr-002", name: "Land Record Status", description: "Land record verification and mutation status", category: "land_record" },
  { id: "tr-003", name: "Ownership Discrepancies", description: "Cases with ownership mismatch — status and resolution", category: "verification" },
  { id: "tr-004", name: "Field Verification Progress", description: "Field officer task completion and discrepancy rate", category: "field" },
  { id: "tr-005", name: "Village Progress", description: "Village-wise acquisition and verification progress", category: "field" },
  { id: "tr-006", name: "Objection Support", description: "Local objection evidence collection status", category: "objection" },
  { id: "tr-007", name: "Possession Readiness", description: "Parcels ready for possession — blocker analysis", category: "possession" },
  { id: "tr-008", name: "R&R Field Data", description: "R&R data collection status across affected families", category: "field" },
  { id: "tr-009", name: "Delay Report", description: "Overdue tasks and approaching deadlines", category: "delay" },
];

export type TehsilNotification = {
  id: string;
  title: string;
  message: string;
  priority: "critical" | "high" | "medium" | "low";
  timestamp: string;
  read: boolean;
  project?: string;
  parcel?: string;
};

export const TEHSIL_NOTIFICATIONS: TehsilNotification[] = [
  { id: "tn-001", title: "Field verification overdue", message: "MH-PN-009101 — field verification overdue by 3 days.", priority: "critical", timestamp: "2026-09-05T14:30:00", read: false, project: "Pune–Nashik Highway Spur", parcel: "MH-PN-009101" },
  { id: "tn-002", title: "Collector request — urgent", message: "Verify ownership for MH-PN-004821 — due 10 Sep.", priority: "critical", timestamp: "2026-09-05T10:00:00", read: false, project: "NH-544 Pune–Satara Expansion", parcel: "MH-PN-004821" },
  { id: "tn-003", title: "Ownership discrepancy escalated", message: "MH-PN-009101 — joint ownership dispute escalated to Collector.", priority: "high", timestamp: "2026-09-04T16:00:00", read: false, project: "Pune–Nashik Highway Spur", parcel: "MH-PN-009101" },
  { id: "tn-004", title: "Field verification accepted", message: "MH-PN-009201 — verification accepted. Ready for Collector review.", priority: "low", timestamp: "2026-09-04T11:15:00", read: true, project: "Pune Metro Line 3", parcel: "MH-PN-009201" },
  { id: "tn-005", title: "Collector request received", message: "Prepare possession file for MH-PN-007101 — Satara Bypass Road.", priority: "medium", timestamp: "2026-09-03T09:00:00", read: true, project: "Satara Bypass Road", parcel: "MH-PN-007101" },
  { id: "tn-006", title: "Area discrepancy detected", message: "MH-PN-006201 — 0.15 ha difference between recorded and measured area.", priority: "high", timestamp: "2026-09-03T16:20:00", read: true, project: "Pune Metro Line 3", parcel: "MH-PN-006201" },
];
