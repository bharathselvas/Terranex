import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DECLARATIONS, type DeclarationEntry } from "./districtCollectorData";

const statusLabels: Record<string, string> = {
  blocked: "Blocked", ready: "Ready", draft: "Draft", finalized: "Finalized", published: "Published",
};

const statusColors: Record<string, string> = {
  blocked: "bg-red-100 text-red-800", ready: "bg-emerald-100 text-emerald-800", draft: "bg-gray-100 text-gray-700",
  finalized: "bg-blue-100 text-blue-800", published: "bg-emerald-100 text-emerald-800",
};

const prereqList = [
  { key: "prereqScrutiny", label: "Scrutiny Complete" },
  { key: "prereqSia", label: "SIA Complete" },
  { key: "prereqSection11", label: "Section 11 Published" },
  { key: "prereqDisclosure", label: "Disclosure Complete" },
  { key: "prereqObjectionWindow", label: "Objection Window Closed" },
  { key: "prereqObjectionsResolved", label: "All Objections Resolved" },
];

export default function CollectorDeclarationManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Declaration Management</h1>
        <p className="text-sm text-muted-foreground">Section 19 Declarations — prerequisite checks and publication</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {DECLARATIONS.map((d) => {
          const allMet = prereqList.every((p) => (d as DeclarationEntry)[p.key as keyof DeclarationEntry]);
          return (
            <Card key={d.projectId} className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm font-semibold text-[#0F2340]">
                  <span>{d.projectName}</span>
                  <Badge className={statusColors[d.status]}>{statusLabels[d.status]}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div><p className="text-xs text-muted-foreground">Parcel Count</p><p className="text-sm font-medium">{d.parcelCount}</p></div>
                    <div><p className="text-xs text-muted-foreground">Unresolved Objections</p><p className={`text-sm font-medium ${d.unresolvedObjections > 0 ? "text-red-700" : "text-emerald-700"}`}>{d.unresolvedObjections}</p></div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold text-[#0F2340]">Prerequisite Checklist</p>
                    <div className="space-y-1">
                      {prereqList.map((p) => {
                        const met = (d as DeclarationEntry)[p.key as keyof DeclarationEntry];
                        return (
                          <div key={p.key} className={`flex items-center justify-between rounded border p-2 ${met ? "border-emerald-300 bg-emerald-50/50" : "border-red-300 bg-red-50/50"}`}>
                            <span className="text-xs">{p.label}</span>
                            <div className={`h-2 w-2 rounded-full ${met ? "bg-emerald-500" : "bg-red-500"}`} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {allMet && d.status === "ready" && (
                      <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Finalize Declaration</button>
                    )}
                    {d.status === "blocked" && (
                      <p className="text-xs text-red-700">Cannot proceed — prerequisites not met</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
