import { Agenda, type AgendaRow } from '../../../features/appointments/components/Agenda';
import { listAgenda } from '../../../features/appointments/queries';
import { getAdminTenantId } from '../../../features/tenants/queries';

export const dynamic = 'force-dynamic';

export default function AgendaPage() {
  const tenantId = getAdminTenantId();
  const now = new Date();
  const from = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const to = new Date(from.getTime() + 7 * 86_400_000);
  const appointments: AgendaRow[] = listAgenda({ from, to }, tenantId).map((row) => ({
    id: row.id,
    startAt: row.startAt,
    endAt: row.endAt,
    clientName: row.clientName,
    status: row.status,
  }));
  return <Agenda appointments={appointments} />;
}
