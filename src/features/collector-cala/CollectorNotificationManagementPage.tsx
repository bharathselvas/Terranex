import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NOTIFICATION_DATA, type NotificationEntry } from "./districtCollectorData";

const statusLabels: Record<string, string> = {
  draft: "Draft", ready: "Ready", published: "Published", pending: "Pending",
};

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700", ready: "bg-amber-100 text-amber-800", published: "bg-emerald-100 text-emerald-800", pending: "bg-blue-100 text-blue-800",
};

const channelStatusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700", prepared: "bg-amber-100 text-amber-800", published: "bg-emerald-100 text-emerald-800", failed: "bg-red-100 text-red-800",
};

export default function CollectorNotificationManagementPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const notif = NOTIFICATION_DATA.find((n) => n.projectId === selected);

  const allPrereqsMet = (n: NotificationEntry) => n.prereqScrutiny && n.prereqSia && n.prereqFootprint && n.prereqParcels;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Notification Management</h1>
        <p className="text-sm text-muted-foreground">Section 11 notifications — prerequisite verification and publication</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Notifications ({NOTIFICATION_DATA.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {NOTIFICATION_DATA.map((n) => (
                <button
                  key={n.projectId}
                  onClick={() => setSelected(n.projectId)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selected === n.projectId ? "border-[#0F2340] bg-[#0F2340]/5" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{n.projectName}</p>
                    <Badge className={statusColors[n.status]}>{statusLabels[n.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{n.notificationNumber} &middot; {n.parcelCount} parcels</p>
                  <div className="mt-1 flex gap-1">
                    {n.disclosureChannels.map((ch) => (
                      <Badge key={ch.channel} className={`text-[10px] ${channelStatusColors[ch.status]}`}>{ch.channel}</Badge>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">Notification Details</CardTitle>
          </CardHeader>
          <CardContent>
            {notif ? (
              <div className="space-y-3">
                <div className="rounded-lg border bg-gray-50 p-3">
                  <p className="text-sm font-medium">{notif.projectName}</p>
                  <p className="text-xs text-muted-foreground">{notif.notificationNumber}</p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold text-[#0F2340]">Prerequisite Verification</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Scrutiny Complete", met: notif.prereqScrutiny },
                      { label: "SIA Complete", met: notif.prereqSia },
                      { label: "GIS Footprint Verified", met: notif.prereqFootprint },
                      { label: "Parcel List Complete", met: notif.prereqParcels },
                    ].map((p) => (
                      <div key={p.label} className={`rounded border p-2 ${p.met ? "border-emerald-300 bg-emerald-50/50" : "border-red-300 bg-red-50/50"}`}>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${p.met ? "bg-emerald-500" : "bg-red-500"}`} />
                          <span className="text-xs">{p.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold text-[#0F2340]">Publication Details</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div><p className="text-xs text-muted-foreground">Publication Date</p><p className="text-sm font-medium">{notif.publicationDate || "—"}</p></div>
                    <div><p className="text-xs text-muted-foreground">Objection Window</p><p className="text-sm font-medium">{notif.objectionStartDate} to {notif.objectionDeadline}</p></div>
                    <div><p className="text-xs text-muted-foreground">Villages</p><p className="text-sm font-medium">{notif.villages.join(", ")}</p></div>
                    <div><p className="text-xs text-muted-foreground">Parcel Count</p><p className="text-sm font-medium">{notif.parcelCount}</p></div>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold text-[#0F2340]">Disclosure Channels</p>
                  <div className="space-y-1">
                    {notif.disclosureChannels.map((ch) => (
                      <div key={ch.channel} className="flex items-center justify-between rounded border p-2">
                        <span className="text-xs">{ch.channel}</span>
                        <Badge className={`text-[10px] ${channelStatusColors[ch.status]}`}>{ch.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {notif.status === "ready" && allPrereqsMet(notif) && (
                    <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Sign &amp; Publish</button>
                  )}
                  {notif.status === "draft" && (
                    <button className="rounded-lg bg-[#0F2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3560]">Prepare Notification</button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Select a notification</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
