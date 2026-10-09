export interface ProductFeature {
  title: string;
  description: string;
}

export const BOOK_HERO = {
  title: 'Tu agenda en piloto automático',
  subtitle:
    'Gestiona citas, servicios y profesionales desde un solo panel, y deja que tus clientes reserven online a cualquier hora, incluso cuando estás cerrado.',
  badge: 'Reservas online 24/7',
} as const;

export const BOOK_CTA = {
  href: '/onboarding',
  label: 'Registrar mi negocio',
} as const;

export const BOOK_DEMO = {
  href: '/estudio-ana',
  label: 'Ver Demo',
} as const;

export const BOOK_BENEFITS: ProductFeature[] = [
  {
    title: 'Agendamiento 24/7',
    description: 'Tus clientes reservan cuando quieran, sin llamadas ni mensajes fuera de horario.',
  },
  {
    title: 'Recordatorios',
    description: 'Reduce las ausencias manteniendo a cada cliente al día antes de su cita.',
  },
  {
    title: 'Control de disponibilidad',
    description: 'Define horarios de trabajo, descansos y bloques por cada profesional.',
  },
  {
    title: 'Perfil personalizado',
    description: 'Tu marca, tus servicios y tu URL pública en un portal a tu medida.',
  },
];

export const BOOK_INDUSTRIES = [
  'Salud',
  'Belleza',
  'Consultoría',
  'Deportes',
  'Educación',
  'Servicios profesionales',
] as const;

export const BOOK_FINAL_CTA = {
  eyebrow: 'Empieza en 3 pasos',
  title: 'Crea tu negocio en minutos',
  subtitle: 'Cuenta · Negocio · Configuración — y listo para recibir citas.',
  cta: { href: '/onboarding', label: 'Crear mi negocio gratis' },
} as const;