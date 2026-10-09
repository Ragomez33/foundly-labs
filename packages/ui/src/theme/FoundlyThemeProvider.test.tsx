import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../test-utils/a11y';
import { FoundlyThemeProvider } from './FoundlyThemeProvider';

describe('FoundlyThemeProvider', () => {
  it('renders children themed', async () => {
    const { container } = render(
      <FoundlyThemeProvider>
        <button type="button">Acción</button>
      </FoundlyThemeProvider>,
    );
    expect(screen.getByRole('button', { name: 'Acción' })).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });

  it('accepts non-core overrides', () => {
    const { container } = render(
      <FoundlyThemeProvider overrides={{ brand: { store: 'slategray' } }}>
        <span>Contenido</span>
      </FoundlyThemeProvider>,
    );
    expect(container).toBeTruthy();
  });
});
