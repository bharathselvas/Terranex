import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BENEFICIARY_RECORDS } from "./financeData";
import { Shield } from "lucide-react";

const verificationColors: Record<string, string> = {
  verified: "bg-green-100 text-green-800",
  not_verified: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
  pending: "bg-blue-100 text-blue-800",
};

export default function FinBeneficiariesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Beneficiary Records</h1>
        <p className="text-sm text-muted-foreground mt-1">{BENEFICIARY_RECORDS.length} beneficiaries in system</p>
      </div>

      <Card className="mb-4 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <p className="text-sm text-amber-800 font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" /> Sensitive data view — restricted to authorized finance workflows
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Beneficiary ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Family</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Award</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">District</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Account</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Verification</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {BENEFICIARY_RECORDS.map((b) => (
                  <tr key={b.beneficiaryId} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{b.beneficiaryId}</td>
                    <td className="p-2 font-medium">{b.name}</td>
                    <td className="p-2 font-mono text-xs">{b.familyId}</td>
                    <td className="p-2 font-mono text-xs">{b.awardId}</td>
                    <td className="p-2">{b.district}</td>
                    <td className="p-2 font-mono text-xs">{b.maskedAccount}</td>
                    <td className="p-2"><Badge className={`text-xs ${verificationColors[b.bankVerification]}`}>{b.bankVerification.replace(/_/g, " ")}</Badge></td>
                    <td className="p-2"><Link to={`/app/finance/beneficiary/${b.beneficiaryId}`} className="text-blue-600 hover:underline text-xs">View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
