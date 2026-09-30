import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { VILLAGES } from "./tehsilSdoData";

const riskColor = (r: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[r] ?? "bg-gray-100 text-gray-700";
};

export default function TehsilVillageRegisterPage() {
  const [search, setSearch] = useState("");

  const filtered = VILLAGES.filter(
    (v) => v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Village Coordination</h1>
        <p className="text-sm text-muted-foreground">Village-level acquisition status and field officer coordination</p>
      </div>

      <Input placeholder="Search villages..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0F2340]">Villages ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((v) => (
              <div key={v.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{v.projectCount} Projects &middot; {v.affectedParcels} Parcels &middot; {v.affectedFamilies} Families</p>
                  </div>
                  <Badge className={riskColor(v.risk)}>{v.risk}</Badge>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                  <div><p className="text-[10px] text-muted-foreground">Field Officer</p><p className="text-xs font-medium">{v.fieldOfficer}</p></div>
                  <div><p className="text-[10px] text-muted-foreground">Verification</p><p className="text-xs font-medium">{v.verificationProgress}%</p></div>
                  <div><p className="text-[10px] text-muted-foreground">GPS Verified</p><p className="text-xs font-medium">{v.gpsVerified}/{v.totalParcels}</p></div>
                  <div><p className="text-[10px] text-muted-foreground">Objections</p><p className="text-xs font-medium">{v.openObjections}</p></div>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 rounded-full bg-[#0F2340]" style={{ width: `${v.verificationProgress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
