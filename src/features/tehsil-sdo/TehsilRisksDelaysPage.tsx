import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WORK_QUEUE, OWNERSHIP_DISCREPANCIES, PARCELS } from "./tehsilSdoData";

export default function TehsilRisksDelaysPage() {
  const overdue = WORK_QUEUE.filter((wq) => wq.status === "overdue");
  const ownershipIssues = OWNERSHIP_DISCREPANCIES.filter((d) => d.status !== "resolved");
  const missingDocs = PARCELS.filter((p) => p.documentsCount === 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Risks &amp; Delays</h1>
        <p className="text-sm text-muted-foreground">Identify overdue tasks, missing documents, and verification issues</p>
      </div>

      <div className="space-y-4">
        {overdue.length > 0 && (
          <Card className="border-red-200 shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-semibold text-red-800"><Badge className="bg-red-100 text-red-800">Overdue</Badge><span>({overdue.length})</span></CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {overdue.map((wq) => (
                  <div key={wq.id} className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50/50 p-3">
                    <div><p className="text-sm font-medium">{wq.parcelId}</p><p className="text-xs text-muted-foreground">{wq.projectName} &middot; {wq.parcelVillage}</p><p className="mt-1 text-xs text-red-700">{wq.task}</p></div>
                    <Badge className="bg-red-100 text-red-800">{wq.ageDays}d overdue</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {ownershipIssues.length > 0 && (
          <Card className="border-orange-200 shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-semibold text-orange-800"><Badge className="bg-orange-100 text-orange-800">Ownership Issues</Badge><span>({ownershipIssues.length})</span></CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ownershipIssues.map((d) => (
                  <div key={d.id} className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50/50 p-3">
                    <div><p className="text-sm font-medium">{d.parcelId}</p><p className="text-xs text-muted-foreground">{d.village} &middot; {d.issue}</p></div>
                    <Badge className="bg-orange-100 text-orange-800">{d.ageDays}d</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {missingDocs.length > 0 && (
          <Card className="shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#0F2340]"><Badge className="bg-amber-100 text-amber-800">Missing Documents</Badge><span>({missingDocs.length})</span></CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {missingDocs.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded border p-2">
                    <div><p className="text-xs font-medium">{p.ulpin}</p><p className="text-[10px] text-muted-foreground">{p.village} &middot; {p.ownerName}</p></div>
                    <Badge className="bg-gray-100 text-gray-700">{p.documentsCount} docs</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
