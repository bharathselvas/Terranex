import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { OWNER_VERIFICATION } from "./fieldOfficerData";
import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";

export default function FoOwnerVerifyPage() {
  const { taskId } = useParams();
  const ov = OWNER_VERIFICATION;
  const [claimedOwner, setClaimedOwner] = useState(ov.claimedOwner);
  const [observedArea, setObservedArea] = useState(ov.observedArea.toString());
  const [occupancy, setOccupancy] = useState(ov.occupancy);
  const match = claimedOwner === ov.recordedOwner;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Owner Verification</h1>
          <p className="text-sm text-muted-foreground">{ov.parcelId} — {ov.surveyNumber}</p>
        </div>
      </div>

      {/* Recorded Information */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <p className="mb-3 text-xs font-semibold text-[#0F2340]">RECORDED INFORMATION</p>
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-[10px] text-muted-foreground">ULPIN</p><p className="text-sm font-medium">{ov.ulpin}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Survey Number</p><p className="text-sm font-medium">{ov.surveyNumber}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Recorded Owner</p><p className="text-sm font-medium">{ov.recordedOwner}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Area</p><p className="text-sm font-medium">{ov.recordedArea} ha</p></div>
            <div><p className="text-[10px] text-muted-foreground">Classification</p><p className="text-sm font-medium">{ov.classification}</p></div>
          </div>
        </CardContent>
      </Card>

      {/* Field Information */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <p className="mb-3 text-xs font-semibold text-[#0F2340]">FIELD INFORMATION</p>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-muted-foreground">Claimed Owner</label>
              <input value={claimedOwner} onChange={(e) => setClaimedOwner(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground">Observed Area (ha)</label>
              <input value={observedArea} onChange={(e) => setObservedArea(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" type="number" step="0.01" />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground">Occupancy</label>
              <select value={occupancy} onChange={(e) => setOccupancy(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm">
                <option>Self-cultivated</option>
                <option>Leased</option>
                <option>Occupied</option>
                <option>Vacant</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison */}
      <Card className={`shadow-sm ${match ? "border-emerald-300 bg-emerald-50/50" : "border-red-300 bg-red-50/50"}`}>
        <CardContent className="p-4">
          {match ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
              <p className="mt-2 text-sm font-semibold text-emerald-800">✓ MATCH</p>
              <p className="text-xs text-emerald-700">Recorded: {ov.recordedOwner}</p>
              <p className="text-xs text-emerald-700">Field: {claimedOwner}</p>
            </div>
          ) : (
            <div className="text-center">
              <AlertTriangle className="mx-auto h-8 w-8 text-red-600" />
              <p className="mt-2 text-sm font-semibold text-red-800">⚠ MISMATCH</p>
              <p className="text-xs text-red-700">Recorded: {ov.recordedOwner}</p>
              <p className="text-xs text-red-700">Field: {claimedOwner}</p>
              <p className="mt-1 text-xs text-red-700">Action Required: Manual Resolution</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <button className="flex-1 rounded-lg border border-red-300 px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-50">Flag Discrepancy</button>
        <button className="flex-1 rounded-lg bg-[#0F2340] px-4 py-3 text-sm font-medium text-white hover:bg-[#1a3560]">Submit for Review</button>
      </div>
    </div>
  );
}
