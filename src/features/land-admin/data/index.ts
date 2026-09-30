// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Mock data boundary
// -----------------------------------------------------------------------
// The single import surface for the module's data. Screens import from here
// and never reach into generators directly, so swapping this layer for a real
// API client is a change to THIS FILE plus a service module — not a rewrite
// of any page.
//
// Everything below is synthetic. See the header of each generator.
//
// SYNTHETIC DEMO DATA. Not cadastral. Not a government record.
// ═══════════════════════════════════════════════════════════════════════

export * from "../lib/types";
export {
  CASES,
  CASES_BY_ID,
  CASES_BY_NO,
  HERO_CASE,
  HERO_CASE_NO,
  VILLAGES,
  casesForVillage,
  delayIssue,
  findCaseById,
  TARGETS,
} from "./cases";
export {
  PARCELS,
  PARCELS_BY_ID,
  PARCEL_BY_CASE,
  PARCELS_BY_ID as PARCEL_INDEX,
  MAPPED_VILLAGE_COUNT,
  parcelBySurvey,
  parcelForCase,
  villageById,
  VILLAGE_FOOTPRINTS,
} from "./parcels";
export {
  HOUSEHOLD_CATEGORY_LABEL,
  RESEATLEMENT_OPTIONS,
  documentsForCase,
  householdsForCase,
  timelineForCase,
} from "./caseRecords";
export { NOTIFICATIONS, UNREAD_COUNT } from "./notifications";
export { DISTRICT, MAPPED_VILLAGE_NAMES, VILLAGE_SURVEY_NUMBERS } from "./geography";
export * from "../lib/format";
export * from "../lib/derive";
export { expandRing, pointInRing, ringAreaHa, ringBounds, ringCentroid, ringPerimeterM } from "../lib/geo";
