// The frame map (July 2026): full student-microsite containment. Every
// surface that renders internal links inside a mirrored page asks ONE
// question — "which frame am I in?" — and routes hrefs through
// frameHref(). Pure and client-safe (no article imports): server pages
// pass frame down as a prop, client components receive it the same way.
//
// Rules of the map:
// - main frame is always identity; unknown/anchor/external hrefs pass through
// - /learn, /glossary, /journey, /courses, /quiz, /plan, /life, /resources
//   map by prefix (mirrors exist for every page under them)
// - /community maps only the feed root and post pages (member pages have
//   no mirror and deliberately exit)
// - /tools maps through TOOL_FRAME_MAP (each calculator's student mirror
//   is a flat slug under /students/tools — keep this map in sync when a
//   calculator is added)
// - everything else (start-here, about, blog, challenges, ask, contact,
//   account, privacy) is a deliberate exit — site-level features with no
//   student variant; the return chip covers the road back
export type Frame = "main" | "student";

export const TOOL_FRAME_MAP: Record<string, string> = {
  "/tools": "/students/tools",
  "/tools/college": "/students/tools/college-cost",
  "/tools/college/compare-offers": "/students/tools/compare-offers",
  "/tools/college/student-loan": "/students/tools/student-loan",
  "/tools/budget": "/students/tools/budget",
  "/tools/budget/paycheck": "/students/tools/paycheck",
  "/tools/budget/rent": "/students/tools/rent",
  "/tools/budget/emergency-fund": "/students/tools/emergency-fund",
  "/tools/budget/reality-check": "/students/tools/reality-check",
  "/tools/budget/jars": "/students/tools/jars",
  "/tools/budget/net-worth": "/students/tools/net-worth",
  "/tools/debt": "/students/tools/debt",
  "/tools/debt/auto-loan": "/students/tools/auto-loan",
  "/tools/debt/mortgage": "/students/tools/mortgage",
  "/tools/savings": "/students/tools/savings",
  "/tools/savings/compound": "/students/tools/compound",
  "/tools/savings/retirement": "/students/tools/retirement",
  "/tools/savings/roth-ira": "/students/tools/roth-ira",
  "/tools/debt/credit-card": "/students/tools/credit-card",
  "/tools/debt/dti": "/students/tools/dti",
  "/tools/savings/investment": "/students/tools/investment",
  "/tools/letters": "/students/tools/letters",
  "/tools/templates": "/students/tools/templates",
};

const PREFIXES = [
  "/learn",
  "/glossary",
  "/journey",
  "/courses",
  "/quiz",
  "/plan",
  "/life",
  "/resources",
];

/** Rewrite an internal href for the given frame. Identity for "main". */
export function frameHref(href: string, frame: Frame = "main"): string {
  if (frame === "main") return href;
  if (!href.startsWith("/")) return href; // anchors, external, mailto
  if (href.startsWith("/students")) return href;

  const hashAt = href.indexOf("#");
  const path = hashAt === -1 ? href : href.slice(0, hashAt);
  const hash = hashAt === -1 ? "" : href.slice(hashAt);

  for (const p of PREFIXES) {
    if (path === p || path.startsWith(`${p}/`)) {
      return `/students${path}${hash}`;
    }
  }
  if (path === "/community" || path.startsWith("/community/post/")) {
    return `/students${path}${hash}`;
  }
  const tool = TOOL_FRAME_MAP[path];
  if (tool) return `${tool}${hash}`;

  return href; // deliberate exit
}
