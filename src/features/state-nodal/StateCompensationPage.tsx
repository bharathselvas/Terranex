import { IndianRupee, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { COMPENSATION_DATA } from "@/features/state-nodal/stateNodalData";

export function StateCompensationPage() {
  const totalAssessed = COMPENSATION_DATA.reduce((s, d) => s + d.assessedCr, 0);
  const totalAwarded = COMPENSATION_DATA.reduce((s, d) => s + d.awardedCr, 0);
  const totalDisbursed = COMPENSATION_DATA.reduce((s, d) => s + d.disbursedCr, 0);
  const totalPending = COMPENSATION_DATA.reduce((s, d) => s + d.pendingCr, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Compensation Monitoring</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">State-level compensation assessment, award, and disbursement status</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-[11px] text-blue-800">
        The State Nodal Officer monitors compensation status. Compensation valuation requires the authorized acquisition authority — you cannot edit valuation.
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Assessed</p><p className="mt-1 text-xl font-bold text-[#0F2340]">₹{totalAssessed} Cr</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Awarded</p><p className="mt-1 text-xl font-bold text-blue-700">₹{totalAwarded} Cr</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Disbursed</p><p className="mt-1 text-xl font-bold text-emerald-700">₹{totalDisbursed} Cr</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Pending</p><p className="mt-1 text-xl font-bold text-amber-700">₹{totalPending} Cr</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">District</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Projects</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Assessed</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Awarded</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Disbursed</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Pending</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Disbursement %</th>
                </tr>
              </thead>
              <tbody>
                {COMPENSATION_DATA.map((d) => {
                  const pct = d.assessedCr > 0 ? Math.round((d.disbursedCr / d.assessedCr) * 100) : 0;
                  return (
                    <tr key={d.district} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-medium text-[#0F2340]">{d.district}</td>
                      <td className="px-4 py-2.5 text-right text-[#0F2340]">{d.projects}</td>
                      <td className="px-4 py-2.5 text-right">₹{d.assessedCr} Cr</td>
                      <td className="px-4 py-2.5 text-right">₹{d.awardedCr} Cr</td>
                      <td className="px-4 py-2.5 text-right text-emerald-700 font-medium">₹{d.disbursedCr} Cr</td>
                      <td className="px-4 py-2.5 text-right text-amber-700 font-medium">₹{d.pendingCr} Cr</td>
                      <td className="px-4 py-2.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[10px] font-medium">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t bg-slate-50 font-medium">
                  <td className="px-4 py-2.5 text-[#0F2340]">Total</td>
                  <td className="px-4 py-2.5 text-right text-[#0F2340]">{COMPENSATION_DATA.reduce((s, d) => s + d.projects, 0)}</td>
                  <td className="px-4 py-2.5 text-right">₹{totalAssessed} Cr</td>
                  <td className="px-4 py-2.5 text-right">₹{totalAwarded} Cr</td>
                  <td className="px-4 py-2.5 text-right text-emerald-700">₹{totalDisbursed} Cr</td>
                  <td className="px-4 py-2.5 text-right text-amber-700">₹{totalPending} Cr</td>
                  <td className="px-4 py-2.5 text-right text-[10px]">{totalAssessed > 0 ? Math.round((totalDisbursed / totalAssessed) * 100) : 0}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
