import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MEASUREMENTS } from "./fieldOfficerData";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function FoMeasurementPage() {
  const { taskId } = useParams();
  const m = MEASUREMENTS[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Measurement / Observation</h1>
          <p className="text-sm text-muted-foreground">{m.parcelId}</p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg border bg-gray-50 p-3">
              <p className="text-[10px] text-muted-foreground">Recorded Area</p>
              <p className="text-lg font-bold text-[#0F2340]">{m.recordedArea} {m.unit}</p>
            </div>
            <div className="rounded-lg border bg-gray-50 p-3">
              <p className="text-[10px] text-muted-foreground">Observed</p>
              <p className="text-lg font-bold text-[#0F2340]">{m.observedArea} {m.unit}</p>
            </div>
            <div className="rounded-lg border bg-gray-50 p-3">
              <p className="text-[10px] text-muted-foreground">Difference</p>
              <p className={`text-lg font-bold ${m.discrepancy ? "text-red-700" : "text-emerald-700"}`}>{m.difference} {m.unit}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {m.discrepancy && (
        <Card className="border-red-200 bg-red-50/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <p className="text-sm font-semibold text-red-800">⚠ DISCREPANCY</p>
            </div>
            <p className="mt-1 text-xs text-red-700">{m.difference} {m.unit} difference between recorded and observed area.</p>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-sm">
        <CardContent className="p-4 space-y-3">
          <div>
            <p className="text-[10px] text-muted-foreground">Boundary Notes</p>
            <p className="text-sm">{m.boundaryNotes}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Survey Notes</p>
            <p className="text-sm">{m.surveyNotes}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <button className="flex-1 rounded-lg border border-[#0F2340] px-4 py-3 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5">Add Observation</button>
        <button className="flex-1 rounded-lg border border-red-300 px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-50">Flag Discrepancy</button>
      </div>
    </div>
  );
}
