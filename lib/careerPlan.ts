import { loadJSON, saveJSON, STORAGE_KEYS } from "./storage";

export interface CareerPlanStep {
  id: string;
  text: string;
  dueDate: string;
  done: boolean;
}

export interface CareerPlan {
  careerId: string;
  why: string;
  decisionTest: string;
  notes: string;
  steps: CareerPlanStep[];
  updatedAt: number;
}

export type CareerPlanMap = Record<string, CareerPlan>;

export const CAREER_PLAN_EVENT = "empower:career-plan-changed";

export function readCareerPlans(): CareerPlanMap {
  return loadJSON<CareerPlanMap>(STORAGE_KEYS.careerPlan) ?? {};
}

export function saveCareerPlan(plan: CareerPlan): void {
  const plans = readCareerPlans();
  const next = { ...plans, [plan.careerId]: plan };
  saveJSON(STORAGE_KEYS.careerPlan, next);
  window.dispatchEvent(new CustomEvent(CAREER_PLAN_EVENT, { detail: plan.careerId }));
}

export function createCareerPlan(
  careerId: string,
  steps: string[]
): CareerPlan {
  return {
    careerId,
    why: "",
    decisionTest: "",
    notes: "",
    steps: steps.map((text, index) => ({
      id: `${careerId}-${index + 1}`,
      text,
      dueDate: "",
      done: false,
    })),
    updatedAt: Date.now(),
  };
}

export function touchCareerPlan(plan: CareerPlan): CareerPlan {
  return { ...plan, updatedAt: Date.now() };
}

export function createCareerPlanStep(careerId: string): CareerPlanStep {
  return {
    id: `${careerId}-${Date.now()}`,
    text: "Add your next step",
    dueDate: "",
    done: false,
  };
}
