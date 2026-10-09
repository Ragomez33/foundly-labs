---
description: "Task list for the Shared UI Component Library (MUI v6) feature"
---

# Tasks: Shared UI Component Library (MUI v6 ThemeProvider & Base Components)

**Input**: Design documents from `specs/shared-ui/001-ui-component-library/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: INCLUDED — the spec requires automated accessibility checks (SC-004) and the plan/quickstart define a Vitest + React Testing Library + `vitest-axe` suite, so test tasks are part of this task list.

**Organization**: Tasks are grouped by user story (US1–US4) to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

All source lives in the `packages/ui` workspace package. Tests are co-located next to their source as `*.test.tsx` / `*.test.ts`.

- Components: `packages/ui/src/components/<Name>/`
- Theme: `packages/ui/src/theme/`
- Types: `packages/ui/src/types/`
- Public entrypoint: `packages/ui/src/index.ts`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Package tooling and configuration.

- [X] T001 Update `packages/ui/package.json`: add peer deps `@mui/material` (^6, React 19-compatible ≥ 6.3), `@emotion/react`, `@emotion/styled`, `@mui/icons-material`, `react`/`react-dom` (^19); add dev deps `typescript`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `vitest-axe`, `@types/react`, `@types/react-dom`; add scripts `typecheck` (`tsc --noEmit`), `test` (`vitest run`), `test:watch` (`vitest`), `lint`. Keep `main`/`types`/`exports` pointing at `src` (source-shipping per research R3).
- [X] T002 [P] Create `packages/ui/tsconfig.json`: strict mode, `jsx: react-jsx`, `moduleResolution: bundler`, `resolveJsonModule: true`, `noEmit: true`, `noUncheckedIndexedAccess: true`, include `src`.
- [X] T003 [P] Set up the Vitest harness in `packages/ui/vitest.config.ts` (jsdom environment, globals, setup file) and `packages/ui/vitest.setup.ts` (import `@testing-library/jest-dom`; register `vitest-axe` matchers).
- [X] T004 [P] Declare MUI theme module augmentation types in `packages/ui/src/types/theme.d.ts`: extend `Theme`/`ThemeOptions` with custom `palette.surface` (`bg.header`, `bg.footer`, `bg.cardHover`, `bg.badgePill`, `surface.glass`), `palette.border` (`subtle`, `lavender`) and `palette.brand` (`book`, `store`, `pos`).
- [X] T005 Run `npm install` at the repository root to wire workspace dependencies.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Token registry and test baseline that ALL user stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T006 Create the canonical token registry `packages/ui/src/theme/tokens.json` mirroring `packages/ui/src/styles/tokens.css` (per `contracts/token-parity.contract.md`). Each entry MUST satisfy the `DesignToken` entity: `name` matching `^--[a-z0-9-]+$`, `value` (valid CSS color/length), `category` in `surface|accent|semantic|domain|text|border|shadow|radius`, `cssVariable`, and `themeSlot`. Values are traceable to `specs/system-design.md` v3.0.0; do not invent values.
- [X] T007 [P] Implement the typed token accessor in `packages/ui/src/theme/tokens.ts`: export the `DesignToken` interface, a typed `tokens` object, and helpers used by the theme. No `any`; explicit types only.
- [X] T008 [P] Add the token-parity test `packages/ui/src/theme/tokens.parity.test.ts` implementing rules P1–P2 from `contracts/token-parity.contract.md` (every `tokens.css` custom property has exactly one `tokens.json` entry with an equal value, case-insensitive for hex; no extras).
- [X] T009 Create the public entrypoint `packages/ui/src/index.ts` that re-exports the theme surface and all primitives (starts with the theme; extended in each story phase). Per `contracts/public-api.contract.md`, only named exports from this single entrypoint.

**Checkpoint**: Token registry + test harness ready — user story implementation can begin.

---

## Phase 3: User Story 1 - Brand-consistent theme provider (Priority: P1) 🎯 MVP

**Goal**: Deliver `FoundlyThemeProvider` and `createFoundlyTheme` so any app inherits the Clean Light UI identity from the canonical tokens.

**Independent Test**: Wrap a trivial component tree in `FoundlyThemeProvider`; assert rendered palette/typography/radius values equal their source tokens and that the provider renders children without errors.

### Tests for User Story 1 ⚠️

> Write these tests FIRST and ensure they FAIL before implementation.

- [X] T010 [P] [US1] Theme mapping test `packages/ui/src/theme/createTheme.test.ts`: assert every brand palette entry equals its source token per `contracts/theme.contract.md` (primary/success/error/warning/info/background/text/divider/custom surface/brand/radii), and that no component/theme source file contains a hex literal.
- [X] T011 [P] [US1] Provider test `packages/ui/src/theme/FoundlyThemeProvider.test.tsx`: renders children, applies the default theme, accepts non-core `overrides` without mutating core tokens (FR-003), and passes `vitest-axe` with zero critical violations.

### Implementation for User Story 1

- [X] T012 [US1] Implement `createFoundlyTheme` in `packages/ui/src/theme/createTheme.ts`: build the MUI theme from `tokens.ts` following the full mapping in `contracts/theme.contract.md` (`mode: 'light'` only in this version); include typography (Inter/system-ui, tabular numerals for numeric content), named radii (16px containers, 12px overlays, 9999px/8px controls) and shadows (`--shadow-card`, `--shadow-fab`).
- [X] T013 [US1] Implement `FoundlyThemeProvider` in `packages/ui/src/theme/FoundlyThemeProvider.tsx`: wrap MUI `ThemeProvider` with the default theme plus `CssBaseline`; expose the `FoundlyThemeProviderProps` contract (`children`, optional `overrides`).
- [X] T014 [US1] Create the theme barrel `packages/ui/src/theme/index.ts` exporting `FoundlyThemeProvider`, `createFoundlyTheme`, `FoundlyTheme`, `FoundlyThemeOptions`, and re-export them from `packages/ui/src/index.ts`.

**Checkpoint**: US1 is fully functional and independently testable (theme + provider).

---

## Phase 4: User Story 2 - Base primitives Button, Card, Badge (Priority: P2)

**Goal**: Deliver the most-used primitives with documented variants and states.

**Independent Test**: Render each primitive across all documented variants/states and confirm token-derived styling, keyboard operation and zero critical a11y violations.

### Tests for User Story 2 ⚠️

- [X] T015 [P] [US2] Tests `packages/ui/src/components/Button/Button.test.tsx`: variants `primary|secondary|destructive`, states default/hover/disabled/loading, `startIcon`/`endIcon`, keyboard activation, `vitest-axe` clean.
- [X] T016 [P] [US2] Tests `packages/ui/src/components/Card/Card.test.tsx`: optional `header`/`media`/`actions` slots, consistent surface/border/radius, `elevated` variant.
- [X] T017 [P] [US2] Tests `packages/ui/src/components/Badge/Badge.test.tsx`: statuses `positive|negative|warning|info|neutral`, optional `pill`/`icon`, long-label overflow behavior.

### Implementation for User Story 2

- [X] T018 [P] [US2] Implement `Button` in `packages/ui/src/components/Button/Button.tsx` (wrapping `@mui/material/Button`); props: `children`, `variant`, `loading`, `disabled`, `startIcon`, `endIcon`. No literal colors; use theme tokens.
- [X] T019 [P] [US2] Implement `Card` in `packages/ui/src/components/Card/Card.tsx` (wrapping `Paper`); props: `children`, `header`, `media`, `actions`, `elevated`.
- [X] T020 [P] [US2] Implement `Badge` in `packages/ui/src/components/Badge/Badge.tsx`; props: `children`, `status`, `pill`, `icon`.
- [X] T021 [US2] Export the primitives via `packages/ui/src/components/index.ts` and re-export from `packages/ui/src/index.ts` (depends on T018–T020).

**Checkpoint**: US1 AND US2 work independently.

---

## Phase 5: User Story 3 - Overlays Modal and AlertDialog (Priority: P3)

**Goal**: Deliver accessible overlay primitives with correct focus and dismissal behavior.

**Independent Test**: Open each overlay; verify focus containment and restoration, and closing via action/ESC/backdrop per configuration.

### Tests for User Story 3 ⚠️

- [X] T022 [P] [US3] Tests `packages/ui/src/components/Modal/Modal.test.tsx`: `open`/`onClose`, focus trap on open, focus restore on close, ESC and backdrop dismissal toggles (`disableEscapeClose`, `disableBackdropClose`), `vitest-axe` clean.
- [X] T023 [P] [US3] Tests `packages/ui/src/components/AlertDialog/AlertDialog.test.tsx`: `onConfirm`/`onCancel` fire and close the dialog, `tone: destructive` styling, `vitest-axe` clean.

### Implementation for User Story 3

- [X] T024 [P] [US3] Implement `Modal` in `packages/ui/src/components/Modal/Modal.tsx` (wrapping `Dialog`); props: `open`, `onClose`, `title`, `children`, `actions`, `disableBackdropClose`, `disableEscapeClose`. Implement the `closed→opening→open→closing→closed` lifecycle with focus management (data-model.md).
- [X] T025 [P] [US3] Implement `AlertDialog` in `packages/ui/src/components/AlertDialog/AlertDialog.tsx` (wrapping `Dialog`); props: `open`, `onConfirm`, `onCancel`, `title`, `description`, `confirmLabel`, `cancelLabel`, `tone`.
- [X] T026 [US3] Export the overlays via `packages/ui/src/components/index.ts` and re-export from `packages/ui/src/index.ts` (depends on T024–T025).

**Checkpoint**: US1–US3 work independently.

---

## Phase 6: User Story 4 - Data display and form primitives DataTable, Chip, TextField (Priority: P4)

**Goal**: Deliver table, chip and input primitives for lists, filters and data-entry flows.

**Independent Test**: Render a table with rows and empty state, chips in removable/selectable modes, and text fields in default/error states.

### Tests for User Story 4 ⚠️

- [X] T027 [P] [US4] Tests `packages/ui/src/components/DataTable/DataTable.test.tsx`: renders `columns`/`rows`, shows explicit `emptyMessage` when `rows` is empty, `onRowClick`, `dense` variant.
- [X] T028 [P] [US4] Tests `packages/ui/src/components/Chip/Chip.test.tsx`: `label`, `onDelete` (removable), `selectable`/`selected`, `color`.
- [X] T029 [P] [US4] Tests `packages/ui/src/components/TextField/TextField.test.tsx`: `label`, `helperText`, `error` state, `value`/`onChange`, disabled state.

### Implementation for User Story 4

- [X] T030 [P] [US4] Implement `DataTable` in `packages/ui/src/components/DataTable/DataTable.tsx` (wrapping `Table`/`TableHead`/`TableBody`/`TableRow`/`TableCell`); props: `columns`, `rows`, `emptyMessage`, `onRowClick`, `dense`.
- [X] T031 [P] [US4] Implement `Chip` in `packages/ui/src/components/Chip/Chip.tsx` (wrapping `@mui/material/Chip`); props: `label`, `onDelete`, `selectable`, `selected`, `color`.
- [X] T032 [P] [US4] Implement `TextField` in `packages/ui/src/components/TextField/TextField.tsx` (wrapping `@mui/material/TextField`); props: `label`, `helperText`, `error`, `value`, `onChange`.
- [X] T033 [US4] Export the primitives via `packages/ui/src/components/index.ts` and re-export from `packages/ui/src/index.ts` (depends on T030–T032).

**Checkpoint**: All four user stories are independently functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, consumer integration notes and end-to-end validation.

- [X] T034 [P] Expand `packages/ui/README.md` with per-component usage examples, theme extension (`createFoundlyTheme`/`FoundlyThemeProvider`) and the token-mapping summary.
- [X] T035 [P] Add consumer integration notes to `apps/book/README.md` and `apps/store/README.md` (App Router `AppRouterCacheProvider` + `transpilePackages: ['@foundly/ui']`).
- [X] T036 [P] Add the landing island usage note to `apps/landing/README.md` (MUI only inside React islands, `client:only="react"`).
- [X] T037 Run full validation from `quickstart.md`: `npm run typecheck -w @foundly/ui`, `npm run test -w @foundly/ui`, `npm run lint`, and `npm run build`.
- [X] T038 Remove the placeholder comments in `packages/ui/src/index.ts` and confirm the public surface matches `contracts/public-api.contract.md` exactly.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories.
- **User Stories (Phase 3–6)**: All depend on Foundational. US2/US3/US4 additionally depend on US1 (the provider) to render components themed.
- **Polish (Phase 7)**: Depends on the desired user stories being complete.

### User Story Dependencies

- **US1 (P1)**: After Foundational — no dependencies. **MVP.**
- **US2 (P2)**: After Foundational + US1 (uses the provider for rendering).
- **US3 (P3)**: After Foundational + US1.
- **US4 (P4)**: After Foundational + US1.
- US2, US3, US4 are independent of each other and can be built in parallel.

### Within Each User Story

- Tests MUST be written and FAIL before implementation.
- Implement primitives before exporting them from the barrel/entrypoint.

### Parallel Opportunities

- Setup: T002, T003, T004 in parallel.
- Foundational: T007, T008 in parallel.
- Each story's test tasks ([P]) run in parallel, then the primitive implementations ([P]) run in parallel.
- US2, US3, US4 can be worked by different developers once US1 is done.

---

## Parallel Example: User Story 2

```bash
# Tests first (can run together):
Task: "Tests for Button in packages/ui/src/components/Button/Button.test.tsx"
Task: "Tests for Card in packages/ui/src/components/Card/Card.test.tsx"
Task: "Tests for Badge in packages/ui/src/components/Badge/Badge.test.tsx"

# Then implementations (can run together):
Task: "Implement Button in packages/ui/src/components/Button/Button.tsx"
Task: "Implement Card in packages/ui/src/components/Card/Card.tsx"
Task: "Implement Badge in packages/ui/src/components/Badge/Badge.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup).
2. Complete Phase 2 (Foundational).
3. Complete Phase 3 (US1 theme + provider).
4. **STOP and VALIDATE**: run `npm run test -w @foundly/ui` and `npm run typecheck -w @foundly/ui`.
5. Demo the themed provider — this alone is the MVP.

### Incremental Delivery

1. Setup + Foundational → foundation ready.
2. US1 → validate → demo (MVP).
3. US2 → validate → demo.
4. US3 → validate → demo.
5. US4 → validate → demo.
6. Polish (Phase 7) → run `quickstart.md` end-to-end.

---

## Notes

- [P] tasks touch different files and have no incomplete dependencies.
- [Story] labels map each task to its user story for traceability.
- The ESLint guard forbids hex literals in `packages/ui/src/**`; keep all colors token-driven (T010/T037 enforce this).
- This feature lives in the `shared-ui` domain: `specs/shared-ui/001-ui-component-library/`.
- Commit after each task or logical group.
