import { useState } from "react";
import {
  FileText,
  Download,
  FileSpreadsheet,
  BarChart3,
  Filter,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REPORTS } from "@/features/admin/adminData";

const CATEGORIES = [...new Set(REPORTS.map((r) => r.category))];

export function ReportsPage() {
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = REPORTS.filter((r) => {
    if (categoryFilter !== "all" && r.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F2340]">Reports & MIS</h1>
          <p className="text-xs text-muted-foreground">Generate and export national acquisition reports</p>
        </div>
      </div>

      {/* Filter controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="h-4 w-4" /> Filters:
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px] h-9 text-sm">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="mh">Maharashtra</SelectItem>
                <SelectItem value="mp">Madhya Pradesh</SelectItem>
                <SelectItem value="od">Odisha</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px] h-9 text-sm">
                <SelectValue placeholder="Ministry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ministries</SelectItem>
                <SelectItem value="morth">MoRTH</SelectItem>
                <SelectItem value="railways">Railways</SelectItem>
                <SelectItem value="jal-shakti">Jal Shakti</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] h-9 text-sm">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="sia">SIA</SelectItem>
                <SelectItem value="compensation">Compensation</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 text-xs">
                <Calendar className="h-3.5 w-3.5 mr-1" /> Date Range
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category tabs */}
      <div className="flex gap-2">
        <Button
          variant={categoryFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategoryFilter("all")}
          className="h-8 text-xs"
        >
          All Reports
        </Button>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={categoryFilter === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter(cat)}
            className="h-8 text-xs"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Report Cards */}
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((report) => (
          <Card key={report.id} className="transition-colors hover:bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F2340]/5 shrink-0">
                    <BarChart3 className="h-5 w-5 text-[#0F2340]" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#0F2340]">{report.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{report.description}</p>
                    <Badge variant="secondary" className="text-[10px] mt-1">{report.category}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t">
                <Button variant="default" size="sm" className="flex-1 h-8 text-[11px]">
                  <FileText className="h-3 w-3 mr-1" /> Generate Report
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-[11px]">
                  <Download className="h-3 w-3 mr-1" /> PDF
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-[11px]">
                  <FileSpreadsheet className="h-3 w-3 mr-1" /> Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
