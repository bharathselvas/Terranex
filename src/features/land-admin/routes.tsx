// ═══════════════════════════════════════════════════════════════════════
// Terranex — Land Administration · Route table
// Mounted at /land-admin by the app router. Kept in its own file so the
// module can be lifted out, or promoted to the root, without touching the
// main router's other 283 routes.
// ═══════════════════════════════════════════════════════════════════════

import { Route, Routes } from "react-router-dom";
import { LandAdminShell } from "./components/LandAdminShell";
import { DashboardPage } from "./pages/DashboardPage";
import { CasesPage } from "./pages/CasesPage";
import { CaseDetailPage } from "./pages/CaseDetailPage";
import { GisPage } from "./pages/GisPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import {
  AcquisitionPage,
  AdministrationPage,
  CompensationPage,
  DocumentsPage,
  RnrPage,
} from "./pages/RegistersPage";

export function LandAdminRoutes() {
  return (
    <Routes>
      <Route element={<LandAdminShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="cases" element={<CasesPage />} />
        <Route path="cases/:caseId" element={<CaseDetailPage />} />
        <Route path="gis" element={<GisPage />} />
        <Route path="acquisition" element={<AcquisitionPage />} />
        <Route path="rnr" element={<RnrPage />} />
        <Route path="compensation" element={<CompensationPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="administration" element={<AdministrationPage />} />
        {/* Unknown sub-paths land on the district overview rather than a blank page. */}
        <Route path="*" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}
