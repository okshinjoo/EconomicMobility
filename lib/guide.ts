// The "Money Guide" answer engine.
//
// RIGHT NOW this is retrieval-only: it ranks the site's search index against a
// question and replies with the most relevant guides/tools/resources. It never
// invents answers, so it's safe for financial/legal topics with a vulnerable audience.
//
// FLIP ON AI LATER: components/ChatLauncher.tsx has an `AI_ENDPOINT` seam. When
// you stand up a serverless function (holding your Anthropic key) that answers
// from these same articles, set that endpoint and the chat will use Claude,
// falling back to this guide if the call fails. This file stays as the fallback.

import type { SearchItem } from "./search";
import { bestTokenScore, tokensOf } from "./fuzzy";

// Common words to ignore so a natural-language question ("how do I build credit
// with no SSN?") ranks on its content words, not its filler.
const STOPWORDS = new Set([
  "a", "an", "the", "to", "of", "for", "with", "and", "or", "is", "are", "am",
  "do", "does", "did", "i", "my", "me", "you", "your", "how", "what", "why",
  "where", "when", "who", "can", "could", "should", "would", "will", "in", "on",
  "at", "it", "this", "that", "if", "about", "get", "got", "need", "want", "no",
  "not", "have", "has", "be", "out", "up", "any", "some", "help",
]);

function contentTokens(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function score(item: SearchItem, tokens: string[], rawLower: string): number {
  const title = item.title.toLowerCase();
  const hay = `${title} ${item.subtitle.toLowerCase()} ${(item.keywords ?? "").toLowerCase()} ${item.group.toLowerCase()}`;
  // Typo-tolerant scoring: a token "lands" via exact/prefix/substring or a
  // small edit distance, so misspelled questions still retrieve the right
  // guides.
  const hayWords = tokensOf(hay);
  const titleWords = tokensOf(title);
  let present = 0;
  let s = 0;
  for (const t of tokens) {
    const b = bestTokenScore(t, hayWords);
    if (b > 0) {
      present++;
      s += b * 12; // reward matching more of the question's words
      s += bestTokenScore(t, titleWords) * 16; // title hits matter most
    }
  }
  if (present === 0) return -1;
  if (title === rawLower) s += 150;
  else if (rawLower.length > 2 && title.includes(rawLower)) s += 40;
  if (item.kind === "Topic" || item.kind === "Calculator" || item.kind === "Page") s += 6;
  return s;
}

/** Rank the index against a free-text question (soft, conversational matching). */
export function rankItems(query: string, items: SearchItem[], limit = 5): SearchItem[] {
  const tokens = contentTokens(query);
  if (tokens.length === 0) return [];
  const rawLower = query.trim().toLowerCase();
  return items
    .map((item) => ({ item, s: score(item, tokens, rawLower) }))
    .filter((r) => r.s >= 0)
    .sort((a, b) => b.s - a.s || a.item.title.length - b.item.title.length)
    .slice(0, limit)
    .map((r) => r.item);
}

export interface GuideAnswer {
  reply: string;
  items: SearchItem[];
}

const SENSITIVE = /\b(scam|scam(?:med|s)?|fraud|sued|sue|lawsuit|garnish|deport|immigration|immigrant|undocumented|evict|eviction|audit|wage theft|abuse)\b/;
const CANT_PAY = /(can'?t (pay|afford)|behind on|emergency|no money|broke|homeless)/;

function opener(lower: string): string {
  if (/\b(where|go|find|start)\b/.test(lower)) return "Here's where I'd point you:";
  if (lower.includes("?") || /^(how|what|why|when|which|is|are|do|can|should)\b/.test(lower))
    return "These should help:";
  return "These look most relevant:";
}

/** Retrieval-based answer: a friendly line + the best matching destinations. */
export function guideAnswer(query: string, index: SearchItem[]): GuideAnswer {
  const lower = query.trim().toLowerCase();

  if (!lower) {
    return {
      reply:
        "Ask me anything about money (budgeting, credit, taxes, benefits, scams) or tell me what you're trying to do, and I'll point you to the right guide.",
      items: index.filter((i) => i.kind === "Topic").slice(0, 4),
    };
  }
  if (/^(hi|hey|hello|yo|hiya|sup|good (morning|afternoon|evening))\b/.test(lower)) {
    return {
      reply:
        "Hey! I'm your money guide. Ask me a question or tell me what you're working on, and I'll find the right article, calculator, or resource.",
      items: index.filter((i) => i.kind === "Topic").slice(0, 4),
    };
  }
  if (/\b(thanks|thank you|thx|ty|appreciate)\b/.test(lower)) {
    return { reply: "Anytime. Come back whenever you need a hand.", items: [] };
  }

  const results = rankItems(query, index, 5);
  if (results.length === 0) {
    return {
      reply:
        "I couldn't find a guide for that exact wording, so try a few different words. You can also browse every topic, or check Resources for free, trusted help with a specific situation.",
      items: index.filter(
        (i) =>
          i.title === "Browse All Topics" ||
          i.title === "Resources" ||
          i.title === "All Calculators"
      ),
    };
  }

  let reply = opener(lower);
  if (SENSITIVE.test(lower) || CANT_PAY.test(lower)) {
    reply +=
      " And for your specific situation, it's worth talking to a free, qualified professional; the Resources page lists trustworthy ones.";
  }
  return { reply, items: results };
}
