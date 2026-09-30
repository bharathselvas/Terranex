// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Geometry
// -----------------------------------------------------------------------
// Everything here is hand-rolled and deterministic. There is no Turf, no
// JSTS, no server. Three things matter here:
//
//  1. `areaHa` is DERIVED from the drawn ring via shoelace, so the polygon a
//     judge sees and the area printed in the table can never disagree.
//  2. Parcels are produced by recursively SLICING a village footprint, so
//     neighbours share cut edges exactly — the way a real cadastral sheet
//     works, instead of a scatter of independent rectangles.
//  3. Edge wobble is keyed on the edge's two endpoints, so both neighbours
//     compute an identical midpoint and the shared boundary stays welded.
//
// A fixed anchor sits in real Chengalpattu District, Tamil Nadu so the
// OpenStreetMap / Esri basemap lines up with plausible terrain. Every parcel
// boundary inside it is fabricated.
//
// SYNTHETIC DEMO DATA. Not cadastral. Not a government record.
// ═══════════════════════════════════════════════════════════════════════

import type { LngLat, Ring } from "./types";

const M_PER_DEG_LAT = 110574;
const M_PER_DEG_LNG = 111320 * Math.cos((12.88 * Math.PI) / 180);

/** Deterministic PRNG. Same seed → same district, every reload, every judge. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Stable string hash — used to key edge wobble and village variation. */
export function hashString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

export type Local = [number, number]; // [easting_m, northing_m]

/** Metres east/north of the district anchor → WGS84 [lng, lat]. */
export function toLngLat(origin: LngLat, p: Local): LngLat {
  return [origin[0] + p[0] / M_PER_DEG_LNG, origin[1] + p[1] / M_PER_DEG_LAT];
}

/**
 * Project a WGS84 ring onto a local east/north metre plane.
 *
 * Shoelace on raw degree coordinates silently returns ~0.0002 for a real
 * parcel, because a degree is ~111 km, not a metre. Every area and length in
 * this module goes through here first. Equirectangular about a reference
 * latitude is exact to well under a percent at village scale (< 2 km), which
 * is the only scale this app operates at.
 */
function toMetres(ring: Ring, refLat: number): Local[] {
  const mPerDegLat = 110574;
  const mPerDegLng = 111320 * Math.cos((refLat * Math.PI) / 180);
  return ring.map(([lng, lat]) => [(lng - ring[0][0]) * mPerDegLng, (lat - refLat) * mPerDegLat] as Local);
}

/** Shoelace area in m². Sign-corrected; ring need not be explicitly closed. */
export function ringAreaSqm(ring: Ring): number {
  if (ring.length < 3) return 0;
  const refLat = ring[0][1];
  const pts = toMetres(ring, refLat);
  let sum = 0;
  for (let i = 0; i < pts.length; i += 1) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    sum += x1 * y2 - x2 * y1;
  }
  return Math.abs(sum) / 2;
}

export function ringAreaHa(ring: Ring): number {
  return ringAreaSqm(ring) / 10_000;
}

/** Area-weighted polygon centroid with a vertex-average fallback. */
export function ringCentroid(ring: Ring): LngLat {
  if (ring.length < 3) {
    const n = ring.length || 1;
    return [ring.reduce((s, p) => s + p[0], 0) / n, ring.reduce((s, p) => s + p[1], 0) / n];
  }
  const refLat = ring[0][1];
  const pts = toMetres(ring, refLat);
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < pts.length; i += 1) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    const cross = x1 * y2 - x2 * y1;
    a += cross;
    cx += (x1 + x2) * cross;
    cy += (y1 + y2) * cross;
  }
  if (Math.abs(a) < 1e-9) {
    const n = ring.length;
    return [ring.reduce((s, p) => s + p[0], 0) / n, ring.reduce((s, p) => s + p[1], 0) / n];
  }
  // Back to lng/lat, anchoring on the same reference the projection used.
  const mPerDegLat = 110574;
  const mPerDegLng = 111320 * Math.cos((refLat * Math.PI) / 180);
  return [ring[0][0] + cx / (3 * a) / mPerDegLng, refLat + cy / (3 * a) / mPerDegLat];
}

export function ringBounds(ring: Ring): [LngLat, LngLat] {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of ring) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return [
    [minX, minY],
    [maxX, maxY],
  ];
}

export function ringPerimeterM(ring: Ring): number {
  let total = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    total += Math.hypot(x2 - x1, y2 - y1) * 111320 * Math.cos((y1 * Math.PI) / 180);
  }
  return total;
}

// ── Cadastral subdivision ───────────────────────────────────────────────

/** Cumulative arc length around a ring, used to pick sensible cut points. */
function ringParam(ring: Ring): number[] {
  const out = [0];
  let acc = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    acc += Math.hypot(x2 - x1, y2 - y1);
    out.push(acc);
  }
  return out;
}

/**
 * Insert a deterministic midpoint wobble into one edge.
 *
 * Keyed on the edge's UNORDERED endpoints, so the parcel on the other side of
 * that boundary computes a bit-identical midpoint. Without this, neighbours
 * would separate by a hairline after wobbling and the layer would look like
 * overlapping rectangles instead of a welded cadastral sheet.
 */
function wobbleEdge(a: LngLat, b: LngLat, amp: number): Ring {
  const key =
    a[0] < b[0] || (a[0] === b[0] && a[1] < b[1])
      ? `${a[0].toFixed(7)},${a[1].toFixed(7)}|${b[0].toFixed(7)},${b[1].toFixed(7)}`
      : `${b[0].toFixed(7)},${b[1].toFixed(7)}|${a[0].toFixed(7)},${a[1].toFixed(7)}`;
  const rnd = mulberry32(hashString(key));
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  // Perpendicular offset, scaled to the edge length so short edges stay plausible.
  const off = ((rnd() - 0.5) * 2 * amp * len) / 111320;
  return [
    a,
    [(a[0] + b[0]) / 2 - (dy / len) * off, (a[1] + b[1]) / 2 + (dx / len) * off],
    b,
  ];
}

function applyWobble(ring: Ring, amp: number): Ring {
  const out: Ring = [];
  for (let i = 0; i < ring.length; i += 1) {
    out.push(...wobbleEdge(ring[i], ring[(i + 1) % ring.length], amp));
  }
  return out;
}

/**
 * Slice a ring with a chord between two boundary points, returning both halves.
 * The cut edge is shared verbatim, so the two children stay topologically welded.
 */
function sliceRing(ring: Ring, fracA: number, fracB: number): [Ring, Ring] {
  const n = ring.length;
  const param = ringParam(ring);
  const total = param[n] || 1;
  const distA = total * fracA;
  const distB = total * fracB;

  const locate = (dist: number) => {
    let d = dist;
    while (d >= total) d -= total;
    while (d < 0) d += total;
    for (let i = 0; i < n; i += 1) {
      if (d <= param[i + 1] || i === n - 1) {
        const segLen = param[i + 1] - param[i] || 1;
        const t = (d - param[i]) / segLen;
        const a = ring[i];
        const b = ring[(i + 1) % n];
        return {
          index: i,
          point: [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t] as LngLat,
        };
      }
    }
    return { index: 0, point: ring[0] };
  };

  const A = locate(distA);
  const B = locate(distB);
  if (A.index === B.index) {
    // Both cuts land on the same edge — bail out rather than emit a sliver.
    return [[...ring], []];
  }

  // Chain from A (exclusive) round to B (inclusive).
  const forward: Ring = [];
  for (let i = A.index + 1; i <= B.index; i += 1) forward.push(ring[i % n]);
  forward.push(B.point, A.point);

  // Chain from B (exclusive) all the way round and back to A (inclusive).
  // The `+ n` is the wrap — without it this chain comes back empty and the
  // subdivision silently never fires.
  const backward: Ring = [];
  for (let i = B.index + 1; i <= A.index + n; i += 1) backward.push(ring[i % n]);
  backward.push(A.point, B.point);

  return [forward, backward];
}

/**
 * Slice a ring as close to half-and-half as a single chord allows.
 *
 * A fixed random chord takes a wildly unequal bite — earlier this produced
 * villages subdividing into 32 ha, 9 ha and 2.6 ha plots, and then a floor on
 * minimum plot size starved the subdivision entirely. Binary-searching the
 * chord width against the ring's own area converges on a balanced split, so
 * repeated halving gives plots of comparable size, which is what a survey
 * register actually looks like.
 */
function balancedSlice(ring: Ring, rnd: () => number): [Ring, Ring] {
  const total = ringAreaSqm(ring);
  if (total <= 0) return [[...ring], []];
  const start = 0.05 + rnd() * 0.4;
  let lo = 0.01;
  let hi = 0.48;
  let best: [Ring, Ring] | null = null;

  for (let i = 0; i < 20; i += 1) {
    const width = (lo + hi) / 2;
    const [a, b] = sliceRing(ring, start, start + width);
    if (a.length < 3 || b.length < 3) {
      hi = width;
      continue;
    }
    if (ringAreaSqm(a) <= total / 2) {
      best = [a, b];
      lo = width;
    } else {
      hi = width;
    }
  }
  return best ?? [[...ring], []];
}

/** Minimum drawn plot, m². Below this a shape is a sliver, not a survey number. */
const MIN_PLOT_SQM = 2_600;
/** Stop subdividing once the largest remaining part is this small, m². */
const MIN_SPLIT_SQM = 5_200;

/**
 * Recursively bisect a footprint until roughly `target` plots exist.
 * Always splits the largest remaining polygon so sizes stay comparable.
 */
export function subdivide(footprint: Ring, target: number, seed: number): Ring[] {
  const rnd = mulberry32(seed);
  let parts: Ring[] = [footprint];
  let guard = 0;

  while (parts.length < target && guard < target * 40) {
    guard += 1;
    let biggest = 0;
    let biggestArea = -1;
    for (let i = 0; i < parts.length; i += 1) {
      const a = ringAreaSqm(parts[i]);
      if (a > biggestArea) {
        biggestArea = a;
        biggest = i;
      }
    }
    if (biggestArea < MIN_SPLIT_SQM) break;

    const [a, b] = balancedSlice(parts[biggest], rnd);
    if (a.length < 3 || b.length < 3) break;
    const areaA = ringAreaSqm(a);
    const areaB = ringAreaSqm(b);
    if (areaA < MIN_PLOT_SQM || areaB < MIN_PLOT_SQM) break;

    parts = [...parts.slice(0, biggest), a, b, ...parts.slice(biggest + 1)];
  }

  // Amplitude is a fraction of each edge length, so short edges stay plausible.
  // 4% keeps neighbours welded without pushing vertices through the block outline.
  return parts.map((r) => applyWobble(r, 0.04));
}

/** Build an irregular outer boundary for a village footprint. */
export function villageOutline(
  origin: LngLat,
  seed: number,
  widthM: number,
  heightM: number,
  sides = 9,
): Ring {
  const rnd = mulberry32(seed);
  const pts: Local[] = [];
  for (let i = 0; i < sides; i += 1) {
    // Walk an ellipse so the footprint is convex-ish, then push each vertex
    // in or out to break the symmetry.
    const theta = (i / sides) * Math.PI * 2;
    const radial = 0.78 + rnd() * 0.36;
    pts.push([
      Math.cos(theta) * (widthM / 2) * radial,
      Math.sin(theta) * (heightM / 2) * radial,
    ]);
  }
  return pts.map((p) => toLngLat(origin, p));
}

/**
 * Push a ring outward about its centroid by `metres`.
 * Scales the offset per-axis by the local metres-per-degree so the halo keeps
 * the footprint's real-world proportions instead of shearing.
 */
export function expandRing(ring: Ring, metres: number): Ring {
  const [cLng, cLat] = ringCentroid(ring);
  const mPerDegLng = 111320 * Math.cos((cLat * Math.PI) / 180);
  return ring.map(([lng, lat]) => {
    const east = (lng - cLng) * mPerDegLng;
    const north = (lat - cLat) * 110574;
    // Both operands MUST be metres. Mixing km here scales a 300 m village ring
    // out to ~80 km and the block outline swallows the district.
    const len = Math.hypot(east, north) || 1;
    const k = (len + metres) / len;
    return [cLng + (east * k) / mPerDegLng, cLat + (north * k) / 110574] as LngLat;
  });
}

/** True when the point sits inside the ring (even-odd ray cast). */
export function pointInRing(pt: LngLat, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const intersects = yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

/**
 * GeoJSON [lng, lat] ring → the [lat, lng] tuples react-leaflet expects.
 *
 * Leaflet and GeoJSON disagree on axis order. Passing a stored ring straight
 * to `<Polygon positions>` puts every vertex in the wrong hemisphere — the
 * polygon silently collapses to a zero-size path with `d="M0 0"` and no error.
 * Every ring handed to Leaflet must come through here.
 */
export function toLatLngs(ring: Ring): Array<[number, number]> {
  return ring.map(([lng, lat]) => [lat, lng]);
}

/** Geodesic-ish distance in metres. */
export function distanceM(a: LngLat, b: LngLat): number {
  const dx = (b[0] - a[0]) * M_PER_DEG_LNG;
  const dy = (b[1] - a[1]) * M_PER_DEG_LAT;
  return Math.hypot(dx, dy);
}
