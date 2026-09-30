import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

// ═══════════════════════════════════════════════════════════════════════
// Breadcrumbs — consistent breadcrumb navigation
// ═══════════════════════════════════════════════════════════════════════

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
      <Link to="/app/overview" className="flex items-center gap-0.5 hover:text-slate-700 transition-colors">
        <Home className="h-3 w-3" />
      </Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 text-slate-300" />
          {item.href ? (
            <Link to={item.href} className="hover:text-slate-700 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
