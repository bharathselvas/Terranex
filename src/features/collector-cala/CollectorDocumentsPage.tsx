import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DISTRICT_PROJECTS, PARCEL_REGISTER } from "./districtCollectorData";

const stageShort = (s: string) => {
  const m: Record<string, string> = {
    project_proposal: "Proposal", land_requirement: "Land Req", gis_identification: "GIS ID", submission: "Submission",
    scrutiny: "Scrutiny", sia: "SIA", preliminary_notification: "Prelim Ntf", public_disclosure: "Disclosure",
    objections_hearing: "Objections", declaration: "Declaration", field_verification: "FV",
    compensation: "Compensation", award: "Award", payment: "Payment", possession: "Possession", r_and_r: "R&R", closed: "Closed",
  };
  return m[s] ?? s;
};

export default function CollectorDocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">District Documents</h1>
        <p className="text-sm text-muted-foreground">Project documents, certificates, notifications, and statutory records</p>
      </div>

      {DISTRICT_PROJECTS.map((p) => (
        <Card key={p.id} className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">{p.projectName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
              {[
                { name: "Project Proposal", type: "proposal", status: "uploaded" },
                { name: "GIS Footprint", type: "gis", status: p.currentStage !== "project_proposal" ? "uploaded" : "pending" },
                { name: "SIA Report", type: "sia", status: ["sia", "preliminary_notification", "public_disclosure", "objections_hearing", "declaration", "field_verification", "compensation", "award", "payment", "possession", "r_and_r", "closed"].includes(p.currentStage) ? "uploaded" : "pending" },
                { name: "Section 11 Notification", type: "notification", status: ["preliminary_notification", "public_disclosure", "objections_hearing", "declaration", "field_verification", "compensation", "award", "payment", "possession", "r_and_r", "closed"].includes(p.currentStage) ? "uploaded" : "pending" },
                { name: "Parcel Register", type: "register", status: p.currentStage !== "project_proposal" ? "uploaded" : "pending" },
                { name: "Declaration", type: "declaration", status: ["declaration", "field_verification", "compensation", "award", "payment", "possession", "r_and_r", "closed"].includes(p.currentStage) ? "uploaded" : "pending" },
              ].map((doc) => (
                <div key={doc.name} className="rounded border p-2">
                  <p className="text-[10px] font-medium">{doc.name}</p>
                  <Badge className={`mt-1 text-[10px] ${doc.status === "uploaded" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700"}`}>
                    {doc.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0F2340]">Parcel Register ({PARCEL_REGISTER.length} parcels)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {PARCEL_REGISTER.map((pr) => (
              <div key={pr.id} className="flex items-center justify-between rounded border p-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium">{pr.ulpin} &middot; {pr.village}</p>
                  <p className="text-[10px] text-muted-foreground">{pr.projectName} &middot; {pr.areaHa} ha &middot; {stageShort(pr.currentStage)}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={`text-[10px] ${
                    pr.ownerVerification === "verified" ? "bg-emerald-100 text-emerald-800" : pr.ownerVerification === "discrepancy" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"
                  }`}>
                    {pr.ownerVerification}
                  </Badge>
                  <Badge className={`text-[10px] ${
                    pr.compensation === "paid" ? "bg-emerald-100 text-emerald-800" : pr.compensation === "none" ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-800"
                  }`}>
                    {pr.compensation}
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
