'use client';

import { Badge, Card, DataTable, Stack, Typography, type DataTableColumn } from '@foundly/ui';
import type { Rate, Service } from '../../../domain/appointments/types';

export interface ServiceCatalogProps {
  services: Service[];
  rates: Rate[];
}

function formatPrice(rate: Rate | undefined): string {
  if (!rate) return '—';
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: rate.currency }).format(
    rate.amountCents / 100,
  );
}

export function ServiceCatalog({ services, rates }: ServiceCatalogProps) {
  const columns: DataTableColumn<Service>[] = [
    { key: 'name', header: 'Servicio', render: (service) => service.name },
    { key: 'duration', header: 'Duración', render: (service) => `${service.durationMinutes} min` },
    {
      key: 'price',
      header: 'Tarifa',
      render: (service) => formatPrice(rates.find((rate) => rate.serviceId === service.id)),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (service) => (
        <Badge pill status={service.active ? 'positive' : 'neutral'}>
          {service.active ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
    },
  ];

  return (
    <Card
      header={
        <Stack spacing={0.5}>
          <Typography variant="h5" component="h1">
            Servicios y tarifas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Catálogo de servicios, duraciones y tarifas del negocio.
          </Typography>
        </Stack>
      }
    >
      <DataTable
        columns={columns}
        rows={services}
        emptyMessage="No hay servicios en el catálogo"
        getRowKey={(service) => service.id}
      />
    </Card>
  );
}
