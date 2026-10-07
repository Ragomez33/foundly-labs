# Phase 1 Quickstart: Production Copy & Branded Assets for the Apps Dataset

**Feature**: `003-real-apps-data` | **Date**: 2026-10-06

Runnable validation scenarios proving the feature works end-to-end. Field values and layout
obligations are defined in [data-model.md](./data-model.md) and
[contracts/](./contracts/); this guide does not restate them.

## Prerequisites

- Node + npm installed; dependencies installed (`npm install`).
- `public/mixbit/branding-logo.png` and `public/mixbit/icon.png` present (see research.md R2).
- Repository at the feature branch/directory `003-real-apps-data`.

## Automated gates

```bash
npm run check   # astro check — expect 0 errors and 0 warnings
npm run lint    # eslint . — expect 0 problems
npm run build   # static build into dist/
```

All three MUST complete successfully. `npm run check` validates the extended `Application`
contract (a missing field on any record fails the check).

## Scenario A — All four assets resolve in the built page

1. Run `npm run build`.
2. Inspect `dist/index.html` for the four product image sources.

Expected: the page contains exactly these source paths (each appearing in a card):

- `/foundly-finance/icon.png` (or `/foundly-finance/branding-logo.png`)
- `/foundly-pos/icon.png` (or `/foundly-pos/branding-logo.png`)
- `/foundly-maker/icon.png` (or `/foundly-maker/branding-logo.png`)
- `/mixbit/icon.png` (or `/mixbit/branding-logo.png`)

And: the corresponding files exist under `dist/` (copied from `public/`). 0 references point to a
missing or wrong product folder (SC-007).

## Scenario B — Production copy renders verbatim

1. Run `npm run preview` (or open `dist/index.html`).
2. Read the ecosystem section.

Expected: each of the 4 cards shows its production `headline`, `subheadline`, `description`
(“what it solves”), and `keyFeature`, matching [spec.md](./spec.md) FR-002–FR-005 exactly; each
card also shows its category, status and target (SC-001, SC-002).

## Scenario C — No overflow / no layout jump

1. Run `npm run dev` and open the home page.
2. Resize from narrow (≈320 px) to wide (≥1280 px).
3. Optionally throttle the network and reload.

Expected: cards stack 1-col on small, 2-col on medium, 4-col on large; long headlines/subheadlines
wrap without clipping or overlapping; product images occupy a fixed footprint and cause no visible
layout shift (SC-003, SC-006).

## Scenario D — Accessibility and zero-JS

1. Disable JavaScript in the browser and reload.
2. Inspect the rendered cards with the accessibility tree / a screen reader.

Expected: all copy and images still render; each product image exposes alt text
such as `Logo de Foundly`; product names remain headings (SC-004, SC-006).

## Manual review checklist

- [ ] `npm run check` → 0 errors / 0 warnings
- [ ] `npm run lint` → 0 problems
- [ ] `npm run build` → clean static output in `dist/`
- [ ] All four image paths present in `dist/index.html`
- [ ] Four cards show exact production copy
- [ ] No overflow across column counts; no image-induced layout shift
- [ ] Alt text present; content visible with JavaScript disabled
