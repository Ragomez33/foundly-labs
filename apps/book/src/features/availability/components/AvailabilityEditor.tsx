'use client';

import { Card, Chip, DataTable, Stack, Typography, type DataTableColumn } from '@foundly/ui';
import type { AvailabilityRule, TimeBlock } from '../../../domain/appointments/types';

export interface AvailabilityEditorProps {
  rules: AvailabilityRule[];
  blocks: TimeBlock[];
}

const WEEKDAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export function AvailabilityEditor({ rules, blocks }: AvailabilityEditorProps) {
  const columns: DataTableColumn<AvailabilityRule>[] = [
    {
      key: 'weekday',
      header: 'Día',
      render: (rule) => <Chip label={WEEKDAYS[rule.weekday] ?? '—'} />,
    },
    { key: 'hours', header: 'Horario', render: (rule) => `${rule.startTime}–${rule.endTime}` },
    {
      key: 'granularity',
      header: 'Granularidad',
      render: (rule) => `${rule.slotGranularityMinutes} min`,
    },
  ];

  return (
    <Card
      header={
        <Stack spacing={0.5}>
          <Typography variant="h5" component="h1">
            Disponibilidad
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Horarios de trabajo, descansos y bloqueos por recurso.
          </Typography>
        </Stack>
      }
    >
      <Stack spacing={2}>
        <DataTable
          columns={columns}
          rows={rules}
          emptyMessage="Sin horarios de trabajo definidos"
          getRowKey={(rule) => rule.id}
        />
        <Typography variant="body2" color="text.secondary">
          {blocks.length} bloqueo(s) de horario configurados.
        </Typography>
      </Stack>
    </Card>
  );
}
