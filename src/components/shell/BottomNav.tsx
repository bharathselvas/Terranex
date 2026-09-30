import { NavLink } from "react-router-dom";
import { Home, Briefcase, Map, Bell, Menu } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// BottomNav — mobile bottom navigation for internal government users
// ═══════════════════════════════════════════════════════════════════════

const NAV_ITEMS = [
  { label: "Home", icon: Home, path: "/app/overview" },
  { label: "Projects", icon: Briefcase, path: "/app/ro/projects" },
  { label: "Map", icon: Map, path: "/app/gis" },
  { label: "Alerts", icon: Bell, path: "/app/notifications" },
  { label: "Menu", icon: Menu, path: "/app/overview" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t lg:hidden safe-area-inset-bottom">
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path + item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 ${
                isActive ? "text-[#0F2340]" : "text-slate-400"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
