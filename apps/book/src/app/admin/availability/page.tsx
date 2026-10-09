import { listAvailabilityRules, listTimeBlocks } from '../../../features/appointments/queries';
import { AvailabilityEditor } from '../../../features/availability/components/AvailabilityEditor';
import { getAdminTenantId } from '../../../features/tenants/queries';

export const dynamic = 'force-dynamic';

export default function AvailabilityPage() {
  const tenantId = getAdminTenantId();
  return (
    <AvailabilityEditor rules={listAvailabilityRules(tenantId)} blocks={listTimeBlocks(tenantId)} />
  );
}