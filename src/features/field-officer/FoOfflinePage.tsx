import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SYNC_ITEMS } from "./fieldOfficerData";
import { WifiOff, HardDrive, Clock } from "lucide-react";

export default function FoOfflinePage() {
  const pendingSync = SYNC_ITEMS.filter((s) => s.status === "queued" || s.status === "failed").length;

  return (
    <div className="space-y-6">
      <Card className="border-amber-300 bg-amber-50 shadow-md">
        <CardContent className="p-6 text-center">
          <WifiOff className="mx-auto h-10 w-10 text-amber-600" />
          <h1 className="mt-3 text-xl font-bold text-amber-800">OFFLINE MODE</h1>
          <p className="mt-2 text-sm text-amber-700">No network connection. Your field work can continue. Evidence will be stored securely on the device and uploaded when connectivity is restored.</p>
          <Badge className="mt-3 bg-amber-500 text-white">{pendingSync} items pending sync</Badge>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="shadow-sm"><CardContent className="p-4 text-center">
          <HardDrive className="mx-auto h-5 w-5 text-[#0F2340]" />
          <p className="mt-1 text-sm font-medium">Stored on Device</p>
          <p className="text-xs text-muted-foreground">{pendingSync} items</p>
        </CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4 text-center">
          <Clock className="mx-auto h-5 w-5 text-[#0F2340]" />
          <p className="mt-1 text-sm font-medium">Last Synced</p>
          <p className="text-xs text-muted-foreground">14:32</p>
        </CardContent></Card>
      </div>

      <button className="w-full rounded-lg bg-[#0F2340] px-4 py-3 text-sm font-medium text-white hover:bg-[#1a3560]">Continue Offline</button>
    </div>
  );
}
