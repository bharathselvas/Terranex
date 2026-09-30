import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { POSSESSION_EVIDENCE_DATA } from "./fieldOfficerData";
import { ArrowLeft, CheckCircle2, XCircle, Camera, MapPin } from "lucide-react";

export default function FoPossessionPage() {
  const { taskId } = useParams();
  const pe = POSSESSION_EVIDENCE_DATA;
  const allPrereqsMet = pe.prerequisites.every((p) => p.status === "completed");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Possession Visit</h1>
          <p className="text-sm text-muted-foreground">{pe.parcelId} — {pe.village}</p>
        </div>
      </div>

      {/* Prerequisites */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <p className="mb-3 text-xs font-semibold text-[#0F2340]">PREREQUISITES</p>
          <div className="space-y-2">
            {pe.prerequisites.map((p) => (
              <div key={p.label} className={`flex items-center justify-between rounded-lg border p-3 ${p.status === "completed" ? "border-emerald-300 bg-emerald-50/50" : p.status === "pending" ? "border-amber-300 bg-amber-50/50" : "border-red-300 bg-red-50/50"}`}>
                <span className="text-sm">{p.label}</span>
                {p.status === "completed" ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : p.status === "pending" ? <Badge className="bg-amber-100 text-amber-800">Pending</Badge> : <XCircle className="h-4 w-4 text-red-600" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {allPrereqsMet ? (
        <>
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <p className="mb-3 text-xs font-semibold text-[#0F2340]">POSSESSION DETAILS</p>
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-[10px] text-muted-foreground">Parcel</p><p className="text-sm font-medium">{pe.parcelId}</p></div>
                <div><p className="text-[10px] text-muted-foreground">Project</p><p className="text-sm font-medium">{pe.projectName}</p></div>
                <div><p className="text-[10px] text-muted-foreground">Village</p><p className="text-sm font-medium">{pe.village}</p></div>
                <div><p className="text-[10px] text-muted-foreground">Landowner</p><p className="text-sm font-medium">{pe.landowner}</p></div>
                <div><p className="text-[10px] text-muted-foreground">Date</p><p className="text-sm font-medium">{pe.date}</p></div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <button className="flex-1 rounded-lg border border-[#0F2340] px-4 py-3 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5"><Camera className="mr-2 inline h-4 w-4" />Capture Evidence</button>
            <button className="flex-1 rounded-lg border border-[#0F2340] px-4 py-3 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5"><MapPin className="mr-2 inline h-4 w-4" />Record GPS</button>
          </div>
          <button className="w-full rounded-lg bg-[#0F2340] px-4 py-3 text-sm font-medium text-white hover:bg-[#1a3560]">Prepare Possession Record</button>
        </>
      ) : (
        <Card className="border-red-200 bg-red-50/50 shadow-sm">
          <CardContent className="p-5 text-center">
            <XCircle className="mx-auto h-8 w-8 text-red-600" />
            <p className="mt-2 text-sm font-semibold text-red-800">POSSESSION NOT READY</p>
            <p className="mt-1 text-xs text-red-700">Prerequisites not satisfied. The possession visit cannot be completed as a statutory possession action.</p>
          </CardContent>
        </Card>
      )}

      <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
        <CardContent className="p-4">
          <p className="text-xs text-amber-800">Field Officer prepares possession evidence. Final statutory possession must be recorded by the authorized authority (District Collector / CALA).</p>
        </CardContent>
      </Card>
    </div>
  );
}
