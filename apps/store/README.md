# apps/store — Foundly Store

Aplicación SaaS de **e-commerce cloud**: productos, inventario y delivery.

- **Stack previsto**: Next.js / React 19 (módulo SaaS interactivo).
- **Specs**: `specs/store/` (subordinadas a `/specs` y a `constitution.md`).
- **UI**: consume el design system `@foundly/ui`. Envuelve el layout raíz con `AppRouterCacheProvider` (de `@mui/material-nextjs`) + `FoundlyThemeProvider`, y añade `transpilePackages: ['@foundly/ui']` en `next.config.mjs`.

> Carpeta reservada. La implementación arranca cuando exista una spec aprobada (SDD: "No spec, no code").
