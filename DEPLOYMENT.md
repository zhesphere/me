# 发布与 Cloudflare 运维指南

本项目通过 Cloudflare Workers Builds 自动发布。生产链路为：

```text
本地修改 -> GitHub main -> Cloudflare Workers Builds
         -> npm run build -> npx wrangler deploy -> Worker me
```

## 日常发布

1. 修改网站内容。主要内容配置位于 `src/data/site.ts`。
2. 在本地完成测试和生产构建：

   ```sh
   npm test
   npm run build
   ```

3. 检查将要提交的文件：

   ```sh
   git status
   git diff
   ```

4. 提交并推送到生产分支：

   ```sh
   git add .
   git commit -m "描述本次修改"
   git push origin main
   ```

5. 打开 Cloudflare 控制台的 Worker `me`，在 Builds 中确认最新构建成功。推送到 `main` 会自动触发生产发布。

不要把 `.env`、API Token 或其他密钥提交到仓库。需要运行时密钥时，使用 Cloudflare 控制台或 `npx wrangler secret put NAME`。

## 常用检查命令

```sh
# 查看最近部署
npx wrangler deployments list --name me

# 查看最近版本
npx wrangler versions list --name me

# 查看线上实时日志；按 Ctrl-C 退出
npx wrangler tail me

# 只验证打包和配置，不发布
npx wrangler deploy --dry-run
```

正常发布应通过 `git push origin main` 触发。不要把 `npx wrangler deploy` 当作日常发布命令，因为手工发布会绕过 Git 构建记录；它只适合明确批准的紧急发布。

## 发布失败时

按以下顺序检查：

1. GitHub 的 `main` 是否已经收到最新提交。
2. Cloudflare Worker 名称是否为 `me`，并与 `wrangler.jsonc` 的 `name` 一致。
3. Workers Builds 的 Build command 是否为 `npm run build`。
4. Deploy command 是否为 `npx wrangler deploy`。
5. 构建日志中失败的是依赖安装、Astro 构建还是 Wrangler 发布。
6. 本地重新运行 `npm test`、`npm run build` 和 `npx wrangler deploy --dry-run`。

如果新版本有线上故障，优先从 Cloudflare 控制台选择上一成功版本回滚。回滚前记录当前版本 ID、失败现象和时间，便于后续排查。

## 绑定 a.zsphere.top

当前状态：

- `a.zsphere.top` 的公开 DNS 仍是指向 `zhesphere.github.io` 的 CNAME。
- 当前 Cloudflare 账户尚未接入 `zsphere.top` zone。
- Worker Custom Domain 要求目标主机名属于同一账户中的活跃 Cloudflare zone，并且目标主机名不能保留已有 CNAME。

安全迁移顺序：

1. 在当前 DNS 服务商导出或逐项记录 `zsphere.top` 的所有 DNS 记录。
2. 在 Cloudflare 添加 `zsphere.top`，核对 Cloudflare 扫描出的记录与原记录完全一致。
3. 特别核对邮件相关的 MX、TXT、DKIM、SPF 和 DMARC 记录，避免影响收发邮件。
4. 在域名注册商处把 nameserver 更换为 Cloudflare 提供的 nameserver。
5. 等待 Cloudflare 将 zone 标记为 Active，并再次验证网站、邮件及其他子域名。
6. 删除 `a.zsphere.top -> zhesphere.github.io` 的旧 CNAME。
7. 在 Worker `me` 的 Settings -> Domains & Routes 中添加 Custom Domain `a.zsphere.top`；Cloudflare 会创建 Worker DNS 记录并签发 TLS 证书。
8. 用浏览器和以下命令确认响应来自 Cloudflare Worker：

   ```sh
   dig +short a.zsphere.top
   curl -I https://a.zsphere.top
   ```

不要在没有完整 DNS 清单的情况下直接更换 nameserver。这个动作影响整个 `zsphere.top`，不只影响 `a.zsphere.top`。
