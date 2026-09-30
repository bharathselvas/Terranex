import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

export default function FoRoleBoundaryPage() {
  const canDo = [
    "Collect evidence",
    "Verify field information",
    "Submit reports",
    "Capture GPS/photos",
    "Record observations",
    "Enumerate assets",
    "Record landowner interactions",
    "Collect R&R field data",
  ];
  const cannotDo = [
    "Approve awards",
    "Decide objections",
    "Issue notifications",
    "Modify official land records",
    "Finalize compensation",
    "Approve payments",
    "Authorize statutory possession",
    "Resolve ownership disputes",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Your Role</h1>
        <p className="text-sm text-muted-foreground">Field Officer / VAO — Level 7</p>
      </div>

      <Card className="border-[#0F2340] bg-[#0F2340]/5 shadow-sm">
        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0F2340]">YOUR ROLE</p>
          <p className="text-lg font-bold text-[#0F2340]">Field Officer / VAO</p>
          <p className="text-xs text-muted-foreground">Scope: Village · Haveli Tehsil, Pune</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="border-emerald-300 bg-emerald-50/50 shadow-sm">
          <CardContent className="p-4">
            <p className="mb-3 text-xs font-semibold text-emerald-800">YOU CAN</p>
            <div className="space-y-2">
              {canDo.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-300 bg-red-50/50 shadow-sm">
          <CardContent className="p-4">
            <p className="mb-3 text-xs font-semibold text-red-800">YOU CANNOT</p>
            <div className="space-y-2">
              {cannotDo.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <XCircle className="h-3.5 w-3.5 text-red-600" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
