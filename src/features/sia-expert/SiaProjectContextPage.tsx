import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SIA_PROJECT } from "./siaExpertData";
import { ArrowLeft, MapPin, Users, FileText } from "lucide-react";

export default function SiaProjectContextPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Project Context</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Project Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Project Name</span>
                <span className="font-medium">{SIA_PROJECT.projectName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Project ID</span>
                <span className="font-mono text-xs">{SIA_PROJECT.projectId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Implementing Agency</span>
                <span className="font-medium">{SIA_PROJECT.implementingAgency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Requiring Organisation</span>
                <span className="font-medium">{SIA_PROJECT.requiringOrg}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">State</span>
                <span className="font-medium">{SIA_PROJECT.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">District</span>
                <span className="font-medium">{SIA_PROJECT.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tehsils</span>
                <span className="font-medium">{SIA_PROJECT.tehsils.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Villages</span>
                <span className="font-medium">{SIA_PROJECT.villages.join(", ")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-[#0F2340] mb-4">Assessment Parameters</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Project Footprint</span>
                <span className="font-medium">{SIA_PROJECT.footprint}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Affected Parcels</span>
                <span className="font-medium">{SIA_PROJECT.affectedParcels}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Affected Families</span>
                <span className="font-medium">{SIA_PROJECT.estimatedFamilies}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Project Stage</span>
                <Badge className="bg-emerald-100 text-emerald-800">{SIA_PROJECT.projectStage}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Scrutiny Status</span>
                <Badge className="bg-green-100 text-green-800">{SIA_PROJECT.scrutinyStatus}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SIA Assignment Date</span>
                <span className="font-medium">{SIA_PROJECT.siaAssignmentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assessment Due Date</span>
                <span className="font-medium text-amber-700">{SIA_PROJECT.assessmentDueDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <MapPin className="h-8 w-8 text-blue-600" />
            <div>
              <p className="font-semibold text-[#0F2340]">View GIS Footprint</p>
              <p className="text-xs text-muted-foreground">Project corridor and affected parcels</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <FileText className="h-8 w-8 text-emerald-600" />
            <div>
              <p className="font-semibold text-[#0F2340]">View Scrutiny Report</p>
              <p className="text-xs text-muted-foreground">Scrutiny completion details</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="h-8 w-8 text-purple-600" />
            <div>
              <p className="font-semibold text-[#0F2340]">Affected Families Register</p>
              <p className="text-xs text-muted-foreground">{SIA_PROJECT.estimatedFamilies} families identified</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
