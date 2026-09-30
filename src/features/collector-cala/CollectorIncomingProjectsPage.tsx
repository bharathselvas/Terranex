import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { INCOMING_PROJECTS, SCRUTINY_CHECKLISTS, type IncomingProject } from "./districtCollectorData";

const statusLabels: Record<string, string> = {
  received: "Received",
  under_scrutiny: "Under Scrutiny",
  clarification_required: "Clarification Required",
  accepted: "Accepted",
  returned: "Returned",
};

const statusColors: Record<string, string> = {
  received: "bg-blue-100 text-blue-800",
  under_scrutiny: "bg-amber-100 text-amber-800",
  clarification_required: "bg-orange-100 text-orange-800",
  accepted: "bg-emerald-100 text-emerald-800",
  returned: "bg-red-100 text-red-800",
};

const priorityColor = (p: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[p] ?? "bg-gray-100 text-gray-700";
};

export default function IncomingProjectsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = INCOMING_PROJECTS.filter(
    (p) =>
      p.projectName.toLowerCase().includes(search.toLowerCase()) ||
      p.projectCode.toLowerCase().includes(search.toLowerCase()) ||
      p.roIa.toLowerCase().includes(search.toLowerCase())
  );

  const project = INCOMING_PROJECTS.find((p) => p.id === selected);
  const checklist = SCRUTINY_CHECKLISTS.find((sc) => sc.projectId === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Incoming Projects</h1>
        <p className="text-sm text-muted-foreground">Review project submission packages from RO/IA</p>
      </div>

      <div className="flex gap-2">
        <Input placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Projects ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selected === p.id ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{p.projectName}</p>
                    <Badge className={priorityColor(p.priority)}>{p.priority}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.projectCode} &middot; {p.roIa}</p>
                  <p className="text-xs text-muted-foreground">{p.estimatedParcels} parcels &middot; {p.areaHa.toLocaleString()} ha</p>
                  <Badge className={`mt-1 ${statusColors[p.status]}`}>{statusLabels[p.status]}</Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Scrutiny Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            {project && checklist ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{project.projectName}</p>
                  <p className="text-xs text-muted-foreground">Submitted: {project.submittedDate}</p>
                </div>
                <div className="space-y-2">
                  {checklist.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border p-2">
                      <div className={`mt-0.5 h-3 w-3 rounded-full ${
                        item.status === "complete" ? "bg-emerald-500" : item.status === "warning" ? "bg-amber-500" : "bg-red-500"
                      }`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium">{item.label}</p>
                        <p className="text-[10px] text-muted-foreground">Evidence: {item.evidence}</p>
                        <p className="text-[10px] text-muted-foreground">Remarks: {item.remarks}</p>
                      </div>
                      <Badge variant="outline" className={`text-[10px] ${
                        item.status === "complete" ? "border-emerald-300 text-emerald-700" : item.status === "warning" ? "border-amber-300 text-amber-700" : "border-red-300 text-red-700"
                      }`}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.status === "under_scrutiny" && (
                    <>
                      <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Accept Project</button>
                      <button className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50">Return to RO/IA</button>
                      <button className="rounded-lg border border-amber-300 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50">Request Clarification</button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                Select a project to view scrutiny checklist
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
