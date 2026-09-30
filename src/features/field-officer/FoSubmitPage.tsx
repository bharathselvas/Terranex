import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { FIELD_TASKS } from "./fieldOfficerData";
import { ArrowLeft, CheckCircle2, XCircle, Save, Send } from "lucide-react";

export default function FoSubmitPage() {
  const { taskId } = useParams();
  const task = FIELD_TASKS.find((t) => t.id === taskId) ?? FIELD_TASKS[0];

  const checklist = [
    { label: "GPS captured", done: task.gpsCaptured },
    { label: "Required photos captured", done: task.photosCount >= 2 },
    { label: "Owner information recorded", done: task.ownerVerified },
    { label: "Assets reviewed", done: task.assetsEnumerated },
    { label: "Documents attached", done: task.documentsCount > 0 },
    { label: "Observations completed", done: task.observationsCount > 0 },
  ];
  const allDone = checklist.every((c) => c.done);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/task/${task.id}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Submit Field Report</h1>
          <p className="text-sm text-muted-foreground">{task.parcelId} — {task.projectName}</p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <p className="mb-3 text-xs font-semibold text-[#0F2340]">SUBMISSION CHECKLIST</p>
          <div className="space-y-2">
            {checklist.map((c) => (
              <div key={c.label} className={`flex items-center justify-between rounded-lg border p-3 ${c.done ? "border-emerald-300 bg-emerald-50/50" : "border-red-300 bg-red-50/50"}`}>
                <span className="text-sm">{c.label}</span>
                {c.done ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <XCircle className="h-4 w-4 text-red-500" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {allDone ? (
        <Card className="border-emerald-300 bg-emerald-50/50 shadow-sm">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-600" />
            <p className="mt-2 text-sm font-semibold text-emerald-800">Ready to submit</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-red-300 bg-red-50/50 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-semibold text-red-800">Cannot Submit</p>
            <p className="mt-1 text-xs text-red-700">Required evidence missing:</p>
            <ul className="mt-1 list-inside list-disc text-xs text-red-700">
              {checklist.filter((c) => !c.done).map((c) => <li key={c.label}>{c.label}</li>)}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3">
        <button className="flex-1 rounded-lg border border-[#0F2340] px-4 py-3 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5"><Save className="mr-2 inline h-4 w-4" />Save Draft</button>
        <button disabled={!allDone} className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium text-white ${allDone ? "bg-[#0F2340] hover:bg-[#1a3560]" : "bg-gray-400 cursor-not-allowed"}`}><Send className="mr-2 inline h-4 w-4" />Submit Field Report</button>
      </div>
    </div>
  );
}
