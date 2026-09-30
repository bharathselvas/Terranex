import { useState } from "react";
import { Link } from "react-router-dom";
import { Link2, ArrowUpRight, Clock, AlertTriangle, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WORK_QUEUE } from "@/features/ministry/ministryData";
import { formatDate } from "@/lib/format";

const CATEGORY_LABELS: Record<string, string> = {
  pending_review: "Pending Review",
  clarification_required: "Clarification Required",
  awaiting_state: "Awaiting State Response",
  awaiting_agency: "Awaiting Agency",
  escalation: "Escalation",
  document_attention: "Document Attention",
  timeline_risk: "Timeline Risk",
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

export function MinistryWorkQueuePage() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [search, setSearch] = useState("");

  const categories = [...new Set(WORK_QUEUE.map((w) => w.category))];

  const filtered = WORK_QUEUE.filter((w) => {
    const matchCat = categoryFilter === "all" || w.category === categoryFilter;
    const matchPri = priorityFilter === "all" || w.priority === priorityFilter;
    const matchSearch = !search || w.projectName.toLowerCase().includes(search.toLowerCase()) || w.issue.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchPri && matchSearch;
  });

  const today = new Date();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Work Queue</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Actionable items requiring ministry attention
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[11px]">
            {WORK_QUEUE.filter((w) => w.priority === "high").length} high priority
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search work items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
              ))}
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Work items */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const dueDate = new Date(item.dueDate);
          const isOverdue = dueDate < today;
          const isDueSoon = dueDate.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000 && !isOverdue;

          return (
            <Card key={item.id} className={isOverdue ? "border-red-200" : ""}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`text-[11px] ${PRIORITY_COLORS[item.priority]}`}>
                        {item.priority}
                      </Badge>
                      <Badge variant="outline" className="text-[11px]">
                        {CATEGORY_LABELS[item.category]}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        {item.state} / {item.district}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[#0F2340]">{item.issue}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Created {formatDate(item.createdDate)}
                      </span>
                      <span className={`flex items-center gap-1 ${isOverdue ? "text-red-600 font-medium" : isDueSoon ? "text-amber-600" : ""}`}>
                        <AlertTriangle className="h-3 w-3" />
                        Due {formatDate(item.dueDate)}
                        {isOverdue && " (OVERDUE)"}
                        {isDueSoon && " (Due Soon)"}
                      </span>
                      <span>Assigned to: {item.assignedTo}</span>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="shrink-0">
                    <Link to={`/app/ministry/project/${item.projectId}`}>
                      Project <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              No work items match your filters.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
