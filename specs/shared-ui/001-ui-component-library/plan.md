# Implementation Plan: Shared UI Component Library (MUI v6 ThemeProvider & Base Components)

**Branch**: `001-ui-component-library` | **Date**: 2026-10-08 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/shared-ui/001-ui-component-library/spec.md`

**Note**: This plan is produced by `/speckit.plan` and describes the technical approach and design artifacts for the `shared-ui` domain feature.

## Summary

Turn `packages/ui` (`@foundly/ui`) into the shared Clean Light UI component library: a single token-driven theme provider built on MUI v6, plus a curated set of base primitives (Button, Card, Badge, Modal, AlertDialog, DataTable, Chip, TextField) exported from one strictly-typed public entrypoint.

The theme is derived exclusively from the canonical design tokens already defined in `packages/ui/src/styles/tokens.css` (the executable mirror of `specs/system-design.md` v3.0.0). The package ships as TypeScript source consumed by the workspace apps (`apps/landing` via islands, `apps/book` and `apps/store`), never imports from `apps/*`, and stays SSR-safe.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict), React 19, Node.js ≥ 20

**Primary Dependencies**: `@mui/material` v6 (React 19-compatible, ≥ 6.3), `@emotion/react` ^11, `@emotion/styled` ^11, `@mui/icons-material` ^6 (optional, peer). Dev/test: Vitest, jsdom, `@testing-library/react`, `@testing-library/user-event`, `vitest-axe`.

**Storage**: N/A

**Testing**: Vitest + jsdom + React Testing Library, with `vitest-axe` for automated accessibility assertions

**Target Platform**: Browser; consumed from Astro 5 (React islands) and Next.js (React 19) inside the monorepo

**Project Type**: library — shared design-system package in an npm-workspaces monorepo

**Performance Goals**: Tree-shakeable named exports; zero impact on `apps/landing` static (zero-JS) rendering; no full icon-set barrel imports; theme/provider kept minimal

**Constraints**: No hex literals in `packages/ui/src/**` components (ESLint guard in `eslint.config.js`); `packages/*` never imports `apps/*`; SSR-safe in Next.js App Router and Astro islands; WCAG AA contrast and keyboard operability

**Scale/Scope**: 1 theme provider + 8 base primitives; consumed by 3 apps (`landing`, `book`, `store`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Authority hierarchy (Principle 1): `specs/business-model.md` > `constitution.md` > `specs/architecture.md` > `code-rules.md` > specs de dominio.

| Gate | Source | Status |
| ---- | ------ | ------ |
| I. Rule of Law — spec references `specs/business-model.md`; monorepo boundaries respected | constitution §1 | PASS |
| II. Spec-Driven Development — `spec.md` approved and precedes this plan | constitution §5.I | PASS |
| III. Server-First & Zero-JS — library must not force client JS into landing's static output; MUI confined to interactive islands | constitution §5.II | PASS (constraint C1) |
| IV. Strict Typing — no `any`; explicit prop contracts; `tsc --noEmit` as a gate | constitution §5.IV | PASS |
| V. Performance & Core Web Vitals — tree-shakeable exports, no icon barrel, landing unaffected | constitution §5.III | PASS (constraint C2) |
| VI. Clean Light UI — theme derived solely from canonical tokens; no magic colors | constitution §6, `code-rules.md` §4 | PASS |
| Packages rules — `packages/*` never imports `apps/*`; acyclic dependencies | constitution §3.II | PASS |
| Workflow gates — ESLint + type check + build must pass | constitution §8 | PASS |

**Constraints introduced by gates**:
- **C1**: On `apps/landing`, MUI-based components are only used inside React islands (`client:*`); static page composition remains Astro/Tailwind with the shared tokens.
- **C2**: The public entrypoint exports named components only; consumer apps import exactly what they use, and no aggregate icon barrel is exported.

No unjustified violations → Complexity Tracking stays empty.

## Project Structure

### Documentation (this feature)

```text
specs/shared-ui/001-ui-component-library/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created here)
```

### Source Code (repository root)

```text
packages/ui/
├── src/
│   ├── index.ts                     # public entrypoint (theme + primitives)
│   ├── theme/
│   │   ├── tokens.json              # canonical token values (machine mirror)
│   │   ├── tokens.ts                # typed accessor + parity assertions
│   │   ├── createTheme.ts           # builds the Clean Light UI MUI theme
│   │   ├── FoundlyThemeProvider.tsx # provider (MUI ThemeProvider + CssBaseline)
│   │   └── index.ts
│   ├── components/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Badge/
│   │   ├── Modal/
│   │   ├── AlertDialog/
│   │   ├── DataTable/
│   │   ├── Chip/
│   │   └── TextField/
│   ├── styles/
│   │   └── tokens.css               # canonical tokens (already exists)
│   └── types/
│       └── theme.d.ts               # MUI module augmentation (custom palette keys)
├── vitest.config.ts
├── vitest.setup.ts
├── tsconfig.json
├── package.json
└── README.md
```

**Structure Decision**: A single shared package under `packages/ui` (no new app, no new top-level directory). Components are grouped one folder per primitive so each owns its implementation, styles and tests. Consumers import only from `@foundly/ui`.

## Complexity Tracking

> No constitution violations to justify.

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| — | — | — |
