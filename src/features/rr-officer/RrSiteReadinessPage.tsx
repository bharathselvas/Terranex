import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE_READINESS, RESETTLEMENT_SITES } from "./rrOfficerData";
import { ArrowLeft, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const readinessLabels: Record<string, string> = {
  roadAccess: "Road Access",
  water: "Water",
  electricity: "Electricity",
  drainage: "Drainage",
  housing: "Housing",
  communityInfrastructure: "Community Infrastructure",
  healthAccess: "Health Access",
  educationAccess: "Education Access",
  livelihoodAccess: "Livelihood Access",
};

const statusIcons: Record<string, typeof CheckCircle2> = {
  ready: CheckCircle2,
  partial: Clock,
  pending: AlertTriangle,
  na: Clock,
};

const statusColors: Record<string, string> = {
  ready: "text-green-600 bg-green-50",
  partial: "text-amber-600 bg-amber-50",
  pending: "text-red-600 bg-red-50",
  na: "text-gray-400 bg-gray-50",
};

export default function RrSiteReadinessPage() {
  const site = RESETTLEMENT_SITES.find((s) => s.id === SITE_READINESS.siteId);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/sites" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Sites
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Site Readiness — {SITE_READINESS.siteId}</h1>
        <p className="text-sm text-muted-foreground mt-1">{site?.location}</p>
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Readiness Checklist</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(SITE_READINESS).filter(([key]) => key !== "siteId").map(([key, value]) => {
              const Icon = statusIcons[value];
              return (
                <div key={key} className={`p-4 rounded-lg border ${statusColors[value]}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{readinessLabels[key]}</span>
                  </div>
                  <Badge className={`text-xs ${value === "ready" ? "bg-green-100 text-green-800" : value === "partial" ? "bg-amber-100 text-amber-800" : value === "pending" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-600"}`}>{value}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
