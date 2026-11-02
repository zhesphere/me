# 迁移前备份｜Quiet Lumen → F Constellation

备份时间：2026-11-02（迁移开始前）
目的：用 F Constellation demo UI 替换生产站 Quiet Lumen 皮肤前的完整快照。

## 目录说明

### `01-production-quiet-lumen/`
**是什么**：当前线上主站（Quiet Lumen）的关键源码快照。  
**对应线上**：https://orbitvo.com  
**包含**：
- `src/pages/index.astro` — 生产首页（静光雕塑 UI）
- `src/styles/global.css` — Quiet Lumen 样式
- `src/data/site.ts` — 站点配置
- `src/data/blog-fallback.json` — RSS 失败回退
- `src/lib/blog.ts` — build-time RSS 拉取
- `tests/e2e/home.spec.ts` — 首页 e2e（Quiet Lumen 选择器）
- `DESIGN.md` / `PRODUCT.md` — 当时的设计/产品叙事（若存在）

**如何恢复生产 UI**：把上述文件拷回仓库对应路径后重新构建部署。

### `02-demo-f-constellation/`
**是什么**：迁移所用的 F Constellation demo（critique 修订后的最新版）。  
**来源路径**：`history/demos/card-f-constellation/index.html`  
**包含**：
- `index.html` — 单文件 demo（HTML + CSS + 星座脚本）

**说明**：`history/demos/card-f-constellation-backup-20261102/` 是更早一次 critique 前的备份；本目录是**迁移开始瞬间**的 demo 副本，以本目录为准。

## 不在本备份内（迁移中故意保留、不替换）
- `src/lib/blog.ts` / `blog-fallback.json` / `site.ts` 的运行逻辑会继续留在主仓并沿用
- `vercel.json`、DNS、凭证

## 相关 git 标签（历史）
- `visual-baseline-pre-redesign-20261031` — 更早的视觉基线（见 PROJECT_HUB）
