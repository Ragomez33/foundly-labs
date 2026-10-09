'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container, Stack, Typography } from '@foundly/ui';
import type { ReactNode } from 'react';

const NAV_ITEMS = [
  { href: '/agenda', label: 'Agenda' },
  { href: '/services', label: 'Servicios' },
  { href: '/availability', label: 'Disponibilidad' },
];

export interface AdminShellProps {
  children: ReactNode;
}

/** Application shell: brand header, module navigation and the Clean Light UI canvas. */
export function AdminShell({ children }: AdminShellProps) {
  return (
    <Stack sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <a
        href="#main"
        style={{ position: 'absolute', left: '-9999px' }}
        onFocus={(event) => {
          event.currentTarget.style.left = '8px';
          event.currentTarget.style.top = '8px';
          event.currentTarget.style.zIndex = '1300';
        }}
        onBlur={(event) => {
          event.currentTarget.style.left = '-9999px';
        }}
      >
        Saltar al contenido
      </a>

      <Stack
        component="header"
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 1.5 }}>
            <Link
              href="/agenda"
              aria-label="Foundly Book — inicio"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Stack sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <Image src="/icon.png" alt="Foundly Book" width={30} height={30} priority />
              </Stack>
              <Stack sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Image src="/branding-logo.png" alt="Foundly Book" width={80} height={40} priority />
              </Stack>
            </Link>

            <Stack
              component="nav"
              direction="row"
              spacing={2.5}
              sx={{ ml: 'auto' }}
              aria-label="Navegación principal"
            >
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                  <Typography variant="button" color="text.secondary">
                    {item.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Stack>

      <Container id="main" maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Stack>
  );
}
