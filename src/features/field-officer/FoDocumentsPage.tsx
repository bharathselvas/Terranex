import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DOCUMENT_RECORDS } from "./fieldOfficerData";
import { ArrowLeft, FileText, Upload } from "lucide-react";

const _docTypeColors: Record<string, string> = {
  land_record: "bg-blue-100 text-blue-800", ownership_proof: "bg-emerald-100 text-emerald-800",
  identity: "bg-purple-100 text-purple-800", mutation_record: "bg-amber-100 text-amber-800",
  tax_record: "bg-orange-100 text-orange-800", other: "bg-gray-100 text-gray-700",
};

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700", captured: "bg-blue-100 text-blue-800",
  pending_sync: "bg-amber-100 text-amber-800", synced: "bg-emerald-100 text-emerald-800",
  submitted: "bg-emerald-100 text-emerald-800",
};

export default function FoDocumentsPage() {
  const { taskId } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Documents</h1>
          <p className="text-sm text-muted-foreground">{DOCUMENT_RECORDS.length} documents collected</p>
        </div>
      </div>

      <button className="w-full rounded-lg border-2 border-dashed border-[#0F2340] bg-[#0F2340]/5 px-4 py-4 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/10">
        <Upload className="mr-2 inline h-4 w-4" />Upload / Capture Document
      </button>

      <div className="space-y-3">
        {DOCUMENT_RECORDS.map((d) => (
          <Card key={d.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 text-[#0F2340]" />
                  <div>
                    <p className="text-sm font-medium text-[#0F2340]">{d.title}</p>
                    <p className="text-xs text-muted-foreground">Parcel: {d.parcelId}</p>
                    <p className="text-xs text-muted-foreground">Type: {d.documentType.replace(/_/g, " ")}</p>
                    <p className="text-xs text-muted-foreground">By: {d.capturedBy}</p>
                    <p className="text-xs text-muted-foreground">{d.capturedAt}</p>
                    <p className="text-xs text-muted-foreground">{d.fileSize}</p>
                  </div>
                </div>
                <Badge className={statusColors[d.status]}>{d.status.replace(/_/g, " ")}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
