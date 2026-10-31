# TASK-012 / Folded Transit 首屏与文案刷新

**状态：已归档｜完成日期：2026-10-31｜生产提交：`1b6af42`**

## 目标

去掉幸运星主视觉，换成折纸航图；重写主张与分区标题。

## 验证

- Astro check 0 错误；单测 9/9；E2E 40/40
- 生产 `https://orbitvo.com` HTTP 200，含新主张、`transit-chart`、`四条仍在飞的航线`；无 `star-sculpture`

## 模型

`GPT-5.6 Terra / Medium`。
