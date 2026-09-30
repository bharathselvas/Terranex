import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OBJECTION_EVIDENCE } from "./fieldOfficerData";
import { ArrowLeft, Camera, FileText } from "lucide-react";

export default function FoObjectionEvidencePage() {
  const { taskId } = useParams();
  const oe = OBJECTION_EVIDENCE[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Objection Evidence</h1>
          <p className="text-sm text-muted-foreground">{oe.parcelId} — {oe.objectionId}</p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-[10px] text-muted-foreground">Objection ID</p><p className="text-sm font-medium">{oe.objectionId}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Category</p><p className="text-sm font-medium capitalize">{oe.category}</p></div>
            <div className="col-span-2"><p className="text-[10px] text-muted-foreground">Issue</p><p className="text-sm">{oe.issue}</p></div>
            <div className="col-span-2"><p className="text-[10px] text-muted-foreground">Landowner Statement</p><p className="text-sm italic">"{oe.landownerStatement}"</p></div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <p className="mb-2 text-xs font-semibold text-[#0F2340]">REQUIRED EVIDENCE</p>
          <div className="space-y-2">
            {oe.requiredEvidence.map((e, i) => (
              <div key={i} className={`flex items-center justify-between rounded-lg border p-2 ${oe.collectedEvidence.includes(e) ? "border-emerald-300 bg-emerald-50/50" : "border-gray-200"}`}>
                <span className="text-xs">{e}</span>
                {oe.collectedEvidence.includes(e) ? <Badge className="bg-emerald-100 text-emerald-800">Collected</Badge> : <Badge className="bg-gray-100 text-gray-700">Pending</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
        <CardContent className="p-4">
          <p className="text-xs text-amber-800"><strong>Decision Authority:</strong> District Collector / CALA</p>
          <p className="mt-1 text-xs text-amber-700">Field Officer collects evidence only. Objection decisions are made by the District Collector.</p>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <button className="flex-1 rounded-lg border border-[#0F2340] px-4 py-3 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5"><Camera className="mr-2 inline h-4 w-4" />Capture Evidence</button>
        <button className="flex-1 rounded-lg bg-[#0F2340] px-4 py-3 text-sm font-medium text-white hover:bg-[#1a3560]"><FileText className="mr-2 inline h-4 w-4" />Submit Evidence</button>
      </div>
    </div>
  );
}
