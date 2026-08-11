import { loadJSON, saveJSON, STORAGE_KEYS } from "./storage";

const EVENT = "empower:career-state-changed";
const METRO_EVENT = "empower:career-metro-changed";

export function readCareerStatePreference(): string {
  return loadJSON<string>(STORAGE_KEYS.careerState) ?? "";
}

export function saveCareerStatePreference(state: string): void {
  saveJSON(STORAGE_KEYS.careerState, state);
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeCareerStatePreference(callback: () => void): () => void {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function readCareerMetroPreference(): string {
  return loadJSON<string>(STORAGE_KEYS.careerMetro) ?? "";
}

export function saveCareerMetroPreference(areaCode: string): void {
  saveJSON(STORAGE_KEYS.careerMetro, areaCode);
  window.dispatchEvent(new Event(METRO_EVENT));
}

export function subscribeCareerMetroPreference(callback: () => void): () => void {
  window.addEventListener(METRO_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(METRO_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
