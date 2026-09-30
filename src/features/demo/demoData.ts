import type { WorkflowStage } from "./workflowTypes";

// ═══════════════════════════════════════════════════════════════════════
// MASTER DEMO DATA — SINGLE SOURCE OF TRUTH
// All data is fictional. DEMO DATA — NOT AUTHORITATIVE.
// ═══════════════════════════════════════════════════════════════════════

export type DemoParcel = {
  parcelId: string;
  projectId: string;
  ulpin: string;
  village: string;
  tehsil: string;
  district: string;
  state: string;
  ownerName: string;
  areaAcres: number;
  classification: string;
  lat: number;
  lng: number;
  currentStage: WorkflowStage;
  status: "active" | "completed" | "objected" | "exempted";
  verificationStatus: "pending" | "verified" | "discrepancy";
  awardStatus: "pending" | "draft" | "finalized" | "approved";
  paymentStatus: "pending" | "initiated" | "completed" | "failed" | "returned";
  possessionStatus: "pending" | "recorded";
  rrStatus: "pending" | "in_progress" | "completed" | "not_applicable";
};

export type DemoObjection = {
  objectionId: string;
  parcelId: string;
  ownerName: string;
  category: string;
  description: string;
  submittedDate: string;
  status: "submitted" | "under_review" | "hearing_scheduled" | "upheld" | "partially_upheld" | "rejected" | "closed";
  decisionDate?: string;
  decisionAuthority?: string;
  decisionReason?: string;
};

export type DemoAward = {
  awardId: string;
  parcelId: string;
  ownerName: string;
  marketValue: number;
  assetValue: number;
  solatium: number;
  interest: number;
  otherComponents: number;
  totalAmount: number;
  status: "draft" | "finalized" | "approved";
  approvedDate?: string;
};

export type DemoPayment = {
  paymentId: string;
  awardId: string;
  parcelId: string;
  ownerName: string;
  amount: number;
  status: "pending" | "initiated" | "completed" | "failed" | "returned" | "pending_verification";
  externalReference?: string;
  initiatedDate?: string;
  completedDate?: string;
  failedDate?: string;
  failureReason?: string;
  retryCount: number;
};

export type DemoPossession = {
  parcelId: string;
  recordedDate?: string;
  recordedBy?: string;
  status: "pending" | "recorded";
  certificateRef?: string;
};

export type DemoRR = {
  parcelId: string;
  ownerName: string;
  housing: "planned" | "in_progress" | "delivered";
  subsistence: "planned" | "recorded" | "delivered";
  transportation: "planned" | "in_progress" | "delivered";
  livelihood: "planned" | "in_progress" | "delivered";
  skillDevelopment: "planned" | "in_progress" | "delivered";
  resettlementSite: string;
  status: "pending" | "in_progress" | "completed";
};

export type DemoDocument = {
  docId: string;
  name: string;
  type: string;
  version: string;
  uploadedBy: string;
  role: string;
  date: string;
  stage: WorkflowStage;
  visibility: "public" | "internal" | "restricted";
  status: "available" | "pending" | "missing";
};

export type DemoAuditEvent = {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  entity: string;
  previousState?: string;
  newState: string;
  stage: WorkflowStage;
};

export type DemoNotification = {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  targetRole: string;
  link: string;
  type: "info" | "action_required" | "update" | "alert";
};

export type DemoSIA = {
  projectId: string;
  familiesAffected: number;
  publicAssetsAffected: number;
  livelihoodImpact: string;
  consultationCompleted: boolean;
  gramSabhaCompleted: boolean;
  status: "pending" | "in_progress" | "completed";
  completedDate?: string;
  reportDocId?: string;
};

// ═══════════════════════════════════════════════════════════════════════
// INITIAL DEMO STATE
// ═══════════════════════════════════════════════════════════════════════

export const INITIAL_DEMO_PROJECT = {
  projectId: "BS-DEMO-26016-001",
  name: "Bengaluru–Mysuru Industrial Corridor Land Acquisition",
  sector: "Transport",
  purpose: "Land acquisition for corridor infrastructure development connecting Bengaluru and Mysuru industrial zones",
  owningMinistry: "Ministry of Road Transport & Highways",
  requiringOrg: "National Highway Authority / Demo Implementing Agency",
  state: "Karnataka",
  district: "Bengaluru Urban",
  tehsil: "Anekal",
  villages: ["Vittasandra", "Hulimangala", "Bannerghatta"],
  totalParcels: 8,
};

export const INITIAL_DEMO_PARCELS: DemoParcel[] = [
  { parcelId: "BS-PARCEL-001", projectId: "BS-DEMO-26016-001", ulpin: "ULPIN-DEMO-001", village: "Vittasandra", tehsil: "Anekal", district: "Bengaluru Urban", state: "Karnataka", ownerName: "Smt. Lakshmi Devi", areaAcres: 1.8, classification: "Agricultural (Class I)", lat: 12.88, lng: 77.63, currentStage: "closed", status: "completed", verificationStatus: "verified", awardStatus: "approved", paymentStatus: "completed", possessionStatus: "recorded", rrStatus: "completed" },
  { parcelId: "BS-PARCEL-002", projectId: "BS-DEMO-26016-001", ulpin: "ULPIN-DEMO-002", village: "Vittasandra", tehsil: "Anekal", district: "Bengaluru Urban", state: "Karnataka", ownerName: "Shri. Ramesh Babu", areaAcres: 2.4, classification: "Agricultural (Class II)", lat: 12.89, lng: 77.64, currentStage: "closed", status: "completed", verificationStatus: "verified", awardStatus: "approved", paymentStatus: "completed", possessionStatus: "recorded", rrStatus: "completed" },
  { parcelId: "BS-PARCEL-003", projectId: "BS-DEMO-26016-001", ulpin: "ULPIN-DEMO-003", village: "Hulimangala", tehsil: "Anekal", district: "Bengaluru Urban", state: "Karnataka", ownerName: "Shri. Venkatesh K.", areaAcres: 3.1, classification: "Agricultural (Class I)", lat: 12.87, lng: 77.62, currentStage: "closed", status: "completed", verificationStatus: "verified", awardStatus: "approved", paymentStatus: "completed", possessionStatus: "recorded", rrStatus: "completed" },
  { parcelId: "BS-PARCEL-004", projectId: "BS-DEMO-26016-001", ulpin: "ULPIN-DEMO-004", village: "Hulimangala", tehsil: "Anekal", district: "Bengaluru Urban", state: "Karnataka", ownerName: "Smt. Premalatha B.", areaAcres: 1.2, classification: "Residential", lat: 12.865, lng: 77.625, currentStage: "closed", status: "completed", verificationStatus: "verified", awardStatus: "approved", paymentStatus: "completed", possessionStatus: "recorded", rrStatus: "completed" },
  { parcelId: "BS-PARCEL-005", projectId: "BS-DEMO-26016-001", ulpin: "ULPIN-DEMO-005", village: "Bannerghatta", tehsil: "Anekal", district: "Bengaluru Urban", state: "Karnataka", ownerName: "Shri. Mohan S.", areaAcres: 4.5, classification: "Agricultural (Class I)", lat: 12.85, lng: 77.61, currentStage: "closed", status: "completed", verificationStatus: "verified", awardStatus: "approved", paymentStatus: "completed", possessionStatus: "recorded", rrStatus: "completed" },
  { parcelId: "BS-PARCEL-006", projectId: "BS-DEMO-26016-001", ulpin: "ULPIN-DEMO-006", village: "Bannerghatta", tehsil: "Anekal", district: "Bengaluru Urban", state: "Karnataka", ownerName: "Smt. Geetha M.", areaAcres: 0.8, classification: "Commercial", lat: 12.855, lng: 77.615, currentStage: "closed", status: "completed", verificationStatus: "verified", awardStatus: "approved", paymentStatus: "completed", possessionStatus: "recorded", rrStatus: "not_applicable" },
  { parcelId: "BS-PARCEL-007", projectId: "BS-DEMO-26016-001", ulpin: "ULPIN-DEMO-007", village: "Vittasandra", tehsil: "Anekal", district: "Bengaluru Urban", state: "Karnataka", ownerName: "Shri. Prakash T.", areaAcres: 1.6, classification: "Agricultural (Class II)", lat: 12.895, lng: 77.635, currentStage: "closed", status: "completed", verificationStatus: "verified", awardStatus: "approved", paymentStatus: "completed", possessionStatus: "recorded", rrStatus: "completed" },
  { parcelId: "BS-PARCEL-008", projectId: "BS-DEMO-26016-001", ulpin: "ULPIN-DEMO-008", village: "Hulimangala", tehsil: "Anekal", district: "Bengaluru Urban", state: "Karnataka", ownerName: "Smt. Suma K.", areaAcres: 2.0, classification: "Agricultural (Class I)", lat: 12.875, lng: 77.622, currentStage: "closed", status: "completed", verificationStatus: "verified", awardStatus: "approved", paymentStatus: "completed", possessionStatus: "recorded", rrStatus: "completed" },
];

export const INITIAL_DEMO_SIA: DemoSIA = {
  projectId: "BS-DEMO-26016-001",
  familiesAffected: 24,
  publicAssetsAffected: 3,
  livelihoodImpact: "Moderate — 18 agricultural families affected, 6 residential. Livelihood restoration recommended.",
  consultationCompleted: true,
  gramSabhaCompleted: true,
  status: "completed",
  completedDate: "15 Jul 2026",
  reportDocId: "DOC-SIA-001",
};

export const INITIAL_DEMO_OBJECTIONS: DemoObjection[] = [
  { objectionId: "BS-OBJ-001", parcelId: "BS-PARCEL-003", ownerName: "Shri. Venkatesh K.", category: "land_area", description: "The area shown in notification (3.1 acres) includes a portion that is not part of my holding. Actual affected area is 2.6 acres.", submittedDate: "10 Aug 2026", status: "upheld", decisionDate: "25 Aug 2026", decisionAuthority: "District Collector, Bengaluru Urban", decisionReason: "Field verification confirmed affected area is 2.6 acres. Award adjusted accordingly." },
  { objectionId: "BS-OBJ-002", parcelId: "BS-PARCEL-005", ownerName: "Shri. Mohan S.", category: "livelihood_impact", description: "This is my primary agricultural land. Without adequate R&R, my family livelihood will be severely impacted.", submittedDate: "12 Aug 2026", status: "rejected", decisionDate: "28 Aug 2026", decisionAuthority: "District Collector, Bengaluru Urban", decisionReason: "Compensation and R&R provisions under LARR Act are adequate." },
];

export const INITIAL_DEMO_AWARDS: DemoAward[] = [
  { awardId: "BS-AWARD-001", parcelId: "BS-PARCEL-001", ownerName: "Smt. Lakshmi Devi", marketValue: 2160000, assetValue: 320000, solatium: 648000, interest: 85000, otherComponents: 45000, totalAmount: 3258000, status: "approved", approvedDate: "15 Sep 2026" },
  { awardId: "BS-AWARD-002", parcelId: "BS-PARCEL-002", ownerName: "Shri. Ramesh Babu", marketValue: 2880000, assetValue: 410000, solatium: 864000, interest: 112000, otherComponents: 58000, totalAmount: 4324000, status: "approved", approvedDate: "15 Sep 2026" },
  { awardId: "BS-AWARD-003", parcelId: "BS-PARCEL-003", ownerName: "Shri. Venkatesh K.", marketValue: 3120000, assetValue: 480000, solatium: 936000, interest: 125000, otherComponents: 62000, totalAmount: 4723000, status: "approved", approvedDate: "15 Sep 2026" },
  { awardId: "BS-AWARD-004", parcelId: "BS-PARCEL-004", ownerName: "Smt. Premalatha B.", marketValue: 1800000, assetValue: 520000, solatium: 540000, interest: 72000, otherComponents: 38000, totalAmount: 2970000, status: "approved", approvedDate: "15 Sep 2026" },
  { awardId: "BS-AWARD-005", parcelId: "BS-PARCEL-005", ownerName: "Shri. Mohan S.", marketValue: 5400000, assetValue: 680000, solatium: 1620000, interest: 215000, otherComponents: 95000, totalAmount: 8010000, status: "approved", approvedDate: "15 Sep 2026" },
  { awardId: "BS-AWARD-006", parcelId: "BS-PARCEL-006", ownerName: "Smt. Geetha M.", marketValue: 1440000, assetValue: 280000, solatium: 432000, interest: 58000, otherComponents: 32000, totalAmount: 2242000, status: "approved", approvedDate: "15 Sep 2026" },
  { awardId: "BS-AWARD-007", parcelId: "BS-PARCEL-007", ownerName: "Shri. Prakash T.", marketValue: 1920000, assetValue: 350000, solatium: 576000, interest: 76000, otherComponents: 42000, totalAmount: 2964000, status: "approved", approvedDate: "15 Sep 2026" },
  { awardId: "BS-AWARD-008", parcelId: "BS-PARCEL-008", ownerName: "Smt. Suma K.", marketValue: 2400000, assetValue: 390000, solatium: 720000, interest: 95000, otherComponents: 48000, totalAmount: 3653000, status: "approved", approvedDate: "15 Sep 2026" },
];

export const INITIAL_DEMO_PAYMENTS: DemoPayment[] = [
  { paymentId: "BS-PAY-001", awardId: "BS-AWARD-001", parcelId: "BS-PARCEL-001", ownerName: "Smt. Lakshmi Devi", amount: 3258000, status: "completed", externalReference: "MOCK-PFMS-BS-001", initiatedDate: "20 Sep 2026", completedDate: "20 Sep 2026", retryCount: 0 },
  { paymentId: "BS-PAY-002", awardId: "BS-AWARD-002", parcelId: "BS-PARCEL-002", ownerName: "Shri. Ramesh Babu", amount: 4324000, status: "completed", externalReference: "MOCK-PFMS-BS-002", initiatedDate: "20 Sep 2026", completedDate: "20 Sep 2026", retryCount: 0 },
  { paymentId: "BS-PAY-003", awardId: "BS-AWARD-003", parcelId: "BS-PARCEL-003", ownerName: "Shri. Venkatesh K.", amount: 4723000, status: "completed", externalReference: "MOCK-PFMS-BS-003", initiatedDate: "20 Sep 2026", completedDate: "20 Sep 2026", retryCount: 0 },
  { paymentId: "BS-PAY-004", awardId: "BS-AWARD-004", parcelId: "BS-PARCEL-004", ownerName: "Smt. Premalatha B.", amount: 2970000, status: "completed", externalReference: "MOCK-PFMS-BS-004", initiatedDate: "20 Sep 2026", completedDate: "20 Sep 2026", retryCount: 0 },
  { paymentId: "BS-PAY-005", awardId: "BS-AWARD-005", parcelId: "BS-PARCEL-005", ownerName: "Shri. Mohan S.", amount: 8010000, status: "failed", failureReason: "Beneficiary account details require verification", initiatedDate: "20 Sep 2026", failedDate: "21 Sep 2026", retryCount: 1 },
  { paymentId: "BS-PAY-006", awardId: "BS-AWARD-006", parcelId: "BS-PARCEL-006", ownerName: "Smt. Geetha M.", amount: 2242000, status: "completed", externalReference: "MOCK-PFMS-BS-006", initiatedDate: "20 Sep 2026", completedDate: "20 Sep 2026", retryCount: 0 },
  { paymentId: "BS-PAY-007", awardId: "BS-AWARD-007", parcelId: "BS-PARCEL-007", ownerName: "Shri. Prakash T.", amount: 2964000, status: "completed", externalReference: "MOCK-PFMS-BS-007", initiatedDate: "20 Sep 2026", completedDate: "20 Sep 2026", retryCount: 0 },
  { paymentId: "BS-PAY-008", awardId: "BS-AWARD-008", parcelId: "BS-PARCEL-008", ownerName: "Smt. Suma K.", amount: 3653000, status: "completed", externalReference: "MOCK-PFMS-BS-008", initiatedDate: "20 Sep 2026", completedDate: "20 Sep 2026", retryCount: 0 },
];

export const INITIAL_DEMO_POSSESSION: DemoPossession[] = [
  { parcelId: "BS-PARCEL-001", recordedDate: "25 Sep 2026", recordedBy: "Field Officer, Anekal", status: "recorded", certificateRef: "POSS-BS-001" },
  { parcelId: "BS-PARCEL-002", recordedDate: "25 Sep 2026", recordedBy: "Field Officer, Anekal", status: "recorded", certificateRef: "POSS-BS-002" },
  { parcelId: "BS-PARCEL-003", recordedDate: "25 Sep 2026", recordedBy: "Field Officer, Anekal", status: "recorded", certificateRef: "POSS-BS-003" },
  { parcelId: "BS-PARCEL-004", recordedDate: "25 Sep 2026", recordedBy: "Field Officer, Anekal", status: "recorded", certificateRef: "POSS-BS-004" },
  { parcelId: "BS-PARCEL-005", recordedDate: "26 Sep 2026", recordedBy: "Field Officer, Anekal", status: "recorded", certificateRef: "POSS-BS-005" },
  { parcelId: "BS-PARCEL-006", recordedDate: "26 Sep 2026", recordedBy: "Field Officer, Anekal", status: "recorded", certificateRef: "POSS-BS-006" },
  { parcelId: "BS-PARCEL-007", recordedDate: "26 Sep 2026", recordedBy: "Field Officer, Anekal", status: "recorded", certificateRef: "POSS-BS-007" },
  { parcelId: "BS-PARCEL-008", recordedDate: "26 Sep 2026", recordedBy: "Field Officer, Anekal", status: "recorded", certificateRef: "POSS-BS-008" },
];

export const INITIAL_DEMO_RR: DemoRR[] = [
  { parcelId: "BS-PARCEL-001", ownerName: "Smt. Lakshmi Devi", housing: "delivered", subsistence: "delivered", transportation: "delivered", livelihood: "delivered", skillDevelopment: "delivered", resettlementSite: "RS-BLR-01", status: "completed" },
  { parcelId: "BS-PARCEL-002", ownerName: "Shri. Ramesh Babu", housing: "delivered", subsistence: "delivered", transportation: "delivered", livelihood: "delivered", skillDevelopment: "delivered", resettlementSite: "RS-BLR-01", status: "completed" },
  { parcelId: "BS-PARCEL-003", ownerName: "Shri. Venkatesh K.", housing: "delivered", subsistence: "delivered", transportation: "delivered", livelihood: "in_progress", skillDevelopment: "in_progress", resettlementSite: "RS-BLR-01", status: "completed" },
  { parcelId: "BS-PARCEL-004", ownerName: "Smt. Premalatha B.", housing: "delivered", subsistence: "delivered", transportation: "delivered", livelihood: "delivered", skillDevelopment: "planned", resettlementSite: "RS-BLR-01", status: "completed" },
  { parcelId: "BS-PARCEL-005", ownerName: "Shri. Mohan S.", housing: "delivered", subsistence: "delivered", transportation: "delivered", livelihood: "delivered", skillDevelopment: "delivered", resettlementSite: "RS-BLR-01", status: "completed" },
  { parcelId: "BS-PARCEL-006", ownerName: "Smt. Geetha M.", housing: "planned", subsistence: "planned", transportation: "planned", livelihood: "planned", skillDevelopment: "planned", resettlementSite: "RS-BLR-01", status: "completed" },
  { parcelId: "BS-PARCEL-007", ownerName: "Shri. Prakash T.", housing: "delivered", subsistence: "delivered", transportation: "delivered", livelihood: "delivered", skillDevelopment: "delivered", resettlementSite: "RS-BLR-01", status: "completed" },
  { parcelId: "BS-PARCEL-008", ownerName: "Smt. Suma K.", housing: "delivered", subsistence: "delivered", transportation: "delivered", livelihood: "in_progress", skillDevelopment: "in_progress", resettlementSite: "RS-BLR-01", status: "completed" },
];

export const INITIAL_DEMO_DOCUMENTS: DemoDocument[] = [
  { docId: "DOC-001", name: "Project Proposal", type: "Proposal", version: "1.0", uploadedBy: "RO / Demo IA", role: "ro_ia", date: "01 Mar 2026", stage: "proposal", visibility: "internal", status: "available" },
  { docId: "DOC-002", name: "GIS Identification Report", type: "GIS Report", version: "1.0", uploadedBy: "RO / Demo IA", role: "ro_ia", date: "15 Apr 2026", stage: "gis_identification", visibility: "internal", status: "available" },
  { docId: "DOC-003", name: "Scrutiny Report", type: "Scrutiny", version: "1.0", uploadedBy: "District Collector, Bengaluru Urban", role: "cala", date: "01 Jun 2026", stage: "scrutiny", visibility: "internal", status: "available" },
  { docId: "DOC-004", name: "SIA Report", type: "SIA", version: "1.0", uploadedBy: "SIA Expert Group", role: "sia_expert", date: "15 Jul 2026", stage: "sia", visibility: "public", status: "available" },
  { docId: "DOC-005", name: "Section 11 Preliminary Notification", type: "Notification", version: "1.0", uploadedBy: "District Collector, Bengaluru Urban", role: "cala", date: "01 Aug 2026", stage: "section_11", visibility: "public", status: "available" },
  { docId: "DOC-006", name: "Public Disclosure Notice", type: "Notice", version: "1.0", uploadedBy: "System", role: "system", date: "05 Aug 2026", stage: "disclosure", visibility: "public", status: "available" },
  { docId: "DOC-007", name: "Section 19 Declaration", type: "Declaration", version: "1.0", uploadedBy: "District Collector, Bengaluru Urban", role: "cala", date: "01 Sep 2026", stage: "section_19", visibility: "public", status: "available" },
  { docId: "DOC-008", name: "Field Verification Report", type: "Verification", version: "1.0", uploadedBy: "Field Officer, Anekal", role: "field_officer", date: "10 Sep 2026", stage: "field_verification", visibility: "internal", status: "available" },
  { docId: "DOC-009", name: "Award Order", type: "Award", version: "1.0", uploadedBy: "District Collector, Bengaluru Urban", role: "cala", date: "15 Sep 2026", stage: "award", visibility: "internal", status: "available" },
  { docId: "DOC-010", name: "Payment Records", type: "Payment", version: "1.0", uploadedBy: "Finance Officer", role: "finance", date: "20 Sep 2026", stage: "payment", visibility: "restricted", status: "available" },
  { docId: "DOC-011", name: "Possession Certificates", type: "Possession", version: "1.0", uploadedBy: "Field Officer, Anekal", role: "field_officer", date: "26 Sep 2026", stage: "possession", visibility: "internal", status: "available" },
  { docId: "DOC-012", name: "R&R Completion Records", type: "R&R", version: "1.0", uploadedBy: "R&R Officer", role: "rr_officer", date: "30 Sep 2026", stage: "r_and_r", visibility: "internal", status: "available" },
  { docId: "DOC-013", name: "Final Completion Report", type: "Completion", version: "1.0", uploadedBy: "System", role: "system", date: "01 Oct 2026", stage: "closed", visibility: "internal", status: "available" },
];

export const INITIAL_DEMO_AUDIT: DemoAuditEvent[] = [
  { id: "AUD-001", timestamp: "01 Mar 2026 10:00", actor: "Shri. K. Venkataramanaiah", role: "Requiring Organisation", action: "Project created", entity: "BS-DEMO-26016-001", newState: "Proposal", stage: "proposal" },
  { id: "AUD-002", timestamp: "15 Apr 2026 10:30", actor: "Shri. K. Venkataramanaiah", role: "Requiring Organisation", action: "GIS identification completed", entity: "BS-DEMO-26016-001", previousState: "Proposal", newState: "GIS Identification", stage: "gis_identification" },
  { id: "AUD-003", timestamp: "01 May 2026 11:00", actor: "Shri. K. Venkataramanaiah", role: "Requiring Organisation", action: "Project submitted for scrutiny", entity: "BS-DEMO-26016-001", previousState: "GIS Identification", newState: "Submission", stage: "submission" },
  { id: "AUD-004", timestamp: "01 Jun 2026 14:00", actor: "Smt. Priya Sharma", role: "District Collector / CALA", action: "Scrutiny completed", entity: "BS-DEMO-26016-001", previousState: "Submission", newState: "Scrutiny", stage: "scrutiny" },
  { id: "AUD-005", timestamp: "15 Jul 2026 16:00", actor: "Dr. Anand Rao", role: "SIA Expert Group", action: "SIA completed — 24 families, 3 public assets affected", entity: "BS-DEMO-26016-001", previousState: "Scrutiny", newState: "SIA", stage: "sia" },
  { id: "AUD-006", timestamp: "01 Aug 2026 09:00", actor: "Smt. Priya Sharma", role: "District Collector / CALA", action: "Section 11 notification issued", entity: "BS-DEMO-26016-001", previousState: "SIA", newState: "Section 11", stage: "section_11" },
  { id: "AUD-007", timestamp: "05 Aug 2026 10:00", actor: "System", role: "System", action: "Public disclosure published", entity: "BS-DEMO-26016-001", previousState: "Section 11", newState: "Disclosure", stage: "disclosure" },
  { id: "AUD-008", timestamp: "10 Aug 2026 11:00", actor: "Shri. Venkatesh K.", role: "Citizen / Landowner", action: "Objection submitted — land area dispute", entity: "BS-OBJ-001", newState: "Submitted", stage: "objections" },
  { id: "AUD-009", timestamp: "12 Aug 2026 11:30", actor: "Shri. Mohan S.", role: "Citizen / Landowner", action: "Objection submitted — livelihood impact", entity: "BS-OBJ-002", newState: "Submitted", stage: "objections" },
  { id: "AUD-010", timestamp: "25 Aug 2026 15:00", actor: "Smt. Priya Sharma", role: "District Collector / CALA", action: "Objection UPHELD — area adjusted to 2.6 acres", entity: "BS-OBJ-001", previousState: "Submitted", newState: "Upheld", stage: "objections" },
  { id: "AUD-011", timestamp: "28 Aug 2026 15:30", actor: "Smt. Priya Sharma", role: "District Collector / CALA", action: "Objection REJECTED — compensation adequate", entity: "BS-OBJ-002", previousState: "Submitted", newState: "Rejected", stage: "objections" },
  { id: "AUD-012", timestamp: "01 Sep 2026 09:00", actor: "Smt. Priya Sharma", role: "District Collector / CALA", action: "Section 19 declaration issued", entity: "BS-DEMO-26016-001", previousState: "Objections", newState: "Section 19", stage: "section_19" },
  { id: "AUD-013", timestamp: "10 Sep 2026 11:00", actor: "Shri. Mahesh J.", role: "Field Officer / VAO", action: "Field verification completed — all 8 parcels verified", entity: "BS-DEMO-26016-001", previousState: "Section 19", newState: "Field Verification", stage: "field_verification" },
  { id: "AUD-014", timestamp: "15 Sep 2026 14:00", actor: "Smt. Priya Sharma", role: "District Collector / CALA", action: "Awards finalized — 8 awards totaling ₹32,144,000", entity: "BS-DEMO-26016-001", previousState: "Field Verification", newState: "Award", stage: "award" },
  { id: "AUD-015", timestamp: "20 Sep 2026 10:00", actor: "Smt. R. Kulkarni", role: "Finance Officer", action: "Payment initiated for 8 parcels", entity: "BS-DEMO-26016-001", previousState: "Award", newState: "Payment", stage: "payment" },
  { id: "AUD-016", timestamp: "21 Sep 2026 09:00", actor: "System (PFMS Mock)", role: "System", action: "Payment FAILED — BS-PAY-005 — account details require verification", entity: "BS-PAY-005", newState: "Failed", stage: "payment" },
  { id: "AUD-017", timestamp: "23 Sep 2026 11:00", actor: "Smt. R. Kulkarni", role: "Finance Officer", action: "Payment retried — BS-PAY-005", entity: "BS-PAY-005", previousState: "Failed", newState: "Initiated", stage: "payment" },
  { id: "AUD-018", timestamp: "23 Sep 2026 14:00", actor: "System (PFMS Mock)", role: "System", action: "Payment completed — BS-PAY-005 — ₹80,10,000 deposited", entity: "BS-PAY-005", previousState: "Initiated", newState: "Completed", stage: "payment" },
  { id: "AUD-019", timestamp: "25 Sep 2026 10:00", actor: "Shri. Mahesh J.", role: "Field Officer / VAO", action: "Possession recorded for all 8 parcels", entity: "BS-DEMO-26016-001", previousState: "Payment", newState: "Possession", stage: "possession" },
  { id: "AUD-020", timestamp: "30 Sep 2026 15:00", actor: "Smt. Anjali B.", role: "R&R Officer", action: "R&R completed for all eligible families", entity: "BS-DEMO-26016-001", previousState: "Possession", newState: "R&R", stage: "r_and_r" },
  { id: "AUD-021", timestamp: "01 Oct 2026 16:00", actor: "System", role: "System", action: "PROJECT CLOSED — all stages completed", entity: "BS-DEMO-26016-001", previousState: "R&R", newState: "Closed", stage: "closed" },
];

export const INITIAL_DEMO_NOTIFICATIONS: DemoNotification[] = [
  { id: "DN-001", title: "Project submitted for scrutiny", message: "RO has submitted BS-DEMO-26016-001 for CALA scrutiny.", date: "01 May 2026", read: true, targetRole: "cala", link: "/app/collector/overview", type: "info" },
  { id: "DN-002", title: "SIA completed", message: "SIA completed for BS-DEMO-26016-001. Section 11 is now available.", date: "15 Jul 2026", read: true, targetRole: "cala", link: "/app/collector/overview", type: "update" },
  { id: "DN-003", title: "New objection received", message: "Objection BS-OBJ-001 received for Parcel BS-PARCEL-003.", date: "10 Aug 2026", read: true, targetRole: "cala", link: "/app/collector/overview", type: "action_required" },
  { id: "DN-004", title: "Award approved", message: "Awards finalized for BS-DEMO-26016-001. Ready for payment processing.", date: "15 Sep 2026", read: true, targetRole: "finance", link: "/app/finance/dashboard", type: "action_required" },
  { id: "DN-005", title: "Payment status updated", message: "Your compensation payment status has been updated.", date: "20 Sep 2026", read: false, targetRole: "citizen", link: "/citizen/my-case/compensation", type: "update" },
  { id: "DN-006", title: "Possession recorded", message: "Possession recorded for all parcels. R&R case ready for review.", date: "25 Sep 2026", read: false, targetRole: "rr_officer", link: "/app/rr/dashboard", type: "info" },
  { id: "DN-007", title: "R&R completed", message: "R&R completed for all eligible families. Project ready for closure.", date: "30 Sep 2026", read: false, targetRole: "cala", link: "/app/collector/overview", type: "update" },
  { id: "DN-008", title: "Project closed", message: "BS-DEMO-26016-001 has been closed. All stages completed.", date: "01 Oct 2026", read: false, targetRole: "all", link: "/app/overview", type: "info" },
];
