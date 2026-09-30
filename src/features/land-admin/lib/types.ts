// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Domain types
// -----------------------------------------------------------------------
// One entity graph for the whole module. Every parcel links to exactly one
// case; every case links to exactly one parcel; documents, households and
// timeline events hang off the case. That is what makes the demo read as a
// single connected system rather than a set of screens.
//
// SYNTHETIC DEMO DATA. Not cadastral. Not a government record.
// ═══════════════════════════════════════════════════════════════════════

/**
 * WGS84 [lng, lat] — GeoJSON axis order, which is how every ring in this
 * module is stored and computed. Leaflet wants the opposite, so anything
 * handed to react-leaflet must go through `toLatLngs` in lib/geo.ts first.
 */
export type LngLat = [number, number];

/** A closed ring. First and last vertex are NOT repeated (see `ringAreaSqm`). */
export type Ring = LngLat[];

/** Signed status vocabulary — deliberately domain-shaped, not generic. */
export type AcquisitionStage =
  | "draft"
  | "submitted"
  | "under_verification"
  | "land_valuation"
  | "award_processing"
  | "compensation_approved"
  | "compensation_paid"
  | "rnr_assessment"
  | "rnr_approved"
  | "completed"
  | "delayed";

export type AcquisitionStatus = AcquisitionStage;

export type CompensationStatus =
  | "not_initiated"
  | "estimated"
  | "under_approval"
  | "approved"
  | "partially_paid"
  | "paid"
  | "delayed";

export type RnrStatus =
  | "not_required"
  | "pending"
  | "assessment_completed"
  | "approval_pending"
  | "approved"
  | "completed";

export type VerificationStatus = "not_started" | "under_verification" | "verified" | "discrepancy";

export type CaseStatus = "active" | "closed" | "on_hold";

export type Priority = "high" | "medium" | "low" | "critical";

export type LandClassification =
  | "Dry Agricultural Land"
  | "Wet Agricultural Land"
  | "Dry Land (Scrub)"
  | "Land with Trees"
  | "Residential"
  | "Commercial"
  | "Government Land"
  | "Tank / Water Body";

export type LandUse = "agricultural" | "residential" | "commercial" | "industrial" | "vacant" | "other";

export type DocumentType =
  | "Land Ownership Record"
  | "Survey Sketch"
  | "Land Valuation Report"
  | "Award Proceedings"
  | "Compensation Order"
  | "R&R Assessment"
  | "Identity Verification"
  | "Bank Details"
  | "Supporting Document"
  | "Notification";

export type DocumentStatus = "verified" | "pending_verification" | "rejected";

export type HouseholdCategory = "small_farmer" | "marginal_farmer" | "landless_labour" | "artisan" | "tenant";

export interface Taluk {
  id: string;
  name: string;
  /** Revenue division this taluk reports to. */
  division: string;
  villages: string[];
}

export interface District {
  id: string;
  name: string;
  state: string;
  stateCode: string;
  /** Map centre for the district view. */
  centre: LngLat;
  taluks: Taluk[];
}

/** A village footprint — the outer ring that gets subdivided into parcels. */
export interface VillageFootprint {
  id: string;
  name: string;
  talukId: string;
  taluk: string;
  district: string;
  centre: LngLat;
  ring: Ring;
  /** Survey-number stem, so a village's plots read as one coherent block. */
  surveyStem: number;
}

export interface Parcel {
  id: string;
  /** Display survey number, e.g. "184/2A". */
  surveyNo: string;
  villageId: string;
  village: string;
  taluk: string;
  district: string;
  ring: Ring;
  centroid: LngLat;
  /** ALWAYS derived from `ring` via shoelace — never an independent literal. */
  areaHa: number;
  landClassification: LandClassification;
  landUse: LandUse;
  /** The single case this parcel belongs to. Never null, never duplicated. */
  caseId: string;
  /** Whether this parcel is drawn on the GIS layer at all. */
  mapped: boolean;
}

export interface Landowner {
  name: string;
  fatherName: string;
  /** Masked — never a full identifier. */
  aadhaarMasked: string;
  mobileMasked: string;
  category: "general" | "sc" | "st" | "obc" | "minor";
  pattaNo: string;
}

export interface Household {
  id: string;
  caseId: string;
  parcelId: string;
  surveyNo: string;
  village: string;
  headOfHousehold: string;
  category: HouseholdCategory;
  familySize: number;
  monthlyIncome: number;
  /** True when the household appears on the R&R beneficiary list. */
  eligible: boolean;
  /** Resettlement option selected during R&R assessment. */
  resettlementOption: string | null;
}

export interface CaseDocument {
  id: string;
  caseId: string;
  name: string;
  type: DocumentType;
  uploadedOn: string;
  uploadedBy: string;
  fileSizeKb: number;
  status: DocumentStatus;
  /** Present only when `status === "rejected"`. */
  rejectionReason?: string;
}

export interface TimelineEvent {
  id: string;
  caseId: string;
  date: string;
  title: string;
  detail: string;
  actor: string;
  office: string;
  state: "completed" | "current" | "pending";
  /** True when this event is what pushed the case past its statutory window. */
  isDelay?: boolean;
  delayDays?: number;
}

export interface Compensation {
  /** Circular rate assessed by the Sub-Collector, ₹/standard acre. */
  marketValuePerAcre: number;
  estimated: number;
  approved: number;
  paid: number;
  /** Approved but not yet disbursed. */
  pending: number;
  approvedOn: string | null;
  paidOn: string | null;
  /** Treasury reference, only once payment is initiated. */
  treasuryRef: string | null;
}

export interface Acquisition {
  purpose: string;
  authority: string;
  governmentOrderRef: string;
  /** Notification served under s.11(1) of the Land Acquisition Act. */
  notificationDate: string | null;
  declarationDate: string | null;
  objectionsReceived: number;
  objectionsDisposed: number;
}

export interface CaseRecord {
  id: string;
  caseNo: string;
  parcelId: string;
  surveyNo: string;
  villageId: string;
  village: string;
  taluk: string;
  district: string;
  areaHa: number;
  landClassification: LandClassification;
  landUse: LandUse;

  status: CaseStatus;
  stage: AcquisitionStage;
  priority: Priority;
  verification: VerificationStatus;
  compensationStatus: CompensationStatus;
  rnrStatus: RnrStatus;

  acquisition: Acquisition;
  compensation: Compensation;

  affectedHouseholds: number;
  eligibleHouseholds: number;

  responsibleOffice: string;
  revenueOfficer: string;

  createdOn: string;
  lastUpdated: string;
  /** Days since the case's current stage was entered. Drives the delay view. */
  daysPending: number;
  /** Statutory window for the current stage, in days. */
  stageSlaDays: number;
  /** Total days the case has been open. */
  ageDays: number;

  owner: Landowner;
}

export interface NotificationItem {
  id: string;
  caseId: string | null;
  title: string;
  body: string;
  at: string;
  read: boolean;
  tone: "info" | "warning" | "critical" | "success";
  office: string;
}

/** Fixed "now" for the demo so every relative figure is deterministic. */
export const DEMO_NOW = new Date("2026-09-30T10:42:00+05:30");
export const DEMO_NOW_LABEL = "30 Sep 2026, 10:42 AM";
