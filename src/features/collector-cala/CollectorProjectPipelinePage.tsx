import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DISTRICT_PROJECTS, type DistrictProject } from "./districtCollectorData";

const stageShort = (s: string) => {
  const m: Record<string, string> = {
    project_proposal: "Proposal", land_requirement: "Land Req", gis_identification: "GIS ID", submission: "Submission",
    scrutiny: "Scrutiny", sia: "SIA", preliminary_notification: "Prelim Ntf", public_disclosure: "Disclosure",
    objections_hearing: "Objections", declaration: "Declaration", field_verification: "FV",
    compensation: "Compensation", award: "Award", payment: "Payment", possession: "Possession", r_and_r: "R&R", closed: "Closed",
  };
  return m[s] ?? s;
};

const riskColor = (risk: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800", on_track: "bg-blue-100 text-blue-800" };
  return m[risk] ?? "bg-gray-100 text-gray-700";
};

const STAGE_ORDER = [
  "project_proposal", "land_requirement", "gis_identification", "submission", "scrutiny", "sia",
  "preliminary_notification", "public_disclosure", "objections_hearing", "declaration",
  "field_verification", "compensation", "award", "payment", "possession", "r_and_r", "closed",
];

export default function CollectorProjectPipelinePage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = DISTRICT_PROJECTS.filter(
    (p) => p.projectName.toLowerCase().includes(search.toLowerCase()) || p.projectCode.toLowerCase().includes(search.toLowerCase())
  );

  const selected = DISTRICT_PROJECTS.find((p) => p.id === selectedId);

  const byStage = STAGE_ORDER.map((stage) => ({
    stage,
    projects: filtered.filter((p) => p.currentStage === stage),
  })).filter((g) => g.projects.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Project Pipeline</h1>
        <p className="text-sm text-muted-foreground">All acquisition projects across Pune district</p>
      </div>

      <div className="flex gap-2">
        <Input placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-3 pb-4" style={{ minWidth: `${byStage.length * 260}px` }}>
          {byStage.map((group) => (
            <div key={group.stage} className="min-w-[240px] flex-1">
              <div className="mb-2 flex items-center justify-between rounded-t-lg bg-[#0F2340]/5 px-3 py-1.5">
                <p className="text-xs font-semibold text-[#0F2340]">{stageShort(group.stage)}</p>
                <Badge variant="outline" className="text-[10px]">{group.projects.length}</Badge>
              </div>
              <div className="space-y-2">
                {group.projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`w-full rounded-lg border p-2.5 text-left transition-colors ${
                      selectedId === p.id ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <p className="text-xs font-medium">{p.projectName}</p>
                    <p className="text-[10px] text-muted-foreground">{p.parcels} parcels</p>
                    <div className="mt-1 flex items-center justify-between">
                      <Badge className={`text-[10px] ${riskColor(p.risk)}`}>{p.risk}</Badge>
                      <span className="text-[10px] text-muted-foreground">{p.progress}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
                      <div className="h-1.5 rounded-full bg-[#0F2340]" style={{ width: `${p.progress}%` }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">{selected.projectName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              <div><p className="text-xs text-muted-foreground">Code</p><p className="text-sm font-medium">{selected.projectCode}</p></div>
              <div><p className="text-xs text-muted-foreground">RO/IA</p><p className="text-sm font-medium">{selected.roIa}</p></div>
              <div><p className="text-xs text-muted-foreground">Parcels</p><p className="text-sm font-medium">{selected.parcels}</p></div>
              <div><p className="text-xs text-muted-foreground">Area</p><p className="text-sm font-medium">{selected.areaHa.toLocaleString()} ha</p></div>
              <div><p className="text-xs text-muted-foreground">Budget</p><p className="text-sm font-medium">₹{selected.budgetCr.toLocaleString()} Cr</p></div>
              <div><p className="text-xs text-muted-foreground">Families</p><p className="text-sm font-medium">{selected.affectedFamilies.toLocaleString()}</p></div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">View Workspace</button>
              <button className="rounded-lg border border-[#0F2340] px-4 py-2 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5">View GIS</button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
