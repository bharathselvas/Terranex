import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Layers, Users, FileText, MessageSquareWarning, IndianRupee, Clock, ScrollText, AlertTriangle, Home, BarChart3, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { STATE_PROJECTS, DISTRICT_DATA, OBJECTIONS_DATA, COMPENSATION_DATA, RNR_DATA, AUDIT_DATA } from "@/features/state-nodal/stateNodalData";
import { STAGES } from "@/lib/stages";
import { stageLabel, stageShortLabel, stageGroupColor, formatDate, formatINR } from "@/lib/format";
import type { LifecycleStage } from "@/types/domain";

const MOCK_PARCELS = [
  { id: "prcl-001", ulpin: "MH-PN-HAV-001", surveyNo: "33/4A", village: "Haveli", district: "Pune", areaHa: 2.4, owner: "Shri. R. Patil", stage: "scrutiny" as LifecycleStage, compensationStatus: "assessed" },
  { id: "prcl-002", ulpin: "MH-PN-HAV-002", surveyNo: "33/4B", village: "Haveli", district: "Pune", areaHa: 1.8, owner: "Smt. S. Patil", stage: "scrutiny" as LifecycleStage, compensationStatus: "assessed" },
  { id: "prcl-003", ulpin: "MH-PN-MUL-003", surveyNo: "15/8", village: "Mulshi", district: "Pune", areaHa: 3.2, owner: "Shri. V. Kamble", stage: "compensation" as LifecycleStage, compensationStatus: "awarded" },
  { id: "prcl-004", ulpin: "MH-ST-SAT-005", surveyNo: "22/1", village: "Satara", district: "Satara", areaHa: 4.1, owner: "Shri. K. Bhosale", stage: "submission" as LifecycleStage, compensationStatus: "none" },
  { id: "prcl-005", ulpin: "MH-NG-AMB-001", surveyNo: "12/3", village: "Ambazari", district: "Nagpur", areaHa: 3.5, owner: "Shri. A. Deshmukh", stage: "preliminary_notification" as LifecycleStage, compensationStatus: "none" },
];

const RISK_COLORS: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-emerald-100 text-emerald-800",
  on_track: "bg-blue-100 text-blue-800",
};

export function StateProjectWorkspacePage() {
  const { projectId } = useParams();
  const project = STATE_PROJECTS.find((p) => p.id === projectId) ?? STATE_PROJECTS[0];
  const district = DISTRICT_DATA.find((d) => d.name === project.district);
  const objections = OBJECTIONS_DATA.filter((o) => o.projectName === project.projectName);
  const compensation = COMPENSATION_DATA.find((c) => c.district === project.district);
  const rnr = RNR_DATA.find((r) => r.district === project.district);
  const audit = AUDIT_DATA.filter((a) => a.project === project.projectName || a.district === "All");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link to="/app/state-nodal/projects" className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-slate-700 mb-1">
            <ArrowLeft className="h-3 w-3" /> Back to Projects
          </Link>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">{project.projectName}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{project.projectCode} · {project.ministry} · {project.implementingAgency}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`text-[10px] ${RISK_COLORS[project.risk]}`}>{project.risk} risk</Badge>
          <Badge variant="secondary" className="text-[10px]">{stageLabel(project.currentStage)}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Card><CardContent className="p-3"><p className="text-[10px] text-muted-foreground">District</p><p className="text-sm font-bold text-[#0F2340]">{project.district}</p></CardContent></Card>
        <Card><CardContent className="p-3"><p className="text-[10px] text-muted-foreground">Parcels</p><p className="text-sm font-bold text-[#0F2340]">{project.parcels.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-3"><p className="text-[10px] text-muted-foreground">Progress</p><p className="text-sm font-bold text-[#0F2340]">{project.progress}%</p></CardContent></Card>
        <Card><CardContent className="p-3"><p className="text-[10px] text-muted-foreground">Budget</p><p className="text-sm font-bold text-[#0F2340]">₹{project.budgetCr.toLocaleString()} Cr</p></CardContent></Card>
        <Card><CardContent className="p-3"><p className="text-[10px] text-muted-foreground">Families</p><p className="text-sm font-bold text-[#0F2340]">{project.affectedFamilies.toLocaleString()}</p></CardContent></Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="parcels">Parcels</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="objections">Objections</TabsTrigger>
          <TabsTrigger value="compensation">Compensation</TabsTrigger>
          <TabsTrigger value="rnr">R&R</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Project Overview</h3>
              <div className="grid grid-cols-2 gap-4 text-[12px]">
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-muted-foreground">District</span><span className="font-medium">{project.district}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Area</span><span className="font-medium">{project.areaHa.toLocaleString()} Ha</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Created</span><span className="font-medium">{formatDate(project.createdDate)}</span></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-muted-foreground">Current Stage</span><span className="font-medium">{stageLabel(project.currentStage)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Budget</span><span className="font-medium">₹{project.budgetCr.toLocaleString()} Cr</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Last Activity</span><span className="font-medium">{formatDate(project.lastActivity)}</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card className="h-[400px]">
            <CardContent className="p-0 h-full relative overflow-hidden bg-slate-100">
              <svg viewBox="0 0 800 400" className="w-full h-full" style={{ background: "linear-gradient(135deg, #e0e7ef 0%, #c7d2de 100%)" }}>
                <rect x="100" y="50" width="600" height="300" fill="none" stroke="#1a3560" strokeWidth="2" strokeDasharray="8 4" opacity="0.4" rx="8" />
                <text x="400" y="30" textAnchor="middle" fill="#0F2340" fontSize="12" fontWeight="600">{project.projectName} — Project Footprint</text>
                <rect x="200" y="120" width="160" height="100" fill="#2a4a6b" opacity="0.12" stroke="#1a3560" strokeWidth="1" rx="4" />
                <text x="280" y="175" textAnchor="middle" fill="#0F2340" fontSize="10">{project.district} District</text>
                <text x="280" y="192" textAnchor="middle" fill="#64748b" fontSize="8">{project.parcels.toLocaleString()} parcels</text>
                <circle cx="400" cy="200" r={Math.min(60, project.parcels / 20)} fill="#2a4a6b" opacity="0.08" stroke="#1a3560" strokeWidth="1" />
                <text x="400" y="205" textAnchor="middle" fill="#0F2340" fontSize="9">{project.areaHa.toLocaleString()} Ha</text>
              </svg>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <p className="text-[10px] font-semibold text-slate-700 mb-2">Layers</p>
                <div className="space-y-1">
                  {["Project Boundary", "District Boundary", "Acquisition Parcels", "Risk Indicators"].map((l) => (
                    <label key={l} className="flex items-center gap-1.5 text-[10px] text-slate-600">
                      <input type="checkbox" defaultChecked className="rounded" />{l}
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parcels">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b bg-slate-50">
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">ULPIN</th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Survey No</th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Village</th>
                      <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Area (Ha)</th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Owner</th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Stage</th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Compensation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_PARCELS.map((p) => (
                      <tr key={p.id} className="border-b last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-medium text-[#0F2340]">{p.ulpin}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.surveyNo}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.village}</td>
                        <td className="px-4 py-2.5 text-right text-[#0F2340]">{p.areaHa}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.owner}</td>
                        <td className="px-4 py-2.5"><Badge variant="secondary" className="text-[9px]">{stageShortLabel(p.stage)}</Badge></td>
                        <td className="px-4 py-2.5"><Badge className={`text-[9px] ${p.compensationStatus === "awarded" ? "bg-emerald-100 text-emerald-800" : p.compensationStatus === "assessed" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"}`}>{p.compensationStatus}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-3">
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-[#0F2340] mb-3">17-Stage Lifecycle</h3>
              <div className="space-y-1">
                {STAGES.map((stage) => {
                  const isCurrent = stage.id === project.currentStage;
                  const stageOrder = STAGE_ORDER[stage.id];
                  const currentOrder = STAGE_ORDER[project.currentStage];
                  const isPast = stageOrder < currentOrder;
                  const isFuture = stageOrder > currentOrder;
                  return (
                    <div key={stage.id} className={`flex items-center gap-2 p-2 rounded ${isCurrent ? "bg-[#0F2340]/10 border border-[#0F2340]/20" : ""}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${isPast ? "bg-emerald-600 text-white" : isCurrent ? "bg-[#0F2340] text-white" : "bg-slate-200 text-slate-500"}`}>
                        {isPast ? "✓" : stage.order}
                      </div>
                      <div className="flex-1">
                        <p className={`text-[11px] font-medium ${isCurrent ? "text-[#0F2340]" : isPast ? "text-emerald-700" : "text-slate-500"}`}>{stage.label}</p>
                        <p className="text-[10px] text-muted-foreground">SLA: {stage.slaDays} days · {stage.statutoryRef}</p>
                      </div>
                      {isCurrent && <Badge className="bg-[#0F2340] text-white text-[9px]">Current</Badge>}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Project Documents</h3>
              <div className="space-y-2">
                {[
                  { name: "Project Proposal", type: "Project Proposal", stage: "project_proposal" as LifecycleStage, status: "verified" },
                  { name: "Land Requirement Document", type: "Land Requirement", stage: "land_requirement" as LifecycleStage, status: "verified" },
                  { name: "GIS Footprint Plan", type: "GIS Plan", stage: "gis_identification" as LifecycleStage, status: "verified" },
                  { name: "SIA Report", type: "SIA Report", stage: "sia" as LifecycleStage, status: "pending" },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-[#0F2340]">{doc.name}</p>
                        <p className="text-[10px] text-muted-foreground">{doc.type} · {stageShortLabel(doc.stage)}</p>
                      </div>
                    </div>
                    <Badge className={`text-[10px] ${doc.status === "verified" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{doc.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objections">
          {objections.length > 0 ? (
            <div className="space-y-2">
              {objections.map((o) => (
                <Card key={o.id}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#0F2340]">{o.id.toUpperCase()} — {o.category}</p>
                      <p className="text-[11px] text-muted-foreground">{o.parcelId} · Filed {formatDate(o.filedDate)} · {o.currentAuthority}</p>
                    </div>
                    <Badge className={`text-[9px] ${o.status === "resolved" ? "bg-emerald-100 text-emerald-800" : o.status === "escalated" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>{o.status.replace(/_/g, " ")}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No objections for this project.</CardContent></Card>}
        </TabsContent>

        <TabsContent value="compensation">
          {compensation ? (
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Compensation Status — {project.district}</h3>
                <div className="grid grid-cols-2 gap-4 text-[12px]">
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-muted-foreground">Assessed</span><span className="font-medium">₹{compensation.assessedCr} Cr</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Awarded</span><span className="font-medium">₹{compensation.awardedCr} Cr</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-muted-foreground">Disbursed</span><span className="font-medium text-emerald-700">₹{compensation.disbursedCr} Cr</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Pending</span><span className="font-medium text-amber-700">₹{compensation.pendingCr} Cr</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No compensation data.</CardContent></Card>}
        </TabsContent>

        <TabsContent value="rnr">
          {rnr ? (
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold text-[#0F2340] mb-3">R&R Status — {project.district}</h3>
                <div className="grid grid-cols-3 gap-3 text-[12px] mb-4">
                  <div><p className="text-muted-foreground">Affected Families</p><p className="font-medium">{rnr.affectedFamilies.toLocaleString()}</p></div>
                  <div><p className="text-muted-foreground">Completed</p><p className="font-medium text-emerald-700">{rnr.completed.toLocaleString()}</p></div>
                  <div><p className="text-muted-foreground">Pending</p><p className="font-medium text-amber-700">{rnr.pending.toLocaleString()}</p></div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${rnr.rrApplicable > 0 ? Math.round((rnr.completed / rnr.rrApplicable) * 100) : 0}%` }} />
                </div>
              </CardContent>
            </Card>
          ) : <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No R&R data.</CardContent></Card>}
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
          ) : <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No audit entries for this project.</CardContent></Card>}
        </TabsContent>
      </Tabs>
    </div>
  );
}

const STAGE_ORDER: Record<string, number> = {};
STAGES.forEach((s) => { STAGE_ORDER[s.id] = s.order; });
