import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CITIZEN_NOTICES } from "./citizenData";
import { ArrowLeft, Download, Printer, Share2, FileText } from "lucide-react";

export default function CitizenNoticeDetailPage() {
  const { noticeId } = useParams<{ noticeId: string }>();
  const notice = CITIZEN_NOTICES.find((n) => n.noticeId === noticeId);

  if (!notice) {
    return (
      <div className="space-y-4">
        <div className="bg-amber-100 border border-amber-300 rounded-md px-4 py-2 text-center text-sm font-medium text-amber-800">
          MOCK / SANDBOX
        </div>
        <Card>
          <CardContent className="py-12 text-center text-slate-500">
            Notice not found.
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

      <Link to="/citizen/notices" className="inline-flex items-center gap-1 text-sm text-[#0F2340] hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to Notices
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg text-[#0F2340]">{notice.title}</CardTitle>
            <Badge variant="outline" className="text-[9px] shrink-0">
              {notice.type.replace(/_/g, " ")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-slate-500">Reference Number</span>
              <p className="font-medium">{notice.referenceNo}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Authority</span>
              <p className="font-medium">{notice.authority}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Project</span>
              <p className="font-medium">{notice.project}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Village / District</span>
              <p className="font-medium">{notice.village}, {notice.district}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Publication Date</span>
              <p className="font-medium">{notice.publicationDate}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Effective Date</span>
              <p className="font-medium">{notice.effectiveDate}</p>
            </div>
            {notice.objectionDeadline && (
              <div>
                <span className="text-xs text-slate-500">Objection Deadline</span>
                <p className="font-medium text-amber-600">{notice.objectionDeadline}</p>
              </div>
            )}
          </div>

          <div>
            <span className="text-xs font-medium text-slate-500">Affected Villages</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {notice.affectedVillages.map((v) => (
                <Badge key={v} variant="secondary" className="text-[10px]">{v}</Badge>
              ))}
            </div>
          </div>

          <div className="bg-slate-100 border border-slate-200 rounded-md p-6 flex flex-col items-center justify-center gap-3 min-h-[200px]">
            <FileText className="h-12 w-12 text-slate-300" />
            <p className="text-sm text-slate-400">{notice.documentName}</p>
            <p className="text-xs text-slate-400">Document preview — MOCK / SANDBOX</p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">{notice.description}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="outline" size="sm" disabled>
              <Download className="h-4 w-4" /> Download — Mock
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
