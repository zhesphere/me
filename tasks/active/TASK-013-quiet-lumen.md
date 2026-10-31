# TASK-013 / Quiet Lumen 优雅克制首屏

**状态：进行中｜模型：GPT-5.6 Terra / Medium**

## 目标

用静光雕塑替换航图示意感；全站文案大幅缩短，提升首访「安静且厉害」的感觉。

## 出口条件

- 无 `.transit-chart` / 星芒；新主视觉 `.lumen-sculpture` 可见且无方向标签字
- 主张为「好奇，做成东西。」；分区标题短清；无 FEED SOURCE / SIGNAL 文案
- Astro check、单测、E2E、生产核对通过

## 允许修改

- `src/pages/index.astro`、`src/styles/global.css`、`tests/e2e/home.spec.ts`
- `PRODUCT.md`、`DESIGN.md`、`PROJECT_HUB.md`、本任务、`src/data/site.ts`

## 不做

- 不微调航图；不回幸运星；不编造作品；不克隆 Heo
