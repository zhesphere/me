# Design

<!-- impeccable:design-schema 1 -->

## World

**Constellation** — 星座星图。个人工作室入口：夜空坐标感、金线连星、可辨认的真实星座剪影。首屏主符号是可切换的今夜星座图（「换一颗」），不是静光雕塑、不是图解航线、不是幸运星。气质仍贴近工作室阅读感；结构仍是主张 + 创造矩阵 + 真实文章信号。

Mode: **Experience** + 首屏 Persuade CTA（阅读博客）。

## Surfaces

| Token | Light | Dark |
| --- | --- | --- |
| `--paper` | `#eef2f8` | `#060a12` |
| `--panel` | `rgba(255,255,255,.82)` | `rgba(10,16,28,.78)` |
| `--ink` | `#121826` | `#eef3fb` |
| `--muted` | `#5a6578` | `#a9b6cb` |
| `--line` | `rgba(70,96,140,.18)` | `rgba(255,207,110,.18)` |
| `--gold` | `#b8862b` | `#ffcf6e` |
| `--blue` | `#3d7be0` | `#8fb7f2` |
| `--glow` | `rgba(184,134,43,.2)` | `rgba(255,207,110,.32)` |
| `--focus` | `#2459b5` | `#ffcf6e` |

Cards: 1px gold-tinged border + soft lift. Radius ~18–20px. Hero chart is borderless, floating over a soft glow.

## Type

- Display: `"Space Grotesk"` — `ORBITVO`
- Statement: `"Cormorant Garamond"` — short Chinese claim
- Body: `Manrope` + system Chinese
- Mono labels: system mono for SIGNAL / RA·DEC / kickers
- Copy budget: claim ≤ 12 chars; section titles ≤ 6; create blurbs one short phrase

No eyebrow walls of explanation. No gradient text.

## Layout

1. Frosted header + theme + Blog
2. Hero: claim-led copy + constellation chart (tonight / shuffle + light「全部星座」→ `/chart`)
3. Creates 2×2 / 4-col（星座卡 + 真实外链）
4. Writing（RSS 最多 3 篇；SIGNAL 北斗点亮变体）
5. About（Crux 水印）+ footer 收口（含星图志轻链）
6. Secondary page `/chart` 星图志：全部星座图鉴，不挤占首页叙事

## Motion

- Starfield twinkle / focus pulse / soft art float
- Reduced motion → animations off; chart still visible

## Anti-patterns

- No Quiet Lumen sculpture; no transit chart labels; no lucky star
- No demo-bar / noindex / demo storage keys in production
- No Heo clone; no purple AI gradients; no cream terracotta face
- No invented portfolio names; about 区不催促博客
