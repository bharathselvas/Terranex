import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TEHSIL_PROJECTS, VILLAGES, PARCELS } from "./tehsilSdoData";

export default function TehsilGisPage() {
  const projectColors = ["#0F2340", "#1e3a5f", "#2c5282", "#3182ce", "#4299e1", "#63b3ed", "#90cdf4", "#bee3f8"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Tehsil GIS Map</h1>
        <p className="text-sm text-muted-foreground">Haveli Tehsil &middot; Project footprints, parcels, field verification status</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="relative h-[400px] rounded-lg border bg-emerald-50/30 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-semibold text-[#0F2340]">Haveli Tehsil Map</p>
                <p className="text-sm text-muted-foreground">Interactive GIS layer — project footprints and parcels</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 rounded-lg border bg-white/90 p-3">
              <p className="text-xs font-semibold text-[#0F2340] mb-1">Projects</p>
              {TEHSIL_PROJECTS.slice(0, 6).map((p, i) => (
                <div key={p.id} className="flex items-center gap-2 text-[10px]">
                  <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: projectColors[i] }} />
                  <span>{p.projectName}</span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 right-4 rounded-lg border bg-white/90 p-3">
              <p className="text-xs font-semibold text-[#0F2340] mb-1">Layers</p>
              {["Tehsil Boundary", "Villages", "Parcels", "Field Verification", "Ownership Issues"].map((l) => (
                <div key={l} className="flex items-center gap-2 text-[10px]">
                  <input type="checkbox" defaultChecked className="h-2 w-2" />
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {VILLAGES.slice(0, 4).map((v) => (
          <Card key={v.id} className="shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-semibold text-[#0F2340]">{v.name}</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]"><span className="text-muted-foreground">Parcels</span><span className="font-medium">{v.affectedParcels}</span></div>
                <div className="flex justify-between text-[10px]"><span className="text-muted-foreground">Verified</span><span className="font-medium">{v.verificationProgress}%</span></div>
                <div className="flex justify-between text-[10px]"><span className="text-muted-foreground">GPS</span><span className="font-medium">{v.gpsVerified}/{v.totalParcels}</span></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
