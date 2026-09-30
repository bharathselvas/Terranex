import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_REPORTS } from "./fieldOfficerData";
import { ArrowLeft } from "lucide-react";

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700", submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-amber-100 text-amber-800", accepted: "bg-emerald-100 text-emerald-800",
  needs_reverification: "bg-orange-100 text-orange-800",
};

export default function FoReportPage() {
  const { taskId } = useParams();
  const report = FIELD_REPORTS[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/task/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Field Report</h1>
          <p className="text-sm text-muted-foreground">{report.parcelId}</p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-[10px] text-muted-foreground">Project</p><p className="text-sm font-medium">{report.projectName}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Parcel</p><p className="text-sm font-medium">{report.parcelId}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Village</p><p className="text-sm font-medium">{report.village}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Officer</p><p className="text-sm font-medium">{report.officer}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Visit Date</p><p className="text-sm font-medium">{report.visitDate}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Status</p><Badge className={statusColors[report.status]}>{report.status.replace(/_/g, " ")}</Badge></div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Report Sections</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {report.sections.map((s) => (
              <div key={s} className="flex items-center justify-between rounded border p-2">
                <span className="text-sm">{s}</span>
                <Badge className="bg-emerald-100 text-emerald-800">Complete</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {report.submittedAt && (
        <p className="text-xs text-muted-foreground text-center">Submitted: {report.submittedAt}</p>
      )}
      {report.reviewedBy && (
        <p className="text-xs text-muted-foreground text-center">Reviewed by: {report.reviewedBy}</p>
      )}
    </div>
  );
}
