import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RR_PLAN_COMPONENTS } from "./rrOfficerData";
import { ArrowLeft, Home } from "lucide-react";

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

export default function RrHousingPage() {
  const housing = RR_PLAN_COMPONENTS.find((c) => c.name === "Housing");
  const allHousingCases = [
    { family: "Renuka Bai Gurav", familyId: "AF-00421", site: "RS-JLN-01-H12", type: "Transit Housing", status: "delivered", occupancy: "Occupied" },
    { family: "Baburao S. Kshirsagar", familyId: "AF-00422", site: "RS-JLN-01-H15", type: "Permanent Housing", status: "in_progress", occupancy: "Under Construction" },
    { family: "Lata V. Jadhav", familyId: "AF-00426", site: "Pending Allocation", type: "Permanent Housing", status: "pending_verification", occupancy: "Grievance — Site Dispute" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Housing Support</h1>
        <p className="text-sm text-muted-foreground mt-1">Housing component tracking for R&R cases</p>
      </div>

      {/* Component Status */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4 flex items-center gap-2">
            <Home className="h-5 w-5" /> Housing Component Status
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Applicable</span><span className="font-medium">{housing?.applicable ? "Yes" : "No"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Verification</span><Badge className={`text-xs ${statusColors[housing?.verification || "pending_verification"]}`}>{housing?.verification?.replace(/_/g, " ")}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge className={`text-xs ${statusColors[housing?.status || "pending_verification"]}`}>{housing?.status?.replace(/_/g, " ")}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Target Date</span><span>{housing?.targetDate}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Evidence</span><span>{housing?.evidenceCount} items</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Responsible Officer</span><span>{housing?.responsibleOfficer}</span></div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-[#0F2340] mb-2">Remarks</p>
              <p className="text-sm text-muted-foreground">{housing?.remarks}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Housing Tracking */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Housing Tracking</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Family</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Family ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Site / Ref</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Housing Type</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Occupancy</th>
                </tr>
              </thead>
              <tbody>
                {allHousingCases.map((h) => (
                  <tr key={h.familyId} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{h.family}</td>
                    <td className="p-2 font-mono text-xs">{h.familyId}</td>
                    <td className="p-2 font-mono text-xs">{h.site}</td>
                    <td className="p-2">{h.type}</td>
                    <td className="p-2"><Badge className={`text-xs ${statusColors[h.status]}`}>{h.status.replace(/_/g, " ")}</Badge></td>
                    <td className="p-2 text-xs">{h.occupancy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <p className="text-sm text-amber-800">Housing status is tracked operationally. Legal entitlement determination requires officer review and administrative records.</p>
        </CardContent>
      </Card>
    </div>
  );
}
