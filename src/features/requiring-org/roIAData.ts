import type { LifecycleStage } from "@/types/domain";

// ── Organisation Profile ──
export type OrgProfile = {
  id: string;
  name: string;
  code: string;
  type: string;
  nodalContact: string;
  activeProjects: number;
  totalParcels: number;
  statesCovered: number;
};

export const ORG_PROFILE: OrgProfile = {
  id: "nhai",
  name: "National Highways Authority of India",
  code: "NHAI",
  type: "Requiring Organisation / Implementing Agency",
  nodalContact: "Shri. A. Deshmukh | nodal.nhai@gov.in | +91-11-2610-XXXX",
  activeProjects: 8,
  totalParcels: 6240,
  statesCovered: 7,
};

// ── Dashboard KPIs ──
export type DashboardKPI = {
  label: string;
  value: string;
  subtext: string;
  color?: string;
};

export const DASHBOARD_KPIS: DashboardKPI[] = [
  { label: "Active Projects", value: "8", subtext: "Across 7 states", color: "#1A3560" },
  { label: "In Preparation", value: "3", subtext: "Draft / not yet submitted", color: "#243E6B" },
  { label: "Under Acquisition", value: "5", subtext: "Statutory workflow active", color: "#2E4A7A" },
  { label: "Completed", value: "2", subtext: "Closed projects", color: "#0F7A5A" },
  { label: "Total Parcels", value: "6,240", subtext: "Across all projects", color: "#1A3560" },
  { label: "Parcels Acquired", value: "3,420", subtext: "54.8% completion", color: "#0F7A5A" },
  { label: "Parcels Pending", value: "2,820", subtext: "Under various stages", color: "#9A6B00" },
  { label: "Compensation Assessed", value: "₹ 892 Cr", subtext: "Total assessed value", color: "#2E4A7A" },
  { label: "Compensation Disbursed", value: "₹ 712 Cr", subtext: "79.8% disbursement rate", color: "#0F7A5A" },
  { label: "Possession Completed", value: "2,180", subtext: "63.7% of acquired parcels", color: "#0F7A5A" },
  { label: "R&R Completed", value: "1,840", subtext: "53.8% of eligible families", color: "#0F7A5A" },
  { label: "Projects At Risk", value: "3", subtext: "Exceeding statutory timelines", color: "#B42318" },
];

// ── Projects ──
export type RoProject = {
  id: string;
  projectName: string;
  projectCode: string;
  sector: string;
  purpose: string;
  states: string[];
  districts: string[];
  parcels: number;
  currentStage: LifecycleStage;
  progress: number;
  risk: "critical" | "high" | "medium" | "low" | "on_track";
  lastActivity: string;
  budgetCr: number;
  status: "in_preparation" | "submitted" | "active" | "completed" | "on_hold";
  createdDate: string;
  estimatedLandHa: number;
  estimatedParcels: number;
};

export const RO_PROJECTS: RoProject[] = [
  {
    id: "IA-NH-544-047",
    projectName: "NH-544 Pune–Satara Expansion",
    projectCode: "NH-544-PUNE",
    sector: "Highways",
    purpose: "Road widening and corridor development for enhanced connectivity between Pune and Satara districts",
    states: ["Maharashtra"],
    districts: ["Pune", "Satara"],
    parcels: 1284,
    currentStage: "scrutiny",
    progress: 31,
    risk: "medium",
    lastActivity: "2026-09-05",
    budgetCr: 4200,
    status: "active",
    createdDate: "2026-03-15",
    estimatedLandHa: 842,
    estimatedParcels: 1284,
  },
  {
    id: "IA-NH-48-112",
    projectName: "NH-48 Mumbai–Pune Expressway Extension",
    projectCode: "NH-48-MPE",
    sector: "Highways",
    purpose: "Expressway extension to decongest existing corridor and improve freight movement",
    states: ["Maharashtra"],
    districts: ["Pune", "Raigad"],
    parcels: 920,
    currentStage: "compensation",
    progress: 72,
    risk: "on_track",
    lastActivity: "2026-09-04",
    budgetCr: 5800,
    status: "active",
    createdDate: "2025-11-20",
    estimatedLandHa: 620,
    estimatedParcels: 920,
  },
  {
    id: "IA-NH-66-089",
    projectName: "NH-66 Goa Coastal Highway",
    projectCode: "NH-66-GOA",
    sector: "Highways",
    purpose: "Coastal highway development connecting North and South Goa for tourism and freight",
    states: ["Goa"],
    districts: ["North Goa", "South Goa"],
    parcels: 580,
    currentStage: "preliminary_notification",
    progress: 48,
    risk: "low",
    lastActivity: "2026-09-03",
    budgetCr: 1800,
    status: "active",
    createdDate: "2026-01-10",
    estimatedLandHa: 380,
    estimatedParcels: 580,
  },
  {
    id: "IA-NH-19-034",
    projectName: "NH-19 Six-Laning Kolkata–Puri",
    projectCode: "NH-19-KOL",
    sector: "Highways",
    purpose: "Six-laning of NH-19 for improved connectivity between Kolkata and Puri",
    states: ["West Bengal", "Odisha"],
    districts: ["Howrah", "Medinipur", "Balasore"],
    parcels: 740,
    currentStage: "field_verification",
    progress: 65,
    risk: "high",
    lastActivity: "2026-09-02",
    budgetCr: 3200,
    status: "active",
    createdDate: "2025-09-05",
    estimatedLandHa: 510,
    estimatedParcels: 740,
  },
  {
    id: "IA-NH-44-078",
    projectName: "NH-44 Srinagar–Jammu Four-Laning",
    projectCode: "NH-44-SJ",
    sector: "Highways",
    purpose: "Four-laning of strategic highway connecting Srinagar to Jammu",
    states: ["Jammu & Kashmir"],
    districts: ["Srinagar", "Anantnag", "Jammu"],
    parcels: 620,
    currentStage: "sia",
    progress: 38,
    risk: "critical",
    lastActivity: "2026-08-28",
    budgetCr: 4800,
    status: "active",
    createdDate: "2025-07-15",
    estimatedLandHa: 420,
    estimatedParcels: 620,
  },
  {
    id: "IA-NH-52-056",
    projectName: "NH-52 Pune–Bengaluru Corridor",
    projectCode: "NH-52-PB",
    sector: "Highways",
    purpose: "Highway corridor connecting Pune to Bengaluru for improved inter-state connectivity",
    states: ["Maharashtra", "Karnataka"],
    districts: ["Pune", "Satara", "Belagavi"],
    parcels: 1100,
    currentStage: "submission",
    progress: 22,
    risk: "low",
    lastActivity: "2026-08-25",
    budgetCr: 6200,
    status: "active",
    createdDate: "2026-04-01",
    estimatedLandHa: 750,
    estimatedParcels: 1100,
  },
  {
    id: "IA-RR-023",
    projectName: "Delhi Metro Phase 4 Extension",
    projectCode: "DMRC-P4E",
    sector: "Urban Transit",
    purpose: "Metro extension to serve growing suburban population in NCR",
    states: ["Delhi"],
    districts: ["New Delhi", "South Delhi"],
    parcels: 180,
    currentStage: "award",
    progress: 88,
    risk: "on_track",
    lastActivity: "2026-09-05",
    budgetCr: 4500,
    status: "active",
    createdDate: "2025-05-10",
    estimatedLandHa: 95,
    estimatedParcels: 180,
  },
  {
    id: "IA-MSR-045",
    projectName: "Mumbai–Nagpur Expressway (Samruddhi)",
    projectCode: "MSRDC-SAM",
    sector: "Highways",
    purpose: "Access-controlled expressway connecting Mumbai to Nagpur via 10 districts",
    states: ["Maharashtra"],
    districts: ["Mumbai", "Nagpur", "Nashik", "Aurangabad"],
    parcels: 1800,
    currentStage: "payment",
    progress: 82,
    risk: "on_track",
    lastActivity: "2026-09-04",
    budgetCr: 5200,
    status: "active",
    createdDate: "2025-03-01",
    estimatedLandHa: 1200,
    estimatedParcels: 1800,
  },
];

// ── Work Queue ──
export type WorkQueueItem = {
  id: string;
  projectId: string;
  projectName: string;
  category: "clarification_required" | "documents_required" | "state_request" | "district_request" | "parcel_issue" | "timeline_risk" | "pending_submission";
  authority: string;
  state: string;
  district: string;
  issue: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  createdDate: string;
};

export const WORK_QUEUE: WorkQueueItem[] = [
  { id: "wq-001", projectId: "IA-NH-544-047", projectName: "NH-544 Pune–Satara Expansion", category: "clarification_required", authority: "Collector, Pune", state: "Maharashtra", district: "Pune", issue: "Land schedule mismatch — parcels 33/4A & 33/4B require verification", priority: "high", dueDate: "2026-09-10", createdDate: "2026-09-03" },
  { id: "wq-002", projectId: "IA-NH-44-078", projectName: "NH-44 Srinagar–Jammu", category: "documents_required", authority: "State Nodal Officer, J&K", state: "Jammu & Kashmir", district: "Srinagar", issue: "SIA report v0.3 requires updated public consultation evidence", priority: "high", dueDate: "2026-09-15", createdDate: "2026-08-28" },
  { id: "wq-003", projectId: "IA-NH-544-047", projectName: "NH-544 Pune–Satara Expansion", category: "state_request", authority: "State Nodal Officer, Maharashtra", state: "Maharashtra", district: "Pune", issue: "Updated market value assessment required for 8 parcels in Haveli tehsil", priority: "medium", dueDate: "2026-09-12", createdDate: "2026-09-01" },
  { id: "wq-004", projectId: "IA-NH-19-034", projectName: "NH-19 Six-Laning Kolkata–Puri", category: "parcel_issue", authority: "Field Officer, Medinipur", state: "West Bengal", district: "Medinipur", issue: "3 parcels show ownership discrepancy — requires updated land records", priority: "high", dueDate: "2026-09-08", createdDate: "2026-08-30" },
  { id: "wq-005", projectId: "IA-NH-66-089", projectName: "NH-66 Goa Coastal Highway", category: "pending_submission", authority: "Ministry Nodal Officer, MoRTH", state: "Goa", district: "North Goa", issue: "Project GIS footprint requires final review before submission", priority: "medium", dueDate: "2026-09-18", createdDate: "2026-09-03" },
  { id: "wq-006", projectId: "IA-NH-52-056", projectName: "NH-52 Pune–Bengaluru Corridor", category: "timeline_risk", authority: "Collector, Belagavi", state: "Karnataka", district: "Belagavi", issue: "Submission pending beyond expected period — 5 days overdue", priority: "high", dueDate: "2026-09-06", createdDate: "2026-08-25" },
  { id: "wq-007", projectId: "IA-NH-48-112", projectName: "NH-48 Mumbai–Pune Expressway", category: "district_request", authority: "Collector, Raigad", state: "Maharashtra", district: "Raigad", issue: "Possession certificates pending for 12 parcels — agency follow-up needed", priority: "medium", dueDate: "2026-09-15", createdDate: "2026-08-30" },
];

// ── Authority Requests ──
export type AuthorityRequest = {
  id: string;
  projectId: string;
  projectName: string;
  authority: string;
  category: string;
  priority: "high" | "medium" | "low";
  message: string;
  status: "draft" | "sent" | "acknowledged" | "in_progress" | "responded" | "closed";
  createdDate: string;
  lastUpdated: string;
};

export const AUTHORITY_REQUESTS: AuthorityRequest[] = [
  { id: "ar-001", projectId: "IA-NH-544-047", projectName: "NH-544 Pune–Satara Expansion", authority: "Collector, Pune", category: "Parcel Clarification", priority: "high", message: "Please verify land schedule for parcels 33/4A & 33/4B — discrepancy in ownership records.", status: "in_progress", createdDate: "2026-09-01", lastUpdated: "2026-09-03" },
  { id: "ar-002", projectId: "IA-NH-44-078", projectName: "NH-44 Srinagar–Jammu", authority: "State Nodal Officer, J&K", category: "Document Request", priority: "high", message: "SIA public consultation evidence required for 3 villages — deadline approaching.", status: "sent", createdDate: "2026-08-28", lastUpdated: "2026-08-28" },
  { id: "ar-003", projectId: "IA-NH-19-034", projectName: "NH-19 Six-Laning Kolkata–Puri", authority: "Field Officer, Medinipur", category: "GIS Clarification", priority: "medium", message: "Updated GIS intersection required for 3 parcels with ownership discrepancy.", status: "acknowledged", createdDate: "2026-08-30", lastUpdated: "2026-09-01" },
  { id: "ar-004", projectId: "IA-NH-48-112", projectName: "NH-48 Mumbai–Pune Expressway", authority: "Collector, Raigad", category: "Status Update", priority: "medium", message: "Please provide updated possession certificate status for 12 pending parcels.", status: "responded", createdDate: "2026-08-28", lastUpdated: "2026-09-04" },
  { id: "ar-005", projectId: "IA-RR-023", projectName: "Delhi Metro Phase 4 Extension", authority: "Finance Officer, Delhi", category: "Information Request", priority: "low", message: "Confirmation of PFMS sanctions for compensation disbursement.", status: "closed", createdDate: "2026-08-25", lastUpdated: "2026-09-02" },
];

// ── Objections & Grievances ──
export type RoObjection = {
  id: string;
  projectId: string;
  projectName: string;
  parcel: string;
  state: string;
  district: string;
  village: string;
  category: string;
  filedDate: string;
  status: "filed" | "under_review" | "hearing" | "resolved" | "escalated";
  currentAuthority: string;
};

export const OBJECTIONS: RoObjection[] = [
  { id: "obj-001", projectId: "IA-NH-544-047", projectName: "NH-544 Pune–Satara Expansion", parcel: "33/4A", state: "Maharashtra", district: "Pune", village: "Haveli", category: "Compensation", filedDate: "2026-08-15", status: "under_review", currentAuthority: "Collector, Pune" },
  { id: "obj-002", projectId: "IA-NH-544-047", projectName: "NH-544 Pune–Satara Expansion", parcel: "33/4B", state: "Maharashtra", district: "Pune", village: "Haveli", category: "Land Measurement", filedDate: "2026-08-18", status: "under_review", currentAuthority: "Collector, Pune" },
  { id: "obj-003", projectId: "IA-NH-19-034", projectName: "NH-19 Six-Laning Kolkata–Puri", parcel: "12/3", state: "West Bengal", district: "Medinipur", village: "Kharagpur", category: "Notice", filedDate: "2026-08-20", status: "filed", currentAuthority: "Collector, Medinipur" },
  { id: "obj-004", projectId: "IA-NH-44-078", projectName: "NH-44 Srinagar–Jammu", parcel: "5/3", state: "Jammu & Kashmir", district: "Srinagar", village: "Anantnag", category: "Asset Valuation", filedDate: "2026-08-22", status: "hearing", currentAuthority: "Collector, Anantnag" },
  { id: "obj-005", projectId: "IA-NH-48-112", projectName: "NH-48 Mumbai–Pune Expressway", parcel: "7/2A", state: "Maharashtra", district: "Raigad", village: "Alibaug", category: "R&R", filedDate: "2026-08-10", status: "resolved", currentAuthority: "SIA Expert Group" },
  { id: "obj-006", projectId: "IA-NH-66-089", projectName: "NH-66 Goa Coastal Highway", parcel: "22/1", state: "Goa", district: "North Goa", village: "Mapusa", category: "Ownership", filedDate: "2026-08-12", status: "escalated", currentAuthority: "State Nodal Officer, Goa" },
];

// ── Documents ──
export type RoDocument = {
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

export const PROJECT_DOCUMENTS: RoDocument[] = [
  { id: "doc-001", documentName: "Project Proposal — NH-544 Pune–Satara", project: "NH-544 Pune–Satara Expansion", documentType: "Project Proposal", stage: "project_proposal", version: "v1.2", uploadedBy: "Shri. A. Deshmukh", uploadedDate: "2026-03-15", status: "verified" },
  { id: "doc-002", documentName: "Land Requirement Document — NH-544", project: "NH-544 Pune–Satara Expansion", documentType: "Land Requirement", stage: "land_requirement", version: "v1.0", uploadedBy: "Shri. A. Deshmukh", uploadedDate: "2026-04-01", status: "verified" },
  { id: "doc-003", documentName: "GIS Footprint Plan — NH-544", project: "NH-544 Pune–Satara Expansion", documentType: "GIS Plan", stage: "gis_identification", version: "v1.1", uploadedBy: "GIS Team, NHAI", uploadedDate: "2026-04-15", status: "verified" },
  { id: "doc-004", documentName: "Submission Package — NH-544", project: "NH-544 Pune–Satara Expansion", documentType: "Submission Package", stage: "submission", version: "v1.0", uploadedBy: "Shri. A. Deshmukh", uploadedDate: "2026-05-01", status: "verified" },
  { id: "doc-005", documentName: "Scrutiny Response — NH-544", project: "NH-544 Pune–Satara Expansion", documentType: "Scrutiny Response", stage: "scrutiny", version: "v1.0", uploadedBy: "Shri. A. Deshmukh", uploadedDate: "2026-08-20", status: "pending" },
  { id: "doc-006", documentName: "SIA Report v0.3 — NH-44", project: "NH-44 Srinagar–Jammu", documentType: "SIA Report", stage: "sia", version: "v0.3", uploadedBy: "Prof. S. Mishra", uploadedDate: "2026-07-15", status: "pending" },
  { id: "doc-007", documentName: "Preliminary Notification Draft — NH-66", project: "NH-66 Goa Coastal Highway", documentType: "Section 11 Notification", stage: "preliminary_notification", version: "v1.0", uploadedBy: "Collector, North Goa", uploadedDate: "2026-08-30", status: "verified" },
  { id: "doc-008", documentName: "Award Order — Delhi Metro Phase 4", project: "Delhi Metro Phase 4 Extension", documentType: "Award Order", stage: "award", version: "v1.0", uploadedBy: "Dr. Shanmugam", uploadedDate: "2026-09-01", status: "verified" },
  { id: "doc-009", documentName: "Field Verification Report — NH-19", project: "NH-19 Six-Laning Kolkata–Puri", documentType: "Verification Report", stage: "field_verification", version: "v1.0", uploadedBy: "Field Officer, Medinipur", uploadedDate: "2026-08-26", status: "pending" },
  { id: "doc-010", documentName: "Project Charter — NH-52", project: "NH-52 Pune–Bengaluru Corridor", documentType: "Project Charter", stage: "project_proposal", version: "v1.0", uploadedBy: "Shri. A. Deshmukh", uploadedDate: "2026-04-01", status: "verified" },
];

// ── Compensation Data ──
export type RoCompensation = {
  projectId: string;
  projectName: string;
  state: string;
  parcels: number;
  assessed: string;
  awarded: string;
  disbursed: string;
  pending: string;
  failed: string;
  status: "on_track" | "delayed" | "failed";
};

export const COMPENSATION_DATA: RoCompensation[] = [
  { projectId: "IA-NH-48-112", projectName: "NH-48 Mumbai–Pune Expressway", state: "Maharashtra", parcels: 920, assessed: "₹ 320 Cr", awarded: "₹ 280 Cr", disbursed: "₹ 245 Cr", pending: "₹ 35 Cr", failed: "₹ 5 Cr", status: "on_track" },
  { projectId: "IA-NH-19-034", projectName: "NH-19 Six-Laning Kolkata–Puri", state: "West Bengal", parcels: 740, assessed: "₹ 180 Cr", awarded: "₹ 150 Cr", disbursed: "₹ 120 Cr", pending: "₹ 30 Cr", failed: "₹ 0", status: "delayed" },
  { projectId: "IA-RR-023", projectName: "Delhi Metro Phase 4 Extension", state: "Delhi", parcels: 180, assessed: "₹ 42 Cr", awarded: "₹ 38 Cr", disbursed: "₹ 38 Cr", pending: "₹ 0", failed: "₹ 0", status: "on_track" },
  { projectId: "IA-MSR-045", projectName: "Mumbai–Nagpur Expressway", state: "Maharashtra", parcels: 1800, assessed: "₹ 240 Cr", awarded: "₹ 200 Cr", disbursed: "₹ 160 Cr", pending: "₹ 40 Cr", failed: "₹ 5 Cr", status: "delayed" },
  { projectId: "IA-NH-544-047", projectName: "NH-544 Pune–Satara Expansion", state: "Maharashtra", parcels: 1284, assessed: "₹ 110 Cr", awarded: "₹ 95 Cr", disbursed: "₹ 49 Cr", pending: "₹ 46 Cr", failed: "₹ 0", status: "delayed" },
];

// ── Possession Data ──
export type RoPossession = {
  projectId: string;
  projectName: string;
  state: string;
  district: string;
  totalParcels: number;
  complete: number;
  pending: number;
  disputed: number;
  resisted: number;
  lastUpdate: string;
};

export const POSSESSION_DATA: RoPossession[] = [
  { projectId: "IA-NH-48-112", projectName: "NH-48 Mumbai–Pune Expressway", state: "Maharashtra", district: "Pune", totalParcels: 920, complete: 620, pending: 240, disputed: 40, resisted: 20, lastUpdate: "2026-09-04" },
  { projectId: "IA-NH-19-034", projectName: "NH-19 Six-Laning Kolkata–Puri", state: "West Bengal", district: "Medinipur", totalParcels: 740, complete: 380, pending: 280, disputed: 50, resisted: 30, lastUpdate: "2026-09-02" },
  { projectId: "IA-RR-023", projectName: "Delhi Metro Phase 4 Extension", state: "Delhi", district: "New Delhi", totalParcels: 180, complete: 150, pending: 20, disputed: 5, resisted: 5, lastUpdate: "2026-09-05" },
  { projectId: "IA-MSR-045", projectName: "Mumbai–Nagpur Expressway", state: "Maharashtra", district: "Nagpur", totalParcels: 1800, complete: 1030, pending: 620, disputed: 100, resisted: 50, lastUpdate: "2026-09-04" },
];

// ── R&R Data ──
export type RoRnr = {
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

export const RNR_DATA: RoRnr[] = [
  {
    projectId: "IA-NH-48-112", projectName: "NH-48 Mumbai–Pune Expressway", state: "Maharashtra", affectedFamilies: 850, rrApplicable: 620, completed: 420, pending: 150, atRisk: 50,
    components: { housing: { completed: 180, pending: 50 }, subsistence: { completed: 280, pending: 30 }, transport: { completed: 220, pending: 40 }, livelihood: { completed: 120, pending: 60 }, skillTraining: { completed: 80, pending: 70 }, specialSupport: { completed: 30, pending: 25 } },
  },
  {
    projectId: "IA-MSR-045", projectName: "Mumbai–Nagpur Expressway", state: "Maharashtra", affectedFamilies: 2400, rrApplicable: 1800, completed: 1050, pending: 550, atRisk: 200,
    components: { housing: { completed: 420, pending: 150 }, subsistence: { completed: 700, pending: 100 }, transport: { completed: 550, pending: 120 }, livelihood: { completed: 280, pending: 180 }, skillTraining: { completed: 150, pending: 180 }, specialSupport: { completed: 50, pending: 60 } },
  },
  {
    projectId: "IA-RR-023", projectName: "Delhi Metro Phase 4 Extension", state: "Delhi", affectedFamilies: 320, rrApplicable: 240, completed: 180, pending: 45, atRisk: 15,
    components: { housing: { completed: 80, pending: 15 }, subsistence: { completed: 120, pending: 10 }, transport: { completed: 100, pending: 15 }, livelihood: { completed: 60, pending: 20 }, skillTraining: { completed: 30, pending: 25 }, specialSupport: { completed: 10, pending: 10 } },
  },
  {
    projectId: "IA-NH-19-034", projectName: "NH-19 Six-Laning Kolkata–Puri", state: "West Bengal", affectedFamilies: 580, rrApplicable: 420, completed: 180, pending: 180, atRisk: 60,
    components: { housing: { completed: 70, pending: 60 }, subsistence: { completed: 120, pending: 50 }, transport: { completed: 90, pending: 60 }, livelihood: { completed: 50, pending: 80 }, skillTraining: { completed: 20, pending: 90 }, specialSupport: { completed: 10, pending: 30 } },
  },
];

// ── Audit Trail ──
export type AuditEntry = {
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

export const AUDIT_TRAIL: AuditEntry[] = [
  { id: "aud-001", timestamp: "2026-09-05T09:15:00+05:30", actor: "Shri. A. Deshmukh", role: "Project Director", organization: "NHAI", action: "Created clarification request", project: "NH-544 Pune–Satara Expansion", previousState: null, newState: null, justification: "Land schedule mismatch requires collector verification" },
  { id: "aud-002", timestamp: "2026-09-04T14:30:00+05:30", actor: "Dr. Suhas Diwase, IAS", role: "Collector / CALA", organization: "Collectorate, Pune", action: "Returned submission for clarification", project: "NH-544 Pune–Satara Expansion", previousState: "Submitted", newState: "Returned", justification: "Land schedule mismatch in parcels 33/4A & 33/4B" },
  { id: "aud-003", timestamp: "2026-09-03T11:00:00+05:30", actor: "Smt. Kavita Patil", role: "Tehsil / SDO", organization: "Tehsil Office, Haveli", action: "Scheduled objection hearing", project: "NH-544 Pune–Satara Expansion", previousState: null, newState: null, justification: "Hearing scheduled for 05 Sep 2026 at Haveli Tahsil Office" },
  { id: "aud-004", timestamp: "2026-09-02T14:30:00+05:30", actor: "Shri. Asheesh Singh, IAS", role: "Collector / CALA", organization: "Collectorate, Indore", action: "Advanced case to Scrutiny", project: "NH-52 Pune–Bengaluru Corridor", previousState: "Submission", newState: "Scrutiny", justification: "All required documents received and verified" },
  { id: "aud-005", timestamp: "2026-09-01T10:00:00+05:30", actor: "Prof. S. Mishra", role: "SIA Expert", organization: "SIA Panel", action: "Uploaded draft SIA report", project: "NH-44 Srinagar–Jammu", previousState: null, newState: null, justification: "Draft SIA report v0.3 — public consultation pending" },
  { id: "aud-006", timestamp: "2026-08-30T09:15:00+05:30", actor: "Finance Officer, Delhi", role: "Finance Officer", organization: "PFMS Cell, Delhi", action: "Sanctioned payment", project: "Delhi Metro Phase 4 Extension", previousState: "Compensation Assessed", newState: "Payment Sanctioned", justification: "₹ 38 Cr sanctioned for 150 parcels" },
  { id: "aud-007", timestamp: "2026-08-28T11:20:00+05:30", actor: "Dr. Suhas Diwase, IAS", role: "Collector / CALA", organization: "Collectorate, Pune", action: "Advanced case to Compensation Assessment", project: "NH-544 Pune–Satara Expansion", previousState: "Field Verification", newState: "Compensation", justification: "Field verification complete for 5 parcels — area confirmed" },
  { id: "aud-008", timestamp: "2026-08-26T15:40:00+05:30", actor: "Shri. M. Kamble", role: "Field Officer", organization: "Tehsil Office, Haveli", action: "Submitted field verification report", project: "NH-544 Pune–Satara Expansion", previousState: null, newState: null, justification: "Verification report for 5 parcels — measurements and photos attached" },
  { id: "aud-009", timestamp: "2026-08-24T08:00:00+05:30", actor: "System", role: "System", organization: "DoLR", action: "SLA breach notification", project: "NH-44 Srinagar–Jammu", previousState: null, newState: null, justification: "SIA deadline exceeded by 15 days" },
  { id: "aud-010", timestamp: "2026-08-22T10:05:00+05:30", actor: "Smt. Kavita Patil", role: "Tehsil / SDO", organization: "Tehsil Office, Haveli", action: "Scheduled objection hearing", project: "NH-544 Pune–Satara Expansion", previousState: null, newState: null, justification: "Hearing for parcels 33/4A & 33/4B — Haveli Tahsil Office" },
];

// ── Reports ──
export type ProjectReport = {
  id: string;
  name: string;
  description: string;
  category: string;
};

export const PROJECT_REPORTS: ProjectReport[] = [
  { id: "rpt-001", name: "Project Progress Report", description: "Overall progress for all NHAI projects across states", category: "Progress" },
  { id: "rpt-002", name: "Land Acquisition Status", description: "Acquisition progress by project and state", category: "Progress" },
  { id: "rpt-003", name: "Parcel Status Report", description: "Individual parcel lifecycle status", category: "Operations" },
  { id: "rpt-004", name: "Compensation Report", description: "Assessment, award, and disbursement analysis", category: "Financial" },
  { id: "rpt-005", name: "Possession Report", description: "Land possession status across projects", category: "Operations" },
  { id: "rpt-006", name: "R&R Report", description: "Rehabilitation & Resettlement entitlement and status", category: "Social" },
  { id: "rpt-007", name: "Objection Report", description: "Citizen objection register — filed, resolved, escalated", category: "Social" },
  { id: "rpt-008", name: "Timeline Report", description: "Time taken at each stage vs statutory SLA", category: "Compliance" },
  { id: "rpt-009", name: "Project Completion Report", description: "Closed project summary and outcomes", category: "Compliance" },
];

// ── Parcel Data (for GIS/workspace) ──
export type RoParcel = {
  id: string;
  ulpin: string;
  surveyNo: string;
  village: string;
  tehsil: string;
  district: string;
  state: string;
  areaHa: number;
  owner: string;
  landClassification: string;
  intersectionPercent: number;
  stage: LifecycleStage;
  compensationStatus: "assessed" | "awarded" | "disbursed" | "pending" | "none";
  possessionStatus: "complete" | "pending" | "disputed" | "resisted" | "none";
  status: "selected" | "excluded" | "pending";
};

export const PARCELS_DATA: RoParcel[] = [
  { id: "prcl-001", ulpin: "MH-PN-HAV-001", surveyNo: "33/4A", village: "Haveli", tehsil: "Haveli", district: "Pune", state: "Maharashtra", areaHa: 2.4, owner: "Shri. R. Patil", landClassification: "Agricultural", intersectionPercent: 85, stage: "scrutiny", compensationStatus: "assessed", possessionStatus: "pending", status: "selected" },
  { id: "prcl-002", ulpin: "MH-PN-HAV-002", surveyNo: "33/4B", village: "Haveli", tehsil: "Haveli", district: "Pune", state: "Maharashtra", areaHa: 1.8, owner: "Smt. S. Patil", landClassification: "Agricultural", intersectionPercent: 72, stage: "scrutiny", compensationStatus: "assessed", possessionStatus: "pending", status: "selected" },
  { id: "prcl-003", ulpin: "MH-PN-MUL-003", surveyNo: "15/8", village: "Mulshi", tehsil: "Mulshi", district: "Pune", state: "Maharashtra", areaHa: 3.2, owner: "Shri. V. Kamble", landClassification: "Agricultural", intersectionPercent: 92, stage: "compensation", compensationStatus: "awarded", possessionStatus: "pending", status: "selected" },
  { id: "prcl-004", ulpin: "MH-PN-VEL-004", surveyNo: "7/2A", village: "Velhe", tehsil: "Velhe", district: "Pune", state: "Maharashtra", areaHa: 1.5, owner: "Shri. M. Jadhav", landClassification: "Agricultural", intersectionPercent: 68, stage: "field_verification", compensationStatus: "pending", possessionStatus: "none", status: "selected" },
  { id: "prcl-005", ulpin: "MH-ST-SAT-005", surveyNo: "22/1", village: "Satara", tehsil: "Satara", district: "Satara", state: "Maharashtra", areaHa: 4.1, owner: "Shri. K. Bhosale", landClassification: "Agricultural", intersectionPercent: 78, stage: "submission", compensationStatus: "none", possessionStatus: "none", status: "selected" },
  { id: "prcl-006", ulpin: "MH-ST-KAR-006", surveyNo: "11/3", village: "Karad", tehsil: "Karad", district: "Satara", state: "Maharashtra", areaHa: 2.8, owner: "Smt. P. Shinde", landClassification: "Agricultural", intersectionPercent: 65, stage: "submission", compensationStatus: "none", possessionStatus: "none", status: "selected" },
  { id: "prcl-007", ulpin: "WB-MD-KHR-007", surveyNo: "12/3", village: "Kharagpur", tehsil: "Kharagpur", district: "Medinipur", state: "West Bengal", areaHa: 3.5, owner: "Shri. A. Das", landClassification: "Agricultural", intersectionPercent: 88, stage: "field_verification", compensationStatus: "awarded", possessionStatus: "pending", status: "selected" },
  { id: "prcl-008", ulpin: "DL-ND-DEF-008", surveyNo: "5/1", village: "New Delhi", tehsil: "New Delhi", district: "New Delhi", state: "Delhi", areaHa: 0.8, owner: "Delhi Urban Development", landClassification: "Government", intersectionPercent: 95, stage: "award", compensationStatus: "disbursed", possessionStatus: "complete", status: "selected" },
];

// ── Risk Projects ──
export type RiskProject = {
  projectName: string;
  projectId: string;
  state: string;
  district: string;
  currentStage: LifecycleStage;
  daysInStage: number;
  expectedDuration: number;
  risk: "critical" | "high";
  reason: string;
  recommendedAction: string;
  lastActivity: string;
};

export const RISK_PROJECTS: RiskProject[] = [
  { projectName: "NH-44 Srinagar–Jammu", projectId: "IA-NH-44-078", state: "Jammu & Kashmir", district: "Srinagar", currentStage: "sia", daysInStage: 195, expectedDuration: 180, risk: "critical", reason: "SIA deadline exceeded — public consultation pending in 3 villages", recommendedAction: "Coordinate with SIA Expert Group to expedite consultations", lastActivity: "2026-08-28" },
  { projectName: "NH-544 Pune–Satara Expansion", projectId: "IA-NH-544-047", state: "Maharashtra", district: "Pune", currentStage: "scrutiny", daysInStage: 28, expectedDuration: 21, risk: "high", reason: "Scrutiny pending beyond expected period — land schedule discrepancy", recommendedAction: "Respond to collector clarification request with updated documents", lastActivity: "2026-09-05" },
  { projectName: "NH-19 Six-Laning Kolkata–Puri", projectId: "IA-NH-19-034", state: "West Bengal", district: "Medinipur", currentStage: "field_verification", daysInStage: 35, expectedDuration: 30, risk: "high", reason: "Field verification pending — 3 parcels with ownership discrepancy", recommendedAction: "Provide updated land records to Field Officer", lastActivity: "2026-09-02" },
  { projectName: "NH-52 Pune–Bengaluru Corridor", projectId: "IA-NH-52-056", state: "Karnataka", district: "Belagavi", currentStage: "submission", daysInStage: 12, expectedDuration: 7, risk: "high", reason: "Submission pending beyond expected period — 5 days overdue", recommendedAction: "Submit project to State Nodal Officer, Karnataka", lastActivity: "2026-08-25" },
];

// ── Stakeholders ──
export type ProjectStakeholder = {
  id: string;
  name: string;
  role: string;
  organization: string;
  jurisdiction: string;
  level: "central" | "state" | "district" | "tehsil" | "field";
};

export const PROJECT_STAKEHOLDERS: ProjectStakeholder[] = [
  { id: "st-001", name: "Shri. Rajiv Malhotra, IAS", role: "Ministry Nodal Officer", organization: "MoRTH", jurisdiction: "National", level: "central" },
  { id: "st-002", name: "Shri. R. K. Sable, IAS", role: "State Nodal Officer", organization: "Revenue Dept., Maharashtra", jurisdiction: "Maharashtra", level: "state" },
  { id: "st-003", name: "Dr. Suhas Diwase, IAS", role: "District Collector / CALA", organization: "Collectorate, Pune", jurisdiction: "Pune District", level: "district" },
  { id: "st-004", name: "Smt. Kavita Patil", role: "Tehsil Officer / SDO", organization: "Tehsil Office, Haveli", jurisdiction: "Haveli Tehsil", level: "tehsil" },
  { id: "st-005", name: "Shri. M. Kamble", role: "Field Officer / VAO", organization: "Tehsil Office, Haveli", jurisdiction: "Mulshi Circle", level: "field" },
  { id: "st-006", name: "Prof. S. Mishra", role: "SIA Expert", organization: "SIA Expert Group", jurisdiction: "Pune Region", level: "central" },
  { id: "st-007", name: "Smt. Asha Khedkar", role: "R&R Officer", organization: "Revenue Dept., Pune", jurisdiction: "Pune — R&R Division", level: "district" },
  { id: "st-008", name: "Smt. R. Kulkarni", role: "Finance Officer", organization: "PFMS Cell, Pune", jurisdiction: "Pune — PFMS Cell", level: "district" },
];

// ── Notifications ──
export type RoNotification = {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  project: string;
  timestamp: string;
  read: boolean;
};

export const NOTIFICATIONS: RoNotification[] = [
  { id: "not-001", severity: "critical", title: "SIA deadline approaching — NH-44", description: "SIA deadline for NH-44 Srinagar–Jammu approaching in 5 days. Public consultation pending in 3 villages.", project: "NH-44 Srinagar–Jammu", timestamp: "2026-09-05T07:00:00+05:30", read: false },
  { id: "not-002", severity: "high", title: "Clarification request from Collector, Pune", description: "District Collector has requested clarification on land schedule for parcels 33/4A & 33/4B.", project: "NH-544 Pune–Satara Expansion", timestamp: "2026-09-04T16:30:00+05:30", read: false },
  { id: "not-003", severity: "medium", title: "State response received — NH-48", description: "Maharashtra State Nodal Officer has acknowledged the status update request for NH-48.", project: "NH-48 Mumbai–Pune Expressway", timestamp: "2026-09-04T10:00:00+05:30", read: false },
  { id: "not-004", severity: "low", title: "New project stakeholder added", description: "Shri. A. Deshmukh has been added as Project Director for NH-544 Expansion.", project: "NH-544 Pune–Satara Expansion", timestamp: "2026-09-03T14:00:00+05:30", read: true },
  { id: "not-005", severity: "high", title: "Compensation valuation dispute — NH-544", description: "8 parcels in Haveli tehsil show valuation discrepancy. Market value assessment methodology under review.", project: "NH-544 Pune–Satara Expansion", timestamp: "2026-09-03T14:00:00+05:30", read: false },
  { id: "not-006", severity: "medium", title: "Objection hearing scheduled — NH-66", description: "Hearing for NH-66 Goa Coastal Highway objections scheduled for 20 Sep 2026.", project: "NH-66 Goa Coastal Highway", timestamp: "2026-09-02T11:00:00+05:30", read: false },
  { id: "not-007", severity: "low", title: "Document version update — SIA Report", description: "SIA report for NH-44 updated to v0.4. Previous version v0.3 archived.", project: "NH-44 Srinagar–Jammu", timestamp: "2026-08-30T16:00:00+05:30", read: true },
];
