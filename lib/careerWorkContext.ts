// GENERATED FILE — do not hand edit.
// Built from O*NET 30.3 Work Context data. Remote compatibility is an
// Empower heuristic based on work setting, posture, tools, and in-person contact;
// it is not an employer policy or observed telework percentage.

export type CareerDemandLevel = "Lower" | "Moderate" | "Higher";
export type CareerRemoteCompatibility = "Lower" | "Mixed" | "Higher";

export interface CareerWorkContext {
  physicalDemand: CareerDemandLevel;
  physicalScore: number;
  remoteCompatibility: CareerRemoteCompatibility;
  remoteScore: number;
  scheduleType: "Regular" | "Irregular" | "Seasonal" | null;
  weeklyHours: string | null;
  timePressure: number;
}

export const CAREER_WORK_CONTEXT: Record<string, CareerWorkContext> = {
  "chief-executive": {
    "physicalDemand": "Lower",
    "physicalScore": 1.49,
    "remoteCompatibility": "Higher",
    "remoteScore": 69,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.16
  },
  "operations-manager": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.94,
    "remoteCompatibility": "Lower",
    "remoteScore": 35,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.08
  },
  "marketing-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.46,
    "remoteCompatibility": "Higher",
    "remoteScore": 77,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.21
  },
  "sales-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.44,
    "remoteCompatibility": "Higher",
    "remoteScore": 73,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.9
  },
  "fundraising-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.28,
    "remoteCompatibility": "Higher",
    "remoteScore": 86,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.97
  },
  "admin-services-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.83,
    "remoteCompatibility": "Mixed",
    "remoteScore": 56,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.7
  },
  "facilities-manager": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.17,
    "remoteCompatibility": "Lower",
    "remoteScore": 36,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.9
  },
  "it-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.34,
    "remoteCompatibility": "Higher",
    "remoteScore": 74,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.37
  },
  "financial-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.31,
    "remoteCompatibility": "Higher",
    "remoteScore": 87,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.54
  },
  "industrial-production-manager": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.12,
    "remoteCompatibility": "Lower",
    "remoteScore": 12,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.2
  },
  "purchasing-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.39,
    "remoteCompatibility": "Higher",
    "remoteScore": 85,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.16
  },
  "logistics-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.83,
    "remoteCompatibility": "Lower",
    "remoteScore": 32,
    "scheduleType": null,
    "weeklyHours": null,
    "timePressure": 4.38
  },
  "hr-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.55,
    "remoteCompatibility": "Higher",
    "remoteScore": 71,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.91
  },
  "training-development-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.41,
    "remoteCompatibility": "Higher",
    "remoteScore": 86,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.64
  },
  "farmer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.42,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": null,
    "weeklyHours": null,
    "timePressure": 3.49
  },
  "construction-manager": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.62,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.25
  },
  "childcare-director": {
    "physicalDemand": "Lower",
    "physicalScore": 1.83,
    "remoteCompatibility": "Mixed",
    "remoteScore": 43,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.93
  },
  "school-administrator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.28,
    "remoteCompatibility": "Lower",
    "remoteScore": 26,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.46
  },
  "college-administrator": {
    "physicalDemand": "Lower",
    "physicalScore": 1.5,
    "remoteCompatibility": "Higher",
    "remoteScore": 75,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.95
  },
  "engineering-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.43,
    "remoteCompatibility": "Mixed",
    "remoteScore": 61,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.79
  },
  "food-service-manager": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.58,
    "remoteCompatibility": "Lower",
    "remoteScore": 13,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.12
  },
  "lodging-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.82,
    "remoteCompatibility": "Mixed",
    "remoteScore": 57,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.35
  },
  "health-services-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.66,
    "remoteCompatibility": "Higher",
    "remoteScore": 85,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.93
  },
  "natural-sciences-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.59,
    "remoteCompatibility": "Higher",
    "remoteScore": 80,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.28
  },
  "property-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.69,
    "remoteCompatibility": "Mixed",
    "remoteScore": 42,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.95
  },
  "community-service-manager": {
    "physicalDemand": "Lower",
    "physicalScore": 1.52,
    "remoteCompatibility": "Higher",
    "remoteScore": 69,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.91
  },
  "emergency-management-director": {
    "physicalDemand": "Lower",
    "physicalScore": 1.82,
    "remoteCompatibility": "Mixed",
    "remoteScore": 52,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.45
  },
  "talent-agent": {
    "physicalDemand": "Lower",
    "physicalScore": 1.23,
    "remoteCompatibility": "Higher",
    "remoteScore": 83,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.65
  },
  "claims-adjuster": {
    "physicalDemand": "Lower",
    "physicalScore": 1.41,
    "remoteCompatibility": "Higher",
    "remoteScore": 80,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.39
  },
  "compliance-officer": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.94,
    "remoteCompatibility": "Lower",
    "remoteScore": 28,
    "scheduleType": null,
    "weeklyHours": null,
    "timePressure": 3.53
  },
  "cost-estimator": {
    "physicalDemand": "Lower",
    "physicalScore": 1.3,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.77
  },
  "hr-specialist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.62,
    "remoteCompatibility": "Higher",
    "remoteScore": 69,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.76
  },
  "labor-relations-specialist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.51,
    "remoteCompatibility": "Higher",
    "remoteScore": 82,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.71
  },
  "logistician": {
    "physicalDemand": "Lower",
    "physicalScore": 1.63,
    "remoteCompatibility": "Mixed",
    "remoteScore": 63,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.42
  },
  "management-analyst": {
    "physicalDemand": "Lower",
    "physicalScore": 1.41,
    "remoteCompatibility": "Higher",
    "remoteScore": 79,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4
  },
  "event-planner": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.1,
    "remoteCompatibility": "Mixed",
    "remoteScore": 44,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.57
  },
  "fundraiser": {
    "physicalDemand": "Lower",
    "physicalScore": 1.49,
    "remoteCompatibility": "Mixed",
    "remoteScore": 60,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.67
  },
  "compensation-benefits-specialist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.34,
    "remoteCompatibility": "Higher",
    "remoteScore": 90,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.86
  },
  "training-development-specialist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.63,
    "remoteCompatibility": "Higher",
    "remoteScore": 75,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.7
  },
  "market-research-analyst": {
    "physicalDemand": "Lower",
    "physicalScore": 1.25,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.04
  },
  "accountant": {
    "physicalDemand": "Lower",
    "physicalScore": 1.28,
    "remoteCompatibility": "Higher",
    "remoteScore": 91,
    "scheduleType": null,
    "weeklyHours": null,
    "timePressure": 4.19
  },
  "budget-analyst": {
    "physicalDemand": "Lower",
    "physicalScore": 1.43,
    "remoteCompatibility": "Higher",
    "remoteScore": 79,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.26
  },
  "credit-analyst": {
    "physicalDemand": "Lower",
    "physicalScore": 1.2,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.2
  },
  "financial-advisor": {
    "physicalDemand": "Lower",
    "physicalScore": 1.13,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.69
  },
  "insurance-underwriter": {
    "physicalDemand": "Lower",
    "physicalScore": 1.22,
    "remoteCompatibility": "Higher",
    "remoteScore": 97,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.57
  },
  "financial-examiner": {
    "physicalDemand": "Lower",
    "physicalScore": 1.29,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.61
  },
  "credit-counselor": {
    "physicalDemand": "Lower",
    "physicalScore": 1.3,
    "remoteCompatibility": "Higher",
    "remoteScore": 89,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.84
  },
  "loan-officer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.43,
    "remoteCompatibility": "Higher",
    "remoteScore": 66,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.12
  },
  "tax-examiner": {
    "physicalDemand": "Lower",
    "physicalScore": 1.24,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.74
  },
  "tax-preparer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.35,
    "remoteCompatibility": "Higher",
    "remoteScore": 92,
    "scheduleType": "Seasonal",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.05
  },
  "systems-analyst": {
    "physicalDemand": "Lower",
    "physicalScore": 1.59,
    "remoteCompatibility": "Higher",
    "remoteScore": 84,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.17
  },
  "infosec-analyst": {
    "physicalDemand": "Lower",
    "physicalScore": 1.68,
    "remoteCompatibility": "Higher",
    "remoteScore": 80,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.6
  },
  "ai-researcher": {
    "physicalDemand": "Lower",
    "physicalScore": 1.27,
    "remoteCompatibility": "Higher",
    "remoteScore": 92,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.71
  },
  "network-support-specialist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.86,
    "remoteCompatibility": "Mixed",
    "remoteScore": 58,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.9
  },
  "it-support": {
    "physicalDemand": "Lower",
    "physicalScore": 1.84,
    "remoteCompatibility": "Mixed",
    "remoteScore": 58,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.65
  },
  "network-architect": {
    "physicalDemand": "Lower",
    "physicalScore": 1.75,
    "remoteCompatibility": "Higher",
    "remoteScore": 84,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.6
  },
  "database-admin": {
    "physicalDemand": "Lower",
    "physicalScore": 1.67,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 2.99
  },
  "database-architect": {
    "physicalDemand": "Lower",
    "physicalScore": 1.23,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.62
  },
  "sysadmin": {
    "physicalDemand": "Lower",
    "physicalScore": 1.57,
    "remoteCompatibility": "Higher",
    "remoteScore": 88,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.79
  },
  "computer-programmer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.28,
    "remoteCompatibility": "Higher",
    "remoteScore": 91,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.04
  },
  "software-developer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.14,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.5
  },
  "qa-analyst": {
    "physicalDemand": "Lower",
    "physicalScore": 1.26,
    "remoteCompatibility": "Higher",
    "remoteScore": 92,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.88
  },
  "web-developer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.26,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4
  },
  "actuary": {
    "physicalDemand": "Lower",
    "physicalScore": 1.17,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.46
  },
  "mathematician": {
    "physicalDemand": "Lower",
    "physicalScore": 1.38,
    "remoteCompatibility": "Higher",
    "remoteScore": 99,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.15
  },
  "operations-research-analyst": {
    "physicalDemand": "Lower",
    "physicalScore": 1.26,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.57
  },
  "statistician": {
    "physicalDemand": "Lower",
    "physicalScore": 1.22,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.29
  },
  "architect": {
    "physicalDemand": "Lower",
    "physicalScore": 1.68,
    "remoteCompatibility": "Mixed",
    "remoteScore": 58,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.62
  },
  "landscape-architect": {
    "physicalDemand": "Lower",
    "physicalScore": 1.46,
    "remoteCompatibility": "Higher",
    "remoteScore": 70,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.85
  },
  "cartographer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.47,
    "remoteCompatibility": "Higher",
    "remoteScore": 80,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.97
  },
  "surveyor": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.38,
    "remoteCompatibility": "Lower",
    "remoteScore": 1,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.3
  },
  "aerospace-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.43,
    "remoteCompatibility": "Higher",
    "remoteScore": 80,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.56
  },
  "agricultural-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.86,
    "remoteCompatibility": "Mixed",
    "remoteScore": 59,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.4
  },
  "biomedical-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.5,
    "remoteCompatibility": "Higher",
    "remoteScore": 90,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.48
  },
  "chemical-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.69,
    "remoteCompatibility": "Higher",
    "remoteScore": 65,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.57
  },
  "civil-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.74,
    "remoteCompatibility": "Mixed",
    "remoteScore": 60,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4
  },
  "computer-hardware-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.43,
    "remoteCompatibility": "Higher",
    "remoteScore": 94,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.66
  },
  "electrical-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.89,
    "remoteCompatibility": "Mixed",
    "remoteScore": 61,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.92
  },
  "electronics-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.49,
    "remoteCompatibility": "Higher",
    "remoteScore": 92,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.06
  },
  "environmental-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.8,
    "remoteCompatibility": "Mixed",
    "remoteScore": 57,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.81
  },
  "industrial-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.76,
    "remoteCompatibility": "Mixed",
    "remoteScore": 52,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.79
  },
  "marine-engineer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.38,
    "remoteCompatibility": "Lower",
    "remoteScore": 32,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.67
  },
  "materials-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.71,
    "remoteCompatibility": "Higher",
    "remoteScore": 72,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.52
  },
  "mechanical-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.88,
    "remoteCompatibility": "Higher",
    "remoteScore": 66,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.51
  },
  "nuclear-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.61,
    "remoteCompatibility": "Higher",
    "remoteScore": 78,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.57
  },
  "petroleum-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.51,
    "remoteCompatibility": "Mixed",
    "remoteScore": 60,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.67
  },
  "drafter": {
    "physicalDemand": "Lower",
    "physicalScore": 1.51,
    "remoteCompatibility": "Higher",
    "remoteScore": 72,
    "scheduleType": null,
    "weeklyHours": null,
    "timePressure": 4.38
  },
  "aerospace-engineering-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.32,
    "remoteCompatibility": "Mixed",
    "remoteScore": 54,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.47
  },
  "civil-engineering-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.93,
    "remoteCompatibility": "Lower",
    "remoteScore": 36,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.39
  },
  "electrical-engineering-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.97,
    "remoteCompatibility": "Mixed",
    "remoteScore": 51,
    "scheduleType": null,
    "weeklyHours": null,
    "timePressure": 3.56
  },
  "mechatronics-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.29,
    "remoteCompatibility": "Lower",
    "remoteScore": 24,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.35
  },
  "industrial-engineering-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.18,
    "remoteCompatibility": "Mixed",
    "remoteScore": 41,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.91
  },
  "mechanical-engineering-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.32,
    "remoteCompatibility": "Lower",
    "remoteScore": 30,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.08
  },
  "surveying-mapping-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.07,
    "remoteCompatibility": "Lower",
    "remoteScore": 28,
    "scheduleType": null,
    "weeklyHours": null,
    "timePressure": 3.7
  },
  "animal-scientist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.78,
    "remoteCompatibility": "Mixed",
    "remoteScore": 43,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.65
  },
  "food-scientist": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.98,
    "remoteCompatibility": "Mixed",
    "remoteScore": 57,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.86
  },
  "agronomist": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.95,
    "remoteCompatibility": "Lower",
    "remoteScore": 29,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.33
  },
  "biochemist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.69,
    "remoteCompatibility": "Higher",
    "remoteScore": 82,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.3
  },
  "microbiologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.7,
    "remoteCompatibility": "Higher",
    "remoteScore": 68,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.14
  },
  "wildlife-biologist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.08,
    "remoteCompatibility": "Lower",
    "remoteScore": 39,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.3
  },
  "conservation-scientist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.88,
    "remoteCompatibility": "Lower",
    "remoteScore": 33,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.3
  },
  "forester": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.07,
    "remoteCompatibility": "Lower",
    "remoteScore": 18,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.11
  },
  "epidemiologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.43,
    "remoteCompatibility": "Higher",
    "remoteScore": 85,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.58
  },
  "medical-scientist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.67,
    "remoteCompatibility": "Mixed",
    "remoteScore": 59,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.69
  },
  "astronomer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.39,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 2.91
  },
  "physicist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.25,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.05
  },
  "meteorologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.41,
    "remoteCompatibility": "Higher",
    "remoteScore": 84,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.95
  },
  "chemist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.75,
    "remoteCompatibility": "Higher",
    "remoteScore": 75,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.79
  },
  "materials-scientist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.51,
    "remoteCompatibility": "Higher",
    "remoteScore": 82,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.38
  },
  "environmental-scientist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.49,
    "remoteCompatibility": "Higher",
    "remoteScore": 67,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.79
  },
  "geoscientist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.78,
    "remoteCompatibility": "Mixed",
    "remoteScore": 55,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.44
  },
  "hydrologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.72,
    "remoteCompatibility": "Mixed",
    "remoteScore": 57,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.35
  },
  "economist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.22,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.62
  },
  "io-psychologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.26,
    "remoteCompatibility": "Higher",
    "remoteScore": 94,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.73
  },
  "psychologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.33,
    "remoteCompatibility": "Higher",
    "remoteScore": 89,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.56
  },
  "school-psychologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.5,
    "remoteCompatibility": "Higher",
    "remoteScore": 80,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.1
  },
  "sociologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.33,
    "remoteCompatibility": "Higher",
    "remoteScore": 98,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.3
  },
  "urban-planner": {
    "physicalDemand": "Lower",
    "physicalScore": 1.28,
    "remoteCompatibility": "Higher",
    "remoteScore": 80,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.52
  },
  "anthropologist-archaeologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.68,
    "remoteCompatibility": "Mixed",
    "remoteScore": 64,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.7
  },
  "historian": {
    "physicalDemand": "Lower",
    "physicalScore": 1.72,
    "remoteCompatibility": "Higher",
    "remoteScore": 69,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.21
  },
  "political-scientist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.31,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.27
  },
  "agricultural-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.8,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.21
  },
  "biological-technician": {
    "physicalDemand": "Lower",
    "physicalScore": 1.79,
    "remoteCompatibility": "Mixed",
    "remoteScore": 54,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.33
  },
  "chemical-technician": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.26,
    "remoteCompatibility": "Lower",
    "remoteScore": 34,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.35
  },
  "environmental-science-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.04,
    "remoteCompatibility": "Lower",
    "remoteScore": 39,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.27
  },
  "nuclear-technician": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.48,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": null,
    "weeklyHours": null,
    "timePressure": 3.54
  },
  "forensic-science-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.36,
    "remoteCompatibility": "Lower",
    "remoteScore": 22,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.92
  },
  "occupational-safety-specialist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.15,
    "remoteCompatibility": "Lower",
    "remoteScore": 33,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.57
  },
  "occupational-safety-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.21,
    "remoteCompatibility": "Lower",
    "remoteScore": 18,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.76
  },
  "school-counselor": {
    "physicalDemand": "Lower",
    "physicalScore": 1.54,
    "remoteCompatibility": "Higher",
    "remoteScore": 73,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.76
  },
  "marriage-family-therapist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.51,
    "remoteCompatibility": "Higher",
    "remoteScore": 83,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.58
  },
  "rehabilitation-counselor": {
    "physicalDemand": "Lower",
    "physicalScore": 1.62,
    "remoteCompatibility": "Higher",
    "remoteScore": 65,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.16
  },
  "social-worker": {
    "physicalDemand": "Lower",
    "physicalScore": 1.51,
    "remoteCompatibility": "Mixed",
    "remoteScore": 40,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.33
  },
  "healthcare-social-worker": {
    "physicalDemand": "Lower",
    "physicalScore": 1.73,
    "remoteCompatibility": "Mixed",
    "remoteScore": 60,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4
  },
  "mental-health-social-worker": {
    "physicalDemand": "Lower",
    "physicalScore": 1.45,
    "remoteCompatibility": "Mixed",
    "remoteScore": 64,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.39
  },
  "health-education-specialist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.49,
    "remoteCompatibility": "Mixed",
    "remoteScore": 57,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.81
  },
  "probation-officer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.82,
    "remoteCompatibility": "Lower",
    "remoteScore": 26,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.4
  },
  "human-service-assistant": {
    "physicalDemand": "Lower",
    "physicalScore": 1.81,
    "remoteCompatibility": "Mixed",
    "remoteScore": 42,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.12
  },
  "community-health-worker": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.95,
    "remoteCompatibility": "Lower",
    "remoteScore": 35,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.42
  },
  "clergy": {
    "physicalDemand": "Lower",
    "physicalScore": 1.55,
    "remoteCompatibility": "Higher",
    "remoteScore": 73,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.87
  },
  "lawyer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.25,
    "remoteCompatibility": "Higher",
    "remoteScore": 93,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.18
  },
  "mediator": {
    "physicalDemand": "Lower",
    "physicalScore": 1.21,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.8
  },
  "judge": {
    "physicalDemand": "Lower",
    "physicalScore": 1.18,
    "remoteCompatibility": "Higher",
    "remoteScore": 94,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.73
  },
  "paralegal": {
    "physicalDemand": "Lower",
    "physicalScore": 1.28,
    "remoteCompatibility": "Higher",
    "remoteScore": 92,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.36
  },
  "title-examiner": {
    "physicalDemand": "Lower",
    "physicalScore": 1.53,
    "remoteCompatibility": "Higher",
    "remoteScore": 95,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.41
  },
  "nursing-instructor": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.97,
    "remoteCompatibility": "Mixed",
    "remoteScore": 54,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.8
  },
  "trade-school-instructor": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.01,
    "remoteCompatibility": "Mixed",
    "remoteScore": 48,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.52
  },
  "preschool-teacher": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.65,
    "remoteCompatibility": "Lower",
    "remoteScore": 8,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.07
  },
  "kindergarten-teacher": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.57,
    "remoteCompatibility": "Lower",
    "remoteScore": 22,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.74
  },
  "teacher-elementary": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.4,
    "remoteCompatibility": "Lower",
    "remoteScore": 26,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.76
  },
  "middle-school-teacher": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.1,
    "remoteCompatibility": "Lower",
    "remoteScore": 28,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.32
  },
  "teacher-hs": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.99,
    "remoteCompatibility": "Mixed",
    "remoteScore": 45,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.28
  },
  "cte-teacher": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.15,
    "remoteCompatibility": "Lower",
    "remoteScore": 31,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.95
  },
  "self-enrichment-teacher": {
    "physicalDemand": "Lower",
    "physicalScore": 1.47,
    "remoteCompatibility": "Mixed",
    "remoteScore": 52,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 2.76
  },
  "substitute-teacher": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.08,
    "remoteCompatibility": "Lower",
    "remoteScore": 33,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 2.92
  },
  "tutor": {
    "physicalDemand": "Lower",
    "physicalScore": 1.38,
    "remoteCompatibility": "Higher",
    "remoteScore": 94,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.5
  },
  "archivist": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.94,
    "remoteCompatibility": "Higher",
    "remoteScore": 80,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 2.94
  },
  "curator": {
    "physicalDemand": "Lower",
    "physicalScore": 1.76,
    "remoteCompatibility": "Mixed",
    "remoteScore": 63,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.24
  },
  "art-conservator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.31,
    "remoteCompatibility": "Mixed",
    "remoteScore": 41,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.45
  },
  "librarian": {
    "physicalDemand": "Moderate",
    "physicalScore": 2,
    "remoteCompatibility": "Mixed",
    "remoteScore": 56,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.53
  },
  "library-technician": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.95,
    "remoteCompatibility": "Higher",
    "remoteScore": 67,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.48
  },
  "instructional-coordinator": {
    "physicalDemand": "Lower",
    "physicalScore": 1.62,
    "remoteCompatibility": "Higher",
    "remoteScore": 68,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.63
  },
  "art-director": {
    "physicalDemand": "Lower",
    "physicalScore": 1.28,
    "remoteCompatibility": "Higher",
    "remoteScore": 71,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.76
  },
  "fine-artist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.79,
    "remoteCompatibility": "Higher",
    "remoteScore": 88,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.34
  },
  "animator": {
    "physicalDemand": "Lower",
    "physicalScore": 1.22,
    "remoteCompatibility": "Higher",
    "remoteScore": 79,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.45
  },
  "industrial-designer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.52,
    "remoteCompatibility": "Higher",
    "remoteScore": 71,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.03
  },
  "fashion-designer": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.96,
    "remoteCompatibility": "Higher",
    "remoteScore": 78,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.09
  },
  "floral-designer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.42,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.13
  },
  "graphic-designer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.31,
    "remoteCompatibility": "Higher",
    "remoteScore": 88,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.65
  },
  "interior-designer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.7,
    "remoteCompatibility": "Higher",
    "remoteScore": 69,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.16
  },
  "visual-merchandiser": {
    "physicalDemand": "Higher",
    "physicalScore": 3.31,
    "remoteCompatibility": "Lower",
    "remoteScore": 8,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.77
  },
  "set-designer": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.93,
    "remoteCompatibility": "Mixed",
    "remoteScore": 51,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.19
  },
  "actor": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.34,
    "remoteCompatibility": "Mixed",
    "remoteScore": 47,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.59
  },
  "producer-director": {
    "physicalDemand": "Lower",
    "physicalScore": 1.55,
    "remoteCompatibility": "Higher",
    "remoteScore": 68,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.36
  },
  "athlete": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.76,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Seasonal",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.87
  },
  "coach": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.2,
    "remoteCompatibility": "Lower",
    "remoteScore": 28,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.67
  },
  "sports-referee": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.51,
    "remoteCompatibility": "Lower",
    "remoteScore": 10,
    "scheduleType": "Seasonal",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.05
  },
  "dancer": {
    "physicalDemand": "Higher",
    "physicalScore": 3.47,
    "remoteCompatibility": "Lower",
    "remoteScore": 30,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 2.94
  },
  "choreographer": {
    "physicalDemand": "Higher",
    "physicalScore": 3.45,
    "remoteCompatibility": "Lower",
    "remoteScore": 27,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.9
  },
  "music-director": {
    "physicalDemand": "Lower",
    "physicalScore": 1.61,
    "remoteCompatibility": "Higher",
    "remoteScore": 69,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.92
  },
  "musician-singer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.55,
    "remoteCompatibility": "Higher",
    "remoteScore": 73,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.76
  },
  "broadcast-announcer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.56,
    "remoteCompatibility": "Mixed",
    "remoteScore": 58,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.85
  },
  "journalist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.56,
    "remoteCompatibility": "Mixed",
    "remoteScore": 57,
    "scheduleType": null,
    "weeklyHours": null,
    "timePressure": 4.89
  },
  "pr-specialist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.49,
    "remoteCompatibility": "Higher",
    "remoteScore": 71,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.55
  },
  "editor": {
    "physicalDemand": "Lower",
    "physicalScore": 1.34,
    "remoteCompatibility": "Higher",
    "remoteScore": 81,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.57
  },
  "technical-writer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.2,
    "remoteCompatibility": "Higher",
    "remoteScore": 86,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.23
  },
  "writer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.36,
    "remoteCompatibility": "Mixed",
    "remoteScore": 50,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.7
  },
  "interpreter": {
    "physicalDemand": "Lower",
    "physicalScore": 1.68,
    "remoteCompatibility": "Mixed",
    "remoteScore": 61,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.02
  },
  "court-reporter": {
    "physicalDemand": "Lower",
    "physicalScore": 1.25,
    "remoteCompatibility": "Higher",
    "remoteScore": 79,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.43
  },
  "av-technician": {
    "physicalDemand": "Moderate",
    "physicalScore": 2,
    "remoteCompatibility": "Mixed",
    "remoteScore": 61,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.88
  },
  "broadcast-technician": {
    "physicalDemand": "Lower",
    "physicalScore": 1.83,
    "remoteCompatibility": "Mixed",
    "remoteScore": 62,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.92
  },
  "sound-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.61,
    "remoteCompatibility": "Higher",
    "remoteScore": 69,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.2
  },
  "photographer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.32,
    "remoteCompatibility": "Lower",
    "remoteScore": 25,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.91
  },
  "camera-operator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.09,
    "remoteCompatibility": "Lower",
    "remoteScore": 8,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.91
  },
  "film-video-editor": {
    "physicalDemand": "Lower",
    "physicalScore": 1.51,
    "remoteCompatibility": "Higher",
    "remoteScore": 80,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.7
  },
  "chiropractor": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.18,
    "remoteCompatibility": "Lower",
    "remoteScore": 36,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.58
  },
  "dentist": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.97,
    "remoteCompatibility": "Mixed",
    "remoteScore": 52,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.78
  },
  "orthodontist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.83,
    "remoteCompatibility": "Mixed",
    "remoteScore": 44,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.34
  },
  "dietitian": {
    "physicalDemand": "Lower",
    "physicalScore": 1.51,
    "remoteCompatibility": "Higher",
    "remoteScore": 77,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.83
  },
  "optometrist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.71,
    "remoteCompatibility": "Mixed",
    "remoteScore": 58,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.05
  },
  "pharmacist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.11,
    "remoteCompatibility": "Lower",
    "remoteScore": 38,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.67
  },
  "physician-assistant": {
    "physicalDemand": "Moderate",
    "physicalScore": 2,
    "remoteCompatibility": "Mixed",
    "remoteScore": 46,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.35
  },
  "podiatrist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.06,
    "remoteCompatibility": "Lower",
    "remoteScore": 33,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.38
  },
  "occupational-therapist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.2,
    "remoteCompatibility": "Lower",
    "remoteScore": 35,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.95
  },
  "physical-therapist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.48,
    "remoteCompatibility": "Lower",
    "remoteScore": 34,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.24
  },
  "radiation-therapist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.74,
    "remoteCompatibility": "Lower",
    "remoteScore": 20,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.46
  },
  "recreational-therapist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.24,
    "remoteCompatibility": "Lower",
    "remoteScore": 18,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.68
  },
  "respiratory-therapist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.57,
    "remoteCompatibility": "Lower",
    "remoteScore": 18,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.09
  },
  "speech-language-pathologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.74,
    "remoteCompatibility": "Mixed",
    "remoteScore": 47,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.59
  },
  "exercise-physiologist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.33,
    "remoteCompatibility": "Lower",
    "remoteScore": 38,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.14
  },
  "veterinarian": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.61,
    "remoteCompatibility": "Lower",
    "remoteScore": 26,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.21
  },
  "rn": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.17,
    "remoteCompatibility": "Lower",
    "remoteScore": 39,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.99
  },
  "nurse-anesthetist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.05,
    "remoteCompatibility": "Mixed",
    "remoteScore": 43,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.11
  },
  "nurse-midwife": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.13,
    "remoteCompatibility": "Mixed",
    "remoteScore": 44,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.82
  },
  "nurse-practitioner": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.1,
    "remoteCompatibility": "Lower",
    "remoteScore": 39,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.09
  },
  "audiologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.64,
    "remoteCompatibility": "Mixed",
    "remoteScore": 63,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.55
  },
  "anesthesiologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.87,
    "remoteCompatibility": "Mixed",
    "remoteScore": 51,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4
  },
  "dermatologist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.1,
    "remoteCompatibility": "Lower",
    "remoteScore": 38,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.81
  },
  "emergency-physician": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.01,
    "remoteCompatibility": "Mixed",
    "remoteScore": 46,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.2
  },
  "physician": {
    "physicalDemand": "Lower",
    "physicalScore": 1.6,
    "remoteCompatibility": "Mixed",
    "remoteScore": 46,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.72
  },
  "neurologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.64,
    "remoteCompatibility": "Mixed",
    "remoteScore": 63,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.27
  },
  "obgyn": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.04,
    "remoteCompatibility": "Lower",
    "remoteScore": 39,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.92
  },
  "pediatrician": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.1,
    "remoteCompatibility": "Mixed",
    "remoteScore": 41,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.14
  },
  "pathologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.46,
    "remoteCompatibility": "Higher",
    "remoteScore": 74,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.9
  },
  "psychiatrist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.36,
    "remoteCompatibility": "Higher",
    "remoteScore": 94,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.05
  },
  "radiologist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.59,
    "remoteCompatibility": "Mixed",
    "remoteScore": 65,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.43
  },
  "ophthalmologist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.03,
    "remoteCompatibility": "Higher",
    "remoteScore": 67,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.61
  },
  "dental-hygienist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.07,
    "remoteCompatibility": "Mixed",
    "remoteScore": 44,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.74
  },
  "clinical-lab-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.93,
    "remoteCompatibility": "Mixed",
    "remoteScore": 51,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.78
  },
  "cardiovascular-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.3,
    "remoteCompatibility": "Lower",
    "remoteScore": 38,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.3
  },
  "sonographer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.28,
    "remoteCompatibility": "Mixed",
    "remoteScore": 43,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.02
  },
  "nuclear-med-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.09,
    "remoteCompatibility": "Lower",
    "remoteScore": 36,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.1
  },
  "radiologic-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.54,
    "remoteCompatibility": "Lower",
    "remoteScore": 28,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.66
  },
  "mri-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.09,
    "remoteCompatibility": "Mixed",
    "remoteScore": 59,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.91
  },
  "medical-dosimetrist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.28,
    "remoteCompatibility": "Higher",
    "remoteScore": 91,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 5
  },
  "pharmacy-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.62,
    "remoteCompatibility": "Lower",
    "remoteScore": 31,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.26
  },
  "psychiatric-technician": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.16,
    "remoteCompatibility": "Lower",
    "remoteScore": 27,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.46
  },
  "surgical-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.6,
    "remoteCompatibility": "Lower",
    "remoteScore": 24,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.82
  },
  "vet-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.96,
    "remoteCompatibility": "Lower",
    "remoteScore": 17,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.96
  },
  "ophthalmic-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2,
    "remoteCompatibility": "Mixed",
    "remoteScore": 41,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.32
  },
  "lpn": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.58,
    "remoteCompatibility": "Lower",
    "remoteScore": 26,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.38
  },
  "optician": {
    "physicalDemand": "Lower",
    "physicalScore": 1.78,
    "remoteCompatibility": "Mixed",
    "remoteScore": 45,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.04
  },
  "orthotist-prosthetist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.29,
    "remoteCompatibility": "Lower",
    "remoteScore": 36,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.29
  },
  "hearing-aid-specialist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.59,
    "remoteCompatibility": "Higher",
    "remoteScore": 84,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.94
  },
  "athletic-trainer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.22,
    "remoteCompatibility": "Lower",
    "remoteScore": 2,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.6
  },
  "genetic-counselor": {
    "physicalDemand": "Lower",
    "physicalScore": 1.28,
    "remoteCompatibility": "Higher",
    "remoteScore": 86,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.91
  },
  "surgical-assistant": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.35,
    "remoteCompatibility": "Lower",
    "remoteScore": 35,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.33
  },
  "home-health-aide": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.54,
    "remoteCompatibility": "Lower",
    "remoteScore": 23,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.43
  },
  "nursing-assistant": {
    "physicalDemand": "Higher",
    "physicalScore": 3.19,
    "remoteCompatibility": "Lower",
    "remoteScore": 10,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.71
  },
  "psychiatric-aide": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.33,
    "remoteCompatibility": "Lower",
    "remoteScore": 23,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.71
  },
  "ota": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.84,
    "remoteCompatibility": "Lower",
    "remoteScore": 20,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.7
  },
  "pta": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.63,
    "remoteCompatibility": "Lower",
    "remoteScore": 24,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.52
  },
  "pt-aide": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.8,
    "remoteCompatibility": "Lower",
    "remoteScore": 22,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.04
  },
  "massage-therapist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.58,
    "remoteCompatibility": "Mixed",
    "remoteScore": 40,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 2.28
  },
  "dental-assistant": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.6,
    "remoteCompatibility": "Lower",
    "remoteScore": 22,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.44
  },
  "medical-assistant": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.98,
    "remoteCompatibility": "Mixed",
    "remoteScore": 57,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.8
  },
  "medical-equipment-preparer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.84,
    "remoteCompatibility": "Lower",
    "remoteScore": 25,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.28
  },
  "veterinary-assistant": {
    "physicalDemand": "Higher",
    "physicalScore": 3.28,
    "remoteCompatibility": "Lower",
    "remoteScore": 7,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.78
  },
  "phlebotomist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.86,
    "remoteCompatibility": "Lower",
    "remoteScore": 11,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.45
  },
  "police-supervisor": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.2,
    "remoteCompatibility": "Lower",
    "remoteScore": 8,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.5
  },
  "firefighter": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.82,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.6
  },
  "fire-inspector": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.42,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.94
  },
  "correctional-officer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.26,
    "remoteCompatibility": "Lower",
    "remoteScore": 19,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.45
  },
  "detective": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.13,
    "remoteCompatibility": "Lower",
    "remoteScore": 20,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.78
  },
  "fish-game-warden": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.34,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.94
  },
  "police-officer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.23,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.96
  },
  "animal-control-worker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.56,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.96
  },
  "private-detective": {
    "physicalDemand": "Lower",
    "physicalScore": 1.56,
    "remoteCompatibility": "Mixed",
    "remoteScore": 63,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.32
  },
  "security-guard": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.03,
    "remoteCompatibility": "Lower",
    "remoteScore": 37,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.05
  },
  "lifeguard": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.24,
    "remoteCompatibility": "Lower",
    "remoteScore": 15,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 2.98
  },
  "tsa-officer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.78,
    "remoteCompatibility": "Lower",
    "remoteScore": 13,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.41
  },
  "chef": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.82,
    "remoteCompatibility": "Lower",
    "remoteScore": 5,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.75
  },
  "food-service-supervisor": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.36,
    "remoteCompatibility": "Lower",
    "remoteScore": 38,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.44
  },
  "cook": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.74,
    "remoteCompatibility": "Lower",
    "remoteScore": 19,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.03
  },
  "food-prep-worker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.53,
    "remoteCompatibility": "Lower",
    "remoteScore": 25,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.91
  },
  "bartender": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.7,
    "remoteCompatibility": "Lower",
    "remoteScore": 7,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 1.75
  },
  "fast-food-worker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.93,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 2.4
  },
  "server": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.66,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 2.79
  },
  "busser": {
    "physicalDemand": "Higher",
    "physicalScore": 3.16,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 2.87
  },
  "dishwasher": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.35,
    "remoteCompatibility": "Lower",
    "remoteScore": 25,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.35
  },
  "restaurant-host": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.68,
    "remoteCompatibility": "Lower",
    "remoteScore": 1,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 2.18
  },
  "janitor": {
    "physicalDemand": "Moderate",
    "physicalScore": 3.09,
    "remoteCompatibility": "Lower",
    "remoteScore": 4,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 2.96
  },
  "housekeeper": {
    "physicalDemand": "Higher",
    "physicalScore": 3.41,
    "remoteCompatibility": "Lower",
    "remoteScore": 7,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.9
  },
  "pest-control-worker": {
    "physicalDemand": "Moderate",
    "physicalScore": 3.05,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.14
  },
  "landscaper": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.98,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.28
  },
  "arborist": {
    "physicalDemand": "Higher",
    "physicalScore": 3.17,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.71
  },
  "animal-trainer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.72,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 2.89
  },
  "animal-caretaker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.94,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.32
  },
  "gaming-dealer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.42,
    "remoteCompatibility": "Lower",
    "remoteScore": 20,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 2.32
  },
  "amusement-attendant": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.52,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 1.98
  },
  "embalmer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.14,
    "remoteCompatibility": "Lower",
    "remoteScore": 10,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.74
  },
  "funeral-director": {
    "physicalDemand": "Lower",
    "physicalScore": 1.86,
    "remoteCompatibility": "Lower",
    "remoteScore": 17,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.74
  },
  "barber": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.59,
    "remoteCompatibility": "Lower",
    "remoteScore": 8,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 2.39
  },
  "barber-cosmetologist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.72,
    "remoteCompatibility": "Lower",
    "remoteScore": 6,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.41
  },
  "manicurist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.59,
    "remoteCompatibility": "Mixed",
    "remoteScore": 64,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 2.23
  },
  "esthetician": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.99,
    "remoteCompatibility": "Lower",
    "remoteScore": 38,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 2.59
  },
  "childcare-worker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.6,
    "remoteCompatibility": "Lower",
    "remoteScore": 25,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.49
  },
  "fitness-trainer": {
    "physicalDemand": "Higher",
    "physicalScore": 3.11,
    "remoteCompatibility": "Lower",
    "remoteScore": 12,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 2.95
  },
  "recreation-worker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.04,
    "remoteCompatibility": "Lower",
    "remoteScore": 37,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.3
  },
  "residential-advisor": {
    "physicalDemand": "Lower",
    "physicalScore": 1.81,
    "remoteCompatibility": "Mixed",
    "remoteScore": 40,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.67
  },
  "retail-supervisor": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.43,
    "remoteCompatibility": "Lower",
    "remoteScore": 17,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.22
  },
  "cashier": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.43,
    "remoteCompatibility": "Lower",
    "remoteScore": 6,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.06
  },
  "counter-clerk": {
    "physicalDemand": "Lower",
    "physicalScore": 1.88,
    "remoteCompatibility": "Lower",
    "remoteScore": 24,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.27
  },
  "parts-salesperson": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.52,
    "remoteCompatibility": "Lower",
    "remoteScore": 8,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.07
  },
  "retail-salesperson": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.42,
    "remoteCompatibility": "Lower",
    "remoteScore": 3,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.42
  },
  "advertising-sales-agent": {
    "physicalDemand": "Lower",
    "physicalScore": 1.48,
    "remoteCompatibility": "Lower",
    "remoteScore": 40,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.46
  },
  "insurance-agent": {
    "physicalDemand": "Lower",
    "physicalScore": 1.38,
    "remoteCompatibility": "Mixed",
    "remoteScore": 64,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.52
  },
  "securities-sales-agent": {
    "physicalDemand": "Lower",
    "physicalScore": 1.31,
    "remoteCompatibility": "Higher",
    "remoteScore": 77,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.86
  },
  "travel-agent": {
    "physicalDemand": "Lower",
    "physicalScore": 1.27,
    "remoteCompatibility": "Higher",
    "remoteScore": 85,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.73
  },
  "technical-sales-rep": {
    "physicalDemand": "Lower",
    "physicalScore": 1.72,
    "remoteCompatibility": "Mixed",
    "remoteScore": 44,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.93
  },
  "sales-rep": {
    "physicalDemand": "Moderate",
    "physicalScore": 2,
    "remoteCompatibility": "Mixed",
    "remoteScore": 43,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.78
  },
  "real-estate-broker": {
    "physicalDemand": "Lower",
    "physicalScore": 1.44,
    "remoteCompatibility": "Mixed",
    "remoteScore": 46,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.92
  },
  "real-estate-agent": {
    "physicalDemand": "Lower",
    "physicalScore": 1.76,
    "remoteCompatibility": "Lower",
    "remoteScore": 31,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.52
  },
  "sales-engineer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.3,
    "remoteCompatibility": "Higher",
    "remoteScore": 89,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.02
  },
  "office-supervisor": {
    "physicalDemand": "Lower",
    "physicalScore": 1.45,
    "remoteCompatibility": "Higher",
    "remoteScore": 67,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.04
  },
  "bill-collector": {
    "physicalDemand": "Lower",
    "physicalScore": 1.29,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.9
  },
  "billing-clerk": {
    "physicalDemand": "Lower",
    "physicalScore": 1.51,
    "remoteCompatibility": "Higher",
    "remoteScore": 91,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.93
  },
  "bookkeeper": {
    "physicalDemand": "Lower",
    "physicalScore": 1.46,
    "remoteCompatibility": "Higher",
    "remoteScore": 83,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.87
  },
  "payroll-clerk": {
    "physicalDemand": "Lower",
    "physicalScore": 1.4,
    "remoteCompatibility": "Higher",
    "remoteScore": 92,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.25
  },
  "bank-teller": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.01,
    "remoteCompatibility": "Mixed",
    "remoteScore": 44,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.53
  },
  "court-clerk": {
    "physicalDemand": "Lower",
    "physicalScore": 1.65,
    "remoteCompatibility": "Higher",
    "remoteScore": 68,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.08
  },
  "customer-service": {
    "physicalDemand": "Lower",
    "physicalScore": 1.84,
    "remoteCompatibility": "Higher",
    "remoteScore": 79,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.55
  },
  "eligibility-interviewer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.38,
    "remoteCompatibility": "Higher",
    "remoteScore": 90,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.28
  },
  "hotel-desk-clerk": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.08,
    "remoteCompatibility": "Lower",
    "remoteScore": 34,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.2
  },
  "loan-clerk": {
    "physicalDemand": "Lower",
    "physicalScore": 1.43,
    "remoteCompatibility": "Higher",
    "remoteScore": 81,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.53
  },
  "hr-assistant": {
    "physicalDemand": "Lower",
    "physicalScore": 1.56,
    "remoteCompatibility": "Higher",
    "remoteScore": 70,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.27
  },
  "receptionist": {
    "physicalDemand": "Lower",
    "physicalScore": 1.69,
    "remoteCompatibility": "Higher",
    "remoteScore": 67,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 2.71
  },
  "courier": {
    "physicalDemand": "Moderate",
    "physicalScore": 1.94,
    "remoteCompatibility": "Lower",
    "remoteScore": 23,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.71
  },
  "dispatcher": {
    "physicalDemand": "Lower",
    "physicalScore": 1.22,
    "remoteCompatibility": "Higher",
    "remoteScore": 85,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.22
  },
  "truck-dispatcher": {
    "physicalDemand": "Lower",
    "physicalScore": 1.68,
    "remoteCompatibility": "Lower",
    "remoteScore": 37,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.48
  },
  "postal-worker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.42,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.12
  },
  "production-clerk": {
    "physicalDemand": "Lower",
    "physicalScore": 1.58,
    "remoteCompatibility": "Mixed",
    "remoteScore": 57,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.55
  },
  "shipping-clerk": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.46,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.57
  },
  "executive-assistant": {
    "physicalDemand": "Lower",
    "physicalScore": 1.45,
    "remoteCompatibility": "Higher",
    "remoteScore": 74,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.86
  },
  "legal-secretary": {
    "physicalDemand": "Lower",
    "physicalScore": 1.65,
    "remoteCompatibility": "Higher",
    "remoteScore": 84,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.01
  },
  "medical-secretary": {
    "physicalDemand": "Lower",
    "physicalScore": 1.41,
    "remoteCompatibility": "Higher",
    "remoteScore": 71,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.95
  },
  "admin-assistant": {
    "physicalDemand": "Lower",
    "physicalScore": 1.48,
    "remoteCompatibility": "Higher",
    "remoteScore": 70,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.09
  },
  "data-entry-keyer": {
    "physicalDemand": "Lower",
    "physicalScore": 1.39,
    "remoteCompatibility": "Higher",
    "remoteScore": 88,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.21
  },
  "insurance-clerk": {
    "physicalDemand": "Lower",
    "physicalScore": 1.23,
    "remoteCompatibility": "Higher",
    "remoteScore": 100,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.94
  },
  "office-clerk": {
    "physicalDemand": "Lower",
    "physicalScore": 1.63,
    "remoteCompatibility": "Higher",
    "remoteScore": 76,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.77
  },
  "farmworker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.92,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.74
  },
  "livestock-worker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.66,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 2.37
  },
  "commercial-fisher": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.96,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Seasonal",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.05
  },
  "logging-operator": {
    "physicalDemand": "Lower",
    "physicalScore": 1.79,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.19
  },
  "construction-supervisor": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.61,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.13
  },
  "boilermaker": {
    "physicalDemand": "Higher",
    "physicalScore": 3.15,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.09
  },
  "brickmason": {
    "physicalDemand": "Higher",
    "physicalScore": 3.74,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.08
  },
  "stonemason": {
    "physicalDemand": "Higher",
    "physicalScore": 3.31,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.67
  },
  "carpenter": {
    "physicalDemand": "Higher",
    "physicalScore": 3.26,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.43
  },
  "floor-installer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.58,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.32
  },
  "tile-setter": {
    "physicalDemand": "Higher",
    "physicalScore": 3.37,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.57
  },
  "cement-mason": {
    "physicalDemand": "Higher",
    "physicalScore": 3.74,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.77
  },
  "construction-laborer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.59,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.11
  },
  "equipment-operator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.19,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.04
  },
  "drywall-installer": {
    "physicalDemand": "Higher",
    "physicalScore": 3.52,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.73
  },
  "electrician": {
    "physicalDemand": "Higher",
    "physicalScore": 4.21,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.32
  },
  "glazier": {
    "physicalDemand": "Higher",
    "physicalScore": 3.4,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.93
  },
  "insulation-worker": {
    "physicalDemand": "Higher",
    "physicalScore": 3.41,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.04
  },
  "painter": {
    "physicalDemand": "Higher",
    "physicalScore": 3.88,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.6
  },
  "plumber": {
    "physicalDemand": "Higher",
    "physicalScore": 3.64,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.27
  },
  "roofer": {
    "physicalDemand": "Higher",
    "physicalScore": 3.4,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.18
  },
  "sheet-metal": {
    "physicalDemand": "Moderate",
    "physicalScore": 3.06,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.98
  },
  "ironworker": {
    "physicalDemand": "Higher",
    "physicalScore": 3.66,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.24
  },
  "solar-installer": {
    "physicalDemand": "Higher",
    "physicalScore": 3.66,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.89
  },
  "building-inspector": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.47,
    "remoteCompatibility": "Lower",
    "remoteScore": 6,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.08
  },
  "elevator-tech": {
    "physicalDemand": "Higher",
    "physicalScore": 3.42,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.08
  },
  "hazmat-worker": {
    "physicalDemand": "Higher",
    "physicalScore": 3.24,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.88
  },
  "highway-maintenance-worker": {
    "physicalDemand": "Moderate",
    "physicalScore": 3.05,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.72
  },
  "drill-operator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.9,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.1
  },
  "surface-mining-operator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.05,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.58
  },
  "mining-machine-operator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.79,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.4
  },
  "roustabout": {
    "physicalDemand": "Moderate",
    "physicalScore": 3.09,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.28
  },
  "cell-tower-technician": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.44,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.48
  },
  "telecom-installer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.78,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.12
  },
  "avionics-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.51,
    "remoteCompatibility": "Lower",
    "remoteScore": 22,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.54
  },
  "substation-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.85,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.17
  },
  "alarm-installer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.83,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.08
  },
  "aircraft-mechanic": {
    "physicalDemand": "Higher",
    "physicalScore": 3.38,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.24
  },
  "auto-body-repairer": {
    "physicalDemand": "Higher",
    "physicalScore": 3.17,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.53
  },
  "auto-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.9,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.48
  },
  "diesel-tech": {
    "physicalDemand": "Higher",
    "physicalScore": 3.65,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.07
  },
  "farm-equipment-mechanic": {
    "physicalDemand": "Higher",
    "physicalScore": 3.34,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.08
  },
  "heavy-equipment-mechanic": {
    "physicalDemand": "Higher",
    "physicalScore": 3.19,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.93
  },
  "rail-car-repairer": {
    "physicalDemand": "Higher",
    "physicalScore": 3.38,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.99
  },
  "marine-mechanic": {
    "physicalDemand": "Moderate",
    "physicalScore": 3.06,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.17
  },
  "motorcycle-mechanic": {
    "physicalDemand": "Higher",
    "physicalScore": 3.31,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.54
  },
  "small-engine-mechanic": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.74,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.66
  },
  "hvac-tech": {
    "physicalDemand": "Higher",
    "physicalScore": 3.14,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.8
  },
  "appliance-repairer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.74,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.74
  },
  "industrial-mechanic": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.7,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.69
  },
  "millwright": {
    "physicalDemand": "Higher",
    "physicalScore": 3.33,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.59
  },
  "lineworker": {
    "physicalDemand": "Higher",
    "physicalScore": 3.1,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.11
  },
  "telecom-line-installer": {
    "physicalDemand": "Higher",
    "physicalScore": 3.2,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.54
  },
  "biomedical-equipment-tech": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.45,
    "remoteCompatibility": "Lower",
    "remoteScore": 25,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.82
  },
  "maintenance-worker": {
    "physicalDemand": "Higher",
    "physicalScore": 3.31,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.72
  },
  "wind-turbine-tech": {
    "physicalDemand": "Higher",
    "physicalScore": 3.84,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.21
  },
  "commercial-diver": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.83,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.85
  },
  "locksmith": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.44,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.92
  },
  "rigger": {
    "physicalDemand": "Higher",
    "physicalScore": 3.44,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.61
  },
  "production-supervisor": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.57,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.5
  },
  "baker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.59,
    "remoteCompatibility": "Lower",
    "remoteScore": 12,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.32
  },
  "butcher": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.63,
    "remoteCompatibility": "Lower",
    "remoteScore": 17,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.12
  },
  "meat-cutter": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.64,
    "remoteCompatibility": "Lower",
    "remoteScore": 33,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.59
  },
  "food-batchmaker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.9,
    "remoteCompatibility": "Lower",
    "remoteScore": 11,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.19
  },
  "machinist": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.5,
    "remoteCompatibility": "Lower",
    "remoteScore": 18,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.22
  },
  "tool-die-maker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.37,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.29
  },
  "welder": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.45,
    "remoteCompatibility": "Lower",
    "remoteScore": 3,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.51
  },
  "printing-press-operator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.86,
    "remoteCompatibility": "Lower",
    "remoteScore": 18,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.8
  },
  "laundry-worker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.88,
    "remoteCompatibility": "Lower",
    "remoteScore": 18,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.91
  },
  "sewing-machine-operator": {
    "physicalDemand": "Lower",
    "physicalScore": 1.79,
    "remoteCompatibility": "Higher",
    "remoteScore": 71,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.76
  },
  "tailor": {
    "physicalDemand": "Lower",
    "physicalScore": 1.88,
    "remoteCompatibility": "Higher",
    "remoteScore": 68,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.53
  },
  "upholsterer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.96,
    "remoteCompatibility": "Lower",
    "remoteScore": 9,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.86
  },
  "cabinetmaker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.91,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.11
  },
  "nuclear-reactor-operator": {
    "physicalDemand": "Lower",
    "physicalScore": 1.84,
    "remoteCompatibility": "Mixed",
    "remoteScore": 47,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.28
  },
  "power-dispatcher": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.22,
    "remoteCompatibility": "Lower",
    "remoteScore": 35,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.94
  },
  "power-plant-operator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.5,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.6
  },
  "stationary-engineer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.79,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.74
  },
  "water-treatment-operator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.55,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4
  },
  "refinery-operator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.52,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.75
  },
  "quality-inspector": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.56,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.72
  },
  "jeweler": {
    "physicalDemand": "Lower",
    "physicalScore": 1.53,
    "remoteCompatibility": "Mixed",
    "remoteScore": 57,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.64
  },
  "dental-lab-tech": {
    "physicalDemand": "Lower",
    "physicalScore": 1.58,
    "remoteCompatibility": "Higher",
    "remoteScore": 81,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.81
  },
  "packaging-operator": {
    "physicalDemand": "Higher",
    "physicalScore": 3.14,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.44
  },
  "semiconductor-technician": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.22,
    "remoteCompatibility": "Mixed",
    "remoteScore": 58,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.86
  },
  "cnc-operator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.53,
    "remoteCompatibility": "Lower",
    "remoteScore": 12,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.41
  },
  "cnc-programmer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.17,
    "remoteCompatibility": "Lower",
    "remoteScore": 38,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.2
  },
  "airline-pilot": {
    "physicalDemand": "Lower",
    "physicalScore": 1.69,
    "remoteCompatibility": "Lower",
    "remoteScore": 31,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.54
  },
  "commercial-pilot": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.09,
    "remoteCompatibility": "Lower",
    "remoteScore": 37,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.77
  },
  "air-traffic-controller": {
    "physicalDemand": "Lower",
    "physicalScore": 1.48,
    "remoteCompatibility": "Higher",
    "remoteScore": 73,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.41
  },
  "flight-attendant": {
    "physicalDemand": "Higher",
    "physicalScore": 3.16,
    "remoteCompatibility": "Lower",
    "remoteScore": 16,
    "scheduleType": "Irregular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.46
  },
  "ambulance-driver": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.6,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.78
  },
  "truck-driver": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.03,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.24
  },
  "delivery-driver": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.3,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.19
  },
  "school-bus-driver": {
    "physicalDemand": "Lower",
    "physicalScore": 1.71,
    "remoteCompatibility": "Lower",
    "remoteScore": 2,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 3.77
  },
  "bus-driver": {
    "physicalDemand": "Lower",
    "physicalScore": 1.54,
    "remoteCompatibility": "Lower",
    "remoteScore": 32,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.84
  },
  "shuttle-driver": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.06,
    "remoteCompatibility": "Lower",
    "remoteScore": 18,
    "scheduleType": "Regular",
    "weeklyHours": "Usually under 40 hours",
    "timePressure": 4.13
  },
  "locomotive-engineer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.17,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.38
  },
  "railroad-conductor": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.33,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.41
  },
  "subway-operator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.27,
    "remoteCompatibility": "Lower",
    "remoteScore": 7,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.82
  },
  "sailor": {
    "physicalDemand": "Higher",
    "physicalScore": 3.32,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4
  },
  "ship-captain": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.63,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.98
  },
  "ship-engineer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.74,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Irregular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.81
  },
  "parking-attendant": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.35,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 2.99
  },
  "crane-operator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.08,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.8
  },
  "forklift-operator": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.72,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 4.49
  },
  "vehicle-cleaner": {
    "physicalDemand": "Moderate",
    "physicalScore": 3.09,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.2
  },
  "warehouse-worker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.56,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.74
  },
  "hand-packer": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.69,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 4.22
  },
  "stocker": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.59,
    "remoteCompatibility": "Lower",
    "remoteScore": 19,
    "scheduleType": "Regular",
    "weeklyHours": "Usually 40 hours",
    "timePressure": 3.44
  },
  "refuse-collector": {
    "physicalDemand": "Moderate",
    "physicalScore": 2.5,
    "remoteCompatibility": "Lower",
    "remoteScore": 0,
    "scheduleType": "Regular",
    "weeklyHours": "Often over 40 hours",
    "timePressure": 3.74
  }
};

export function getCareerWorkContext(id: string): CareerWorkContext | undefined {
  return CAREER_WORK_CONTEXT[id];
}
