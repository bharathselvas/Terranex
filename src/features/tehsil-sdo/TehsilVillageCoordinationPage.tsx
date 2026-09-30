import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_OFFICERS, VILLAGES } from "./tehsilSdoData";

export default function TehsilVillageCoordinationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Village / Field Coordination</h1>
        <p className="text-sm text-muted-foreground">Coordinate field tasks, assign officers, review submissions</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Coordination Board</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {VILLAGES.map((v) => (
              <div key={v.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{v.affectedParcels} parcels &middot; {v.verificationProgress}% verified</p>
                  </div>
                  <Badge className={`${v.risk === "critical" ? "bg-red-100 text-red-800" : v.risk === "high" ? "bg-orange-100 text-orange-800" : v.risk === "medium" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>{v.risk}</Badge>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div><p className="text-[10px] text-muted-foreground">Field Officer</p><p className="text-xs font-medium">{v.fieldOfficer}</p></div>
                  <div><p className="text-[10px] text-muted-foreground">GPS Verified</p><p className="text-xs font-medium">{v.gpsVerified}/{v.totalParcels}</p></div>
                  <div><p className="text-[10px] text-muted-foreground">Objections</p><p className="text-xs font-medium">{v.openObjections}</p></div>
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="rounded bg-[#0F2340] px-2 py-1 text-[10px] text-white hover:bg-[#1a3560]">Assign Task</button>
                  <button className="rounded border border-[#0F2340] px-2 py-1 text-[10px] text-[#0F2340] hover:bg-[#0F2340]/5">View Submissions</button>
                  <button className="rounded border border-amber-300 px-2 py-1 text-[10px] text-amber-700 hover:bg-amber-50">Request Reverification</button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
