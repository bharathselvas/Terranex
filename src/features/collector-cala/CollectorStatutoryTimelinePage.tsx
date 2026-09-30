import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STATUTORY_TIMELINES, DISTRICT_PROJECTS } from "./districtCollectorData";

const stageShort = (s: string) => {
  const m: Record<string, string> = {
    project_proposal: "Proposal", land_requirement: "Land Req", gis_identification: "GIS ID", submission: "Submission",
    scrutiny: "Scrutiny", sia: "SIA", preliminary_notification: "Prelim Ntf", public_disclosure: "Disclosure",
    objections_hearing: "Objections", declaration: "Declaration", field_verification: "FV",
    compensation: "Compensation", award: "Award", payment: "Payment", possession: "Possession", r_and_r: "R&R", closed: "Closed",
  };
  return m[s] ?? s;
};

const riskColor = (risk: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800", on_track: "bg-blue-100 text-blue-800" };
  return m[risk] ?? "bg-gray-100 text-gray-700";
};

const STAGE_ORDER = [
  "project_proposal", "land_requirement", "gis_identification", "submission", "scrutiny", "sia",
  "preliminary_notification", "public_disclosure", "objections_hearing", "declaration",
  "field_verification", "compensation", "award", "payment", "possession", "r_and_r", "closed",
];

export default function CollectorStatutoryTimelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Statutory Lifecycle Timelines</h1>
        <p className="text-sm text-muted-foreground">17-stage sequential workflow — SLA tracking per project</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-2 pb-4" style={{ minWidth: `${STAGE_ORDER.length * 140}px` }}>
          {STAGE_ORDER.map((stage) => {
            const tl = STATUTORY_TIMELINES.filter((t) => t.stage === stage);
            return (
              <div key={stage} className="min-w-[120px] flex-1">
                <div className="mb-2 rounded-t-lg bg-[#0F2340]/5 px-2 py-1.5">
                  <p className="text-[10px] font-semibold text-[#0F2340]">{stageShort(stage)}</p>
                </div>
                {tl.length === 0 ? (
                  <div className="rounded border border-dashed border-gray-200 bg-gray-50/50 p-2 text-center text-[10px] text-muted-foreground">
                    No active
                  </div>
                ) : (
                  tl.map((t) => {
                    const project = DISTRICT_PROJECTS.find((p) => p.id === t.projectId);
                    const pct = Math.min(100, (t.daysElapsed / t.expectedDuration) * 100);
                    return (
                      <div key={t.projectId} className={`mb-1 rounded border p-2 ${
                        t.status === "overdue" ? "border-red-300 bg-red-50/50" : t.status === "approaching_deadline" ? "border-amber-300 bg-amber-50/50" : "border-gray-200 bg-white"
                      }`}>
                        <p className="text-[10px] font-medium">{project?.projectName}</p>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
                          <div className={`h-1.5 rounded-full ${t.status === "overdue" ? "bg-red-500" : t.status === "approaching_deadline" ? "bg-amber-500" : "bg-blue-500"}`} style={{ width: `${pct}%` }} />
                        </div>
                        <div className="mt-1 flex justify-between">
                          <span className="text-[10px] text-muted-foreground">{t.daysElapsed}d / {t.expectedDuration}d</span>
                          <Badge className={`text-[10px] ${riskColor(t.status === "overdue" ? "critical" : t.status === "approaching_deadline" ? "high" : "low")}`}>
                            {t.remaining > 0 ? `${t.remaining}d` : `${Math.abs(t.remaining)}d late`}
                          </Badge>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0F2340]">Timeline Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border bg-emerald-50/50 p-3 text-center">
              <p className="text-2xl font-bold text-emerald-700">{STATUTORY_TIMELINES.filter((t) => t.status === "on_track").length}</p>
              <p className="text-xs text-muted-foreground">On Track</p>
            </div>
            <div className="rounded-lg border bg-amber-50/50 p-3 text-center">
              <p className="text-2xl font-bold text-amber-700">{STATUTORY_TIMELINES.filter((t) => t.status === "approaching_deadline").length}</p>
              <p className="text-xs text-muted-foreground">Approaching Deadline</p>
            </div>
            <div className="rounded-lg border bg-red-50/50 p-3 text-center">
              <p className="text-2xl font-bold text-red-700">{STATUTORY_TIMELINES.filter((t) => t.status === "overdue").length}</p>
              <p className="text-xs text-muted-foreground">Overdue</p>
            </div>
            <div className="rounded-lg border bg-gray-50/50 p-3 text-center">
              <p className="text-2xl font-bold text-gray-700">{STATUTORY_TIMELINES.filter((t) => t.status === "blocked").length}</p>
              <p className="text-xs text-muted-foreground">Blocked</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
