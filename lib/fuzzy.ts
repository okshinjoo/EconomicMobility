// Typo-tolerant matching shared by every search on the site (⌘K palette,
// chatbot retrieval, community post search, channel finder). Pure functions,
// no dependencies, safe on server and client.
//
// The contract: "the gist should be enough." A query token matches a word by
// exactness, prefix, substring, or small edit distance (typos, transposed
// letters), and a whole query matches when most of its tokens land.

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    // Keep + and # attached to their token so distinctive names survive:
    // "A+" / "LGBTQ+" / "18+" / "C#" tokenize as-is instead of collapsing to
    // a noise token ("A+" → "a", which matched an "a" in hundreds of names).
    // In this corpus + and # only ever trail a token, never join two, so this
    // never mis-merges words. Prefix matching keeps "lgbtq" finding "lgbtq+".
    .replace(/[^a-z0-9+#\s]/g, " ");
}

export function tokensOf(s: string): string[] {
  return normalize(s)
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

/** Query-side tokens: single-letter words ("Help A Hero", "vitamin d") carry
 *  no search signal but would each demand a literal one-letter word in the
 *  text, so they're dropped — unless the whole query is single letters, which
 *  keeps a bare "a" matching literally instead of matching nothing. */
export function queryTokensOf(s: string): string[] {
  const all = tokensOf(s);
  const kept = all.filter((t) => t.length > 1);
  return kept.length > 0 ? kept : all;
}

/** Damerau–Levenshtein distance with an early-out cap. Returns cap+1 when
 *  the strings are further apart than `cap`. */
export function editDistance(a: string, b: string, cap = 2): number {
  if (a === b) return 0;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > cap) return cap + 1;
  // rows: previous-previous, previous, current
  let prevPrev: number[] = [];
  let prev: number[] = Array.from({ length: lb + 1 }, (_, j) => j);
  for (let i = 1; i <= la; i++) {
    const cur: number[] = [i];
    let rowMin = i;
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(
        prev[j] + 1, // deletion
        cur[j - 1] + 1, // insertion
        prev[j - 1] + cost // substitution
      );
      if (
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        v = Math.min(v, prevPrev[j - 2] + 1); // transposition
      }
      cur.push(v);
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > cap) return cap + 1;
    prevPrev = prev;
    prev = cur;
  }
  return prev[lb] > cap ? cap + 1 : prev[lb];
}

/** How well one query token matches one word: 0 (no) … 1 (exact). */
export function tokenMatch(q: string, w: string): number {
  if (q === w) return 1;
  if (q.length >= 2 && w.startsWith(q)) return 0.9;
  if (q.length >= 4 && w.includes(q)) return 0.7;
  // Typo tolerance scales with token length: 1 edit at 4+, 2 edits at 7+.
  const cap = q.length >= 7 ? 2 : q.length >= 4 ? 1 : 0;
  if (cap > 0) {
    const d = editDistance(q, w, cap);
    if (d <= cap) return 0.85 - 0.25 * d; // 0.6 or 0.85
    // Misspelled PREFIX of a longer word ("calcultor" → "calculators").
    if (w.length > q.length) {
      const dp = editDistance(q, w.slice(0, q.length), cap);
      if (dp <= cap) return 0.55;
    }
  }
  return 0;
}

/** Best match for a query token across pre-tokenized words. */
export function bestTokenScore(q: string, words: string[]): number {
  let best = 0;
  for (const w of words) {
    const m = tokenMatch(q, w);
    if (m > best) best = m;
    if (best === 1) break;
  }
  return best;
}

/** Fuzzy score of a whole query against a text: 0 when the gist doesn't
 *  match; otherwise 0..1. Short queries must fully land; longer ones need
 *  most tokens (60%) to land. */
export function fuzzyScore(query: string, text: string): number {
  const qs = queryTokensOf(query);
  if (qs.length === 0) return 0;
  const ws = tokensOf(text);
  if (ws.length === 0) return 0;
  let sum = 0;
  let hits = 0;
  for (const q of qs) {
    const b = bestTokenScore(q, ws);
    if (b > 0) {
      hits++;
      sum += b;
    }
  }
  const need = qs.length <= 2 ? qs.length : Math.ceil(qs.length * 0.6);
  if (hits < need) return 0;
  return sum / qs.length;
}
