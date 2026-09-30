import { memo, useState } from "react";
import { Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import { toLatLngs } from "./MapPrimitives";
import {
  ACQUISITION_STATUS_COLOR,
  ACQUISITION_STATUS_LABEL,
  type GeoParcel,
  type Position,
} from "./types";

const NEUTRAL_FILL = "#64748b";
const SELECTED_STROKE = "#0F2340";
const BLOCKED_STROKE = "#B42318";
const CONTEXT_FILL_OPACITY = 0.1;

/**
 * Label tone is driven entirely by the `trx-label--<emphasis>` modifier class in
 * `index.css`, so the icon only needs to carry the emphasis and the text.
 */
function labelIcon(surveyNumber: string, emphasis: "none" | "hero" | "selected" | "blocked") {
  return L.divIcon({
    className: "terranex-parcel-label",
    html: `<span class="trx-label trx-label--${emphasis}">${surveyNumber}</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

function pathStyle(p: GeoParcel, opts: {
  selected: boolean;
  hovered: boolean;
  acquisitionStatus: boolean;
  blocked: boolean;
}): L.PathOptions {
  const isBlocked = p.acquisitionStatus === "blocked";
  const palette = ACQUISITION_STATUS_COLOR[p.acquisitionStatus];

  const base: L.PathOptions = {
    fillColor: opts.acquisitionStatus ? palette.fill : NEUTRAL_FILL,
    fillOpacity: opts.acquisitionStatus ? (isBlocked ? 0.52 : 0.34) : CONTEXT_FILL_OPACITY,
    color: opts.selected ? SELECTED_STROKE : opts.blocked && isBlocked ? BLOCKED_STROKE : palette.stroke,
    weight: opts.selected ? 2.6 : isBlocked && opts.blocked ? 2.2 : 0.7,
    opacity: opts.selected || opts.hovered ? 1 : 0.85,
    lineJoin: "round",
  };

  if (isBlocked && !opts.selected) {
    base.dashArray = "4 2.5";
  }
  if (opts.hovered && !opts.selected) {
    base.weight = 2;
    base.fillOpacity = (opts.acquisitionStatus ? 0.52 : 0.2) + 0.16;
  }
  return base;
}

type ParcelShapeProps = {
  parcel: GeoParcel;
  selected: boolean;
  labelled: boolean;
  acquisitionStatus: boolean;
  blocked: boolean;
  onSelect: (parcel: GeoParcel) => void;
};

const ParcelShape = memo(function ParcelShape({
  parcel,
  selected,
  labelled,
  acquisitionStatus,
  blocked,
  onSelect,
}: ParcelShapeProps) {
  const [hovered, setHovered] = useState(false);
  const positions = toLatLngs(parcel.geometry.coordinates);

  const emphasis: "none" | "hero" | "selected" | "blocked" = selected
    ? "selected"
    : parcel.blocker
      ? "blocked"
      : "hero";

  return (
    <>
      <Polygon
        positions={positions}
        pathOptions={pathStyle(parcel, { selected, hovered, acquisitionStatus, blocked })}
        eventHandlers={{
          click: () => onSelect(parcel),
          mouseover: () => setHovered(true),
          mouseout: () => setHovered(false),
        }}
      />
      {labelled && (
        <Marker
          position={toLatLngs([parcel.centroid])[0]}
          interactive={false}
          keyboard={false}
          icon={labelIcon(parcel.surveyNumber, emphasis)}
          zIndexOffset={selected ? 900 : 400}
        />
      )}
    </>
  );
});

type ParcelLayerProps = {
  parcels: GeoParcel[];
  selectedId: string | null;
  /** Ids that should always show a label regardless of zoom. */
  pinnedLabelIds: ReadonlySet<string>;
  /** When true every visible parcel is labelled (high zoom). */
  labelAll: boolean;
  acquisitionStatusLayer: boolean;
  blockedLayer: boolean;
  onSelect: (parcel: GeoParcel) => void;
};

export function ParcelLayer({
  parcels,
  selectedId,
  pinnedLabelIds,
  labelAll,
  acquisitionStatusLayer,
  blockedLayer,
  onSelect,
}: ParcelLayerProps) {
  return (
    <>
      {parcels.map((p) => (
        <ParcelShape
          key={p.id}
          parcel={p}
          selected={p.id === selectedId}
          labelled={labelAll || p.blocker !== null || pinnedLabelIds.has(p.id)}
          acquisitionStatus={acquisitionStatusLayer}
          blocked={blockedLayer}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

export function parcelBounds(parcels: GeoParcel[]): Position[] {
  return parcels.map((p) => p.centroid);
}

export { ACQUISITION_STATUS_LABEL };
