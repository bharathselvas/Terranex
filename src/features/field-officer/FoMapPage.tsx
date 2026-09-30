import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_TASKS } from "./fieldOfficerData";

export default function FoMapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Field Map</h1>
        <p className="text-sm text-muted-foreground">Haveli Tehsil — Assigned parcels and current location</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="relative h-[400px] rounded-lg border bg-emerald-50/30 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-semibold text-[#0F2340]">Field Map View</p>
                <p className="text-sm text-muted-foreground">Mock GPS — Current location: 18.5981, 73.7354</p>
                <Badge className="mt-2 bg-amber-500 text-white">MOCK GPS</Badge>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 rounded-lg border bg-white/90 p-3">
              <p className="text-xs font-semibold text-[#0F2340] mb-1">Legend</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px]"><div className="h-2 w-2 rounded-full bg-blue-500" />Assigned</div>
                <div className="flex items-center gap-2 text-[10px]"><div className="h-2 w-2 rounded-full bg-emerald-500" />Completed</div>
                <div className="flex items-center gap-2 text-[10px]"><div className="h-2 w-2 rounded-full bg-amber-500" />In Progress</div>
                <div className="flex items-center gap-2 text-[10px]"><div className="h-2 w-2 rounded-full bg-red-500" />Overdue</div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 rounded-lg border bg-white/90 p-3">
              <p className="text-xs font-semibold text-[#0F2340] mb-1">Parcels ({FIELD_TASKS.length})</p>
              {FIELD_TASKS.slice(0, 4).map((t) => (
                <div key={t.id} className="flex items-center justify-between text-[10px]">
                  <span>{t.parcelId}</span>
                  <Badge className={`text-[8px] ${t.status === "completed" ? "bg-emerald-100 text-emerald-800" : t.status === "overdue" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>{t.status.replace(/_/g, " ")}</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {FIELD_TASKS.filter((t) => t.gpsCaptured).map((t) => (
          <Card key={t.id} className="shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t.parcelId}</p>
                  <p className="text-xs text-muted-foreground">{t.village}</p>
                </div>
                <Badge className={`${t.status === "completed" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}`}>{t.distanceKm} km</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
