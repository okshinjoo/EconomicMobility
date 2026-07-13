// The curated scholarship list (July 2026): real, established, national
// awards relevant to Empower's audience — first-gen, low-income, immigrant,
// and transfer students. HONESTY RULES: every entry is a real program with
// its OFFICIAL site linked; amounts are the program's published figures;
// deadlines are the month the application usually closes ("Typically …")
// because exact dates shift yearly — the page tells readers to confirm on
// the official site. VERIFIED_AS_OF is shown publicly; re-verify every
// entry (still running? amount changed? link alive?) once a year like the
// state highlights, and prune anything that dies. Curation bar: no essay
// mills, no "sweepstakes" scholarships that sell your data, no programs we
// can't verify.

export const VERIFIED_AS_OF = "July 2026";

export type StudentStage = "high-school" | "college" | "transfer";

export interface Scholarship {
  id: string;
  name: string;
  /** Published award figure, as the program states it. */
  amount: string;
  /** When applications usually close. */
  deadline: string;
  /** 1-12; used only for academic-year ordering. Null = rolling/varies. */
  deadlineMonth: number | null;
  /** One plain sentence: who it's for. */
  who: string;
  stages: StudentStage[];
  /** True when the program is explicitly open to undocumented/DACA/TPS
   *  students (no citizenship or green card required). */
  openToUndocumented?: boolean;
  /** Optional search keywords (majors, identities, states) — folded into
   *  the finder's fuzzy haystack, never displayed. */
  tags?: string[];
  officialUrl: string;
}

export const scholarships: Scholarship[] = [
  {
    id: "jkc-transfer",
    name: "Jack Kent Cooke Undergraduate Transfer Scholarship",
    amount: "Up to $55,000/yr",
    deadline: "Typically January",
    deadlineMonth: 1,
    who: "High-achieving community college students transferring to a four-year school, with financial need.",
    stages: ["transfer"],
    officialUrl: "https://www.jkcf.org/our-scholarships/undergraduate-transfer-scholarship/",
  },
  {
    id: "jkc-college",
    name: "Jack Kent Cooke College Scholarship",
    amount: "Up to $55,000/yr",
    deadline: "Typically November",
    deadlineMonth: 11,
    who: "High-achieving high school seniors with financial need.",
    stages: ["high-school"],
    officialUrl: "https://www.jkcf.org/our-scholarships/college-scholarship-program/",
  },
  {
    id: "gates",
    name: "The Gates Scholarship",
    amount: "Full cost of attendance",
    deadline: "Typically September",
    deadlineMonth: 9,
    who: "Pell-eligible high school seniors from minority backgrounds with strong records.",
    stages: ["high-school"],
    officialUrl: "https://www.thegatesscholarship.org/",
  },
  {
    id: "questbridge",
    name: "QuestBridge National College Match",
    amount: "Full four-year scholarship",
    deadline: "Typically September",
    deadlineMonth: 9,
    who: "Low-income high school seniors; matches you to full rides at partner colleges.",
    stages: ["high-school"],
    officialUrl: "https://www.questbridge.org/",
  },
  {
    id: "coca-cola",
    name: "Coca-Cola Scholars Program",
    amount: "$20,000",
    deadline: "Typically October",
    deadlineMonth: 10,
    who: "High school seniors with leadership and service; one of the largest merit programs.",
    stages: ["high-school"],
    officialUrl: "https://www.coca-colascholarsfoundation.org/",
  },
  {
    id: "dell",
    name: "Dell Scholars",
    amount: "$20,000 plus laptop and support",
    deadline: "Typically December",
    deadlineMonth: 12,
    who: "Low-income students in an approved college-readiness program, with grit valued over grades.",
    stages: ["high-school"],
    officialUrl: "https://www.dellscholars.org/",
  },
  {
    id: "horatio-alger",
    name: "Horatio Alger National Scholarship",
    amount: "$25,000",
    deadline: "Typically October",
    deadlineMonth: 10,
    who: "High school students who have faced and overcome significant adversity, with financial need.",
    stages: ["high-school"],
    officialUrl: "https://scholars.horatioalger.org/",
  },
  {
    id: "dream-us-national",
    name: "TheDream.US National Scholarship",
    amount: "Up to $33,000",
    deadline: "Typically February",
    deadlineMonth: 2,
    who: "Undocumented students (DACA or TPS not required) headed to a partner college.",
    stages: ["high-school", "college", "transfer"],
    openToUndocumented: true,
    officialUrl: "https://www.thedream.us/",
  },
  {
    id: "dream-us-opportunity",
    name: "TheDream.US Opportunity Scholarship",
    amount: "Up to $80,000",
    deadline: "Typically February",
    deadlineMonth: 2,
    who: "Undocumented students in states that lock them out of in-state tuition.",
    stages: ["high-school", "college"],
    openToUndocumented: true,
    officialUrl: "https://www.thedream.us/",
  },
  {
    id: "golden-door",
    name: "Golden Door Scholars",
    amount: "Up to full tuition",
    deadline: "Typically October",
    deadlineMonth: 10,
    who: "Undocumented students, with special focus on career-track degrees.",
    stages: ["high-school", "college", "transfer"],
    openToUndocumented: true,
    officialUrl: "https://www.roadtohire.org/golden-door-scholars",
  },
  {
    id: "hsf",
    name: "Hispanic Scholarship Fund",
    amount: "$500–$5,000",
    deadline: "Typically February",
    deadlineMonth: 2,
    who: "Students of Hispanic heritage, high school seniors through graduate students.",
    stages: ["high-school", "college", "transfer"],
    officialUrl: "https://www.hsf.net/",
  },
  {
    id: "jackie-robinson",
    name: "Jackie Robinson Foundation Scholarship",
    amount: "Up to $35,000 over four years",
    deadline: "Typically January",
    deadlineMonth: 1,
    who: "Minority high school seniors with leadership and financial need; includes mentoring.",
    stages: ["high-school"],
    officialUrl: "https://jackierobinson.org/",
  },
  {
    id: "ron-brown",
    name: "Ron Brown Scholar Program",
    amount: "$40,000 ($10,000 × 4 years)",
    deadline: "Typically January",
    deadlineMonth: 1,
    who: "Black high school seniors with academic excellence, leadership, and need.",
    stages: ["high-school"],
    officialUrl: "https://ronbrown.org/",
  },
  {
    id: "apia",
    name: "APIA Scholars",
    amount: "$2,500–$20,000",
    deadline: "Typically January",
    deadlineMonth: 1,
    who: "Asian and Pacific Islander American students with financial need; first-gen prioritized.",
    stages: ["high-school", "college"],
    officialUrl: "https://apiascholars.org/",
  },
  {
    id: "american-indian-college-fund",
    name: "American Indian College Fund Scholarships",
    amount: "Varies by program",
    deadline: "Typically May",
    deadlineMonth: 5,
    who: "Native American students, both at tribal colleges and mainstream campuses.",
    stages: ["high-school", "college", "transfer"],
    officialUrl: "https://collegefund.org/",
  },
  {
    id: "point",
    name: "Point Foundation Flagship Scholarship",
    amount: "Varies; multi-year",
    deadline: "Typically January",
    deadlineMonth: 1,
    who: "LGBTQ students with demonstrated leadership, college through graduate school.",
    stages: ["college", "transfer"],
    officialUrl: "https://pointfoundation.org/",
  },
  {
    id: "ptk",
    name: "Phi Theta Kappa Scholarships",
    amount: "Varies by award",
    deadline: "Multiple rounds yearly",
    deadlineMonth: null,
    who: "Community college students; PTK membership unlocks a whole pipeline of transfer awards.",
    stages: ["college", "transfer"],
    officialUrl: "https://www.ptk.org/scholarships/",
  },
  {
    id: "cameron-impact",
    name: "Cameron Impact Scholarship",
    amount: "Full tuition",
    deadline: "Typically May and September rounds",
    deadlineMonth: 5,
    who: "High school seniors with strong academics, leadership, and community service.",
    stages: ["high-school"],
    officialUrl: "https://www.bryancameroneducationfoundation.org/",
  },
  {
    id: "amazon-future-engineer",
    name: "Amazon Future Engineer Scholarship",
    amount: "$40,000 ($10,000 × 4 years)",
    deadline: "Typically January",
    deadlineMonth: 1,
    who: "High school seniors from underserved communities planning computer science degrees; includes an internship offer.",
    stages: ["high-school"],
    officialUrl: "https://www.amazonfutureengineer.com/scholarships",
  },
  {
    id: "elks-mvs",
    name: "Elks Most Valuable Student",
    amount: "$1,000–$7,500 per year",
    deadline: "Typically November",
    deadlineMonth: 11,
    who: "High school seniors, judged on leadership, need, and scholarship; huge number of awards.",
    stages: ["high-school"],
    officialUrl: "https://www.elks.org/scholars/",
  },
  {
    id: "vfw-voice",
    name: "VFW Voice of Democracy",
    amount: "Up to $35,000",
    deadline: "Typically October 31",
    deadlineMonth: 10,
    who: "9th–12th graders; an audio essay contest, so it rewards effort over GPA.",
    stages: ["high-school"],
    officialUrl: "https://www.vfw.org/community/youth-and-education/youth-scholarships",
  },
  {
    id: "equitable-excellence",
    name: "Equitable Excellence Scholarship",
    amount: "$2,500–$25,000",
    deadline: "Typically December",
    deadlineMonth: 12,
    who: "High school seniors demonstrating courage, strength, and wisdom; hundreds awarded yearly.",
    stages: ["high-school"],
    officialUrl: "https://equitable.com/foundation/equitable-excellence-scholarship",
  },
  {
    id: "ge-reagan",
    name: "GE-Reagan Foundation Scholarship",
    amount: "$10,000, renewable",
    deadline: "Typically January",
    deadlineMonth: 1,
    who: "High school seniors with leadership, integrity, and financial need.",
    stages: ["high-school"],
    officialUrl: "https://www.reaganfoundation.org/education/scholarship-programs/",
  },
  {
    id: "dream-award",
    name: "Scholarship America Dream Award",
    amount: "$5,000–$15,000, renewable",
    deadline: "Typically October",
    deadlineMonth: 10,
    who: "Students entering their SECOND year or later — one of the few big awards for students already in college.",
    stages: ["college", "transfer"],
    officialUrl: "https://scholarshipamerica.org/students/browse-scholarships/",
  },
  {
    id: "regeneron-sts",
    name: "Regeneron Science Talent Search",
    amount: "Up to $250,000",
    deadline: "Typically November",
    deadlineMonth: 11,
    who: "High school seniors with an original science research project.",
    stages: ["high-school"],
    officialUrl: "https://www.societyforscience.org/regeneron-sts/",
  },
];
