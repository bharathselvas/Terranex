import type { LifecycleStage } from "@/types/domain";

export type StateProfile = {
  id: string;
  name: string;
  code: string;
  nodalOfficer: string;
  designation: string;
  contact: string;
  activeProjects: number;
  totalDistricts: number;
  totalParcels: number;
  statesCovered: number;
};

export const STATE_PROFILE: StateProfile = {
  id: "state-mh",
  name: "Maharashtra",
  code: "MH",
  nodalOfficer: "Shri. R. K. Sable, IAS",
  designation: "State Nodal Officer — Land Acquisition Coordination",
  contact: "sno.maharashtra@gov.in",
  activeProjects: 37,
  totalDistricts: 14,
  totalParcels: 24821,
  statesCovered: 1,
};

export type DashboardKPI = {
  label: string;
  value: string;
  subtext: string;
  color?: string;
};

export const DASHBOARD_KPIS: DashboardKPI[] = [
  { label: "Active Projects", value: "37", subtext: "Across 14 districts" },
  { label: "Projects Awaiting Routing", value: "6", subtext: "Pending state review" },
  { label: "Districts Involved", value: "14", subtext: "Of 36 total" },
  { label: "Total Parcels", value: "24,821", subtext: "Under acquisition" },
  { label: "Acquisition Area", value: "48,200 Ha", subtext: "Estimated total" },
  { label: "Affected Families", value: "6,412", subtext: "Across all projects" },
  { label: "Compensation Assessed", value: "₹1,482 Cr", subtext: "Total assessed" },
  { label: "Compensation Disbursed", value: "₹1,104 Cr", subtext: "74.5% disbursed", color: "text-emerald-700" },
  { label: "Possession Completed", value: "62%", subtext: "Of eligible parcels", color: "text-emerald-700" },
  { label: "R&R Completed", value: "54%", subtext: "Of applicable families", color: "text-amber-700" },
  { label: "Delayed Projects", value: "5", subtext: "Critical / high risk", color: "text-red-700" },
  { label: "Critical Cases", value: "3", subtext: "Immediate attention", color: "text-red-700" },
];

export type PipelineStage = {
  stage: LifecycleStage;
  count: number;
  parcels: number;
  percentage: number;
  delayed: number;
};

export const STATE_PIPELINE: PipelineStage[] = [
  { stage: "project_proposal", count: 4, parcels: 1840, percentage: 10.8, delayed: 0 },
  { stage: "land_requirement", count: 3, parcels: 1200, percentage: 8.1, delayed: 0 },
  { stage: "gis_identification", count: 2, parcels: 960, percentage: 5.4, delayed: 1 },
  { stage: "submission", count: 3, parcels: 1420, percentage: 8.1, delayed: 0 },
  { stage: "scrutiny", count: 5, parcels: 3200, percentage: 13.5, delayed: 2 },
  { stage: "sia", count: 4, parcels: 2800, percentage: 10.8, delayed: 1 },
  { stage: "preliminary_notification", count: 2, parcels: 1100, percentage: 5.4, delayed: 0 },
  { stage: "public_disclosure", count: 2, parcels: 980, percentage: 5.4, delayed: 0 },
  { stage: "objections_hearing", count: 3, parcels: 2100, percentage: 8.1, delayed: 1 },
  { stage: "declaration", count: 2, parcels: 1600, percentage: 5.4, delayed: 0 },
  { stage: "field_verification", count: 2, parcels: 1400, percentage: 5.4, delayed: 0 },
  { stage: "compensation", count: 1, parcels: 820, percentage: 2.7, delayed: 0 },
  { stage: "award", count: 1, parcels: 640, percentage: 2.7, delayed: 0 },
  { stage: "payment", count: 1, parcels: 520, percentage: 2.7, delayed: 0 },
  { stage: "possession", count: 1, parcels: 480, percentage: 2.7, delayed: 0 },
  { stage: "r_and_r", count: 1, parcels: 1961, percentage: 2.7, delayed: 0 },
  { stage: "closed", count: 0, parcels: 0, percentage: 0, delayed: 0 },
];

export type IncomingProject = {
  id: string;
  projectName: string;
  projectCode: string;
  ministry: string;
  implementingAgency: string;
  requestedState: string;
  districts: string[];
  estimatedParcels: number;
  estimatedAreaHa: number;
  submissionDate: string;
  status: "new" | "under_review" | "clarification_required" | "accepted" | "routed" | "returned";
  priority: "critical" | "high" | "medium" | "low";
  sector: string;
  purpose: string;
};

export const INCOMING_PROJECTS: IncomingProject[] = [
  {
    id: "proj-in-001",
    projectName: "NH-544 Pune–Satara Six-Laning",
    projectCode: "NH-544/MH/2026",
    ministry: "MoRTH",
    implementingAgency: "NHAI — Pune Region",
    requestedState: "Maharashtra",
    districts: ["Pune", "Satara"],
    estimatedParcels: 1284,
    estimatedAreaHa: 2480,
    submissionDate: "2026-04-15",
    status: "new",
    priority: "high",
    sector: "Highways",
    purpose: "Six-laning of NH-544 from Pune to Satara for improved connectivity",
  },
  {
    id: "proj-in-002",
    projectName: "Pune Ring Road Phase II",
    projectCode: "PRR-02/MH/2026",
    ministry: "MoRTH",
    implementingAgency: "Maharashtra MRIDC",
    requestedState: "Maharashtra",
    districts: ["Pune"],
    estimatedParcels: 2100,
    estimatedAreaHa: 3200,
    submissionDate: "2026-03-20",
    status: "under_review",
    priority: "critical",
    sector: "Highways",
    purpose: "Construction of Pune Ring Road Phase II to decongest city traffic",
  },
  {
    id: "proj-in-003",
    projectName: "Mumbai–Nagpur Expressway Spur",
    projectCode: "MNE-SP/MH/2026",
    ministry: "MoRTH",
    implementingAgency: "NHAI — Nagpur Region",
    requestedState: "Maharashtra",
    districts: ["Nagpur", "Wardha"],
    estimatedParcels: 860,
    estimatedAreaHa: 1840,
    submissionDate: "2026-05-01",
    status: "new",
    priority: "medium",
    sector: "Highways",
    purpose: "Spur connecting Mumbai–Nagpur Expressway to Wardha industrial zone",
  },
  {
    id: "proj-in-004",
    projectName: "Delhi Metro Phase 4 Extension",
    projectCode: "DMRC-P4/MH/2026",
    ministry: "MoHUA",
    implementingAgency: "DMRC",
    requestedState: "Maharashtra",
    districts: ["Mumbai"],
    estimatedParcels: 180,
    estimatedAreaHa: 120,
    submissionDate: "2026-06-10",
    status: "clarification_required",
    priority: "medium",
    sector: "Urban Transit",
    purpose: "Metro extension in Mumbai metropolitan region",
  },
  {
    id: "proj-in-005",
    projectName: "Nagpur Metro Phase II",
    projectCode: "NMRC-P2/MH/2026",
    ministry: "MoHUA",
    implementingAgency: "Nagpur Metro Rail Corp",
    requestedState: "Maharashtra",
    districts: ["Nagpur"],
    estimatedParcels: 420,
    estimatedAreaHa: 340,
    submissionDate: "2026-02-28",
    status: "accepted",
    priority: "medium",
    sector: "Urban Transit",
    purpose: "Phase II expansion of Nagpur Metro to reach western suburbs",
  },
  {
    id: "proj-in-006",
    projectName: "Jalna Industrial Corridor",
    projectCode: "JIC/MH/2026",
    ministry: "MoCI",
    implementingAgency: "DMICDC",
    requestedState: "Maharashtra",
    districts: ["Jalna", "Aurangabad"],
    estimatedParcels: 640,
    estimatedAreaHa: 1200,
    submissionDate: "2026-07-05",
    status: "new",
    priority: "low",
    sector: "Industrial",
    purpose: "Industrial corridor development in Jalna district",
  },
];

export type StateProject = {
  id: string;
  projectName: string;
  projectCode: string;
  ministry: string;
  implementingAgency: string;
  district: string;
  parcels: number;
  areaHa: number;
  currentStage: LifecycleStage;
  progress: number;
  risk: "critical" | "high" | "medium" | "low" | "on_track";
  lastActivity: string;
  budgetCr: number;
  status: "active" | "completed" | "on_hold" | "routing";
  affectedFamilies: number;
  createdDate: string;
};

export const STATE_PROJECTS: StateProject[] = [
  { id: "proj-001", projectName: "NH-544 Pune–Satara Expansion", projectCode: "NH-544/MH", ministry: "MoRTH", implementingAgency: "NHAI", district: "Pune", parcels: 842, areaHa: 1640, currentStage: "scrutiny", progress: 35, risk: "high", lastActivity: "2026-09-01", budgetCr: 4200, status: "active", affectedFamilies: 1240, createdDate: "2025-11-15" },
  { id: "proj-002", projectName: "Pune Ring Road Phase II", projectCode: "PRR-02/MH", ministry: "MoRTH", implementingAgency: "MRIDC", district: "Pune", parcels: 2100, areaHa: 3200, currentStage: "sia", progress: 38, risk: "critical", lastActivity: "2026-09-05", budgetCr: 8500, status: "active", affectedFamilies: 2100, createdDate: "2025-09-20" },
  { id: "proj-003", projectName: "Satara Bypass Road", projectCode: "SBR/MH", ministry: "MoRTH", implementingAgency: "NHAI", district: "Satara", parcels: 442, areaHa: 780, currentStage: "compensation", progress: 72, risk: "medium", lastActivity: "2026-08-28", budgetCr: 1800, status: "active", affectedFamilies: 580, createdDate: "2025-08-10" },
  { id: "proj-004", projectName: "Nagpur Metro Phase II", projectCode: "NMRC-P2/MH", ministry: "MoHUA", implementingAgency: "Nagpur Metro Rail Corp", district: "Nagpur", parcels: 420, areaHa: 340, currentStage: "preliminary_notification", progress: 48, risk: "on_track", lastActivity: "2026-09-03", budgetCr: 3200, status: "active", affectedFamilies: 860, createdDate: "2025-10-05" },
  { id: "proj-005", projectName: "Nagpur–Wardha Expressway", projectCode: "NWE/MH", ministry: "MoRTH", implementingAgency: "NHAI", district: "Nagpur", parcels: 580, areaHa: 1200, currentStage: "objections_hearing", progress: 52, risk: "high", lastActivity: "2026-08-20", budgetCr: 2800, status: "active", affectedFamilies: 920, createdDate: "2025-07-22" },
  { id: "proj-006", projectName: "Jalna Industrial Access Road", projectCode: "JIAR/MH", ministry: "MoCI", implementingAgency: "DMICDC", district: "Jalna", parcels: 280, areaHa: 460, currentStage: "submission", progress: 22, risk: "low", lastActivity: "2026-08-15", budgetCr: 900, status: "active", affectedFamilies: 340, createdDate: "2026-01-10" },
  { id: "proj-007", projectName: "Aurangabad–Mumbai Highway", projectCode: "AMH/MH", ministry: "MoRTH", implementingAgency: "NHAI", district: "Aurangabad", parcels: 720, areaHa: 1400, currentStage: "declaration", progress: 58, risk: "medium", lastActivity: "2026-09-02", budgetCr: 3600, status: "active", affectedFamilies: 880, createdDate: "2025-06-18" },
  { id: "proj-008", projectName: "Pune Metro Line 3", projectCode: "PML-3/MH", ministry: "MoHUA", implementingAgency: "Pune Metro Rail Corp", district: "Pune", parcels: 320, areaHa: 180, currentStage: "field_verification", progress: 62, risk: "on_track", lastActivity: "2026-09-04", budgetCr: 4500, status: "active", affectedFamilies: 640, createdDate: "2025-05-12" },
  { id: "proj-009", projectName: "Satara–Kolhapur Connectivity", projectCode: "SKC/MH", ministry: "MoRTH", implementingAgency: "MRIDC", district: "Satara", parcels: 360, areaHa: 680, currentStage: "award", progress: 82, risk: "low", lastActivity: "2026-08-30", budgetCr: 1400, status: "active", affectedFamilies: 420, createdDate: "2025-04-20" },
  { id: "proj-010", projectName: "Nashik–Pune Expressway Spur", projectCode: "NPE-S/MH", ministry: "MoRTH", implementingAgency: "NHAI", district: "Nashik", parcels: 540, areaHa: 980, currentStage: "payment", progress: 88, risk: "on_track", lastActivity: "2026-09-01", budgetCr: 2200, status: "active", affectedFamilies: 620, createdDate: "2025-03-15" },
  { id: "proj-011", projectName: "Mumbai Coastal Road Phase II", projectCode: "MCR-P2/MH", ministry: "MoRTH", implementingAgency: "MMRDA", district: "Mumbai", parcels: 180, areaHa: 95, currentStage: "possession", progress: 92, risk: "on_track", lastActivity: "2026-09-05", budgetCr: 6200, status: "active", affectedFamilies: 280, createdDate: "2025-02-28" },
  { id: "proj-012", projectName: "Thane–Bhiwandi Link Road", projectCode: "TBLR/MH", ministry: "MoRTH", implementingAgency: "MSRDC", district: "Thane", parcels: 240, areaHa: 320, currentStage: "r_and_r", progress: 94, risk: "on_track", lastActivity: "2026-08-25", budgetCr: 800, status: "active", affectedFamilies: 360, createdDate: "2025-01-20" },
  { id: "proj-013", projectName: "Pune–Mumbai Hyperloop Corridor", projectCode: "PMHC/MH", ministry: "MoRTH", implementingAgency: "Hyperloop Transport Tech", district: "Pune", parcels: 160, areaHa: 240, currentStage: "project_proposal", progress: 8, risk: "low", lastActivity: "2026-09-01", budgetCr: 12000, status: "active", affectedFamilies: 180, createdDate: "2026-08-01" },
  { id: "proj-014", projectName: "Kolhapur Airport Expansion", projectCode: "KAE/MH", ministry: "MoCA", implementingAgency: "AAI", district: "Kolhapur", parcels: 120, areaHa: 180, currentStage: "land_requirement", progress: 12, risk: "low", lastActivity: "2026-08-22", budgetCr: 450, status: "active", affectedFamilies: 140, createdDate: "2026-07-15" },
  { id: "proj-015", projectName: "Nagpur Smart City Corridor", projectCode: "NSCC/MH", ministry: "MoHUA", implementingAgency: "Nagpur Smart City Ltd", district: "Nagpur", parcels: 380, areaHa: 260, currentStage: "gis_identification", progress: 18, risk: "medium", lastActivity: "2026-08-18", budgetCr: 1800, status: "active", affectedFamilies: 480, createdDate: "2026-06-20" },
];

export type DistrictData = {
  id: string;
  name: string;
  collector: string;
  collectorDesignation: string;
  projects: number;
  parcels: number;
  areaHa: number;
  currentStage: LifecycleStage;
  progress: number;
  compensationAssessedCr: number;
  compensationDisbursedCr: number;
  possessionPercent: number;
  rnrPercent: number;
  delayed: number;
  risk: "critical" | "high" | "medium" | "low" | "on_track";
  tehsils: number;
};

export const DISTRICT_DATA: DistrictData[] = [
  { id: "dist-001", name: "Pune", collector: "Dr. Suhas Diwase, IAS", collectorDesignation: "District Collector & CALA", projects: 12, parcels: 8421, areaHa: 16200, currentStage: "scrutiny", progress: 74, compensationAssessedCr: 420, compensationDisbursedCr: 310, possessionPercent: 68, rnrPercent: 62, delayed: 2, risk: "high", tehsils: 14 },
  { id: "dist-002", name: "Satara", collector: "Shri. P. K. Jaiswal, IAS", collectorDesignation: "District Collector & CALA", projects: 7, parcels: 4212, areaHa: 8400, currentStage: "compensation", progress: 61, compensationAssessedCr: 180, compensationDisbursedCr: 140, possessionPercent: 55, rnrPercent: 48, delayed: 0, risk: "medium", tehsils: 10 },
  { id: "dist-003", name: "Nagpur", collector: "Smt. N. W. Raut, IAS", collectorDesignation: "District Collector & CALA", projects: 5, parcels: 2842, areaHa: 5600, currentStage: "preliminary_notification", progress: 82, compensationAssessedCr: 220, compensationDisbursedCr: 180, possessionPercent: 72, rnrPercent: 58, delayed: 1, risk: "medium", tehsils: 12 },
  { id: "dist-004", name: "Aurangabad", collector: "Shri. G. H. Rajurkar, IAS", collectorDesignation: "District Collector & CALA", projects: 4, parcels: 2100, areaHa: 4200, currentStage: "declaration", progress: 58, compensationAssessedCr: 160, compensationDisbursedCr: 100, possessionPercent: 45, rnrPercent: 38, delayed: 0, risk: "medium", tehsils: 9 },
  { id: "dist-005", name: "Nashik", collector: "Dr. A. V. Raut, IAS", collectorDesignation: "District Collector & CALA", projects: 3, parcels: 1800, areaHa: 3600, currentStage: "payment", progress: 88, compensationAssessedCr: 140, compensationDisbursedCr: 120, possessionPercent: 78, rnrPercent: 70, delayed: 0, risk: "low", tehsils: 13 },
  { id: "dist-006", name: "Thane", collector: "Smt. R. S. Shankar, IAS", collectorDesignation: "District Collector & CALA", projects: 2, parcels: 1200, areaHa: 1800, currentStage: "r_and_r", progress: 94, compensationAssessedCr: 90, compensationDisbursedCr: 85, possessionPercent: 90, rnrPercent: 85, delayed: 0, risk: "low", tehsils: 8 },
  { id: "dist-007", name: "Kolhapur", collector: "Shri. S. D. Kadam, IAS", collectorDesignation: "District Collector & CALA", projects: 1, parcels: 120, areaHa: 180, currentStage: "land_requirement", progress: 12, compensationAssessedCr: 20, compensationDisbursedCr: 0, possessionPercent: 0, rnrPercent: 0, delayed: 0, risk: "low", tehsils: 12 },
  { id: "dist-008", name: "Jalna", collector: "Shri. M. T. Kshirsagar, IAS", collectorDesignation: "District Collector & CALA", projects: 1, parcels: 280, areaHa: 460, currentStage: "submission", progress: 22, compensationAssessedCr: 30, compensationDisbursedCr: 0, possessionPercent: 0, rnrPercent: 0, delayed: 0, risk: "low", tehsils: 6 },
  { id: "dist-009", name: "Wardha", collector: "Smt. P. B. Meshram, IAS", collectorDesignation: "District Collector & CALA", projects: 1, parcels: 280, areaHa: 560, currentStage: "sia", progress: 30, compensationAssessedCr: 0, compensationDisbursedCr: 0, possessionPercent: 0, rnrPercent: 0, delayed: 0, risk: "on_track", tehsils: 8 },
  { id: "dist-010", name: "Mumbai", collector: "Dr. S. V. Rane, IAS", collectorDesignation: "District Collector & CALA", projects: 1, parcels: 180, areaHa: 95, currentStage: "possession", progress: 92, compensationAssessedCr: 320, compensationDisbursedCr: 270, possessionPercent: 88, rnrPercent: 78, delayed: 0, risk: "low", tehsils: 2 },
];

export type WorkQueueItem = {
  id: string;
  type: "incoming_project" | "clarification" | "district_status" | "sia_update" | "compensation" | "notification" | "risk" | "request";
  title: string;
  project: string;
  district: string;
  priority: "critical" | "high" | "medium" | "low";
  dueDate: string;
  status: "pending" | "in_progress" | "completed" | "overdue";
  assignedTo: string;
  description: string;
};

export const WORK_QUEUE: WorkQueueItem[] = [
  { id: "wq-001", type: "incoming_project", title: "New project for state review", project: "NH-544 Pune–Satara Six-Laning", district: "Pune", priority: "high", dueDate: "2026-09-15", status: "pending", assignedTo: "Shri. R. K. Sable", description: "Project submitted by NHAI for state-level coordination review" },
  { id: "wq-002", type: "incoming_project", title: "New project for state review", project: "Pune Ring Road Phase II", district: "Pune", priority: "critical", dueDate: "2026-09-10", status: "in_progress", assignedTo: "Shri. R. K. Sable", description: "Critical project awaiting state review and district routing" },
  { id: "wq-003", type: "clarification", title: "Clarification needed on district mapping", project: "Delhi Metro Phase 4 Extension", district: "Mumbai", priority: "medium", dueDate: "2026-09-20", status: "pending", assignedTo: "Shri. R. K. Sable", description: "RO has provided incomplete district mapping information" },
  { id: "wq-004", type: "sia_update", title: "SIA deadline approaching", project: "Pune Ring Road Phase II", district: "Pune", priority: "critical", dueDate: "2026-09-12", status: "pending", assignedTo: "SIA Authority — Pune", description: "SIA report due within 10 days — 180-day statutory timeline" },
  { id: "wq-005", type: "risk", title: "District action pending", project: "NH-544 Pune–Satara Expansion", district: "Pune", priority: "high", dueDate: "2026-09-08", status: "overdue", assignedTo: "District Collector, Pune", description: "Scrutiny pending for 37 days — exceeds 21-day SLA" },
  { id: "wq-006", type: "notification", title: "Section 11 notification published", project: "Nagpur Metro Phase II", district: "Nagpur", priority: "low", dueDate: "2026-09-25", status: "completed", assignedTo: "District Collector, Nagpur", description: "Section 11 preliminary notification published in 3 newspapers" },
  { id: "wq-007", type: "district_status", title: "District progress report due", project: "Aurangabad–Mumbai Highway", district: "Aurangabad", priority: "medium", dueDate: "2026-09-18", status: "pending", assignedTo: "District Collector, Aurangabad", description: "Monthly progress report for September 2026" },
  { id: "wq-008", type: "compensation", title: "Compensation disbursement lagging", project: "Satara Bypass Road", district: "Satara", priority: "high", dueDate: "2026-09-14", status: "pending", assignedTo: "District Collector, Satara", description: "Compensation awarded but disbursement pending for 45+ parcels" },
];

export type IncomingProjectReview = {
  projectId: string;
  stateIncluded: boolean;
  districtMappingAvailable: boolean;
  gisFootprintAvailable: boolean;
  projectInfoComplete: boolean;
  stakeholderInfoAvailable: boolean;
  notes: string;
};

export const PROJECT_REVIEWS: Record<string, IncomingProjectReview> = {
  "proj-in-001": {
    projectId: "proj-in-001",
    stateIncluded: true,
    districtMappingAvailable: true,
    gisFootprintAvailable: true,
    projectInfoComplete: true,
    stakeholderInfoAvailable: true,
    notes: "Project information complete. District mapping shows Pune and Satara districts. GIS footprint available. Ready for state-level coordination review.",
  },
  "proj-in-002": {
    projectId: "proj-in-002",
    stateIncluded: true,
    districtMappingAvailable: true,
    gisFootprintAvailable: true,
    projectInfoComplete: true,
    stakeholderInfoAvailable: true,
    notes: "Pune Ring Road Phase II — critical priority. Multiple villages affected. GIS footprint overlaps with existing Pune district projects. Coordination with Pune collector needed.",
  },
  "proj-in-003": {
    projectId: "proj-in-003",
    stateIncluded: true,
    districtMappingAvailable: true,
    gisFootprintAvailable: false,
    projectInfoComplete: true,
    stakeholderInfoAvailable: true,
    notes: "Nagpur–Wardha spur project. GIS footprint pending — RO to provide updated survey data.",
  },
  "proj-in-004": {
    projectId: "proj-in-004",
    stateIncluded: true,
    districtMappingAvailable: false,
    gisFootprintAvailable: false,
    projectInfoComplete: false,
    stakeholderInfoAvailable: false,
    notes: "Clarification required: district mapping incomplete. Mumbai district reference provided but tehsil-level data missing. Requesting updated submission package.",
  },
  "proj-in-005": {
    projectId: "proj-in-005",
    stateIncluded: true,
    districtMappingAvailable: true,
    gisFootprintAvailable: true,
    projectInfoComplete: true,
    stakeholderInfoAvailable: true,
    notes: "Accepted for routing. Nagpur district identified. Ready to route to District Collector, Nagpur.",
  },
  "proj-in-006": {
    projectId: "proj-in-006",
    stateIncluded: true,
    districtMappingAvailable: true,
    gisFootprintAvailable: false,
    projectInfoComplete: true,
    stakeholderInfoAvailable: true,
    notes: "Jalna industrial corridor. GIS footprint pending from DMICDC. District mapping includes Jalna and Aurangabad.",
  },
};

export type StateDepartment = {
  id: string;
  name: string;
  representative: string;
  designation: string;
  projects: number;
  pendingRequests: number;
  status: "active" | "inactive" | "limited";
};

export const STATE_DEPARTMENTS: StateDepartment[] = [
  { id: "dept-001", name: "Revenue Department", representative: "Shri. V. G. Raut", designation: "Secretary, Revenue Dept", projects: 37, pendingRequests: 4, status: "active" },
  { id: "dept-002", name: "R&R Department", representative: "Smt. A. S. Kshirsagar", designation: "Commissioner, R&R", projects: 28, pendingRequests: 6, status: "active" },
  { id: "dept-003", name: "Finance Department", representative: "Shri. P. D. Deshmukh", designation: "Joint Secretary, Finance", projects: 37, pendingRequests: 2, status: "active" },
  { id: "dept-004", name: "Forest Department", representative: "Dr. R. K. Patil", designation: "Principal Chief Conservator", projects: 8, pendingRequests: 3, status: "active" },
  { id: "dept-005", name: "Tribal Welfare Department", representative: "Smt. S. V. Wankhede", designation: "Commissioner, Tribal Welfare", projects: 5, pendingRequests: 1, status: "active" },
  { id: "dept-006", name: "Registration Department", representative: "Shri. A. B. Jadhav", designation: "Inspector General of Registration", projects: 37, pendingRequests: 0, status: "active" },
];

export type StakeholderEntry = {
  id: string;
  organization: string;
  role: string;
  jurisdiction: string;
  projects: number;
  status: "active" | "inactive" | "pending";
  lastActivity: string;
};

export const STAKEHOLDERS: StakeholderEntry[] = [
  { id: "sh-001", organization: "Ministry of Road Transport & Highways", role: "Central Ministry", jurisdiction: "National", projects: 24, status: "active", lastActivity: "2026-09-05" },
  { id: "sh-002", organization: "NHAI", role: "Requiring Organisation", jurisdiction: "Pune / Satara / Nashik", projects: 18, status: "active", lastActivity: "2026-09-04" },
  { id: "sh-003", organization: "Maharashtra MRIDC", role: "Implementing Agency", jurisdiction: "Pune / Thane", projects: 6, status: "active", lastActivity: "2026-09-03" },
  { id: "sh-004", organization: "Pune Metro Rail Corp", role: "Implementing Agency", jurisdiction: "Pune", projects: 2, status: "active", lastActivity: "2026-09-04" },
  { id: "sh-005", organization: "Nagpur Metro Rail Corp", role: "Implementing Agency", jurisdiction: "Nagpur", projects: 1, status: "active", lastActivity: "2026-09-03" },
  { id: "sh-006", organization: "SIA Expert Group — Pune", role: "SIA Authority", jurisdiction: "Pune District", projects: 4, status: "active", lastActivity: "2026-09-01" },
  { id: "sh-007", organization: "R&R Division — Pune", role: "R&R Authority", jurisdiction: "Pune District", projects: 3, status: "active", lastActivity: "2026-08-28" },
  { id: "sh-008", organization: "District Collector, Pune", role: "District Authority", jurisdiction: "Pune", projects: 12, status: "active", lastActivity: "2026-09-05" },
  { id: "sh-009", organization: "District Collector, Nagpur", role: "District Authority", jurisdiction: "Nagpur", projects: 5, status: "active", lastActivity: "2026-09-03" },
  { id: "sh-010", organization: "District Collector, Satara", role: "District Authority", jurisdiction: "Satara", projects: 7, status: "active", lastActivity: "2026-08-30" },
];

export type StateRequest = {
  id: string;
  type: "project_information" | "district_status" | "parcel_clarification" | "document_request" | "timeline_update" | "sia_update" | "compensation_update" | "possession_update" | "rnr_update";
  from: string;
  to: string;
  project: string;
  district: string;
  priority: "critical" | "high" | "medium" | "low";
  createdDate: string;
  dueDate: string;
  status: "pending" | "in_progress" | "completed" | "overdue";
  description: string;
};

export const STATE_REQUESTS: StateRequest[] = [
  { id: "req-001", type: "sia_update", from: "State Nodal Officer", to: "SIA Authority — Pune", project: "Pune Ring Road Phase II", district: "Pune", priority: "critical", createdDate: "2026-08-20", dueDate: "2026-09-12", status: "pending", description: "Request SIA status update — 180-day statutory deadline approaching" },
  { id: "req-002", type: "district_status", from: "State Nodal Officer", to: "District Collector, Pune", project: "NH-544 Pune–Satara Expansion", district: "Pune", priority: "high", createdDate: "2026-08-25", dueDate: "2026-09-10", status: "pending", description: "Request updated status on scrutiny completion — 37 days pending" },
  { id: "req-003", type: "compensation_update", from: "State Nodal Officer", to: "District Collector, Satara", project: "Satara Bypass Road", district: "Satara", priority: "high", createdDate: "2026-08-28", dueDate: "2026-09-14", status: "pending", description: "Compensation disbursement lagging — 45+ parcels pending payment" },
  { id: "req-004", type: "project_information", from: "NHAI", to: "State Nodal Officer", project: "NH-544 Pune–Satara Six-Laning", district: "Pune", priority: "medium", createdDate: "2026-09-01", dueDate: "2026-09-15", status: "in_progress", description: "RO providing updated project information for state review" },
  { id: "req-005", type: "document_request", from: "State Nodal Officer", to: "District Collector, Nagpur", project: "Nagpur Metro Phase II", district: "Nagpur", priority: "low", createdDate: "2026-09-03", dueDate: "2026-09-20", status: "completed", description: "Request copy of Section 11 notification publication proof" },
  { id: "req-006", type: "timeline_update", from: "State Nodal Officer", to: "District Collector, Aurangabad", project: "Aurangabad–Mumbai Highway", district: "Aurangabad", priority: "medium", createdDate: "2026-09-02", dueDate: "2026-09-18", status: "pending", description: "Monthly progress report and timeline update for September" },
  { id: "req-007", type: "rnr_update", from: "State Nodal Officer", to: "R&R Division — Pune", project: "Pune Ring Road Phase II", district: "Pune", priority: "high", createdDate: "2026-08-30", dueDate: "2026-09-15", status: "pending", description: "R&R assessment status for 2,100 affected families" },
  { id: "req-008", type: "parcel_clarification", from: "State Nodal Officer", to: "NHAI — Pune Region", project: "NH-544 Pune–Satara Expansion", district: "Pune", priority: "medium", createdDate: "2026-09-01", dueDate: "2026-09-12", status: "in_progress", description: "Clarification needed on 12 parcels with overlapping ownership claims" },
];

export type CompensationDistrict = {
  district: string;
  projects: number;
  assessedCr: number;
  awardedCr: number;
  disbursedCr: number;
  pendingCr: number;
  parcelsTotal: number;
  parcelsAssessed: number;
  parcelsAwarded: number;
  parcelsDisbursed: number;
};

export const COMPENSATION_DATA: CompensationDistrict[] = [
  { district: "Pune", projects: 12, assessedCr: 420, awardedCr: 380, disbursedCr: 310, pendingCr: 70, parcelsTotal: 8421, parcelsAssessed: 7200, parcelsAwarded: 6400, parcelsDisbursed: 5200 },
  { district: "Satara", projects: 7, assessedCr: 180, awardedCr: 160, disbursedCr: 140, pendingCr: 20, parcelsTotal: 4212, parcelsAssessed: 3800, parcelsAwarded: 3200, parcelsDisbursed: 2800 },
  { district: "Nagpur", projects: 5, assessedCr: 220, awardedCr: 200, disbursedCr: 180, pendingCr: 20, parcelsTotal: 2842, parcelsAssessed: 2600, parcelsAwarded: 2200, parcelsDisbursed: 1800 },
  { district: "Aurangabad", projects: 4, assessedCr: 160, awardedCr: 120, disbursedCr: 100, pendingCr: 20, parcelsTotal: 2100, parcelsAssessed: 1800, parcelsAwarded: 1400, parcelsDisbursed: 1000 },
  { district: "Nashik", projects: 3, assessedCr: 140, awardedCr: 130, disbursedCr: 120, pendingCr: 10, parcelsTotal: 1800, parcelsAssessed: 1700, parcelsAwarded: 1500, parcelsDisbursed: 1400 },
  { district: "Thane", projects: 2, assessedCr: 90, awardedCr: 88, disbursedCr: 85, pendingCr: 3, parcelsTotal: 1200, parcelsAssessed: 1100, parcelsAwarded: 1050, parcelsDisbursed: 1000 },
  { district: "Kolhapur", projects: 1, assessedCr: 20, awardedCr: 0, disbursedCr: 0, pendingCr: 0, parcelsTotal: 120, parcelsAssessed: 0, parcelsAwarded: 0, parcelsDisbursed: 0 },
  { district: "Jalna", projects: 1, assessedCr: 30, awardedCr: 0, disbursedCr: 0, pendingCr: 0, parcelsTotal: 280, parcelsAssessed: 0, parcelsAwarded: 0, parcelsDisbursed: 0 },
];

export type PossessionDistrict = {
  district: string;
  project: string;
  eligible: number;
  completed: number;
  pending: number;
  disputed: number;
};

export const POSSESSION_DATA: PossessionDistrict[] = [
  { district: "Pune", project: "NH-544 Pune–Satara Expansion", eligible: 620, completed: 420, pending: 160, disputed: 40 },
  { district: "Pune", project: "Pune Ring Road Phase II", eligible: 480, completed: 280, pending: 180, disputed: 20 },
  { district: "Satara", project: "Satara Bypass Road", eligible: 320, completed: 180, pending: 120, disputed: 20 },
  { district: "Nagpur", project: "Nagpur Metro Phase II", eligible: 280, completed: 200, pending: 60, disputed: 20 },
  { district: "Nashik", project: "Nashik–Pune Expressway Spur", eligible: 400, completed: 310, pending: 80, disputed: 10 },
  { district: "Mumbai", project: "Mumbai Coastal Road Phase II", eligible: 160, completed: 140, pending: 15, disputed: 5 },
  { district: "Thane", project: "Thane–Bhiwandi Link Road", eligible: 200, completed: 180, pending: 15, disputed: 5 },
  { district: "Aurangabad", project: "Aurangabad–Mumbai Highway", eligible: 340, completed: 150, pending: 160, disputed: 30 },
];

export type RnrDistrict = {
  district: string;
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
    employment: { completed: number; pending: number };
    skillTraining: { completed: number; pending: number };
  };
};

export const RNR_DATA: RnrDistrict[] = [
  {
    district: "Pune", affectedFamilies: 2100, rrApplicable: 1800, completed: 1100, pending: 700, atRisk: 120,
    components: { housing: { completed: 800, pending: 400 }, subsistence: { completed: 1000, pending: 200 }, transport: { completed: 900, pending: 300 }, livelihood: { completed: 700, pending: 500 }, employment: { completed: 600, pending: 600 }, skillTraining: { completed: 500, pending: 700 } },
  },
  {
    district: "Satara", affectedFamilies: 580, rrApplicable: 500, completed: 240, pending: 260, atRisk: 40,
    components: { housing: { completed: 180, pending: 120 }, subsistence: { completed: 220, pending: 80 }, transport: { completed: 200, pending: 100 }, livelihood: { completed: 160, pending: 140 }, employment: { completed: 120, pending: 180 }, skillTraining: { completed: 100, pending: 200 } },
  },
  {
    district: "Nagpur", affectedFamilies: 860, rrApplicable: 740, completed: 430, pending: 310, atRisk: 60,
    components: { housing: { completed: 320, pending: 180 }, subsistence: { completed: 400, pending: 100 }, transport: { completed: 380, pending: 120 }, livelihood: { completed: 300, pending: 200 }, employment: { completed: 260, pending: 240 }, skillTraining: { completed: 220, pending: 280 } },
  },
  {
    district: "Aurangabad", affectedFamilies: 880, rrApplicable: 760, completed: 290, pending: 470, atRisk: 80,
    components: { housing: { completed: 200, pending: 280 }, subsistence: { completed: 260, pending: 140 }, transport: { completed: 240, pending: 160 }, livelihood: { completed: 180, pending: 220 }, employment: { completed: 140, pending: 260 }, skillTraining: { completed: 120, pending: 280 } },
  },
  {
    district: "Nashik", affectedFamilies: 620, rrApplicable: 540, completed: 380, pending: 160, atRisk: 20,
    components: { housing: { completed: 280, pending: 80 }, subsistence: { completed: 340, pending: 40 }, transport: { completed: 320, pending: 60 }, livelihood: { completed: 260, pending: 120 }, employment: { completed: 220, pending: 160 }, skillTraining: { completed: 200, pending: 180 } },
  },
];

export type RiskProject = {
  projectId: string;
  projectName: string;
  district: string;
  stage: LifecycleStage;
  daysInStage: number;
  risk: "critical" | "high" | "medium" | "low";
  reason: string;
  lastActivity: string;
};

export const RISK_DATA: RiskProject[] = [
  { projectId: "proj-002", projectName: "Pune Ring Road Phase II", district: "Pune", stage: "sia", daysInStage: 165, risk: "critical", reason: "SIA deadline approaching — 15 days remaining of 180-day statutory limit", lastActivity: "2026-09-05" },
  { projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", district: "Pune", stage: "scrutiny", daysInStage: 37, risk: "high", reason: "District scrutiny pending — exceeds 21-day SLA by 16 days", lastActivity: "2026-09-01" },
  { projectId: "proj-005", projectName: "Nagpur–Wardha Expressway", district: "Nagpur", stage: "objections_hearing", daysInStage: 55, risk: "high", reason: "Objections hearing approaching 60-day deadline — 5 days remaining", lastActivity: "2026-08-20" },
  { projectId: "proj-015", projectName: "Nagpur Smart City Corridor", district: "Nagpur", stage: "gis_identification", daysInStage: 42, risk: "medium", reason: "GIS identification taking longer than expected — 14-day SLA exceeded", lastActivity: "2026-08-18" },
  { projectId: "proj-006", projectName: "Jalna Industrial Access Road", district: "Jalna", stage: "submission", daysInStage: 25, risk: "low", reason: "Submission stage within expected timeline", lastActivity: "2026-08-15" },
  { projectId: "proj-003", projectName: "Satara Bypass Road", district: "Satara", stage: "compensation", daysInStage: 40, risk: "medium", reason: "Compensation disbursement lagging — 45+ parcels pending payment", lastActivity: "2026-08-28" },
];

export type StatutoryTimeline = {
  projectId: string;
  projectName: string;
  district: string;
  stage: LifecycleStage;
  startDate: string;
  daysElapsed: number;
  expectedDuration: number;
  remaining: number;
  status: "on_track" | "approaching_deadline" | "at_risk" | "overdue";
};

export const STATUTORY_TIMELINES: StatutoryTimeline[] = [
  { projectId: "proj-002", projectName: "Pune Ring Road Phase II", district: "Pune", stage: "sia", startDate: "2026-03-25", daysElapsed: 165, expectedDuration: 180, remaining: 15, status: "approaching_deadline" },
  { projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", district: "Pune", stage: "scrutiny", startDate: "2026-07-26", daysElapsed: 37, expectedDuration: 21, remaining: -16, status: "overdue" },
  { projectId: "proj-005", projectName: "Nagpur–Wardha Expressway", district: "Nagpur", stage: "objections_hearing", startDate: "2026-07-12", daysElapsed: 55, expectedDuration: 60, remaining: 5, status: "approaching_deadline" },
  { projectId: "proj-004", projectName: "Nagpur Metro Phase II", district: "Nagpur", stage: "preliminary_notification", startDate: "2026-08-20", daysElapsed: 16, expectedDuration: 14, remaining: -2, status: "overdue" },
  { projectId: "proj-007", projectName: "Aurangabad–Mumbai Highway", district: "Aurangabad", stage: "declaration", startDate: "2026-08-01", daysElapsed: 35, expectedDuration: 30, remaining: -5, status: "overdue" },
  { projectId: "proj-008", projectName: "Pune Metro Line 3", district: "Pune", stage: "field_verification", startDate: "2026-08-10", daysElapsed: 26, expectedDuration: 30, remaining: 4, status: "on_track" },
  { projectId: "proj-003", projectName: "Satara Bypass Road", district: "Satara", stage: "compensation", startDate: "2026-07-27", daysElapsed: 40, expectedDuration: 45, remaining: 5, status: "approaching_deadline" },
  { projectId: "proj-009", projectName: "Satara–Kolhapur Connectivity", district: "Satara", stage: "award", startDate: "2026-08-15", daysElapsed: 21, expectedDuration: 30, remaining: 9, status: "on_track" },
  { projectId: "proj-010", projectName: "Nashik–Pune Expressway Spur", district: "Nashik", stage: "payment", startDate: "2026-08-20", daysElapsed: 16, expectedDuration: 30, remaining: 14, status: "on_track" },
  { projectId: "proj-011", projectName: "Mumbai Coastal Road Phase II", district: "Mumbai", stage: "possession", startDate: "2026-08-25", daysElapsed: 11, expectedDuration: 14, remaining: 3, status: "on_track" },
];

export type SiaProject = {
  projectId: string;
  projectName: string;
  district: string;
  siaAuthority: string;
  startDate: string;
  status: "pending" | "in_progress" | "completed" | "delayed";
  affectedFamilies: number;
  reportStatus: "draft" | "submitted" | "under_review" | "approved" | "pending";
  risk: "critical" | "high" | "medium" | "low";
};

export const SIA_DATA: SiaProject[] = [
  { projectId: "proj-002", projectName: "Pune Ring Road Phase II", district: "Pune", siaAuthority: "SIA Expert Group — Pune", startDate: "2026-03-25", status: "delayed", affectedFamilies: 2100, reportStatus: "under_review", risk: "critical" },
  { projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", district: "Pune", siaAuthority: "SIA Expert Group — Pune", startDate: "2026-05-10", status: "in_progress", affectedFamilies: 1240, reportStatus: "draft", risk: "high" },
  { projectId: "proj-005", projectName: "Nagpur–Wardha Expressway", district: "Nagpur", siaAuthority: "SIA Expert Group — Nagpur", startDate: "2026-04-15", status: "in_progress", affectedFamilies: 920, reportStatus: "submitted", risk: "high" },
  { projectId: "proj-007", projectName: "Aurangabad–Mumbai Highway", district: "Aurangabad", siaAuthority: "SIA Expert Group — Aurangabad", startDate: "2026-06-01", status: "completed", affectedFamilies: 880, reportStatus: "approved", risk: "low" },
  { projectId: "proj-015", projectName: "Nagpur Smart City Corridor", district: "Nagpur", siaAuthority: "SIA Expert Group — Nagpur", startDate: "2026-07-20", status: "pending", affectedFamilies: 480, reportStatus: "pending", risk: "low" },
];

export type NotificationEntry = {
  projectId: string;
  projectName: string;
  district: string;
  notificationType: "section_11" | "disclosure" | "section_19" | "other";
  stage: LifecycleStage;
  issueDate: string;
  publicationStatus: "published" | "pending" | "draft";
  objectionWindowDays: number;
  objectionWindowRemaining: number;
  status: "active" | "completed" | "pending";
};

export const NOTIFICATION_DATA: NotificationEntry[] = [
  { projectId: "proj-004", projectName: "Nagpur Metro Phase II", district: "Nagpur", notificationType: "section_11", stage: "preliminary_notification", issueDate: "2026-08-20", publicationStatus: "published", objectionWindowDays: 60, objectionWindowRemaining: 42, status: "active" },
  { projectId: "proj-005", projectName: "Nagpur–Wardha Expressway", district: "Nagpur", notificationType: "disclosure", stage: "public_disclosure", issueDate: "2026-07-15", publicationStatus: "published", objectionWindowDays: 60, objectionWindowRemaining: 0, status: "completed" },
  { projectId: "proj-007", projectName: "Aurangabad–Mumbai Highway", district: "Aurangabad", notificationType: "section_19", stage: "declaration", issueDate: "2026-08-01", publicationStatus: "published", objectionWindowDays: 30, objectionWindowRemaining: 0, status: "completed" },
  { projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", district: "Pune", notificationType: "section_11", stage: "preliminary_notification", issueDate: "2026-09-10", publicationStatus: "pending", objectionWindowDays: 60, objectionWindowRemaining: 60, status: "pending" },
  { projectId: "proj-015", projectName: "Nagpur Smart City Corridor", district: "Nagpur", notificationType: "section_11", stage: "preliminary_notification", issueDate: "", publicationStatus: "draft", objectionWindowDays: 60, objectionWindowRemaining: 60, status: "pending" },
];

export type ObjectionEntry = {
  id: string;
  projectId: string;
  projectName: string;
  district: string;
  parcelId: string;
  category: "compensation" | "process" | "rehabilitation" | "environmental" | "social";
  filedDate: string;
  status: "open" | "under_review" | "hearing" | "resolved" | "escalated";
  currentAuthority: string;
};

export const OBJECTIONS_DATA: ObjectionEntry[] = [
  { id: "obj-001", projectId: "proj-002", projectName: "Pune Ring Road Phase II", district: "Pune", parcelId: "MH-PN-HAV-001", category: "compensation", filedDate: "2026-07-20", status: "hearing", currentAuthority: "District Collector, Pune" },
  { id: "obj-002", projectId: "proj-002", projectName: "Pune Ring Road Phase II", district: "Pune", parcelId: "MH-PN-HAV-002", category: "rehabilitation", filedDate: "2026-07-22", status: "under_review", currentAuthority: "R&R Division — Pune" },
  { id: "obj-003", projectId: "proj-005", projectName: "Nagpur–Wardha Expressway", district: "Nagpur", parcelId: "MH-NG-AMB-001", category: "environmental", filedDate: "2026-08-01", status: "open", currentAuthority: "District Collector, Nagpur" },
  { id: "obj-004", projectId: "proj-001", projectName: "NH-544 Pune–Satara Expansion", district: "Pune", parcelId: "MH-PN-MUL-003", category: "compensation", filedDate: "2026-06-15", status: "resolved", currentAuthority: "District Collector, Pune" },
  { id: "obj-005", projectId: "proj-007", projectName: "Aurangabad–Mumbai Highway", district: "Aurangabad", parcelId: "MH-AUR-JAL-001", category: "social", filedDate: "2026-07-10", status: "escalated", currentAuthority: "State Nodal Officer" },
  { id: "obj-006", projectId: "proj-002", projectName: "Pune Ring Road Phase II", district: "Pune", parcelId: "MH-PN-HAV-003", category: "process", filedDate: "2026-08-05", status: "open", currentAuthority: "District Collector, Pune" },
  { id: "obj-007", projectId: "proj-003", projectName: "Satara Bypass Road", district: "Satara", parcelId: "MH-ST-SAT-005", category: "compensation", filedDate: "2026-06-20", status: "resolved", currentAuthority: "District Collector, Satara" },
  { id: "obj-008", projectId: "proj-005", projectName: "Nagpur–Wardha Expressway", district: "Nagpur", parcelId: "MH-NG-AMB-002", category: "rehabilitation", filedDate: "2026-08-10", status: "hearing", currentAuthority: "District Collector, Nagpur" },
];

export type AuditEntry = {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  project: string;
  district: string;
  previousState: string;
  newState: string;
  justification: string;
};

export const AUDIT_DATA: AuditEntry[] = [
  { id: "aud-001", timestamp: "2026-09-05T14:30:00", actor: "Shri. R. K. Sable", role: "State Nodal Officer", action: "Reviewed incoming project", project: "Pune Ring Road Phase II", district: "Pune", previousState: "New", newState: "Under State Review", justification: "Project received from MOH for state-level coordination" },
  { id: "aud-002", timestamp: "2026-09-04T11:15:00", actor: "Shri. R. K. Sable", role: "State Nodal Officer", action: "Routed project to district", project: "Nagpur Metro Phase II", district: "Nagpur", previousState: "Accepted for Routing", newState: "Routed to District", justification: "Nagpur district identified — routed to District Collector, Nagpur" },
  { id: "aud-003", timestamp: "2026-09-03T09:45:00", actor: "Shri. R. K. Sable", role: "State Nodal Officer", action: "Requested clarification", project: "Delhi Metro Phase 4 Extension", district: "Mumbai", previousState: "Under State Review", newState: "Clarification Required", justification: "District mapping incomplete — tehsil-level data missing" },
  { id: "aud-004", timestamp: "2026-09-02T16:00:00", actor: "Shri. R. K. Sable", role: "State Nodal Officer", action: "Created coordination request", project: "NH-544 Pune–Satara Expansion", district: "Pune", previousState: "—", newState: "Request Sent", justification: "Scrutiny pending 37 days — requesting status update from District Collector" },
  { id: "aud-005", timestamp: "2026-09-01T10:30:00", actor: "Shri. R. K. Sable", role: "State Nodal Officer", action: "Monitored SIA status", project: "Pune Ring Road Phase II", district: "Pune", previousState: "SIA In Progress", newState: "SIA Delayed", justification: "165 days elapsed — 15 days remaining of 180-day statutory limit" },
  { id: "aud-006", timestamp: "2026-08-30T14:20:00", actor: "Shri. R. K. Sable", role: "State Nodal Officer", action: "Reviewed district progress", project: "Satara Bypass Road", district: "Satara", previousState: "—", newState: "Monthly Report Received", justification: "September progress report reviewed — compensation disbursement lag identified" },
  { id: "aud-007", timestamp: "2026-08-28T11:00:00", actor: "Dr. Suhas Diwase", role: "District Collector, Pune", action: "Submitted scrutiny response", project: "NH-544 Pune–Satara Expansion", district: "Pune", previousState: "Scrutiny Pending", newState: "Scrutiny In Progress", justification: "District-level scrutiny initiated for Pune parcels" },
  { id: "aud-008", timestamp: "2026-08-25T09:30:00", actor: "Shri. R. K. Sable", role: "State Nodal Officer", action: "Accepted project for routing", project: "NH-544 Pune–Satara Six-Laning", district: "Pune", previousState: "Under State Review", newState: "Accepted for Routing", justification: "All validation checks passed — ready for district routing" },
  { id: "aud-009", timestamp: "2026-08-20T15:45:00", actor: "Shri. R. K. Sable", role: "State Nodal Officer", action: "Monitored statutory timeline", project: "Nagpur–Wardha Expressway", district: "Nagpur", previousState: "—", newState: "Timeline Review", justification: "Objections hearing approaching 60-day deadline — 5 days remaining" },
  { id: "aud-010", timestamp: "2026-08-18T10:00:00", actor: "Shri. R. K. Sable", role: "State Nodal Officer", action: "Viewed GIS map", project: "State Overview", district: "All", previousState: "—", newState: "—", justification: "Reviewed state-wide project footprints and district boundaries" },
];

export type ReportEntry = {
  id: string;
  name: string;
  description: string;
  category: "progress" | "financial" | "operational" | "social" | "compliance";
};

export const REPORTS: ReportEntry[] = [
  { id: "rpt-001", name: "State Acquisition Progress", description: "Overall acquisition progress across all districts and projects", category: "progress" },
  { id: "rpt-002", name: "District-wise Progress", description: "Breakdown of acquisition progress by district", category: "progress" },
  { id: "rpt-003", name: "Project-wise Progress", description: "Individual project progress with stage tracking", category: "progress" },
  { id: "rpt-004", name: "Parcel Status Report", description: "Status of all parcels across the state", category: "operational" },
  { id: "rpt-005", name: "Compensation Report", description: "Compensation assessment, award, and disbursement status", category: "financial" },
  { id: "rpt-006", name: "Possession Report", description: "Possession completion status by district and project", category: "operational" },
  { id: "rpt-007", name: "R&R Report", description: "Rehabilitation and resettlement completion status", category: "social" },
  { id: "rpt-008", name: "Objection Report", description: "Status of all objections filed across the state", category: "compliance" },
  { id: "rpt-009", name: "SIA Status Report", description: "Social Impact Assessment progress and completion", category: "compliance" },
  { id: "rpt-010", name: "Timeline / Delay Report", description: "Statutory timeline compliance and delay analysis", category: "compliance" },
  { id: "rpt-011", name: "Grievance Report", description: "Grievance filing and resolution status", category: "social" },
];

export type StateNotification = {
  id: string;
  title: string;
  message: string;
  priority: "critical" | "high" | "medium" | "low";
  timestamp: string;
  read: boolean;
  project?: string;
  district?: string;
};

export const STATE_NOTIFICATIONS: StateNotification[] = [
  { id: "notif-001", title: "District scrutiny overdue", message: "Pune district has 24 overdue scrutiny cases across 3 projects.", priority: "critical", timestamp: "2026-09-05T14:30:00", read: false, project: "NH-544 Pune–Satara Expansion", district: "Pune" },
  { id: "notif-002", title: "SIA deadline approaching", message: "SIA deadline approaching for Pune Ring Road Phase II — 15 days remaining.", priority: "critical", timestamp: "2026-09-05T10:00:00", read: false, project: "Pune Ring Road Phase II", district: "Pune" },
  { id: "notif-003", title: "New project submitted", message: "Nagpur–Wardha Expressway Spur submitted for state review by NHAI.", priority: "high", timestamp: "2026-09-04T16:00:00", read: false, project: "Nagpur–Wardha Expressway Spur", district: "Nagpur" },
  { id: "notif-004", title: "District Collector response", message: "District Collector, Nagpur responded to Section 11 notification clarification.", priority: "medium", timestamp: "2026-09-03T11:00:00", read: true, project: "Nagpur Metro Phase II", district: "Nagpur" },
  { id: "notif-005", title: "Compensation disbursement lag", message: "Satara district compensation disbursement lagging — 45+ parcels pending.", priority: "high", timestamp: "2026-09-02T09:00:00", read: true, project: "Satara Bypass Road", district: "Satara" },
  { id: "notif-006", title: "Objection hearing scheduled", message: "Hearing scheduled for Pune Ring Road Phase II objections — 3 parcels.", priority: "medium", timestamp: "2026-09-01T14:00:00", read: true, project: "Pune Ring Road Phase II", district: "Pune" },
  { id: "notif-007", title: "R&R progress update", message: "Thane–Bhiwandi Link Road R&R completion at 85% — on track for closure.", priority: "low", timestamp: "2026-08-30T10:00:00", read: true, project: "Thane–Bhiwandi Link Road", district: "Thane" },
  { id: "notif-008", title: "Monthly report due", message: "Monthly progress reports due from 8 districts by September 18.", priority: "medium", timestamp: "2026-08-28T09:00:00", read: true },
];

export type DistrictRoutingEntry = {
  projectId: string;
  projectName: string;
  state: string;
  districts: {
    name: string;
    parcels: number;
    collector: string;
    tehsils: number;
    currentStage: LifecycleStage;
    status: "routed" | "pending" | "accepted" | "in_progress";
  }[];
};

export const DISTRICT_ROUTING: DistrictRoutingEntry[] = [
  {
    projectId: "proj-in-005",
    projectName: "Nagpur Metro Phase II",
    state: "Maharashtra",
    districts: [
      { name: "Nagpur", parcels: 420, collector: "Smt. N. W. Raut, IAS", tehsils: 5, currentStage: "preliminary_notification", status: "routed" },
    ],
  },
  {
    projectId: "proj-in-001",
    projectName: "NH-544 Pune–Satara Six-Laning",
    state: "Maharashtra",
    districts: [
      { name: "Pune", parcels: 842, collector: "Dr. Suhas Diwase, IAS", tehsils: 8, currentStage: "scrutiny", status: "pending" },
      { name: "Satara", parcels: 442, collector: "Shri. P. K. Jaiswal, IAS", tehsils: 4, currentStage: "land_requirement", status: "pending" },
    ],
  },
  {
    projectId: "proj-in-002",
    projectName: "Pune Ring Road Phase II",
    state: "Maharashtra",
    districts: [
      { name: "Pune", parcels: 2100, collector: "Dr. Suhas Diwase, IAS", tehsils: 12, currentStage: "sia", status: "accepted" },
    ],
  },
  {
    projectId: "proj-in-003",
    projectName: "Mumbai–Nagpur Expressway Spur",
    state: "Maharashtra",
    districts: [
      { name: "Nagpur", parcels: 580, collector: "Smt. N. W. Raut, IAS", tehsils: 6, currentStage: "submission", status: "pending" },
      { name: "Wardha", parcels: 280, collector: "Smt. P. B. Meshram, IAS", tehsils: 3, currentStage: "submission", status: "pending" },
    ],
  },
];
