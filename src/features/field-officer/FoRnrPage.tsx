import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RNR_FIELD_DATA } from "./fieldOfficerData";
import { ArrowLeft } from "lucide-react";

const statusColors: Record<string, string> = {
  not_started: "bg-gray-100 text-gray-700", in_progress: "bg-amber-100 text-amber-800",
  collected: "bg-blue-100 text-blue-800", submitted: "bg-emerald-100 text-emerald-800",
  needs_review: "bg-orange-100 text-orange-800",
};

export default function FoRnrPage() {
  const { taskId } = useParams();
  const [selected, setSelected] = useState<string | null>(RNR_FIELD_DATA[0]?.id ?? null);
  const entry = RNR_FIELD_DATA.find((r) => r.id === selected);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">R&R Field Data</h1>
          <p className="text-sm text-muted-foreground">{RNR_FIELD_DATA.length} families</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          {RNR_FIELD_DATA.map((r) => (
            <button key={r.id} onClick={() => setSelected(r.id)} className={`w-full rounded-lg border p-3 text-left transition-colors ${selected === r.id ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"}`}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{r.familyId}</p>
                <Badge className={statusColors[r.status]}>{r.status.replace(/_/g, " ")}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{r.village} · HH: {r.householdSize}</p>
            </button>
          ))}
        </div>

        {entry && (
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <p className="mb-3 text-xs font-semibold text-[#0F2340]">FAMILY DETAILS</p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-[10px] text-muted-foreground">Family ID</p><p className="text-sm font-medium">{entry.familyId}</p></div>
                  <div><p className="text-[10px] text-muted-foreground">Household Size</p><p className="text-sm font-medium">{entry.householdSize}</p></div>
                  <div><p className="text-[10px] text-muted-foreground">Parcel</p><p className="text-sm font-medium">{entry.parcelId}</p></div>
                  <div><p className="text-[10px] text-muted-foreground">Village</p><p className="text-sm font-medium">{entry.village}</p></div>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Housing", value: entry.housing },
                    { label: "Livelihood", value: entry.livelihood },
                    { label: "Transport", value: entry.transport },
                    { label: "Employment", value: entry.employment },
                    { label: "Skill Training", value: entry.skillTraining },
                    { label: "Special Support", value: entry.specialSupport },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] text-muted-foreground">{item.label}</p>
                      <p className="text-xs">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
