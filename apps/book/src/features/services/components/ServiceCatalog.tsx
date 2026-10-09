'use client';

import { Badge, Card, DataTable, type DataTableColumn } from '@foundly/ui';
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
    <Card header={<h1>Servicios y tarifas</h1>}>
      <DataTable
        columns={columns}
        rows={services}
        emptyMessage="No hay servicios en el catálogo"
        getRowKey={(service) => service.id}
      />
    </Card>
  );
}
