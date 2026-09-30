import { useState } from "react";
import {
  Search,
  Download,
  Eye,
  Clock,
  FileText,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ADMIN_DOCUMENTS } from "@/features/admin/adminData";
import { formatDate } from "@/lib/format";

const DOC_TYPES = [...new Set(ADMIN_DOCUMENTS.map((d) => d.documentType))].sort();
const STATUS_VARIANT: Record<string, "success" | "warning" | "danger"> = {
  verified: "success",
  pending: "warning",
  rejected: "danger",
};

export function DocumentRepositoryPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDoc, setSelectedDoc] = useState<typeof ADMIN_DOCUMENTS[0] | null>(null);

  const filtered = ADMIN_DOCUMENTS.filter((d) => {
    if (search && !d.documentName.toLowerCase().includes(search.toLowerCase()) && !d.project.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== "all" && d.documentType !== typeFilter) return false;
    if (statusFilter !== "all" && d.status !== statusFilter) return false;
    return true;
  });

  const verified = ADMIN_DOCUMENTS.filter((d) => d.status === "verified").length;
  const pending = ADMIN_DOCUMENTS.filter((d) => d.status === "pending").length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Document Repository</h1>
          <p className="text-xs text-muted-foreground">National document browser — all project documents across stages</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Total Documents</p>
              <FileText className="h-4 w-4 text-slate-500" />
            </div>
            <p className="mt-1 text-2xl font-bold text-[#0F2340]">{ADMIN_DOCUMENTS.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Verified</p>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="mt-1 text-2xl font-bold text-emerald-600">{verified}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Pending</p>
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <p className="mt-1 text-2xl font-bold text-amber-600">{pending}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px] h-9 text-sm">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {DOC_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] h-9 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Document</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Project</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Type</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Stage</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Uploaded By</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Version</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Date</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedDoc(doc)}>
                    <td className="px-3 py-2.5">
                      <p className="font-medium text-slate-800 max-w-[250px] truncate">{doc.documentName}</p>
                      <p className="text-[11px] text-muted-foreground gov-mono">{doc.id}</p>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-700 max-w-[150px] truncate">{doc.project}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant="secondary" className="text-[10px]">{doc.documentType}</Badge>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-700">{doc.stage.replace(/_/g, " ")}</td>
                    <td className="px-3 py-2.5 text-xs text-slate-700">{doc.uploadedBy}</td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground gov-mono">{doc.version}</td>
                    <td className="px-3 py-2.5 text-[11px] text-muted-foreground">{formatDate(doc.uploadedDate)}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant={STATUS_VARIANT[doc.status]} className="text-[10px] capitalize">{doc.status}</Badge>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detail dialog */}
      <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-sm">{selectedDoc?.documentName}</DialogTitle>
          </DialogHeader>
          {selectedDoc && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] text-muted-foreground">Project</p>
                  <p className="font-medium">{selectedDoc.project}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Document Type</p>
                  <Badge variant="secondary">{selectedDoc.documentType}</Badge>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Stage</p>
                  <p className="font-medium">{selectedDoc.stage.replace(/_/g, " ")}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Status</p>
                  <Badge variant={STATUS_VARIANT[selectedDoc.status]} className="capitalize">{selectedDoc.status}</Badge>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Uploaded By</p>
                  <p className="font-medium">{selectedDoc.uploadedBy}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Version</p>
                  <p className="font-medium gov-mono">{selectedDoc.version}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Upload Date</p>
                  <p className="font-medium">{formatDate(selectedDoc.uploadedDate)}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-3.5 w-3.5 mr-1" /> View Document
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-3.5 w-3.5 mr-1" /> Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
