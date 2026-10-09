import { listServices } from '../../../features/appointments/queries';
import { ServiceCatalog } from '../../../features/services/components/ServiceCatalog';
import { getStore } from '../../../server/store';

export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  return <ServiceCatalog services={listServices()} rates={getStore().rates} />;
}
