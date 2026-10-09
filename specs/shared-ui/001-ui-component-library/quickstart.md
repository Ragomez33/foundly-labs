# Quickstart & Validation Guide: Shared UI Component Library (MUI v6)

**Feature**: `001-ui-component-library` | **Date**: 2026-10-08

This guide defines how to run and validate the library end-to-end once implemented. It references the design contracts instead of duplicating them.

## Prerequisites

- Node.js ≥ 20 and npm (workspace root installed with `npm install`)
- Repository root: `foundly-labs`

## Setup

```bash
npm install
```

Expected: workspace dependencies (including `packages/ui`) install with no errors.

## Validate the library

### 1. Public API and typing (SC-003, SC-005)

```bash
npm run typecheck -w @foundly/ui
```

Expected: strict TypeScript check passes with **zero errors**. The test suite also asserts every name in `contracts/public-api.contract.md` is exported from `@foundly/ui`.

### 2. Token mapping and parity (SC-002, FR-002)

```bash
npm run test -w @foundly/ui -- token-parity
```

Expected: `tokens.css` ↔ `tokens.json` parity passes per `contracts/token-parity.contract.md`, and every theme palette entry equals its source token value per `contracts/theme.contract.md`.

### 3. Component behavior and accessibility (SC-004, FR-007–FR-012)

```bash
npm run test -w @foundly/ui
```

Expected: all primitive tests pass, including:
- Button/Card/Badge variants and states render with token-derived styles.
- Modal and AlertDialog trap focus, close via the documented mechanisms, and restore focus.
- DataTable renders rows and an explicit empty state.
- Chip removable/selectable behavior and TextField error state.
- `vitest-axe` reports **zero critical accessibility violations** for every interactive primitive.

### 4. Design-system compliance (constitution Principle VI)

```bash
npm run lint
```

Expected: ESLint passes with no hex-literal violations in `packages/ui/src/**`.

## Consume the library

### Next.js (`apps/book`, `apps/store`)

Wrap the app root once. Per `contracts/public-api.contract.md`:

```tsx
// apps/<app>/src/app/layout.tsx (App Router)
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { FoundlyThemeProvider } from '@foundly/ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppRouterCacheProvider>
          <FoundlyThemeProvider>{children}</FoundlyThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

Consumer must enable source transpilation: `transpilePackages: ['@foundly/ui']` in `next.config.mjs`.

### Astro (`apps/landing`)

Use MUI-based primitives only inside React islands (Zero-JS constraint C1), and keep static sections on Astro/Tailwind tokens:

```astro
---
import { FoundlyThemeProvider, Button } from '@foundly/ui';
---
<FoundlyThemeProvider client:only="react">
  <Button variant="primary">Empezar</Button>
</FoundlyThemeProvider>
```

Expected: static page output stays JS-free; the island hydrates only where used.

## End-to-end acceptance

1. `npm run typecheck -w @foundly/ui` → 0 errors.
2. `npm run test -w @foundly/ui` → all green, 0 critical a11y violations.
3. `npm run lint` → 0 hex-literal violations in `packages/ui`.
4. A consumer app imports from `@foundly/ui` only and builds successfully with the theme applied.

This proves SC-001–SC-006 end to end.
