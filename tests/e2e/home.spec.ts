import { expect, test } from "@playwright/test";

test("opens and closes the blog panel with focus restoration", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("link", { name: /WRITING.*博客.*文章与思考/i });
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
  await expect(page.getByRole("link", { name: /BUILDING.*GitHub.*开源代码与实验/i })).toHaveAttribute("href", "https://github.com/zhesphere");
  await page.getByRole("link", { name: /ORIGIN.*关于我.*这颗星球的来历/i }).click();
  await expect(page.locator("#panel-about .about-links a").filter({ hasText: "Blog" })).toHaveAttribute("href", "https://blog.zsphere.top/");
});

test("keeps the main experience inside the viewport", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "ORBITVO" })).toBeVisible();
  const box = await page.locator(".universe").boundingBox();
  expect(box?.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  await expect(page.locator(".portal-node").first()).toHaveCSS("min-height", "64px");
});

test("honors reduced motion preference", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".orbital-system")).toHaveCSS("animation-iteration-count", "1");
});
