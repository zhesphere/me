# 项目历史归档｜截至 2026-09-01

本文件用于追溯，不是当前需求清单。当前工作只以根目录 `PROJECT_HUB.md` 为准。

## 已完成并归档

- Astro 静态主页、集中内容配置、博客 RSS 与本地回退数据已经建立。
- 博客、GitHub、关于入口已经实现，并拥有移动端基本布局。
- 轨道节点与可见轨道对齐问题已经修复。
- 轨道动效流畅度、暂停逻辑、减少动态模式与焦点基础能力已经完成过一轮优化。
- 顶部导航背景已调整为全宽，修复右侧过渡断层。
- 当前仓库已连接 GitHub `zhesphere/me`，`main` 跟踪 `origin/main`。
- 当前工程文档确认采用 GitHub + Vercel 发布至 `orbitvo.com`。

这些事项不再保留为活动任务。若后续回归，只能根据新的复现证据重新建立缺陷任务。

## 被当前方向取代

- 以 `a.zsphere.top` 作为唯一主域名的早期计划。
- Cloudflare Workers 作为当前主发布平台的早期计划。
- 让入口卡片沿轨道运动、以动态导航承担主要阅读路径的方案。
- 仅靠微小 HUD 字体、低对比灰色和大量状态标签表达科技感的方案。
- 通用的一键 `git add . && git commit && git push` 流程，以及把 `git reset --hard` 当成日常操作的说明。

## 仍需外部事实核验，但不阻塞当前设计

- `orbitvo.com` 与 `www.orbitvo.com` 的当前线上路由、TLS 和重定向状态。
- Vercel 项目是否持续正确连接 `zhesphere/me/main`。
- 历史 Cloudflare Worker `me` 是否仍存在、是否仍连接 GitHub Builds。
- `a.zsphere.top` 是否保留以及是否重定向到主域名。

这些项目统一留到 P4 上线验收，不在 P1 视觉任务中操作外部账户或 DNS。
