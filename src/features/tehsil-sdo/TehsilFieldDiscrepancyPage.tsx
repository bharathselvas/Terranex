import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_VERIFICATION_SUBMISSIONS } from "./tehsilSdoData";

export default function TehsilFieldDiscrepancyPage() {
  const discrepancies = FIELD_VERIFICATION_SUBMISSIONS.filter((f) => f.status === "discrepancy");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Field Verification Discrepancies</h1>
        <p className="text-sm text-muted-foreground">Cases where field measurement differs from recorded data</p>
      </div>

      <div className="space-y-4">
        {discrepancies.map((f) => (
          <Card key={f.id} className="border-red-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-red-800">
                <Badge className="bg-red-100 text-red-800">DISCREPANCY</Badge>
                <span>{f.parcelId}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">{f.projectName} &middot; {f.village} &middot; Officer: {f.officer}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-3">
                    <p className="mb-1 text-[10px] font-semibold text-blue-800">RECORDED</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs"><span>Owner</span><span className="font-medium">{f.ownerMatch ? "Match" : "Mismatch"}</span></div>
                      <div className="flex justify-between text-xs"><span>Area</span><span className="font-medium">{f.recordedArea} ha</span></div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3">
                    <p className="mb-1 text-[10px] font-semibold text-amber-800">FIELD MEASURED</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs"><span>Owner</span><span className="font-medium">{f.ownerMatch ? "Match" : "Mismatch"}</span></div>
                      <div className="flex justify-between text-xs"><span>Area</span><span className="font-medium">{f.measuredArea} ha</span></div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50/50 p-3">
                  <p className="text-sm font-semibold text-red-800">FIELD DISCREPANCY</p>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div><p className="text-[10px] text-muted-foreground">Recorded Area</p><p className="text-xs font-medium">{f.recordedArea} ha</p></div>
                    <div><p className="text-[10px] text-muted-foreground">Field Measured</p><p className="text-xs font-medium">{f.measuredArea} ha</p></div>
                    <div><p className="text-[10px] text-muted-foreground">Difference</p><p className="text-xs font-bold text-red-700">{Math.abs(f.measuredArea - f.recordedArea).toFixed(2)} ha</p></div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{f.remarks}</p>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-amber-300 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50">Request Reverification</button>
                  <button className="rounded-lg border border-[#0F2340] px-4 py-2 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5">Forward to Collector</button>
                  <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Add Remark</button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {discrepancies.length === 0 && <p className="text-sm text-muted-foreground">No field discrepancies.</p>}
      </div>
    </div>
  );
}
