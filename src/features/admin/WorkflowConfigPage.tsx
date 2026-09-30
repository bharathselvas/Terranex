import { useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  Lock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Users,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { STAGES, type StageMeta } from "@/lib/stages";
import { stageGroupColor } from "@/lib/format";
import { ROLE_BY_ID } from "@/types/rbac";

export function WorkflowConfigPage() {
  const [selectedStage, setSelectedStage] = useState<StageMeta>(STAGES[0]);

  const allowedNext = STAGES.filter((s) => s.order === selectedStage.order + 1);
  const blockedTransitions = STAGES.filter(
    (s) => s.order > selectedStage.order + 1 && s.order !== selectedStage.order
  ).slice(0, 5);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Workflow Configuration</h1>
          <p className="text-xs text-muted-foreground">Statutory workflow — RFCTLARR Act, 2013 — 17 lifecycle stages</p>
        </div>
        <Badge variant="secondary" className="text-[11px]">
          <Lock className="h-3 w-3 mr-1" /> Read-only in demo
        </Badge>
      </div>

      {/* Stage Pipeline */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-1">
            {STAGES.map((stage) => {
              const isSelected = stage.id === selectedStage.id;
              const groupColor = stageGroupColor(stage.group);
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage)}
                  className={`flex flex-col items-center gap-1 px-2 py-2 rounded-md text-center transition-all min-w-[70px] ${
                    isSelected
                      ? "bg-[#0F2340] text-white ring-2 ring-[#0F2340] ring-offset-1"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${isSelected ? "bg-white" : groupColor}`} />
                  <span className="text-[10px] font-medium leading-tight">{stage.shortLabel}</span>
                  <span className="text-[9px] opacity-70">#{stage.order}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stage Detail */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        {/* Left — Stage info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <span className={`w-4 h-4 rounded ${stageGroupColor(selectedStage.group)}`} />
              Stage #{selectedStage.order}: {selectedStage.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] text-muted-foreground">Short Label</p>
                <p className="text-sm font-medium">{selectedStage.shortLabel}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">SLA (Days)</p>
                <p className="text-sm font-medium">{selectedStage.slaDays} days</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Group</p>
                <Badge variant="secondary" className="text-[10px] capitalize">{selectedStage.group}</Badge>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Order</p>
                <p className="text-sm font-medium">{selectedStage.order} of {STAGES.length}</p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-[11px] font-semibold text-muted-foreground mb-1">Statutory Reference</p>
              <p className="text-sm text-slate-700">{selectedStage.statutoryRef}</p>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-muted-foreground mb-1">Responsible Role</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">
                  {ROLE_BY_ID[selectedStage.responsibleRoleId]?.label ?? selectedStage.responsibleRoleId}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-muted-foreground mb-1">All Responsible Roles</p>
              <div className="flex flex-wrap gap-1">
                {selectedStage.responsibleRoles.map((rid) => (
                  <Badge key={rid} variant="outline" className="text-[10px]">
                    {ROLE_BY_ID[rid]?.shortLabel ?? rid}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right — Transitions */}
        <div className="space-y-4">
          {/* Allowed transition */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="h-4 w-4" /> Allowed Transition
              </CardTitle>
            </CardHeader>
            <CardContent>
              {allowedNext.length > 0 ? (
                <div className="space-y-2">
                  {allowedNext.map((next) => (
                    <div key={next.id} className="flex items-center gap-3 p-3 rounded-md border border-emerald-200 bg-emerald-50">
                      <span className="text-xs font-medium text-emerald-800">{selectedStage.shortLabel}</span>
                      <ArrowRight className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-800">{next.shortLabel}</span>
                      <Badge variant="secondary" className="text-[10px] ml-auto">{next.statutoryRef.split("—")[0].trim()}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Terminal stage — no forward transition.</p>
              )}
            </CardContent>
          </Card>

          {/* Blocked transitions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-[#B42318]">
                <XCircle className="h-4 w-4" /> Blocked Transitions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                {blockedTransitions.map((blocked) => (
                  <div key={blocked.id} className="flex items-center gap-3 px-3 py-2 rounded-md bg-red-50 text-xs">
                    <span className="font-medium text-red-800">{selectedStage.shortLabel}</span>
                    <XCircle className="h-3.5 w-3.5 text-red-400" />
                    <span className="text-red-700">{blocked.shortLabel}</span>
                    <span className="text-[10px] text-red-500 ml-auto">Not allowed</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prerequisites */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" /> Prerequisites & Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {selectedStage.order > 1 && (
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Previous stage ({STAGES[selectedStage.order - 2]?.shortLabel}) completed</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs">
                <FileText className="h-3.5 w-3.5 text-slate-500" />
                <span>Required documents submitted</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Users className="h-3.5 w-3.5 text-slate-500" />
                <span>Assigned officer verified</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Shield className="h-3.5 w-3.5 text-slate-500" />
                <span>Audit trail entry created</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
