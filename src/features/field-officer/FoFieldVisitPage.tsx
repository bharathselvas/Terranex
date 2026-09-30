import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIELD_TASKS } from "./fieldOfficerData";
import { Camera, MapPin, FileText, User, Home, Save, Send } from "lucide-react";

export default function FoFieldVisitPage() {
  const { taskId } = useParams();
  const task = FIELD_TASKS.find((t) => t.id === taskId) ?? FIELD_TASKS[0];
  const [gpsStatus] = useState<"acquiring" | "acquired" | "verified">("acquired");
  const [evidenceCount] = useState(task.evidenceCount);
  const [isOffline, setIsOffline] = useState(false);

  const actions = [
    { label: "Capture Photo", icon: Camera, color: "bg-blue-600", link: `/app/fo/photo/${task.id}` },
    { label: "Record Location", icon: MapPin, color: "bg-emerald-600", link: `/app/fo/gps/${task.id}` },
    { label: "Add Document", icon: FileText, color: "bg-purple-600", link: `/app/fo/documents/${task.id}` },
    { label: "Verify Owner", icon: User, color: "bg-amber-600", link: `/app/fo/owner-verify/${task.id}` },
    { label: "Record Asset", icon: Home, color: "bg-orange-600", link: `/app/fo/assets/${task.id}` },
    { label: "Add Observation", icon: FileText, color: "bg-indigo-600", link: `/app/fo/observations/${task.id}` },
  ];

  return (
    <div className="space-y-6">
      {/* Field Visit Header */}
      <Card className="border-2 border-emerald-500 bg-emerald-50/50 shadow-md">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="bg-emerald-600 text-white mb-2">FIELD VISIT ACTIVE</Badge>
              <p className="text-sm font-semibold text-[#0F2340]">Parcel: {task.parcelId}</p>
            </div>
            <button onClick={() => setIsOffline(!isOffline)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${isOffline ? "bg-amber-500 text-white" : "bg-emerald-500 text-white"}`}>
              {isOffline ? "Offline" : "Online"}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border bg-white p-3">
              <p className="text-[10px] text-muted-foreground">GPS</p>
              <p className={`text-sm font-medium ${gpsStatus === "verified" ? "text-emerald-700" : "text-amber-700"}`}>
                {gpsStatus === "acquiring" ? "Acquiring..." : gpsStatus === "acquired" ? "18.5981, 73.7354" : "GPS VERIFIED"}
              </p>
            </div>
            <div className="rounded-lg border bg-white p-3">
              <p className="text-[10px] text-muted-foreground">Network</p>
              <p className={`text-sm font-medium ${isOffline ? "text-amber-700" : "text-emerald-700"}`}>{isOffline ? "Offline" : "Online"}</p>
            </div>
            <div className="rounded-lg border bg-white p-3">
              <p className="text-[10px] text-muted-foreground">Evidence</p>
              <p className="text-sm font-medium">{evidenceCount} / {task.evidenceRequired}</p>
            </div>
            <div className="rounded-lg border bg-white p-3">
              <p className="text-[10px] text-muted-foreground">Status</p>
              <p className="text-sm font-medium text-emerald-700">In Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Offline Banner */}
      {isOffline && (
        <Card className="border-amber-300 bg-amber-50 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-amber-800">OFFLINE MODE</p>
            <p className="mt-1 text-xs text-amber-700">No network connection. Your field work can continue. Evidence will be stored securely on the device and uploaded when connectivity is restored.</p>
          </CardContent>
        </Card>
      )}

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <Link key={a.label} to={a.link}>
            <Card className="shadow-sm transition-transform hover:scale-[1.02]">
              <CardContent className="p-4 text-center">
                <div className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full ${a.color} text-white`}>
                  <a.icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-[#0F2340]">{a.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Save / Submit */}
      <div className="flex gap-3">
        <Card className="flex-1 shadow-sm">
          <CardContent className="p-3 text-center">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#0F2340] px-4 py-3 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/5">
              <Save className="h-4 w-4" /> Save Draft
            </button>
          </CardContent>
        </Card>
        <Card className="flex-1 shadow-sm">
          <CardContent className="p-3 text-center">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F2340] px-4 py-3 text-sm font-medium text-white hover:bg-[#1a3560]">
              <Send className="h-4 w-4" /> Submit
            </button>
          </CardContent>
        </Card>
      </div>

      <Link to={`/app/fo/task/${task.id}`} className="block text-center text-xs text-muted-foreground hover:underline">← Back to Task</Link>
    </div>
  );
}
