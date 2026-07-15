# Public-route regression suite

Browser-visible Playwright checks for the public routes: footer label→destination
integrity, `/account` meaningful content (both backend states), unique page
titles + heroes, no duplicate promo rows, and malformed-copy heuristics.

Every assertion targets rendered DOM/visible text — no console or network
internals. Expected strings mirror the site's real copy.

## Run it

First time only:

```bash
npm install
npx playwright install chromium
```

Against the **deployed site** (fastest — no local build):

```bash
BASE_URL=https://economicmobilityproject.org npm run test:e2e
```

Against a **local production build**:

```bash
npm run build
START_SERVER=1 npm run test:e2e      # Playwright boots `next start` for you
```

Watch it in a real browser window:

```bash
BASE_URL=https://economicmobilityproject.org HEADED=1 npm run test:e2e:headed
```

> The Turbopack **dev** server is intentionally not used here — it's memory-heavy
> on low-RAM machines. Prefer a deployed URL or a built server.

## CI

`.github/workflows/regression.yml` runs the suite on every push to `main` and on
PRs (builds the app + boots `next start`). You can also trigger it manually
("Run workflow") and pass a `base_url` to test a live/preview URL directly.
The HTML report uploads as a build artifact.

## When copy or routes change

Update the ground-truth tables at the top of `regression.spec.ts`
(`FOOTER_LINKS`, `ROUTES`) so expected titles/heroes/destinations stay in sync.
