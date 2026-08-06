import { expect, test } from "@playwright/test";

test("opens and closes the blog panel with focus restoration", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("link", { name: /BLOG.*SIGNAL/i });
  await trigger.click();
  const panel = page.locator("#panel-blog");
  await expect(panel).toHaveAttribute("aria-hidden", "false");
  await expect(page.getByRole("button", { name: "关闭博客面板" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(panel).toHaveAttribute("aria-hidden", "true");
  await expect(trigger).toBeFocused();
});

test("offers working external destinations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /GITHUB.*SOURCE/i })).toHaveAttribute("href", "https://github.com/zhesphere");
  await page.getByRole("link", { name: /ABOUT.*ORIGIN/i }).click();
  await expect(page.locator("#panel-about .about-links a").filter({ hasText: "Blog" })).toHaveAttribute("href", "https://blog.zsphere.top/");
});

test("keeps the main experience inside the viewport", async ({ page }) => {
  await page.goto("/");
  const box = await page.locator(".universe").boundingBox();
  expect(box?.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  await expect(page.locator(".portal-node").first()).toHaveCSS("min-height", "64px");
});

test("honors reduced motion preference", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".orbital-system")).toHaveCSS("animation-iteration-count", "1");
});
