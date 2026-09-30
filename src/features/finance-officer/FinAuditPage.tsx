import { Card, CardContent } from "@/components/ui/card";
import { FINANCE_AUDIT_TRAIL } from "./financeData";

export default function FinAuditPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Audit Trail</h1>
        <p className="text-sm text-muted-foreground mt-1">{FINANCE_AUDIT_TRAIL.length} recorded events</p>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="relative ml-4">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200" />
            <div className="space-y-3">
              {FINANCE_AUDIT_TRAIL.map((a) => (
                <div key={a.id} className="relative pl-6">
                  <div className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white" />
                  <div className="p-3 rounded-lg border bg-gray-50">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{a.action}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{a.details}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-xs text-muted-foreground">{a.timestamp}</p>
                      <p className="text-xs text-muted-foreground">Actor: {a.actor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
