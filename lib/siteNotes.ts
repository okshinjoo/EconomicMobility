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
    date: "July 18, 2026",
    title: "794 scholarships, found by asking who gets left out",
    body: "82 more hand-verified entries, built around students scholarship lists usually forget: foster youth and students who've experienced homelessness (including the federal Chafee voucher), students affected by a parent's incarceration and formerly incarcerated students themselves, families who lost a parent (from the 143-year-old railroad fund to workers' comp families), children of migrant farmworkers, students in recovery or living with mental-health conditions, young caregivers and single dads, plus honor-society transfer money like Phi Theta Kappa's awards — which explicitly welcome undocumented students — and fifteen more state programs, including Virginia's first two on our list. 65 awards on the list now explicitly require no citizenship.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 18, 2026",
    title: "712 scholarships — and honest employer tuition benefits",
    body: "69 more hand-verified entries. New ground: allied-health careers (dental hygiene, radiologic tech, EMS, even mortuary science — the one that's explicitly DACA-open), awards for students living with cancer, rare diseases, arthritis, and other conditions, business and professional societies from fashion to court reporting, families of fallen police officers and firefighters, and national competitions with real scholarship money. We also added the big employer education benefits — Starbucks, Walmart, Target, Amazon, Chipotle — labeled exactly what they are: tuition covered while you work there, not scholarship checks. And fourteen state programs fill in the states our map was thinnest on, from Utah to West Virginia.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 18, 2026",
    title: "643 scholarships, for the students lists forget",
    body: "119 more hand-verified awards, aimed at students most scholarship lists skip: adult learners and single parents going back to school, students with disabilities, LGBTQ+ students, refugees and asylum seekers, rural and farm-family students, skilled-trades students, and dozens of heritage and faith communities from Armenian to Portuguese. Also new: civic clubs like DAR and Optimist, health-field service programs like the federal Nurse Corps, and journalism awards from the associations for Black, Hispanic, Asian American, and Indigenous journalists. Every entry checked against its official site, same as the first 524.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 18, 2026",
    title: "Past 500: the scholarship list hits 524",
    body: "88 more hand-verified awards: university flagship scholarships that meet full need, community foundation awards from Chicago to rural Appalachia, programs for military families and children of first responders, awards for students in US territories and students who've been in foster care, more majors (from welding to library science), employer and union programs, and sports-connected scholarships beyond the varsity track. We also re-checked four programs that had gone quiet — two came back confirmed alive, and two turned out to be genuinely discontinued, so they stay off the list.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 18, 2026",
    title: "436 scholarships, and new kinds of them",
    body: "122 more hand-verified awards, reaching places scholarship lists usually don't: ROTC and federal service programs that pay full tuition (with the service commitment stated plainly), city promise programs from Kalamazoo to Seattle, future-teacher pipelines, arts and writing awards like Scholastic and YoungArts, heritage and faith organizations across dozens of communities, and awards for students living with diabetes, epilepsy, sickle cell, and other conditions. Every entry checked against its official site before listing.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 17, 2026",
    title: "The scholarship list grew to 315",
    body: "129 new hand-verified awards joined the finder in one push: state grant and free-college programs for more than forty states (Tennessee Promise, Cal Grant, New Mexico's free tuition, DCTAG, and many more), the state aid applications that serve undocumented students, plus new trades, healthcare, identity-based, union, and employer scholarships. Every one was checked against its official site before listing, same as always — and 48 awards on the list now explicitly require no citizenship.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 17, 2026",
    title: "A day of sanding: student pages, sharper",
    body: "A long polish pass across For Students. The Guides and Your Path tabs got real landing pages; the scholarship finder now shows every award's next deadline, greys out the ones between application cycles (with the month they come back), and sorts by deadline, amount, or name; the Student Tracker autofills scholarships from our own list and got proper dropdowns; Compare Colleges got compact cards you click into for the full profile; and the whole section picked up the color it was missing.",
    href: "/students",
    hrefLabel: "See For Students",
  },
  {
    date: "July 17, 2026",
    title: "A practice interview that talks back",
    body: "The Careers kit now has an AI mock interviewer: pick the kind of job and how tough you want the interviewer (easy, medium, or hard), answer five real interview questions in chat, and get honest coaching feedback at the end. Nothing you say is saved anywhere, so a disastrous practice run costs exactly nothing. The privacy policy's AI section covers it.",
    href: "/students/careers/mock-interview",
    hrefLabel: "Practice one now",
  },
  {
    date: "July 17, 2026",
    title: "The Careers kit grows up",
    body: "Three new guides for the job hunt itself: how to get a first job when no one has hired you yet, what a cover letter even is (and when you can skip it), and the five questions every interview asks. Plus a new practice tool — fourteen real interview questions as flip cards, so you can answer out loud and check your answer against the shape of a strong one.",
    href: "/students/careers",
    hrefLabel: "Open the Careers kit",
  },
  {
    date: "July 17, 2026",
    title: "Delete your account yourself",
    body: "Account deletion no longer requires emailing us: the account page's Security tab now has a delete button that immediately and permanently removes everything on our servers — sign-in, synced progress, profile, photo, likes, comments, reminder signup. Progress saved on your device stays yours and keeps working logged out. The email route still exists if you'd rather a human handle it.",
    href: "/privacy",
    hrefLabel: "The privacy policy has the details",
  },
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
