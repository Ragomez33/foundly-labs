'use client';

import { Card, Stack, Typography } from '@foundly/ui';
import type { ServiceOption } from './BookingPanel';

export interface ServiceListProps {
  services: ServiceOption[];
}

/** Informative catalog of the business's bookable services. */
export function ServiceList({ services }: ServiceListProps) {
  return (
    <Stack spacing={1}>
      <Typography variant="h6">Servicios</Typography>
      {services.map((service) => (
        <Card key={service.id}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body1">{service.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {service.durationMinutes} min
            </Typography>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}