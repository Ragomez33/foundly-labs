'use client';

import { Card, Chip, DataTable, type DataTableColumn } from '@foundly/ui';
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
    <Card header={<h1>Disponibilidad</h1>}>
      <DataTable
        columns={columns}
        rows={rules}
        emptyMessage="Sin horarios de trabajo definidos"
        getRowKey={(rule) => rule.id}
      />
      <p>{blocks.length} bloqueo(s) de horario configurados.</p>
    </Card>
  );
}
