import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, FileText, MapPin, Calendar, Info, LogIn, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CITIZEN_PROJECTS, DEMO_CITIZEN, STAGE_LABELS } from "./citizenData";

export default function CitizenCaseSearchPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [found, setFound] = useState(false);

  const handleSearch = () => {
    setSearched(true);
    if (!query.trim() || query.includes("00421")) {
      setFound(true);
    } else {
      setFound(false);
    }
  };

  const project = CITIZEN_PROJECTS.find((p) => p.projectId === DEMO_CITIZEN.projectId);

  return (
    <div className="space-y-8">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 flex items-center gap-2 text-amber-800 text-xs font-medium">
        <AlertTriangle className="h-4 w-4" />
        MOCK / SANDBOX — All data shown is fictional demonstration data
      </div>

      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-[#0F2340]">Check Your Land Acquisition Status</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Enter your case reference number to view the current status of your land acquisition proceedings.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 space-y-2">
              <Label htmlFor="case-ref">Case Reference Number</Label>
              <Input
                id="case-ref"
                placeholder="LA-2026-00421"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full sm:w-auto">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {searched && !found && (
        <Card className="max-w-2xl mx-auto border-destructive">
          <CardContent className="p-6 text-center">
            <p className="text-destructive font-medium">No case found for reference "{query}".</p>
            <p className="text-sm text-muted-foreground mt-1">
              Please check your case reference number and try again.
            </p>
          </CardContent>
        </Card>
      )}

      {searched && found && (
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="border-[#0F2340]/20">
            <CardHeader className="bg-[#0F2340]/5 rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#0F2340] flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Case Found
                </CardTitle>
                <Badge variant="success">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Project</p>
                  <p className="text-sm font-medium">{DEMO_CITIZEN.project}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Village</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {DEMO_CITIZEN.village}, {DEMO_CITIZEN.district}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Current Stage</p>
                  <p className="text-sm font-medium">
                    {STAGE_LABELS[project?.currentStage ?? "compensation"]}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    10 Sep 2026
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-semibold text-[#0F2340] mb-2 flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  Public Information
                </h4>
                <p className="text-sm text-muted-foreground">
                  Case reference <span className="font-mono font-medium text-foreground">{DEMO_CITIZEN.caseId}</span> is
                  linked to the <span className="font-medium text-foreground">{project?.name}</span> project affecting
                  villages in {DEMO_CITIZEN.district} district, {DEMO_CITIZEN.state}. The case is currently
                  at the <span className="font-medium text-foreground">{STAGE_LABELS[project?.currentStage ?? "compensation"]}</span> stage.
                  {project?.publishedNotices} notices have been published and {project?.objectionsReceived} objections received for this project.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm font-medium text-amber-900">Sign in to view your personal case details</p>
                <p className="text-xs text-amber-700 mt-1">
                  Access compensation breakdown, document downloads, objection status, and grievance tracking.
                </p>
              </div>
              <Link to="/citizen/login">
                <Button variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
                  <LogIn className="h-4 w-4" />
                  Landowner Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
