import { expect, test } from "@playwright/test";

test("keeps the identity, statement, and real destinations clear", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "返回 Orbitvo 首页顶部" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /在技术与想象之间/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /阅读博客/ })).toHaveAttribute("href", "https://blog.orbitvo.com/");
  await expect(page.getByRole("link", { name: /GitHub/ }).first()).toHaveAttribute("href", "https://github.com/zhesphere");
  await expect(page.locator('a[href="#"], a[href^="mailto:"]')).toHaveCount(0);
});

test("uses the existing feed for three real article cards", async ({ page }) => {
  await page.goto("/#writing");

  await expect(page.getByRole("heading", { name: "正在抵达的思考。" })).toBeVisible();
  await expect(page.locator(".article-card")).toHaveCount(3);
  const articleLinks = await page.locator(".article-card").evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href));
  expect(articleLinks.every((href) => href.startsWith("https://blog.orbitvo.com/"))).toBe(true);
  await expect(page.locator(".feed-source")).toContainText(/FEED SOURCE \/ (FEED|FALLBACK)/);
  await expect(page.getByRole("link", { name: "RSS", exact: true })).toHaveAttribute("href", "https://blog.orbitvo.com/rss.xml");
});

test("forms one editorial journey without invented portfolio content", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /把仍在生长的好奇心/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "沿着真实的记录，继续探索。" })).toBeVisible();
  await expect(page.locator(".coordinate-list > div")).toHaveCount(4);
  await expect(page.getByText("Mori", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Orbit OS", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Field Notes", { exact: true })).toHaveCount(0);
});

test("keeps every target viewport free of horizontal overflow", async ({ page }) => {
  for (const viewport of [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
  }
});

test("keeps the mobile introduction readable and the hero art composed", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");

  await expect(page.locator(".hero-lede")).toHaveCSS("font-size", "15px");
  await expect(page.locator(".article-visual").first()).toHaveCSS("border-radius", "14px");
  const hero = await page.locator(".hero").boundingBox();
  const art = await page.locator(".hero-art").boundingBox();
  const star = await page.locator(".star-sculpture").boundingBox();
  expect(hero).not.toBeNull();
  expect(art).not.toBeNull();
  expect(star).not.toBeNull();
  expect(star!.x).toBeGreaterThanOrEqual(0);
  expect(star!.x + star!.width).toBeLessThanOrEqual(360);
  expect(art!.y).toBeGreaterThan(hero!.y);
});

test("keeps the wide layout editorial rather than stretching without limit", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");

  const header = await page.locator(".site-header").boundingBox();
  const hero = await page.locator(".hero").boundingBox();
  const cards = await page.locator(".article-grid").boundingBox();
  for (const box of [header, hero, cards]) {
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(1181);
    expect(box!.x).toBeGreaterThan(300);
  }
  await expect(page.locator(".article-grid")).toHaveCSS("grid-template-columns", /.+ .+ .+/);
});

test("switches theme accessibly and persists the choice", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "切换至深色模式" });
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "切换至浅色模式" })).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#111722");
});

test("provides a visible keyboard route through the primary controls", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "返回 Orbitvo 首页顶部" })).toBeFocused();
  const navVisible = await page.locator(".nav-links").isVisible();
  if (navVisible) {
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "文章", exact: true })).toBeFocused();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
  }
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: /切换至/ })).toBeFocused();
  await expect(page.locator(":focus-visible")).toHaveCSS("outline-style", "solid");
});

test("keeps touch targets at least 44px where controls are compact", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  for (const locator of [
    page.getByRole("button", { name: /切换至/ }),
    page.getByRole("link", { name: "Blog", exact: true }).first(),
    page.getByRole("link", { name: /阅读博客/ }),
    page.getByRole("link", { name: /GitHub/ }).first()
  ]) {
    const box = await locator.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
});

test("honors reduced motion without hiding the star composition", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator(".star-sculpture")).toBeVisible();
  await expect(page.locator(".star-sculpture")).toHaveCSS("animation-iteration-count", "1");
  await expect(page.locator(".star-body")).toHaveCSS("animation-iteration-count", "1");
});
