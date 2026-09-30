import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";

export default function FoGpsCapturePage() {
  const { taskId } = useParams();
  const [captured, setCaptured] = useState(false);
  const mockLat = 18.5981 + (Math.random() * 0.002 - 0.001);
  const mockLng = 73.7354 + (Math.random() * 0.002 - 0.001);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">GPS Capture</h1>
          <p className="text-sm text-muted-foreground">Mock GPS — fictional coordinates for prototype</p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-5">
          <Badge className="bg-blue-100 text-blue-800 mb-3">MOCK GPS</Badge>
          <div className="space-y-4">
            <div className="rounded-lg border bg-gray-50 p-4">
              <p className="text-xs text-muted-foreground">Latitude</p>
              <p className="text-2xl font-mono font-bold text-[#0F2340]">{mockLat.toFixed(4)}</p>
            </div>
            <div className="rounded-lg border bg-gray-50 p-4">
              <p className="text-xs text-muted-foreground">Longitude</p>
              <p className="text-2xl font-mono font-bold text-[#0F2340]">{mockLng.toFixed(4)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border bg-gray-50 p-3">
                <p className="text-[10px] text-muted-foreground">Accuracy</p>
                <p className="text-sm font-medium">± 8 m</p>
              </div>
              <div className="rounded-lg border bg-gray-50 p-3">
                <p className="text-[10px] text-muted-foreground">Captured</p>
                <p className="text-sm font-medium">08 Sep 2026, 14:42</p>
              </div>
            </div>
            {captured && (
              <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">GPS VERIFIED</p>
                    <p className="text-xs text-emerald-700">Location saved to field record</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <button onClick={() => setCaptured(true)} className="flex-1 rounded-lg bg-[#0F2340] px-4 py-3 text-sm font-medium text-white hover:bg-[#1a3560]">
          <RefreshCw className="mr-2 inline h-4 w-4" />Capture Location
        </button>
      </div>

      {captured && (
        <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="block text-center text-xs text-muted-foreground hover:underline">← Back to Field Visit</Link>
      )}
    </div>
  );
}
