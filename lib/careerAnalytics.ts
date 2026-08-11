import { track } from "@vercel/analytics";

type CareerEvent =
  | "Career fit completed"
  | "Career save changed"
  | "Career explorer result opened"
  | "Career comparison changed"
  | "Career local pay selected"
  | "Career pathway opened"
  | "Career plan changed";

type SafeValue = string | number | boolean;

const ALLOWED_PROPERTIES: Record<CareerEvent, ReadonlySet<string>> = {
  "Career fit completed": new Set(["result_count", "has_pattern"]),
  "Career save changed": new Set(["action", "saved_count"]),
  "Career explorer result opened": new Set(["discovery_mode", "active_filter_count", "result_count_band"]),
  "Career comparison changed": new Set(["action", "career_count"]),
  "Career local pay selected": new Set(["level", "has_selection"]),
  "Career pathway opened": new Set(["pathway_type"]),
  "Career plan changed": new Set(["action", "completed_count", "step_count"]),
};

/**
 * Custom Career Explorer analytics deliberately exclude career ids, search
 * text, location codes, fit answers, plan text, names, and contact details.
 */
export function trackCareerEvent(
  event: CareerEvent,
  properties: Record<string, SafeValue> = {}
): void {
  const allowed = ALLOWED_PROPERTIES[event];
  const safe = Object.fromEntries(
    Object.entries(properties).filter(([key]) => allowed.has(key))
  );
  track(event, safe);
}
