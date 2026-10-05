import type { Application } from '@/types';

export const apps: Application[] = [
  {
    id: 'foundly-mobile-finance',
    name: 'Foundly',
    category: 'Finanzas Personales',
    status: 'En Desarrollo',
    target: 'iOS / Android (Expo)',
    description:
      'Aplicación móvil de gestión financiera basada en la fórmula del Saldo Disponible (Net Available Balance). Control total de gastos, ingresos, deudas y ahorros en un entorno 100% local.',
  },
  {
    id: 'foundly-pos',
    name: 'Foundly POS',
    category: 'Comercio & Ventas',
    status: 'Beta Activa',
    target: 'Mobile / Tablet (SQLite + Drizzle)',
    description:
      'Punto de venta ultrarrápido y local-first para pequeños comercios. Cero dependencia de APIs en la nube, precisión financiera en centavos enteros y registro de ventas en 2 taps.',
  },
  {
    id: 'lrc-maker',
    name: 'LRC-Maker',
    category: 'Multimedia & Tools',
    status: 'Producción / Disponible',
    target: 'Web / Desktop (Vite + React)',
    description:
      'Herramienta de escritorio en navegador para sincronización de letras estilo karaoke. Procesamiento de audio de baja latencia y exportación .lrc / .ass 100% en el cliente sin servidores.',
  },
  {
    id: 'mixbit',
    name: 'Mixbit',
    category: 'Trading Engine',
    status: 'En Desarrollo',
    target: 'Full-Stack (Next.js + FastAPI)',
    description:
      'Bot de Grid Trading local-first. Control de estrategias de trading, ejecución multiactivo con CCXT y persistencia privada en base de datos SQLite aislada.',
  },
];
