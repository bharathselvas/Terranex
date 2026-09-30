import { Card, CardContent } from "@/components/ui/card";
import { FO_AUDIT_ENTRIES } from "./fieldOfficerData";

export default function FoAuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Audit History</h1>
        <p className="text-sm text-muted-foreground">Field activity timeline</p>
      </div>

      <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
        <CardContent className="p-3">
          <p className="text-xs text-amber-800">Evidence records become immutable after submission.</p>
        </CardContent>
      </Card>

      <div className="relative ml-4 border-l-2 border-[#0F2340]/20 space-y-4">
        {FO_AUDIT_ENTRIES.map((entry) => (
          <div key={entry.id} className="relative">
            <div className="absolute -left-[21px] h-3.5 w-3.5 rounded-full border-2 border-[#0F2340] bg-white" />
            <Card className="ml-4 shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">{entry.action}</p>
                    {entry.evidence && <p className="text-xs text-muted-foreground">{entry.evidence}</p>}
                    <p className="text-[10px] text-muted-foreground">Parcel: {entry.parcelId}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{entry.timestamp.split("T")[1]}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
