import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PARCEL_REGISTER } from "./districtCollectorData";

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
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[r] ?? "bg-gray-100 text-gray-700";
};

export default function CollectorParcelRegisterPage() {
  const [search, setSearch] = useState("");

  const filtered = PARCEL_REGISTER.filter(
    (p) =>
      p.ulpin.toLowerCase().includes(search.toLowerCase()) ||
      p.village.toLowerCase().includes(search.toLowerCase()) ||
      p.projectName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Parcel Register</h1>
        <p className="text-sm text-muted-foreground">ULPIN-based parcel tracking with stage, compensation, and possession status</p>
      </div>

      <div className="flex gap-2">
        <Input placeholder="Search by ULPIN, village, project..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0F2340]">Parcels ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filtered.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{p.ulpin}</p>
                    <Badge className={`text-[10px] ${riskColor(p.risk)}`}>{p.risk}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.village}, {p.tehsil} &middot; {p.areaHa} ha</p>
                  <p className="text-[10px] text-muted-foreground">{p.projectName} &middot; Stage: {stageShort(p.currentStage)}</p>
                </div>
                <div className="ml-4 flex flex-col items-end gap-1">
                  <Badge className={`text-[10px] ${
                    p.ownerVerification === "verified" ? "bg-emerald-100 text-emerald-800" : p.ownerVerification === "discrepancy" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"
                  }`}>
                    Owner: {p.ownerVerification}
                  </Badge>
                  <Badge className={`text-[10px] ${
                    p.compensation === "paid" ? "bg-emerald-100 text-emerald-800" : p.compensation === "none" ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-800"
                  }`}>
                    Comp: {p.compensation}
                  </Badge>
                  <Badge className={`text-[10px] ${
                    p.possession === "recorded" ? "bg-emerald-100 text-emerald-800" : p.possession === "none" ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-800"
                  }`}>
                    Possession: {p.possession}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
