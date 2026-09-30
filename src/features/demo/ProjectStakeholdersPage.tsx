import { StatusBadge } from "@/components/ui/StatusBadge";

// ═══════════════════════════════════════════════════════════════════════
// ProjectStakeholdersPage — key stakeholders for the project
// ═══════════════════════════════════════════════════════════════════════

const STAKEHOLDERS = [
  { name: "Shri. K. Venkataramanaiah", role: "Requiring Organisation", org: "NHAI / Demo IA", status: "active" as const },
  { name: "Smt. Priya Sharma", role: "District Collector / CALA", org: "Bengaluru Urban", status: "active" as const },
  { name: "Dr. Anand Rao", role: "SIA Expert Group", org: "Independent Panel", status: "active" as const },
  { name: "Shri. Mahesh J.", role: "Field Officer / VAO", org: "Anekal Tahsil", status: "active" as const },
  { name: "Smt. R. Kulkarni", role: "Finance Officer", org: "District Treasury", status: "active" as const },
  { name: "Smt. Anjali B.", role: "R&R Officer", org: "Bengaluru Urban", status: "active" as const },
];

export default function ProjectStakeholdersPage() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-[#0F2340]">Project Stakeholders</h3>
      <div className="border rounded-lg bg-white shadow-sm divide-y">
        {STAKEHOLDERS.map((s) => (
          <div key={s.name} className="px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0F2340] text-white flex items-center justify-center text-xs font-bold">
              {s.name.split(" ").pop()?.[0] ?? "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800">{s.name}</p>
              <p className="text-[10px] text-slate-500">{s.role} · {s.org}</p>
            </div>
            <StatusBadge status={s.status} size="xs" />
          </div>
        ))}
      </div>
    </div>
  );
}
