// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Geography
// Real Chengalpattu District administrative structure (district, revenue
// divisions, taluks, villages) with a real WGS84 anchor, so the basemap
// lines up with plausible Tamil Nadu terrain.
//
// Village boundaries below are FABRICATED. The place names are real; the
// polygons are not. Survey numbers are invented.
//
// SYNTHETIC DEMO DATA. Not cadastral. Not a government record.
// ═══════════════════════════════════════════════════════════════════════

import type { District, LngLat, VillageFootprint, Ring } from "../lib/types";
import { hashString, subdivide, villageOutline, toLngLat } from "../lib/geo";

export const DISTRICT: District = {
  id: "tn-chengalpattu",
  name: "Chengalpattu",
  state: "Tamil Nadu",
  stateCode: "TN",
  // Frame centre for the district view. Sits over the agricultural belt west of
  // Chengalpattu town, which is what most of this district actually is.
  centre: [79.852, 12.822],
  taluks: [
    {
      id: "tl-tambaram",
      name: "Tambaram",
      division: "Tiruvallur Division",
      villages: ["Perungalathur", "Vandalur", "Mangadu", "Kattankulathur", "Nemi", "Thirumalai"],
    },
    {
      id: "tl-chengalpattu",
      name: "Chengalpattu",
      division: "Chengalpattu Division",
      villages: ["Kanchipuram", "Uthiramerur", "Vandallur", "Kayarambakkam", "Nedungur"],
    },
    {
      id: "tl-sriperumbudur",
      name: "Sriperumbudur",
      division: "Chengalpattu Division",
      villages: ["Sriperumbudur", "Mannivakkam", "Kundrathur", "Keelachi", "Ponneri"],
    },
    {
      id: "tl-guduvanchery",
      name: "Guduvanchery",
      division: "Chengalpattu Division",
      villages: ["Guduvanchery", "Thiruporur", "Melpakkam", "Kondalampatti", "Vandurani"],
    },
    {
      id: "tl-pallavaram",
      name: "Pallavaram",
      division: "Chengalpattu Division",
      villages: ["Pallavaram", "Kalapakkam", "Thiru Porur", "Kattabomman", "Iyyangar"],
    },
    {
      id: "tl-madurantakam",
      name: "Madurantakam",
      division: "Chengalpattu Division",
      villages: ["Madurantakam", "Kavithipakkam", "Mambakkam", "Ayyangar", "Kunnathur"],
    },
  ],
};

/** Lat/lon seeds for each mapped village. Approximate, on-district. */
/**
 * WGS86 seed per mapped village.
 *
 * Placed across the agricultural belt of Chengalpattu District rather than the
 * built-up eastern corridor. The seeds are approximate — the survey blocks drawn
 * around them are synthetic regardless — but anchoring them on real farmland
 * means the cadastral polygons sit on terrain that plausibly matches the land
 * classification the case record claims (dry agricultural, scrub, trees).
 */
const VILLAGE_SEEDS: Record<string, LngLat> = {
  Perungalathur: [79.848, 12.872],
  Vandalur: [79.868, 12.880],
  Mangadu: [79.836, 12.858],
  Kattankulathur: [79.858, 12.848],
  Mannivakkam: [79.880, 12.900],
  Sriperumbudur: [79.822, 12.836],
  Guduvanchery: [79.812, 12.800],
  Thiruporur: [79.832, 12.788],
  Kalapakkam: [79.868, 12.778],
  Pallavaram: [79.892, 12.812],
  Madurantakam: [79.856, 12.752],
  Kavithipakkam: [79.886, 12.760],
};

/**
 * Footprint size in metres, per village: [width, height].
 *
 * These are SURVEY BLOCKS, not whole-village extents — a block of six or
 * seven plots, which is the scale a surveyor actually draws. A whole-village
 * footprint would subdivide into 20–30 ha plots, which is not what an
 * Indian survey number looks like.
 */
const VILLAGE_SIZE: Record<string, [number, number]> = {
  Perungalathur: [390, 370],
  Vandalur: [350, 320],
  Mangadu: [280, 260],
  Kattankulathur: [240, 220],
  Sriperumbudur: [330, 310],
  Mannivakkam: [250, 230],
  Guduvanchery: [295, 275],
  Thiruporur: [240, 215],
  Pallavaram: [330, 300],
  Kalapakkam: [235, 220],
  Madurantakam: [295, 275],
  Kavithipakkam: [235, 220],
};

/**
 * Survey numbers drawn on the GIS layer, per village. Hand-listed so the
 * numbers read like a real patta register — and so the first Perungalathur
 * plot is exactly the 184/2A the walkthrough opens on.
 */
export const VILLAGE_SURVEY_NUMBERS: Record<string, string[]> = {
  Perungalathur: ["184/2A", "184/2B", "185/1", "187/3A", "192/4", "201/2B", "203/1"],
  Vandalur: ["92/1", "92/2", "94/3A", "95/1", "97/2B", "98/4"],
  Mangadu: ["61/1", "62/3A", "63/2", "64/1B"],
  Sriperumbudur: ["311/1", "312/2A", "313/4", "314/1", "316/2B"],
  Mannivakkam: ["208/1", "209/3", "210/2A"],
  Guduvanchery: ["76/2", "77/1A", "78/4", "79/2B"],
  Thiruporur: ["145/1", "146/3A", "147/2"],
  Pallavaram: ["402/1", "403/2A", "404/3B", "405/1", "407/2"],
  Kalapakkam: ["129/1", "130/2A", "131/3"],
  Madurantakam: ["266/1", "267/2B", "268/1A", "269/4"],
  Kavithipakkam: ["288/1", "289/3A", "290/2"],
  Kattankulathur: ["88/1", "89/2B", "90/3A"],
};

export const MAPPED_VILLAGE_NAMES = Object.keys(VILLAGE_SURVEY_NUMBERS);

/**
 * Build the GIS village footprints. Pure function of the seed table, so the
 * 40-odd parcels are byte-identical on every load and every judge's machine.
 */
export function buildVillageFootprints(): VillageFootprint[] {
  const out: VillageFootprint[] = [];

  for (const [villageName, seed] of Object.entries(VILLAGE_SEEDS)) {
    const taluk = DISTRICT.taluks.find((t) => t.villages.includes(villageName));
    if (!taluk) continue;

    const [w, h] = VILLAGE_SIZE[villageName] ?? [1100, 900];
    const s = hashString(`${villageName}|${taluk.id}`);
    const ring: Ring = villageOutline(seed, s, w, h, 9);
    // Same stem the caseload uses, so a drawn plot and a case row that
    // reference the same village agree on which survey block they sit in.
    const surveyStem = 100 + (hashString(villageName) % 260);

    out.push({
      id: `v-${villageName.toLowerCase().replace(/[^a-z]/g, "")}`,
      name: villageName,
      talukId: taluk.id,
      taluk: taluk.name,
      district: DISTRICT.name,
      centre: seed,
      ring,
      surveyStem,
    });
  }

  return out;
}

/** Subdivide every mapped village into its parcels. Returns [villageId, ring] pairs. */
export function buildParcelRings(
  footprints: VillageFootprint[],
): Array<{ village: VillageFootprint; rings: Ring[] }> {
  return footprints.map((village) => {
    const count = VILLAGE_SURVEY_NUMBERS[village.name]?.length ?? 6;
    const seed = hashString(`parcels|${village.id}`);
    return { village, rings: subdivide(village.ring, count, seed) };
  });
}

/** Convert a metre-space offset from the district anchor to WGS84. */
export function anchorPoint(eastM: number, northM: number): LngLat {
  return toLngLat(DISTRICT.centre, [eastM, northM]);
}
