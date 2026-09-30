// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Parcels
// -----------------------------------------------------------------------
// Bridges the two halves of the demo. Each mapped village footprint is
// recursively sliced into irregular, shared-boundary cadastral polygons, and
// every resulting parcel is bound to a real case from the district caseload —
// so clicking a polygon opens a case that also exists in the table, the
// compensation register and the analytics rollups.
//
// `areaHa` is always shoelace-derived from the drawn ring, so the polygon a
// judge sees and the area printed beside it cannot disagree. The one
// exception is the hero parcel 184/2A, whose ring is scaled to land on the
// 1.84 ha quoted in the walkthrough; the invariant at the bottom enforces that.
//
// SYNTHETIC DEMO DATA. Not cadastral. Not a government record.
// ═══════════════════════════════════════════════════════════════════════

import type { CaseRecord, LngLat, Parcel, Ring, VillageFootprint } from "../lib/types";
import { hashString, mulberry32, ringAreaHa, ringCentroid } from "../lib/geo";
import { buildParcelRings, buildVillageFootprints, VILLAGE_SURVEY_NUMBERS } from "./geography";
import { CASES, HERO_CASE, casesForVillage } from "./cases";

export const VILLAGE_FOOTPRINTS: VillageFootprint[] = buildVillageFootprints();

const VILLAGE_BY_ID = new Map(VILLAGE_FOOTPRINTS.map((v) => [v.id, v]));

/** The hero walkthrough always opens on this one. */
const HERO_SURVEY_NO = "184/2A";
const HERO_AREA_HA = 1.84;

/**
 * Scale a ring uniformly about its centroid so its shoelace area equals
 * `targetHa`. Used to pin the hero plot to a published figure; every other
 * plot keeps whatever the slicer produced.
 */
function scaleRingToArea(ring: Ring, targetHa: number): Ring {
  const current = ringAreaHa(ring);
  if (current <= 0) return ring;
  const k = Math.sqrt(targetHa / current);
  const [cLng, cLat] = ringCentroid(ring);
  return ring.map(([lng, lat]) => {
    // Convert to metres about the centroid, scale, convert back — so the
    // scaling is isotropic in real-world terms, not in degrees.
    const mLng = 111320 * Math.cos((cLat * Math.PI) / 180);
    const east = (lng - cLng) * mLng;
    const north = (lat - cLat) * 110574;
    return [cLng + (east * k) / mLng, cLat + (north * k) / 110574] as LngLat;
  });
}

/**
 * Choose which case a drawn parcel belongs to.
 *
 * The hero parcel is pinned to the hero case so the walkthrough's GIS click
 * and its case page are literally the same record. Everything else draws from
 * that village's own caseload, preferring cases whose status makes the layer
 * worth looking at (delayed and in-flight cases sit under the eye).
 */
function bindCase(villageCases: CaseRecord[], rnd: () => number): CaseRecord {
  // Weighted preference so the map isn't uniformly one colour.
  const weight = (c: CaseRecord) => {
    if (c.stage === "delayed") return 6;
    if (c.verification === "under_verification") return 5;
    if (c.status === "active") return 3;
    if (c.status === "on_hold") return 1;
    return 2; // closed
  };
  const pool = villageCases.length > 0 ? villageCases : CASES;
  const total = pool.reduce((s, c) => s + weight(c), 0);
  let roll = rnd() * total;
  for (const c of pool) {
    roll -= weight(c);
    if (roll <= 0) return c;
  }
  return pool[0];
}

function buildParcels(): { parcels: Parcel[]; ringByCaseId: Map<string, Ring> } {
  const parcels: Parcel[] = [];
  const ringByCaseId = new Map<string, Ring>();
  const usedCaseIds = new Set<string>();

  for (const { village, rings } of buildParcelRings(VILLAGE_FOOTPRINTS)) {
    const villageCases = casesForVillage(village.id);
    const surveyNumbers = VILLAGE_SURVEY_NUMBERS[village.name] ?? [];
    const rnd = mulberry32(hashString(`bind|${village.id}`));

    rings.forEach((ring, idx) => {
      const surveyNo = surveyNumbers[idx] ?? `${village.surveyStem}/${idx + 1}`;
      const isHero = village.name === "Perungalathur" && surveyNo === HERO_SURVEY_NO;

      const finalRing = isHero ? scaleRingToArea(ring, HERO_AREA_HA) : ring;
      const areaHa = Math.round(ringAreaHa(finalRing) * 100) / 100;

      // Pick a distinct case per drawn parcel so the layer never double-books.
      // The hero parcel is pinned to the hero case explicitly. It must NOT go
      // through the weighted picker — that picker would hand the hero case to
      // every plot in Perungalathur, collapsing seven polygons onto one record.
      let bound: CaseRecord;
      if (isHero) {
        bound = HERO_CASE;
      } else {
        bound = bindCase(villageCases, rnd);
        for (let guard = 0; usedCaseIds.has(bound.id) && guard < 60; guard += 1) {
          bound = bindCase(villageCases, mulberry32(hashString(`retry|${village.id}|${idx}|${guard}`)));
        }
      }
      usedCaseIds.add(bound.id);

      const parcel: Parcel = {
        id: isHero ? HERO_CASE.parcelId : bound.parcelId,
        surveyNo,
        villageId: village.id,
        village: village.name,
        taluk: village.taluk,
        district: village.district,
        ring: finalRing,
        centroid: ringCentroid(finalRing),
        areaHa,
        // The drawn plot carries the bound case's land classification so the
        // popup and the case page describe the same land.
        landClassification: isHero ? HERO_CASE.landClassification : bound.landClassification,
        landUse: isHero ? HERO_CASE.landUse : bound.landUse,
        caseId: isHero ? HERO_CASE.id : bound.id,
        mapped: true,
      };
      parcels.push(parcel);
      ringByCaseId.set(parcel.caseId, finalRing);
    });
  }

  return { parcels, ringByCaseId };
}

const built = buildParcels();

export const PARCELS: Parcel[] = built.parcels;
export const PARCEL_RINGS_BY_CASE: Map<string, Ring> = built.ringByCaseId;

export const PARCELS_BY_ID = new Map(PARCELS.map((p) => [p.id, p]));
export const PARCEL_BY_CASE = new Map(PARCELS.map((p) => [p.caseId, p]));

export function parcelForCase(caseId: string): Parcel | undefined {
  return PARCEL_BY_CASE.get(caseId);
}

export function parcelBySurvey(surveyNo: string): Parcel | undefined {
  const needle = surveyNo.trim().toLowerCase();
  return PARCELS.find((p) => p.surveyNo.toLowerCase() === needle);
}

export function villageById(villageId: string): VillageFootprint | undefined {
  return VILLAGE_BY_ID.get(villageId);
}

export const MAPPED_VILLAGE_COUNT = VILLAGE_FOOTPRINTS.length;

// ── Self-check ──────────────────────────────────────────────────────────
(function assertParcels() {
  const problems: string[] = [];

  if (PARCELS.length < 30 || PARCELS.length > 60) {
    problems.push(`expected 30–60 drawn parcels, got ${PARCELS.length}`);
  }

  const hero = PARCELS.find((p) => p.surveyNo === HERO_SURVEY_NO);
  if (!hero) problems.push(`hero parcel ${HERO_SURVEY_NO} is missing from the GIS layer`);
  else {
    if (Math.abs(hero.areaHa - HERO_AREA_HA) > 0.005) {
      problems.push(`hero parcel area drifted to ${hero.areaHa} ha, expected ${HERO_AREA_HA}`);
    }
    if (hero.caseId !== HERO_CASE.id) problems.push("hero parcel is not bound to the hero case");
  }

  // One case per drawn parcel — a polygon that opens a case shared with
  // another polygon would read as a bug to anyone clicking around.
  const caseIds = PARCELS.map((p) => p.caseId);
  if (new Set(caseIds).size !== caseIds.length) problems.push("two drawn parcels share the same case");

  // Every bound case must exist in the caseload.
  const caseSet = new Set(CASES.map((c) => c.id));
  for (const p of PARCELS) if (!caseSet.has(p.caseId)) problems.push(`parcel ${p.surveyNo} points at unknown case ${p.caseId}`);

  if (problems.length > 0) {
    throw new Error(`[Terranex] Parcel layer integrity — ${problems.join("; ")}`);
  }
})();
