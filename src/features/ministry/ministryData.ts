import type { LifecycleStage } from "@/types/domain";

// ── Ministry Profile ──
export type MinistryProfile = {
  id: string;
  name: string;
  code: string;
  nodalOfficer: string;
  contact: string;
  activeProjects: number;
  statesCovered: number;
  organizations: number;
};

export const MINISTRY_PROFILE: MinistryProfile = {
  id: "morth",
  name: "Ministry of Road Transport & Highways",
  code: "MoRTH",
  nodalOfficer: "Shri. Rajiv Malhotra, IAS",
  contact: "nodal.morth@gov.in | +91-11-2371-XXXX",
  activeProjects: 42,
  statesCovered: 11,
  organizations: 8,
};

// ── Ministry KPI Data ──
export type MinistryKPI = {
  label: string;
  value: string;
  subtext: string;
  color?: string;
};

export const MINISTRY_KPIS: MinistryKPI[] = [
  { label: "Active Projects", value: "42", subtext: "Across 11 states", color: "#1A3560" },
  { label: "States Involved", value: "11", subtext: "Maharashtra, Gujarat, TN, UP, etc.", color: "#1A3560" },
  { label: "Districts Involved", value: "67", subtext: "Active acquisition districts", color: "#243E6B" },
  { label: "Total Parcels", value: "28,421", subtext: "Under acquisition process", color: "#243E6B" },
  { label: "Acquisition Area", value: "12,842 ha", subtext: "Ministry portfolio total", color: "#2E4A7A" },
  { label: "Compensation Assessed", value: "₹ 1,284 Cr", subtext: "Across all stages", color: "#0F7A5A" },
  { label: "Compensation Disbursed", value: "₹ 1,012 Cr", subtext: "78.8% disbursement rate", color: "#0F7A5A" },
  { label: "Affected Families", value: "8,421", subtext: "Registered in system", color: "#2E4A7A" },
  { label: "R&R Pending", value: "1,182", subtext: "Rehabilitation pending", color: "#9A6B00" },
  { label: "Delayed Projects", value: "7", subtext: "Exceeding statutory timelines", color: "#B42318" },
];

// ── Ministry Pipeline Data ──
export type MinistryPipelineStage = {
  stage: LifecycleStage;
  count: number;
  parcels: number;
  percentage: number;
  risk: "none" | "low" | "medium" | "high";
};

export const MINISTRY_PIPELINE: MinistryPipelineStage[] = [
  { stage: "project_proposal", count: 3, parcels: 1200, percentage: 7.1, risk: "none" },
  { stage: "land_requirement", count: 4, parcels: 1800, percentage: 9.5, risk: "none" },
  { stage: "gis_identification", count: 3, parcels: 2100, percentage: 7.1, risk: "none" },
  { stage: "submission", count: 2, parcels: 900, percentage: 4.8, risk: "none" },
  { stage: "scrutiny", count: 5, parcels: 3200, percentage: 11.9, risk: "medium" },
  { stage: "sia", count: 4, parcels: 2800, percentage: 9.5, risk: "high" },
  { stage: "preliminary_notification", count: 3, parcels: 1600, percentage: 7.1, risk: "none" },
  { stage: "public_disclosure", count: 2, parcels: 800, percentage: 4.8, risk: "none" },
  { stage: "objections_hearing", count: 3, parcels: 1400, percentage: 7.1, risk: "medium" },
  { stage: "declaration", count: 2, parcels: 1100, percentage: 4.8, risk: "none" },
  { stage: "field_verification", count: 3, parcels: 1800, percentage: 7.1, risk: "low" },
  { stage: "compensation", count: 4, parcels: 2600, percentage: 9.5, risk: "medium" },
  { stage: "award", count: 2, parcels: 1200, percentage: 4.8, risk: "none" },
  { stage: "payment", count: 3, parcels: 1500, percentage: 7.1, risk: "low" },
  { stage: "possession", count: 2, parcels: 800, percentage: 4.8, risk: "none" },
  { stage: "r_and_r", count: 1, parcels: 200, percentage: 2.4, risk: "high" },
  { stage: "closed", count: 8, parcels: 920, percentage: 19.0, risk: "none" },
];

// ── Ministry Projects ──
export type MinistryProject = {
  id: string;
  projectName: string;
  implementingAgency: string;
  state: string;
  district: string;
  parcels: number;
  currentStage: LifecycleStage;
  progress: number;
  risk: "critical" | "high" | "medium" | "low" | "on_track";
  lastActivity: string;
  budgetCr: number;
  status: "active" | "completed" | "on_hold";
};

export const MINISTRY_PROJECTS: MinistryProject[] = [
  { id: "PRJ-NH-544", projectName: "NH-544 Expansion (Kanyakumari–Bengaluru)", implementingAgency: "NHAI", state: "Tamil Nadu", district: "Kanyakumari", parcels: 842, currentStage: "compensation", progress: 72, risk: "medium", lastActivity: "2026-09-05", budgetCr: 4200, status: "active" },
  { id: "PRJ-PUNE-RR", projectName: "Pune Ring Road — Phase 2", implementingAgency: "NHAI", state: "Maharashtra", district: "Pune", parcels: 1240, currentStage: "field_verification", progress: 65, risk: "high", lastActivity: "2026-09-03", budgetCr: 3420, status: "active" },
  { id: "PRJ-UDHNA", projectName: "Udhna–Bardoli Expressway", implementingAgency: "NHAI", state: "Gujarat", district: "Surat", parcels: 420, currentStage: "scrutiny", progress: 28, risk: "medium", lastActivity: "2026-08-25", budgetCr: 1860, status: "active" },
  { id: "PRJ-UP-EXPRESS", projectName: "Lucknow–Agra Expressway Extension", implementingAgency: "NHAI", state: "Uttar Pradesh", district: "Agra", parcels: 640, currentStage: "submission", progress: 22, risk: "low", lastActivity: "2026-08-22", budgetCr: 3100, status: "active" },
  { id: "PRJ-NH-44", projectName: "NH-44 Four-Laning (Srinagar–Jammu)", implementingAgency: "NHAI", state: "Jammu & Kashmir", district: "Jammu", parcels: 520, currentStage: "sia", progress: 35, risk: "high", lastActivity: "2026-08-28", budgetCr: 2800, status: "active" },
  { id: "PRJ-CHENNAI-METRO", projectName: "Chennai Metro Phase 3", implementingAgency: "CMRL", state: "Tamil Nadu", district: "Chennai", parcels: 420, currentStage: "declaration", progress: 58, risk: "medium", lastActivity: "2026-09-01", budgetCr: 8900, status: "active" },
  { id: "PRJ-DELHI-METRO", projectName: "Delhi Metro Phase 4 Extension", implementingAgency: "DMRC", state: "Delhi", district: "New Delhi", parcels: 180, currentStage: "award", progress: 85, risk: "on_track", lastActivity: "2026-09-05", budgetCr: 4500, status: "active" },
  { id: "PRJ-MUMBAI-ATL", projectName: "Mumbai–Nagpur Expressway (Samruddhi)", implementingAgency: "MSRDC", state: "Maharashtra", district: "Nagpur", parcels: 1800, currentStage: "payment", progress: 78, risk: "on_track", lastActivity: "2026-09-04", budgetCr: 5200, status: "active" },
  { id: "PRJ-BENGALURU-METRO", projectName: "Bengaluru Suburban Rail", implementingAgency: "K-RIDE", state: "Karnataka", district: "Bengaluru Urban", parcels: 310, currentStage: "field_verification", progress: 62, risk: "on_track", lastActivity: "2026-09-03", budgetCr: 15200, status: "active" },
  { id: "PRJ-NH-66", projectName: "NH-66 Coastal Highway (Goa Section)", implementingAgency: "NHAI", state: "Goa", district: "South Goa", parcels: 280, currentStage: "preliminary_notification", progress: 45, risk: "low", lastActivity: "2026-08-30", budgetCr: 1200, status: "active" },
  { id: "PRJ-KOLKATA-METRO", projectName: "Kolkata Metro Line 6 Extension", implementingAgency: "KMRC", state: "West Bengal", district: "Kolkata", parcels: 160, currentStage: "objections_hearing", progress: 52, risk: "medium", lastActivity: "2026-09-02", budgetCr: 3200, status: "active" },
  { id: "PRJ-NH-19", projectName: "NH-19 Six-Laning (Kolkata–Puri)", implementingAgency: "NHAI", state: "West Bengal", district: "Howrah", parcels: 480, currentStage: "compensation", progress: 70, risk: "medium", lastActivity: "2026-08-31", budgetCr: 2100, status: "active" },
];

// ── Ministry Work Queue ──
export type WorkQueueItem = {
  id: string;
  projectId: string;
  projectName: string;
  category: "pending_review" | "clarification_required" | "awaiting_state" | "awaiting_agency" | "escalation" | "document_attention" | "timeline_risk";
  state: string;
  district: string;
  issue: string;
  priority: "high" | "medium" | "low";
  assignedTo: string;
  dueDate: string;
  createdDate: string;
};

export const WORK_QUEUE: WorkQueueItem[] = [
  { id: "wq-001", projectId: "PRJ-NH-544", projectName: "NH-544 Expansion", category: "clarification_required", state: "Tamil Nadu", district: "Kanyakumari", issue: "Land schedule mismatch — parcels 33/4A & 33/4B require verification", priority: "high", assignedTo: "State Nodal Officer, Tamil Nadu", dueDate: "2026-09-10", createdDate: "2026-09-03" },
  { id: "wq-002", projectId: "PRJ-PUNE-RR", projectName: "Pune Ring Road Phase 2", category: "awaiting_state", state: "Maharashtra", district: "Pune", issue: "Scrutiny status update pending — field verification outstanding", priority: "high", assignedTo: "State Nodal Officer, Maharashtra", dueDate: "2026-09-08", createdDate: "2026-09-01" },
  { id: "wq-003", projectId: "PRJ-NH-44", projectName: "NH-44 Srinagar–Jammu", category: "escalation", state: "Jammu & Kashmir", district: "Jammu", issue: "SIA deadline approaching — public consultation pending in 3 villages", priority: "high", assignedTo: "SIA Expert Group", dueDate: "2026-09-15", createdDate: "2026-08-28" },
  { id: "wq-004", projectId: "PRJ-CHENNAI-METRO", projectName: "Chennai Metro Phase 3", category: "document_attention", state: "Tamil Nadu", district: "Chennai", issue: "SIA report version mismatch — v0.3 vs v1.2 in system", priority: "medium", assignedTo: "SIA Expert Group", dueDate: "2026-09-12", createdDate: "2026-09-01" },
  { id: "wq-005", projectId: "PRJ-KOLKATA-METRO", projectName: "Kolkata Metro Line 6", category: "pending_review", state: "West Bengal", district: "Kolkata", issue: "3 new objections filed — hearing scheduling required", priority: "medium", assignedTo: "Collector, Kolkata", dueDate: "2026-09-20", createdDate: "2026-09-02" },
  { id: "wq-006", projectId: "PRJ-MUMBAI-ATL", projectName: "Mumbai–Nagpur Expressway", category: "awaiting_agency", state: "Maharashtra", district: "Nagpur", issue: "Possession certificates pending for 12 parcels — agency follow-up", priority: "medium", assignedTo: "MSRDC", dueDate: "2026-09-15", createdDate: "2026-08-30" },
  { id: "wq-007", projectId: "PRJ-UDHNA", projectName: "Udhna–Bardoli Expressway", category: "timeline_risk", state: "Gujarat", district: "Surat", issue: "Scrutiny pending beyond expected 21-day period — 4 days overdue", priority: "high", assignedTo: "Collector, Surat", dueDate: "2026-09-06", createdDate: "2026-08-25" },
  { id: "wq-008", projectId: "PRJ-NH-66", projectName: "NH-66 Goa Section", category: "clarification_required", state: "Goa", district: "South Goa", issue: "Preliminary notification requires updated land schedule from state", priority: "low", assignedTo: "State Nodal Officer, Goa", dueDate: "2026-09-18", createdDate: "2026-08-30" },
];

// ── Ministry State Monitoring ──
export type MinistryStateProgress = {
  state: string;
  projects: number;
  parcels: number;
  currentStage: string;
  progress: number;
  compensationAssessed: string;
  compensationDisbursed: string;
  possessionComplete: number;
  possessionPending: number;
  rrComplete: number;
  rrPending: number;
  delayed: number;
  risk: "critical" | "high" | "medium" | "low" | "on_track";
  center: [number, number];
};

export const MINISTRY_STATE_PROGRESS: MinistryStateProgress[] = [
  { state: "Maharashtra", projects: 12, parcels: 8421, currentStage: "Mixed", progress: 74, compensationAssessed: "₹ 420 Cr", compensationDisbursed: "₹ 340 Cr", possessionComplete: 850, possessionPending: 320, rrComplete: 180, rrPending: 45, delayed: 2, risk: "medium", center: [19.7515, 75.7139] },
  { state: "Tamil Nadu", projects: 7, parcels: 3812, currentStage: "Mixed", progress: 62, compensationAssessed: "₹ 210 Cr", compensationDisbursed: "₹ 165 Cr", possessionComplete: 420, possessionPending: 180, rrComplete: 90, rrPending: 22, delayed: 1, risk: "medium", center: [11.1271, 78.6569] },
  { state: "Madhya Pradesh", projects: 5, parcels: 2421, currentStage: "Mixed", progress: 81, compensationAssessed: "₹ 180 Cr", compensationDisbursed: "₹ 160 Cr", possessionComplete: 380, possessionPending: 120, rrComplete: 65, rrPending: 15, delayed: 0, risk: "on_track", center: [22.9734, 78.6569] },
  { state: "Gujarat", projects: 4, parcels: 1800, currentStage: "Mixed", progress: 58, compensationAssessed: "₹ 120 Cr", compensationDisbursed: "₹ 90 Cr", possessionComplete: 220, possessionPending: 150, rrComplete: 40, rrPending: 18, delayed: 1, risk: "high", center: [22.2587, 71.1924] },
  { state: "Uttar Pradesh", projects: 3, parcels: 1600, currentStage: "Mixed", progress: 45, compensationAssessed: "₹ 95 Cr", compensationDisbursed: "₹ 70 Cr", possessionComplete: 150, possessionPending: 200, rrComplete: 30, rrPending: 25, delayed: 1, risk: "high", center: [26.8467, 80.9462] },
  { state: "Karnataka", projects: 3, parcels: 1200, currentStage: "Mixed", progress: 68, compensationAssessed: "₹ 85 Cr", compensationDisbursed: "₹ 65 Cr", possessionComplete: 180, possessionPending: 90, rrComplete: 35, rrPending: 10, delayed: 0, risk: "on_track", center: [15.3173, 75.7139] },
  { state: "West Bengal", projects: 2, parcels: 640, currentStage: "Mixed", progress: 55, compensationAssessed: "₹ 45 Cr", compensationDisbursed: "₹ 30 Cr", possessionComplete: 80, possessionPending: 60, rrComplete: 15, rrPending: 8, delayed: 1, risk: "medium", center: [22.9868, 87.8550] },
  { state: "Delhi", projects: 1, parcels: 180, currentStage: "Award", progress: 85, compensationAssessed: "₹ 42 Cr", compensationDisbursed: "₹ 38 Cr", possessionComplete: 120, possessionPending: 30, rrComplete: 20, rrPending: 5, delayed: 0, risk: "on_track", center: [28.7041, 77.1025] },
  { state: "Goa", projects: 1, parcels: 280, currentStage: "Preliminary Notification", progress: 45, compensationAssessed: "₹ 28 Cr", compensationDisbursed: "₹ 12 Cr", possessionComplete: 40, possessionPending: 60, rrComplete: 8, rrPending: 12, delayed: 0, risk: "low", center: [15.4909, 73.8278] },
  { state: "Jammu & Kashmir", projects: 1, parcels: 520, currentStage: "SIA", progress: 35, compensationAssessed: "₹ 35 Cr", compensationDisbursed: "₹ 8 Cr", possessionComplete: 20, possessionPending: 100, rrComplete: 5, rrPending: 20, delayed: 1, risk: "high", center: [33.7782, 76.5762] },
  { state: "Odisha", projects: 3, parcels: 1548, currentStage: "Mixed", progress: 65, compensationAssessed: "₹ 88 Cr", compensationDisbursed: "₹ 62 Cr", possessionComplete: 200, possessionPending: 120, rrComplete: 35, rrPending: 15, delayed: 0, risk: "on_track", center: [20.9517, 85.0985] },
];

// ── Ministry Risk Projects ──
export type MinistryRiskProject = {
  projectName: string;
  projectId: string;
  state: string;
  district: string;
  currentStage: LifecycleStage;
  daysInStage: number;
  expectedDuration: number;
  risk: "critical" | "high";
  reason: string;
  lastActivity: string;
};

export const MINISTRY_RISK_PROJECTS: MinistryRiskProject[] = [
  { projectName: "NH-44 Srinagar–Jammu", projectId: "PRJ-NH-44", state: "Jammu & Kashmir", district: "Jammu", currentStage: "sia", daysInStage: 195, expectedDuration: 180, risk: "critical", reason: "SIA deadline exceeded — public consultation pending in 3 villages", lastActivity: "2026-08-28" },
  { projectName: "Udhna–Bardoli Expressway", projectId: "PRJ-UDHNA", state: "Gujarat", district: "Surat", currentStage: "scrutiny", daysInStage: 25, expectedDuration: 21, risk: "high", reason: "Scrutiny pending beyond expected period — land schedule discrepancy", lastActivity: "2026-08-25" },
  { projectName: "Pune Ring Road Phase 2", projectId: "PRJ-PUNE-RR", state: "Maharashtra", district: "Pune", currentStage: "field_verification", daysInStage: 42, expectedDuration: 30, risk: "high", reason: "Field verification pending beyond expected period — 3 parcels outstanding", lastActivity: "2026-09-03" },
  { projectName: "NH-544 Expansion", projectId: "PRJ-NH-544", state: "Tamil Nadu", district: "Kanyakumari", currentStage: "compensation", daysInStage: 38, expectedDuration: 30, risk: "high", reason: "Compensation verification pending — valuation dispute on 8 parcels", lastActivity: "2026-09-05" },
  { projectName: "Chennai Metro Phase 3", projectId: "PRJ-CHENNAI-METRO", state: "Tamil Nadu", district: "Chennai", currentStage: "declaration", daysInStage: 28, expectedDuration: 30, risk: "high", reason: "Section 19 declaration pending — objection disposal incomplete", lastActivity: "2026-09-01" },
  { projectName: "Kolkata Metro Line 6", projectId: "PRJ-KOLKATA-METRO", state: "West Bengal", district: "Kolkata", currentStage: "objections_hearing", daysInStage: 35, expectedDuration: 30, risk: "high", reason: "Objection hearing overdue — 3 new objections filed", lastActivity: "2026-09-02" },
];

// ── Ministry Organizations ──
export type MinistryOrg = {
  id: string;
  name: string;
  type: "requiring_org" | "implementing_agency" | "state_dept" | "district_auth";
  projects: number;
  states: string[];
  activeUsers: number;
  status: "active" | "pending";
};

export const MINISTRY_ORGS: MinistryOrg[] = [
  { id: "morg-001", name: "National Highways Authority of India", type: "requiring_org", projects: 28, states: ["Maharashtra", "Tamil Nadu", "Gujarat", "Uttar Pradesh", "Karnataka", "Jammu & Kashmir", "Goa"], activeUsers: 45, status: "active" },
  { id: "morg-002", name: "Rail Vikas Nigam Ltd", type: "implementing_agency", projects: 8, states: ["Maharashtra", "West Bengal", "Karnataka"], activeUsers: 18, status: "active" },
  { id: "morg-003", name: "CMRL (Chennai Metro Rail Ltd)", type: "implementing_agency", projects: 2, states: ["Tamil Nadu"], activeUsers: 6, status: "active" },
  { id: "morg-004", name: "DMRC (Delhi Metro Rail Corp)", type: "implementing_agency", projects: 1, states: ["Delhi"], activeUsers: 4, status: "active" },
  { id: "morg-005", name: "MSRDC (Maharashtra State Rd Dev Corp)", type: "implementing_agency", projects: 2, states: ["Maharashtra"], activeUsers: 8, status: "active" },
  { id: "morg-006", name: "K-RIDE (Karnataka Rail Infra Dev Corp)", type: "implementing_agency", projects: 1, states: ["Karnataka"], activeUsers: 3, status: "pending" },
  { id: "morg-007", name: "KMRC (Kolkata Metro Rail Corp)", type: "implementing_agency", projects: 1, states: ["West Bengal"], activeUsers: 3, status: "active" },
  { id: "morg-008", name: "Revenue Dept., Maharashtra", type: "state_dept", projects: 6, states: ["Maharashtra"], activeUsers: 12, status: "active" },
];

// ── Ministry Stakeholders ──
export type Stakeholder = {
  id: string;
  name: string;
  role: string;
  organization: string;
  jurisdiction: string;
  project: string;
  status: "active" | "inactive";
  lastActivity: string;
};

export const MINISTRY_STAKEHOLDERS: Stakeholder[] = [
  { id: "st-001", name: "Shri. R. K. Sable, IAS", role: "State Nodal Officer", organization: "Revenue Dept., Maharashtra", jurisdiction: "Maharashtra", project: "Pune Ring Road Phase 2", status: "active", lastActivity: "2026-09-05" },
  { id: "st-002", name: "Smt. K. Ramanujam, IAS", role: "State Nodal Officer", organization: "Revenue Dept., Tamil Nadu", jurisdiction: "Tamil Nadu", project: "NH-544 Expansion", status: "active", lastActivity: "2026-09-04" },
  { id: "st-003", name: "Dr. Suhas Diwase, IAS", role: "District Collector / CALA", organization: "Collectorate, Pune", jurisdiction: "Pune District", project: "Pune Ring Road Phase 2", status: "active", lastActivity: "2026-09-05" },
  { id: "st-004", name: "Shri. A. Deshmukh", role: "Project Director", organization: "NHAI", jurisdiction: "Pune Region", project: "Pune Ring Road Phase 2", status: "active", lastActivity: "2026-09-03" },
  { id: "st-005", name: "Shri. V. Singh, IAS", role: "State Nodal Officer", organization: "Revenue Dept., Gujarat", jurisdiction: "Gujarat", project: "Udhna–Bardoli Expressway", status: "active", lastActivity: "2026-08-30" },
  { id: "st-006", name: "Shri. R. K. Singh, IAS", role: "State Nodal Officer", organization: "Revenue Dept., Uttar Pradesh", jurisdiction: "Uttar Pradesh", project: "Lucknow–Agra Expressway", status: "active", lastActivity: "2026-08-28" },
  { id: "st-007", name: "Shri. T. M. Vijay Bhaskar, IAS", role: "State Nodal Officer", organization: "Revenue Dept., Karnataka", jurisdiction: "Karnataka", project: "Bengaluru Suburban Rail", status: "active", lastActivity: "2026-09-03" },
  { id: "st-008", name: "Dr. A. Shanmugam, IAS", role: "District Collector", organization: "Collectorate, Chennai", jurisdiction: "Chennai District", project: "Chennai Metro Phase 3", status: "active", lastActivity: "2026-09-01" },
];

// ── Ministry Requests ──
export type MinistryRequest = {
  id: string;
  projectId: string;
  projectName: string;
  recipient: string;
  category: string;
  priority: "high" | "medium" | "low";
  message: string;
  status: "draft" | "sent" | "acknowledged" | "in_progress" | "responded" | "closed";
  createdDate: string;
  lastUpdated: string;
};

export const MINISTRY_REQUESTS: MinistryRequest[] = [
  { id: "req-001", projectId: "PRJ-PUNE-RR", projectName: "Pune Ring Road Phase 2", recipient: "State Nodal Officer, Maharashtra", category: "Land Schedule Clarification", priority: "high", message: "Please verify parcel schedule for Pune package 04 — parcels 33/4A & 33/4B show discrepancy in land records.", status: "in_progress", createdDate: "2026-09-01", lastUpdated: "2026-09-03" },
  { id: "req-002", projectId: "PRJ-NH-44", projectName: "NH-44 Srinagar–Jammu", recipient: "State Nodal Officer, Jammu & Kashmir", category: "SIA Status Update", priority: "high", message: "SIA deadline approaching — please confirm public consultation status in 3 villages.", status: "sent", createdDate: "2026-08-28", lastUpdated: "2026-08-28" },
  { id: "req-003", projectId: "PRJ-NH-544", projectName: "NH-544 Expansion", recipient: "State Nodal Officer, Tamil Nadu", category: "Compensation Verification", priority: "medium", message: "Compensation valuation dispute on 8 parcels — please verify market value assessment methodology.", status: "acknowledged", createdDate: "2026-09-03", lastUpdated: "2026-09-04" },
  { id: "req-004", projectId: "PRJ-UDHNA", projectName: "Udhna–Bardoli Expressway", recipient: "Collector, Surat", category: "Scrutiny Status", priority: "high", message: "Scrutiny pending beyond expected period — please update status and expected completion date.", status: "responded", createdDate: "2026-08-25", lastUpdated: "2026-09-02" },
  { id: "req-005", projectId: "PRJ-MUMBAI-ATL", projectName: "Mumbai–Nagpur Expressway", recipient: "MSRDC", category: "Possession Status", priority: "medium", message: "Please provide updated possession certificate status for 12 pending parcels.", status: "closed", createdDate: "2026-08-28", lastUpdated: "2026-09-04" },
];

// ── Ministry Documents ──
export type MinistryDocument = {
  id: string;
  documentName: string;
  project: string;
  documentType: string;
  stage: LifecycleStage;
  version: string;
  uploadedBy: string;
  uploadedDate: string;
  status: "verified" | "pending" | "rejected";
};

export const MINISTRY_DOCUMENTS: MinistryDocument[] = [
  { id: "mdoc-001", documentName: "Project Proposal — Pune Ring Road Phase 2", project: "Pune Ring Road Phase 2", documentType: "Project Charter", stage: "project_proposal", version: "v1.2", uploadedBy: "Shri. A. Deshmukh", uploadedDate: "2025-06-15", status: "verified" },
  { id: "mdoc-002", documentName: "GIS Parcel Identification — Haveli Cluster", project: "Pune Ring Road Phase 2", documentType: "GIS Report", stage: "gis_identification", version: "v1.0", uploadedBy: "Shri. M. Kamble", uploadedDate: "2025-08-10", status: "verified" },
  { id: "mdoc-003", documentName: "Compensation Assessment Sheet — 5 Parcels", project: "Pune Ring Road Phase 2", documentType: "Compensation Sheet", stage: "compensation", version: "v2.1", uploadedBy: "Dr. Suhas Diwase", uploadedDate: "2026-08-28", status: "pending" },
  { id: "mdoc-004", documentName: "Draft SIA Report — NH-44 Jammu", project: "NH-44 Srinagar–Jammu", documentType: "SIA Report", stage: "sia", version: "v0.3", uploadedBy: "Prof. S. Mishra", uploadedDate: "2026-07-15", status: "pending" },
  { id: "mdoc-005", documentName: "Preliminary Notification u/s 11(1) — NH-66 Goa", project: "NH-66 Goa Section", documentType: "Section 11 Notification", stage: "preliminary_notification", version: "v1.0", uploadedBy: "Collector, South Goa", uploadedDate: "2026-08-30", status: "verified" },
  { id: "mdoc-006", documentName: "Award Order u/s 23 — Delhi Metro Phase 4", project: "Delhi Metro Phase 4", documentType: "Award Order", stage: "award", version: "v1.0", uploadedBy: "Dr. Shanmugam", uploadedDate: "2026-09-01", status: "verified" },
  { id: "mdoc-007", documentName: "PFMS Sanction — ₹ 42 Cr Delhi Metro", project: "Delhi Metro Phase 4", documentType: "Disbursement Statement", stage: "payment", version: "v1.0", uploadedBy: "Finance Officer, Delhi", uploadedDate: "2026-09-05", status: "pending" },
  { id: "mdoc-008", documentName: "Objection Petition — Kolkata Metro", project: "Kolkata Metro Line 6", documentType: "Objection Decision", stage: "objections_hearing", version: "v1.0", uploadedBy: "Citizen", uploadedDate: "2026-08-15", status: "pending" },
  { id: "mdoc-009", documentName: "Section 19 Declaration — Pune Ring Road", project: "Pune Ring Road Phase 2", documentType: "Section 19 Declaration", stage: "declaration", version: "v1.0", uploadedBy: "Dr. Suhas Diwase", uploadedDate: "2026-09-01", status: "pending" },
  { id: "mdoc-010", documentName: "Field Verification Report — 5 Parcels", project: "Pune Ring Road Phase 2", documentType: "Verification Report", stage: "field_verification", version: "v1.0", uploadedBy: "Shri. M. Kamble", uploadedDate: "2026-08-26", status: "verified" },
  { id: "mdoc-011", documentName: "Possession Certificate — Purandar Airport", project: "Mumbai–Nagpur Expressway", documentType: "Possession Certificate", stage: "possession", version: "v1.0", uploadedBy: "Collector, Nagpur", uploadedDate: "2026-08-18", status: "verified" },
  { id: "mdoc-012", documentName: "R&R Entitlement Sheet — Mumbai–Nagpur", project: "Mumbai–Nagpur Expressway", documentType: "R&R Entitlement", stage: "r_and_r", version: "v1.0", uploadedBy: "R&R Officer", uploadedDate: "2026-08-10", status: "verified" },
];

// ── Ministry Objections ──
export type MinistryObjection = {
  id: string;
  projectId: string;
  projectName: string;
  state: string;
  district: string;
  parcel: string;
  category: string;
  filedDate: string;
  status: "open" | "under_review" | "resolved" | "escalated";
  currentAuthority: string;
};

export const MINISTRY_OBJECTIONS: MinistryObjection[] = [
  { id: "obj-001", projectId: "PRJ-PUNE-RR", projectName: "Pune Ring Road Phase 2", state: "Maharashtra", district: "Pune", parcel: "33/4A", category: "Compensation", filedDate: "2026-08-15", status: "under_review", currentAuthority: "Collector, Pune" },
  { id: "obj-002", projectId: "PRJ-PUNE-RR", projectName: "Pune Ring Road Phase 2", state: "Maharashtra", district: "Pune", parcel: "33/4B", category: "Land Measurement", filedDate: "2026-08-18", status: "under_review", currentAuthority: "Collector, Pune" },
  { id: "obj-003", projectId: "PRJ-KOLKATA-METRO", projectName: "Kolkata Metro Line 6", state: "West Bengal", district: "Kolkata", parcel: "Multiple", category: "Notice", filedDate: "2026-08-20", status: "open", currentAuthority: "Collector, Kolkata" },
  { id: "obj-004", projectId: "PRJ-KOLKATA-METRO", projectName: "Kolkata Metro Line 6", state: "West Bengal", district: "Kolkata", parcel: "12/3", category: "Asset Valuation", filedDate: "2026-08-22", status: "open", currentAuthority: "Collector, Kolkata" },
  { id: "obj-005", projectId: "PRJ-CHENNAI-METRO", projectName: "Chennai Metro Phase 3", state: "Tamil Nadu", district: "Chennai", parcel: "7/2A", category: "R&R", filedDate: "2026-08-10", status: "resolved", currentAuthority: "SIA Expert Group" },
  { id: "obj-006", projectId: "PRJ-NH-544", projectName: "NH-544 Expansion", state: "Tamil Nadu", district: "Kanyakumari", parcel: "15/8", category: "Compensation", filedDate: "2026-08-25", status: "escalated", currentAuthority: "State Nodal Officer, Tamil Nadu" },
  { id: "obj-007", projectId: "PRJ-UDHNA", projectName: "Udhna–Bardoli Expressway", state: "Gujarat", district: "Surat", parcel: "22/1", category: "Ownership", filedDate: "2026-08-12", status: "under_review", currentAuthority: "Collector, Surat" },
  { id: "obj-008", projectId: "PRJ-NH-44", projectName: "NH-44 Srinagar–Jammu", state: "Jammu & Kashmir", district: "Jammu", parcel: "5/3", category: "Possession", filedDate: "2026-08-05", status: "open", currentAuthority: "Collector, Jammu" },
];

// ── Ministry Compensation ──
export type MinistryCompensation = {
  projectId: string;
  projectName: string;
  state: string;
  assessed: string;
  awarded: string;
  disbursed: string;
  pending: string;
  failed: string;
  paymentStatus: "on_track" | "delayed" | "failed";
};

export const MINISTRY_COMPENSATION: MinistryCompensation[] = [
  { projectId: "PRJ-NH-544", projectName: "NH-544 Expansion", state: "Tamil Nadu", assessed: "₹ 210 Cr", awarded: "₹ 180 Cr", disbursed: "₹ 165 Cr", pending: "₹ 15 Cr", failed: "₹ 2 Cr", paymentStatus: "on_track" },
  { projectId: "PRJ-PUNE-RR", projectName: "Pune Ring Road Phase 2", state: "Maharashtra", assessed: "₹ 180 Cr", awarded: "₹ 160 Cr", disbursed: "₹ 140 Cr", pending: "₹ 20 Cr", failed: "₹ 0", paymentStatus: "delayed" },
  { projectId: "PRJ-CHENNAI-METRO", projectName: "Chennai Metro Phase 3", state: "Tamil Nadu", assessed: "₹ 95 Cr", awarded: "₹ 80 Cr", disbursed: "₹ 65 Cr", pending: "₹ 15 Cr", failed: "₹ 3 Cr", paymentStatus: "on_track" },
  { projectId: "PRJ-DELHI-METRO", projectName: "Delhi Metro Phase 4", state: "Delhi", assessed: "₹ 42 Cr", awarded: "₹ 38 Cr", disbursed: "₹ 38 Cr", pending: "₹ 0", failed: "₹ 0", paymentStatus: "on_track" },
  { projectId: "PRJ-MUMBAI-ATL", projectName: "Mumbai–Nagpur Expressway", state: "Maharashtra", assessed: "₹ 240 Cr", awarded: "₹ 200 Cr", disbursed: "₹ 160 Cr", pending: "₹ 40 Cr", failed: "₹ 5 Cr", paymentStatus: "delayed" },
  { projectId: "PRJ-BENGALURU-METRO", projectName: "Bengaluru Suburban Rail", state: "Karnataka", assessed: "₹ 85 Cr", awarded: "₹ 65 Cr", disbursed: "₹ 50 Cr", pending: "₹ 15 Cr", failed: "₹ 0", paymentStatus: "on_track" },
  { projectId: "PRJ-KOLKATA-METRO", projectName: "Kolkata Metro Line 6", state: "West Bengal", assessed: "₹ 45 Cr", awarded: "₹ 30 Cr", disbursed: "₹ 20 Cr", pending: "₹ 10 Cr", failed: "₹ 0", paymentStatus: "delayed" },
  { projectId: "PRJ-NH-19", projectName: "NH-19 Six-Laning", state: "West Bengal", assessed: "₹ 35 Cr", awarded: "₹ 28 Cr", disbursed: "₹ 22 Cr", pending: "₹ 6 Cr", failed: "₹ 0", paymentStatus: "on_track" },
];

// ── Ministry Possession ──
export type MinistryPossession = {
  projectId: string;
  projectName: string;
  state: string;
  district: string;
  totalParcels: number;
  possessionComplete: number;
  pending: number;
  disputed: number;
  resisted: number;
  lastUpdate: string;
};

export const MINISTRY_POSSESSION: MinistryPossession[] = [
  { projectId: "PRJ-NH-544", projectName: "NH-544 Expansion", state: "Tamil Nadu", district: "Kanyakumari", totalParcels: 842, possessionComplete: 520, pending: 280, disputed: 30, resisted: 12, lastUpdate: "2026-09-05" },
  { projectId: "PRJ-PUNE-RR", projectName: "Pune Ring Road Phase 2", state: "Maharashtra", district: "Pune", totalParcels: 1240, possessionComplete: 380, pending: 780, disputed: 50, resisted: 30, lastUpdate: "2026-09-03" },
  { projectId: "PRJ-DELHI-METRO", projectName: "Delhi Metro Phase 4", state: "Delhi", district: "New Delhi", totalParcels: 180, possessionComplete: 150, pending: 20, disputed: 5, resisted: 5, lastUpdate: "2026-09-05" },
  { projectId: "PRJ-MUMBAI-ATL", projectName: "Mumbai–Nagpur Expressway", state: "Maharashtra", district: "Nagpur", totalParcels: 1800, possessionComplete: 1200, pending: 480, disputed: 70, resisted: 50, lastUpdate: "2026-09-04" },
  { projectId: "PRJ-BENGALURU-METRO", projectName: "Bengaluru Suburban Rail", state: "Karnataka", district: "Bengaluru Urban", totalParcels: 310, possessionComplete: 180, pending: 100, disputed: 15, resisted: 15, lastUpdate: "2026-09-03" },
  { projectId: "PRJ-KOLKATA-METRO", projectName: "Kolkata Metro Line 6", state: "West Bengal", district: "Kolkata", totalParcels: 160, possessionComplete: 60, pending: 80, disputed: 12, resisted: 8, lastUpdate: "2026-09-02" },
];

// ── Ministry R&R ──
export type MinistryRnr = {
  projectId: string;
  projectName: string;
  state: string;
  affectedFamilies: number;
  rrApplicable: number;
  completed: number;
  pending: number;
  atRisk: number;
  components: {
    housing: { completed: number; pending: number };
    subsistence: { completed: number; pending: number };
    transport: { completed: number; pending: number };
    livelihood: { completed: number; pending: number };
    skillTraining: { completed: number; pending: number };
    specialSupport: { completed: number; pending: number };
  };
};

export const MINISTRY_RNR: MinistryRnr[] = [
  {
    projectId: "PRJ-NH-544", projectName: "NH-544 Expansion", state: "Tamil Nadu", affectedFamilies: 1200, rrApplicable: 850, completed: 620, pending: 180, atRisk: 50,
    components: { housing: { completed: 280, pending: 60 }, subsistence: { completed: 420, pending: 40 }, transport: { completed: 350, pending: 50 }, livelihood: { completed: 180, pending: 80 }, skillTraining: { completed: 120, pending: 90 }, specialSupport: { completed: 40, pending: 30 } },
  },
  {
    projectId: "PRJ-PUNE-RR", projectName: "Pune Ring Road Phase 2", state: "Maharashtra", affectedFamilies: 980, rrApplicable: 720, completed: 450, pending: 220, atRisk: 50,
    components: { housing: { completed: 200, pending: 80 }, subsistence: { completed: 320, pending: 60 }, transport: { completed: 280, pending: 70 }, livelihood: { completed: 150, pending: 90 }, skillTraining: { completed: 80, pending: 100 }, specialSupport: { completed: 30, pending: 40 } },
  },
  {
    projectId: "PRJ-MUMBAI-ATL", projectName: "Mumbai–Nagpur Expressway", state: "Maharashtra", affectedFamilies: 2400, rrApplicable: 1800, completed: 1200, pending: 450, atRisk: 150,
    components: { housing: { completed: 500, pending: 150 }, subsistence: { completed: 800, pending: 100 }, transport: { completed: 650, pending: 120 }, livelihood: { completed: 350, pending: 180 }, skillTraining: { completed: 200, pending: 200 }, specialSupport: { completed: 80, pending: 60 } },
  },
  {
    projectId: "PRJ-BENGALURU-METRO", projectName: "Bengaluru Suburban Rail", state: "Karnataka", affectedFamilies: 650, rrApplicable: 480, completed: 320, pending: 120, atRisk: 40,
    components: { housing: { completed: 140, pending: 40 }, subsistence: { completed: 220, pending: 30 }, transport: { completed: 180, pending: 40 }, livelihood: { completed: 100, pending: 50 }, skillTraining: { completed: 60, pending: 50 }, specialSupport: { completed: 20, pending: 20 } },
  },
  {
    projectId: "PRJ-KOLKATA-METRO", projectName: "Kolkata Metro Line 6", state: "West Bengal", affectedFamilies: 320, rrApplicable: 240, completed: 80, pending: 120, atRisk: 40,
    components: { housing: { completed: 30, pending: 50 }, subsistence: { completed: 50, pending: 40 }, transport: { completed: 40, pending: 45 }, livelihood: { completed: 20, pending: 55 }, skillTraining: { completed: 10, pending: 60 }, specialSupport: { completed: 5, pending: 25 } },
  },
];

// ── Ministry Audit Trail ──
export type MinistryAuditEntry = {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  organization: string;
  action: string;
  project: string;
  previousState: string | null;
  newState: string | null;
  justification: string;
};

export const MINISTRY_AUDIT_TRAIL: MinistryAuditEntry[] = [
  { id: "maud-001", timestamp: "2026-09-05T09:15:00+05:30", actor: "Shri. Rajiv Malhotra, IAS", role: "Ministry Nodal", organization: "MoRTH", action: "Created clarification request", project: "Pune Ring Road Phase 2", previousState: null, newState: null, justification: "Land schedule mismatch requires state verification" },
  { id: "maud-002", timestamp: "2026-09-04T14:30:00+05:30", actor: "Dr. Suhas Diwase, IAS", role: "Collector / CALA", organization: "Collectorate, Pune", action: "Returned submission for clarification", project: "Pune Ring Road Phase 2", previousState: "Submitted", newState: "Returned", justification: "Land schedule mismatch in parcels 33/4A & 33/4B" },
  { id: "maud-003", timestamp: "2026-09-03T11:00:00+05:30", actor: "Smt. Kavita Patil", role: "Tehsil / SDO", organization: "Tehsil Office, Haveli", action: "Scheduled objection hearing", project: "Jalna Dry Port", previousState: null, newState: null, justification: "Hearing scheduled for 05 Sep 2026 at Haveli Tahsil Office" },
  { id: "maud-004", timestamp: "2026-09-02T14:30:00+05:30", actor: "Shri. Asheesh Singh, IAS", role: "Collector / CALA", organization: "Collectorate, Indore", action: "Advanced case to Scrutiny", project: "Udhna–Bardoli Expressway", previousState: "Submission", newState: "Scrutiny", justification: "All required documents received and verified" },
  { id: "maud-005", timestamp: "2026-09-01T10:00:00+05:30", actor: "Prof. S. Mishra", role: "SIA Expert", organization: "SIA Panel", action: "Uploaded draft SIA report", project: "NH-44 Srinagar–Jammu", previousState: null, newState: null, justification: "Draft SIA report v0.3 — public consultation pending" },
  { id: "maud-006", timestamp: "2026-08-30T09:15:00+05:30", actor: "Finance Officer, Delhi", role: "Finance Officer", organization: "PFMS Cell, Delhi", action: "Sanctioned payment", project: "Delhi Metro Phase 4", previousState: "Compensation Assessed", newState: "Payment Sanctioned", justification: "₹ 38 Cr sanctioned for 150 parcels" },
  { id: "maud-007", timestamp: "2026-08-28T11:20:00+05:30", actor: "Dr. Suhas Diwase, IAS", role: "Collector / CALA", organization: "Collectorate, Pune", action: "Advanced case to Compensation Assessment", project: "Pune Ring Road Phase 2", previousState: "Field Verification", newState: "Compensation", justification: "Field verification complete for 5 parcels — area confirmed" },
  { id: "maud-008", timestamp: "2026-08-26T15:40:00+05:30", actor: "Shri. M. Kamble", role: "Field Officer", organization: "Tehsil Office, Haveli", action: "Submitted field verification report", project: "Pune Ring Road Phase 2", previousState: null, newState: null, justification: "Verification report for 5 parcels — measurements and photos attached" },
  { id: "maud-009", timestamp: "2026-08-24T08:00:00+05:30", actor: "System", role: "System", organization: "DoLR", action: "SLA breach notification", project: "NH-44 Srinagar–Jammu", previousState: null, newState: null, justification: "SIA deadline exceeded by 15 days" },
  { id: "maud-010", timestamp: "2026-08-22T10:05:00+05:30", actor: "Smt. Kavita Patil", role: "Tehsil / SDO", organization: "Tehsil Office, Haveli", action: "Scheduled objection hearing", project: "Pune Ring Road Phase 2", previousState: null, newState: null, justification: "Hearing for parcels 33/4A & 33/4B — Haveli Tahsil Office" },
];

// ── Ministry Reports ──
export type MinistryReport = {
  id: string;
  name: string;
  description: string;
  category: string;
};

export const MINISTRY_REPORTS: MinistryReport[] = [
  { id: "mrpt-001", name: "Ministry Acquisition Progress", description: "Overall acquisition progress for MoRTH projects across all states", category: "Progress" },
  { id: "mrpt-002", name: "State-wise Progress", description: "Acquisition progress broken down by state and district", category: "Progress" },
  { id: "mrpt-003", name: "Project-wise Progress", description: "Individual project progress with timeline analysis", category: "Progress" },
  { id: "mrpt-004", name: "Compensation Report", description: "Compensation assessment, sanction, and disbursement analysis", category: "Financial" },
  { id: "mrpt-005", name: "Possession Report", description: "Land possession status across all MoRTH acquisitions", category: "Operations" },
  { id: "mrpt-006", name: "R&R Report", description: "Rehabilitation & Resettlement entitlement and disbursement status", category: "Social" },
  { id: "mrpt-007", name: "Delay Report", description: "Projects exceeding statutory timelines with root cause analysis", category: "Compliance" },
  { id: "mrpt-008", name: "Objection Report", description: "Citizen objection register — filed, resolved, escalated", category: "Social" },
  { id: "mrpt-009", name: "Grievance Report", description: "Grievance register — filed, resolved, escalated", category: "Social" },
  { id: "mrpt-010", name: "Statutory Timeline Report", description: "Time taken at each stage vs statutory SLA across all projects", category: "Compliance" },
];

// ── Ministry Notifications ──
export type MinistryNotification = {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  project: string;
  timestamp: string;
  read: boolean;
};

export const MINISTRY_NOTIFICATIONS: MinistryNotification[] = [
  { id: "mnot-001", severity: "critical", title: "Payment failure — PFMS rejected disbursements", description: "2 compensation payments rejected by PFMS due to IFSC code validation failure for NH-544 Package 04.", project: "NH-544 Expansion", timestamp: "2026-09-05T09:15:00+05:30", read: false },
  { id: "mnot-002", severity: "high", title: "SIA deadline approaching — NH-44", description: "SIA deadline for NH-44 Srinagar–Jammu approaching in 5 days. Public consultation pending in 3 villages.", project: "NH-44 Srinagar–Jammu", timestamp: "2026-09-05T07:00:00+05:30", read: false },
  { id: "mnot-003", severity: "medium", title: "State response received — Pune Ring Road", description: "Maharashtra State Nodal Officer has acknowledged the clarification request for Pune Ring Road Phase 2.", project: "Pune Ring Road Phase 2", timestamp: "2026-09-04T16:30:00+05:30", read: false },
  { id: "mnot-004", severity: "low", title: "New project stakeholder added", description: "Shri. A. Deshmukh has been added as Project Director for Pune Ring Road Phase 2.", project: "Pune Ring Road Phase 2", timestamp: "2026-09-04T10:00:00+05:30", read: true },
  { id: "mnot-005", severity: "high", title: "Compensation valuation dispute — NH-544", description: "8 parcels in Kanyakumari district show valuation discrepancy. Market value assessment methodology under review.", project: "NH-544 Expansion", timestamp: "2026-09-03T14:00:00+05:30", read: false },
  { id: "mnot-006", severity: "medium", title: "Objection hearing scheduled — Kolkata Metro", description: "3 new objections for Kolkata Metro Line 6. Hearing scheduled for 20 Sep 2026.", project: "Kolkata Metro Line 6", timestamp: "2026-09-02T11:00:00+05:30", read: false },
  { id: "mnot-007", severity: "critical", title: "R&R component overdue — 3 projects", description: "Rehabilitation & Resettlement activities overdue in Mumbai–Nagpur Expressway, Pune Ring Road, and NH-544.", project: "Multiple", timestamp: "2026-09-01T08:00:00+05:30", read: false },
  { id: "mnot-008", severity: "low", title: "Document version update — SIA Report", description: "SIA report for NH-44 updated to v0.4. Previous version v0.3 archived.", project: "NH-44 Srinagar–Jammu", timestamp: "2026-08-30T16:00:00+05:30", read: true },
];
