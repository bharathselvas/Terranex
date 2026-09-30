import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RR_PROJECT, COMPONENT_PROGRESS, RESETTLEMENT_SITES, RR_CASES, GRIEVANCES } from "./rrOfficerData";
import { ArrowLeft, MapPin, BarChart3, Users, Home } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const componentData = [
  { name: "Housing", applicable: COMPONENT_PROGRESS.housing.applicable, completed: COMPONENT_PROGRESS.housing.completed, pending: COMPONENT_PROGRESS.housing.applicable - COMPONENT_PROGRESS.housing.completed },
  { name: "Subsistence", applicable: COMPONENT_PROGRESS.subsistence.applicable, completed: COMPONENT_PROGRESS.subsistence.completed, pending: COMPONENT_PROGRESS.subsistence.applicable - COMPONENT_PROGRESS.subsistence.completed },
  { name: "Transport", applicable: COMPONENT_PROGRESS.transportation.applicable, completed: COMPONENT_PROGRESS.transportation.completed, pending: COMPONENT_PROGRESS.transportation.applicable - COMPONENT_PROGRESS.transportation.completed },
  { name: "Livelihood", applicable: COMPONENT_PROGRESS.livelihood.applicable, completed: COMPONENT_PROGRESS.livelihood.completed, pending: COMPONENT_PROGRESS.livelihood.applicable - COMPONENT_PROGRESS.livelihood.completed },
  { name: "Employment", applicable: COMPONENT_PROGRESS.employment.applicable, completed: COMPONENT_PROGRESS.employment.completed, pending: COMPONENT_PROGRESS.employment.applicable - COMPONENT_PROGRESS.employment.completed },
  { name: "Skill Dev", applicable: COMPONENT_PROGRESS.skillDev.applicable, completed: COMPONENT_PROGRESS.skillDev.completed, pending: COMPONENT_PROGRESS.skillDev.applicable - COMPONENT_PROGRESS.skillDev.completed },
];

const siteStatusColors: Record<string, string> = {
  identified: "bg-blue-100 text-blue-800",
  planning: "bg-indigo-100 text-indigo-800",
  under_development: "bg-amber-100 text-amber-800",
  ready: "bg-green-100 text-green-800",
  partially_occupied: "bg-purple-100 text-purple-800",
  operational: "bg-emerald-100 text-emerald-800",
};

export default function RrProjectOverviewPage() {
  const villageData = RR_PROJECT.villages.map((v) => ({
    name: v,
    families: RR_CASES.filter((c) => c.village === v).length,
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Project R&R Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">{RR_PROJECT.projectName}</p>
      </div>

      {/* Project Summary */}
      <Card className="mb-6 border-[#0F2340]">
        <CardContent className="p-5">
          <div className="grid md:grid-cols-6 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-[#0F2340]">{RR_PROJECT.affectedFamilies}</p>
              <p className="text-xs text-muted-foreground">Affected Families</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-[#0F2340]">{RR_PROJECT.rrApplicable}</p>
              <p className="text-xs text-muted-foreground">R&R Applicable</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">{RR_PROJECT.rrCompleted}</p>
              <p className="text-xs text-muted-foreground">R&R Completed</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">{RR_PROJECT.inProgress}</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <p className="text-2xl font-bold text-amber-700">{RR_PROJECT.pendingVerification}</p>
              <p className="text-xs text-muted-foreground">Pending Verification</p>
            </div>
            <div className="text-center p-3 bg-rose-50 rounded-lg">
              <p className="text-2xl font-bold text-rose-700">{GRIEVANCES.filter((g) => g.status !== "resolved").length}</p>
              <p className="text-xs text-muted-foreground">Open Grievances</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-green-600 h-3 rounded-full" style={{ width: `${(RR_PROJECT.rrCompleted / RR_PROJECT.rrApplicable) * 100}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-right">{Math.round((RR_PROJECT.rrCompleted / RR_PROJECT.rrApplicable) * 100)}% overall completion</p>
        </CardContent>
      </Card>

      {/* Component Matrix */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" /> Component Status Matrix
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Component</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Applicable</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Completed</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">In Progress</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Pending</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Progress</th>
                </tr>
              </thead>
              <tbody>
                {componentData.map((c) => (
                  <tr key={c.name} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{c.name}</td>
                    <td className="p-2 text-center">{c.applicable}</td>
                    <td className="p-2 text-center text-green-700 font-medium">{c.completed}</td>
                    <td className="p-2 text-center text-blue-700 font-medium">{c.applicable - c.completed - c.pending}</td>
                    <td className="p-2 text-center text-amber-700 font-medium">{c.pending}</td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(c.completed / c.applicable) * 100}%` }} />
                        </div>
                        <span className="text-xs">{Math.round((c.completed / c.applicable) * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={componentData} margin={{ left: 20 }}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#16a34a" name="Completed" />
              <Bar dataKey="pending" fill="#e5e7eb" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-2">Operational tracking status — not legal compliance scores</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Village Distribution */}
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" /> Village Distribution
            </h2>
            <div className="space-y-3">
              {villageData.map((v) => (
                <div key={v.name} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{v.name}</span>
                  </div>
                  <Badge className="text-xs bg-blue-100 text-blue-800">{v.families} families</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resettlement Sites */}
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4 flex items-center gap-2">
              <Home className="h-5 w-5" /> Resettlement Sites
            </h2>
            <div className="space-y-3">
              {RESETTLEMENT_SITES.map((s) => (
                <div key={s.id} className="p-3 bg-gray-50 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs">{s.id}</span>
                      <Badge className={`text-xs ${siteStatusColors[s.status]}`}>{s.status.replace(/_/g, " ")}</Badge>
                    </div>
                    <span className="text-sm font-bold">{s.siteReadiness}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {s.location}</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${s.siteReadiness}%` }} />
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Planned: {s.familiesPlanned}</span>
                    <span>Allocated: {s.familiesAllocated}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
