# 同步更新命令参考

## 本地开发流程

```bash
# 1. 拉取远程最新代码
git pull

# 2. 本地修改后查看状态
git status

# 3. 添加修改到暂存区
git add .

# 4. 提交修改
git commit -m "你的修改说明"

# 5. 推送到 GitHub
git push
```

## 快捷版本（一键同步）

```bash
git add . && git commit -m "update" && git push
```

## 本地预览

```bash
# 开发模式（热更新，修改代码自动刷新）
npm run dev
# 访问 http://localhost:4321

# 生产构建预览
npm run build
npm run preview
```

## 常用操作

```bash
git pull                    # 拉取远程更新
git status                  # 查看本地变更
git diff                    # 查看具体改了什么
git log --oneline -5        # 查看最近5条提交
git reset --hard HEAD       # 放弃所有本地修改（谨慎！）
git checkout -- <文件名>     # 放弃单个文件的修改
```

## 修改记录

| 日期 | 提交 | 内容 |
|------|------|------|
| 2026-08-08 | `b18c41c` | 放大轨道尺寸（高椭圆），卫星文字不再遮挡中心恒星标题 |
| 2026-08-08 | `31f7e36` | 初始版本（从 GitHub 克隆） |
