import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";

// ═══════════════════════════════════════════════════════════════════════
// PageHeader — standardized page header with title, description, actions
// ═══════════════════════════════════════════════════════════════════════

export function PageHeader({
  breadcrumbs,
  title,
  description,
  badge,
  actions,
  children,
}: {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  description?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#0F2340]">{title}</h1>
            {badge}
          </div>
          {description && (
            <p className="text-sm text-slate-500 mt-0.5">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
