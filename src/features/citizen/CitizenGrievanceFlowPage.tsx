import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LifeBuoy, CheckCircle2 } from "lucide-react";
import type { GrievanceCategory } from "./citizenData";

const CATEGORY_OPTIONS: { value: GrievanceCategory; label: string }[] = [
  { value: "status_issue", label: "Status Issue" },
  { value: "document_issue", label: "Document Issue" },
  { value: "payment_issue", label: "Payment Issue" },
  { value: "ownership_discrepancy", label: "Ownership Discrepancy" },
  { value: "field_verification_issue", label: "Field Verification Issue" },
  { value: "rr_issue", label: "R&R Issue" },
  { value: "other", label: "Other" },
];

type Step = "form" | "review" | "submitted";

export default function CitizenGrievanceFlowPage() {
  const [step, setStep] = useState<Step>("form");
  const [category, setCategory] = useState("");
  const [caseRef, setCaseRef] = useState("LA-2026-00421");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");

  const canSubmit = category && caseRef && description && contact;

  if (step === "submitted") {
    return (
      <div className="space-y-6">
        <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
          MOCK / SANDBOX — All data is fictional and for demonstration only
        </div>
        <Card className="border-[#0F7A5A]">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#0F7A5A]/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-[#0F7A5A]" />
            </div>
            <h2 className="text-lg font-bold text-[#0F2340]">Grievance Submitted</h2>
            <p className="text-sm text-muted-foreground">Your grievance has been successfully submitted.</p>
            <div className="max-w-sm mx-auto space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Grievance ID</span>
                <span className="font-medium">GRV-2026-01428</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="info">Submitted</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected Response</span>
                <span className="font-medium">Within 15 working days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
        MOCK / SANDBOX — All data is fictional and for demonstration only
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-[#0F2340] p-2 rounded-lg">
          <LifeBuoy className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Grievance & Support</h1>
          <p className="text-sm text-muted-foreground">Report an issue or request assistance</p>
        </div>
      </div>

      {step === "form" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-[#0F2340]">Submit a Grievance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Case Reference</Label>
              <Input value={caseRef} onChange={(e) => setCaseRef(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your grievance in detail..."
              />
            </div>

            <div className="space-y-2">
              <Label>Supporting Evidence</Label>
              <div className="border-2 border-dashed rounded-md p-4 text-center text-sm text-muted-foreground">
                <p>Drag and drop files here, or click to browse</p>
                <p className="text-xs mt-1">PDF, JPG, PNG (max 5MB) — Mock upload</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Contact Number</Label>
              <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Mobile number" />
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep("review")} disabled={!canSubmit}>
                Review Grievance
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "review" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-[#0F2340]">Review Grievance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium">{CATEGORY_OPTIONS.find((c) => c.value === category)?.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Case Reference</span>
              <span className="font-medium">{caseRef}</span>
            </div>
            <div className="space-y-1 text-sm">
              <span className="text-muted-foreground">Description</span>
              <p className="text-slate-700">{description}</p>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Contact</span>
              <span className="font-medium">{contact}</span>
            </div>
            <div className="flex justify-between gap-2 pt-4">
              <Button variant="outline" onClick={() => setStep("form")}>Back to Edit</Button>
              <Button onClick={() => setStep("submitted")} className="bg-[#0F7A5A] hover:bg-[#0d6a4d] text-white">Submit</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
