import { test, expect } from "@playwright/test";

// Public-route regression suite (QA plan: footer integrity, /account content,
// unique titles + heroes, no duplicate promo rows, malformed-copy heuristics).
// All assertions target rendered, browser-visible DOM/text — no console or
// network-internals reliance. Expected values mirror the site's real strings.

const FOOTER_LINKS: [string, string][] = [
  ["Credit Scores", "/learn/credit"],
  ["Budgeting", "/learn/budgeting"],
  ["Investing", "/learn/investing"],
  ["All Topics", "/learn"],
  ["Glossary", "/glossary"],
  ["Tools & Calculators", "/tools"],
  ["Free Templates", "/tools/templates"],
  ["Resources", "/resources"],
  ["Ask a Question", "/ask"],
  ["Take the Quiz", "/quiz"],
  ["Our Mission", "/about"],
  ["Who We Are", "/who-we-are"],
  ["Contact", "/contact"],
  ["Your Account", "/account"],
  ["Privacy", "/privacy"],
];

const ROUTES: Record<string, { title: string; h1: string | RegExp }> = {
  "/": {
    title: "Empower | Economic Mobility Project",
    h1: /Your money\. Your future\./,
  },
  "/account": {
    title: "Your Account | Empower — Economic Mobility Project",
    h1: /Your Account|Your progress, wherever you are\./,
  },
  "/about": {
    title: "Our Mission | Empower — Economic Mobility Project",
    h1: /Financial freedom shouldn.t be a[\s\S]*family secret\./,
  },
  "/who-we-are": {
    title: "Who We Are | Empower — Economic Mobility Project",
    h1: /The person behind the[\s\S]*project\./,
  },
  "/challenges": {
    title: "Challenges | Empower — Economic Mobility Project",
    h1: /Doing beats/,
  },
  "/community": {
    title: "Community | Empower — Economic Mobility Project",
    h1: /Learning out loud, together\./,
  },
  "/privacy": {
    title: "Privacy Policy | Empower — Economic Mobility Project",
    h1: /Privacy policy\. The short version/,
  },
};

// ---- FT-01/02/03/04: footer labels match destinations ----------------------
test.describe("footer", () => {
  test("renders on every route with the 3 groups", async ({ page }) => {
    for (const route of Object.keys(ROUTES)) {
      await page.goto(route);
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
      for (const group of ["Learn", "Explore", "About"])
        await expect(footer.getByText(group, { exact: true })).toBeVisible();
    }
  });

  for (const [label, href] of FOOTER_LINKS) {
    test(`"${label}" points to ${href}`, async ({ page }) => {
      await page.goto("/");
      const link = page
        .locator("footer")
        .getByRole("link", { name: label, exact: true });
      await expect(link).toHaveAttribute("href", href);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`${href.replace(/\//g, "\\/")}\\/?$`));
      await expect(page.locator("body")).not.toContainText("404");
    });
  }

  test("no duplicate footer labels", async ({ page }) => {
    await page.goto("/");
    const labels = await page.locator("footer").getByRole("link").allInnerTexts();
    const cleaned = labels.map((l) => l.trim()).filter(Boolean);
    expect(new Set(cleaned).size).toBe(cleaned.length);
  });
});

// ---- AC-01/02: /account has meaningful visible content (either state) ------
test("/account shows meaningful content in either backend state", async ({ page }) => {
  await page.goto("/account");
  await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
    ROUTES["/account"].h1
  );
  const markers = page.getByText(
    /Sign in|Create account|Forgot your password|without an account|works with no account/i
  );
  await expect(markers.first()).toBeVisible();
  // The visible h1 + a real affordance above is the "meaningful content"
  // signal; also guard against a page stuck on a loading spinner. (Pages here
  // have no <main> landmark, so scope to body.)
  await expect(
    page.locator("body [role=progressbar], body .animate-spin")
  ).toHaveCount(0);
});

// ---- TT-01 + HR-01/02: correct + unique titles and heroes ------------------
test("titles and heroes are correct and unique across routes", async ({ page }) => {
  const seenTitles = new Map<string, string>();
  const seenHeroes = new Map<string, string>();
  for (const [route, exp] of Object.entries(ROUTES)) {
    await page.goto(route);
    await expect(page).toHaveTitle(exp.title);

    const h1 = page.getByRole("heading", { level: 1 }).first();
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText(exp.h1);
    const heroText = (await h1.innerText()).replace(/\s+/g, " ").trim();

    // HR-02: hero string appears exactly once on the page
    expect(
      await page.locator("body").getByText(heroText, { exact: true }).count()
    ).toBe(1);

    // TT-01 / HR-01: cross-route uniqueness
    const title = await page.title();
    expect(seenTitles.has(title), `duplicate title with ${seenTitles.get(title)}`).toBeFalsy();
    expect(seenHeroes.has(heroText), `duplicate hero with ${seenHeroes.get(heroText)}`).toBeFalsy();
    seenTitles.set(title, route);
    seenHeroes.set(heroText, route);
  }
});

// ---- DP-01: no duplicated promotional rows within a page -------------------
test("no duplicated promo rows on marketing pages", async ({ page }) => {
  for (const route of ["/", "/community", "/challenges"]) {
    await page.goto(route);
    const blocks = await page.locator("body section").allInnerTexts();
    const normalized = blocks
      .map((b) => b.replace(/\s+/g, " ").trim())
      .filter((b) => b.length > 40);
    expect(
      new Set(normalized).size,
      `duplicate <section> content on ${route}`
    ).toBe(normalized.length);
  }
});

// ---- CP-01/02: malformed-copy heuristics (visible text only) ---------------
test("no malformed public copy", async ({ page }) => {
  const BAD: RegExp[] = [
    /\bis where the group part happens/, // CP-02: the fixed splice must stay fixed
    /undefined|NaN|\[object Object\]/, // placeholder / render leaks
    /\{"\s*"\}/, // literal JSX whitespace token leaking into text
  ];
  for (const route of Object.keys(ROUTES)) {
    await page.goto(route);
    const text = await page.locator("body").innerText();
    for (const rx of BAD)
      expect(text, `${route} contains ${rx}`).not.toMatch(rx);
    for (const heading of await page.getByRole("heading").allInnerTexts())
      expect(heading.trim().length, `empty heading on ${route}`).toBeGreaterThan(0);
  }
});
