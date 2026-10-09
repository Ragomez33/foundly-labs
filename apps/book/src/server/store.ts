import type {
  Appointment,
  AppointmentAuditEntry,
  AvailabilityRule,
  Rate,
  Resource,
  Service,
  TimeBlock,
} from '../domain/appointments/types';
import type { BusinessHours, OnboardingProvision, Tenant, User } from '../domain/tenancy/types';
import type { Session } from './auth';

/**
 * In-memory store for the admin panel (mock state).
 * The persistence technology is intentionally left undefined — this module is the
 * single seam that must be replaced when the architecture decides on storage.
 */
export interface BookStore {
  resources: Resource[];
  services: Service[];
  rates: Rate[];
  availabilityRules: AvailabilityRule[];
  timeBlocks: TimeBlock[];
  appointments: Appointment[];
  audit: AppointmentAuditEntry[];
  tenants: Tenant[];
  users: User[];
  onboardingProvisions: OnboardingProvision[];
  sessions: Session[];
}

const TIMEZONE = 'Europe/Madrid';
const NOW = '2026-10-08T00:00:00.000Z';

function seedBusinessHours(): BusinessHours[] {
  const days: number[] = [1, 2, 3, 4, 5, 6]; // Mon–Sat open
  return [0, 1, 2, 3, 4, 5, 6].map((weekday) =>
    days.includes(weekday)
      ? { weekday, isOpen: true, startTime: '09:00', endTime: '18:00' }
      : { weekday, isOpen: false, startTime: '', endTime: '' },
  );
}

function seed(): BookStore {
  const resource: Resource = {
    id: 'res-ana',
    name: 'Ana Profesional',
    type: 'professional',
    active: true,
    timezone: TIMEZONE,
    tenantId: 'ten-ana',
  };
  const service: Service = {
    id: 'svc-corte',
    name: 'Corte de cabello',
    description: 'Corte y peinado',
    durationMinutes: 30,
    bufferMinutes: 10,
    category: 'Peluquería',
    active: true,
    tenantId: 'ten-ana',
  };
  const rate: Rate = {
    id: 'rate-corte',
    serviceId: service.id,
    amountCents: 2000,
    currency: 'EUR',
    effectiveFrom: '2020-01-01T00:00:00.000Z',
    effectiveTo: null,
  };
  const availabilityRules: AvailabilityRule[] = [1, 2, 3, 4, 5].map((weekday) => ({
    id: `rule-${weekday}`,
    resourceId: resource.id,
    weekday,
    startTime: '09:00',
    endTime: '18:00',
    slotGranularityMinutes: 30,
    minLeadTimeMinutes: 0,
    bookingHorizonDays: 60,
  }));

  const tenant: Tenant = {
    id: 'ten-ana',
    name: 'Estudio Ana',
    slug: 'estudio-ana',
    category: 'Peluquería',
    status: 'active',
    ownerUserId: 'u-owner-ana',
    defaultAppointmentDurationMinutes: 30,
    businessHours: seedBusinessHours(),
    currency: 'EUR',
    timezone: TIMEZONE,
    onlineBookingEnabled: true,
    license: null,
    createdAt: NOW,
    updatedAt: NOW,
  };
  const owner: User = {
    id: 'u-owner-ana',
    fullName: 'Ana Profesional',
    email: 'ana@foundly.dev',
    credential: 'mock-credential',
    role: 'owner',
    tenantId: tenant.id,
    status: 'active',
    createdAt: NOW,
  };
  const ownerSession: Session = {
    userId: owner.id,
    role: 'admin',
    tenantId: tenant.id,
  };

  return {
    resources: [resource],
    services: [service],
    rates: [rate],
    availabilityRules,
    timeBlocks: [],
    appointments: [],
    audit: [],
    tenants: [tenant],
    users: [owner],
    onboardingProvisions: [],
    sessions: [ownerSession],
  };
}

let store: BookStore = seed();

/** Access the current in-memory store. */
export function getStore(): BookStore {
  return store;
}

/** Reset the store to a fresh seeded (or empty) state. Used by tests. */
export function resetStore(options: { seed?: boolean } = {}): void {
  store =
    options.seed === false
      ? {
          resources: [],
          services: [],
          rates: [],
          availabilityRules: [],
          timeBlocks: [],
          appointments: [],
          audit: [],
          tenants: [],
          users: [],
          onboardingProvisions: [],
          sessions: [],
        }
      : seed();
}