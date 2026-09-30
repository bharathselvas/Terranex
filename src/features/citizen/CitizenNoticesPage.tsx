import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CITIZEN_NOTICES } from "./citizenData";
import { Filter, FileText } from "lucide-react";

type FilterType = "all" | "section_11_preliminary" | "disclosure" | "hearing" | "section_19_declaration";

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "section_11_preliminary", label: "Section 11" },
  { value: "disclosure", label: "Disclosure" },
  { value: "hearing", label: "Hearing" },
  { value: "section_19_declaration", label: "Declaration" },
];

const NOTICE_TYPE_BADGE: Record<string, "default" | "info" | "success" | "warning" | "destructive"> = {
  section_11_preliminary: "info",
  disclosure: "success",
  hearing: "warning",
  section_19_declaration: "default",
  other: "default",
};

export default function CitizenNoticesPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = filter === "all" ? CITIZEN_NOTICES : CITIZEN_NOTICES.filter((n) => n.type === filter);

  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-lg font-semibold text-[#0F2340] flex items-center gap-2">
          <FileText className="h-5 w-5" /> Published Notices
        </h1>
        <div className="flex items-center gap-1.5">
          <Filter className="h-4 w-4 text-slate-400" />
          {FILTERS.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.value)}
              className="text-xs"
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="text-sm text-slate-500">
        {filtered.length} notice{filtered.length !== 1 ? "s" : ""}
      </div>

      <div className="grid gap-3">
        {filtered.map((n) => (
          <Link key={n.noticeId} to={`/citizen/notices/${n.noticeId}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={NOTICE_TYPE_BADGE[n.type] ?? "default"} className="text-[9px]">
                        {n.type.replace(/_/g, " ")}
                      </Badge>
                      <h3 className="text-sm font-medium text-[#0F2340]">{n.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500">{n.referenceNo}</p>
                    <p className="text-xs text-slate-400">
                      {n.project} — {n.village}, {n.district}
                    </p>
                    <p className="text-xs text-slate-400">Authority: {n.authority}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs text-slate-500 shrink-0">
                    <span>Published: {n.publicationDate}</span>
                    {n.objectionDeadline && (
                      <span className="text-amber-600 font-medium">Deadline: {n.objectionDeadline}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
