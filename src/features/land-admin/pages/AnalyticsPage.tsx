// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Reports & Analytics
// Every figure here is a projection of the same caseload the dashboard reads.
// The charts are ordered the way an officer asks questions: how far along is
// the pipeline, where is the money, where is R&R, where is the caseload on
// the ground, and what is running late.
// ═══════════════════════════════════════════════════════════════════════

import React from "react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BY_TALUK,
  BY_VILLAGE,
  COMPENSATION_BUCKETS,
  DELAY_BANDS,
  HEADLINE,
  RNR_BUCKETS,
  STAGE_BUCKETS,
  TOTALS,
  inrCompact,
  num,
  pct,
} from "../data";
import { KpiCard, Meter, Panel, Tip } from "../components/ui";

const MONEY = [
  { key: "approved", label: "Approved · awaiting payment", color: "#C96A1A" },
  { key: "partially_paid", label: "Partially paid", color: "#0E7490" },
  { key: "delayed", label: "Delayed at treasury", color: "#B42318" },
  { key: "estimated", label: "Valued · order not passed", color: "#E67E22" },
  { key: "paid", label: "Paid in full", color: "#0F7A5A" },
  { key: "not_initiated", label: "Not initiated", color: "#CBD5E1" },
];

const RNR_COLOR = ["#9A6B00", "#1D4ED8", "#6D28D9", "#0E7490", "#0F7A5A", "#E2E8F0"];

const TOOLTIP = {
  contentStyle: { border: "1px solid #CBD5E1", borderRadius: 0, fontSize: 11.5, padding: "6px 9px" },
  labelStyle: { fontWeight: 600, color: "#0F2340", marginBottom: 2 },
  cursor: { fill: "rgba(15,35,64,0.04)" },
};

export function AnalyticsPage() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const moneyChart = COMPENSATION_BUCKETS.filter((b) => b.count > 0).map((b) => ({
    name: b.label,
    value: b.amount,
    count: b.count,
    key: b.key,
  }));

  // `not_required` and `completed` are 896 and 1,428 of 2,481 — on the same
  // axis they erase the four R&R stages the chart exists to show.
  const rnrChart = RNR_BUCKETS.filter((b) => b.key !== "not_required" && b.key !== "completed").map((b) => ({
    name: b.label,
    Cases: b.count,
    Households: b.amount,
  }));
  // Completed is 1,428 of 2,481; plotting it beside the live stages flattens
  // every other bar into the axis. Reported in the caption instead.
  const completedCases = STAGE_BUCKETS.find((b) => b.stage === "completed")?.count ?? 0;
  const stageChart = STAGE_BUCKETS.filter((b) => b.stage !== "completed").map((b) => ({
    name: b.short,
    Cases: b.count,
    "Past window": b.breached,
  }));
  const delayChart = DELAY_BANDS.map((b) => ({ name: b.label, Cases: b.count, "Amount at risk": b.amount }));
  const notRequiredCases = RNR_BUCKETS.find((b) => b.key === "not_required")?.count ?? 0;
  const rnrCompletedCases = RNR_BUCKETS.find((b) => b.key === "completed")?.count ?? 0;
  const talukChart = BY_TALUK.map((t) => ({ name: t.label, Cases: t.cases, Delayed: t.delayed }));
  // BY_VILLAGE rows use lowercase keys (`cases`), so they have to be remapped
  // before they can be charted — reading dataKey="Cases" off them silently
  // yields an empty plot.
  const villageTop = BY_VILLAGE.slice(0, 12).map((v) => ({
    label: v.label,
    Cases: v.cases,
    Delayed: v.delayed,
  }));

  const delayTotal = DELAY_BANDS.reduce((s, b) => s + b.count, 0);
  const inWindow = HEADLINE.totalCases - HEADLINE.delayedCases - delayTotal;

  return (
    <div className="mx-auto max-w-[1680px] space-y-4 p-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Reports &amp; Analytics</h1>
        <p className="mt-0.5 text-[12.5px] text-slate-500">
          District performance across {num(HEADLINE.totalCases)} acquisition cases · {num(TOTALS.areaHa)} hectares ·{" "}
          {inrCompact(TOTALS.approved)} compensation approved to date
        </p>
      </div>

      {/* Money position */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <KpiCard label="Total Estimated" value={inrCompact(TOTALS.estimated)} sub="Valued at market rate" tone="slate" />
        <KpiCard label="Approved" value={inrCompact(TOTALS.approved)} sub={`${pct(TOTALS.approved, TOTALS.estimated)} of estimate`} tone="blue" />
        <KpiCard label="Paid" value={inrCompact(TOTALS.paid)} sub={`${pct(TOTALS.paid, Math.max(TOTALS.approved, 1))} of approved`} tone="green" />
        <KpiCard label="Pending Disbursement" value={inrCompact(TOTALS.pending)} sub={`${num(HEADLINE.compensationPending)} cases`} tone="amber" />
        <KpiCard label="Area Acquired" value={`${num(TOTALS.areaHa)} ha`} sub={`${num(TOTALS.households)} households affected`} tone="teal" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Acquisition progress */}
        <Panel
          title="Acquisition Progress"
          subtitle={
            <>
              Live caseload and window breaches by stage.{" "}
              <span className="font-medium text-slate-700">
                {completedCases.toLocaleString("en-IN")} completed cases excluded from the axis
              </span>
            </>
          }
        >
          <div className="h-[280px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stageChart} margin={{ top: 4, right: 8, left: -16, bottom: 4 }} barGap={2}>
                  <CartesianGrid strokeDasharray="2 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 9.5, fill: "#64748B" }} angle={-34} textAnchor="end" interval={0} height={66} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748B" }} width={48} />
                  <RTooltip {...TOOLTIP} formatter={(v: number, n: string) => [num(v), n]} />
                  <Legend wrapperStyle={{ fontSize: 10.5, paddingTop: 4 }} iconType="square" iconSize={9} />
                  <Bar dataKey="Cases" fill="#0F2340" radius={[2, 2, 0, 0]} maxBarSize={26} />
                  <Bar dataKey="Past window" fill="#B42318" radius={[2, 2, 0, 0]} maxBarSize={26} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Panel>

        {/* Compensation */}
        <Panel title="Compensation Position" subtitle="Where the sanctioned money is sitting, by state">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="h-[200px]">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={moneyChart} dataKey="value" nameKey="name" innerRadius={44} outerRadius={78} paddingAngle={1.5}>
                      {moneyChart.map((e) => (
                        <Cell key={e.key} fill={MONEY.find((m) => m.key === e.key)?.color ?? "#CBD5E1"} />
                      ))}
                    </Pie>
                    <RTooltip {...TOOLTIP} formatter={(v: number, _n: string, p) => [`${inrCompact(v)} · ${num(p.payload.count)} cases`, p.payload.name]} />
                    <Legend wrapperStyle={{ fontSize: 9.5 }} iconType="square" iconSize={8} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div>
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-slate-300 text-left text-[10px] uppercase tracking-wide text-slate-600">
                    <th className="py-1.5 font-semibold">State</th>
                    <th className="py-1.5 text-right font-semibold">Cases</th>
                    <th className="py-1.5 text-right font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPENSATION_BUCKETS.map((b) => (
                    <tr key={b.key} className="border-b border-slate-100 last:border-0">
                      <td className="py-1.5 text-slate-700">
                        <span className="mr-1.5 inline-block h-2 w-2" style={{ background: MONEY.find((m) => m.key === b.key)?.color }} aria-hidden />
                        {b.label}
                      </td>
                      <td className="py-1.5 text-right font-mono tabular-nums text-slate-700">{num(b.count)}</td>
                      <td className="py-1.5 text-right font-mono tabular-nums text-slate-800">{inrCompact(b.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Panel>

        {/* R&R */}
        <Panel
          title="R&R Progress"
          subtitle={
            <>
              Cases carrying a rehabilitation obligation, with eligible household counts.{" "}
              <span className="font-medium text-slate-700">
                {notRequiredCases.toLocaleString("en-IN")} cases with no obligation and{" "}
                {rnrCompletedCases.toLocaleString("en-IN")} closed excluded
              </span>
            </>
          }
        >
          <div className="h-[260px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rnrChart} margin={{ top: 4, right: 8, left: -16, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="2 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 9.5, fill: "#64748B" }} angle={-24} textAnchor="end" interval={0} height={54} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748B" }} width={48} />
                  <RTooltip {...TOOLTIP} formatter={(v: number, n: string) => [n === "Households" ? num(v) : num(v), n]} />
                  <Legend wrapperStyle={{ fontSize: 10.5, paddingTop: 4 }} iconType="square" iconSize={9} />
                  <Bar dataKey="Cases" fill="#6D28D9" radius={[2, 2, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="Households" fill="#0F2340" opacity={0.55} radius={[2, 2, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-px border border-slate-200 bg-slate-200 sm:grid-cols-4">
            {RNR_BUCKETS.slice(0, 4).map((b, i) => (
              <div key={b.key} className="bg-white px-3 py-2">
                <p className="text-[9.5px] font-medium uppercase tracking-wide text-slate-500">{b.label}</p>
                <p className="mt-0.5 font-mono text-[14px] font-semibold tabular-nums text-slate-900">{num(b.count)}</p>
                <div className="mt-1 h-1 w-full bg-slate-100">
                  <div className="h-full" style={{ width: `${(b.count / HEADLINE.totalCases) * 100}%`, background: RNR_COLOR[i] }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Delay analysis */}
        <Panel title="Delay Analysis" subtitle="Cases past their stage window, by how long they have run">
          <div className="h-[260px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={delayChart} margin={{ top: 4, right: 8, left: -16, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="2 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748B" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748B" }} width={48} />
                  <RTooltip {...TOOLTIP} formatter={(v: number, n: string) => (n === "Amount at risk" ? [inrCompact(v), n] : [num(v), n])} />
                  <Legend wrapperStyle={{ fontSize: 10.5, paddingTop: 4 }} iconType="square" iconSize={9} />
                  <Bar dataKey="Cases" fill="#B42318" radius={[2, 2, 0, 0]} maxBarSize={54} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="mt-2 space-y-1.5">
            {DELAY_BANDS.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-[11.5px] text-slate-600">{b.label}</span>
                <Meter value={b.count} max={Math.max(...DELAY_BANDS.map((x) => x.count), 1)} tone="red" label={`${num(b.count)}`} />
                <span className="w-20 shrink-0 text-right font-mono text-[11px] text-slate-500">{inrCompact(b.amount)}</span>
              </div>
            ))}
            <p className="pt-1.5 text-[11px] text-slate-500">
              <span className="font-mono font-semibold text-slate-800">{num(delayTotal + HEADLINE.delayedCases)}</span> cases require escalation ·{" "}
              <span className="font-mono font-semibold text-emerald-700">{num(inWindow)}</span> are within their statutory window
            </p>
          </div>
        </Panel>
      </div>

      {/* Geographic distribution */}
      <Panel title="Geographic Distribution" subtitle="Caseload concentration by revenue division and village" dense>
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          <div className="border-b border-slate-200 lg:border-b-0 lg:border-r">
            <div className="h-[230px] p-3">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={talukChart} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }} barGap={2}>
                    <CartesianGrid strokeDasharray="2 3" stroke="#E2E8F0" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10, fill: "#64748B" }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10.5, fill: "#334155" }} width={96} />
                    <RTooltip {...TOOLTIP} formatter={(v: number, n: string) => [num(v), n]} />
                    <Bar dataKey="Cases" fill="#0F2340" radius={[0, 2, 2, 0]} maxBarSize={16} />
                    <Bar dataKey="Delayed" fill="#B42318" radius={[0, 2, 2, 0]} maxBarSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-y border-slate-300 bg-slate-100 text-left text-[10px] uppercase tracking-wide text-slate-600">
                  <th className="px-4 py-1.5 font-semibold">Taluk</th>
                  <th className="px-2 py-1.5 text-right font-semibold">Cases</th>
                  <th className="px-2 py-1.5 text-right font-semibold">Delayed</th>
                  <th className="px-2 py-1.5 text-right font-semibold">Area (ha)</th>
                  <th className="px-4 py-1.5 text-right font-semibold">Households</th>
                </tr>
              </thead>
              <tbody>
                {BY_TALUK.map((t, i) => (
                  <tr key={t.key} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/40" : ""}`}>
                    <td className="px-4 py-1.5 text-slate-800">
                      <Link to={`/land-admin/cases?taluk=${encodeURIComponent(t.label)}`} className="hover:underline">
                        {t.label}
                      </Link>
                    </td>
                    <td className="px-2 py-1.5 text-right font-mono tabular-nums">{num(t.cases)}</td>
                    <td className="px-2 py-1.5 text-right font-mono tabular-nums text-red-700">{num(t.delayed)}</td>
                    <td className="px-2 py-1.5 text-right font-mono tabular-nums text-slate-600">{num(Math.round(t.areaHa))}</td>
                    <td className="px-4 py-1.5 text-right font-mono tabular-nums text-slate-600">{num(t.households)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div className="h-[300px] p-3">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={villageTop} margin={{ top: 4, right: 12, left: 4, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 9, fill: "#64748B" }} angle={-42} textAnchor="end" interval={0} height={96} />
                    <YAxis tick={{ fontSize: 10, fill: "#64748B" }} width={44} />
                    <RTooltip {...TOOLTIP} formatter={(v: number, n: string) => [num(v), n]} />
                    <Legend wrapperStyle={{ fontSize: 10.5, paddingTop: 2 }} iconType="square" iconSize={9} />
                    <Bar dataKey="Cases" fill="#0F2340" radius={[2, 2, 0, 0]} maxBarSize={26} />
                    <Bar dataKey="Delayed" fill="#B42318" radius={[2, 2, 0, 0]} maxBarSize={26} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="max-h-[260px] overflow-y-auto">
              <table className="w-full text-[12px]">
                <thead className="sticky top-0">
                  <tr className="border-y border-slate-300 bg-slate-100 text-left text-[10px] uppercase tracking-wide text-slate-600">
                    <th className="px-4 py-1.5 font-semibold">Village</th>
                    <th className="px-2 py-1.5 text-right font-semibold">Cases</th>
                    <th className="px-2 py-1.5 text-right font-semibold">Delayed</th>
                    <th className="px-4 py-1.5 text-right font-semibold">Amount pending</th>
                  </tr>
                </thead>
                <tbody>
                  {BY_VILLAGE.map((v, i) => (
                    <tr key={v.key} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/40" : ""}`}>
                      <td className="px-4 py-1.5 text-slate-800">{v.label}</td>
                      <td className="px-2 py-1.5 text-right font-mono tabular-nums">{num(v.cases)}</td>
                      <td className="px-2 py-1.5 text-right font-mono tabular-nums text-red-700">{num(v.delayed)}</td>
                      <td className="px-4 py-1.5 text-right font-mono tabular-nums text-slate-700">{inrCompact(v.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Statutory Position" subtitle="Summary for the District Collector's report">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Cases within window" value={num(inWindow)} tone="green" note="No action required" />
          <Stat label="Cases in delay" value={num(delayTotal + HEADLINE.delayedCases)} tone="red" note="Require escalation" />
          <Stat label="Objections awaiting disposal" value={num(TOTALS.disputes)} tone="amber" note="Across all active cases" />
          <Stat label="Cases on hold" value={num(TOTALS.onHold)} tone="slate" note="Litigation / land ceiling" />
        </div>
        <p className="mt-3 text-[11.5px] leading-relaxed text-slate-500">
          <Tip label="A case is 'within window' when the current acquisition stage has run no longer than the statutory window published for that stage.">
            <span className="cursor-help border-b border-dotted border-slate-400">How the window is measured</span>
          </Tip>{" "}
          — the statutory window differs per stage, from 10 days for a jurisdictional check to 90 days for R&amp;R assessment.
        </p>
      </Panel>
    </div>
  );
}

function Stat({ label, value, note, tone }: { label: string; value: string; note: string; tone: "green" | "red" | "amber" | "slate" }) {
  const c = { green: "text-emerald-700", red: "text-red-700", amber: "text-amber-700", slate: "text-slate-800" }[tone];
  return (
    <div className="border border-slate-200 p-3">
      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 font-mono text-xl font-semibold tabular-nums ${c}`}>{value}</p>
      <p className="mt-0.5 text-[11px] text-slate-500">{note}</p>
    </div>
  );
}
