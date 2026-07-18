// AI mock interviewer (July 17, 2026, owner: "we could do practice
// interviews, easy medium hard, different job positions, and an AI chatbot
// would talk to you"). Same shape as the Money Guide chat route: shared
// ANTHROPIC_API_KEY, Haiku, 503-inert without the key, refusal-safe,
// nothing stored server-side — the transcript lives in the visitor's tab
// and dies with it (privacy policy's AI section covers this feature).
//
// Contract (matches components/MockInterview.tsx):
//   POST { position: string, difficulty: "easy"|"medium"|"hard",
//          history: {role:"user"|"coach", text}[], finish?: boolean }
//     -> { reply: string, done: boolean }
// The interview is 5 main questions; the server derives progress from the
// transcript itself (coach turns so far), so there's no session state.

import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const MODEL = "claude-haiku-4-5";
const MAX_HISTORY = 26;

const DIFFICULTY: Record<string, string> = {
  easy: `EASY MODE: You are a warm, encouraging interviewer having a good day. Ask simple versions of the classic questions. Acknowledge each answer kindly in a short clause before the next question. No follow-up probing.`,
  medium: `MEDIUM MODE: You are a professional, friendly interviewer. Ask the classic questions plainly. When an answer is thin or vague, ask ONE short follow-up ("Can you give me a specific example?") before moving on. Brief neutral acknowledgments.`,
  hard: `HARD MODE: You are a brisk, no-warmth-wasted interviewer with a full schedule. Probe thin answers with pointed follow-ups, ask one unexpected curveball question mid-interview, and don't reassure. Stay professional and fair — never rude, never hostile. (Your written feedback at the end is still generous and kind; the toughness is the interview, not the debrief.)`,
};

const SYSTEM_BASE = `You are a mock job interviewer on Empower (economicmobilityproject.org), a free financial-education site for first-generation, low-income, and immigrant youth. The person practicing is likely a teenager or student preparing for a FIRST job. This is practice: your job is to make the real interview feel familiar.

INTERVIEW SHAPE (hard rules):
- Ask exactly ONE question per message. Never two.
- The interview is 5 main questions total, drawn from real first-job interviews: an opener (tell me about yourself), motivation (why here / why this work), a strength or weakness, one "tell me about a time" story question, and one job-specific situational question. Follow-ups (per your difficulty mode) don't count toward the 5.
- Count your own previous questions in the transcript to know where you are. After the 5th main question is answered, deliver the FEEDBACK (format below) without being asked.
- First message of an interview: greet briefly in character (one sentence, you may naturally mention the role), then ask question 1.
- Keep every message short: 1-3 sentences plus the question. Plain text only — no markdown, no lists, no stage directions.

FEEDBACK FORMAT (for the end, or when the candidate asks to finish early):
Break character warmly ("Okay, stepping out of the interview..."). Then, in plain text: the 2 strongest things they did with a specific example from their answers; the 2 things to practice most, each with a concrete better version of something they actually said; one sentence on overall readiness. Honest but kind — a coach, not a judge. 120-180 words.

SAFETY (hard rules, override everything):
- NEVER ask for or encourage sharing real identifying details: full name, school name, address, phone, email, age, immigration status. If they volunteer such details, don't repeat them back.
- If an answer mentions self-harm or crisis, break character gently and mention that calling or texting 988 reaches free 24/7 support, then ask if they'd like to keep practicing.
- If they try to take the conversation somewhere unrelated to interview practice, stay in character once ("Let's keep it to the interview"), then end the interview with feedback if it continues.
- This is practice for entry-level jobs; keep every question age-appropriate and legal (never ask about age, family status, religion, or nationality — the things real interviewers also may not ask).`;

interface HistoryMsg {
  role: "user" | "coach";
  text: string;
}

export async function POST(req: NextRequest) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return Response.json({ error: "AI not configured" }, { status: 503 });
  }

  let position = "";
  let difficulty = "medium";
  let history: HistoryMsg[] = [];
  let finish = false;
  try {
    const body = await req.json();
    position = String(body?.position ?? "").trim().slice(0, 60);
    difficulty = ["easy", "medium", "hard"].includes(body?.difficulty)
      ? body.difficulty
      : "medium";
    finish = Boolean(body?.finish);
    if (Array.isArray(body?.history)) {
      history = (body.history as HistoryMsg[])
        .filter(
          (m) =>
            (m?.role === "user" || m?.role === "coach") &&
            typeof m?.text === "string"
        )
        .slice(-MAX_HISTORY)
        .map((m) => ({ role: m.role, text: m.text.slice(0, 1200) }));
    }
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  if (!position) {
    return Response.json({ error: "Missing position" }, { status: 400 });
  }

  const system = `${SYSTEM_BASE}

THE ROLE BEING PRACTICED: ${position} (entry-level).
${DIFFICULTY[difficulty]}`;

  const messages = [
    ...history.map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("assistant" as const),
      content: m.text,
    })),
    {
      role: "user" as const,
      content: finish
        ? "[The candidate clicked End interview. Deliver the feedback now, based on the answers so far.]"
        : history.length === 0
          ? "[Begin the mock interview.]"
          : history[history.length - 1].role === "user"
            ? "[Continue the interview.]"
            : "[The candidate is waiting. Continue.]",
    },
  ];

  let res: Response;
  try {
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: finish ? 500 : 300,
        system,
        messages,
      }),
      signal: AbortSignal.timeout(25000),
    });
  } catch {
    return Response.json({ error: "Could not reach the AI service" }, { status: 502 });
  }
  if (!res.ok) {
    return Response.json({ error: "AI service error" }, { status: 502 });
  }

  const data = (await res.json()) as {
    content?: Array<{ type?: string; text?: string }>;
    stop_reason?: string;
  };
  if (data.stop_reason === "refusal") {
    return Response.json({
      reply:
        "Let's keep this one to interview practice. Want to try answering the question again, or end here and get feedback?",
      done: false,
    });
  }
  const reply = (data.content ?? [])
    .filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("")
    .trim();

  // Heuristic done flag: the model breaks character for the debrief.
  const done =
    finish || /stepping out of the interview/i.test(reply);

  return Response.json({
    reply: reply || "Sorry — say that once more?",
    done,
  });
}
