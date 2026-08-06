# ZheSphere Personal Universe

`a.zsphere.top` 的 Astro 静态个人主页，使用 Cloudflare Workers Static Assets 部署。

## Local development

```sh
npm install
npm run dev
```

内容集中在 `src/data/site.ts`。生产构建会尝试读取博客 Atom feed；网络异常时自动使用本地备用数据。

## Cloudflare deployment

在 Cloudflare Workers Builds 中连接 `zhesphere/me`：

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Production branch: `main`

首次发布后，在 Worker 的 Custom Domains 中绑定 `a.zsphere.top`，并从 Cloudflare 控制台为该域名启用无 Cookie 的 Web Analytics 自动注入。
