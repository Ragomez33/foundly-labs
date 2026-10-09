import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FoundlyThemeProvider } from '../../theme';
import { DataTable, type DataTableColumn } from './DataTable';

interface Row {
  id: string;
  name: string;
}

const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Producto', render: (row) => row.name },
];

describe('DataTable', () => {
  it('renders rows and supports row clicks', async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();
    render(
      <FoundlyThemeProvider>
        <DataTable
          columns={columns}
          rows={[{ id: 'a', name: 'Café' }]}
          getRowKey={(row) => row.id}
          onRowClick={onRowClick}
        />
      </FoundlyThemeProvider>,
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
    await user.click(screen.getByText('Café'));
    expect(onRowClick).toHaveBeenCalledWith({ id: 'a', name: 'Café' });
  });

  it('shows an explicit empty state when there are no rows', () => {
    render(
      <FoundlyThemeProvider>
        <DataTable columns={columns} rows={[]} emptyMessage="Sin productos" />
      </FoundlyThemeProvider>,
    );
    expect(screen.getByText('Sin productos')).toBeInTheDocument();
  });
});
