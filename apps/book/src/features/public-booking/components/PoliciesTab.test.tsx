import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { FoundlyThemeProvider } from '@foundly/ui';
import type { BusinessHours } from '../../../domain/tenancy/types';
import type { PublicPolicyView } from '../types';
import { PoliciesTab } from './PoliciesTab';

const hours: BusinessHours[] = [0, 1, 2, 3, 4, 5, 6].map((weekday) =>
  weekday === 0
    ? { weekday, isOpen: false, startTime: '', endTime: '' }
    : { weekday, isOpen: true, startTime: '09:00', endTime: '18:00' },
);
const policies: PublicPolicyView[] = [
  { title: 'Política de cancelación', body: 'Puedes cancelar gratis hasta 24 horas antes.' },
];

describe('PoliciesTab (FR-008, contracts/portal-ui.contract.md)', () => {
  it('shows weekly hours and the policies', async () => {
    const { container } = render(
      <FoundlyThemeProvider>
        <PoliciesTab weeklyHours={hours} policies={policies} />
      </FoundlyThemeProvider>,
    );
    expect(screen.getByText('Lunes')).toBeInTheDocument();
    expect(screen.getAllByText('09:00 – 18:00').length).toBeGreaterThan(0);
    expect(screen.getByText('Política de cancelación')).toBeInTheDocument();

    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });

  it('shows fallback copy when no policies are configured', () => {
    render(
      <FoundlyThemeProvider>
        <PoliciesTab weeklyHours={hours} policies={[]} />
      </FoundlyThemeProvider>,
    );
    expect(screen.getByText(/Consulta las condiciones con el negocio/i)).toBeInTheDocument();
  });
});