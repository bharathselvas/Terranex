import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Plus, LayoutGrid, List } from "lucide-react";
import { useCaseStore } from "@/stores/caseStore";
import { useSessionStore } from "@/stores/sessionStore";
import { jurisdictionFilter } from "@/types/rbac";
import { STAGES } from "@/lib/stages";
import { formatDate } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function slaVariant(s: string | null) {
  if (s === "overdue") return "danger" as const;
  if (s === "due_soon") return "warning" as const;
  if (s === "on_track") return "success" as const;
  return "muted" as const;
}

export function CaseListPage() {
  const navigate = useNavigate();
  const { roleId } = useSessionStore();
  const { cases, query, stageFilter, districtFilter, setQuery, setStageFilter, setDistrictFilter } = useCaseStore();

  const districts = useMemo(() => Array.from(new Set(cases.map((c) => c.jurisdiction.district))).sort(), [cases]);

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      // Jurisdiction — shared registry, filtered by role scope (SC-09 style shared record, scoped visibility).
      const jf = jurisdictionFilter(roleId, c);
      if (!jf.visible) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!c.caseNo.toLowerCase().includes(q) && !c.title.toLowerCase().includes(q) && !c.jurisdiction.village.toLowerCase().includes(q))
          return false;
      }
      if (stageFilter !== "all" && c.stage !== stageFilter) return false;
      if (districtFilter !== "all" && c.jurisdiction.district !== districtFilter) return false;
      return true;
    });
  }, [cases, query, stageFilter, districtFilter, roleId]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Acquisition Cases</h1>
          <p className="text-xs text-muted-foreground">
            {filtered.length} of {cases.length} cases · shared registry · filtered by {roleId.replace(/_/g, " ")} jurisdiction
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" disabled title="Mock — creation flow in a later build">
            <Plus className="mr-1 h-3.5 w-3.5" /> New Proposal
          </Button>
        </div>
      </div>

      {/* Filters row: search + stage + district + view toggle (placeholder) */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search case no, village, title…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-8" />
        </div>
        <Select value={stageFilter} onValueChange={(v) => setStageFilter(v as never)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            {STAGES.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={districtFilter} onValueChange={(v) => setDistrictFilter(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All districts</SelectItem>
            {districts.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* View toggle — stub, keeps row layout per spec even when unimplemented */}
        <span className="ml-auto hidden items-center gap-1 rounded-md border bg-white p-0.5 sm:inline-flex" aria-label="View toggle (mock)">
          <span className="rounded bg-slate-900 px-2 py-1 text-white" title="List view (active)">
            <List className="h-4 w-4" />
          </span>
          <span className="rounded px-2 py-1 text-slate-500" title="Grid view (later)">
            <LayoutGrid className="h-4 w-4" />
          </span>
        </span>
      </div>

      {/* Desktop table — Case No | Project | Jurisdiction | Stage | Parcels | Updated | SLA */}
      <div className="hidden overflow-hidden rounded-lg border bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Case No</th>
                <th className="px-3 py-2 text-left font-medium">Project</th>
                <th className="px-3 py-2 text-left font-medium">Jurisdiction</th>
                <th className="px-3 py-2 text-left font-medium">Stage</th>
                <th className="px-3 py-2 text-right font-medium">Parcels</th>
                <th className="px-3 py-2 text-left font-medium">Updated</th>
                <th className="px-3 py-2 text-left font-medium">SLA</th>
                <th className="px-3 py-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => navigate(`/app/cases/${c.id}`)}
                >
                  <td className="px-3 py-2.5">
                    <Link
                      to={`/app/cases/${c.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="gov-mono text-[#0F2340] hover:underline"
                    >
                      {c.caseNo}
                    </Link>
                  </td>
                  <td className="max-w-[280px] px-3 py-2.5">
                    <Link
                      to={`/app/cases/${c.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="line-clamp-1 font-medium text-slate-800 hover:text-[#0F2340]"
                    >
                      {c.title}
                    </Link>
                    <span className="text-xs text-muted-foreground">{c.projectId}</span>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-slate-600">
                    {c.jurisdiction.district} · {c.jurisdiction.tehsil}
                    <br />
                    <span className="text-muted-foreground">{c.jurisdiction.village}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <Badge variant="secondary" className="text-[11px] capitalize">
                      {c.stage.replace(/_/g, " ")}
                    </Badge>
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{c.parcelsCount}</td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground">{formatDate(c.updatedAt)}</td>
                  <td className="px-3 py-2.5">
                    <Badge variant={slaVariant(c.slaStatus)} className="text-[11px]">
                      {c.slaStatus ? c.slaStatus.replace("_", " ") : "—"}
                    </Badge>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/cases/${c.id}`);
                      }}
                    >
                      Open
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-10 text-center text-sm text-muted-foreground">
                    No cases match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards — whole card navigates */}
      <div className="grid gap-2 md:hidden">
        {filtered.map((c) => (
          <Link key={c.id} to={`/app/cases/${c.id}`} className="rounded-lg border bg-white p-3">
            <p className="gov-mono text-[#0F2340]">{c.caseNo}</p>
            <p className="text-sm font-medium text-slate-800">{c.title}</p>
            <p className="text-xs text-muted-foreground">
              {c.jurisdiction.district} · {c.jurisdiction.tehsil} · {c.jurisdiction.village} · {c.parcelsCount} parcels
            </p>
            <div className="mt-2 flex gap-1.5">
              <Badge variant="secondary" className="text-[11px]">
                {c.stage.replace(/_/g, " ")}
              </Badge>
              <Badge variant={slaVariant(c.slaStatus)} className="text-[11px]">
                {c.slaStatus ?? "—"}
              </Badge>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && <p className="rounded-lg border bg-white p-6 text-center text-sm text-muted-foreground">No cases.</p>}
      </div>
    </div>
  );
}
