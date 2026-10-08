# Quickstart & Validation Guide: Hero Watermark Animation

**Feature**: `004-hero-watermark-animation` | **Date**: 2026-10-05

How to run and validate this feature once implemented. It references the contract instead of
duplicating implementation detail.

## Prerequisites

- Node.js ≥ 20 and npm
- Dependencies installed (`npm install`)

## Run locally

```bash
npm run dev
```

Open `http://localhost:4321`.

## Validation scenarios

### 1. Watermark renders behind the Hero (FR-001, FR-002, FR-012)

- Confirm a large, faint isotipo is centered behind the Hero heading.
- Confirm the badge, heading, subtitle, and both CTAs render above it, unchanged.

### 2. Legibility is preserved (FR-003, FR-004, SC-001)

- Confirm the heading and subtitle remain fully legible and their contrast is unchanged.
- Confirm the watermark shows the real official isotipo curves (the `F` + network node) softly blended
  into the lavender background — not a jagged traced outline and not a flat filled shadow.

### 3. No interaction capture (FR-005, FR-011, SC-006)

- Hover and click across the watermark area; confirm clicks pass through to the page/CTAs.
- Tab through the page; confirm focus never lands on the watermark.
- Inspect the markup; confirm the layer is `aria-hidden` and has an empty `alt`.

### 4. Motion sways side to side in 3D (FR-007, SC-002)

- Watch the Hero for several seconds; confirm a smooth 3D side-to-side sway (rotation about the
  vertical axis) with no stutter.
- Time a full cycle; confirm it is about 12 seconds.

### 5. Reduced motion (FR-009, SC-004)

- Enable the OS "reduce motion" setting and reload.
- Confirm the watermark is visible but does not move.

### 6. Responsive clipping (FR-010, SC-005)

- Resize from 320px to desktop width; confirm no horizontal scrollbar appears and content is not
  pushed.

### 7. Zero added JavaScript (FR-008, SC-003)

- Confirm the built Hero HTML has no `<script>` and no `client:*` hydration.

## Automated gates

```bash
npm run check   # astro check: 0 errors / 0 warnings
npm run lint    # ESLint: 0 problems
npm run build   # static build: 0 errors / 0 warnings
```

## Contract validation matrix

| Contract                                                 | Validated by      |
| -------------------------------------------------------- | ----------------- |
| [hero-watermark](./contracts/hero-watermark.contract.md) | Scenarios 1–7     |
| [research](./research.md)                                | Scenarios 4, 5, 6 |
