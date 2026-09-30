import React, { useState } from "react";
import { useDemoStore } from "../demo/demoStore";
import { STAGE_LABELS, STAGE_GATES } from "../demo/workflowTypes";
import type { DemoAuditEvent } from "../demo/demoData";

// ═══════════════════════════════════════════════════════════════════════
// AuditTimeline — shared audit trail for all roles
// Filterable by stage, actor, date range
// ═══════════════════════════════════════════════════════════════════════

export function AuditTimeline() {
  const { audit } = useDemoStore();
  const [filterStage, setFilterStage] = useState<string>("all");
  const [filterText, setFilterText] = useState("");

  const filtered = audit.filter((event) => {
    if (filterStage !== "all" && event.stage !== filterStage) return false;
    if (filterText) {
      const q = filterText.toLowerCase();
      return (
        event.actor.toLowerCase().includes(q) ||
        event.action.toLowerCase().includes(q) ||
        event.entity.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => b.id.localeCompare(a.id));

  return (
    <div className="space-y-3">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
          className="text-xs border rounded px-2 py-1 bg-white"
        >
          <option value="all">All stages</option>
          {["proposal","requirement","gis_identification","submission","scrutiny","sia","section_11","disclosure","objections","section_19","field_verification","compensation","award","payment","possession","r_and_r","closed"].map((s) => (
            <option key={s} value={s}>{STAGE_LABELS[s as keyof typeof STAGE_LABELS]}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search events..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="text-xs border rounded px-2 py-1 w-48"
        />
        <span className="text-[10px] text-slate-500">
          {sorted.length} event{sorted.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />

        <div className="space-y-1">
          {sorted.map((event) => (
            <AuditEventRow key={event.id} event={event} />
          ))}
          {sorted.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-6">No audit events found</p>
          )}
        </div>
      </div>
    </div>
  );
}

function AuditEventRow({ event }: { event: DemoAuditEvent }) {
  const isSystem = event.actor === "System" || event.actor.startsWith("System (");
  const isCitizen = event.role.includes("Citizen");
  const isFailure = event.action.toUpperCase().includes("FAIL") || event.action.toUpperCase().includes("REJECT");

  return (
    <div className="flex gap-3 items-start pl-2">
      {/* Dot */}
      <div
        className={`w-3 h-3 rounded-full border-2 mt-1.5 shrink-0 z-10 ${
          isSystem
            ? "bg-slate-300 border-slate-400"
            : isCitizen
              ? "bg-amber-300 border-amber-400"
              : isFailure
                ? "bg-red-400 border-red-500"
                : "bg-emerald-400 border-emerald-500"
        }`}
      />
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">{event.timestamp}</span>
          <span className="text-xs font-semibold text-slate-800 truncate">{event.actor}</span>
          <span className="text-[10px] text-slate-500">({event.role})</span>
        </div>
        <p className="text-xs text-slate-700 mt-0.5">{event.action}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-slate-500">Entity: {event.entity}</span>
          {event.previousState && (
            <span className="text-[10px] text-slate-400">
              {event.previousState} → {event.newState}
            </span>
          )}
          {!event.previousState && (
            <span className="text-[10px] text-slate-400">→ {event.newState}</span>
          )}
          <span className="text-[10px] text-slate-400 bg-slate-100 px-1 rounded">
            {STAGE_LABELS[event.stage]}
          </span>
        </div>
      </div>
    </div>
  );
}
