import { BarChart3, Download, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { REPORTS } from "@/features/state-nodal/stateNodalData";

const CATEGORY_COLORS: Record<string, string> = {
  progress: "bg-blue-100 text-blue-800",
  financial: "bg-emerald-100 text-emerald-800",
  operational: "bg-violet-100 text-violet-800",
  social: "bg-amber-100 text-amber-800",
  compliance: "bg-red-100 text-red-800",
};

export function StateMisPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">State MIS</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Generate and export state-level MIS reports</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {REPORTS.map((report) => (
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
                  <Button size="sm" variant="outline" className="h-7 text-[10px]"><Download className="h-3 w-3 mr-1" /> PDF</Button>
                  <Button size="sm" variant="outline" className="h-7 text-[10px]"><Download className="h-3 w-3 mr-1" /> Excel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 rounded-md p-3 text-[11px] text-blue-800">
        <p className="font-medium">Report Filters</p>
        <p className="mt-0.5">Filter by District, Project, Ministry, Agency, Stage, and Date Range. Export to PDF or Excel (UI only).</p>
      </div>
    </div>
  );
}
