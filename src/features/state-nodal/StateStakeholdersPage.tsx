import { Users, Eye, MessageSquare, FolderOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STAKEHOLDERS } from "@/features/state-nodal/stateNodalData";
import { formatDate } from "@/lib/format";

export function StateStakeholdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Stakeholders</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Organizations and authorities involved in Maharashtra acquisition projects</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Organization</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Role</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Jurisdiction</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Projects</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Last Activity</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {STAKEHOLDERS.map((s) => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-medium text-[#0F2340]">{s.organization}</td>
                    <td className="px-4 py-2.5"><Badge variant="secondary" className="text-[9px]">{s.role}</Badge></td>
                    <td className="px-4 py-2.5 text-muted-foreground">{s.jurisdiction}</td>
                    <td className="px-4 py-2.5 text-right text-[#0F2340]">{s.projects}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{formatDate(s.lastActivity)}</td>
                    <td className="px-4 py-2.5 text-center">
                      <Badge className={`text-[9px] ${s.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"}`}>{s.status}</Badge>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <div className="flex gap-1 justify-center">
                        <Button size="sm" variant="outline" className="h-7 text-[10px]"><Eye className="h-3 w-3 mr-1" /> View</Button>
                        <Button size="sm" variant="outline" className="h-7 text-[10px]"><MessageSquare className="h-3 w-3 mr-1" /> Contact</Button>
                      </div>
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
