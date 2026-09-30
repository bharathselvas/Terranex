import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { RR_PROJECT, COMPONENT_PROGRESS } from "./rrOfficerData";
import { ArrowLeft, FileText, Download, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const componentData = [
  { name: "Housing", applicable: COMPONENT_PROGRESS.housing.applicable, completed: COMPONENT_PROGRESS.housing.completed, pending: COMPONENT_PROGRESS.housing.applicable - COMPONENT_PROGRESS.housing.completed },
  { name: "Subsistence", applicable: COMPONENT_PROGRESS.subsistence.applicable, completed: COMPONENT_PROGRESS.subsistence.completed, pending: COMPONENT_PROGRESS.subsistence.applicable - COMPONENT_PROGRESS.subsistence.completed },
  { name: "Transport", applicable: COMPONENT_PROGRESS.transportation.applicable, completed: COMPONENT_PROGRESS.transportation.completed, pending: COMPONENT_PROGRESS.transportation.applicable - COMPONENT_PROGRESS.transportation.completed },
  { name: "Livelihood", applicable: COMPONENT_PROGRESS.livelihood.applicable, completed: COMPONENT_PROGRESS.livelihood.completed, pending: COMPONENT_PROGRESS.livelihood.applicable - COMPONENT_PROGRESS.livelihood.completed },
  { name: "Employment", applicable: COMPONENT_PROGRESS.employment.applicable, completed: COMPONENT_PROGRESS.employment.completed, pending: COMPONENT_PROGRESS.employment.applicable - COMPONENT_PROGRESS.employment.completed },
  { name: "Skill Dev", applicable: COMPONENT_PROGRESS.skillDev.applicable, completed: COMPONENT_PROGRESS.skillDev.completed, pending: COMPONENT_PROGRESS.skillDev.applicable - COMPONENT_PROGRESS.skillDev.completed },
];

export default function RrMisPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/rr/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">R&R MIS</h1>
        <p className="text-sm text-muted-foreground mt-1">Operational tracking — not legal compliance scores</p>
      </div>

      {/* Project Info */}
      <Card className="mb-6 border-[#0F2340]">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[#0F2340]">{RR_PROJECT.projectName}</h2>
              <p className="text-sm text-muted-foreground">{RR_PROJECT.state} — {RR_PROJECT.district}</p>
            </div>
            <span className="font-mono text-xs text-muted-foreground">{RR_PROJECT.projectId}</span>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Families Affected</p>
            <p className="text-2xl font-bold text-[#0F2340]">{RR_PROJECT.affectedFamilies}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">R&R Completed</p>
            <p className="text-2xl font-bold text-[#0F2340]">{RR_PROJECT.rrCompleted}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold text-[#0F2340]">{RR_PROJECT.inProgress}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-rose-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Pending Verification</p>
            <p className="text-2xl font-bold text-[#0F2340]">{RR_PROJECT.pendingVerification}</p>
          </CardContent>
        </Card>
      </div>

      {/* Component Matrix */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" /> Component Matrix
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">Component</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Applicable</th>
                  <th className="text-center p-2 font-medium text-muted-foreground">Completed</th>
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
        </CardContent>
      </Card>

      {/* Report Preview Card */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Report Preview</h2>
          <div className="p-4 bg-white border rounded-lg">
            <h3 className="text-center font-bold text-[#0F2340] mb-2">Rehabilitation & Resettlement Progress Report</h3>
            <p className="text-center text-xs text-muted-foreground mb-4">Reporting Period: August 2026 — September 2026</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Project: </span><span className="font-medium">{RR_PROJECT.projectName}</span></div>
              <div><span className="text-muted-foreground">District: </span><span className="font-medium">{RR_PROJECT.district}, {RR_PROJECT.state}</span></div>
              <div><span className="text-muted-foreground">Families Affected: </span><span className="font-medium">{RR_PROJECT.affectedFamilies}</span></div>
              <div><span className="text-muted-foreground">R&R Applicable: </span><span className="font-medium">{RR_PROJECT.rrApplicable}</span></div>
              <div><span className="text-muted-foreground">R&R Completed: </span><span className="font-medium text-green-700">{RR_PROJECT.rrCompleted}</span></div>
              <div><span className="text-muted-foreground">In Progress: </span><span className="font-medium text-blue-700">{RR_PROJECT.inProgress}</span></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <button className="bg-white border border-[#1B5E20] text-[#1B5E20] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-50">
          <FileText className="h-4 w-4" /> Preview Report
        </button>
        <button className="bg-[#1B5E20] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#2E7D32]">
          <Download className="h-4 w-4" /> Generate PDF (Mock)
        </button>
      </div>
    </div>
  );
}
