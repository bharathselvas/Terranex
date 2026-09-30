import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { COMPLETION_CHECKLIST } from "./rrOfficerData";
import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";

export default function RrCompletionPage() {
  const completedCount = COMPLETION_CHECKLIST.filter((c) => c.completed).length;
  const totalCount = COMPLETION_CHECKLIST.length;
  const allComplete = completedCount === totalCount;
  const incompleteItems = COMPLETION_CHECKLIST.filter((c) => !c.completed);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">R&R Completion Checklist</h1>
      </div>

      <Card className={`mb-6 ${allComplete ? "border-green-300 bg-green-50" : "border-amber-300 bg-amber-50"}`}>
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            {allComplete ? <CheckCircle2 className="h-6 w-6 text-green-600" /> : <AlertTriangle className="h-6 w-6 text-amber-600" />}
            <div>
              <h2 className="text-lg font-semibold text-[#0F2340]">
                {allComplete ? "All Requirements Met" : `${incompleteItems.length} items require attention`}
              </h2>
              <p className="text-sm text-muted-foreground">{completedCount} / {totalCount} items complete</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Checklist</h2>
          <div className="space-y-3">
            {COMPLETION_CHECKLIST.map((item) => (
              <div key={item.label} className={`flex items-center gap-3 p-3 rounded-lg ${item.completed ? "bg-green-50" : "bg-gray-50"}`}>
                {item.completed ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <AlertTriangle className="h-5 w-5 text-amber-600" />}
                <span className={`text-sm ${item.completed ? "text-green-800" : "text-[#0F2340]"}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Link to="/app/rr/cases" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
          Return to Cases
        </Link>
        <button className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${allComplete ? "bg-[#1B5E20] hover:bg-[#2E7D32]" : "bg-gray-400 cursor-not-allowed"}`} disabled={!allComplete}>
          Initiate Completion Review
        </button>
      </div>
    </div>
  );
}
