import { Users, MapPin, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MINISTRY_STAKEHOLDERS } from "@/features/ministry/ministryData";
import { formatDate } from "@/lib/format";

export function MinistryStakeholdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Stakeholders</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Key stakeholders across MoRTH acquisition projects
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {MINISTRY_STAKEHOLDERS.map((stakeholder) => (
          <Card key={stakeholder.id} className="hover:bg-slate-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F2340] text-white text-sm font-semibold shrink-0">
                  {stakeholder.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#0F2340]">{stakeholder.name}</h3>
                    <Badge variant={stakeholder.status === "active" ? "default" : "secondary"} className="text-[9px]">
                      {stakeholder.status}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{stakeholder.role}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {stakeholder.organization}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {stakeholder.jurisdiction}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                    <span>Project: {stakeholder.project}</span>
                    <span>Last active: {formatDate(stakeholder.lastActivity)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
