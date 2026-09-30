import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Layers,
  Users,
  FileText,
  MessageSquareWarning,
  IndianRupee,
  Clock,
  ScrollText,
  AlertTriangle,
  Home,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RO_PROJECTS, PROJECT_STAKEHOLDERS, PARCELS_DATA, WORK_QUEUE } from "@/features/requiring-org/roIAData";
import { STAGES } from "@/lib/stages";
import { stageLabel, stageShortLabel, stageGroupColor, formatDate } from "@/lib/format";
import type { LifecycleStage } from "@/types/domain";

type ProjectWorkspaceProps = { projectId?: string };

export function ProjectWorkspacePage({ projectId }: ProjectWorkspaceProps) {
  const project = RO_PROJECTS.find((p) => p.id === projectId) ?? RO_PROJECTS[0];

  const RISK_COLORS: Record<string, string> = {
    critical: "bg-red-100 text-red-800",
    high: "bg-orange-100 text-orange-800",
    medium: "bg-amber-100 text-amber-800",
    low: "bg-blue-100 text-blue-800",
    on_track: "bg-emerald-100 text-emerald-800",
  };

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">{project.projectName}</h1>
          </div>
          <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
            <span>{project.id}</span>
            <span>•</span>
            <span>{ORG_PROFILE.name}</span>
            <span>•</span>
            <span>{project.states.join(", ")}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[11px]">{stageLabel(project.currentStage)}</Badge>
          <Badge className={`text-[11px] ${RISK_COLORS[project.risk]}`}>{project.risk.replace("_", " ")}</Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="parcels">Parcels</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="objections">Objections</TabsTrigger>
          <TabsTrigger value="compensation">Compensation</TabsTrigger>
          <TabsTrigger value="possession">Possession</TabsTrigger>
          <TabsTrigger value="rnr">R&R</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-[11px] font-medium text-muted-foreground">Current Stage</p>
                <p className="mt-1 text-lg font-bold text-[#0F2340]">{stageLabel(project.currentStage)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-[11px] font-medium text-muted-foreground">Progress</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1A3560] rounded-full" style={{ width: `${project.progress}%` }} />
                  </div>
                  <span className="text-lg font-bold text-[#0F2340]">{project.progress}%</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-[11px] font-medium text-muted-foreground">Total Parcels</p>
                <p className="mt-1 text-lg font-bold text-[#0F2340]">{project.parcels.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-[11px] font-medium text-muted-foreground">Budget</p>
                <p className="mt-1 text-lg font-bold text-[#0F2340]">₹ {project.budgetCr.toLocaleString()} Cr</p>
              </CardContent>
            </Card>
          </div>

          {/* Workflow mini */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Workflow Progress</h3>
              <div className="flex flex-wrap gap-1.5">
                {STAGES.map((stage) => {
                  const isCompleted = STAGES.findIndex((s) => s.id === stage.id) < STAGES.findIndex((s) => s.id === project.currentStage);
                  const isCurrent = stage.id === project.currentStage;
                  return (
                    <div
                      key={stage.id}
                      className={`px-2 py-1 rounded text-[10px] font-medium ${
                        isCurrent
                          ? "bg-[#0F2340] text-white"
                          : isCompleted
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {isCompleted ? "✓ " : isCurrent ? "● " : ""}{stageShortLabel(stage.id)}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Map Tab */}
        <TabsContent value="map">
          <Card>
            <CardContent className="p-0 h-[500px] relative overflow-hidden bg-slate-100">
              <svg viewBox="0 0 800 600" className="w-full h-full" style={{ background: "linear-gradient(135deg, #e0e7ef 0%, #c7d2de 100%)" }}>
                <path d="M200,100 L600,100 L650,300 L600,500 L200,500 L150,300 Z" fill="#2a4a6b" stroke="#1a3560" strokeWidth="2" opacity="0.2" />
                <text x="400" y="300" textAnchor="middle" fill="#0F2340" fontSize="14" fontWeight="600">Project GIS Map — {project.projectName}</text>
                <text x="400" y="320" textAnchor="middle" fill="#64748b" fontSize="10">Interactive map with parcels, boundaries, and layers</text>
              </svg>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <p className="text-[10px] font-semibold text-slate-700 mb-2">Layers</p>
                <div className="space-y-1">
                  {["Project Boundary", "Acquisition Parcels", "State Boundary", "District Boundary", "Village Boundary"].map((l) => (
                    <label key={l} className="flex items-center gap-1.5 text-[10px] text-slate-600">
                      <input type="checkbox" defaultChecked className="rounded" />
                      {l}
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parcels Tab */}
        <TabsContent value="parcels">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-slate-50">
                      <th className="px-4 py-3 text-left font-medium text-slate-700">ULPIN</th>
                      <th className="px-4 py-3 text-left font-medium text-slate-700">Survey No</th>
                      <th className="px-4 py-3 text-left font-medium text-slate-700">Village</th>
                      <th className="px-4 py-3 text-left font-medium text-slate-700">District</th>
                      <th className="px-4 py-3 text-center font-medium text-slate-700">Area (Ha)</th>
                      <th className="px-4 py-3 text-left font-medium text-slate-700">Owner</th>
                      <th className="px-4 py-3 text-left font-medium text-slate-700">Stage</th>
                      <th className="px-4 py-3 text-left font-medium text-slate-700">Compensation</th>
                      <th className="px-4 py-3 text-left font-medium text-slate-700">Possession</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PARCELS_DATA.slice(0, 6).map((p) => (
                      <tr key={p.id} className="border-b last:border-0 hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-mono text-[11px] text-slate-600">{p.ulpin}</td>
                        <td className="px-4 py-3 text-[11px]">{p.surveyNo}</td>
                        <td className="px-4 py-3 text-[11px]">{p.village}</td>
                        <td className="px-4 py-3 text-[11px]">{p.district}</td>
                        <td className="px-4 py-3 text-center text-[11px]">{p.areaHa}</td>
                        <td className="px-4 py-3 text-[11px]">{p.owner}</td>
                        <td className="px-4 py-3"><Badge variant="secondary" className="text-[10px]">{stageLabel(p.stage)}</Badge></td>
                        <td className="px-4 py-3"><Badge variant="secondary" className="text-[10px]">{p.compensationStatus}</Badge></td>
                        <td className="px-4 py-3"><Badge variant="secondary" className="text-[10px]">{p.possessionStatus}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workflow Tab */}
        <TabsContent value="workflow">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-[#0F2340] mb-4">17-Stage Statutory Lifecycle</h3>
              <div className="space-y-1.5">
                {STAGES.map((stage) => {
                  const stageIdx = STAGES.findIndex((s) => s.id === stage.id);
                  const currentIdx = STAGES.findIndex((s) => s.id === project.currentStage);
                  const isCompleted = stageIdx < currentIdx;
                  const isCurrent = stage.id === project.currentStage;
                  return (
                    <div key={stage.id} className={`flex items-center gap-3 p-2 rounded ${isCurrent ? "bg-blue-50 border border-blue-200" : ""}`}>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        isCompleted ? "bg-emerald-100 text-emerald-800" : isCurrent ? "bg-[#0F2340] text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {isCompleted ? "✓" : stage.order}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#0F2340]">{stage.label}</p>
                        <p className="text-[10px] text-muted-foreground">SLA: {stage.slaDays} days • {stage.responsibleRoles?.join(", ")}</p>
                      </div>
                      {isCompleted && <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">Completed</Badge>}
                      {isCurrent && <Badge className="bg-blue-100 text-blue-800 text-[10px]">Current</Badge>}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stakeholders Tab */}
        <TabsContent value="stakeholders">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Project Stakeholders</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {PROJECT_STAKEHOLDERS.map((s) => (
                  <div key={s.id} className="border rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F2340] text-white text-[10px] font-semibold shrink-0">
                        {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-[#0F2340]">{s.name}</p>
                        <p className="text-[10px] text-muted-foreground">{s.role} — {s.organization}</p>
                      </div>
                      <Badge variant="outline" className="text-[9px] ml-auto capitalize">{s.level}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#0F2340]">Project Documents</h3>
                <button className="px-3 py-1.5 bg-[#0F2340] text-white rounded-md text-[11px] font-medium">Upload Document</button>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Project Proposal", type: "Project Proposal", stage: "project_proposal" as LifecycleStage, status: "verified" },
                  { name: "Land Requirement Document", type: "Land Requirement", stage: "land_requirement" as LifecycleStage, status: "verified" },
                  { name: "GIS Footprint Plan", type: "GIS Plan", stage: "gis_identification" as LifecycleStage, status: "verified" },
                  { name: "Submission Package", type: "Submission Package", stage: "submission" as LifecycleStage, status: "verified" },
                  { name: "Scrutiny Response", type: "Scrutiny Response", stage: "scrutiny" as LifecycleStage, status: "pending" },
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-[#0F2340]">{doc.name}</p>
                        <p className="text-[10px] text-muted-foreground">{doc.type} • {stageLabel(doc.stage)}</p>
                      </div>
                    </div>
                    <Badge className={`text-[10px] ${doc.status === "verified" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{doc.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Objections Tab */}
        <TabsContent value="objections">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Objections & Grievances</h3>
              <p className="text-[11px] text-muted-foreground mb-4">Monitor citizen objections related to this project. You may provide supporting information but cannot adjudicate.</p>
              <div className="space-y-2">
                {[
                  { parcel: "33/4A", category: "Compensation", status: "under_review", authority: "Collector, Pune" },
                  { parcel: "33/4B", category: "Land Measurement", status: "under_review", authority: "Collector, Pune" },
                ].map((obj, idx) => (
                  <div key={idx} className="border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#0F2340]">Parcel {obj.parcel} — {obj.category}</p>
                        <p className="text-[10px] text-muted-foreground">Current Authority: {obj.authority}</p>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">{obj.status.replace("_", " ")}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compensation Tab */}
        <TabsContent value="compensation">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Compensation Status</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <div><p className="text-[10px] text-muted-foreground">Assessed</p><p className="text-lg font-bold text-[#0F2340]">₹ 110 Cr</p></div>
                <div><p className="text-[10px] text-muted-foreground">Awarded</p><p className="text-lg font-bold text-[#0F2340]">₹ 95 Cr</p></div>
                <div><p className="text-[10px] text-muted-foreground">Disbursed</p><p className="text-lg font-bold text-emerald-700">₹ 49 Cr</p></div>
                <div><p className="text-[10px] text-muted-foreground">Pending</p><p className="text-lg font-bold text-amber-700">₹ 46 Cr</p></div>
              </div>
              <div className="bg-blue-50 rounded p-2 text-[11px] text-blue-800 mt-4">
                Compensation assessment and finalization is performed by the District Collector / CALA. You can monitor progress and provide required information.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Possession Tab */}
        <TabsContent value="possession">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Possession Status</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <div><p className="text-[10px] text-muted-foreground">Total Parcels</p><p className="text-lg font-bold text-[#0F2340]">{project.parcels.toLocaleString()}</p></div>
                <div><p className="text-[10px] text-muted-foreground">Completed</p><p className="text-lg font-bold text-emerald-700">—</p></div>
                <div><p className="text-[10px] text-muted-foreground">Pending</p><p className="text-lg font-bold text-amber-700">—</p></div>
                <div><p className="text-[10px] text-muted-foreground">Disputed</p><p className="text-lg font-bold text-red-600">—</p></div>
              </div>
              <div className="bg-blue-50 rounded p-2 text-[11px] text-blue-800 mt-4">
                Possession recording is performed by the Field Officer and certified by the District Collector / CALA. You can monitor status.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* R&R Tab */}
        <TabsContent value="rnr">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Rehabilitation & Resettlement</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <div><p className="text-[10px] text-muted-foreground">Affected Families</p><p className="text-lg font-bold text-[#0F2340]">—</p></div>
                <div><p className="text-[10px] text-muted-foreground">R&R Applicable</p><p className="text-lg font-bold text-[#0F2340]">—</p></div>
                <div><p className="text-[10px] text-muted-foreground">Completed</p><p className="text-lg font-bold text-emerald-700">—</p></div>
                <div><p className="text-[10px] text-muted-foreground">Pending</p><p className="text-lg font-bold text-amber-700">—</p></div>
              </div>
              <div className="bg-blue-50 rounded p-2 text-[11px] text-blue-800 mt-4">
                R&R entitlement determination and implementation is performed by the R&R Officer and District Collector. You can monitor progress.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Need to import ORG_PROFILE
import { ORG_PROFILE } from "@/features/requiring-org/roIAData";
