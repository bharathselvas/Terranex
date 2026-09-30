import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_VERIFICATION_SUBMISSIONS } from "./tehsilSdoData";

export default function TehsilGpsPhotoPage() {
  const withGps = FIELD_VERIFICATION_SUBMISSIONS.filter((f) => f.gpsLat !== 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">GPS / Photo Evidence</h1>
        <p className="text-sm text-muted-foreground">Field evidence viewer — GPS coordinates, photos, timestamps</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {withGps.map((f) => (
          <Card key={f.id} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[#0F2340]">{f.parcelId} &middot; {f.village}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-3">
                  <p className="mb-2 text-xs font-semibold text-blue-800">GPS VERIFIED</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div><p className="text-[10px] text-muted-foreground">Latitude</p><p className="text-xs font-medium">{f.gpsLat}</p></div>
                    <div><p className="text-[10px] text-muted-foreground">Longitude</p><p className="text-xs font-medium">{f.gpsLng}</p></div>
                    <div><p className="text-[10px] text-muted-foreground">Captured</p><p className="text-xs font-medium">{f.gpsTimestamp}</p></div>
                    <div><p className="text-[10px] text-muted-foreground">Officer</p><p className="text-xs font-medium">{f.officer}</p></div>
                    <div><p className="text-[10px] text-muted-foreground">Device</p><p className="text-xs font-medium">{f.deviceInfo}</p></div>
                    <div><p className="text-[10px] text-muted-foreground">Photos</p><p className="text-xs font-medium">{f.photosCount}</p></div>
                  </div>
                  <p className="mt-2 text-[10px] text-blue-600 italic">Demo / Mock Evidence</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded border p-2 text-center"><p className="text-lg font-bold text-blue-700">{f.photosCount}</p><p className="text-[10px] text-muted-foreground">Photos</p></div>
                  <div className="rounded border p-2 text-center"><p className="text-lg font-bold text-blue-700">{f.documentsCount}</p><p className="text-[10px] text-muted-foreground">Documents</p></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
