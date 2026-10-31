# Design

<!-- impeccable:design-schema 1 -->

## World

**Luminous Orbit Portal** — 深空轨道上的发光入口。把 blog.orbitvo.com 的内容诚实感与 zhheo 式「主张 + 精选矩阵」结合：材质是磨砂玻璃与细边框，光来自轨道蓝，不是紫渐变或奶油陶土。旧纸面编辑感首屏是反例；立体星芒升级为发光雕塑，仍是唯一主视觉符号。

Mode: **Experience**（人格与创造主导）+ 首屏 Persuade CTA（阅读博客）。

## Surfaces

| Token | Light | Dark |
| --- | --- | --- |
| `--paper` | `#f4f7fc` soft ice field | `#0c121c` deep navy |
| `--surface` | `rgba(255,255,255,.72)` frost | `rgba(22,32,48,.72)` frost |
| `--ink` | `#121826` | `#e8eef8` |
| `--muted` | `#5a6578` | `#a7b3c7` |
| `--line` | `rgba(70,96,140,.14)` | `rgba(160,190,230,.12)` |
| `--accent` | `#3d7be0` | `#7eb2f5` |
| `--accent-deep` | `#2459b5` | `#a8c9f8` |
| `--glow` | `rgba(61,123,224,.22)` | `rgba(126,178,245,.18)` |
| `--focus` | `#2459b5` | `#a8c9f8` |

Background: soft radial wash (accent glow top-right + cool wash bottom-left), not flat single fill. Cards use 1px border + backdrop blur + soft offset shadow (one elevation system). Radius: 16px for media/cards, 12px for compact controls, full circle for icon buttons.

## Type

- Display / brand: `"Space Grotesk", "Avenir Next", "PingFang SC", sans-serif` — ORBITVO wide tracking, weight 500, solid color (no gradient text).
- Statement: `"Literata", Georgia, "Songti SC", serif` — Chinese claim line.
- Body / UI: `"Plus Jakarta Sans", "PingFang SC", "Hiragino Sans GB", sans-serif`.
- Mono (data only): `ui-monospace, SFMono-Regular, Menlo, monospace` — feed source, dates.

Scale: brand clamp ~56–96px; section H2 ~32–44px; body 16px (mobile ≥15px); functional ≥12px. Measure ~30–38 汉字. No eyebrow/kicker labels above headings.

## Layout

1. Sticky frosted header: brand · anchors (创造 / 文章 / 关于) · theme · Blog
2. Hero: asymmetric copy + luminous star; one primary CTA, one secondary
3. **精选创造** `#creates`: 2×2 featured direction cards (zhheo product-matrix principle)
4. **最新写作** `#writing`: three RSS cards, title-led
5. **关于** `#about`: short personality + link out
6. Journal strip + footer

Content width ~1120px. Mobile: single column; nav anchors collapse behind scroll; hero art below copy.

## Motion

- Star: gentle float + breathe (respect reduced motion → static)
- Cards: 200–280ms lift + border brighten on hover
- Theme toggle: 8° rotate
- One page-entry: hero copy fade/slide once

## Anti-patterns

- No Heo/Solitude clone, Guli art, or borrowed theme CSS
- No Inter-as-default face; no purple-indigo AI gradients; no cream+terracotta default face
- No eyebrow kickers; no gradient text; no nested cards; no fake metrics
- Cards only for interactive destinations (creates / articles)
