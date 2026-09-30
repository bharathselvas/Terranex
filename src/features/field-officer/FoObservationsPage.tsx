import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_OBSERVATIONS } from "./fieldOfficerData";
import { ArrowLeft, Plus } from "lucide-react";

const catColors: Record<string, string> = {
  boundary: "bg-blue-100 text-blue-800", ownership: "bg-purple-100 text-purple-800",
  cultivation: "bg-emerald-100 text-emerald-800", structure: "bg-amber-100 text-amber-800",
  access: "bg-cyan-100 text-cyan-800", occupancy: "bg-orange-100 text-orange-800",
  environmental: "bg-green-100 text-green-800", other: "bg-gray-100 text-gray-700",
};

export default function FoObservationsPage() {
  const { taskId } = useParams();
  const obs = FIELD_OBSERVATIONS;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Observations</h1>
          <p className="text-sm text-muted-foreground">{obs.length} observations recorded</p>
        </div>
      </div>

      <button className="w-full rounded-lg border-2 border-dashed border-[#0F2340] bg-[#0F2340]/5 px-4 py-3 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/10">
        <Plus className="mr-2 inline h-4 w-4" />Add Observation
      </button>

      <div className="space-y-3">
        {obs.map((o) => (
          <Card key={o.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <Badge className={catColors[o.category]}>{o.category}</Badge>
                <p className="text-[10px] text-muted-foreground">{o.timestamp}</p>
              </div>
              <p className="mt-2 text-sm">{o.text}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">Officer: {o.officer}</p>
              {o.relatedEvidenceIds.length > 0 && (
                <div className="mt-1 flex gap-1">
                  {o.relatedEvidenceIds.map((eid) => (
                    <Badge key={eid} className="bg-gray-100 text-gray-700 text-[10px]">{eid}</Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
