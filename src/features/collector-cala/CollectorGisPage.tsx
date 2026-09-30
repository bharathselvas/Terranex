import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DISTRICT_PROJECTS, DISTRICT_PROFILE } from "./districtCollectorData";

export default function CollectorGisPage() {
  const projectColors = ["#0F2340", "#1e3a5f", "#2c5282", "#3182ce", "#4299e1", "#63b3ed", "#90cdf4", "#bee3f8"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">District GIS View</h1>
        <p className="text-sm text-muted-foreground">{DISTRICT_PROFILE.name} District &middot; Project footprints and parcel distribution</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="relative h-[400px] rounded-lg border bg-emerald-50/30 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-semibold text-[#0F2340]">Pune District Map</p>
                <p className="text-sm text-muted-foreground">Interactive GIS layer — project footprints</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 rounded-lg border bg-white/90 p-3">
              <p className="text-xs font-semibold text-[#0F2340] mb-1">Projects</p>
              {DISTRICT_PROJECTS.slice(0, 6).map((p, i) => (
                <div key={p.id} className="flex items-center gap-2 text-[10px]">
                  <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: projectColors[i] }} />
                  <span>{p.projectName}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {DISTRICT_PROJECTS.slice(0, 4).map((p) => (
          <Card key={p.id} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-[#0F2340]">{p.projectName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]"><span className="text-muted-foreground">Parcels</span><span className="font-medium">{p.parcels}</span></div>
                <div className="flex justify-between text-[10px]"><span className="text-muted-foreground">Area</span><span className="font-medium">{p.areaHa.toLocaleString()} ha</span></div>
                <div className="flex justify-between text-[10px]"><span className="text-muted-foreground">Stage</span><span className="font-medium">{p.currentStage}</span></div>
                <div className="flex justify-between text-[10px]"><span className="text-muted-foreground">Families</span><span className="font-medium">{p.affectedFamilies}</span></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
