import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { FoundlyThemeProvider } from '@foundly/ui';
import { AvailabilityEditor } from './AvailabilityEditor';

describe('AvailabilityEditor', () => {
  it('renders weekly rules and the block count', async () => {
    const { container } = render(
      <FoundlyThemeProvider>
        <AvailabilityEditor
          rules={[
            {
              id: 'rule-1',
              resourceId: 'r1',
              weekday: 1,
              startTime: '09:00',
              endTime: '18:00',
              slotGranularityMinutes: 30,
              minLeadTimeMinutes: 0,
              bookingHorizonDays: 60,
            },
          ]}
          blocks={[]}
        />
      </FoundlyThemeProvider>,
    );
    expect(screen.getByText('Lunes')).toBeInTheDocument();
    expect(screen.getByText('0 bloqueo(s) de horario configurados.')).toBeInTheDocument();
    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });
});
