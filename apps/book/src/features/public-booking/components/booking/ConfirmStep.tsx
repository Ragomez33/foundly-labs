'use client';

import { Button, Stack, Typography } from '@foundly/ui';
import { formatPrice } from '../../format';
import type { ClientDetails } from '../../schemas';
import type { PublicService } from '../../types';

/** Step 4 — confirmation summary before creating the appointment (FR-013). */
export function ConfirmStep({
  service,
  specialistName,
  slot,
  client,
  submitting,
  message,
  error,
  onConfirm,
  onBack,
  onClose,
}: {
  service: PublicService;
  specialistName: string | null;
  slot: { startAt: string; endAt: string } | null;
  client: ClientDetails | null;
  submitting: boolean;
  message: string | null;
  error: string | null;
  onConfirm: () => void;
  onBack: () => void;
  onClose: () => void;
}) {
  if (message) {
    return (
      <Stack spacing={2}>
        <Typography variant="h6" role="status">
          {message}
        </Typography>
        <Stack direction="row" justifyContent="flex-end">
          <Button variant="primary" onClick={onClose}>
            Cerrar
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      <Stack spacing={0.5}>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {service.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service.durationMinutes} min · {formatPrice(service.priceCents, service.currency)}
        </Typography>
        {specialistName ? (
          <Typography variant="body2" color="text.secondary">
            Con {specialistName}
          </Typography>
        ) : null}
        {slot ? (
          <Typography variant="body2" color="text.secondary">
            Fecha: {slot.startAt.slice(0, 10)} · {slot.startAt.slice(11, 16)}
          </Typography>
        ) : null}
        {client ? (
          <Typography variant="body2">
            Cliente: {client.clientName} · {client.clientEmail} · {client.clientPhone}
          </Typography>
        ) : null}
        {client?.notes ? (
          <Typography variant="body2" color="text.secondary">
            Notas: {client.notes}
          </Typography>
        ) : null}
      </Stack>

      {error ? (
        <Typography variant="body2" color="error" role="alert">
          {error}
        </Typography>
      ) : null}

      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        <Button variant="secondary" onClick={onBack}>
          Atrás
        </Button>
        <Button variant="primary" disabled={submitting} onClick={onConfirm}>
          Confirmar cita
        </Button>
      </Stack>
    </Stack>
  );
}