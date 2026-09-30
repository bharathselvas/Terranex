import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TEHSILS, FIELD_OFFICERS } from "./districtCollectorData";

const riskColor = (r: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[r] ?? "bg-gray-100 text-gray-700";
};

export default function CollectorTehsilSdoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Tehsil / SDO Management</h1>
        <p className="text-sm text-muted-foreground">Tehsil-level case distribution and SDO performance</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {TEHSILS.map((t) => (
          <Card key={t.name} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm font-semibold text-[#0F2340]">
                <span>{t.name} Tehsil</span>
                <Badge className={riskColor(t.risk)}>{t.risk}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">SDO</span>
                  <span className="font-medium">{t.sdo}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded border p-2 text-center">
                    <p className="text-lg font-bold text-[#0F2340]">{t.activeCases}</p>
                    <p className="text-[10px] text-muted-foreground">Active Cases</p>
                  </div>
                  <div className="rounded border p-2 text-center">
                    <p className="text-lg font-bold text-amber-700">{t.pendingVerification}</p>
                    <p className="text-[10px] text-muted-foreground">Pending Verification</p>
                  </div>
                  <div className="rounded border p-2 text-center">
                    <p className={`text-lg font-bold ${t.overdue > 0 ? "text-red-700" : "text-emerald-700"}`}>{t.overdue}</p>
                    <p className="text-[10px] text-muted-foreground">Overdue</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0F2340]">Field Officers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {FIELD_OFFICERS.map((fo) => (
              <div key={fo.name} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{fo.name}</p>
                  <p className="text-xs text-muted-foreground">{fo.tehsil}</p>
                </div>
                <div className="flex gap-4 text-center">
                  <div><p className="text-sm font-bold text-[#0F2340]">{fo.assignedCases}</p><p className="text-[10px] text-muted-foreground">Assigned</p></div>
                  <div><p className="text-sm font-bold text-emerald-700">{fo.completed}</p><p className="text-[10px] text-muted-foreground">Done</p></div>
                  <div><p className="text-sm font-bold text-amber-700">{fo.pending}</p><p className="text-[10px] text-muted-foreground">Pending</p></div>
                  {fo.overdue > 0 && <div><p className="text-sm font-bold text-red-700">{fo.overdue}</p><p className="text-[10px] text-muted-foreground">Overdue</p></div>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
