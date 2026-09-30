import type { ParcelBlocker } from "@/types/domain";

/**
 * Terranex GIS — synthetic cadastral domain model.
 *
 * HONESTY NOTE
 * -------------
 * Every coordinate, parcel, boundary and status in this module is SYNTHETIC and
 * generated deterministically in `geoData.ts`. Nothing here is derived from, or
 * connected to, any government or revenue record system. The geometry is
 * structurally valid GeoJSON (RFC 7946) so it renders correctly and can be
 * swapped for real cadastral data later, but the shapes are fabricated for
 * demonstration purposes only.
 */

/** GeoJSON position order is [longitude, latitude]. */
export type Position = [number, number];

/** RFC 7946 Polygon geometry. Ring is closed (first position === last position). */
export type GeoPolygon = {
  type: "Polygon";
  coordinates: Position[];
};

/** RFC 7946 LineString geometry, used for roads, canals and the project alignment. */
export type GeoLineString = {
  type: "LineString";
  coordinates: Position[];
};

/** Land-use classification, aligned with the canonical `LandType` union. */
export type LandUse =
  | "agricultural"
  | "residential"
  | "commercial"
  | "barren"
  | "forest"
  | "government";

/**
 * Acquisition workflow status. Ordered along the statutory pipeline; the order
 * of this union is also the sort order used in the legend and filter controls.
 */
export type AcquisitionStatus =
  | "not_started"
  | "survey_completed"
  | "sia_completed"
  | "declaration_issued"
  | "compensation_pending"
  | "award_passed"
  | "possession_pending"
  | "possession_completed"
  | "blocked";

export type CompensationStatus =
  | "not_assessed"
  | "assessed"
  | "award_passed"
  | "disbursed"
  | "disputed";

export type PossessionStatus = "not_scheduled" | "scheduled" | "recorded";

/** Required evidence item attached to a blocker. */
export type EvidenceItem = {
  id: string;
  label: string;
  detail: string;
  satisfied: boolean;
};

export type JurisdictionRef = {
  state: string;
  stateCode: string;
  district: string;
  tehsil: string;
  village: string;
};

export type GeoParcel = {
  id: string;
  /** Human-facing cadastral identifier, e.g. `PAR-1042-3A`. */
  parcelId: string;
  /** Survey number as printed on the record, e.g. `1042/3A`. */
  surveyNumber: string;
  /** Acquisition case this parcel is bundled into, or null if not yet requisitioned. */
  caseId: string | null;

  geometry: GeoPolygon;
  /** Area-weighted interior point, used for map labels and fly-to targets. */
  centroid: Position;

  /**
   * Hectares. DERIVED from `geometry` via the shoelace formula in `geoData.ts`
   * — never an independent hand-written literal, so the map and the record can
   * never disagree.
   */
  areaHa: number;

  landUse: LandUse;
  acquisitionStatus: AcquisitionStatus;
  workflowStage: string;
  compensationStatus: CompensationStatus;
  possessionStatus: PossessionStatus;

  ownerName: string;
  khataNo: string;
  ulpin: string;

  jurisdiction: JurisdictionRef;
  responsibleAuthority: string;
  compensationAmount: number;

  /** False for parcels rendered as context that sit outside the project alignment. */
  inProjectScope: boolean;
  /** Present only where the parcel is gated by missing evidence. */
  blocker: ParcelBlocker | null;
  /** Field-officer task that would clear `blocker`, when one exists. */
  fieldTaskId: string | null;
};

export type ProjectBoundaryShape = {
  id: string;
  name: string;
  package: string;
  geometry: GeoPolygon;
  /** Corridor length in kilometres, derived from the alignment. */
  corridorKm: number;
  /** Sum of in-scope parcel areas, derived from parcel geometry. */
  areaHa: number;
  parcelCount: number;
};

export type AdministrativeBoundaryShape = {
  id: string;
  label: string;
  geometry: GeoPolygon;
};

export type InfrastructureLine = {
  id: string;
  name: string;
  kind: "alignment" | "highway" | "access" | "canal";
  geometry: GeoLineString;
};

export type SettlementPoint = {
  id: string;
  name: string;
  position: Position;
  kind: "village" | "hamlet";
};

export type AcquisitionCaseRef = {
  id: string;
  /** Display form, e.g. `CASE-402`. */
  label: string;
  project: string;
  stage: string;
  status: AcquisitionStatus;
  parcelCount: number;
  areaHa: number;
  blocked: boolean;
};

export type GisStats = {
  total: number;
  inAcquisition: number;
  compensationPending: number;
  possessionPending: number;
  blocked: number;
  notStarted: number;
  completed: number;
  areaHa: number;
};

export type MapLayerKey =
  | "parcels"
  | "projectBoundary"
  | "adminBoundary"
  | "infrastructure"
  | "acquisitionStatus"
  | "blocked";

export const MAP_LAYER_LABELS: Record<MapLayerKey, string> = {
  parcels: "Cadastral Parcels",
  projectBoundary: "Project Boundary",
  adminBoundary: "Administrative Boundary",
  infrastructure: "Roads & Water",
  acquisitionStatus: "Acquisition Status",
  blocked: "Blocked Cases",
};

export const DEFAULT_LAYERS: Record<MapLayerKey, boolean> = {
  parcels: true,
  projectBoundary: true,
  adminBoundary: true,
  infrastructure: true,
  acquisitionStatus: true,
  blocked: true,
};

export const ACQUISITION_STATUS_ORDER: AcquisitionStatus[] = [
  "not_started",
  "survey_completed",
  "sia_completed",
  "declaration_issued",
  "compensation_pending",
  "award_passed",
  "possession_pending",
  "possession_completed",
  "blocked",
];

export const ACQUISITION_STATUS_LABEL: Record<AcquisitionStatus, string> = {
  not_started: "Not Started",
  survey_completed: "Survey Completed",
  sia_completed: "SIA Completed",
  declaration_issued: "Declaration Issued",
  compensation_pending: "Compensation Pending",
  award_passed: "Award Passed",
  possession_pending: "Possession Pending",
  possession_completed: "Possession Completed",
  blocked: "Blocked",
};

/**
 * Restrained institutional palette — muted, desaturated fills that stay legible
 * over OpenStreetMap raster tiles. Avoids neon and gaming-style saturation.
 */
export const ACQUISITION_STATUS_COLOR: Record<AcquisitionStatus, { fill: string; stroke: string }> = {
  not_started: { fill: "#94a3b8", stroke: "#64748b" },
  survey_completed: { fill: "#7ea8c9", stroke: "#4a7ba7" },
  sia_completed: { fill: "#6f9fa8", stroke: "#3f7480" },
  declaration_issued: { fill: "#5b93a3", stroke: "#31657a" },
  compensation_pending: { fill: "#c9a961", stroke: "#9a6b00" },
  award_passed: { fill: "#8fae7b", stroke: "#5f8049" },
  possession_pending: { fill: "#5f9a7d", stroke: "#356f56" },
  possession_completed: { fill: "#0f7a5a", stroke: "#0a5941" },
  blocked: { fill: "#b42318", stroke: "#7d1810" },
};

export const LAND_USE_LABEL: Record<LandUse, string> = {
  agricultural: "Agricultural",
  residential: "Residential",
  commercial: "Commercial",
  barren: "Barren / Fallow",
  forest: "Forest",
  government: "Government",
};

export const COMPENSATION_STATUS_LABEL: Record<CompensationStatus, string> = {
  not_assessed: "Not Assessed",
  assessed: "Assessed",
  award_passed: "Award Passed",
  disbursed: "Disbursed",
  disputed: "Disputed",
};

export const POSSESSION_STATUS_LABEL: Record<PossessionStatus, string> = {
  not_scheduled: "Not Scheduled",
  scheduled: "Scheduled",
  recorded: "Recorded",
};
