'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button, Stack, Typography } from '@foundly/ui';
import { fetchOfferedSlots, type SlotDay } from '../../actions';
import { formatTimeLabel } from '../../format';

function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Step 2 — interactive date selector + time-slot grid (FR-011). */
export function SlotStep({
  tenantSlug,
  serviceId,
  resourceId,
  value,
  onSelect,
  onContinue,
  onBack,
}: {
  tenantSlug: string;
  serviceId: string;
  resourceId?: string;
  value: { startAt: string; endAt: string } | null;
  onSelect: (slot: { startAt: string; endAt: string }) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<string>(() => dateKey(new Date()));
  const [daysData, setDaysData] = useState<SlotDay[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const days = useMemo(() => {
    const base = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(base.getFullYear(), base.getMonth(), base.getDate() + index);
      return dateKey(day);
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    void (async () => {
      const result = await fetchOfferedSlots({
        tenantSlug,
        serviceId,
        resourceId,
        startDate: date,
        endDate: date,
      });
      if (!cancelled) setDaysData(result);
    })();
    return () => {
      cancelled = true;
    };
  }, [mounted, date, resourceId, serviceId, tenantSlug]);

  const slots = daysData.find((day) => day.date === date)?.slots ?? [];

  return (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        Elige el día y la hora
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        {days.map((day) => (
          <Button
            key={day}
            variant={day === date ? 'primary' : 'secondary'}
            onClick={() => setDate(day)}
          >
            {day}
          </Button>
        ))}
      </Stack>

      {slots.length > 0 ? (
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          {slots.map((slot) => (
            <Button
              key={slot.startAt}
              variant={value?.startAt === slot.startAt ? 'primary' : 'secondary'}
              onClick={() => onSelect(slot)}
            >
              {formatTimeLabel(slot.startAt)}
            </Button>
          ))}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Sin huecos disponibles para este día.
        </Typography>
      )}

      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        <Button variant="secondary" onClick={onBack}>
          Atrás
        </Button>
        <Button variant="primary" disabled={!value} onClick={onContinue}>
          Continuar
        </Button>
      </Stack>
    </Stack>
  );
}