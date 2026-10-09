# Contract: Public API Surface (`@foundly/ui`)

**Feature**: `specs/shared-ui/001-ui-component-library/` | **Date**: 2026-10-08

The library exposes a single public entrypoint. Consumers MUST import only from `@foundly/ui` (and the `@foundly/ui/tokens.css` subpath for raw CSS variables). Importing internal file paths is not part of the contract.

## Exports

```ts
// Theme
export { FoundlyThemeProvider } from './theme';
export { createFoundlyTheme } from './theme';
export type { FoundlyTheme, FoundlyThemeOptions } from './theme';

// Primitives
export { Button } from './components/Button';
export { Card } from './components/Card';
export { Badge } from './components/Badge';
export { Modal } from './components/Modal';
export { AlertDialog } from './components/AlertDialog';
export { DataTable } from './components/DataTable';
export { Chip } from './components/Chip';
export { TextField } from './components/TextField';
```

## Provider contract

```ts
interface FoundlyThemeProviderProps {
  children: React.ReactNode;
  /** Optional non-core overrides; core tokens cannot be redefined. */
  overrides?: FoundlyThemeOptions;
}
```

- Mounted once at the application root; all descendant components render themed (FR-001).
- Applies global baseline (reset + font) and the Clean Light UI theme.

## Primitive prop contracts (summary)

| Primitive | Required props | Key optional props | Variants / states |
| --------- | -------------- | ------------------ | ----------------- |
| `Button` | `children` | `variant`, `loading`, `disabled`, `startIcon`, `endIcon` | primary, secondary, destructive; default/hover/disabled/loading |
| `Card` | `children` | `header`, `media`, `actions`, `elevated` | — |
| `Badge` | `children` | `status`, `pill`, `icon` | positive, negative, warning, info, neutral |
| `Modal` | `open`, `onClose`, `title`, `children` | `actions`, `disableBackdropClose`, `disableEscapeClose` | open/closed lifecycle |
| `AlertDialog` | `open`, `onConfirm`, `onCancel`, `title` | `description`, `confirmLabel`, `cancelLabel`, `tone` | default/destructive |
| `DataTable` | `columns`, `rows` | `emptyMessage`, `onRowClick`, `dense` | default/empty |
| `Chip` | `label` | `onDelete`, `selectable`, `selected`, `color` | default/selectable/removable |
| `TextField` | — | `label`, `helperText`, `error`, `value`, `onChange` | default/focus/error/disabled |

## Rules

- Every export has explicit TypeScript types; no `any`, no implicit casts (constitution Principles IV).
- Named exports only; the library exports no aggregate icon barrel (constraint C2).
- The package MUST NOT import from `apps/*` (constitution §3.II).

## Verification

- A build/type check of any consumer (`apps/*`) resolves all imports from `@foundly/ui` with zero type errors.
- A test asserts each name above is exported from the entrypoint.
