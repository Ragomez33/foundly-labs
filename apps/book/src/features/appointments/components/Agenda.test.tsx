import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { FoundlyThemeProvider } from '@foundly/ui';
import { Agenda, type AgendaRow } from './Agenda';

const rows: AgendaRow[] = [
  {
    id: 'a1',
    startAt: '2026-06-03T09:00:00.000Z',
    endAt: '2026-06-03T09:30:00.000Z',
    clientName: 'Luis',
    status: 'confirmed',
  },
];

describe('Agenda', () => {
  it('renders appointments with their status', async () => {
    const { container } = render(
      <FoundlyThemeProvider>
        <Agenda appointments={rows} />
      </FoundlyThemeProvider>,
    );
    expect(screen.getByText('Luis')).toBeInTheDocument();
    expect(screen.getByText('confirmed')).toBeInTheDocument();
    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });

  it('shows an empty state', () => {
    render(
      <FoundlyThemeProvider>
        <Agenda appointments={[]} />
      </FoundlyThemeProvider>,
    );
    expect(screen.getByText('No hay citas en este periodo')).toBeInTheDocument();
  });
});
