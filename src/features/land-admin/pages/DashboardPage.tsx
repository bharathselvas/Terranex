// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Overview
// The district's morning view: six headline tiles, the caseload-by-stage
// profile, and the queue of cases that need a decision today. Every tile
// navigates into the filtered list behind it, so the dashboard is a launchpad
// rather than a display.
// ═══════════════════════════════════════════════════════════════════════

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertOctagon,
  Clock3,
  FileWarning,
  IndianRupee,
  MapPin,
  ScanSearch,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  CASES,
  DELAY_BANDS,
  HEADLINE,
  PRIORITY_ROWS,
  STAGE_BUCKETS,
  TOTALS,
  delayIssue,
  fmtDate,
  inrCompact,
  num,
  pct,
} from "../data";
import { EmptyState, Panel, PriorityPill, StagePill, Tip } from "../components/ui";
import { cn } from "@/lib/utils";

/** Stage → chart colour, matching the parcel legend and status pills. */
const STAGE_COLOR: Record<string, string> = {
  draft: "#94A3B8",
  submitted: "#64748B",
  under_verification: "#6D28D9",
  land_valuation: "#C96A1A",
  award_processing: "#B45309",
  compensation_approved: "#0E7490",
  compensation_paid: "#0F766E",
  rnr_assessment: "#7C3AED",
  rnr_approved: "#0D9488",
  completed: "#0F7A5A",
  delayed: "#B42318",
};

export function DashboardPage() {
  const nav = useNavigate();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // `completed` is 1,428 of 2,481 — plotted alongside the live stages it flattens
  // every other bar into the axis. It is reported as a caption instead.
  const completed = STAGE_BUCKETS.find((b) => b.stage === "completed");
  const chart = STAGE_BUCKETS.filter((b) => b.stage !== "completed").map((b) => ({
    name: b.short,
    stage: b.stage,
    Cases: b.count,
    "Past window": b.breached,
  }));

  const worstBands = [...DELAY_BANDS].reverse();

  return (
    <div className="mx-auto max-w-[1680px] space-y-4 p-4">
      {/* ── Heading ──────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">District Overview</h1>
          <p className="mt-0.5 text-[12.5px] text-slate-500">
            Land acquisition caseload for {HEADLINE.totalCases.toLocaleString("en-IN")} parcels across{" "}
            {num(TOTALS.areaHa)} hectares · {num(TOTALS.households)} affected households
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/land-admin/gis"
            className="inline-flex items-center gap-1.5 border border-[#0F2340] bg-[#0F2340] px-3 py-1.5 text-[12.5px] font-semibold text-white hover:bg-[#1A3560]"
          >
            <MapPin className="h-3.5 w-3.5" /> Open GIS Parcel Map
          </Link>
          <Link
            to="/land-admin/cases?stage=delayed"
            className="inline-flex items-center gap-1.5 border border-red-300 bg-red-50 px-3 py-1.5 text-[12.5px] font-semibold text-red-800 hover:bg-red-100"
          >
            <AlertOctagon className="h-3.5 w-3.5" /> {num(HEADLINE.delayedCases)} delayed cases
          </Link>
        </div>
      </div>

      {/* ── Headline tiles ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Tile
          label="Total Cases"
          value={num(HEADLINE.totalCases)}
          sub={`${num(TOTALS.areaHa)} ha acquired`}
          tone="slate"
          icon={<TrendingUp className="h-4 w-4" />}
          onClick={() => nav("/land-admin/cases")}
        />
        <Tile
          label="Active Cases"
          value={num(HEADLINE.activeCases)}
          sub={`${pct(HEADLINE.activeCases, HEADLINE.totalCases)} of caseload`}
          tone="blue"
          icon={<FileWarning className="h-4 w-4" />}
          onClick={() => nav("/land-admin/cases?status=active")}
        />
        <Tile
          label="Compensation Pending"
          value={num(HEADLINE.compensationPending)}
          sub={`${inrCompact(TOTALS.pending)} to disburse`}
          tone="amber"
          icon={<IndianRupee className="h-4 w-4" />}
          onClick={() => nav("/land-admin/compensation?filter=pending")}
        />
        <Tile
          label="R&R Pending"
          value={num(HEADLINE.rnrPending)}
          sub={`${num(TOTALS.eligibleHouseholds)} eligible households`}
          tone="violet"
          icon={<Users className="h-4 w-4" />}
          onClick={() => nav("/land-admin/rnr?filter=pending")}
        />
        <Tile
          label="Delayed Cases"
          value={num(HEADLINE.delayedCases)}
          sub="Past statutory window"
          tone="red"
          icon={<AlertOctagon className="h-4 w-4" />}
          onClick={() => nav("/land-admin/cases?stage=delayed")}
        />
        <Tile
          label="Under Verification"
          value={num(HEADLINE.parcelsUnderVerification)}
          sub="Field report awaited"
          tone="teal"
          icon={<ScanSearch className="h-4 w-4" />}
          onClick={() => nav("/land-admin/cases?verification=under_verification")}
        />
      </div>

      {/* ── Chart + delay profile ────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Case Status Overview"
          subtitle={
            <>
              Live caseload by current acquisition stage, with the portion past its own statutory window.{" "}
              <span className="font-medium text-slate-700">
                {completed ? `${completed.count.toLocaleString("en-IN")} completed cases excluded from the axis` : ""}
              </span>
            </>
          }
          actions={
            <Link to="/land-admin/analytics" className="text-[11.5px] font-medium text-blue-700 underline-offset-2 hover:underline">
              Open analytics →
            </Link>
          }
        >
          <div className="h-[290px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart} margin={{ top: 4, right: 8, left: -18, bottom: 0 }} barGap={2}>
                  <CartesianGrid strokeDasharray="2 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748B" }} angle={-38} textAnchor="end" interval={0} height={78} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748B" }} width={46} />
                  <RTooltip
                    cursor={{ fill: "rgba(15,35,64,0.04)" }}
                    contentStyle={{ border: "1px solid #CBD5E1", borderRadius: 0, fontSize: 12, padding: "6px 9px" }}
                    labelStyle={{ fontWeight: 600, color: "#0F2340", marginBottom: 2 }}
                    formatter={(v: number, name: string) => [num(v), name]}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} iconType="square" iconSize={9} />
                  <Bar dataKey="Cases" radius={[2, 2, 0, 0]} maxBarSize={34}>
                    {chart.map((e) => (
                      <Cell key={e.stage} fill={STAGE_COLOR[e.stage]} />
                    ))}
                  </Bar>
                  <Bar dataKey="Past window" fill="#0F2340" opacity={0.35} radius={[2, 2, 0, 0]} maxBarSize={34} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Panel>

        <Panel title="Delay Profile" subtitle="Cases past their stage window, by how long they have run" dense>
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-[10.5px] uppercase tracking-wide text-slate-500">
                <th className="px-4 py-2 font-semibold">Band</th>
                <th className="px-2 py-2 text-right font-semibold">Cases</th>
                <th className="px-4 py-2 text-right font-semibold">Amount at risk</th>
              </tr>
            </thead>
            <tbody>
              {worstBands.map((b) => (
                <tr key={b.label} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-slate-800">{b.label}</td>
                  <td className="px-2 py-2 text-right font-mono tabular-nums text-slate-900">{num(b.count)}</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums text-slate-600">{inrCompact(b.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-300 bg-slate-50">
                <td className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600">Total</td>
                <td className="px-2 py-2 text-right font-mono text-[13px] font-bold tabular-nums text-slate-900">
                  {num(worstBands.reduce((s, b) => s + b.count, 0))}
                </td>
                <td className="px-4 py-2 text-right font-mono text-[13px] font-bold tabular-nums text-red-700">
                  {inrCompact(worstBands.reduce((s, b) => s + b.amount, 0))}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="border-t border-slate-200 px-4 py-3">
            <p className="text-[11.5px] leading-relaxed text-slate-500">
              <Clock3 className="mr-1 inline h-3 w-3 align-[-1px]" aria-hidden />
              A case is counted as delayed when the current stage has run longer than the statutory window for that stage.
            </p>
          </div>
        </Panel>
      </div>

      {/* ── Priority cases ───────────────────────────────────────────── */}
      <Panel
        title="Priority Cases"
        subtitle="Highest-risk cases in the district, ordered by time past the statutory window"
        dense
        actions={
          <Link to="/land-admin/cases?priority=critical" className="text-[11.5px] font-medium text-blue-700 underline-offset-2 hover:underline">
            View all →
          </Link>
        }
      >
        {PRIORITY_ROWS.length === 0 ? (
          <EmptyState title="No priority cases" body="Nothing in the caseload is currently flagged critical or delayed." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-[12.5px]">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100 text-left text-[10.5px] uppercase tracking-wide text-slate-600">
                  <th className="px-3 py-2 font-semibold">Case ID</th>
                  <th className="px-3 py-2 font-semibold">S.No.</th>
                  <th className="px-3 py-2 font-semibold">Village</th>
                  <th className="px-3 py-2 font-semibold">Issue</th>
                  <th className="px-3 py-2 text-right font-semibold">Days Pending</th>
                  <th className="px-3 py-2 font-semibold">Status</th>
                  <th className="px-3 py-2 font-semibold">Priority</th>
                </tr>
              </thead>
              <tbody>
                {PRIORITY_ROWS.slice(0, 12).map((c, i) => (
                  <tr
                    key={c.id}
                    onClick={() => nav(`/land-admin/cases/${c.id}`)}
                    className={`cursor-pointer border-b border-slate-100 hover:bg-blue-50/50 ${i % 2 === 1 ? "bg-slate-50/40" : ""}`}
                  >
                    <td className="px-3 py-2">
                      <span className="font-mono text-[12px] font-medium text-[#0F2340]">{c.caseNo}</span>
                    </td>
                    <td className="px-3 py-2 font-mono text-slate-700">{c.surveyNo}</td>
                    <td className="px-3 py-2 text-slate-800">{c.village}</td>
                    <td className="px-3 py-2 text-slate-700">{delayIssue(c)}</td>
                    <td className="px-3 py-2 text-right">
                      <span
                        className={`font-mono tabular-nums ${c.daysPending > c.stageSlaDays ? "font-semibold text-red-700" : "text-slate-600"}`}
                        title={`Statutory window for this stage: ${c.stageSlaDays} days`}
                      >
                        {c.daysPending}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <StagePill stage={c.stage} short />
                    </td>
                    <td className="px-3 py-2">
                      <PriorityPill priority={c.priority} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {/* ── Office load ──────────────────────────────────────────────── */}
      <Panel title="Caseload by Responsible Office" subtitle="Where the work is sitting, and how much of it is late" dense>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-[12.5px]">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-100 text-left text-[10.5px] uppercase tracking-wide text-slate-600">
                <th className="px-4 py-2 font-semibold">Office</th>
                <th className="px-3 py-2 text-right font-semibold">Cases</th>
                <th className="px-3 py-2 text-right font-semibold">Delayed</th>
                <th className="px-3 py-2 text-right font-semibold">Area (ha)</th>
                <th className="px-3 py-2 text-right font-semibold">Households</th>
                <th className="px-4 py-2 text-right font-semibold">Amount pending</th>
              </tr>
            </thead>
            <tbody>
              {OFFICE_ROWS.map((r, i) => (
                <tr key={r.office} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/40" : ""}`}>
                  <td className="px-4 py-2 text-slate-800">{r.office}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums">{num(r.cases)}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums text-red-700">{num(r.delayed)}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums text-slate-600">{num(Math.round(r.areaHa))}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums text-slate-600">{num(r.households)}</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums text-slate-800">{inrCompact(r.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <p className="pb-2 text-center text-[10.5px] text-slate-400">
        Last refreshed {fmtDate("2026-09-30")} · figures derived from the district caseload ·{" "}
        <Tip label="Every tile on this page is computed from the case list at render time. Change a filter on the Cases page and the underlying numbers move with it.">
          <span className="cursor-help border-b border-dotted border-slate-400">how these are calculated</span>
        </Tip>
      </p>
    </div>
  );
}

const ACCENT: Record<string, string> = {
  slate: "border-l-slate-400",
  blue: "border-l-blue-600",
  amber: "border-l-amber-500",
  green: "border-l-emerald-600",
  red: "border-l-red-700",
  violet: "border-l-violet-600",
  teal: "border-l-teal-600",
};

/** Clickable headline tile. Buttons, not links, because they also drive filters. */
function Tile({
  label,
  value,
  sub,
  tone = "slate",
  icon,
  onClick,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: keyof typeof ACCENT;
  icon?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-full w-full items-start gap-3 border border-slate-200 border-l-[3px] bg-white p-3.5 text-left transition-colors hover:bg-slate-50",
        ACCENT[tone],
      )}
    >
      {icon && <div className="mt-0.5 shrink-0 text-slate-400">{icon}</div>}
      <div className="min-w-0 flex-1">
        <p className="text-[10.5px] font-medium uppercase leading-tight tracking-wide text-slate-500">{label}</p>
        <p className="mt-1 font-mono text-2xl font-semibold leading-none tracking-tight text-slate-900">{value}</p>
        {sub && (
          <p className="mt-1.5 text-[10.5px] leading-tight text-slate-500" title={sub}>
            {sub}
          </p>
        )}
      </div>
    </button>
  );
}

// Office rollup, computed from the same caseload as everything else.
const OFFICE_ROWS = (() => {
  const map = new Map<string, { office: string; cases: number; delayed: number; areaHa: number; households: number; amount: number }>();
  for (const c of CASES) {
    let r = map.get(c.responsibleOffice);
    if (!r) {
      r = { office: c.responsibleOffice, cases: 0, delayed: 0, areaHa: 0, households: 0, amount: 0 };
      map.set(c.responsibleOffice, r);
    }
    r.cases += 1;
    if (c.stage === "delayed") r.delayed += 1;
    r.areaHa += c.areaHa;
    r.households += c.affectedHouseholds;
    r.amount += c.compensation.pending;
  }
  return [...map.values()].sort((a, b) => b.cases - a.cases);
})();
