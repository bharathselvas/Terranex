import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CITIZEN_TIMELINE, STAGE_LABELS } from "./citizenData";
import { CheckCircle2, Clock, Circle, ChevronDown, ChevronUp, FileText } from "lucide-react";

export default function CitizenTimelinePage() {
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set());

  const toggleStage = (stage: string) => {
    setExpandedStages((prev) => {
      const next = new Set(prev);
      if (next.has(stage)) next.delete(stage);
      else next.add(stage);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <h1 className="text-xl font-bold text-[#0F2340]">Case Timeline</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base text-[#0F2340]">Acquisition Process Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-slate-200" />
            <div className="space-y-0">
              {CITIZEN_TIMELINE.map((step) => {
                const isExpanded = expandedStages.has(step.stage);
                const isCompleted = step.status === "completed";
                const isInProgress = step.status === "in_progress";
                const isNotStarted = step.status === "not_started";

                return (
                  <div key={step.stage} className="relative">
                    <div className="flex items-start gap-4 pl-0">
                      <div className="relative z-10 mt-1 shrink-0">
                        {isCompleted && (
                          <div className="w-8 h-8 rounded-full bg-[#0F7A5A] flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </div>
                        )}
                        {isInProgress && (
                          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                            <Clock className="h-4 w-4 text-white" />
                          </div>
                        )}
                        {isNotStarted && (
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                            <Circle className="h-4 w-4 text-slate-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 pb-2 pt-0.5">
                        <button
                          onClick={() => isCompleted && toggleStage(step.stage)}
                          className={`w-full text-left flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
                            isCompleted ? "hover:bg-slate-50 cursor-pointer" : "cursor-default"
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p
                                className={`text-sm font-medium ${
                                  isNotStarted ? "text-slate-400" : "text-slate-800"
                                }`}
                              >
                                {STAGE_LABELS[step.stage]}
                              </p>
                              {isCompleted && (
                                <Badge variant="success" className="text-[10px]">Completed</Badge>
                              )}
                              {isInProgress && (
                                <Badge variant="warning" className="text-[10px]">In Progress</Badge>
                              )}
                              {isNotStarted && (
                                <Badge variant="muted" className="text-[10px]">Not Started</Badge>
                              )}
                            </div>
                            {step.date && (
                              <p className="text-xs text-slate-500 mt-0.5">{step.date}</p>
                            )}
                          </div>
                          {isCompleted && (
                            <div className="ml-2 shrink-0 text-slate-400">
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </div>
                          )}
                        </button>

                        {isCompleted && isExpanded && (
                          <div className="mx-3 mt-1 mb-2 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-2">
                            {step.date && (
                              <div>
                                <p className="text-muted-foreground">Date</p>
                                <p className="font-medium text-slate-700">{step.date}</p>
                              </div>
                            )}
                            {step.reference && (
                              <div>
                                <p className="text-muted-foreground">Reference</p>
                                <p className="font-medium text-slate-700">{step.reference}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 text-[#0F2340] font-medium pt-1">
                              <FileText className="h-3.5 w-3.5" />
                              <span className="underline cursor-pointer hover:text-[#0F7A5A]">
                                View Document
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
