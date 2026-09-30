import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STAKEHOLDER_CONSULTATIONS } from "./siaExpertData";
import { ArrowLeft, Users } from "lucide-react";

export default function SiaStakeholderPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Stakeholder Consultations</h1>
        <p className="text-sm text-muted-foreground mt-1">{STAKEHOLDER_CONSULTATIONS.length} stakeholder interactions recorded</p>
      </div>

      <div className="space-y-4">
        {STAKEHOLDER_CONSULTATIONS.map((s) => (
          <Card key={s.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#0F2340]">{s.stakeholder}</h3>
                    {s.followUpRequired && <Badge className="text-xs bg-amber-100 text-amber-800">Follow-up Required</Badge>}
                  </div>
                  <p className="text-sm mt-2">{s.issueRaised}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Impact: {s.impactCategory}</span>
                    <span>Date: {s.date}</span>
                    <span>Evidence: {s.evidenceCount}</span>
                  </div>
                  <div className="mt-3 p-3 rounded bg-gray-50 text-sm">
                    <span className="text-muted-foreground">Response: </span>{s.responseObservation}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
