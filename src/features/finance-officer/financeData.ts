// Finance / Payment Officer — data types and mock data

export type PaymentStatus =
  | "pending"
  | "initiated"
  | "completed"
  | "failed"
  | "returned"
  | "pending_verification";

export type AwardReadiness =
  | "ready"
  | "missing_document"
  | "verification_required"
  | "exception"
  | "blocked";

export type BankVerification =
  | "verified"
  | "pending_verification"
  | "mismatch"
  | "invalid"
  | "not_available";

export type ExceptionCategory =
  | "bank_detail_mismatch"
  | "missing_document"
  | "duplicate_reference"
  | "amount_mismatch"
  | "external_status_mismatch"
  | "beneficiary_verification"
  | "other";

export type ExceptionSeverity = "critical" | "high" | "medium" | "low";

export type ExceptionStatus =
  | "open"
  | "in_review"
  | "under_review"
  | "awaiting_correction"
  | "resolved"
  | "escalation_pending"
  | "escalated"
  | "blocked"
  | "closed";

export type ReconciliationState =
  | "matched"
  | "amount_mismatch"
  | "reference_missing"
  | "status_mismatch"
  | "pending";

export type PaymentAward = {
  awardId: string;
  project: string;
  state: string;
  district: string;
  beneficiaryCount: number;
  awardAmount: number;
  awardDate: string;
  approvedBy: string;
  awardStatus: "approved" | "pending" | "modified";
  paymentReadiness: AwardReadiness;
  bankVerifiedCount: number;
  documentsCount: number;
  documentsTotal: number;
  blockingExceptions: number;
};

export type BeneficiaryRecord = {
  beneficiaryId: string;
  familyId: string;
  name: string;
  state: string;
  district: string;
  project: string;
  awardId: string;
  awardAmount: number;
  parcelRef: string;
  awardRef: string;
  paymentAmount: number;
  paymentStatus: PaymentStatus;
  bankVerification: BankVerification;
  maskedAccount: string;
  ifsc: string;
  bankName: string;
  accountSource: "land_record" | "self_declared" | "verified_by_officer" | "mock";
  status: "active" | "inactive" | "deceased";
  paymentReference?: string;
  lastUpdated: string;
  verificationDate?: string;
};

export type PaymentInstruction = {
  paymentId: string;
  awardId: string;
  beneficiaryId: string;
  beneficiaryName: string;
  familyId: string;
  amount: number;
  status: PaymentStatus;
  externalReference?: string;
  initiatedDate?: string;
  completedDate?: string;
  failedDate?: string;
  failureReason?: string;
  retryEligible: boolean;
  retryCount: number;
  lastUpdated: string;
};

export type PaymentException = {
  exceptionId: string;
  paymentId: string;
  awardId: string;
  beneficiaryId: string;
  beneficiaryName: string;
  category: ExceptionCategory;
  severity: ExceptionSeverity;
  assignedTo: string;
  createdDate: string;
  dueDate: string;
  status: ExceptionStatus;
  description: string;
  externalReference?: string;
  resolution?: string;
  resolvedDate?: string;
};

export type ReconciliationRecord = {
  reconciliationId: string;
  paymentId: string;
  awardId: string;
  externalReference: string;
  internalAmount: number;
  externalAmount: number;
  status: "matched" | "mismatched" | "partial" | "unresolved";
  reconciliation: ReconciliationState;
  difference: number;
  internalDate: string;
  externalDate: string;
  resolution?: string;
};

export type FinanceAuditEntry = {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  section: string;
  details: string;
};

export type PaymentDocument = {
  docId: string;
  type: string;
  category: "award" | "payment" | "beneficiary" | "bank" | "exception" | "audit";
  relatedAward?: string;
  relatedPayment?: string;
  date: string;
  status: "available" | "pending" | "missing";
  uploadedBy?: string;
};

export type PaymentWorkItem = {
  id: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  dueDate: string;
  category: "critical" | "due_soon" | "routine";
  paymentId?: string;
};

export type PaymentRisk = {
  riskId: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  affectedCases: number;
  owner: string;
  dueDate: string;
  status: "open" | "mitigating" | "resolved";
};

export type ProjectPaymentSummary = {
  projectId: string;
  project: string;
  state: string;
  district: string;
  totalAwards: number;
  totalAwardAmountCr: number;
  beneficiaries: number;
  completedPayments: number;
  pendingPayments: number;
  failedPayments: number;
  pendingVerification: number;
  openExceptions: number;
  completionPercentage: number;
};

export type StatePaymentSummary = {
  state: string;
  totalProjects: number;
  totalAwards: number;
  totalAwardAmountCr: number;
  beneficiaries: number;
  completedPayments: number;
  pendingPayments: number;
  failedPayments: number;
  pendingVerification: number;
  completionPercentage: number;
  openExceptions: number;
};

// ═══════════════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════════════

export const FINANCE_PROJECT = {
  projectName: "Eastern Freight Corridor Expansion — Package 04",
  projectId: "PRJ-2025-00187",
  state: "Maharashtra",
  district: "Jalna",
  awardsApproved: 27,
  beneficiaries: 218,
  awardValueCr: 18.4,
  completedCr: 13.1,
  pendingCr: 3.8,
  failedCr: 0.9,
  pendingVerificationCr: 0.6,
};

export const PAYMENT_AWARDS: PaymentAward[] = [
  { awardId: "AWD-2026-0182", project: "Eastern Freight Corridor — Pkg 04", state: "Maharashtra", district: "Jalna", beneficiaryCount: 17, awardAmount: 14200000, awardDate: "15 Aug 2026", approvedBy: "District Collector, Jalna", awardStatus: "approved", paymentReadiness: "verification_required", bankVerifiedCount: 12, documentsCount: 5, documentsTotal: 6, blockingExceptions: 2 },
  { awardId: "AWD-2026-0183", project: "Eastern Freight Corridor — Pkg 04", state: "Maharashtra", district: "Jalna", beneficiaryCount: 23, awardAmount: 18600000, awardDate: "18 Aug 2026", approvedBy: "District Collector, Jalna", awardStatus: "approved", paymentReadiness: "ready", bankVerifiedCount: 23, documentsCount: 6, documentsTotal: 6, blockingExceptions: 0 },
  { awardId: "AWD-2026-0184", project: "Eastern Freight Corridor — Pkg 04", state: "Maharashtra", district: "Jalna", beneficiaryCount: 8, awardAmount: 6400000, awardDate: "20 Aug 2026", approvedBy: "District Collector, Jalna", awardStatus: "approved", paymentReadiness: "ready", bankVerifiedCount: 8, documentsCount: 6, documentsTotal: 6, blockingExceptions: 0 },
  { awardId: "AWD-2026-0185", project: "Nagpur Metro Expansion — Phase 02", state: "Maharashtra", district: "Nagpur", beneficiaryCount: 31, awardAmount: 24800000, awardDate: "22 Aug 2026", approvedBy: "Divisional Commissioner, Nagpur", awardStatus: "approved", paymentReadiness: "missing_document", bankVerifiedCount: 28, documentsCount: 4, documentsTotal: 6, blockingExceptions: 3 },
  { awardId: "AWD-2026-0186", project: "Eastern Freight Corridor — Pkg 04", state: "Maharashtra", district: "Jalna", beneficiaryCount: 14, awardAmount: 11200000, awardDate: "25 Aug 2026", approvedBy: "District Collector, Jalna", awardStatus: "approved", paymentReadiness: "ready", bankVerifiedCount: 14, documentsCount: 6, documentsTotal: 6, blockingExceptions: 0 },
  { awardId: "AWD-2026-0187", project: "Mumbai-Pune Expressway Extension", state: "Maharashtra", district: "Pune", beneficiaryCount: 19, awardAmount: 15800000, awardDate: "28 Aug 2026", approvedBy: "District Collector, Pune", awardStatus: "approved", paymentReadiness: "exception", bankVerifiedCount: 15, documentsCount: 5, documentsTotal: 6, blockingExceptions: 4 },
  { awardId: "AWD-2026-0188", project: "Bhopal Indore Industrial Corridor", state: "Madhya Pradesh", district: "Indore", beneficiaryCount: 26, awardAmount: 21000000, awardDate: "01 Sep 2026", approvedBy: "District Collector, Indore", awardStatus: "approved", paymentReadiness: "ready", bankVerifiedCount: 26, documentsCount: 6, documentsTotal: 6, blockingExceptions: 0 },
  { awardId: "AWD-2026-0189", project: "Eastern Freight Corridor — Pkg 04", state: "Maharashtra", district: "Jalna", beneficiaryCount: 11, awardAmount: 8800000, awardDate: "03 Sep 2026", approvedBy: "District Collector, Jalna", awardStatus: "approved", paymentReadiness: "blocked", bankVerifiedCount: 6, documentsCount: 3, documentsTotal: 6, blockingExceptions: 5 },
];

export const BENEFICIARY_RECORDS: BeneficiaryRecord[] = [
  { beneficiaryId: "BEN-00421", familyId: "AF-00421", name: "Renuka Bai Gurav", state: "Maharashtra", district: "Jalna", project: "Eastern Freight Corridor — Pkg 04", awardId: "AWD-2026-0182", awardAmount: 14200000, parcelRef: "PL-2026-00421", awardRef: "AWD-2026-0182", paymentAmount: 482500, paymentStatus: "completed", bankVerification: "verified", maskedAccount: "•••• •••• 4821", ifsc: "SBIN0001234", bankName: "State Bank of India", accountSource: "verified_by_officer", status: "active", paymentReference: "MOCK-PFMS-88214", lastUpdated: "10 Sep 2026", verificationDate: "09 Sep 2026" },
  { beneficiaryId: "BEN-00422", familyId: "AF-00422", name: "Baburao S. Kshirsagar", state: "Maharashtra", district: "Jalna", project: "Eastern Freight Corridor — Pkg 04", awardId: "AWD-2026-0182", awardAmount: 14200000, parcelRef: "PL-2026-00422", awardRef: "AWD-2026-0182", paymentAmount: 356000, paymentStatus: "pending", bankVerification: "verified", maskedAccount: "•••• •••• 7293", ifsc: "HDFC0005678", bankName: "HDFC Bank", accountSource: "land_record", status: "active", lastUpdated: "08 Sep 2026" },
  { beneficiaryId: "BEN-00423", familyId: "AF-00423", name: "Sukhdeo D. Patil", state: "Maharashtra", district: "Jalna", project: "Eastern Freight Corridor — Pkg 04", awardId: "AWD-2026-0182", awardAmount: 14200000, parcelRef: "PL-2026-00423", awardRef: "AWD-2026-0182", paymentAmount: 620000, paymentStatus: "initiated", bankVerification: "verified", maskedAccount: "•••• •••• 1156", ifsc: "ICIC0009012", bankName: "ICICI Bank", accountSource: "verified_by_officer", status: "active", paymentReference: "MOCK-PFMS-88215", lastUpdated: "09 Sep 2026" },
  { beneficiaryId: "BEN-00424", familyId: "AF-00424", name: "Geeta Devi Sharma", state: "Maharashtra", district: "Jalna", project: "Eastern Freight Corridor — Pkg 04", awardId: "AWD-2026-0183", awardAmount: 18600000, parcelRef: "PL-2026-00424", awardRef: "AWD-2026-0183", paymentAmount: 275000, paymentStatus: "failed", bankVerification: "mismatch", maskedAccount: "•••• •••• 3384", ifsc: "UBIN0003456", bankName: "Union Bank of India", accountSource: "self_declared", status: "active", paymentReference: "MOCK-PFMS-88216", lastUpdated: "08 Sep 2026" },
  { beneficiaryId: "BEN-00425", familyId: "AF-00425", name: "Tukaram B. More", state: "Maharashtra", district: "Jalna", project: "Eastern Freight Corridor — Pkg 04", awardId: "AWD-2026-0183", awardAmount: 18600000, parcelRef: "PL-2026-00425", awardRef: "AWD-2026-0183", paymentAmount: 540000, paymentStatus: "completed", bankVerification: "verified", maskedAccount: "•••• •••• 9207", ifsc: "PUNB0007890", bankName: "Punjab National Bank", accountSource: "verified_by_officer", status: "active", paymentReference: "MOCK-PFMS-88217", lastUpdated: "09 Sep 2026" },
  { beneficiaryId: "BEN-00426", familyId: "AF-00426", name: "Lata V. Jadhav", state: "Maharashtra", district: "Jalna", project: "Eastern Freight Corridor — Pkg 04", awardId: "AWD-2026-0182", awardAmount: 14200000, parcelRef: "PL-2026-00426", awardRef: "AWD-2026-0182", paymentAmount: 390000, paymentStatus: "pending_verification", bankVerification: "verified", maskedAccount: "•••• •••• 6548", ifsc: "ABNA0002345", bankName: "ABN AMRO", accountSource: "verified_by_officer", status: "active", paymentReference: "MOCK-PFMS-88218", lastUpdated: "10 Sep 2026" },
  { beneficiaryId: "BEN-00427", familyId: "AF-00427", name: "Dattatray R. Hule", state: "Maharashtra", district: "Jalna", project: "Eastern Freight Corridor — Pkg 04", awardId: "AWD-2026-0184", awardAmount: 6400000, parcelRef: "PL-2026-00427", awardRef: "AWD-2026-0184", paymentAmount: 310000, paymentStatus: "pending", bankVerification: "verified", maskedAccount: "•••• •••• 2091", ifsc: "CBIN0006789", bankName: "Central Bank of India", accountSource: "land_record", status: "active", lastUpdated: "07 Sep 2026" },
  { beneficiaryId: "BEN-00428", familyId: "AF-00428", name: "Ashok P. Dhumal", state: "Maharashtra", district: "Jalna", project: "Eastern Freight Corridor — Pkg 04", awardId: "AWD-2026-0184", awardAmount: 6400000, parcelRef: "PL-2026-00428", awardRef: "AWD-2026-0184", paymentAmount: 185000, paymentStatus: "returned", bankVerification: "invalid", maskedAccount: "•••• •••• 0043", ifsc: "IDIB0004567", bankName: "Indian Bank", accountSource: "self_declared", status: "active", paymentReference: "MOCK-PFMS-88219", lastUpdated: "07 Sep 2026" },
  { beneficiaryId: "BEN-00429", familyId: "AF-00429", name: "Suresh N. Deshmukh", state: "Maharashtra", district: "Nagpur", project: "Nagpur Metro Expansion — Phase 02", awardId: "AWD-2026-0185", awardAmount: 24800000, parcelRef: "PL-2026-00429", awardRef: "AWD-2026-0185", paymentAmount: 720000, paymentStatus: "initiated", bankVerification: "verified", maskedAccount: "•••• •••• 8834", ifsc: "ANDB0001234", bankName: "Andhra Bank", accountSource: "verified_by_officer", status: "active", paymentReference: "MOCK-PFMS-88220", lastUpdated: "09 Sep 2026" },
  { beneficiaryId: "BEN-00430", familyId: "AF-00430", name: "Meena S. Wankhede", state: "Maharashtra", district: "Nagpur", project: "Nagpur Metro Expansion — Phase 02", awardId: "AWD-2026-0185", awardAmount: 24800000, parcelRef: "PL-2026-00430", awardRef: "AWD-2026-0185", paymentAmount: 450000, paymentStatus: "pending", bankVerification: "pending_verification", maskedAccount: "•••• •••• 5567", ifsc: "MAHB0005678", bankName: "Bank of Maharashtra", accountSource: "self_declared", status: "active", lastUpdated: "06 Sep 2026" },
  { beneficiaryId: "BEN-00431", familyId: "AF-00431", name: "Ramesh T. Bhamare", state: "Maharashtra", district: "Pune", project: "Mumbai-Pune Expressway Extension", awardId: "AWD-2026-0187", awardAmount: 15800000, parcelRef: "PL-2026-00431", awardRef: "AWD-2026-0187", paymentAmount: 830000, paymentStatus: "failed", bankVerification: "mismatch", maskedAccount: "•••• •••• 7712", ifsc: "IOBA0009012", bankName: "Indian Overseas Bank", accountSource: "self_declared", status: "active", paymentReference: "MOCK-PFMS-88221", lastUpdated: "08 Sep 2026" },
  { beneficiaryId: "BEN-00432", familyId: "AF-00432", name: "Anita P. Gavhane", state: "Maharashtra", district: "Jalna", project: "Eastern Freight Corridor — Pkg 04", awardId: "AWD-2026-0186", awardAmount: 11200000, parcelRef: "PL-2026-00432", awardRef: "AWD-2026-0186", paymentAmount: 295000, paymentStatus: "completed", bankVerification: "verified", maskedAccount: "•••• •••• 3345", ifsc: "BKID0003456", bankName: "Bank of India", accountSource: "verified_by_officer", status: "active", paymentReference: "MOCK-PFMS-88222", lastUpdated: "09 Sep 2026" },
];

export const PAYMENT_INSTRUCTIONS: PaymentInstruction[] = [
  { paymentId: "PAY-2026-0091", awardId: "AWD-2026-0182", beneficiaryId: "BEN-00421", beneficiaryName: "Renuka Bai Gurav", familyId: "AF-00421", amount: 482500, status: "completed", externalReference: "MOCK-PFMS-88214", initiatedDate: "10 Sep 2026", completedDate: "10 Sep 2026", retryEligible: false, retryCount: 0, lastUpdated: "10 Sep 2026" },
  { paymentId: "PAY-2026-0092", awardId: "AWD-2026-0182", beneficiaryId: "BEN-00423", beneficiaryName: "Sukhdeo D. Patil", familyId: "AF-00423", amount: 620000, status: "initiated", externalReference: "MOCK-PFMS-88215", initiatedDate: "09 Sep 2026", retryEligible: false, retryCount: 0, lastUpdated: "09 Sep 2026" },
  { paymentId: "PAY-2026-0093", awardId: "AWD-2026-0183", beneficiaryId: "BEN-00424", beneficiaryName: "Geeta Devi Sharma", familyId: "AF-00424", amount: 275000, status: "failed", externalReference: "MOCK-PFMS-88216", initiatedDate: "08 Sep 2026", failedDate: "08 Sep 2026", failureReason: "Beneficiary account details mismatch", retryEligible: true, retryCount: 1, lastUpdated: "08 Sep 2026" },
  { paymentId: "PAY-2026-0094", awardId: "AWD-2026-0183", beneficiaryId: "BEN-00425", beneficiaryName: "Tukaram B. More", familyId: "AF-00425", amount: 540000, status: "completed", externalReference: "MOCK-PFMS-88217", initiatedDate: "09 Sep 2026", completedDate: "09 Sep 2026", retryEligible: false, retryCount: 0, lastUpdated: "09 Sep 2026" },
  { paymentId: "PAY-2026-0095", awardId: "AWD-2026-0182", beneficiaryId: "BEN-00426", beneficiaryName: "Lata V. Jadhav", familyId: "AF-00426", amount: 390000, status: "pending_verification", externalReference: "MOCK-PFMS-88218", initiatedDate: "09 Sep 2026", retryEligible: false, retryCount: 0, lastUpdated: "10 Sep 2026" },
  { paymentId: "PAY-2026-0096", awardId: "AWD-2026-0184", beneficiaryId: "BEN-00428", beneficiaryName: "Ashok P. Dhumal", familyId: "AF-00428", amount: 185000, status: "returned", externalReference: "MOCK-PFMS-88219", initiatedDate: "07 Sep 2026", failedDate: "07 Sep 2026", failureReason: "Payment returned — account does not exist", retryEligible: true, retryCount: 1, lastUpdated: "07 Sep 2026" },
  { paymentId: "PAY-2026-0097", awardId: "AWD-2026-0185", beneficiaryId: "BEN-00429", beneficiaryName: "Suresh N. Deshmukh", familyId: "AF-00429", amount: 720000, status: "initiated", externalReference: "MOCK-PFMS-88220", initiatedDate: "09 Sep 2026", retryEligible: false, retryCount: 0, lastUpdated: "09 Sep 2026" },
  { paymentId: "PAY-2026-0098", awardId: "AWD-2026-0187", beneficiaryId: "BEN-00431", beneficiaryName: "Ramesh T. Bhamare", familyId: "AF-00431", amount: 830000, status: "failed", externalReference: "MOCK-PFMS-88221", initiatedDate: "08 Sep 2026", failedDate: "08 Sep 2026", failureReason: "IFSC code mismatch — bank branch not found", retryEligible: true, retryCount: 1, lastUpdated: "08 Sep 2026" },
];

export const PAYMENT_EXCEPTIONS: PaymentException[] = [
  { exceptionId: "EX-042-001", paymentId: "PAY-2026-0093", awardId: "AWD-2026-0183", beneficiaryId: "BEN-00424", beneficiaryName: "Geeta Devi Sharma", category: "bank_detail_mismatch", severity: "high", assignedTo: "Smt. R. Kulkarni", createdDate: "08 Sep 2026", dueDate: "12 Sep 2026", status: "open", description: "Bank account number does not match beneficiary records. Payment failed.", externalReference: "MOCK-PFMS-88216" },
  { exceptionId: "EX-042-002", paymentId: "PAY-2026-0096", awardId: "AWD-2026-0184", beneficiaryId: "BEN-00428", beneficiaryName: "Ashok P. Dhumal", category: "bank_detail_mismatch", severity: "critical", assignedTo: "Smt. R. Kulkarni", createdDate: "07 Sep 2026", dueDate: "10 Sep 2026", status: "in_review", description: "Account does not exist at the provided bank. Beneficiary must provide correct account details.", externalReference: "MOCK-PFMS-88219" },
  { exceptionId: "EX-042-003", paymentId: "PAY-2026-0098", awardId: "AWD-2026-0187", beneficiaryId: "BEN-00431", beneficiaryName: "Ramesh T. Bhamare", category: "bank_detail_mismatch", severity: "high", assignedTo: "Smt. R. Kulkarni", createdDate: "08 Sep 2026", dueDate: "12 Sep 2026", status: "open", description: "IFSC code invalid — bank branch not found in RBI database.", externalReference: "MOCK-PFMS-88221" },
  { exceptionId: "EX-042-004", paymentId: "", awardId: "AWD-2026-0185", beneficiaryId: "BEN-00430", beneficiaryName: "Meena S. Wankhede", category: "beneficiary_verification", severity: "medium", assignedTo: "Smt. R. Kulkarni", createdDate: "06 Sep 2026", dueDate: "14 Sep 2026", status: "awaiting_correction", description: "Beneficiary bank details pending verification — submitted details not yet confirmed." },
  { exceptionId: "EX-042-005", paymentId: "", awardId: "AWD-2026-0185", beneficiaryId: "", beneficiaryName: "", category: "missing_document", severity: "medium", assignedTo: "Smt. R. Kulkarni", createdDate: "05 Sep 2026", dueDate: "15 Sep 2026", status: "open", description: "Payment authorization document missing for 3 beneficiaries in AWD-2026-0185." },
  { exceptionId: "EX-042-006", paymentId: "", awardId: "AWD-2026-0187", beneficiaryId: "", beneficiaryName: "", category: "missing_document", severity: "low", assignedTo: "Smt. R. Kulkarni", createdDate: "04 Sep 2026", dueDate: "18 Sep 2026", status: "open", description: "Award order copy not uploaded for AWD-2026-0187." },
  { exceptionId: "EX-042-007", paymentId: "", awardId: "AWD-2026-0189", beneficiaryId: "", beneficiaryName: "", category: "missing_document", severity: "high", assignedTo: "Smt. R. Kulkarni", createdDate: "03 Sep 2026", dueDate: "10 Sep 2026", status: "escalation_pending", description: "Multiple documents missing — payment package incomplete for 5 beneficiaries." },
  { exceptionId: "EX-042-008", paymentId: "PAY-2026-0095", awardId: "AWD-2026-0182", beneficiaryId: "BEN-00426", beneficiaryName: "Lata V. Jadhav", category: "beneficiary_verification", severity: "medium", assignedTo: "Smt. R. Kulkarni", createdDate: "10 Sep 2026", dueDate: "14 Sep 2026", status: "open", description: "Payment deposited but beneficiary-side verification pending.", externalReference: "MOCK-PFMS-88218" },
  { exceptionId: "EX-042-009", paymentId: "", awardId: "AWD-2026-0182", beneficiaryId: "BEN-00422", beneficiaryName: "Baburao S. Kshirsagar", category: "other", severity: "low", assignedTo: "Smt. R. Kulkarni", createdDate: "08 Sep 2026", dueDate: "20 Sep 2026", status: "resolved", description: "Minor discrepancy in beneficiary name spelling — corrected.", resolution: "Name corrected in beneficiary records. Payment cleared.", resolvedDate: "09 Sep 2026" },
];

export const RECONCILIATION_RECORDS: ReconciliationRecord[] = [
  { reconciliationId: "REC-001", paymentId: "PAY-2026-0091", awardId: "AWD-2026-0182", externalReference: "MOCK-PFMS-88214", internalAmount: 482500, externalAmount: 482500, status: "matched", reconciliation: "matched", difference: 0, internalDate: "10 Sep 2026", externalDate: "10 Sep 2026", resolution: "Auto-matched" },
  { reconciliationId: "REC-002", paymentId: "PAY-2026-0094", awardId: "AWD-2026-0183", externalReference: "MOCK-PFMS-88217", internalAmount: 540000, externalAmount: 540000, status: "matched", reconciliation: "matched", difference: 0, internalDate: "09 Sep 2026", externalDate: "09 Sep 2026", resolution: "Auto-matched" },
  { reconciliationId: "REC-003", paymentId: "PAY-2026-0092", awardId: "AWD-2026-0182", externalReference: "MOCK-PFMS-88215", internalAmount: 620000, externalAmount: 620000, status: "partial", reconciliation: "pending", difference: 0, internalDate: "09 Sep 2026", externalDate: "" },
  { reconciliationId: "REC-004", paymentId: "PAY-2026-0093", awardId: "AWD-2026-0183", externalReference: "MOCK-PFMS-88216", internalAmount: 275000, externalAmount: 275000, status: "mismatched", reconciliation: "status_mismatch", difference: 0, internalDate: "08 Sep 2026", externalDate: "08 Sep 2026" },
  { reconciliationId: "REC-005", paymentId: "PAY-2026-0095", awardId: "AWD-2026-0182", externalReference: "MOCK-PFMS-88218", internalAmount: 390000, externalAmount: 390000, status: "partial", reconciliation: "pending", difference: 0, internalDate: "09 Sep 2026", externalDate: "10 Sep 2026" },
  { reconciliationId: "REC-006", paymentId: "PAY-2026-0096", awardId: "AWD-2026-0184", externalReference: "MOCK-PFMS-88219", internalAmount: 185000, externalAmount: 185000, status: "mismatched", reconciliation: "reference_missing", difference: 0, internalDate: "07 Sep 2026", externalDate: "" },
  { reconciliationId: "REC-007", paymentId: "PAY-2026-0098", awardId: "AWD-2026-0187", externalReference: "MOCK-PFMS-88221", internalAmount: 830000, externalAmount: 830000, status: "mismatched", reconciliation: "status_mismatch", difference: 0, internalDate: "08 Sep 2026", externalDate: "08 Sep 2026" },
];

export const FINANCE_AUDIT_TRAIL: FinanceAuditEntry[] = [
  { id: "FA-042-001", timestamp: "05 Sep 2026 09:00", action: "Payment package reviewed", actor: "Smt. R. Kulkarni", section: "Package Review", details: "AWD-2026-0182 payment package reviewed — 17 beneficiaries" },
  { id: "FA-042-002", timestamp: "06 Sep 2026 10:30", action: "Beneficiary verification updated", actor: "Smt. R. Kulkarni", section: "Verification", details: "12 of 17 bank details verified for AWD-2026-0182" },
  { id: "FA-042-003", timestamp: "07 Sep 2026 11:00", action: "Payment instruction initiated", actor: "Smt. R. Kulkarni", section: "Payment", details: "PAY-2026-0096 initiated for AF-00428 — ₹1,85,000" },
  { id: "FA-042-004", timestamp: "07 Sep 2026 14:30", action: "Payment returned", actor: "System (PFMS Mock)", section: "Payment", details: "PAY-2026-0096 returned — account does not exist" },
  { id: "FA-042-005", timestamp: "08 Sep 2026 09:15", action: "Exception created", actor: "System", section: "Exception", details: "EX-042-002 created — bank detail mismatch for AF-00428" },
  { id: "FA-042-006", timestamp: "08 Sep 2026 10:00", action: "Payment instruction initiated", actor: "Smt. R. Kulkarni", section: "Payment", details: "PAY-2026-0093 initiated for AF-00424 — ₹2,75,000" },
  { id: "FA-042-007", timestamp: "08 Sep 2026 15:00", action: "Payment failed", actor: "System (PFMS Mock)", section: "Payment", details: "PAY-2026-0093 failed — beneficiary account details mismatch" },
  { id: "FA-042-008", timestamp: "09 Sep 2026 09:00", action: "Payment completed", actor: "System (PFMS Mock)", section: "Payment", details: "PAY-2026-0094 completed — ₹5,40,000 deposited to AF-00425" },
  { id: "FA-042-009", timestamp: "09 Sep 2026 11:00", action: "Payment initiated batch", actor: "Smt. R. Kulkarni", section: "Payment", details: "Batch of 3 payments initiated — PAY-2026-0092, 0095, 0097" },
  { id: "FA-042-010", timestamp: "10 Sep 2026 09:30", action: "Payment completed", actor: "System (PFMS Mock)", section: "Payment", details: "PAY-2026-0091 completed — ₹4,82,500 deposited to AF-00421" },
  { id: "FA-042-011", timestamp: "10 Sep 2026 10:00", action: "Pending verification flagged", actor: "System (PFMS Mock)", section: "Verification", details: "PAY-2026-0095 — deposit indicated but beneficiary verification pending" },
  { id: "FA-042-012", timestamp: "10 Sep 2026 11:00", action: "Reconciliation completed", actor: "Smt. R. Kulkarni", section: "Reconciliation", details: "PAY-2026-0091 reconciliation matched — ₹4,82,500" },
];

export const PAYMENT_DOCUMENTS: PaymentDocument[] = [
  { docId: "PD-042-001", type: "Award Order", category: "award", relatedAward: "AWD-2026-0182", date: "15 Aug 2026", status: "available", uploadedBy: "Smt. R. Kulkarni" },
  { docId: "PD-042-002", type: "Payment Authorization", category: "payment", relatedAward: "AWD-2026-0182", date: "05 Sep 2026", status: "available", uploadedBy: "Smt. R. Kulkarni" },
  { docId: "PD-042-003", type: "Beneficiary Verification", category: "beneficiary", relatedAward: "AWD-2026-0182", date: "06 Sep 2026", status: "available", uploadedBy: "Smt. R. Kulkarni" },
  { docId: "PD-042-004", type: "Bank Verification", category: "bank", relatedAward: "AWD-2026-0182", date: "06 Sep 2026", status: "available", uploadedBy: "Smt. R. Kulkarni" },
  { docId: "PD-042-005", type: "Payment Instruction", category: "payment", relatedAward: "AWD-2026-0182", relatedPayment: "PAY-2026-0091", date: "10 Sep 2026", status: "available", uploadedBy: "Smt. R. Kulkarni" },
  { docId: "PD-042-006", type: "External Confirmation", category: "payment", relatedAward: "AWD-2026-0182", relatedPayment: "PAY-2026-0091", date: "10 Sep 2026", status: "available", uploadedBy: "System" },
  { docId: "PD-042-007", type: "Award Order", category: "award", relatedAward: "AWD-2026-0185", date: "22 Aug 2026", status: "available", uploadedBy: "Smt. R. Kulkarni" },
  { docId: "PD-042-008", type: "Payment Authorization", category: "payment", relatedAward: "AWD-2026-0185", date: "01 Sep 2026", status: "missing" },
  { docId: "PD-042-009", type: "Beneficiary Verification", category: "beneficiary", relatedAward: "AWD-2026-0185", date: "02 Sep 2026", status: "available", uploadedBy: "Smt. R. Kulkarni" },
  { docId: "PD-042-010", type: "Award Order", category: "award", relatedAward: "AWD-2026-0187", date: "28 Aug 2026", status: "missing" },
  { docId: "PD-042-011", type: "Exception Resolution", category: "exception", relatedAward: "AWD-2026-0182", relatedPayment: "PAY-2026-0093", date: "09 Sep 2026", status: "available", uploadedBy: "Smt. R. Kulkarni" },
];

export const PAYMENT_WORK_QUEUE: PaymentWorkItem[] = [
  { id: "WQ-FN-001", title: "Resolve bank detail mismatch — AF-00428", description: "EX-042-002 — account does not exist. Beneficiary must provide correct details.", priority: "critical", dueDate: "10 Sep 2026", category: "critical", paymentId: "PAY-2026-0096" },
  { id: "WQ-FN-002", title: "Review failed payment — AF-00424", description: "EX-042-001 — account number mismatch. Verify corrected details.", priority: "high", dueDate: "12 Sep 2026", category: "critical", paymentId: "PAY-2026-0093" },
  { id: "WQ-FN-003", title: "Verify deposited payment — AF-00426", description: "PAY-2026-0095 — deposit indicated, beneficiary verification pending.", priority: "high", dueDate: "14 Sep 2026", category: "due_soon", paymentId: "PAY-2026-0095" },
  { id: "WQ-FN-004", title: "Review IFSC mismatch — AF-00431", description: "EX-042-003 — bank branch not found. Request corrected IFSC.", priority: "medium", dueDate: "12 Sep 2026", category: "due_soon", paymentId: "PAY-2026-0098" },
  { id: "WQ-FN-005", title: "Payment package review — AWD-2026-0186", description: "14 beneficiaries — payment-ready. Initiate payment.", priority: "medium", dueDate: "15 Sep 2026", category: "routine" },
  { id: "WQ-FN-006", title: "Generate monthly payment MIS", description: "Monthly finance report due.", priority: "low", dueDate: "15 Sep 2026", category: "routine" },
];

export const PAYMENT_RISKS: PaymentRisk[] = [
  { riskId: "PR-001", description: "12 beneficiaries have payment details pending verification across 2 awards", severity: "high", affectedCases: 12, owner: "Smt. R. Kulkarni", dueDate: "14 Sep 2026", status: "open" },
  { riskId: "PR-002", description: "3 payments returned by external system — correction required", severity: "high", affectedCases: 3, owner: "Smt. R. Kulkarni", dueDate: "12 Sep 2026", status: "open" },
  { riskId: "PR-003", description: "5 payment packages awaiting supporting documents", severity: "medium", affectedCases: 5, owner: "Smt. R. Kulkarni", dueDate: "18 Sep 2026", status: "open" },
  { riskId: "PR-004", description: "1 payment pending beneficiary-side verification (deposited)", severity: "medium", affectedCases: 1, owner: "Smt. R. Kulkarni", dueDate: "14 Sep 2026", status: "mitigating" },
  { riskId: "PR-005", description: "AWD-2026-0189 blocked — 5 of 11 beneficiaries lack complete documentation", severity: "critical", affectedCases: 5, owner: "Smt. R. Kulkarni", dueDate: "10 Sep 2026", status: "open" },
];

export const PROJECT_PAYMENT_SUMMARIES: ProjectPaymentSummary[] = [
  { projectId: "PRJ-001", project: "Eastern Freight Corridor — Pkg 04", state: "Maharashtra", district: "Jalna", totalAwards: 27, totalAwardAmountCr: 18.4, beneficiaries: 218, completedPayments: 131, pendingPayments: 38, failedPayments: 9, pendingVerification: 6, openExceptions: 5, completionPercentage: 71 },
  { projectId: "PRJ-002", project: "Nagpur Metro Expansion — Phase 02", state: "Maharashtra", district: "Nagpur", totalAwards: 15, totalAwardAmountCr: 9.8, beneficiaries: 134, completedPayments: 72, pendingPayments: 18, failedPayments: 5, pendingVerification: 3, openExceptions: 3, completionPercentage: 73 },
  { projectId: "PRJ-003", project: "Mumbai-Pune Expressway Extension", state: "Maharashtra", district: "Pune", totalAwards: 12, totalAwardAmountCr: 7.4, beneficiaries: 89, completedPayments: 58, pendingPayments: 10, failedPayments: 4, pendingVerification: 2, openExceptions: 4, completionPercentage: 78 },
  { projectId: "PRJ-004", project: "Bhopal Indore Industrial Corridor", state: "Madhya Pradesh", district: "Indore", totalAwards: 19, totalAwardAmountCr: 14.2, beneficiaries: 167, completedPayments: 108, pendingPayments: 24, failedPayments: 6, pendingVerification: 4, openExceptions: 2, completionPercentage: 76 },
];

export const STATE_PAYMENT_SUMMARIES: StatePaymentSummary[] = [
  { state: "Maharashtra", totalProjects: 3, totalAwards: 54, totalAwardAmountCr: 35.6, beneficiaries: 441, completedPayments: 261, pendingPayments: 66, failedPayments: 18, pendingVerification: 11, completionPercentage: 73, openExceptions: 12 },
  { state: "Madhya Pradesh", totalProjects: 1, totalAwards: 19, totalAwardAmountCr: 14.2, beneficiaries: 167, completedPayments: 108, pendingPayments: 24, failedPayments: 6, pendingVerification: 4, completionPercentage: 76, openExceptions: 2 },
  { state: "Odisha", totalProjects: 2, totalAwards: 23, totalAwardAmountCr: 16.8, beneficiaries: 198, completedPayments: 124, pendingPayments: 32, failedPayments: 8, pendingVerification: 4, completionPercentage: 74, openExceptions: 5 },
];
