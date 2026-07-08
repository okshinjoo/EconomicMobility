// The Reality Check: pick the life you want, see the salary it takes.
// Inspired by Jump$tart's classic "Reality Check" exercise. Costs are honest
// national ballparks (labeled as such in the UI; your city varies); the
// salary math runs through the real 2026 tax engine (lib/taxData.ts), so the
// answer is a GROSS salary, not the hand-wavy "add 22%" most versions use.

import { estimateTaxes } from "./taxData";

export interface LifestyleOption {
  id: string;
  label: string;
  blurb: string;
  monthly: number;
  /** Big-expensive-city price, where it differs meaningfully (housing). */
  monthlyHigh?: number;
}

export interface LifestyleCategory {
  id: string;
  title: string;
  /** Short label used in the results breakdown + donut legend. */
  short: string;
  color: string;
  options: LifestyleOption[];
  /** Amounts vary too widely for presets (fun, travel, savings): the UI
   *  shows a type-it-yourself money field instead of the options. The
   *  options stay as estimates for old saved snapshots. */
  freeEntry?: { hint: string };
}

export const lifestyleCategories: LifestyleCategory[] = [
  {
    id: "housing",
    title: "Where do you live?",
    short: "Housing",
    color: "#0c4a39",
    options: [
      { id: "family", label: "With family", blurb: "Chipping in for your share of the household.", monthly: 300, monthlyHigh: 450 },
      { id: "roommates", label: "Splitting a place with roommates", blurb: "Your room, shared everything else.", monthly: 800, monthlyHigh: 1400 },
      { id: "studio", label: "A studio, just you", blurb: "One room, one name on the lease.", monthly: 1150, monthlyHigh: 2100 },
      { id: "solo", label: "Your own one-bedroom", blurb: "Nobody else's dishes. All of the rent.", monthly: 1400, monthlyHigh: 2600 },
      { id: "nice-solo", label: "Your own place, nice building", blurb: "In-unit laundry and a landlord who answers.", monthly: 2100, monthlyHigh: 3800 },
    ],
  },
  {
    id: "home-bills",
    title: "Utilities & internet?",
    short: "Home bills",
    color: "#15624b",
    options: [
      { id: "covered", label: "Covered in the rent", blurb: "Utilities included, or family's got the bills.", monthly: 0 },
      { id: "lean", label: "Kept lean", blurb: "Lights, water, decent internet. Sweaters in winter.", monthly: 120 },
      { id: "comfy", label: "Comfortable", blurb: "AC when you want it, internet that never buffers.", monthly: 200 },
      { id: "premium", label: "All the comforts", blurb: "Perfect temperature, gigabit speed, smart everything.", monthly: 280 },
    ],
  },
  {
    id: "food",
    title: "How do you eat?",
    short: "Food",
    color: "#c9842a",
    options: [
      { id: "tight", label: "Strict grocery list", blurb: "Planned meals, store brands, nothing wasted.", monthly: 250 },
      { id: "cook", label: "Mostly cooking", blurb: "Groceries, meal prep, the occasional treat.", monthly: 350 },
      { id: "mix", label: "Cook some, order some", blurb: "Home kitchen on weekdays, menus on weekends.", monthly: 550 },
      { id: "out", label: "Mostly eating out", blurb: "The delivery apps know you by name.", monthly: 950 },
    ],
  },
  {
    id: "transport",
    title: "How do you get around?",
    short: "Transport",
    color: "#3f6478",
    options: [
      { id: "walk-bike", label: "Walking & biking", blurb: "Sneakers, tires, and the occasional bus fare.", monthly: 25 },
      { id: "transit", label: "Public transit", blurb: "Bus or subway pass, the occasional rideshare.", monthly: 130 },
      { id: "family-car", label: "Borrowing the family car", blurb: "Chipping in for gas, maybe a share of insurance.", monthly: 120 },
      { id: "paid-off", label: "An older car, paid off", blurb: "No payment - just insurance, gas, and repairs.", monthly: 320 },
      { id: "used-car", label: "A financed used car", blurb: "Payment, insurance, gas, and the odd repair.", monthly: 500 },
      { id: "lease", label: "Leasing something newer", blurb: "A payment that never ends, but always under warranty.", monthly: 600 },
      { id: "new-car", label: "A new car, financed", blurb: "That new-car smell has a monthly price.", monthly: 850 },
    ],
  },
  {
    id: "phone",
    title: "Phone & plan?",
    short: "Phone",
    color: "#1f9069",
    options: [
      { id: "family-line", label: "A line on the family plan", blurb: "Your share of the group bill.", monthly: 20 },
      { id: "budget", label: "Budget carrier", blurb: "Same towers, smaller bill.", monthly: 35 },
      { id: "standard", label: "Big-carrier plan", blurb: "Unlimited everything on a phone you own.", monthly: 70 },
      { id: "latest", label: "Latest phone, financed", blurb: "New device every couple of years, baked into the bill.", monthly: 130 },
    ],
  },
  {
    id: "health",
    title: "Health coverage?",
    short: "Health",
    color: "#2c6e8a",
    options: [
      { id: "parents", label: "On a parent's plan", blurb: "You can stay on until you turn 26.", monthly: 0 },
      { id: "employer", label: "A job with benefits", blurb: "Your share of the premium comes out of the paycheck.", monthly: 130 },
      { id: "employer-plus", label: "Job plan, plus gym & extras", blurb: "Coverage, a membership, the wellness apps.", monthly: 230 },
      { id: "own", label: "Buying your own plan", blurb: "Marketplace coverage with no employer chipping in.", monthly: 450 },
    ],
  },
  {
    id: "student-loans",
    title: "Student loans?",
    short: "Student loans",
    color: "#7b5e7d",
    options: [
      { id: "none", label: "None", blurb: "No student debt, or not yet.", monthly: 0 },
      { id: "average", label: "Average", blurb: "About the average federal-loan payment after college.", monthly: 300 },
      { id: "more", label: "More than average", blurb: "Grad school, private loans, or borrowing past the average.", monthly: 500 },
    ],
  },
  {
    id: "debts",
    title: "Other debt payments?",
    short: "Debts",
    color: "#5d6b8a",
    freeEntry: {
      hint: "Car note, credit cards, medical bills - whatever you actually pay per month, not counting student loans. $0 if nothing follows you around.",
    },
    options: [],
  },
  {
    id: "fun",
    title: "Streaming, games & going out?",
    short: "Fun",
    color: "#d26a4c",
    freeEntry: {
      hint: "Streaming, games, concerts, nights out - your real monthly number. Most people land somewhere between $30 and $400.",
    },
    options: [
      { id: "low", label: "A subscription and a hangout", blurb: "One or two services, mostly free fun.", monthly: 60 },
      { id: "mid", label: "The usual lineup", blurb: "A few subscriptions, movies, nights out.", monthly: 150 },
      { id: "high", label: "Say yes to everything", blurb: "Every service, every show, every invite.", monthly: 300 },
      { id: "max", label: "Concerts, games & bottle service", blurb: "The good seats, the group trips, the cover charges.", monthly: 500 },
    ],
  },
  {
    id: "style",
    title: "Clothes & self-care?",
    short: "Style",
    color: "#b7593f",
    options: [
      { id: "thrift", label: "Thrift and basics", blurb: "Capsule wardrobe, home haircuts or close to it.", monthly: 50 },
      { id: "regular", label: "Regular refresh", blurb: "New pieces when you need them, salon sometimes.", monthly: 130 },
      { id: "fresh", label: "Always fresh", blurb: "Fits on rotation, standing salon appointment.", monthly: 300 },
      { id: "designer", label: "Designer taste", blurb: "Labels, skincare shelves, nails every two weeks.", monthly: 550 },
    ],
  },
  {
    id: "travel",
    title: "Trips?",
    short: "Travel",
    color: "#0f7d74",
    freeEntry: {
      hint: "Average it out: a $1,200 trip once a year is $100 a month. $0 is a fine answer.",
    },
    options: [
      { id: "none", label: "Not a travel person", blurb: "Home is the destination.", monthly: 0 },
      { id: "rare", label: "A weekend thing now and then", blurb: "Day trips, one modest getaway a year.", monthly: 50 },
      { id: "some", label: "A real trip or two a year", blurb: "Flights, a hotel, souvenirs you don't regret.", monthly: 175 },
      { id: "often", label: "Passport stays warm", blurb: "Multiple trips a year, some of them far.", monthly: 400 },
    ],
  },
  {
    id: "pets",
    title: "Any pets?",
    short: "Pets",
    color: "#7c6247",
    options: [
      { id: "none", label: "No pets", blurb: "Free to travel, houseplants only.", monthly: 0 },
      { id: "cat", label: "A cat", blurb: "Food, litter, vet fund, one destroyed couch corner.", monthly: 60 },
      { id: "dog", label: "A dog", blurb: "Food, vet fund, toys, maybe daycare.", monthly: 130 },
      { id: "menagerie", label: "A big dog, or a whole crew", blurb: "More mouths, more vet visits, boarding when you travel.", monthly: 250 },
    ],
  },
  {
    id: "family",
    title: "Helping family out?",
    short: "Family",
    color: "#9c6b30",
    freeEntry: {
      hint: "Rent help, remittances, the family phone plan - whatever leaves your account for family in a typical month. $0 is a fine answer.",
    },
    options: [
      { id: "none", label: "Not right now", blurb: "Your money covers you.", monthly: 0 },
      { id: "sometimes", label: "When it matters", blurb: "Covering a bill or a birthday when someone needs it.", monthly: 100 },
      { id: "monthly", label: "A set amount every month", blurb: "Rent help, remittances, or the family phone plan - a real line item.", monthly: 300 },
    ],
  },
  {
    id: "extras",
    title: "Household stuff & everything else?",
    short: "Extras",
    color: "#6b705c",
    options: [
      { id: "minimal", label: "Bare minimum", blurb: "Toiletries, cleaning supplies, replacing what breaks.", monthly: 60 },
      { id: "standard", label: "The usual restock", blurb: "Household runs plus the small stuff that adds up.", monthly: 120 },
      { id: "plush", label: "Wants sneak in", blurb: "Runs that start as toothpaste and end as a haul.", monthly: 250 },
    ],
  },
  {
    id: "savings",
    title: "Paying future-you?",
    short: "Savings",
    color: "#e7a33c",
    freeEntry: {
      hint: "Savings and investing together, per month. $0 is an honest answer too - the guides can help change it.",
    },
    options: [
      { id: "later", label: "Skipping for now", blurb: "We get it. (The guides can help change this.)", monthly: 0 },
      { id: "starter", label: "A starter habit", blurb: "Automatic transfer, small but real.", monthly: 150 },
      { id: "serious", label: "Building seriously", blurb: "Emergency fund, then investing.", monthly: 400 },
      { id: "aggressive", label: "Future-you eats first", blurb: "Maxing what you can while the bills are still small.", monthly: 800 },
    ],
  },
];

export interface RealityResult {
  monthlyTotal: number;
  annualNet: number;
  grossSalary: number;
  hourly: number;
  effectiveRate: number;
}

/**
 * The honest version of "add some percent for taxes": binary-search the gross
 * salary whose 2026 take-home (single filer, chosen state) covers the
 * lifestyle. stateCode "" = federal + FICA only.
 */
export function salaryForLifestyle(
  monthlyTotal: number,
  stateCode: string
): RealityResult {
  const annualNet = monthlyTotal * 12;
  let lo = annualNet;
  let hi = annualNet * 2.2 + 10000;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    const net = estimateTaxes(mid, 0, "single", stateCode, "").net;
    if (net < annualNet) lo = mid;
    else hi = mid;
  }
  const gross = Math.ceil(hi / 100) * 100;
  const breakdown = estimateTaxes(gross, 0, "single", stateCode, "");
  return {
    monthlyTotal,
    annualNet,
    grossSalary: gross,
    hourly: gross / 2080,
    effectiveRate: breakdown.effectiveRate,
  };
}
