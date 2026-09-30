import { MessageSquareWarning, Search } from "lucide-react";
import { MOCK_GRIEVANCES } from "@/mocks/audit";
import { formatDate } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

function statusVariant(s: string) {
  if (s === "escalated") return "danger" as const;
  if (s === "in_progress") return "warning" as const;
  if (s === "open") return "info" as const;
  if (s === "resolved" || s === "closed") return "success" as const;
  return "secondary" as const;
}

export function GrievancesPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q.trim()) return MOCK_GRIEVANCES;
    const s = q.toLowerCase();
    return MOCK_GRIEVANCES.filter(
      (g) => g.subject.toLowerCase().includes(s) || g.filedBy.toLowerCase().includes(s) || g.category.toLowerCase().includes(s) || g.status.toLowerCase().includes(s),
    );
  }, [q]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Grievances</h1>
          <p className="text-xs text-muted-foreground">Citizen grievances linked to cases — routed by category to the owning role.</p>
        </div>
        <Badge variant="outline" className="font-mono text-[11px]">
          {filtered.length} grievances
        </Badge>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <MessageSquareWarning className="h-4 w-4 text-slate-500" /> Register (mock)
          </CardTitle>
          <CardDescription>Escalation, assignment, and resolution workflow wired in a later build.</CardDescription>
          <div className="relative mt-3 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search grievance, landholder, category…" value={q} onChange={(e) => setQ(e.target.value)} className="h-9 pl-8" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Subject</th>
                  <th className="px-3 py-2 text-left font-medium">Filed by</th>
                  <th className="px-3 py-2 text-left font-medium">Case</th>
                  <th className="px-3 py-2 text-left font-medium">Category</th>
                  <th className="px-3 py-2 text-left font-medium">Assigned to</th>
                  <th className="px-3 py-2 text-left font-medium">Date</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50">
                    <td className="max-w-[360px] px-3 py-2.5">
                      <span className="line-clamp-1 text-sm font-medium text-slate-800">{g.subject}</span>
                      <span className="gov-mono text-[11px] text-muted-foreground">{g.id}</span>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-700">{g.filedBy}</td>
                    <td className="gov-mono px-3 py-2.5 text-xs">{g.caseId ?? "—"}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant="secondary" className="text-[11px] capitalize">
                        {g.category}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground">{g.assignedTo ? g.assignedTo.replace(/_/g, " ") : "—"}</td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground">{formatDate(g.date)}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant={statusVariant(g.status)} className="text-[11px] capitalize">
                        {g.status.replace(/_/g, " ")}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-3 py-10 text-center text-sm text-muted-foreground">
                      No grievances match “{q}”.
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
