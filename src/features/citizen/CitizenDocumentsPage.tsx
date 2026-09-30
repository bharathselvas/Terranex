import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download } from "lucide-react";
import { CITIZEN_DOCUMENTS } from "./citizenData";
import type { CitizenDocument } from "./citizenData";

const CATEGORY_LABELS: Record<CitizenDocument["category"], string> = {
  notice: "Notice",
  sia: "SIA",
  field_verification: "Field Verification",
  award: "Award",
  compensation: "Compensation",
  payment: "Payment",
  possession: "Possession",
  rr: "R&R",
  grievance: "Grievance",
};

const CATEGORY_ORDER: CitizenDocument["category"][] = [
  "notice",
  "sia",
  "field_verification",
  "award",
  "compensation",
  "payment",
  "rr",
];

export default function CitizenDocumentsPage() {
  const [filter, setFilter] = useState<string>("all");

  const categories = filter === "all"
    ? CATEGORY_ORDER
    : CATEGORY_ORDER.filter((c) => c === filter);

  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-[#0F2340] p-2 rounded-lg">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">My Documents</h1>
          <p className="text-sm text-muted-foreground">All documents related to your case</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>All</Button>
        {CATEGORY_ORDER.map((cat) => (
          <Button key={cat} size="sm" variant={filter === cat ? "default" : "outline"} onClick={() => setFilter(cat)}>
            {CATEGORY_LABELS[cat]}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {categories.map((category) => {
          const docs = CITIZEN_DOCUMENTS.filter((d) => d.category === category);
          if (docs.length === 0) return null;
          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-[#0F2340]">{CATEGORY_LABELS[category]}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {docs.map((doc) => (
                    <div key={doc.docId} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.reference}</p>
                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={doc.status === "available" ? "success" : doc.status === "pending" ? "warning" : "destructive"}>
                          {doc.status}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                          <span className="ml-1">Mock</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
