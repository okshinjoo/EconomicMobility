"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { STORAGE_KEYS, loadJSON, saveJSON } from "@/lib/storage";

/** pathname -> epoch ms of first visit. */
type VisitedMap = Record<string, number>;

/**
 * Invisible global tracker (mounted once in the layout): remembers which
 * tool pages this device has opened, so article-page "Try it yourself"
 * suggestions can stop pitching calculators the visitor already found.
 * Same keep-the-first-timestamp convention as read tracking.
 */
export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname?.startsWith("/tools/")) return;
    const map = loadJSON<VisitedMap>(STORAGE_KEYS.visitedTools) ?? {};
    if (map[pathname]) return;
    map[pathname] = Date.now();
    saveJSON(STORAGE_KEYS.visitedTools, map);
  }, [pathname]);

  return null;
}
