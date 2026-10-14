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

  it("parses RSS items and sorts them by publication date instead of source order", () => {
    const rss = `<?xml version="1.0"?><rss><channel>
      <item><title>较早</title><link>https://blog.orbitvo.com/p/older</link><pubDate>Tue, 01 Jul 2025 00:00:00 GMT</pubDate></item>
      <item><title>最新</title><link>https://blog.orbitvo.com/p/newest</link><pubDate>Tue, 08 Sep 2026 00:00:00 GMT</pubDate></item>
      <item><title>其次</title><link>https://blog.orbitvo.com/p/second</link><pubDate>Sun, 06 Sep 2026 00:00:00 GMT</pubDate></item>
      <item><title>第四</title><link>https://blog.orbitvo.com/p/fourth</link><pubDate>Sat, 05 Sep 2026 00:00:00 GMT</pubDate></item>
    </channel></rss>`;

    expect(parseFeed(rss).map((item) => item.title)).toEqual(["最新", "其次", "第四"]);
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

  it("falls back for an unsuccessful HTTP response", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response("unavailable", { status: 503 }));
    const result = await getBlogItems(siteConfig.blogFeedUrl, { fetcher });
    expect(result.source).toBe("fallback");
  });

  it("falls back when the feed contains no valid entries", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response("<rss><channel></channel></rss>", { status: 200 }));
    const result = await getBlogItems(siteConfig.blogFeedUrl, { fetcher });
    expect(result.source).toBe("fallback");
  });

  it("aborts a stalled feed request and falls back", async () => {
    vi.useFakeTimers();
    try {
      const fetcher = vi.fn((_input: RequestInfo | URL, init?: RequestInit) => new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
      })) as typeof fetch;
      const pending = getBlogItems(siteConfig.blogFeedUrl, { timeoutMs: 100, fetcher });
      await vi.advanceTimersByTimeAsync(100);
      const result = await pending;
      expect(result.source).toBe("fallback");
    } finally {
      vi.useRealTimers();
    }
  });
});
