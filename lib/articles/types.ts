import type { TopicId } from "@/lib/topics";

export type ArticleLevel = "Beginner" | "Intermediate" | "Advanced";

export interface ArticleBlock {
  /**
   * p       — paragraph
   * h2 / h3 — section headings
   * list    — bulleted list (uses `items`)
   * steps   — numbered list (uses `items`)
   * tip     — highlighted "Tip" callout
   * key     — "Key point" callout
   */
  type: "p" | "h2" | "h3" | "list" | "steps" | "tip" | "key";
  text?: string;
  items?: string[];
}

export interface Article {
  slug: string;
  topicId: TopicId;
  title: string;
  /** One-sentence subtitle / summary. */
  dek: string;
  level: ArticleLevel;
  readMinutes: number;
  /**
   * Optional sort key within a topic's level group (lower = earlier). Lets us
   * sequence articles into a logical path even when they live in different
   * source files. Articles without `order` keep their original relative order,
   * after the ordered ones.
   */
  order?: number;
  /** 3–4 plain-language "what you'll learn" bullets for the summary box. */
  takeaways: string[];
  body: ArticleBlock[];
  /** Slugs of related articles (any topic). */
  related?: string[];
  /**
   * Optional end-of-article knowledge check (2–4 multiple-choice questions),
   * rendered by components/ArticleQuiz.tsx. Questions must be answerable from
   * this article alone; `answer` is the index into `options`.
   */
  quiz?: ArticleQuizQuestion[];
}

export interface ArticleQuizQuestion {
  question: string;
  options: string[];
  answer: number;
  /** One–two plain sentences shown after answering. */
  explain: string;
}
