import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SOURCE_VERIFICATION } from "./rrOfficerData";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const statusColors: Record<string, string> = {
  verified: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  conflict: "bg-red-100 text-red-800",
  not_available: "bg-gray-100 text-gray-600",
};

export default function RrVerificationPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Source & Verification</h1>
        <p className="text-sm text-muted-foreground mt-1">Information sources and verification status</p>
      </div>

      <div className="space-y-4">
        {SOURCE_VERIFICATION.map((s) => (
          <Card key={s.source} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#0F2340]">{s.source}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {s.available ? `${s.date} — Uploaded by ${s.uploadedBy}` : "Not available"}
                  </p>
                  {s.evidenceCount > 0 && <p className="text-xs text-muted-foreground mt-1">{s.evidenceCount} evidence items</p>}
                </div>
                <Badge className={`text-xs ${statusColors[s.verificationStatus]}`}>{s.verificationStatus.replace(/_/g, " ")}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
            <p className="text-sm text-amber-800">Verification status is based on officer review and evidence matching. Do not assume automatic legal compliance.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
