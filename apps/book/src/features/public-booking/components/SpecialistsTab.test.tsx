import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { FoundlyThemeProvider } from '@foundly/ui';
import type { PublicSpecialist } from '../types';
import { SpecialistsTab } from './SpecialistsTab';

const specialists: PublicSpecialist[] = [
  { id: 'res-ana', name: 'Ana Profesional', role: 'Peluquera senior', avatar: null, bio: 'Color y cortes.' },
  { id: 'res-luis', name: 'Luis Estilista', role: 'Barbero', avatar: null, bio: null },
];

describe('SpecialistsTab (FR-007, contracts/portal-ui.contract.md)', () => {
  it('lists active specialists with initials and role', async () => {
    const { container } = render(
      <FoundlyThemeProvider>
        <SpecialistsTab specialists={specialists} />
      </FoundlyThemeProvider>,
    );
    expect(screen.getByText('Ana Profesional')).toBeInTheDocument();
    expect(screen.getByText('Peluquera senior')).toBeInTheDocument();
    expect(screen.getByText('Luis Estilista')).toBeInTheDocument();
    expect(screen.getByText('Barbero')).toBeInTheDocument();

    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });

  it('shows an empty state when there are no specialists', () => {
    render(
      <FoundlyThemeProvider>
        <SpecialistsTab specialists={[]} />
      </FoundlyThemeProvider>,
    );
    expect(screen.getByText(/Equipo/)).toBeInTheDocument();
    expect(screen.getByText(/pronto/i)).toBeInTheDocument();
  });
});