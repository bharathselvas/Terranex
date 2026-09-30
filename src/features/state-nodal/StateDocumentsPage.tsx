import { FileText, Download, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AUDIT_DATA } from "@/features/state-nodal/stateNodalData";

const DOC_ENTRIES = [
  { id: "doc-001", name: "Project Proposal — NH-544", project: "NH-544 Pune–Satara Expansion", district: "Pune", type: "Project Proposal", stage: "project_proposal", version: "v1.2", uploadedBy: "Shri. A. Deshmukh", date: "2026-03-15", status: "verified" },
  { id: "doc-002", name: "Land Requirement — Pune Ring Road", project: "Pune Ring Road Phase II", district: "Pune", type: "Land Requirement", stage: "land_requirement", version: "v1.0", uploadedBy: "NHAI", date: "2026-04-01", status: "verified" },
  { id: "doc-003", name: "GIS Footprint — Nagpur Metro", project: "Nagpur Metro Phase II", district: "Nagpur", type: "GIS Plan", stage: "gis_identification", version: "v1.1", uploadedBy: "Nagpur Metro Rail Corp", date: "2026-04-15", status: "verified" },
  { id: "doc-004", name: "SIA Report — Pune Ring Road", project: "Pune Ring Road Phase II", district: "Pune", type: "SIA Report", stage: "sia", version: "v0.3", uploadedBy: "SIA Expert Group — Pune", date: "2026-07-15", status: "pending" },
  { id: "doc-005", name: "Section 11 Notification — Nagpur Metro", project: "Nagpur Metro Phase II", district: "Nagpur", type: "Section 11 Notification", stage: "preliminary_notification", version: "v1.0", uploadedBy: "District Collector, Nagpur", date: "2026-08-30", status: "verified" },
  { id: "doc-006", name: "Award Order — Satara Bypass", project: "Satara Bypass Road", district: "Satara", type: "Award Order", stage: "award", version: "v1.0", uploadedBy: "District Collector, Satara", date: "2026-09-01", status: "verified" },
  { id: "doc-007", name: "Field Verification — Pune Metro", project: "Pune Metro Line 3", district: "Pune", type: "Verification Report", stage: "field_verification", version: "v1.0", uploadedBy: "Field Officer, Pune", date: "2026-08-26", status: "pending" },
  { id: "doc-008", name: "Project Charter — Nagpur Smart City", project: "Nagpur Smart City Corridor", district: "Nagpur", type: "Project Charter", stage: "project_proposal", version: "v1.0", uploadedBy: "Nagpur Smart City Ltd", date: "2026-04-01", status: "verified" },
];

export function StateDocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Document Repository</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">State-scoped documents across all projects</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Document</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Project</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">District</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Version</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Uploaded By</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {DOC_ENTRIES.map((d) => (
                  <tr key={d.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-medium text-[#0F2340]">{d.name}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{d.project}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{d.district}</td>
                    <td className="px-4 py-2.5"><Badge variant="secondary" className="text-[9px]">{d.type}</Badge></td>
                    <td className="px-4 py-2.5 text-muted-foreground">{d.version}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{d.uploadedBy}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{d.date}</td>
                    <td className="px-4 py-2.5 text-center">
                      <Badge className={`text-[9px] ${d.status === "verified" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{d.status}</Badge>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <div className="flex gap-1 justify-center">
                        <Button size="sm" variant="outline" className="h-7 text-[10px]"><Eye className="h-3 w-3 mr-1" /> View</Button>
                        <Button size="sm" variant="outline" className="h-7 text-[10px]"><Download className="h-3 w-3 mr-1" /> Download</Button>
                      </div>
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
