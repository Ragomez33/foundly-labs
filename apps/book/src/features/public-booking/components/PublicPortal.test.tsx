import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { FoundlyThemeProvider } from '@foundly/ui';
import type { PublicBusinessProfile } from '../types';
import { PublicPortal } from './PublicPortal';

const profile: PublicBusinessProfile = {
  slug: 'estudio-ana',
  name: 'Estudio Ana',
  category: 'Peluquería',
  avatar: null,
  cover: null,
  bio: null,
  address: null,
  phone: null,
  social: null,
  timezone: 'Europe/Madrid',
  services: [
    {
      id: 'svc-corte',
      name: 'Corte de cabello',
      description: 'Corte y peinado',
      durationMinutes: 30,
      priceCents: 2000,
      currency: 'EUR',
    },
  ],
  specialists: [
    { id: 'res-ana', name: 'Ana', role: 'Peluquera senior', avatar: null, bio: null },
    { id: 'res-luis', name: 'Luis', role: 'Barbero', avatar: null, bio: null },
  ],
  weeklyHours: [0, 1, 2, 3, 4, 5, 6].map((weekday) =>
    weekday === 0
      ? { weekday, isOpen: false, startTime: '', endTime: '' }
      : { weekday, isOpen: true, startTime: '09:00', endTime: '18:00' },
  ),
  policies: [
    { title: 'Política de cancelación', body: 'Cancela gratis hasta 24 h antes.' },
  ],
};

describe('PublicPortal (FR-005…FR-008, contracts/portal-ui.contract.md)', () => {
  it('shows Servicios as the default tab with priced service cards', async () => {
    const { container } = render(
      <FoundlyThemeProvider>
        <PublicPortal profile={profile} />
      </FoundlyThemeProvider>,
    );

    expect(screen.getByRole('tab', { name: 'Servicios' })).toBeInTheDocument();
    expect(screen.getByText('Corte de cabello')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(screen.getByText('20,00 €')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reservar' })).toBeInTheDocument();

    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });

  it('switches to Equipo and Información tabs (FR-007/FR-008)', async () => {
    const user = userEvent.setup();
    render(
      <FoundlyThemeProvider>
        <PublicPortal profile={profile} />
      </FoundlyThemeProvider>,
    );

    await user.click(screen.getByRole('tab', { name: 'Equipo' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Ana');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Peluquera senior');

    await user.click(screen.getByRole('tab', { name: 'Información' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Política de cancelación');
  });

  it('implements accessible tab semantics and no fixed full-width layout (FR-019/FR-020)', async () => {
    const { container } = render(
      <FoundlyThemeProvider>
        <PublicPortal profile={profile} />
      </FoundlyThemeProvider>,
    );

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();
    const servicioTab = screen.getByRole('tab', { name: 'Servicios' });
    expect(servicioTab).toHaveAttribute('aria-selected', 'true');
    expect(servicioTab).toHaveAttribute('aria-controls');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby');

    expect(container.innerHTML).not.toContain('100vw');

    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });
});