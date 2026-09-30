import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lock, CheckCircle2, Clock } from "lucide-react";

const LIFECYCLE = [
  { key: "compensation", label: "Compensation", status: "complete" as const },
  { key: "payment", label: "Payment", status: "complete" as const },
  { key: "possession", label: "Possession", status: "complete" as const },
  { key: "rr", label: "R&R", status: "current" as const },
  { key: "closed", label: "Closed", status: "locked" as const },
];

export default function RrWorkflowPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Workflow Boundaries</h1>
      </div>

      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Role</p>
              <h2 className="text-xl font-bold text-[#0F2340]">R&R Officer</h2>
              <p className="text-sm text-muted-foreground mt-1">Operational stage: Rehabilitation & Resettlement</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 text-sm">CURRENT</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Acquisition Lifecycle Context</h2>
          <div className="space-y-4">
            {LIFECYCLE.map((stage) => {
              const iconMap = { complete: CheckCircle2, current: Clock, locked: Lock };
              const Icon = iconMap[stage.status];
              return (
                <div key={stage.key} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${stage.status === "complete" ? "border-green-500 bg-green-50 text-green-700" : stage.status === "current" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 bg-gray-100 text-gray-500"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <span className={`font-medium ${stage.status === "locked" ? "text-gray-400" : "text-[#0F2340]"}`}>{stage.label}</span>
                    {stage.status === "complete" && <Badge className="ml-2 text-xs bg-green-100 text-green-800">Complete</Badge>}
                    {stage.status === "current" && <Badge className="ml-2 text-xs bg-blue-100 text-blue-800">Current</Badge>}
                    {stage.status === "locked" && <Badge className="ml-2 text-xs bg-gray-100 text-gray-600">Next</Badge>}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200">
        <CardContent className="p-5">
          <h3 className="font-semibold text-[#0F2340] mb-2">Role Restrictions</h3>
          <p className="text-sm text-muted-foreground">The R&R Officer operates within the R&R stage. Previous stages (compensation, payment, possession) are view-only. The R&R Officer cannot modify acquisition decisions or authorize statutory actions.</p>
        </CardContent>
      </Card>
    </div>
  );
}
