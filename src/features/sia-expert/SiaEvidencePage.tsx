import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EVIDENCE_ITEMS } from "./siaExpertData";
import { ArrowLeft, FileText, Camera, Map, ClipboardList } from "lucide-react";

const typeIcons: Record<string, typeof FileText> = {
  document: FileText,
  photograph: Camera,
  consultation_minutes: ClipboardList,
  attendance: ClipboardList,
  map: Map,
  field_note: FileText,
  survey_data: FileText,
  other: FileText,
};

const typeColors: Record<string, string> = {
  document: "bg-blue-100 text-blue-800",
  photograph: "bg-purple-100 text-purple-800",
  consultation_minutes: "bg-amber-100 text-amber-800",
  attendance: "bg-green-100 text-green-800",
  map: "bg-cyan-100 text-cyan-800",
  field_note: "bg-gray-100 text-gray-800",
  survey_data: "bg-indigo-100 text-indigo-800",
  other: "bg-gray-100 text-gray-800",
};

const statusColors: Record<string, string> = {
  uploaded: "bg-blue-100 text-blue-800",
  verified: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
};

export default function SiaEvidencePage() {
  const categories = [...new Set(EVIDENCE_ITEMS.map((e) => e.type))];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Evidence Centre</h1>
        <p className="text-sm text-muted-foreground mt-1">{EVIDENCE_ITEMS.length} evidence items across {categories.length} categories</p>
      </div>

      {/* Category Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {categories.map((cat) => {
          const count = EVIDENCE_ITEMS.filter((e) => e.type === cat).length;
          const Icon = typeIcons[cat];
          return (
            <Card key={cat} className="border-l-4 border-l-blue-600">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-medium capitalize">{cat.replace("_", " ")}</span>
                </div>
                <p className="text-lg font-bold text-[#0F2340] mt-1">{count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Evidence Table */}
      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Title</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">SIA Section</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Related To</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Uploaded By</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {EVIDENCE_ITEMS.map((e) => {
                  return (
                    <tr key={e.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-mono text-xs">{e.id}</td>
                      <td className="p-2">
                        <Badge className={`text-xs ${typeColors[e.type]}`}>{e.type.replace("_", " ")}</Badge>
                      </td>
                      <td className="p-2 max-w-[200px] truncate">{e.title}</td>
                      <td className="p-2 text-xs">{e.siaSection}</td>
                      <td className="p-2 text-xs font-mono">{e.relatedTo}</td>
                      <td className="p-2 text-xs">{e.capturedDate}</td>
                      <td className="p-2 text-xs">{e.uploadedBy}</td>
                      <td className="p-2">
                        <Badge className={`text-xs ${statusColors[e.status]}`}>{e.status}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
