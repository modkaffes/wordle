import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have a title", async ({ page }) => {
    expect(await page.title()).toBe("Wordle Clone");
  });
});
