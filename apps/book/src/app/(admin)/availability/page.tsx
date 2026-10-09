import { listAvailabilityRules, listTimeBlocks } from '../../../features/appointments/queries';
import { AvailabilityEditor } from '../../../features/availability/components/AvailabilityEditor';

export const dynamic = 'force-dynamic';

export default function AvailabilityPage() {
  return <AvailabilityEditor rules={listAvailabilityRules()} blocks={listTimeBlocks()} />;
}
