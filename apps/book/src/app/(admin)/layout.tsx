import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <a href="#main">Saltar al contenido</a>
      <header>
        <strong>Foundly Book</strong>
        <nav aria-label="Navegación principal">
          <Link href="/agenda">Agenda</Link>
          {' · '}
          <Link href="/services">Servicios</Link>
          {' · '}
          <Link href="/availability">Disponibilidad</Link>
        </nav>
      </header>
      <main id="main">{children}</main>
    </div>
  );
}
