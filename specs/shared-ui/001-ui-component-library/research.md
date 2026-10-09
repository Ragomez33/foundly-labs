# Phase 0 — Research: Shared UI Component Library (MUI v6)

**Feature**: `specs/shared-ui/001-ui-component-library/` | **Date**: 2026-10-08

This document resolves the technical unknowns from the plan's Technical Context. Each item records the decision, rationale and alternatives considered.

## R1. MUI version and styling engine

- **Decision**: Use `@mui/material` v6 with the default **Emotion** styling engine (`@emotion/react`, `@emotion/styled`); do not use Pigment CSS in this version.
- **Rationale**: The user explicitly requested MUI v6. Emotion is MUI v6's stable default and integrates cleanly with both Next.js and Vite/Astro. Pigment CSS is experimental in v6 and would add build-tooling risk across two different bundlers.
- **React 19 compatibility**: MUI added React 19 support to v6; pin `@mui/material` to `^6.3` (or the latest 6.x) which declares React 19 in its peer range. The `react-is@19` note only affects React 18 and below.
- **Alternatives considered**:
  - MUI v7 — more current, but out of scope; the request specifies v6.
  - Pigment CSS — better static extraction, rejected as experimental in v6.

## R2. Theme derivation from canonical tokens (and the no-hex ESLint guard)

- **Decision**: Keep `packages/ui/src/styles/tokens.css` as the human/app-facing source of truth and add a typed **`src/theme/tokens.json`** that mirrors the same values and feeds `createTheme`. A parity test asserts `tokens.json` matches the CSS variables.
- **Rationale**: MUI's `createTheme` needs concrete color values (for contrast auto-computation and `alpha()`), and CSS-variable strings break those helpers. At the same time, the project ESLint guard forbids hex literals in `packages/ui/src/**/*.{ts,tsx,js,jsx}`. A JSON token registry centralizes values without hex literals in component/theme source, so components stay token-driven and the guard keeps working. Centralizing colors in one registry is not a "magic color": it is the single token mapping point.
- **Alternatives considered**:
  - Palette values as `var(--token)` + MUI CSS-variables mode — avoids duplication but breaks `alpha()`/contrast math and complicates the theme API.
  - Add an ESLint exemption for a single `theme/tokens.ts` — viable, but changes global lint policy; deferred in favor of the JSON approach.
  - Generate the TS token map from `tokens.css` at build — robust but adds a generation step and tooling before it is needed.
- **Parity contract**: `contracts/token-parity.contract.md` defines the required 1:1 mapping and the automated check.

## R3. Package delivery model (source vs. build)

- **Decision**: **Ship TypeScript source** from `packages/ui` (keep `main`/`types`/`exports` pointing at `src`), and have consumers transpile it: Next.js via `transpilePackages: ['@foundly/ui']`, Astro/Vite natively.
- **Rationale**: The scaffold already points at `src/index.ts` and `files: ["src"]`; source shipping is the simplest correct pattern for an internal monorepo package and keeps a single source of truth for types. It avoids adding a bundler/toolchain before external distribution is needed.
- **Alternatives considered**:
  - `tsup`/`tsc` emit to `dist` — required only if the package is published or consumed outside the workspace; documented as a future step.
  - Pre-bundled ESM only — loses source-level types and complicates dev iteration.
- **Consequence**: A `typecheck` (`tsc --noEmit`) script is the package's correctness gate, complementing the consumer build (`npm run build` at root).

## R4. SSR strategy per consumer

- **Decision**:
  - **Next.js (book, store)**: consumers wrap the app root with `@mui/material-nextjs` `AppRouterCacheProvider` (App Router) around `FoundlyThemeProvider`.
  - **Astro (landing)**: MUI-based components are used only inside React islands; interactive islands requiring MUI render with `client:only="react"` (or `client:visible`) to avoid Emotion SSR extraction complexity. Static visuals remain Astro/Tailwind with shared tokens.
- **Rationale**: Next.js is a full React SSR app and has first-class MUI support; Astro is SSG-first (Zero-JS default) so MUI must not leak into static rendering. This keeps constitution Principle III satisfied.
- **Alternatives considered**:
  - Emotion server extraction in Astro — possible but adds fragile setup for little value on a static marketing site.
  - Using MUI for landing static sections — rejected (violates Zero-JS goal and inflates the static payload).

## R5. Component API design

- **Decision**: Export **wrapped** primitives under stable Foundly names rather than re-exporting raw MUI components:
  - `Button` (variants: `primary` | `secondary` | `destructive`; states: default/hover/disabled/loading) wrapping `@mui/material/Button`.
  - `Card` (optional `media`, `header`, `actions` slots) wrapping `Paper`.
  - `Badge` (semantic `status`: `positive` | `negative` | `warning` | `info` | `neutral`; optional `pill`/`icon`) implemented on top of token colors.
  - `Modal` wrapping `Dialog` (focus trap, ESC/backdrop dismissal configurable).
  - `AlertDialog` (confirmation/destructive) wrapping `Dialog` with `confirm`/`cancel` actions.
  - `DataTable` wrapping `Table`/`TableHead`/`TableBody`/`TableRow`/`TableCell` with an explicit empty state.
  - `Chip` wrapping `@mui/material/Chip` (removable/selectable).
  - `TextField` wrapping `@mui/material/TextField` (label, helper text, error state).
- **Rationale**: A consistent, brand-defaulted API is the library's value; raw MUI re-exports would push styling decisions back to every app. Stable names let MUI internals evolve without breaking consumers.
- **Alternatives considered**: re-export MUI as-is (rejected: no brand guarantee); build from scratch without MUI (rejected: contradicts the request and duplicates mature primitives).

## R6. Theme extension and typing

- **Decision**: Provide `createFoundlyTheme(overrides?)` and `FoundlyThemeProvider`. Extend MUI's `Theme`/`ThemeOptions` via module augmentation (`src/types/theme.d.ts`) to expose typed custom keys (e.g. surfaces and domain accents).
- **Rationale**: FR-003 requires apps to extend non-core values without redefining core tokens; typed augmentation prevents `any` and keeps strict typing.
- **Alternatives considered**: untyped cast to `any` (rejected by Principle IV).

## R7. Testing and accessibility tooling

- **Decision**: **Vitest + jsdom + React Testing Library** for behavior and **`vitest-axe`** for automated accessibility checks; components are tested with the theme provider wrapper.
- **Rationale**: No test runner exists yet in the monorepo; Vitest is native to the Vite ecosystem already used by Astro and is fast. `vitest-axe` provides the "zero critical violations" assertion required by SC-004. Alternatively `eslint-plugin-jsx-a11y` can complement (lint-level) checks.
- **Alternatives considered**: Jest (heavier, extra config for ESM/TS); Playwright (out of scope for a component library v1).

## R8. Token coverage mapping

- **Decision**: Map tokens to MUI theme slots as follows (full mapping in `contracts/theme.contract.md`): brand accent → `palette.primary`, semantic accents → `palette.success/error/warning/info`, surfaces/borders/text → custom palette keys (`palette.surface`, `palette.border`, `palette.text`) plus `palette.background`, domain accents → `palette.brand.{book,store,pos}`, radii → `shape.borderRadius` with named geometry, typography → Inter/system-ui with tabular numerals for numeric content.
- **Rationale**: Guarantees FR-002 (all brand values resolve to tokens) and gives SC-002 a checkable definition.
- **Alternatives considered**: ad-hoc per-component colors (rejected by Principle VI).

## Open items

None. All Technical Context unknowns are resolved; no `NEEDS CLARIFICATION` remains.
