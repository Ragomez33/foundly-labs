import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { FoundlyThemeProvider } from '@foundly/ui';
import type { PublicBusinessProfile } from '../types';
import { BrandHero } from './BrandHero';

const full: PublicBusinessProfile = {
  slug: 'estudio-ana',
  name: 'Estudio Ana',
  category: 'Peluquería',
  avatar: null,
  cover: null,
  bio: 'Somos un estudio de referencia en el centro de Madrid.',
  address: 'Calle Mayor 7, 28013 Madrid',
  phone: '+34 612 345 678',
  social: { instagram: 'https://instagram.com/estudioana', whatsapp: 'https://wa.me/34612345678' },
  timezone: 'Europe/Madrid',
  services: [],
  specialists: [],
  weeklyHours: [],
  policies: [],
};

describe('BrandHero (FR-001…FR-004, contracts/portal-ui.contract.md)', () => {
  it('renders identity, badges, bio and contact', async () => {
    const { container } = render(
      <FoundlyThemeProvider>
        <BrandHero profile={full} />
      </FoundlyThemeProvider>,
    );

    expect(screen.getByRole('heading', { name: 'Estudio Ana' })).toBeInTheDocument();
    expect(screen.getByText('Peluquería')).toBeInTheDocument();
    expect(screen.getByText('Reservas abiertas')).toBeInTheDocument();
    expect(screen.getByText('Somos un estudio de referencia en el centro de Madrid.')).toBeInTheDocument();

    expect(screen.getByText('Calle Mayor 7, 28013 Madrid')).toBeInTheDocument();
    const phone = screen.getByRole('link', { name: '+34 612 345 678' });
    expect(phone).toHaveAttribute('href', 'tel:+34 612 345 678');
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      'https://instagram.com/estudioana',
    );
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute(
      'href',
      'https://wa.me/34612345678',
    );

    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });

  it('omits about and contact sections when not configured', () => {
    const minimal: PublicBusinessProfile = {
      ...full,
      bio: null,
      address: null,
      phone: null,
      social: null,
    };
    render(
      <FoundlyThemeProvider>
        <BrandHero profile={minimal} />
      </FoundlyThemeProvider>,
    );
    expect(screen.queryByText(/Sobre nosotros/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Contacto/)).not.toBeInTheDocument();
  });
});