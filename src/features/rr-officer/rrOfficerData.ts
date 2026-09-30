// R&R Officer data types and mock data

export type RrCaseStatus =
  | "draft"
  | "verification_required"
  | "under_review"
  | "plan_active"
  | "partially_delivered"
  | "completed"
  | "on_hold"
  | "grievance"
  | "escalated";

export type ComponentStatus =
  | "not_applicable"
  | "pending_verification"
  | "planned"
  | "in_progress"
  | "delivered"
  | "verified"
  | "under_review"
  | "requires_review";

export type RrCase = {
  id: string;
  familyId: string;
  familyName: string;
  village: string;
  project: string;
  district: string;
  status: RrCaseStatus;
  verification: "pending" | "partial" | "verified";
  componentsDelivered: number;
  componentsTotal: number;
  pendingAction: string;
  priority: "critical" | "high" | "medium" | "low";
  lastUpdated: string;
  displacement: "none" | "partial" | "full";
  livelihoodImpact: boolean;
  vulnerabilityIndicators: string[];
  housingStatus: ComponentStatus;
  subsistenceStatus: ComponentStatus;
  transportationStatus: ComponentStatus;
  livelihoodStatus: ComponentStatus;
  employmentStatus: ComponentStatus;
  skillDevStatus: ComponentStatus;
  specialSupportStatus: ComponentStatus;
  openGrievance: boolean;
};

export type FamilyProfile = {
  familyId: string;
  headOfHousehold: string;
  householdSize: number;
  village: string;
  contactStatus: "available" | "unavailable" | "partial";
  occupation: string;
  primaryLivelihood: string;
  secondaryLivelihood: string;
  landAffected: string;
  residentialImpact: "none" | "partial" | "full";
  livelihoodImpact: "none" | "partial" | "full";
  displacementStatus: "none" | "partial" | "full";
  vulnerabilityIndicators: { indicator: string; verified: boolean }[];
  siaReference?: string;
  fieldVerificationRef?: string;
  possessionStatus?: string;
  compensationStatus?: string;
  rrStatus?: string;
  parcelId?: string;
};

export type SourceVerification = {
  source: string;
  available: boolean;
  date: string;
  uploadedBy: string;
  verificationStatus: "verified" | "pending" | "conflict" | "not_available";
  evidenceCount: number;
};

export type RrPlanComponent = {
  name: string;
  applicable: boolean;
  verification: "verified" | "pending" | "conflict" | "requires_review";
  status: ComponentStatus;
  responsibleOfficer: string;
  targetDate: string;
  evidenceCount: number;
  remarks: string;
};

export type ResettlementSite = {
  id: string;
  project: string;
  location: string;
  familiesPlanned: number;
  familiesAllocated: number;
  siteReadiness: number;
  utilities: "ready" | "partial" | "pending";
  housing: "ready" | "partial" | "pending";
  access: "ready" | "partial" | "pending";
  status: "identified" | "planning" | "under_development" | "ready" | "partially_occupied" | "operational";
  lat?: number;
  lng?: number;
};

export type SiteReadinessChecklist = {
  siteId: string;
  roadAccess: "ready" | "partial" | "pending" | "na";
  water: "ready" | "partial" | "pending" | "na";
  electricity: "ready" | "partial" | "pending" | "na";
  drainage: "ready" | "partial" | "pending" | "na";
  housing: "ready" | "partial" | "pending" | "na";
  communityInfrastructure: "ready" | "partial" | "pending" | "na";
  healthAccess: "ready" | "partial" | "pending" | "na";
  educationAccess: "ready" | "partial" | "pending" | "na";
  livelihoodAccess: "ready" | "partial" | "pending" | "na";
};

export type FamilyAllocation = {
  familyId: string;
  familyName: string;
  originalVillage: string;
  newSite: string;
  allocationStatus: "pending" | "allocated" | "move_planned" | "relocated" | "verified";
  houseSiteRef: string;
  moveDate?: string;
  evidenceCount: number;
};

export type FieldTask = {
  id: string;
  task: string;
  assignedTo: string;
  role: string;
  village: string;
  dueDate: string;
  status: "assigned" | "in_progress" | "completed" | "overdue";
  caseId: string;
};

export type RrEvidence = {
  id: string;
  type: "household_photo" | "housing_evidence" | "delivery_evidence" | "training_certificate" | "employment_evidence" | "resettlement_site" | "consultation" | "administrative";
  title: string;
  relatedFamily: string;
  relatedComponent: string;
  date: string;
  source: string;
  status: "uploaded" | "verified" | "pending";
};

export type Grievance = {
  id: string;
  family: string;
  familyId: string;
  category: "housing" | "livelihood" | "relocation" | "support_delivery" | "employment" | "skill_training" | "other";
  date: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "open" | "under_review" | "awaiting_evidence" | "action_required" | "resolved" | "escalated";
  assignedTo: string;
  dueDate: string;
  description: string;
  relatedComponent: string;
};

export type RrAuditEntry = {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  section: string;
  details: string;
};

export type RrNotification = {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: "info" | "warning" | "urgent";
  read: boolean;
};

export type WorkQueueItem = {
  id: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  dueDate: string;
  category: "critical" | "due_soon" | "routine";
  caseId?: string;
};

export type CompletionChecklist = {
  label: string;
  completed: boolean;
};

export type SubsistenceRecord = {
  familyId: string;
  familyName: string;
  applicable: boolean;
  verification: "verified" | "pending" | "conflict";
  supportPeriod: string;
  monthlyAmount: number;
  totalAmount: number;
  deliveryStatus: ComponentStatus;
  paymentsMade: number;
  lastPaymentDate: string;
  referenceDoc: string;
  evidenceCount: number;
  remarks: string;
};

export type TransportationRecord = {
  familyId: string;
  familyName: string;
  relocationRequired: boolean;
  originVillage: string;
  destination: string;
  distance: string;
  transportType: string;
  status: ComponentStatus;
  deliveryDate: string;
  evidenceCount: number;
  remarks: string;
};

export type LivelihoodRecord = {
  familyId: string;
  familyName: string;
  currentLivelihood: string;
  impact: string;
  category: "agriculture" | "small_business" | "livestock" | "daily_wage" | "fishing" | "forest_dependency" | "services" | "other";
  restorationPlan: string;
  supportRequired: string;
  responsibleAgency: string;
  targetDate: string;
  status: ComponentStatus;
  evidenceCount: number;
  remarks: string;
};

export type EmploymentRecord = {
  familyId: string;
  familyName: string;
  eligible: boolean;
  eligibilityStatus: "eligible" | "under_review" | "not_eligible" | "pending_verification";
  employmentCategory: string;
  coordinatingAgency: string;
  status: ComponentStatus;
  supportingDocCount: number;
  remarks: string;
};

export type SkillDevRecord = {
  familyId: string;
  familyName: string;
  existingSkill: string;
  desiredSkill: string;
  trainingProgram: string;
  trainingProvider: string;
  enrollmentDate: string;
  attendancePercent: number;
  completionStatus: "not_started" | "enrolled" | "in_training" | "completed" | "dropped_out";
  certificationReceived: boolean;
  outcome: string;
  evidenceCount: number;
  status: ComponentStatus;
};

export type SpecialSupportRecord = {
  familyId: string;
  familyName: string;
  indicator: string;
  source: string;
  verification: "verified" | "pending" | "conflict" | "requires_review";
  officerRemarks: string;
  evidenceCount: number;
  status: ComponentStatus;
};

export type CoordinationRequest = {
  id: string;
  from: string;
  fromRole: string;
  to: string;
  toRole: string;
  subject: string;
  priority: "critical" | "high" | "medium" | "low";
  date: string;
  status: "open" | "in_progress" | "responded" | "closed";
  description: string;
  relatedCase?: string;
};

// ═══════════════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════════════

export const RR_PROJECT = {
  projectName: "Eastern Freight Corridor Expansion — Package 04",
  projectId: "PRJ-2025-00187",
  state: "Maharashtra",
  district: "Jalna",
  villages: ["Kharpudi", "Wadgaon", "Rajuri", "Bhokardan Road"],
  affectedFamilies: 218,
  rrApplicable: 203,
  rrCompleted: 146,
  inProgress: 44,
  pendingVerification: 13,
};

export const RR_CASES: RrCase[] = [
  { id: "R&R-2026-0187", familyId: "AF-00421", familyName: "Renuka Bai Gurav", village: "Kharpudi", project: "Eastern Freight Corridor — Pkg 04", district: "Jalna", status: "partially_delivered", verification: "verified", componentsDelivered: 5, componentsTotal: 7, pendingAction: "Livelihood restoration in progress", priority: "high", lastUpdated: "08 Sep 2026", displacement: "partial", livelihoodImpact: true, vulnerabilityIndicators: ["Female-headed household", "Land-dependent livelihood"], housingStatus: "delivered", subsistenceStatus: "delivered", transportationStatus: "delivered", livelihoodStatus: "in_progress", employmentStatus: "not_applicable", skillDevStatus: "planned", specialSupportStatus: "pending_verification", openGrievance: false },
  { id: "R&R-2026-0188", familyId: "AF-00422", familyName: "Baburao S. Kshirsagar", village: "Kharpudi", project: "Eastern Freight Corridor — Pkg 04", district: "Jalna", status: "plan_active", verification: "verified", componentsDelivered: 3, componentsTotal: 7, pendingAction: "Housing construction pending", priority: "critical", lastUpdated: "07 Sep 2026", displacement: "full", livelihoodImpact: true, vulnerabilityIndicators: ["Elderly household", "Economically vulnerable"], housingStatus: "in_progress", subsistenceStatus: "delivered", transportationStatus: "pending_verification", livelihoodStatus: "planned", employmentStatus: "under_review", skillDevStatus: "not_applicable", specialSupportStatus: "requires_review", openGrievance: true },
  { id: "R&R-2026-0189", familyId: "AF-00423", familyName: "Sukhdeo D. Patil", village: "Wadgaon", project: "Eastern Freight Corridor — Pkg 04", district: "Jalna", status: "completed", verification: "verified", componentsDelivered: 7, componentsTotal: 7, pendingAction: "None", priority: "low", lastUpdated: "05 Sep 2026", displacement: "partial", livelihoodImpact: true, vulnerabilityIndicators: ["Land-dependent livelihood"], housingStatus: "verified", subsistenceStatus: "verified", transportationStatus: "verified", livelihoodStatus: "verified", employmentStatus: "not_applicable", skillDevStatus: "verified", specialSupportStatus: "not_applicable", openGrievance: false },
  { id: "R&R-2026-0190", familyId: "AF-00424", familyName: "Geeta Devi Sharma", village: "Rajuri", project: "Eastern Freight Corridor — Pkg 04", district: "Jalna", status: "verification_required", verification: "pending", componentsDelivered: 1, componentsTotal: 6, pendingAction: "Household verification pending", priority: "high", lastUpdated: "06 Sep 2026", displacement: "full", livelihoodImpact: false, vulnerabilityIndicators: ["Female-headed household"], housingStatus: "pending_verification", subsistenceStatus: "delivered", transportationStatus: "pending_verification", livelihoodStatus: "pending_verification", employmentStatus: "pending_verification", skillDevStatus: "not_applicable", specialSupportStatus: "pending_verification", openGrievance: false },
  { id: "R&R-2026-0191", familyId: "AF-00425", familyName: "Tukaram B. More", village: "Bhokardan Road", project: "Eastern Freight Corridor — Pkg 04", district: "Jalna", status: "partially_delivered", verification: "verified", componentsDelivered: 4, componentsTotal: 6, pendingAction: "Skill development enrollment pending", priority: "medium", lastUpdated: "08 Sep 2026", displacement: "none", livelihoodImpact: true, vulnerabilityIndicators: ["Scheduled Area relevance"], housingStatus: "not_applicable", subsistenceStatus: "delivered", transportationStatus: "not_applicable", livelihoodStatus: "in_progress", employmentStatus: "in_progress", skillDevStatus: "planned", specialSupportStatus: "pending_verification", openGrievance: false },
  { id: "R&R-2026-0192", familyId: "AF-00426", familyName: "Lata V. Jadhav", village: "Kharpudi", project: "Eastern Freight Corridor — Pkg 04", district: "Jalna", status: "grievance", verification: "verified", componentsDelivered: 2, componentsTotal: 7, pendingAction: "Grievance resolution — housing site dispute", priority: "critical", lastUpdated: "09 Sep 2026", displacement: "partial", livelihoodImpact: true, vulnerabilityIndicators: ["Female-headed household", "Land-dependent livelihood"], housingStatus: "pending_verification", subsistenceStatus: "delivered", transportationStatus: "pending_verification", livelihoodStatus: "pending_verification", employmentStatus: "not_applicable", skillDevStatus: "pending_verification", specialSupportStatus: "pending_verification", openGrievance: true },
  { id: "R&R-2026-0193", familyId: "AF-00427", familyName: "Dattatray R. Hule", village: "Wadgaon", project: "Eastern Freight Corridor — Pkg 04", district: "Jalna", status: "plan_active", verification: "verified", componentsDelivered: 3, componentsTotal: 6, pendingAction: "Livelihood plan review", priority: "medium", lastUpdated: "07 Sep 2026", displacement: "none", livelihoodImpact: true, vulnerabilityIndicators: ["Person with disability"], housingStatus: "not_applicable", subsistenceStatus: "delivered", transportationStatus: "not_applicable", livelihoodStatus: "in_progress", employmentStatus: "planned", skillDevStatus: "planned", specialSupportStatus: "requires_review", openGrievance: false },
  { id: "R&R-2026-0194", familyId: "AF-00428", familyName: "Ashok P. Dhumal", village: "Rajuri", project: "Eastern Freight Corridor — Pkg 04", district: "Jalna", status: "draft", verification: "pending", componentsDelivered: 0, componentsTotal: 5, pendingAction: "Complete household enumeration", priority: "high", lastUpdated: "04 Sep 2026", displacement: "full", livelihoodImpact: true, vulnerabilityIndicators: ["Economically vulnerable"], housingStatus: "pending_verification", subsistenceStatus: "pending_verification", transportationStatus: "pending_verification", livelihoodStatus: "pending_verification", employmentStatus: "pending_verification", skillDevStatus: "not_applicable", specialSupportStatus: "not_applicable", openGrievance: false },
];

export const FAMILY_PROFILES: FamilyProfile[] = [
  { familyId: "AF-00421", headOfHousehold: "Renuka Bai Gurav", householdSize: 6, village: "Kharpudi", contactStatus: "available", occupation: "Agriculture", primaryLivelihood: "Mango & Vegetable Farming", secondaryLivelihood: "Livestock", landAffected: "1.2 ha", residentialImpact: "partial", livelihoodImpact: "full", displacementStatus: "partial", vulnerabilityIndicators: [{ indicator: "Female-headed household", verified: true }, { indicator: "Land-dependent livelihood", verified: true }, { indicator: "Elderly household member", verified: false }], siaReference: "SIA-2026-0187-AF00421", fieldVerificationRef: "FV-042-001", possessionStatus: "Partial possession taken", compensationStatus: "Award finalized — ₹18,40,000", rrStatus: "Partially Delivered", parcelId: "PL-2026-00421" },
  { familyId: "AF-00422", headOfHousehold: "Baburao S. Kshirsagar", householdSize: 4, village: "Kharpudi", contactStatus: "available", occupation: "Small Business", primaryLivelihood: "Retail Shop", secondaryLivelihood: "None", landAffected: "0.8 ha", residentialImpact: "full", livelihoodImpact: "full", displacementStatus: "full", vulnerabilityIndicators: [{ indicator: "Elderly household member", verified: true }, { indicator: "Economically vulnerable", verified: true }], siaReference: "SIA-2026-0188-AF00422", fieldVerificationRef: "FV-042-002", possessionStatus: "Full possession taken", compensationStatus: "Award finalized — ₹14,20,000", rrStatus: "Plan Active", parcelId: "PL-2026-00422" },
  { familyId: "AF-00423", headOfHousehold: "Sukhdeo D. Patil", householdSize: 8, village: "Wadgaon", contactStatus: "available", occupation: "Agriculture", primaryLivelihood: "Bajra & Jowar Farming", secondaryLivelihood: "Livestock", landAffected: "2.4 ha", residentialImpact: "none", livelihoodImpact: "partial", displacementStatus: "partial", vulnerabilityIndicators: [{ indicator: "Land-dependent livelihood", verified: true }], siaReference: "SIA-2026-0189-AF00423", fieldVerificationRef: "FV-042-003", possessionStatus: "Partial possession taken", compensationStatus: "Award finalized — ₹32,60,000", rrStatus: "Completed", parcelId: "PL-2026-00423" },
  { familyId: "AF-00424", headOfHousehold: "Geeta Devi Sharma", householdSize: 3, village: "Rajuri", contactStatus: "partial", occupation: "Daily Wage Labour", primaryLivelihood: "Wage Employment", secondaryLivelihood: "None", landAffected: "0.4 ha", residentialImpact: "full", livelihoodImpact: "none", displacementStatus: "full", vulnerabilityIndicators: [{ indicator: "Female-headed household", verified: true }], siaReference: "SIA-2026-0190-AF00424", fieldVerificationRef: "FV-042-004", possessionStatus: "Full possession taken", compensationStatus: "Award finalized — ₹6,80,000", rrStatus: "Verification Required", parcelId: "PL-2026-00424" },
  { familyId: "AF-00425", headOfHousehold: "Tukaram B. More", householdSize: 7, village: "Bhokardan Road", contactStatus: "available", occupation: "Agriculture", primaryLivelihood: "Sugarcane Farming", secondaryLivelihood: "None", landAffected: "3.1 ha", residentialImpact: "none", livelihoodImpact: "partial", displacementStatus: "none", vulnerabilityIndicators: [{ indicator: "Scheduled Area relevance", verified: true }], siaReference: "SIA-2026-0191-AF00425", fieldVerificationRef: "FV-042-005", possessionStatus: "Land possession taken", compensationStatus: "Award finalized — ₹41,20,000", rrStatus: "Partially Delivered", parcelId: "PL-2026-00425" },
  { familyId: "AF-00426", headOfHousehold: "Lata V. Jadhav", householdSize: 5, village: "Kharpudi", contactStatus: "available", occupation: "Livestock", primaryLivelihood: "Dairy", secondaryLivelihood: "Vegetable Selling", landAffected: "0.6 ha", residentialImpact: "partial", livelihoodImpact: "partial", displacementStatus: "partial", vulnerabilityIndicators: [{ indicator: "Female-headed household", verified: true }, { indicator: "Land-dependent livelihood", verified: true }], siaReference: "SIA-2026-0192-AF00426", fieldVerificationRef: "FV-042-006", possessionStatus: "Partial possession taken", compensationStatus: "Award finalized — ₹9,60,000", rrStatus: "Grievance", parcelId: "PL-2026-00426" },
];

export const SOURCE_VERIFICATION: SourceVerification[] = [
  { source: "SIA Record", available: true, date: "12 Aug 2026", uploadedBy: "SIA Expert Group", verificationStatus: "verified", evidenceCount: 8 },
  { source: "Field Enumeration", available: true, date: "25 Aug 2026", uploadedBy: "Field Officer — FO-042", verificationStatus: "verified", evidenceCount: 6 },
  { source: "Land Records", available: true, date: "15 Jul 2026", uploadedBy: "Tehsil Office", verificationStatus: "verified", evidenceCount: 4 },
  { source: "Family Declaration", available: true, date: "28 Aug 2026", uploadedBy: "Affected Family", verificationStatus: "verified", evidenceCount: 2 },
  { source: "Administrative Record", available: false, date: "", uploadedBy: "", verificationStatus: "pending", evidenceCount: 0 },
];

export const RR_PLAN_COMPONENTS: RrPlanComponent[] = [
  { name: "Housing", applicable: true, verification: "verified", status: "in_progress", responsibleOfficer: "R&R Officer", targetDate: "15 Oct 2026", evidenceCount: 4, remarks: "Transit housing provided. Permanent site under development." },
  { name: "Subsistence", applicable: true, verification: "verified", status: "delivered", responsibleOfficer: "R&R Officer", targetDate: "30 Sep 2026", evidenceCount: 3, remarks: "Subsistence support for 12 months delivered." },
  { name: "Transportation", applicable: true, verification: "verified", status: "delivered", responsibleOfficer: "Field Officer", targetDate: "15 Sep 2026", evidenceCount: 2, remarks: "Transportation allowance disbursed." },
  { name: "Livelihood", applicable: true, verification: "verified", status: "in_progress", responsibleOfficer: "R&R Officer", targetDate: "31 Dec 2026", evidenceCount: 5, remarks: "Alternative livelihood training in progress." },
  { name: "Employment", applicable: false, verification: "verified", status: "not_applicable", responsibleOfficer: "R&R Officer", targetDate: "", evidenceCount: 0, remarks: "Not applicable — family has alternative income source." },
  { name: "Skill Development", applicable: true, verification: "pending", status: "planned", responsibleOfficer: "R&R Officer", targetDate: "28 Feb 2027", evidenceCount: 1, remarks: "Enrollment pending — training program identified." },
  { name: "Special Support", applicable: true, verification: "requires_review", status: "pending_verification", responsibleOfficer: "District Social Welfare", targetDate: "30 Sep 2026", evidenceCount: 1, remarks: "Female-headed household — enhanced support under review." },
];

export const RESETTLEMENT_SITES: ResettlementSite[] = [
  { id: "RS-JLN-01", project: "Eastern Freight Corridor — Pkg 04", location: "Kharpudi Extension, Jalna", familiesPlanned: 45, familiesAllocated: 38, siteReadiness: 85, utilities: "ready", housing: "partial", access: "ready", status: "partially_occupied", lat: 20.05, lng: 75.88 },
  { id: "RS-JLN-02", project: "Eastern Freight Corridor — Pkg 04", location: "Wadgaon Revenue Plot, Jalna", familiesPlanned: 32, familiesAllocated: 12, siteReadiness: 60, utilities: "partial", housing: "pending", access: "ready", status: "under_development", lat: 20.12, lng: 75.92 },
  { id: "RS-JLN-03", project: "Eastern Freight Corridor — Pkg 04", location: "Rajuri Community Land, Jalna", familiesPlanned: 28, familiesAllocated: 0, siteReadiness: 30, utilities: "pending", housing: "pending", access: "partial", status: "planning", lat: 20.08, lng: 75.95 },
  { id: "RS-JLN-04", project: "Eastern Freight Corridor — Pkg 04", location: "Bhokardan Road Settlement, Jalna", familiesPlanned: 18, familiesAllocated: 18, siteReadiness: 95, utilities: "ready", housing: "ready", access: "ready", status: "operational", lat: 20.15, lng: 75.85 },
];

export const SITE_READINESS: SiteReadinessChecklist = {
  siteId: "RS-JLN-01",
  roadAccess: "ready",
  water: "ready",
  electricity: "partial",
  drainage: "pending",
  housing: "partial",
  communityInfrastructure: "pending",
  healthAccess: "partial",
  educationAccess: "ready",
  livelihoodAccess: "pending",
};

export const FAMILY_ALLOCATIONS: FamilyAllocation[] = [
  { familyId: "AF-00421", familyName: "Renuka Bai Gurav", originalVillage: "Kharpudi", newSite: "RS-JLN-01", allocationStatus: "relocated", houseSiteRef: "RS-JLN-01-H12", moveDate: "01 Sep 2026", evidenceCount: 4 },
  { familyId: "AF-00422", familyName: "Baburao S. Kshirsagar", originalVillage: "Kharpudi", newSite: "RS-JLN-01", allocationStatus: "allocated", houseSiteRef: "RS-JLN-01-H15", evidenceCount: 2 },
  { familyId: "AF-00426", familyName: "Lata V. Jadhav", originalVillage: "Kharpudi", newSite: "RS-JLN-01", allocationStatus: "pending", houseSiteRef: "", evidenceCount: 0 },
];

export const FIELD_TASKS: FieldTask[] = [
  { id: "FT-042-001", task: "Verify housing delivery — RS-JLN-01", assignedTo: "Shri. M. Kamble", role: "Field Officer", village: "Kharpudi", dueDate: "12 Sep 2026", status: "assigned", caseId: "R&R-2026-0187" },
  { id: "FT-042-002", task: "Revisit household — AF-00424", assignedTo: "Shri. M. Kamble", role: "Field Officer", village: "Rajuri", dueDate: "10 Sep 2026", status: "in_progress", caseId: "R&R-2026-0190" },
  { id: "FT-042-003", task: "Confirm livelihood — Sugarcane", assignedTo: "Shri. M. Kamble", role: "Field Officer", village: "Bhokardan Road", dueDate: "15 Sep 2026", status: "assigned", caseId: "R&R-2026-0191" },
  { id: "FT-042-004", task: "Capture resettlement site evidence", assignedTo: "Shri. M. Kamble", role: "Field Officer", village: "Kharpudi", dueDate: "08 Sep 2026", status: "overdue", caseId: "R&R-2026-0192" },
  { id: "FT-042-005", task: "Verify relocation — RS-JLN-04", assignedTo: "Shri. P. Deshmukh", role: "Field Officer", village: "Bhokardan Road", dueDate: "14 Sep 2026", status: "assigned", caseId: "R&R-2026-0189" },
  { id: "FT-042-006", task: "Confirm livelihood delivery", assignedTo: "Shri. M. Kamble", role: "Field Officer", village: "Wadgaon", dueDate: "16 Sep 2026", status: "assigned", caseId: "R&R-2026-0193" },
  { id: "FT-042-007", task: "Verify skill training enrollment", assignedTo: "Shri. P. Deshmukh", role: "Field Officer", village: "Bhokardan Road", dueDate: "18 Sep 2026", status: "assigned", caseId: "R&R-2026-0191" },
];

export const RR_EVIDENCE: RrEvidence[] = [
  { id: "RE-042-001", type: "household_photo", title: "Family photograph — Renuka Bai Gurav", relatedFamily: "AF-00421", relatedComponent: "Housing", date: "01 Sep 2026", source: "Field Officer", status: "verified" },
  { id: "RE-042-002", type: "housing_evidence", title: "Transit house — RS-JLN-01-H12", relatedFamily: "AF-00421", relatedComponent: "Housing", date: "01 Sep 2026", source: "Field Officer", status: "verified" },
  { id: "RE-042-003", type: "delivery_evidence", title: "Subsistence support receipt", relatedFamily: "AF-00421", relatedComponent: "Subsistence", date: "15 Aug 2026", source: "R&R Officer", status: "verified" },
  { id: "RE-042-004", type: "training_certificate", title: "Livelihood training enrollment", relatedFamily: "AF-00421", relatedComponent: "Livelihood", date: "05 Sep 2026", source: "Training Provider", status: "pending" },
  { id: "RE-042-005", type: "resettlement_site", title: "Site photograph — RS-JLN-01", relatedFamily: "AF-00422", relatedComponent: "Resettlement", date: "28 Aug 2026", source: "Field Officer", status: "verified" },
  { id: "RE-042-006", type: "administrative", title: "Housing allocation order", relatedFamily: "AF-00422", relatedComponent: "Housing", date: "25 Aug 2026", source: "District Collector", status: "verified" },
  { id: "RE-042-007", type: "delivery_evidence", title: "Transportation allowance receipt", relatedFamily: "AF-00423", relatedComponent: "Transportation", date: "01 Sep 2026", source: "R&R Officer", status: "verified" },
  { id: "RE-042-008", type: "employment_evidence", title: "Employment support application", relatedFamily: "AF-00425", relatedComponent: "Employment", date: "03 Sep 2026", source: "R&R Officer", status: "pending" },
  { id: "RE-042-009", type: "household_photo", title: "Family photograph — Lata V. Jadhav", relatedFamily: "AF-00426", relatedComponent: "Housing", date: "28 Aug 2026", source: "Field Officer", status: "verified" },
  { id: "RE-042-010", type: "consultation", title: "R&R consultation minutes", relatedFamily: "AF-00426", relatedComponent: "General", date: "30 Aug 2026", source: "R&R Officer", status: "verified" },
  { id: "RE-042-011", type: "housing_evidence", title: "Permanent housing foundation photograph", relatedFamily: "AF-00422", relatedComponent: "Housing", date: "05 Sep 2026", source: "Field Officer", status: "verified" },
  { id: "RE-042-012", type: "training_certificate", title: "Livelihood restoration plan — agricultural", relatedFamily: "AF-00421", relatedComponent: "Livelihood", date: "03 Sep 2026", source: "R&R Officer", status: "verified" },
  { id: "RE-042-013", type: "delivery_evidence", title: "Subsistence support receipt — 2nd installment", relatedFamily: "AF-00422", relatedComponent: "Subsistence", date: "01 Sep 2026", source: "R&R Officer", status: "verified" },
  { id: "RE-042-014", type: "administrative", title: "Employment eligibility assessment", relatedFamily: "AF-00425", relatedComponent: "Employment", date: "04 Sep 2026", source: "District Employment Office", status: "pending" },
];

export const GRIEVANCES: Grievance[] = [
  { id: "GR-042-001", family: "Baburao S. Kshirsagar", familyId: "AF-00422", category: "housing", date: "05 Sep 2026", priority: "high", status: "under_review", assignedTo: "R&R Officer", dueDate: "12 Sep 2026", description: "Housing site allocation delayed — family in transit accommodation for 3 weeks", relatedComponent: "Housing" },
  { id: "GR-042-002", family: "Lata V. Jadhav", familyId: "AF-00426", category: "housing", date: "09 Sep 2026", priority: "critical", status: "open", assignedTo: "R&R Officer", dueDate: "11 Sep 2026", description: "Dispute regarding housing site boundary — adjacent family claims overlap", relatedComponent: "Housing" },
  { id: "GR-042-003", family: "Dattatray R. Hule", familyId: "AF-00427", category: "livelihood", date: "02 Sep 2026", priority: "medium", status: "action_required", assignedTo: "R&R Officer", dueDate: "15 Sep 2026", description: "Livelihood restoration plan does not account for disability-related limitations", relatedComponent: "Livelihood" },
  { id: "GR-042-004", family: "Geeta Devi Sharma", familyId: "AF-00424", category: "relocation", date: "04 Sep 2026", priority: "high", status: "awaiting_evidence", assignedTo: "Field Officer", dueDate: "10 Sep 2026", description: "Family requests relocation near existing school for child education", relatedComponent: "Resettlement" },
  { id: "GR-042-005", family: "Ashok P. Dhumal", familyId: "AF-00428", category: "support_delivery", date: "06 Sep 2026", priority: "medium", status: "open", assignedTo: "R&R Officer", dueDate: "18 Sep 2026", description: "Subsistence support not received — verification pending", relatedComponent: "Subsistence" },
  { id: "GR-042-006", family: "Renuka Bai Gurav", familyId: "AF-00421", category: "skill_training", date: "07 Sep 2026", priority: "low", status: "resolved", assignedTo: "R&R Officer", dueDate: "14 Sep 2026", description: "Request for agricultural skill training instead of livestock training", relatedComponent: "Skill Development" },
  { id: "GR-042-007", family: "Tukaram B. More", familyId: "AF-00425", category: "employment", date: "08 Sep 2026", priority: "medium", status: "under_review", assignedTo: "R&R Officer", dueDate: "20 Sep 2026", description: "Employment support eligibility unclear for agricultural worker", relatedComponent: "Employment" },
];

export const RR_AUDIT_TRAIL: RrAuditEntry[] = [
  { id: "RA-042-001", timestamp: "20 Aug 2026 09:00", action: "R&R case created", actor: "System", section: "Case Creation", details: "R&R-2026-0187 created for AF-00421 based on SIA identification" },
  { id: "RA-042-002", timestamp: "22 Aug 2026 10:30", action: "Family verification updated", actor: "R&R Officer", section: "Verification", details: "AF-00421 household information verified against field enumeration" },
  { id: "RA-042-003", timestamp: "25 Aug 2026 14:00", action: "R&R plan activated", actor: "R&R Officer", section: "Planning", details: "R&R plan for AF-00421 activated with 7 components" },
  { id: "RA-042-004", timestamp: "01 Sep 2026 11:00", action: "Housing component marked delivered", actor: "R&R Officer", section: "Housing", details: "Transit housing at RS-JLN-01-H12 provided to AF-00421" },
  { id: "RA-042-005", timestamp: "01 Sep 2026 11:30", action: "Subsistence support delivered", actor: "R&R Officer", section: "Subsistence", details: "12-month subsistence support disbursed to AF-00421" },
  { id: "RA-042-006", timestamp: "03 Sep 2026 09:15", action: "Transportation support delivered", actor: "Field Officer", section: "Transportation", details: "Transportation allowance confirmed for AF-00421" },
  { id: "RA-042-007", timestamp: "05 Sep 2026 10:00", action: "Livelihood training initiated", actor: "R&R Officer", section: "Livelihood", details: "AF-00421 enrolled in agricultural skill development program" },
  { id: "RA-042-008", timestamp: "05 Sep 2026 14:30", action: "Grievance opened", actor: "System", section: "Grievance", details: "GR-042-001 opened — housing site allocation delay" },
  { id: "RA-042-009", timestamp: "07 Sep 2026 11:00", action: "Field verification requested", actor: "R&R Officer", section: "Field Coordination", details: "Task FT-042-001 assigned to verify housing delivery" },
  { id: "RA-042-010", timestamp: "09 Sep 2026 09:30", action: "Grievance escalated", actor: "R&R Officer", section: "Grievance", details: "GR-042-002 escalated — housing site boundary dispute requires resolution" },
];

export const RR_NOTIFICATIONS: RrNotification[] = [
  { id: "RN-042-001", timestamp: "09 Sep 2026 09:30", title: "Critical Grievance", message: "Housing site boundary dispute — AF-00426 requires immediate attention", type: "urgent", read: false },
  { id: "RN-042-002", timestamp: "08 Sep 2026 14:00", title: "Field Task Overdue", message: "Resettlement site evidence capture — FT-042-004 overdue", type: "warning", read: false },
  { id: "RN-042-003", timestamp: "07 Sep 2026 11:00", title: "Verification Pending", message: "AF-00424 household verification requires field revisit", type: "warning", read: true },
  { id: "RN-042-004", timestamp: "05 Sep 2026 10:00", title: "Grievance Opened", message: "Housing delay grievance — GR-042-001 assigned", type: "info", read: true },
  { id: "RN-042-005", timestamp: "01 Sep 2026 11:30", title: "Component Delivered", message: "Subsistence support delivered to AF-00421", type: "info", read: true },
];

export const WORK_QUEUE: WorkQueueItem[] = [
  { id: "WQ-RR-001", title: "Resolve housing site dispute", description: "GR-042-002 — boundary overlap between two families at RS-JLN-01", priority: "critical", dueDate: "11 Sep 2026", category: "critical", caseId: "R&R-2026-0192" },
  { id: "WQ-RR-002", title: "Verify housing delivery", description: "FT-042-001 — verify transit housing at RS-JLN-01-H12", priority: "high", dueDate: "12 Sep 2026", category: "critical", caseId: "R&R-2026-0187" },
  { id: "WQ-RR-003", title: "Complete household enumeration", description: "AF-00428 — Ashok Dhumal household information incomplete", priority: "high", dueDate: "10 Sep 2026", category: "due_soon", caseId: "R&R-2026-0194" },
  { id: "WQ-RR-004", title: "Review livelihood plan", description: "Disability accommodation required for AF-00427 livelihood plan", priority: "medium", dueDate: "15 Sep 2026", category: "due_soon", caseId: "R&R-2026-0193" },
  { id: "WQ-RR-005", title: "Skill development enrollment", description: "AF-00425 — Tukaram More skill training enrollment pending", priority: "medium", dueDate: "20 Sep 2026", category: "routine", caseId: "R&R-2026-0191" },
  { id: "WQ-RR-006", title: "Generate R&R MIS report", description: "Monthly R&R progress report due", priority: "low", dueDate: "15 Sep 2026", category: "routine" },
];

export const COMPLETION_CHECKLIST: CompletionChecklist[] = [
  { label: "Family profile verified", completed: true },
  { label: "Applicable components identified", completed: true },
  { label: "Required verification completed", completed: true },
  { label: "R&R plan recorded", completed: true },
  { label: "Delivery evidence attached", completed: false },
  { label: "Housing/resettlement status verified where applicable", completed: false },
  { label: "Livelihood intervention recorded", completed: true },
  { label: "Applicable support tracked", completed: true },
  { label: "Open grievances reviewed", completed: false },
  { label: "Final officer verification completed", completed: false },
];

export const SUBSISTENCE_RECORDS: SubsistenceRecord[] = [
  { familyId: "AF-00421", familyName: "Renuka Bai Gurav", applicable: true, verification: "verified", supportPeriod: "12 months (Aug 2026 — Jul 2027)", monthlyAmount: 5000, totalAmount: 60000, deliveryStatus: "delivered", paymentsMade: 2, lastPaymentDate: "01 Sep 2026", referenceDoc: "SUB-042-001", evidenceCount: 3, remarks: "Monthly subsistence support delivered for Aug and Sep 2026." },
  { familyId: "AF-00422", familyName: "Baburao S. Kshirsagar", applicable: true, verification: "verified", supportPeriod: "12 months (Aug 2026 — Jul 2027)", monthlyAmount: 5000, totalAmount: 60000, deliveryStatus: "delivered", paymentsMade: 2, lastPaymentDate: "01 Sep 2026", referenceDoc: "SUB-042-002", evidenceCount: 2, remarks: "Subsistence support delivered. Housing compensation pending." },
  { familyId: "AF-00423", familyName: "Sukhdeo D. Patil", applicable: true, verification: "verified", supportPeriod: "12 months (Aug 2026 — Jul 2027)", monthlyAmount: 5000, totalAmount: 60000, deliveryStatus: "verified", paymentsMade: 2, lastPaymentDate: "01 Sep 2026", referenceDoc: "SUB-042-003", evidenceCount: 2, remarks: "Fully verified — all installments delivered on schedule." },
  { familyId: "AF-00424", familyName: "Geeta Devi Sharma", applicable: true, verification: "pending", supportPeriod: "12 months (Aug 2026 — Jul 2027)", monthlyAmount: 5000, totalAmount: 60000, deliveryStatus: "pending_verification", paymentsMade: 1, lastPaymentDate: "01 Sep 2026", referenceDoc: "SUB-042-004", evidenceCount: 1, remarks: "Verification pending — household enumeration incomplete." },
  { familyId: "AF-00425", familyName: "Tukaram B. More", applicable: true, verification: "verified", supportPeriod: "12 months (Aug 2026 — Jul 2027)", monthlyAmount: 5000, totalAmount: 60000, deliveryStatus: "delivered", paymentsMade: 2, lastPaymentDate: "01 Sep 2026", referenceDoc: "SUB-042-005", evidenceCount: 2, remarks: "Subsistence support delivered. Partial land impact — livelihood ongoing." },
  { familyId: "AF-00426", familyName: "Lata V. Jadhav", applicable: true, verification: "verified", supportPeriod: "12 months (Aug 2026 — Jul 2027)", monthlyAmount: 5000, totalAmount: 60000, deliveryStatus: "delivered", paymentsMade: 2, lastPaymentDate: "01 Sep 2026", referenceDoc: "SUB-042-006", evidenceCount: 2, remarks: "Subsistence delivered. Housing grievance active — unrelated to subsistence." },
];

export const TRANSPORTATION_RECORDS: TransportationRecord[] = [
  { familyId: "AF-00421", familyName: "Renuka Bai Gurav", relocationRequired: true, originVillage: "Kharpudi", destination: "RS-JLN-01", distance: "4.2 km", transportType: "Truck + Auto", status: "delivered", deliveryDate: "01 Sep 2026", evidenceCount: 2, remarks: "Transportation completed. Family relocated to transit housing." },
  { familyId: "AF-00422", familyName: "Baburao S. Kshirsagar", relocationRequired: true, originVillage: "Kharpudi", destination: "RS-JLN-01", distance: "4.2 km", transportType: "Truck", status: "pending_verification", deliveryDate: "", evidenceCount: 1, remarks: "Transportation arranged — pending field verification of delivery." },
  { familyId: "AF-00423", familyName: "Sukhdeo D. Patil", relocationRequired: true, originVillage: "Wadgaon", destination: "RS-JLN-02", distance: "6.8 km", transportType: "Truck + Auto", status: "verified", deliveryDate: "01 Sep 2026", evidenceCount: 3, remarks: "Transportation verified. All household goods relocated." },
  { familyId: "AF-00424", familyName: "Geeta Devi Sharma", relocationRequired: true, originVillage: "Rajuri", destination: "RS-JLN-03", distance: "5.1 km", transportType: "Auto", status: "pending_verification", deliveryDate: "", evidenceCount: 0, remarks: "Relocation pending — household verification required first." },
  { familyId: "AF-00426", familyName: "Lata V. Jadhav", relocationRequired: true, originVillage: "Kharpudi", destination: "RS-JLN-01", distance: "4.2 km", transportType: "Truck", status: "pending_verification", deliveryDate: "", evidenceCount: 0, remarks: "Cannot proceed with relocation until housing grievance resolved." },
];

export const LIVELIHOOD_RECORDS: LivelihoodRecord[] = [
  { familyId: "AF-00421", familyName: "Renuka Bai Gurav", currentLivelihood: "Mango & Vegetable Farming", impact: "Loss of 1.2 ha cultivated land — primary livelihood disrupted", category: "agriculture", restorationPlan: "Alternative livelihood support through agricultural skill intervention and micro-enterprise grant", supportRequired: "Skill training, input support, market linkage", responsibleAgency: "R&R Officer / District Agriculture", targetDate: "31 Dec 2026", status: "in_progress", evidenceCount: 5, remarks: "Enrolled in mango grafting training. Alternative vegetable cultivation plot identified at resettlement site." },
  { familyId: "AF-00422", familyName: "Baburao S. Kshirsagar", currentLivelihood: "Retail Shop", impact: "Full displacement — shop and residence acquired", category: "small_business", restorationPlan: "Commercial space allocation at resettlement site + micro-enterprise loan facilitation", supportRequired: "Commercial space, working capital support", responsibleAgency: "R&R Officer / District Industries", targetDate: "31 Oct 2026", status: "planned", evidenceCount: 2, remarks: "Site identification for commercial space in progress." },
  { familyId: "AF-00423", familyName: "Sukhdeo D. Patil", currentLivelihood: "Bajra & Jowar Farming", impact: "Partial loss — 1.5 ha of 2.4 ha affected", category: "agriculture", restorationPlan: "Continued farming on remaining land + livestock augmentation", supportRequired: "Livestock support, input subsidy", responsibleAgency: "R&R Officer / District Agriculture", targetDate: "30 Nov 2026", status: "verified", evidenceCount: 4, remarks: "Livelihood restored — remaining land productive. Livestock augmented." },
  { familyId: "AF-00424", familyName: "Geeta Devi Sharma", currentLivelihood: "Wage Employment", impact: "No direct livelihood impact — daily wage labour continues", category: "daily_wage", restorationPlan: "Priority consideration for employment at project site + skill development", supportRequired: "Employment priority card, skill training", responsibleAgency: "R&R Officer / Employment Exchange", targetDate: "31 Dec 2026", status: "pending_verification", evidenceCount: 1, remarks: "Verification pending — household enumeration required." },
  { familyId: "AF-00425", familyName: "Tukaram B. More", currentLivelihood: "Sugarcane Farming", impact: "Partial loss — 1.8 ha of 3.1 ha affected", category: "agriculture", restorationPlan: "Alternative sugarcane cultivation on new land + cooperative linkage", supportRequired: "Land allocation, input support, cooperative membership", responsibleAgency: "R&R Officer / District Agriculture", targetDate: "31 Dec 2026", status: "in_progress", evidenceCount: 3, remarks: "New sugarcane plot identified. Cooperative linkage in progress." },
  { familyId: "AF-00426", familyName: "Lata V. Jadhav", currentLivelihood: "Dairy", impact: "Partial loss — dairy shed on affected land", category: "livestock", restorationPlan: "Dairy infrastructure at resettlement site + veterinary support", supportRequired: "Dairy shed, cattle feed support, veterinary care", responsibleAgency: "R&R Officer / Animal Husbandry", targetDate: "30 Nov 2026", status: "pending_verification", evidenceCount: 1, remarks: "Pending grievance resolution before finalizing livelihood plan." },
];

export const EMPLOYMENT_RECORDS: EmploymentRecord[] = [
  { familyId: "AF-00421", familyName: "Renuka Bai Gurav", eligible: false, eligibilityStatus: "not_eligible", employmentCategory: "N/A — agriculture-based restoration preferred", coordinatingAgency: "R&R Officer", status: "not_applicable", supportingDocCount: 0, remarks: "Family prefers agricultural livelihood restoration over employment support." },
  { familyId: "AF-00422", familyName: "Baburao S. Kshirsagar", eligible: true, eligibilityStatus: "under_review", employmentCategory: "Skilled / Semi-skilled", coordinatingAgency: "District Employment Office", status: "under_review", supportingDocCount: 1, remarks: "Employment support application submitted. Under review by District Employment Office." },
  { familyId: "AF-00424", familyName: "Geeta Devi Sharma", eligible: true, eligibilityStatus: "pending_verification", employmentCategory: "Unskilled / Semi-skilled", coordinatingAgency: "District Employment Office", status: "pending_verification", supportingDocCount: 0, remarks: "Priority employment card issuance pending household verification." },
  { familyId: "AF-00425", familyName: "Tukaram B. More", eligible: true, eligibilityStatus: "eligible", employmentCategory: "Agricultural / Skilled", coordinatingAgency: "R&R Officer / Employment Exchange", status: "in_progress", supportingDocCount: 2, remarks: "Employment support registered. Awaiting project site vacancy." },
  { familyId: "AF-00427", familyName: "Dattatray R. Hule", eligible: true, eligibilityStatus: "under_review", employmentCategory: "Suitable (disability-considerate)", coordinatingAgency: "District Employment Office / Social Welfare", status: "under_review", supportingDocCount: 1, remarks: "Employment suitability assessment under review — disability accommodation required." },
];

export const SKILL_DEV_RECORDS: SkillDevRecord[] = [
  { familyId: "AF-00421", familyName: "Renuka Bai Gurav", existingSkill: "Traditional agriculture", desiredSkill: "Modern horticulture / Food processing", trainingProgram: "Mango Grafting & Food Processing", trainingProvider: "Krishi Vigyan Kendra, Jalna", enrollmentDate: "05 Sep 2026", attendancePercent: 40, completionStatus: "in_training", certificationReceived: false, outcome: "Expected completion Nov 2026", evidenceCount: 2, status: "in_progress" },
  { familyId: "AF-00425", familyName: "Tukaram B. More", existingSkill: "Sugarcane farming", desiredSkill: "Value-added agriculture", trainingProgram: "Sugar Refining & Jaggery Making", trainingProvider: "Mahatma Phule Agricultural University", enrollmentDate: "", attendancePercent: 0, completionStatus: "enrolled", certificationReceived: false, outcome: "Enrollment confirmed — training starts Oct 2026", evidenceCount: 1, status: "planned" },
  { familyId: "AF-00423", familyName: "Sukhdeo D. Patil", existingSkill: "Mixed farming", desiredSkill: "Livestock management", trainingProgram: "Advanced Livestock Management", trainingProvider: "District Animal Husbandry", enrollmentDate: "01 Aug 2026", attendancePercent: 90, completionStatus: "completed", certificationReceived: true, outcome: "Certified — livestock unit augmented", evidenceCount: 3, status: "verified" },
  { familyId: "AF-00427", familyName: "Dattatray R. Hule", existingSkill: "Basic agriculture", desiredSkill: "Accessible livelihood skills", trainingProgram: "Tailoring & Small Enterprise", trainingProvider: "District Social Welfare", enrollmentDate: "", attendancePercent: 0, completionStatus: "not_started", certificationReceived: false, outcome: "Pending — disability-appropriate program identification", evidenceCount: 0, status: "requires_review" },
];

export const SPECIAL_SUPPORT_RECORDS: SpecialSupportRecord[] = [
  { familyId: "AF-00421", familyName: "Renuka Bai Gurav", indicator: "Female-headed household", source: "SIA Register", verification: "verified", officerRemarks: "Enhanced subsistence and livelihood priority confirmed.", evidenceCount: 2, status: "delivered" },
  { familyId: "AF-00422", familyName: "Baburao S. Kshirsagar", indicator: "Elderly household + Economically vulnerable", source: "Field Enumeration", verification: "verified", officerRemarks: "Enhanced support under consideration — housing priority elevated.", evidenceCount: 1, status: "in_progress" },
  { familyId: "AF-00425", familyName: "Tukaram B. More", indicator: "Scheduled Area relevance", source: "Revenue Records", verification: "requires_review", officerRemarks: "Scheduled Area status requires administrative confirmation.", evidenceCount: 1, status: "pending_verification" },
  { familyId: "AF-00426", familyName: "Lata V. Jadhav", indicator: "Female-headed household + Land-dependent", source: "SIA Register", verification: "verified", officerRemarks: "Enhanced support — housing grievance complicates delivery.", evidenceCount: 1, status: "pending_verification" },
  { familyId: "AF-00427", familyName: "Dattatray R. Hule", indicator: "Person with disability", source: "Medical Certificate", verification: "verified", officerRemarks: "Disability accommodation required in all components.", evidenceCount: 2, status: "requires_review" },
];

export const COORDINATION_REQUESTS: CoordinationRequest[] = [
  { id: "CR-042-001", from: "Shri. M. Kamble", fromRole: "Field Officer", to: "R&R Officer", toRole: "R&R Officer", subject: "Please verify livelihood information — AF-00421", priority: "medium", date: "06 Sep 2026", status: "responded", description: "Livelihood verification data collected for Renuka Bai Gurav. Requesting R&R Officer review and confirmation.", relatedCase: "R&R-2026-0187" },
  { id: "CR-042-002", from: "R&R Officer", fromRole: "R&R Officer", to: "Tehsil SDO Office", toRole: "Tehsil / SDO", subject: "Updated household enumeration required — AF-00428", priority: "high", date: "07 Sep 2026", status: "open", description: "Ashok Dhumal household information incomplete. Tehsil-level enumeration records requested.", relatedCase: "R&R-2026-0194" },
  { id: "CR-042-003", from: "R&R Officer", fromRole: "R&R Officer", to: "District Collector Office", toRole: "District Collector / CALA", subject: "Clarification required — R&R applicability for scheduled area", priority: "high", date: "08 Sep 2026", status: "open", description: "AF-00425 scheduled area relevance requires administrative confirmation for enhanced benefits.", relatedCase: "R&R-2026-0191" },
  { id: "CR-042-004", from: "Shri. P. Deshmukh", fromRole: "Field Officer", to: "R&R Officer", toRole: "R&R Officer", subject: "Relocation evidence captured — RS-JLN-04", priority: "low", date: "09 Sep 2026", status: "responded", description: "Relocation verification evidence for AF-00423 uploaded. Requesting review.", relatedCase: "R&R-2026-0189" },
  { id: "CR-042-005", from: "R&R Officer", fromRole: "R&R Officer", to: "District Employment Office", toRole: "External Agency", subject: "Employment support eligibility — AF-00422", priority: "medium", date: "09 Sep 2026", status: "in_progress", description: "Employment support application for Baburao Kshirsagar submitted for review.", relatedCase: "R&R-2026-0188" },
];

export const COMPONENT_PROGRESS = {
  housing: { applicable: 187, completed: 142, inProgress: 30, pending: 15 },
  subsistence: { applicable: 203, completed: 186, inProgress: 14, pending: 3 },
  transportation: { applicable: 165, completed: 106, inProgress: 42, pending: 17 },
  livelihood: { applicable: 178, completed: 91, inProgress: 62, pending: 25 },
  employment: { applicable: 89, completed: 30, inProgress: 34, pending: 25 },
  skillDev: { applicable: 124, completed: 52, inProgress: 45, pending: 27 },
};
