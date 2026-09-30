import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { DISTRICT_PROJECTS, DISTRICT_PROFILE } from "./districtCollectorData";

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

export default function CollectorProjectWorkspacePage() {
  const projects = DISTRICT_PROJECTS;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Project Workspace</h1>
        <p className="text-sm text-muted-foreground">{DISTRICT_PROFILE.name} District &middot; All projects by stage</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {projects.map((p) => {
          const currentIdx = STAGE_ORDER.indexOf(p.currentStage);
          return (
            <Card key={p.id} className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm font-semibold text-[#0F2340]">
                  <span className="truncate">{p.projectName}</span>
                  <Badge className={`text-[10px] ${riskColor(p.risk)}`}>{p.risk}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">RO/IA:</span>
                    <span className="font-medium">{p.roIa}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Stage:</span>
                    <Badge variant="outline" className="text-[10px]">{stageShort(p.currentStage)}</Badge>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Parcels:</span>
                    <span className="font-medium">{p.parcels}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-medium">₹{p.budgetCr.toLocaleString()} Cr</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-[#0F2340]" style={{ width: `${p.progress}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Progress</span>
                    <span>{p.progress}%</span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {STAGE_ORDER.map((s, i) => (
                      <div
                        key={s}
                        className={`h-1.5 w-3 rounded-sm ${
                          i < currentIdx ? "bg-[#0F2340]" : i === currentIdx ? "bg-[#0F2340] ring-1 ring-[#0F2340]" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-1 pt-2">
                    <Link to={`/app/collector/pipeline`} className="rounded bg-[#0F2340] px-2 py-1 text-[10px] text-white hover:bg-[#1a3560]">Pipeline</Link>
                    <Link to={`/app/collector/gis`} className="rounded border border-[#0F2340] px-2 py-1 text-[10px] text-[#0F2340] hover:bg-[#0F2340]/5">GIS</Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
