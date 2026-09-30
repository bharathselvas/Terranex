import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListOrdered, ChevronDown, ChevronUp, Gavel } from "lucide-react";
import { CITIZEN_OBJECTIONS } from "./citizenData";
import type { ObjectionStatus } from "./citizenData";

const STATUS_STYLES: Record<ObjectionStatus, { label: string; variant: "info" | "warning" | "default" | "success" | "muted" }> = {
  submitted: { label: "Submitted", variant: "info" },
  under_review: { label: "Under Review", variant: "warning" },
  hearing_scheduled: { label: "Hearing Scheduled", variant: "default" },
  decision_recorded: { label: "Decision Recorded", variant: "success" },
  closed: { label: "Closed", variant: "muted" },
};

export default function CitizenObjectionTrackingPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-[#0F2340] p-2 rounded-lg">
          <ListOrdered className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">My Objections</h1>
          <p className="text-sm text-muted-foreground">Track and manage your filed objections</p>
        </div>
      </div>

      <div className="space-y-4">
        {CITIZEN_OBJECTIONS.map((obj) => {
          const expanded = expandedId === obj.objectionId;
          const statusInfo = STATUS_STYLES[obj.status] || STATUS_STYLES.submitted;

          return (
            <Card key={obj.objectionId}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-[#0F2340]">{obj.objectionId}</CardTitle>
                    <p className="text-sm text-muted-foreground">{obj.project}</p>
                  </div>
                  <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 text-sm md:grid-cols-3">
                  <div>
                    <span className="text-muted-foreground">Category</span>
                    <p className="font-medium capitalize">{obj.category.replace(/_/g, " ")}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Submitted</span>
                    <p className="font-medium">{obj.submittedDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next Action</span>
                    <p className="font-medium">{obj.nextAction}</p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3"
                  onClick={() => setExpandedId(expanded ? null : obj.objectionId)}
                >
                  {expanded ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
                  {expanded ? "Less Details" : "View Details"}
                </Button>

                {expanded && (
                  <div className="mt-3 p-4 bg-slate-50 rounded-md space-y-3 text-sm border">
                    <p className="text-muted-foreground">{obj.description}</p>

                    {obj.hearingDate && (
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Gavel className="h-4 w-4 text-purple-600" />
                          <span className="font-semibold text-purple-800">Hearing Details</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-purple-600">Date</span>
                            <span>{obj.hearingDate} at {obj.hearingTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-600">Venue</span>
                            <span>{obj.hearingVenue}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {obj.decision && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-green-800">Decision</span>
                        </div>
                        <p className="text-sm text-green-700">{obj.decision}</p>
                        <div className="space-y-1 text-sm mt-2">
                          <div className="flex justify-between">
                            <span className="text-green-600">Date</span>
                            <span>{obj.decisionDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-600">Authority</span>
                            <span>{obj.decisionAuthority}</span>
                          </div>
                        </div>
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
