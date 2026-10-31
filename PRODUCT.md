# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

访客想在几秒内认识 ZheSphere / Orbitvo：这是谁、在做什么、该去哪里读更多。主要是中文互联网读者、同行创造者、以及从博客或 GitHub 回流的人。

## Product Purpose

Orbitvo（orbitvo.com）是 ZheSphere 的个人宇宙入口：把硬件、软件、设计与 AI 探索收束成一个可抵达的主页，并导向真实博客与 GitHub。成功 = 第一眼认出品牌与主张，并自然进入博客阅读。

## Positioning

不是履历页，也不是 SaaS 落地页；是人格化的创造入口。机制是「主张 + 创造坐标 + 真实文章信号」，内容来自 `blog.orbitvo.com` RSS，不编造作品集或社会证明。

## Operating Context

- 静态站：Astro + 原生 CSS / TypeScript，部署 Vercel → orbitvo.com
- 博客外链：`https://blog.orbitvo.com/`（Firefly），RSS 失败时本地快照
- 代码与工程：`https://github.com/zhesphere`
- 控制中枢：`PROJECT_HUB.md`；视觉备份标签 `visual-baseline-pre-redesign-20261031`

## Capabilities and Constraints

- 首页：品牌首屏、主题切换、页内导航、最新文章（最多 3 篇）、创造方向、博客 CTA、页脚链接
- 必须保留：品牌名 ORBITVO / ZheSphere、主张「技术与想象，在此交汇。」、博客主行动、GitHub 次行动、真实 RSS 内容
- 不做：虚构项目名/指标、移植第三方博客主题素材、托管商/DNS 变更
- 本次改造：允许替换视觉世界观；信息架构参考 zhheo.com 的原则（主张 + 精选矩阵 + 精致卡片手感），不复制其皮肤或资产

## Brand Commitments

- 名称：Orbitvo / ORBITVO / ZheSphere
- 主张：技术与想象，在此交汇。
- 气质锚点：贴近 blog.orbitvo.com 的阅读与内容气质，同时超脱旧纸面编辑感首屏，追求眼前一亮与精致
- 结构参照：zhheo.com 的清晰 / 轻快 / 易操作与产品矩阵逻辑；禁止克隆 Heo 主题、插画与品牌资产
- 视觉备份：换皮前已归档于 `docs/archive/visual-baseline-20261031/` 与 git tag `visual-baseline-pre-redesign-20261031`

## Evidence on Hand

- 生产站点：https://orbitvo.com
- 博客：https://blog.orbitvo.com/
- 源码：`src/pages/index.astro`、`src/styles/global.css`、`src/data/site.ts`、`src/lib/blog.ts`
- 创造方向（真实）：硬件系统、软件构建、AI 探索、产品设计
- 不得伪造：用户数、客户证言、未存在的产品名（如 Mori / Orbit OS / Field Notes）

## Product Principles

1. 品牌与主张先于装饰；首屏一秒钟内可识别。
2. 内容真实：文章与链接可验证；空白宁可诚实。
3. 清晰、轻快、易操作：统一可点击手感，少干扰。
4. 精致来自层级、材质与动效节制，不靠模板堆砌。
5. 深浅色是同一系统的两面，正文始终可读。

## Accessibility & Inclusion

- 正文对比目标不低于 WCAG AA（站点内部目标更高：正文约 7:1）
- 触控目标 ≥ 44px；键盘焦点可见；尊重 `prefers-reduced-motion`
- 360px 宽无横向滚动
