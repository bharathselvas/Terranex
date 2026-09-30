import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DISTRICT_DATA, STATE_PROJECTS, COMPENSATION_DATA, POSSESSION_DATA, RNR_DATA, OBJECTIONS_DATA, AUDIT_DATA } from "@/features/state-nodal/stateNodalData";
import { stageShortLabel, stageLabel, formatDate } from "@/lib/format";

export function DistrictDetailPage() {
  const { districtId } = useParams();
  const district = DISTRICT_DATA.find((d) => d.id === districtId) ?? DISTRICT_DATA[0];
  const districtProjects = STATE_PROJECTS.filter((p) => p.district === district.name);
  const compensation = COMPENSATION_DATA.find((c) => c.district === district.name);
  const possession = POSSESSION_DATA.filter((p) => p.district === district.name);
  const rnr = RNR_DATA.find((r) => r.district === district.name);
  const objections = OBJECTIONS_DATA.filter((o) => o.district === district.name);
  const audit = AUDIT_DATA.filter((a) => a.district === district.name || a.district === "All");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link to="/app/state-nodal/districts" className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-slate-700 mb-1">
            <ArrowLeft className="h-3 w-3" /> Back to Districts
          </Link>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">{district.name} District</h1>
            <Badge className={`text-[9px] ${district.risk === "critical" ? "bg-red-100 text-red-800" : district.risk === "high" ? "bg-orange-100 text-orange-800" : district.risk === "medium" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>{district.risk} risk</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{district.collector} · {district.collectorDesignation}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Projects</p><p className="mt-1 text-xl font-bold text-[#0F2340]">{district.projects}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Parcels</p><p className="mt-1 text-xl font-bold text-[#0F2340]">{district.parcels.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Progress</p><p className="mt-1 text-xl font-bold text-[#0F2340]">{district.progress}%</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-[11px] font-medium text-muted-foreground">Delayed</p><p className={`mt-1 text-xl font-bold ${district.delayed > 0 ? "text-red-700" : "text-[#0F2340]"}`}>{district.delayed}</p></CardContent></Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="compensation">Compensation</TabsTrigger>
          <TabsTrigger value="possession">Possession</TabsTrigger>
          <TabsTrigger value="rnr">R&R</TabsTrigger>
          <TabsTrigger value="objections">Objections</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-[#0F2340] mb-3">District Overview</h3>
              <div className="grid grid-cols-2 gap-4 text-[12px]">
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Area</span><span className="font-medium">{district.areaHa.toLocaleString()} Ha</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Tehsils</span><span className="font-medium">{district.tehsils}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Current Stage</span><span className="font-medium">{stageShortLabel(district.currentStage)}</span></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-muted-foreground">Compensation Assessed</span><span className="font-medium">₹{district.compensationAssessedCr} Cr</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Compensation Disbursed</span><span className="font-medium">₹{district.compensationDisbursedCr} Cr</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Possession</span><span className="font-medium">{district.possessionPercent}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">R&R</span><span className="font-medium">{district.rnrPercent}%</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-3">
          {districtProjects.map((p) => (
            <Card key={p.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[#0F2340]">{p.projectName}</h4>
                    <p className="text-[11px] text-muted-foreground">{stageLabel(p.currentStage)} · {p.parcels.toLocaleString()} parcels</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#0F2340]">{p.progress}%</p>
                    <Badge className={`text-[9px] ${p.risk === "critical" ? "bg-red-100 text-red-800" : p.risk === "high" ? "bg-orange-100 text-orange-800" : "bg-slate-100 text-slate-700"}`}>{p.risk}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {districtProjects.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No projects in this district.</p>}
        </TabsContent>

        <TabsContent value="compensation">
          {compensation ? (
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Compensation Status</h3>
                <div className="grid grid-cols-2 gap-4 text-[12px]">
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-muted-foreground">Assessed</span><span className="font-medium">₹{compensation.assessedCr} Cr ({compensation.parcelsAssessed.toLocaleString()} parcels)</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Awarded</span><span className="font-medium">₹{compensation.awardedCr} Cr ({compensation.parcelsAwarded.toLocaleString()} parcels)</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-muted-foreground">Disbursed</span><span className="font-medium text-emerald-700">₹{compensation.disbursedCr} Cr ({compensation.parcelsDisbursed.toLocaleString()} parcels)</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Pending</span><span className="font-medium text-amber-700">₹{compensation.pendingCr} Cr</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : <p className="text-sm text-muted-foreground text-center py-4">No compensation data.</p>}
        </TabsContent>

        <TabsContent value="possession">
          {possession.length > 0 ? (
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Possession Status</h3>
                <div className="space-y-2">
                  {possession.map((p) => (
                    <div key={p.project} className="flex items-center justify-between p-2 border rounded text-[12px]">
                      <span className="font-medium">{p.project}</span>
                      <div className="flex gap-3">
                        <span>Eligible: {p.eligible}</span>
                        <span className="text-emerald-700">Completed: {p.completed}</span>
                        <span className="text-amber-700">Pending: {p.pending}</span>
                        {p.disputed > 0 && <span className="text-red-700">Disputed: {p.disputed}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : <p className="text-sm text-muted-foreground text-center py-4">No possession data.</p>}
        </TabsContent>

        <TabsContent value="rnr">
          {rnr ? (
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold text-[#0F2340] mb-3">R&R Status</h3>
                <div className="grid grid-cols-3 gap-3 text-[12px] mb-4">
                  <div><p className="text-muted-foreground">Affected Families</p><p className="font-medium">{rnr.affectedFamilies.toLocaleString()}</p></div>
                  <div><p className="text-muted-foreground">Completed</p><p className="font-medium text-emerald-700">{rnr.completed.toLocaleString()}</p></div>
                  <div><p className="text-muted-foreground">Pending</p><p className="font-medium text-amber-700">{rnr.pending.toLocaleString()}</p></div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${rnr.rrApplicable > 0 ? Math.round((rnr.completed / rnr.rrApplicable) * 100) : 0}%` }} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(rnr.components).map(([key, val]) => {
                    const total = val.completed + val.pending;
                    const pct = total > 0 ? Math.round((val.completed / total) * 100) : 0;
                    return (
                      <div key={key} className="bg-slate-50 rounded p-2">
                        <p className="text-[10px] font-medium text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#1A3560] rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[10px] font-medium">{pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ) : <p className="text-sm text-muted-foreground text-center py-4">No R&R data.</p>}
        </TabsContent>

        <TabsContent value="objections">
          {objections.length > 0 ? (
            <div className="space-y-2">
              {objections.map((o) => (
                <Card key={o.id}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#0F2340]">{o.projectName}</p>
                      <p className="text-[11px] text-muted-foreground">{o.category} · {o.parcelId} · Filed {formatDate(o.filedDate)}</p>
                    </div>
                    <Badge className={`text-[9px] ${o.status === "resolved" ? "bg-emerald-100 text-emerald-800" : o.status === "escalated" ? "bg-red-100 text-red-800" : o.status === "hearing" ? "bg-violet-100 text-violet-800" : "bg-amber-100 text-amber-800"}`}>{o.status}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : <p className="text-sm text-muted-foreground text-center py-4">No objections for this district.</p>}
        </TabsContent>

        <TabsContent value="audit">
          {audit.length > 0 ? (
            <div className="space-y-2">
              {audit.map((a) => (
                <Card key={a.id}>
                  <CardContent className="p-3 border-l-2 border-slate-200">
                    <p className="text-sm font-medium text-[#0F2340]">{a.action}</p>
                    <p className="text-[11px] text-muted-foreground">{a.actor} · {a.role} · {formatDate(a.timestamp.slice(0, 10))}</p>
                    {a.previousState !== "—" && <p className="text-[11px] text-muted-foreground">{a.previousState} → {a.newState}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : <p className="text-sm text-muted-foreground text-center py-4">No audit entries.</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
