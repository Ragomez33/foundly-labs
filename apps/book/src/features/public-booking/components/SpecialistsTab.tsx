'use client';

import { Stack, Typography } from '@foundly/ui';
import type { PublicSpecialist } from '../types';

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

/** Equipo tab: the tenant's active specialists with initials avatar + role (FR-007). */
export function SpecialistsTab({ specialists }: { specialists: PublicSpecialist[] }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Equipo</Typography>
      {specialists.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          El equipo se mostrará pronto.
        </Typography>
      ) : (
        specialists.map((specialist) => (
          <Stack key={specialist.id} direction="row" spacing={1.5} alignItems="center">
            <Stack
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                color: 'background.paper',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {initials(specialist.name)}
              </Typography>
            </Stack>
            <Stack sx={{ minWidth: 0 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {specialist.name}
              </Typography>
              {specialist.role ? (
                <Typography variant="body2" color="text.secondary">
                  {specialist.role}
                </Typography>
              ) : null}
            </Stack>
          </Stack>
        ))
      )}
    </Stack>
  );
}