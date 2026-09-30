import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SYNC_ITEMS } from "./fieldOfficerData";
import { RefreshCw, Wifi } from "lucide-react";

const statusColors: Record<string, string> = {
  queued: "bg-amber-100 text-amber-800", uploading: "bg-blue-100 text-blue-800",
  synced: "bg-emerald-100 text-emerald-800", failed: "bg-red-100 text-red-800",
};

export default function FoSyncPage() {
  const [syncing, setSyncing] = useState(false);
  const queued = SYNC_ITEMS.filter((s) => s.status === "queued").length;
  const synced = SYNC_ITEMS.filter((s) => s.status === "synced").length;
  const failed = SYNC_ITEMS.filter((s) => s.status === "failed").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Synchronization</h1>
        <p className="text-sm text-muted-foreground">Data sync status</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium">Online</span>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800">Connected</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3 text-center">
        <Card className="shadow-sm"><CardContent className="p-4">
          <p className="text-2xl font-bold text-amber-700">{queued}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4">
          <p className="text-2xl font-bold text-emerald-700">{synced}</p>
          <p className="text-xs text-muted-foreground">Uploaded</p>
        </CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4">
          <p className="text-2xl font-bold text-red-700">{failed}</p>
          <p className="text-xs text-muted-foreground">Failed</p>
        </CardContent></Card>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setSyncing(!syncing)} className="flex-1 rounded-lg bg-[#0F2340] px-4 py-3 text-sm font-medium text-white hover:bg-[#1a3560]">
          <RefreshCw className={`mr-2 inline h-4 w-4 ${syncing ? "animate-spin" : ""}`} />{syncing ? "Syncing..." : "Sync Now"}
        </button>
        <button className="flex-1 rounded-lg border border-red-300 px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-50">Retry Failed</button>
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-[#0F2340]">Sync Queue</h2>
        {SYNC_ITEMS.map((s) => (
          <Card key={s.id} className="shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{s.description}</p>
                  <p className="text-xs text-muted-foreground">Parcel: {s.parcelId} · {s.fileSize}</p>
                  <p className="text-[10px] text-muted-foreground">{s.timestamp}</p>
                </div>
                <Badge className={statusColors[s.status]}>{s.status}</Badge>
              </div>
              {s.errorMessage && <p className="mt-1 text-xs text-red-600">{s.errorMessage}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
