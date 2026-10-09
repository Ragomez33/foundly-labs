import { expect } from 'vitest';
import { axe } from 'vitest-axe';

/**
 * Assert that the rendered tree has zero accessibility violations (SC-004).
 * Uses axe-core via vitest-axe so the assertion stays framework-agnostic.
 */
export async function expectNoA11yViolations(container: HTMLElement): Promise<void> {
  // jsdom cannot render canvas, so axe's color-contrast rule cannot run here.
  // Contrast is guaranteed by token mapping (contracts/theme.contract.md, SC-006).
  const results = await axe(container, {
    rules: { 'color-contrast': { enabled: false } },
  });
  expect(results.violations).toHaveLength(0);
}
