# Contract: Portal Profile (public data surface)

**Feature**: `specs/book/003-public-portal-minisite/` | **Date**: 2026-10-09

Defines the read surface of the public mini-site. All data flows through `apps/book/src/features/public-booking/queries.ts` and MUST respect tenant status (FR-016).

## Resolve result

`getPublicBusiness(slug)` returns:

| Outcome   | Shape                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------- |
| available | `PublicBusinessProfile` (below)                                                                    |
| unavailable | `{ status: 'unavailable'; reason: 'not-found' \| 'draft' \| 'suspended' }`                    |

## PublicBusinessProfile

| Field         | Type                                                          | Source                     |
| ------------- | ------------------------------------------------------------- | -------------------------- |
| `slug`        | string                                                        | `Tenant.slug`              |
| `name`        | string                                                        | `Tenant.name`              |
| `category`    | string                                                        | `Tenant.category`          |
| `cover`       | string \| null                                                | `Tenant.cover`             |
| `avatar`      | string \| null                                                | explicit `Tenant.avatar`   |
| `bio`         | string \| null                                                | `Tenant.bio`               |
| `address`     | string \| null                                                | `Tenant.address`           |
| `phone`       | string \| null                                                | `Tenant.phone`             |
| `social`      | `{ instagram?: string; whatsapp?: string } \| null`           | `Tenant.social`            |
| `services`    | `{ id, name, description, durationMinutes, priceCents, currency }[]` | `Service` + current `Rate` (R6) |
| `specialists` | `{ id, name, role, avatar, bio }[]` (active only)             | `Resource` (+ metadata)    |
| `weeklyHours` | `{ weekday, isOpen, startTime, endTime }[7]`                  | `Tenant.businessHours`     |
| `policies`    | `{ title, body }[]`                                           | `PortalPolicy`             |

## Rules

- Only `active` tenants resolve to `available` (FR-016); draft/suspended/unknown return `unavailable` with zero data.
- `services` excludes inactive services; `specialists` excludes inactive resources (FR-006/FR-007).
- `priceCents`/`currency` come from the current applicable rate (effective period contains "now").
- Optional profile fields that are `null` are omitted by the UI rather than rendered as empty values (FR-003/FR-004).