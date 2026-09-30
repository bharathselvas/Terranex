import { Card, CardContent } from "@/components/ui/card";
import { TEHSIL_AUDIT } from "./tehsilSdoData";

export default function TehsilAuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Audit Trail</h1>
        <p className="text-sm text-muted-foreground">All activities in Haveli Tehsil</p>
      </div>

      <div className="relative ml-4 border-l-2 border-[#0F2340]/20 space-y-6">
        {TEHSIL_AUDIT.map((entry) => (
          <div key={entry.id} className="relative">
            <div className="absolute -left-[21px] h-4 w-4 rounded-full border-2 border-[#0F2340] bg-white" />
            <Card className="ml-4 shadow-sm">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">{entry.action}</p>
                    <p className="text-xs text-muted-foreground">{entry.actor} · {entry.role}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{entry.details}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">{entry.village}</p>
                    <p className="text-[10px] text-muted-foreground">{entry.project}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[10px]">
                  <span className="text-muted-foreground">{entry.previousState}</span>
                  <span className="text-[#0F2340]">→</span>
                  <span className="font-medium text-[#0F2340]">{entry.newState}</span>
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">{entry.timestamp}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
