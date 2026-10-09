import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FoundlyThemeProvider } from '@foundly/ui';

const { fetchSlotsMock, bookMock } = vi.hoisted(() => ({
  fetchSlotsMock: vi.fn(async ({ startDate }: { startDate: string }) => [
    {
      date: startDate,
      slots: [
        { startAt: `${startDate}T07:00:00.000Z`, endAt: `${startDate}T07:30:00.000Z` },
      ],
    },
  ]),
  bookMock: vi.fn(async () => ({ ok: true, data: { id: 'a-online-1' } })),
}));

vi.mock('../actions', () => ({
  fetchOfferedSlots: fetchSlotsMock,
  bookPublicAppointment: bookMock,
}));

import { BookingPanel } from './BookingPanel';
import type { ServiceOption } from './BookingPanel';

const services: ServiceOption[] = [
  { id: 'svc-corte', name: 'Corte de cabello', durationMinutes: 30 },
];

describe('BookingPanel (US2)', () => {
  beforeEach(() => {
    fetchSlotsMock.mockClear();
    bookMock.mockClear();
  });

  it('books a slot after selecting a service, slot and client name', async () => {
    const user = userEvent.setup();
    render(
      <FoundlyThemeProvider>
        <BookingPanel tenantSlug="estudio-ana" services={services} />
      </FoundlyThemeProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Corte de cabello' }));

    const slot = await screen.findByRole('button', { name: '07:00' });
    await user.click(slot);

    await user.type(screen.getByLabelText(/Nombre/), 'Luis');
    await user.click(screen.getByRole('button', { name: 'Confirmar cita' }));

    await waitFor(() =>
      expect(bookMock).toHaveBeenCalledWith(
        expect.objectContaining({
          tenantSlug: 'estudio-ana',
          serviceId: 'svc-corte',
          clientName: 'Luis',
        }),
      ),
    );
    expect(await screen.findByText(/cita solicitada/i)).toBeInTheDocument();
  });

  it('is accessible while idle', async () => {
    const { container } = render(
      <FoundlyThemeProvider>
        <BookingPanel tenantSlug="estudio-ana" services={services} />
      </FoundlyThemeProvider>,
    );
    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });
});