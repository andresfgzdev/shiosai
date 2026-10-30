import { expect, test } from "@playwright/test";

test.describe("mobile menu", () => {
  test.skip(
    ({ viewport }) => (viewport?.width ?? 1440) > 860,
    "the burger only exists under 860px",
  );

  test("opens, traps the page and closes with Escape", async ({ page }) => {
    await page.goto("/");
    const burger = page.getByRole("button", { name: "Open menu" });
    await burger.click();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(page.locator("#main")).toHaveAttribute("inert", "");
    await expect(
      page.locator("#mobile-menu").getByRole("link", { name: "The voyage" }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    await expect(page.locator("#main")).not.toHaveAttribute("inert", "");
  });

  test("navigates from the overlay", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator("#mobile-menu").getByRole("link", { name: "Tide menu" }).click();
    await expect(page).toHaveURL(/#menu$/);
    await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
