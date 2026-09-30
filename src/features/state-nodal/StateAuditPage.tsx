import { useState } from "react";
import { ScrollText, Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AUDIT_DATA } from "@/features/state-nodal/stateNodalData";
import { formatDate } from "@/lib/format";

export function StateAuditPage() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = AUDIT_DATA.filter((a) => {
    if (!search) return true;
    return a.action.toLowerCase().includes(search.toLowerCase()) || a.actor.toLowerCase().includes(search.toLowerCase()) || a.project.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Audit Trail</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">State-scoped audit history — cannot be edited or deleted</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-[11px] text-blue-800">
        Audit history is immutable. All actions are recorded with timestamp, actor, and justification.
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
        <input type="text" placeholder="Search audit events..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-md border bg-white pl-9 pr-3 py-2 text-sm" />
      </div>

      <div className="space-y-2">
        {filtered.map((a) => (
          <Card key={a.id} className="hover:bg-slate-50 transition-colors">
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-3 cursor-pointer" onClick={() => setExpandedId(expandedId === a.id ? null : a.id)}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-[#0F2340]">{a.action}</p>
                    <Badge variant="secondary" className="text-[9px]">{a.role}</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {a.actor} · {a.project} · {a.district} · {formatDate(a.timestamp.slice(0, 10))}
                  </p>
                  {a.previousState !== "—" && (
                    <p className="text-[11px] text-muted-foreground">{a.previousState} → {a.newState}</p>
                  )}
                </div>
                <div className="shrink-0">
                  {expandedId === a.id ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </div>
              </div>
              {expandedId === a.id && (
                <div className="mt-3 p-3 bg-slate-50 rounded text-[11px] space-y-1 border-t">
                  <p><span className="font-medium text-slate-700">Actor:</span> {a.actor}</p>
                  <p><span className="font-medium text-slate-700">Role:</span> {a.role}</p>
                  <p><span className="font-medium text-slate-700">Timestamp:</span> {a.timestamp}</p>
                  <p><span className="font-medium text-slate-700">Action:</span> {a.action}</p>
                  <p><span className="font-medium text-slate-700">Justification:</span> {a.justification}</p>
                  <p><span className="font-medium text-slate-700">Project:</span> {a.project}</p>
                  <p><span className="font-medium text-slate-700">District:</span> {a.district}</p>
                  {a.previousState !== "—" && <p><span className="font-medium text-slate-700">State Change:</span> {a.previousState} → {a.newState}</p>}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
