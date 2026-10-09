# Contract: Theme ↔ Design Tokens

**Feature**: `specs/shared-ui/001-ui-component-library/` | **Date**: 2026-10-08

Defines how the Clean Light UI tokens map to the MUI theme. Guarantees FR-002 and SC-002 (all brand values resolve to tokens; zero hardcoded brand colors).

## Token categories

Source of truth: `packages/ui/src/styles/tokens.css` (mirror of `specs/system-design.md` v3.0.0), exposed to TypeScript through `src/theme/tokens.json`.

| Token category | Examples | Source section |
| -------------- | -------- | -------------- |
| Brand accent | `--accent-primary`, `--accent-primary-hover`, `--accent-primary-soft` | system-design §3.2 |
| Semantic | `--accent-positive[-soft]`, `--accent-negative[-soft]`, `--accent-warning[-soft]`, `--accent-info[-soft]` | §3.2 |
| Domain | `--brand-book`, `--brand-store`, `--brand-pos` | §3.3 |
| Surfaces | `--bg-app-body`, `--bg-header`, `--bg-footer`, `--bg-card-light`, `--bg-card-hover`, `--bg-badge-pill`, `--surface-glass` | §3.1 |
| Borders | `--border-subtle`, `--border-lavender` | §3.1 |
| Text | `--text-primary`, `--text-secondary`, `--text-muted` | §3.4 |
| Shadows | `--shadow-card`, `--shadow-fab` | constitution §6.I |

## Required mapping to the MUI theme

| MUI slot | Token(s) |
| -------- | -------- |
| `palette.primary.main` | `--accent-primary` |
| `palette.primary.dark` | `--accent-primary-hover` |
| `palette.primary.light` | `--accent-primary-soft` |
| `palette.success.*` | `--accent-positive` / `--accent-positive-soft` |
| `palette.error.*` | `--accent-negative` / `--accent-negative-soft` |
| `palette.warning.*` | `--accent-warning` / `--accent-warning-soft` |
| `palette.info.*` | `--accent-info` / `--accent-info-soft` |
| `palette.background.default` | `--bg-app-body` |
| `palette.background.paper` | `--bg-card-light` |
| `palette.text.primary` | `--text-primary` |
| `palette.text.secondary` | `--text-secondary` |
| `palette.text.disabled` | `--text-muted` |
| `palette.divider` | `--border-subtle` |
| `palette.surface.*` (custom) | `--bg-header`, `--bg-footer`, `--bg-card-hover`, `--bg-badge-pill`, `--surface-glass` |
| `palette.brand.book / .store / .pos` (custom) | `--brand-book` / `--brand-store` / `--brand-pos` |
| `shape.borderRadius` + named radii | 16px containers, 12px overlays, 9999px/8px controls |
| `shadows` | `--shadow-card`, `--shadow-fab` |
| `typography` | Inter / system-ui; `font-mono` + `tabular-nums` for numeric content |

## Rules

- A component MUST NOT declare a brand color outside these tokens; the ESLint guard for hex literals in `packages/ui/src/**` remains enforced and components stay compliant.
- Concrete values are centralized in `src/theme/tokens.json`; the theme module contains no hex literals.
- Semantic "soft" backgrounds use the dedicated `-soft` tokens rather than runtime `alpha()` on CSS-variable colors.

## Verification

- Theme introspection test: every brand palette entry equals its source token value.
- Lint: no hex literal in any `packages/ui/src/**` component or theme source file.
