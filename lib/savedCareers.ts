// A small, local-first career shortlist. A map shape lets account sync merge
// careers saved on two devices without one list erasing the other.

import { loadJSON, saveJSON, STORAGE_KEYS } from "./storage";

export const MAX_SAVED_CAREERS = 8;
export const SAVED_CAREERS_EVENT = "empower:saved-careers-changed";

export type SavedCareerMap = Record<string, number>;

export function readSavedCareerMap(): SavedCareerMap {
  return loadJSON<SavedCareerMap>(STORAGE_KEYS.savedCareers) ?? {};
}

export function readSavedCareerIds(): string[] {
  return Object.entries(readSavedCareerMap())
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
}

export function isCareerSaved(id: string): boolean {
  return id in readSavedCareerMap();
}

export function subscribeSavedCareers(callback: () => void): () => void {
  window.addEventListener(SAVED_CAREERS_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(SAVED_CAREERS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function toggleSavedCareer(id: string): "saved" | "removed" | "full" {
  const current = readSavedCareerMap();
  if (id in current) {
    delete current[id];
    saveAndNotify(current);
    return "removed";
  }
  if (Object.keys(current).length >= MAX_SAVED_CAREERS) return "full";
  const next = { ...current, [id]: Date.now() };
  saveAndNotify(next);
  return "saved";
}

function saveAndNotify(value: SavedCareerMap) {
  saveJSON(STORAGE_KEYS.savedCareers, value);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(SAVED_CAREERS_EVENT, { detail: value }));
  }
}
