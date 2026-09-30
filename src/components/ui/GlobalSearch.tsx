import { useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ═══════════════════════════════════════════════════════════════════════
// GlobalSearch — lightweight mock global search
// ═══════════════════════════════════════════════════════════════════════

type SearchResult = {
  type: "project" | "parcel" | "case" | "document" | "notification";
  id: string;
  label: string;
  sublabel: string;
  href: string;
};

const MOCK_SEARCH_DATA: SearchResult[] = [
  { type: "project", id: "BS-DEMO-26016-001", label: "Bengaluru–Mysuru Industrial Corridor", sublabel: "Karnataka · Bengaluru Urban", href: "/app/ro/project/BS-DEMO-26016-001" },
  { type: "parcel", id: "BS-PARCEL-001", label: "Smt. Lakshmi Devi", sublabel: "1.8 acres · Vittasandra", href: "/app/ro/project/BS-DEMO-26016-001" },
  { type: "parcel", id: "BS-PARCEL-002", label: "Shri. Ramesh Babu", sublabel: "2.4 acres · Vittasandra", href: "/app/ro/project/BS-DEMO-26016-001" },
  { type: "parcel", id: "BS-PARCEL-003", label: "Shri. Venkatesh K.", sublabel: "3.1 acres · Hulimangala", href: "/app/ro/project/BS-DEMO-26016-001" },
  { type: "parcel", id: "BS-PARCEL-004", label: "Smt. Premalatha B.", sublabel: "1.2 acres · Hulimangala", href: "/app/ro/project/BS-DEMO-26016-001" },
  { type: "parcel", id: "BS-PARCEL-005", label: "Shri. Mohan S.", sublabel: "4.5 acres · Bannerghatta", href: "/app/ro/project/BS-DEMO-26016-001" },
  { type: "case", id: "BS-OBJ-001", label: "Objection — Land area dispute", sublabel: "Shri. Venkatesh K. · Upheld", href: "/app/collector/objections" },
  { type: "case", id: "BS-OBJ-002", label: "Objection — Livelihood impact", sublabel: "Shri. Mohan S. · Rejected", href: "/app/collector/objections" },
  { type: "document", id: "DOC-004", label: "SIA Report", sublabel: "SIA Expert Group · 15 Jul 2026", href: "/app/collector/documents" },
  { type: "document", id: "DOC-009", label: "Award Order", sublabel: "District Collector · 15 Sep 2026", href: "/app/collector/documents" },
  { type: "notification", id: "DN-004", label: "Award approved", sublabel: "Awards finalized for BS-DEMO-26016-001", href: "/app/collector/notifications" },
];

const TYPE_ICONS: Record<string, string> = {
  project: "📁",
  parcel: "📍",
  case: "📋",
  document: "📄",
  notification: "🔔",
};

const TYPE_LABELS: Record<string, string> = {
  project: "Project",
  parcel: "Parcel",
  case: "Case",
  document: "Document",
  notification: "Notification",
};

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const results = query.length >= 2
    ? MOCK_SEARCH_DATA.filter(
        (item) =>
          item.id.toLowerCase().includes(query.toLowerCase()) ||
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.sublabel.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const handleSelect = useCallback(
    (href: string) => {
      setIsOpen(false);
      setQuery("");
      navigate(href);
    },
    [navigate],
  );

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search projects, parcels, cases..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          className="w-64 pl-8 pr-8 py-1.5 text-xs border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:w-80 transition-all"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setIsOpen(false); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-[320px] overflow-y-auto">
            {results.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500">
                No results for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="py-1">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result.href)}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-start gap-2.5"
                  >
                    <span className="text-sm mt-0.5">{TYPE_ICONS[result.type]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-slate-800 truncate">{result.label}</span>
                        <span className="text-[9px] text-slate-400 bg-slate-100 px-1 rounded">{TYPE_LABELS[result.type]}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">{result.sublabel}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">{result.id}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
