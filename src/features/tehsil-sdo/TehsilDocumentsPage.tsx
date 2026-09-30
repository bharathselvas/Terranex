import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TEHSIL_PROJECTS } from "./tehsilSdoData";

const stageColor = (s: string) => {
  const m: Record<string, string> = {
    field_verification: "bg-blue-100 text-blue-800", compensation_input: "bg-purple-100 text-purple-800",
    possession_prep: "bg-amber-100 text-amber-800", land_record_check: "bg-emerald-100 text-emerald-800",
  };
  return m[s] ?? "bg-gray-100 text-gray-700";
};

export default function TehsilDocumentsPage() {
  const projectDocs = TEHSIL_PROJECTS.map((p) => ({
    ...p, docCount: Math.floor(Math.random() * 15) + 5,
    docs: ["Land Record Extract", "Ownership Declaration", "Field Verification Report", "Compensation Sheet", "R&R Schedule", "Possession Checklist"],
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Tehsil Documents</h1>
        <p className="text-sm text-muted-foreground">Project documents managed at tehsil level</p>
      </div>

      <div className="space-y-4">
        {projectDocs.map((p) => (
          <Card key={p.id} className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-[#0F2340]">{p.projectName}</CardTitle>
                <Badge className={stageColor(p.currentStage)}>{p.currentStage}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-xs text-muted-foreground">{p.id}</div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                {p.docs.map((doc) => (
                  <div key={doc} className="rounded border p-2">
                    <p className="text-xs font-medium text-[#0F2340]">{doc}</p>
                    <p className="text-[10px] text-muted-foreground">09/08/2026</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
