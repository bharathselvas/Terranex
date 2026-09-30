import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PUBLIC_CONSULTATIONS } from "./siaExpertData";
import { ArrowLeft } from "lucide-react";

const statusColors: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-800",
  conducted: "bg-amber-100 text-amber-800",
  completed: "bg-green-100 text-green-800",
};

export default function SiaPublicConsultationPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Public Consultations</h1>
        <p className="text-sm text-muted-foreground mt-1">{PUBLIC_CONSULTATIONS.length} consultation events recorded</p>
      </div>

      {/* Timeline */}
      <div className="relative ml-4">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200" />
        <div className="space-y-6">
          {PUBLIC_CONSULTATIONS.map((c) => (
            <div key={c.id} className="relative pl-8">
              <div className={`absolute left-0 top-4 w-4 h-4 rounded-full border-2 bg-white ${c.status === "completed" ? "border-green-500" : "border-blue-500"}`} />
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#0F2340]">{c.eventType}</h3>
                        <Badge className={`text-xs ${statusColors[c.status]}`}>{c.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{c.date} | {c.location}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Participants: {c.participants}</span>
                        <span>Stakeholder: {c.stakeholderCategory}</span>
                        <span>Evidence: {c.evidenceCount}</span>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs text-muted-foreground mb-1">Issues Raised:</p>
                        <div className="space-y-1">
                          {c.issuesRaised.map((issue, i) => (
                            <div key={i} className="text-sm p-2 rounded bg-gray-50">{issue}</div>
                          ))}
                        </div>
                      </div>
                      {c.unresolvedConcerns.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-amber-600 mb-1">Unresolved:</p>
                          {c.unresolvedConcerns.map((u, i) => (
                            <div key={i} className="text-sm p-2 rounded bg-amber-50 text-amber-800">{u}</div>
                          ))}
                        </div>
                      )}
                    </div>
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
