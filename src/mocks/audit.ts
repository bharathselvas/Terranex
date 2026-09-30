import type { AuditEvent, Grievance, AppNotification, Document, Objection, Payment } from "@/types/domain";

export const MOCK_AUDIT: AuditEvent[] = [
  { id: "aud-001", caseId: "case-001", at: "2026-08-28T11:20:00+05:30", actorName: "Dr. Suhas Diwase", actorRole: "collector_cala", action: "Advanced case to Compensation Assessment", stage: "compensation", before: "field_verification", after: "compensation", ip: "10.194.22.18" },
  { id: "aud-002", caseId: "case-001", at: "2026-08-26T15:40:00+05:30", actorName: "Shri. M. Kamble", actorRole: "field_officer", action: "Submitted field verification report (5 parcels)", stage: "field_verification", before: null, after: null, ip: "10.194.61.44" },
  { id: "aud-003", caseId: "case-003", at: "2026-08-22T10:05:00+05:30", actorName: "Smt. Kavita Patil", actorRole: "tehsil_sdo", action: "Scheduled objection hearing — 05 Sep 2026, Haveli Tahsil Office", stage: "objections_hearing", before: null, after: null, ip: "10.194.22.91" },
  { id: "aud-004", caseId: "case-005", at: "2026-08-30T09:15:00+05:30", actorName: "Smt. R. Kulkarni", actorRole: "finance_officer", action: "Sanctioned payment ₹ 2.42 Cr — parcel 78/3 (Manchar)", stage: "payment", before: null, after: null, ip: "10.194.80.12" },
  { id: "aud-005", caseId: "case-004", at: "2026-09-02T14:30:00+05:30", actorName: "Shri. Asheesh Singh", actorRole: "collector_cala", action: "Returned submission for clarification — land schedule mismatch", stage: "scrutiny", before: null, after: null, ip: "10.195.10.31" },
  { id: "aud-006", caseId: "case-006", at: "2026-08-10T12:00:00+05:30", actorName: "Dr. Vipin Itankar", actorRole: "collector_cala", action: "Published preliminary notification u/s 11(1) in Maharashtra Gazette", stage: "preliminary_notification", before: null, after: null, ip: "10.195.44.02" },
  { id: "aud-007", caseId: "case-007", at: "2026-07-15T16:20:00+05:30", actorName: "Prof. S. Mishra", actorRole: "sia_expert", action: "Uploaded draft SIA report v0.3 (public consultation pending)", stage: "sia", before: null, after: null, ip: "10.196.12.77" },
  { id: "aud-008", caseId: "case-008", at: "2026-08-18T11:00:00+05:30", actorName: "Shri. Jitendra Dudi", actorRole: "collector_cala", action: "Declared award u/s 23 — ₹ 3.81 Cr total", stage: "award", before: null, after: null, ip: "10.194.33.14" },
  { id: "aud-009", caseId: "case-009", at: "2026-03-30T17:45:00+05:30", actorName: "Dr. Suhas Diwase", actorRole: "collector_cala", action: "Closed acquisition — possession handed over to MADC", stage: "closed", before: "r_and_r", after: "closed", ip: "10.194.22.18" },
  { id: "aud-010", caseId: "case-002", at: "2026-08-20T09:00:00+05:30", actorName: "Shri. M. Kamble", actorRole: "field_officer", action: "Captured 12 field evidence photos — Pirangut parcels", stage: "field_verification", before: null, after: null, ip: "10.194.61.44" },
];

export const MOCK_DOCUMENTS: Document[] = [
  { id: "doc-001", caseId: "case-001", stage: "project_proposal", title: "Project Proposal — Pune Ring Road Phase 2", type: "proposal", fileName: "PRR_Ph2_Proposal.pdf", sizeKb: 4820, uploadedBy: "Shri. A. Deshmukh", uploadedByRole: "requiring_org", date: "2025-06-15", verified: true, verifiedBy: "Shri. Rajiv Malhotra" },
  { id: "doc-002", caseId: "case-001", stage: "gis_identification", title: "GIS Parcel Identification Report — Haveli cluster", type: "gis_report", fileName: "GIS_Haveli_Wagholi_5parcels.pdf", sizeKb: 3120, uploadedBy: "Shri. M. Kamble", uploadedByRole: "field_officer", date: "2025-08-10", verified: true, verifiedBy: "Smt. Kavita Patil" },
  { id: "doc-003", caseId: "case-001", stage: "compensation", title: "Compensation Assessment Sheet — 5 parcels", type: "compensation_sheet", fileName: "Compensation_LA-PN-HAV-0184.xlsx", sizeKb: 240, uploadedBy: "Dr. Suhas Diwase", uploadedByRole: "collector_cala", date: "2026-08-28", verified: false, verifiedBy: null },
  { id: "doc-004", caseId: "case-003", stage: "objections_hearing", title: "Objection Petition — D. P. Rathod (201/4)", type: "objection_record", fileName: "Objection_Rathod_201-4.pdf", sizeKb: 890, uploadedBy: "Dnyaneshwar P. Rathod", uploadedByRole: "citizen", date: "2026-07-20", verified: false, verifiedBy: null },
  { id: "doc-005", caseId: "case-005", stage: "payment", title: "PFMS Sanction Order — ₹ 2.42 Cr (78/3)", type: "payment_challan", fileName: "PFMS_Sanction_78-3.pdf", sizeKb: 560, uploadedBy: "Smt. R. Kulkarni", uploadedByRole: "finance_officer", date: "2026-08-30", verified: true, verifiedBy: "Dr. Suhas Diwase" },
  { id: "doc-006", caseId: "case-007", stage: "sia", title: "Draft SIA Report — Jatni Canal (v0.3)", type: "sia_report", fileName: "SIA_Jatni_Distributary_Draft_v03.pdf", sizeKb: 7840, uploadedBy: "Prof. S. Mishra", uploadedByRole: "sia_expert", date: "2026-07-15", verified: false, verifiedBy: null },
  { id: "doc-007", caseId: "case-006", stage: "preliminary_notification", title: "Preliminary Notification u/s 11(1) — Gazette Copy", type: "notification_11_1", fileName: "Gazette_11-1_Shingaon_2026-08-10.pdf", sizeKb: 1420, uploadedBy: "Dr. Vipin Itankar", uploadedByRole: "collector_cala", date: "2026-08-10", verified: true, verifiedBy: "Shri. R. K. Sable" },
  { id: "doc-008", caseId: "case-008", stage: "award", title: "Award Order u/s 23 — Kasbe Digraj", type: "award_order", fileName: "Award_LA-SAT-KAR-0120.pdf", sizeKb: 2100, uploadedBy: "Shri. Jitendra Dudi", uploadedByRole: "collector_cala", date: "2026-08-18", verified: true, verifiedBy: "Smt. R. Kulkarni" },
];

export const MOCK_OBJECTIONS: Objection[] = [
  { id: "obj-001", caseId: "case-001", parcelId: "parcel-003", filedBy: "Vilas B. Gaikwad", filedByRole: "citizen", date: "2026-06-18", grounds: "Compensation rate for irrigated land undervalued; adjacent sale at higher rate ignored.", status: "heard", hearingDate: "2026-07-12" },
  { id: "obj-002", caseId: "case-001", parcelId: "parcel-022", filedBy: "Geeta S. Londhe", filedByRole: "citizen", date: "2026-06-22", grounds: "Residential structure on 114/6A — request for R&R entitlement and alternate plot.", status: "heard", hearingDate: "2026-07-12" },
  { id: "obj-003", caseId: "case-003", parcelId: "parcel-009", filedBy: "Dnyaneshwar P. Rathod", filedByRole: "citizen", date: "2026-07-20", grounds: "Entire holding acquired — no residual viable parcel; seeks full rehabilitation package.", status: "under_review", hearingDate: "2026-09-05" },
  { id: "obj-004", caseId: "case-003", parcelId: null, filedBy: "Jalgaon Gram Panchayat", filedByRole: "citizen", date: "2026-07-28", grounds: "Common grazing land (gairan) included — request exclusion.", status: "filed", hearingDate: null },
  { id: "obj-005", caseId: "case-007", parcelId: "parcel-014", filedBy: "Sasmita Behera", filedByRole: "citizen", date: "2026-06-10", grounds: "SIA did not record sharecropper household — exclusion from affected families list.", status: "under_review", hearingDate: null },
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: "pay-001", caseId: "case-005", parcelId: "parcel-006", payee: "Prakash N. Borade", khataNo: "KH/078/044", amount: 24200000, status: "sanctioned", utr: null, sanctionDate: "2026-08-30", disbursedAt: null, mode: "pfms" },
  { id: "pay-002", caseId: "case-005", parcelId: "parcel-007", payee: "Anand R. Kale", khataNo: "KH/079/009", amount: 39600000, status: "disbursed", utr: "UTR2026083001847", sanctionDate: "2026-08-12", disbursedAt: "2026-08-18", mode: "pfms" },
  { id: "pay-003", caseId: "case-005", parcelId: "parcel-008", payee: "Lata A. Kale", khataNo: "KH/079/010", amount: 20400000, status: "pending", utr: null, sanctionDate: null, disbursedAt: null, mode: "pfms" },
  { id: "pay-004", caseId: "case-008", parcelId: "parcel-017", payee: "Tanaji S. Yadav", khataNo: "KH/056/089", amount: 23520000, status: "sanctioned", utr: null, sanctionDate: "2026-08-18", disbursedAt: null, mode: "pfms" },
  { id: "pay-005", caseId: "case-008", parcelId: "parcel-018", payee: "Kavita T. Yadav", khataNo: "KH/056/090", amount: 14560000, status: "sanctioned", utr: null, sanctionDate: "2026-08-18", disbursedAt: null, mode: "pfms" },
  { id: "pay-006", caseId: "case-009", parcelId: "parcel-019", payee: "Baban R. Khomane", khataNo: "KH/101/001", amount: 86800000, status: "disbursed", utr: "UTR2026032500914", sanctionDate: "2026-03-15", disbursedAt: "2026-03-25", mode: "pfms" },
];

export const MOCK_GRIEVANCES: Grievance[] = [
  { id: "grv-001", caseId: "case-001", filedBy: "Sunita R. Jadhav", category: "compensation", subject: "Solatium @100% not applied on 112/2B", date: "2026-08-20", status: "in_progress", assignedTo: "collector_cala" },
  { id: "grv-002", caseId: "case-003", filedBy: "Dnyaneshwar P. Rathod", category: "rr", subject: "R&R entitlement for ST landholder — housing unit not allotted", date: "2026-08-10", status: "open", assignedTo: "rnr_officer" },
  { id: "grv-003", caseId: null, filedBy: "Anand R. Kale", category: "compensation", subject: "Payment for 79/1A delayed beyond 30 days of award", date: "2026-08-25", status: "escalated", assignedTo: "finance_officer" },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: "notif-001", caseId: "case-001", title: "Compensation sheet pending verification", body: "Assessment sheet for LA/MH/PN/HAV/2025-26/0184 awaiting Collector sign-off.", type: "action_required", createdAt: "2026-08-28T16:00:00+05:30", read: false, targetRoles: ["collector_cala", "finance_officer"] },
  { id: "notif-002", caseId: "case-003", title: "Hearing scheduled — 05 Sep 2026", body: "Objection hearing for LA/MH/JAL/JAL/2025-26/0042 at Jalna Tahsil Office, 11:00 AM.", type: "hearing", createdAt: "2026-08-22T10:30:00+05:30", read: false, targetRoles: ["collector_cala", "tehsil_sdo", "citizen"] },
  { id: "notif-003", caseId: "case-004", title: "Submission returned for clarification", body: "Pithampur case returned — land schedule mismatch in parcels 33/4A & 33/4B.", type: "action_required", createdAt: "2026-09-02T15:00:00+05:30", read: false, targetRoles: ["requiring_org", "collector_cala"] },
  { id: "notif-004", caseId: "case-005", title: "PFMS sanction — parcel 78/3", body: "₹ 2.42 Cr sanctioned for Prakash N. Borade. Disbursement pending bank validation.", type: "payment", createdAt: "2026-08-30T09:30:00+05:30", read: true, targetRoles: ["finance_officer", "collector_cala", "citizen"] },
  { id: "notif-005", caseId: "case-006", title: "SLA breach — Preliminary Notification overdue", body: "LA/MH/NG/HIN/2025-26/0072 has exceeded SLA by 14 days. Immediate action required.", type: "sla_warning", createdAt: "2026-08-24T08:00:00+05:30", read: false, targetRoles: ["collector_cala", "state_nodal"] },
];
