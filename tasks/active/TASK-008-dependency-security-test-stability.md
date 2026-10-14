# TASK-008｜依赖安全与测试链路稳定化

## 状态

- 状态：本地验证通过，待发布验收
- 模型：GPT-5.6 Terra / Medium
- 类型：必要维护，不涉及产品视觉重设计

## 目标

在保持现有 UI、页面结构、文案、动效和响应式几何不变的前提下：

1. 将存在已知安全问题的 Astro 依赖升级到修复版本，并固定当前工具链版本，避免 `latest` 带来的无审查漂移。
2. 修复 Astro 在 agent 环境自动转入后台后导致 Playwright `webServer` 误判退出的问题。
3. 补齐 RSS 真实格式、日期排序、超时、HTTP 错误和空数据回退测试。
4. 将 `PROJECT_HUB.md` 中已经完成的上线阶段改为真实状态。

## 允许修改

- `package.json`
- `package-lock.json`
- `playwright.config.ts`
- `tests/blog.test.ts`
- `PROJECT_HUB.md`
- 本任务文件及归档位置

## 明确不做

- 不修改 `src/pages/index.astro`。
- 不修改 `src/styles/global.css`。
- 不修改标题、正文、按钮、轨道、星球、动画或响应式参数。
- 不修改 RSS 生产逻辑和备用文章内容，除非测试证明现有逻辑错误。
- 不修改 `orbitvo.com` / `www.orbitvo.com` DNS、重定向或 Vercel 账户配置。
- 不引入 React、Three.js、动画库或新的产品功能。
- 不处理字体和 OG 图片等低优先级优化。

## 验证矩阵

1. `npm audit --omit=dev`：确认 Astro 已脱离已知受影响版本；记录剩余传递依赖风险及实际暴露面。
2. `npm run check`：0 错误、0 警告。
3. `npm test`：全部通过，覆盖 RSS 与回退关键路径。
4. `npm run build`：production build 通过。
5. `npm run test:e2e`：无需预先手工启动服务器即可一次通过。
6. 360 / 390 / 430：移动端核心几何测试保持。
7. 768 / 1440 / 1920：既有桌面几何基线保持。
8. 确认页面与样式源码未改动，工作区只包含允许范围文件。
9. 发布后检查 Vercel 部署成功、`https://orbitvo.com` 返回 200，线上关键内容存在。

## 出口条件

- 安全升级与测试稳定性修复均有证据。
- 所有自动化检查通过。
- UI 源码零改动，既有几何基线通过。
- 提交并推送 `origin/main`，Vercel 生产部署与真实域名验证完成。
- 更新中枢、归档本任务，最终工作区 clean 且与远程同步。
