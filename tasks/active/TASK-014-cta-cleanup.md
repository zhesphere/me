# TASK-014 / 主页 CTA 清理与收口

**状态：进行中｜模型：GPT-5.6 Terra / Medium**

## 目标

去掉底部重复的「去博客」堆叠；博客主行动只出现在首屏与页末收口。

## 出口条件

- 无 `.journal`；关于区不再出现「去博客」
- 页脚只保留一次大入口（如 `阅读博客` / `blog.orbitvo.com`）
- E2E / 构建 / 生产核对通过

## 允许修改

- `src/pages/index.astro`、`src/styles/global.css`、`tests/e2e/home.spec.ts`
- `PRODUCT.md`、`PROJECT_HUB.md`、本任务

## 不做

- 不改博客站文章标题；不编造作品
