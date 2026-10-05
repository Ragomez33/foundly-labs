# Foundly Labs — Landing Page

Static-first landing page for the Foundly Labs ecosystem. Built with Astro 5, Tailwind CSS v4
design tokens (Clean Light UI), React islands, and strict TypeScript.

## Stack

- Astro 5 (SSG / server-first islands architecture)
- Tailwind CSS v4 via `@tailwindcss/vite`
- React (`@astrojs/react`) for interactive islands only
- TypeScript in `strict` mode with the `@/*` path alias
- Zod-validated content collections

## Requirements

- Node.js ≥ 20 (tested with v24)
- npm

## Setup

```bash
npm install
```

## Scripts

| Command                | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the dev server at `http://localhost:4321` |
| `npm run build`        | Build the static site to `dist/`                |
| `npm run preview`      | Preview the production build                    |
| `npm run check`        | Type-check with `astro check`                   |
| `npm run lint`         | Lint with ESLint                                |
| `npm run format`       | Format with Prettier                            |
| `npm run format:check` | Verify formatting                               |

## Project structure

```text
src/
├── assets/          # Local branding assets
├── components/
│   ├── ui/          # Static UI primitives (.astro)
│   ├── sections/    # Landing sections (.astro)
│   └── islands/     # Interactive, hydratable islands (.tsx)
├── content/         # Content collection entries (pricing, faqs, features)
├── data/            # Static constants (siteConfig, navigation)
├── layouts/         # BaseLayout.astro (SEO, fonts, backgrounds)
├── pages/           # Routes (index, privacy, terms)
├── styles/          # global.css + tokens.css
├── types/           # Shared TypeScript types
└── utils/           # Formatters and analytics helpers
```

## Design tokens

The Clean Light UI palette is defined once in `src/styles/tokens.css` with Tailwind v4's `@theme`
directive and is the only permitted source of brand colors. Components must not contain literal
brand hex values (enforced by an ESLint guard in `eslint.config.js`).

## Governance & validation

This project follows Spec-Driven Development. See:

- `constitution.md` and `code-rules.md` for the non-negotiable rules
- `specs/001-project-scaffold/` for the feature spec, plan, and tasks
- `specs/001-project-scaffold/quickstart.md` for the full validation guide

Quick validation:

```bash
npm run check && npm run lint && npm run build
```

Then run Lighthouse against `dist/` and confirm 100/100 Desktop and ≥ 98 Mobile for Performance,
Accessibility, and SEO.
