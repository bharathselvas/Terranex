import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SPECIAL_SUPPORT_RECORDS } from "./rrOfficerData";
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react";

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

const verificationColors: Record<string, string> = {
  verified: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  conflict: "bg-red-100 text-red-800",
  requires_review: "bg-rose-100 text-rose-800",
};

export default function RrSpecialSupportPage() {
  const verified = SPECIAL_SUPPORT_RECORDS.filter((r) => r.verification === "verified").length;
  const requiresReview = SPECIAL_SUPPORT_RECORDS.filter((r) => r.verification === "requires_review").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Special Support</h1>
        <p className="text-sm text-muted-foreground mt-1">Additional support for vulnerable families — requires officer review</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Tracked</p>
            <p className="text-2xl font-bold text-[#0F2340]">{SPECIAL_SUPPORT_RECORDS.length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Verified</p>
            <p className="text-2xl font-bold text-[#0F2340]">{verified}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-rose-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Requires Review</p>
            <p className="text-2xl font-bold text-[#0F2340]">{requiresReview}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
            <p className="text-sm text-amber-800">Do not automatically determine enhanced statutory benefits. Each item requires officer review and verification before determining applicability.</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {SPECIAL_SUPPORT_RECORDS.map((r) => (
          <Card key={r.familyId} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-[#0F2340]">{r.familyName}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{r.familyId}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${verificationColors[r.verification]}`}>{r.verification.replace(/_/g, " ")}</Badge>
                  <Badge className={`text-xs ${statusColors[r.status]}`}>{r.status.replace(/_/g, " ")}</Badge>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded mb-3">
                <p className="text-xs text-muted-foreground mb-1">Indicator</p>
                <p className="text-sm font-medium text-purple-800">{r.indicator}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm mb-3">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="font-medium">{r.source}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Evidence Items</p>
                  <p className="font-medium">{r.evidenceCount} items</p>
                </div>
              </div>

              {r.officerRemarks && (
                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Officer Remarks</p>
                  <p className="text-sm">{r.officerRemarks}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
