'use client';

import { Container, Stack } from '@foundly/ui';
import { BookingPanel, type ServiceOption } from './BookingPanel';
import { ServiceList } from './ServiceList';
import { TenantPublicHeader } from './TenantPublicHeader';

export interface PublicBusinessData {
  name: string;
  category: string;
  slug: string;
  services: ServiceOption[];
}

/** Client-composed public portal (header + catalog + booking panel). */
export function PublicPortal({ business }: { business: PublicBusinessData }) {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <TenantPublicHeader name={business.name} category={business.category} />
        <ServiceList services={business.services} />
        <BookingPanel tenantSlug={business.slug} services={business.services} />
      </Stack>
    </Container>
  );
}