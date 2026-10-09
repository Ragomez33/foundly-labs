import type {
  Appointment,
  AvailabilityRule,
  Resource,
  Service,
  TimeBlock,
} from '../../domain/appointments/types';
import { getStore } from '../../server/store';

export interface AgendaFilter {
  from: Date;
  to: Date;
  resourceId?: string;
}

/** Appointments whose start falls inside the requested window. */
export function listAgenda(filter: AgendaFilter): Appointment[] {
  const fromMs = filter.from.getTime();
  const toMs = filter.to.getTime();
  return getStore()
    .appointments.filter((appointment) => {
      const startMs = new Date(appointment.startAt).getTime();
      if (startMs < fromMs || startMs > toMs) return false;
      if (filter.resourceId && appointment.resourceId !== filter.resourceId) return false;
      return true;
    })
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
}

export function listServices(): Service[] {
  return [...getStore().services];
}

export function listResources(): Resource[] {
  return [...getStore().resources];
}

export function listAvailabilityRules(resourceId?: string): AvailabilityRule[] {
  const rules = getStore().availabilityRules;
  return resourceId ? rules.filter((rule) => rule.resourceId === resourceId) : [...rules];
}

export function listTimeBlocks(resourceId?: string): TimeBlock[] {
  const blocks = getStore().timeBlocks;
  return resourceId ? blocks.filter((block) => block.resourceId === resourceId) : [...blocks];
}
