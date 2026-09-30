import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TEHSIL_PROJECTS } from "./tehsilSdoData";

const stageShort = (s: string) => {
  const m: Record<string, string> = {
    project_proposal: "Proposal", land_requirement: "Land Req", gis_identification: "GIS ID", submission: "Submission",
    scrutiny: "Scrutiny", sia: "SIA", preliminary_notification: "Prelim Ntf", public_disclosure: "Disclosure",
    objections_hearing: "Objections", declaration: "Declaration", field_verification: "FV",
    compensation: "Compensation", award: "Award", payment: "Payment", possession: "Possession", r_and_r: "R&R", closed: "Closed",
  };
  return m[s] ?? s;
};

const riskColor = (r: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800", on_track: "bg-blue-100 text-blue-800" };
  return m[r] ?? "bg-gray-100 text-gray-700";
};

export default function TehsilAssignedProjectsPage() {
  const [search, setSearch] = useState("");

  const filtered = TEHSIL_PROJECTS.filter(
    (p) => p.projectName.toLowerCase().includes(search.toLowerCase()) || p.projectCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Assigned Projects</h1>
        <p className="text-sm text-muted-foreground">Projects assigned to Haveli Tehsil by District Collector</p>
      </div>

      <Input placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />

      <div className="space-y-3">
        {filtered.map((p) => (
          <Card key={p.id} className="shadow-sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{p.projectName}</p>
                  <p className="text-xs text-muted-foreground">{p.projectCode} &middot; {p.roIa}</p>
                </div>
                <Badge className={riskColor(p.risk)}>{p.risk}</Badge>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
                <div><p className="text-[10px] text-muted-foreground">Villages</p><p className="text-xs font-medium">{p.villages.join(", ")}</p></div>
                <div><p className="text-[10px] text-muted-foreground">Parcels</p><p className="text-xs font-medium">{p.parcels}</p></div>
                <div><p className="text-[10px] text-muted-foreground">Stage</p><Badge variant="outline" className="text-[10px]">{stageShort(p.currentStage)}</Badge></div>
                <div><p className="text-[10px] text-muted-foreground">Field Tasks</p><p className="text-xs font-medium">{p.fieldTasks}</p></div>
                <div><p className="text-[10px] text-muted-foreground">Verification Pending</p><p className="text-xs font-medium">{p.verificationPending}</p></div>
                <div><p className="text-[10px] text-muted-foreground">Ownership Issues</p><p className="text-xs font-medium">{p.ownershipIssues}</p></div>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                <div className="h-1.5 rounded-full bg-[#0F2340]" style={{ width: `${p.progress}%` }} />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">Progress: {p.progress}% &middot; Last: {p.lastActivity}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
