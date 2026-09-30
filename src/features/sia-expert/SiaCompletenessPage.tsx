import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { SIA_SECTIONS } from "./siaExpertData";
import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";

export default function SiaCompletenessPage() {
  const allComplete = SIA_SECTIONS.every((s) => s.progress === 100);
  const completedCount = SIA_SECTIONS.filter((s) => s.progress === 100).length;
  const incompleteItems = SIA_SECTIONS.filter((s) => s.progress < 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">SIA Completeness Check</h1>
      </div>

      {/* Status */}
      <Card className={`mb-6 ${allComplete ? "border-green-300 bg-green-50" : "border-amber-300 bg-amber-50"}`}>
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            {allComplete ? <CheckCircle2 className="h-6 w-6 text-green-600" /> : <AlertTriangle className="h-6 w-6 text-amber-600" />}
            <div>
              <h2 className="text-lg font-semibold text-[#0F2340]">
                {allComplete ? "All Requirements Met" : "Incomplete Requirements"}
              </h2>
              <p className="text-sm text-muted-foreground">{completedCount} / {SIA_SECTIONS.length} sections complete</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Assessment Checklist</h2>
          <div className="space-y-3">
            {SIA_SECTIONS.map((s) => (
              <div key={s.key} className={`flex items-center justify-between p-3 rounded-lg ${s.progress === 100 ? "bg-green-50" : "bg-gray-50"}`}>
                <div className="flex items-center gap-3">
                  {s.progress === 100 ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  )}
                  <span className="font-medium text-[#0F2340]">{s.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${s.progress === 100 ? "bg-green-600" : "bg-amber-600"}`} style={{ width: `${s.progress}%` }} />
                  </div>
                  <span className="text-xs font-medium w-10 text-right">{s.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Incomplete Items */}
      {incompleteItems.length > 0 && (
        <Card className="mb-6 border-amber-200">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-amber-800 mb-3">Missing Requirements</h2>
            <div className="space-y-2">
              {incompleteItems.map((s) =>
                s.missing.map((m, i) => (
                  <div key={`${s.key}-${i}`} className="flex items-center gap-2 text-sm p-2 rounded bg-amber-50">
                    <span className="text-amber-500">⚠</span>
                    <span className="text-muted-foreground font-medium">{s.label}:</span>
                    <span>{m}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
          Return to Missing Items
        </Link>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${allComplete ? "bg-[#1B5E20] hover:bg-[#2E7D32]" : "bg-gray-400 cursor-not-allowed"}`}
          disabled={!allComplete}
        >
          Generate Draft Report
        </button>
      </div>
    </div>
  );
}
