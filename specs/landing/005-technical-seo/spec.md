# Feature Specification: Technical SEO & Metadata

**Feature Branch**: `005-technical-seo`

**Created**: 2026-10-05

**Status**: Draft

**Input**: User description: "Implement the full SEO infrastructure for the Foundly Labs landing page: a reusable SEO component, Open Graph and Twitter Card metadata, Schema.org structured data, sitemap and robots.txt generation, and brand attribution to FORGE Labs (forgelab.lat)."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Discoverable and indexable by search engines (Priority: P1)

As the site owner, I want search engines to discover every public page, understand the canonical
URL of each page, and avoid duplicate-content issues, so the site ranks correctly and appears in
search results.

**Why this priority**: Indexability is the foundation of SEO; without crawlable canonical URLs,
a sitemap, and a permissive robots file, nothing else matters.

**Independent Test**: Build the site and confirm a sitemap listing all public routes and a robots
file that allows crawling and points to the sitemap; confirm every page declares a canonical URL.

**Acceptance Scenarios**:

1. **Given** the built site, **When** the sitemap is opened, **Then** it lists every public page with absolute URLs.
2. **Given** a crawler, **When** it requests the robots file, **Then** all agents are allowed and the sitemap location is advertised.
3. **Given** any public page, **When** its HTML is inspected, **Then** it contains a single, absolute, self-referencing canonical URL.
4. **Given** a page that omits SEO inputs, **When** it renders, **Then** sensible site-wide defaults are applied.

---

### User Story 2 - Rich, accurate link previews (Priority: P2)

As a person sharing or receiving a Foundly Labs link, I want the preview to show the correct brand
title, description, and image, so shared links look professional and trustworthy.

**Why this priority**: Social previews directly affect click-through and brand perception, but they
depend on the page metadata infrastructure being in place.

**Independent Test**: Inspect a built page's head for Open Graph and Twitter Card tags and confirm
the default title, description, and social image are present and consistent.

**Acceptance Scenarios**:

1. **Given** a built page, **When** its head is inspected, **Then** it includes Open Graph tags (site name, title, description, type, URL, image).
2. **Given** a built page, **When** its head is inspected, **Then** it includes Twitter Card tags with `summary_large_image`, title, description, and image.
3. **Given** a page that provides its own title/description/image, **When** it renders, **Then** those values override the defaults.
4. **Given** no page-specific image, **When** the page renders, **Then** the official brand social image is used.

---

### User Story 3 - Machine-readable brand and product data (Priority: P3)

As a search engine or AI assistant, I want structured data describing the organization and its
software products, so the brand and its parent company (FORGE Labs) are correctly understood.

**Why this priority**: Structured data improves entity understanding and rich results but is
valuable only once the pages are crawlable and well-described.

**Independent Test**: Inspect a built page for valid structured data describing the organization
and its products, including the parent organization FORGE Labs; validate it with a schema validator.

**Acceptance Scenarios**:

1. **Given** a built page, **When** the structured data is parsed, **Then** it describes the organization (name, URL, logo) and lists FORGE Labs as the parent organization.
2. **Given** a built page, **When** the structured data is parsed, **Then** it describes the ecosystem's software applications.
3. **Given** the structured data, **When** validated by a schema validator, **Then** it reports no errors.

### Edge Cases

- When a page provides a relative canonical URL, it is resolved to an absolute URL against the site origin.
- When the default title or description contains special characters (quotes, accents, ampersands), they are correctly escaped in both metadata and structured data.
- When no social image is available, the default brand image is used so previews never break.
- When a page is not intended for indexing, it is excluded from the sitemap.
- When the site origin is not configured, canonical/sitemap URLs degrade gracefully without breaking the build.
- When a page has duplicate or missing title/description, defaults ensure a unique, non-empty result.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The site MUST provide a single reusable SEO component that the base layout injects into every page's head and that accepts `title`, `description`, `image`, and `canonicalURL` inputs.
- **FR-002**: The default title MUST be "Foundly Labs | Ecosistema Software Local-First & Comercio Ágil".
- **FR-003**: The default description MUST be "Ecosistema de aplicaciones local-first para finanzas personales, comercio POS, sincronización karaoke y trading engine. Desarrollado por FORGE Labs."
- **FR-004**: Every page MUST declare a single, absolute, self-referencing canonical URL, defaulting to the current page unless overridden.
- **FR-005**: Every page MUST include Open Graph metadata: `og:site_name` = "Foundly Labs", plus `og:title`, `og:description`, `og:type` = website, `og:url`, and `og:image`.
- **FR-006**: Every page MUST include Twitter Card metadata: `twitter:card` = summary_large_image, plus `twitter:title`, `twitter:description`, and `twitter:image`.
- **FR-007**: The default social/OG image MUST be an optimized official brand asset.
- **FR-008**: Every page MUST include Schema.org structured data describing the organization, including `name` "Foundly Labs", its URL, its logo, and FORGE Labs ("FORGE Labs", https://www.forgelab.lat) as its parent organization.
- **FR-009**: The structured data MUST also describe the ecosystem's software applications.
- **FR-010**: The build MUST generate a sitemap that lists all public routes with absolute URLs.
- **FR-011**: The build MUST produce a robots file that allows all agents (`User-agent: *`, `Allow: /`) and advertises the sitemap location.
- **FR-012**: The site MUST define a canonical origin used to build absolute URLs for canonical links, social images, and the sitemap.
- **FR-013**: The SEO feature MUST NOT add executable client-side JavaScript to the page.
- **FR-014**: Page-level metadata MUST override site-wide defaults, and any omitted value MUST fall back to a default.

### Key Entities _(include if feature involves data)_

- **Page Metadata**: The per-page SEO inputs (title, description, image, canonical URL) and their resolved defaults.
- **Organization (structured data)**: The brand entity: name "Foundly Labs", URL, logo, and parent organization "FORGE Labs" (https://www.forgelab.lat).
- **Software Application (structured data)**: A product in the ecosystem (e.g. the applications shown on the landing page).
- **Sitemap Entry**: A public route with its absolute URL.
- **Robots Policy**: The crawl rules and the advertised sitemap location.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of public pages include a canonical URL, a title, a description, and both Open Graph and Twitter Card tags.
- **SC-002**: The generated sitemap lists 100% of the published public routes (currently the home, privacy, and terms pages).
- **SC-003**: The robots file is served at the site root, allows all agents, and references the sitemap.
- **SC-004**: The structured data validates with zero errors and identifies FORGE Labs as the parent organization.
- **SC-005**: Shared links display the brand title, description, and image in preview tools.
- **SC-006**: The feature adds zero executable client-side JavaScript, and the site keeps a 100 SEO score.
- **SC-007**: A page with no metadata inputs still renders complete default metadata.

## Assumptions

- The canonical origin is `https://foundlylabs.com` (already used elsewhere in the project).
- FORGE Labs is the parent organization, at `https://www.forgelab.lat`.
- The default social image is an optimized static asset served from the site (the official branding image or a dedicated OG image).
- Structured data is emitted as inline data (Schema.org JSON-LD), which is not executable JavaScript.
- Only the currently published public routes are indexed; any future private or utility pages are excluded.
- Sitemap generation uses an available build-time integration; the exact tool is decided during planning.
