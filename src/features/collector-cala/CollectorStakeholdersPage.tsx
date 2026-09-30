import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DISTRICT_PROFILE } from "./districtCollectorData";

const DEPARTMENTS = [
  { name: "Revenue &amp; Land Records", head: "Collector", role: "District Collector / CALA", contact: "collector.pune@maharashtra.gov.in" },
  { name: "Sub-Divisional Officer (Haveli)", head: "Smt. Kavita Patil", role: "SDO", contact: "sdo.haveli@maharashtra.gov.in" },
  { name: "Sub-Divisional Officer (Mulshi)", head: "Shri. A. Gavhane", role: "SDO", contact: "sdo.mulshi@maharashtra.gov.in" },
  { name: "Tehsildar (Haveli)", head: "Shri. R. Bhatt", role: "Tehsildar", contact: "tehsildar.haveli@maharashtra.gov.in" },
  { name: "Tehsildar (Mulshi)", head: "Shri. D. Pawar", role: "Tehsildar", contact: "tehsildar.mulshi@maharashtra.gov.in" },
  { name: "Town Planning", head: "Shri. V. Kamble", role: "Town Planning Officer", contact: "tp.pune@maharashtra.gov.in" },
  { name: "Social Welfare", head: "Smt. L. More", role: "District Social Welfare Officer", contact: "dsw.pune@maharashtra.gov.in" },
  { name: "Environmental Clearance", head: "Shri. N. Gaware", role: "Regional Officer (SPCB)", contact: "ro.pune@spcb.gov.in" },
];

export default function CollectorStakeholdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">District Stakeholders</h1>
        <p className="text-sm text-muted-foreground">{DISTRICT_PROFILE.name} District &middot; Key departments and contacts</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DEPARTMENTS.map((d) => (
          <Card key={d.name} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[#0F2340]">{d.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Head</span><span className="font-medium">{d.head}</span></div>
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Role</span><span className="font-medium">{d.role}</span></div>
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Contact</span><span className="font-medium">{d.contact}</span></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0F2340]">District Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border bg-gray-50 p-3 text-center">
              <p className="text-2xl font-bold text-[#0F2340]">{DISTRICT_PROFILE.totalTehsils}</p>
              <p className="text-xs text-muted-foreground">Tehsils</p>
            </div>
            <div className="rounded-lg border bg-gray-50 p-3 text-center">
              <p className="text-2xl font-bold text-[#0F2340]">{DISTRICT_PROFILE.totalVillages}</p>
              <p className="text-xs text-muted-foreground">Villages</p>
            </div>
            <div className="rounded-lg border bg-gray-50 p-3 text-center">
              <p className="text-2xl font-bold text-[#0F2340]">{DISTRICT_PROFILE.activeProjects}</p>
              <p className="text-xs text-muted-foreground">Active Projects</p>
            </div>
            <div className="rounded-lg border bg-gray-50 p-3 text-center">
              <p className="text-2xl font-bold text-[#0F2340]">{DISTRICT_PROFILE.totalParcels.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Parcels</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
