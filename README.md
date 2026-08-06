# ZheSphere Personal Universe

`a.zsphere.top` 的 Astro 静态个人主页，使用 Cloudflare Workers Static Assets 部署。

## Local development

```sh
npm install
npm run dev
```

内容集中在 `src/data/site.ts`。生产构建会尝试读取博客 Atom feed；网络异常时自动使用本地备用数据。

## Cloudflare deployment

Cloudflare Worker 名为 `me`，Workers Builds 已连接 GitHub 仓库 `zhesphere/me`：

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Production branch: `main`

日常发布、验收、排错和回滚流程见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

`a.zsphere.top` 目前仍指向 GitHub Pages。绑定 Worker Custom Domain 之前，必须先将 `zsphere.top` 作为活跃 zone 接入同一 Cloudflare 账户，并完整迁移现有 DNS 记录。
