import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEMO_CITIZEN, CITIZEN_TIMELINE, STAGE_LABELS } from "./citizenData";
import { CheckCircle2, Clock, Circle } from "lucide-react";
import { ProjectContextHeader } from "@/features/demo/ProjectContextHeader";

function getProgressPercentage() {
  const completed = CITIZEN_TIMELINE.filter((s) => s.status === "completed").length;
  return Math.round((completed / CITIZEN_TIMELINE.length) * 100);
}

export default function CitizenDashboardPage() {
  const progress = getProgressPercentage();
  const currentStage = CITIZEN_TIMELINE.find((s) => s.status === "in_progress");

  return (
    <div className="space-y-6">
      <ProjectContextHeader />

      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <h1 className="text-xl font-bold text-[#0F2340]">My Land Acquisition</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base text-[#0F2340]">Landowner Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Landowner Name</p>
              <p className="font-medium">{DEMO_CITIZEN.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Village</p>
              <p className="font-medium">{DEMO_CITIZEN.village}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">District</p>
              <p className="font-medium">{DEMO_CITIZEN.district}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Project</p>
              <p className="font-medium">{DEMO_CITIZEN.project}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Parcel Reference</p>
              <p className="font-medium">{DEMO_CITIZEN.parcelRef}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Current Stage</p>
              <p className="font-medium">
                {currentStage ? STAGE_LABELS[currentStage.stage] : "—"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base text-[#0F2340]">Acquisition Progress</CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-[#0F7A5A] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-bold text-[#0F7A5A]">{progress}%</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
            <div className="space-y-0">
              {CITIZEN_TIMELINE.map((step) => (
                <div key={step.stage} className="relative flex items-start gap-4 pl-1">
                  <div className="relative z-10 mt-0.5">
                    {step.status === "completed" && (
                      <div className="w-8 h-8 rounded-full bg-[#0F7A5A] flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                    )}
                    {step.status === "in_progress" && (
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                    )}
                    {step.status === "not_started" && (
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                        <Circle className="h-4 w-4 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 pb-4 pt-0.5">
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-sm font-medium ${
                          step.status === "not_started" ? "text-slate-400" : "text-slate-800"
                        }`}
                      >
                        {STAGE_LABELS[step.stage]}
                      </p>
                      {step.status === "completed" && (
                        <Badge variant="success" className="text-[10px]">Done</Badge>
                      )}
                      {step.status === "in_progress" && (
                        <Badge variant="warning" className="text-[10px]">In Progress</Badge>
                      )}
                    </div>
                    {step.date && (
                      <p className="text-xs text-slate-500 mt-0.5">{step.date}</p>
                    )}
                    {step.reference && (
                      <p className="text-xs text-slate-400">{step.reference}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Link to="/citizen/my-case/land">
          <Button variant="outline" className="text-[#0F2340] border-[#0F2340]">
            View My Land
          </Button>
        </Link>
        <Link to="/citizen/my-case/timeline">
          <Button variant="outline" className="text-[#0F2340] border-[#0F2340]">
            Case Timeline
          </Button>
        </Link>
        <Link to="/citizen/my-case/status">
          <Button variant="outline" className="text-[#0F2340] border-[#0F2340]">
            Current Status
          </Button>
        </Link>
      </div>
    </div>
  );
}
