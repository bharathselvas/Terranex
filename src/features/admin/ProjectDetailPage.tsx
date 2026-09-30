import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Files,
  AlertTriangle,
  Clock,
  IndianRupee,
  Home,
  FileText,
  Users,
  ScrollText,
  MessageSquareWarning,
  Shield,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { MONITORING_PROJECTS, ADMIN_DOCUMENTS, ADMIN_AUDIT_TRAIL } from "@/features/admin/adminData";
import { STAGES } from "@/lib/stages";
import { stageShortLabel, stageGroupColor, formatDate, formatINR } from "@/lib/format";
import { MOCK_PARCELS } from "@/mocks/parcels";
import { MOCK_PAYMENTS, MOCK_OBJECTIONS, MOCK_GRIEVANCES } from "@/mocks/audit";
import { StageStepper } from "@/components/domain/StageStepper";

const RISK_VARIANT: Record<string, "danger" | "warning" | "info" | "success" | "secondary"> = {
  critical: "danger",
  high: "warning",
  medium: "info",
  low: "secondary",
  on_track: "success",
};

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState("overview");

  const project = MONITORING_PROJECTS.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="space-y-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/app/admin/monitoring"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Monitoring</Link>
        </Button>
        <Card>
          <CardContent className="p-12 text-center">
            <Files className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-600">Project not found</p>
            <p className="text-xs text-muted-foreground mt-1">The project {projectId} does not exist in the demo dataset.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const projectParcels = MOCK_PARCELS.slice(0, Math.min(project.parcels, 6));
  const projectDocs = ADMIN_DOCUMENTS.filter((d) => d.project.includes("Pune") || d.project.includes(project.projectName.split(" ")[0])).slice(0, 5);
  const projectAudit = ADMIN_AUDIT_TRAIL.filter((a) => a.project.includes("Pune") || a.project.includes(project.projectName.split(" ")[0])).slice(0, 5);

  return (
    <div className="space-y-5">
      {/* Back link */}
      <Button asChild variant="ghost" size="sm">
        <Link to="/app/admin/monitoring"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Monitoring</Link>
      </Button>

      {/* Project Header */}
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="gov-mono text-muted-foreground">{project.id}</span>
                <Badge variant={RISK_VARIANT[project.risk]} className="text-[10px] capitalize">
                  {project.risk === "on_track" ? "On Track" : project.risk}
                </Badge>
              </div>
              <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">{project.projectName}</h1>
              <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {project.ministry}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {project.state}, {project.district}</span>
                <span className="flex items-center gap-1"><Files className="h-3.5 w-3.5" /> {project.parcels.toLocaleString("en-IN")} parcels</span>
                <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" /> ₹{project.budgetCr.toLocaleString("en-IN")} Cr</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Current Stage</p>
              <Badge variant="secondary" className="text-xs mt-1">{stageShortLabel(project.currentStage)}</Badge>
              <p className="text-xs text-muted-foreground mt-1">Progress: {project.progress}%</p>
            </div>
          </div>

          {/* Stage Stepper */}
          <div className="mt-4 pt-4 border-t">
            <StageStepper currentStageId={project.currentStage} size="sm" />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-9">
          {["overview", "map", "parcels", "workflow", "documents", "stakeholders", "objections", "compensation", "possession", "rr", "grievances", "audit"].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="text-[11px] capitalize px-3">
              {tab === "rr" ? "R&R" : tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Project Details</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Implementing Agency</span><span className="font-medium">{project.implementingAgency}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Ministry</span><span className="font-medium">{project.ministry}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">State</span><span className="font-medium">{project.state}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">District</span><span className="font-medium">{project.district}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Budget</span><span className="font-medium">₹{project.budgetCr.toLocaleString("en-IN")} Cr</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Last Activity</span><span className="font-medium">{formatDate(project.lastActivity)}</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Statistics</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-slate-50 p-3 text-center"><p className="text-2xl font-bold text-[#0F2340]">{project.parcels.toLocaleString("en-IN")}</p><p className="text-[11px] text-muted-foreground">Total Parcels</p></div>
                  <div className="rounded-md bg-slate-50 p-3 text-center"><p className="text-2xl font-bold text-emerald-600">{project.progress}%</p><p className="text-[11px] text-muted-foreground">Progress</p></div>
                  <div className="rounded-md bg-slate-50 p-3 text-center"><p className="text-2xl font-bold text-[#B42318]">{project.risk === "critical" || project.risk === "high" ? "Yes" : "No"}</p><p className="text-[11px] text-muted-foreground">At Risk</p></div>
                  <div className="rounded-md bg-slate-50 p-3 text-center"><p className="text-2xl font-bold text-[#0F2340]">{project.budgetCr.toLocaleString("en-IN")}</p><p className="text-[11px] text-muted-foreground">Budget (₹ Cr)</p></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="parcels" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b">
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Survey No</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Village</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Owner</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Land Type</th>
                      <th className="px-3 py-2.5 text-right text-[11px] font-semibold uppercase text-muted-foreground">Area (Ha)</th>
                      <th className="px-3 py-2.5 text-right text-[11px] font-semibold uppercase text-muted-foreground">Compensation</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {projectParcels.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="px-3 py-2.5 gov-mono text-[#0F2340]">{p.surveyNo}</td>
                        <td className="px-3 py-2.5 text-xs">{p.village}</td>
                        <td className="px-3 py-2.5 text-xs">{p.owner.name}</td>
                        <td className="px-3 py-2.5"><Badge variant="secondary" className="text-[10px]">{p.landType}</Badge></td>
                        <td className="px-3 py-2.5 text-right text-xs">{p.areaHa}</td>
                        <td className="px-3 py-2.5 text-right text-xs font-medium">{formatINR(p.compensationAmount)}</td>
                        <td className="px-3 py-2.5"><Badge variant={p.compensationStatus === "paid" ? "success" : p.compensationStatus === "disputed" ? "danger" : "secondary"} className="text-[10px] capitalize">{p.compensationStatus}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b">
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Document</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Type</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Stage</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Uploaded By</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {projectDocs.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50">
                        <td className="px-3 py-2.5 text-xs font-medium">{d.documentName}</td>
                        <td className="px-3 py-2.5"><Badge variant="secondary" className="text-[10px]">{d.documentType}</Badge></td>
                        <td className="px-3 py-2.5 text-xs">{d.stage.replace(/_/g, " ")}</td>
                        <td className="px-3 py-2.5 text-xs">{d.uploadedBy}</td>
                        <td className="px-3 py-2.5"><Badge variant={d.status === "verified" ? "success" : "warning"} className="text-[10px] capitalize">{d.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b">
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Timestamp</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Actor</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Action</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">Prev</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase text-muted-foreground">New</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {projectAudit.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50">
                        <td className="px-3 py-2.5 text-[11px] text-muted-foreground gov-mono">{formatDate(a.timestamp)}</td>
                        <td className="px-3 py-2.5 text-xs font-medium">{a.actor}</td>
                        <td className="px-3 py-2.5 text-xs">{a.action}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground">{a.previousState ?? "—"}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground">{a.newState ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder tabs */}
        {["map", "workflow", "stakeholders", "objections", "compensation", "possession", "rr", "grievances"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <Card>
              <CardContent className="p-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 mx-auto mb-3">
                  {tab === "map" && <MapPin className="h-6 w-6 text-slate-400" />}
                  {tab === "workflow" && <ScrollText className="h-6 w-6 text-slate-400" />}
                  {tab === "stakeholders" && <Users className="h-6 w-6 text-slate-400" />}
                  {tab === "objections" && <MessageSquareWarning className="h-6 w-6 text-slate-400" />}
                  {tab === "compensation" && <IndianRupee className="h-6 w-6 text-slate-400" />}
                  {tab === "possession" && <Home className="h-6 w-6 text-slate-400" />}
                  {tab === "rr" && <Home className="h-6 w-6 text-slate-400" />}
                  {tab === "grievances" && <AlertTriangle className="h-6 w-6 text-slate-400" />}
                </div>
                <p className="text-sm font-medium text-slate-600 capitalize">{tab === "rr" ? "R&R" : tab}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {tab === "map" && "GIS parcel visualization — reuse national GIS for this project's parcels"}
                  {tab === "workflow" && "Stage-by-stage workflow for this project — reuse workflow config"}
                  {tab === "stakeholders" && "Stakeholder registry for this project"}
                  {tab === "objections" && "Objection register — view and track all filed objections"}
                  {tab === "compensation" && "Compensation assessment and disbursement details"}
                  {tab === "possession" && "Possession status and certificates"}
                  {tab === "rr" && "Rehabilitation & Resettlement entitlements and status"}
                  {tab === "grievances" && "Grievance register for this project"}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
