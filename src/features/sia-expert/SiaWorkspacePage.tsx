import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SIA_ASSESSMENTS, SIA_SECTIONS, SIA_PROJECT, SIA_ID } from "./siaExpertData";
import { ArrowLeft, ChevronRight, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const sectionStatusColor = (p: number) => p === 100 ? "text-emerald-600" : p > 0 ? "text-amber-600" : "text-gray-400";
const sectionStatusIcon = (p: number) => p === 100 ? <CheckCircle2 className="h-4 w-4" /> : p > 0 ? <Clock className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />;

export default function SiaWorkspacePage() {
  const assessment = SIA_ASSESSMENTS.find((a) => a.id === SIA_ID) ?? SIA_ASSESSMENTS[0];
  const completedCount = SIA_SECTIONS.filter((s) => s.progress === 100).length;
  const totalCount = SIA_SECTIONS.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/assessments" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Assessments
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <span>Workspace / SIA Expert Group / Assessment</span>
        </div>
        <h1 className="text-2xl font-bold text-[#0F2340]">{assessment.id}</h1>
        <p className="text-sm text-muted-foreground mt-1">{assessment.projectName}</p>
      </div>

      {/* Project Summary */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">State</p>
              <p className="font-medium">{SIA_PROJECT.state}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">District</p>
              <p className="font-medium">{SIA_PROJECT.district}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Villages</p>
              <p className="font-medium">{SIA_PROJECT.villages.join(", ")}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Affected Families</p>
              <p className="font-medium">{assessment.affectedFamilies}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <Badge className="bg-amber-100 text-amber-800">{assessment.status}</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Progress</p>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${assessment.progress}%` }} />
                </div>
                <span className="text-xs font-medium">{assessment.progress}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Due Date</p>
              <p className="font-medium">{assessment.dueDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Completion</p>
              <p className="font-medium">{completedCount} / {totalCount} sections</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Lifecycle */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Assessment Progress</h2>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {SIA_SECTIONS.map((s, i) => (
              <div key={s.key} className="flex items-center">
                <Link to={`/app/sia/workspace/${assessment.id}/${s.key}`} className="flex flex-col items-center min-w-[100px] p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${s.progress === 100 ? "border-emerald-500 bg-emerald-50" : s.progress > 0 ? "border-amber-500 bg-amber-50" : "border-gray-300 bg-gray-50"}`}>
                    {sectionStatusIcon(s.progress)}
                  </div>
                  <p className="text-xs text-center mt-2 font-medium max-w-[100px]">{s.label}</p>
                  <p className={`text-xs mt-1 ${sectionStatusColor(s.progress)}`}>{s.progress}%</p>
                </Link>
                {i < SIA_SECTIONS.length - 1 && <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Missing Items */}
      {SIA_SECTIONS.some((s) => s.missing.length > 0) && (
        <Card className="mb-6 border-amber-200">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-amber-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Incomplete Items
            </h2>
            <div className="space-y-2">
              {SIA_SECTIONS.filter((s) => s.missing.length > 0).map((s) =>
                s.missing.map((m, i) => (
                  <div key={`${s.key}-${i}`} className="flex items-center gap-2 text-sm">
                    <span className="text-amber-500">⚠</span>
                    <span className="text-muted-foreground">{s.label}:</span>
                    <span>{m}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/app/sia/families">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#0F2340]">Affected Families</h3>
              <p className="text-sm text-muted-foreground mt-1">{assessment.affectedFamilies} families across {assessment.villages.length} villages</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/app/sia/consultations">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#0F2340]">Consultations</h3>
              <p className="text-sm text-muted-foreground mt-1">Gram Sabha and stakeholder consultation records</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/app/sia/evidence">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#0F2340]">Evidence Centre</h3>
              <p className="text-sm text-muted-foreground mt-1">Documents, photographs, maps and field notes</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
