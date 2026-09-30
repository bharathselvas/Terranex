import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PHOTO_EVIDENCE } from "./fieldOfficerData";
import { ArrowLeft, Eye, Trash2 } from "lucide-react";

const categoryColors: Record<string, string> = {
  parcel_overview: "bg-blue-100 text-blue-800", boundary: "bg-emerald-100 text-emerald-800",
  structure: "bg-purple-100 text-purple-800", tree: "bg-amber-100 text-amber-800",
  well: "bg-cyan-100 text-cyan-800", occupancy: "bg-orange-100 text-orange-800",
  document: "bg-gray-100 text-gray-700", possession: "bg-red-100 text-red-800", other: "bg-slate-100 text-slate-700",
};

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700", captured: "bg-blue-100 text-blue-800",
  pending_sync: "bg-amber-100 text-amber-800", synced: "bg-emerald-100 text-emerald-800",
  submitted: "bg-emerald-100 text-emerald-800",
};

export default function FoPhotoGalleryPage() {
  const { taskId } = useParams();
  const photos = PHOTO_EVIDENCE;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Evidence Gallery</h1>
          <p className="text-sm text-muted-foreground">{photos.length} photos captured</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {photos.map((p) => (
          <Card key={p.id} className="overflow-hidden shadow-sm">
            <div className="flex h-32 items-center justify-center bg-gray-100">
              <span className="text-3xl text-gray-300">📷</span>
            </div>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <Badge className={categoryColors[p.category]}>{p.category.replace(/_/g, " ")}</Badge>
                <Badge className={statusColors[p.status]}>{p.status.replace(/_/g, " ")}</Badge>
              </div>
              <div className="mt-2 space-y-0.5">
                <p className="text-[10px] text-muted-foreground">Parcel: {p.parcelId}</p>
                <p className="text-[10px] text-muted-foreground">GPS: {p.gpsLat}, {p.gpsLng}</p>
                <p className="text-[10px] text-muted-foreground">{p.capturedAt}</p>
                <p className="text-[10px] text-muted-foreground">{p.fileSize}</p>
              </div>
              <div className="mt-2 flex gap-1">
                <button className="flex-1 rounded border px-2 py-1 text-[10px] text-[#0F2340] hover:bg-gray-50"><Eye className="mr-1 inline h-3 w-3" />View</button>
                {p.status === "draft" && <button className="rounded border border-red-300 px-2 py-1 text-[10px] text-red-600 hover:bg-red-50"><Trash2 className="h-3 w-3" /></button>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
