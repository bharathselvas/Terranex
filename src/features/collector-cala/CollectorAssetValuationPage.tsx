import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMPENSATION_DATA } from "./districtCollectorData";

const formatINR = (n: number) => `₹${(n / 100000).toFixed(2)}L`;

export default function CollectorAssetValuationPage() {
  const withAssets = COMPENSATION_DATA.filter((c) => c.assets.length > 0);
  const totalAssets = withAssets.reduce((sum, c) => sum + c.assetsValue, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F2340]">Asset Valuation</h1>
        <p className="text-sm text-muted-foreground">Cross-reference compensation with identified assets</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><p className="text-2xl font-bold text-[#0F2340]">{withAssets.length}</p><p className="text-xs text-muted-foreground">Parcels with Assets</p></div>
            <div><p className="text-2xl font-bold text-amber-700">{withAssets.reduce((sum, c) => sum + c.assets.length, 0)}</p><p className="text-xs text-muted-foreground">Total Assets</p></div>
            <div><p className="text-2xl font-bold text-emerald-700">{formatINR(totalAssets)}</p><p className="text-xs text-muted-foreground">Total Asset Value</p></div>
          </div>
        </CardContent>
      </Card>

      {withAssets.map((c) => (
        <Card key={c.parcelId} className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#0F2340]">{c.landowner} — {c.parcelId}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{c.village} &middot; {c.areaHa} ha &middot; {c.landClassification}</p>
              <p className="text-sm font-bold text-[#0F2340]">{formatINR(c.indicativeCompensation)}</p>
            </div>
            <div className="space-y-1">
              {c.assets.map((a, i) => (
                <div key={i} className="flex items-center justify-between rounded border p-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium">{a.type}</span>
                    <span className="text-[10px] text-muted-foreground">&times; {a.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">{formatINR(a.value)}</span>
                    <Badge className={a.evidence ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}>
                      {a.evidence ? "Verified" : "No Evidence"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
