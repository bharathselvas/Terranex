import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RR_CASES, FAMILY_PROFILES, SOURCE_VERIFICATION, RR_PLAN_COMPONENTS, RR_EVIDENCE, GRIEVANCES } from "./rrOfficerData";
import { ArrowLeft, CheckCircle2, Clock, ExternalLink, AlertTriangle, FileText } from "lucide-react";

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800",
  verification_required: "bg-amber-100 text-amber-800",
  under_review: "bg-blue-100 text-blue-800",
  plan_active: "bg-indigo-100 text-indigo-800",
  partially_delivered: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  on_hold: "bg-yellow-100 text-yellow-800",
  grievance: "bg-red-100 text-red-800",
  escalated: "bg-red-200 text-red-900",
};

const compStatusColors: Record<string, string> = {
  not_applicable: "bg-gray-100 text-gray-600",
  pending_verification: "bg-amber-100 text-amber-800",
  planned: "bg-blue-100 text-blue-800",
  in_progress: "bg-indigo-100 text-indigo-800",
  delivered: "bg-purple-100 text-purple-800",
  verified: "bg-green-100 text-green-800",
  under_review: "bg-orange-100 text-orange-800",
  requires_review: "bg-rose-100 text-rose-800",
};

const verificationColors: Record<string, string> = {
  verified: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  conflict: "bg-red-100 text-red-800",
  not_available: "bg-gray-100 text-gray-600",
};

export default function RrCaseWorkspacePage() {
  const { caseId } = useParams();
  const caseData = RR_CASES.find((c) => c.id === caseId) || RR_CASES[0];
  const family = FAMILY_PROFILES.find((f) => f.familyId === caseData.familyId);
  const completedCount = RR_PLAN_COMPONENTS.filter((c) => c.status === "verified" || c.status === "delivered").length;
  const caseEvidence = RR_EVIDENCE.filter((e) => e.relatedFamily === caseData.familyId);
  const caseGrievances = GRIEVANCES.filter((g) => g.familyId === caseData.familyId);
  const hasConflict = SOURCE_VERIFICATION.some((s) => s.verificationStatus === "conflict");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/cases" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Cases
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0F2340]">{caseData.id}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge className={`text-xs ${statusColors[caseData.status]}`}>{caseData.status.replace(/_/g, " ")}</Badge>
              <span className="text-sm text-muted-foreground">Family: {caseData.familyId}</span>
              <span className="text-sm text-muted-foreground">Project: {caseData.project}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Last Updated</p>
            <p className="text-sm font-medium">{caseData.lastUpdated}</p>
          </div>
        </div>
      </div>

      {/* Case Timeline */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Case Timeline</h2>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {["SIA Identification", "Field Enumeration", "Verification", "R&R Planning", "Component Delivery", "Evidence", "Completion"].map((step, i) => {
              const isComplete = i < 4;
              const isCurrent = i === 4;
              return (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center min-w-[100px] p-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isComplete ? "border-green-500 bg-green-50" : isCurrent ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}`}>
                      {isComplete ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : isCurrent ? <Clock className="h-4 w-4 text-blue-600" /> : <span className="text-xs text-gray-400">{i + 1}</span>}
                    </div>
                    <p className="text-[10px] text-center mt-1 max-w-[90px]">{step}</p>
                  </div>
                  {i < 6 && <div className={`w-6 h-0.5 ${isComplete ? "bg-green-400" : "bg-gray-300"}`} />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Family Details */}
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Family Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Family ID</span><span className="font-mono">{caseData.familyId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{caseData.familyName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Village</span><span>{caseData.village}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">District</span><span>{caseData.district}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Displacement</span><Badge className={`text-xs ${caseData.displacement === "full" ? "bg-red-100 text-red-800" : caseData.displacement === "partial" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>{caseData.displacement}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Livelihood Impact</span><span>{caseData.livelihoodImpact ? "Yes" : "No"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Open Grievance</span>{caseData.openGrievance ? <Badge className="text-xs bg-red-100 text-red-800">Yes</Badge> : <span>None</span>}</div>
            </div>
            {family && (
              <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Household Size</span><span>{family.householdSize}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Occupation</span><span>{family.occupation}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Primary Livelihood</span><span>{family.primaryLivelihood}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Secondary Livelihood</span><span>{family.secondaryLivelihood || "None"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Land Affected</span><span>{family.landAffected}</span></div>
              </div>
            )}
            {family && family.vulnerabilityIndicators.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-2">Vulnerability Indicators</p>
                <div className="flex flex-wrap gap-1">
                  {family.vulnerabilityIndicators.map((v, i) => (
                    <Badge key={i} className={`text-xs ${v.verified ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-600"}`}>{v.indicator}{v.verified ? " ✓" : ""}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Source Verification */}
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Source & Verification</h2>
            {hasConflict && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-800 font-medium">Verification Required</p>
                </div>
                <p className="text-xs text-red-700 mt-1">Information from two sources does not match. Review required.</p>
              </div>
            )}
            <div className="space-y-3">
              {SOURCE_VERIFICATION.map((s) => (
                <div key={s.source} className={`flex items-center justify-between p-3 rounded-lg ${s.available ? "bg-green-50" : "bg-amber-50"}`}>
                  <div>
                    <p className="text-sm font-medium">{s.source}</p>
                    <p className="text-xs text-muted-foreground">{s.available ? `${s.date} — ${s.uploadedBy}` : "Not available"}</p>
                    {s.evidenceCount > 0 && <p className="text-xs text-muted-foreground">{s.evidenceCount} evidence items</p>}
                  </div>
                  <Badge className={`text-xs ${verificationColors[s.verificationStatus]}`}>{s.verificationStatus.replace(/_/g, " ")}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* R&R Plan */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">R&R Plan — {completedCount}/{RR_PLAN_COMPONENTS.length} Components</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {RR_PLAN_COMPONENTS.map((comp) => (
              <div key={comp.name} className="p-4 rounded-lg border bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#0F2340]">{comp.name}</span>
                  <Badge className={`text-xs ${compStatusColors[comp.status]}`}>{comp.status.replace(/_/g, " ")}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-1">
                  <span>{comp.applicable ? "Applicable" : "Not applicable"}</span>
                  <span>Verification: <Badge className={`text-xs ${verificationColors[comp.verification]}`}>{comp.verification}</Badge></span>
                </div>
                {comp.applicable && (
                  <>
                    <p className="text-xs text-muted-foreground">Officer: {comp.responsibleOfficer}</p>
                    <p className="text-xs text-muted-foreground">Target: {comp.targetDate}</p>
                    <p className="text-xs text-muted-foreground mt-1">{comp.remarks}</p>
                    {comp.evidenceCount > 0 && <p className="text-xs text-blue-600 mt-1">{comp.evidenceCount} evidence items</p>}
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evidence & Grievances */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" /> Evidence ({caseEvidence.length})
            </h2>
            {caseEvidence.length === 0 ? (
              <p className="text-sm text-muted-foreground">No evidence recorded for this case.</p>
            ) : (
              <div className="space-y-2">
                {caseEvidence.map((e) => (
                  <div key={e.id} className="flex items-center justify-between p-2 rounded bg-gray-50">
                    <div>
                      <p className="text-sm font-medium">{e.title}</p>
                      <p className="text-xs text-muted-foreground">{e.date} — {e.source}</p>
                    </div>
                    <Badge className={`text-xs ${e.status === "verified" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{e.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Grievances ({caseGrievances.length})
            </h2>
            {caseGrievances.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active grievances for this case.</p>
            ) : (
              <div className="space-y-2">
                {caseGrievances.map((g) => (
                  <div key={g.id} className="p-3 rounded border bg-gray-50">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs">{g.id}</span>
                      <Badge className={`text-xs ${g.status === "resolved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{g.status.replace(/_/g, " ")}</Badge>
                    </div>
                    <p className="text-sm">{g.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Component: {g.relatedComponent} | Due: {g.dueDate}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* External Links */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <ExternalLink className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-semibold text-[#0F2340] text-sm">View Acquisition Case</p>
              <p className="text-xs text-muted-foreground">Land acquisition details</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <ExternalLink className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="font-semibold text-[#0F2340] text-sm">View SIA Assessment</p>
              <p className="text-xs text-muted-foreground">Social impact assessment</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <ExternalLink className="h-5 w-5 text-purple-600" />
            <div>
              <p className="font-semibold text-[#0F2340] text-sm">View Field Verification</p>
              <p className="text-xs text-muted-foreground">Field officer verification</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Info */}
      {family && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div><span className="text-muted-foreground">Possession: </span><span className="font-medium">{family.possessionStatus}</span></div>
              <div><span className="text-muted-foreground">Compensation: </span><span className="font-medium">{family.compensationStatus}</span></div>
              <div><span className="text-muted-foreground">R&R Status: </span><span className="font-medium">{family.rrStatus}</span></div>
              <div><span className="text-muted-foreground">Parcel: </span><span className="font-mono text-xs">{family.parcelId}</span></div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
