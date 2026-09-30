import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PARCELS } from "./tehsilSdoData";

const stageShort = (s: string) => {
  const m: Record<string, string> = {
    project_proposal: "Proposal", land_requirement: "Land Req", gis_identification: "GIS ID", submission: "Submission",
    scrutiny: "Scrutiny", sia: "SIA", preliminary_notification: "Prelim Ntf", public_disclosure: "Disclosure",
    objections_hearing: "Objections", declaration: "Declaration", field_verification: "FV",
    compensation: "Compensation", award: "Award", payment: "Payment", possession: "Possession", r_and_r: "R&R", closed: "Closed",
  };
  return m[s] ?? s;
};

export default function TehsilParcelWorkspacePage() {
  const parcel = PARCELS[0]; // MH-PN-004821

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Parcel Workspace</h1>
        <p className="text-sm text-muted-foreground">{parcel.ulpin} &middot; {parcel.village}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Land Information</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Parcel ID</span><span className="font-medium">{parcel.ulpin}</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Area</span><span className="font-medium">{parcel.areaHa} ha</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Village</span><span className="font-medium">{parcel.village}</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Tehsil</span><span className="font-medium">Haveli</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">District</span><span className="font-medium">Pune</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Stage</span><Badge variant="outline" className="text-[10px]">{stageShort(parcel.currentStage)}</Badge></div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Ownership</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Owner</span><span className="font-medium">{parcel.ownerName}</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Status</span><Badge className={`${parcel.ownerStatus === "verified" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>{parcel.ownerStatus}</Badge></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">GPS Verified</span><Badge className={parcel.gpsVerified ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}>{parcel.gpsVerified ? "Yes" : "No"}</Badge></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Documents</span><span className="font-medium">{parcel.documentsCount}</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Compensation</span><Badge variant="outline" className="text-[10px]">{parcel.compensation}</Badge></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Possession</span><Badge variant="outline" className="text-[10px]">{parcel.possession}</Badge></div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Field Verification</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Status</span><Badge className={`${parcel.fieldVerification === "accepted" ? "bg-emerald-100 text-emerald-800" : parcel.fieldVerification === "discrepancy" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"}`}>{parcel.fieldVerification}</Badge></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Project</span><span className="font-medium">{parcel.projectName}</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Last Activity</span><span className="font-medium">{parcel.lastActivity}</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Acquisition</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Stage</span><Badge variant="outline" className="text-[10px]">{stageShort(parcel.currentStage)}</Badge></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Compensation</span><Badge variant="outline" className="text-[10px]">{parcel.compensation}</Badge></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Possession</span><Badge variant="outline" className="text-[10px]">{parcel.possession}</Badge></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Risk</span><Badge className={`${parcel.risk === "critical" ? "bg-red-100 text-red-800" : parcel.risk === "high" ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-700"}`}>{parcel.risk}</Badge></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
