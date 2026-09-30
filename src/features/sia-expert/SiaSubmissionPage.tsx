import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { SIA_PROJECT, SIA_ID } from "./siaExpertData";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";

export default function SiaSubmissionPage() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Submit SIA Assessment</h1>
      </div>

      {submitted ? (
        <Card className="border-green-300 bg-green-50">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#0F2340] mb-2">Assessment Submitted</h2>
            <p className="text-muted-foreground mb-4">The SIA assessment has been formally submitted to the statutory workflow.</p>
            <div className="p-4 bg-white rounded-lg inline-block text-sm text-left">
              <div className="space-y-1">
                <p><span className="text-muted-foreground">Submission ID:</span> <span className="font-mono">SUB-042-001</span></p>
                <p><span className="text-muted-foreground">Submitted by:</span> Dr. Meera Joshi</p>
                <p><span className="text-muted-foreground">Role:</span> SIA Expert Group</p>
                <p><span className="text-muted-foreground">Date/Time:</span> 09 Sep 2026 14:30 IST</p>
                <p><span className="text-muted-foreground">Version:</span> 1.2</p>
                <p><span className="text-muted-foreground">Evidence:</span> 47 items</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">The next statutory step (Section 11 Preliminary Notification) is now available to the competent authority — District Collector / CALA.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="max-w-2xl">
          {/* Summary */}
          <Card className="mb-6">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Submission Summary</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Assessment:</span> <span className="font-mono font-medium">{SIA_ID}</span></div>
                <div><span className="text-muted-foreground">Project:</span> <span className="font-medium">{SIA_PROJECT.projectName}</span></div>
                <div><span className="text-muted-foreground">Completion:</span> <span className="font-medium">96%</span></div>
                <div><span className="text-muted-foreground">Documents:</span> <span className="font-medium">18</span></div>
                <div><span className="text-muted-foreground">Consultations:</span> <span className="font-medium">8 / 8</span></div>
                <div><span className="text-muted-foreground">Affected Families:</span> <span className="font-medium">218</span></div>
                <div><span className="text-muted-foreground">Evidence:</span> <span className="font-medium">47 items</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Declaration */}
          <Card className="mb-6">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Declaration</h2>
              <div className="p-4 bg-gray-50 rounded-lg text-sm mb-4">
                "I confirm that the assessment has been prepared based on the evidence, consultations and information recorded in this assessment."
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
                <span className="text-sm">I have reviewed the assessment and agree to the declaration</span>
              </label>
            </CardContent>
          </Card>

          {/* Submit */}
          <button
            onClick={() => agreed && setShowConfirm(true)}
            className={`w-full px-6 py-3 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-2 ${agreed ? "bg-[#1B5E20] hover:bg-[#2E7D32]" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={!agreed}
          >
            <Send className="h-4 w-4" /> Submit SIA Report
          </button>

          {/* Confirmation Modal */}
          {showConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md mx-4">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-[#0F2340] mb-3">Submit Assessment?</h3>
                  <p className="text-sm text-muted-foreground mb-4">Once submitted, the assessment will enter the statutory administrative workflow. Further changes may require a formal clarification/revision process.</p>
                  <div className="flex gap-3">
                    <button onClick={() => setShowConfirm(false)} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                      Cancel
                    </button>
                    <button onClick={() => { setShowConfirm(false); setSubmitted(true); }} className="flex-1 bg-[#1B5E20] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2E7D32]">
                      Submit
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
