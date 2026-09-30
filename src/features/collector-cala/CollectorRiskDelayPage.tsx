import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RISK_DATA } from "./districtCollectorData";

const stageShort = (s: string) => {
  const m: Record<string, string> = {
    project_proposal: "Proposal", land_requirement: "Land Req", gis_identification: "GIS ID", submission: "Submission",
    scrutiny: "Scrutiny", sia: "SIA", preliminary_notification: "Prelim Ntf", public_disclosure: "Disclosure",
    objections_hearing: "Objections", declaration: "Declaration", field_verification: "FV",
    compensation: "Compensation", award: "Award", payment: "Payment", possession: "Possession", r_and_r: "R&R", closed: "Closed",
  };
  return m[s] ?? s;
};

const riskColor = (r: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[r] ?? "bg-gray-100 text-gray-700";
};

export default function CollectorRiskDelayPage() {
  const critical = RISK_DATA.filter((r) => r.risk === "critical");
  const high = RISK_DATA.filter((r) => r.risk === "high");
  const medium = RISK_DATA.filter((r) => r.risk === "medium");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Risk &amp; Delay Tracking</h1>
        <p className="text-sm text-muted-foreground">Identify overdue cases and SLA breaches</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div><p className="text-2xl font-bold text-red-700">{critical.length}</p><p className="text-xs text-muted-foreground">Critical</p></div>
            <div><p className="text-2xl font-bold text-orange-700">{high.length}</p><p className="text-xs text-muted-foreground">High</p></div>
            <div><p className="text-2xl font-bold text-amber-700">{medium.length}</p><p className="text-xs text-muted-foreground">Medium</p></div>
            <div><p className="text-2xl font-bold text-emerald-700">{RISK_DATA.filter((r) => r.risk === "low").length}</p><p className="text-xs text-muted-foreground">Low</p></div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {critical.length > 0 && (
          <Card className="border-red-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-red-800">
                <Badge className="bg-red-100 text-red-800">Critical</Badge>
                <span>({critical.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {critical.map((r) => (
                  <div key={r.projectId} className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50/50 p-3">
                    <div>
                      <p className="text-sm font-medium">{r.projectName}</p>
                      <p className="text-xs text-muted-foreground">{stageShort(r.stage)} &middot; {r.daysInStage} days in stage</p>
                      <p className="mt-1 text-xs text-red-700">{r.reason}</p>
                    </div>
                    <Badge className={riskColor(r.risk)}>{r.risk}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {high.length > 0 && (
          <Card className="border-orange-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-orange-800">
                <Badge className="bg-orange-100 text-orange-800">High</Badge>
                <span>({high.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {high.map((r) => (
                  <div key={r.projectId} className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50/50 p-3">
                    <div>
                      <p className="text-sm font-medium">{r.projectName}</p>
                      <p className="text-xs text-muted-foreground">{stageShort(r.stage)} &middot; {r.daysInStage} days in stage</p>
                      <p className="mt-1 text-xs text-orange-700">{r.reason}</p>
                    </div>
                    <Badge className={riskColor(r.risk)}>{r.risk}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {medium.length > 0 && (
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                <span>({medium.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {medium.map((r) => (
                  <div key={r.projectId} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">{r.projectName}</p>
                      <p className="text-xs text-muted-foreground">{stageShort(r.stage)} &middot; {r.daysInStage} days in stage</p>
                      <p className="mt-1 text-xs text-amber-700">{r.reason}</p>
                    </div>
                    <Badge className={riskColor(r.risk)}>{r.risk}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
