import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_WORK_QUEUE } from "./financeData";

const priorityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

export default function FinWorkQueuePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Work Queue</h1>
        <p className="text-sm text-muted-foreground mt-1">{PAYMENT_WORK_QUEUE.length} active work items</p>
      </div>

      <div className="space-y-4">
        {PAYMENT_WORK_QUEUE.map((w) => (
          <Card key={w.id} className="hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-muted-foreground">{w.id}</span>
                    <Badge className={`text-xs ${priorityColors[w.priority]}`}>{w.priority}</Badge>
                    <Badge className="text-xs bg-gray-100 text-gray-800">{w.category.replace(/_/g, " ")}</Badge>
                  </div>
                  <h3 className="font-medium text-[#0F2340]">{w.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{w.description}</p>
                </div>
                <div className="text-right ml-4 flex-shrink-0">
                  <p className="text-xs text-muted-foreground">Due</p>
                  <p className="text-sm font-medium">{w.dueDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
