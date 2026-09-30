import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

const resultOptions = [
  { value: "owner_present", label: "Owner Present", color: "bg-emerald-100 text-emerald-800" },
  { value: "owner_not_present", label: "Owner Not Present", color: "bg-amber-100 text-amber-800" },
  { value: "representative_present", label: "Representative Present", color: "bg-blue-100 text-blue-800" },
  { value: "unable_to_contact", label: "Unable to Contact", color: "bg-orange-100 text-orange-800" },
  { value: "refused_interaction", label: "Refused Interaction", color: "bg-red-100 text-red-800" },
];

export default function FoInteractionPage() {
  const { taskId } = useParams();
  const [result, setResult] = useState("owner_present");
  const [remarks, setRemarks] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Landowner Interaction</h1>
          <p className="text-sm text-muted-foreground">Record visit outcome</p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-[10px] text-muted-foreground">Parcel</p><p className="text-sm font-medium">MH-PN-004821</p></div>
            <div><p className="text-[10px] text-muted-foreground">Landowner</p><p className="text-sm font-medium">Rajesh Kumar Patil</p></div>
            <div><p className="text-[10px] text-muted-foreground">Visit Date</p><p className="text-sm font-medium">08 Sep 2026, 14:40</p></div>
            <div><p className="text-[10px] text-muted-foreground">Officer</p><p className="text-sm font-medium">Shri. M. Kamble</p></div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <p className="mb-3 text-xs font-semibold text-[#0F2340]">VISIT OUTCOME</p>
          <div className="space-y-2">
            {resultOptions.map((opt) => (
              <button key={opt.value} onClick={() => setResult(opt.value)} className={`w-full rounded-lg border p-3 text-left transition-colors ${result === opt.value ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"}`}>
                <div className="flex items-center gap-2">
                  {result === opt.value ? <CheckCircle2 className="h-4 w-4 text-[#0F2340]" /> : <XCircle className="h-4 w-4 text-gray-300" />}
                  <span className="text-sm font-medium">{opt.label}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <p className="mb-2 text-xs font-semibold text-[#0F2340]">REMARKS</p>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Record interaction details..." className="w-full rounded-lg border px-3 py-2 text-sm" rows={3} />
        </CardContent>
      </Card>

      <button className="w-full rounded-lg bg-[#0F2340] px-4 py-3 text-sm font-medium text-white hover:bg-[#1a3560]">Record Visit</button>
    </div>
  );
}
