// Site notes (July 17, 2026, de-AI pass: "anything else to make the site
// feel less AI?"). Nothing says "a person runs this" like dated, first-person
// ship notes — so this is the real changelog, hand-curated from what actually
// shipped. HOUSE RULES: entries are REAL features with their REAL ship dates
// (the honesty rule applies — no backdating, no padding, no invented
// milestones); voice is the site's own (plain, warm, no exclamation marks);
// newest first. Append an entry whenever an owner-visible feature ships.

export interface SiteNote {
  /** Real ship date, e.g. "July 17, 2026". Loose "July 2026" is fine for
   *  work that landed across several days. */
  date: string;
  title: string;
  body: string;
  /** Where to see it, if there's one obvious place. */
  href?: string;
  hrefLabel?: string;
}

export const siteNotes: SiteNote[] = [
  {
    date: "July 17, 2026",
    title: "The skill tree comes to For Students",
    body: "The climbable map of every guide, tool, and course now lives inside the student site too — same tree, same progress, and every branch opens the student versions of things. Find it under Your Path in the student menu.",
    href: "/students/skills",
    hrefLabel: "Climb it in For Students",
  },
  {
    date: "July 17, 2026",
    title: "Three new guides on how the machine works",
    body: "A trio about the financial machinery nobody explains to you: how private-equity buyouts gut the businesses they buy (and who pays), why rent keeps climbing (the shortage, the corporate landlords, the pricing software), and junk fees — why the advertised price is never the price. Each one ends with what you can actually do about it, and each has a quick knowledge check.",
    href: "/learn/investing/private-equity-explained",
    hrefLabel: "Start with private equity",
  },
  {
    date: "July 17, 2026",
    title: "The pages learned to dive",
    body: "A motion pass across the whole site: page headers now sink gently away as you scroll into the content, the mobile menu button morphs instead of swapping, and every animation names exactly what it moves. Subtle on purpose. If you notice it, it's working; if you don't, it's working better.",
  },
  {
    date: "July 16, 2026",
    title: "The skill tree",
    body: "A map of everything learnable here — every guide, calculator, course, and quick win, drawn as one climbable tree. Think you already know a topic? Take the test-out quiz and skip ahead; pass it and the mastery counts. Progress earns skill points that live on your profile.",
    href: "/skills",
    hrefLabel: "Climb it",
  },
  {
    date: "July 16, 2026",
    title: "The Careers kit",
    body: "Resume and cover letter templates you can download and fill in (no signup, no email), plus new guides on writing a resume with no work experience, surviving a first interview, and reading a job offer before you say yes.",
    href: "/students/careers",
    hrefLabel: "Get the kit",
  },
  {
    date: "July 16, 2026",
    title: "Compare Colleges and the Career Explorer are real now",
    body: "Both graduated from preview to live. One hundred colleges with hand-encoded admissions and aid policies (need-blind or not, meets full need or not, what they actually weigh), and one hundred careers on public federal data — with “earn while you train” as a first-class filter.",
    href: "/students/compare-colleges",
    hrefLabel: "Compare colleges",
  },
  {
    date: "July 14, 2026",
    title: "The site learns you, carefully",
    body: "Saved goals and check-ins now shape what gets recommended across the homepage, the finders, and your plan. With one hard rule underneath: the site never asserts something about you that you didn't tell it.",
  },
  {
    date: "July 13, 2026",
    title: "For Students became a whole microsite",
    body: "Everything a student needs without leaving the student frame: guides, tools, deadlines, community. The Opportunity Finder launched with 68 verified paid internships and programs, and the scholarship list grew to 186 hand-checked awards.",
    href: "/students",
    hrefLabel: "Enter For Students",
  },
  {
    date: "July 2026",
    title: "My Plan",
    body: "Tell the guide your goal and it builds a plan from this site's real guides, tools, and deadline dates — nothing invented, everything checkable. It interviews you if you'd rather talk than fill out a form, and it reworks any step you flag as not fitting.",
    href: "/plan",
    hrefLabel: "Build yours",
  },
  {
    date: "July 2026",
    title: "The community went live",
    body: "Real member comments with a review step before anything appears publicly, likes that are actual tallies (never invented numbers), member pages, and Community Cred earned from published contributions only.",
    href: "/community",
    hrefLabel: "Say hello",
  },
];
