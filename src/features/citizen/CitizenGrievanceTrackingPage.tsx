import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LifeBuoy, ChevronDown, ChevronUp, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { CITIZEN_GRIEVANCES } from "./citizenData";
import type { GrievanceStatus } from "./citizenData";

const STATUS_STYLES: Record<GrievanceStatus, { label: string; variant: "info" | "warning" | "default" | "success" | "muted" | "danger" }> = {
  submitted: { label: "Submitted", variant: "info" },
  under_review: { label: "Under Review", variant: "warning" },
  awaiting_information: { label: "Awaiting Information", variant: "default" },
  response_provided: { label: "Response Provided", variant: "info" },
  resolved: { label: "Resolved", variant: "success" },
  escalated: { label: "Escalated", variant: "danger" },
};

export default function CitizenGrievanceTrackingPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-[#0F2340] p-2 rounded-lg">
          <LifeBuoy className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">My Grievances</h1>
          <p className="text-sm text-muted-foreground">Track and manage your submitted grievances</p>
        </div>
      </div>

      <div className="space-y-4">
        {CITIZEN_GRIEVANCES.map((grv) => {
          const expanded = expandedId === grv.grievanceId;
          const statusInfo = STATUS_STYLES[grv.status] || STATUS_STYLES.submitted;

          return (
            <Card key={grv.grievanceId}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-[#0F2340]">{grv.grievanceId}</CardTitle>
                    <p className="text-sm text-muted-foreground capitalize">{grv.category.replace(/_/g, " ")}</p>
                  </div>
                  <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 text-sm md:grid-cols-3">
                  <div>
                    <span className="text-muted-foreground">Submitted</span>
                    <p className="font-medium">{grv.submittedDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Assigned Authority</span>
                    <p className="font-medium">{grv.assignedAuthority}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Update</span>
                    <p className="font-medium">{grv.lastUpdate}</p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3"
                  onClick={() => setExpandedId(expanded ? null : grv.grievanceId)}
                >
                  {expanded ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
                  {expanded ? "Less Details" : "View Details"}
                </Button>

                {expanded && (
                  <div className="mt-3 p-4 bg-slate-50 rounded-md space-y-4 text-sm border">
                    <div>
                      <span className="font-medium text-[#0F2340]">Original Complaint</span>
                      <p className="text-muted-foreground mt-1">{grv.description}</p>
                    </div>

                    {grv.response && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                        <span className="font-medium text-green-800">Official Response</span>
                        <p className="text-sm text-green-700 mt-1">{grv.response}</p>
                        <p className="text-xs text-green-600 mt-1">Responded on {grv.responseDate}</p>
                      </div>
                    )}

                    <div>
                      <span className="font-medium text-[#0F2340]">Timeline</span>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#0F2340]" />
                          <div>
                            <p className="text-sm">Grievance submitted</p>
                            <p className="text-xs text-muted-foreground">{grv.submittedDate}</p>
                          </div>
                        </div>
                        {grv.response && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0F7A5A]" />
                            <div>
                              <p className="text-sm">Response provided</p>
                              <p className="text-xs text-muted-foreground">{grv.responseDate}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {grv.status === "resolved" && (
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="bg-[#0F7A5A] hover:bg-[#0d6a4d] text-white">
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Accept Resolution
                        </Button>
                        <Button size="sm" variant="outline">
                          <ArrowRight className="h-4 w-4 mr-1" /> Request Further Review
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
