import { MessageSquare, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MINISTRY_OBJECTIONS } from "@/features/ministry/ministryData";
import { formatDate } from "@/lib/format";

const STATUS_COLORS: Record<string, string> = {
  open: "bg-blue-100 text-blue-800",
  under_review: "bg-amber-100 text-amber-800",
  resolved: "bg-emerald-100 text-emerald-800",
  escalated: "bg-red-100 text-red-800",
};

const STATUS_ICONS: Record<string, typeof MessageSquare> = {
  open: AlertTriangle,
  under_review: Clock,
  resolved: CheckCircle,
  escalated: AlertTriangle,
};

export function MinistryObjectionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Objections & Grievances</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Citizen objections filed during the acquisition process — MoRTH projects
          </p>
        </div>
        <Badge variant="secondary" className="text-[11px]">
          {MINISTRY_OBJECTIONS.filter((o) => o.status === "open").length} open
        </Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Project</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">State / District</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Parcel</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Filed Date</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Current Authority</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {MINISTRY_OBJECTIONS.map((obj) => {
                  const StatusIcon = STATUS_ICONS[obj.status] || MessageSquare;
                  return (
                    <tr key={obj.id} className="border-b last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-[#0F2340] text-[11px]">{obj.projectName}</td>
                      <td className="px-4 py-3 text-slate-600 text-[11px]">{obj.state} / {obj.district}</td>
                      <td className="px-4 py-3 text-slate-600 text-[11px]">{obj.parcel}</td>
                      <td className="px-4 py-3 text-slate-600 text-[11px]">{obj.category}</td>
                      <td className="px-4 py-3 text-slate-600 text-[11px]">{formatDate(obj.filedDate)}</td>
                      <td className="px-4 py-3 text-slate-600 text-[11px]">{obj.currentAuthority}</td>
                      <td className="px-4 py-3 text-center">
                        <Badge className={`text-[10px] ${STATUS_COLORS[obj.status]}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {obj.status.replace("_", " ")}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
