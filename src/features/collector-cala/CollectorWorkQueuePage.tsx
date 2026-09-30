import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { WORK_QUEUE, type WorkQueueItem } from "./districtCollectorData";

const categoryLabels: Record<string, string> = {
  requires_decision: "Requires Decision",
  requires_review: "Requires Review",
  approaching_deadline: "Approaching Deadline",
  escalated: "Escalated",
};

const categoryColors: Record<string, string> = {
  requires_decision: "bg-orange-100 text-orange-800",
  requires_review: "bg-blue-100 text-blue-800",
  approaching_deadline: "bg-red-100 text-red-800",
  escalated: "bg-purple-100 text-purple-800",
};

const riskColor = (risk: string) => {
  const m: Record<string, string> = {
    critical: "bg-red-100 text-red-800",
    high: "bg-orange-100 text-orange-800",
    medium: "bg-amber-100 text-amber-800",
    low: "bg-emerald-100 text-emerald-800",
  };
  return m[risk] ?? "bg-gray-100 text-gray-700";
};

const stageShort = (s: string) => {
  const m: Record<string, string> = {
    project_proposal: "Proposal",
    land_requirement: "Land Req",
    gis_identification: "GIS ID",
    submission: "Submission",
    scrutiny: "Scrutiny",
    sia: "SIA",
    preliminary_notification: "Prelim Ntf",
    public_disclosure: "Disclosure",
    objections_hearing: "Objections",
    declaration: "Declaration",
    field_verification: "FV",
    compensation: "Compensation",
    award: "Award",
    payment: "Payment",
    possession: "Possession",
    r_and_r: "R&R",
    closed: "Closed",
  };
  return m[s] ?? s;
};

export default function CollectorWorkQueuePage() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const items = WORK_QUEUE.filter((item) => {
    if (filter !== "all" && item.category !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.projectName.toLowerCase().includes(q) ||
        item.parcelId.toLowerCase().includes(q) ||
        item.parcelVillage.toLowerCase().includes(q) ||
        item.requiredAction.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const grouped = items.reduce(
    (acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, WorkQueueItem[]>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">District Collector Work Queue</h1>
        <p className="text-sm text-muted-foreground">Prioritized queue requiring Collector/CALA attention</p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Search projects, parcels, villages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-1">
          {["all", "requires_decision", "requires_review", "approaching_deadline", "escalated"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === cat ? "bg-[#0F2340] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat === "all" ? "All" : categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {Object.entries(grouped).length === 0 ? (
        <Card className="shadow-sm">
          <CardContent className="py-8 text-center text-sm text-muted-foreground">No items match your filters.</CardContent>
        </Card>
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
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{item.projectName}</p>
                        <Badge variant="outline" className="text-[10px]">{stageShort(item.currentStage)}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.parcelId} &middot; {item.parcelVillage}</p>
                      <p className="mt-1 text-xs text-[#0F2340]">{item.requiredAction}</p>
                    </div>
                    <div className="ml-4 flex flex-col items-end gap-1">
                      <Badge className={riskColor(item.risk)}>{item.risk}</Badge>
                      <p className="text-[10px] text-muted-foreground">{item.ageDays}d age</p>
                      <p className="text-[10px] text-muted-foreground">Due: {item.deadline}</p>
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
