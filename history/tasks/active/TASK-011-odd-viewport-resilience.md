# TASK-011 Odd viewport resilience

## Goal
Make the home hero constellation frame fluid (`aspect-ratio` + `max-height`) so odd/short viewports do not clip the chart, while keeping normal desktop and phone proportions visually equivalent.

## Exit criteria
- [ ] `.hero-art` no longer relies on fixed `height` alone
- [ ] Short-height media query reduces art and hides RA/DEC meta
- [ ] E2E covers odd viewports (no horizontal overflow; chart inside art)
- [ ] Visual parity at 1440×900 and 390×844; then commit, push `main`, verify orbitvo.com
