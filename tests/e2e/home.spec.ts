import { expect, test } from "@playwright/test";

test("renders a stable primary navigation instead of moving link cards", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /在技术与想象之间/ })).toBeVisible();

  const cards = page.locator(".portal-card");
  await expect(cards).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    await expect(cards.nth(index)).toBeVisible();
    await expect(cards.nth(index)).toHaveCSS("position", "relative");
  }
});

test("offers working external destinations and an in-page about link", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /GitHub.*开源代码与实验/i })).toHaveAttribute("href", "https://github.com/zhesphere");
  await expect(page.getByRole("link", { name: /博客.*文章与思考/i })).toHaveAttribute("href", "https://blog.zsphere.top/");

  await page.getByRole("link", { name: /关于我.*这颗星球的来历/i }).click();
  await expect(page.locator("#about")).toBeInViewport();
});

test("keeps cards readable and non-overlapping on a phone viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const cards = page.locator(".portal-card");
  const boxes = await cards.evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().toJSON()));
  expect(boxes).toHaveLength(3);
  for (let index = 1; index < boxes.length; index += 1) {
    expect(boxes[index].top).toBeGreaterThanOrEqual(boxes[index - 1].bottom);
  }
  await expect(page.locator("body")).not.toHaveCSS("overflow-x", "scroll");
});

test("honors reduced motion preference", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".ring-outer")).toHaveCSS("animation-iteration-count", "1");
});
