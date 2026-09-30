/**
 * Terranex GIS — synthetic cadastral dataset generator.
 *
 * ============================================================================
 * SYNTHETIC DEMO DATA. NOT CADASTRAL. NOT A GOVERNMENT RECORD.
 * ============================================================================
 * Every coordinate, boundary, survey number, owner and monetary value produced
 * here is fabricated for demonstration. The shapes are structurally valid
 * RFC 7946 GeoJSON so they render correctly and can be swapped for real
 * cadastral data later, but no government, revenue or survey system is
 * contacted, and no real land record is represented.
 *
 * Design notes
 * ------------
 * • Generation is fully DETERMINISTIC (seeded `mulberry32`). There is no
 *   `Math.random()` anywhere, so the map is byte-identical on every load and
 *   across every role. (An earlier revision of this codebase scattered parcels
 *   with `Math.random()` on every render; that defect is not repeated here.)
 *
 * • Geometry is authored in a LOCAL METRE PLANE anchored to a single origin,
 *   then projected to WGS84. This lets us offset by real distances, subdivide by
 *   real arc length, and compute true polygon areas.
 *
 * • `areaHa` on every parcel is DERIVED from its own geometry via the shoelace
 *   formula. It is never an independent literal, so the drawn parcel and the
 *   stated area can never disagree.
 *
 * • Parcels in the same block are cut from a shared pair of offset polylines.
 *   Consecutive parcels therefore reuse the exact same vertices, which is what
 *   produces shared cadastral boundaries instead of a grid of unrelated boxes.
 *   Per-vertex jitter is applied to the *boundary polylines*, not to individual
 *   parcels, so neighbours still match exactly.
 */

import type { LifecycleStage, ParcelBlocker } from "@/types/domain";
import { STAGE_BY_ID } from "@/lib/stages";
import type {
  AcquisitionCaseRef,
  AcquisitionStatus,
  AdministrativeBoundaryShape,
  CompensationStatus,
  GeoParcel,
  GisStats,
  InfrastructureLine,
  JurisdictionRef,
  LandUse,
  Position,
  PossessionStatus,
  ProjectBoundaryShape,
  SettlementPoint,
} from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Deterministic PRNG
// ─────────────────────────────────────────────────────────────────────────────

/** mulberry32 — small, fast, fully deterministic 32-bit PRNG. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next(): number {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Projection helpers — local metre plane anchored at ORIGIN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Anchor point sits on the NH-47 alignment south-west of Madurai, Tamil Nadu.
 * Chosen so the public OpenStreetMap raster basemap shows genuine agricultural
 * terrain, settlements and water at the zooms this workstation uses.
 */
const ORIGIN = { lat: 10.742, lng: 77.126 };

const M_PER_DEG_LAT = 110574;
const M_PER_DEG_LNG = 111320 * Math.cos((ORIGIN.lat * Math.PI) / 180);

type Local = [number, number]; // [easting m, northing m]

function toLngLat(p: Local): Position {
  return [ORIGIN.lng + p[0] / M_PER_DEG_LNG, ORIGIN.lat + p[1] / M_PER_DEG_LAT];
}

function ringToPolygon(ring: Local[]): { type: "Polygon"; coordinates: Position[] } {
  const closed: Position[] = [...ring.map(toLngLat), toLngLat(ring[0])];
  return { type: "Polygon", coordinates: closed };
}

function lineToGeoJson(points: Local[]): { type: "LineString"; coordinates: Position[] } {
  return { type: "LineString", coordinates: points.map(toLngLat) };
}

// ─────────────────────────────────────────────────────────────────────────────
// Polygon measurement
// ─────────────────────────────────────────────────────────────────────────────

/** Shoelace area of a local-plane ring, in square metres. */
function ringAreaSqm(ring: Local[]): number {
  let sum = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    sum += x1 * y2 - x2 * y1;
  }
  return Math.abs(sum) / 2;
}

/**
 * Area-weighted interior point (polygon centroid, falling back to the vertex
 * average for degenerate rings). Used for map labels and fly-to targets.
 */
function ringCentroid(ring: Local[]): Local {
  let cx = 0;
  let cy = 0;
  let a2 = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    const cross = x1 * y2 - x2 * y1;
    a2 += cross;
    cx += (x1 + x2) * cross;
    cy += (y1 + y2) * cross;
  }
  if (Math.abs(a2) < 1e-6) {
    const n = ring.length || 1;
    return [ring.reduce((s, p) => s + p[0], 0) / n, ring.reduce((s, p) => s + p[1], 0) / n];
  }
  return [cx / (3 * a2), cy / (3 * a2)];
}

// ─────────────────────────────────────────────────────────────────────────────
// Polyline geometry — arc length, offsetting, interpolation
// ─────────────────────────────────────────────────────────────────────────────

function cumulativeLength(points: Local[]): number[] {
  const cum: number[] = [0];
  for (let i = 1; i < points.length; i += 1) {
    const [x1, y1] = points[i - 1];
    const [x2, y2] = points[i];
    cum.push(cum[i - 1] + Math.hypot(x2 - x1, y2 - y1));
  }
  return cum;
}

/** Point at a given arc length along a polyline, plus the local unit tangent. */
function pointAtArc(points: Local[], cum: number[], s: number): { point: Local; tangent: Local } {
  const total = cum[cum.length - 1];
  const target = Math.max(0, Math.min(total, s));
  let i = 1;
  while (i < cum.length - 1 && cum[i] < target) i += 1;
  const [x1, y1] = points[i - 1];
  const [x2, y2] = points[i];
  const seg = Math.hypot(x2 - x1, y2 - y1) || 1;
  const t = (target - cum[i - 1]) / seg;
  const tangent: Local = [(x2 - x1) / seg, (y2 - y1) / seg];
  return { point: [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t], tangent };
}

/**
 * Offset a polyline sideways by `dist` metres (negative offsets to the other
 * side), displacing each vertex along its own local normal plus a little
 * along-track wander. Because the wander is baked into the boundary polyline
 * rather than into individual parcels, parcels cut from this polyline still
 * share exact vertices with their neighbours.
 */
function offsetPolyline(points: Local[], dist: number, jitterAmp: number, rng: () => number): Local[] {
  return points.map((p, i) => {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    let tx = next[0] - prev[0];
    let ty = next[1] - prev[1];
    const len = Math.hypot(tx, ty) || 1;
    tx /= len;
    ty /= len;
    const nx = -ty;
    const ny = tx;
    const d = dist + (rng() - 0.5) * 2 * jitterAmp;
    const wander = (rng() - 0.5) * 2 * jitterAmp * 1.5;
    return [p[0] + nx * d + tx * wander, p[1] + ny * d + ty * wander];
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Project alignment (the NH-47 acquisition spine)
// ─────────────────────────────────────────────────────────────────────────────

const SPINE: Local[] = [
  [0, 0],
  [240, 55],
  [470, 175],
  [700, 238],
  [940, 218],
  [1180, 140],
  [1420, 122],
  [1650, 192],
  [1880, 320],
  [2100, 478],
  [2300, 658],
  [2470, 848],
  [2600, 1048],
  [2690, 1258],
  [2740, 1478],
];

const SPINE_ARC = cumulativeLength(SPINE);
const CORRIDOR_LENGTH_M = SPINE_ARC[SPINE_ARC.length - 1];

/**
 * Cross-section blocks, measured perpendicular to the alignment.
 * `inner`/`outer` are metres from the centreline. Blocks are cut on both sides.
 * Block 3 carries survey series 1042 and hosts the hero parcel.
 */
const BLOCKS = [
  { key: "b1", inner: 0, outer: 92, splits: 3, jitter: 5, survey: "1041" },
  { key: "b2", inner: 92, outer: 212, splits: 3, jitter: 7, survey: "1043" },
  { key: "b3", inner: 212, outer: 380, splits: 2, jitter: 9, survey: "1042" },
  { key: "b4", inner: 380, outer: 566, splits: 1, jitter: 12, survey: "1044" },
] as const;

/**
 * Hero parcel arc window inside block 3, north side.
 * Tuned so that the *derived* area lands on 2.84 ha once boundary jitter is
 * applied — see the assertion in `buildParcels`.
 */
const HERO_ARC_START = 520;
const HERO_ARC_END = 692.5;
/** Hero block 3 is exactly 168 m deep → 168 × 169 = 28,392 m² = 2.84 ha. */
const HERO_SURVEY = "1042/3A";
const HERO_PARCEL_ID = "PAR-1042-3A";
export const HERO_CASE_ID = "CASE-402";
export const HERO_CASE_STORE_ID = "case-402";
export const HERO_FIELD_TASK_ID = "ft-402";

/** Breakpoints for block 3 on the north side, forced so the hero is the 3rd cell. */
const BLOCK3_NORTH_ARCS = [
  0, 240, HERO_ARC_START, HERO_ARC_END, 940, 1180, 1420, 1650, 1880, 2100, 2300, 2470, 2600, 2690,
  CORRIDOR_LENGTH_M,
];

/** Even split of a span into `n` sub-spans. */
function evenArcs(from: number, to: number, n: number): number[] {
  const out: number[] = [from];
  for (let i = 1; i < n; i += 1) out.push(from + ((to - from) * i) / n);
  out.push(to);
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Reference data
// ─────────────────────────────────────────────────────────────────────────────

export const PROJECT = {
  id: "PRJ-NH47-P03",
  name: "NH-47 Expansion",
  package: "Package 03",
  title: "NH-47 Expansion — Package 03",
  ministry: "Ministry of Road Transport & Highways",
  requiringOrg: "National Highways Authority of India — Synthetic Regional Office",
  statutoryReference: "RFCTLARR Act, 2013",
} as const;

const JURISDICTION: JurisdictionRef = {
  state: "Tamil Nadu",
  stateCode: "TN",
  district: "Synthetic District",
  tehsil: "Synthetic Taluk",
  village: "Synthetic Village",
};

const RESPONSIBLE_AUTHORITY = "Collector / CALA";

const OWNER_FIRST = [
  "Smt. K. Lalitha",
  "Shri. M. Venkatesan",
  "Smt. R. Andal",
  "Shri. P. Duraisamy",
  "Smt. J. Meenakshi",
  "Shri. A. Selvaraj",
  "Smt. N. Ramalakshmi",
  "Shri. K. Gurusamy",
  "Smt. T. Bhuvaneswari",
  "Shri. S. Chandrasekar",
  "Smt. V. Lalithaa",
  "Shri. D. Thirumalai",
];

const OWNER_SECOND = [
  "Smt. B. Ananthi",
  "Shri. R. Krishnan",
  "Smt. S. Poonguzhali",
  "Shri. M. Senthilkumar",
  "Smt. L. Kirthiga",
  "Shri. A. Prabakaran",
];

/** Market value per hectare by land use, in rupees. */
const MARKET_VALUE_PER_HA: Record<LandUse, number> = {
  agricultural: 2_450_000,
  residential: 7_800_000,
  commercial: 12_400_000,
  barren: 780_000,
  forest: 1_150_000,
  government: 1_900_000,
};

const STATUS_STAGE: Record<AcquisitionStatus, LifecycleStage> = {
  not_started: "land_requirement",
  survey_completed: "gis_identification",
  sia_completed: "sia",
  declaration_issued: "declaration",
  compensation_pending: "compensation",
  award_passed: "award",
  possession_pending: "payment",
  possession_completed: "closed",
  blocked: "possession",
};

const STATUS_COMPENSATION: Record<AcquisitionStatus, CompensationStatus> = {
  not_started: "not_assessed",
  survey_completed: "not_assessed",
  sia_completed: "not_assessed",
  declaration_issued: "not_assessed",
  compensation_pending: "assessed",
  award_passed: "award_passed",
  possession_pending: "award_passed",
  possession_completed: "disbursed",
  blocked: "award_passed",
};

const STATUS_POSSESSION: Record<AcquisitionStatus, PossessionStatus> = {
  not_started: "not_scheduled",
  survey_completed: "not_scheduled",
  sia_completed: "not_scheduled",
  declaration_issued: "not_scheduled",
  compensation_pending: "not_scheduled",
  award_passed: "not_scheduled",
  possession_pending: "scheduled",
  possession_completed: "recorded",
  blocked: "not_scheduled",
};

/**
 * Target population per status, as a share of the generated parcel count.
 * Allocation is proportional and always sums to the exact total, so no status
 * can be silently dropped when the geometry generator's output size changes.
 * The realised counts are recomputed in `GIS_STATS` and are what the dashboard
 * displays — the figures below are inputs to generation, never displayed output.
 */
const STATUS_WEIGHTS: Array<[AcquisitionStatus, number]> = [
  ["possession_completed", 46],
  ["award_passed", 40],
  ["compensation_pending", 38],
  ["sia_completed", 30],
  ["possession_pending", 30],
  ["survey_completed", 26],
  ["declaration_issued", 26],
  ["not_started", 9],
  ["blocked", 7],
];

/** Acquisition cases spanning contiguous stretches of the alignment. */
const CASE_WINDOWS: Array<{
  id: string;
  storeId: string;
  from: number;
  to: number;
  stage: AcquisitionStatus;
  title: string;
}> = [
  { id: "CASE-395", storeId: "case-395", from: 0, to: 560, stage: "award_passed", title: "Kovilpatty stretch — Package 03 Lot A" },
  { id: "CASE-398", storeId: "case-398", from: 560, to: 1180, stage: "possession_pending", title: "Semmipalayam stretch — Package 03 Lot B" },
  { id: "CASE-401", storeId: "case-401", from: 1180, to: 1900, stage: "compensation_pending", title: "Thoppakulam stretch — Package 03 Lot C" },
  { id: "CASE-405", storeId: "case-405", from: 1900, to: 2500, stage: "declaration_issued", title: "Kovilpattymadai stretch — Package 03 Lot D" },
  { id: "CASE-409", storeId: "case-409", from: 2500, to: CORRIDOR_LENGTH_M + 1, stage: "sia_completed", title: "Terminal stretch — Package 03 Lot E" },
];

const HERO_BLOCKER: ParcelBlocker = {
  status: "BLOCKED",
  summary: "Possession Evidence Missing",
  reason:
    "Statutory possession under RFCTLARR §38 cannot be recorded until geo-tagged possession evidence is captured on site and verified by the field officer. Award is complete and the case is otherwise ready, but the evidence gate is unmet.",
  gate: "RFCTLARR §38 — Taking Possession",
  requiredEvidence: [
    "Geo-tagged possession photograph",
    "GPS coordinates of the parcel boundary",
    "Possession memo signed by the landowner",
    "Officer verification report",
  ],
  satisfiedEvidence: ["Compensation assessment sheet", "Award order u/s 23"],
  responsibleRole: "field_officer",
  responsibleRoleLabel: "Field Officer",
  responsibleOfficer: "Shri. M. Kamble, VAO — Synthetic Circle",
  raisedAt: "2026-09-18T09:12:00+05:30",
};

// ─────────────────────────────────────────────────────────────────────────────
// Generation
// ─────────────────────────────────────────────────────────────────────────────

type DraftParcel = {
  ring: Local[];
  areaHa: number;
  landUse: LandUse;
  surveyNumber: string;
  side: 1 | -1;
  blockKey: string;
  midArc: number;
};

function buildDraftParcels(): DraftParcel[] {
  const rng = mulberry32(0x7e44a9);
  const drafts: DraftParcel[] = [];

  // Survey suffix counters, keyed by block only. Numbering runs continuously
  // across both sides of the alignment so two physically distinct parcels can
  // never share a survey number.
  const counters = new Map<string, number>();

  for (const side of [1, -1] as const) {
    for (const block of BLOCKS) {
      const inner = offsetPolyline(SPINE, side * block.inner, block.jitter * 0.6, rng);
      const outer = offsetPolyline(SPINE, side * block.outer, block.jitter, rng);
      const innerArc = cumulativeLength(inner);
      const outerArc = cumulativeLength(outer);

      let arcs: number[];
      if (block.key === "b3" && side === 1) {
        // Forced layout so the hero parcel lands on the 3rd cell of survey 1042.
        arcs = BLOCK3_NORTH_ARCS;
      } else {
        arcs = [];
        for (let i = 1; i < SPINE_ARC.length; i += 1) {
          const seg = evenArcs(SPINE_ARC[i - 1], SPINE_ARC[i], block.splits);
          arcs.push(...(i === 1 ? seg : seg.slice(1)));
        }
      }

      // Initialise once per block; the counter must survive across both sides
      // so numbering runs continuously and never collides.
      const counterKey = block.key;
      if (!counters.has(counterKey)) counters.set(counterKey, 0);

      for (let c = 0; c < arcs.length - 1; c += 1) {
        const a = arcs[c];
        const b = arcs[c + 1];
        const span = b - a;
        if (span < 12) continue;

        const innerA = pointAtArc(inner, innerArc, a).point;
        const innerB = pointAtArc(inner, innerArc, b).point;
        const outerB = pointAtArc(outer, outerArc, b).point;
        const outerA = pointAtArc(outer, outerArc, a).point;

        // Counter-clockwise ordering keeps the ring well-formed for Leaflet.
        const ring: Local[] = side === 1 ? [innerA, innerB, outerB, outerA] : [innerA, outerA, outerB, innerB];

        const areaHa = ringAreaSqm(ring) / 10_000;
        if (areaHa < 0.03) continue; // discard slivers from the jitter

        const n = counters.get(counterKey) ?? 0;
        counters.set(counterKey, n + 1);

        // Survey numbering.
        //
        // Block 3 carries series 1042. In real village records a sub-survey
        // that has been split is re-lettered rather than renumbered, so the
        // third cell of the series is recorded as 3A/3B and there is no plain
        // "3". Series 1042 is generated north-side first (the `side` loop runs
        // +1 then -1), so the split lands on the hero parcel's own frontage.
        let suffix: string;
        if (block.key === "b3") {
          suffix = n === 0 ? "1" : n === 1 ? "2" : n === 2 ? "3A" : n === 3 ? "3B" : String(n);
        } else {
          suffix = String(n + 1);
        }

        drafts.push({
          ring,
          areaHa,
          landUse: pickLandUse(block.key, side, span, rng),
          surveyNumber: `${block.survey}/${suffix}`,
          side,
          blockKey: block.key,
          midArc: (a + b) / 2,
        });
      }
    }
  }

  return drafts;
}

function pickLandUse(blockKey: string, side: 1 | -1, span: number, rng: () => number): LandUse {
  const roll = rng();
  if (blockKey === "b1") {
    // Roadside strip: mixed built-up and intensive cultivation.
    if (roll < 0.34) return "residential";
    if (roll < 0.46) return "commercial";
    if (roll < 0.56) return "government";
    return "agricultural";
  }
  if (blockKey === "b4") {
    if (roll < 0.24) return "forest";
    if (roll < 0.48) return "barren";
    return "agricultural";
  }
  if (roll < 0.045) return "barren";
  if (roll < 0.06) return "government";
  // Narrow frontages on one side of the corridor skew residential, as is typical
  // where a bypass runs alongside an existing village.
  if (side === -1 && span < 90 && roll < 0.16) return "residential";
  return "agricultural";
}

/** Allocate the status list proportionally, summing to exactly `total`. */
function buildStatuses(total: number, heroIndex: number): AcquisitionStatus[] {
  const weightTotal = STATUS_WEIGHTS.reduce((s, [, w]) => s + w, 0);
  const out: AcquisitionStatus[] = [];
  const allocated = STATUS_WEIGHTS.map(([status, weight]) => {
    // Largest-remainder allocation so the parts always sum to the whole.
    const exact = (weight / weightTotal) * total;
    const n = Math.floor(exact);
    for (let i = 0; i < n; i += 1) out.push(status);
    return { status, remainder: exact - n };
  });
  let deficit = total - out.length;
  for (const { status } of [...allocated].sort((a, b) => b.remainder - a.remainder)) {
    if (deficit <= 0) break;
    out.push(status);
    deficit -= 1;
  }

  // Deterministic Fisher–Yates so statuses are spread through the corridor
  // rather than clustered by generation order.
  const rng = mulberry32(0x5eed02);
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }

  // The hero parcel must be BLOCKED. If it drew a different status, swap it
  // with a parcel that already holds `blocked` so the population is unchanged.
  if (out[heroIndex] !== "blocked") {
    const donor = out.indexOf("blocked", heroIndex === 0 ? 1 : 0);
    if (donor !== -1) {
      out[donor] = out[heroIndex];
      out[heroIndex] = "blocked";
    }
  }
  return out;
}

function buildParcels(): GeoParcel[] {
  const drafts = buildDraftParcels();
  const heroIndex = drafts.findIndex((d) => d.surveyNumber === HERO_SURVEY);
  if (heroIndex === -1) {
    throw new Error(
      `Terranex GIS: hero survey ${HERO_SURVEY} was not generated. Check BLOCK3_NORTH_ARCS.`,
    );
  }
  const statuses = buildStatuses(drafts.length, heroIndex);
  const rng = mulberry32(0xcada57);

  return drafts.map((d, i) => {
    const status = statuses[i];
    const isHero = d.surveyNumber === HERO_SURVEY;
    const effectiveStatus: AcquisitionStatus = isHero ? "blocked" : status;
    const areaHa = Number(d.areaHa.toFixed(2));
    const marketValue = MARKET_VALUE_PER_HA[d.landUse];
    const compensationAmount = Math.round((areaHa * marketValue) / 10_000) * 10_000;
    const ownerIndex = Math.floor(rng() * OWNER_FIRST.length);
    const second = rng() < 0.28;
    const strip = Math.floor(d.midArc / 400) + 1;

    const parcel: GeoParcel = {
      id: `par-${String(i + 1).padStart(3, "0")}`,
      parcelId: `PAR-${d.surveyNumber.replace(/\//g, "-")}`,
      surveyNumber: d.surveyNumber,
      caseId: isHero ? HERO_CASE_ID : caseForArc(d.midArc, d.blockKey, d.side),
      geometry: ringToPolygon(d.ring),
      centroid: toLngLat(ringCentroid(d.ring)),
      areaHa,
      landUse: d.landUse,
      acquisitionStatus: effectiveStatus,
      workflowStage: STAGE_BY_ID[STATUS_STAGE[effectiveStatus]].label,
      compensationStatus: STATUS_COMPENSATION[effectiveStatus],
      possessionStatus: STATUS_POSSESSION[effectiveStatus],
      ownerName: second
        ? `${OWNER_FIRST[ownerIndex]} & ${OWNER_SECOND[Math.floor(rng() * OWNER_SECOND.length)]}`
        : OWNER_FIRST[ownerIndex],
      khataNo: `KH/${1040 + strip}/${String(10 + Math.floor(rng() * 380)).padStart(3, "0")}`,
      ulpin: `ULPIN-TN-SYN-${String(100000 + i * 7).slice(0, 6)}`,
      jurisdiction: JURISDICTION,
      responsibleAuthority: RESPONSIBLE_AUTHORITY,
      compensationAmount,
      inProjectScope: true,
      blocker: null,
      fieldTaskId: null,
    };

    if (isHero) {
      parcel.blocker = { ...HERO_BLOCKER, requiredEvidence: [...HERO_BLOCKER.requiredEvidence] };
      parcel.fieldTaskId = HERO_FIELD_TASK_ID;
    }

    return parcel;
  });
}

function caseForArc(midArc: number, blockKey: string, side: 1 | -1): string | null {
  const win = CASE_WINDOWS.find((w) => midArc >= w.from && midArc < w.to);
  if (!win) return null;
  // The two outermost blocks on the far side of the corridor are rendered as
  // context only and are not yet requisitioned.
  if (blockKey === "b4" && side === -1) return null;
  return win.id;
}

export const TERRANEX_PARCELS: GeoParcel[] = buildParcels();

export const HERO_PARCEL: GeoParcel = (() => {
  const found = TERRANEX_PARCELS.find((p) => p.surveyNumber === HERO_SURVEY);
  if (!found) {
    throw new Error(
      `Terranex GIS: hero parcel ${HERO_SURVEY} was not generated. Check BLOCK3_NORTH_ARCS alignment.`,
    );
  }
  return found;
})();

/**
 * Build-time invariants. These run in the browser on module load, so a bad
 * edit to the generator fails loudly and visibly during development instead of
 * quietly shipping an inconsistent demo dataset.
 */
(() => {
  const dupes = TERRANEX_PARCELS.filter(
    (p, i, all) => all.findIndex((q) => q.surveyNumber === p.surveyNumber) !== i,
  );
  if (dupes.length > 0) {
    throw new Error(
      `Terranex GIS: duplicate survey numbers generated: ${[...new Set(dupes.map((d) => d.surveyNumber))].join(", ")}`,
    );
  }
  if (HERO_PARCEL.areaHa !== 2.84) {
    throw new Error(
      `Terranex GIS: hero parcel derived area is ${HERO_PARCEL.areaHa} ha, expected 2.84 ha. ` +
        `Retune HERO_ARC_END (currently ${HERO_ARC_END}) or block 3 outer offset.`,
    );
  }
  if (HERO_PARCEL.parcelId !== HERO_PARCEL_ID) {
    throw new Error(
      `Terranex GIS: hero parcel id is ${HERO_PARCEL.parcelId}, expected ${HERO_PARCEL_ID}.`,
    );
  }
  if (HERO_PARCEL.acquisitionStatus !== "blocked" || HERO_PARCEL.workflowStage !== "Possession") {
    throw new Error("Terranex GIS: hero parcel must be BLOCKED at the Possession stage.");
  }
  if (TERRANEX_PARCELS.filter((p) => p.acquisitionStatus === "blocked").length < 2) {
    throw new Error("Terranex GIS: expected the hero parcel plus at least one other blocked parcel.");
  }
})();

// ─────────────────────────────────────────────────────────────────────────────
// Project / administrative boundaries, infrastructure, settlements
// ─────────────────────────────────────────────────────────────────────────────

function buildProjectBoundary(): ProjectBoundaryShape {
  const rng = mulberry32(0x9111ce);
  const north = offsetPolyline(SPINE, BLOCKS[3].outer + 18, 14, rng);
  const south = offsetPolyline(SPINE, -(BLOCKS[3].outer + 18), 14, rng);
  const ring: Local[] = [...north, ...south.slice().reverse()];
  const inScope = TERRANEX_PARCELS.filter((p) => p.inProjectScope);
  return {
    id: PROJECT.id,
    name: PROJECT.name,
    package: PROJECT.package,
    geometry: ringToPolygon(ring),
    corridorKm: Number((CORRIDOR_LENGTH_M / 1000).toFixed(2)),
    areaHa: Number(inScope.reduce((s, p) => s + p.areaHa, 0).toFixed(1)),
    parcelCount: inScope.length,
  };
}

function buildAdminBoundary(): AdministrativeBoundaryShape {
  const rng = mulberry32(0x5a1ead);
  const cx = CORRIDOR_LENGTH_M / 2;
  const cy = 700;
  const rx = CORRIDOR_LENGTH_M * 0.62 + 900;
  const ry = 1500;
  const ring: Local[] = [];
  const steps = 26;
  for (let i = 0; i < steps; i += 1) {
    const t = (i / steps) * Math.PI * 2;
    const wobble = 1 + (rng() - 0.5) * 0.22;
    ring.push([cx + Math.cos(t) * rx * wobble, cy + Math.sin(t) * ry * wobble]);
  }
  return {
    id: "adm-synthetic-taluk",
    label: "Synthetic Taluk — administrative extent",
    geometry: ringToPolygon(ring),
  };
}

function buildInfrastructure(): InfrastructureLine[] {
  const rng = mulberry32(0x2b0c4d);
  const centre = offsetPolyline(SPINE, 0, 3, rng);

  const crossA: Local[] = [
    [SPINE[1][0] + 470, SPINE[1][1] - 520],
    [SPINE[1][0] + 250, SPINE[1][1] - 200],
    [SPINE[1][0] + 120, SPINE[1][1] + 20],
    [SPINE[1][0] - 40, SPINE[1][1] + 300],
  ];
  const crossB: Local[] = [
    [SPINE[8][0] - 420, SPINE[8][1] + 560],
    [SPINE[8][0] - 120, SPINE[8][1] + 180],
    [SPINE[8][0] + 60, SPINE[8][1] - 40],
    [SPINE[8][0] + 300, SPINE[8][1] - 380],
  ];
  const canal: Local[] = offsetPolyline(SPINE.slice(2, 13), BLOCKS[1].inner - 26, 16, rng);

  return [
    { id: "infra-alignment", name: "Proposed 6-lane alignment (Package 03)", kind: "alignment", geometry: lineToGeoJson(centre) },
    { id: "infra-highway", name: "NH-47 existing carriageway", kind: "highway", geometry: lineToGeoJson(offsetPolyline(SPINE, -46, 5, rng)) },
    { id: "infra-cross-a", name: "Access road — Kovilpatty link", kind: "access", geometry: lineToGeoJson(crossA) },
    { id: "infra-cross-b", name: "Access road — Thoppakulam link", kind: "access", geometry: lineToGeoJson(crossB) },
    { id: "infra-canal", name: "Kovilpatty irrigation channel", kind: "canal", geometry: lineToGeoJson(canal) },
  ];
}

function buildSettlements(): SettlementPoint[] {
  return [
    { id: "set-1", name: "Settlement A — Kovilpatty", position: toLngLat([300, 150]), kind: "village" },
    { id: "set-2", name: "Settlement B — Semmipalayam", position: toLngLat([1320, 210]), kind: "village" },
    { id: "set-3", name: "Settlement C — Thoppakulam", position: toLngLat([2380, 990]), kind: "hamlet" },
  ];
}

export const PROJECT_BOUNDARY: ProjectBoundaryShape = buildProjectBoundary();
export const ADMIN_BOUNDARY: AdministrativeBoundaryShape = buildAdminBoundary();
export const INFRASTRUCTURE: InfrastructureLine[] = buildInfrastructure();
export const SETTLEMENTS: SettlementPoint[] = buildSettlements();

// ─────────────────────────────────────────────────────────────────────────────
// Derived indexes, cases and statistics
// ─────────────────────────────────────────────────────────────────────────────

export const JURISDICTION_REF = JURISDICTION;
export const PROJECT_AUTHORITY = RESPONSIBLE_AUTHORITY;
export const MAP_ORIGIN: { center: Position; zoom: number } = {
  center: toLngLat([CORRIDOR_LENGTH_M / 2, 700]),
  zoom: 15,
};

/**
 * Full drawing extent of the parcel dataset, flattened to a single vertex list.
 * Pre-computed once at module load so "frame the whole project" is a constant
 * lookup rather than a per-click reduce over 1,000+ coordinates.
 */
export const PARCEL_EXTENT: Position[] = TERRANEX_PARCELS.flatMap((p) => p.geometry.coordinates);

/** Screen width reserved for the docked parcel detail panel, in CSS pixels. */
export const DETAIL_PANEL_WIDTH = 320;

export function getParcelBySurvey(surveyNumber: string): GeoParcel | undefined {
  return TERRANEX_PARCELS.find((p) => p.surveyNumber === surveyNumber);
}

export function getParcelByCase(caseId: string): GeoParcel[] {
  return TERRANEX_PARCELS.filter((p) => p.caseId === caseId);
}

export const TERRANEX_CASES: AcquisitionCaseRef[] = [
  ...CASE_WINDOWS.map<AcquisitionCaseRef>((w) => {
    const parcels = TERRANEX_PARCELS.filter((p) => p.caseId === w.id);
    return {
      id: w.id,
      label: w.id,
      project: PROJECT.title,
      stage: STAGE_BY_ID[STATUS_STAGE[w.stage]].label,
      status: w.stage,
      parcelCount: parcels.length,
      areaHa: Number(parcels.reduce((s, p) => s + p.areaHa, 0).toFixed(2)),
      blocked: false,
    };
  }),
  (() => {
    const parcels = TERRANEX_PARCELS.filter((p) => p.caseId === HERO_CASE_ID);
    return {
      id: HERO_CASE_ID,
      label: HERO_CASE_ID,
      project: PROJECT.title,
      stage: STAGE_BY_ID.possession.label,
      status: "blocked" as AcquisitionStatus,
      parcelCount: parcels.length,
      areaHa: Number(parcels.reduce((s, p) => s + p.areaHa, 0).toFixed(2)),
      blocked: true,
    };
  })(),
].sort((a, b) => a.id.localeCompare(b.id));

export const HERO_CASE: AcquisitionCaseRef = TERRANEX_CASES.find((c) => c.id === HERO_CASE_ID)!;

export const GIS_STATS: GisStats = (() => {
  const total = TERRANEX_PARCELS.length;
  const blocked = TERRANEX_PARCELS.filter((p) => p.acquisitionStatus === "blocked");
  return {
    total,
    inAcquisition: TERRANEX_PARCELS.filter(
      (p) => p.acquisitionStatus !== "possession_completed" && p.acquisitionStatus !== "not_started",
    ).length,
    compensationPending: TERRANEX_PARCELS.filter((p) => p.acquisitionStatus === "compensation_pending")
      .length,
    possessionPending: TERRANEX_PARCELS.filter((p) => p.acquisitionStatus === "possession_pending")
      .length,
    blocked: blocked.length,
    notStarted: TERRANEX_PARCELS.filter((p) => p.acquisitionStatus === "not_started").length,
    completed: TERRANEX_PARCELS.filter((p) => p.acquisitionStatus === "possession_completed").length,
    areaHa: Number(
      TERRANEX_PARCELS.filter((p) => p.inProjectScope).reduce((s, p) => s + p.areaHa, 0).toFixed(1),
    ),
  };
})();

// ─────────────────────────────────────────────────────────────────────────────
// GeoJSON FeatureCollection — concrete artefact for the "GeoJSON-compatible"
// claim, and the exact payload shape a real `GET /api/gis/parcels` would return.
// ─────────────────────────────────────────────────────────────────────────────

export const PARCEL_FEATURE_COLLECTION = {
  type: "FeatureCollection" as const,
  features: TERRANEX_PARCELS.map((p) => ({
    type: "Feature" as const,
    id: p.parcelId,
    geometry: p.geometry,
    properties: {
      parcelId: p.parcelId,
      surveyNumber: p.surveyNumber,
      caseId: p.caseId,
      areaHa: p.areaHa,
      landUse: p.landUse,
      acquisitionStatus: p.acquisitionStatus,
      workflowStage: p.workflowStage,
      compensationStatus: p.compensationStatus,
      possessionStatus: p.possessionStatus,
      village: p.jurisdiction.village,
      responsibleAuthority: p.responsibleAuthority,
      blocked: Boolean(p.blocker),
    },
  })),
};
