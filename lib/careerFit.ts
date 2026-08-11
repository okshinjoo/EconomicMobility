export const CAREER_FIT_EVENT = "empower:career-fit-changed";

export const CAREER_INTERESTS = [
  "Realistic",
  "Investigative",
  "Artistic",
  "Social",
  "Enterprising",
  "Conventional",
] as const;

export type CareerInterest = (typeof CAREER_INTERESTS)[number];
export type CareerFitAnswer = 1 | 2 | 3;

export interface CareerFitQuestion {
  id: string;
  prompt: string;
  interest: CareerInterest;
  styles: string[];
}

// These are original, plain-language prompts. They are not copied from or
// presented as the validated O*NET Interest Profiler. O*NET data supplies the
// six interest types and the work-style vocabulary used for matching.
export const CAREER_FIT_QUESTIONS: CareerFitQuestion[] = [
  {
    id: "repair",
    prompt: "Repair, build, or install something using tools",
    interest: "Realistic",
    styles: ["Dependability", "Cautiousness"],
  },
  {
    id: "hands-on",
    prompt: "Work with equipment, materials, animals, or the outdoors",
    interest: "Realistic",
    styles: ["Adaptability", "Perseverance"],
  },
  {
    id: "investigate",
    prompt: "Investigate why a system, process, or person has a problem",
    interest: "Investigative",
    styles: ["Intellectual Curiosity", "Attention to Detail"],
  },
  {
    id: "analyze",
    prompt: "Study evidence or data until a pattern makes sense",
    interest: "Investigative",
    styles: ["Intellectual Curiosity", "Perseverance"],
  },
  {
    id: "create",
    prompt: "Create a visual, story, performance, or original design",
    interest: "Artistic",
    styles: ["Innovation", "Tolerance for Ambiguity"],
  },
  {
    id: "improvise",
    prompt: "Try a new approach when the usual one feels limiting",
    interest: "Artistic",
    styles: ["Innovation", "Adaptability"],
  },
  {
    id: "teach",
    prompt: "Teach, coach, or explain something until it clicks",
    interest: "Social",
    styles: ["Empathy", "Cooperation"],
  },
  {
    id: "support",
    prompt: "Help someone through a health, learning, or life challenge",
    interest: "Social",
    styles: ["Empathy", "Social Orientation"],
  },
  {
    id: "lead",
    prompt: "Lead a group toward a decision or shared goal",
    interest: "Enterprising",
    styles: ["Leadership Orientation", "Self-Confidence"],
  },
  {
    id: "pitch",
    prompt: "Pitch an idea, negotiate, sell, or start a project",
    interest: "Enterprising",
    styles: ["Achievement Orientation", "Self-Confidence"],
  },
  {
    id: "organize",
    prompt: "Organize records, schedules, or details so nothing gets missed",
    interest: "Conventional",
    styles: ["Attention to Detail", "Dependability"],
  },
  {
    id: "procedure",
    prompt: "Follow a careful process that keeps work accurate and safe",
    interest: "Conventional",
    styles: ["Cautiousness", "Integrity"],
  },
];

export interface CareerFitSnapshot {
  answers: Record<string, CareerFitAnswer>;
  completedAt: number;
  topInterests: CareerInterest[];
  topStyles: string[];
  suggestedIds: string[];
}

export function summarizeCareerFit(answers: Record<string, CareerFitAnswer>) {
  const interestScores = Object.fromEntries(
    CAREER_INTERESTS.map((interest) => [interest, 0])
  ) as Record<CareerInterest, number>;
  const styleScores: Record<string, number> = {};

  for (const question of CAREER_FIT_QUESTIONS) {
    const answer = answers[question.id];
    if (!answer) continue;
    const weight = answer - 2;
    interestScores[question.interest] += weight;
    for (const style of question.styles) {
      styleScores[style] = (styleScores[style] ?? 0) + weight;
    }
  }

  const topInterests = [...CAREER_INTERESTS]
    .sort((a, b) => interestScores[b] - interestScores[a])
    .filter((interest) => interestScores[interest] > 0)
    .slice(0, 3);
  const topStyles = Object.entries(styleScores)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .filter(([, score]) => score > 0)
    .slice(0, 4)
    .map(([style]) => style);

  return { interestScores, styleScores, topInterests, topStyles };
}
