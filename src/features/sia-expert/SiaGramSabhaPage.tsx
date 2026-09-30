import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GRAM_SABHA_CONSULTATIONS } from "./siaExpertData";
import { ArrowLeft, ChevronRight, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const statusColors: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-800",
  conducted: "bg-amber-100 text-amber-800",
  minutes_pending: "bg-orange-100 text-orange-800",
  evidence_pending: "bg-rose-100 text-rose-800",
  completed: "bg-green-100 text-green-800",
};

const statusIcons: Record<string, typeof CheckCircle2> = {
  scheduled: Clock,
  conducted: AlertTriangle,
  minutes_pending: AlertTriangle,
  evidence_pending: AlertTriangle,
  completed: CheckCircle2,
};

export default function SiaGramSabhaPage() {
  const completedCount = GRAM_SABHA_CONSULTATIONS.filter((g) => g.status === "completed").length;
  const totalCount = GRAM_SABHA_CONSULTATIONS.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Gram Sabha Consultations</h1>
        <p className="text-sm text-muted-foreground mt-1">{completedCount} / {totalCount} consultations completed</p>
      </div>

      <div className="space-y-4">
        {GRAM_SABHA_CONSULTATIONS.map((g) => {
          const Icon = statusIcons[g.status];
          return (
            <Link key={g.id} to={`/app/sia/gram-sabha/${g.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${g.status === "completed" ? "bg-green-50" : g.status === "scheduled" ? "bg-blue-50" : "bg-amber-50"}`}>
                        <Icon className={`h-5 w-5 ${g.status === "completed" ? "text-green-600" : g.status === "scheduled" ? "text-blue-600" : "text-amber-600"}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0F2340]">{g.village} — Gram Sabha</h3>
                        <p className="text-sm text-muted-foreground mt-1">{g.date} | {g.location}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Attendance: {g.attendanceCount}</span>
                          <span>Families Represented: {g.affectedFamiliesRepresented}</span>
                          <span>Evidence: {g.evidenceCount}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {g.pesaRelevance === "yes" && <Badge className="text-xs bg-purple-100 text-purple-800">PESA</Badge>}
                          {g.fraRelevance === "yes" && <Badge className="text-xs bg-indigo-100 text-indigo-800">FRA</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`text-xs ${statusColors[g.status]}`}>{g.status.replace("_", " ")}</Badge>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
