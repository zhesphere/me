import { expect, test } from "@playwright/test";

function luminance(hex: string) {
  const rgb = hex.match(/\w\w/g)?.map((part) => Number.parseInt(part, 16) / 255);
  if (!rgb || rgb.length !== 3) throw new Error(`Expected hexadecimal color, received ${hex}`);
  const linear = rgb.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  const [red, green, blue] = linear as [number, number, number];
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(foreground: string, background: string) {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a) as [number, number];
  return (light + 0.05) / (dark + 0.05);
}

test("makes the statement and reading action the stable first-screen hierarchy", async ({ page }) => {
  await page.goto("/");
  const title = page.getByRole("heading", { name: /在技术与想象之间/ });
  const blog = page.getByRole("link", { name: /阅读博客/ });
  await expect(title).toBeVisible();
  await expect(blog).toBeVisible();
  await expect(page.getByRole("link", { name: "GitHub", exact: true })).toBeVisible();
  await expect(page.locator(".system-state, .hero-meta, .visual-label")).toHaveCount(0);

  const titleBox = await title.boundingBox();
  const blogBox = await blog.boundingBox();
  expect(titleBox?.y).toBeLessThan(blogBox?.y ?? 0);
  const expectedLedeSize = (page.viewportSize()?.width ?? 1440) <= 700 ? "15px" : "17px";
  await expect(page.locator(".hero-lede")).toHaveCSS("font-size", expectedLedeSize);
  expect(contrast("d7ddec", "080b14")).toBeGreaterThanOrEqual(7);
  expect(contrast("061015", "6ce5ee")).toBeGreaterThanOrEqual(4.5);
});

test("presents one clear editorial journey with the new blog destination", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "正在抵达的思考。" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /让不同的引力/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /把仍在生长的好奇心/ })).toBeVisible();
  await expect(page.locator(".portal-grid, .portal-card")).toHaveCount(0);
  await expect(page.locator('a[href^="https://blog.orbitvo.com/"]')).toHaveCount(7);
  await expect(page.getByRole("link", { name: "全部文章" })).toHaveAttribute("href", "https://blog.orbitvo.com/");
});

test("keeps the complete first-screen story readable on a 360px phone", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /在技术与想象之间/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /阅读博客/ })).toBeInViewport();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
  await expect(page.locator(".hero-lede")).toHaveCSS("font-size", "15px");
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThanOrEqual(3900);
  await expect(page.locator("#starfield")).toHaveAttribute("data-star-count", "12");
});

test("uses a smaller mobile star budget and pauses it while the page is hidden", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const desktopStars = Number(await page.locator("#starfield").getAttribute("data-star-count"));

  await page.setViewportSize({ width: 360, height: 800 });
  await expect(page.locator("#starfield")).toHaveAttribute("data-star-count", "12");
  expect(desktopStars).toBeGreaterThan(12);

  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator("#starfield")).toHaveAttribute("data-starfield-paused", "");
});

test("keeps a visible keyboard path from navigation to the primary and secondary action", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "返回主页顶部" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Blog", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "GitHub", exact: true }).first()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: /阅读博客/ })).toBeFocused();
  await expect(page.locator(":focus-visible")).toHaveCSS("outline-style", "solid");
});

test("honors reduced motion preference", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".ring-outer")).toHaveCSS("animation-iteration-count", "1");
});

test("keeps the redesigned story readable without horizontal overflow", async ({ page }) => {
  await page.goto("/#writing");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
  await expect(page.locator(".signal-layout")).toBeVisible();
  await expect(page.locator(".coordinate-point")).toHaveCount(4);
  const bodySize = Number.parseFloat(await page.locator(".about-copy > p:not(.eyebrow)").evaluate((element) => getComputedStyle(element).fontSize));
  expect(bodySize).toBeGreaterThanOrEqual((page.viewportSize()?.width ?? 1440) <= 700 ? 15 : 16);
});
