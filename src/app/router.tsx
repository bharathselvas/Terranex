import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "@/components/shell/AppShell";
import { RoleGalleryPage } from "@/features/landing/RoleGalleryPage";
import { OverviewPage } from "@/features/overview/OverviewPage";
import { CaseListPage } from "@/features/cases/CaseListPage";
import { CaseDetailPage } from "@/features/cases/CaseDetailPage";
import { GisPage } from "@/features/gis/GisPage";
import { DocumentsPage } from "@/features/documents/DocumentsPage";
import { AuditPage } from "@/features/audit/AuditPage";
import { NotificationsPage } from "@/features/notifications/NotificationsPage";
import { GrievancesPage } from "@/features/grievances/GrievancesPage";
import { AnalyticsPage } from "@/features/analytics/AnalyticsPage";
import { RoleRedirect } from "@/app/RoleRedirect";
import { LandAdminRoutes } from "@/features/land-admin/routes";
import { NationalOverviewPage } from "@/features/admin/NationalOverviewPage";
import { NationalMonitoringPage } from "@/features/admin/NationalMonitoringPage";
import { NationalGisPage } from "@/features/admin/NationalGisPage";
import { RiskDelayMonitorPage } from "@/features/admin/RiskDelayMonitorPage";
import { OrganizationsPage } from "@/features/admin/OrganizationsPage";
import { UsersRolesPage } from "@/features/admin/UsersRolesPage";
import { HierarchyViewPage } from "@/features/admin/HierarchyViewPage";
import { WorkflowConfigPage } from "@/features/admin/WorkflowConfigPage";
import { DocumentRepositoryPage } from "@/features/admin/DocumentRepositoryPage";
import { AuditTrailPage } from "@/features/admin/AuditTrailPage";
import { IntegrationsPage } from "@/features/admin/IntegrationsPage";
import { AlertsPage } from "@/features/admin/AlertsPage";
import { ReportsPage } from "@/features/admin/ReportsPage";
import { ProjectDetailPage } from "@/features/admin/ProjectDetailPage";
import { MinistryOverviewPage } from "@/features/ministry/MinistryOverviewPage";
import { MinistryProjectsPage } from "@/features/ministry/MinistryProjectsPage";
import { MinistryWorkQueuePage } from "@/features/ministry/MinistryWorkQueuePage";
import { MinistryStateMonitoringPage } from "@/features/ministry/MinistryStateMonitoringPage";
import { MinistryGisPage } from "@/features/ministry/MinistryGisPage";
import { MinistryRiskDelayPage } from "@/features/ministry/MinistryRiskDelayPage";
import { MinistryOrgsPage } from "@/features/ministry/MinistryOrgsPage";
import { MinistryStakeholdersPage } from "@/features/ministry/MinistryStakeholdersPage";
import { MinistryRequestsPage } from "@/features/ministry/MinistryRequestsPage";
import { MinistryDocumentsPage } from "@/features/ministry/MinistryDocumentsPage";
import { MinistryObjectionsPage } from "@/features/ministry/MinistryObjectionsPage";
import { MinistryCompensationPage } from "@/features/ministry/MinistryCompensationPage";
import { MinistryPossessionPage } from "@/features/ministry/MinistryPossessionPage";
import { MinistryRnrPage } from "@/features/ministry/MinistryRnrPage";
import { MinistryAuditPage } from "@/features/ministry/MinistryAuditPage";
import { MinistryMisPage } from "@/features/ministry/MinistryMisPage";
import { MinistryNotificationsPage } from "@/features/ministry/MinistryNotificationsPage";
import { MinistryProfilePage } from "@/features/ministry/MinistryProfilePage";
import { ProjectDashboardPage } from "@/features/requiring-org/ProjectDashboardPage";
import { MyProjectsPage } from "@/features/requiring-org/MyProjectsPage";
import { CreateProjectPage } from "@/features/requiring-org/CreateProjectPage";
import { ProjectWorkspacePage } from "@/features/requiring-org/ProjectWorkspacePage";
import { WorkQueuePage } from "@/features/requiring-org/WorkQueuePage";
import { AcquisitionProgressPage } from "@/features/requiring-org/AcquisitionProgressPage";
import { RiskDelayPage } from "@/features/requiring-org/RiskDelayPage";
import { ProjectGisPage } from "@/features/requiring-org/ProjectGisPage";
import { AuthorityRequestsPage } from "@/features/requiring-org/AuthorityRequestsPage";
import { ObjectionsGrievancesPage } from "@/features/requiring-org/ObjectionsGrievancesPage";
import { ProjectDocumentsPage } from "@/features/requiring-org/ProjectDocumentsPage";
import { AuditTrailPage as RoAuditTrailPage } from "@/features/requiring-org/AuditTrailPage";
import { CompensationMonitorPage } from "@/features/requiring-org/CompensationMonitorPage";
import { PossessionMonitorPage } from "@/features/requiring-org/PossessionMonitorPage";
import { RnrMonitorPage } from "@/features/requiring-org/RnrMonitorPage";
import { ProjectReportsPage } from "@/features/requiring-org/ProjectReportsPage";
import { ProjectWorkspace as ProjectWorkspaceShell } from "@/features/demo/ProjectWorkspace";
import ProjectOverviewPage from "@/features/demo/ProjectOverviewPage";
import ProjectWorkflowPage from "@/features/demo/ProjectWorkflowPage";
import ProjectStakeholdersPage from "@/features/demo/ProjectStakeholdersPage";
import ProjectTimelinePage from "@/features/demo/ProjectTimelinePage";
import { ParcelDetail } from "@/features/demo/ParcelDetail";
import { StateOverviewPage } from "@/features/state-nodal/StateOverviewPage";
import { StatePipelinePage } from "@/features/state-nodal/StatePipelinePage";
import { IncomingProjectsPage } from "@/features/state-nodal/IncomingProjectsPage";
import { StateProjectReviewPage } from "@/features/state-nodal/StateProjectReviewPage";
import { DistrictRoutingPage } from "@/features/state-nodal/DistrictRoutingPage";
import { DistrictMonitoringPage } from "@/features/state-nodal/DistrictMonitoringPage";
import { DistrictDetailPage } from "@/features/state-nodal/DistrictDetailPage";
import { StateGisPage } from "@/features/state-nodal/StateGisPage";
import { StateProjectsPage } from "@/features/state-nodal/StateProjectsPage";
import { StatutoryTimelinePage } from "@/features/state-nodal/StatutoryTimelinePage";
import { SiaMonitoringPage } from "@/features/state-nodal/SiaMonitoringPage";
import { NotificationMonitoringPage } from "@/features/state-nodal/NotificationMonitoringPage";
import { ObjectionsMonitoringPage } from "@/features/state-nodal/ObjectionsMonitoringPage";
import { RequestsClarificationsPage } from "@/features/state-nodal/RequestsClarificationsPage";
import { StateDepartmentsPage } from "@/features/state-nodal/StateDepartmentsPage";
import { StateStakeholdersPage } from "@/features/state-nodal/StateStakeholdersPage";
import { StateCompensationPage } from "@/features/state-nodal/StateCompensationPage";
import { StatePossessionPage } from "@/features/state-nodal/StatePossessionPage";
import { StateRnrPage } from "@/features/state-nodal/StateRnrPage";
import { StateRiskDelayPage } from "@/features/state-nodal/StateRiskDelayPage";
import { StateDocumentsPage } from "@/features/state-nodal/StateDocumentsPage";
import { StateAuditPage } from "@/features/state-nodal/StateAuditPage";
import { StateMisPage } from "@/features/state-nodal/StateMisPage";
import { StateNotificationsPage } from "@/features/state-nodal/StateNotificationsPage";
import { StateWorkQueuePage } from "@/features/state-nodal/StateWorkQueuePage";
import { StateProjectWorkspacePage } from "@/features/state-nodal/StateProjectWorkspacePage";
import CollectorOverviewPage from "@/features/collector-cala/CollectorOverviewPage";
import CommandCentrePage from "@/features/collector-cala/CommandCentrePage";
import CollectorWorkQueuePage from "@/features/collector-cala/CollectorWorkQueuePage";
import CollectorIncomingProjectsPage from "@/features/collector-cala/CollectorIncomingProjectsPage";
import CollectorProjectPipelinePage from "@/features/collector-cala/CollectorProjectPipelinePage";
import CollectorProjectWorkspacePage from "@/features/collector-cala/CollectorProjectWorkspacePage";
import CollectorStatutoryTimelinePage from "@/features/collector-cala/CollectorStatutoryTimelinePage";
import CollectorSiaMonitoringPage from "@/features/collector-cala/CollectorSiaMonitoringPage";
import CollectorNotificationManagementPage from "@/features/collector-cala/CollectorNotificationManagementPage";
import CollectorObjectionHearingPage from "@/features/collector-cala/CollectorObjectionHearingPage";
import CollectorDeclarationManagementPage from "@/features/collector-cala/CollectorDeclarationManagementPage";
import CollectorFieldVerificationPage from "@/features/collector-cala/CollectorFieldVerificationPage";
import CollectorCompensationPage from "@/features/collector-cala/CollectorCompensationPage";
import CollectorAwardPage from "@/features/collector-cala/CollectorAwardPage";
import CollectorPaymentPage from "@/features/collector-cala/CollectorPaymentPage";
import CollectorPossessionPage from "@/features/collector-cala/CollectorPossessionPage";
import CollectorRnrPage from "@/features/collector-cala/CollectorRnrPage";
import CollectorGrievancePage from "@/features/collector-cala/CollectorGrievancePage";
import CollectorRiskDelayPage from "@/features/collector-cala/CollectorRiskDelayPage";
import CollectorAssetValuationPage from "@/features/collector-cala/CollectorAssetValuationPage";
import CollectorGisPage from "@/features/collector-cala/CollectorGisPage";
import CollectorTehsilSdoPage from "@/features/collector-cala/CollectorTehsilSdoPage";
import CollectorStakeholdersPage from "@/features/collector-cala/CollectorStakeholdersPage";
import CollectorAuditPage from "@/features/collector-cala/CollectorAuditPage";
import CollectorDocumentsPage from "@/features/collector-cala/CollectorDocumentsPage";
import CollectorReportsPage from "@/features/collector-cala/CollectorReportsPage";
import CollectorNotificationsPage from "@/features/collector-cala/CollectorNotificationsPage";
import CollectorParcelRegisterPage from "@/features/collector-cala/CollectorParcelRegisterPage";
import TehsilOverviewPage from "@/features/tehsil-sdo/TehsilOverviewPage";
import TehsilWorkQueuePage from "@/features/tehsil-sdo/TehsilWorkQueuePage";
import TehsilCriticalCasesPage from "@/features/tehsil-sdo/TehsilCriticalCasesPage";
import TehsilAssignedProjectsPage from "@/features/tehsil-sdo/TehsilAssignedProjectsPage";
import TehsilVillageRegisterPage from "@/features/tehsil-sdo/TehsilVillageRegisterPage";
import TehsilVillageWorkspacePage from "@/features/tehsil-sdo/TehsilVillageWorkspacePage";
import TehsilParcelRegisterPage from "@/features/tehsil-sdo/TehsilParcelRegisterPage";
import TehsilParcelWorkspacePage from "@/features/tehsil-sdo/TehsilParcelWorkspacePage";
import TehsilLandRecordPage from "@/features/tehsil-sdo/TehsilLandRecordPage";
import TehsilOwnershipDiscrepancyPage from "@/features/tehsil-sdo/TehsilOwnershipDiscrepancyPage";
import TehsilFieldOfficerPage from "@/features/tehsil-sdo/TehsilFieldOfficerPage";
import TehsilFieldVerificationPage from "@/features/tehsil-sdo/TehsilFieldVerificationPage";
import TehsilGpsPhotoPage from "@/features/tehsil-sdo/TehsilGpsPhotoPage";
import TehsilFieldDiscrepancyPage from "@/features/tehsil-sdo/TehsilFieldDiscrepancyPage";
import TehsilObjectionSupportPage from "@/features/tehsil-sdo/TehsilObjectionSupportPage";
import TehsilCompensationSupportPage from "@/features/tehsil-sdo/TehsilCompensationSupportPage";
import TehsilPossessionPage from "@/features/tehsil-sdo/TehsilPossessionPage";
import TehsilRnrFieldPage from "@/features/tehsil-sdo/TehsilRnrFieldPage";
import TehsilDistrictRequestsPage from "@/features/tehsil-sdo/TehsilDistrictRequestsPage";
import TehsilVillageCoordinationPage from "@/features/tehsil-sdo/TehsilVillageCoordinationPage";
import TehsilGisPage from "@/features/tehsil-sdo/TehsilGisPage";
import TehsilTimelinePage from "@/features/tehsil-sdo/TehsilTimelinePage";
import TehsilRisksDelaysPage from "@/features/tehsil-sdo/TehsilRisksDelaysPage";
import TehsilDocumentsPage from "@/features/tehsil-sdo/TehsilDocumentsPage";
import TehsilAuditPage from "@/features/tehsil-sdo/TehsilAuditPage";
import TehsilReportsPage from "@/features/tehsil-sdo/TehsilReportsPage";
import TehsilNotificationsPage from "@/features/tehsil-sdo/TehsilNotificationsPage";
import FoHomePage from "@/features/field-officer/FoHomePage";
import FoTasksPage from "@/features/field-officer/FoTasksPage";
import FoTaskDetailPage from "@/features/field-officer/FoTaskDetailPage";
import FoFieldVisitPage from "@/features/field-officer/FoFieldVisitPage";
import FoGpsCapturePage from "@/features/field-officer/FoGpsCapturePage";
import FoPhotoCapturePage from "@/features/field-officer/FoPhotoCapturePage";
import FoPhotoGalleryPage from "@/features/field-officer/FoPhotoGalleryPage";
import FoDocumentsPage from "@/features/field-officer/FoDocumentsPage";
import FoOwnerVerifyPage from "@/features/field-officer/FoOwnerVerifyPage";
import FoAssetsPage from "@/features/field-officer/FoAssetsPage";
import FoMeasurementPage from "@/features/field-officer/FoMeasurementPage";
import FoObservationsPage from "@/features/field-officer/FoObservationsPage";
import FoInteractionPage from "@/features/field-officer/FoInteractionPage";
import FoObjectionEvidencePage from "@/features/field-officer/FoObjectionEvidencePage";
import FoPossessionPage from "@/features/field-officer/FoPossessionPage";
import FoRnrPage from "@/features/field-officer/FoRnrPage";
import FoSubmitPage from "@/features/field-officer/FoSubmitPage";
import FoReportPage from "@/features/field-officer/FoReportPage";
import FoReverificationPage from "@/features/field-officer/FoReverificationPage";
import FoMapPage from "@/features/field-officer/FoMapPage";
import FoCompletedPage from "@/features/field-officer/FoCompletedPage";
import FoPerformancePage from "@/features/field-officer/FoPerformancePage";
import FoNotificationsPage from "@/features/field-officer/FoNotificationsPage";
import FoSyncPage from "@/features/field-officer/FoSyncPage";
import FoAuditPage from "@/features/field-officer/FoAuditPage";
import FoRoleBoundaryPage from "@/features/field-officer/FoRoleBoundaryPage";
import FoOfflinePage from "@/features/field-officer/FoOfflinePage";
// SIA Expert Group
import SiaDashboardPage from "@/features/sia-expert/SiaDashboardPage";
import SiaAssessmentsPage from "@/features/sia-expert/SiaAssessmentsPage";
import SiaWorkQueuePage from "@/features/sia-expert/SiaWorkQueuePage";
import SiaWorkspacePage from "@/features/sia-expert/SiaWorkspacePage";
import SiaProjectContextPage from "@/features/sia-expert/SiaProjectContextPage";
import SiaFamiliesPage from "@/features/sia-expert/SiaFamiliesPage";
import SiaLivelihoodPage from "@/features/sia-expert/SiaLivelihoodPage";
import SiaPublicAssetsPage from "@/features/sia-expert/SiaPublicAssetsPage";
import SiaVulnerablePage from "@/features/sia-expert/SiaVulnerablePage";
import SiaGramSabhaPage from "@/features/sia-expert/SiaGramSabhaPage";
import SiaGramSabhaDetailPage from "@/features/sia-expert/SiaGramSabhaDetailPage";
import SiaPublicConsultationPage from "@/features/sia-expert/SiaPublicConsultationPage";
import SiaStakeholderPage from "@/features/sia-expert/SiaStakeholderPage";
import SiaEvidencePage from "@/features/sia-expert/SiaEvidencePage";
import SiaGisMapPage from "@/features/sia-expert/SiaGisMapPage";
import SiaFindingsPage from "@/features/sia-expert/SiaFindingsPage";
import SiaMitigationPage from "@/features/sia-expert/SiaMitigationPage";
import SiaCompletenessPage from "@/features/sia-expert/SiaCompletenessPage";
import SiaDraftReportPage from "@/features/sia-expert/SiaDraftReportPage";
import SiaSubmissionPage from "@/features/sia-expert/SiaSubmissionPage";
import SiaClarificationsPage from "@/features/sia-expert/SiaClarificationsPage";
import SiaVersionHistoryPage from "@/features/sia-expert/SiaVersionHistoryPage";
import SiaAuditTrailPage from "@/features/sia-expert/SiaAuditTrailPage";
import SiaStatutoryGatePage from "@/features/sia-expert/SiaStatutoryGatePage";
import SiaNotificationsPage from "@/features/sia-expert/SiaNotificationsPage";
import SiaRoleBoundaryPage from "@/features/sia-expert/SiaRoleBoundaryPage";
// R&R Officer
import RrDashboardPage from "@/features/rr-officer/RrDashboardPage";
import RrWorkQueuePage from "@/features/rr-officer/RrWorkQueuePage";
import RrCasesPage from "@/features/rr-officer/RrCasesPage";
import RrCaseWorkspacePage from "@/features/rr-officer/RrCaseWorkspacePage";
import RrFamiliesPage from "@/features/rr-officer/RrFamiliesPage";
import RrVulnerabilityPage from "@/features/rr-officer/RrVulnerabilityPage";
import RrVerificationPage from "@/features/rr-officer/RrVerificationPage";
import RrHousingPage from "@/features/rr-officer/RrHousingPage";
import RrComponentsPage from "@/features/rr-officer/RrComponentsPage";
import RrSitesPage from "@/features/rr-officer/RrSitesPage";
import RrSiteReadinessPage from "@/features/rr-officer/RrSiteReadinessPage";
import RrAllocationPage from "@/features/rr-officer/RrAllocationPage";
import RrFieldCoordinationPage from "@/features/rr-officer/RrFieldCoordinationPage";
import RrEvidencePage from "@/features/rr-officer/RrEvidencePage";
import RrGrievancesPage from "@/features/rr-officer/RrGrievancesPage";
import RrCompletionPage from "@/features/rr-officer/RrCompletionPage";
import RrMisPage from "@/features/rr-officer/RrMisPage";
import RrAuditPage from "@/features/rr-officer/RrAuditPage";
import RrWorkflowPage from "@/features/rr-officer/RrWorkflowPage";
import RrNotificationsPage from "@/features/rr-officer/RrNotificationsPage";
import RrRoleBoundaryPage from "@/features/rr-officer/RrRoleBoundaryPage";
import RrSubsistencePage from "@/features/rr-officer/RrSubsistencePage";
import RrTransportationPage from "@/features/rr-officer/RrTransportationPage";
import RrLivelihoodPage from "@/features/rr-officer/RrLivelihoodPage";
import RrEmploymentPage from "@/features/rr-officer/RrEmploymentPage";
import RrSkillDevPage from "@/features/rr-officer/RrSkillDevPage";
import RrSpecialSupportPage from "@/features/rr-officer/RrSpecialSupportPage";
import RrProjectOverviewPage from "@/features/rr-officer/RrProjectOverviewPage";
import RrRequestsPage from "@/features/rr-officer/RrRequestsPage";
import RrMapPage from "@/features/rr-officer/RrMapPage";
// Finance Officer
import FinDashboardPage from "@/features/finance-officer/FinDashboardPage";
import FinWorkQueuePage from "@/features/finance-officer/FinWorkQueuePage";
import FinPaymentCasesPage from "@/features/finance-officer/FinPaymentCasesPage";
import FinPaymentDetailPage from "@/features/finance-officer/FinPaymentDetailPage";
import FinAwardsPage from "@/features/finance-officer/FinAwardsPage";
import FinAwardReviewPage from "@/features/finance-officer/FinAwardReviewPage";
import FinPaymentInitPage from "@/features/finance-officer/FinPaymentInitPage";
import FinPendingPaymentsPage from "@/features/finance-officer/FinPendingPaymentsPage";
import FinInitiatedPaymentsPage from "@/features/finance-officer/FinInitiatedPaymentsPage";
import FinCompletedPaymentsPage from "@/features/finance-officer/FinCompletedPaymentsPage";
import FinFailedPaymentsPage from "@/features/finance-officer/FinFailedPaymentsPage";
import FinPendingVerificationPage from "@/features/finance-officer/FinPendingVerificationPage";
import FinReconciliationPage from "@/features/finance-officer/FinReconciliationPage";
import FinBeneficiariesPage from "@/features/finance-officer/FinBeneficiariesPage";
import FinBeneficiaryDetailPage from "@/features/finance-officer/FinBeneficiaryDetailPage";
import FinExceptionPage from "@/features/finance-officer/FinExceptionPage";
import FinExceptionDetailPage from "@/features/finance-officer/FinExceptionDetailPage";
import FinProjectPaymentsPage from "@/features/finance-officer/FinProjectPaymentsPage";
import FinStatePaymentsPage from "@/features/finance-officer/FinStatePaymentsPage";
import FinDistrictPaymentsPage from "@/features/finance-officer/FinDistrictPaymentsPage";
import FinDelaysPage from "@/features/finance-officer/FinDelaysPage";
import FinDocumentsPage from "@/features/finance-officer/FinDocumentsPage";
import FinAuditPage from "@/features/finance-officer/FinAuditPage";
import FinReportsPage from "@/features/finance-officer/FinReportsPage";
import FinWorkflowPage from "@/features/finance-officer/FinWorkflowPage";
import FinRoleBoundaryPage from "@/features/finance-officer/FinRoleBoundaryPage";
// Citizen Portal
import { CitizenShell } from "@/features/citizen/CitizenShell";
import CitizenHomePage from "@/features/citizen/CitizenHomePage";
import CitizenProjectSearchPage from "@/features/citizen/CitizenProjectSearchPage";
import CitizenProjectPage from "@/features/citizen/CitizenProjectPage";
import CitizenNoticesPage from "@/features/citizen/CitizenNoticesPage";
import CitizenNoticeDetailPage from "@/features/citizen/CitizenNoticeDetailPage";
import CitizenCaseSearchPage from "@/features/citizen/CitizenCaseSearchPage";
import CitizenTransparencyPage from "@/features/citizen/CitizenTransparencyPage";
import CitizenHelpPage from "@/features/citizen/CitizenHelpPage";
import CitizenLoginPage from "@/features/citizen/CitizenLoginPage";
import CitizenNotificationsPage from "@/features/citizen/CitizenNotificationsPage";
import CitizenDashboardPage from "@/features/citizen/CitizenDashboardPage";
import CitizenMyLandPage from "@/features/citizen/CitizenMyLandPage";
import CitizenParcelMapPage from "@/features/citizen/CitizenParcelMapPage";
import CitizenTimelinePage from "@/features/citizen/CitizenTimelinePage";
import CitizenCurrentStatusPage from "@/features/citizen/CitizenCurrentStatusPage";
import CitizenCompensationPage from "@/features/citizen/CitizenCompensationPage";
import CitizenPaymentStatusPage from "@/features/citizen/CitizenPaymentStatusPage";
import CitizenDocumentsPage from "@/features/citizen/CitizenDocumentsPage";
import CitizenObjectionFlowPage from "@/features/citizen/CitizenObjectionFlowPage";
import CitizenObjectionTrackingPage from "@/features/citizen/CitizenObjectionTrackingPage";
import CitizenGrievanceFlowPage from "@/features/citizen/CitizenGrievanceFlowPage";
import CitizenGrievanceTrackingPage from "@/features/citizen/CitizenGrievanceTrackingPage";
import CitizenRnRPage from "@/features/citizen/CitizenRnRPage";

/**
 * App router — single national platform.
 * "/" is the role gallery (landing). "/app" hosts the shared workspace with all 11 roles
 * operating on the same cases/parcels/documents/audit via Zustand stores.
 * Per-role convenience route /role/:roleId sets session role and redirects to /app/overview.
 * Also supports ?role= / ?roleId= on landing — handled inside RoleGalleryPage.
 */
export const router = createBrowserRouter([
  { path: "/", element: <RoleGalleryPage /> },
  { path: "/role/:roleId", element: <RoleRedirect /> },
  {
    path: "/app",
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: "overview", element: <OverviewPage /> },
      { path: "cases", element: <CaseListPage /> },
      { path: "cases/:caseId", element: <CaseDetailPage /> },
      { path: "gis", element: <GisPage /> },
      { path: "documents", element: <DocumentsPage /> },
      { path: "audit", element: <AuditPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "grievances", element: <GrievancesPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      // National Admin routes
      { path: "admin/overview", element: <NationalOverviewPage /> },
      { path: "admin/monitoring", element: <NationalMonitoringPage /> },
      { path: "admin/gis", element: <NationalGisPage /> },
      { path: "admin/risk", element: <RiskDelayMonitorPage /> },
      { path: "admin/organizations", element: <OrganizationsPage /> },
      { path: "admin/users", element: <UsersRolesPage /> },
      { path: "admin/hierarchy", element: <HierarchyViewPage /> },
      { path: "admin/workflow", element: <WorkflowConfigPage /> },
      { path: "admin/documents", element: <DocumentRepositoryPage /> },
      { path: "admin/audit", element: <AuditTrailPage /> },
      { path: "admin/integrations", element: <IntegrationsPage /> },
      { path: "admin/alerts", element: <AlertsPage /> },
      { path: "admin/reports", element: <ReportsPage /> },
      { path: "admin/projects/:projectId", element: <ProjectDetailPage /> },
      // Ministry Nodal Officer routes
      { path: "ministry/overview", element: <MinistryOverviewPage /> },
      { path: "ministry/projects", element: <MinistryProjectsPage /> },
      { path: "ministry/project/:projectId", element: <ProjectDetailPage /> },
      { path: "ministry/work-queue", element: <MinistryWorkQueuePage /> },
      { path: "ministry/state-monitoring", element: <MinistryStateMonitoringPage /> },
      { path: "ministry/gis", element: <MinistryGisPage /> },
      { path: "ministry/risk", element: <MinistryRiskDelayPage /> },
      { path: "ministry/compensation", element: <MinistryCompensationPage /> },
      { path: "ministry/possession", element: <MinistryPossessionPage /> },
      { path: "ministry/rnr", element: <MinistryRnrPage /> },
      { path: "ministry/organizations", element: <MinistryOrgsPage /> },
      { path: "ministry/stakeholders", element: <MinistryStakeholdersPage /> },
      { path: "ministry/requests", element: <MinistryRequestsPage /> },
      { path: "ministry/documents", element: <MinistryDocumentsPage /> },
      { path: "ministry/objections", element: <MinistryObjectionsPage /> },
      { path: "ministry/audit", element: <MinistryAuditPage /> },
      { path: "ministry/reports", element: <MinistryMisPage /> },
      { path: "ministry/notifications", element: <MinistryNotificationsPage /> },
      { path: "ministry/profile", element: <MinistryProfilePage /> },
      // Requiring Organisation / Implementing Agency routes
      { path: "ro/dashboard", element: <ProjectDashboardPage /> },
      { path: "ro/projects", element: <MyProjectsPage /> },
      { path: "ro/create", element: <CreateProjectPage /> },
      { path: "ro/project/:projectId", element: <ProjectWorkspaceShell />, children: [
        { index: true, element: <ProjectOverviewPage /> },
        { path: "map", element: <ProjectGisPage /> },
        { path: "workflow", element: <ProjectWorkflowPage /> },
        { path: "cases", element: <CaseListPage /> },
        { path: "documents", element: <ProjectDocumentsPage /> },
        { path: "stakeholders", element: <ProjectStakeholdersPage /> },
        { path: "timeline", element: <ProjectTimelinePage /> },
        { path: "audit", element: <RoAuditTrailPage /> },
      ] },
      { path: "ro/work-queue", element: <WorkQueuePage /> },
      { path: "ro/progress", element: <AcquisitionProgressPage /> },
      { path: "ro/gis", element: <ProjectGisPage /> },
      { path: "ro/risk", element: <RiskDelayPage /> },
      { path: "ro/requests", element: <AuthorityRequestsPage /> },
      { path: "ro/objections", element: <ObjectionsGrievancesPage /> },
      { path: "ro/documents", element: <ProjectDocumentsPage /> },
      { path: "ro/audit", element: <RoAuditTrailPage /> },
      { path: "ro/compensation", element: <CompensationMonitorPage /> },
      { path: "ro/possession", element: <PossessionMonitorPage /> },
      { path: "ro/rnr", element: <RnrMonitorPage /> },
      { path: "ro/reports", element: <ProjectReportsPage /> },
      // State Nodal Officer routes
      { path: "state-nodal/overview", element: <StateOverviewPage /> },
      { path: "state-nodal/pipeline", element: <StatePipelinePage /> },
      { path: "state-nodal/incoming", element: <IncomingProjectsPage /> },
      { path: "state-nodal/project-review/:projectId", element: <StateProjectReviewPage /> },
      { path: "state-nodal/routing", element: <DistrictRoutingPage /> },
      { path: "state-nodal/districts", element: <DistrictMonitoringPage /> },
      { path: "state-nodal/districts/:districtId", element: <DistrictDetailPage /> },
      { path: "state-nodal/gis", element: <StateGisPage /> },
      { path: "state-nodal/projects", element: <StateProjectsPage /> },
      { path: "state-nodal/project/:projectId", element: <StateProjectWorkspacePage /> },
      { path: "state-nodal/timeline", element: <StatutoryTimelinePage /> },
      { path: "state-nodal/sia", element: <SiaMonitoringPage /> },
      { path: "state-nodal/notifications-monitor", element: <NotificationMonitoringPage /> },
      { path: "state-nodal/objections", element: <ObjectionsMonitoringPage /> },
      { path: "state-nodal/requests", element: <RequestsClarificationsPage /> },
      { path: "state-nodal/departments", element: <StateDepartmentsPage /> },
      { path: "state-nodal/stakeholders", element: <StateStakeholdersPage /> },
      { path: "state-nodal/compensation", element: <StateCompensationPage /> },
      { path: "state-nodal/possession", element: <StatePossessionPage /> },
      { path: "state-nodal/rnr", element: <StateRnrPage /> },
      { path: "state-nodal/risk", element: <StateRiskDelayPage /> },
      { path: "state-nodal/documents", element: <StateDocumentsPage /> },
      { path: "state-nodal/audit", element: <StateAuditPage /> },
      { path: "state-nodal/mis", element: <StateMisPage /> },
      { path: "state-nodal/notifications", element: <StateNotificationsPage /> },
      { path: "state-nodal/work-queue", element: <StateWorkQueuePage /> },
      // District Collector / CALA routes
      { path: "collector/overview", element: <CollectorOverviewPage /> },
      { path: "collector/command-centre", element: <CommandCentrePage /> },
      { path: "collector/work-queue", element: <CollectorWorkQueuePage /> },
      { path: "collector/incoming", element: <CollectorIncomingProjectsPage /> },
      { path: "collector/pipeline", element: <CollectorProjectPipelinePage /> },
      { path: "collector/workspace", element: <CollectorProjectWorkspacePage /> },
      { path: "collector/timeline", element: <CollectorStatutoryTimelinePage /> },
      { path: "collector/sia", element: <CollectorSiaMonitoringPage /> },
      { path: "collector/notifications-mgmt", element: <CollectorNotificationManagementPage /> },
      { path: "collector/objections", element: <CollectorObjectionHearingPage /> },
      { path: "collector/declarations", element: <CollectorDeclarationManagementPage /> },
      { path: "collector/field-verification", element: <CollectorFieldVerificationPage /> },
      { path: "collector/compensation", element: <CollectorCompensationPage /> },
      { path: "collector/awards", element: <CollectorAwardPage /> },
      { path: "collector/payments", element: <CollectorPaymentPage /> },
      { path: "collector/possession", element: <CollectorPossessionPage /> },
      { path: "collector/rnr", element: <CollectorRnrPage /> },
      { path: "collector/grievances", element: <CollectorGrievancePage /> },
      { path: "collector/gis", element: <CollectorGisPage /> },
      { path: "collector/assets", element: <CollectorAssetValuationPage /> },
      { path: "collector/parcels", element: <CollectorParcelRegisterPage /> },
      { path: "collector/documents", element: <CollectorDocumentsPage /> },
      { path: "collector/audit", element: <CollectorAuditPage /> },
      { path: "collector/stakeholders", element: <CollectorStakeholdersPage /> },
      { path: "collector/tehsils", element: <CollectorTehsilSdoPage /> },
      { path: "collector/reports", element: <CollectorReportsPage /> },
      { path: "collector/notifications", element: <CollectorNotificationsPage /> },
      { path: "collector/risk", element: <CollectorRiskDelayPage /> },
      // Tehsil / SDO routes
      { path: "tehsil/overview", element: <TehsilOverviewPage /> },
      { path: "tehsil/work-queue", element: <TehsilWorkQueuePage /> },
      { path: "tehsil/critical", element: <TehsilCriticalCasesPage /> },
      { path: "tehsil/projects", element: <TehsilAssignedProjectsPage /> },
      { path: "tehsil/village-register", element: <TehsilVillageRegisterPage /> },
      { path: "tehsil/village/:villageId", element: <TehsilVillageWorkspacePage /> },
      { path: "tehsil/parcel-register", element: <TehsilParcelRegisterPage /> },
      { path: "tehsil/parcel/:parcelId", element: <TehsilParcelWorkspacePage /> },
      { path: "tehsil/land-records", element: <TehsilLandRecordPage /> },
      { path: "tehsil/discrepancy", element: <TehsilOwnershipDiscrepancyPage /> },
      { path: "tehsil/field-officers", element: <TehsilFieldOfficerPage /> },
      { path: "tehsil/field-verification", element: <TehsilFieldVerificationPage /> },
      { path: "tehsil/gps-photo", element: <TehsilGpsPhotoPage /> },
      { path: "tehsil/field-discrepancy", element: <TehsilFieldDiscrepancyPage /> },
      { path: "tehsil/objection-support", element: <TehsilObjectionSupportPage /> },
      { path: "tehsil/compensation-support", element: <TehsilCompensationSupportPage /> },
      { path: "tehsil/possession", element: <TehsilPossessionPage /> },
      { path: "tehsil/rnr", element: <TehsilRnrFieldPage /> },
      { path: "tehsil/district-requests", element: <TehsilDistrictRequestsPage /> },
      { path: "tehsil/village-coordination", element: <TehsilVillageCoordinationPage /> },
      { path: "tehsil/gis", element: <TehsilGisPage /> },
      { path: "tehsil/timeline", element: <TehsilTimelinePage /> },
      { path: "tehsil/risk", element: <TehsilRisksDelaysPage /> },
      { path: "tehsil/documents", element: <TehsilDocumentsPage /> },
      { path: "tehsil/audit", element: <TehsilAuditPage /> },
      { path: "tehsil/reports", element: <TehsilReportsPage /> },
      { path: "tehsil/notifications", element: <TehsilNotificationsPage /> },
      // Field Officer / VAO routes
      { path: "fo/home", element: <FoHomePage /> },
      { path: "fo/tasks", element: <FoTasksPage /> },
      { path: "fo/task/:taskId", element: <FoTaskDetailPage /> },
      { path: "fo/visit/:taskId", element: <FoFieldVisitPage /> },
      { path: "fo/gps/:taskId", element: <FoGpsCapturePage /> },
      { path: "fo/photo/:taskId", element: <FoPhotoCapturePage /> },
      { path: "fo/gallery/:taskId", element: <FoPhotoGalleryPage /> },
      { path: "fo/documents/:taskId", element: <FoDocumentsPage /> },
      { path: "fo/owner-verify/:taskId", element: <FoOwnerVerifyPage /> },
      { path: "fo/assets/:taskId", element: <FoAssetsPage /> },
      { path: "fo/measurement/:taskId", element: <FoMeasurementPage /> },
      { path: "fo/observations/:taskId", element: <FoObservationsPage /> },
      { path: "fo/interaction/:taskId", element: <FoInteractionPage /> },
      { path: "fo/objection-evidence/:taskId", element: <FoObjectionEvidencePage /> },
      { path: "fo/possession/:taskId", element: <FoPossessionPage /> },
      { path: "fo/rnr/:taskId", element: <FoRnrPage /> },
      { path: "fo/submit/:taskId", element: <FoSubmitPage /> },
      { path: "fo/report/:taskId", element: <FoReportPage /> },
      { path: "fo/reverification/:taskId", element: <FoReverificationPage /> },
      { path: "fo/map", element: <FoMapPage /> },
      { path: "fo/completed", element: <FoCompletedPage /> },
      { path: "fo/performance", element: <FoPerformancePage /> },
      { path: "fo/notifications", element: <FoNotificationsPage /> },
      { path: "fo/sync", element: <FoSyncPage /> },
      { path: "fo/audit", element: <FoAuditPage /> },
      { path: "fo/role", element: <FoRoleBoundaryPage /> },
      { path: "fo/offline", element: <FoOfflinePage /> },
      // SIA Expert Group routes
      { path: "sia/dashboard", element: <SiaDashboardPage /> },
      { path: "sia/assessments", element: <SiaAssessmentsPage /> },
      { path: "sia/work-queue", element: <SiaWorkQueuePage /> },
      { path: "sia/workspace/:assessmentId", element: <SiaWorkspacePage /> },
      { path: "sia/workspace/:assessmentId/project-context", element: <SiaProjectContextPage /> },
      { path: "sia/workspace/:assessmentId/project_context", element: <SiaProjectContextPage /> },
      { path: "sia/families", element: <SiaFamiliesPage /> },
      { path: "sia/livelihood", element: <SiaLivelihoodPage /> },
      { path: "sia/public-assets", element: <SiaPublicAssetsPage /> },
      { path: "sia/vulnerable", element: <SiaVulnerablePage /> },
      { path: "sia/gram-sabha", element: <SiaGramSabhaPage /> },
      { path: "sia/gram-sabha/:consultationId", element: <SiaGramSabhaDetailPage /> },
      { path: "sia/public-consultation", element: <SiaPublicConsultationPage /> },
      { path: "sia/stakeholder", element: <SiaStakeholderPage /> },
      { path: "sia/evidence", element: <SiaEvidencePage /> },
      { path: "sia/gis-map", element: <SiaGisMapPage /> },
      { path: "sia/findings", element: <SiaFindingsPage /> },
      { path: "sia/mitigation", element: <SiaMitigationPage /> },
      { path: "sia/completeness", element: <SiaCompletenessPage /> },
      { path: "sia/draft-report", element: <SiaDraftReportPage /> },
      { path: "sia/submission", element: <SiaSubmissionPage /> },
      { path: "sia/clarifications", element: <SiaClarificationsPage /> },
      { path: "sia/version-history", element: <SiaVersionHistoryPage /> },
      { path: "sia/audit", element: <SiaAuditTrailPage /> },
      { path: "sia/statutory-gate", element: <SiaStatutoryGatePage /> },
      { path: "sia/notifications", element: <SiaNotificationsPage /> },
      { path: "sia/role", element: <SiaRoleBoundaryPage /> },
      // R&R Officer routes
      { path: "rr/dashboard", element: <RrDashboardPage /> },
      { path: "rr/work-queue", element: <RrWorkQueuePage /> },
      { path: "rr/cases", element: <RrCasesPage /> },
      { path: "rr/case/:caseId", element: <RrCaseWorkspacePage /> },
      { path: "rr/families", element: <RrFamiliesPage /> },
      { path: "rr/vulnerability", element: <RrVulnerabilityPage /> },
      { path: "rr/verification", element: <RrVerificationPage /> },
      { path: "rr/housing", element: <RrHousingPage /> },
      { path: "rr/components", element: <RrComponentsPage /> },
      { path: "rr/sites", element: <RrSitesPage /> },
      { path: "rr/site-readiness", element: <RrSiteReadinessPage /> },
      { path: "rr/allocation", element: <RrAllocationPage /> },
      { path: "rr/field-coordination", element: <RrFieldCoordinationPage /> },
      { path: "rr/evidence", element: <RrEvidencePage /> },
      { path: "rr/grievances", element: <RrGrievancesPage /> },
      { path: "rr/completion", element: <RrCompletionPage /> },
      { path: "rr/mis", element: <RrMisPage /> },
      { path: "rr/audit", element: <RrAuditPage /> },
      { path: "rr/workflow", element: <RrWorkflowPage /> },
      { path: "rr/notifications", element: <RrNotificationsPage /> },
      { path: "rr/role", element: <RrRoleBoundaryPage /> },
      { path: "rr/subsistence", element: <RrSubsistencePage /> },
      { path: "rr/transportation", element: <RrTransportationPage /> },
      { path: "rr/livelihood", element: <RrLivelihoodPage /> },
      { path: "rr/employment", element: <RrEmploymentPage /> },
      { path: "rr/skill-dev", element: <RrSkillDevPage /> },
      { path: "rr/special-support", element: <RrSpecialSupportPage /> },
      { path: "rr/project-overview", element: <RrProjectOverviewPage /> },
      { path: "rr/requests", element: <RrRequestsPage /> },
      { path: "rr/map", element: <RrMapPage /> },
      // Finance Officer routes
      { path: "finance/dashboard", element: <FinDashboardPage /> },
      { path: "finance/work-queue", element: <FinWorkQueuePage /> },
      { path: "finance/cases", element: <FinPaymentCasesPage /> },
      { path: "finance/payment/:paymentId", element: <FinPaymentDetailPage /> },
      { path: "finance/awards", element: <FinAwardsPage /> },
      { path: "finance/award/:awardId", element: <FinAwardReviewPage /> },
      { path: "finance/init", element: <FinPaymentInitPage /> },
      { path: "finance/pending", element: <FinPendingPaymentsPage /> },
      { path: "finance/initiated", element: <FinInitiatedPaymentsPage /> },
      { path: "finance/completed", element: <FinCompletedPaymentsPage /> },
      { path: "finance/failed", element: <FinFailedPaymentsPage /> },
      { path: "finance/pending-verification", element: <FinPendingVerificationPage /> },
      { path: "finance/reconciliation", element: <FinReconciliationPage /> },
      { path: "finance/beneficiaries", element: <FinBeneficiariesPage /> },
      { path: "finance/beneficiary/:beneficiaryId", element: <FinBeneficiaryDetailPage /> },
      { path: "finance/exceptions", element: <FinExceptionPage /> },
      { path: "finance/exception/:exceptionId", element: <FinExceptionDetailPage /> },
      { path: "finance/project-payments", element: <FinProjectPaymentsPage /> },
      { path: "finance/state-payments", element: <FinStatePaymentsPage /> },
      { path: "finance/district-payments", element: <FinDistrictPaymentsPage /> },
      { path: "finance/delays", element: <FinDelaysPage /> },
      { path: "finance/documents", element: <FinDocumentsPage /> },
      { path: "finance/audit", element: <FinAuditPage /> },
      { path: "finance/reports", element: <FinReportsPage /> },
      { path: "finance/workflow", element: <FinWorkflowPage /> },
      { path: "finance/role", element: <FinRoleBoundaryPage /> },
    ],
  },
  // ── Terranex Land Administration (Chengalpattu district) ──
  // GIS parcel map + case management workspace. Self-contained shell, own
  // route table, its own mock data boundary — added without touching the
  // 11 role portals above.
  {
    path: "/land-admin/*",
    element: <LandAdminRoutes />,
  },
  // Citizen / Landowner Portal — separate shell
  {
    path: "/citizen",
    element: <CitizenShell />,
    children: [
      { index: true, element: <CitizenHomePage /> },
      { path: "status", element: <CitizenCaseSearchPage /> },
      { path: "projects", element: <CitizenProjectSearchPage /> },
      { path: "project/:projectId", element: <CitizenProjectPage /> },
      { path: "notices", element: <CitizenNoticesPage /> },
      { path: "notices/:noticeId", element: <CitizenNoticeDetailPage /> },
      { path: "transparency", element: <CitizenTransparencyPage /> },
      { path: "help", element: <CitizenHelpPage /> },
      { path: "login", element: <CitizenLoginPage /> },
      { path: "notifications", element: <CitizenNotificationsPage /> },
      { path: "my-case", element: <CitizenDashboardPage /> },
      { path: "my-case/land", element: <CitizenMyLandPage /> },
      { path: "my-case/map", element: <CitizenParcelMapPage /> },
      { path: "my-case/timeline", element: <CitizenTimelinePage /> },
      { path: "my-case/status", element: <CitizenCurrentStatusPage /> },
      { path: "my-case/compensation", element: <CitizenCompensationPage /> },
      { path: "my-case/payment", element: <CitizenPaymentStatusPage /> },
      { path: "my-case/documents", element: <CitizenDocumentsPage /> },
      { path: "my-case/rr", element: <CitizenRnRPage /> },
      { path: "objections", element: <CitizenObjectionTrackingPage /> },
      { path: "objections/new", element: <CitizenObjectionFlowPage /> },
      { path: "grievances", element: <CitizenGrievanceTrackingPage /> },
      { path: "grievances/new", element: <CitizenGrievanceFlowPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
