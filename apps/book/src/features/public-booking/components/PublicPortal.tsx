'use client';

import { useState } from 'react';
import { Container, Stack } from '@foundly/ui';
import type { PublicBusinessProfile, PublicService } from '../types';
import { BookingFlow } from './booking/BookingFlow';
import { BrandHero } from './BrandHero';
import { PoliciesTab } from './PoliciesTab';
import { PortalTabs } from './PortalTabs';
import { ServiceCard } from './ServiceCard';
import { SpecialistsTab } from './SpecialistsTab';

/** Public mini-site composition: brand hero + tabs + guided booking flow. */
export function PublicPortal({ profile }: { profile: PublicBusinessProfile }) {
  const [bookService, setBookService] = useState<PublicService | null>(null);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <BrandHero profile={profile} />

        <PortalTabs
          tabs={[
            {
              id: 'services',
              label: 'Servicios',
              content: (
                <Stack
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  {profile.services.map((service) => (
                    <ServiceCard key={service.id} service={service} onReserve={setBookService} />
                  ))}
                </Stack>
              ),
            },
            {
              id: 'team',
              label: 'Equipo',
              content: <SpecialistsTab specialists={profile.specialists} />,
            },
            {
              id: 'info',
              label: 'Información',
              content: (
                <PoliciesTab weeklyHours={profile.weeklyHours} policies={profile.policies} />
              ),
            },
          ]}
        />
      </Stack>

      {bookService ? (
        <BookingFlow
          service={bookService}
          tenantSlug={profile.slug}
          specialists={profile.specialists}
          onClose={() => setBookService(null)}
        />
      ) : null}
    </Container>
  );
}