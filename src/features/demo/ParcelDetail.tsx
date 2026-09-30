import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDemoStore } from "@/features/demo/demoStore";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StatusBadge } from "@/components/ui/StatusBadge";

// ═══════════════════════════════════════════════════════════════════════
// ParcelDetail — consistent parcel detail experience
// Shows parcel info with tabbed sections
// ═══════════════════════════════════════════════════════════════════════

type Tab = { label: string; key: string };

const TABS: Tab[] = [
  { label: "Overview", key: "overview" },
  { label: "Ownership", key: "ownership" },
  { label: "Workflow", key: "workflow" },
  { label: "Verification", key: "verification" },
  { label: "Compensation", key: "compensation" },
  { label: "Payment", key: "payment" },
  { label: "Possession", key: "possession" },
  { label: "R&R", key: "rr" },
  { label: "Documents", key: "documents" },
  { label: "Audit", key: "audit" },
];

export function ParcelDetail() {
  const { parcelId } = useParams();
  const { parcels, awards, payments, possession, rr } = useDemoStore();
  const [activeTab, setActiveTab] = useState("overview");

  const parcel = parcels.find((p) => p.parcelId === parcelId);
  const award = awards.find((a) => a.parcelId === parcelId);
  const payment = payments.find((p) => p.parcelId === parcelId);
  const poss = possession.find((p) => p.parcelId === parcelId);
  const rnr = rr.find((r) => r.parcelId === parcelId);

  if (!parcel) {
    return (
      <div className="space-y-4">
        <Breadcrumbs items={[{ label: "Projects", href: "/app/ro/projects" }, { label: "Parcel" }]} />
        <div className="text-center py-12 text-sm text-slate-500">Parcel not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/app/ro/projects" },
          { label: parcel.projectId, href: `/app/ro/project/${parcel.projectId}` },
          { label: parcel.parcelId },
        ]}
      />

      {/* Parcel Header */}
      <div className="border rounded-lg bg-white p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-slate-500">{parcel.ulpin}</span>
              <StatusBadge status={parcel.status} size="xs" />
            </div>
            <h2 className="text-lg font-bold text-[#0F2340]">{parcel.ownerName}</h2>
            <p className="text-xs text-slate-500">
              {parcel.village} · {parcel.tehsil} · {parcel.district} · {parcel.state}
            </p>
          </div>
          <div className="flex gap-4 text-center">
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Area</div>
              <div className="text-sm font-bold text-slate-800">{parcel.areaAcres} acres</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Stage</div>
              <div className="text-xs font-semibold text-blue-700">{parcel.currentStage.replace(/_/g, " ")}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Classification</div>
              <div className="text-xs font-medium text-slate-700">{parcel.classification}</div>
            </div>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4 pt-3 border-t">
          <div>
            <div className="text-[10px] text-slate-500 uppercase">Verification</div>
            <StatusBadge status={parcel.verificationStatus} size="xs" />
          </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase">Award</div>
                <StatusBadge status={parcel.awardStatus === "approved" ? "approved" : parcel.awardStatus === "finalized" ? "in_progress" : parcel.awardStatus === "draft" ? "draft" : "pending"} size="xs" />
              </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase">Payment</div>
            <StatusBadge status={parcel.paymentStatus} size="xs" />
          </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase">Possession</div>
                <StatusBadge status={parcel.possessionStatus === "recorded" ? "completed" : "pending"} size="xs" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase">R&R</div>
                <StatusBadge status={parcel.rrStatus === "completed" ? "completed" : parcel.rrStatus === "in_progress" ? "in_progress" : parcel.rrStatus === "not_applicable" ? "not_applicable" : "pending"} size="xs" />
              </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b bg-white rounded-t-lg">
        <nav className="flex overflow-x-auto -mb-px">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-[#0F2340] text-[#0F2340]"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="border rounded-b-lg bg-white p-4 shadow-sm min-h-[300px]">
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-500">Parcel ID</p>
                <p className="font-medium font-mono">{parcel.parcelId}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">ULPIN</p>
                <p className="font-medium font-mono">{parcel.ulpin}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Owner</p>
                <p className="font-medium">{parcel.ownerName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Area</p>
                <p className="font-medium">{parcel.areaAcres} acres</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Village</p>
                <p className="font-medium">{parcel.village}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Classification</p>
                <p className="font-medium">{parcel.classification}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Lat / Lng</p>
                <p className="font-medium font-mono text-xs">{parcel.lat}, {parcel.lng}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Current Stage</p>
                <p className="font-medium capitalize">{parcel.currentStage.replace(/_/g, " ")}</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === "compensation" && award && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#0F2340]">Award Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div><p className="text-xs text-slate-500">Market Value</p><p className="font-medium">₹{award.marketValue.toLocaleString("en-IN")}</p></div>
              <div><p className="text-xs text-slate-500">Asset Value</p><p className="font-medium">₹{award.assetValue.toLocaleString("en-IN")}</p></div>
              <div><p className="text-xs text-slate-500">Solatium (100%)</p><p className="font-medium">₹{award.solatium.toLocaleString("en-IN")}</p></div>
              <div><p className="text-xs text-slate-500">Interest</p><p className="font-medium">₹{award.interest.toLocaleString("en-IN")}</p></div>
              <div><p className="text-xs text-slate-500">Other</p><p className="font-medium">₹{award.otherComponents.toLocaleString("en-IN")}</p></div>
              <div><p className="text-xs text-slate-500 font-semibold">Total</p><p className="font-bold text-lg">₹{award.totalAmount.toLocaleString("en-IN")}</p></div>
            </div>
          </div>
        )}
        {activeTab === "payment" && payment && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#0F2340]">Payment Status</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-slate-500">Payment ID</p><p className="font-medium font-mono">{payment.paymentId}</p></div>
              <div><p className="text-xs text-slate-500">Status</p><StatusBadge status={payment.status === "completed" ? "completed" : payment.status === "failed" ? "failed" : payment.status === "initiated" ? "initiated" : payment.status === "returned" ? "returned" : payment.status === "pending_verification" ? "in_progress" : "pending"} /></div>
              <div><p className="text-xs text-slate-500">Amount</p><p className="font-medium">₹{payment.amount.toLocaleString("en-IN")}</p></div>
              {payment.externalReference && <div><p className="text-xs text-slate-500">Ref</p><p className="font-medium font-mono text-xs">{payment.externalReference}</p></div>}
              {payment.failureReason && <div className="col-span-2"><p className="text-xs text-slate-500">Failure Reason</p><p className="text-xs text-red-600">{payment.failureReason}</p></div>}
            </div>
          </div>
        )}
        {activeTab === "possession" && poss && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#0F2340]">Possession Record</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-slate-500">Status</p><StatusBadge status={poss.status === "recorded" ? "completed" : "pending"} /></div>
              <div><p className="text-xs text-slate-500">Recorded Date</p><p className="font-medium">{poss.recordedDate ?? "—"}</p></div>
              <div><p className="text-xs text-slate-500">Recorded By</p><p className="font-medium">{poss.recordedBy ?? "—"}</p></div>
              <div><p className="text-xs text-slate-500">Certificate</p><p className="font-medium font-mono text-xs">{poss.certificateRef ?? "—"}</p></div>
            </div>
          </div>
        )}
        {activeTab === "rr" && rnr && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#0F2340]">Rehabilitation & Resettlement</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div><p className="text-xs text-slate-500">Housing</p><StatusBadge status={rnr.housing === "delivered" ? "delivered" : rnr.housing === "in_progress" ? "in_progress" : "pending"} size="xs" /></div>
              <div><p className="text-xs text-slate-500">Subsistence</p><StatusBadge status={rnr.subsistence === "delivered" ? "delivered" : rnr.subsistence === "recorded" ? "in_progress" : "pending"} size="xs" /></div>
              <div><p className="text-xs text-slate-500">Transportation</p><StatusBadge status={rnr.transportation === "delivered" ? "delivered" : rnr.transportation === "in_progress" ? "in_progress" : "pending"} size="xs" /></div>
              <div><p className="text-xs text-slate-500">Livelihood</p><StatusBadge status={rnr.livelihood === "delivered" ? "delivered" : rnr.livelihood === "in_progress" ? "in_progress" : "pending"} size="xs" /></div>
              <div><p className="text-xs text-slate-500">Skill Development</p><StatusBadge status={rnr.skillDevelopment === "delivered" ? "delivered" : rnr.skillDevelopment === "in_progress" ? "in_progress" : "pending"} size="xs" /></div>
              <div><p className="text-xs text-slate-500">Resettlement Site</p><p className="font-medium">{rnr.resettlementSite}</p></div>
            </div>
          </div>
        )}
        {activeTab === "workflow" && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#0F2340]">Workflow Status</h3>
            <div className="grid grid-cols-1 gap-2">
              {["verification", "award", "payment", "possession", "rr"].map((field) => (
                <div key={field} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-xs text-slate-600 capitalize">{field.replace(/_/g, " ")}</span>
                  <StatusBadge status={
                    field === "verification" ? (parcel.verificationStatus === "verified" ? "verified" : parcel.verificationStatus === "discrepancy" ? "discrepancy" : "pending") :
                    field === "award" ? (parcel.awardStatus === "approved" ? "approved" : parcel.awardStatus === "finalized" ? "in_progress" : parcel.awardStatus === "draft" ? "draft" : "pending") :
                    field === "payment" ? (parcel.paymentStatus === "completed" ? "completed" : parcel.paymentStatus === "failed" ? "failed" : parcel.paymentStatus === "initiated" ? "initiated" : "pending") :
                    field === "possession" ? (parcel.possessionStatus === "recorded" ? "completed" : "pending") :
                    (parcel.rrStatus === "completed" ? "completed" : parcel.rrStatus === "in_progress" ? "in_progress" : "pending")
                  } size="xs" />
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "ownership" && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#0F2340]">Ownership Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-slate-500">Owner</p><p className="font-medium">{parcel.ownerName}</p></div>
              <div><p className="text-xs text-slate-500">Classification</p><p className="font-medium">{parcel.classification}</p></div>
              <div><p className="text-xs text-slate-500">Area</p><p className="font-medium">{parcel.areaAcres} acres</p></div>
              <div><p className="text-xs text-slate-500">Village</p><p className="font-medium">{parcel.village}</p></div>
            </div>
          </div>
        )}
        {(activeTab === "documents" || activeTab === "audit") && (
          <div className="text-center py-8 text-xs text-slate-500">
            Demo data for this section is available in the role-specific workspace.
          </div>
        )}
        {activeTab === "verification" && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#0F2340]">Field Verification</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-slate-500">Status</p><StatusBadge status={parcel.verificationStatus} /></div>
              <div><p className="text-xs text-slate-500">Verified By</p><p className="font-medium">Field Officer, Anekal</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
