import type { Article } from "./types";

// Career-readiness guides (July 16, 2026, owner ask: a Careers subtab in
// For Students with "resume templates, interview guides + a few articles").
// The job side of student money: what goes on a first resume, how a first
// interview actually works, and how to read the offer that follows. Shelved
// in the college hub's "Getting hired" section (lib/topicSections.ts) and
// doored from /students/careers.

export const collegeCareerArticles: Article[] = [
  {
    slug: "resume-with-no-experience",
    order: 27,
    topicId: "college",
    title: "A Resume With No Work Experience (Everyone Starts Here)",
    dek: "Nobody is born with a work history. What you already have — classes, projects, helping people — counts, if you write it down right.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Employers hiring for first jobs expect a thin resume; they're reading for reliability and effort, not titles.",
      "School, projects, volunteering, sports, caregiving, and side gigs all translate into real bullet points.",
      "Every bullet follows one formula: action verb, what you did, and a number or result when you have one.",
      "One page, clean layout, zero typos beats clever design every time.",
    ],
    body: [
      {
        type: "p",
        text: "The blank-resume problem feels like a trap: you need experience to get a job, and a job to get experience. Here's the part nobody tells you: the person reading applications for a first job knows you're a student. They are not expecting a career. They're scanning for three things: can you show up, can you learn, and did you care enough to write a clean page.",
      },
      {
        type: "h2",
        text: "What counts as experience (more than you think)",
      },
      {
        type: "list",
        items: [
          "**Class projects.** A group presentation, a research paper, a coding or art project: real work with a deliverable.",
          "**Volunteering** of any kind, even informal — serving food, tutoring cousins, translating at church.",
          "**Caregiving and family responsibility.** Watching siblings on a schedule or interpreting for your parents at appointments is responsibility employers understand.",
          "**Clubs, teams, and band.** Showing up to practice for years is the exact reliability a manager wants.",
          "**Side money.** Babysitting, mowing lawns, reselling, a small online shop — that's customer service and money handling. [Side hustles count](/learn/budgeting/side-hustles-honestly).",
        ],
      },
      {
        type: "h2",
        text: "The sections, top to bottom",
      },
      {
        type: "steps",
        items: [
          "Name and contact: phone, a professional-sounding email, your city (no full street address needed).",
          "One summary line, tailored to the job: “Reliable high school senior with two years of team leadership in robotics club, seeking a part-time retail role.”",
          "Education: school, expected graduation year, GPA if it's 3.5 or higher, plus 2–3 relevant courses or honors.",
          "Experience — projects, volunteering, and responsibilities from the list above, newest first, with bullet points.",
          "Skills: languages you speak, software you actually use, certifications (food handler's card, CPR, lifeguard).",
        ],
      },
      {
        type: "h2",
        text: "The bullet formula",
      },
      {
        type: "p",
        text: "Every line under every entry works the same way: start with an action verb, say what you did, and attach a number or outcome when one exists. “Tutored two middle schoolers in math weekly for a school year; both raised their grade a full letter.” “Managed ticket sales for a 300-person school event.” Numbers make thin experience feel solid because they're evidence, not adjectives.",
      },
      {
        type: "tip",
        text: "Never invent anything. A made-up job or inflated title can unravel in one interview question, and the whole page loses its credibility with it. The honest version, written well, is enough.",
      },
      {
        type: "h2",
        text: "Formatting rules that do the heavy lifting",
      },
      {
        type: "list",
        items: [
          "One page. Always, at this stage.",
          "One plain font, 10.5–12 point, real margins. Skip photos, graphics, and rating bars for your skills.",
          "Save and send as a PDF unless the application says otherwise; file name “Firstname-Lastname-Resume.pdf.”",
          "Have one person proofread it. A single typo on a one-page document reads as carelessness.",
        ],
      },
      {
        type: "key",
        text: "A first resume isn't a record of jobs. It's one clean page of evidence that you show up, finish things, and tell the truth — and you already have more of that evidence than you think. Free fill-in templates live in [the Careers kit](/students/careers).",
      },
    ],
    related: [
      "ace-your-first-interview",
      "first-job-offer-money",
      "work-study-explained",
    ],
    quiz: [
      {
        question:
          "You've never had a formal job. What goes in the experience section?",
        options: [
          "Leave it out entirely until you've been hired somewhere",
          "Projects, volunteering, caregiving, clubs — real responsibilities, written as bullet points",
          "A part-time job title you almost got, since interviews rarely check",
          "A paragraph explaining why you haven't worked yet",
        ],
        answer: 1,
        explain:
          "Employers hiring students read school projects, volunteering, and family responsibility as real evidence of reliability. Inventing anything is the one unforgivable move.",
      },
      {
        question: "Which resume bullet is strongest?",
        options: [
          "“Hard worker with good communication skills”",
          "“Helped with school events”",
          "“Managed ticket sales for a 300-person school event”",
          "“Responsible for various duties”",
        ],
        answer: 2,
        explain:
          "Action verb, specific task, real number. Adjectives claim; numbers prove.",
      },
      {
        question: "When does your GPA belong on the resume?",
        options: [
          "Always — leaving it off looks like hiding",
          "Never — grades don't matter to employers",
          "When it's about 3.5 or higher",
          "Only for jobs at schools",
        ],
        answer: 2,
        explain:
          "A strong GPA is a free credential, so show it. A middling one just takes up a line; nobody expects it there.",
      },
    ],
  },
  {
    slug: "ace-your-first-interview",
    order: 28,
    topicId: "college",
    title: "Your First Interview, Without the Panic",
    dek: "Interviews are a learnable format, not a personality test. Prepare three stories, ask two questions, send one email.",
    level: "Beginner",
    readMinutes: 7,
    takeaways: [
      "Fifteen minutes of research and three prepared stories cover most of any entry-level interview.",
      "The STAR shape (situation, task, action, result) turns school and volunteer stories into professional answers.",
      "“Tell me about yourself” has a formula: present, past, future — in under a minute.",
      "You're allowed to be new. Poise isn't pretending; it's being prepared and honest at the same time.",
    ],
    body: [
      {
        type: "p",
        text: "An interview for a first job is not an interrogation, and it's not a test of whether you were born charming. It's a format, and formats can be learned. The interviewer mostly wants to know three things: will you show up, will you be decent to customers and coworkers, and can you talk about yourself for ten minutes without falling apart. All three are preparable.",
      },
      {
        type: "h2",
        text: "The night before: fifteen minutes of research",
      },
      {
        type: "list",
        items: [
          "Read the company's own site for five minutes: what they sell, what they say they care about.",
          "Reread the job posting and circle the three skills it repeats. Those are the interview topics.",
          "Know the basics of the role out loud: hours, location, what you'd actually be doing.",
        ],
      },
      {
        type: "h2",
        text: "Prepare three stories, STAR-shaped",
      },
      {
        type: "p",
        text: "Most interview questions — “tell me about a time you handled a problem,” “describe working on a team” — are answered with a short story. Use the STAR shape: the Situation, your Task, the Action you took, the Result. You don't need job stories. A group project where a teammate vanished, a fundraiser you kept organized, a younger sibling you got through a rough school year: prepared and told in four sentences, those are professional answers.",
      },
      {
        type: "h3",
        text: "“Tell me about yourself” (the one you should script)",
      },
      {
        type: "p",
        text: "Present, past, future, under a minute: who you are now (“I'm a junior at Lincoln, and I run the logistics side of our robotics team”), one thing you've done that fits the job (“last year I handled our fundraiser inventory, about $2,000 in sales”), and why you're here (“I want a job where I keep learning that kind of responsibility, and this one looked right”). Practice it out loud twice. Not memorized word-for-word; just familiar enough that your first ninety seconds are calm.",
      },
      {
        type: "h2",
        text: "Ask two questions of your own",
      },
      {
        type: "list",
        items: [
          "“What does a good first month look like in this role?”",
          "“What do people who are great at this job do differently?”",
          "“How does scheduling work around exams?” — a fair, practical question that signals you take both commitments seriously.",
        ],
      },
      {
        type: "h2",
        text: "Logistics, money, and the awkward bits",
      },
      {
        type: "list",
        items: [
          "Dress one notch above the job's daily uniform. Clean and plain beats fancy; a borrowed or thrifted button-up is completely invisible to the interviewer.",
          "Arrive ten minutes early, phone silenced and away.",
          "If they ask what pay you expect for an entry role, it's fine to say: “I'd expect the standard rate for this position — could you share the range?” More on reading the offer in [the next guide](/learn/college/first-job-offer-money).",
          "If your voice shakes, keep going. Interviewers of first-job candidates have seen a hundred nervous students; effort reads louder than polish.",
        ],
      },
      {
        type: "h2",
        text: "The same-day email",
      },
      {
        type: "p",
        text: "Three sentences, sent that evening: thank them for the time, name one specific thing from the conversation, restate that you want the job. Almost no first-job candidate sends one, which is exactly why it works.",
      },
      {
        type: "tip",
        text: "A no is data, not a verdict. Reply politely, ask “is there anything I could strengthen for next time?”, and keep the contact. Plenty of first jobs come from the second opening at a place that said no to the first.",
      },
      {
        type: "key",
        text: "Three stories, two questions, one email. That's the whole format — and it's more preparation than most of the people you're up against will do.",
      },
    ],
    related: [
      "resume-with-no-experience",
      "first-job-offer-money",
      "work-study-explained",
    ],
  },
  {
    slug: "first-job-offer-money",
    order: 29,
    topicId: "college",
    title: "Reading Your First Job Offer (Before You Say Yes)",
    dek: "The wage is one line of the offer. Hours, schedule, taxes, and benefits decide what the job actually pays you.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Your real pay is take-home after taxes, not the number in the offer; run it before you celebrate or commit.",
      "Guaranteed hours matter as much as the hourly rate — 20 steady hours can beat 30 theoretical ones.",
      "W-2 employee and 1099 contractor are different deals; “contractor” for a regular scheduled job is a red flag.",
      "Asking a question about pay is normal and safe. The worst common answer is “that's fixed,” not a withdrawn offer.",
    ],
    body: [
      {
        type: "p",
        text: "The offer says $17 an hour and your brain multiplies it by a full-time year. Slow down: almost nothing in that math survives contact with a real schedule and a real paycheck. Reading an offer is a five-minute skill, and it's the difference between a job that funds your plan and one that quietly eats your semester.",
      },
      {
        type: "h2",
        text: "Turn the rate into real money",
      },
      {
        type: "steps",
        items: [
          "Multiply the hourly rate by the hours they'll actually guarantee, not the maximum they mention.",
          "Run that through the [paycheck calculator](/tools/budget/paycheck) to see take-home after taxes; the gap surprises everyone the first time.",
          "Fill out your [W-4 correctly](/learn/taxes/how-to-fill-out-w4) on day one so the withholding is right from the first check.",
          "Then decide what the job is for — see [What to Do With Your First Paycheck](/learn/budgeting/your-first-paycheck).",
        ],
      },
      {
        type: "h2",
        text: "The questions that reveal the real deal",
      },
      {
        type: "list",
        items: [
          "“How many hours a week can I count on?” Guaranteed floor, not ceiling.",
          "“How far ahead is the schedule posted?” A schedule posted two days out makes classes and a second job nearly impossible.",
          "“When does pay arrive, and is any training paid?” Unpaid “training shifts” at a regular employer are a walk-away sign.",
          "“Is this W-2 or 1099?” If a regular, scheduled, supervised job calls you a contractor, they're moving their tax bill onto you — read [gig and 1099 taxes](/learn/taxes/gig-1099-taxes) before saying yes.",
        ],
      },
      {
        type: "h2",
        text: "Benefits are pay wearing a different outfit",
      },
      {
        type: "p",
        text: "Even part-time roles sometimes carry real money in the fine print: employee discounts, tuition assistance (several national chains pay meaningful tuition money for part-timers), free meals, transit passes, or a 401(k) with an employer match. A match is a raise you claim by signing a form. Two offers within a dollar of each other can be far apart once benefits are counted.",
      },
      {
        type: "h2",
        text: "Can you ask for more? Sometimes, and it's cheap to try",
      },
      {
        type: "p",
        text: "Entry-level retail and food-service rates are usually set company-wide, and that's okay to accept. But if you bring something specific — a lifeguard cert, bilingual customer service, two years of the exact register system — one calm sentence is free: “Given my Spanish and two summers of cashier experience, is there room to start closer to the top of the range?” The common worst case is “the rate is fixed.” Offers aren't pulled over a polite question.",
      },
      {
        type: "tip",
        text: "Get the essentials in writing before your first shift: rate, guaranteed hours, and start date, even if it's just a confirmation text or email. Honest employers don't mind; the other kind is who the paper trail is for.",
      },
      {
        type: "key",
        text: "An offer is four numbers, not one: the rate, the guaranteed hours, the take-home after taxes, and the benefits nobody mentions out loud. Read all four and you can't be fooled.",
      },
    ],
    related: [
      "resume-with-no-experience",
      "ace-your-first-interview",
      "gig-1099-taxes",
    ],
  },
];
