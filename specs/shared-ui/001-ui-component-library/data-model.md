# Phase 1 — Data Model: Shared UI Component Library (MUI v6)

**Feature**: `specs/shared-ui/001-ui-component-library/` | **Date**: 2026-10-08

This is a UI library, so the "data model" describes the design-system entities, their attributes, relationships and validation rules. It is derived from the Key Entities in `spec.md`.

## Entity Overview

```text
DesignToken ──< (composes) ── Theme ── (is consumed by) ── ComponentPrimitive
ComponentPrimitive ──< (has) ── ComponentVariant
ComponentPrimitive ── (published through) ── ExportSurface
```

## 1. DesignToken

The smallest named brand value. Single source of truth chain: `specs/system-design.md` → `packages/ui/src/styles/tokens.css` → `src/theme/tokens.json` (machine mirror).

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | string | Canonical CSS variable name, e.g. `--accent-primary`. |
| `value` | string | Color/measure value (e.g. `#6C5CE7`), matching `tokens.css`. |
| `category` | enum | `surface` \| `accent` \| `semantic` \| `domain` \| `text` \| `border` \| `shadow` \| `radius` |
| `cssVariable` | string | The `var(--…)` reference used by CSS. |
| `themeSlot` | string \| null | Target MUI theme slot if mapped (see contracts/theme.contract.md). |

**Validation rules**
- `name` matches `^--[a-z0-9-]+$`.
- `value` for color categories is a valid CSS color; radii are valid lengths.
- Every token in `tokens.css` has an entry in `tokens.json` and vice versa (parity — see `contracts/token-parity.contract.md`).
- No token name is renamed without an amendment in `specs/system-design.md`.

## 2. Theme

The token-backed global appearance configuration.

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | string | `"Foundly Clean Light"`. |
| `mode` | enum | `light` only in this version. |
| `palette` | object | MUI palette + custom keys, all values sourced from `DesignToken`s. |
| `typography` | object | Inter/system-ui base; tabular numerals for numeric content. |
| `shape` | object | Named radii: containers 16px, overlays 12px, controls 9999px \| 8px. |
| `shadows` | object | Subtle lavender-tinted elevations. |
| `components` | object | Per-primitive default style/behavior overrides. |

**Relationships**: composed of many `DesignToken`s; consumed by every `ComponentPrimitive`.

**Validation rules**
- Every brand value in `palette` traces to a `DesignToken` (SC-002, zero hardcoded brand colors).
- `mode` is `light`; other modes are rejected until an amendment adds them.
- Extension API may override non-core values but must not mutate core token semantics.

## 3. ComponentPrimitive

A reusable exported UI building block.

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | string | Public export name (e.g. `Button`, `AlertDialog`). |
| `muiBase` | string \| null | Underlying MUI component when wrapped. |
| `variants` | ComponentVariant[] | Supported visual/behavioral modes. |
| `states` | enum[] | Subset of `default` \| `hover` \| `focus` \| `disabled` \| `loading` \| `error` \| `empty`. |
| `accessibilityRole` | string | Expected ARIA role/semantics. |
| `tokenDependencies` | string[] | Names of `DesignToken`s it renders with. |

**Validation rules**
- `name` is unique across the library.
- Every `ComponentPrimitive` exports explicit prop types (no `any`).
- Every interactive primitive supports keyboard operation and an accessible name.

## 4. ComponentVariant

A documented visual/behavioral mode of a primitive.

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | string | e.g. `primary`, `destructive`, `positive`. |
| `semantic` | enum | `brand` \| `positive` \| `negative` \| `warning` \| `info` \| `neutral`. |
| `tokenRefs` | string[] | `DesignToken`s that define its appearance. |

**Validation rules**
- Variant appearance is defined only through `tokenRefs` (no literal colors).

## 5. ExportSurface

The single public entrypoint through which consumers access the library.

| Field | Type | Description |
| ----- | ---- | ----------- |
| `entrypoint` | string | `@foundly/ui` (plus `@foundly/ui/tokens.css`). |
| `exports` | string[] | `FoundlyThemeProvider`, `createFoundlyTheme`, and the 8 primitives (+ theme types). |

**Validation rules**
- All primitives are reachable from the single entrypoint (FR-014).
- No internal file path is required by consumers.
- The package never imports from `apps/*` and introduces no cyclic dependencies.

## State Transitions

### Overlay lifecycle (`Modal`, `AlertDialog`)

```text
closed → opening → open → closing → closed
```

- Entering `open` moves focus inside the overlay and marks background content inert.
- `closing` is triggered by an action button, ESC, or backdrop (when enabled).
- On return to `closed`, focus is restored to the element that opened the overlay.

### Button states

```text
default → hover → active
default → disabled
default → loading → default
```

- `disabled` and `loading` are mutually exclusive in behavior; a loading button blocks activation.
