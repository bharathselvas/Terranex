import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEMO_CITIZEN } from "./citizenData";
import { MapPin, ArrowLeft } from "lucide-react";

export default function CitizenParcelMapPage() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is for demonstration only
      </div>

      <h1 className="text-xl font-bold text-[#0F2340]">Parcel Map View</h1>

      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden border-2 border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-amber-50 to-sky-100" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-[#0F2340]/90 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium shadow-lg">
              Project Corridor
            </div>
            <div className="bg-slate-800/80 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium shadow-lg">
              Village Boundary
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div className="bg-[#0F7A5A]/90 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium shadow-lg flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Your Parcel — {DEMO_CITIZEN.areaAcres} acres
            </div>
            <div className="bg-white/90 border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium shadow-lg">
              Adjacent Parcels
            </div>
          </div>
        </div>

        <div className="absolute top-[15%] left-[10%] right-[40%] bottom-[40%] border-2 border-[#0F2340]/40 border-dashed rounded-lg" />
        <div className="absolute top-[25%] left-[20%] right-[15%] bottom-[25%] border-2 border-amber-400/40 border-dashed rounded-lg" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-40 h-32 border-4 border-[#0F7A5A] rounded-xl bg-[#0F7A5A]/15 flex items-center justify-center shadow-lg">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-[#0F7A5A] mx-auto" />
              <p className="text-xs font-bold text-[#0F7A5A] mt-1">PAR-JLN-00421</p>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base text-[#0F2340]">Parcel Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Parcel Ref</p>
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
              <p className="text-muted-foreground text-xs">Area</p>
              <p className="font-medium">{DEMO_CITIZEN.areaAcres} acres</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Link to="/citizen/my-case/land">
        <Button variant="outline" className="text-[#0F2340] border-[#0F2340]">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Land
        </Button>
      </Link>
    </div>
  );
}
