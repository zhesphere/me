# ZheSphere Personal Universe

`orbitvo.com` 的 Astro 静态个人主页，使用 GitHub + Vercel 部署。

## Project control

- [PROJECT_HUB.md](./PROJECT_HUB.md)：唯一项目中枢，记录当前阶段、设计方向、任务队列、模型策略与验收门槛。
- [AGENTS.md](./AGENTS.md)：让后续任务自动遵循中枢、单任务制与 Terra Medium 模型规则。
- [tasks/archive/TASK-001-hero-visual-hierarchy.md](./tasks/archive/TASK-001-hero-visual-hierarchy.md)：已完成的 P1 首屏视觉层级与可读性重构。
- [docs/archive/](./docs/archive/)：已经完成或不再作为当前依据的历史资料。
- [DEPLOYMENT.md](./DEPLOYMENT.md)：生产发布、验收与回滚指南。

## Local development

```sh
npm install
npm run dev
```

内容集中在 `src/data/site.ts`。生产构建会尝试读取博客 Atom feed；网络异常时自动使用本地备用数据。

## Vercel deployment

Vercel 项目应连接 GitHub 仓库 `zhesphere/me`：

- Framework Preset: `Astro`
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`

首次在 Vercel 导入仓库后，推送到 `main` 会自动发布生产环境；Pull Request 会生成预览部署。日常发布、验收、排错和回滚流程见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

将 `orbitvo.com` 和 `www.orbitvo.com` 添加到 Vercel 项目后，按 Vercel 显示的值更新阿里云 DNS 记录，并将 `www` 重定向到根域名。根域名与子域名所需的记录类型可能不同，始终以 Vercel 控制台给出的记录为准。
