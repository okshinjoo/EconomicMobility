import type { Career, EducationLevel } from "./careers";
import type { CareerDetail } from "./careerDetails";
import type { CareerWorkContext } from "./careerWorkContext";

export const CAREER_COST_SOURCE = {
  vintage: "2022–23 NCES Digest",
  url: "https://nces.ed.gov/programs/digest/d23/tables/dt23_330.20.asp",
  publicTwoYearAnnual: 3598,
  publicFourYearAnnual: 9750,
} as const;

const educationTime: Record<EducationLevel, string> = {
  none: "Weeks to months for many entry roles",
  hs: "Weeks to months; job training may continue",
  "some-college": "Usually under 2 years",
  certificate: "Usually 6–18 months",
  associate: "About 2 years full time",
  bachelor: "About 4 years full time",
  master: "About 6 years total",
  doctoral: "Usually 7+ years after high school",
};

export function timeToEntry(career: Career, detail?: CareerDetail): string {
  const explicitYears = career.trainingNote.match(/(\d+)\s*[–-]\s*(\d+)\s*year/i);
  if (explicitYears) {
    return `${explicitYears[1]}–${explicitYears[2]} years${career.earnWhileTraining ? "; paid training" : ""}`;
  }
  const explicitMonths = career.trainingNote.match(/(\d+)\s*[–-]\s*(\d+)\s*month/i);
  if (explicitMonths) return `${explicitMonths[1]}–${explicitMonths[2]} months`;
  if (/apprenticeship/i.test(detail?.onJobTraining ?? "")) return `Several years; paid apprenticeship`;
  if (/short-term/i.test(detail?.onJobTraining ?? "")) return "A few weeks to several months";
  if (/moderate-term/i.test(detail?.onJobTraining ?? "")) return "Several months to about a year";
  if (/long-term/i.test(detail?.onJobTraining ?? "")) return "More than a year of job training";
  return educationTime[career.education];
}

export function educationCostBaseline(career: Career): string {
  if (career.earnWhileTraining && /apprenticeship|academy|employer|on-the-job/i.test(career.trainingNote)) {
    return "Often low tuition; wages during training";
  }
  switch (career.education) {
    case "none":
    case "hs":
      return "$0 required college tuition";
    case "some-college":
      return "Up to about $3,600 per public-college year";
    case "certificate":
      return "About $3,600–$7,200 at public 2-year rates";
    case "associate":
      return "About $7,200 at public 2-year rates";
    case "bachelor":
      return "About $39,000 in-state public tuition";
    case "master":
      return "$39,000 undergraduate baseline, plus graduate tuition";
    case "doctoral":
      return "$39,000 undergraduate baseline, plus professional or graduate tuition";
  }
}

export function scheduleLabel(detail: CareerDetail | undefined, context: CareerWorkContext | undefined): string {
  if (detail?.hours) return detail.hours;
  if (context?.scheduleType || context?.weeklyHours) {
    return [context.scheduleType ? `${context.scheduleType} schedule` : null, context.weeklyHours]
      .filter(Boolean)
      .join(" · ");
  }
  return "Not published";
}

export function physicalDemandLabel(context?: CareerWorkContext): string {
  if (!context) return "Not published";
  if (context.physicalDemand === "Higher") return "Higher · frequent movement or body-position demands";
  if (context.physicalDemand === "Moderate") return "Moderate · a mix of seated and active work";
  return "Lower · work is mostly seated or light activity";
}

export function remoteCompatibilityLabel(context?: CareerWorkContext): string {
  if (!context) return "Not estimated";
  if (context.remoteCompatibility === "Higher") return "Higher · many core tasks may be location-flexible";
  if (context.remoteCompatibility === "Mixed") return "Mixed · some tasks may work remotely";
  return "Lower · most duties depend on a site, equipment, or in-person contact";
}

export function biggestTradeoff(
  career: Career,
  detail: CareerDetail | undefined,
  context: CareerWorkContext | undefined
): string {
  if (career.education === "doctoral") return "A long, costly training path before full professional earnings.";
  if (career.education === "master") return "Graduate school delays full-time earnings and adds tuition exposure.";
  if (context?.physicalDemand === "Higher" && context.scheduleType !== "Regular") {
    return "Higher physical strain and a schedule that may be less predictable.";
  }
  if (context?.physicalDemand === "Higher") return "The work can be physically taxing over a full career.";
  if (career.growth < 0) return "The field is shrinking even though replacement openings continue.";
  if (career.medianPay != null && career.medianPay < 50000 && ["associate", "bachelor"].includes(career.education)) {
    return "Typical pay can be modest relative to the education required.";
  }
  if (context?.remoteCompatibility === "Lower" && context.scheduleType !== "Regular") {
    return "Little location flexibility and a schedule that may change with demand.";
  }
  if ((context?.timePressure ?? 0) >= 4.25) return "Frequent time pressure can make otherwise predictable work intense.";
  if (career.education === "bachelor") return "Four years of tuition and foregone earnings before typical entry.";
  if (detail?.selfEmployedPercent != null && detail.selfEmployedPercent >= 20) {
    return "Income and benefits may be less predictable for self-employed workers.";
  }
  return "Local employers, schedules, and advancement paths vary more than the national median shows.";
}
