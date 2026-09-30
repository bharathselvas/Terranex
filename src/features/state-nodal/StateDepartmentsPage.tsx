import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STATE_DEPARTMENTS } from "@/features/state-nodal/stateNodalData";

export function StateDepartmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">State Departments</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">State-level participating departments in acquisition process</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Department</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Representative</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Projects</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Pending Requests</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {STATE_DEPARTMENTS.map((d) => (
                  <tr key={d.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-[#0F2340]">{d.name}</p>
                    </td>
                    <td className="px-4 py-2.5">
                      <p className="text-[#0F2340]">{d.representative}</p>
                      <p className="text-[10px] text-muted-foreground">{d.designation}</p>
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium text-[#0F2340]">{d.projects}</td>
                    <td className="px-4 py-2.5 text-right">
                      {d.pendingRequests > 0 ? (
                        <Badge className="bg-amber-100 text-amber-800 text-[9px]">{d.pendingRequests}</Badge>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <Badge className={`text-[9px] ${d.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"}`}>{d.status}</Badge>
                    </td>
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
