import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_DOCUMENTS } from "./financeData";

export default function FinDocumentsPage() {
  const available = PAYMENT_DOCUMENTS.filter((d) => d.status === "available").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]">Payment Documents</h1>
        <p className="text-sm text-muted-foreground mt-1">{available} of {PAYMENT_DOCUMENTS.length} documents available</p>
      </div>

      <Card className="mb-4 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <p className="text-sm text-amber-800 font-medium">Documents are read-only. Upload by authorized uploaders only.</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Doc ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Award</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Payment</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Uploaded By</th>
                </tr>
              </thead>
              <tbody>
                {PAYMENT_DOCUMENTS.map((d) => (
                  <tr key={d.docId} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{d.docId}</td>
                    <td className="p-2 text-xs font-medium">{d.type}</td>
                    <td className="p-2 text-xs">{d.category.replace(/_/g, " ")}</td>
                    <td className="p-2 font-mono text-xs">{d.relatedAward || "—"}</td>
                    <td className="p-2 font-mono text-xs">{d.relatedPayment || "—"}</td>
                    <td className="p-2"><Badge className={`text-xs ${d.status === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{d.status}</Badge></td>
                    <td className="p-2 text-xs">{d.date}</td>
                    <td className="p-2 text-xs">{d.uploadedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
