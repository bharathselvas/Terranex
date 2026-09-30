import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Smartphone, FileText, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCitizenSession } from "./citizenSessionStore";

export default function CitizenLoginPage() {
  const navigate = useNavigate();
  const login = useCitizenSession((s) => s.login);
  const [mobile] = useState("******4821");
  const [otp, setOtp] = useState("");
  const [caseRef, setCaseRef] = useState("LA-2026-00421");
  const [verCode, setVerCode] = useState("");

  const handleMobileLogin = () => {
    login(mobile);
    navigate("/citizen/my-case");
  };

  const handleCaseLogin = () => {
    login(mobile);
    navigate("/citizen/my-case");
  };

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 flex items-center gap-2 text-amber-800 text-xs font-medium">
        <AlertTriangle className="h-4 w-4" />
        SANDBOX — Use demo credentials shown below
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-[#0F2340]">Landowner Access</h1>
        <p className="text-muted-foreground">
          Access your land acquisition case securely.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="mobile">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="mobile" className="flex-1">
                <Smartphone className="h-4 w-4" />
                Mobile + OTP
              </TabsTrigger>
              <TabsTrigger value="case" className="flex-1">
                <FileText className="h-4 w-4" />
                Case Reference
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mobile" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" value={mobile} readOnly className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password (OTP)</Label>
                <Input
                  id="otp"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-md px-3 py-2 text-xs text-blue-800 flex items-center gap-2">
                <Shield className="h-3.5 w-3.5" />
                Demo OTP: <span className="font-mono font-bold">123456</span>
              </div>
              <Button onClick={handleMobileLogin} className="w-full">
                Verify & Login
              </Button>
            </TabsContent>

            <TabsContent value="case" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="case-ref">Case Reference</Label>
                <Input
                  id="case-ref"
                  value={caseRef}
                  onChange={(e) => setCaseRef(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ver-code">Verification Code</Label>
                <Input
                  id="ver-code"
                  placeholder="DEMO"
                  value={verCode}
                  onChange={(e) => setVerCode(e.target.value)}
                />
              </div>
              <Button onClick={handleCaseLogin} className="w-full">
                Verify
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
