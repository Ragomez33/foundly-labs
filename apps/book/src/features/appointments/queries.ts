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

function tenantResourceIds(tenantId: string): Set<string> {
  return new Set(
    getStore()
      .resources.filter((resource) => resource.tenantId === tenantId)
      .map((resource) => resource.id),
  );
}

/** Appointments whose start falls inside the requested window, scoped to the tenant. */
export function listAgenda(filter: AgendaFilter, tenantId: string): Appointment[] {
  const fromMs = filter.from.getTime();
  const toMs = filter.to.getTime();
  const resourceIds = tenantResourceIds(tenantId);
  return getStore()
    .appointments.filter((appointment) => {
      if (!resourceIds.has(appointment.resourceId)) return false;
      const startMs = new Date(appointment.startAt).getTime();
      if (startMs < fromMs || startMs > toMs) return false;
      if (filter.resourceId && appointment.resourceId !== filter.resourceId) return false;
      return true;
    })
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
}

/** The tenant's services only. */
export function listServices(tenantId: string): Service[] {
  return getStore().services.filter((service) => service.tenantId === tenantId);
}

export function listResources(): Resource[] {
  return [...getStore().resources];
}

/** The tenant's weekly availability rules (via its resources). */
export function listAvailabilityRules(tenantId: string): AvailabilityRule[] {
  const resourceIds = tenantResourceIds(tenantId);
  return getStore().availabilityRules.filter((rule) => resourceIds.has(rule.resourceId));
}

/** The tenant's time blocks (via its resources). */
export function listTimeBlocks(tenantId: string): TimeBlock[] {
  const resourceIds = tenantResourceIds(tenantId);
  return getStore().timeBlocks.filter((block) => resourceIds.has(block.resourceId));
}
