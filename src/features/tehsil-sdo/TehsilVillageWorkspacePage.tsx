import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VILLAGES, TEHSIL_PROJECTS, PARCELS } from "./tehsilSdoData";

export default function TehsilVillageWorkspacePage() {
  const village = VILLAGES[0]; // Hinjewadi
  const villageParcels = PARCELS.filter((p) => p.village === village.name);
  const villageProjects = TEHSIL_PROJECTS.filter((p) => p.villages.includes(village.name));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">{village.name} Village</h1>
        <p className="text-sm text-muted-foreground">{village.tehsil} Tehsil &middot; {village.district} District</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Projects</p><p className="text-2xl font-bold text-[#0F2340]">{village.projectCount}</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Parcels</p><p className="text-2xl font-bold text-[#0F2340]">{village.affectedParcels}</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Families</p><p className="text-2xl font-bold text-[#0F2340]">{village.affectedFamilies}</p></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Verification</p><p className="text-2xl font-bold text-[#0F2340]">{village.verificationProgress}%</p></CardContent></Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Projects in {village.name}</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {villageProjects.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded border p-2">
                <div><p className="text-xs font-medium">{p.projectName}</p><p className="text-[10px] text-muted-foreground">{p.parcels} parcels &middot; {p.currentStage}</p></div>
                <Badge className={`text-[10px] ${p.risk === "critical" ? "bg-red-100 text-red-800" : p.risk === "high" ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-700"}`}>{p.risk}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#0F2340]">Parcels in {village.name}</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {villageParcels.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded border p-2">
                <div><p className="text-xs font-medium">{p.ulpin}</p><p className="text-[10px] text-muted-foreground">{p.ownerName} &middot; {p.areaHa} ha</p></div>
                <div className="flex gap-2">
                  <Badge className={`text-[10px] ${p.ownerStatus === "verified" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>{p.ownerStatus}</Badge>
                  <Badge className={`text-[10px] ${p.gpsVerified ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}`}>{p.gpsVerified ? "GPS ✓" : "No GPS"}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
