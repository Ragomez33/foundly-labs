# Contract: Token Parity

**Feature**: `specs/shared-ui/001-ui-component-library/` | **Date**: 2026-10-08

Prevents drift between the human-facing tokens and the machine-readable registry used by the theme.

## Sources

1. `packages/ui/src/styles/tokens.css` — CSS custom properties under `:root` (executable source of truth).
2. `packages/ui/src/theme/tokens.json` — typed registry consumed by `createTheme`.
3. `specs/system-design.md` v3.0.0 — the normative design document all of the above mirror.

## Parity rules

- **P1**: Every CSS custom property declared in `tokens.css` has exactly one entry in `tokens.json` (same name, same value, case-insensitive hex comparison).
- **P2**: `tokens.json` contains no extra color/radius entries absent from `tokens.css`.
- **P3**: No token value is invented in `tokens.json`; every value is traceable to `specs/system-design.md`.
- **P4**: Renaming or adding a canonical token requires an amendment in `specs/system-design.md` before it is used.

## Verification

- An automated test parses `tokens.css` and `tokens.json` and asserts full name/value parity (P1–P2). The test fails the build on any mismatch.
- Manual review confirms P3–P4 during `/speckit.analyze`.
