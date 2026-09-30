import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RR_EVIDENCE } from "./rrOfficerData";
import { ArrowLeft } from "lucide-react";

const typeColors: Record<string, string> = {
  household_photo: "bg-purple-100 text-purple-800",
  housing_evidence: "bg-blue-100 text-blue-800",
  delivery_evidence: "bg-green-100 text-green-800",
  training_certificate: "bg-indigo-100 text-indigo-800",
  employment_evidence: "bg-cyan-100 text-cyan-800",
  resettlement_site: "bg-amber-100 text-amber-800",
  consultation: "bg-gray-100 text-gray-800",
  administrative: "bg-rose-100 text-rose-800",
};

const statusColors: Record<string, string> = {
  uploaded: "bg-blue-100 text-blue-800",
  verified: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
};

export default function RrEvidencePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">R&R Evidence Centre</h1>
        <p className="text-sm text-muted-foreground mt-1">{RR_EVIDENCE.length} evidence items</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Title</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Family</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Component</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Source</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {RR_EVIDENCE.map((e) => (
                  <tr key={e.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">{e.id}</td>
                    <td className="p-2"><Badge className={`text-xs ${typeColors[e.type]}`}>{e.type.replace(/_/g, " ")}</Badge></td>
                    <td className="p-2 max-w-[200px] truncate">{e.title}</td>
                    <td className="p-2 font-mono text-xs">{e.relatedFamily}</td>
                    <td className="p-2 text-xs">{e.relatedComponent}</td>
                    <td className="p-2 text-xs">{e.date}</td>
                    <td className="p-2 text-xs">{e.source}</td>
                    <td className="p-2"><Badge className={`text-xs ${statusColors[e.status]}`}>{e.status}</Badge></td>
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
