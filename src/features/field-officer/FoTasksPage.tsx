import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_TASKS } from "./fieldOfficerData";

const TABS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "today", label: "Today" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
  { key: "overdue", label: "Overdue" },
];

const statusColors: Record<string, string> = {
  assigned: "bg-blue-100 text-blue-800", accepted: "bg-indigo-100 text-indigo-800",
  in_progress: "bg-amber-100 text-amber-800", draft_saved: "bg-purple-100 text-purple-800",
  submitted: "bg-emerald-100 text-emerald-800", needs_reverification: "bg-orange-100 text-orange-800",
  completed: "bg-emerald-100 text-emerald-800", overdue: "bg-red-100 text-red-800",
};

const priorityColor = (p: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[p] ?? "bg-gray-100 text-gray-700";
};

export default function FoTasksPage() {
  const [tab, setTab] = useState("all");

  const filtered = FIELD_TASKS.filter((t) => {
    if (tab === "today") return t.dueDate.startsWith("2026-09-08") || t.dueDate.startsWith("2026-09-10");
    if (tab === "pending") return ["assigned", "accepted", "in_progress", "draft_saved"].includes(t.status);
    if (tab === "completed") return ["completed", "submitted"].includes(t.status);
    if (tab === "overdue") return t.status === "overdue";
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">My Field Tasks</h1>
        <p className="text-sm text-muted-foreground">{FIELD_TASKS.length} total tasks</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-medium transition-colors ${tab === t.key ? "bg-[#0F2340] text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}>{t.label}</button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filtered.map((t) => (
          <Link key={t.id} to={`/app/fo/task/${t.id}`} className="block">
            <Card className="shadow-sm transition-colors hover:bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#0F2340]">{t.projectName}</p>
                    <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-0.5">
                      <p className="text-xs text-muted-foreground"><span className="font-medium">Parcel:</span> {t.parcelId}</p>
                      <p className="text-xs text-muted-foreground"><span className="font-medium">Village:</span> {t.village}</p>
                      <p className="text-xs text-muted-foreground"><span className="font-medium">Task:</span> {t.taskType.replace(/_/g, " ")}</p>
                      <p className="text-xs text-muted-foreground"><span className="font-medium">Assigned:</span> {t.assignedBy}</p>
                      <p className="text-xs text-muted-foreground"><span className="font-medium">Due:</span> {t.dueDate.split("T")[0]}</p>
                      <p className="text-xs text-muted-foreground"><span className="font-medium">Distance:</span> {t.distanceKm} km</p>
                    </div>
                    {/* Evidence progress */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-gray-200">
                        <div className="h-1.5 rounded-full bg-[#0F2340]" style={{ width: `${(t.evidenceCount / t.evidenceRequired) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{t.evidenceCount}/{t.evidenceRequired}</span>
                    </div>
                  </div>
                  <div className="ml-3 flex flex-col items-end gap-1">
                    <Badge className={priorityColor(t.priority)}>{t.priority}</Badge>
                    <Badge className={statusColors[t.status]}>{t.status.replace(/_/g, " ")}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No tasks in this category.</p>}
      </div>
    </div>
  );
}
