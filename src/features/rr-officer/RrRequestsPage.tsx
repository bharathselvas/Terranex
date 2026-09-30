import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COORDINATION_REQUESTS } from "./rrOfficerData";
import { ArrowLeft } from "lucide-react";

const priorityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

const statusColors: Record<string, string> = {
  open: "bg-blue-100 text-blue-800",
  in_progress: "bg-amber-100 text-amber-800",
  responded: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-600",
};

export default function RrRequestsPage() {
  const openCount = COORDINATION_REQUESTS.filter((r) => r.status !== "closed" && r.status !== "responded").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Requests & Clarifications</h1>
        <p className="text-sm text-muted-foreground mt-1">{openCount} open / {COORDINATION_REQUESTS.length} total</p>
      </div>

      <div className="space-y-4">
        {COORDINATION_REQUESTS.map((r) => (
          <Card key={r.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
                    <Badge className={`text-xs ${priorityColors[r.priority]}`}>{r.priority}</Badge>
                    <Badge className={`text-xs ${statusColors[r.status]}`}>{r.status.replace(/_/g, " ")}</Badge>
                  </div>
                  <h3 className="font-semibold text-[#0F2340] mt-2">{r.subject}</h3>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{r.description}</p>

              <div className="grid md:grid-cols-4 gap-4 text-sm mb-3">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">From</p>
                  <p className="font-medium">{r.from}</p>
                  <p className="text-xs text-muted-foreground">{r.fromRole}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">To</p>
                  <p className="font-medium">{r.to}</p>
                  <p className="text-xs text-muted-foreground">{r.toRole}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">{r.date}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-muted-foreground">Related Case</p>
                  <p className="font-mono text-xs">{r.relatedCase || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
