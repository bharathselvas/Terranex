// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Notifications
// Built from the caseload rather than a hand-written list, so every alert
// names a case that exists and links to a case page that shows the same
// stage and amount.
// ═══════════════════════════════════════════════════════════════════════

import React from "react";
import { Link } from "react-router-dom";
import { AlertOctagon, AlertTriangle, Bell, CheckCheck, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { findCaseById, num, relativeFrom } from "../data";
import { DEMO_NOW, DEMO_NOW_LABEL } from "../lib/types";
import { EmptyState, KpiCard, Panel } from "../components/ui";
import { useLandAdmin, useNotificationFeed } from "../store/landAdminStore";

const TONE = {
  critical: { Icon: AlertOctagon, cls: "border-l-red-600", chip: "bg-red-100 text-red-800" },
  warning: { Icon: AlertTriangle, cls: "border-l-amber-500", chip: "bg-amber-100 text-amber-800" },
  success: { Icon: CheckCircle2, cls: "border-l-emerald-600", chip: "bg-emerald-100 text-emerald-800" },
  info: { Icon: Info, cls: "border-l-blue-600", chip: "bg-blue-100 text-blue-800" },
} as const;

export function NotificationsPage() {
  const feed = useNotificationFeed();
  const markRead = useLandAdmin((s) => s.markNotificationRead);
  const markAllRead = useLandAdmin((s) => s.markAllRead);
  const pushToast = useLandAdmin((s) => s.pushToast);
  const [showRead, setShowRead] = React.useState(true);

  const unread = feed.filter((n) => !n.isRead);
  const shown = showRead ? feed : unread;

  return (
    <div className="mx-auto max-w-[1100px] space-y-3 p-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Notifications</h1>
          <p className="mt-0.5 text-[12.5px] text-slate-500">
            {num(unread.length)} unread of {num(feed.length)} · as on {DEMO_NOW_LABEL}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowRead((v) => !v)}
            className={cn(
              "border px-2.5 py-1.5 text-[12px] font-medium",
              showRead ? "border-[#0F2340] bg-[#0F2340] text-white" : "border-slate-300 text-slate-600",
            )}
          >
            {showRead ? "Showing all" : "Unread only"}
          </button>
          <button
            type="button"
            onClick={markAllRead}
            disabled={unread.length === 0}
            className="flex items-center gap-1.5 border border-slate-300 px-2.5 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Unread" value={num(unread.length)} sub="Requiring attention" tone={unread.length > 0 ? "red" : "green"} />
        <KpiCard label="Critical" value={num(feed.filter((n) => n.tone === "critical").length)} sub="Escalation required" tone="red" />
        <KpiCard label="Warnings" value={num(feed.filter((n) => n.tone === "warning").length)} sub="Needs action soon" tone="amber" />
        <KpiCard label="Resolved" value={num(feed.filter((n) => n.tone === "success").length)} sub="Closed out" tone="green" />
      </div>

      <Panel title="Alert feed" subtitle="Newest first. Selecting an alert opens the case it refers to." dense>
        {shown.length === 0 ? (
          <EmptyState
            icon={<Bell className="h-9 w-9" />}
            title="You're all caught up"
            body="There are no unread notifications for this office. New alerts appear here when a case crosses a statutory window, a document is returned, or a payment instruction is queried."
            action={
              <button type="button" onClick={() => setShowRead(true)} className="border border-[#0F2340] bg-[#0F2340] px-3 py-1.5 text-[12.5px] font-semibold text-white hover:bg-[#1A3560]">
                Show read alerts
              </button>
            }
          />
        ) : (
          <ul>
            {shown.map((n) => {
              const tone = TONE[n.tone];
              const c = n.caseId ? findCaseById(n.caseId) : undefined;
              const Icon = tone.Icon;
              return (
                <li key={n.id} className={cn("border-b border-slate-100 border-l-[3px] last:border-b-0", tone.cls, !n.isRead && "bg-slate-50/60")}>
                  <div className="flex flex-wrap items-start gap-3 px-4 py-3">
                    <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", n.tone === "critical" ? "text-red-600" : n.tone === "warning" ? "text-amber-600" : n.tone === "success" ? "text-emerald-600" : "text-blue-600")} aria-hidden />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className={cn("text-[13px] font-semibold", n.isRead ? "text-slate-700" : "text-slate-900")}>{n.title}</p>
                        {!n.isRead && <span className="h-1.5 w-1.5 rounded-full bg-blue-600" aria-label="Unread" />}
                        <span className={cn("border px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide", tone.chip)}>{n.tone}</span>
                      </div>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{n.body}</p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        {n.office} · {relativeFrom(n.at, DEMO_NOW)}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                      {c && (
                        <Link
                          to={`/land-admin/cases/${c.id}`}
                          onClick={() => {
                            markRead(n.id);
                            if (!n.isRead) {
                              pushToast({ tone: "info", title: "Alert marked read", detail: c.caseNo });
                            }
                          }}
                          className="border border-slate-300 px-2.5 py-1.5 text-[11.5px] font-medium text-slate-700 hover:bg-slate-50"
                        >
                          Open case
                        </Link>
                      )}
                      {!n.isRead && (
                        <button
                          type="button"
                          onClick={() => markRead(n.id)}
                          className="border border-slate-300 px-2.5 py-1.5 text-[11.5px] font-medium text-slate-600 hover:bg-slate-50"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      <p className="pb-1 text-center text-[10.5px] text-slate-400">
        Alerts are generated from the district caseload for demonstration. No SMS, email or push service is connected.
      </p>
    </div>
  );
}
