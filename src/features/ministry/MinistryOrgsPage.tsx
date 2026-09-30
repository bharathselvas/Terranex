import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MINISTRY_ORGS } from "@/features/ministry/ministryData";

const TYPE_LABELS: Record<string, string> = {
  requiring_org: "Requiring Organisation",
  implementing_agency: "Implementing Agency",
  state_dept: "State Department",
  district_auth: "District Authority",
};

const TYPE_COLORS: Record<string, string> = {
  requiring_org: "bg-blue-100 text-blue-800",
  implementing_agency: "bg-violet-100 text-violet-800",
  state_dept: "bg-emerald-100 text-emerald-800",
  district_auth: "bg-amber-100 text-amber-800",
};

export function MinistryOrgsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Organisations & Agencies</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Requiring organisations, implementing agencies, and state departments involved in MoRTH acquisitions
          </p>
        </div>
        <Badge variant="secondary" className="text-[11px]">
          {MINISTRY_ORGS.length} organisations
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {MINISTRY_ORGS.map((org) => (
          <Card key={org.id} className="hover:bg-slate-50 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2340]">{org.name}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{TYPE_LABELS[org.type]}</p>
                </div>
                <Badge className={`text-[10px] ${TYPE_COLORS[org.type]}`}>{org.type.replace(/_/g, " ")}</Badge>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projects</span>
                  <span className="font-medium text-slate-700">{org.projects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Users</span>
                  <span className="font-medium text-slate-700">{org.activeUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={org.status === "active" ? "default" : "secondary"} className="text-[10px]">
                    {org.status}
                  </Badge>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t">
                <p className="text-[10px] text-muted-foreground mb-1">States</p>
                <div className="flex flex-wrap gap-1">
                  {org.states.map((state) => (
                    <Badge key={state} variant="outline" className="text-[9px]">{state}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
