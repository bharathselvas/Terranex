import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RNR_DATA } from "./districtCollectorData";

const componentLabels: Record<string, string> = {
  housing: "Housing", subsistence: "Subsistence", transport: "Transport",
  livelihood: "Livelihood", employment: "Employment", skillTraining: "Skill Training",
};

const componentColors: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-800", in_progress: "bg-amber-100 text-amber-800",
  pending: "bg-gray-100 text-gray-700", not_applicable: "bg-gray-50 text-gray-500",
};

export default function CollectorRnrPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Rehabilitation &amp; Resettlement</h1>
        <p className="text-sm text-muted-foreground">R&R component tracking across affected families</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {RNR_DATA.map((r) => (
          <Card key={r.projectId} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[#0F2340]">{r.projectName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">{r.affectedFamilies.toLocaleString()} affected families</p>
                <div className="space-y-2">
                  {Object.entries(r.components).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between rounded border p-2">
                      <span className="text-xs">{componentLabels[key]}</span>
                      <Badge className={componentColors[val]}>{val === "not_applicable" ? "N/A" : val}</Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="rounded-lg bg-[#0F2340] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#1a3560]">View Details</button>
                  <button className="rounded-lg border border-[#0F2340] px-3 py-1.5 text-xs font-medium text-[#0F2340] hover:bg-[#0F2340]/5">Update Status</button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
