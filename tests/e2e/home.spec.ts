import { expect, test } from "@playwright/test";

test("keeps the identity, statement, and real destinations clear", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "返回 Orbitvo 首页顶部" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "ORBITVO", exact: true })).toBeVisible();
  await expect(page.getByText("好奇，做成东西。", { exact: true })).toBeVisible();
  await expect(page.getByText("硬件 · 软件 · AI · 设计", { exact: true })).toBeVisible();
  await expect(page.locator(".hero .primary-link")).toHaveAttribute("href", "https://blog.orbitvo.com/");
  await expect(page.getByRole("link", { name: /GitHub/ }).first()).toHaveAttribute("href", "https://github.com/zhesphere");
  await expect(page.locator('a[href="#"], a[href^="mailto:"]')).toHaveCount(0);
});

test("uses the existing feed for three real article cards", async ({ page }) => {
  await page.goto("/#writing");

  await expect(page.getByRole("heading", { name: "文章", exact: true })).toBeVisible();
  await expect(page.locator(".article-card")).toHaveCount(3);
  const articleLinks = await page.locator(".article-card").evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href));
  expect(articleLinks.every((href) => href.startsWith("https://blog.orbitvo.com/"))).toBe(true);
  await expect(page.locator(".feed-source")).toHaveCount(0);
  await expect(page.locator(".footer-meta a[href='https://blog.orbitvo.com/rss.xml']")).toHaveCount(1);
});

test("forms a create matrix and journey without invented portfolio content", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "创造", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "ZheSphere。硬件工程师。" })).toBeVisible();
  await expect(page.locator(".journal")).toHaveCount(0);
  await expect(page.locator(".about-actions a[href='https://blog.orbitvo.com/']")).toHaveCount(0);
  await expect(page.locator(".footer-blog")).toHaveAttribute("href", "https://blog.orbitvo.com/");
  await expect(page.locator(".create-card")).toHaveCount(4);
  await expect(page.locator(".transit-chart")).toHaveCount(0);
  await expect(page.locator(".star-sculpture")).toHaveCount(0);
  await expect(page.getByText("Mori", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Orbit OS", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Field Notes", { exact: true })).toHaveCount(0);
});

test("keeps blog CTAs to a clear hierarchy without bottom stacking", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /阅读博客/ })).toHaveCount(2);
  await expect(page.locator(".hero .primary-link")).toHaveAttribute("href", "https://blog.orbitvo.com/");
  await expect(page.locator(".section-link")).toHaveAttribute("href", "https://blog.orbitvo.com/");
  await expect(page.locator(".footer-blog")).toBeVisible();
  await expect(page.getByText("去博客", { exact: true })).toHaveCount(0);
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

test("keeps the mobile introduction readable and the lumen sculpture composed", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");

  await expect(page.locator(".hero-lede")).toHaveCSS("font-size", "12px");
  await expect(page.locator(".hero h1")).toHaveCSS("white-space", "nowrap");
  await expect(page.locator(".article-visual").first()).toHaveCSS("border-radius", "14px");
  const hero = await page.locator(".hero").boundingBox();
  const art = await page.locator(".hero-art").boundingBox();
  const sculpture = await page.locator(".lumen-sculpture").boundingBox();
  expect(hero).not.toBeNull();
  expect(art).not.toBeNull();
  expect(sculpture).not.toBeNull();
  expect(sculpture!.x).toBeGreaterThanOrEqual(0);
  expect(sculpture!.x + sculpture!.width).toBeLessThanOrEqual(360);
  expect(art!.y).toBeGreaterThan(hero!.y);
  const title = await page.locator(".hero h1").boundingBox();
  expect(title).not.toBeNull();
  expect(title!.x + title!.width).toBeLessThanOrEqual(360);
});

test("keeps the wide layout contained rather than stretching without limit", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");

  const header = await page.locator(".site-header").boundingBox();
  const hero = await page.locator(".hero").boundingBox();
  const cards = await page.locator(".article-grid").boundingBox();
  for (const box of [header, hero, cards]) {
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(1121);
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
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#0c121c");
});

test("provides a visible keyboard route through the primary controls", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "返回 Orbitvo 首页顶部" })).toBeFocused();
  const navVisible = await page.locator(".nav-links").isVisible();
  if (navVisible) {
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "创造", exact: true })).toBeFocused();
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
    page.locator(".hero .primary-link"),
    page.getByRole("link", { name: /GitHub/ }).first()
  ]) {
    const box = await locator.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
});

test("honors reduced motion without hiding the lumen sculpture", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator(".lumen-sculpture")).toBeVisible();
  await expect(page.locator(".lumen-sculpture")).toHaveCSS("animation-iteration-count", "1");
  await expect(page.locator(".lumen-arc-a")).toHaveCSS("animation-iteration-count", "1");
});
