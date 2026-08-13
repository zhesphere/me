export type PortalId = "blog" | "github" | "about";

export interface PortalNode {
  id: PortalId;
  label: string;
  eyebrow: string;
  index: string;
  description: string;
  href?: string;
}

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
  portals: PortalNode[];
  socialLinks: SocialLink[];
}

export const siteConfig = {
  name: "ZheSphere",
  displayName: "ZHESPHERE",
  tagline: "在技术与想象之间，建立自己的宇宙。",
  description: "ZheSphere 的个人宇宙入口，记录技术、创造与持续探索。",
  siteUrl: "https://orbitvo.com",
  blogUrl: "https://blog.zsphere.top/",
  blogFeedUrl: "https://blog.zsphere.top/rss.xml",
  locale: "zh-CN",
  portals: [
    {
      id: "blog",
      label: "博客",
      eyebrow: "WRITING",
      index: "01",
      description: "文章与思考"
    },
    {
      id: "github",
      label: "GitHub",
      eyebrow: "BUILDING",
      index: "02",
      description: "开源代码与实验",
      href: "https://github.com/zhesphere"
    },
    {
      id: "about",
      label: "关于我",
      eyebrow: "ORIGIN",
      index: "03",
      description: "这颗星球的来历"
    }
  ],
  socialLinks: [
    { label: "Blog", href: "https://blog.zsphere.top/" },
    { label: "GitHub", href: "https://github.com/zhesphere" }
  ]
} satisfies SiteConfig;

export function validateSiteConfig(config: SiteConfig): string[] {
  const errors: string[] = [];
  if (!config.name.trim()) errors.push("name is required");
  if (!config.tagline.trim()) errors.push("tagline is required");
  if (!config.portals.length) errors.push("at least one portal is required");

  for (const value of [config.siteUrl, config.blogUrl, config.blogFeedUrl]) {
    try {
      const url = new URL(value);
      if (url.protocol !== "https:") errors.push(`${value} must use https`);
    } catch {
      errors.push(`${value} is not a valid URL`);
    }
  }

  const ids = config.portals.map((portal) => portal.id);
  if (new Set(ids).size !== ids.length) errors.push("portal ids must be unique");
  return errors;
}
