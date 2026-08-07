# GitHub + Vercel 发布指南

本项目由 GitHub 保存源码、Vercel 自动构建并发布。生产链路为：

```text
本地修改 -> GitHub main -> Vercel -> https://a.zsphere.top
```

## 一次性迁移

1. 在 [Vercel](https://vercel.com/new) 导入 GitHub 仓库 `zhesphere/me`。
2. 确认 Vercel 使用仓库中的 `vercel.json`：Astro、`npm ci`、`npm run build`、输出目录 `dist`。
3. 在 Vercel 项目的 **Settings -> Domains** 添加 `a.zsphere.top`。
4. 在当前 DNS 服务商中，将 `a.zsphere.top` 的记录改为 Vercel 控制台显示的目标值。子域名通常使用 CNAME `cname.vercel-dns.com`，但须以控制台提示为准。
5. 在 Vercel 中确认域名状态为有效，再访问 `https://a.zsphere.top` 验收。
6. 确认新站可用后，在 Cloudflare 的 Worker `me` 中断开 GitHub Builds 连接并删除 Worker，避免继续构建或产生费用。

不要更换 `zsphere.top` 的 nameserver；本次只需要调整 `a` 子域名的 DNS 记录。修改 DNS 前请记录原记录，以便需要时恢复。

## 日常发布

1. 修改网站内容。主要内容配置位于 `src/data/site.ts`。
2. 在本地完成测试和生产构建：

   ```sh
   npm test
   npm run build
   ```

3. 提交并推送到生产分支：

   ```sh
   git add .
   git commit -m "描述本次修改"
   git push origin main
   ```

4. Vercel 会为 `main` 自动创建生产部署；在 Vercel 项目的 Deployments 页面确认构建成功。

## 验收与回滚

```sh
curl -I https://a.zsphere.top
```

确认响应正常、TLS 证书有效，并在 Vercel 项目中检查最新部署为 **Ready**。如果线上版本有问题，在 Vercel 的 Deployments 页面打开上一个成功部署并执行 **Promote to Production**。

不要把 `.env`、API Token 或其他密钥提交到仓库。需要环境变量时，在 Vercel 项目的 **Settings -> Environment Variables** 配置，并按环境分别保存。
