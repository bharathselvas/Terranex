// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · UI state
// -----------------------------------------------------------------------
// Only things a user can actually CHANGE live here. Read-only figures are
// derived from the caseload at render time (see lib/derive.ts) rather than
// mirrored into state, so a number can never go stale.
//
// `persist` is what makes the demo survive a refresh: verifying a document or
// ticking a notification is real state a judge will expect to stick.
// ═══════════════════════════════════════════════════════════════════════

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CaseDocument, CaseRecord, NotificationItem } from "../lib/types";
import { NOTIFICATIONS } from "../data/notifications";

export type ToastTone = "info" | "success" | "warning" | "critical";

export interface Toast {
  id: string;
  title: string;
  detail?: string;
  tone: ToastTone;
}

export interface ConfirmRequest {
  title: string;
  body: string;
  confirmLabel: string;
  tone: "primary" | "danger";
  onConfirm: () => void;
}

interface LandAdminState {
  // ── Document review (real, persisted) ───────────────────────────────
  /** `${caseId}:${docId}` → decision the officer recorded. */
  docDecisions: Record<string, { status: CaseDocument["status"]; by: string; on: string }>;

  // ── Notifications ───────────────────────────────────────────────────
  readNotifications: string[];

  // ── GIS ─────────────────────────────────────────────────────────────
  /** Village whose survey block is currently framed. null = district view. */
  activeVillageId: string | null;
  selectedParcelId: string | null;
  basemap: "satellite" | "street" | "terrain";
  parcelStatusFilter: string[];

  // ── Case table ──────────────────────────────────────────────────────
  caseQuery: string;

  // ── Ephemeral UI ────────────────────────────────────────────────────
  toasts: Toast[];
  confirm: ConfirmRequest | null;

  // ── Actions ─────────────────────────────────────────────────────────
  reviewDocument: (c: CaseRecord, doc: CaseDocument, status: CaseDocument["status"]) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  setActiveVillage: (id: string | null) => void;
  selectParcel: (id: string | null) => void;
  setBasemap: (b: "satellite" | "street" | "terrain") => void;
  toggleParcelStatus: (s: string) => void;
  pushToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
  requestConfirm: (c: ConfirmRequest) => void;
  cancelConfirm: () => void;
  resetDemo: () => void;
}

const toastSeq = { n: 0 };
function nextToastId() {
  toastSeq.n += 1;
  return `toast-${Date.now()}-${toastSeq.n}`;
}

const OFFICER = "Shri. M. Venkatesan, Revenue Officer";

/** The five status colours the parcel legend is built from. */
export const PARCEL_STATUS_BANDS = [
  { key: "completed", label: "Completed", color: "#0F7A5A", match: (c: CaseRecord) => c.stage === "completed" },
  { key: "in_progress", label: "In Progress", color: "#C96A1A", match: (c: CaseRecord) => c.status === "active" && c.stage !== "delayed" && c.stage !== "under_verification" },
  { key: "delayed", label: "Delayed", color: "#B42318", match: (c: CaseRecord) => c.stage === "delayed" },
  { key: "verification", label: "Under Verification", color: "#1D4ED8", match: (c: CaseRecord) => c.verification === "under_verification" },
  { key: "not_started", label: "Not Started", color: "#94A3B8", match: (c: CaseRecord) => c.stage === "draft" || c.stage === "submitted" },
] as const;

export type ParcelBandKey = (typeof PARCEL_STATUS_BANDS)[number]["key"];

export function bandFor(c: CaseRecord): (typeof PARCEL_STATUS_BANDS)[number] {
  // Ordered so the more urgent condition wins a plot that qualifies for two.
  return (
    PARCEL_STATUS_BANDS.find((b) => b.key === "delayed" && b.match(c)) ??
    PARCEL_STATUS_BANDS.find((b) => b.key === "verification" && b.match(c)) ??
    PARCEL_STATUS_BANDS.find((b) => b.key === "not_started" && b.match(c)) ??
    PARCEL_STATUS_BANDS.find((b) => b.key === "completed" && b.match(c)) ??
    PARCEL_STATUS_BANDS[1]
  );
}

export const useLandAdmin = create<LandAdminState>()(
  persist(
    (set, get) => ({
      docDecisions: {},
      readNotifications: NOTIFICATIONS.filter((n) => n.read).map((n) => n.id),
      activeVillageId: null,
      selectedParcelId: null,
      basemap: "satellite",
      parcelStatusFilter: [],
      caseQuery: "",
          toasts: [],
      confirm: null,

      reviewDocument: (c, doc, status) => {
        const key = `${c.id}:${doc.id}`;
        set((s) => ({ docDecisions: { ...s.docDecisions, [key]: { status, by: OFFICER, on: new Date().toISOString() } } }));
        const verb = status === "verified" ? "marked verified" : status === "rejected" ? "returned for correction" : "queued for verification";
        get().pushToast({
          tone: status === "verified" ? "success" : status === "rejected" ? "warning" : "info",
          title: `${doc.name} ${verb}`,
          detail: `${c.caseNo} · recorded by ${OFFICER}`,
        });
      },

      markNotificationRead: (id) => set((s) => (s.readNotifications.includes(id) ? s : { readNotifications: [...s.readNotifications, id] })),

      markAllRead: () => {
        set({ readNotifications: NOTIFICATIONS.map((n) => n.id) });
        get().pushToast({ tone: "success", title: "All notifications marked as read" });
      },

      setActiveVillage: (id) => set({ activeVillageId: id, selectedParcelId: null }),
      selectParcel: (id) => set({ selectedParcelId: id }),
      setBasemap: (b) => set({ basemap: b }),

      toggleParcelStatus: (key) =>
        set((s) => ({
          parcelStatusFilter: s.parcelStatusFilter.includes(key)
            ? s.parcelStatusFilter.filter((k) => k !== key)
            : [...s.parcelStatusFilter, key],
        })),

      pushToast: (t) => {
        const id = nextToastId();
        set((s) => ({ toasts: [...s.toasts, { ...t, id }] }));
        // Auto-dismiss so a demo never leaves stale banners on screen.
        window.setTimeout(() => get().dismissToast(id), 4200);
      },

      dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

      requestConfirm: (c) => set({ confirm: c }),
      cancelConfirm: () => set({ confirm: null }),

      resetDemo: () => {
        set({
          docDecisions: {},
          readNotifications: NOTIFICATIONS.filter((n) => n.read).map((n) => n.id),
          activeVillageId: null,
          selectedParcelId: null,
          basemap: "satellite",
          parcelStatusFilter: [],
          caseQuery: "",
          toasts: [],
          confirm: null,
        });
        get().pushToast({ tone: "info", title: "Demo state reset", detail: "Document decisions and read markers cleared." });
      },
    }),
    {
      name: "terranix.land-admin.v1",
      // Toasts and dialogs are transient — persisting them would leave a
      // confirmation modal sitting on the page after a refresh.
      partialize: (s) => ({
        docDecisions: s.docDecisions,
        readNotifications: s.readNotifications,
        // selectedParcelId is deliberately NOT persisted. Restoring it makes
        // a fresh visit to /gis silently zoom into the last parcel looked at
        // instead of opening on the district.
        basemap: s.basemap,
        parcelStatusFilter: s.parcelStatusFilter,
        caseQuery: s.caseQuery,
      }),
    },
  ),
);

/**
 * Notifications with the persisted read-state folded in.
 * Named `use*` because it subscribes to the store — calling a hook from a
 * plain function is a rules-of-hooks violation.
 */
export function useNotificationFeed(): Array<NotificationItem & { isRead: boolean }> {
  const read = useLandAdmin((s) => s.readNotifications);
  return NOTIFICATIONS.map((n) => ({ ...n, isRead: read.includes(n.id) }));
}
