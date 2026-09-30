import { MessageSquare, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OBJECTIONS } from "@/features/requiring-org/roIAData";
import { formatDate } from "@/lib/format";

const STATUS_COLORS: Record<string, string> = {
  filed: "bg-blue-100 text-blue-800",
  under_review: "bg-amber-100 text-amber-800",
  hearing: "bg-violet-100 text-violet-800",
  resolved: "bg-emerald-100 text-emerald-800",
  escalated: "bg-red-100 text-red-800",
};

export function ObjectionsGrievancesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Objections & Grievances</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor citizen objections related to your projects — you may provide supporting information but cannot adjudicate
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-[11px] text-amber-800">
        <p className="font-medium">⚠ Role Boundary</p>
        <p className="mt-0.5">Objection adjudication is performed by the District Collector / CALA. Your role is to monitor and provide supporting information when requested.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Case ID</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Project</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Parcel</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">State / District</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Filed Date</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Current Authority</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {OBJECTIONS.map((obj) => (
                  <tr key={obj.id} className="border-b last:border-0 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-600">{obj.id}</td>
                    <td className="px-4 py-3 font-medium text-[#0F2340] text-[11px]">{obj.projectName}</td>
                    <td className="px-4 py-3 text-[11px]">{obj.parcel}</td>
                    <td className="px-4 py-3 text-[11px]">{obj.state} / {obj.district}</td>
                    <td className="px-4 py-3 text-[11px]">{obj.category}</td>
                    <td className="px-4 py-3 text-[11px]">{formatDate(obj.filedDate)}</td>
                    <td className="px-4 py-3 text-[11px]">{obj.currentAuthority}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={`text-[10px] ${STATUS_COLORS[obj.status]}`}>{obj.status.replace("_", " ")}</Badge>
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
