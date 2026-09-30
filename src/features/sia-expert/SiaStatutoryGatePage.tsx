import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LIFECYCLE_STAGES, SIA_PROJECT } from "./siaExpertData";
import { ArrowLeft, CheckCircle2, Lock, Clock, AlertTriangle } from "lucide-react";

export default function SiaStatutoryGatePage() {
  const [showGateModal, setShowGateModal] = useState(false);

  const stageIcons: Record<string, typeof CheckCircle2> = {
    complete: CheckCircle2,
    current: Clock,
    locked: Lock,
  };

  const stageColors: Record<string, string> = {
    complete: "border-green-500 bg-green-50 text-green-700",
    current: "border-blue-500 bg-blue-50 text-blue-700",
    locked: "border-gray-300 bg-gray-100 text-gray-500",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Statutory Gate Visualization</h1>
        <p className="text-sm text-muted-foreground mt-1">Workflow gate enforcement — SIA is a mandatory prerequisite for Section 11</p>
      </div>

      {/* Current Stage Panel */}
      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Stage</p>
              <h2 className="text-xl font-bold text-[#0F2340]">Social Impact Assessment (SIA)</h2>
              <p className="text-sm text-muted-foreground mt-1">Assessment in progress — {SIA_PROJECT.projectName}</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 text-sm">CURRENT</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Lifecycle Flow */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-6">Acquisition Lifecycle — Statutory Flow</h2>
          <div className="space-y-4">
            {LIFECYCLE_STAGES.map((stage, i) => {
              const Icon = stageIcons[stage.status];
              return (
                <div key={stage.key} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${stageColors[stage.status]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${stage.status === "locked" ? "text-gray-400" : "text-[#0F2340]"}`}>{stage.label}</span>
                      {stage.status === "complete" && <Badge className="text-xs bg-green-100 text-green-800">Complete</Badge>}
                      {stage.status === "current" && <Badge className="text-xs bg-blue-100 text-blue-800">Current</Badge>}
                      {stage.status === "locked" && <Badge className="text-xs bg-gray-100 text-gray-600">Locked</Badge>}
                    </div>
                  </div>
                  {i < LIFECYCLE_STAGES.length - 1 && <div className="w-0.5 h-4 bg-gray-300 ml-5" />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Gate Status */}
      <Card className="mb-6 border-amber-200">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Why is Section 11 locked?</h2>
          <div className="p-4 bg-amber-50 rounded-lg text-sm text-amber-800">
            SIA assessment has not yet been formally submitted. Section 11 Preliminary Notification cannot proceed until the required SIA stage has been completed.
          </div>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800 mb-2">Required:</p>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Scrutiny — Complete</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-amber-600" /> SIA submission — In Progress</div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-800 mb-2">Action Owner for Next Step:</p>
              <p className="text-sm">District Collector / CALA</p>
              <p className="text-xs text-muted-foreground mt-1">The SIA Expert Group performs the assessment; the competent statutory authority performs the subsequent statutory action.</p>
            </div>
          </div>

          <button onClick={() => setShowGateModal(true)} className="mt-4 bg-white border border-amber-500 text-amber-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> Try Advance (Demo)
          </button>
        </CardContent>
      </Card>

      {/* Gate Enforcement Modal */}
      {showGateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-red-100">
                  <Lock className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-[#0F2340]">Workflow Gate Enforced</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Section 11 Preliminary Notification cannot proceed until the required SIA stage has been completed.
              </p>
              <div className="p-4 bg-gray-50 rounded-lg text-sm mb-4">
                <p className="font-medium mb-2">Required:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Scrutiny</div>
                  <div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-600" /> SIA submission</div>
                </div>
                <p className="font-medium mt-3 mb-1">Current:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Scrutiny</div>
                  <div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-600" /> SIA submission</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Action owner for next statutory step: <span className="font-medium">District Collector / CALA</span></p>
              <button onClick={() => setShowGateModal(false)} className="w-full bg-[#1B5E20] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2E7D32]">
                Close
              </button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
