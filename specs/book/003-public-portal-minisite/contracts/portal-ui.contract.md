# Contract: Portal UI (hero, tabs and cards)

**Feature**: `specs/book/003-public-portal-minisite/` | **Date**: 2026-10-09

Fixes the visual structure and accessibility contract of the public mini-site. It is a UI contract for `apps/book`; all primitives come from `@foundly/ui` (C1, FR-018).

## Brand hero (FR-001…FR-004)

- Decorative cover banner using `primary.light` (lavender) as a full-width band.
- Identity row: avatar/logo (fallback: initials circle built from `Stack`+`Typography`), commercial name, category badge and status badges.
- "Sobre nosotros" biography, only when `bio` is present.
- Contact row: address, phone and social links (Instagram/WhatsApp as https anchors), rendered only for configured values.

## Tabs (FR-005…FR-008)

- Tab controller: pill `Button` elements with WAI-ARIA tab semantics (`role="tablist"`, `aria-selected`, `aria-controls`, arrow-key navigation — research R3).
- `Servicios` is the default tab.

| Tab                 | Content                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| Servicios (default) | `ServiceCard` list: name, description (if any), duration ("N min"), price (current rate), pill "Reservar" |
| Equipo / Especialistas | Specialists (active resources) with initials avatar + name + role; empty state when none              |
| Información & Políticas | Weekly `businessHours` per weekday + `PortalPolicy` list (fallback copy when empty)                   |

## Cards and tokens

- `ServiceCard` uses `@foundly/ui` `Card` (16px radius, `border.subtle`, `shadow.card`), bold headings, `text.secondary` body and a pill primary/secondary `Button`.
- Colors come only from theme tokens (`primary.main` #6C5CE7, `background.default` #FAF8FF, zinc text/borders).

## Guarantees (FR-019/FR-020, SC-005/SC-007)

- Keyboard-operable tabs and buttons with visible focus; automated a11y checks report zero critical violations.
- Mobile: single column layout, `flexWrap` rows, no horizontal overflow.