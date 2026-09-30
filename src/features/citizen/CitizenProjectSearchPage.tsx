import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CITIZEN_PROJECTS, STAGE_LABELS } from "./citizenData";
import { Search, MapPin, FileText, AlertTriangle } from "lucide-react";

const STATES = [...new Set(CITIZEN_PROJECTS.map((p) => p.state))];
const DISTRICTS = [...new Set(CITIZEN_PROJECTS.map((p) => p.district))];

export default function CitizenProjectSearchPage() {
  const [state, setState] = useState("all");
  const [district, setDistrict] = useState("all");
  const [village, setVillage] = useState("");
  const [project, setProject] = useState("");
  const [noticeRef, setNoticeRef] = useState("");

  const filtered = CITIZEN_PROJECTS.filter((p) => {
    if (state !== "all" && p.state !== state) return false;
    if (district !== "all" && p.district !== district) return false;
    if (village && !p.affectedVillages.some((v) => v.toLowerCase().includes(village.toLowerCase()))) return false;
    if (project && !p.name.toLowerCase().includes(project.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#0F2340] flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Land Acquisition Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">State</label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger>
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {STATES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">District</label>
              <Select value={district} onValueChange={setDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="All Districts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {DISTRICTS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Village</label>
              <Input placeholder="Enter village name" value={village} onChange={(e) => setVillage(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Project</label>
              <Input placeholder="Enter project name" value={project} onChange={(e) => setProject(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Notice Reference</label>
              <Input placeholder="Enter notice reference" value={noticeRef} onChange={(e) => setNoticeRef(e.target.value)} />
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={() => { setState("all"); setDistrict("all"); setVillage(""); setProject(""); setNoticeRef(""); }}>
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-slate-500">
        {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
      </div>

      <div className="grid gap-4">
        {filtered.map((p) => (
          <Link key={p.projectId} to={`/citizen/project/${p.projectId}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-sm font-semibold text-[#0F2340]">{p.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{p.purpose}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.state}, {p.district}</span>
                      <span>•</span>
                      <span>{p.affectedVillages.length} village{p.affectedVillages.length !== 1 ? "s" : ""}</span>
                    </div>
                    <p className="text-xs text-slate-400">Authority: {p.requiringOrg}</p>
                  </div>
                  <div className="flex flex-wrap md:flex-col gap-2 md:items-end">
                    <Badge variant="success" className="text-[10px]">{STAGE_LABELS[p.currentStage]}</Badge>
                    <div className="flex gap-2">
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                        <FileText className="h-3 w-3" />{p.publishedNotices}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                        <AlertTriangle className="h-3 w-3" />{p.objectionsReceived}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
