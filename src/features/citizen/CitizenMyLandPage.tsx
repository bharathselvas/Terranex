import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEMO_CITIZEN } from "./citizenData";
import { MapPin } from "lucide-react";

export default function CitizenMyLandPage() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <h1 className="text-xl font-bold text-[#0F2340]">My Land</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base text-[#0F2340]">Parcel Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Parcel Reference</p>
              <p className="font-medium">{DEMO_CITIZEN.parcelRef}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">ULPIN</p>
              <p className="font-medium">{DEMO_CITIZEN.ulpin}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Village</p>
              <p className="font-medium">{DEMO_CITIZEN.village}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Tehsil</p>
              <p className="font-medium">{DEMO_CITIZEN.tehsil}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">District</p>
              <p className="font-medium">{DEMO_CITIZEN.district}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Area</p>
              <p className="font-medium">{DEMO_CITIZEN.areaAcres} acres</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Land Classification</p>
              <p className="font-medium">{DEMO_CITIZEN.landClassification}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Acquisition Status</p>
              <Badge variant="warning">Compensation In Progress</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base text-[#0F2340]">Parcel Map (Simplified)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-emerald-50 via-amber-50 to-sky-50 rounded-lg border-2 border-dashed border-slate-300 overflow-hidden">
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-[#0F2340]/90 text-white px-3 py-1.5 rounded text-xs font-medium">
                  Project Footprint
                </div>
                <div className="bg-slate-700/80 text-white px-3 py-1.5 rounded text-xs font-medium">
                  Village Boundary
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="bg-[#0F7A5A]/90 text-white px-3 py-1.5 rounded text-xs font-medium">
                  Your Parcel
                </div>
                <div className="bg-white/80 border border-slate-300 text-slate-700 px-3 py-1.5 rounded text-xs font-medium">
                  Adjacent Parcels
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-24 border-4 border-[#0F7A5A] rounded-lg bg-[#0F7A5A]/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-[#0F7A5A]" />
              </div>
            </div>
            <div className="absolute top-8 left-8 right-1/3 bottom-1/3 border-2 border-[#0F2340]/30 border-dashed rounded" />
            <div className="absolute top-1/4 left-1/4 right-8 bottom-1/4 border-2 border-amber-400/30 border-dashed rounded" />
          </div>
        </CardContent>
      </Card>

      <Link to="/citizen/my-case/map">
        <Button className="bg-[#0F2340] hover:bg-[#1a365d] text-white">
          View Full Map
        </Button>
      </Link>
    </div>
  );
}
