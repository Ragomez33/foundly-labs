import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { FoundlyThemeProvider } from '@foundly/ui';
import HomePage from './page';
import { BOOK_BENEFITS } from './book-product';

describe('product page (FR-001/FR-002/FR-019)', () => {
  it('renders the module capabilities and a CTA leading to /onboarding', async () => {
    const { container } = render(
      <FoundlyThemeProvider>
        <HomePage />
      </FoundlyThemeProvider>,
    );

    for (const benefit of BOOK_BENEFITS) {
      expect(
        screen.getAllByText(benefit.title).length,
        `benefit "${benefit.title}" should be shown`,
      ).toBeGreaterThan(0);
    }

    const ctaLinks = screen.getAllByRole('link', { name: /Registrar mi negocio/i });
    expect(ctaLinks.length).toBeGreaterThan(0);
    expect(ctaLinks.some((link) => link.getAttribute('href') === '/onboarding')).toBe(true);

    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });
});