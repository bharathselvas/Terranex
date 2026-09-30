import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GRAM_SABHA_CONSULTATIONS } from "./siaExpertData";
import { ArrowLeft, CheckCircle2, AlertTriangle, FileText, Camera } from "lucide-react";

const statusColors: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-800",
  conducted: "bg-amber-100 text-amber-800",
  minutes_pending: "bg-orange-100 text-orange-800",
  evidence_pending: "bg-rose-100 text-rose-800",
  completed: "bg-green-100 text-green-800",
};

export default function SiaGramSabhaDetailPage() {
  const consultation = GRAM_SABHA_CONSULTATIONS[0];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/gram-sabha" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Gram Sabha
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Gram Sabha — {consultation.village}</h1>
        <div className="flex items-center gap-3 mt-2">
          <Badge className={`text-xs ${statusColors[consultation.status]}`}>{consultation.status.replace("_", " ")}</Badge>
          <span className="text-sm text-muted-foreground">{consultation.date}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Details */}
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Consultation Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Village</span><span className="font-medium">{consultation.village}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{consultation.date}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="font-medium">{consultation.location}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Facilitator</span><span className="font-medium">{consultation.facilitator}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Attendance</span><span className="font-medium">{consultation.attendanceCount}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Families Represented</span><span className="font-medium">{consultation.affectedFamiliesRepresented}</span></div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">PESA Relevance</span>
                <Badge className={`text-xs ${consultation.pesaRelevance === "yes" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"}`}>{consultation.pesaRelevance}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">FRA Relevance</span>
                <Badge className={`text-xs ${consultation.fraRelevance === "yes" ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800"}`}>{consultation.fraRelevance}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Concerns */}
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Community Concerns</h2>
            {consultation.communityConcerns.length > 0 ? (
              <div className="space-y-2">
                {consultation.communityConcerns.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm p-2 rounded bg-amber-50">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    {c}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No concerns recorded yet</p>
            )}

            <h3 className="font-semibold text-[#0F2340] mt-6 mb-3">Questions Raised</h3>
            {consultation.questionsRaised.length > 0 ? (
              <div className="space-y-2">
                {consultation.questionsRaised.map((q, i) => (
                  <div key={i} className="text-sm p-2 rounded bg-blue-50">{q}</div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No questions recorded yet</p>
            )}

            <h3 className="font-semibold text-[#0F2340] mt-6 mb-3">Resolutions / Recommendations</h3>
            {consultation.resolutionsRecommendations.length > 0 ? (
              <div className="space-y-2">
                {consultation.resolutionsRecommendations.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm p-2 rounded bg-green-50">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {r}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No resolutions recorded yet</p>
            )}

            {consultation.dissentingViews.length > 0 && (
              <>
                <h3 className="font-semibold text-[#0F2340] mt-6 mb-3">Dissenting Views</h3>
                <div className="space-y-2">
                  {consultation.dissentingViews.map((d, i) => (
                    <div key={i} className="text-sm p-2 rounded bg-rose-50 text-rose-800">{d}</div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button className="bg-[#1B5E20] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#2E7D32]">
          <FileText className="h-4 w-4" /> Record Minutes
        </button>
        <button className="bg-white border border-[#1B5E20] text-[#1B5E20] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50">
          <Camera className="h-4 w-4" /> Attach Evidence
        </button>
        <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-50">
          <CheckCircle2 className="h-4 w-4" /> Mark Consultation Complete
        </button>
      </div>
    </div>
  );
}
