import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CITIZEN_PROJECTS, CITIZEN_NOTICES, CITIZEN_TIMELINE, STAGE_LABELS } from "./citizenData";
import type { AcquisitionStage } from "./citizenData";
import { ArrowLeft, Calendar, FileText, CheckCircle2, Clock, Circle } from "lucide-react";

const ALL_STAGES: AcquisitionStage[] = [
  "proposal", "gis_identification", "scrutiny", "sia", "section_11",
  "disclosure", "objections", "declaration", "field_verification",
  "award", "compensation", "possession", "r_and_r",
];

export default function CitizenProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = CITIZEN_PROJECTS.find((p) => p.projectId === projectId);
  const notices = CITIZEN_NOTICES.filter((n) => n.projectId === projectId);

  if (!project) {
    return (
      <div className="space-y-4">
        <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
          MOCK / SANDBOX
        </div>
        <Card>
          <CardContent className="py-12 text-center text-slate-500">
            Project not found.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <Link to="/citizen/status" className="inline-flex items-center gap-1 text-sm text-[#0F2340] hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to Search
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#0F2340]">{project.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">{project.purpose}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><span className="text-slate-500">Requiring Organisation:</span> <span className="font-medium">{project.requiringOrg}</span></div>
            <div><span className="text-slate-500">Implementing Agency:</span> <span className="font-medium">{project.implementingAgency}</span></div>
            <div><span className="text-slate-500">State:</span> <span className="font-medium">{project.state}</span></div>
            <div><span className="text-slate-500">District:</span> <span className="font-medium">{project.district}</span></div>
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500">Affected Villages:</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {project.affectedVillages.map((v) => (
                <Badge key={v} variant="secondary" className="text-[10px]">{v}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#0F2340]">Acquisition Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
            <div className="space-y-1">
              {ALL_STAGES.map((stage) => {
                const timeline = CITIZEN_TIMELINE.find((t) => t.stage === stage);
                const status = timeline?.status ?? "not_started";
                return (
                  <div key={stage} className="relative flex items-start gap-4 pl-1">
                    <div className="relative z-10 mt-1">
                      {status === "completed" && (
                        <div className="w-8 h-8 rounded-full bg-[#0F7A5A] flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      )}
                      {status === "in_progress" && (
                        <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                      )}
                      {status === "not_started" && (
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                          <Circle className="h-4 w-4 text-slate-400" />
                        </div>
                      )}
                      {status === "attention_required" && (
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                          <Circle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${status === "not_started" ? "text-slate-400" : "text-slate-800"}`}>
                          {STAGE_LABELS[stage]}
                        </span>
                        {status === "in_progress" && <Badge variant="warning" className="text-[9px]">In Progress</Badge>}
                        {status === "completed" && <Badge variant="success" className="text-[9px]">Completed</Badge>}
                      </div>
                      {timeline?.date && <p className="text-xs text-slate-500">{timeline.date}</p>}
                      {timeline?.reference && <p className="text-xs text-slate-400">{timeline.reference}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {project.importantDates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-[#0F2340] flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Important Dates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs text-slate-500">
                    <th className="pb-2 font-medium">Event</th>
                    <th className="pb-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {project.importantDates.map((d, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2 text-slate-700">{d.label}</td>
                      <td className="py-2 text-slate-500">{d.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {notices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-[#0F2340] flex items-center gap-2">
              <FileText className="h-4 w-4" /> Published Notices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notices.map((n) => (
              <Link key={n.noticeId} to={`/citizen/notices/${n.noticeId}`} className="block p-3 rounded-md border hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[#0F2340]">{n.title}</p>
                    <p className="text-xs text-slate-500">{n.referenceNo}</p>
                    <p className="text-xs text-slate-400">{n.village}, {n.district} — {n.publicationDate}</p>
                  </div>
                  <Badge variant="outline" className="text-[9px] shrink-0 whitespace-nowrap">
                    {n.type.replace(/_/g, " ")}
                  </Badge>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
