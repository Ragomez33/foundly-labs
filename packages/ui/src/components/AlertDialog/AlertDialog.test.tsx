import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../test-utils/a11y';
import { FoundlyThemeProvider } from '../../theme';
import { AlertDialog } from './AlertDialog';

describe('AlertDialog', () => {
  it('fires confirm and cancel actions', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const { container } = render(
      <FoundlyThemeProvider>
        <AlertDialog
          open
          title="Eliminar cita"
          description="Esta acción no se puede deshacer."
          confirmLabel="Eliminar"
          cancelLabel="Volver"
          tone="destructive"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </FoundlyThemeProvider>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Eliminar' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Volver' }));
    expect(onCancel).toHaveBeenCalledTimes(1);

    await expectNoA11yViolations(container);
  });
});
