import { useDemoStore } from "@/features/demo/demoStore";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MetricCard } from "@/components/ui/MetricCard";
import { AuditTimeline } from "@/features/demo/AuditTimeline";
import { Users, MapPin, IndianRupee, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// ProjectOverviewPage — answers: What is this? Where? How much? Stage?
// What needs attention? Who is responsible?
// ═══════════════════════════════════════════════════════════════════════

export default function ProjectOverviewPage() {
  const { project, parcels, awards, payments, objections, completedStages, currentStage, documents, sia } = useDemoStore();

  const completedParcels = parcels.filter((p) => p.status === "completed").length;
  const totalAward = awards.reduce((sum, a) => sum + a.totalAmount, 0);
  const completedPayments = payments.filter((p) => p.status === "completed").length;
  const failedPayments = payments.filter((p) => p.status === "failed").length;
  const openObjections = objections.filter((o) => o.status === "submitted" || o.status === "under_review").length;
  const pendingVerifications = parcels.filter((p) => p.verificationStatus === "pending").length;

  return (
    <div className="space-y-6">
      {/* Project Summary */}
      <div className="border rounded-lg bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Project Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-xs text-slate-500">Sector</p>
            <p className="font-medium">{project.sector}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Owning Ministry</p>
            <p className="font-medium">{project.owningMinistry}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Requiring Org</p>
            <p className="font-medium">{project.requiringOrg}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Purpose</p>
            <p className="font-medium">{project.purpose}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="Total Parcels" value={`${completedParcels}/${parcels.length}`} icon={<MapPin className="h-5 w-5" />} color="blue" />
        <MetricCard label="Total Award" value={`₹${(totalAward / 100000).toFixed(1)}L`} icon={<IndianRupee className="h-5 w-5" />} color="emerald" />
        <MetricCard label="Payments Done" value={`${completedPayments}/${payments.length}`} icon={<CheckCircle2 className="h-5 w-5" />} color="emerald" />
        <MetricCard label="Pending Items" value={pendingVerifications + openObjections + failedPayments} icon={<AlertTriangle className="h-5 w-5" />} color={pendingVerifications + openObjections + failedPayments > 0 ? "amber" : "emerald"} />
      </div>

      {/* Workflow Progress */}
      <div className="border rounded-lg bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Workflow Progress</h3>
        <div className="w-full bg-slate-100 rounded-full h-3 mb-2">
          <div
            className="bg-emerald-500 h-3 rounded-full transition-all"
            style={{ width: `${Math.round((completedStages.length / 17) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>{completedStages.length} of 17 stages completed</span>
          <span>Current: {currentStage.replace(/_/g, " ")}</span>
        </div>
      </div>

      {/* Parcel Progress */}
      <div className="border rounded-lg bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Parcel Progress</h3>
        <div className="space-y-2">
          {parcels.map((parcel) => (
            <div key={parcel.parcelId} className="flex items-center gap-3 py-1.5 border-b last:border-0">
              <span className="text-xs font-mono text-slate-500 w-24">{parcel.parcelId}</span>
              <span className="text-xs text-slate-700 flex-1">{parcel.ownerName}</span>
              <StatusBadge status={parcel.status} size="xs" />
              <StatusBadge status={parcel.paymentStatus} size="xs" />
            </div>
          ))}
        </div>
      </div>

      {/* Pending Actions */}
      {(openObjections > 0 || failedPayments > 0 || pendingVerifications > 0) && (
        <div className="border rounded-lg bg-amber-50 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-amber-800 mb-2">Items Requiring Attention</h3>
          <div className="space-y-1.5">
            {openObjections > 0 && (
              <div className="flex items-center gap-2 text-xs">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                <span className="text-amber-800">{openObjections} open objection{openObjections > 1 ? "s" : ""} awaiting decision</span>
              </div>
            )}
            {failedPayments > 0 && (
              <div className="flex items-center gap-2 text-xs">
                <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                <span className="text-red-800">{failedPayments} payment{failedPayments > 1 ? "s" : ""} failed — retry required</span>
              </div>
            )}
            {pendingVerifications > 0 && (
              <div className="flex items-center gap-2 text-xs">
                <Clock className="h-3.5 w-3.5 text-amber-600" />
                <span className="text-amber-800">{pendingVerifications} parcel{pendingVerifications > 1 ? "s" : ""} pending verification</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Key Dates */}
      <div className="border rounded-lg bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Key Dates</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div><p className="text-slate-500">SIA Completed</p><p className="font-medium">{sia.completedDate ?? "—"}</p></div>
          <div><p className="text-slate-500">Awards Approved</p><p className="font-medium">{awards[0]?.approvedDate ?? "—"}</p></div>
          <div><p className="text-slate-500">Documents</p><p className="font-medium">{documents.length} files</p></div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border rounded-lg bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0F2340] mb-3">Recent Activity</h3>
        <AuditTimeline />
      </div>
    </div>
  );
}
