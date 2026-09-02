# 已归档：同步更新命令参考

> 归档日期：2026-09-01。此文档不再作为项目流程。当前流程见根目录 `PROJECT_HUB.md` 和 `DEPLOYMENT.md`。

## 原文

### 本地开发流程

```bash
git pull
git status
git add .
git commit -m "你的修改说明"
git push
```

### 快捷版本（已停用）

```bash
git add . && git commit -m "update" && git push
```

### 本地预览

```bash
npm run dev
npm run build
npm run preview
```

### 原常用操作

```bash
git pull
git status
git diff
git log --oneline -5
git reset --hard HEAD
git checkout -- <文件名>
```

其中最后两条可能丢失未提交修改，不再出现在当前日常流程中。

### 原修改记录

| 日期 | 提交 | 内容 |
| --- | --- | --- |
| 2026-08-08 | `b18c41c` | 放大轨道尺寸，避免卫星文字遮挡中心恒星标题 |
| 2026-08-08 | `31f7e36` | 初始版本 |
