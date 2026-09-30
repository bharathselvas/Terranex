import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SKILL_DEV_RECORDS } from "./rrOfficerData";
import { ArrowLeft, GraduationCap } from "lucide-react";

const statusColors: Record<string, string> = {
  not_applicable: "bg-gray-100 text-gray-600",
  pending_verification: "bg-amber-100 text-amber-800",
  planned: "bg-blue-100 text-blue-800",
  in_progress: "bg-indigo-100 text-indigo-800",
  delivered: "bg-purple-100 text-purple-800",
  verified: "bg-green-100 text-green-800",
  under_review: "bg-orange-100 text-orange-800",
  requires_review: "bg-rose-100 text-rose-800",
};

const completionColors: Record<string, string> = {
  not_started: "bg-gray-100 text-gray-600",
  enrolled: "bg-blue-100 text-blue-800",
  in_training: "bg-indigo-100 text-indigo-800",
  completed: "bg-green-100 text-green-800",
  dropped_out: "bg-red-100 text-red-800",
};

export default function RrSkillDevPage() {
  const completed = SKILL_DEV_RECORDS.filter((r) => r.completionStatus === "completed").length;
  const inTraining = SKILL_DEV_RECORDS.filter((r) => r.completionStatus === "in_training").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Skill Development</h1>
        <p className="text-sm text-muted-foreground mt-1">Skill development tracking for affected families</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Tracked</p>
            <p className="text-2xl font-bold text-[#0F2340]">{SKILL_DEV_RECORDS.length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-[#0F2340]">{completed}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-indigo-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">In Training</p>
            <p className="text-2xl font-bold text-[#0F2340]">{inTraining}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Pending / Enrolled</p>
            <p className="text-2xl font-bold text-[#0F2340]">{SKILL_DEV_RECORDS.length - completed - inTraining}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {SKILL_DEV_RECORDS.map((r) => (
          <Card key={r.familyId} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-semibold text-[#0F2340]">{r.familyName}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{r.familyId}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${completionColors[r.completionStatus]}`}>{r.completionStatus.replace(/_/g, " ")}</Badge>
                  <Badge className={`text-xs ${statusColors[r.status]}`}>{r.status.replace(/_/g, " ")}</Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Existing Skill</p>
                  <p className="text-sm font-medium">{r.existingSkill}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Desired Skill</p>
                  <p className="text-sm font-medium">{r.desiredSkill}</p>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded mb-3">
                <p className="text-xs text-muted-foreground mb-1">Training Program</p>
                <p className="text-sm font-medium">{r.trainingProgram}</p>
                <p className="text-xs text-muted-foreground mt-1">Provider: {r.trainingProvider}</p>
              </div>

              <div className="grid md:grid-cols-4 gap-4 text-sm mb-3">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Enrollment Date</p>
                  <p className="font-medium">{r.enrollmentDate || "Not enrolled"}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Attendance</p>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${r.attendancePercent}%` }} />
                    </div>
                    <span className="font-medium">{r.attendancePercent}%</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Certification</p>
                  <p className="font-medium">{r.certificationReceived ? "Received" : "Pending"}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Evidence</p>
                  <p className="font-medium">{r.evidenceCount} items</p>
                </div>
              </div>

              {r.outcome && <p className="text-xs text-muted-foreground mt-2 p-2 bg-gray-50 rounded">Outcome: {r.outcome}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
