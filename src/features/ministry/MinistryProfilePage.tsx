import { Building2, Mail, MapPin, FolderOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MINISTRY_PROFILE } from "@/features/ministry/ministryData";

export function MinistryProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Ministry Profile</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ministry details and configuration
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#0F2340] text-white text-xl font-bold shrink-0">
              {MINISTRY_PROFILE.code}
            </span>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[#0F2340]">{MINISTRY_PROFILE.name}</h2>
              <Badge variant="secondary" className="text-[11px] mt-1">Ministry Nodal Officer: {MINISTRY_PROFILE.nodalOfficer}</Badge>

              <div className="grid gap-4 mt-6 md:grid-cols-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </span>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Contact</p>
                    <p className="text-sm font-medium text-[#0F2340]">{MINISTRY_PROFILE.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    <FolderOpen className="h-5 w-5 text-slate-500" />
                  </span>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Active Projects</p>
                    <p className="text-sm font-medium text-[#0F2340]">{MINISTRY_PROFILE.activeProjects}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    <MapPin className="h-5 w-5 text-slate-500" />
                  </span>
                  <div>
                    <p className="text-[10px] text-muted-foreground">States Covered</p>
                    <p className="text-sm font-medium text-[#0F2340]">{MINISTRY_PROFILE.statesCovered}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role capabilities */}
      <Card>
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Ministry Nodal Officer Capabilities</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-[11px] font-medium text-emerald-700 mb-2">CAN</p>
              <ul className="space-y-1 text-[11px] text-slate-600">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Monitor all MoRTH acquisition projects across states</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> View pipeline and progress dashboards</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Track compensation, possession, and R&R status</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Send clarification requests to states/districts</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> View documents, objections, and audit trail</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Generate MIS reports</li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-medium text-red-700 mb-2">CANNOT</p>
              <ul className="space-y-1 text-[11px] text-slate-600">
                <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Perform statutory approvals (reserved for Collector/CALA)</li>
                <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Conduct field verification</li>
                <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Record possession</li>
                <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Finalize compensation</li>
                <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Override workflow stage gates</li>
                <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Modify system configuration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
