import { Outlet } from "react-router-dom";
import { GovtMasthead } from "./GovtMasthead";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { DemoControls } from "@/features/demo/DemoControls";

export function AppShell() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <GovtMasthead />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 pb-16 lg:pb-0">
          <div className="mx-auto max-w-[1600px] p-4 sm:p-5 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <BottomNav />
      <DemoControls />
    </div>
  );
}
