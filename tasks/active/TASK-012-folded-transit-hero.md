# TASK-012 / Folded Transit 首屏与文案刷新

**状态：进行中｜模型：GPT-5.6 Terra / Medium**

## 目标

去掉幸运星主视觉，换成折纸航图 / 轨道仪面板；重写主张与分区标题，使首屏更锋利、更精致。

## 出口条件

- 页面无 `.star-sculpture`；新主视觉 `.transit-chart` 可见
- 新主张与分区标题上线；`ORBITVO` 品牌锚保留
- Astro check、单测、E2E、生产核对通过

## 允许修改

- `src/pages/index.astro`、`src/styles/global.css`、`tests/e2e/home.spec.ts`
- `PRODUCT.md`、`DESIGN.md`、`PROJECT_HUB.md`、本任务

## 不做

- 不恢复星芒微调版；不克隆 Heo；不编造作品
