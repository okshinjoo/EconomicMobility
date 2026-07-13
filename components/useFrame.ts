"use client";

// Client-side frame detection (July 2026 full-containment pass): shared
// calculator components are mounted by BOTH the main site and the
// /students mirrors with no props, so they derive their frame from the
// pathname instead. Use with frameHref for any internal link a client
// component builds itself; server components take a frame PROP instead.

import { usePathname } from "next/navigation";
import type { Frame } from "@/lib/frame";

export function useFrame(): Frame {
  const pathname = usePathname();
  return pathname?.startsWith("/students") ? "student" : "main";
}
