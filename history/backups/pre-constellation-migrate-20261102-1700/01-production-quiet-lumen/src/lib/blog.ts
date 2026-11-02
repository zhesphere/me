import fallbackItems from "../data/blog-fallback.json";
import type { BlogItem } from "../data/site";

const decodeEntities = (value: string) =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const readTag = (xml: string, tag: string) => {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match?.[1] ? decodeEntities(match[1]) : "";
};

const readLink = (entry: string) => {
  const atom = entry.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i)?.[1];
  return atom ?? readTag(entry, "link");
};

export function parseFeed(xml: string, limit = 3): BlogItem[] {
  const entries = xml.match(/<(?:entry|item)(?:\s[^>]*)?>[\s\S]*?<\/(?:entry|item)>/gi) ?? [];
  return entries
    .map((entry) => ({
      title: readTag(entry, "title"),
      href: readLink(entry),
      publishedAt: readTag(entry, "published") || readTag(entry, "updated") || readTag(entry, "pubDate"),
      summary: readTag(entry, "summary") || readTag(entry, "description") || undefined
    }))
    .filter((item) => item.title && /^https:\/\//.test(item.href))
    .sort((a, b) => {
      const right = Date.parse(b.publishedAt) || 0;
      const left = Date.parse(a.publishedAt) || 0;
      return right - left;
    })
    .slice(0, limit);
}

export async function getBlogItems(
  feedUrl: string,
  options: { timeoutMs?: number; fetcher?: typeof fetch } = {}
): Promise<{ items: BlogItem[]; source: "feed" | "fallback" }> {
  const timeoutMs = options.timeoutMs ?? 3500;
  const fetcher = options.fetcher ?? fetch;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetcher(feedUrl, {
      signal: controller.signal,
      headers: { Accept: "application/atom+xml, application/rss+xml, application/xml, text/xml" }
    });
    if (!response.ok) throw new Error(`Feed returned ${response.status}`);
    const items = parseFeed(await response.text());
    if (!items.length) throw new Error("Feed contains no valid entries");
    return { items, source: "feed" };
  } catch {
    return { items: fallbackItems as BlogItem[], source: "fallback" };
  } finally {
    clearTimeout(timer);
  }
}
