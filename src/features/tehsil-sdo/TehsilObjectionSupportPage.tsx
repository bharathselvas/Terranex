import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OBJECTION_SUPPORT } from "./tehsilSdoData";

const statusLabels: Record<string, string> = {
  new: "New", evidence_collection: "Evidence Collection", land_record_check: "Land Record Check",
  hearing_prep: "Hearing Prep", submitted_to_collector: "Submitted to Collector",
};

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800", evidence_collection: "bg-amber-100 text-amber-800",
  land_record_check: "bg-purple-100 text-purple-800", hearing_prep: "bg-orange-100 text-orange-800",
  submitted_to_collector: "bg-emerald-100 text-emerald-800",
};

export default function TehsilObjectionSupportPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const obj = OBJECTION_SUPPORT.find((o) => o.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Objection Support</h1>
        <p className="text-sm text-muted-foreground">Support Collector's objection workflow — evidence collection, land record checks</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Objections ({OBJECTION_SUPPORT.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {OBJECTION_SUPPORT.map((o) => (
                <button key={o.id} onClick={() => setSelected(o.id)} className={`w-full rounded-lg border p-3 text-left transition-colors ${selected === o.id ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{o.parcelId}</p>
                    <Badge className={statusColors[o.status]}>{statusLabels[o.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{o.village} &middot; {o.projectName}</p>
                  <p className="text-[10px] text-muted-foreground">{o.category} &middot; Filed: {o.filedDate}</p>
                  <p className="mt-1 text-[10px] text-orange-700">{o.assignedTask}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Support Details</CardTitle></CardHeader>
          <CardContent>
            {obj ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{obj.parcelId} &middot; {obj.village}</p>
                  <p className="text-xs text-muted-foreground">{obj.projectName}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-muted-foreground">Category</p><Badge variant="outline" className="capitalize">{obj.category}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Status</p><Badge className={statusColors[obj.status]}>{statusLabels[obj.status]}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">Filed Date</p><p className="text-xs font-medium">{obj.filedDate}</p></div>
                  <div><p className="text-xs text-muted-foreground">Evidence</p><p className="text-xs font-medium">{obj.evidenceCollected}/{obj.evidenceRequired}</p></div>
                  <div className="col-span-2"><p className="text-xs text-muted-foreground">Assigned Task</p><p className="text-xs">{obj.assignedTask}</p></div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-[#0F2340]" style={{ width: `${(obj.evidenceCollected / obj.evidenceRequired) * 100}%` }} />
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Collect Local Evidence</button>
                  <button className="rounded-lg border border-[#0F2340] px-4 py-2 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5">Verify Land Record</button>
                  <button className="rounded-lg border border-[#0F2340] px-4 py-2 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5">Submit to Collector</button>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select an objection</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
