import { IndianRupee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MINISTRY_COMPENSATION } from "@/features/ministry/ministryData";

const STATUS_COLORS: Record<string, string> = {
  on_track: "bg-emerald-100 text-emerald-800",
  delayed: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
};

export function MinistryCompensationPage() {
  const totalAssessed = MINISTRY_COMPENSATION.reduce((sum, c) => sum + parseInt(c.assessed.replace(/[₹ Cr ]/g, "")), 0);
  const totalAwarded = MINISTRY_COMPENSATION.reduce((sum, c) => sum + parseInt(c.awarded.replace(/[₹ Cr ]/g, "")), 0);
  const totalDisbursed = MINISTRY_COMPENSATION.reduce((sum, c) => sum + parseInt(c.disbursed.replace(/[₹ Cr ]/g, "")), 0);
  const totalPending = MINISTRY_COMPENSATION.reduce((sum, c) => sum + parseInt(c.pending.replace(/[₹ Cr ]/g, "")), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Compensation Monitor</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ministry-level view of compensation assessment, award, and disbursement across MoRTH projects
          </p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-[11px] font-medium text-muted-foreground">Total Assessed</p>
            <p className="mt-1 text-xl font-bold text-[#0F2340]">₹ {totalAssessed.toLocaleString()} Cr</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[11px] font-medium text-muted-foreground">Total Awarded</p>
            <p className="mt-1 text-xl font-bold text-[#0F2340]">₹ {totalAwarded.toLocaleString()} Cr</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[11px] font-medium text-muted-foreground">Total Disbursed</p>
            <p className="mt-1 text-xl font-bold text-emerald-700">₹ {totalDisbursed.toLocaleString()} Cr</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[11px] font-medium text-muted-foreground">Total Pending</p>
            <p className="mt-1 text-xl font-bold text-amber-700">₹ {totalPending.toLocaleString()} Cr</p>
          </CardContent>
        </Card>
      </div>

      {/* Project-wise table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Project</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">State</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">Assessed</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">Awarded</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">Disbursed</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">Pending</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">Failed</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {MINISTRY_COMPENSATION.map((comp) => (
                  <tr key={comp.projectId} className="border-b last:border-0 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-[#0F2340]">{comp.projectName}</td>
                    <td className="px-4 py-3 text-slate-600">{comp.state}</td>
                    <td className="px-4 py-3 text-right">{comp.assessed}</td>
                    <td className="px-4 py-3 text-right">{comp.awarded}</td>
                    <td className="px-4 py-3 text-right text-emerald-700">{comp.disbursed}</td>
                    <td className="px-4 py-3 text-right text-amber-700">{comp.pending}</td>
                    <td className="px-4 py-3 text-right text-red-600">{comp.failed}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={`text-[10px] ${STATUS_COLORS[comp.paymentStatus]}`}>
                        {comp.paymentStatus.replace("_", " ")}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
