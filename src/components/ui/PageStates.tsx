import { FileX, AlertTriangle, Lock, Search, Inbox } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// EmptyState / RestrictedState / ErrorState — consistent page states
// ═══════════════════════════════════════════════════════════════════════

type StateProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ title, description, icon, action, className = "" }: StateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        {icon ?? <Inbox className="h-6 w-6 text-slate-400" />}
      </div>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
}

export function RestrictedState({ title, description }: { title?: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <Lock className="h-6 w-6 text-red-400" />
      </div>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">{title ?? "Access Restricted"}</h3>
      <p className="text-xs text-slate-500 max-w-sm">
        {description ?? "This action is not available for your current role. Contact your administrator if you need access."}
      </p>
    </div>
  );
}

export function ErrorState({ title, description }: { title?: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <AlertTriangle className="h-6 w-6 text-red-400" />
      </div>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">{title ?? "Something went wrong"}</h3>
      <p className="text-xs text-slate-500 max-w-sm">
        {description ?? "Unable to load this page. Please try again later."}
      </p>
    </div>
  );
}

export function NoResultsState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <Search className="h-6 w-6 text-slate-400" />
      </div>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">No results found</h3>
      <p className="text-xs text-slate-500 max-w-sm">
        No results match &ldquo;{query}&rdquo;. Try a different search term.
      </p>
    </div>
  );
}
