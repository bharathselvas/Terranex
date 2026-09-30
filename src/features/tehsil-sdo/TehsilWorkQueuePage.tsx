import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { WORK_QUEUE } from "./tehsilSdoData";

const categoryLabels: Record<string, string> = {
  field_verification_review: "Field Verification Review",
  land_record_review: "Land Record Review",
  ownership_discrepancy: "Ownership Discrepancy",
  collector_request: "Collector Request",
  overdue: "Overdue",
};

const categoryColors: Record<string, string> = {
  field_verification_review: "bg-blue-100 text-blue-800",
  land_record_review: "bg-amber-100 text-amber-800",
  ownership_discrepancy: "bg-orange-100 text-orange-800",
  collector_request: "bg-purple-100 text-purple-800",
  overdue: "bg-red-100 text-red-800",
};

const riskColor = (r: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[r] ?? "bg-gray-100 text-gray-700";
};

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700", in_progress: "bg-blue-100 text-blue-800",
  submitted: "bg-amber-100 text-amber-800", overdue: "bg-red-100 text-red-800",
};

export default function TehsilWorkQueuePage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const items = WORK_QUEUE.filter((item) => {
    if (filter !== "all" && item.category !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return item.projectName.toLowerCase().includes(q) || item.parcelId.toLowerCase().includes(q) || item.parcelVillage.toLowerCase().includes(q) || item.task.toLowerCase().includes(q);
    }
    return true;
  });

  const grouped = items.reduce((acc, item) => { acc[item.category] = acc[item.category] || []; acc[item.category].push(item); return acc; }, {} as Record<string, typeof WORK_QUEUE>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">My Work Queue</h1>
        <p className="text-sm text-muted-foreground">Prioritized tasks requiring Tehsil / SDO attention</p>
      </div>

      <div className="flex gap-2">
        <Input placeholder="Search parcels, projects, villages..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        <div className="flex gap-1">
          {["all", "field_verification_review", "land_record_review", "ownership_discrepancy", "collector_request", "overdue"].map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filter === cat ? "bg-[#0F2340] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              {cat === "all" ? "All" : categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {Object.entries(grouped).length === 0 ? (
        <Card className="shadow-sm"><CardContent className="py-8 text-center text-sm text-muted-foreground">No items match your filters.</CardContent></Card>
      ) : (
        Object.entries(grouped).map(([cat, catItems]) => (
          <Card key={cat} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#0F2340]">
                <Badge className={categoryColors[cat]}>{categoryLabels[cat]}</Badge>
                <span className="text-muted-foreground">({catItems.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {catItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{item.projectName}</p>
                      <p className="text-xs text-muted-foreground">{item.parcelId} &middot; {item.parcelVillage}</p>
                      <p className="mt-1 text-xs text-[#0F2340]">{item.task}</p>
                      <p className="text-[10px] text-muted-foreground">Assigned: {item.assignedOfficer}</p>
                    </div>
                    <div className="ml-4 flex flex-col items-end gap-1">
                      <Badge className={riskColor(item.priority)}>{item.priority}</Badge>
                      <Badge className={statusColors[item.status]}>{item.status}</Badge>
                      <p className="text-[10px] text-muted-foreground">{item.ageDays}d age</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
