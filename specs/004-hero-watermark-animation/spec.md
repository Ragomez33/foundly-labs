# Feature Specification: Hero Watermark Animation

**Feature Branch**: `004-hero-watermark-animation`

**Created**: 2026-10-05

**Status**: Draft

**Input**: User description: "Add the Foundly Labs 'F' isotipo as an animated watermark behind the main Hero typography, using pure CSS animation to preserve the Zero-JS rule."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Subtle brand watermark behind the Hero (Priority: P1)

As a visitor, I see a large, faint Foundly Labs isotipo behind the Hero heading that reinforces the
brand without harming readability, so the hero feels branded and premium while the message stays the
focus.

**Why this priority**: The watermark itself is the core deliverable; the motion and accessibility
aspects refine it.

**Independent Test**: Load the home page and confirm a large, very faint isotipo sits centered
behind the heading, the heading and subtitle stay fully legible, and the watermark never intercepts
clicks or focus.

**Acceptance Scenarios**:

1. **Given** the home page, **When** the Hero renders, **Then** a large isotipo is displayed centered behind the main heading.
2. **Given** the Hero, **When** I read the heading and subtitle, **Then** their legibility and contrast are unaffected by the watermark.
3. **Given** the watermark, **When** I hover or click over it, **Then** no interaction is captured and focus never lands on it.
4. **Given** the Hero content (badge, heading, subtitle, CTAs), **When** the page renders, **Then** all existing content is unchanged and appears above the watermark.

---

### User Story 2 - Elegant continuous motion (Priority: P2)

As a visitor, I perceive a slow, smooth 3D side-to-side sway of the watermark that adds life to the
Hero without distracting from the message.

**Why this priority**: Motion is the differentiator of this feature, but the watermark is already
valuable when static.

**Independent Test**: Watch the Hero for several seconds and confirm the watermark moves
continuously and smoothly (a gentle 3D sway roughly every 12 seconds), with no abrupt jumps or
stutter.

**Acceptance Scenarios**:

1. **Given** the Hero, **When** the watermark animates, **Then** the motion is continuous and smooth.
2. **Given** the motion, **When** timing a full cycle, **Then** it sways side to side in about 12 seconds.
3. **Given** the page bundle, **When** the feature is added, **Then** no additional client-side JavaScript is shipped.

---

### User Story 3 - Accessible and performant motion (Priority: P3)

As a visitor who prefers reduced motion, or who is on a small/low-power device, I get a calm,
non-distracting Hero with no layout or scrolling problems.

**Why this priority**: Accessibility and mobile correctness are required for release but depend on
the watermark existing.

**Independent Test**: Enable the OS reduced-motion preference and confirm the watermark stops
moving; resize to a narrow viewport and confirm no horizontal scrolling or clipping issues.

**Acceptance Scenarios**:

1. **Given** a user with reduced-motion enabled, **When** the Hero renders, **Then** the watermark does not animate (it may remain visible but static).
2. **Given** a narrow viewport (down to 320px wide), **When** the Hero renders, **Then** the watermark does not cause horizontal scroll or push content.
3. **Given** assistive technology, **When** the page is read, **Then** the watermark is ignored as decorative content.

### Edge Cases

- When the viewport is very small, the watermark stays within the Hero bounds and does not overlap or obscure the CTAs.
- When the device is low-power, the motion uses only compositor-friendly changes so it does not cause visible jank.
- When printed, the watermark does not reduce text legibility.
- When the isotipo asset is unavailable, the Hero still renders correctly with only the text and CTAs (the watermark degrades away).
- When high-contrast/forced-colors mode is active, the watermark does not compromise text contrast.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The Hero MUST display a large rendering of the official Foundly Labs "F" isotipo as a decorative background layer behind the main heading, using the official brand asset.
- **FR-002**: The watermark MUST be centered behind the heading area and positioned behind all Hero content.
- **FR-003**: The watermark MUST use a legible but non-obstructive opacity so it is clearly visible while the heading, subtitle, and CTAs remain fully legible.
- **FR-004**: The watermark MUST have a subtle blur/soft-glow treatment.
- **FR-005**: The watermark MUST NOT capture pointer input or keyboard focus.
- **FR-006**: The watermark MUST scale with the viewport and remain crisp and sharp.
- **FR-007**: The watermark MUST animate with a slow, organic 3D side-to-side sway (rotation about the vertical axis with a slight horizontal tilt), cycling roughly every 12 seconds.
- **FR-008**: The animation MUST be implemented without adding client-side JavaScript.
- **FR-009**: When the user's system requests reduced motion, the animation MUST be paused or disabled.
- **FR-010**: The Hero container MUST clip overflow so the watermark never causes horizontal scrolling, including on small screens.
- **FR-011**: The watermark MUST be exposed to assistive technologies as decorative (excluded from the accessibility tree).
- **FR-012**: The existing Hero elements (badge, heading, subtitle, and both CTAs) MUST remain unchanged and render above the watermark.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: The Hero heading and subtitle remain fully legible, with text contrast unchanged from before the feature.
- **SC-002**: The watermark sways smoothly side to side in 3D with a cycle of roughly 12 seconds and no visible stutter on a mid-range device.
- **SC-003**: The feature adds zero client-side JavaScript (the shipped page still contains no script for the Hero).
- **SC-004**: With reduced motion enabled, the watermark shows no movement (0 animated frames).
- **SC-005**: Across viewports from 320px to desktop width, the page has no horizontal overflow caused by the watermark.
- **SC-006**: The watermark is not reachable by keyboard and is absent from the accessibility tree.
- **SC-007**: Lighthouse Performance, Accessibility, and SEO remain at the project target (100/100 desktop, ≥ 98 mobile).

## Assumptions

- The Foundly Labs isotipo is available as the official brand raster asset (`src/assets/icon-fl.png`) and can be reused for the watermark.
- The existing Hero copy, badge, and CTAs are kept as-is; this feature only adds a background layer.
- Motion is continuous for the lifetime of the Hero (no scroll-triggered or hover-driven behavior).
- Only the Hero section is in scope; the rest of the page is unaffected.
- "slate-900" in the request maps to the project's primary text token; the requirement is that heading contrast is preserved, not a specific code token.
- The implementation approach (imported brand asset rendered with CSS filters, and the exact animation keyframes) is decided during planning.
