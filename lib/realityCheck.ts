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
}

export interface LifestyleCategory {
  id: string;
  title: string;
  /** Short label used in the results breakdown + donut legend. */
  short: string;
  color: string;
  options: LifestyleOption[];
}

export const lifestyleCategories: LifestyleCategory[] = [
  {
    id: "housing",
    title: "Where do you live?",
    short: "Housing",
    color: "#0c4a39",
    options: [
      { id: "family", label: "With family", blurb: "Chipping in for your share of the household.", monthly: 300 },
      { id: "roommates", label: "Splitting a place with roommates", blurb: "Your room, shared everything else.", monthly: 800 },
      { id: "solo", label: "Your own one-bedroom", blurb: "Nobody else's dishes. All of the rent.", monthly: 1400 },
      { id: "nice-solo", label: "Your own place, nice building", blurb: "In-unit laundry and a landlord who answers.", monthly: 2100 },
    ],
  },
  {
    id: "home-bills",
    title: "Utilities & internet?",
    short: "Home bills",
    color: "#15624b",
    options: [
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
      { id: "transit", label: "Transit, bike, rides", blurb: "Bus pass, bike tires, the occasional rideshare.", monthly: 130 },
      { id: "used-car", label: "A used car", blurb: "Payment, insurance, gas, and the odd repair.", monthly: 500 },
      { id: "new-car", label: "A new car", blurb: "That new-car smell has a monthly price.", monthly: 850 },
    ],
  },
  {
    id: "phone",
    title: "Phone & plan?",
    short: "Phone",
    color: "#1f9069",
    options: [
      { id: "budget", label: "Budget carrier", blurb: "Same towers, smaller bill.", monthly: 35 },
      { id: "standard", label: "Big-carrier plan", blurb: "Unlimited everything on a phone you own.", monthly: 70 },
      { id: "latest", label: "Latest phone, financed", blurb: "New device every couple of years, baked into the bill.", monthly: 130 },
    ],
  },
  {
    id: "fun",
    title: "Streaming, games & going out?",
    short: "Fun",
    color: "#d26a4c",
    options: [
      { id: "low", label: "A subscription and a hangout", blurb: "One or two services, mostly free fun.", monthly: 60 },
      { id: "mid", label: "The usual lineup", blurb: "A few subscriptions, movies, nights out.", monthly: 150 },
      { id: "high", label: "Say yes to everything", blurb: "Every service, every show, every invite.", monthly: 300 },
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
    ],
  },
  {
    id: "travel",
    title: "Trips?",
    short: "Travel",
    color: "#0f7d74",
    options: [
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
    ],
  },
  {
    id: "savings",
    title: "Paying future-you?",
    short: "Savings",
    color: "#e7a33c",
    options: [
      { id: "later", label: "Skipping for now", blurb: "We get it. (The guides can help change this.)", monthly: 0 },
      { id: "starter", label: "A starter habit", blurb: "Automatic transfer, small but real.", monthly: 150 },
      { id: "serious", label: "Building seriously", blurb: "Emergency fund, then investing.", monthly: 400 },
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
