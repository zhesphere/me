import { describe, expect, it, vi } from "vitest";
import { getBlogItems, parseFeed } from "../src/lib/blog";
import { siteConfig, validateSiteConfig } from "../src/data/site";

const atom = `<?xml version="1.0"?><feed><entry><title><![CDATA[第一条信号]]></title><link href="https://blog.orbitvo.com/p/one"/><published>2026-08-06T00:00:00Z</published><summary>摘要 &amp; 记录</summary></entry></feed>`;

describe("site config", () => {
  it("is valid", () => expect(validateSiteConfig(siteConfig)).toEqual([]));
});

describe("parseFeed", () => {
  it("parses Atom entries", () => {
    expect(parseFeed(atom)).toEqual([
      {
        title: "第一条信号",
        href: "https://blog.orbitvo.com/p/one",
        publishedAt: "2026-08-06T00:00:00Z",
        summary: "摘要 & 记录"
      }
    ]);
  });

  it("rejects invalid and insecure links", () => {
    expect(parseFeed("<feed><entry><title>x</title><link href='http://unsafe.test'/></entry></feed>")).toEqual([]);
  });
});

describe("getBlogItems", () => {
  it("uses the live feed when valid", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(atom, { status: 200 }));
    const result = await getBlogItems(siteConfig.blogFeedUrl, { fetcher });
    expect(result.source).toBe("feed");
    expect(result.items).toHaveLength(1);
  });

  it("falls back without failing the build", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("offline"));
    const result = await getBlogItems(siteConfig.blogFeedUrl, { fetcher });
    expect(result.source).toBe("fallback");
    expect(result.items).toHaveLength(3);
    expect(result.items[0]?.title).toBe("DSP");
    expect(result.items.every((item) => item.href.startsWith("https://blog.orbitvo.com/"))).toBe(true);
  });
});
