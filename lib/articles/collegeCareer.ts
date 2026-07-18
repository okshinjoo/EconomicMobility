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
  // July 17, 2026 expansion (owner: "more advice/tools for jobs, first
  // jobs, interview prep, what a cover letter even is").
  {
    slug: "get-your-first-job",
    order: 27,
    topicId: "college",
    title: "Getting Your First Job (When No One Has Hired You Yet)",
    dek: "Most first jobs don't come from sending applications into the void. They come from asking, showing up, and knowing where teenagers actually get hired.",
    level: "Beginner",
    readMinutes: 7,
    takeaways: [
      "First jobs mostly come through people and places, not job boards: someone you know, a manager you asked in person, a school program.",
      "A few applications done carefully beat thirty done fast. Honest availability and a professional email address matter more than experience.",
      "If you're under 18, your state may require a work permit, and federal law limits hours for 14- and 15-year-olds.",
      "You can have references without ever having had a job: teachers, coaches, and volunteer supervisors count.",
    ],
    body: [
      {
        type: "p",
        text: "Job hunting advice is usually written for adults with work histories. A first job search works differently, and honestly, more simply: the places that hire teenagers and students hire a lot of them, expect thin resumes, and mostly want to know that you'll show up when scheduled and be decent to customers.",
      },
      {
        type: "h2",
        text: "Where first jobs actually come from",
      },
      {
        type: "list",
        items: [
          "**People you know.** Most first jobs arrive through a friend who works somewhere, a neighbor who needs help, a cousin's manager. Tell people you're looking; that one sentence does more than ten applications.",
          "**Walking in and asking.** Restaurants, grocery stores, and shops still hire people who come in, ask for the manager, and hand over a resume. Go at a slow hour, dressed neatly, and ask when they usually hire.",
          "**Your school.** Counselors hear about jobs constantly, and if you're college-bound, [work-study](/learn/college/work-study-explained) is a job built into your aid package. The [Opportunity Finder](/students/opportunities) lists paid programs and internships we've verified.",
          "**Hiring seasons.** Stores staff up in October and November for the holidays; pools, camps, and parks hire in spring for summer. Applying a month before the season starts puts you ahead of the rush.",
        ],
      },
      {
        type: "h2",
        text: "The paperwork side, before you apply",
      },
      {
        type: "steps",
        items: [
          "If you're under 18, check whether your state requires a work permit (often called working papers). Many do, and your school's front office usually issues them.",
          "Set up a professional email address: some version of your name, nothing else. You'll use it for every application and it's free.",
          "Know your real availability, including practices, family duties, and rides. Writing honest hours on the application prevents the schedule fights that get first jobs quit or lost.",
          "Have your documents ready for when you're hired: Social Security card or birth certificate, and a parent's help for anything that needs a signature.",
        ],
      },
      {
        type: "p",
        text: "Federal law also caps hours for 14- and 15-year-olds: during a school week, no more than 3 hours on a school day and 18 hours total; when school is out, up to 8 hours a day and 40 a week, and work must end by 7 p.m. during the school year (9 p.m. in summer). At 16 the federal hour caps drop away, though some states keep their own.",
      },
      {
        type: "h2",
        text: "Applying: a few, done well",
      },
      {
        type: "p",
        text: "Pick a handful of places you could actually get to on time, and give each application real attention: every field filled, availability honest, and the [one-page resume](/learn/college/resume-with-no-experience) attached even when it's optional. About a week after applying, follow up once, in person or by phone: your name, the job, and that you're still interested. Managers hire the applicant they remember.",
      },
      {
        type: "h2",
        text: "References when you've never worked",
      },
      {
        type: "p",
        text: "A reference is just an adult, not related to you, who can honestly say you're reliable. Teachers, coaches, club advisors, and volunteer supervisors all count. Ask each one before you list them, tell them what job you're applying for, and thank them after. Two or three is plenty.",
      },
      {
        type: "tip",
        text: "A real employer never charges you to apply, asks you to buy equipment up front, or pays you before you've worked. Those are the classic signs of a job scam; the full playbook is in [how to spot a scam](/learn/money-safety/how-to-spot-a-scam).",
      },
      {
        type: "key",
        text: "Getting a first job is mostly a numbers-and-neighbors game: tell everyone you're looking, apply carefully to a few reachable places, follow up once, and have your papers ready. When the offer comes, read it with [your eyes open](/learn/college/first-job-offer-money), and expect [your first paycheck](/learn/budgeting/your-first-paycheck) to be smaller than the math in your head.",
      },
    ],
    related: [
      "resume-with-no-experience",
      "what-is-a-cover-letter",
      "first-job-offer-money",
    ],
    quiz: [
      {
        question: "Where do most first jobs actually come from?",
        options: [
          "Mass-applying to fifty online listings",
          "People you know, asking managers in person, and school programs",
          "Paid job-placement services",
          "Waiting until a business contacts you",
        ],
        answer: 1,
        explain:
          "Referrals, walk-ins, and school connections fill most first jobs. Online boards work better once you have a work history.",
      },
      {
        question:
          "You're 15 and it's a school week. How many hours can you legally work under federal law?",
        options: [
          "As many as the employer schedules",
          "No more than 3 hours on a school day, 18 hours in the week",
          "40 hours, the same as an adult",
          "Federal law bans working at 15",
        ],
        answer: 1,
        explain:
          "Federal rules for 14- and 15-year-olds cap school weeks at 3 hours on school days and 18 total, with work ending by 7 p.m. during the school year.",
      },
      {
        question: "Who can be a reference if you've never had a job?",
        options: [
          "Only former bosses count",
          "Your mom, since she knows you best",
          "A teacher, coach, or volunteer supervisor who agreed in advance",
          "Nobody — leave references blank",
        ],
        answer: 2,
        explain:
          "References just need to be non-family adults who can vouch for your reliability. Always ask them first.",
      },
    ],
  },
  {
    slug: "what-is-a-cover-letter",
    order: 28,
    topicId: "college",
    title: "What a Cover Letter Even Is (and When You Need One)",
    dek: "It's one page, three paragraphs, and skippable more often than teachers admit. When it does matter, this is the whole formula.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "A cover letter is a short letter answering two questions: why this job, and why you.",
      "Most first jobs in retail and food service never read one. Internships, offices, and scholarship-style programs usually do.",
      "The whole thing is three paragraphs: who you are and what you're applying for, why this place specifically, and one piece of evidence you'd be good at it.",
      "Generic letters hurt more than no letter. One true, specific sentence about the employer beats a page of polish.",
    ],
    body: [
      {
        type: "p",
        text: "A cover letter is a one-page letter you send with a resume, written to a specific employer about a specific job. The resume lists what you've done; the letter says why it should matter to them. That's the entire concept. Nobody is grading your vocabulary.",
      },
      {
        type: "h2",
        text: "When you actually need one",
      },
      {
        type: "list",
        items: [
          "**Usually skip it:** cashier, food service, retail, and most first jobs with an online application form. If the form doesn't ask, the manager isn't reading letters.",
          "**Usually send it:** internships, office and research positions, camp counselor and youth-program roles, and anything where a human being reads applications one by one.",
          "**Always send it** when the posting says to, and follow any instruction inside it exactly. Some postings hide a small request (a word to include, a question to answer) as a test of attention.",
        ],
      },
      {
        type: "h2",
        text: "The three-paragraph formula",
      },
      {
        type: "steps",
        items: [
          "Paragraph one: who you are and what you're applying for, in two sentences. “I'm a junior at Lincoln High applying for the summer camp counselor role posted on your site.”",
          "Paragraph two: why THIS place. One true, specific detail — you've used their programs, you admire something real about what they do, a person recommended them. This is the paragraph generic letters fail.",
          "Paragraph three: one story that proves you'd be good at the actual work, using the same evidence style as a [resume bullet](/learn/college/resume-with-no-experience). Tutoring your cousins is evidence for a camp job; running a bake-sale table is evidence for retail.",
        ],
      },
      {
        type: "p",
        text: "Close with one line: you'd welcome an interview, and your phone number sits at the top with your name. Address it to a person if the posting names one, and “Dear Hiring Manager” when it doesn't. Nobody has been impressed by “To Whom It May Concern” in decades.",
      },
      {
        type: "h2",
        text: "Rules that keep it working",
      },
      {
        type: "list",
        items: [
          "One page maximum, and short of that is fine. Three tight paragraphs read better than five padded ones.",
          "Don't repeat your resume in sentence form. The letter adds the why; the resume already has the what.",
          "Reuse your skeleton between applications, but paragraph two must be rewritten every time. That's the paragraph that gets letters read.",
          "Same proofreading bar as the resume: one typo in one page reads as carelessness.",
        ],
      },
      {
        type: "key",
        text: "A cover letter is three paragraphs of why: why this job, why this place, why you. Write one true specific sentence about the employer and one piece of real evidence about yourself, and you've beaten most of the letters in the pile. A fill-in template is waiting in [the Careers kit](/students/careers).",
      },
    ],
    related: [
      "resume-with-no-experience",
      "get-your-first-job",
      "interview-questions-answers",
    ],
    quiz: [
      {
        question: "What is a cover letter for?",
        options: [
          "Restating your resume in paragraph form",
          "Explaining why this job and why you, to one specific employer",
          "Proving you can write formally",
          "Listing references",
        ],
        answer: 1,
        explain:
          "The resume carries the what; the letter carries the why. It's written to one employer about one job.",
      },
      {
        question: "Which application most likely needs a cover letter?",
        options: [
          "A grocery store's online cashier form",
          "A summer research internship reviewed by a program director",
          "A fast-food walk-in application",
          "None — cover letters are obsolete",
        ],
        answer: 1,
        explain:
          "Letters matter where a person reads applications individually: internships, offices, programs. High-volume first jobs rarely read them.",
      },
      {
        question: "What makes paragraph two (why this place) work?",
        options: [
          "Complimenting the company in general terms",
          "One true, specific detail about this employer",
          "Mentioning you need the money",
          "Keeping it identical across applications to save time",
        ],
        answer: 1,
        explain:
          "Specificity is the whole test. A sentence you could send to any employer tells this one you didn't mean it.",
      },
    ],
  },
  {
    slug: "interview-questions-answers",
    order: 29,
    topicId: "college",
    title: "The Five Questions Every Interview Asks (Build Your Answers Now)",
    dek: "Interviews feel unpredictable, but the questions barely change. Build five answers once and you've prepared for nearly every first-job interview at the same time.",
    level: "Beginner",
    readMinutes: 7,
    takeaways: [
      "Almost every first-job interview is built from the same five questions, so answers can be prepared in advance.",
      "“Tell me about yourself” wants one organized minute, not your life story: what you're doing now, one thing you're proud of, why you're here.",
      "Story questions follow a shape: the situation, what you did, how it turned out. School and volunteer stories count fully.",
      "Practicing out loud three times beats reading answers silently ten times. Memorize the shape, never a script.",
    ],
    body: [
      {
        type: "p",
        text: "The logistics of interview day (what to wear, when to arrive, the thank-you message) live in [the first-interview guide](/learn/college/ace-your-first-interview). This one is about the words: the five questions that show up in nearly every interview, and how to build an answer for each before anyone asks.",
      },
      {
        type: "h2",
        text: "1. “Tell me about yourself”",
      },
      {
        type: "p",
        text: "This is an invitation to talk for one minute, not fifteen. Use a three-part shape: what you're doing now (school, year, activities), one thing you've done that you're proud of, and why you're sitting in this chair. “I'm a junior at Central, I run the ticket table for our theater program, and I'm looking for weekend work where I can use that customer experience.” Done.",
      },
      {
        type: "h2",
        text: "2. “Why do you want to work here?”",
      },
      {
        type: "p",
        text: "Needing money is real, and every interviewer knows it. Say one thing beyond it that's true: you like the product, the location works with your schedule, people you know say the team is good, you want experience in this kind of work. One honest, specific reason is the entire assignment.",
      },
      {
        type: "h2",
        text: "3. “What's a strength? What's a weakness?”",
      },
      {
        type: "p",
        text: "For the strength, pick one and attach evidence, resume-bullet style: reliable, because you didn't miss a practice in two seasons. For the weakness, name a real one plus what you're doing about it: “I get quiet in big groups, so I joined debate to push myself.” The fake-weakness trick (“I work too hard”) is older than your interviewer, and they're tired of it.",
      },
      {
        type: "h2",
        text: "4. “Tell me about a time when…”",
      },
      {
        type: "p",
        text: "…you dealt with a difficult person, solved a problem, made a mistake. These story questions all use one shape: the situation in a sentence, what you did in two or three, and how it ended in one. Pick two stories from school, sports, volunteering, or family responsibility before the interview; between them they'll cover almost any version of the question. A mistake story is a strength here if it ends with what changed afterward.",
      },
      {
        type: "h2",
        text: "5. “Do you have any questions for us?”",
      },
      {
        type: "p",
        text: "“No” is the only wrong answer; it reads as wanting any job rather than this one. Bring two: “What does a typical shift look like?” and “What does training cover?” both work everywhere. Asking about pay and scheduling is allowed and normal; asking only about pay and scheduling is the thing to avoid.",
      },
      {
        type: "tip",
        text: "Practice each answer out loud three times: to a mirror, a friend, or your phone's voice recorder. Out-loud practice is where answers stop being essays and start being speech. The [Interview Practice deck](/students/careers/interview-practice) deals you these questions and more as flip cards.",
      },
      {
        type: "key",
        text: "Five prepared answers cover most of any first-job interview: an organized minute about yourself, one true reason for this place, a strength with evidence, two ready-made stories, and two questions to ask back. Build them once; reuse them everywhere.",
      },
    ],
    related: [
      "ace-your-first-interview",
      "resume-with-no-experience",
      "first-job-offer-money",
    ],
    quiz: [
      {
        question: "A strong answer to “tell me about yourself” is…",
        options: [
          "Your life story from childhood on",
          "One organized minute: what you do now, one proud thing, why you're here",
          "A recitation of your resume line by line",
          "“What would you like to know?”",
        ],
        answer: 1,
        explain:
          "Interviewers want one composed minute. The three-part shape gives it a beginning, middle, and reason.",
      },
      {
        question: "The best way to handle the weakness question:",
        options: [
          "“I work too hard” — flattering yourself as a flaw",
          "“I don't have any weaknesses”",
          "A real weakness plus what you're doing about it",
          "Change the subject to a strength",
        ],
        answer: 2,
        explain:
          "A real weakness with a fix in progress shows self-awareness. The humble-brag version is the most recognized dodge in interviewing.",
      },
      {
        question: "The interviewer asks if you have questions. You should…",
        options: [
          "Say no, to respect their time",
          "Ask two prepared questions about the work, like what a shift or training looks like",
          "Ask only when the pay gets discussed",
          "Ask how quickly you can be promoted to manager",
        ],
        answer: 1,
        explain:
          "Two prepared questions signal you want this job specifically. Pay questions are fine too — just not alone.",
      },
    ],
  },
];
