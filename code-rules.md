# Foundly Landing Page — Code & TypeScript Standards

**Version:** 1.0.0 (Landing Web Domain)
**Scope:** Landing Page (Astro 5 + TypeScript + Tailwind CSS)
**Status:** Inviolable — Governed by constitution.md

## 1. Strict Typing Policy

The use of `any`, `unknown` without type guards, or implicit type casting (`as targetType`) is strictly forbidden. All props, data structures, and helper functions must be explicitly typed.

**Type Location Rules:**

- **Component Props**: Defined inside the Astro component frontmatter or React component file as an `interface Props`.
- **Content & Data Schemas**: Content collection schemas (pricing plans, features, FAQs, testimonials) must be typed and validated using `astro:content` and `zod`.
- **Global / Shared Types**: Placed in `src/types/index.ts`.

## 2. Astro 5 Architecture & Island Standards

### 2.1 Static First Philosophy

- Every page and component must be rendered as static HTML (`.astro`) by default.
- Interactive JavaScript is only allowed when strictly necessary (e.g., interactive calculators, mobile menu toggles, contact form submission).

### 2.2 React Islands Strategy (`client:*`)

When client-side UI hydration is required, isolate the component in React and assign the minimum necessary hydration directive:

- `client:load`: Only for above-the-fold critical interactions (e.g., mobile navigation drawer).
- `client:visible`: For interactive elements lower on the page (e.g., interactive pricing toggle, video modal, testimonials carousel).
- `client:idle`: For non-critical low-priority interactions.

## 3. Naming and Location Conventions

### 3.1 Directory Matrix

| Element | Naming Standard | Location | Example |
| --- | --- | --- | --- |
| Pages / Routes | kebab-case (`.astro`) | `src/pages/` | `src/pages/index.astro`, `src/pages/privacy.astro` |
| Astro Components | PascalCase (`.astro`) | `src/components/ui/` or `src/components/sections/` | `HeroSection.astro`, `Navbar.astro` |
| React Islands | PascalCase (`.tsx`) | `src/components/islands/` | `PricingCalculator.tsx`, `MobileMenu.tsx` |
| Layouts | PascalCase (`.astro`) | `src/layouts/` | `BaseLayout.astro` |
| Data / Content Collections | kebab-case (`.json` / `.ts`) | `src/content/` or `src/data/` | `src/data/features.ts`, `src/data/pricing.ts` |
| Utilities & Constants | camelCase (`.ts`) | `src/utils/` or `src/constants/` | `src/constants/theme.ts`, `src/utils/analytics.ts` |

## 4. UI, Styling & Design System Rules

### 4.1 Tailwind CSS & Brand Tokens

All styling must be driven by Tailwind CSS.

- **No Inline Magic Colors**: Colors must map strictly to the design system configured in `tailwind.config.mjs` (matching the Clean Light UI design system):
  - **Primary Accent**: `bg-accent-primary` (#6C5CE7)
  - **App Body**: `bg-app-body` (#FAFAFC / #F4F3F8)
  - **Card Light**: `bg-card-light` (#FFFFFF)
  - **Top Gradient Accent**: #C8B6FF / #D8B4FE
  - **Text Primary**: `text-primary` (#1E1B2E)
  - **Text Secondary**: `text-secondary` (#6B7280)

### 4.2 Card Styling Rule

Cards representing features, testimonials, or pricing tiers must strictly follow the visual system:

```html
<!-- GOOD: Clean Light UI Card Standard -->
<div class="bg-white border border-[#E6E4F0] rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
  <!-- Content -->
</div>
```

## 5. Separation of Content and Components

- Declaring static content arrays, pricing lists, FAQ text, or feature descriptions directly inside layout or section components is strictly forbidden.
- **Content Location**: All copy and landing content must reside in `src/data/` or Astro Content Collections (`src/content/`).
- **Component Purpose**: Astro section components (`HeroSection.astro`, `FeaturesSection.astro`) must only import data and render semantic HTML.

## 6. Performance & Web Vitals Execution

- **Images**: All images must use Astro's `<Image/>` component from `astro:assets` to enforce automatic WebP/AVIF generation, sizing, and lazy loading.
- **Fonts**: Fonts must be self-hosted locally or preloaded to eliminate cumulative layout shift (CLS) and FOIT.
- **Icons**: Use `astro-icon` or inline optimized SVGs. Including whole icon library bundles in client JS is strictly forbidden.

## 7. Form Submission & User Feedback

- **Interactive Forms**: Forms (e.g., lead generation, demo request, newsletter) must use client-side React islands or lightweight vanilla JS.
- **Feedback UI**: Success and error notifications must follow the visual identity (floating toast or clean lavender alert box with #6C5CE7 accents).
- **No Page Reloads**: Form submissions must be handled asynchronously (fetch API) with clear visual pending states.
