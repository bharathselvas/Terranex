import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RECONCILIATION_RECORDS } from "./financeData";

const statusColors: Record<string, string> = {
  matched: "bg-green-100 text-green-800",
  mismatched: "bg-red-100 text-red-800",
  partial: "bg-amber-100 text-amber-800",
  unresolved: "bg-gray-100 text-gray-800",
};

export default function FinReconciliationPage() {
  const matched = RECONCILIATION_RECORDS.filter((r) => r.status === "matched").length;
  const mismatched = RECONCILIATION_RECORDS.filter((r) => r.status === "mismatched" || r.status === "partial").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Reconciliation</h1>
        <p className="text-sm text-muted-foreground mt-1">Internal-external reconciliation tracking</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Matched</p>
            <p className="text-2xl font-bold text-[#0F2340]">{matched}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Mismatched / Partial</p>
            <p className="text-2xl font-bold text-[#0F2340]">{mismatched}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-gray-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Records</p>
            <p className="text-2xl font-bold text-[#0F2340]">{RECONCILIATION_RECORDS.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Reconciliation ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Award</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Payment ID</th>
                  <th className="text-right p-2 font-medium text-muted-foreground">Internal Amount</th>
                  <th className="text-right p-2 font-medium text-muted-foreground">External Amount</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Difference</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Resolution</th>
                </tr>
              </thead>
              <tbody>
                {RECONCILIATION_RECORDS.map((r) => (
                  <tr key={r.reconciliationId} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{r.reconciliationId}</td>
                    <td className="p-2 font-mono text-xs">{r.awardId}</td>
                    <td className="p-2 font-mono text-xs">{r.paymentId || "—"}</td>
                    <td className="p-2 text-right">₹{r.internalAmount.toLocaleString("en-IN")}</td>
                    <td className="p-2 text-right">₹{r.externalAmount.toLocaleString("en-IN")}</td>
                    <td className={`p-2 font-medium ${r.difference !== 0 ? "text-red-700" : "text-green-700"}`}>{r.difference !== 0 ? `₹${r.difference.toLocaleString("en-IN")}` : "—"}</td>
                    <td className="p-2"><Badge className={`text-xs ${statusColors[r.status]}`}>{r.status}</Badge></td>
                    <td className="p-2 text-xs max-w-[200px] truncate">{r.resolution || "—"}</td>
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
