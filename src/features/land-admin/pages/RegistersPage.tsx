// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Domain registers
// Land Acquisition, R&R Management, Compensation, Documents and Administration.
//
// These are register views over the same caseload rather than separate
// datasets: each is a different lens on the same 2,481 cases, so the totals
// agree with the dashboard and the analytics page by construction.
// ═══════════════════════════════════════════════════════════════════════

import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Building2,
  FileStack,
  FileText,
  Gavel,
  IndianRupee,
  MapPin,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Column } from "../components/ui";
import {
  CASES,
  COMPENSATION_BUCKETS,
  RNR_BUCKETS,
  fmtDate,
  inr,
  inrCompact,
  num,
} from "../data";
import {
  CompensationPill,
  DataTable,
  EmptyState,
  FieldGrid,
  KpiCard,
  Panel,
  RnrPill,
  StagePill,
  Tip,
} from "../components/ui";
import type { AcquisitionStage, CaseRecord } from "../lib/types";
import { useLandAdmin } from "../store/landAdminStore";
import { documentsForCase } from "../data/caseRecords";

// ═══════════════════════════════════════════════════════════════════════
// Land Acquisition
// ═══════════════════════════════════════════════════════════════════════
const LIVE_STAGES: AcquisitionStage[] = [
  "draft", "submitted", "under_verification", "land_valuation", "award_processing",
];

export function AcquisitionPage() {
  const nav = useNavigate();
  const live = React.useMemo(() => CASES.filter((c) => LIVE_STAGES.includes(c.stage)), []);
  const byStage = React.useMemo(() => {
    const m = new Map<string, { cases: number; area: number; amount: number }>();
    for (const c of live) {
      const r = m.get(c.stage) ?? { cases: 0, area: 0, amount: 0 };
      r.cases += 1;
      r.area += c.areaHa;
      r.amount += c.compensation.approved + c.compensation.estimated;
      m.set(c.stage, r);
    }
    return m;
  }, [live]);

  const byAuthority = React.useMemo(() => {
    const m = new Map<string, { cases: number; area: number; amount: number }>();
    for (const c of live) {
      const r = m.get(c.acquisition.authority) ?? { cases: 0, area: 0, amount: 0 };
      r.cases += 1;
      r.area += c.areaHa;
      r.amount += c.compensation.approved;
      m.set(c.acquisition.authority, r);
    }
    return [...m.entries()].sort((a, b) => b[1].cases - a[1].cases);
  }, [live]);

  const byPurpose = React.useMemo(() => {
    const m = new Map<string, number>();
    for (const c of live) m.set(c.acquisition.purpose, (m.get(c.acquisition.purpose) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [live]);

  return (
    <div className="mx-auto max-w-[1680px] space-y-3 p-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Land Acquisition</h1>
        <p className="mt-0.5 text-[12.5px] text-[#0F2340]/70">
          Cases in the active acquisition pipeline, from requisition through award
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Cases in pipeline" value={num(live.length)} sub="Draft through award" tone="blue" icon={<Gavel className="h-4 w-4" />} />
        <KpiCard label="Area in pipeline" value={`${num(Math.round(live.reduce((s, c) => s + c.areaHa, 0)))} ha`} sub="Under active acquisition" tone="slate" icon={<MapPin className="h-4 w-4" />} />
        <KpiCard label="Value in pipeline" value={inrCompact(live.reduce((s, c) => s + c.compensation.approved + c.compensation.estimated, 0))} sub="Estimated plus approved" tone="amber" icon={<IndianRupee className="h-4 w-4" />} />
        <KpiCard label="Requiring authorities" value={num(byAuthority.length)} sub="Departments requisitioning land" tone="violet" icon={<Building2 className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        <Panel title="Pipeline by Stage" className="xl:col-span-1" dense>
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-100 text-left text-[10px] uppercase tracking-wide text-slate-600">
                <th className="px-4 py-2 font-semibold">Stage</th>
                <th className="px-2 py-2 text-right font-semibold">Cases</th>
                <th className="px-2 py-2 text-right font-semibold">Area</th>
                <th className="px-4 py-2 text-right font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              {LIVE_STAGES.map((s) => {
                const r = byStage.get(s) ?? { cases: 0, area: 0, amount: 0 };
                return (
                  <tr key={s} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-2">
                      <Link to={`/land-admin/cases?stage=${s}`} className="hover:underline">
                        <StagePill stage={s} short />
                      </Link>
                    </td>
                    <td className="px-2 py-2 text-right font-mono tabular-nums">{num(r.cases)}</td>
                    <td className="px-2 py-2 text-right font-mono tabular-nums text-slate-600">{num(Math.round(r.area))}</td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums text-slate-700">{inrCompact(r.amount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>

        <Panel title="Requisitioning Authorities" className="xl:col-span-2" dense>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-[12.5px]">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100 text-left text-[10px] uppercase tracking-wide text-slate-600">
                  <th className="px-4 py-2 font-semibold">Authority</th>
                  <th className="px-2 py-2 text-right font-semibold">Cases</th>
                  <th className="px-2 py-2 text-right font-semibold">Area (ha)</th>
                  <th className="px-2 py-2 text-right font-semibold">Approved</th>
                  <th className="px-4 py-2 font-semibold">Share</th>
                </tr>
              </thead>
              <tbody>
                {byAuthority.map(([name, r], i) => (
                  <tr key={name} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/40" : ""}`}>
                    <td className="px-4 py-2 text-slate-800">{name}</td>
                    <td className="px-2 py-2 text-right font-mono tabular-nums">{num(r.cases)}</td>
                    <td className="px-2 py-2 text-right font-mono tabular-nums text-slate-600">{num(Math.round(r.area))}</td>
                    <td className="px-2 py-2 text-right font-mono tabular-nums text-slate-700">{inrCompact(r.amount)}</td>
                    <td className="px-4 py-2">
                      <div className="h-1.5 w-full bg-slate-100">
                        <div className="h-full bg-[#0F2340]" style={{ width: `${(r.cases / live.length) * 100}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <Panel title="Acquisition Purpose" subtitle="Why the land is being taken — across the active pipeline" dense>
        <div className="grid grid-cols-2 divide-x divide-slate-200 md:grid-cols-3 lg:grid-cols-5">
          {byPurpose.map(([purpose, count]) => (
            <div key={purpose} className="border-b border-slate-100 p-3">
              <p className="text-[11.5px] leading-snug text-slate-700">{purpose}</p>
              <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-[#0F2340]">{num(count)}</p>
              <p className="text-[10.5px] text-slate-400">{((count / live.length) * 100).toFixed(1)}% of pipeline</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Cases in the pipeline" subtitle="Most recently updated first" dense>
        <DataTable
          dense
          maxHeight={480}
          rows={(live.length ? live : []).slice(0, 400)}
          rowKey={(c: CaseRecord) => c.id}
          onRowClick={(c: CaseRecord) => nav(`/land-admin/cases/${c.id}`)}
          initialSort={{ key: "lastUpdated", dir: "desc" }}
          columns={[
            { key: "caseNo", header: "Case ID", width: "160px", sortable: (c: CaseRecord) => c.caseNo, cell: (c: CaseRecord) => <span className="font-mono text-[12px] font-medium text-[#0F2340]">{c.caseNo}</span> },
            { key: "purpose", header: "Purpose", cell: (c: CaseRecord) => c.acquisition.purpose },
            { key: "authority", header: "Authority", width: "210px", cell: (c: CaseRecord) => <span className="text-slate-600">{c.acquisition.authority}</span> },
            { key: "village", header: "Village", width: "130px", sortable: (c: CaseRecord) => c.village, cell: (c: CaseRecord) => c.village },
            { key: "areaHa", header: "Area", width: "70px", align: "right", sortable: (c: CaseRecord) => c.areaHa, cell: (c: CaseRecord) => <span className="font-mono tabular-nums">{c.areaHa} ha</span> },
            { key: "stage", header: "Stage", width: "132px", sortable: (c: CaseRecord) => c.stage, cell: (c: CaseRecord) => <StagePill stage={c.stage} short /> },
            { key: "lastUpdated", header: "Updated", width: "96px", sortable: (c: CaseRecord) => c.lastUpdated, cell: (c: CaseRecord) => <span className="font-mono text-slate-600">{fmtDate(c.lastUpdated)}</span> },
          ]}
        />
      </Panel>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// R&R Management
// ═══════════════════════════════════════════════════════════════════════
export function RnrPage() {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const filter = params.get("filter");

  const rnr = React.useMemo(() => CASES.filter((c) => c.rnrStatus !== "not_required"), []);
  const rows = React.useMemo(
    () => (filter === "pending" ? rnr.filter((c) => c.rnrStatus === "pending" || c.rnrStatus === "assessment_completed" || c.rnrStatus === "approval_pending") : rnr),
    [rnr, filter],
  );
  const households = rows.reduce((s, c) => s + c.affectedHouseholds, 0);
  const eligible = rows.reduce((s, c) => s + c.eligibleHouseholds, 0);

  return (
    <div className="mx-auto max-w-[1680px] space-y-3 p-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">R&amp;R Management</h1>
        <p className="mt-0.5 text-[12.5px] text-slate-500">
          Rehabilitation and resettlement obligations arising from acquisition · {num(households)} affected households, {num(eligible)} eligible
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        {RNR_BUCKETS.map((b, i) => (
          <KpiCard
            key={b.key}
            label={b.label}
            value={num(b.count)}
            sub={b.key === "not_required" ? "No obligation" : `${num(b.amount)} households`}
            tone={i === 4 ? "green" : i === 0 ? "amber" : i === 5 ? "slate" : "violet"}
          />
        ))}
      </div>

      <Panel title="R&R Register" subtitle={filter === "pending" ? "Filtered to cases with a live R&R obligation" : "All cases carrying a rehabilitation obligation"} dense>
        {rows.length === 0 ? (
          <EmptyState icon={<Users className="h-9 w-9" />} title="No R&R obligations" body="No case in the district currently carries a rehabilitation and resettlement obligation." />
        ) : (
          <DataTable
            dense
            maxHeight={620}
            rows={rows.slice(0, 500)}
            rowKey={(c: CaseRecord) => c.id}
            onRowClick={(c: CaseRecord) => nav(`/land-admin/cases/${c.id}`)}
            initialSort={{ key: "eligibleHouseholds", dir: "desc" }}
            columns={[
              { key: "caseNo", header: "Case ID", width: "160px", sortable: (c: CaseRecord) => c.caseNo, cell: (c: CaseRecord) => <span className="font-mono text-[12px] font-medium text-[#0F2340]">{c.caseNo}</span> },
              { key: "village", header: "Village", width: "140px", sortable: (c: CaseRecord) => c.village, cell: (c: CaseRecord) => c.village },
              { key: "taluk", header: "Taluk", width: "126px", sortable: (c: CaseRecord) => c.taluk, cell: (c: CaseRecord) => c.taluk },
              { key: "affected", header: "Affected", width: "82px", align: "right", sortable: (c: CaseRecord) => c.affectedHouseholds, cell: (c: CaseRecord) => <span className="font-mono tabular-nums">{num(c.affectedHouseholds)}</span> },
              { key: "eligibleHouseholds", header: "Eligible", width: "82px", align: "right", sortable: (c: CaseRecord) => c.eligibleHouseholds, cell: (c: CaseRecord) => <span className="font-mono tabular-nums font-medium text-slate-900">{num(c.eligibleHouseholds)}</span> },
              { key: "rnrStatus", header: "Assessment", width: "150px", sortable: (c: CaseRecord) => c.rnrStatus, cell: (c: CaseRecord) => <RnrPill status={c.rnrStatus} /> },
              { key: "approval", header: "Approval", width: "120px", cell: (c: CaseRecord) => (["approved", "completed"].includes(c.rnrStatus) ? <span className="text-emerald-700">Sanctioned</span> : <span className="text-red-700">Pending</span>) },
              { key: "stage", header: "Acquisition", width: "132px", sortable: (c: CaseRecord) => c.stage, cell: (c: CaseRecord) => <StagePill stage={c.stage} short /> },
            ]}
          />
        )}
      </Panel>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// Compensation
// ═══════════════════════════════════════════════════════════════════════
export function CompensationPage() {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const filter = params.get("filter");

  const rows = React.useMemo(() => {
    const base = CASES.filter((c) => c.compensation.approved > 0 || c.compensation.estimated > 0);
    return filter === "pending" ? base.filter((c) => c.compensation.pending > 0) : base;
  }, [filter]);

  const totals = React.useMemo(
    () => ({
      estimated: rows.reduce((s, c) => s + c.compensation.estimated, 0),
      approved: rows.reduce((s, c) => s + c.compensation.approved, 0),
      paid: rows.reduce((s, c) => s + c.compensation.paid, 0),
      pending: rows.reduce((s, c) => s + c.compensation.pending, 0),
    }),
    [rows],
  );

  return (
    <div className="mx-auto max-w-[1680px] space-y-3 p-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Compensation</h1>
        <p className="mt-0.5 text-[12.5px] text-slate-500">
          {filter === "pending" ? "Cases with an approved order awaiting disbursement" : "Valuation, approval and disbursement across the caseload"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Estimated" value={inrCompact(totals.estimated)} sub={`${num(rows.length)} cases valued`} tone="slate" />
        <KpiCard label="Approved" value={inrCompact(totals.approved)} sub={totals.estimated ? `${((totals.approved / totals.estimated) * 100).toFixed(1)}% of estimate` : "—"} tone="blue" />
        <KpiCard label="Paid" value={inrCompact(totals.paid)} sub={totals.approved ? `${((totals.paid / totals.approved) * 100).toFixed(1)}% of approved` : "—"} tone="green" />
        <KpiCard label="Pending" value={inrCompact(totals.pending)} sub="Awaiting treasury release" tone="amber" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {COMPENSATION_BUCKETS.map((b) => (
          <Panel key={b.key} dense className="p-3">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">{b.label}</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-slate-900">{num(b.count)}</p>
            <p className="font-mono text-[11px] text-slate-500">{inrCompact(b.amount)}</p>
          </Panel>
        ))}
      </div>

      <Panel title="Compensation Register" subtitle="Ordered by amount outstanding" dense>
        {rows.length === 0 ? (
          <EmptyState icon={<IndianRupee className="h-9 w-9" />} title="No compensation records" body="No case in the current view has a valued or approved compensation order." />
        ) : (
          <DataTable
            dense
            maxHeight={620}
            rows={rows.slice(0, 600)}
            rowKey={(c: CaseRecord) => c.id}
            onRowClick={(c: CaseRecord) => nav(`/land-admin/cases/${c.id}`)}
            initialSort={{ key: "pending", dir: "desc" }}
            columns={[
              { key: "caseNo", header: "Case ID", width: "160px", sortable: (c: CaseRecord) => c.caseNo, cell: (c: CaseRecord) => <span className="font-mono text-[12px] font-medium text-[#0F2340]">{c.caseNo}</span> },
              { key: "landholder", header: "Landholder", width: "160px", sortable: (c: CaseRecord) => c.owner.name, cell: (c: CaseRecord) => c.owner.name },
              { key: "village", header: "Village", width: "130px", sortable: (c: CaseRecord) => c.village, cell: (c: CaseRecord) => c.village },
              { key: "rate", header: "Rate / acre", width: "110px", align: "right", sortable: (c: CaseRecord) => c.compensation.marketValuePerAcre, cell: (c: CaseRecord) => <span className="font-mono tabular-nums text-slate-600">{inrCompact(c.compensation.marketValuePerAcre)}</span> },
              { key: "estimated", header: "Estimated", width: "108px", align: "right", sortable: (c: CaseRecord) => c.compensation.estimated, cell: (c: CaseRecord) => <span className="font-mono tabular-nums text-slate-500">{inr(c.compensation.estimated)}</span> },
              { key: "approved", header: "Approved", width: "108px", align: "right", sortable: (c: CaseRecord) => c.compensation.approved, cell: (c: CaseRecord) => <span className="font-mono tabular-nums text-slate-800">{c.compensation.approved ? inr(c.compensation.approved) : "—"}</span> },
              { key: "paid", header: "Paid", width: "108px", align: "right", sortable: (c: CaseRecord) => c.compensation.paid, cell: (c: CaseRecord) => <span className="font-mono tabular-nums text-emerald-700">{c.compensation.paid ? inr(c.compensation.paid) : "—"}</span> },
              { key: "pending", header: "Pending", width: "108px", align: "right", sortable: (c: CaseRecord) => c.compensation.pending, cell: (c: CaseRecord) => <span className={cn("font-mono tabular-nums", c.compensation.pending > 0 ? "font-semibold text-red-700" : "text-slate-400")}>{c.compensation.pending ? inr(c.compensation.pending) : "—"}</span> },
              { key: "compensationStatus", header: "Status", width: "126px", sortable: (c: CaseRecord) => c.compensationStatus, cell: (c: CaseRecord) => <CompensationPill status={c.compensationStatus} /> },
            ]}
          />
        )}
      </Panel>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// Documents
// ═══════════════════════════════════════════════════════════════════════
/** One row of the rolled-up document register. */
interface DocRow {
  id: string;
  caseId: string;
  caseNo: string;
  name: string;
  type: string;
  uploadedOn: string;
  uploadedBy: string;
  fileSizeKb: number;
  status: string;
  rejectionReason?: string;
}

export function DocumentsPage() {
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const nav = useNavigate();
  const docDecisions = useLandAdmin((s) => s.docDecisions);

  // Roll every case's documents up into one register. Documents are generated
  // on demand, so this is a bounded sample rather than a 12,000-row table.
  const all = React.useMemo(() => {
    const out: DocRow[] = [];
    for (const c of CASES) {
      for (const d of documentsForCase(c)) {
        const decision = docDecisions[`${c.id}:${d.id}`];
        out.push({ ...d, caseNo: c.caseNo, status: decision?.status ?? d.status });
      }
    }
    return out;
  }, [docDecisions]);

  const filtered = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    return all.filter((d) => {
      if (status !== "all" && d.status !== status) return false;
      if (needle && !`${d.name} ${d.type} ${d.caseNo} ${d.uploadedBy}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [all, q, status]);

  const counts = React.useMemo(
    () => ({
      verified: all.filter((d) => d.status === "verified").length,
      pending: all.filter((d) => d.status === "pending_verification").length,
      rejected: all.filter((d) => d.status === "rejected").length,
    }),
    [all],
  );

  const docColumns: Column<DocRow>[] = [
    { key: "name", header: "Document", cell: (d) => <span className="font-medium text-slate-800">{d.name}</span> },
    { key: "type", header: "Type", width: "170px", sortable: (d) => d.type, cell: (d) => <span className="text-slate-600">{d.type}</span> },
    { key: "caseNo", header: "Case ID", width: "160px", sortable: (d) => d.caseNo, cell: (d) => <span className="font-mono text-[12px] text-[#0F2340]">{d.caseNo}</span> },
    { key: "uploadedOn", header: "Uploaded", width: "104px", sortable: (d) => d.uploadedOn, cell: (d) => <span className="font-mono text-slate-600">{fmtDate(d.uploadedOn)}</span> },
    { key: "uploadedBy", header: "Uploaded by", width: "210px", cell: (d) => <span className="text-slate-600">{d.uploadedBy}</span> },
    { key: "fileSizeKb", header: "Size", width: "76px", align: "right", sortable: (d) => d.fileSizeKb, cell: (d) => <span className="font-mono text-slate-500">{num(d.fileSizeKb)} KB</span> },
    {
      key: "status",
      header: "Verification",
      width: "150px",
      cell: (d) => (
        <span title={d.rejectionReason}>
          {d.status === "verified" ? (
            <span className="text-emerald-700">Verified</span>
          ) : d.status === "rejected" ? (
            <span className="text-red-700">Rejected</span>
          ) : (
            <span className="text-amber-700">Pending Verification</span>
          )}
        </span>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-[1680px] space-y-3 p-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Document Repository</h1>
          <p className="mt-0.5 text-[12.5px] text-slate-500">
            {num(all.length)} documents across {num(CASES.length)} cases · {num(counts.verified)} verified, {num(counts.pending)} pending, {num(counts.rejected)} returned
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" aria-hidden />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search documents or case ID…"
              aria-label="Search documents"
              className="w-72 border border-slate-300 bg-white py-1.5 pl-8 pr-7 text-[12.5px] placeholder:text-slate-400 focus:border-[#0F2340] focus:outline-none"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="flex border border-slate-300" role="group" aria-label="Filter by verification status">
            {[
              { k: "all", l: "All" },
              { k: "verified", l: "Verified" },
              { k: "pending_verification", l: "Pending" },
              { k: "rejected", l: "Returned" },
            ].map((o) => (
              <button
                key={o.k}
                type="button"
                onClick={() => setStatus(o.k)}
                className={cn("px-2.5 py-1.5 text-[11.5px] font-medium", status === o.k ? "bg-[#0F2340] text-white" : "bg-white text-slate-600 hover:bg-slate-50")}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Documents on file" value={num(all.length)} sub="Across all cases" tone="slate" icon={<FileStack className="h-4 w-4" />} />
        <KpiCard label="Verified" value={num(counts.verified)} sub={`${((counts.verified / Math.max(all.length, 1)) * 100).toFixed(1)}% of total`} tone="green" />
        <KpiCard label="Pending verification" value={num(counts.pending)} sub="Awaiting officer review" tone="amber" />
        <KpiCard label="Returned" value={num(counts.rejected)} sub="Need correction" tone="red" />
      </div>

      <Panel title="Document Register" subtitle={`${num(filtered.length)} documents`} dense>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<FileText className="h-9 w-9" />}
            title="No documents match"
            body="No document in the repository matches this search term and status filter. Try clearing the search or choosing a different verification status."
            action={
              <button type="button" onClick={() => { setQ(""); setStatus("all"); }} className="border border-[#0F2340] bg-[#0F2340] px-3 py-1.5 text-[12.5px] font-semibold text-white hover:bg-[#1A3560]">
                Clear filters
              </button>
            }
          />
        ) : (
          <DataTable
            dense
            maxHeight={620}
            rows={filtered.slice(0, 500)}
            rowKey={(d) => d.id}
            onRowClick={(d) => nav(`/land-admin/cases/${d.caseId}`)}
            columns={docColumns}
          />
        )}
      </Panel>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// Administration
// ═══════════════════════════════════════════════════════════════════════
export function AdministrationPage() {
  const offices = React.useMemo(() => {
    const m = new Map<string, { cases: number; delayed: number; officers: Set<string>; area: number }>();
    for (const c of CASES) {
      const r = m.get(c.responsibleOffice) ?? { cases: 0, delayed: 0, officers: new Set<string>(), area: 0 };
      r.cases += 1;
      if (c.stage === "delayed") r.delayed += 1;
      r.officers.add(c.revenueOfficer);
      r.area += c.areaHa;
      m.set(c.responsibleOffice, r);
    }
    return [...m.entries()].sort((a, b) => b[1].cases - a[1].cases);
  }, []);

  const officers = React.useMemo(() => {
    const m = new Map<string, { name: string; cases: number; delayed: number }>();
    for (const c of CASES) {
      const r = m.get(c.revenueOfficer) ?? { name: c.revenueOfficer, cases: 0, delayed: 0 };
      r.cases += 1;
      if (c.stage === "delayed") r.delayed += 1;
      m.set(c.revenueOfficer, r);
    }
    return [...m.values()].sort((a, b) => b.cases - a.cases);
  }, []);

  return (
    <div className="mx-auto max-w-[1680px] space-y-3 p-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Administration</h1>
        <p className="mt-0.5 text-[12.5px] text-slate-500">District office structure, caseload allocation and system configuration</p>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <Panel title={<span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-slate-400" />Revenue Offices</span>} subtitle="Caseload held by each office" dense>
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-100 text-left text-[10px] uppercase tracking-wide text-slate-600">
                <th className="px-4 py-2 font-semibold">Office</th>
                <th className="px-2 py-2 text-right font-semibold">Cases</th>
                <th className="px-2 py-2 text-right font-semibold">Delayed</th>
                <th className="px-2 py-2 text-right font-semibold">Area</th>
                <th className="px-4 py-2 text-right font-semibold">Officers</th>
              </tr>
            </thead>
            <tbody>
              {offices.map(([name, r], i) => (
                <tr key={name} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/40" : ""}`}>
                  <td className="px-4 py-2 text-slate-800">{name}</td>
                  <td className="px-2 py-2 text-right font-mono tabular-nums">{num(r.cases)}</td>
                  <td className="px-2 py-2 text-right font-mono tabular-nums text-red-700">{num(r.delayed)}</td>
                  <td className="px-2 py-2 text-right font-mono tabular-nums text-slate-600">{num(Math.round(r.area))}</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums text-slate-600">{r.officers.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title={<span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-slate-400" />Revenue Officers</span>} subtitle="Caseload and delay load per officer" dense>
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-100 text-left text-[10px] uppercase tracking-wide text-slate-600">
                <th className="px-4 py-2 font-semibold">Officer</th>
                <th className="px-2 py-2 text-right font-semibold">Cases</th>
                <th className="px-2 py-2 text-right font-semibold">Delayed</th>
                <th className="px-4 py-2 font-semibold">Load</th>
              </tr>
            </thead>
            <tbody>
              {officers.map((o, i) => (
                <tr key={o.name} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/40" : ""}`}>
                  <td className="px-4 py-2 text-slate-800">{o.name}</td>
                  <td className="px-2 py-2 text-right font-mono tabular-nums">{num(o.cases)}</td>
                  <td className="px-2 py-2 text-right font-mono tabular-nums text-red-700">{num(o.delayed)}</td>
                  <td className="px-4 py-2">
                    <div className="h-1.5 w-full bg-slate-100">
                      <div className="h-full bg-[#0F2340]" style={{ width: `${(o.cases / Math.max(officers[0].cases, 1)) * 100}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <Panel title={<span className="flex items-center gap-1.5"><Settings className="h-3.5 w-3.5 text-slate-400" />Statutory Configuration</span>} subtitle="Windows applied to every delay calculation in this system">
          <FieldGrid
            cols={2}
            items={[
              ["Base legislation", "Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013"],
              ["Preliminary notification", "Section 11(1) — individual notice to every affected person"],
              ["Declaration", "Section 19(1) — declaration of intended acquisition"],
              ["Award", "Section 23 — award enquiry and determination"],
              ["Payment", "Sections 31–33 — payment of compensation"],
              ["Possession", "Section 38 — taking of possession"],
            ]}
          />
        </Panel>

        <Panel title="System Configuration" subtitle="What this demo is, and what it is not">
          <FieldGrid
            cols={2}
            items={[
              ["Environment", <span className="font-semibold text-amber-700">DEMO — mock data</span>],
              ["Data source", "Generated in-browser from a fixed seed"],
              ["Persistence", "Document decisions and read markers, in this browser only"],
              ["Backend", "None — no live government database is connected"],
              ["Parcel geometry", "Synthetic demonstration polygons over a real Chengalpattu anchor"],
              ["Basemap", "OpenStreetMap · Esri World Imagery · OpenTopoMap"],
              ["Personal data", "None — all names, identifiers and amounts are invented"],
              ["Reset", "Use the reset control in the masthead"],
            ]}
          />
          <p className="mt-3 flex items-start gap-1.5 border-t border-slate-200 pt-2.5 text-[11px] leading-relaxed text-slate-500">
            <Tip label="Parcel polygons are generated by slicing a synthetic village boundary. Areas are computed from the drawn geometry, so the map and the register always agree.">
              <span className="cursor-help border-b border-dotted border-slate-400">How the map geometry is produced</span>
            </Tip>
            . Swapping this module's data layer for a real API is the intended next step; the screens are already written against a single boundary.
          </p>
        </Panel>
      </div>
    </div>
  );
}
