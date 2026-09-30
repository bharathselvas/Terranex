import { Card, CardContent } from "@/components/ui/card";
import { FO_PERFORMANCE } from "./fieldOfficerData";
import { CheckCircle2, Clock, AlertTriangle, FileText, RefreshCw } from "lucide-react";

export default function FoPerformancePage() {
  const p = FO_PERFORMANCE;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Field Performance</h1>
        <p className="text-sm text-muted-foreground">Personal operational dashboard</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Card className="shadow-sm"><CardContent className="p-4 text-center">
          <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-600" />
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{p.tasksCompleted}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4 text-center">
          <Clock className="mx-auto h-5 w-5 text-amber-600" />
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{p.tasksPending}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4 text-center">
          <AlertTriangle className="mx-auto h-5 w-5 text-red-600" />
          <p className="mt-1 text-2xl font-bold text-red-700">{p.tasksOverdue}</p>
          <p className="text-xs text-muted-foreground">Overdue</p>
        </CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4 text-center">
          <FileText className="mx-auto h-5 w-5 text-blue-600" />
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{p.evidenceSubmitted}</p>
          <p className="text-xs text-muted-foreground">Evidence Submitted</p>
        </CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4 text-center">
          <RefreshCw className="mx-auto h-5 w-5 text-purple-600" />
          <p className="mt-1 text-2xl font-bold text-[#0F2340]">{p.reverificationRate}%</p>
          <p className="text-xs text-muted-foreground">Reverification Rate</p>
        </CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4 text-center">
          <Clock className="mx-auto h-5 w-5 text-gray-600" />
          <p className="mt-1 text-sm font-bold text-[#0F2340]">14:32</p>
          <p className="text-xs text-muted-foreground">Last Sync</p>
        </CardContent></Card>
      </div>
    </div>
  );
}
