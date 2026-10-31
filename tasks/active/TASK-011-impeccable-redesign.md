# TASK-011 / Impeccable 视觉重设计（zhheo 结构参照）

**状态：待归档｜模型：GPT-5.6 Terra / Medium**

## 目标

在备份旧视觉后，替换 Orbitvo 视觉世界观为 **Luminous Orbit Portal**：气质贴近博客、结构参考 zhheo.com 原则，达到眼前一亮且精致；同时梳理导航、主题、博客入口、创造展示与交互。

## 设计意图

- 见仓库根目录 `PRODUCT.md` / `DESIGN.md`
- 旧编辑感 UI 为反例；备份：`visual-baseline-pre-redesign-20261031` 与 `docs/archive/visual-baseline-20261031/`

## 允许修改

- `src/pages/index.astro`、`src/styles/global.css`、`src/data/site.ts`（必要时）
- `tests/e2e/home.spec.ts` 及与选择器相关的测试
- `PRODUCT.md`、`DESIGN.md`、`PROJECT_HUB.md`、本任务文档
- `.agents/skills/impeccable/`（项目级安装）

## 不做

- 不移植 HeoBlog / Solitude 主题或素材
- 不编造作品名、指标、证言
- 不改 DNS / 托管商 / 密钥
- 不叠 taste-skill

## 验证矩阵

| 类型 | 要求 |
| --- | --- |
| 源码/构建 | Astro check + 生产构建通过 |
| 自动化 | 单测 + E2E 通过 |
| 浏览器视觉 | 桌面/移动，浅/深；无横向溢出 |
| 生产 | push `main` → Vercel success → orbitvo.com 200 且新结构可见 |

## 出口条件

- 首屏眼前一亮且品牌主张清晰；精选创造矩阵上线
- 主题/导航/博客桥接手感统一
- 全部验证通过并部署生产；备份标签保留

## 回滚

```bash
git checkout visual-baseline-pre-redesign-20261031 -- src/styles/global.css src/pages/index.astro
```

## 当前证据 / 2026-10-31

- 备份：标签 `visual-baseline-pre-redesign-20261031`；归档 `docs/archive/visual-baseline-20261031/`
- 源码：Astro check 0 errors；生产构建完成
- 单测：9/9 通过
- E2E：40/40 通过（desktop/mobile/tablet/ultrawide）
- 浏览器：本地预览确认 ORBITVO、精选创造 2×2、文章区、关于、主题切换与博客入口
- 生产：待 push 后补齐 Vercel / orbitvo.com 核对
