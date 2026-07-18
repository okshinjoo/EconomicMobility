# Scholarship coverage map — audit matrix (July 18, 2026)

The scholarship finder (`lib/scholarships.ts`) reached the point where "find
more" stopped being the right question. This is the **audit** that replaced
mining: instead of hunting for more entries, we swept an audience × field
matrix and marked every cell as **covered**, a **gap** (→ added), or
**confirmed-empty** (checked, and there genuinely is no qualifying program).

"Exhaustive" is now a provable claim, not a hope: for the cells below we can
say *why* they're empty, not just that we didn't find anything.

## Method
1. Built a coverage heatmap by tagging all existing entries (audience + field
   keyword match). Deep on low-income (219), disability (100), military family
   (89); 696 entries are field-agnostic ("any major").
2. The fillable gaps clustered in **identity × profession**. Sent researchers
   at those; sent one at confirming the situation-based cells are empty.
3. Each cell resolved to add / grad-only / no-program / already-covered.
4. Adds ran the normal dedup → editorial → gauntlet → ship pipeline.

## Confirmed-empty cells (the deliverable)

### Grad-only — a program exists, but serves graduate/professional students
Our audience is HS/undergrad/transfer, so these are empty **for us** by design.
The pipeline org is real; it just isn't for undergrads.
- Latino × law (HNBA — law students/attorneys only) · Latino × arts (Nat'l
  Hispanic Foundation for the Arts — grad; undergrad covered by Latin GRAMMY)
- Black × medicine (SNMA — med students)
- AAPI × medicine (APAMSA/CAMS — med/dental students) · AAPI × law (NAPABA,
  Don H. Liu — 1L+ only, widely mis-described online as undergrad)
- Native × law (NNABA — bar-prep for 3Ls)
- Undocumented × law (Immigrants Rising Pre-Law Fund discontinued Fall 2025;
  law is structurally grad)
- Women × law · women × medicine (women's bar / women physicians — grad)
- LGBTQ+ × law (Lavender Law) · × medicine (GLMA) · × business (ROMBA) ·
  × teaching (CTA LGBTQ+ — professional)
- Justice-impacted × law/reentry (NYU PREP, Seattle U Full Circle — JD-only)

### No program found — genuinely no qualifying national/state undergrad award
- Foster youth × nursing / teaching / business / STEM (foster aid is
  situation-based, not field-specific)
- Single parents × nursing (Mary Blake defunct 2017) · × business
- Latino × public service / environment / computing / nursing / business /
  journalism — NOTE several of these are actually **already covered** by
  existing entries (ALPFA/Prospanica business, NAHJ journalism, NAHN nursing);
  the "no new program" verdict means no *additional* qualifying award, not zero
  coverage
- Black × skilled trades / agriculture / culinary (CIA Cameron Thompson is
  single-institution) / public service (beyond NFBPA & NABCJ, now added)
- Native × STEM/engineering (AISES already listed) · medicine (IHS already
  listed) · public service (Udall already listed)
- Women × nursing / journalism / aviation / public service (partisan-only
  option excluded on nonpartisan-site grounds)
- LGBTQ+ × computing / arts

### General-only — the audience is served, but by field-agnostic awards
- Homeless/housing-insecure × any field · young caregivers × any field ·
  justice-impacted × any field (general) · health-condition × field (condition-
  based, not field-based) · undocumented × nursing / business / teaching

## Adds from this audit (25, → 1,375)
Latino dental (HDAF), two DACA-explicit LMSA pre-med regional awards (a
deliberate mission exception to the no-regional rule — undocumented pre-med is
otherwise unserved), Black public service (NFBPA, NABCJ) / environment (TMCF
Ecology, Black & Latinx Birders) / arts (NAACP × Society) / social work (NABSW)
/ allied health (Creary/NMF), AAPI business (USPAACC) / nursing (AAPINA) / STEM
(SASE) / arts (Against the Grain), Native business (AIBL) / environment (NAFWS)
/ nursing (NANAINA) / arts (Plimpton), women in business (Forté) / agriculture
(Daughters of Ag) / trades (Hourglass), LGBTQ+ STEM (oSTEM), plus a Type 1
diabetes health-fields award and a single-parent STEM award.

## What "not added" taught us
- **Veteran × field is mostly non-scholarship resources.** The veteran field
  hits were placement programs (Helmets to Hardhats), business grants
  (StreetShares, Farmer Veteran Coalition), and bootcamps (Code Platoon) —
  real, but not college scholarships. They belong in the Opportunity Finder.
- **Data-harvesting sweepstakes and paid-membership gates** remain the top
  false positives across every beat and are always cut.

## Next step
The matrix is substantially covered. The remaining work is **maintenance**:
the annual re-verify pass (see `lib/freshness.ts`) plus a small yearly top-up
for newly launched programs. Re-run this audit when a new audience or field
emerges, not on a calendar.
