import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  IndianRupee,
  Users2,
  AlertTriangle,
  ArrowUpRight,
  FileText,
  Clock3,
  TrendingUp,
  FolderOpen,
  Briefcase,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DASHBOARD_KPIS, RISK_PROJECTS, WORK_QUEUE, ORG_PROFILE } from "@/features/requiring-org/roIAData";
import { ProjectContextHeader } from "@/features/demo/ProjectContextHeader";
import { LifecycleStepper } from "@/features/demo/LifecycleStepper";

const KPI_ICONS = [Briefcase, Briefcase, Briefcase, Briefcase, FileText, FileText, FileText, IndianRupee, IndianRupee, TrendingUp, TrendingUp, AlertTriangle];

export function ProjectDashboardPage() {
  return (
    <div className="space-y-6">
      <ProjectContextHeader />
      <LifecycleStepper />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Project Portfolio</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage and monitor {ORG_PROFILE.name} land acquisition projects
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Demo data — not actual Government of India figures
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/app/ro/projects">
              View Projects <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/app/ro/create">
              Create Project <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {DASHBOARD_KPIS.map((kpi, i) => {
          const Icon = KPI_ICONS[i] ?? Briefcase;
          return (
            <Card key={kpi.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-medium text-muted-foreground">{kpi.label}</p>
                  <Icon className="h-4 w-4 text-slate-500" />
                </div>
                <p className="mt-1 text-xl font-bold text-[#0F2340]">{kpi.value}</p>
                <p className="text-[11px] text-muted-foreground">{kpi.subtext}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick links grid */}
      <div className="grid gap-3 md:grid-cols-3">
        <Link to="/app/ro/create" className="group">
          <Card className="transition-colors hover:bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <FolderOpen className="h-5 w-5 text-blue-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0F2340]">Create New Project</p>
                  <p className="text-[11px] text-muted-foreground">Start a new acquisition project</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/app/ro/work-queue" className="group">
          <Card className="transition-colors hover:bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <Clock3 className="h-5 w-5 text-amber-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0F2340]">Work Queue</p>
                  <p className="text-[11px] text-muted-foreground">
                    {WORK_QUEUE.filter((w) => w.priority === "high").length} high priority items
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/app/ro/risk" className="group">
          <Card className="transition-colors hover:bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0F2340]">Risk Monitor</p>
                  <p className="text-[11px] text-muted-foreground">
                    {RISK_PROJECTS.length} projects at risk
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
