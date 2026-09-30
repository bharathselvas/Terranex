import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PARCELS } from "./tehsilSdoData";

const stageShort = (s: string) => {
  const m: Record<string, string> = {
    project_proposal: "Proposal", land_requirement: "Land Req", gis_identification: "GIS ID", submission: "Submission",
    scrutiny: "Scrutiny", sia: "SIA", preliminary_notification: "Prelim Ntf", public_disclosure: "Disclosure",
    objections_hearing: "Objections", declaration: "Declaration", field_verification: "FV",
    compensation: "Compensation", award: "Award", payment: "Payment", possession: "Possession", r_and_r: "R&R", closed: "Closed",
  };
  return m[s] ?? s;
};

const riskColor = (r: string) => {
  const m: Record<string, string> = { critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };
  return m[r] ?? "bg-gray-100 text-gray-700";
};

export default function TehsilParcelRegisterPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = PARCELS.filter((p) => {
    if (search && !p.ulpin.toLowerCase().includes(search.toLowerCase()) && !p.village.toLowerCase().includes(search.toLowerCase()) && !p.ownerName.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "discrepancy" && p.ownerStatus !== "discrepancy") return false;
    if (filter === "pending" && p.fieldVerification !== "accepted") return false;
    if (filter === "gps_verified" && !p.gpsVerified) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Tehsil Parcel Register</h1>
        <p className="text-sm text-muted-foreground">ULPIN-based parcel tracking with verification and ownership status</p>
      </div>

      <div className="flex gap-2">
        <Input placeholder="Search by ULPIN, village, owner..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        <div className="flex gap-1">
          {["all", "discrepancy", "pending", "gps_verified"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filter === f ? "bg-[#0F2340] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              {f === "all" ? "All" : f === "discrepancy" ? "Discrepancy" : f === "pending" ? "Pending" : "GPS Verified"}
            </button>
          ))}
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="space-y-2">
            {filtered.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{p.ulpin}</p>
                    <Badge className={riskColor(p.risk)}>{p.risk}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.village} &middot; {p.ownerName} &middot; {p.areaHa} ha</p>
                  <p className="text-[10px] text-muted-foreground">{p.projectName} &middot; Stage: {stageShort(p.currentStage)}</p>
                </div>
                <div className="ml-4 flex flex-col items-end gap-1">
                  <Badge className={`text-[10px] ${p.ownerStatus === "verified" ? "bg-emerald-100 text-emerald-800" : p.ownerStatus === "discrepancy" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"}`}>Owner: {p.ownerStatus}</Badge>
                  <Badge className={`text-[10px] ${p.gpsVerified ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}`}>{p.gpsVerified ? "GPS ✓" : "No GPS"}</Badge>
                  <Badge className={`text-[10px] ${p.fieldVerification === "accepted" ? "bg-emerald-100 text-emerald-800" : p.fieldVerification === "discrepancy" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"}`}>{p.fieldVerification}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
