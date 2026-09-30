import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LIVELIHOOD_RECORDS } from "./rrOfficerData";
import { ArrowLeft, Sprout } from "lucide-react";

const statusColors: Record<string, string> = {
  not_applicable: "bg-gray-100 text-gray-600",
  pending_verification: "bg-amber-100 text-amber-800",
  planned: "bg-blue-100 text-blue-800",
  in_progress: "bg-indigo-100 text-indigo-800",
  delivered: "bg-purple-100 text-purple-800",
  verified: "bg-green-100 text-green-800",
  under_review: "bg-orange-100 text-orange-800",
  requires_review: "bg-rose-100 text-rose-800",
};

const categoryColors: Record<string, string> = {
  agriculture: "bg-green-100 text-green-800",
  small_business: "bg-blue-100 text-blue-800",
  livestock: "bg-amber-100 text-amber-800",
  daily_wage: "bg-purple-100 text-purple-800",
  fishing: "bg-cyan-100 text-cyan-800",
  forest_dependency: "bg-emerald-100 text-emerald-800",
  services: "bg-indigo-100 text-indigo-800",
  other: "bg-gray-100 text-gray-800",
};

export default function RrLivelihoodPage() {
  const inProgress = LIVELIHOOD_RECORDS.filter((r) => r.status === "in_progress").length;
  const verified = LIVELIHOOD_RECORDS.filter((r) => r.status === "verified").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Livelihood Restoration</h1>
        <p className="text-sm text-muted-foreground mt-1">Livelihood restoration tracking for affected families</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Tracked</p>
            <p className="text-2xl font-bold text-[#0F2340]">{LIVELIHOOD_RECORDS.length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Restored / Verified</p>
            <p className="text-2xl font-bold text-[#0F2340]">{verified}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-indigo-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold text-[#0F2340]">{inProgress}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-[#0F2340]">{LIVELIHOOD_RECORDS.length - verified - inProgress}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {LIVELIHOOD_RECORDS.map((r) => (
          <Card key={r.familyId} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-[#0F2340]">{r.familyName}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{r.familyId}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`text-xs ${categoryColors[r.category]}`}>{r.category.replace(/_/g, " ")}</Badge>
                  </div>
                </div>
                <Badge className={`text-xs ${statusColors[r.status]}`}>{r.status.replace(/_/g, " ")}</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Current Livelihood</p>
                  <p className="text-sm font-medium">{r.currentLivelihood}</p>
                </div>
                <div className="p-3 bg-red-50 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Impact</p>
                  <p className="text-sm font-medium text-red-800">{r.impact}</p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded mb-3">
                <p className="text-xs text-muted-foreground mb-1">Restoration Plan</p>
                <p className="text-sm">{r.restorationPlan}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm mb-3">
                <div><span className="text-muted-foreground">Support Required: </span><span className="font-medium">{r.supportRequired}</span></div>
                <div><span className="text-muted-foreground">Responsible Agency: </span><span className="font-medium">{r.responsibleAgency}</span></div>
                <div><span className="text-muted-foreground">Target Date: </span><span className="font-medium">{r.targetDate}</span></div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Evidence: {r.evidenceCount} items</span>
              </div>
              {r.remarks && <p className="text-xs text-muted-foreground mt-2 p-2 bg-gray-50 rounded">{r.remarks}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
