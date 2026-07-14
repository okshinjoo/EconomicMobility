# Base44 Motion Audit — what makes empower-money-path.base44.app feel alive

**Audited July 13, 2026** in real headless Chrome (CDP, 1440×900) — homepage + /learn, /tools, /community, /blog, /journey, /courses, /quiz, /about, /glossary, /tools/budget, and an article page (/learn/credit/build-credit-from-zero). Method: scroll-step diffing of inline transforms/opacities, CDP mouse hover/press simulation with computed-style diffs, stylesheet enumeration, rAF instrumentation, **and full source extraction from the app bundle** (`assets/index-BW01kiPA.js` — the whole app ships in one 675 KB file, so every motion primitive below is quoted from its actual implementation, not guessed).

**The big picture:** the entire motion system is **framer-motion**, built from ~8 small reusable primitives that get composed onto every page. Almost nothing is continuous or scroll-scrubbed — it's one-shot `whileInView` choreography plus two infinite ambient loops. **Every single primitive checks `useReducedMotion()` and renders a static version** (their `Vn()` hook) — Base44 did reduced-motion properly, matching our house rule. One shared easing curve does most of the work: **`cubic-bezier(0.22, 1, 0.36, 1)`** (easeOutQuint — fast start, long soft landing). That one curve is a large part of why the site feels expensive.

No route/page transitions exist (zero `AnimatePresence` in the bundle). No press/tap states anywhere (no `active:` classes, no tap-scale — hover-only site).

---

## 1. Inventory — every distinct effect found

### (a) Scroll-linked

**A1. Global scroll-progress bar (every page, including articles).**
`<div class="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[60]">` scaled by `useScroll → useSpring({stiffness: 120, damping: 30, restDelta: 0.001}) → scaleX`. The spring means the bar *chases* your scroll position with a slight lag/overshoot instead of tracking 1:1 — measured `scaleX` lagging ~0.05 behind instant jumps. Amber, 4px tall, above the sticky header.

**A2. Scroll reveal (their `Q` component — the workhorse, ~30–70 instances/page).**
`initial:{opacity:0, y:28} → whileInView:{opacity:1, y:0}`, `viewport:{once:true, margin:"-60px"}`, `transition:{duration:0.5, delay:<prop>, ease:[.22,1,.36,1]}`. Functionally identical to our `Reveal.tsx` but: 28px rise (ours 14px), 500ms (ours 550ms), easeOutQuint (ours plain `ease`), fires 60px before entering (ours -8% rootMargin). Siblings staggered via the delay prop in 0.1s steps (stats band uses `delay: i*0.1`). Reduced motion → plain div.

**A3. Word-mask headline rise (their `Wt` component — on the hero H1 AND most section H2s, 4–5 per page).**
Headline split on spaces; each word wrapped in `<span class="inline-block overflow-hidden align-bottom">` containing an inner `motion.span` going `initial:{y:"100%", opacity:0} → whileInView:{y:"0%", opacity:1}`, `duration:0.5, delay: base + i*0.06` (60 ms per word), same easeOutQuint, `margin:"-40px"`. The overflow-hidden wrapper makes each word rise out of an invisible slot — the classic "line mask" editorial reveal. Observed live: "Financial / knowledge / shouldn't / depend / on / the / family / you're / born / into." rising word by word.

**A4. Faux-parallax photo settle (their `th` ParallaxImage).**
**Not real scroll-scrubbed parallax.** The `<img>` is rendered `height: calc(100% + 60px)` inside an `overflow-hidden` frame, starts at `y: -30px`, and settles to `y: 0` over **1.2s** easeOutQuint when the frame enters the viewport (`margin:"-100px"`, once). Because the image is taller than its frame, the 30px slide reads as the photo "shifting as you scroll" — but it's a one-shot CSS-transform settle, cheap and scroll-jack-free. Also runs on first load for the hero photo (observed settling from -23px → 0 over ~1.5s after reload). Reduced motion → plain `<img>`.

**A5. Self-drawing chart (their `Aw`, used on the homepage "math, visualized" band AND reused on /tools).**
A 400×240 SVG with a ~2.2s four-part choreography, all `whileInView once`:
1. Amber line path draws via `pathLength: 0 → 1`, `duration: 1.8, ease: "easeInOut"` (framer sets stroke-dasharray/offset);
2. Area fill under the line fades `opacity 0 → 1`, `duration: 1, delay: 1.2` (fill `accent` at 0.1 opacity);
3. Five green bars grow from the baseline: `initial:{height:0, y:240} → {height:h, y:240-h}`, `duration:0.6, delay: 0.3 + i*0.12`, easeOutQuint;
4. Five dots pop on the line: `scale: 0 → 1`, `duration:0.3, delay: 1.5 + i*0.15` — timed to land right after the line draw passes them.
Dashed gridlines are static. Reduced motion → everything rendered final.

**A6. Count-up stat numbers (their `hm` CountUp).**
Hand-rolled rAF counter (not framer): `useInView(once, margin:"-40px")` then counts 0 → target over **900 ms** with `1-(1-t)^3` ease-out cubic, `toLocaleString()` formatting, optional prefix/suffix. Used in the dark "by the numbers" band (203 / 20 / 411 / 9), where the four cells are also wrapped in `Q` with `delay: i*0.1` — so cards rise in AND numbers roll simultaneously. Reduced motion → instantly set to target. (Observed mid-flight values: "198 Plain-English guides", "402 Jargon terms".)

### (b) Hover / press micro-interactions

**B1. Card lift + shadow (sitewide default).** `hover:-translate-y-1` (variants -0.5 / -1.5) + `hover:shadow-xl` or `-2xl`, `transition-all duration-200/300`. Measured: translate -4px, shadow appears over 200 ms cubic-bezier(0.4,0,0.2,1). Lifted cards that carry a static tilt (see B8) **keep their tilt while lifting** — the rotation persists in the matrix.

**B2. 3D perspective tilt card (their `mm` — one card only: the Budget Planner preview in the homepage math band).**
Mouse-position tracking: `perspective(800px) rotateX(±4°) rotateY(±4°) scale(1.02)` mapped from cursor position within the card (`intensity: 8`), animated by a framer **spring `{stiffness:300, damping:20}`**, resets to flat on mouse-leave. Disabled under reduced motion. The only "wow" hover on the site, and it's used exactly once.

**B3. Topic-card photo-band reveal (the 9-topic grid, homepage + section).**
The richest hover on the site, all CSS: card top has `h-0 group-hover:h-28 overflow-hidden transition-all duration-300 rounded-t-2xl` containing a full-bleed topic **photo** — so hovering slides a 112px photo band open from the top of the card. Simultaneously: hidden description expands (`max-h-0 opacity-0 → group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-3`, 300 ms), icon tile scales (`group-hover:scale-110`), title turns accent, border darkens `border-foreground/10 → hover:border-foreground`, card lifts with `hover:shadow-2xl hover:z-20 hover:-translate-y-1`. Five coordinated property changes off one `:hover`.

**B4. Photo micro-zoom.** `group-hover:scale-105 transition-transform duration-300` on thumbnail imgs (learn topic rows, blog cards). Inside rounded overflow-hidden frames — quiet Ken-Burns-on-hover.

**B5. Hidden "Read more →" line (blog cards).** `opacity-0 group-hover:opacity-100` footer row — the affordance only appears on hover.

**B6. Number-chip fill (homepage question cards).** The "01/02/03" chip goes `bg-accent/10 → group-hover:bg-accent` (fills solid amber) while the sub-line "Read the guide →" turns accent — measured live via CDP hover.

**B7. Colored glow shadows (courses).** Course cards use `hover:shadow-2xl` **tinted in each course's own accent**: `hover:shadow-brand-gold/30`, `hover:shadow-brand-clay/30`, `-sage`, `-teal`, `-rust`, `-slate`… (`--tw-shadow-color` swap), plus `hover:-translate-y-1.5` and `group-hover:gap-2` (the "Start →" arrow gap widens by 4px). /journey adds `group-hover:rotate-3` (icon wiggles 3° on hover) and `group-hover:scale-110`.

**B8. Static tilts (not animated, but the "hand-placed" accent system).** Question cards alternate `rotate-[±0.5deg]`, the bento's big card `md:rotate-[-1deg]`, "FREE" sticker `rotate-3`, decorative squares `rotate-12`/`-rotate-6`, journey chips `rotate-3`.

**B9. Glossary letter tiles.** A–Z jump tiles: `hover:bg-accent hover:text-accent-foreground hover:scale-110`; letter-section cards have a ghost letter watermark that bumps `group-hover:opacity-[0.14]` and an accent side-bar that widens `group-hover:w-2`; term links `group-hover:scale-125` on the letter.

**B10. Nav/buttons.** Dark header links get a `hover:bg-white/10` pill (150 ms `transition-colors`); primary buttons `hover:bg-brand-gold-dark`; ubiquitous `transition-colors` link color shifts. Header is plain `sticky top-0` — no shrink, no shadow-on-scroll, no hide/show. **No `active:`/pressed states anywhere** (verified by CDP mousedown diff: no transform change).

### (c) Ambient / background motion

**C1. Ticker marquee on EVERY page (their `zn`).** Items duplicated once, `animate:{x:["0%","-50%"]}, transition:{duration:30, repeat:Infinity, ease:"linear"}`, amber ✦ separators, with **page-specific copy**: home "Free forever ✦ No paywall ✦ …", /learn "No sign-up wall ✦ No tracking ✦ No ads", /tools "Nothing saved to our servers ✦ Works in your browser", /community "Ask anything ✦ No dumb questions", /quiz "3 questions ✦ 2 minutes", /blog "New posts weekly ✦ No clickbait", /glossary "411 terms ✦ Plain English", /journey, /about… Reduced motion → static single row. No hover-pause (ours pauses).

**C2. Floating hero shapes (their `Rw` — home + /learn heroes).** Four low-opacity geometric shapes (outlined circle `border-accent/20`, outlined square `border-primary/15`, filled circle `bg-accent/5`, filled square `bg-primary/5`) on infinite `easeInOut` loops: `y:[0,-20,0] rotate:[0,90,0]` @12s; `y:[0,25,0] rotate:[0,-45,0]` @15s delay 1; `y:[0,-15,0] x:[0,10,0]` @10s delay 2; `y:[0,18,0]` @~14s. Barely perceptible drift behind hero content, `pointer-events-none`. Skipped entirely under reduced motion.

**C3. Static blur blob.** `w-[500px] h-[500px] bg-brand-green-soft rounded-full blur-3xl opacity-50` behind the hero — not animated, just soft-glow atmosphere.

### (d) Animated numbers / charts

Covered in A5 (drawing chart) and A6 (count-up). Also: the Budget Planner **preview card** renders a fake mini-budget (rows + result line) inside the 3D-tilt wrapper — the numbers there are static, the card motion sells it. The real /tools/budget calculator has **no** result animation (typed a value, sampled at 90 ms — result updates instantly, no roll). Our `AnimatedNumber` is ahead of them here.

### (e) Page-load sequences

No route transitions and no dedicated mount animations — the load-in feel comes free from the same primitives: above-fold `whileInView` fires immediately at mount, so every page loads as **word-mask headline rising (60 ms/word) → sub-elements rising in 0.1s-stepped stagger → hero photo settling 30px over 1.2s → ticker already scrolling → progress bar springing to position**. Below-fold content stays hidden (`opacity:0 translateY(28px)`) until scrolled to. SPA navigation just re-runs the target page's sequence.

### (f) Tiny UI accents (mostly static, part of the "alive" texture)

- **Numbered section kickers** (their `Ye`): `01` in amber + 40px hairline + uppercase tracked label — every section, gives the scroll a table-of-contents rhythm ("01 Why this matters", "02 Put it to work", "03 Run your own numbers", "04 The math, visualized").
- **Squiggle underline SVG** (their `X5`): gold hand-drawn stroke under hero phrases — static, no draw-in animation (ours could draw; theirs doesn't).
- **Wavy section divider** (their `Mc`): cream SVG wave edge between color bands (we already copied this for the math band).
- **Sticker chips**: "Term of the day" tab sitting half-out of its card border, "Open"/"Jargon-free" pills.
- **Floating info badges over the hero photo**: "203 guides, zero jargon" card (bottom-left) + tilted "FREE" amber sticker (top-right) — static, shadowed, on our banned list.
- **shadcn baseline**: `accordion-down/up` 0.2s, `animate-in/out` enter/exit for dialog/toast/dropdown, `animate-pulse`/`animate-spin` available (barely used).
- Trust-line micro-copy woven into motion surfaces (the ticker carrying "No tracking ✦ No ads") — motion as messaging, not decoration.

**Count: ~24 distinct effects** (6 scroll-linked, 10 hover families, 2 ambient, 2 number/chart, 1 load pattern, ~5 static accents that read as "designed").

---

## 2. Implementation shortlist for OUR site (ranked by impact ÷ effort)

House-rule constraints honored below: reduced-motion safe everywhere; no gradient washes over photos; Ticker stays rare (homepage + glossary only); no flat-AI tells; **any new global CSS/keyframes go immediately after the `ticker-scroll` keyframes block in `app/globals.css`** (dead-zone bug after it); verify motion in real headless Chrome, never the preview pane (rAF throttled there).

**1. Upgrade `Reveal.tsx`'s easing to `cubic-bezier(0.22, 1, 0.36, 1)`.** ✅ SHIPPED July 14, 2026 (550ms, offset bumped 14→20px). *Impact: high. Effort: one line.* This single curve is most of Base44's perceived polish — fast launch, long soft landing. Change `transition: opacity 550ms ease…` to `550ms cubic-bezier(0.22,1,0.36,1)` (or 500ms). Optionally bump the hidden offset 14px → 20px so the curve has room to breathe. Every existing Reveal sitewide instantly feels more expensive. Zero new code paths, reduced-motion already handled.

**2. Count-up on the homepage "library in numbers" grid.** ✅ SHIPPED (pre-pass — the six-cell grid already rolls via CountUp). *Impact: high. Effort: trivial — the component exists.* Base44 rolls 203/20/411/9 in its stats band; our six-cell numbers grid (guides/scholarships/opportunities/calculators/glossary/courses) is the exact same surface and currently static. Wire `components/CountUp.tsx` (or `AnimatedNumber`) into those cells: 900 ms, `1-(1-t)^3` ease-out, IO once with `-40px` margin, `toLocaleString`, instant-set under reduced motion. Also a candidate: the /students hero live stats. Real data only — the numbers already come from the libs.

**3. Photo micro-zoom + hidden-affordance line on poster cards.** ✅ SHIPPED July 14, 2026 (`motion-safe:group-hover:scale-[1.04]` on blog featured/grid + learn topic rows + homepage topic cards; hidden "Read the post" line on blog grid cards, opacity-only, focus-visible mirrored). *Impact: high. Effort: low, pure CSS.* Add `overflow-hidden` frames + `group-hover:scale-[1.04] transition-transform duration-300` (motion-safe variant: `motion-safe:group-hover:scale-[1.04]`) to blog poster/grid card images and the learn topic-row photos. Pair with Base44's B5 trick where a card has a quiet footer: `opacity-0 group-hover:opacity-100 transition-opacity` on a "Read the post" underline line. Composes with our existing card-ink lift; no new components.

**4. `ParallaxPhoto` primitive — the one-shot photo settle (A4).** ✅ SHIPPED July 14, 2026 (`components/ParallaxPhoto.tsx`; students hero, homepage mission + community band, topic-hub heroes, blog post heroes). *Impact: high (this is the "moves a bit when you scroll" feeling the owner noticed). Effort: medium — one small component.* Clone Reveal's architecture (IO once, armed-on-mount, CSS transition — **no rAF, so the preview pane can't lie about it**): wrapper `overflow-hidden`, `<Image>` styled `height: calc(100% + 48px)` with `transform: translateY(-24px)` → `translateY(0)` over 1.2s `cubic-bezier(0.22,1,0.36,1)` on first viewport entry (rootMargin -100px). Reduced motion / no-JS: static full-bleed image (SSR-visible like Reveal). Apply to: blog post hero images, the featured blog poster card, homepage community-band photo, topic-hub hero photos. Deliberately NOT a continuous scroll-scrub — cheaper, calmer, and matches what Base44 actually does.

**5. Ghost-TopicMark scroll drift for the color-field heroes we just shipped.** ✅ SHIPPED July 14, 2026 (`components/ScrollDrift.tsx`; 10 hero ghost layers, verified by scroll-diff in real headless Chrome). *Impact: medium-high (signature-adjacent but ours, not theirs). Effort: medium.* Base44 has nothing like our ghost marks — this is where we beat them at their own ambient game without copying shapes-confetti. A tiny `useParallaxDrift(ref, range=16)` hook: passive scroll listener + rAF, maps the hero's on-screen progress to `translateY(±16px)` on the `opacity-[0.07]` TopicMark/doodle layer only (never content). Gate on `matchMedia("(prefers-reduced-motion: no-preference)")`; bail entirely otherwise. **Verify in real headless Chrome** per house rule. Keep it to hero ghost layers so it stays a whisper.

**6. Topic-card hover-reveal detail line (B3, the tasteful half).** ⏸ DEFERRED July 14, 2026 — the `max-h` transition is a layout animation (violates the transform/opacity-only house rule), and the opacity-only variant reserves permanently blank space that touch users can never fill. Revisit only with a design that keeps the line in-flow. *Impact: medium-high. Effort: low, pure CSS.* On the homepage topic grid / learn hub cards: hidden one-liner (`max-h-0 opacity-0 → group-hover:max-h-16 group-hover:opacity-100 group-hover:mt-2, transition-all duration-300`) revealing the topic's "Start with: <first guide>" link. Skip the sliding photo-band half of their effect — layout-shifting cards that grow 112px cause reflow jump on a grid and read as showy; the text reveal alone is the good part. Must remain accessible: the link is still reachable via focus (`group-focus-within` mirror).

**7. Chart finish choreography — dot pops + area fade (A5 items 2–4).** ✅ ALREADY SHIPPED on CompoundChart (bars + area fade + dot pops all present). TrendChart dots deferred: its `viewBox 0 0 100 100` + `preserveAspectRatio="none"` would stretch circles into ellipses; its area-fade finish already exists. *Impact: medium. Effort: low — extends what Charts.tsx already does.* Our Donut/TrendChart/CompoundChart self-draw the line; Base44's chart feels more alive because things *land* after the draw: add (a) area-fill fade-in delayed until ~65% of the line draw, (b) data-point dots scaling 0→1 with 150 ms stagger timed to the draw passing them. CSS transitions/`transition-delay` on SVG transform-origin-center circles — no rAF. Homepage CompoundChart first, then TrendChart in calculators.

**8. Word-rise hero headline (`HeadlineRise`, A3 — heroes only).** ✅ SHIPPED July 14, 2026 (`components/HeadlineRise.tsx`; students, community, courses heroes — keep it to one headline per page). *Impact: medium-high. Effort: medium.* New small primitive for color-field hero H1s: split on words, each in an `overflow-hidden inline-block` mask, inner span transitions `translateY(100%) → 0` + opacity, 500 ms, 60 ms/word stagger, easeOutQuint — same armed-on-mount pattern as Reveal so SSR/no-JS renders visible text. **Use on page heroes only** — Base44 puts it on every H2 and it dulls; on one headline per page it's editorial. Reduced motion: static. (Screen readers: keep the split aria-hidden with an sr-only full-text span, or use `aria-label` on the H1.)

**9. One 3D tilt card — the Budget Planner preview in the math band (B2).** ✅ SHIPPED July 14, 2026 (`components/TiltCard.tsx` on the math-band CompoundChart card — our band has no budget-preview card, the chart card is its analog; still EXACTLY ONE sitewide). *Impact: medium (delight). Effort: low-medium.* We copied the math band's skeleton from Base44 already; this is its missing garnish. Small client component: `onMouseMove` maps cursor to `perspective(800px) rotateX/Y(±4°) scale(1.02)` set via inline style with a CSS `transition: transform 180ms ease-out` (no framer, no spring — preview-pane safe), flat on leave. Gate on `(hover: hover) and (pointer: fine)` + reduced motion. **Exactly one card sitewide** — that's what Base44 got right; a tilt everywhere is a portfolio-site tell.

**10. Glossary A–Z micro-interactions (B9).** ✅ SHIPPED July 14, 2026 (hero tiles scale-pop + forest fill — amber fill was invisible on the amber field; rail tiles scale-pop; section giant letters bump to amber on group-hover). *Impact: low-medium (but the glossary is a signature page for us). Effort: low.* Letter jump-tiles: `hover:bg-amber hover:text-ink motion-safe:hover:scale-110 transition`; section ghost letters bump opacity on group-hover. Fits our existing ghost-mark language.

**11. Reveal stagger discipline (usage pattern, not code).** ✅ ALREADY IN PLACE — audited July 14, 2026: every Reveal grid passes staggered delays (45–90ms steps). Base44 staggers grid siblings 60–120 ms and it reads as choreography; we often mount whole grids at `delay=0`. Adopt a convention: card grids pass `delay={i * 60}` capped at ~360 ms. Free polish with the existing prop.

**12. Journey milestone icon wiggle (B7 tail).** ✅ SHIPPED July 14, 2026 (JourneyPath checklist row icons, `motion-safe:group-hover:rotate-3` + scale). *Impact: low. Effort: trivial.* `motion-safe:group-hover:rotate-3 transition-transform` on JourneyPath node icons — pairs with the existing roadmap-pulse without new keyframes.

*(Deliberately not adopting their spring-smoothed progress bar: our ReadingProgress is article-only and 1:1 tracking is honest there — see skip list #4.)*

---

## 3. Skip list — Base44 effects we should NOT copy

1. **Ticker on every page with per-page copy (C1).** Direct violation of the July 2026 owner taste rule — three lookalike marquees were already built and reverted ("the same thing repeated"). A signature element stays special by staying rare. Homepage + glossary only, forever.
2. **Floating badge cards over the hero photo ("FREE" sticker, "203 guides" card).** Explicitly on our banned list from the second de-AI pass (slug-mart class tell). Their version confirms why: it reads template, not editorial.
3. **Floating ambient hero shapes (C2).** Low-opacity drifting circles/squares are the softest form of the decorative-blob AI tell, and four infinite framer loops run rAF forever on otherwise idle pages (measured 132 rAF callbacks during a single scroll pass). Our texture comes from the paper grain + ghost marks; adding drift-confetti would blur that identity. (The scroll-drift ghost mark in shortlist #5 is the tasteful cousin: tied to scroll, tied to content, one layer.)
4. **Sitewide scroll-progress bar (A1).** Progress means something on an article (we have ReadingProgress there); on a hub page it's decoration, and a permanently springing fixed bar is one more always-on animation. Also: spring smoothing on progress misreports position — mild dishonesty for style.
5. **Colored glow shadows on light cards (`hover:shadow-brand-*/30`, B7).** House rule: ink shadows only on light surfaces. Soft colored glows are also a flat-AI staple. Our card-ink hard-offset lift is the stronger move; keep it.
6. **Word-mask on every section H2.** Adopt for heroes only (shortlist #8). On all headings it becomes wallpaper by the third section and costs LCP-adjacent jank on long pages.
7. **The sliding photo-band card reveal (B3's h-0→h-28 half).** 112px of layout growth on hover shifts the whole grid row, causes pointer-position flicker at card edges, and hides content behind a hover (touch users never see those photos). Take the text-reveal half only.
8. **Emoji as card icons (👥 🔬 on the about/mission cards).** Banned: no emoji in UI copy. We have TopicMark/lucide.
9. **Blur-3xl color blobs (C3).** Gradient-wash adjacent; our paper grain + solid color fields do this job with more identity.
10. **Their stats accuracy, as a caution not an effect:** the counters animate 203 guides / 411 terms / 20 calculators — already stale against their own snapshot (we're at 217/413). Count-up surfaces (shortlist #2) must keep pulling live counts from the libs, never hardcoded targets — an animated wrong number is worse than a static one.
11. **No-op adoption traps:** they have no tap/press states, no route transitions, and no calculator result animation — nothing to copy there; our AnimatedNumber + BadgeBurst already exceed them on (d) and their absence of `active:` states is a gap, not a model.

---

### Appendix: their primitive → ours, at a glance

| Base44 primitive (minified name) | Spec | Our counterpart | Verdict |
|---|---|---|---|
| `Q` reveal | y28, 0.5s, easeOutQuint, -60px, once | `Reveal.tsx` (y14, 550ms, ease) | Keep ours, steal the curve (#1) |
| `Wt` word-mask headline | 0.5s, 60ms/word stagger | — | Adopt, heroes only (#8) |
| `th` ParallaxImage | +60px tall, y-30→0, 1.2s | — | Adopt as ParallaxPhoto (#4) |
| `hm` CountUp | 900ms rAF, cubic ease-out | `CountUp.tsx` / `AnimatedNumber` | Wire onto homepage numbers (#2) |
| `Aw` drawing chart | pathLength 1.8s + bars + dots | `Charts.tsx` self-draw | Add dot/area finish (#7) |
| `mm` 3D tilt | ±4°, spring 300/20 | — | One card only (#9) |
| `zn` ticker | 30s linear, every page | `Ticker.tsx` (55s, hover-pause, 2 pages) | Ours is better-behaved; do NOT spread |
| `Rw` floating shapes | 10–15s loops | ghost TopicMarks (static) | Skip; do scroll-drift ghosts instead (#5) |
| scroll progress spring | useSpring 120/30 | `ReadingProgress` (articles) | Keep article-only |
| `Ye` numbered kickers | static | our plain kickers | Optional taste call, not motion |
