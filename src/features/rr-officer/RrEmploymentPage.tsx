import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EMPLOYMENT_RECORDS } from "./rrOfficerData";
import { ArrowLeft, Briefcase } from "lucide-react";

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

const eligibilityColors: Record<string, string> = {
  eligible: "bg-green-100 text-green-800",
  under_review: "bg-amber-100 text-amber-800",
  not_eligible: "bg-red-100 text-red-800",
  pending_verification: "bg-orange-100 text-orange-800",
};

export default function RrEmploymentPage() {
  const eligible = EMPLOYMENT_RECORDS.filter((r) => r.eligibilityStatus === "eligible").length;
  const underReview = EMPLOYMENT_RECORDS.filter((r) => r.eligibilityStatus === "under_review").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Employment Support</h1>
        <p className="text-sm text-muted-foreground mt-1">Employment support tracking — not guaranteed employment</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Tracked</p>
            <p className="text-2xl font-bold text-[#0F2340]">{EMPLOYMENT_RECORDS.length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Eligible</p>
            <p className="text-2xl font-bold text-[#0F2340]">{eligible}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Under Review</p>
            <p className="text-2xl font-bold text-[#0F2340]">{underReview}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-gray-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Not Applicable</p>
            <p className="text-2xl font-bold text-[#0F2340]">{EMPLOYMENT_RECORDS.filter((r) => r.status === "not_applicable").length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <p className="text-sm text-amber-800">Employment support tracking — not guaranteed employment. Eligibility requires officer review and administrative confirmation.</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {EMPLOYMENT_RECORDS.map((r) => (
          <Card key={r.familyId} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-[#0F2340]">{r.familyName}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{r.familyId}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${eligibilityColors[r.eligibilityStatus]}`}>{r.eligibilityStatus.replace(/_/g, " ")}</Badge>
                  <Badge className={`text-xs ${statusColors[r.status]}`}>{r.status.replace(/_/g, " ")}</Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm mb-3">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Employment Category</p>
                  <p className="font-medium">{r.employmentCategory}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Coordinating Agency</p>
                  <p className="font-medium">{r.coordinatingAgency}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Supporting Documents</p>
                  <p className="font-medium">{r.supportingDocCount} items</p>
                </div>
              </div>

              {r.remarks && <p className="text-xs text-muted-foreground mt-2 p-2 bg-gray-50 rounded">{r.remarks}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
