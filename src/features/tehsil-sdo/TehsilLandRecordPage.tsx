import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LAND_RECORDS } from "./tehsilSdoData";

const statusColors: Record<string, string> = {
  complete: "bg-emerald-100 text-emerald-800", pending: "bg-amber-100 text-amber-800", disputed: "bg-red-100 text-red-800",
};

export default function TehsilLandRecordPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const lr = LAND_RECORDS.find((l) => l.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Land Record Verification</h1>
        <p className="text-sm text-muted-foreground">Cross-reference revenue records with submitted information</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Land Records ({LAND_RECORDS.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {LAND_RECORDS.map((l) => (
                <button key={l.id} onClick={() => setSelected(l.id)} className={`w-full rounded-lg border p-3 text-left transition-colors ${selected === l.id ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{l.ulpin}</p>
                    <Badge className={statusColors[l.mutationStatus]}>{l.mutationStatus}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{l.village} &middot; {l.recordedOwner}</p>
                  <p className="text-[10px] text-muted-foreground">Survey: {l.surveyNumber} &middot; {l.areaHa} ha &middot; {l.classification}</p>
                  <Badge className={`mt-1 text-[10px] ${l.fieldMatch ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                    {l.fieldMatch ? "Field Match ✓" : "Field Mismatch ✗"}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Comparison Panel</CardTitle></CardHeader>
          <CardContent>
            {lr ? (
              <div className="space-y-4">
                <div className="rounded-lg border bg-blue-50/50 p-3">
                  <p className="mb-2 text-xs font-semibold text-blue-800">LAND RECORD (Revenue)</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Owner</span><span className="font-medium">{lr.recordedOwner}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Area</span><span className="font-medium">{lr.areaHa} ha</span></div>
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Classification</span><span className="font-medium">{lr.classification}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Mutation</span><Badge className={statusColors[lr.mutationStatus]}>{lr.mutationStatus}</Badge></div>
                  </div>
                </div>
                <div className="rounded-lg border bg-amber-50/50 p-3">
                  <p className="mb-2 text-xs font-semibold text-amber-800">SUBMITTED INFORMATION</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Owner</span><span className="font-medium">{lr.recordedOwner}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Area</span><span className="font-medium">{lr.areaHa} ha</span></div>
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Classification</span><span className="font-medium">{lr.classification}</span></div>
                  </div>
                </div>
                <div className={`rounded-lg border p-3 ${lr.fieldMatch ? "border-emerald-300 bg-emerald-50/50" : "border-red-300 bg-red-50/50"}`}>
                  <p className={`text-sm font-semibold ${lr.fieldMatch ? "text-emerald-700" : "text-red-700"}`}>
                    {lr.fieldMatch ? "✓ MATCH" : "✗ DISCREPANCY"}
                  </p>
                  {!lr.fieldMatch && <p className="text-xs text-red-600">Field verification does not match revenue records. Requires review.</p>}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select a land record</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
