import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FoundlyThemeProvider } from '../../theme';
import { Chip } from './Chip';

describe('Chip', () => {
  it('calls onDelete when the remove icon is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(
      <FoundlyThemeProvider>
        <Chip label="Violeta" onDelete={onDelete} />
      </FoundlyThemeProvider>,
    );
    expect(screen.getByText('Violeta')).toBeInTheDocument();
    await user.click(screen.getByTestId('CancelIcon'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('supports selectable/selected and click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <FoundlyThemeProvider>
        <Chip label="Filtro" selectable selected onClick={onClick} />
      </FoundlyThemeProvider>,
    );
    await user.click(screen.getByText('Filtro'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
