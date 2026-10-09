import { listServices } from '../../../features/appointments/queries';
import { ServiceCatalog } from '../../../features/services/components/ServiceCatalog';
import { getAdminTenantId } from '../../../features/tenants/queries';
import { getStore } from '../../../server/store';

export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  const tenantId = getAdminTenantId();
  const services = listServices(tenantId);
  const serviceIds = new Set(services.map((service) => service.id));
  const rates = getStore().rates.filter((rate) => serviceIds.has(rate.serviceId));
  return <ServiceCatalog services={services} rates={rates} />;
}