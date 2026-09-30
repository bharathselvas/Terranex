import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ASSET_RECORDS } from "./fieldOfficerData";
import { ArrowLeft, TreePine, Home, Droplets, Edit } from "lucide-react";

const assetIcons: Record<string, typeof TreePine> = { tree: TreePine, structure: Home, well: Droplets, other: TreePine };
const assetColors: Record<string, string> = { tree: "bg-emerald-100 text-emerald-800", structure: "bg-purple-100 text-purple-800", well: "bg-blue-100 text-blue-800", other: "bg-gray-100 text-gray-700" };

export default function FoAssetsPage() {
  const { taskId } = useParams();
  const assets = ASSET_RECORDS;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/fo/visit/${taskId ?? "ft-001"}`} className="rounded-lg border p-2 hover:bg-gray-50"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-xl font-bold text-[#0F2340]">Asset Verification</h1>
          <p className="text-sm text-muted-foreground">{assets.length} assets recorded</p>
        </div>
      </div>

      <button className="w-full rounded-lg border-2 border-dashed border-[#0F2340] bg-[#0F2340]/5 px-4 py-3 text-sm font-medium text-[#0F2340] hover:bg-[#0F2340]/10">+ Add Asset</button>

      <div className="space-y-3">
        {assets.map((a) => {
          const Icon = assetIcons[a.assetType] ?? TreePine;
          return (
            <Card key={a.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${assetColors[a.assetType]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F2340]">{a.subType}</p>
                      <div className="mt-1 space-y-0.5">
                        <p className="text-xs text-muted-foreground">Type: {a.assetType}</p>
                        <p className="text-xs text-muted-foreground">Quantity: {a.quantity}</p>
                        <p className="text-xs text-muted-foreground">Condition: {a.condition}</p>
                        {a.dimensions && <p className="text-xs text-muted-foreground">Dimensions: {a.dimensions}</p>}
                        <p className="text-xs text-muted-foreground">{a.remarks}</p>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800">{a.photosCount} photos</Badge>
                        {a.gpsVerified && <Badge className="bg-emerald-100 text-emerald-800">GPS Verified</Badge>}
                      </div>
                    </div>
                  </div>
                  <button className="rounded border p-1.5 hover:bg-gray-50"><Edit className="h-3.5 w-3.5 text-[#0F2340]" /></button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
