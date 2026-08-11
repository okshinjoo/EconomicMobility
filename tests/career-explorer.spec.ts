import { expect, test } from "@playwright/test";

test.describe("Career Explorer decision journey", () => {
  test("loads official state and metro pay on a career profile", async ({ page }) => {
    await page.goto("/students/career-explorer/electrician");

    await expect(page.getByRole("heading", { name: "Electrician", level: 1 })).toBeVisible();
    const state = page.getByRole("combobox", { name: "State", exact: true }).first();
    const metro = page.getByRole("combobox", { name: "Metro", exact: true });

    await state.selectOption("CA");
    await expect(metro).toBeEnabled();
    await expect(metro.locator("option")).toHaveCount(26);
    await metro.selectOption("0031080");

    await expect(page.getByText("$73,810", { exact: true })).toBeVisible();
    await expect(page.getByText(/above the national median/)).toBeVisible();
  });

  test("creates and persists an editable plan", async ({ page }) => {
    await page.goto("/students/career-explorer/plan?career=electrician");

    await expect(page.getByRole("combobox", { name: "Career" })).toHaveValue("electrician");
    await expect(page.locator('textarea[aria-label="Plan step"]')).toHaveCount(5);
    await page.getByRole("button", { name: /Mark complete: Read the full Electrician profile/ }).click();
    await expect(page.getByText("1 of 5 done", { exact: true })).toBeVisible();

    await page.reload();
    await expect(page.getByText("1 of 5 done", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: /Mark incomplete: Read the full Electrician profile/ })).toBeVisible();
  });

  test("career discovery remains usable on a phone-sized screen", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/students/career-explorer");

    await expect(page.getByRole("heading", { name: /What does that job/ })).toBeVisible();
    await expect(page.getByRole("searchbox", { name: "Search careers" })).toBeVisible();
    await page.getByRole("searchbox", { name: "Search careers" }).fill("electrician");
    await expect(page.getByText("Electrician", { exact: true }).first()).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
