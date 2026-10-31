# Design

<!-- impeccable:design-schema 1 -->

## World

**Folded Transit** — 折纸航图上的个人航线。保留磨砂门户与轨道蓝光场，但首屏主符号从幸运星换成 **折面航图面板**：折线、虚线航迹、四向发光节点（硬件→软件→AI→设计）。气质贴近博客阅读感，结构仍是主张 + 精选矩阵；符号服务于「未成形 → 可抵达」。

Mode: **Experience** + 首屏 Persuade CTA（阅读博客）。

## Surfaces

| Token | Light | Dark |
| --- | --- | --- |
| `--paper` | `#f4f7fc` | `#0c121c` |
| `--surface` | `rgba(255,255,255,.72)` | `rgba(22,32,48,.72)` |
| `--ink` | `#121826` | `#e8eef8` |
| `--muted` | `#5a6578` | `#a7b3c7` |
| `--line` | `rgba(70,96,140,.14)` | `rgba(160,190,230,.12)` |
| `--accent` | `#3d7be0` | `#7eb2f5` |
| `--accent-deep` | `#2459b5` | `#a8c9f8` |
| `--glow` | `rgba(61,123,224,.22)` | `rgba(126,178,245,.18)` |
| `--focus` | `#2459b5` | `#a8c9f8` |

Cards: 1px border + backdrop blur + soft offset shadow. Radius 16px. Hero chart panel uses folded facets (angled planes) and dashed transit paths.

## Type

- Display: `"Space Grotesk"` — `ORBITVO`
- Statement: `"Literata"` — Chinese claim
- Body: `"Plus Jakarta Sans"` + system Chinese
- Mono: dates / chart labels only

No eyebrow kickers above headings. No gradient text.

## Layout

1. Frosted header
2. Hero: claim-led copy + transit chart (no star)
3. Creates 2×2
4. Writing
5. About + journal + footer

## Motion

- Transit path stroke-draw once on load
- Node pulse; fold planes subtle parallax tilt on idle
- Reduced motion → final static state

## Anti-patterns

- No lucky-star sculpture; no dual symbols (star + chart)
- No Heo clone; no purple AI gradients; no cream terracotta face
- No invented portfolio names
