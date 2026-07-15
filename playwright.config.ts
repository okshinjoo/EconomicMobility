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

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 8_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
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
          timeout: 120_000,
        },
      }
    : {}),
});
