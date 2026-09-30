import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CLARIFICATIONS } from "./siaExpertData";
import { ArrowLeft, Send } from "lucide-react";

const statusColors: Record<string, string> = {
  open: "bg-red-100 text-red-800",
  in_progress: "bg-amber-100 text-amber-800",
  responded: "bg-blue-100 text-blue-800",
  closed: "bg-green-100 text-green-800",
};

const priorityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800",
};

export default function SiaClarificationsPage() {
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");
  const [clarifications, setClarifications] = useState(CLARIFICATIONS);

  const handleRespond = () => {
    if (!respondingTo || !responseText) return;
    setClarifications(clarifications.map((c) =>
      c.id === respondingTo ? { ...c, status: "responded" as const, response: responseText, respondedDate: "09 Sep 2026" } : c
    ));
    setRespondingTo(null);
    setResponseText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/app/sia/workspace/SIA-2026-0042" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
        <h1 className="text-2xl font-bold text-[#0F2340]">Clarification Requests</h1>
        <p className="text-sm text-muted-foreground mt-1">{clarifications.filter((c) => c.status === "open" || c.status === "in_progress").length} open requests</p>
      </div>

      <div className="space-y-4">
        {clarifications.map((c) => (
          <Card key={c.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#0F2340]">{c.id}</h3>
                    <Badge className={`text-xs ${statusColors[c.status]}`}>{c.status.replace("_", " ")}</Badge>
                    <Badge className={`text-xs ${priorityColors[c.priority]}`}>{c.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">From: {c.requestedBy}</p>
                  <p className="text-sm text-muted-foreground">Date: {c.date} | Due: {c.dueDate}</p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-sm mb-3">{c.question}</div>
              <p className="text-xs text-muted-foreground mb-3">Section: {c.affectedSection}</p>

              {c.response && (
                <div className="p-3 bg-blue-50 rounded-lg text-sm mb-3">
                  <span className="font-medium">Response ({c.respondedDate}): </span>{c.response}
                </div>
              )}

              {c.status === "open" && (
                <div className="mt-4">
                  {respondingTo === c.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        className="w-full p-3 border rounded-lg text-sm"
                        rows={3}
                        placeholder="Enter your response..."
                      />
                      <div className="flex gap-2">
                        <button onClick={() => { setRespondingTo(null); setResponseText(""); }} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                          Cancel
                        </button>
                        <button onClick={handleRespond} className="bg-[#1B5E20] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#2E7D32]">
                          <Send className="h-4 w-4" /> Submit Response
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setRespondingTo(c.id)} className="bg-[#1B5E20] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#2E7D32]">
                      <Send className="h-4 w-4" /> Respond
                    </button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
