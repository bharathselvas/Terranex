import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RR_CASES } from "./rrOfficerData";
import { ChevronRight, Search, Filter } from "lucide-react";
import { useState } from "react";

const priorityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800",
  verification_required: "bg-amber-100 text-amber-800",
  under_review: "bg-blue-100 text-blue-800",
  plan_active: "bg-indigo-100 text-indigo-800",
  partially_delivered: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  on_hold: "bg-yellow-100 text-yellow-800",
  grievance: "bg-red-100 text-red-800",
  escalated: "bg-red-200 text-red-900",
};

const STATUS_OPTIONS = ["all", "draft", "verification_required", "under_review", "plan_active", "partially_delivered", "completed", "grievance", "escalated"];
const PRIORITY_OPTIONS = ["all", "critical", "high", "medium", "low"];

export default function RrCasesPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = RR_CASES.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (priorityFilter !== "all" && c.priority !== priorityFilter) return false;
    if (search && !c.familyName.toLowerCase().includes(search.toLowerCase()) && !c.id.toLowerCase().includes(search.toLowerCase()) && !c.village.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">R&R Case Register</h1>
        <p className="text-sm text-muted-foreground mt-1">{filtered.length} of {RR_CASES.length} cases</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, case ID, or village..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-3 py-1.5 text-sm w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-1.5 text-sm">
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s === "all" ? "All Statuses" : s.replace(/_/g, " ")}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="border rounded-lg px-3 py-1.5 text-sm">
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>{p === "all" ? "All Priorities" : p}</option>
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
                  <th className="text-left p-2 font-medium text-muted-foreground">Case ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Family</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Village</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Verification</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Progress</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Pending</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Priority</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Updated</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{c.id}</td>
                    <td className="p-2 font-medium">{c.familyName}</td>
                    <td className="p-2">{c.village}</td>
                    <td className="p-2"><Badge className={`text-xs ${statusColors[c.status]}`}>{c.status.replace(/_/g, " ")}</Badge></td>
                    <td className="p-2"><Badge className={`text-xs ${c.verification === "verified" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{c.verification}</Badge></td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(c.componentsDelivered / c.componentsTotal) * 100}%` }} />
                        </div>
                        <span className="text-xs">{c.componentsDelivered}/{c.componentsTotal}</span>
                      </div>
                    </td>
                    <td className="p-2 text-xs max-w-[150px] truncate text-muted-foreground">{c.pendingAction}</td>
                    <td className="p-2"><Badge className={`text-xs ${priorityColors[c.priority]}`}>{c.priority}</Badge></td>
                    <td className="p-2 text-xs">{c.lastUpdated}</td>
                    <td className="p-2">
                      <Link to={`/app/rr/case/${c.id}`} className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                        Open <ChevronRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={10} className="p-8 text-center text-muted-foreground">No cases match the current filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
