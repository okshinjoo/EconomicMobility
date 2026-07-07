// Approximate U.S. income-tax estimation for the budget calculator.
// Federal brackets, standard deductions, and FICA use 2026 figures. State
// rates are simplified flat approximations of a typical filer's effective
// rate — good enough for budgeting, NOT tax advice. The structure makes it
// easy to swap in full per-state brackets later.

export type FilingStatus = "single" | "mfj" | "mfs" | "hoh";

export const FILING_OPTIONS: { id: FilingStatus; label: string }[] = [
  { id: "single", label: "Single" },
  { id: "mfj", label: "Married, filing jointly" },
  { id: "mfs", label: "Married, filing separately" },
  { id: "hoh", label: "Head of household" },
];

interface Bracket {
  upTo: number;
  rate: number;
}

const FED_BRACKETS: Record<FilingStatus, Bracket[]> = {
  single: [
    { upTo: 12400, rate: 0.1 },
    { upTo: 50400, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256225, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  mfj: [
    { upTo: 24800, rate: 0.1 },
    { upTo: 100800, rate: 0.12 },
    { upTo: 211400, rate: 0.22 },
    { upTo: 403550, rate: 0.24 },
    { upTo: 512450, rate: 0.32 },
    { upTo: 768700, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  mfs: [
    { upTo: 12400, rate: 0.1 },
    { upTo: 50400, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256225, rate: 0.32 },
    { upTo: 384350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  hoh: [
    { upTo: 17700, rate: 0.1 },
    { upTo: 67450, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256200, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
};

const STD_DEDUCTION: Record<FilingStatus, number> = {
  single: 16100,
  mfj: 32200,
  mfs: 16100,
  hoh: 24150,
};

const SS_WAGE_BASE = 184500; // 2026 Social Security wage base
const SS_RATE = 0.062;
const MEDICARE_RATE = 0.0145;
const ADDL_MEDICARE_RATE = 0.009;
const ADDL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000,
  mfj: 250000,
  mfs: 125000,
  hoh: 200000,
};

export const US_STATES: { code: string; name: string }[] = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

// Approximate effective state income-tax rates (0 = no state income tax on wages).
const STATE_RATES: Record<string, number> = {
  AL: 0.045, AK: 0, AZ: 0.025, AR: 0.039, CA: 0.06, CO: 0.044, CT: 0.05,
  DE: 0.05, DC: 0.065, FL: 0, GA: 0.0539, HI: 0.07, ID: 0.058, IL: 0.0495,
  IN: 0.0315, IA: 0.038, KS: 0.052, KY: 0.04, LA: 0.03, ME: 0.058, MD: 0.05,
  MA: 0.05, MI: 0.0425, MN: 0.068, MS: 0.047, MO: 0.047, MT: 0.059, NE: 0.052,
  NV: 0, NH: 0, NJ: 0.045, NM: 0.049, NY: 0.06, NC: 0.0425, ND: 0.02, OH: 0.035,
  OK: 0.0475, OR: 0.085, PA: 0.0307, RI: 0.045, SC: 0.062, SD: 0, TN: 0, TX: 0,
  UT: 0.0455, VT: 0.066, VA: 0.0575, WA: 0, WV: 0.051, WI: 0.053, WY: 0,
};

// A few well-known city/local income taxes, applied only in their state.
const LOCAL_TAXES: { city: string; state: string; rate: number; label: string }[] =
  [
    { city: "new york city", state: "NY", rate: 0.035, label: "NYC local tax" },
    { city: "new york", state: "NY", rate: 0.035, label: "NYC local tax" },
    { city: "nyc", state: "NY", rate: 0.035, label: "NYC local tax" },
    { city: "philadelphia", state: "PA", rate: 0.0375, label: "Philadelphia wage tax" },
    { city: "detroit", state: "MI", rate: 0.024, label: "Detroit local tax" },
  ];

export interface TaxBreakdown {
  gross: number;
  federal: number;
  socialSecurity: number;
  medicare: number;
  state: number;
  local: number;
  localLabel?: string;
  totalTax: number;
  net: number;
  effectiveRate: number;
}

function progressiveTax(taxable: number, brackets: Bracket[]): number {
  if (taxable <= 0) return 0;
  let tax = 0;
  let lower = 0;
  for (const b of brackets) {
    const amountInBracket = Math.min(taxable, b.upTo) - lower;
    if (amountInBracket > 0) tax += amountInBracket * b.rate;
    lower = b.upTo;
    if (taxable <= b.upTo) break;
  }
  return tax;
}

/**
 * Estimate annual taxes. `wages` is W-2 income subject to FICA; `otherIncome`
 * is added to taxable income but not taxed for FICA.
 */
export function estimateTaxes(
  wages: number,
  otherIncome: number,
  filing: FilingStatus,
  stateCode: string,
  city: string
): TaxBreakdown {
  const gross = Math.max(0, wages) + Math.max(0, otherIncome);
  const fedTaxable = Math.max(0, gross - STD_DEDUCTION[filing]);

  const federal = progressiveTax(fedTaxable, FED_BRACKETS[filing]);
  const socialSecurity = SS_RATE * Math.min(wages, SS_WAGE_BASE);
  const medicare =
    MEDICARE_RATE * wages +
    ADDL_MEDICARE_RATE * Math.max(0, wages - ADDL_MEDICARE_THRESHOLD[filing]);

  const stateRate = STATE_RATES[stateCode] ?? 0;
  const state = stateRate * fedTaxable;

  let local = 0;
  let localLabel: string | undefined;
  const normalizedCity = city.trim().toLowerCase();
  if (normalizedCity && stateCode) {
    const match = LOCAL_TAXES.find(
      (l) => l.state === stateCode && normalizedCity.includes(l.city)
    );
    if (match) {
      local = match.rate * fedTaxable;
      localLabel = match.label;
    }
  }

  const totalTax = federal + socialSecurity + medicare + state + local;
  const net = gross - totalTax;

  return {
    gross,
    federal,
    socialSecurity,
    medicare,
    state,
    local,
    localLabel,
    totalTax,
    net,
    effectiveRate: gross > 0 ? totalTax / gross : 0,
  };
}

export function hasStateIncomeTax(stateCode: string): boolean {
  return (STATE_RATES[stateCode] ?? 0) > 0;
}
