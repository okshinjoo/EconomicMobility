// The search index as one static, CDN-cached JSON (July 17, 2026 perf
// round 2). Previously getSearchItems() was serialized into EVERY page's
// payload TWICE (Header's SearchDialog + the ChatLauncher) — the single
// biggest slice of per-page HTML. Now the index ships to a visitor at most
// once, and only when they first open search or chat.
// force-static: built at deploy, so it updates with every content ship.

import { NextResponse } from "next/server";
import { getSearchItems } from "@/lib/search";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(getSearchItems(), {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
