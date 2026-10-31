# TASK-015 / 回顶部 + 移动导航

**状态：进行中｜模型：GPT-5.6 Terra / Medium**

## 目标

滚动后出现浮动回顶部；小屏可打开页内导航。不做进度条/分享坞/TOC。

## 出口条件

- 回顶部默认隐藏，滚动约 1.5 视口后出现；点击回到顶部
- 移动端可打开菜单并跳到 `#creates` / `#writing` / `#about`
- E2E / 构建 / 生产通过

## 允许修改

- `src/pages/index.astro`、`src/styles/global.css`、`tests/e2e/home.spec.ts`
- `PROJECT_HUB.md`、本任务

## 不做

- 阅读进度条、侧边目录、分享浮窗、第二主题钮
