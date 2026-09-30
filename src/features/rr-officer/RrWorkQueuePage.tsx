import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WORK_QUEUE, FIELD_TASKS } from "./rrOfficerData";
import { ChevronRight, AlertTriangle, Clock, FileText, CheckCircle2 } from "lucide-react";

const priorityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

const categoryIcons: Record<string, typeof AlertTriangle> = {
  critical: AlertTriangle,
  due_soon: Clock,
  routine: FileText,
};

const taskStatusColors: Record<string, string> = {
  assigned: "bg-blue-100 text-blue-800",
  in_progress: "bg-amber-100 text-amber-800",
  completed: "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
};

export default function RrWorkQueuePage() {
  const overdueTasks = FIELD_TASKS.filter((t) => t.status === "overdue").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">My Work Queue</h1>
        <p className="text-sm text-muted-foreground mt-1">Tasks across all active R&R cases</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-red-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Critical / Overdue</p>
            <p className="text-2xl font-bold text-[#0F2340]">{WORK_QUEUE.filter((w) => w.category === "critical").length + overdueTasks}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Due Soon</p>
            <p className="text-2xl font-bold text-[#0F2340]">{WORK_QUEUE.filter((w) => w.category === "due_soon").length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Routine</p>
            <p className="text-2xl font-bold text-[#0F2340]">{WORK_QUEUE.filter((w) => w.category === "routine").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Work Queue Sections */}
      {["critical", "due_soon", "routine"].map((cat) => {
        const items = WORK_QUEUE.filter((w) => w.category === cat);
        if (items.length === 0) return null;
        const Icon = categoryIcons[cat];
        return (
          <div key={cat} className="mb-6">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-3 capitalize flex items-center gap-2">
              <Icon className="h-5 w-5" /> {cat.replace("_", " ")}
            </h2>
            <div className="space-y-3">
              {items.map((w) => (
                <Card key={w.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-[#0F2340]">{w.title}</h3>
                          <Badge className={`text-xs ${priorityColors[w.priority]}`}>{w.priority}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{w.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Due: {w.dueDate}</span>
                          {w.caseId && (
                            <Link to={`/app/rr/case/${w.caseId}`} className="text-blue-600 hover:underline flex items-center gap-1">
                              View Case <ChevronRight className="h-3 w-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* Field Tasks */}
      <Card>
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Field Tasks</h2>
          <div className="space-y-3">
            {FIELD_TASKS.map((t) => (
              <div key={t.id} className={`flex items-center gap-4 p-3 rounded-lg border ${t.status === "overdue" ? "bg-red-50 border-red-200" : "bg-gray-50"}`}>
                <div className={`p-2 rounded ${t.status === "overdue" ? "bg-red-100" : t.status === "completed" ? "bg-green-100" : "bg-blue-100"}`}>
                  {t.status === "completed" ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Clock className="h-4 w-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{t.task}</p>
                    <Badge className={`text-xs ${taskStatusColors[t.status]}`}>{t.status.replace(/_/g, " ")}</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>{t.assignedTo}</span>
                    <span>{t.village}</span>
                    <span>Due: {t.dueDate}</span>
                    <span>Case: {t.caseId}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
