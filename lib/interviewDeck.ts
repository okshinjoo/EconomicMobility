import type { Flashcard } from "./courses";

// The Interview Practice deck (July 17, 2026, owner: "more advice/tools
// for jobs… interview prep"). Front = a question interviewers actually
// ask; back = what a strong answer contains, in two sentences or less —
// the shape to practice, never a script to memorize. Companion to
// learn/college/interview-questions-answers, which teaches the five core
// answers in depth. Reuses the course Flashcards flip deck (deckId
// "interview-practice" keeps got-it progress on the device).

export const INTERVIEW_ACCENT = "#3f6478"; // the college slate

export const interviewCards: Flashcard[] = [
  {
    slug: "tell-me-about-yourself",
    term: "“Tell me about yourself.”",
    definition:
      "One organized minute, three parts: what you're doing now, one thing you're proud of, and why you're here. Not a life story.",
  },
  {
    slug: "why-work-here",
    term: "“Why do you want to work here?”",
    definition:
      "One true reason beyond money: the product, the location, the schedule fit, people say the team is good. Specific and honest wins.",
  },
  {
    slug: "greatest-strength",
    term: "“What's your greatest strength?”",
    definition:
      "One strength plus evidence: “Reliable — I haven't missed a practice in two seasons.” A claim with proof, resume-bullet style.",
  },
  {
    slug: "biggest-weakness",
    term: "“What's your biggest weakness?”",
    definition:
      "A real one plus the fix in progress: “I get quiet in big groups, so I joined debate.” Never “I work too hard.”",
  },
  {
    slug: "difficult-person",
    term: "“Tell me about a time you dealt with a difficult person.”",
    definition:
      "One sentence of situation, two of what you did, one of how it ended. Stay generous about the other person; they're listening for calm.",
  },
  {
    slug: "why-hire-you",
    term: "“Why should we hire you?”",
    definition:
      "Match one thing they need to one thing you've done: “You need weekend coverage — my weekends are open and I show up.”",
  },
  {
    slug: "a-mistake",
    term: "“Tell me about a mistake you made.”",
    definition:
      "Pick a real one that ends with what you changed afterward. The ending is the actual answer.",
  },
  {
    slug: "under-pressure",
    term: "“How do you handle pressure?”",
    definition:
      "A specific busy moment — finals week, a packed event — and the system you used: a list, priorities, asking for help early.",
  },
  {
    slug: "teamwork",
    term: "“Give an example of working on a team.”",
    definition:
      "A group project or team story where you name your own role in the group's result, not just “we did it together.”",
  },
  {
    slug: "upset-customer",
    term: "“A customer is upset. What do you do?”",
    definition:
      "Listen all the way through, stay calm, fix what you're allowed to fix, and get a manager when you can't. Calm is the whole test.",
  },
  {
    slug: "availability",
    term: "“What's your availability?”",
    definition:
      "Your honest hours, counting practices, rides, and family duties. Overpromising availability is how first jobs fall apart.",
  },
  {
    slug: "five-years",
    term: "“Where do you see yourself in five years?”",
    definition:
      "A direction, not a job title: “In school, building experience working with customers and money.” Honest ambition reads fine.",
  },
  {
    slug: "pay-expectations",
    term: "“What pay are you expecting?”",
    definition:
      "If the wage was posted: “the posted rate works for me.” If not, name a researched range for the role in your area.",
  },
  {
    slug: "questions-for-us",
    term: "“Do you have any questions for us?”",
    definition:
      "Always two, ready in advance: “What does a typical shift look like?” and “What does training cover?” Pay is fair to ask about — just not alone.",
  },
];
