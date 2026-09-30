import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_INSTRUCTIONS } from "./financeData";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  initiated: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  returned: "bg-red-200 text-red-900",
  pending_verification: "bg-purple-100 text-purple-800",
};

const STATUS_OPTIONS = ["all", "pending", "initiated", "completed", "failed", "returned", "pending_verification"];

export default function FinPaymentCasesPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = PAYMENT_INSTRUCTIONS.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (search && !p.beneficiaryName.toLowerCase().includes(search.toLowerCase()) && !p.paymentId.toLowerCase().includes(search.toLowerCase()) && !p.familyId.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Payment Cases</h1>
        <p className="text-sm text-muted-foreground mt-1">{filtered.length} of {PAYMENT_INSTRUCTIONS.length} payment instructions</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search by name, payment ID, or family..." value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded-lg px-3 py-1.5 text-sm w-64" />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-1.5 text-sm">
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s === "all" ? "All Statuses" : s.replace(/_/g, " ")}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Payment ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Beneficiary</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Family</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Award</th>
                  <th className="text-right p-2 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">External Ref</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Updated</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.paymentId} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{p.paymentId}</td>
                    <td className="p-2 font-medium">{p.beneficiaryName}</td>
                    <td className="p-2 font-mono text-xs">{p.familyId}</td>
                    <td className="p-2 font-mono text-xs">{p.awardId}</td>
                    <td className="p-2 text-right font-medium">₹{p.amount.toLocaleString("en-IN")}</td>
                    <td className="p-2"><Badge className={`text-xs ${statusColors[p.status]}`}>{p.status.replace(/_/g, " ")}</Badge></td>
                    <td className="p-2 font-mono text-xs">{p.externalReference || "—"}</td>
                    <td className="p-2 text-xs">{p.lastUpdated}</td>
                    <td className="p-2">
                      <Link to={`/app/finance/payment/${p.paymentId}`} className="text-blue-600 hover:underline text-xs">Open</Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="p-8 text-center text-muted-foreground">No payments match the current filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
