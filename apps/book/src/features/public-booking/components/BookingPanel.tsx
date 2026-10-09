'use client';

import { useMemo, useState } from 'react';
import { Button, Card, Stack, TextField, Typography } from '@foundly/ui';
import { bookPublicAppointment, fetchOfferedSlots, type SlotDay } from '../actions';

export interface ServiceOption {
  id: string;
  name: string;
  durationMinutes: number;
}

export interface BookingPanelProps {
  tenantSlug: string;
  services: ServiceOption[];
}

function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function slotLabel(iso: string): string {
  return iso.slice(11, 16);
}

type Status = 'idle' | 'busy' | 'success' | 'error';

/** Client booking flow on the public portal (guest booking, FR-018). */
export function BookingPanel({ tenantSlug, services }: BookingPanelProps) {
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [date, setDate] = useState<string>(() => dateKey(new Date()));
  const [slots, setSlots] = useState<SlotDay[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const days = useMemo(() => {
    const base = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(base.getFullYear(), base.getMonth(), base.getDate() + index);
      return dateKey(day);
    });
  }, []);

  async function loadSlots(service: string, day: string) {
    setStatus('idle');
    setMessage(null);
    setSelectedSlot(null);
    const result = await fetchOfferedSlots({
      tenantSlug,
      serviceId: service,
      startDate: day,
      endDate: day,
    });
    setSlots(result);
  }

  function selectService(id: string) {
    setServiceId(id);
    void loadSlots(id, date);
  }

  function selectDate(day: string) {
    setDate(day);
    if (serviceId) void loadSlots(serviceId, day);
  }

  async function confirm() {
    if (!serviceId || !selectedSlot) return;
    setStatus('busy');
    const result = await bookPublicAppointment({
      tenantSlug,
      serviceId,
      startAt: selectedSlot,
      clientName: clientName.trim(),
      clientContact: clientContact.trim() || undefined,
    });
    if (result.ok) {
      setStatus('success');
      setMessage('Cita solicitada correctamente.');
    } else {
      setStatus('error');
      setMessage(result.error.message);
    }
  }

  const daySlots = slots.find((day) => day.date === date)?.slots ?? [];

  return (
    <Card header={<Typography variant="h6">Reserva tu cita</Typography>}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {services.map((service) => (
            <Button
              key={service.id}
              onClick={() => selectService(service.id)}
              disabled={status === 'success'}
            >
              {service.name}
            </Button>
          ))}
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {days.map((day) => (
            <Button
              key={day}
              variant="secondary"
              onClick={() => selectDate(day)}
              disabled={!serviceId || status === 'success'}
            >
              {day}
            </Button>
          ))}
        </Stack>

        {daySlots.length > 0 ? (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {daySlots.map((slot) => (
              <Button
                key={slot.startAt}
                variant="secondary"
                onClick={() => setSelectedSlot(slot.startAt)}
                disabled={status === 'success'}
              >
                {slotLabel(slot.startAt)}
              </Button>
            ))}
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {serviceId ? 'Sin huecos disponibles para este día.' : 'Elige un servicio para ver huecos.'}
          </Typography>
        )}

        {selectedSlot ? (
          <Stack spacing={2}>
            <TextField
              label="Nombre"
              value={clientName}
              onChange={setClientName}
              placeholder="Tu nombre y apellidos"
            />
            <TextField
              label="Contacto (opcional)"
              value={clientContact}
              onChange={setClientContact}
              placeholder="Email o teléfono"
            />
            <Stack direction="row" justifyContent="flex-end">
              <Button variant="primary" onClick={confirm} disabled={status === 'busy'}>
                {status === 'busy' ? 'Reservando…' : 'Confirmar cita'}
              </Button>
            </Stack>
          </Stack>
        ) : null}

        {message ? (
          <Typography variant="body2" color={status === 'error' ? 'error' : 'success'} role="status">
            {message}
          </Typography>
        ) : null}
      </Stack>
    </Card>
  );
}