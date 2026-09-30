import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, CheckCircle2, Circle, Loader2, MapPin, Shield } from "lucide-react";

const RR_COMPONENTS = [
  { label: "Housing", status: "delivered" as const },
  { label: "Subsistence Support", status: "delivered" as const },
  { label: "Transportation", status: "in_progress" as const },
  { label: "Livelihood Support", status: "in_progress" as const },
  { label: "Skill Development", status: "planned" as const },
];

const POSSESSION_ITEMS = [
  { label: "Compensation", status: "completed" as const },
  { label: "Discrepancies", status: "completed" as const, note: "None" },
  { label: "Possession", status: "pending" as const },
];

function StatusIcon({ status }: { status: "completed" | "in_progress" | "planned" | "pending" }) {
  if (status === "completed") return <CheckCircle2 className="h-5 w-5 text-[#0F7A5A]" />;
  if (status === "in_progress") return <Loader2 className="h-5 w-5 text-amber-500 animate-spin" />;
  return <Circle className="h-5 w-5 text-slate-300" />;
}

export default function CitizenRnRPage() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-[#0F2340] p-2 rounded-lg">
          <Home className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Rehabilitation & Resettlement</h1>
          <p className="text-sm text-muted-foreground">Your R&R entitlements and status</p>
        </div>
      </div>

      <Card className="border-[#0F7A5A] bg-[#0F7A5A]/5">
        <CardContent className="pt-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">R&R Status</p>
            <p className="text-lg font-bold text-[#0F2340]">In Progress</p>
          </div>
          <Badge variant="warning">In Progress</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#0F2340]">R&R Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {RR_COMPONENTS.map((comp) => (
              <div key={comp.label} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <StatusIcon status={comp.status === "delivered" ? "completed" : comp.status} />
                  <span className="text-sm font-medium">{comp.label}</span>
                </div>
                <Badge variant={comp.status === "delivered" ? "success" : comp.status === "in_progress" ? "warning" : "muted"}>
                  {comp.status === "delivered" ? "Delivered" : comp.status === "in_progress" ? "In Progress" : "Planned"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#0F2340]">
            <MapPin className="h-4 w-4" /> Resettlement Site
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Site Reference</p>
              <p className="text-lg font-bold text-[#0F2340]">RS-JLN-04</p>
            </div>
            <Badge variant="success">Allocated</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#0F2340]">
            <Shield className="h-4 w-4" /> Possession
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {POSSESSION_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <StatusIcon status={item.status} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.note && <span className="text-xs text-muted-foreground">— {item.note}</span>}
                </div>
                <Badge variant={item.status === "completed" ? "success" : "muted"}>
                  {item.status === "completed" ? "Completed" : "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
