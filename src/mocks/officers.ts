import type { RoleId } from "@/types/rbac";

export type MockOfficer = {
  id: string;
  name: string;
  designation: string;
  roleId: RoleId;
  jurisdiction: string;
  email: string;
  phoneMasked: string;
};

export const MOCK_OFFICERS: MockOfficer[] = [
  { id: "off-01", name: "Smt. Meera Joshi, IAS", designation: "Joint Secretary, DoLR", roleId: "national_admin", jurisdiction: "National — New Delhi", email: "js-dolr@nic.in", phoneMasked: "XXXX-XX-0011" },
  { id: "off-02", name: "Shri. Rajiv Malhotra, IAS", designation: "Director (Admin), MoRTH", roleId: "ministry_nodal", jurisdiction: "MoRTH — New Delhi", email: "dir-morth@nic.in", phoneMasked: "XXXX-XX-0012" },
  { id: "off-03", name: "Shri. A. Deshmukh", designation: "CGM (T), NHAI-RO Pune", roleId: "requiring_org", jurisdiction: "NHAI — Pune Region", email: "cgm-pune@nhai.org", phoneMasked: "XXXX-XX-0013" },
  { id: "off-04", name: "Shri. R. K. Sable, IAS", designation: "Principal Secretary (Revenue), GoM", roleId: "state_nodal", jurisdiction: "Maharashtra — Mumbai", email: "ps-revenue@maharashtra.gov.in", phoneMasked: "XXXX-XX-0014" },
  { id: "off-05", name: "Dr. Suhas Diwase, IAS", designation: "Collector & District Magistrate, Pune", roleId: "collector_cala", jurisdiction: "Pune District", email: "collector.pune@maharashtra.gov.in", phoneMasked: "XXXX-XX-0015" },
  { id: "off-06", name: "Smt. Kavita Patil", designation: "Sub-Divisional Officer, Haveli", roleId: "tehsil_sdo", jurisdiction: "Haveli Tehsil, Pune", email: "sdo.haveli@maharashtra.gov.in", phoneMasked: "XXXX-XX-0016" },
  { id: "off-07", name: "Shri. M. Kamble", designation: "Village Accountant (VAO), Mulshi Circle", roleId: "field_officer", jurisdiction: "Mulshi — Pune", email: "vao.mulshi@maharashtra.gov.in", phoneMasked: "XXXX-XX-0017" },
  { id: "off-08", name: "Prof. S. Mishra", designation: "SIA Expert Group Lead, IIT Bhubaneswar", roleId: "sia_expert", jurisdiction: "Khordha — SIA Cases", email: "sia-lead@iitbbs.ac.in", phoneMasked: "XXXX-XX-0018" },
  { id: "off-09", name: "Smt. Asha Khedkar", designation: "R&R Officer, Pune District", roleId: "rnr_officer", jurisdiction: "Pune — R&R Division", email: "rero.pune@maharashtra.gov.in", phoneMasked: "XXXX-XX-0019" },
  { id: "off-10", name: "Smt. R. Kulkarni", designation: "Finance & Payment Officer, Pune", roleId: "finance_officer", jurisdiction: "Pune District — PFMS Cell", email: "finance.pune@maharashtra.gov.in", phoneMasked: "XXXX-XX-0020" },
  { id: "off-11", name: "Shri. Baban R. Khomane", designation: "Landholder — Pargaon, Purandar", roleId: "citizen", jurisdiction: "Pargaon, Purandar — Pune", email: "—", phoneMasked: "XXXX-XX-1101" },
  { id: "off-12", name: "Dr. Vipin Itankar, IAS", designation: "Collector & District Magistrate, Nagpur", roleId: "collector_cala", jurisdiction: "Nagpur District", email: "collector.nagpur@maharashtra.gov.in", phoneMasked: "XXXX-XX-0021" },
];
