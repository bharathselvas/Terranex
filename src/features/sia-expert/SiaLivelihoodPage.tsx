import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Briefcase, Home } from "lucide-react";

const LIVELIHOOD_DATA = [
  { category: "Agriculture", count: 142, color: "bg-emerald-600" },
  { category: "Daily Wage", count: 37, color: "bg-amber-600" },
  { category: "Livestock", count: 21, color: "bg-blue-600" },
  { category: "Small Business", count: 18, color: "bg-purple-600" },
  { category: "Services", count: 12, color: "bg-cyan-600" },
  { category: "Fishing", count: 0, color: "bg-gray-400" },
  { category: "Forest Dependency", count: 0, color: "bg-gray-400" },
  { category: "Other", count: 0, color: "bg-gray-400" },
];

const DISPLACEMENT_DATA = [
  { type: "No Displacement", count: 109, color: "bg-green-600" },
  { type: "Partial Displacement", count: 62, color: "bg-amber-600" },
  { type: "Full Displacement", count: 47, color: "bg-red-600" },
  { type: "Temporary Disruption", count: 0, color: "bg-gray-400" },
];

export default function SiaLivelihoodPage() {
  const total = 218;
  const maxCount = Math.max(...LIVELIHOOD_DATA.map((d) => d.count));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Livelihood & Displacement</h1>
        <p className="text-sm text-muted-foreground mt-1">Livelihood categories and displacement analysis for 218 affected families</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-emerald-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Agricultural Families</p>
            <p className="text-2xl font-bold text-[#0F2340]">142</p>
            <p className="text-xs text-muted-foreground">65.1% of total</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Daily Wage Workers</p>
            <p className="text-2xl font-bold text-[#0F2340]">37</p>
            <p className="text-xs text-muted-foreground">17.0% of total</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Full Displacement</p>
            <p className="text-2xl font-bold text-[#0F2340]">47</p>
            <p className="text-xs text-muted-foreground">21.6% of total</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Partial Displacement</p>
            <p className="text-2xl font-bold text-[#0F2340]">62</p>
            <p className="text-xs text-muted-foreground">28.4% of total</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Livelihood Categories */}
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> Livelihood Categories
            </h2>
            <div className="space-y-3">
              {LIVELIHOOD_DATA.filter((d) => d.count > 0).map((d) => (
                <div key={d.category}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{d.category}</span>
                    <span className="font-medium">{d.count} families</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className={`${d.color} h-3 rounded-full transition-all`} style={{ width: `${(d.count / maxCount) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Displacement Analysis */}
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4 flex items-center gap-2">
              <Home className="h-5 w-5" /> Displacement Analysis
            </h2>
            <div className="space-y-4">
              {DISPLACEMENT_DATA.map((d) => (
                <div key={d.type} className="p-4 rounded-lg border bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{d.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{d.count}</span>
                      <span className="text-xs text-muted-foreground">families</span>
                    </div>
                  </div>
                  {d.count > 0 && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div className={`${d.color} h-2 rounded-full`} style={{ width: `${(d.count / total) * 100}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg border bg-blue-50">
              <h3 className="font-semibold text-[#0F2340] text-sm mb-2">Expert Observation</h3>
              <p className="text-sm text-muted-foreground">Livelihood impact is severe for agricultural households. 142 of 218 affected families depend directly on agriculture. Loss of irrigated land in Kharpudi will disproportionately impact households with mango orchards — a multi-year investment.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
