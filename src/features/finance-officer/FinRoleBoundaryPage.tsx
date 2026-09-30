import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

export default function FinRoleBoundaryPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Finance Officer — Role Boundary</h1>
        <p className="text-sm text-muted-foreground mt-1">What this role can and cannot do</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-200">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" /> Can Do
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> View all awards (read-only) and assess payment readiness</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> Verify beneficiary records and bank details (masked)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> Prepare payment packages for eligible awards</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> Initiate mock payment instructions (simulated)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> Track payment status and external references</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> Reconcile internal records with external system</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> Identify and resolve payment exceptions</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> Flag issues requiring manual intervention</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> Monitor payment workflow and delays</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> View audit trail and compliance reports</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
              <XCircle className="h-5 w-5" /> Cannot Do
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" /> Approve awards (only competent statutory authority)</li>
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" /> Authorize possession or land transfer</li>
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" /> Directly transfer real funds (mock only)</li>
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" /> Modify award amounts or beneficiaries</li>
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" /> Override payment status arbitrarily</li>
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" /> Access unmasked bank account numbers</li>
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" /> Create or delete awards</li>
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" /> Bypass reconciliation or exception workflows</li>
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" /> Connect to real PFMS or banking systems</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <p className="text-sm text-amber-800 font-medium">⚠ All financial data in this workspace is MOCK / SANDBOX</p>
          <p className="text-xs text-amber-700 mt-1">No real government payment system is connected. Values shown are for demonstration only.</p>
        </CardContent>
      </Card>
    </div>
  );
}
