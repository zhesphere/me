# Design

<!-- impeccable:design-schema 1 -->

## World

**Quiet Lumen** — 静光雕塑。个人工作室入口：安静、精致、有艺术感。首屏主符号是无字光影装置（缓慢呼吸的光弧与半透明亮面），不是图解航线、不是幸运星。气质贴近博客阅读感；结构仍是主张 + 精选矩阵。

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

Cards: 1px border + backdrop blur + soft offset. Radius 16px. Hero sculpture uses soft arcs and a luminous plane — no labels.

## Type

- Display: `"Space Grotesk"` — `ORBITVO`
- Statement: `"Literata"` — short Chinese claim
- Body: `"Plus Jakarta Sans"` + system Chinese
- Copy budget: claim ≤ 12 chars; section titles ≤ 6; create blurbs one short phrase

No eyebrow walls of explanation. No gradient text.

## Layout

1. Frosted header
2. Hero: claim-led copy + Quiet Lumen sculpture
3. Creates 2×2（短描述）
4. Writing（无 FEED SOURCE / SIGNAL）
5. About + journal + footer

## Motion

- Arc breathe / soft rotate
- Node-free; reduced motion → static final state

## Anti-patterns

- No transit chart labels; no lucky star; no dual symbols
- No Heo clone; no purple AI gradients; no cream terracotta face
- No invented portfolio names; no self-defensive copy
