// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · App shell
// Masthead, left navigation and the officer context strip. Desktop-first;
// the sidebar collapses to a drawer below lg.
// ═══════════════════════════════════════════════════════════════════════

import React from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Bell,
  Building2,
  ClipboardList,
  FileStack,
  Home,
  IndianRupee,
  LogOut,
  Map as MapIcon,
  Menu,
  RefreshCw,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DEMO_NOW_LABEL } from "../lib/types";
import { DISTRICT } from "../data/geography";
import { useLandAdmin, useNotificationFeed } from "../store/landAdminStore";
import { ConfirmDialog, DemoBanner, ToastHost } from "./ui";

export const NAV = [
  { to: "/land-admin", label: "Overview", icon: Home, end: true },
  { to: "/land-admin/cases", label: "Cases", icon: ClipboardList },
  { to: "/land-admin/gis", label: "GIS Parcel Map", icon: MapIcon },
  { to: "/land-admin/acquisition", label: "Land Acquisition", icon: Building2 },
  { to: "/land-admin/rnr", label: "R&R Management", icon: Users },
  { to: "/land-admin/compensation", label: "Compensation", icon: IndianRupee },
  { to: "/land-admin/documents", label: "Documents", icon: FileStack },
  { to: "/land-admin/analytics", label: "Reports & Analytics", icon: BarChart3 },
  { to: "/land-admin/notifications", label: "Notifications", icon: Bell },
  { to: "/land-admin/administration", label: "Administration", icon: Settings },
];

const OFFICE = "Chennai District";
const ROLE = "Revenue Officer";

export function LandAdminShell() {
  const [drawer, setDrawer] = React.useState(false);
  const loc = useLocation();
  const nav = useNavigate();

  const toasts = useLandAdmin((s) => s.toasts);
  const dismissToast = useLandAdmin((s) => s.dismissToast);
  const confirm = useLandAdmin((s) => s.confirm);
  const cancelConfirm = useLandAdmin((s) => s.cancelConfirm);
  const resetDemo = useLandAdmin((s) => s.resetDemo);
  const requestConfirm = useLandAdmin((s) => s.requestConfirm);

  // Close the mobile drawer whenever the route changes.
  React.useEffect(() => setDrawer(false), [loc.pathname]);

  const unread = useNotificationFeed().filter((n) => !n.isRead).length;

  const navList = (
    <nav className="flex flex-col gap-0.5" aria-label="Primary">
      {NAV.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2.5 border-l-[3px] px-3 py-2 text-[12.5px] transition-colors",
                isActive
                  ? "border-l-[#0F2340] bg-slate-100 font-semibold text-[#0F2340]"
                  : "border-l-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#0F2340]" : "text-slate-400")} aria-hidden />
                <span className="truncate">{item.label}</span>
                {item.to === "/land-admin/notifications" && unread > 0 && (
                  <span className="ml-auto rounded-full bg-red-700 px-1.5 py-px font-mono text-[10px] font-semibold text-white">{unread}</span>
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <DemoBanner stamp={DEMO_NOW_LABEL} />

      {/* ── Masthead ─────────────────────────────────────────────────── */}
      <header className="border-b border-slate-300 bg-white">
        <div className="gov-tricolor" aria-hidden />
        <div className="flex items-center gap-3 px-4 py-2.5">
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="-ml-1 border border-slate-300 p-1.5 text-slate-600 lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Link to="/land-admin" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center bg-[#0F2340] text-white">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-bold leading-tight tracking-tight text-[#0F2340]">Terranex</span>
              <span className="block truncate text-[10.5px] leading-tight text-slate-500">
                Land Acquisition &amp; Rehabilitation Management System
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden text-right md:block">
              <p className="text-[11px] font-semibold leading-tight text-slate-800">
                Office: {DISTRICT.name} · {OFFICE}
              </p>
              <p className="text-[10.5px] leading-tight text-slate-500">Role: {ROLE} · Revenue &amp; Land Acquisition</p>
            </div>

            <Link
              to="/land-admin/notifications"
              className="relative border border-slate-300 p-1.5 text-slate-600 hover:bg-slate-50"
              aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
            >
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-700 px-1 font-mono text-[9.5px] font-bold text-white">
                  {unread}
                </span>
              )}
            </Link>

            <div className="hidden items-center gap-2 border border-slate-300 px-2.5 py-1 sm:flex">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0F2340] font-mono text-[10px] font-bold text-white">MV</span>
              <span className="leading-tight">
                <span className="block text-[11.5px] font-semibold text-slate-800">M. Venkatesan</span>
                <span className="block font-mono text-[9.5px] text-slate-500">REV-TN-CBE-0142</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => requestConfirm({
                title: "Reset demo state?",
                body: "This clears the document decisions you have recorded and resets every notification to unread. The caseload itself is generated data and is not affected.",
                confirmLabel: "Reset demo",
                tone: "primary",
                onConfirm: () => {
                  resetDemo();
                  cancelConfirm();
                  nav("/land-admin");
                },
              })}
              className="hidden border border-slate-300 p-1.5 text-slate-500 hover:bg-slate-50 md:block"
              title="Reset demo state"
              aria-label="Reset demo state"
            >
              <RefreshCw className="h-4 w-4" />
            </button>

            <button
              type="button"
              disabled
              title="Sign-out is not part of this demo"
              className="hidden border border-slate-300 p-1.5 text-slate-300 md:block"
              aria-label="Sign out (not implemented in demo)"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* ── Desktop sidebar ─────────────────────────────────────────── */}
        <aside className="hidden w-[228px] shrink-0 border-r border-slate-300 bg-white lg:block">
          <div className="sticky top-0 py-3">{navList}</div>
          <div className="mx-3 mt-2 border-t border-slate-200 pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">District</p>
            <p className="mt-0.5 text-[12px] font-medium text-slate-700">{DISTRICT.name}</p>
            <p className="text-[10.5px] text-slate-500">{DISTRICT.state} · {DISTRICT.stateCode}</p>
            <p className="mt-2 font-mono text-[10px] text-slate-400">As on {DEMO_NOW_LABEL}</p>
          </div>
        </aside>

        {/* ── Mobile drawer ───────────────────────────────────────────── */}
        {drawer && (
          <div className="fixed inset-0 z-[1100] lg:hidden">
            <div className="absolute inset-0 bg-slate-900/40" onClick={() => setDrawer(false)} />
            <div className="absolute left-0 top-0 h-full w-[264px] border-r border-slate-300 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2.5">
                <span className="text-[13px] font-semibold text-[#0F2340]">Navigation</span>
                <button type="button" onClick={() => setDrawer(false)} aria-label="Close navigation" className="p-1 text-slate-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="py-2">{navList}</div>
            </div>
          </div>
        )}

        {/* ── Content ─────────────────────────────────────────────────── */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>

      <ToastHost toasts={toasts} onDismiss={dismissToast} />
      <ConfirmDialog
        open={confirm !== null}
        title={confirm?.title ?? ""}
        body={confirm?.body ?? ""}
        confirmLabel={confirm?.confirmLabel ?? "Confirm"}
        tone={confirm?.tone ?? "primary"}
        onConfirm={() => {
          confirm?.onConfirm();
        }}
        onCancel={cancelConfirm}
      />
    </div>
  );
}
