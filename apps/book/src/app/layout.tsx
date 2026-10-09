import '@foundly/ui/tokens.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { FoundlyThemeProvider } from '@foundly/ui';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Foundly Book — Administración',
  description: 'Panel de administración de agendas, servicios y disponibilidad.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppRouterCacheProvider options={{ key: 'foundly' }}>
          <FoundlyThemeProvider>{children}</FoundlyThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
