import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, ArrowLeft, Image } from "lucide-react";

const CATEGORIES = ["Parcel Overview", "Boundary", "Structure", "Tree", "Well", "Occupancy", "Document", "Possession", "Other"];

export default function FoPhotoCapturePage() {
  const { taskId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("Parcel Overview");
  const [captured, setCaptured] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Photo Capture</h1>
          <p className="text-sm text-muted-foreground">Geo-tagged photograph capture</p>
        </div>
      </div>

      {/* Camera Preview Mock */}
      <Card className="overflow-hidden shadow-sm">
        <div className="relative flex h-48 items-center justify-center bg-gray-900">
          <Camera className="h-12 w-12 text-gray-500" />
          <p className="absolute bottom-2 left-2 text-xs text-gray-400">Camera Preview (Mock)</p>
          <Badge className="absolute top-2 right-2 bg-amber-500 text-white">MOCK</Badge>
        </div>
      </Card>

      {/* Category Selection */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <p className="mb-2 text-xs font-semibold text-[#0F2340]">Capture Category</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setSelectedCategory(c)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${selectedCategory === c ? "bg-[#0F2340] text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}>{c}</button>
            ))}
          </div>
        </CardContent>
      </Card>

      {captured && (
        <Card className="border-emerald-300 bg-emerald-50/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200">
                <Image className="h-8 w-8 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#0F2340]">FIELD PHOTO</p>
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs text-muted-foreground">Parcel: MH-PN-004821</p>
                  <p className="text-xs text-muted-foreground">GPS: 18.5981, 73.7354</p>
                  <p className="text-xs text-muted-foreground">Captured: 08 Sep 2026 — 14:42</p>
                  <p className="text-xs text-muted-foreground">Officer: FO-042</p>
                </div>
                <Badge className="mt-2 bg-emerald-100 text-emerald-800">Geo-tagged</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <button onClick={() => setCaptured(true)} className="w-full rounded-lg bg-[#0F2340] px-4 py-3 text-sm font-medium text-white hover:bg-[#1a3560]">
        <Camera className="mr-2 inline h-4 w-4" />Capture Photo
      </button>

      <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="block text-center text-xs text-muted-foreground hover:underline">← Back to Field Visit</Link>
    </div>
  );
}
