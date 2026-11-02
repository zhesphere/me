export interface SocialLink {
  label: string;
  href: string;
}

export interface BlogItem {
  title: string;
  href: string;
  publishedAt: string;
  summary?: string;
}

export interface SiteConfig {
  name: string;
  displayName: string;
  tagline: string;
  description: string;
  siteUrl: string;
  blogUrl: string;
  blogFeedUrl: string;
  locale: string;
  socialLinks: SocialLink[];
}

export const siteConfig = {
  name: "ZheSphere",
  displayName: "ZHESPHERE",
  tagline: "好奇，做成东西。",
  description: "ZheSphere 的个人入口。硬件 · 软件 · AI · 设计。",
  siteUrl: "https://orbitvo.com",
  blogUrl: "https://blog.orbitvo.com/",
  blogFeedUrl: "https://blog.orbitvo.com/rss.xml",
  locale: "zh-CN",
  socialLinks: [
    { label: "Blog", href: "https://blog.orbitvo.com/" },
    { label: "GitHub", href: "https://github.com/zhesphere" }
  ]
} satisfies SiteConfig;

export function validateSiteConfig(config: SiteConfig): string[] {
  const errors: string[] = [];
  if (!config.name.trim()) errors.push("name is required");
  if (!config.tagline.trim()) errors.push("tagline is required");
  for (const value of [config.siteUrl, config.blogUrl, config.blogFeedUrl]) {
    try {
      const url = new URL(value);
      if (url.protocol !== "https:") errors.push(`${value} must use https`);
    } catch {
      errors.push(`${value} is not a valid URL`);
    }
  }

  return errors;
}
