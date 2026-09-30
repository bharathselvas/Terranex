import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TEHSIL_REPORTS, TEHSIL_PROJECTS } from "./tehsilSdoData";

const catColors: Record<string, string> = {
  verification: "bg-emerald-100 text-emerald-800", land_record: "bg-amber-100 text-amber-800",
  field: "bg-blue-100 text-blue-800", objection: "bg-purple-100 text-purple-800",
  possession: "bg-orange-100 text-orange-800", delay: "bg-red-100 text-red-800",
};

export default function TehsilReportsPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const filtered = selectedType === "all" ? TEHSIL_REPORTS : TEHSIL_REPORTS.filter((r) => r.category === selectedType);

  const projSummary = TEHSIL_PROJECTS.map((p) => ({
    name: p.projectName,
    parcels: p.parcels,
    pending: p.verificationPending,
    issues: p.ownershipIssues,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Reports</h1>
        <p className="text-sm text-muted-foreground">Tehsil-level reports and summary data</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", "verification", "land_record", "field", "objection", "possession", "delay"].map((t) => (
          <button key={t} onClick={() => setSelectedType(t)} className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${selectedType === t ? "bg-[#0F2340] text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}>{t === "all" ? "All" : t.replace("_", " ")}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((r) => (
            <Card key={r.id} className="shadow-sm">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.description}</p>
                  </div>
                  <Badge className={catColors[r.category]}>{r.category.replace("_", " ")}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <Card className="shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Project Summary</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {projSummary.map((p) => (
                  <div key={p.name} className="rounded border p-2">
                    <p className="text-xs font-medium">{p.name}</p>
                    <div className="mt-1 grid grid-cols-3 gap-1">
                      <div className="text-center"><p className="text-[10px] text-muted-foreground">Parcels</p><p className="text-xs font-bold">{p.parcels}</p></div>
                      <div className="text-center"><p className="text-[10px] text-muted-foreground">Pending</p><p className="text-xs font-bold text-amber-700">{p.pending}</p></div>
                      <div className="text-center"><p className="text-[10px] text-muted-foreground">Issues</p><p className="text-xs font-bold text-red-700">{p.issues}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
