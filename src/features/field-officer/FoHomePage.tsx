import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_TASKS, SYNC_ITEMS } from "./fieldOfficerData";
import { ClipboardCheck, MapPin, ArrowRight, Wifi, WifiOff } from "lucide-react";
import { ProjectContextHeader } from "@/features/demo/ProjectContextHeader";
import { LifecycleStepper } from "@/features/demo/LifecycleStepper";

export default function FoHomePage() {
  const assigned = FIELD_TASKS.filter((t) => t.status === "assigned").length;
  const completed = FIELD_TASKS.filter((t) => t.status === "completed" || t.status === "submitted").length;
  const pending = FIELD_TASKS.filter((t) => t.status === "in_progress" || t.status === "draft_saved").length;
  const overdue = FIELD_TASKS.filter((t) => t.status === "overdue").length;
  const pendingSync = SYNC_ITEMS.filter((s) => s.status === "queued" || s.status === "failed").length;
  const priorityTasks = FIELD_TASKS.filter((t) => t.status === "assigned" || t.status === "in_progress" || t.status === "overdue").slice(0, 3);

  return (
    <div className="space-y-6">
      <ProjectContextHeader />
      <LifecycleStepper />
      {/* Mobile-style header */}
      <div className="rounded-xl bg-gradient-to-r from-[#0F2340] to-[#1a3560] p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-blue-200">Field Operations</p>
            <h1 className="text-xl font-bold">Shri. M. Kamble</h1>
            <p className="text-xs text-blue-200">Pune District → Haveli Tehsil</p>
          </div>
          <div className="flex items-center gap-2">
            {pendingSync > 0 ? (
              <Badge className="bg-amber-500/20 text-amber-200"><WifiOff className="mr-1 h-3 w-3" />{pendingSync} pending</Badge>
            ) : (
              <Badge className="bg-emerald-500/20 text-emerald-200"><Wifi className="mr-1 h-3 w-3" />Synced</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="shadow-sm"><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-[#0F2340]">{assigned}</p>
          <p className="text-xs text-muted-foreground">Assigned</p>
        </CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-emerald-700">{completed}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-amber-700">{pending}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{overdue}</p>
          <p className="text-xs text-muted-foreground">Overdue</p>
        </CardContent></Card>
      </div>

      {/* Sync Status */}
      <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-800">Last Sync</p>
              <p className="text-sm font-medium">08 Sep 2026, 14:32</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-amber-700">{pendingSync} records pending upload</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Continue Field Work */}
      <Link to="/app/fo/tasks" className="block">
        <Card className="border-[#0F2340] bg-[#0F2340] text-white shadow-md transition-transform hover:scale-[1.01]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ClipboardCheck className="h-6 w-6" />
                <div>
                  <p className="text-lg font-bold">Continue Field Work</p>
                  <p className="text-xs text-blue-200">{assigned + pending} tasks active</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Priority Tasks */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-[#0F2340]">Priority Tasks</h2>
        <div className="space-y-3">
          {priorityTasks.map((t) => (
            <Link key={t.id} to={`/app/fo/task/${t.id}`} className="block">
              <Card className="shadow-sm transition-colors hover:bg-slate-50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#0F2340]">{t.projectName}</p>
                      <div className="mt-1 space-y-0.5">
                        <p className="text-xs text-muted-foreground"><span className="font-medium">Parcel:</span> {t.parcelId}</p>
                        <p className="text-xs text-muted-foreground"><span className="font-medium">Village:</span> {t.village}</p>
                        <p className="text-xs text-muted-foreground"><span className="font-medium">Task:</span> {t.taskType.replace(/_/g, " ")}</p>
                      </div>
                    </div>
                    <div className="ml-3 flex flex-col items-end gap-1">
                      <Badge className={`${t.priority === "critical" ? "bg-red-100 text-red-800" : t.priority === "high" ? "bg-orange-100 text-orange-800" : "bg-amber-100 text-amber-800"}`}>{t.priority}</Badge>
                      <Badge className={`${t.status === "overdue" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>{t.status.replace(/_/g, " ")}</Badge>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <MapPin className="h-3 w-3" />{t.distanceKm} km
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-xs font-medium text-white hover:bg-[#1a3560]">Start Task</button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
