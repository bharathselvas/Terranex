import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { StatusBadge, type StatusVariant } from "./StatusBadge";
import { EmptyState } from "./PageStates";

// ═══════════════════════════════════════════════════════════════════════
// DataTable — standardized sortable/filterable table
// ═══════════════════════════════════════════════════════════════════════

export type Column<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
  width?: string;
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchPlaceholder,
  searchKey,
  emptyTitle,
  emptyDescription,
  onRowClick,
  statusColumn,
  filters,
  pageSize = 10,
}: {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchKey?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (row: T) => void;
  statusColumn?: string;
  filters?: React.ReactNode;
  pageSize?: number;
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let result = data;
    if (search && searchKey) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        String(row[searchKey] ?? "").toLowerCase().includes(q),
      );
    }
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (typeof av === "number" && typeof bv === "number") {
          return sortDir === "asc" ? av - bv : bv - av;
        }
        return sortDir === "asc"
          ? String(av).localeCompare(String(bv))
          : String(bv).localeCompare(String(av));
      });
    }
    return result;
  }, [data, search, searchKey, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="space-y-3">
      {/* Search + Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {searchKey && (
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder={searchPlaceholder ?? "Search..."}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        )}
        {filters}
        <span className="text-[10px] text-slate-400 ml-auto">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      {paged.length === 0 ? (
        <EmptyState title={emptyTitle ?? "No data"} description={emptyDescription ?? "No records found."} />
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`text-left p-2.5 font-medium text-slate-600 ${col.sortable ? "cursor-pointer hover:bg-slate-100 select-none" : ""} ${col.className ?? ""}`}
                    style={col.width ? { width: col.width } : undefined}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && sortKey === col.key && (
                        sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                      {col.sortable && sortKey !== col.key && (
                        <ChevronsUpDown className="h-3 w-3 text-slate-300" />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b last:border-0 ${onRowClick ? "cursor-pointer hover:bg-blue-50/50" : ""}`}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`p-2.5 ${col.className ?? ""}`}>
                      {col.render
                        ? col.render(row)
                        : statusColumn === col.key
                          ? <StatusBadge status={String(row[col.key]) as StatusVariant} />
                          : String(row[col.key] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span>Page {page + 1} of {totalPages}</span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-2 py-1 rounded border disabled:opacity-30 hover:bg-slate-50"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="px-2 py-1 rounded border disabled:opacity-30 hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
