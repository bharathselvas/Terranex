import { useState } from "react";
import { Link } from "react-router-dom";
import { GitBranch, CheckCircle, AlertTriangle, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DISTRICT_ROUTING } from "@/features/state-nodal/stateNodalData";
import { stageShortLabel } from "@/lib/format";

export function DistrictRoutingPage() {
  const [selectedProject, setSelectedProject] = useState(DISTRICT_ROUTING[0]?.projectId ?? "");

  const routing = DISTRICT_ROUTING.find((r) => r.projectId === selectedProject);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">District Routing</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Route accepted projects to appropriate district authorities</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-[11px] text-blue-800">
        Route projects only within Maharashtra state jurisdiction. District routing assigns the project to the District Collector / CALA for statutory actions.
      </div>

      <div className="flex flex-wrap gap-2">
        {DISTRICT_ROUTING.map((r) => (
          <button
            key={r.projectId}
            onClick={() => setSelectedProject(r.projectId)}
            className={`px-3 py-2 rounded-md text-[11px] font-medium transition-colors ${selectedProject === r.projectId ? "bg-[#0F2340] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            {r.projectName}
          </button>
        ))}
      </div>

      {routing && (
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-[#0F2340]">{routing.projectName}</h2>
                <p className="text-[11px] text-muted-foreground">{routing.state} — {routing.districts.length} district(s) detected</p>
              </div>
            </div>
            <div className="space-y-3">
              {routing.districts.map((d) => (
                <div key={d.name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-[#0F2340]">{d.name}</h3>
                      <p className="text-[11px] text-muted-foreground">Collector: {d.collector}</p>
                    </div>
                    <Badge className={`text-[9px] ${d.status === "routed" ? "bg-emerald-100 text-emerald-800" : d.status === "accepted" ? "bg-blue-100 text-blue-800" : d.status === "in_progress" ? "bg-violet-100 text-violet-800" : "bg-amber-100 text-amber-800"}`}>
                      {d.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-[11px]">
                    <div>
                      <p className="text-muted-foreground">Parcels</p>
                      <p className="font-medium text-[#0F2340]">{d.parcels.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tehsils</p>
                      <p className="font-medium text-[#0F2340]">{d.tehsils}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Current Stage</p>
                      <p className="font-medium text-[#0F2340]">{stageShortLabel(d.currentStage)}</p>
                    </div>
                  </div>
                  {d.status === "pending" && (
                    <Button size="sm" className="mt-3 bg-[#1A3560] hover:bg-[#0F2340]">
                      <CheckCircle className="h-4 w-4 mr-1" /> Route to District
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
