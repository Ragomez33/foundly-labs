'use client';

import { Badge, Card, DataTable, type BadgeStatus, type DataTableColumn } from '@foundly/ui';

export interface AgendaRow {
  id: string;
  startAt: string;
  endAt: string;
  clientName: string;
  status: string;
}

export interface AgendaProps {
  appointments: AgendaRow[];
}

const STATUS_TO_BADGE: Record<string, BadgeStatus> = {
  pending: 'warning',
  confirmed: 'info',
  'checked-in': 'positive',
  completed: 'positive',
  cancelled: 'negative',
  'no-show': 'negative',
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

export function Agenda({ appointments }: AgendaProps) {
  const columns: DataTableColumn<AgendaRow>[] = [
    {
      key: 'time',
      header: 'Horario',
      render: (row) => `${formatTime(row.startAt)}–${formatTime(row.endAt)}`,
    },
    { key: 'client', header: 'Cliente', render: (row) => row.clientName },
    {
      key: 'status',
      header: 'Estado',
      render: (row) => (
        <Badge pill status={STATUS_TO_BADGE[row.status] ?? 'neutral'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <Card header={<h1>Agenda</h1>}>
      <DataTable
        columns={columns}
        rows={appointments}
        emptyMessage="No hay citas en este periodo"
        getRowKey={(row) => row.id}
      />
    </Card>
  );
}
