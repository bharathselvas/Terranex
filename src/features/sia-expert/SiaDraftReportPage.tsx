import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SIA_PROJECT, SIA_ID, SIA_FINDINGS, MITIGATION_ITEMS } from "./siaExpertData";
import { ArrowLeft, Download, Edit, Eye } from "lucide-react";

const REPORT_SECTIONS = [
  "Executive Summary",
  "Project Description",
  "Methodology",
  "Affected Area",
  "Affected Families",
  "Social Impact",
  "Livelihood Impact",
  "Displacement",
  "Public Assets",
  "Vulnerable Groups",
  "Consultation Process",
  "Gram Sabha Findings",
  "Stakeholder Concerns",
  "Evidence Summary",
  "Impact Findings",
  "Mitigation Recommendations",
  "Expert Conclusions",
  "Annexures",
];

export default function SiaDraftReportPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">SIA Draft Report</h1>
        <div className="flex items-center gap-3 mt-2">
          <Badge className="bg-purple-100 text-purple-800">Draft</Badge>
          <span className="text-sm text-muted-foreground">Version 1.2 — 08 Sep 2026</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Report Preview */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              {/* Header */}
              <div className="text-center border-b pb-6 mb-6">
                <p className="text-sm text-muted-foreground">भारत सरकार — Government of India</p>
                <p className="text-sm text-muted-foreground">भूमि संसाधन विभाग — Department of Land Resources</p>
                <h2 className="text-xl font-bold text-[#0F2340] mt-4">SOCIAL IMPACT ASSESSMENT REPORT</h2>
                <p className="text-sm text-muted-foreground mt-2">RFCTLARR Act, 2013</p>
                <p className="font-mono text-sm mt-2">{SIA_ID}</p>
              </div>

              {/* Project Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg text-sm">
                <p><span className="text-muted-foreground">Project:</span> <span className="font-medium">{SIA_PROJECT.projectName}</span></p>
                <p><span className="text-muted-foreground">State:</span> {SIA_PROJECT.state}</p>
                <p><span className="text-muted-foreground">District:</span> {SIA_PROJECT.district}</p>
                <p><span className="text-muted-foreground">Villages:</span> {SIA_PROJECT.villages.join(", ")}</p>
                <p><span className="text-muted-foreground">Affected Families:</span> {SIA_PROJECT.estimatedFamilies}</p>
              </div>

              {/* Report Sections */}
              <div className="space-y-2">
                {REPORT_SECTIONS.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50">
                    <span className="text-xs text-muted-foreground w-6">{i + 1}.</span>
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#0F2340] mb-3 text-sm">Report Summary</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Sections</span><span className="font-medium">{REPORT_SECTIONS.length}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Findings</span><span className="font-medium">{SIA_FINDINGS.length} categories</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Mitigations</span><span className="font-medium">{MITIGATION_ITEMS.length} items</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Evidence</span><span className="font-medium">47 items</span></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold text-[#0F2340] mb-3 text-sm">Actions</h3>
              <button className="w-full bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-50">
                <Eye className="h-4 w-4" /> Preview
              </button>
              <button className="w-full bg-white border border-[#1B5E20] text-[#1B5E20] px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-50">
                <Edit className="h-4 w-4" /> Edit
              </button>
              <button className="w-full bg-[#1B5E20] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#2E7D32]">
                <Download className="h-4 w-4" /> Generate PDF (Mock)
              </button>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <p className="text-xs text-amber-800">PDF generation is simulated for demonstration. The mock button will show a confirmation but no actual file is produced.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
