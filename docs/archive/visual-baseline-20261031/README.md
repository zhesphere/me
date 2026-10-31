# Visual baseline before Impeccable redesign

- Date: 2026-10-31
- Git tag: `visual-baseline-pre-redesign-20261031`
- Prior product baseline: editorial UI + ORBITVO wordmark (TASK-009 / TASK-010)

## Contents

- `global.css.bak` — full site styles before redesign
- `index.astro.bak` — homepage markup before redesign (`.bak` so Astro check ignores archive)
- `favicon.png`, `og.png` — brand assets at backup time
- `desktop-light.png` — production homepage light mode (2026-10-31)

## Rollback

```bash
git checkout visual-baseline-pre-redesign-20261031 -- src/styles/global.css src/pages/index.astro
# or restore from this archive directory
```
