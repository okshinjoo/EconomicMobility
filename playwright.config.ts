import { defineConfig, devices } from "@playwright/test";

// Regression suite for the public routes (see tests/regression.spec.ts).
//
// Point it at any environment with BASE_URL:
//   BASE_URL=https://economicmobilityproject.org npm run test:e2e   # deployed
//   BASE_URL=http://localhost:3000 npm run test:e2e                 # local
//
// If BASE_URL is unset AND you're testing locally, set START_SERVER=1 to have
// Playwright boot `next start` for you (needs a prior `npm run build`). We keep
// the dev server OUT of the default path because Turbopack dev is memory-heavy
// on low-RAM machines — prefer a built server or a deployed URL.

// `||` not `??`: the CI workflow passes BASE_URL as an empty string "" on PR
// events (no base_url input), and "" must fall back to localhost — otherwise
// page.goto("/") has no base and throws "Cannot navigate to invalid URL".
const BASE_URL = process.env.BASE_URL?.trim() || "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  // In CI, run SERIALLY against the single `next start` server. Parallel
  // workers hammering one server on a shared runner caused a timeout cascade;
  // one worker is robust and still finishes in ~2-3 min. Local keeps parallel.
  fullyParallel: !process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: BASE_URL,
    // Browser-visible by design: default to real Chromium, trace on first retry.
    headless: process.env.HEADED ? false : true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  ...(process.env.START_SERVER
    ? {
        webServer: {
          command: "npm run start",
          url: BASE_URL,
          reuseExistingServer: !process.env.CI,
          timeout: 180_000,
        },
      }
    : {}),
});
