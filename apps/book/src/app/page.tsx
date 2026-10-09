import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foundly Book',
  description: 'Información del producto Foundly Book y registro de negocios.',
};

/**
 * Product page (public `/book`). Placeholder for the MVP;
 * the full landing (features + CTA) ships with User Story 4.
 */
export default function HomePage() {
  return (
    <main>
      <h1>Foundly Book</h1>
      <p>Gestión de agendas, servicios y citas para tu negocio.</p>
      <p>Landing informativa en construcción.</p>
    </main>
  );
}