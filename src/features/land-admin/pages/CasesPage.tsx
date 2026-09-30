// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Case register
// The district's working list. Search, eight independent filters and a date
// range, all applied client-side against the same 2,481-case array the
// dashboard reads — so a filter that shows 76 rows really is the 76 delayed
// cases the dashboard tile promised.
//
// Deep-linkable: the dashboard tiles arrive as ?status=delayed&priority=…
// and the table opens already filtered.
// ═══════════════════════════════════════════════════════════════════════

import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ClipboardList, Filter, ListFilter, RotateCcw, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ALL_TALUKS,
  ALL_VILLAGE_NAMES,
  CASES,
  STAGE_LABELS,
  fmtDate,
  inrCompact,
  num,
} from "../data";
import {
  CompensationPill,
  DataTable,
  EmptyState,
  Panel,
  PriorityPill,
  RnrPill,
  StagePill,
  CaseStatusPill,
} from "../components/ui";
import type { AcquisitionStage, CaseRecord } from "../lib/types";
import { COMPENSATION_LABELS, RNR_LABELS, VERIFICATION_LABELS } from "../lib/format";

const PAGE = 25;

const STAGE_ORDER: AcquisitionStage[] = [
  "draft", "submitted", "under_verification", "land_valuation", "award_processing",
  "compensation_approved", "compensation_paid", "rnr_assessment", "rnr_approved",
  "completed", "delayed",
];
const PRIORITIES = ["critical", "high", "medium", "low"] as const;
const ALL = "__all__";

interface Filters {
  query: string;
  taluk: string;
  village: string;
  status: string;
  stage: string;
  compensation: string;
  rnr: string;
  priority: string;
  verification: string;
  from: string;
  to: string;
}

const EMPTY: Filters = {
  query: "", taluk: ALL, village: ALL, status: ALL, stage: ALL, compensation: ALL,
  rnr: ALL, priority: ALL, verification: ALL, from: "", to: "",
};

export function CasesPage() {
  const [params, setParams] = useSearchParams();
  const nav = useNavigate();

  const [f, setF] = React.useState<Filters>(() => ({
    ...EMPTY,
    query: params.get("q") ?? "",
    taluk: params.get("taluk") ?? ALL,
    village: params.get("village") ?? ALL,
    status: params.get("status") ?? ALL,
    stage: params.get("stage") ?? ALL,
    compensation: params.get("compensation") ?? ALL,
    rnr: params.get("rnr") ?? ALL,
    priority: params.get("priority") ?? ALL,
    verification: params.get("verification") ?? ALL,
    from: params.get("from") ?? "",
    to: params.get("to") ?? "",
  }));
  const [page, setPage] = React.useState(0);
  const [showFilters, setShowFilters] = React.useState(true);

  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => {
    setF((prev) => ({ ...prev, [k]: v }));
    setPage(0);
  };

  // Keep the URL in step so a filtered view can be shared or reloaded.
  React.useEffect(() => {
    const next = new URLSearchParams();
    for (const [k, v] of Object.entries(f)) {
      if (v && v !== ALL && v !== "") next.set(k === "query" ? "q" : k, v);
    }
    setParams(next, { replace: true });
  }, [f, setParams]);

  const villageOptions = React.useMemo(
    () => (f.taluk === ALL ? ALL_VILLAGE_NAMES : ALL_VILLAGE_NAMES.filter((v) => CASES.some((c) => c.village === v && c.taluk === f.taluk))),
    [f.taluk],
  );

  const filtered = React.useMemo(() => {
    const q = f.query.trim().toLowerCase();
    return CASES.filter((c) => {
      if (f.taluk !== ALL && c.taluk !== f.taluk) return false;
      if (f.village !== ALL && c.village !== f.village) return false;
      if (f.status !== ALL && c.status !== f.status) return false;
      if (f.stage !== ALL && c.stage !== f.stage) return false;
      if (f.compensation !== ALL && c.compensationStatus !== f.compensation) return false;
      if (f.rnr !== ALL && c.rnrStatus !== f.rnr) return false;
      if (f.priority !== ALL && c.priority !== f.priority) return false;
      if (f.verification !== ALL && c.verification !== f.verification) return false;
      if (f.from && c.lastUpdated < f.from) return false;
      if (f.to && c.lastUpdated > f.to) return false;
      if (q) {
        const hay = `${c.caseNo} ${c.surveyNo} ${c.village} ${c.taluk} ${c.district} ${c.owner.name} ${c.responsibleOffice} ${c.revenueOfficer}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [f]);

  const shown = filtered.slice(page * PAGE, page * PAGE + PAGE);
  const activeFilters = Object.entries(f).filter(([k, v]) => k !== "query" && v && v !== ALL).length;
  const pages = Math.ceil(filtered.length / PAGE);

  const columns = [
    {
      key: "caseNo",
      header: "Case ID",
      width: "160px",
      sortable: (c: CaseRecord) => c.caseNo,
      cell: (c: CaseRecord) => (
        <Link to={`/land-admin/cases/${c.id}`} onClick={(e) => e.stopPropagation()} className="font-mono text-[12px] font-medium text-[#0F2340] hover:underline">
          {c.caseNo}
        </Link>
      ),
    },
    { key: "surveyNo", header: "Survey No.", width: "86px", sortable: (c: CaseRecord) => c.surveyNo, cell: (c: CaseRecord) => <span className="font-mono text-slate-700">{c.surveyNo}</span> },
    { key: "district", header: "District", width: "104px", sortable: (c: CaseRecord) => c.district, cell: (c: CaseRecord) => <span className="text-slate-700">{c.district}</span> },
    { key: "village", header: "Village", width: "130px", sortable: (c: CaseRecord) => c.village, cell: (c: CaseRecord) => <span className="text-slate-800">{c.village}</span> },
    { key: "areaHa", header: "Area", width: "72px", align: "right" as const, sortable: (c: CaseRecord) => c.areaHa, cell: (c: CaseRecord) => <span className="font-mono tabular-nums text-slate-700">{c.areaHa} ha</span> },
    { key: "stage", header: "Acquisition Stage", width: "140px", sortable: (c: CaseRecord) => c.stage, cell: (c: CaseRecord) => <StagePill stage={c.stage} short /> },
    { key: "compensationStatus", header: "Compensation", width: "126px", sortable: (c: CaseRecord) => c.compensationStatus, cell: (c: CaseRecord) => <CompensationPill status={c.compensationStatus} /> },
    { key: "rnrStatus", header: "R&R", width: "126px", sortable: (c: CaseRecord) => c.rnrStatus, cell: (c: CaseRecord) => <RnrPill status={c.rnrStatus} /> },
    { key: "pending", header: "Amount Pending", width: "104px", align: "right" as const, sortable: (c: CaseRecord) => c.compensation.pending, cell: (c: CaseRecord) => <span className={cn("font-mono tabular-nums", c.compensation.pending > 0 ? "text-slate-800" : "text-slate-400")}>{inrCompact(c.compensation.pending)}</span> },
    { key: "lastUpdated", header: "Last Updated", width: "96px", sortable: (c: CaseRecord) => c.lastUpdated, cell: (c: CaseRecord) => <span className="font-mono text-slate-600">{fmtDate(c.lastUpdated)}</span> },
    { key: "priority", header: "Priority", width: "86px", sortable: (c: CaseRecord) => PRIORITIES.indexOf(c.priority), cell: (c: CaseRecord) => <PriorityPill priority={c.priority} /> },
    { key: "status", header: "Status", width: "92px", sortable: (c: CaseRecord) => c.status, cell: (c: CaseRecord) => <CaseStatusPill status={c.status} /> },
  ];

  return (
    <div className="mx-auto max-w-[1680px] space-y-3 p-4">
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Case Register</h1>
          <p className="mt-0.5 text-[12.5px] text-slate-500">
            {num(filtered.length)} of {num(CASES.length)} cases
            {activeFilters > 0 && <span className="text-slate-400"> · {activeFilters} filter{activeFilters === 1 ? "" : "s"} applied</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 border px-2.5 py-1.5 text-[12px] font-medium",
              showFilters ? "border-[#0F2340] bg-[#0F2340] text-white" : "border-slate-300 text-slate-600",
            )}
          >
            <ListFilter className="h-3.5 w-3.5" /> Filters{activeFilters > 0 && ` (${activeFilters})`}
          </button>
          {activeFilters > 0 && (
            <button
              type="button"
              onClick={() => {
                setF(EMPTY);
                setPage(0);
              }}
              className="flex items-center gap-1.5 border border-slate-300 px-2.5 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-50"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" aria-hidden />
        <input
          value={f.query}
          onChange={(e) => set("query", e.target.value)}
          placeholder="Search case ID, survey number, village, taluk, landowner or office…"
          aria-label="Search cases"
          className="w-full border border-slate-300 bg-white py-2 pl-8 pr-8 text-[12.5px] placeholder:text-slate-400 focus:border-[#0F2340] focus:outline-none"
        />
        {f.query && (
          <button type="button" onClick={() => set("query", "")} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-2 gap-2 border border-slate-200 bg-white p-3 sm:grid-cols-3 lg:grid-cols-6">
          <Sel label="Taluk" value={f.taluk} onChange={(v) => { set("taluk", v); set("village", ALL); }} options={ALL_TALUKS} />
          <Sel label="Village" value={f.village} onChange={(v) => set("village", v)} options={villageOptions} />
          <Sel label="Acquisition stage" value={f.stage} onChange={(v) => set("stage", v)} options={STAGE_ORDER} labels={STAGE_LABELS} />
          <Sel label="Case status" value={f.status} onChange={(v) => set("status", v)} options={["active", "closed", "on_hold"]} labels={{ active: "Active", closed: "Closed", on_hold: "On Hold" }} />
          <Sel label="Compensation" value={f.compensation} onChange={(v) => set("compensation", v)} options={Object.keys(COMPENSATION_LABELS)} labels={COMPENSATION_LABELS} />
          <Sel label="R&R status" value={f.rnr} onChange={(v) => set("rnr", v)} options={Object.keys(RNR_LABELS)} labels={RNR_LABELS} />
          <Sel label="Priority" value={f.priority} onChange={(v) => set("priority", v)} options={[...PRIORITIES]} labels={{ critical: "Critical", high: "High", medium: "Medium", low: "Low" }} />
          <Sel label="Verification" value={f.verification} onChange={(v) => set("verification", v)} options={Object.keys(VERIFICATION_LABELS)} labels={VERIFICATION_LABELS} />
          <label className="block">
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-500">Updated from</span>
            <input type="date" value={f.from} onChange={(e) => set("from", e.target.value)} className="w-full border border-slate-300 bg-white px-2 py-1.5 text-[12px] focus:border-[#0F2340] focus:outline-none" />
          </label>
          <label className="block">
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-500">Updated to</span>
            <input type="date" value={f.to} onChange={(e) => set("to", e.target.value)} className="w-full border border-slate-300 bg-white px-2 py-1.5 text-[12px] focus:border-[#0F2340] focus:outline-none" />
          </label>
          <div className="flex items-end">
            <p className="pb-1.5 text-[10.5px] leading-tight text-slate-400">
              Filters apply to the full caseload, then to the page.
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      <Panel dense>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Filter className="h-9 w-9" />}
            title="No cases match these filters"
            body="Nothing in the district caseload matches the combination you have selected. Try widening the stage or status filter, or clearing the date range."
            action={
              <button
                type="button"
                onClick={() => {
                  setF(EMPTY);
                  setPage(0);
                }}
                className="border border-[#0F2340] bg-[#0F2340] px-3 py-1.5 text-[12.5px] font-semibold text-white hover:bg-[#1A3560]"
              >
                Clear all filters
              </button>
            }
          />
        ) : (
          <>
            <DataTable
              columns={columns}
              rows={shown}
              rowKey={(c) => c.id}
              onRowClick={(c) => nav(`/land-admin/cases/${c.id}`)}
              dense
              maxHeight={620}
            />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 px-3 py-2">
              <p className="text-[11.5px] text-slate-500">
                Showing <span className="font-mono">{num(page * PAGE + 1)}</span>–<span className="font-mono">{num(Math.min((page + 1) * PAGE, filtered.length))}</span> of{" "}
                <span className="font-mono font-semibold">{num(filtered.length)}</span>
                {pages > 1 && <span className="text-slate-400"> · page {page + 1} of {pages}</span>}
              </p>
              {pages > 1 && (
                <div className="flex items-center gap-1">
                  <PageBtn onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>Prev</PageBtn>
                  {pageNumbers(page, pages).map((n, i) =>
                    n === "…" ? (
                      <span key={`gap-${i}`} className="px-1 text-[11px] text-slate-400">…</span>
                    ) : (
                      <PageBtn key={n} onClick={() => setPage(n)} active={n === page}>{n + 1}</PageBtn>
                    ),
                  )}
                  <PageBtn onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={page >= pages - 1}>Next</PageBtn>
                </div>
              )}
            </div>
          </>
        )}
      </Panel>

      <p className="pb-1 text-center text-[10.5px] text-slate-400">
        <ClipboardList className="mr-1 inline h-3 w-3 align-[-1px]" aria-hidden />
        Synthetic caseload for SIH 2026 · no live government database is connected
      </p>
    </div>
  );
}

function pageNumbers(page: number, pages: number): Array<number | "…"> {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i);
  if (page < 4) return [0, 1, 2, 3, 4, "…", pages - 1];
  if (page > pages - 5) return [0, "…", pages - 5, pages - 4, pages - 3, pages - 2, pages - 1];
  return [0, "…", page - 1, page, page + 1, "…", pages - 1];
}

function PageBtn({ children, onClick, disabled, active }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; active?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "min-w-[26px] border px-1.5 py-1 text-[11.5px] font-medium",
        active ? "border-[#0F2340] bg-[#0F2340] text-white" : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50",
        disabled && "cursor-not-allowed opacity-40",
      )}
    >
      {children}
    </button>
  );
}

function Sel({
  label,
  value,
  onChange,
  options,
  labels,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  labels?: Record<string, string>;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full truncate border border-slate-300 bg-white px-2 py-1.5 text-[12px] focus:border-[#0F2340] focus:outline-none"
      >
        <option value={ALL}>All {label.toLowerCase()}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {labels?.[o] ?? o}
          </option>
        ))}
      </select>
    </label>
  );
}
