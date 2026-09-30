import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, IndianRupee } from "lucide-react";
import { COMPENSATION_BREAKDOWN } from "./citizenData";

export default function CitizenCompensationPage() {
  const total = COMPENSATION_BREAKDOWN.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-[#0F2340] p-2 rounded-lg">
          <Award className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Compensation</h1>
          <p className="text-sm text-muted-foreground">Award details and compensation breakdown</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#0F2340]">Award Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Award Reference</span>
              <span className="text-sm font-medium">AWD-2026-0182</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Award Date</span>
              <span className="text-sm font-medium">15 Aug 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Compensation Status</span>
              <Badge variant="success">Approved</Badge>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm font-semibold text-[#0F2340]">Award Amount</span>
              <div className="flex items-center gap-1 text-lg font-bold text-[#0F7A5A]">
                <IndianRupee className="h-4 w-4" />
                <span>4,82,500</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#0F2340]">Compensation Breakdown</CardTitle>
            <Badge variant="info" className="w-fit">Mock / Sandbox Value</Badge>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0F2340] text-white">
                    <th className="text-left px-4 py-2 font-medium">Component</th>
                    <th className="text-right px-4 py-2 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPENSATION_BREAKDOWN.map((item, idx) => (
                    <tr key={idx} className="border-t last:border-b">
                      <td className="px-4 py-2 text-muted-foreground">{item.component}</td>
                      <td className="px-4 py-2 text-right font-medium">₹{item.amount.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-semibold border-t-2">
                    <td className="px-4 py-2 text-[#0F2340]">Total</td>
                    <td className="px-4 py-2 text-right text-[#0F7A5A]">₹{total.toLocaleString("en-IN")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
