import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  MapPin,
  FileText,
  Users,
  Layers,
  Send,
  Briefcase,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ORG_PROFILE } from "@/features/requiring-org/roIAData";

const SECTORS = ["Highways", "Railways", "Urban Transit", "Power Transmission", "Irrigation", "Defence", "Industrial"];

const STEPS = [
  { id: 1, label: "Basic Information", icon: FileText },
  { id: 2, label: "Land Requirement", icon: MapPin },
  { id: 3, label: "GIS Footprint", icon: Layers },
  { id: 4, label: "Parcel Identification", icon: MapPin },
  { id: 5, label: "Stakeholders", icon: Users },
  { id: 6, label: "Review & Submit", icon: Send },
];

export function CreateProjectPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    projectName: "",
    projectCode: "",
    sector: "",
    purpose: "",
    description: "",
    estimatedCost: "",
    states: [] as string[],
    districts: [] as string[],
    estimatedLandHa: "",
    estimatedParcels: "",
    geometryType: "corridor",
    corridorWidth: "100",
  });

  const navigate = useNavigate();

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addState = () => {
    setForm((prev) => ({ ...prev, states: [...prev.states, ""] }));
  };

  const addDistrict = (stateIdx: number) => {
    setForm((prev) => ({ ...prev, districts: [...prev.districts, ""] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-[#0F2340]" />
            <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Create New Acquisition Project</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {ORG_PROFILE.name} — Multi-step project creation wizard
          </p>
        </div>
      </div>

      {/* Step indicator */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {STEPS.map((s, idx) => (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => setStep(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                    step === s.id
                      ? "bg-[#0F2340] text-white"
                      : step > s.id
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {step > s.id ? <Check className="h-3 w-3" /> : <s.icon className="h-3 w-3" />}
                  {s.label}
                </button>
                {idx < STEPS.length - 1 && <ChevronRight className="h-4 w-4 text-slate-400 mx-1 shrink-0" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step content */}
      <Card>
        <CardContent className="p-6">
          {/* Step 1 — Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-[#0F2340]">Step 1 — Basic Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-700">Project Name *</label>
                  <Input
                    placeholder="e.g., NH-544 Pune–Satara Expansion"
                    value={form.projectName}
                    onChange={(e) => updateForm("projectName", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-700">Project Code *</label>
                  <Input
                    placeholder="e.g., NH-544-PUNE"
                    value={form.projectCode}
                    onChange={(e) => updateForm("projectCode", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-700">Sector *</label>
                  <select
                    value={form.sector}
                    onChange={(e) => updateForm("sector", e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select sector</option>
                    {SECTORS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-700">Estimated Project Cost (₹ Cr)</label>
                  <Input
                    placeholder="e.g., 4200"
                    value={form.estimatedCost}
                    onChange={(e) => updateForm("estimatedCost", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-slate-700">Project Purpose *</label>
                <Input
                  placeholder="e.g., Road widening and corridor development"
                  value={form.purpose}
                  onChange={(e) => updateForm("purpose", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-slate-700">Description</label>
                <textarea
                  placeholder="Detailed description of the project..."
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
                />
              </div>
              <div className="bg-slate-50 rounded-md p-3 text-[11px] text-muted-foreground">
                <p className="font-medium text-slate-700">Implementing Agency</p>
                <p>{ORG_PROFILE.name} ({ORG_PROFILE.code})</p>
              </div>
            </div>
          )}

          {/* Step 2 — Land Requirement */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-[#0F2340]">Step 2 — Land Requirement</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-700">Total Estimated Land (Ha)</label>
                  <Input
                    placeholder="e.g., 842"
                    value={form.estimatedLandHa}
                    onChange={(e) => updateForm("estimatedLandHa", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-700">Estimated Number of Parcels</label>
                  <Input
                    placeholder="e.g., 1284"
                    value={form.estimatedParcels}
                    onChange={(e) => updateForm("estimatedParcels", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-700">Land Type</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="mixed">Mixed</option>
                    <option value="agricultural">Agricultural</option>
                    <option value="commercial">Commercial</option>
                    <option value="residential">Residential</option>
                    <option value="forest">Forest</option>
                    <option value="government">Government</option>
                  </select>
                </div>
              </div>

              {/* State/District tree */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium text-slate-700">Target States & Districts</label>
                  <Button variant="outline" size="sm" onClick={addState}>+ Add State</Button>
                </div>
                <div className="bg-slate-50 rounded-md p-4 space-y-3">
                  {form.states.length === 0 ? (
                    <p className="text-[11px] text-muted-foreground text-center py-4">
                      No states added yet. Click "Add State" to begin.
                    </p>
                  ) : (
                    form.states.map((state, idx) => (
                      <div key={idx} className="border rounded-md bg-white p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-slate-500" />
                          <Input
                            placeholder="State name"
                            value={state}
                            onChange={(e) => {
                              const newStates = [...form.states];
                              newStates[idx] = e.target.value;
                              setForm((prev) => ({ ...prev, states: newStates }));
                            }}
                            className="flex-1"
                          />
                        </div>
                        <div className="ml-6 space-y-1">
                          <Button variant="ghost" size="sm" onClick={() => addDistrict(idx)} className="text-[11px]">
                            + Add District
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                  {form.states.length > 0 && (
                    <div className="bg-blue-50 rounded p-2 text-[11px] text-blue-800">
                      Example: Maharashtra → Pune, Satara
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — GIS Footprint */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-[#0F2340]">Step 3 — GIS Project Footprint</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-700">Geometry Type</label>
                  <select
                    value={form.geometryType}
                    onChange={(e) => updateForm("geometryType", e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="corridor">Linear / Corridor Project</option>
                    <option value="polygon">Area Project (Polygon)</option>
                  </select>
                </div>
                {form.geometryType === "corridor" && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-slate-700">Corridor Width (m)</label>
                    <Input
                      placeholder="e.g., 100"
                      value={form.corridorWidth}
                      onChange={(e) => updateForm("corridorWidth", e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* GIS Map placeholder */}
              <div className="border-2 border-dashed border-slate-200 rounded-lg h-[400px] flex flex-col items-center justify-center bg-slate-50">
                <Layers className="h-12 w-12 text-slate-400 mb-3" />
                <p className="text-sm font-medium text-slate-700">GIS Project Footprint</p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Draw project boundary on map to generate footprint
                </p>
                <div className="flex gap-2 mt-4">
                  {form.geometryType === "corridor" ? (
                    <>
                      <Button variant="outline" size="sm">Add Checkpoint</Button>
                      <Button size="sm">Generate Footprint</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm">Draw Polygon</Button>
                      <Button variant="outline" size="sm">Rectangle</Button>
                      <Button variant="outline" size="sm">Circle</Button>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 rounded-md p-3 text-[11px] text-blue-800">
                <p className="font-medium">GIS Footprint Controls</p>
                <ul className="mt-1 space-y-0.5">
                  {form.geometryType === "corridor" ? (
                    <>
                      <li>• Add checkpoint along route centerline</li>
                      <li>• Define corridor width (default 100m)</li>
                      <li>• Generate footprint polygon</li>
                    </>
                  ) : (
                    <>
                      <li>• Draw custom polygon on map</li>
                      <li>• Or use rectangle/circle tools</li>
                      <li>• Footprint will intersect with parcel boundaries</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Step 4 — Parcel Identification */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-[#0F2340]">Step 4 — Preliminary Parcel Identification</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-[11px] text-amber-800">
                <p className="font-medium">⚠ Preliminary Parcel Identification</p>
                <p className="mt-0.5">This is a preliminary GIS intersection result. It does NOT constitute final legal acquisition. All parcels require verification by the appropriate authorities.</p>
              </div>

              {/* Intersection result */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold text-[#0F2340] mb-2">GIS Intersection Result</h3>
                  <p className="text-[11px] text-muted-foreground mb-3">
                    <span className="font-medium text-slate-700">1,284 parcels</span> intersect project footprint
                  </p>
                  <div className="bg-slate-50 rounded-md p-3 text-[11px] space-y-1">
                    <p className="font-medium text-slate-700">Maharashtra</p>
                    <div className="ml-4 space-y-0.5">
                      <div className="flex justify-between">
                        <span>Pune</span>
                        <span className="font-medium">842 parcels</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Satara</span>
                        <span className="font-medium">442 parcels</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Parcel table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-slate-50">
                          <th className="px-4 py-3 text-left font-medium text-slate-700">ULPIN</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-700">Survey No</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-700">Village</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-700">District</th>
                          <th className="px-4 py-3 text-center font-medium text-slate-700">Area (Ha)</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-700">Owner</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-700">Classification</th>
                          <th className="px-4 py-3 text-center font-medium text-slate-700">Intersection</th>
                          <th className="px-4 py-3 text-center font-medium text-slate-700">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { ulpin: "MH-PN-HAV-001", survey: "33/4A", village: "Haveli", district: "Pune", area: 2.4, owner: "Shri. R. Patil", classification: "Agricultural", intersection: 85 },
                          { ulpin: "MH-PN-HAV-002", survey: "33/4B", village: "Haveli", district: "Pune", area: 1.8, owner: "Smt. S. Patil", classification: "Agricultural", intersection: 72 },
                          { ulpin: "MH-PN-MUL-003", survey: "15/8", village: "Mulshi", district: "Pune", area: 3.2, owner: "Shri. V. Kamble", classification: "Agricultural", intersection: 92 },
                          { ulpin: "MH-PN-VEL-004", survey: "7/2A", village: "Velhe", district: "Pune", area: 1.5, owner: "Shri. M. Jadhav", classification: "Agricultural", intersection: 68 },
                          { ulpin: "MH-ST-SAT-005", survey: "22/1", village: "Satara", district: "Satara", area: 4.1, owner: "Shri. K. Bhosale", classification: "Agricultural", intersection: 78 },
                        ].map((p) => (
                          <tr key={p.ulpin} className="border-b last:border-0 hover:bg-slate-50/50">
                            <td className="px-4 py-3 font-mono text-[11px] text-slate-600">{p.ulpin}</td>
                            <td className="px-4 py-3 text-[11px]">{p.survey}</td>
                            <td className="px-4 py-3 text-[11px]">{p.village}</td>
                            <td className="px-4 py-3 text-[11px]">{p.district}</td>
                            <td className="px-4 py-3 text-center text-[11px]">{p.area}</td>
                            <td className="px-4 py-3 text-[11px]">{p.owner}</td>
                            <td className="px-4 py-3 text-[11px]">{p.classification}</td>
                            <td className="px-4 py-3 text-center text-[11px]">{p.intersection}%</td>
                            <td className="px-4 py-3 text-center">
                              <Button variant="ghost" size="sm" className="text-[11px]">Select</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">Exclude Selected</Button>
                <Button variant="outline" size="sm">View on Map</Button>
              </div>
            </div>
          )}

          {/* Step 5 — Stakeholders */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-[#0F2340]">Step 5 — Project Stakeholders</h2>
              <p className="text-[11px] text-muted-foreground">
                Review and assemble the stakeholder team for this project. Suggested stakeholders are shown based on the target jurisdictions.
              </p>

              {/* Stakeholder groups */}
              {[
                { level: "Central / Ministry", stakeholders: [
                  { name: "Shri. Rajiv Malhotra, IAS", role: "Ministry Nodal Officer", org: "MoRTH" },
                ]},
                { level: "State", stakeholders: [
                  { name: "Shri. R. K. Sable, IAS", role: "State Nodal Officer", org: "Revenue Dept., Maharashtra" },
                ]},
                { level: "District", stakeholders: [
                  { name: "Dr. Suhas Diwase, IAS", role: "District Collector / CALA", org: "Collectorate, Pune" },
                  { name: "Dr. Priya Sharma, IAS", role: "District Collector / CALA", org: "Collectorate, Satara" },
                ]},
                { level: "Tehsil", stakeholders: [
                  { name: "Smt. Kavita Patil", role: "Tehsil Officer / SDO", org: "Tehsil Office, Haveli" },
                ]},
                { level: "Field", stakeholders: [
                  { name: "Shri. M. Kamble", role: "Field Officer / VAO", org: "Tehsil Office, Haveli" },
                ]},
                { level: "SIA / R&R", stakeholders: [
                  { name: "Prof. S. Mishra", role: "SIA Expert", org: "SIA Expert Group" },
                  { name: "Smt. Asha Khedkar", role: "R&R Officer", org: "Revenue Dept., Pune" },
                ]},
              ].map((group) => (
                <div key={group.level}>
                  <h3 className="text-[11px] font-medium text-muted-foreground mb-2">{group.level}</h3>
                  <div className="grid gap-2 md:grid-cols-2">
                    {group.stakeholders.map((s) => (
                      <div key={s.name} className="border rounded-md p-3 bg-white">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F2340] text-white text-[10px] font-semibold shrink-0">
                            {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-[#0F2340]">{s.name}</p>
                            <p className="text-[10px] text-muted-foreground">{s.role} — {s.org}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 rounded-md p-3 text-[11px] text-blue-800">
                <p className="font-medium">Stakeholder Assembly</p>
                <p className="mt-0.5">Stakeholders are suggested based on target jurisdictions. You can add authorized stakeholders or remove proposed ones. Arbitrary role assignment outside the authorized hierarchy is not permitted.</p>
              </div>

              <Button variant="outline" size="sm">+ Add Authorized Stakeholder</Button>
            </div>
          )}

          {/* Step 6 — Review & Submit */}
          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-[#0F2340]">Step 6 — Review & Submit</h2>

              {/* Project summary */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-md p-4">
                  <h3 className="text-[11px] font-medium text-muted-foreground mb-2">Project</h3>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-600">Name</span><span className="font-medium">{form.projectName || "NH-544 Pune–Satara Expansion"}</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Code</span><span className="font-medium">{form.projectCode || "NH-544-PUNE"}</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Sector</span><span className="font-medium">{form.sector || "Highways"}</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Purpose</span><span className="font-medium">{form.purpose || "Road widening and corridor development"}</span></div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="text-[11px] font-medium text-muted-foreground mb-2">Geography</h3>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-600">States</span><span className="font-medium">Maharashtra</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Districts</span><span className="font-medium">Pune, Satara</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Geometry</span><span className="font-medium">Corridor (100m width)</span></div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="text-[11px] font-medium text-muted-foreground mb-2">Land</h3>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-600">Estimated Area</span><span className="font-medium">842 Ha</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Parcel Count</span><span className="font-medium">1,284</span></div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="text-[11px] font-medium text-muted-foreground mb-2">Stakeholders</h3>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-600">Organizations</span><span className="font-medium">NHAI, MoRTH</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Authorities</span><span className="font-medium">6 positions</span></div>
                  </div>
                </div>
              </div>

              {/* Validation checklist */}
              <div className="border rounded-md p-4 bg-emerald-50">
                <h3 className="text-[11px] font-medium text-emerald-800 mb-2">Validation</h3>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-2 text-emerald-700"><Check className="h-3 w-3" /> Required project information</div>
                  <div className="flex items-center gap-2 text-emerald-700"><Check className="h-3 w-3" /> GIS footprint defined</div>
                  <div className="flex items-center gap-2 text-emerald-700"><Check className="h-3 w-3" /> Target jurisdictions selected</div>
                  <div className="flex items-center gap-2 text-emerald-700"><Check className="h-3 w-3" /> Stakeholder structure assembled</div>
                </div>
              </div>

              {/* Submission warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-[11px] text-amber-800">
                <p className="font-medium">⚠ Before Submission</p>
                <p className="mt-0.5">Once submitted, the project enters the statutory acquisition workflow. Further statutory actions are performed by the appropriate authorities (District Collector / CALA, SIA Expert, Field Officer, etc.).</p>
              </div>

              <Button size="sm" onClick={() => navigate("/app/ro/projects")}>
                Submit for Scrutiny
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        <Button
          size="sm"
          onClick={() => setStep((s) => Math.min(STEPS.length, s + 1))}
          disabled={step === STEPS.length}
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
