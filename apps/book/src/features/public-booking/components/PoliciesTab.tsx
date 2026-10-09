'use client';

import { Stack, Typography } from '@foundly/ui';
import type { BusinessHours } from '../../../domain/tenancy/types';
import type { PublicPolicyView } from '../types';

const WEEKDAY_LABELS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

/** Información & Políticas tab: weekly hours per weekday + policies (FR-008). */
export function PoliciesTab({
  weeklyHours,
  policies,
}: {
  weeklyHours: BusinessHours[];
  policies: PublicPolicyView[];
}) {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h6">Horario de atención</Typography>
        {weeklyHours.map((hours) => (
          <Stack key={hours.weekday} direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {WEEKDAY_LABELS[hours.weekday]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {hours.isOpen ? `${hours.startTime} – ${hours.endTime}` : 'Cerrado'}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6">Políticas</Typography>
        {policies.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Consulta las condiciones con el negocio.
          </Typography>
        ) : (
          policies.map((policy) => (
            <Stack key={policy.title} spacing={0.5}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {policy.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {policy.body}
              </Typography>
            </Stack>
          ))
        )}
      </Stack>
    </Stack>
  );
}