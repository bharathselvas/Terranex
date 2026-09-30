import { CircleMarker, Marker, Polygon, Polyline, Tooltip } from "react-leaflet";
import L from "leaflet";
import { toLatLngs } from "./MapPrimitives";
import type {
  AdministrativeBoundaryShape,
  InfrastructureLine,
  Position,
  ProjectBoundaryShape,
  SettlementPoint,
} from "./types";

const PROJECT_BOUNDARY_STYLE: L.PathOptions = {
  color: "#1A3560",
  weight: 2,
  opacity: 0.9,
  dashArray: "10 5",
  fill: false,
};

const ADMIN_BOUNDARY_STYLE: L.PathOptions = {
  color: "#64748b",
  weight: 1.25,
  opacity: 0.75,
  dashArray: "2 4",
  fill: true,
  fillColor: "#94A3B8",
  fillOpacity: 0.05,
};

const LINE_STYLES: Record<InfrastructureLine["kind"], L.PathOptions> = {
  // The acquisition alignment itself: white casing under a dark core, the
  // standard way a proposed road is drawn over an existing basemap.
  alignment: { color: "#0F2340", weight: 4, opacity: 0.95 },
  highway: { color: "#B45309", weight: 2.4, opacity: 0.9 },
  access: { color: "#5B7FB8", weight: 1.6, opacity: 0.85, dashArray: "6 3" },
  canal: { color: "#0E7490", weight: 1.6, opacity: 0.85 },
};

/** Outer acquisition limit for the package, with corner handles. */
export function ProjectBoundaryLayer({ shape }: { shape: ProjectBoundaryShape }) {
  const positions = toLatLngs(shape.geometry.coordinates);
  const handles = shape.geometry.coordinates.filter((_, i) => i % 8 === 0);

  return (
    <>
      <Polygon positions={positions} pathOptions={PROJECT_BOUNDARY_STYLE} interactive={false} />
      {handles.map((h, i) => (
        <CircleMarker
          key={`${shape.id}-h${i}`}
          center={toLatLngs([h])[0]}
          radius={3}
          pathOptions={{ color: "#1A3560", weight: 1.2, fillColor: "#FFFFFF", fillOpacity: 1 }}
          interactive={false}
        />
      ))}
    </>
  );
}

/** Coarser administrative extent drawn under the project limit. */
export function AdministrativeBoundaryLayer({ shape }: { shape: AdministrativeBoundaryShape }) {
  return (
    <Polygon
      positions={toLatLngs(shape.geometry.coordinates)}
      pathOptions={ADMIN_BOUNDARY_STYLE}
      interactive={false}
    />
  );
}

export function InfrastructureLayer({ lines }: { lines: InfrastructureLine[] }) {
  return (
    <>
      {lines.map((line) =>
        line.kind === "alignment" ? (
          <Polyline
            key={line.id}
            positions={toLatLngs(line.geometry.coordinates)}
            pathOptions={{ color: "#FFFFFF", weight: 8, opacity: 0.9 }}
            interactive={false}
          />
        ) : null,
      )}
      {lines.map((line) => (
        <Polyline
          key={line.id}
          positions={toLatLngs(line.geometry.coordinates)}
          pathOptions={LINE_STYLES[line.kind]}
        >
          <Tooltip sticky direction="top" opacity={1} className="trx-tip">
            <span className="text-[11px] font-medium">{line.name}</span>
          </Tooltip>
        </Polyline>
      ))}
    </>
  );
}

function settlementIcon(kind: SettlementPoint["kind"]) {
  const size = kind === "village" ? 12 : 9;
  return L.divIcon({
    className: "terranex-settlement",
    html: `<span class="trx-settlement trx-settlement--${kind}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export function SettlementLayer({ points }: { points: SettlementPoint[] }) {
  return (
    <>
      {points.map((p) => (
        <Marker
          key={p.id}
          position={toLatLngs([p.position])[0]}
          interactive={false}
          keyboard={false}
          icon={settlementIcon(p.kind)}
          zIndexOffset={300}
        />
      ))}
    </>
  );
}

/** Turns a ring or line into a Leaflet-friendly extent. */
export function extentOf(positions: Position[]): L.LatLngBounds {
  return L.latLngBounds(positions.map(([lng, lat]) => L.latLng(lat, lng)));
}
