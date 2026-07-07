"use client";

import { useEffect } from "react";
import { markArticleRead } from "@/lib/readTracking";

/**
 * Invisible tracker mounted on each article page. Marks the article read
 * once the reader has scrolled through ~85% of #article-content (matching
 * ReadingProgress's math). Articles short enough to fit the viewport count
 * as read after a short dwell instead.
 */
export default function MarkAsRead({ slug }: { slug: string }) {
  useEffect(() => {
    let done = false;
    let dwellTimer: ReturnType<typeof setTimeout> | null = null;

    const finish = () => {
      if (done) return;
      done = true;
      markArticleRead(slug);
      window.removeEventListener("scroll", onScroll);
      if (dwellTimer) clearTimeout(dwellTimer);
    };

    const onScroll = () => {
      const el = document.getElementById("article-content");
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return; // handled by the dwell timer
      const rect = el.getBoundingClientRect();
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      if (scrolled / total >= 0.85) finish();
    };

    // Short article that fits (or nearly fits) on screen: count it after 8s.
    const el = document.getElementById("article-content");
    if (el && el.offsetHeight - window.innerHeight <= 0) {
      dwellTimer = setTimeout(finish, 8000);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (dwellTimer) clearTimeout(dwellTimer);
    };
  }, [slug]);

  return null;
}
