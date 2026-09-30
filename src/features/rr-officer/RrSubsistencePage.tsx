import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SUBSISTENCE_RECORDS } from "./rrOfficerData";
import { ArrowLeft, IndianRupee } from "lucide-react";

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

export default function RrSubsistencePage() {
  const totalFamilies = SUBSISTENCE_RECORDS.length;
  const delivered = SUBSISTENCE_RECORDS.filter((r) => r.deliveryStatus === "delivered" || r.deliveryStatus === "verified").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Subsistence Support</h1>
        <p className="text-sm text-muted-foreground mt-1">Subsistence support tracking for R&R cases</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Families</p>
            <p className="text-2xl font-bold text-[#0F2340]">{totalFamilies}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Delivered / Verified</p>
            <p className="text-2xl font-bold text-[#0F2340]">{delivered}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Pending Verification</p>
            <p className="text-2xl font-bold text-[#0F2340]">{totalFamilies - delivered}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <p className="text-sm text-amber-800">Subsistence amounts shown are mock / officer-entered reference values. Do not connect to payment systems.</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {SUBSISTENCE_RECORDS.map((r) => {
          return (
            <Card key={r.familyId} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#0F2340]">{r.familyName}</h3>
                      <span className="font-mono text-xs text-muted-foreground">{r.familyId}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Support Period: {r.supportPeriod}</p>
                  </div>
                  <Badge className={`text-xs ${statusColors[r.deliveryStatus]}`}>{r.deliveryStatus.replace(/_/g, " ")}</Badge>
                </div>
                <div className="grid md:grid-cols-4 gap-4 text-sm mb-3">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-xs text-muted-foreground">Monthly Amount</p>
                    <p className="font-medium flex items-center gap-1"><IndianRupee className="h-3 w-3" /> {r.monthlyAmount.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-xs text-muted-foreground">Total Amount</p>
                    <p className="font-medium flex items-center gap-1"><IndianRupee className="h-3 w-3" /> {r.totalAmount.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-xs text-muted-foreground">Payments Made</p>
                    <p className="font-medium">{r.paymentsMade} / 12</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-xs text-muted-foreground">Last Payment</p>
                    <p className="font-medium">{r.lastPaymentDate || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Ref: {r.referenceDoc}</span>
                  <span>Evidence: {r.evidenceCount} items</span>
                  <span>Verification: <Badge className={`text-xs ${r.verification === "verified" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{r.verification}</Badge></span>
                </div>
                {r.remarks && <p className="text-xs text-muted-foreground mt-2 p-2 bg-gray-50 rounded">{r.remarks}</p>}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
