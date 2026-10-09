import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { FoundlyThemeProvider } from '@foundly/ui';
import HomePage from './page';
import { BOOK_FEATURES } from './book-product';

describe('product page (FR-001/FR-002/FR-019)', () => {
  it('renders the module capabilities and a CTA leading to /onboarding', async () => {
    const { container } = render(
      <FoundlyThemeProvider>
        <HomePage />
      </FoundlyThemeProvider>,
    );

    for (const feature of BOOK_FEATURES) {
      expect(
        screen.getAllByText(feature.title).length,
        `feature "${feature.title}" should be shown`,
      ).toBeGreaterThan(0);
    }

    const cta = screen.getByRole('link', { name: /Registrar mi negocio/i });
    expect(cta).toHaveAttribute('href', '/onboarding');

    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });
});