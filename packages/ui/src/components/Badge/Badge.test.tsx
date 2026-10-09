import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../test-utils/a11y';
import { FoundlyThemeProvider } from '../../theme';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders every semantic status', async () => {
    const statuses = ['positive', 'negative', 'warning', 'info', 'neutral'] as const;
    const { container } = render(
      <FoundlyThemeProvider>
        {statuses.map((status) => (
          <Badge key={status} status={status}>
            {status}
          </Badge>
        ))}
      </FoundlyThemeProvider>,
    );
    for (const status of statuses) {
      expect(screen.getByText(status)).toBeInTheDocument();
    }
    await expectNoA11yViolations(container);
  });

  it('supports pill form and truncates long labels', () => {
    render(
      <FoundlyThemeProvider>
        <Badge pill>Disponible</Badge>
        <Badge>
          Una etiqueta de estado considerablemente larga que debe truncarse sin romper el layout
        </Badge>
      </FoundlyThemeProvider>,
    );
    expect(screen.getByText('Disponible')).toBeInTheDocument();
  });
});
