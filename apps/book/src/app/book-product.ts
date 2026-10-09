export interface ProductFeature {
  title: string;
  description: string;
}

export const BOOK_HERO = {
  title: 'Foundly Book',
  subtitle: 'La manera más fácil de gestionar tus agendas, servicios y citas — y de que tus clientes reserven online.',
} as const;

export const BOOK_CTA = {
  href: '/onboarding',
  label: 'Registrar mi negocio',
} as const;

export const BOOK_FEATURES: ProductFeature[] = [
  {
    title: 'Agenda',
    description: 'Gestiona tus citas, evita dobles reservas y controla el estado de cada visita.',
  },
  {
    title: 'Servicios',
    description: 'Catálogo de servicios con duración y tarifas siempre actualizadas.',
  },
  {
    title: 'Disponibilidad',
    description: 'Define horarios de trabajo, descansos y bloqueos por profesional.',
  },
  {
    title: 'Portal público',
    description: 'Tus clientes reservan online desde tu URL pública, sin intermediarios.',
  },
];