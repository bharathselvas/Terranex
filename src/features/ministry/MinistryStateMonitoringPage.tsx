import { useState } from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MINISTRY_STATE_PROGRESS } from "@/features/ministry/ministryData";

const RISK_COLORS: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
  on_track: "bg-emerald-100 text-emerald-800",
};

export function MinistryStateMonitoringPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedData = MINISTRY_STATE_PROGRESS.find((s) => s.state === selected);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">State Monitoring</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ministry-level view of state-wise acquisition progress
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {MINISTRY_STATE_PROGRESS.map((state) => (
          <Card
            key={state.state}
            className={`cursor-pointer transition-colors ${selected === state.state ? "ring-2 ring-[#0F2340]" : "hover:bg-slate-50"}`}
            onClick={() => setSelected(state.state === selected ? null : state.state)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-[#0F2340]">{state.state}</p>
                <Badge className={`text-[10px] ${RISK_COLORS[state.risk]}`}>
                  {state.risk.replace("_", " ")}
                </Badge>
              </div>
              <div className="space-y-1 text-[11px] text-muted-foreground">
                <div className="flex justify-between">
                  <span>Projects</span>
                  <span className="font-medium text-slate-700">{state.projects}</span>
                </div>
                <div className="flex justify-between">
                  <span>Parcels</span>
                  <span className="font-medium text-slate-700">{state.parcels.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Progress</span>
                  <span className="font-medium text-slate-700">{state.progress}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Delayed</span>
                  <span className={`font-medium ${state.delayed > 0 ? "text-red-600" : "text-slate-700"}`}>{state.delayed}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail panel */}
      {selectedData && (
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-[#0F2340]">{selectedData.state} — Detailed View</h2>
                <p className="text-[11px] text-muted-foreground">Acquisition progress and financial status</p>
              </div>
              <Badge className={`text-[11px] ${RISK_COLORS[selectedData.risk]}`}>
                {selectedData.risk.replace("_", " ")}
              </Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">Compensation Assessed</p>
                <p className="text-sm font-semibold text-[#0F2340]">{selectedData.compensationAssessed}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">Compensation Disbursed</p>
                <p className="text-sm font-semibold text-emerald-700">{selectedData.compensationDisbursed}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">Possession Complete / Pending</p>
                <p className="text-sm font-semibold text-[#0F2340]">{selectedData.possessionComplete} / {selectedData.possessionPending}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">R&R Complete / Pending</p>
                <p className="text-sm font-semibold text-[#0F2340]">{selectedData.rrComplete} / {selectedData.rrPending}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1A3560] rounded-full"
                    style={{ width: `${selectedData.progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-700">{selectedData.progress}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
