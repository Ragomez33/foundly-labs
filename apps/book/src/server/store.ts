import type {
  Appointment,
  AppointmentAuditEntry,
  AvailabilityRule,
  Rate,
  Resource,
  Service,
  TimeBlock,
} from '../domain/appointments/types';

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
}

const TIMEZONE = 'Europe/Madrid';

function seed(): BookStore {
  const resource: Resource = {
    id: 'res-ana',
    name: 'Ana Profesional',
    type: 'professional',
    active: true,
    timezone: TIMEZONE,
  };
  const service: Service = {
    id: 'svc-corte',
    name: 'Corte de cabello',
    description: 'Corte y peinado',
    durationMinutes: 30,
    bufferMinutes: 10,
    category: 'Peluquería',
    active: true,
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

  return {
    resources: [resource],
    services: [service],
    rates: [rate],
    availabilityRules,
    timeBlocks: [],
    appointments: [],
    audit: [],
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
        }
      : seed();
}
