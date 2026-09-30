import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ASSESSMENT_VERSIONS } from "./siaExpertData";
import { ArrowLeft, Clock, FileText } from "lucide-react";

const statusColors: Record<string, string> = {
  draft: "bg-purple-100 text-purple-800",
  revised: "bg-amber-100 text-amber-800",
  submitted: "bg-green-100 text-green-800",
};

export default function SiaVersionHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Assessment Versions</h1>
        <p className="text-sm text-muted-foreground mt-1">{ASSESSMENT_VERSIONS.length} versions recorded</p>
      </div>

      <div className="relative ml-4">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200" />
        <div className="space-y-6">
          {ASSESSMENT_VERSIONS.map((v, i) => (
            <div key={v.version} className="relative pl-8">
              <div className={`absolute left-0 top-4 w-4 h-4 rounded-full border-2 bg-white ${v.status === "submitted" ? "border-green-500" : "border-blue-500"}`} />
              <Card className={`hover:shadow-md transition-shadow ${i === ASSESSMENT_VERSIONS.length - 1 ? "border-blue-300" : ""}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#0F2340]">Version {v.version}</h3>
                        <Badge className={`text-xs ${statusColors[v.status]}`}>{v.status}</Badge>
                        {i === ASSESSMENT_VERSIONS.length - 1 && <Badge className="text-xs bg-blue-100 text-blue-800">Current</Badge>}
                      </div>
                      <p className="text-sm mt-2">{v.report}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {v.date}</span>
                        <span>By: {v.actor}</span>
                        <span>Evidence: {v.evidenceCount} items</span>
                      </div>
                    </div>
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
