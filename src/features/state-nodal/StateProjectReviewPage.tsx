import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertTriangle, RefreshCw, XCircle, MapPin, Building2, Users, FileText, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { INCOMING_PROJECTS, PROJECT_REVIEWS, DISTRICT_ROUTING } from "@/features/state-nodal/stateNodalData";

export function StateProjectReviewPage() {
  const { projectId } = useParams();
  const project = INCOMING_PROJECTS.find((p) => p.id === projectId) ?? INCOMING_PROJECTS[0];
  const review = PROJECT_REVIEWS[project.id] ?? PROJECT_REVIEWS["proj-in-001"];
  const routing = DISTRICT_ROUTING.find((r) => r.projectId === project.id);

  const validationChecks = [
    { label: "State included", ok: review.stateIncluded },
    { label: "District mapping available", ok: review.districtMappingAvailable },
    { label: "GIS footprint available", ok: review.gisFootprintAvailable },
    { label: "Project information complete", ok: review.projectInfoComplete },
    { label: "Stakeholder information available", ok: review.stakeholderInfoAvailable },
  ];

  const allPassed = validationChecks.every((c) => c.ok);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link to="/app/state-nodal/incoming" className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-slate-700 mb-1">
            <ArrowLeft className="h-3 w-3" /> Back to Incoming Projects
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">{project.projectName}</h1>
            <Badge className="bg-amber-100 text-amber-800 text-[9px]">State-Level Coordination Review</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{project.projectCode} · {project.ministry} · {project.implementingAgency}</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-[11px] text-blue-800">
        This is a state-level coordination review. It is NOT a statutory acquisition approval. Statutory actions require District Collector / CALA authority.
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-sm font-semibold text-[#0F2340] mb-3">Project Information</h2>
            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Project Name</span><span className="font-medium text-[#0F2340]">{project.projectName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Project ID</span><span className="font-medium text-[#0F2340]">{project.projectCode}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Ministry</span><span className="font-medium text-[#0F2340]">{project.ministry}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Implementing Agency</span><span className="font-medium text-[#0F2340]">{project.implementingAgency}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Purpose</span><span className="font-medium text-[#0F2340] text-right max-w-[60%]">{project.purpose}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sector</span><span className="font-medium text-[#0F2340]">{project.sector}</span></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="text-sm font-semibold text-[#0F2340] mb-3">Geography</h2>
            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Requested State</span><span className="font-medium text-[#0F2340]">{project.requestedState}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Districts</span><span className="font-medium text-[#0F2340]">{project.districts.join(", ")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Estimated Parcels</span><span className="font-medium text-[#0F2340]">{project.estimatedParcels.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Estimated Area</span><span className="font-medium text-[#0F2340]">{project.estimatedAreaHa.toLocaleString()} Ha</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">GIS Footprint</span><span className={`font-medium ${review.gisFootprintAvailable ? "text-emerald-700" : "text-amber-700"}`}>{review.gisFootprintAvailable ? "Available" : "Pending"}</span></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="text-sm font-semibold text-[#0F2340] mb-3">Validation Checklist</h2>
          <div className="space-y-2">
            {validationChecks.map((check) => (
              <div key={check.label} className="flex items-center gap-2">
                {check.ok ? (
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                )}
                <span className={`text-[12px] ${check.ok ? "text-slate-700" : "text-amber-700 font-medium"}`}>{check.label}</span>
                <Badge className={`text-[9px] ml-auto ${check.ok ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                  {check.ok ? "Passed" : "Missing"}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-slate-50 rounded text-[11px] text-muted-foreground">{review.notes}</div>
        </CardContent>
      </Card>

      {routing && (
        <Card>
          <CardContent className="p-5">
            <h2 className="text-sm font-semibold text-[#0F2340] mb-3">Detected Districts</h2>
            <div className="space-y-2">
              {routing.districts.map((d) => (
                <div key={d.name} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="text-sm font-medium text-[#0F2340]">{d.name}</p>
                    <p className="text-[11px] text-muted-foreground">{d.parcels.toLocaleString()} parcels · {d.tehsils} tehsils</p>
                  </div>
                  <Badge className={`text-[9px] ${d.status === "routed" ? "bg-emerald-100 text-emerald-800" : d.status === "accepted" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"}`}>
                    {d.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2">
        <Button className="bg-[#1A3560] hover:bg-[#0F2340]">
          <CheckCircle className="h-4 w-4 mr-1" /> Accept for Routing
        </Button>
        <Button variant="outline" className="text-amber-700 border-amber-200 hover:bg-amber-50">
          <RefreshCw className="h-4 w-4 mr-1" /> Request Clarification
        </Button>
        <Button variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
          <XCircle className="h-4 w-4 mr-1" /> Return for Correction
        </Button>
      </div>
    </div>
  );
}
