import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REVERIFICATION_REQUESTS } from "./fieldOfficerData";
import { ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";

export default function FoReverificationPage() {
  const { taskId } = useParams();
  const rv = REVERIFICATION_REQUESTS[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/task/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Reverification Request</h1>
          <p className="text-sm text-muted-foreground">{rv.parcelId}</p>
        </div>
      </div>

      <Card className="border-amber-300 bg-amber-50/50 shadow-sm">
        <CardContent className="p-5">
          <Badge className="bg-amber-500 text-white mb-2">REVERIFICATION REQUEST</Badge>
          <div className="space-y-2">
            <div><p className="text-[10px] text-muted-foreground">Parcel</p><p className="text-sm font-medium">{rv.parcelId}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Requested By</p><p className="text-sm font-medium">{rv.requestedBy} ({rv.requestedByRole})</p></div>
            <div><p className="text-[10px] text-muted-foreground">Reason</p><p className="text-sm">{rv.reason}</p></div>
            <div><p className="text-[10px] text-muted-foreground">Due Date</p><p className="text-sm font-medium text-red-700">{rv.dueDate}</p></div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <p className="mb-2 text-xs font-semibold text-[#0F2340]">REQUIRED ITEMS</p>
          <div className="space-y-2">
            {rv.requiredItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 rounded border p-2">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                <span className="text-xs">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <button className="w-full rounded-lg bg-[#0F2340] px-4 py-3 text-sm font-medium text-white hover:bg-[#1a3560]">
        <RefreshCw className="mr-2 inline h-4 w-4" />Start Reverification
      </button>
    </div>
  );
}
