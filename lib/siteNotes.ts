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
    date: "July 19, 2026",
    title: "A source audit of all 1,672 scholarships — now 1,666, every link checked",
    body: "We promised every scholarship here links straight to its official source, so we audited all 1,672 links in one pass to hold ourselves to it. The result: not one entry sourced from the scholarship directories and aggregator sites we warn about — with a single exception we cut, an award that exists only inside one of those platforms, behind its account wall. We also cut a program whose website now redirects to a spam page (the charity is real, but there's no official page left to send you to), one that quietly ended in 2021, and — applying our own no-regional rule — a well-known program that narrowed from national to three states. Two entries turned out to be the same scholarship wearing two names; they're one now. And about a dozen professional-association links had rotted into member-login pages or moved, so we chased down each program's current public page and re-pointed them. The count on the page comes straight from the list, so it now reads 1,666 — smaller and truer.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 18, 2026",
    title: "The scholarship finder now remembers your list",
    body: "A finder with 1,672 scholarships is only useful if you can keep your place in it. So now every scholarship has two buttons: Save it to a shortlist of ones you want to apply for, and Mark applied once you've sent it in. A 'Your list' bar appears at the top to flip between everything, the ones you still need to apply for, and the ones you've finished — so a giant list becomes a personal to-do you can actually work through. It all saves right on your device, no account required; sign in and it follows you to your phone and back. Nothing is shared, and we never see it.",
    href: "/students/scholarships",
    hrefLabel: "Start your list",
  },
  {
    date: "July 18, 2026",
    title: "1,672 scholarships — the last stone turned over",
    body: "One final sweep to be sure we hadn't missed a category. We went vein by vein through the corners that don't show up in a normal search: the full national catalog of the biggest scholarship administrator, commodity-farm foundations (dairy, soybean, cattle, viticulture), heritage funds for smaller diaspora communities (Iranian, Croatian, Cambodian, Thai, Dominican), disease foundations beyond the common ones (immune deficiency, ALS, burn survivors, scleroderma), the professional trades we were light on (packaging, printing, textiles, environmental health, safety), and civic art and essay contests. 52 more that clear the bar. What we cut says as much as what we kept: a 'scholarship' run by a personal-injury law firm as marketing, fraternal awards you can only get by buying a life-insurance policy, a foundation that quietly stopped funding students, a nationwide-sounding award that was really one city, and a contest open to the whole world rather than a national program. The systematic search is now genuinely finished — what's left is keeping every one of these current, year after year.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 18, 2026",
    title: "224 opportunities — the debt-free trades path, filled in",
    body: "The finder was strong on research labs, federal internships, and college pipelines, but thin on the path that skips the tuition bill entirely: registered apprenticeships. So we added the door to it. Apprenticeship.gov, the U.S. Labor Department's finder, lets you search thousands of paid apprenticeships by ZIP code, and alongside it we listed big national trades by name — electricians (IBEW), plumbers and pipefitters (UA), and the shipbuilding apprentice school at Newport News — because 'apprenticeship' stays abstract until you see that an electrician earns a wage from day one and finishes with zero debt. We also added two paid teaching years (Breakthrough Collaborative, Teach For America) and two free, no-degree tech programs (Per Scholas, and Brooklyn's Marcy Lab School). What we left out is the point: we cut Pursuit, because its 'no upfront cost' turns into a slice of your salary once you're hired — a real bill, and this list is for paths with no strings. We cut a startup grant that had quietly closed, and a fellowship we couldn't confirm was free to apply.",
    href: "/students/opportunities",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 18, 2026",
    title: "The Career Explorer now covers 418 jobs — a real map of American work",
    body: "We built this out in waves, then checked our own work until there was nothing honest left to add. First the jobs people start in and climb from (nursing assistant, cashier, retail, food service, warehouse, security guard, construction trades) and the rungs above them. Then breadth across healthcare, the helping professions, media, the sciences, and the professions. Then the world of work that keeps everything running — the factory floor, the oil field and mine, the rails and the water, the back office. Then the careers people dream about but that employ few people: surgeon, nurse anesthetist, the AI and animation jobs, wildlife biologist, film editor, even professional athlete. Then a line-by-line pass through the whole federal occupation list for the distinct careers hiding among near-duplicates — computer programmer (different from a software developer), real estate broker (the step above an agent), radiologist, cardiologist, fashion designer, arborist, locksmith, TSA officer, sports referee. And a final classification of every remaining code to be sure — which turned up the last ones worth naming: ophthalmologist, tax examiner, tour guide, tailor, marine mechanic, art conservator, stonemason, cell tower technician, and hearing aid specialist. We also added a stat we'd been missing — openings a year, counting new jobs plus the ones freed up when people retire. And we stay honest at both ends: we mark the shrinking jobs as shrinking, we show the very highest earners as \"$239,200 or more\" rather than a false-precise number, and we leave out the careers we can't give an honest wage for — actors, musicians, professional gamers, the military — instead of inventing one. What's left in the government's list now is genuine repetition — a professor code for every subject, a dozen kinds of machine operator — not careers anyone searches for. Everything here comes from real Bureau of Labor Statistics data.",
    href: "/students/career-explorer",
    hrefLabel: "Explore careers",
  },
  {
    date: "July 18, 2026",
    title: "1,620 scholarships — we read all fifty states, one at a time",
    body: "We thought the list was close to complete. To be sure, we did the thing we'd been putting off: opened every state's higher-education agency, one by one, and read its full program list — not searching for scholarships, but enumerating what each state actually runs. It turned out we were missing a lot. States quietly administer programs that no national search ever surfaces: tuition waivers for the children of police officers and firefighters killed in the line of duty in nearly every state, Florida's Rosewood and Ocoee scholarships for descendants of two 1920s racial-violence tragedies, Illinois's grant for people wrongfully imprisoned and their kids, New York's memorial scholarships tied to Flight 3407 and the World Trade Center, Mississippi's foster-youth scholarship, grants for students with intellectual disabilities in a dozen states, and forgivable loans that pay for nursing and teaching students who agree to work in the state. 221 new ones, every link checked — and then, after a second look, 26 more: adult-learner completion grants for people coming back to finish a degree, and dual-enrollment funding that pays for high-schoolers taking college courses early. This finder is for students, and students include adults returning to school and teenagers getting a head start.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 18, 2026",
    title: "1,373 scholarships — and a map of what isn't out there",
    body: "This one was different: instead of hunting for more, we audited what we already have. We laid every kind of student against every field of study and checked each square — is there money for a Black student in public service, a Native student in wildlife biology, an Asian student heading into business? Where a real award existed and we'd missed it, we added it: 23 new ones, filling squares that had been empty — Black students in environmental science and social work, Asian and Native students in business and the arts, women in the trades, LGBTQ+ students in STEM. But the more useful result is the honest map of the blanks. Some squares are empty because the money is real but only for graduate students — most 'minority in law' and 'minority in medicine' scholarships are for people already in law or med school, not undergrads, so we say that plainly instead of pretending. Others are empty because the support exists in a form that isn't a scholarship at all — veterans heading into the trades get apprenticeship placement and wages, not a check to sign, so those live in our opportunities finder instead. A list that can tell you where the money isn't, and why, is worth more than one that pads the number.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 18, 2026",
    title: "1,350 scholarships — the corners the big lists skip",
    body: "84 more, from a sweep of the narrow places: scholarships for students with a specific condition (bleeding disorders, myasthenia gravis, epilepsy, ichthyosis), national programs from faith bodies most lists never mention (Assemblies of God, Armenian, Coptic, Zoroastrian, Jain), sport and activity awards beyond the obvious (drum corps, marching band, shooting sports, statewide caddie and 4-H funds), more tuition waivers for the children of fallen and disabled veterans and first responders across a dozen states, and field-specific money in urban planning, court reporting, mortuary science, and cosmetology. Six research passes turned up 100 candidates; 84 made it. We cut the metro-only caddie funds (this stays a national-and-statewide list), a single-chapter wildlife award, a scouting scholarship gated behind three memberships at once, a lupus program whose website has gone dark, and a painting-trade scholarship reachable only through a broken security certificate. When a link won't open in a normal browser, it doesn't go on the list.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 18, 2026",
    title: "The Career Explorer goes deeper — a full profile for every job",
    body: "Every one of the 100 careers now has its own page, not just a card. Each profile lays out what the job actually is, where you'd work and the real hours, the skills it takes, whether a license is involved, and which careers are worth comparing it against. The biggest addition is the pay: alongside the median we now show the real earning range — what the lowest tenth and the highest tenth take home — because 'the median is $63,000' hides that the same job can pay $43,000 starting out or six figures with years and the right city. Those ranges come straight from the Bureau of Labor Statistics wage survey, matched to each job by its federal occupation code; we're filling them in as fast as the government's data service lets us pull them, and a job still waiting on its range shows a dash rather than a guess. On the list itself, the range now sits right on the card, and a 'Quick look' opens the summary without leaving the page.",
    href: "/students/career-explorer",
    hrefLabel: "Explore careers",
  },
  {
    date: "July 18, 2026",
    title: "1,266 scholarships — the famous ones, checked",
    body: "We went back through the big open-to-anyone awards — the ones every list mentions — to see what we were still missing. Six real additions: the Boren Scholarship (up to $25,000 to study a critical language abroad, with a federal-service commitment we spell out), the Dr Pepper Tuition Giveaway (a panel-judged video contest, not the random drawing its name suggests), Doodle for Google, and the three Ayn Rand Institute essay contests (Anthem, The Fountainhead, Atlas Shrugged — no entry fee, no citizenship requirement). What we deliberately left out matters more: we don't list the 'no-essay, enter-to-win' scholarships that flood search results, because they exist to harvest and sell your data — Unigo, ScholarshipPoints, Chegg, and their kind never make this list. We also cut real programs that don't fit — a scholarship you can't apply to yourself (your teacher or counselor has to enter you), and one we found had quietly shut down and been replaced by a program already on our list.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 18, 2026",
    title: "1,260 scholarships — a checked door into local money, in almost every state",
    body: "We said local scholarships are better found through your community foundation — so we went and found yours. 39 new entries, one per state: the biggest scholarship-granting community foundation portal we could verify in each, where a single free application matches you against dozens to hundreds of local funds (North Carolina's covers all 100 counties with 1,200+ funds; New Hampshire's gives out $8 million a year). Where a foundation is regional rather than statewide, the entry says so plainly. Three honest gaps: Vermont, Utah, and DC, where we couldn't verify a real one-application portal — we'd rather leave a hole than list a door that doesn't open. The 'More places to search' shelf also grew from four doors to six: MALDEF's free annual guide of scholarships that don't ask about immigration status, and Dollars for Scholars' finder for its 400+ volunteer-run local chapters.",
    href: "/students/scholarships",
    hrefLabel: "Find your state's door",
  },
  {
    date: "July 18, 2026",
    title: "1,221 scholarships — the trades, the professions, and the money nobody lists",
    body: "73 more hand-verified awards, and this wave went where the glossy lists don't: welding, HVAC, diesel, commercial diving, and automotive-restoration scholarships; thirteen state CPA societies and the actuarial diversity pipeline; aviation awards from business-aviation charities to the National Gay Pilots Association; geoscience and meteorology money; and the state workforce grants (Iowa's vocational-tech grant, Arkansas's Workforce Challenge, Georgia's HOPE Career Grant) that reward choosing a trade. The honest part: our researchers surfaced 115 candidates and we shipped 73. We cut every award that only serves graduate students, every 'scholarship' that requires a paid membership to apply, loan-repayment programs that serve working professionals rather than students, contests dressed as scholarships, and three programs whose official pages quietly died — including one foundation that pivoted away from student scholarships entirely without saying so. A shorter list you can trust beats a longer one you can't.",
    href: "/students/scholarships",
    hrefLabel: "Browse the finder",
  },
  {
    date: "July 18, 2026",
    title: "1,148 scholarships — every state's National Guard benefit, mapped",
    body: "151 more hand-verified entries, and a milestone inside the milestone: the finder now covers state National Guard tuition benefits in 40 states — we checked all 50 and labeled each one honestly, because they are not all the same thing. Some are true waivers, some reimburse you after grades come in, Vermont's is legally a forgivable loan, and New Hampshire's is space-available — the entry says which, so nobody budgets around money that arrives later than they think. (New Mexico, we confirmed, has no Guard-specific program.) Also new: future-teacher scholarships in 16 more states with every teach-here-after obligation stated plainly, a dozen honor-society awards (we cut the ones where a membership fee is the real price of entry), foster-youth tuition waivers and Native student programs in more states, awards for students with albinism, narcolepsy, hydrocephalus, and cleft conditions, and scholarships from veteran-family funds, utilities, and employers. We also confirmed the James Beard Foundation's famous culinary scholarships have quietly gone dark — off the list until they come back. And the list got stricter two ways: every award is now worth at least $500 (we retired one older listing whose grants topped out at $175), and two metro-only listings came off — this is a national-and-statewide list, and local money is better found through your school counselor and community foundation.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 18, 2026",
    title: "1,000 scholarships. Every one checked by hand.",
    body: "The finder crossed one thousand hand-verified awards today. Every entry was checked against its official site — no aggregator listings, no fees, no sweepstakes dressed up as scholarships, and 73 awards explicitly open to undocumented students. The last stretch added maritime and rail money, arts awards from the Emmys organization to the CFDA, the last of the Divine Nine foundations, National Guard tuition programs and foster-youth waivers across fourteen more states, flight-training funds, and awards for students almost no list serves: children of incarcerated parents, young caregivers, students in recovery, migrant farmworker families. Along the way we also confirmed which famous programs are quietly dead — Generation Google, the Heisman high school award, Hilton Cares — so nobody wastes an essay on them. One thousand real doors, and we keep checking every one, every year.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
  {
    date: "July 18, 2026",
    title: "863 scholarships: veterans, union families, and more",
    body: "69 more hand-verified entries. Deaf, hard-of-hearing, blind, and low-vision students got nine new awards — including the American Foundation for the Blind's relaunched program, renewable up to $28,000. Veterans going to school themselves (not just their kids) got eight, from VFW's Help A Hero to Student Veterans of America. Union households got eleven, from AFSCME and the teachers' union to postal workers and mine workers. Native students got the Alaska Native corporation foundations and both major Native Hawaiian funds. Plus eleven European heritage societies, thirteen more state programs (California's Middle Class Scholarship can cover full cost of attendance and takes Dream Act applicants), and the New England-wide Stephen Phillips fund.",
    href: "/students/scholarships",
    hrefLabel: "Open the finder",
  },
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
