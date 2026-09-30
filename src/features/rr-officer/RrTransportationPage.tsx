import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TRANSPORTATION_RECORDS } from "./rrOfficerData";
import { ArrowLeft, Truck, CheckCircle2, Clock } from "lucide-react";

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

export default function RrTransportationPage() {
  const delivered = TRANSPORTATION_RECORDS.filter((r) => r.status === "delivered" || r.status === "verified").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Transportation / Resettlement Support</h1>
        <p className="text-sm text-muted-foreground mt-1">Relocation and transportation tracking</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Families Requiring Relocation</p>
            <p className="text-2xl font-bold text-[#0F2340]">{TRANSPORTATION_RECORDS.length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Relocation Completed</p>
            <p className="text-2xl font-bold text-[#0F2340]">{delivered}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-[#0F2340]">{TRANSPORTATION_RECORDS.length - delivered}</p>
          </CardContent>
        </Card>
      </div>

      {/* Relocation Timeline */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Relocation Timeline</h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {["Identified", "Transport Arranged", "Move Planned", "Relocated", "Verified"].map((step, i) => {
              const isComplete = i < 3;
              const isCurrent = i === 3;
              return (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center min-w-[100px] p-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isComplete ? "border-green-500 bg-green-50" : isCurrent ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}`}>
                      {isComplete ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : isCurrent ? <Clock className="h-4 w-4 text-blue-600" /> : <span className="text-xs text-gray-400">{i + 1}</span>}
                    </div>
                    <p className="text-[10px] text-center mt-1 max-w-[90px]">{step}</p>
                  </div>
                  {i < 4 && <div className={`w-6 h-0.5 ${isComplete ? "bg-green-400" : "bg-gray-300"}`} />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {TRANSPORTATION_RECORDS.map((r) => (
          <Card key={r.familyId} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-[#0F2340]">{r.familyName}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{r.familyId}</span>
                  </div>
                </div>
                <Badge className={`text-xs ${statusColors[r.status]}`}>{r.status.replace(/_/g, " ")}</Badge>
              </div>
              <div className="grid md:grid-cols-4 gap-4 text-sm mb-3">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Origin</p>
                  <p className="font-medium">{r.originVillage}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Destination</p>
                  <p className="font-medium">{r.destination}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Distance</p>
                  <p className="font-medium">{r.distance}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Transport Type</p>
                  <p className="font-medium">{r.transportType}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Delivery Date: {r.deliveryDate || "Pending"}</span>
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
