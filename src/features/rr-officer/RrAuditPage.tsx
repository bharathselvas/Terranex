import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { RR_AUDIT_TRAIL } from "./rrOfficerData";
import { ArrowLeft, Shield, Clock } from "lucide-react";

export default function RrAuditPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">R&R Audit Trail</h1>
        <p className="text-sm text-muted-foreground mt-1">{RR_AUDIT_TRAIL.length} entries</p>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="relative ml-4">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200" />
            <div className="space-y-4">
              {RR_AUDIT_TRAIL.map((entry) => (
                <div key={entry.id} className="relative pl-8">
                  <div className="absolute left-0 top-3 w-3 h-3 rounded-full bg-blue-500 border-2 border-white" />
                  <div className="p-4 rounded-lg border bg-gray-50">
                    <p className="font-medium text-[#0F2340]">{entry.action}</p>
                    <p className="text-sm text-muted-foreground mt-1">{entry.details}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {entry.timestamp}</span>
                      <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> {entry.actor}</span>
                      <span>Section: {entry.section}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
