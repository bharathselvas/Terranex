import { NavLink, Outlet, useParams } from "react-router-dom";
import { useDemoStore } from "@/features/demo/demoStore";
import { ProjectContextHeader } from "@/features/demo/ProjectContextHeader";
import { LifecycleStepper } from "@/features/demo/LifecycleStepper";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

// ═══════════════════════════════════════════════════════════════════════
// ProjectWorkspace — consistent project workspace shell
// Used across all internal roles when viewing a specific project
// ═══════════════════════════════════════════════════════════════════════

type ProjectTab = {
  label: string;
  path: string;
  end?: boolean;
};

const PROJECT_TABS: ProjectTab[] = [
  { label: "Overview", path: "", end: true },
  { label: "Map & Parcels", path: "map" },
  { label: "Workflow", path: "workflow" },
  { label: "Cases", path: "cases" },
  { label: "Documents", path: "documents" },
  { label: "Stakeholders", path: "stakeholders" },
  { label: "Timeline", path: "timeline" },
  { label: "Audit", path: "audit" },
];

export function ProjectWorkspace() {
  const { projectId } = useParams();
  const { project, currentStage, completedStages } = useDemoStore();

  const basePath = `/app/ro/project/${projectId ?? project.projectId}`;

  return (
    <div className="space-y-4">
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/app/ro/projects" },
          { label: project.name },
        ]}
      />

      {/* Project Identity */}
      <div className="border rounded-lg bg-white p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <StatusBadge status="active" size="xs" />
              <span className="text-[10px] text-slate-500 font-mono">{project.projectId}</span>
              <span className="text-[10px] text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">DEMO</span>
            </div>
            <h1 className="text-lg font-bold text-[#0F2340] truncate">{project.name}</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {project.state} · {project.district} · {project.tehsil}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {project.villages.join(", ")} · {project.totalParcels} parcels
            </p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-500 uppercase">Current Stage</div>
            <div className="text-sm font-bold text-blue-700">{currentStage.replace(/_/g, " ")}</div>
          </div>
        </div>
      </div>

      {/* Lifecycle Stepper */}
      <div className="border rounded-lg bg-white p-3 shadow-sm">
        <LifecycleStepper />
      </div>

      {/* Tab Navigation */}
      <div className="border-b bg-white rounded-t-lg">
        <nav className="flex overflow-x-auto -mb-px" aria-label="Project tabs">
          {PROJECT_TABS.map((tab) => {
            const to = tab.path ? `${basePath}/${tab.path}` : basePath;
            return (
              <NavLink
                key={tab.path}
                to={to}
                end={tab.end}
                className={({ isActive }) =>
                  `px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                    isActive
                      ? "border-[#0F2340] text-[#0F2340]"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`
                }
              >
                {tab.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <Outlet />
      </div>
    </div>
  );
}
