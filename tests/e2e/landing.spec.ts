import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

async function settle(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2500);
}

test.describe("landing", () => {
  test("renders every region with one h1 and runs its entrance motion", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Tonight's dinner left the harbour at five this morning.",
    );
    for (const id of ["top", "voyage", "menu", "storm", "guests", "book", "faq", "visit"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    const animation = await page
      .getByRole("navigation", { name: "Primary" })
      .evaluate((nav) => getComputedStyle(nav).animationName);
    expect(animation).toBe("nav-in");
  });

  test("toggles UV light across the page and keeps it for the session", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "UV light" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("html")).toHaveAttribute("data-uv", "");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-uv", "");
    await page.getByRole("button", { name: "UV light" }).click();
    await expect(page.locator("html")).not.toHaveAttribute("data-uv", "");
  });

  test("moves through the voyage with buttons, dots and keys", async ({ page }) => {
    await page.goto("/#voyage");
    const status = page.getByText(/^Note [IV]+ of IV$/);
    await expect(status).toHaveText("Note I of IV");
    await page.getByRole("button", { name: "Next note" }).click();
    await expect(status).toHaveText("Note II of IV");
    await page.getByRole("button", { name: "Go to note IV" }).click();
    await expect(status).toHaveText("Note IV of IV");
    await expect(page.getByRole("button", { name: "Next note" })).toBeDisabled();
    await page.getByRole("region", { name: "The voyage, four notes" }).press("ArrowLeft");
    await expect(status).toHaveText("Note III of IV");
  });

  test("holds the storm watermark to the light", async ({ page }) => {
    await page.goto("/#storm");
    const hold = page.getByRole("button", { name: "Hold it to the light" });
    await hold.click();
    await expect(page.getByRole("button", { name: "Put the note down" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  test("opens and closes questions", async ({ page }) => {
    await page.goto("/#faq");
    const first = page.locator("details").first();
    await expect(first).toHaveAttribute("open", "");
    await page.getByText("What does the tide menu cost?").click();
    await expect(page.getByText("¥16,500 per guest for nine courses.")).toBeVisible();
  });

  test("has no serious accessibility violations in day and UV", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    const day = await new AxeBuilder({ page }).analyze();
    expect(day.violations.filter((v) => v.impact === "serious" || v.impact === "critical")).toEqual(
      [],
    );
    await page.getByRole("button", { name: "UV light" }).click();
    await page.waitForTimeout(1500);
    const uv = await new AxeBuilder({ page }).analyze();
    expect(uv.violations.filter((v) => v.impact === "serious" || v.impact === "critical")).toEqual(
      [],
    );
  });

  test("serves structured data and crawl files", async ({ page, request }) => {
    await page.goto("/");
    const json = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(json ?? "[]");
    expect(data.map((entry: { "@type": string }) => entry["@type"])).toEqual([
      "Restaurant",
      "FAQPage",
    ]);
    expect((await request.get("/robots.txt")).ok()).toBe(true);
    expect((await request.get("/sitemap.xml")).ok()).toBe(true);
    expect((await request.get("/opengraph-image")).headers()["content-type"]).toContain(
      "image/png",
    );
  });

  test("shows the retired note for unknown routes", async ({ page }) => {
    const response = await page.goto("/nope");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "This note went out with the tide.",
    );
    await page.getByRole("link", { name: "Back to tonight's table" }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("shows everything still and lit", async ({ page }) => {
    await page.goto("/");
    const hidden = await page
      .locator(".reveal")
      .evaluateAll(
        (nodes) => nodes.filter((node) => getComputedStyle(node).opacity !== "1").length,
      );
    expect(hidden).toBe(0);
    const dim = await page
      .locator("[data-w]")
      .evaluateAll(
        (nodes) => nodes.filter((node) => getComputedStyle(node).opacity !== "1").length,
      );
    expect(dim).toBe(0);
  });
});
