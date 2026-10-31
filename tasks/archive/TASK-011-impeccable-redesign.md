# TASK-011 / Impeccable 视觉重设计（zhheo 结构参照）

**状态：已归档｜完成日期：2026-10-31｜生产提交：`519b2ab`**

## 目标

在备份旧视觉后，替换 Orbitvo 视觉世界观为 **Luminous Orbit Portal**：气质贴近博客、结构参考 zhheo.com 原则，达到眼前一亮且精致；同时梳理导航、主题、博客入口、创造展示与交互。

## 设计意图

- 见仓库根目录 `PRODUCT.md` / `DESIGN.md`
- 旧编辑感 UI 为反例；备份：`visual-baseline-pre-redesign-20261031` 与 `docs/archive/visual-baseline-20261031/`

## 允许修改

- `src/pages/index.astro`、`src/styles/global.css`、必要时测试与文档
- `.agents/skills/impeccable/`（项目级）

## 不做

- 不移植 HeoBlog / Solitude 主题或素材；不编造作品；不改 DNS/托管

## 验证

- 源码：Astro check 0 错误；生产构建完成
- 单测：9/9；E2E：40/40
- 生产：`https://orbitvo.com` HTTP 200，HTML 含 `ORBITVO`、`正在推进的创造`、`create-card`

## 出口条件

已满足：新视觉上线、创造矩阵可见、备份标签保留、自动化与生产核对通过。

## 回滚

```bash
git checkout visual-baseline-pre-redesign-20261031 -- src/styles/global.css src/pages/index.astro
```

## 模型

`GPT-5.6 Terra / Medium`。
