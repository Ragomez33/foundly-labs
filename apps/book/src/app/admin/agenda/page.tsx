import { Agenda, type AgendaRow } from '../../../features/appointments/components/Agenda';
import { listAgenda, listServices } from '../../../features/appointments/queries';
import { getAdminTenantId } from '../../../features/tenants/queries';
import { getStore } from '../../../server/store';

export const dynamic = 'force-dynamic';

export default function AgendaPage() {
  const tenantId = getAdminTenantId();
  const now = new Date();
  const from = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const to = new Date(from.getTime() + 7 * 86_400_000);

  const services = listServices(tenantId);
  const resources = getStore().resources.filter((resource) => resource.tenantId === tenantId);

  const appointments: AgendaRow[] = listAgenda({ from, to }, tenantId).map((row) => ({
    id: row.id,
    startAt: row.startAt,
    endAt: row.endAt,
    clientName: row.clientName,
    clientContact: row.clientContact,
    serviceName: services.find((service) => service.id === row.serviceId)?.name ?? '—',
    durationMinutes: row.appliedDurationMinutes,
    resourceName: resources.find((resource) => resource.id === row.resourceId)?.name ?? '—',
    status: row.status,
  }));

  return <Agenda appointments={appointments} />;
}