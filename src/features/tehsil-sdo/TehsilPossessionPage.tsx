import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { POSSESSION_READINESS } from "./tehsilSdoData";

const readinessColors: Record<string, string> = {
  ready: "bg-emerald-100 text-emerald-800", not_ready: "bg-red-100 text-red-800", partial: "bg-amber-100 text-amber-800",
};

export default function TehsilPossessionPage() {
  const ready = POSSESSION_READINESS.filter((p) => p.readiness === "ready");
  const notReady = POSSESSION_READINESS.filter((p) => p.readiness !== "ready");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Possession Readiness</h1>
        <p className="text-sm text-muted-foreground">Prepare and verify local possession information for Collector review</p>
      </div>

      <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
        <CardContent className="pt-4">
          <p className="text-xs text-amber-800">Tehsil prepares and verifies possession information. Final statutory possession must be recorded by the authorized authority (District Collector / CALA).</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4 text-center">
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-2xl font-bold text-[#0F2340]">{POSSESSION_READINESS.length}</p><p className="text-xs text-muted-foreground">Total</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-2xl font-bold text-emerald-700">{ready.length}</p><p className="text-xs text-muted-foreground">Ready</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-2xl font-bold text-red-700">{notReady.length}</p><p className="text-xs text-muted-foreground">Not Ready</p></CardContent></Card>
      </div>

      <div className="space-y-4">
        {POSSESSION_READINESS.map((p) => (
          <Card key={p.parcelId} className="shadow-sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{p.parcelId}</p>
                  <p className="text-xs text-muted-foreground">{p.projectName} &middot; {p.village}</p>
                </div>
                <Badge className={readinessColors[p.readiness]}>{p.readiness === "ready" ? "READY FOR DISTRICT REVIEW" : p.readiness === "partial" ? "PARTIAL — CHECK ITEMS" : "NOT READY"}</Badge>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                {[
                  { label: "Compensation", value: p.compensationStatus, ok: p.compensationStatus === "Completed" || p.compensationStatus === "Awarded" },
                  { label: "Field Verification", value: p.fieldVerification, ok: p.fieldVerification === "Completed" },
                  { label: "Open Discrepancy", value: p.openDiscrepancy, ok: p.openDiscrepancy === "None" },
                  { label: "Blocking Grievance", value: p.blockingGrievance, ok: p.blockingGrievance === "None" },
                ].map((item) => (
                  <div key={item.label} className={`rounded border p-2 ${item.ok ? "border-emerald-300 bg-emerald-50/50" : "border-red-300 bg-red-50/50"}`}>
                    <p className="text-[10px] text-muted-foreground">{item.label}</p>
                    <p className={`text-xs font-medium ${item.ok ? "text-emerald-700" : "text-red-700"}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
