import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMPLETED_WORK } from "./fieldOfficerData";

const statusColors: Record<string, string> = {
  submitted: "bg-blue-100 text-blue-800", accepted: "bg-emerald-100 text-emerald-800",
  needs_correction: "bg-orange-100 text-orange-800",
};

const taskTypeLabels: Record<string, string> = {
  ownership_verification: "Ownership Verification", asset_verification: "Asset Verification",
  field_verification: "Field Verification", possession_evidence: "Possession Evidence",
  rr_enumeration: "R&R Enumeration", objection_evidence: "Objection Evidence",
};

export default function FoCompletedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Completed Work</h1>
        <p className="text-sm text-muted-foreground">{COMPLETED_WORK.length} tasks submitted</p>
      </div>

      <div className="space-y-3">
        {COMPLETED_WORK.map((cw) => (
          <Card key={cw.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#0F2340]">{cw.projectName}</p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-xs text-muted-foreground">Parcel: {cw.parcelId}</p>
                    <p className="text-xs text-muted-foreground">Task: {taskTypeLabels[cw.taskType]}</p>
                    <p className="text-xs text-muted-foreground">Submitted: {cw.submittedAt}</p>
                    {cw.reviewedBy && <p className="text-xs text-muted-foreground">Reviewed: {cw.reviewedBy}</p>}
                  </div>
                </div>
                <Badge className={statusColors[cw.status]}>{cw.status.replace(/_/g, " ")}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
