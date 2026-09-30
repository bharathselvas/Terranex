// SIA Expert Group data types and mock data

// ── Assessment Status ──
export type SiaAssessmentStatus =
  | "assigned"
  | "in_progress"
  | "consultation_pending"
  | "evidence_pending"
  | "draft"
  | "ready_for_submission"
  | "clarification_required"
  | "submitted"
  | "accepted";

// ── Assessment ──
export type SiaAssessment = {
  id: string;
  projectId: string;
  projectName: string;
  requiringOrg: string;
  state: string;
  district: string;
  villages: string[];
  affectedFamilies: number;
  affectedParcels: number;
  progress: number;
  consultationStatus: "not_started" | "partial" | "pending" | "completed";
  evidenceStatus: "incomplete" | "pending" | "complete";
  dueDate: string;
  status: SiaAssessmentStatus;
  assignedDate: string;
  assignedBy: string;
};

// ── Affected Family ──
export type AffectedFamily = {
  id: string;
  name: string;
  village: string;
  parcelId: string;
  ulpin: string;
  landHolding: string;
  landUse: string;
  displacement: "none" | "partial" | "full";
  livelihoodAffected: boolean;
  vulnerabilityIndicators: string[];
  verificationStatus: "pending" | "verified" | "rejected";
  evidenceCount: number;
  assessmentStatus: "not_started" | "in_progress" | "completed";
  householdSize: number;
  headOfFamily: string;
  occupation: string;
  incomeSource: string;
  agriculturalImpact: boolean;
  residentialDisplacement: boolean;
  commercialImpact: boolean;
  communityImpact: boolean;
};

// ── Social Impact Assessment ──
export type SocialImpact = {
  affectedFamiliesCount: number;
  personsAffected: number;
  directlyAffected: number;
  indirectlyAffected: number;
  housesAffected: number;
  partialDisplacement: number;
  fullDisplacement: number;
  rentalCommercialStructures: number;
  agriculturalLandAffected: string;
  irrigatedLand: string;
  nonIrrigatedLand: string;
  croppingImpact: string;
  livelihoodDependency: string;
  primaryOccupation: string;
  secondaryOccupation: string;
  wageEmploymentImpact: string;
  businessImpact: string;
  commonResourceDependency: string;
  roads: number;
  schools: number;
  healthFacilities: number;
  waterSources: number;
  religiousCommunityStructures: number;
  publicUtilities: number;
};

// ── Gram Sabha ──
export type GramSabhaStatus =
  | "scheduled"
  | "conducted"
  | "minutes_pending"
  | "evidence_pending"
  | "completed";

export type GramSabha = {
  id: string;
  village: string;
  date: string;
  location: string;
  facilitator: string;
  attendanceCount: number;
  affectedFamiliesRepresented: number;
  minutes: string;
  resolution: string;
  evidenceCount: number;
  pesaRelevance: "yes" | "no" | "na" | "requires_review";
  fraRelevance: "yes" | "no" | "na" | "requires_review";
  status: GramSabhaStatus;
  communityConcerns: string[];
  questionsRaised: string[];
  resolutionsRecommendations: string[];
  dissentingViews: string[];
};

// ── Public Consultation ──
export type PublicConsultation = {
  id: string;
  eventType: string;
  village: string;
  location: string;
  date: string;
  participants: number;
  issuesRaised: string[];
  stakeholderCategory: string;
  evidenceCount: number;
  minutes: string;
  unresolvedConcerns: string[];
  status: "scheduled" | "conducted" | "completed";
};

// ── Stakeholder Consultation ──
export type StakeholderConsultation = {
  id: string;
  stakeholder: string;
  issueRaised: string;
  impactCategory: string;
  responseObservation: string;
  evidenceCount: number;
  followUpRequired: boolean;
  date: string;
};

// ── Public Asset ──
export type PublicAsset = {
  id: string;
  assetType: string;
  village: string;
  location: string;
  impact: string;
  severity: "none" | "minor" | "moderate" | "major" | "critical";
  evidenceCount: number;
  remarks: string;
};

// ── Evidence ──
export type EvidenceItem = {
  id: string;
  type: "document" | "photograph" | "consultation_minutes" | "attendance" | "map" | "field_note" | "survey_data" | "other";
  title: string;
  siaSection: string;
  relatedTo: string;
  capturedDate: string;
  uploadedBy: string;
  status: "uploaded" | "verified" | "pending";
};

// ── Findings ──
export type ImpactRating = "low" | "moderate" | "high" | "severe";

export type FindingCategory =
  | "social"
  | "livelihood"
  | "displacement"
  | "public_infrastructure"
  | "community"
  | "vulnerable_population"
  | "environmental";

export type Finding = {
  category: FindingCategory;
  label: string;
  rating: ImpactRating;
  evidenceReference: string;
  expertObservation: string;
  remarks: string;
};

// ── Mitigation ──
export type MitigationItem = {
  id: string;
  impact: string;
  affectedGroup: string;
  recommendation: string;
  responsibleStakeholder: string;
  priority: "critical" | "high" | "medium" | "low";
  evidenceCount: number;
  status: "pending" | "in_progress" | "completed";
};

// ── Clarification ──
export type ClarificationStatus = "open" | "in_progress" | "responded" | "closed";

export type Clarification = {
  id: string;
  requestedBy: string;
  date: string;
  question: string;
  affectedSection: string;
  priority: "critical" | "high" | "medium" | "low";
  dueDate: string;
  status: ClarificationStatus;
  response?: string;
  respondedDate?: string;
};

// ── Version History ──
export type AssessmentVersion = {
  version: string;
  status: "draft" | "revised" | "submitted";
  date: string;
  report: string;
  evidenceCount: number;
  actor: string;
};

// ── Audit Entry ──
export type SiaAuditEntry = {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  section: string;
  details: string;
};

// ── Notification ──
export type SiaNotification = {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: "info" | "warning" | "urgent";
  read: boolean;
  link?: string;
};

// ── Work Queue ──
export type WorkQueueItem = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "critical" | "high" | "medium" | "low";
  type: "new_assignment" | "consultation_pending" | "evidence_incomplete" | "draft_report" | "clarification_request" | "submission_due";
  assessmentId?: string;
};

// ═══════════════════════════════════════════════════════════════════════
// MOCK DATA — All data is for SIA-2026-0042
// ═══════════════════════════════════════════════════════════════════════

export const SIA_PROJECT = {
  projectName: "Eastern Freight Corridor Expansion — Package 04",
  projectId: "PRJ-2025-00187",
  requiringOrg: "National Infrastructure Development Corporation (NIDC)",
  state: "Maharashtra",
  district: "Jalna",
  tehsils: ["Bhokardan", "Jalna", "Ambad"],
  villages: ["Kharpudi", "Wadgaon", "Rajuri", "Bhokardan Road"],
  footprint: "42.3 km corridor width 30m",
  affectedParcels: 163,
  estimatedFamilies: 218,
  projectStage: "Scrutiny Complete",
  scrutinyStatus: "Approved",
  siaAssignmentDate: "12 Aug 2026",
  assessmentDueDate: "12 Sep 2026",
  implementingAgency: "NIDC — Freight Division",
};

export const SIA_ID = "SIA-2026-0042";

// ── Assessments ──
export const SIA_ASSESSMENTS: SiaAssessment[] = [
  {
    id: "SIA-2026-0042",
    projectId: "PRJ-2025-00187",
    projectName: "Eastern Freight Corridor Expansion — Package 04",
    requiringOrg: "NIDC",
    state: "Maharashtra",
    district: "Jalna",
    villages: ["Kharpudi", "Wadgaon", "Rajuri", "Bhokardan Road"],
    affectedFamilies: 218,
    affectedParcels: 163,
    progress: 72,
    consultationStatus: "partial",
    evidenceStatus: "incomplete",
    dueDate: "12 Sep 2026",
    status: "in_progress",
    assignedDate: "12 Aug 2026",
    assignedBy: "Dr. Rajesh Kumar — District Collector, Jalna",
  },
  {
    id: "SIA-2026-0051",
    projectId: "PRJ-2025-00203",
    projectName: "Pune Metro Phase III — Corridor B",
    requiringOrg: "Maharashtra Metro Rail Corporation",
    state: "Maharashtra",
    district: "Pune",
    villages: ["Wanowrie", "Kondhwa", "Undri"],
    affectedFamilies: 87,
    affectedParcels: 62,
    progress: 45,
    consultationStatus: "partial",
    evidenceStatus: "incomplete",
    dueDate: "18 Sep 2026",
    status: "in_progress",
    assignedDate: "05 Aug 2026",
    assignedBy: "Ms. Priya Deshmukh — SIA Director",
  },
  {
    id: "SIA-2026-0067",
    projectId: "PRJ-2025-00221",
    projectName: "Nagpur–Mumbai Super Expressway Extension",
    requiringOrg: "NHAI",
    state: "Maharashtra",
    district: "Washim",
    villages: ["Pimpalner", "Mangrulpir"],
    affectedFamilies: 54,
    affectedParcels: 41,
    progress: 15,
    consultationStatus: "not_started",
    evidenceStatus: "incomplete",
    dueDate: "25 Sep 2026",
    status: "assigned",
    assignedDate: "01 Sep 2026",
    assignedBy: "Dr. Rajesh Kumar — District Collector, Jalna",
  },
  {
    id: "SIA-2026-0038",
    projectId: "PRJ-2025-00175",
    projectName: "Mumbai Trans-Harbour Link — Approach Roads",
    requiringOrg: "MMRDA",
    state: "Maharashtra",
    district: "Thane",
    villages: ["Ulwe", "Dronagiri", "Pushpak Nagar"],
    affectedFamilies: 156,
    affectedParcels: 118,
    progress: 100,
    consultationStatus: "completed",
    evidenceStatus: "complete",
    dueDate: "30 Aug 2026",
    status: "submitted",
    assignedDate: "15 Jul 2026",
    assignedBy: "Mr. Anil Pawar — SIA Director",
  },
  {
    id: "SIA-2026-0072",
    projectId: "PRJ-2025-00230",
    projectName: "Kolhapur Water Supply Augmentation",
    requiringOrg: "Jal Jeevan Mission",
    state: "Maharashtra",
    district: "Kolhapur",
    villages: ["Kavathemahankal", "Gadhinglaj"],
    affectedFamilies: 31,
    affectedParcels: 22,
    progress: 88,
    consultationStatus: "completed",
    evidenceStatus: "incomplete",
    dueDate: "08 Sep 2026",
    status: "draft",
    assignedDate: "20 Jul 2026",
    assignedBy: "Dr. Rajesh Kumar — District Collector, Jalna",
  },
];

// ── Affected Families (for SIA-2026-0042) ──
export const AFFECTED_FAMILIES: AffectedFamily[] = [
  {
    id: "AF-042-001",
    name: "Renuka Bai Gurav",
    village: "Kharpudi",
    parcelId: "MH-PN-004821",
    ulpin: "ULPIN-MH-4821-001",
    landHolding: "1.2 ha",
    landUse: "Agricultural — Irrigated",
    displacement: "partial",
    livelihoodAffected: true,
    vulnerabilityIndicators: ["Female-headed household", "Land-dependent livelihood"],
    verificationStatus: "verified",
    evidenceCount: 8,
    assessmentStatus: "completed",
    householdSize: 6,
    headOfFamily: "Renuka Bai Gurav",
    occupation: "Agriculture — Mango & Vegetable",
    incomeSource: "Farming",
    agriculturalImpact: true,
    residentialDisplacement: false,
    commercialImpact: false,
    communityImpact: true,
  },
  {
    id: "AF-042-002",
    name: "Baburao S. Kshirsagar",
    village: "Kharpudi",
    parcelId: "MH-PN-004822",
    ulpin: "ULPIN-MH-4822-001",
    landHolding: "0.8 ha",
    landUse: "Residential + Commercial",
    displacement: "full",
    livelihoodAffected: true,
    vulnerabilityIndicators: ["Elderly household", "Economically vulnerable"],
    verificationStatus: "verified",
    evidenceCount: 12,
    assessmentStatus: "completed",
    householdSize: 4,
    headOfFamily: "Baburao S. Kshirsagar",
    occupation: "Small shop owner",
    incomeSource: "Retail business",
    agriculturalImpact: false,
    residentialDisplacement: true,
    commercialImpact: true,
    communityImpact: false,
  },
  {
    id: "AF-042-003",
    name: "Sukhdeo D. Patil",
    village: "Wadgaon",
    parcelId: "MH-PN-004823",
    ulpin: "ULPIN-MH-4823-001",
    landHolding: "2.4 ha",
    landUse: "Agricultural — Rainfed",
    displacement: "partial",
    livelihoodAffected: true,
    vulnerabilityIndicators: ["Land-dependent livelihood"],
    verificationStatus: "verified",
    evidenceCount: 6,
    assessmentStatus: "completed",
    householdSize: 8,
    headOfFamily: "Sukhdeo D. Patil",
    occupation: "Agriculture — Bajra & Jowar",
    incomeSource: "Farming",
    agriculturalImpact: true,
    residentialDisplacement: false,
    commercialImpact: false,
    communityImpact: false,
  },
  {
    id: "AF-042-004",
    name: "Geeta Devi Sharma",
    village: "Rajuri",
    parcelId: "MH-PN-004824",
    ulpin: "ULPIN-MH-4824-001",
    landHolding: "0.4 ha",
    landUse: "Residential",
    displacement: "full",
    livelihoodAffected: false,
    vulnerabilityIndicators: ["Female-headed household"],
    verificationStatus: "pending",
    evidenceCount: 3,
    assessmentStatus: "in_progress",
    householdSize: 3,
    headOfFamily: "Geeta Devi Sharma",
    occupation: "Daily wage labour",
    incomeSource: "Wage employment",
    agriculturalImpact: false,
    residentialDisplacement: true,
    commercialImpact: false,
    communityImpact: false,
  },
  {
    id: "AF-042-005",
    name: "Tukaram B. More",
    village: "Bhokardan Road",
    parcelId: "MH-PN-004825",
    ulpin: "ULPIN-MH-4825-001",
    landHolding: "3.1 ha",
    landUse: "Agricultural — Irrigated",
    displacement: "none",
    livelihoodAffected: true,
    vulnerabilityIndicators: ["Scheduled Area relevance"],
    verificationStatus: "verified",
    evidenceCount: 5,
    assessmentStatus: "completed",
    householdSize: 7,
    headOfFamily: "Tukaram B. More",
    occupation: "Agriculture — Sugarcane",
    incomeSource: "Farming",
    agriculturalImpact: true,
    residentialDisplacement: false,
    commercialImpact: false,
    communityImpact: false,
  },
  {
    id: "AF-042-006",
    name: "Lata V. Jadhav",
    village: "Kharpudi",
    parcelId: "MH-PN-004826",
    ulpin: "ULPIN-MH-4826-001",
    landHolding: "0.6 ha",
    landUse: "Livestock + Residential",
    displacement: "partial",
    livelihoodAffected: true,
    vulnerabilityIndicators: ["Female-headed household", "Land-dependent livelihood"],
    verificationStatus: "pending",
    evidenceCount: 2,
    assessmentStatus: "in_progress",
    householdSize: 5,
    headOfFamily: "Lata V. Jadhav",
    occupation: "Livestock rearing",
    incomeSource: "Dairy",
    agriculturalImpact: false,
    residentialDisplacement: false,
    commercialImpact: false,
    communityImpact: false,
  },
  {
    id: "AF-042-007",
    name: "Dattatray R. Hule",
    village: "Wadgaon",
    parcelId: "MH-PN-004827",
    ulpin: "ULPIN-MH-4827-001",
    landHolding: "1.8 ha",
    landUse: "Agricultural — Mixed",
    displacement: "none",
    livelihoodAffected: true,
    vulnerabilityIndicators: ["Person with disability"],
    verificationStatus: "verified",
    evidenceCount: 7,
    assessmentStatus: "completed",
    householdSize: 5,
    headOfFamily: "Dattatray R. Hule",
    occupation: "Agriculture — Onion & Tomato",
    incomeSource: "Farming",
    agriculturalImpact: true,
    residentialDisplacement: false,
    commercialImpact: false,
    communityImpact: false,
  },
  {
    id: "AF-042-008",
    name: "Ashok P. Dhumal",
    village: "Rajuri",
    parcelId: "MH-PN-004828",
    ulpin: "ULPIN-MH-4828-001",
    landHolding: "0.3 ha",
    landUse: "Commercial — Workshop",
    displacement: "full",
    livelihoodAffected: true,
    vulnerabilityIndicators: ["Economically vulnerable"],
    verificationStatus: "pending",
    evidenceCount: 1,
    assessmentStatus: "not_started",
    householdSize: 4,
    headOfFamily: "Ashok P. Dhumal",
    occupation: "Auto repair workshop",
    incomeSource: "Business",
    agriculturalImpact: false,
    residentialDisplacement: false,
    commercialImpact: true,
    communityImpact: false,
  },
];

// ── Gram Sabha Consultations ──
export const GRAM_SABHA_CONSULTATIONS: GramSabha[] = [
  {
    id: "GS-042-001",
    village: "Kharpudi",
    date: "20 Aug 2026",
    location: "Gram Panchayat Bhawan, Kharpudi",
    facilitator: "SIA Expert — Dr. Meera Joshi",
    attendanceCount: 84,
    affectedFamiliesRepresented: 42,
    minutes: "Minutes recorded and signed by Gram Sarpanch",
    resolution: "Residents raised concerns about water canal disruption and mango orchard impact",
    evidenceCount: 5,
    pesaRelevance: "yes",
    fraRelevance: "no",
    status: "completed",
    communityConcerns: [
      "Loss of irrigation canal access",
      "Mango orchard destruction",
      "Road connectivity disruption",
    ],
    questionsRaised: [
      "Will compensation include standing crops?",
      "How will water supply be maintained during construction?",
      "What is the timeline for road restoration?",
    ],
    resolutionsRecommendations: [
      "Request for independent crop valuation",
      "Demand for temporary water supply arrangement",
      "Request for community consultation before construction",
    ],
    dissentingViews: [
      "3 families object to land acquisition without prior notice",
    ],
  },
  {
    id: "GS-042-002",
    village: "Wadgaon",
    date: "25 Aug 2026",
    location: "Vidyalaya Hall, Wadgaon",
    facilitator: "SIA Expert — Dr. Meera Joshi",
    attendanceCount: 67,
    affectedFamiliesRepresented: 38,
    minutes: "Minutes recorded — pending Gram Sarpanch signature",
    resolution: "Discussion on agricultural impact and rehabilitation",
    evidenceCount: 4,
    pesaRelevance: "yes",
    fraRelevance: "na",
    status: "minutes_pending",
    communityConcerns: [
      "Rainfed agriculture dependency",
      "Loss of common grazing land",
      "Impact on children's school access",
    ],
    questionsRaised: [
      "Will grazing land be restored?",
      "What rehabilitation support is available for rainfed farmers?",
    ],
    resolutionsRecommendations: [
      "Request for livelihood rehabilitation for non-land-owning families",
    ],
    dissentingViews: [
      "Some families want to decline compensation and retain land",
    ],
  },
  {
    id: "GS-042-003",
    village: "Rajuri",
    date: "28 Aug 2026",
    location: "Community Hall, Rajuri",
    facilitator: "SIA Expert — Dr. Meera Joshi",
    attendanceCount: 52,
    affectedFamiliesRepresented: 31,
    minutes: "Pending — meeting conducted, documentation in progress",
    resolution: "Concerns about residential displacement and school proximity",
    evidenceCount: 3,
    pesaRelevance: "no",
    fraRelevance: "no",
    status: "evidence_pending",
    communityConcerns: [
      "Residential houses in direct path",
      "School is 3 km further after road change",
      "Electricity pole relocation",
    ],
    questionsRaised: [
      "Will school bus service be provided?",
      "When will new residential plots be allotted?",
    ],
    resolutionsRecommendations: [
      "Request for school transport support",
    ],
    dissentingViews: [],
  },
  {
    id: "GS-042-004",
    village: "Bhokardan Road",
    date: "01 Sep 2026",
    location: "Gram Panchayat Bhawan, Bhokardan Road",
    facilitator: "SIA Expert — Dr. Meera Joshi",
    attendanceCount: 41,
    affectedFamiliesRepresented: 22,
    minutes: "",
    resolution: "",
    evidenceCount: 0,
    pesaRelevance: "no",
    fraRelevance: "no",
    status: "scheduled",
    communityConcerns: [],
    questionsRaised: [],
    resolutionsRecommendations: [],
    dissentingViews: [],
  },
];

// ── Public Consultations ──
export const PUBLIC_CONSULTATIONS: PublicConsultation[] = [
  {
    id: "PC-042-001",
    eventType: "Public Hearing",
    village: "Jalna District Collectorate",
    location: "Collectorate Auditorium",
    date: "22 Aug 2026",
    participants: 127,
    issuesRaised: [
      "Impact on agricultural livelihoods",
      "Environmental concerns — tree felling",
      "Rehabilitation timeline clarity",
    ],
    stakeholderCategory: "General Public",
    evidenceCount: 4,
    minutes: "Official minutes recorded by District Revenue Officer",
    unresolvedConcerns: [
      "No clear timeline for rehabilitation",
    ],
    status: "conducted",
  },
  {
    id: "PC-042-002",
    eventType: "Stakeholder Workshop",
    village: "Bhokardan",
    location: "Taluka Panchayat Hall",
    date: "26 Aug 2026",
    participants: 58,
    issuesRaised: [
      "Impact on local employment",
      "Access to water during construction",
      "Bridge repair requirement",
    ],
    stakeholderCategory: "Local Bodies & NGOs",
    evidenceCount: 3,
    minutes: "Minutes recorded — copies distributed",
    unresolvedConcerns: [],
    status: "completed",
  },
];

// ── Stakeholder Consultations ──
export const STAKEHOLDER_CONSULTATIONS: StakeholderConsultation[] = [
  {
    id: "SC-042-001",
    stakeholder: "Village Sarpanch — Kharpudi",
    issueRaised: "Water canal disruption will affect irrigation for 80+ families",
    impactCategory: "Agriculture",
    responseObservation: "SIA team documented concern and will include in findings",
    evidenceCount: 2,
    followUpRequired: true,
    date: "20 Aug 2026",
  },
  {
    id: "SC-042-002",
    stakeholder: "Farmer Cooperative — Wadgaon",
    issueRaised: "Rainfed farmers have no alternative income source",
    impactCategory: "Livelihood",
    responseObservation: "Cooperative provided list of affected members",
    evidenceCount: 3,
    followUpRequired: true,
    date: "25 Aug 2026",
  },
  {
    id: "SC-042-003",
    stakeholder: "Women's Self-Help Group — Rajuri",
    issueRaised: "Concern about displacement from residential property",
    impactCategory: "Housing",
    responseObservation: "Group submitted written representation",
    evidenceCount: 2,
    followUpRequired: false,
    date: "28 Aug 2026",
  },
  {
    id: "SC-042-004",
    stakeholder: "District Education Officer — Jalna",
    issueRaised: "School access may be disrupted for 3 villages",
    impactCategory: "Community Infrastructure",
    responseObservation: "Education department asked for transport arrangement",
    evidenceCount: 1,
    followUpRequired: true,
    date: "26 Aug 2026",
  },
  {
    id: "SC-042-005",
    stakeholder: "Project Authority — NIDC",
    issueRaised: "Timeline for construction phase 1 is 18 months",
    impactCategory: "Project Timeline",
    responseObservation: "Timeline documented for impact assessment",
    evidenceCount: 1,
    followUpRequired: false,
    date: "22 Aug 2026",
  },
];

// ── Public Assets ──
export const PUBLIC_ASSETS: PublicAsset[] = [
  {
    id: "PA-042-001",
    assetType: "Road",
    village: "Kharpudi",
    location: "Kharpudi–Wadgaon link road",
    impact: "Road realignment — 1.2 km section affected",
    severity: "major",
    evidenceCount: 3,
    remarks: "Primary access road for 3 villages",
  },
  {
    id: "PA-042-002",
    assetType: "School",
    village: "Rajuri",
    location: "Zilla Parishad Primary School",
    impact: "Noise and dust impact during construction",
    severity: "moderate",
    evidenceCount: 2,
    remarks: "School is 200m from corridor boundary",
  },
  {
    id: "PA-042-003",
    assetType: "Water Source",
    village: "Kharpudi",
    location: "Community Well — Upper Kharpudi",
    impact: "Well falls within acquisition zone",
    severity: "critical",
    evidenceCount: 4,
    remarks: "Primary drinking water source for 60 households",
  },
  {
    id: "PA-042-004",
    assetType: "Anganwadi",
    village: "Wadgaon",
    location: "Anganwadi Centre — Wadgaon",
    impact: "Access road disruption",
    severity: "minor",
    evidenceCount: 1,
    remarks: "Alternative access available",
  },
  {
    id: "PA-042-005",
    assetType: "Religious Structure",
    village: "Bhokardan Road",
    location: "Hanuman Mandir",
    impact: "Temple is 50m from corridor boundary",
    severity: "minor",
    evidenceCount: 2,
    remarks: "No direct acquisition — vibration concern raised",
  },
  {
    id: "PA-042-006",
    assetType: "Common Land",
    village: "Wadgaon",
    location: "Gaothan grazing land",
    impact: "0.8 ha common land within acquisition",
    severity: "major",
    evidenceCount: 3,
    remarks: "Vital grazing area for 25 livestock-owning families",
  },
];

// ── Evidence ──
export const EVIDENCE_ITEMS: EvidenceItem[] = [
  { id: "EV-042-001", type: "photograph", title: "Mango orchard — Kharpudi", siaSection: "Agriculture Impact", relatedTo: "Kharpudi Village", capturedDate: "20 Aug 2026", uploadedBy: "SIA Team", status: "verified" },
  { id: "EV-042-002", type: "document", title: "Land records extract — Parcel MH-PN-004821", siaSection: "Affected Families", relatedTo: "AF-042-001", capturedDate: "18 Aug 2026", uploadedBy: "SIA Team", status: "verified" },
  { id: "EV-042-003", type: "consultation_minutes", title: "Gram Sabha minutes — Kharpudi", siaSection: "Consultation", relatedTo: "GS-042-001", capturedDate: "20 Aug 2026", uploadedBy: "Dr. Meera Joshi", status: "verified" },
  { id: "EV-042-004", type: "photograph", title: "Community Well — Upper Kharpudi", siaSection: "Public Assets", relatedTo: "PA-042-004", capturedDate: "20 Aug 2026", uploadedBy: "SIA Team", status: "verified" },
  { id: "EV-042-005", type: "map", title: "Project footprint overlay — Kharpudi section", siaSection: "GIS Analysis", relatedTo: "GIS Layer", capturedDate: "15 Aug 2026", uploadedBy: "SIA Team", status: "verified" },
  { id: "EV-042-006", type: "attendance", title: "Gram Sabha attendance register — Kharpudi", siaSection: "Consultation", relatedTo: "GS-042-001", capturedDate: "20 Aug 2026", uploadedBy: "Dr. Meera Joshi", status: "verified" },
  { id: "EV-042-007", type: "photograph", title: "Road section — Kharpudi link road", siaSection: "Public Assets", relatedTo: "PA-042-001", capturedDate: "20 Aug 2026", uploadedBy: "SIA Team", status: "verified" },
  { id: "EV-042-008", type: "field_note", title: "Field notes — Wadgaon visit", siaSection: "Livelihood", relatedTo: "Wadgaon Village", capturedDate: "25 Aug 2026", uploadedBy: "Dr. Meera Joshi", status: "verified" },
  { id: "EV-042-009", type: "document", title: "Agricultural income certificate — Sukhdeo Patil", siaSection: "Livelihood", relatedTo: "AF-042-003", capturedDate: "25 Aug 2026", uploadedBy: "SIA Team", status: "verified" },
  { id: "EV-042-010", type: "photograph", title: "Grazing land — Wadgaon", siaSection: "Public Assets", relatedTo: "PA-042-006", capturedDate: "25 Aug 2026", uploadedBy: "SIA Team", status: "verified" },
  { id: "EV-042-011", type: "consultation_minutes", title: "Gram Sabha minutes — Wadgaon", siaSection: "Consultation", relatedTo: "GS-042-002", capturedDate: "25 Aug 2026", uploadedBy: "Dr. Meera Joshi", status: "pending" },
  { id: "EV-042-012", type: "photograph", title: "School — Rajuri ZP Primary School", siaSection: "Public Assets", relatedTo: "PA-042-002", capturedDate: "28 Aug 2026", uploadedBy: "SIA Team", status: "verified" },
  { id: "EV-042-013", type: "map", title: "Village boundary map — Rajuri", siaSection: "Project Context", relatedTo: "Rajuri Village", capturedDate: "15 Aug 2026", uploadedBy: "SIA Team", status: "verified" },
  { id: "EV-042-014", type: "document", title: "Survey report — Parcel MH-PN-004824", siaSection: "Affected Families", relatedTo: "AF-042-004", capturedDate: "28 Aug 2026", uploadedBy: "SIA Team", status: "pending" },
  { id: "EV-042-015", type: "survey_data", title: "Household survey — Bhokardan Road", siaSection: "Population Impact", relatedTo: "Bhokardan Road Village", capturedDate: "01 Sep 2026", uploadedBy: "SIA Team", status: "pending" },
];

// ── Findings ──
export const SIA_FINDINGS: Finding[] = [
  {
    category: "social",
    label: "Social Impact",
    rating: "high",
    evidenceReference: "Gram Sabha minutes, household surveys, field observations",
    expertObservation: "Significant social disruption anticipated across 4 villages. Community cohesion will be affected by physical separation of households and loss of common gathering spaces. Social network disruption particularly high in Kharpudi where 42 families are affected.",
    remarks: "Social impact is concentrated in Kharpudi and Wadgaon villages",
  },
  {
    category: "livelihood",
    label: "Livelihood Impact",
    rating: "severe",
    evidenceReference: "Agricultural income certificates, occupation surveys, cooperative records",
    expertObservation: "Livelihood impact is severe for agricultural households. 142 of 218 affected families depend directly on agriculture. Loss of irrigated land in Kharpudi will disproportionately impact households with mango orchards — a multi-year investment. Rainfed farmers in Wadgaon face temporary disruption.",
    remarks: "Livelihood rehabilitation is the most critical mitigation requirement",
  },
  {
    category: "displacement",
    label: "Displacement",
    rating: "high",
    evidenceReference: "House survey records, residential land records, commercial property documents",
    expertObservation: "Full residential displacement for 47 families, partial for 62. Commercial displacement for 12 families. Temporary disruption for balance. Displacement concentrated in Rajuri and Bhokardan Road villages.",
    remarks: "Residential displacement requires housing rehabilitation plan",
  },
  {
    category: "public_infrastructure",
    label: "Public Infrastructure Impact",
    rating: "moderate",
    evidenceReference: "Asset survey records, public hearing minutes, departmental communications",
    expertObservation: "Critical water source (community well) in Kharpudi falls within acquisition zone. Road realignment will disrupt access for 3 villages. School impact is manageable with mitigation.",
    remarks: "Water source replacement is mandatory before acquisition completion",
  },
  {
    category: "community",
    label: "Community Impact",
    rating: "moderate",
    evidenceReference: "Public hearing records, stakeholder consultations, community representations",
    expertObservation: "Community infrastructure impacts are moderate. School access disruption manageable. Religious structure concerns addressed by buffer zone. Common grazing land loss affects 25 livestock families.",
    remarks: "Community mitigation can be planned with local bodies",
  },
  {
    category: "vulnerable_population",
    label: "Vulnerable Population Impact",
    rating: "high",
    evidenceReference: "Household surveys, vulnerability assessments, field observations",
    expertObservation: "18 households identified as vulnerable: 7 female-headed, 4 elderly, 3 persons with disability, 4 economically vulnerable. These require priority attention in rehabilitation. Scheduled Area relevance noted for 2 parcels in Bhokardan Road.",
    remarks: "Vulnerable households require individual rehabilitation plans",
  },
  {
    category: "environmental",
    label: "Environmental / Resource Dependency Observations",
    rating: "moderate",
    evidenceReference: "Field observations, environmental survey, community inputs",
    expertObservation: "Mango orchards represent multi-generational investment. Livestock dependency on common grazing land. Water source disruption has cascading environmental impact. Tree felling concern raised in public hearing.",
    remarks: "Environmental mitigation should include tree replacement and water source restoration",
  },
];

// ── Mitigation ──
export const MITIGATION_ITEMS: MitigationItem[] = [
  {
    id: "MIT-042-001",
    impact: "Loss of irrigated agricultural land",
    affectedGroup: "Agricultural households — Kharpudi (42 families)",
    recommendation: "Provide access continuity during construction; plan rehabilitation for permanent loss of irrigated land; include standing crop valuation",
    responsibleStakeholder: "NIDC + District Collector",
    priority: "high",
    evidenceCount: 5,
    status: "in_progress",
  },
  {
    id: "MIT-042-002",
    impact: "Residential displacement",
    affectedGroup: "Residentially displaced families — 47 families",
    recommendation: "Ensure housing rehabilitation plot allotment before acquisition; provide temporary transit accommodation; include construction assistance",
    responsibleStakeholder: "District Collector + R&R Authority",
    priority: "critical",
    evidenceCount: 4,
    status: "pending",
  },
  {
    id: "MIT-042-003",
    impact: "Loss of water source",
    affectedGroup: "60 households — Kharpudi",
    recommendation: "Provide alternative water supply before well acquisition; construct replacement well or piped water connection",
    responsibleStakeholder: "NIDC + Jal Jeevan Mission",
    priority: "critical",
    evidenceCount: 3,
    status: "pending",
  },
  {
    id: "MIT-042-004",
    impact: "Road access disruption",
    affectedGroup: "3 villages — Kharpudi, Wadgaon, Rajuri",
    recommendation: "Maintain alternative access during construction; complete road realignment before taking possession; install traffic management",
    responsibleStakeholder: "NIDC + PWD",
    priority: "high",
    evidenceCount: 2,
    status: "in_progress",
  },
  {
    id: "MIT-042-005",
    impact: "Commercial displacement",
    affectedGroup: "12 commercial establishments",
    recommendation: "Provide adequate compensation including loss of goodwill; offer relocation assistance; consider rent assistance during transition",
    responsibleStakeholder: "District Collector + NIDC",
    priority: "medium",
    evidenceCount: 2,
    status: "pending",
  },
  {
    id: "MIT-042-006",
    impact: "Common grazing land loss",
    affectedGroup: "25 livestock-owning families — Wadgaon",
    recommendation: "Identify alternative grazing area; consider livestock compensation; provide fodder support during transition",
    responsibleStakeholder: "District Collector + Animal Husbandry",
    priority: "medium",
    evidenceCount: 1,
    status: "pending",
  },
  {
    id: "MIT-042-007",
    impact: "School access disruption",
    affectedGroup: "Students from Rajuri and Bhokardan Road",
    recommendation: "Provide school bus/transport service; coordinate with education department for route adjustment",
    responsibleStakeholder: "District Education Officer",
    priority: "medium",
    evidenceCount: 1,
    status: "in_progress",
  },
  {
    id: "MIT-042-008",
    impact: "Vulnerable household impact",
    affectedGroup: "18 vulnerable households",
    recommendation: "Individual rehabilitation plans; priority housing; livelihood support; social worker assignment",
    responsibleStakeholder: "District Social Welfare + R&R Authority",
    priority: "high",
    evidenceCount: 3,
    status: "pending",
  },
];

// ── Clarifications ──
export const CLARIFICATIONS: Clarification[] = [
  {
    id: "CLR-042-001",
    requestedBy: "Dr. Rajesh Kumar — District Collector, Jalna",
    date: "05 Sep 2026",
    question: "Additional clarification required regarding affected family count in Village Kharpudi. The register shows 42 families but Gram Sabha records indicate 45 households. Please reconcile and clarify.",
    affectedSection: "Affected Families — Kharpudi",
    priority: "high",
    dueDate: "08 Sep 2026",
    status: "in_progress",
    response: undefined,
  },
  {
    id: "CLR-042-002",
    requestedBy: "Ms. Priya Deshmukh — SIA Director",
    date: "03 Sep 2026",
    question: "Gram Sabha minutes for Wadgaon village are missing official signatures. Please ensure the minutes are authenticated before final submission.",
    affectedSection: "Consultation — Wadgaon",
    priority: "medium",
    dueDate: "10 Sep 2026",
    status: "open",
    response: undefined,
  },
];

// ── Version History ──
export const ASSESSMENT_VERSIONS: AssessmentVersion[] = [
  {
    version: "1.0",
    status: "draft",
    date: "28 Aug 2026",
    report: "Initial draft — basic assessment structure",
    evidenceCount: 32,
    actor: "Dr. Meera Joshi",
  },
  {
    version: "1.1",
    status: "revised",
    date: "03 Sep 2026",
    report: "Revised after stakeholder consultations — added community impact section",
    evidenceCount: 41,
    actor: "Dr. Meera Joshi",
  },
  {
    version: "1.2",
    status: "draft",
    date: "08 Sep 2026",
    report: "Current version — incorporating latest Gram Sabha records",
    evidenceCount: 47,
    actor: "Dr. Meera Joshi",
  },
];

// ── Audit Trail ──
export const SIA_AUDIT_TRAIL: SiaAuditEntry[] = [
  { id: "AUD-042-001", timestamp: "12 Aug 2026 09:00", action: "SIA assessment assigned", actor: "District Collector, Jalna", section: "Assignment", details: "SIA-2026-0042 assigned to Dr. Meera Joshi" },
  { id: "AUD-042-002", timestamp: "12 Aug 2026 09:30", action: "SIA assessment accepted", actor: "Dr. Meera Joshi", section: "Assignment", details: "Assessment accepted — project context reviewed" },
  { id: "AUD-042-003", timestamp: "15 Aug 2026 10:00", action: "GIS footprint data uploaded", actor: "Dr. Meera Joshi", section: "Project Context", details: "Project corridor overlay and affected parcels loaded" },
  { id: "AUD-042-004", timestamp: "18 Aug 2026 11:15", action: "Affected family records added", actor: "Dr. Meera Joshi", section: "Affected Families", details: "8 affected family records created for Kharpudi" },
  { id: "AUD-042-005", timestamp: "20 Aug 2026 14:30", action: "Gram Sabha minutes attached", actor: "Dr. Meera Joshi", section: "Consultation", details: "Gram Sabha minutes for Kharpudi attached" },
  { id: "AUD-042-006", timestamp: "22 Aug 2026 16:00", action: "Public hearing minutes recorded", actor: "Dr. Meera Joshi", section: "Consultation", details: "Public hearing at District Collectorate documented" },
  { id: "AUD-042-007", timestamp: "25 Aug 2026 13:45", action: "Livelihood assessment updated", actor: "Dr. Meera Joshi", section: "Livelihood", details: "Agricultural impact data for Wadgaon entered" },
  { id: "AUD-042-008", timestamp: "28 Aug 2026 11:00", action: "Public assets assessment updated", actor: "Dr. Meera Joshi", section: "Public Assets", details: "6 public assets documented with severity ratings" },
  { id: "AUD-042-009", timestamp: "28 Aug 2026 15:30", action: "Draft report generated", actor: "Dr. Meera Joshi", section: "Report", details: "Version 1.0 draft report created" },
  { id: "AUD-042-010", timestamp: "01 Sep 2026 10:00", action: "Bhokardan Road Gram Sabha scheduled", actor: "Dr. Meera Joshi", section: "Consultation", details: "Gram Sabha scheduled for 01 Sep 2026" },
  { id: "AUD-042-011", timestamp: "03 Sep 2026 14:15", action: "SIA findings finalized", actor: "Dr. Meera Joshi", section: "Findings", details: "All 7 impact categories rated and documented" },
  { id: "AUD-042-012", timestamp: "05 Sep 2026 09:30", action: "Clarification request received", actor: "District Collector, Jalna", section: "Clarification", details: "Request for affected family count reconciliation" },
  { id: "AUD-042-013", timestamp: "08 Sep 2026 11:00", action: "Mitigation recommendations drafted", actor: "Dr. Meera Joshi", section: "Mitigation", details: "8 mitigation items documented with priorities" },
];

// ── Notifications ──
export const SIA_NOTIFICATIONS: SiaNotification[] = [
  { id: "N-042-001", timestamp: "05 Sep 2026 09:30", title: "Clarification Requested", message: "District Collector has requested clarification on affected family count in Kharpudi", type: "urgent", read: false },
  { id: "N-042-002", timestamp: "03 Sep 2026 14:00", title: "Gram Sabha Minutes Pending", message: "Minutes for Wadgaon Gram Sabha require official signature", type: "warning", read: false },
  { id: "N-042-003", timestamp: "01 Sep 2026 10:00", title: "Consultation Scheduled", message: "Gram Sabha for Bhokardan Road village scheduled for 01 Sep 2026", type: "info", read: true },
  { id: "N-042-004", timestamp: "28 Aug 2026 15:30", title: "Draft Report Generated", message: "Version 1.0 of SIA report has been generated", type: "info", read: true },
  { id: "N-042-005", timestamp: "25 Aug 2026 14:00", title: "Evidence Uploaded", message: "12 evidence items uploaded for Wadgaon assessment", type: "info", read: true },
  { id: "N-042-006", timestamp: "20 Aug 2026 16:30", title: "Gram Sabha Completed", message: "Gram Sabha for Kharpudi village completed — 84 attendees", type: "info", read: true },
];

// ── Work Queue ──
export const WORK_QUEUE: WorkQueueItem[] = [
  { id: "WQ-042-001", title: "Respond to clarification — Affected family count", description: "District Collector has requested reconciliation of affected family count in Kharpudi", dueDate: "08 Sep 2026", priority: "high", type: "clarification_request", assessmentId: "SIA-2026-0042" },
  { id: "WQ-042-002", title: "Complete Gram Sabha minutes — Wadgaon", description: "Minutes require official signature from Gram Sarpanch", dueDate: "10 Sep 2026", priority: "medium", type: "consultation_pending", assessmentId: "SIA-2026-0042" },
  { id: "WQ-042-003", title: "Verify family AF-042-004", description: "Geeta Devi Sharma verification pending — evidence incomplete", dueDate: "09 Sep 2026", priority: "high", type: "evidence_incomplete", assessmentId: "SIA-2026-0042" },
  { id: "WQ-042-004", title: "Complete Bhokardan Road Gram Sabha", description: "Gram Sabha scheduled — minutes and evidence required", dueDate: "01 Sep 2026", priority: "critical", type: "consultation_pending", assessmentId: "SIA-2026-0042" },
  { id: "WQ-042-005", title: "Upload missing evidence — Rajuri assets", description: "Public asset evidence for Rajuri school pending upload", dueDate: "09 Sep 2026", priority: "medium", type: "evidence_incomplete", assessmentId: "SIA-2026-0042" },
  { id: "WQ-042-006", title: "Submit SIA — Pune Metro Phase III", description: "SIA-2026-0051 assessment approaching submission deadline", dueDate: "18 Sep 2026", priority: "high", type: "submission_due", assessmentId: "SIA-2026-0051" },
];

// ── Lifecycle Stages for Gate Visualization ──
export const LIFECYCLE_STAGES = [
  { key: "proposal", label: "Project Proposal", status: "complete" as const },
  { key: "requirement", label: "Land Requirement", status: "complete" as const },
  { key: "gis", label: "GIS Identification", status: "complete" as const },
  { key: "submission", label: "Submission", status: "complete" as const },
  { key: "scrutiny", label: "Scrutiny", status: "complete" as const },
  { key: "sia", label: "SIA", status: "current" as const },
  { key: "section11", label: "Section 11 Preliminary Notification", status: "locked" as const },
  { key: "disclosure", label: "Public Disclosure", status: "locked" as const },
  { key: "objections", label: "Objections & Hearing", status: "locked" as const },
  { key: "section19", label: "Section 19 Declaration", status: "locked" as const },
];

// ── SIA Section Completion ──
export const SIA_SECTIONS = [
  { key: "project_context", label: "Project Context", progress: 100, evidence: 3, missing: [] },
  { key: "affected_families", label: "Affected Families", progress: 75, evidence: 8, missing: ["2 families pending verification"] },
  { key: "social_impact", label: "Social Impact", progress: 90, evidence: 6, missing: [] },
  { key: "livelihood", label: "Livelihood", progress: 85, evidence: 5, missing: ["1 livelihood survey pending"] },
  { key: "consultation", label: "Consultation", progress: 60, evidence: 7, missing: ["1 Gram Sabha minutes missing", "1 Gram Sabha evidence pending"] },
  { key: "evidence", label: "Evidence", progress: 70, evidence: 15, missing: ["3 evidence items pending upload"] },
  { key: "findings", label: "Findings", progress: 100, evidence: 0, missing: [] },
  { key: "report", label: "Report", progress: 80, evidence: 0, missing: ["1 clarification to respond"] },
  { key: "submission", label: "Submission", progress: 0, evidence: 0, missing: ["SIA not yet submitted"] },
];
