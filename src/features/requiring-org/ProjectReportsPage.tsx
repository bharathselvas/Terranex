import { BarChart3, Download, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROJECT_REPORTS } from "@/features/requiring-org/roIAData";

const CATEGORY_COLORS: Record<string, string> = {
  Progress: "bg-blue-100 text-blue-800",
  Financial: "bg-emerald-100 text-emerald-800",
  Operations: "bg-violet-100 text-violet-800",
  Social: "bg-amber-100 text-amber-800",
  Compliance: "bg-red-100 text-red-800",
};

export function ProjectReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Project Reports</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Generate and export project reports</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {PROJECT_REPORTS.map((report) => (
          <Card key={report.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F2340]/10 shrink-0">
                  <FileText className="h-5 w-5 text-[#0F2340]" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#0F2340]">{report.name}</h3>
                    <Badge className={`text-[9px] ${CATEGORY_COLORS[report.category]}`}>{report.category}</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{report.description}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button className="p-2 hover:bg-slate-100 rounded-md"><Download className="h-4 w-4 text-slate-500" /></button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 rounded-md p-3 text-[11px] text-blue-800">
        <p className="font-medium">Report Filters</p>
        <p className="mt-0.5">Filter by State, District, Stage, and Date. Export to PDF or Excel (UI only).</p>
      </div>
    </div>
  );
}
