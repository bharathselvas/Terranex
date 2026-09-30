import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RNR_FIELD_DATA } from "./tehsilSdoData";

const statusLabels: Record<string, string> = {
  not_collected: "Not Collected", collected: "Collected", under_review: "Under Review", submitted: "Submitted",
};

const statusColors: Record<string, string> = {
  not_collected: "bg-gray-100 text-gray-700", collected: "bg-blue-100 text-blue-800",
  under_review: "bg-amber-100 text-amber-800", submitted: "bg-emerald-100 text-emerald-800",
};

export default function TehsilRnrFieldPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const entry = RNR_FIELD_DATA.find((r) => r.familyId === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">R&R Field Data</h1>
        <p className="text-sm text-muted-foreground">Local R&R data collection — affected family information</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="shadow-sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-bold text-[#0F2340]">{RNR_FIELD_DATA.length}</p><p className="text-xs text-muted-foreground">Total Families</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-bold text-emerald-700">{RNR_FIELD_DATA.filter((r) => r.status === "submitted").length}</p><p className="text-xs text-muted-foreground">Submitted</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-bold text-amber-700">{RNR_FIELD_DATA.filter((r) => r.status === "collected" || r.status === "under_review").length}</p><p className="text-xs text-muted-foreground">In Progress</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-bold text-gray-700">{RNR_FIELD_DATA.filter((r) => r.status === "not_collected").length}</p><p className="text-xs text-muted-foreground">Not Collected</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Families ({RNR_FIELD_DATA.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {RNR_FIELD_DATA.map((r) => (
                <button key={r.familyId} onClick={() => setSelected(r.familyId)} className={`w-full rounded-lg border p-3 text-left transition-colors ${selected === r.familyId ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{r.familyId}</p>
                    <Badge className={statusColors[r.status]}>{statusLabels[r.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.village} &middot; {r.parcelId}</p>
                  <p className="text-[10px] text-muted-foreground">{r.projectName} &middot; HH: {r.householdSize}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Family Details</CardTitle></CardHeader>
          <CardContent>
            {entry ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{entry.familyId}</p>
                  <p className="text-xs text-muted-foreground">{entry.village} &middot; {entry.parcelId}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground">Household Size</p><p className="text-sm font-medium">{entry.householdSize}</p></div>
                  <div><p className="text-xs text-muted-foreground">Status</p><Badge className={statusColors[entry.status]}>{statusLabels[entry.status]}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Housing</p><p className="text-xs">{entry.housing}</p></div>
                  <div><p className="text-xs text-muted-foreground">Livelihood</p><p className="text-xs">{entry.livelihood}</p></div>
                  <div><p className="text-xs text-muted-foreground">Transport</p><p className="text-xs">{entry.transport}</p></div>
                  <div><p className="text-xs text-muted-foreground">Employment</p><p className="text-xs">{entry.employment}</p></div>
                  <div><p className="text-xs text-muted-foreground">Skill Training</p><p className="text-xs">{entry.skillTraining}</p></div>
                  <div><p className="text-xs text-muted-foreground">Special Support</p><p className="text-xs">{entry.specialSupport}</p></div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Collect Data</button>
                  <button className="rounded-lg border border-[#0F2340] px-4 py-2 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5">Submit to Collector</button>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select a family</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
