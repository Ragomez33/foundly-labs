import type { Service } from '../../domain/appointments/types';
import type { DayAvailability } from '../../domain/availability/types';
import { computeAvailability } from '../../domain/availability/computeAvailability';
import type { Tenant } from '../../domain/tenancy/types';
import { getStore } from '../../server/store';

export interface PublicBusiness {
  name: string;
  category: string;
  slug: string;
  timezone: string;
  services: Service[];
}

export type ResolveResult =
  | { status: 'unavailable'; reason: 'not-found' | 'draft' | 'suspended' }
  | { status: 'available'; business: PublicBusiness };

/** Resolve a tenant's public portal; exposes no data for non-active tenants (FR-017). */
export function getPublicBusiness(slug: string): ResolveResult {
  const tenant = getStore().tenants.find((item) => item.slug === slug);
  if (!tenant) return { status: 'unavailable', reason: 'not-found' };
  if (tenant.status !== 'active') {
    return { status: 'unavailable', reason: tenant.status === 'draft' ? 'draft' : 'suspended' };
  }
  const services = getStore().services.filter(
    (service) => service.tenantId === tenant.id && service.active,
  );
  return {
    status: 'available',
    business: {
      name: tenant.name,
      category: tenant.category,
      slug: tenant.slug,
      timezone: tenant.timezone,
      services,
    },
  };
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

/**
 * Offered slots for a tenant's service by reusing the pure availability engine
 * (research R5). Deterministic when `now` is provided; defaults to the current time.
 */
export function getOfferedSlots(
  tenant: Tenant,
  serviceId: string,
  range: DateRange,
  now: Date = new Date(),
): DayAvailability[] {
  const service = getStore().services.find(
    (item) => item.id === serviceId && item.tenantId === tenant.id && item.active,
  );
  if (!service) return [];
  const resource = getStore().resources.find((item) => item.tenantId === tenant.id);
  if (!resource) return [];

  const rules = getStore().availabilityRules.filter((rule) => rule.resourceId === resource.id);
  const blocks = getStore()
    .timeBlocks.filter((block) => block.resourceId === resource.id)
    .map((block) => ({
      startAt: new Date(block.startAt),
      endAt: new Date(block.endAt),
      kind: block.kind,
    }));
  const appointments = getStore()
    .appointments.filter((appointment) => appointment.resourceId === resource.id)
    .map((appointment) => ({
      startAt: new Date(appointment.startAt),
      endAt: new Date(appointment.endAt),
      status: appointment.status,
    }));

  return computeAvailability({
    resourceId: resource.id,
    service: { durationMinutes: service.durationMinutes, bufferMinutes: service.bufferMinutes },
    range,
    timezone: tenant.timezone,
    rules,
    blocks,
    appointments,
    now,
  });
}