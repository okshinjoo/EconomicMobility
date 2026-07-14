// Reading-level awareness (July 2026, owner nuance on personalization: "if
// the user seems knowledgeable in a topic — reading ETF vs index fund — be
// hesitant to recommend basic articles like what-is-a-stock; not a hard
// rule"). Client-safe: NO article registry — callers pass a lightweight
// {slug, level(, topicId)} index (TopicPath articles carry `level` from
// their server builders). This is a SOFT signal only: consumers re-sort
// their picks, they never filter anything out.

import { getReadMap, type ReadMap } from "./readTracking";

export type ReadingLevel = "Beginner" | "Intermediate" | "Advanced";

export interface LeveledRef {
  slug: string;
  level?: ReadingLevel;
  /** Optional — indexes spanning topics tag each entry; a single topic's
   *  own article list can omit it. */
  topicId?: string;
}

/** Non-Beginner reads in one topic that demonstrate an advanced lean. */
export const ADVANCED_SIGNAL_MIN = 2;

/**
 * "advanced-leaning" when this device's read map shows at least
 * ADVANCED_SIGNAL_MIN Intermediate/Advanced reads in the topic; null
 * otherwise (including always on the server, where the read map is empty).
 */
export function demonstratedTier(
  topicId: string,
  index: LeveledRef[],
  read: ReadMap = getReadMap()
): "advanced-leaning" | null {
  let deepReads = 0;
  for (const a of index) {
    if (a.topicId && a.topicId !== topicId) continue;
    if (a.level && a.level !== "Beginner" && read[a.slug]) {
      deepReads++;
      if (deepReads >= ADVANCED_SIGNAL_MIN) return "advanced-leaning";
    }
  }
  return null;
}

/**
 * The "next unread" pick for a topic path, level-aware: normally the first
 * unread in path order (beginner-first, exactly as before); when the person
 * demonstrably reads at an Intermediate/Advanced level in this topic, the
 * first unread Intermediate/Advanced instead — falling back to Beginner
 * only when nothing deeper is left unread. A soft re-sort, never a filter.
 */
export function pickNextUnread<T extends LeveledRef>(
  topicId: string,
  articles: T[],
  read: ReadMap
): T | undefined {
  const unread = articles.filter((a) => !read[a.slug]);
  if (unread.length === 0) return undefined;
  if (demonstratedTier(topicId, articles, read) === "advanced-leaning") {
    const deeper = unread.find((a) => a.level && a.level !== "Beginner");
    if (deeper) return deeper;
  }
  return unread[0];
}
