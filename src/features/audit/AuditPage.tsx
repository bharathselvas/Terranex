import { ScrollText, ShieldCheck, Search } from "lucide-react";
import { useCaseStore } from "@/stores/caseStore";
import { MOCK_AUDIT } from "@/mocks/audit";
import { formatDateTime } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

export function AuditPage() {
  const { audit } = useCaseStore();
  const [q, setQ] = useState("");

  const merged = useMemo(() => {
    const ids = new Set(audit.map((a) => a.id));
    const extra = MOCK_AUDIT.filter((a) => !ids.has(a.id));
    return [...audit, ...extra].sort((a, b) => b.at.localeCompare(a.at));
  }, [audit]);

  const filtered = useMemo(() => {
    if (!q.trim()) return merged;
    const s = q.toLowerCase();
    return merged.filter(
      (e) => e.action.toLowerCase().includes(s) || e.actorName.toLowerCase().includes(s) || e.caseId.toLowerCase().includes(s) || e.actorRole.toLowerCase().includes(s),
    );
  }, [merged, q]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Audit</h1>
          <p className="text-xs text-muted-foreground">
            Immutable, stage-linked audit — every mutation writes an event with actor, role, jurisdiction, and IP.
          </p>
        </div>
        <Badge variant="outline" className="gap-1.5 font-mono text-[11px]">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> {filtered.length} events
        </Badge>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <ScrollText className="h-4 w-4 text-slate-500" /> All events — shared ledger
          </CardTitle>
          <CardDescription>Same ledger visible to every role; filtered by jurisdiction in a later build. Search filters locally (mock).</CardDescription>
          <div className="relative mt-3 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search action, actor, case, role…" value={q} onChange={(e) => setQ(e.target.value)} className="h-9 pl-8" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">When</th>
                  <th className="px-3 py-2 text-left font-medium">Case</th>
                  <th className="px-3 py-2 text-left font-medium">Actor</th>
                  <th className="px-3 py-2 text-left font-medium">Action</th>
                  <th className="px-3 py-2 text-left font-medium">Stage</th>
                  <th className="hidden px-3 py-2 text-left font-medium lg:table-cell">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-3 py-2.5 text-xs text-slate-700">{formatDateTime(e.at)}</td>
                    <td className="gov-mono px-3 py-2.5 text-xs">{e.caseId}</td>
                    <td className="px-3 py-2.5">
                      <span className="text-xs font-medium text-slate-800">{e.actorName}</span>
                      <span className="block text-[11px] text-muted-foreground">{e.actorRole.replace(/_/g, " ")}</span>
                    </td>
                    <td className="max-w-[420px] px-3 py-2.5">
                      <span className="line-clamp-2 text-xs text-slate-800">{e.action}</span>
                      {e.before && e.after && <span className="gov-mono text-[11px] text-muted-foreground">{e.before} → {e.after}</span>}
                    </td>
                    <td className="px-3 py-2.5">
                      {e.stage ? (
                        <Badge variant="secondary" className="text-[11px]">
                          {e.stage.replace(/_/g, " ")}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="gov-mono hidden px-3 py-2.5 text-xs text-muted-foreground lg:table-cell">{e.ip}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-10 text-center text-sm text-muted-foreground">
                      No events match “{q}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
