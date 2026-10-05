# Feature Specification: Branding Integration & Apps Grid

**Feature Branch**: `002-branding-apps-grid`

**Created**: 2026-10-05

**Status**: Draft

**Input**: User description: "Branding & apps-grid integration: brand isotipo as favicon, official title and Open Graph tags, full logo and updated navigation links in the navbar, Hero CTAs, a typed apps data structure for the four main applications, and a responsive Clean Light UI apps grid."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Brand identity and navigation (Priority: P1)

As a visitor, I immediately recognize that I am on the official Foundly Labs site (favicon, official title, full logo) and I can move to the ecosystem and local-first sections from the navigation.

**Why this priority**: Brand identity and a working navigation are prerequisites for every other part of this feature; the CTAs and grid anchors depend on the navigation targets existing.

**Independent Test**: Load any page and confirm the favicon and official title; inspect a shared link preview; confirm the navbar shows the full logo and that its links reach the ecosystem and local-first sections.

**Acceptance Scenarios**:

1. **Given** any page of the site, **When** the browser tab is shown, **Then** it displays the Foundly Labs isotipo favicon and the official title.
2. **Given** a link shared on a social platform, **When** a preview is generated, **Then** it shows the official brand title, description, and image.
3. **Given** the navbar, **When** I select "Ecosistema", **Then** the page moves to the applications grid section.
4. **Given** the navbar, **When** I select "Local-First", **Then** the page moves to the local-first rationale section.

---

### User Story 2 - Discover the ecosystem applications (Priority: P2)

As a visitor, I want to see the four main Foundly Labs projects with their category, status, target, and description, so I can understand what the ecosystem offers.

**Why this priority**: The applications grid is the core content of the feature and the primary destination of the main call to action.

**Independent Test**: Open the home page and confirm four application cards render with the specified content, arranged in one column on small screens and up to four columns on larger screens.

**Acceptance Scenarios**:

1. **Given** the home page, **When** the applications section is displayed, **Then** four cards are shown: Foundly (Mobile Finance), Foundly POS, LRC-Maker, and Mixbit.
2. **Given** an application card, **When** I read it, **Then** it shows the application name, category, status, target, and its full description.
3. **Given** a small screen, **When** the grid is displayed, **Then** the cards stack in a single column; on medium screens they display in two columns and on larger screens in four.

---

### User Story 3 - Hero calls to action (Priority: P3)

As a visitor, I want clear next steps from the Hero, so I can jump straight to the ecosystem or learn why local-first matters.

**Why this priority**: The CTAs improve discoverability of the grid and the rationale but depend on those sections existing first.

**Independent Test**: From the home page Hero, activate each CTA and confirm it scrolls to the corresponding section.

**Acceptance Scenarios**:

1. **Given** the Hero, **When** it renders, **Then** it shows the tagline "Local-First, Agile Commerce, Zero Compromise." and the subtitle "El ecosistema Foundly Labs: productos ágiles y local-first para comercio, finanzas y creación."
2. **Given** the Hero, **When** I activate the primary CTA "Explorar Ecosistema", **Then** the page moves to the applications section.
3. **Given** the Hero, **When** I activate the secondary CTA "¿Por qué Local-First?", **Then** the page moves to the local-first rationale section.

---

### Edge Cases

- When the full logo asset is unavailable, the navbar falls back to the brand isotipo plus the brand name so the identity is never blank.
- When JavaScript is disabled, navigation links and CTAs still resolve to their target sections.
- When an anchor link is used from a route other than the home page, it resolves to the corresponding section on the home page.
- When a description is longer than the card height, the card content wraps without overlapping adjacent cards.
- When the favicon is missing or unsupported, the page still loads without errors and falls back to a default icon.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The site MUST use the Foundly Labs isotipo as the browser favicon on every page.
- **FR-002**: The site MUST present the official title "Foundly Labs | Local-First Software Ecosystem" by default.
- **FR-003**: Pages MUST expose Open Graph metadata (title, description, image, and URL) consistent with the official brand.
- **FR-004**: The navigation bar MUST display the full Foundly Labs logo.
- **FR-005**: The navigation bar MUST provide links labeled "Ecosistema" and "Local-First" that lead to the applications section and the local-first rationale section, respectively.
- **FR-006**: The home page MUST provide an applications section that serves as the target of the "Ecosistema" navigation link and the primary Hero CTA.
- **FR-007**: The home page MUST provide a local-first rationale section that serves as the target of the "Local-First" navigation link and the secondary Hero CTA.
- **FR-008**: The Hero MUST display the tagline "Local-First, Agile Commerce, Zero Compromise." and the subtitle "El ecosistema Foundly Labs: productos ágiles y local-first para comercio, finanzas y creación."
- **FR-009**: The Hero MUST provide two centered call-to-action buttons: a primary "Explorar Ecosistema" and a secondary "¿Por qué Local-First?".
- **FR-010**: The system MUST provide a typed, reusable application data structure containing, for each application: name, category, status, target, and description.
- **FR-011**: The applications section MUST render the four projects with the following values:
  - Foundly (Mobile Finance) — Category "Finanzas Personales", Status "En Desarrollo", Target "iOS / Android (Expo)", description "Aplicación móvil de gestión financiera basada en la fórmula del Saldo Disponible (Net Available Balance). Control total de gastos, ingresos, deudas y ahorros en un entorno 100% local."
  - Foundly POS — Category "Comercio & Ventas", Status "Beta Activa", Target "Mobile / Tablet (SQLite + Drizzle)", description "Punto de venta ultrarrápido y local-first para pequeños comercios. Cero dependencia de APIs en la nube, precisión financiera en centavos enteros y registro de ventas en 2 taps."
  - LRC-Maker — Category "Multimedia & Tools", Status "Producción / Disponible", Target "Web / Desktop (Vite + React)", description "Herramienta de escritorio en navegador para sincronización de letras estilo karaoke. Procesamiento de audio de baja latencia y exportación .lrc / .ass 100% en el cliente sin servidores."
  - Mixbit — Category "Trading Engine", Status "En Desarrollo", Target "Full-Stack (Next.js + FastAPI)", description "Bot de Grid Trading local-first. Control de estrategias de trading, ejecución multiactivo con CCXT y persistencia privada en base de datos SQLite aislada."
- **FR-012**: The applications section MUST display its cards in a responsive grid: a single column on small screens, two columns on medium screens, and four columns on large screens.
- **FR-013**: Each application card MUST follow the Clean Light UI style: a translucent light card surface, a blur backdrop, soft borders drawn from the existing design tokens, and rounded corners.

### Key Entities _(include if feature involves data)_

- **Application**: A Foundly Labs product in the ecosystem. Attributes: name, category, status, target, description.
- **Navigation Link**: A navbar entry. Attributes: label, destination section.
- **Brand Asset**: A brand image used by the site. Kinds: favicon/isotipo, full logo.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: On 100% of pages, the browser tab shows the Foundly Labs favicon and the official title.
- **SC-002**: The applications section renders exactly 4 cards, each showing its category, status, target, and full description exactly as specified.
- **SC-003**: The applications grid displays as 1 column on small screens, 2 columns on medium screens, and 4 columns on large screens.
- **SC-004**: From the home page, both Hero CTAs navigate to the applications section and the local-first rationale section respectively, in 100% of attempts.
- **SC-005**: Every navigation link resolves to an existing section on the page with no broken anchors.
- **SC-006**: Shared links display the official title and brand metadata.
- **SC-007**: All interactive elements (navigation links, CTAs) are keyboard reachable and the brand images have accessible text alternatives.

## Assumptions

- The brand assets already added under `public/` (the F isotipo `icon-fl.png`/`favicon.svg` and the full logo `branding-logo-fl.png`) are the intended sources; the isotipo is used as the favicon and the full logo is used in the navbar.
- A local-first rationale section will be created on the home page, because both the navbar and the secondary CTA target it and a visible target is required for those links to work.
- Anchor links resolve to home-page sections (e.g., the applications and rationale sections); when triggered from another route they navigate back to the home page section.
- The four application entries and their copy are authoritative and displayed verbatim (category, status, target, and description).
- Category, status, and target are display labels; no additional localization or taxonomy is introduced in this feature.
- The implementation approach (static markup versus interactive island) is out of scope for this specification and is decided during planning.
