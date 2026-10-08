# Quickstart & Validation Guide: Branding Integration & Apps Grid

**Feature**: `002-branding-apps-grid` | **Date**: 2026-10-05

How to run and validate this feature once implemented. It references the contracts and data model
instead of duplicating them.

## Prerequisites

- Node.js ≥ 20 and npm
- Dependencies installed (`npm install`)

## Run locally

```bash
npm run dev
```

Open `http://localhost:4321`.

## Validation scenarios

### 1. Favicon and official title (FR-001, FR-002, SC-001)

- Confirm the browser tab shows the F isotipo favicon.
- Confirm the tab title is `Foundly Labs | Local-First Software Ecosystem` on the home page, and
  that inner pages still include the official title.

### 2. Open Graph metadata (FR-003, SC-006)

- View the built HTML `<head>` and confirm `og:title`, `og:description`, `og:image`, `og:url`, and
  `og:type`, with the full-logo URL as the image.

### 3. Navbar logo and links (FR-004, FR-005, SC-005)

- Confirm the navbar shows the full Foundly Labs logo with the text alternative "Foundly Labs".
- Click "Ecosistema" and confirm the page moves to the applications section.
- Click "Local-First" and confirm the page moves to the local-first rationale section.
- From `/privacy`, click both links and confirm they still reach the home-page sections.

### 4. Applications grid (FR-006, FR-010, FR-011, FR-012, SC-002, SC-003)

- Confirm four cards render: Foundly (Mobile Finance), Foundly POS, LRC-Maker, and Mixbit.
- Verify each card shows its category, status, target, and full description exactly as in
  [data-model.md](./data-model.md).
- Resize from mobile to desktop and confirm 1 column on small screens, 2 columns at `md`, and 4
  columns at `lg`.

### 5. Card styling (FR-013)

- Confirm cards are translucent (`bg-card-light/60`), blurred (`backdrop-blur-md`), with soft
  token-based borders and `rounded-2xl` corners.
- Confirm no literal brand hex values exist outside `src/styles/tokens.css`.

### 6. Hero CTAs (FR-008, FR-009, SC-004)

- Confirm the tagline and subtitle are unchanged.
- Confirm the primary "Explorar Ecosistema" and secondary "¿Por qué Local-First?" buttons are
  centered and reach `#apps` and `#manifesto` respectively.

### 7. Accessibility and no-JS (SC-007, edge cases)

- Tab through links and CTAs; confirm visible focus.
- Confirm the logo image has accessible alt text.
- Disable JavaScript and confirm navigation, the mobile menu, and the CTAs still work.

## Automated gates

```bash
npm run check   # astro check: 0 errors / 0 warnings
npm run lint    # ESLint: 0 problems (includes the no-hex guard)
npm run build   # static build: 0 errors / 0 warnings
```

## Contract validation matrix

| Contract                                                   | Validated by         |
| ---------------------------------------------------------- | -------------------- |
| [apps-data](./contracts/apps-data.contract.md)             | Scenarios 4          |
| [branding-layout](./contracts/branding-layout.contract.md) | Scenarios 1, 2, 3, 7 |
| [apps-grid-hero](./contracts/apps-grid-hero.contract.md)   | Scenarios 4, 5, 6, 7 |
| [data-model](./data-model.md)                              | Scenario 4           |
