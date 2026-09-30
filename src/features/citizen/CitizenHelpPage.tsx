import { useState } from "react";
import { AlertTriangle, Building2, MapPin, Phone, Clock, ChevronDown, ChevronRight, Accessibility } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FAQ_ITEMS } from "./citizenData";

export default function CitizenHelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 flex items-center gap-2 text-amber-800 text-xs font-medium">
        <AlertTriangle className="h-4 w-4" />
        MOCK / SANDBOX — Contact details shown are for demonstration only
      </div>

      <div>
        <h1 className="text-3xl font-bold text-[#0F2340]">Help & Support</h1>
        <p className="text-muted-foreground mt-1">
          Information about the land acquisition process and support contacts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#0F2340] flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Department Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium">Department of Land Resources</p>
            <p className="text-muted-foreground">Ministry of Rural Development</p>
            <p className="text-muted-foreground">Government of India</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#0F2340] flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              District Authority
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium">District Collector, Jalna</p>
            <p className="text-muted-foreground">Demo Contact — Not a real office</p>
            <Badge variant="muted">Demo</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#0F2340] flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Helpline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium text-lg">1800-XXX-XXXX</p>
            <p className="text-muted-foreground">Demo helpline — Not operational</p>
            <Badge variant="muted">Demo</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#0F2340] flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Office Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium">Monday – Saturday</p>
            <p className="text-muted-foreground">10:00 AM – 5:00 PM</p>
            <p className="text-xs text-muted-foreground">Closed on Sundays and public holidays</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#0F2340]">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {FAQ_ITEMS.map((faq, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                <span>{faq.question}</span>
                {openFaq === i ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-sm text-muted-foreground border-t">
                  <p className="pt-3">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-[#0F2340]/20 bg-[#0F2340]/5">
        <CardContent className="p-6 flex items-start gap-3">
          <Accessibility className="h-5 w-5 text-[#0F2340] mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-[#0F2340]">Accessibility Information</p>
            <p className="text-muted-foreground mt-1">
              This portal is designed to be accessible to all users. If you have difficulty accessing any information
              on this website, please contact the district helpline or visit the District Collector's office for
              assistance. The portal supports screen readers and keyboard navigation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
