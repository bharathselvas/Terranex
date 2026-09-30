import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, CheckCircle2, XCircle } from "lucide-react";

const CAN_DO = [
  "Review R&R cases",
  "Track affected families",
  "Review R&R eligibility information",
  "Track rehabilitation components",
  "Track resettlement components",
  "Coordinate with field officers",
  "Review field enumeration",
  "Track housing support",
  "Track subsistence support",
  "Track livelihood/employment support",
  "Track skill development",
  "Record evidence",
  "Handle R&R-related requests",
  "Monitor grievances",
  "Generate R&R reports",
];

const CANNOT_DO = [
  "Issue Section 11 notification",
  "Issue Section 19 declaration",
  "Decide acquisition objections",
  "Approve land valuation",
  "Finalize award",
  "Authorize compensation payments",
  "Authorize possession",
  "Modify statutory workflow",
];

const REQUIRED_ROLES: Record<string, string> = {
  "Issue Section 11 notification": "District Collector / CALA",
  "Issue Section 19 declaration": "District Collector / CALA",
  "Decide acquisition objections": "District Collector / CALA",
  "Approve land valuation": "District Collector / CALA",
  "Finalize award": "District Collector / CALA",
  "Authorize compensation payments": "District Collector / CALA",
  "Authorize possession": "District Collector / CALA",
  "Modify statutory workflow": "District Collector / CALA",
};

export default function RrRoleBoundaryPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Role Boundary</h1>
      </div>

      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-bold text-[#0F2340]">R&R Officer</h2>
              <p className="text-sm text-muted-foreground">Rehabilitation & Resettlement coordination role</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-200">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" /> CAN DO
            </h2>
            <div className="space-y-2">
              {CAN_DO.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm p-2 rounded bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
              <XCircle className="h-5 w-5" /> CANNOT DO
            </h2>
            <div className="space-y-2">
              {CANNOT_DO.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm p-2 rounded bg-red-50">
                  <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span>{item}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Required role: {REQUIRED_ROLES[item]}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-amber-200">
        <CardContent className="p-5">
          <h3 className="font-semibold text-[#0F2340] mb-2">Action Restricted</h3>
          <p className="text-sm text-muted-foreground mb-3">"Your current role does not have authority to perform this statutory action."</p>
          <div className="flex items-center gap-2 text-sm">
            <span>Required role: <span className="font-medium">District Collector / CALA</span></span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
