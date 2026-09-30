import { useState } from "react";
import { FileText, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MINISTRY_DOCUMENTS } from "@/features/ministry/ministryData";
import { stageLabel, formatDate } from "@/lib/format";

const STATUS_COLORS: Record<string, string> = {
  verified: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  rejected: "bg-red-100 text-red-800",
};

export function MinistryDocumentsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const docTypes = [...new Set(MINISTRY_DOCUMENTS.map((d) => d.documentType))].sort();

  const filtered = MINISTRY_DOCUMENTS.filter((d) => {
    const matchSearch = !search || d.documentName.toLowerCase().includes(search.toLowerCase()) || d.project.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || d.documentType === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Document Repository</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            MoRTH project documents — proposals, reports, notifications, awards
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="all">All Types</option>
              {docTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Document Name</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Project</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Type</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Stage</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-700">Version</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Uploaded By</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Date</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc) => (
                  <tr key={doc.id} className="border-b last:border-0 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-[#0F2340] flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-500 shrink-0" />
                      <span className="truncate max-w-[250px]">{doc.documentName}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-[11px]">{doc.project}</td>
                    <td className="px-4 py-3 text-slate-600 text-[11px]">{doc.documentType}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="text-[10px]">{stageLabel(doc.stage)}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center text-[11px]">{doc.version}</td>
                    <td className="px-4 py-3 text-slate-600 text-[11px]">{doc.uploadedBy}</td>
                    <td className="px-4 py-3 text-slate-600 text-[11px]">{formatDate(doc.uploadedDate)}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={`text-[10px] ${STATUS_COLORS[doc.status]}`}>{doc.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No documents match your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
