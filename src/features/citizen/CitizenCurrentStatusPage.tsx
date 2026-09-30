import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CITIZEN_TIMELINE, STAGE_LABELS } from "./citizenData";
import { CheckCircle2, Clock, Circle, AlertCircle } from "lucide-react";

export default function CitizenCurrentStatusPage() {
  const currentStage = CITIZEN_TIMELINE.find((s) => s.status === "in_progress");

  const statusGrid = [
    {
      label: "Award",
      detail: "Finalized",
      status: "completed" as const,
      icon: CheckCircle2,
      color: "text-[#0F7A5A]",
      bg: "bg-[#0F7A5A]/10",
    },
    {
      label: "Payment",
      detail: "Initiated",
      status: "in_progress" as const,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Possession",
      detail: "Not yet started",
      status: "not_started" as const,
      icon: Circle,
      color: "text-slate-400",
      bg: "bg-slate-50",
    },
    {
      label: "R&R",
      detail: "In Progress",
      status: "in_progress" as const,
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-1">Current Stage</p>
        <h1 className="text-xl font-bold text-[#0F2340]">
          {currentStage ? STAGE_LABELS[currentStage.stage] : "—"}
        </h1>
      </div>

      <Card className="border-[#0F7A5A]/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <CardTitle className="text-base text-[#0F2340]">Compensation Processing</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your award has been approved and the compensation payment is currently being processed.
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base text-[#0F2340]">Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {statusGrid.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 p-4 rounded-lg border ${item.bg}`}
              >
                <div className={`shrink-0 ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
                <div className="shrink-0">
                  {item.status === "completed" && (
                    <Badge variant="success" className="text-[10px]">Done</Badge>
                  )}
                  {item.status === "in_progress" && (
                    <Badge variant="warning" className="text-[10px]">Active</Badge>
                  )}
                  {item.status === "not_started" && (
                    <Badge variant="muted" className="text-[10px]">Pending</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
