# Quickstart & Validation Guide: Production Footer

**Feature**: `006-production-footer` | **Date**: 2026-10-05

How to run and validate this feature once implemented. It references the contract and data model
instead of duplicating implementation detail.

## Prerequisites

- Node.js ≥ 20 and npm
- Dependencies installed (`npm install`)

## Run locally

```bash
npm run dev
```

Open `http://localhost:4321` and scroll to the bottom.

## Validation scenarios

### 1. Footer on every page (FR-001, SC-001)

- Confirm a semantic `<footer>` appears at the bottom of `/`, `/privacy`, and `/terms`.

### 2. Branding and attribution (FR-002, FR-003, FR-004, SC-002, SC-007)

- Confirm the Foundly Labs logo/isotipo and the short brand copy are present.
- Confirm the FORGE Labs credit sentence links to `https://www.forgelab.lat` and opens in a new tab
  (`target="_blank"`, `rel="noopener noreferrer"`), with a subtle hover/focus state.

### 3. Ecosystem links (FR-005, SC-003)

- Confirm links to Foundly Mobile, Foundly POS, LRC-Maker, and Mixbit, each reaching the
  applications section (or their landing page).

### 4. Philosophy & Resources (FR-006)

- Confirm "Local-First Manifesto" reaches the manifesto section and "Privacidad Local" reaches the
  privacy page; confirm "Documentación" resolves to its documented destination.

### 5. Contact & Social (FR-007, FR-011, SC-005)

- Confirm the available social links (GitHub, X) are present, open safely, and have descriptive
  accessible labels.
- Tab through the footer; confirm every link is focusable with a visible focus indicator.

### 6. Copyright bar (FR-008, SC-007)

- Confirm the bottom bar is separated by a divider and shows
  "© 2026 Foundly Labs. Todos los derechos reservados. Powered by FORGE Labs."

### 7. Responsive layout (FR-009, SC-004)

- Resize from 320px to desktop; confirm a single stacked column on small screens and up to four
  columns on desktop, with no horizontal scroll.

### 8. Zero-JS (FR-012, SC-006)

- Confirm the footer adds no executable `<script>` and uses no hydration directive.

## Automated gates

```bash
npm run check   # astro check: 0 errors / 0 warnings
npm run lint    # ESLint: 0 problems
npm run build   # static build
```

## Contract validation matrix

| Contract                                 | Validated by  |
| ---------------------------------------- | ------------- |
| [footer](./contracts/footer.contract.md) | Scenarios 1–8 |
| [data-model](./data-model.md)            | Scenarios 2–6 |
