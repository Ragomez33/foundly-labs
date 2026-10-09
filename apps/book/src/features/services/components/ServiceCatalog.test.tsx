import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { FoundlyThemeProvider } from '@foundly/ui';
import { ServiceCatalog } from './ServiceCatalog';

describe('ServiceCatalog', () => {
  it('renders services with their rate and status', async () => {
    const { container } = render(
      <FoundlyThemeProvider>
        <ServiceCatalog
          services={[
            {
              id: 's1',
              name: 'Corte',
              description: null,
              durationMinutes: 30,
              bufferMinutes: 0,
              category: null,
              active: true,
              tenantId: 't1',
            },
          ]}
          rates={[
            {
              id: 'r1',
              serviceId: 's1',
              amountCents: 2000,
              currency: 'EUR',
              effectiveFrom: '2020-01-01T00:00:00.000Z',
              effectiveTo: null,
            },
          ]}
        />
      </FoundlyThemeProvider>,
    );
    expect(screen.getByText('Corte')).toBeInTheDocument();
    expect(screen.getByText('Activo')).toBeInTheDocument();
    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });
});
