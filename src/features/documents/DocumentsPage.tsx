import { FileText, ShieldCheck, Clock } from "lucide-react";
import { MOCK_DOCUMENTS } from "@/mocks/audit";
import { formatDate, stageLabel } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DocumentsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Documents</h1>
        <p className="text-xs text-muted-foreground">
          Stage-gated vault — every file is tied to a case, stage, and uploader role. Verification in a later build.
        </p>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4" /> Vault — {MOCK_DOCUMENTS.length} documents (mock)
          </CardTitle>
          <CardDescription>Verification, retention, and audit linkage enforced per stage (future).</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Document</th>
                  <th className="px-3 py-2 text-left font-medium">Case</th>
                  <th className="px-3 py-2 text-left font-medium">Stage</th>
                  <th className="px-3 py-2 text-left font-medium">Uploaded by</th>
                  <th className="px-3 py-2 text-left font-medium">Date</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {MOCK_DOCUMENTS.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2.5">
                      <span className="line-clamp-1 font-medium text-slate-800">{d.title}</span>
                      <span className="gov-mono text-muted-foreground">
                        {d.fileName} · {d.sizeKb} KB
                      </span>
                    </td>
                    <td className="gov-mono px-3 py-2.5 text-xs">{d.caseId}</td>
                    <td className="px-3 py-2.5 text-xs">{stageLabel(d.stage)}</td>
                    <td className="px-3 py-2.5 text-xs">
                      {d.uploadedBy} <span className="text-muted-foreground">· {d.uploadedByRole.replace(/_/g, " ")}</span>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground">{formatDate(d.date)}</td>
                    <td className="px-3 py-2.5">
                      {d.verified ? (
                        <Badge variant="success" className="gap-1 text-[11px]">
                          <ShieldCheck className="h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="warning" className="gap-1 text-[11px]">
                          <Clock className="h-3 w-3" /> Pending
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
