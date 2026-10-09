import { beforeEach, describe, expect, it } from 'vitest';
import type { BusinessHours, Tenant } from '../../domain/tenancy/types';
import { getStore, resetStore } from '../../server/store';
import { bookPublicAppointment } from './actions';

const NOW = '2026-10-09T00:00:00.000Z';
const input = {
  tenantSlug: 'estudio-ana',
  serviceId: 'svc-corte',
  startAt: '2026-10-09T08:00:00Z',
  clientName: 'Luis',
  clientContact: 'luis@mail.dev',
};

describe('public-booking actions (contracts/onboarding.contract.md)', () => {
  beforeEach(() => {
    resetStore();
  });

  it('creates an online appointment in pending state', () => {
    const result = bookPublicAppointment(input);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.origin).toBe('online');
      expect(result.data.status).toBe('pending');
      expect(result.data.clientName).toBe('Luis');
      expect(getStore().appointments).toHaveLength(1);
    }
  });

  it('rejects an already-taken slot with CONFLICT', () => {
    bookPublicAppointment(input);
    const conflict = bookPublicAppointment({ ...input, clientName: 'B' });
    expect(conflict.ok).toBe(false);
    if (!conflict.ok) expect(conflict.error.code).toBe('CONFLICT');
  });

  it('rejects unknown or non-active tenants without exposing data', () => {
    const hours: BusinessHours[] = [0, 1, 2, 3, 4, 5, 6].map((weekday) =>
      weekday === 0
        ? { weekday, isOpen: false, startTime: '', endTime: '' }
        : { weekday, isOpen: true, startTime: '09:00', endTime: '18:00' },
    );
    const suspended: Tenant = {
      id: 't-susp',
      name: 'Cerrado',
      slug: 'suspended-shop',
      category: 'X',
      status: 'suspended',
      ownerUserId: 'u-s',
      defaultAppointmentDurationMinutes: 30,
      businessHours: hours,
      currency: 'EUR',
      timezone: 'Europe/Madrid',
      onlineBookingEnabled: true,
      license: null,
      createdAt: NOW,
      updatedAt: NOW,
    };
    getStore().tenants.push(suspended);

    const missing = bookPublicAppointment({ ...input, tenantSlug: 'no-existe' });
    expect(missing.ok).toBe(false);
    if (!missing.ok) expect(missing.error.code).toBe('NOT_FOUND');

    const closed = bookPublicAppointment({ ...input, tenantSlug: 'suspended-shop' });
    expect(closed.ok).toBe(false);
    if (!closed.ok) expect(closed.error.code).toBe('NOT_FOUND');
  });

  it('rejects a service that does not belong to the tenant', () => {
    const result = bookPublicAppointment({ ...input, serviceId: 'svc-fake' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe('NOT_FOUND');
  });
});