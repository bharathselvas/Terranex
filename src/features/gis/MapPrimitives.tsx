import { useCallback, useEffect, useRef } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { Position } from "./types";

/** Convert RFC 7946 `[lng, lat]` positions to Leaflet `[lat, lng]` tuples. */
export function toLatLngs(positions: Position[]): L.LatLngExpression[] {
  return positions.map(([lng, lat]) => [lat, lng] as L.LatLngExpression);
}

/**
 * Imperative map commands, driven from React state.
 *
 * This replaces the previous implementation, which called `map.fitBounds()`
 * directly in the render body of a child component. That ran the side effect on
 * every re-render of the parent (and twice under `React.StrictMode`), and a
 * raw `<button>` was illegally nested inside `<MapContainer>`. Commands are now
 * queued as state by the parent and applied inside `useEffect`.
 */
/** A map instruction, as issued by the page. */
export type MapCommandSpec =
  | { kind: "fitAll" }
  | { kind: "fitParcels"; positions: Position[] }
  | { kind: "focusParcel"; position: Position; zoom: number; insetRight?: number }
  | { kind: "reset" };

/**
 * A map instruction tagged with a monotonically increasing token, so the parent
 * can re-issue an instruction that is value-equal to the previous one.
 */
export type MapCommand =
  | { kind: "fitAll"; token: number }
  | { kind: "fitParcels"; positions: Position[]; token: number }
  | { kind: "focusParcel"; position: Position; zoom: number; token: number; insetRight?: number }
  | { kind: "reset"; token: number };

type MapControllerProps = {
  command: MapCommand;
  /** When false the command is ignored, e.g. while no parcels are in view. */
  enabled?: boolean;
};

/**
 * Applies a single {@link MapCommand}. The parent bumps `command.token` to
 * request a fresh run even when the rest of the command is value-equal.
 */
export function MapController({ command, enabled = true }: MapControllerProps) {
  const map = useMap();
  const token = command.token;

  useEffect(() => {
    if (!enabled) return;

    switch (command.kind) {
      case "reset":
        map.closePopup();
        return;

      case "fitAll": {
        if (!map.getBounds().isValid()) return;
        map.fitBounds(map.getBounds(), { padding: [28, 28], maxZoom: 16, animate: true });
        return;
      }

      case "fitParcels": {
        // Thin dense rings — one vertex every third parcel is plenty to frame.
        const sampled = command.positions.filter((_, i) => i % 3 === 0);
        if (sampled.length === 0) return;
        const bounds = L.latLngBounds(sampled.map(([lng, lat]) => L.latLng(lat, lng)));
        if (!bounds.isValid()) return;
        map.fitBounds(bounds, { padding: [32, 32], maxZoom: 16, animate: true });
        return;
      }

      case "focusParcel": {
        const [lng, lat] = command.position;
        map.closePopup();
        map.flyTo(L.latLng(lat, lng), command.zoom, { duration: 0.7, easeLinearity: 0.25 });
        const inset = command.insetRight ?? 0;
        if (inset > 0) {
          // Leaflet has no flyTo offset, so recentre once the flight settles.
          // This keeps the selected parcel clear of the docked detail panel.
          map.once("moveend", () => map.panBy([inset / 2, 0], { animate: false }));
        }
        return;
      }
    }
    // `command` identity is owned by the parent via `token`.
  }, [token, enabled, map]);

  return null;
}

type ZoomWatcherProps = {
  /** Labels are shown at or above this zoom level. */
  threshold: number;
  onCross: (zoom: number, above: boolean) => void;
};

/**
 * Reports a single boolean derived from the map's zoom level.
 *
 * Deliberately does NOT store the raw zoom in React state. Tracking every
 * `zoomend` would re-render all 200+ parcel paths on each wheel tick; the label
 * layer only needs to know which side of a threshold we are on.
 */
export function ZoomWatcher({ threshold, onCross }: ZoomWatcherProps) {
  const map = useMap();
  const lastAbove = useRef<boolean | null>(null);
  const handler = useRef(onCross);
  handler.current = onCross;

  const evaluate = useCallback(() => {
    const zoom = map.getZoom();
    const above = zoom >= threshold;
    if (above !== lastAbove.current) {
      lastAbove.current = above;
      handler.current(zoom, above);
    }
  }, [map, threshold]);

  useMapEvents({ zoomend: evaluate, moveend: evaluate });

  useEffect(() => {
    evaluate();
  }, [evaluate]);

  return null;
}

/**
 * Metric scale bar — makes the canvas read as a measuring instrument rather
 * than a picture, which matters when the layer beneath is real survey imagery.
 */
export function ScaleBar() {
  const map = useMap();
  useEffect(() => {
    const control = L.control.scale({
      position: "bottomleft",
      metric: true,
      imperial: false,
      maxWidth: 120,
    });
    control.addTo(map);
    return () => {
      control.remove();
    };
  }, [map]);
  return null;
}
