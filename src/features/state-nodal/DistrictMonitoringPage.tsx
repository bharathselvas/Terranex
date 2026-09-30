import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Search, ArrowUpRight, AlertTriangle, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DISTRICT_DATA } from "@/features/state-nodal/stateNodalData";
import { stageShortLabel } from "@/lib/format";

export function DistrictMonitoringPage() {
  const [search, setSearch] = useState("");

  const filtered = DISTRICT_DATA.filter((d) => !search || d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">District Monitoring</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">District-level acquisition progress across {DISTRICT_DATA.length} districts</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search districts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border bg-white pl-9 pr-3 py-2 text-sm"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">District</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Projects</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Parcels</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Stage</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Progress</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Compensation</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Possession</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">R&R</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Delayed</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Risk</th>
                  <th className="px-4 py-2.5 text-center font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-2.5">
                      <Link to={`/app/state-nodal/districts/${d.id}`} className="font-medium text-[#0F2340] hover:underline">{d.name}</Link>
                      <p className="text-[10px] text-muted-foreground">{d.collector}</p>
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium text-[#0F2340]">{d.projects}</td>
                    <td className="px-4 py-2.5 text-right text-[#0F2340]">{d.parcels.toLocaleString()}</td>
                    <td className="px-4 py-2.5"><Badge variant="secondary" className="text-[9px]">{stageShortLabel(d.currentStage)}</Badge></td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1A3560] rounded-full" style={{ width: `${d.progress}%` }} />
                        </div>
                        <span className="text-[10px] font-medium text-[#0F2340]">{d.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right text-[11px]">₹{d.compensationDisbursedCr} / ₹{d.compensationAssessedCr} Cr</td>
                    <td className="px-4 py-2.5 text-right text-[11px]">{d.possessionPercent}%</td>
                    <td className="px-4 py-2.5 text-right text-[11px]">{d.rnrPercent}%</td>
                    <td className="px-4 py-2.5 text-center">
                      {d.delayed > 0 ? <Badge className="bg-red-100 text-red-800 text-[9px]">{d.delayed}</Badge> : <span className="text-[10px] text-muted-foreground">—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <Badge className={`text-[9px] ${d.risk === "critical" ? "bg-red-100 text-red-800" : d.risk === "high" ? "bg-orange-100 text-orange-800" : d.risk === "medium" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>{d.risk}</Badge>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <Link to={`/app/state-nodal/districts/${d.id}`} className="text-slate-400 hover:text-slate-600">
                        <ChevronRight className="h-4 w-4" />
                      </Link>
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
