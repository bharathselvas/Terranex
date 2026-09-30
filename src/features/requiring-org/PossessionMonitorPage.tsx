import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { POSSESSION_DATA } from "@/features/requiring-org/roIAData";
import { formatDate } from "@/lib/format";

export function PossessionMonitorPage() {
  const totalParcels = POSSESSION_DATA.reduce((sum, p) => sum + p.totalParcels, 0);
  const totalComplete = POSSESSION_DATA.reduce((sum, p) => sum + p.complete, 0);
  const totalPending = POSSESSION_DATA.reduce((sum, p) => sum + p.pending, 0);
  const totalDisputed = POSSESSION_DATA.reduce((sum, p) => sum + p.disputed, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Possession Monitor</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Land possession status across NHAI projects</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Total Parcels</p><p className="mt-1 text-xl font-bold text-[#0F2340]">{totalParcels.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Completed</p><p className="mt-1 text-xl font-bold text-emerald-700">{totalComplete.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Pending</p><p className="mt-1 text-xl font-bold text-amber-700">{totalPending.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Disputed</p><p className="mt-1 text-xl font-bold text-red-600">{totalDisputed}</p></CardContent></Card>
      </div>

      <div className="bg-blue-50 rounded-md p-3 text-[11px] text-blue-800">
        Possession recording is performed by the Field Officer and certified by the District Collector / CALA. You can monitor status.
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Project</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">State / District</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-700">Total</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-700">Complete</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-700">Pending</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-700">Disputed</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-700">Resisted</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {POSSESSION_DATA.map((pos) => (
                  <tr key={pos.projectId} className="border-b last:border-0 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-[#0F2340]">{pos.projectName}</td>
                    <td className="px-4 py-3 text-slate-600">{pos.state} / {pos.district}</td>
                    <td className="px-4 py-3 text-center">{pos.totalParcels}</td>
                    <td className="px-4 py-3 text-center text-emerald-700">{pos.complete}</td>
                    <td className="px-4 py-3 text-center text-amber-700">{pos.pending}</td>
                    <td className="px-4 py-3 text-center text-red-600">{pos.disputed}</td>
                    <td className="px-4 py-3 text-center text-red-600">{pos.resisted}</td>
                    <td className="px-4 py-3 text-slate-600 text-[11px]">{formatDate(pos.lastUpdate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
