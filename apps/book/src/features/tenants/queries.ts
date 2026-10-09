import type { Tenant } from '../../domain/tenancy/types';
import { getStore } from '../../server/store';
import { fail, ok, type ActionResult } from '../../server/result';
import type { Session } from '../../server/auth';

/** Resolve a tenant by its public URL slug (portal, FR-017). */
export function getTenantBySlug(slug: string): Tenant | undefined {
  return getStore().tenants.find((tenant) => tenant.slug === slug);
}

/** Resolve the tenant bound to the session (admin, FR-015). */
export function getCurrentTenant(session: Session | null): ActionResult<Tenant> {
  if (!session?.tenantId) {
    return fail('UNAUTHENTICATED', 'Se requiere una sesión de negocio.');
  }
  const tenant = getStore().tenants.find((item) => item.id === session.tenantId);
  if (!tenant) {
    return fail('NOT_FOUND', 'Negocio no encontrado.');
  }
  return ok(tenant);
}