"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * One-shot photo settle (Base44-audit A4 / shortlist #4): the image is
 * rendered ~48px taller than its frame and slides from translateY(-24px)
 * to 0 over 1.2s easeOutQuint the first time the frame enters the
 * viewport. Because the image overflows its clip, the slide reads as the
 * photo "shifting as you scroll" — without any scroll-scrubbing or rAF
 * (a plain CSS transition, so the preview pane can't lie about it).
 *
 * Drop it INSIDE an existing frame that is `relative` + `overflow-hidden`
 * (it fills the frame like `<Image fill>`). Reveal-style arming: the
 * server renders the static photo; the offset state only applies on mount
 * when JS runs, and never under prefers-reduced-motion.
 */
export default function ParallaxPhoto({
  src,
  alt,
  sizes,
  priority = false,
  unoptimized = false,
  imgClassName = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
  imgClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches)
      return;
    const el = ref.current;
    if (!el) return;
    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          // Two frames so the offset state paints before the transition.
          requestAnimationFrame(() =>
            requestAnimationFrame(() => setSettled(true))
          );
        }
      },
      { rootMargin: "-100px 0px -100px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "calc(100% + 48px)",
          transform: armed && !settled ? "translateY(-24px)" : "translateY(0)",
          transition: armed
            ? "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)"
            : undefined,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={unoptimized}
          className={`object-cover ${imgClassName}`}
        />
      </div>
    </div>
  );
}
