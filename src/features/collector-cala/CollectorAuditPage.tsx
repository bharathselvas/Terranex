import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AUDIT_DATA } from "./districtCollectorData";

export default function CollectorAuditPage() {
  const [search, setSearch] = useState("");

  const filtered = AUDIT_DATA.filter(
    (a) =>
      a.action.toLowerCase().includes(search.toLowerCase()) ||
      a.project.toLowerCase().includes(search.toLowerCase()) ||
      a.actor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Audit Trail</h1>
        <p className="text-sm text-muted-foreground">Immutable audit log — timestamp, actor, action, justification</p>
      </div>

      <Input placeholder="Search audit entries..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0F2340]">Audit Entries ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filtered.map((a) => (
              <div key={a.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">{a.action}</Badge>
                    {a.amount && <Badge className="bg-[#0F2340] text-white text-[10px]">{a.amount}</Badge>}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{a.timestamp}</span>
                </div>
                <p className="mt-1 text-xs font-medium">{a.project} {a.parcel ? `— ${a.parcel}` : ""}</p>
                <p className="text-xs text-muted-foreground">Actor: {a.actor} ({a.role})</p>
                <p className="text-[10px] text-muted-foreground">Stage: {a.previousStage} → {a.newStage}</p>
                <p className="mt-1 text-[10px] text-[#0F2340]">{a.justification}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
