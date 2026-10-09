'use client';

import {
  Badge,
  Button,
  Card,
  DataTable,
  Stack,
  Typography,
  type BadgeStatus,
  type DataTableColumn,
} from '@foundly/ui';

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
    <Card
      header={
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Typography variant="h5" component="h1">
            Agenda
          </Typography>
          <Button variant="primary">Nueva cita</Button>
        </Stack>
      }
    >
      <DataTable
        columns={columns}
        rows={appointments}
        emptyMessage="No hay citas en este periodo"
        getRowKey={(row) => row.id}
      />
    </Card>
  );
}
