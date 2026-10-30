import { expect, test } from "@playwright/test";

test.describe("booking", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#book");
  });

  test("defaults to Wednesday at 20:00 and follows availability", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Wed 28 October, 13 left" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.getByRole("button", { name: "Fri 30 October, Full" })).toBeDisabled();
    await page.getByRole("button", { name: "Sun 25 October, 2 left" }).click();
    await expect(page.getByRole("button", { name: /17:30/ })).toBeDisabled();
    await expect(page.getByRole("button", { name: /20:00/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.getByRole("button", { name: "Add a guest" })).toBeDisabled();
    await page.getByRole("button", { name: "Sat 31 October, 4 left" }).click();
    await expect(page.getByText("1 guest · Sat 31 Oct · 20:00")).toBeVisible();
    await expect(page.getByText("¥5,000 hold")).toBeVisible();
  });

  test("warns about the swell on Thursday", async ({ page }) => {
    await page.getByRole("button", { name: "Thu 29 October, Swell watch" }).click();
    await expect(page.getByText(/Swell of 2\.1 m forecast/)).toBeVisible();
  });

  test("validates the email before printing", async ({ page }) => {
    const submit = page.getByRole("button", { name: "Book a table", exact: true }).last();
    await submit.click();
    await expect(page.locator("#book").getByRole("alert")).toHaveText(
      "Enter an email so we can send your table note.",
    );
    await expect(page.getByLabel("Email for the table note")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await page.getByLabel("Email for the table note").fill("yuki@domain");
    await expect(page.locator("#book").getByRole("alert")).toHaveCount(0);
    await submit.click();
    await expect(page.locator("#book").getByRole("alert")).toHaveText(
      "That email looks incomplete. Try name@domain.com.",
    );
  });

  test("prints the table note and lets the guest change details", async ({ page }) => {
    await page.getByRole("button", { name: "Add a guest" }).click();
    await page.getByLabel("Email for the table note").fill("yuki@example.jp");
    await page.getByRole("button", { name: "Book a table", exact: true }).last().click();
    await expect(page.getByText("Printing your table note")).toBeVisible();
    const status = page.getByRole("status");
    await expect(status).toContainText(
      "Your table note is issued for Wednesday 28 October at 20:00.",
    );
    await expect(status).toContainText("the ¥15,000 hold comes back by 09:00");
    await expect(status).toBeFocused();
    await expect(status.getByText(/^SS 2610 \d{4}$/)).toBeVisible();
    await page.getByRole("button", { name: "Change details" }).click();
    await expect(page.getByLabel("Email for the table note")).toHaveValue("yuki@example.jp");
  });
});
