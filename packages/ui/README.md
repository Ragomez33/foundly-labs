# @foundly/ui

Paquete de **componentes visuales compartidos** del ecosistema Foundly Labs.

## Rol

- Aloja el design system **Clean Light UI** reutilizable por `apps/landing`, `apps/book` y `apps/store`.
- Componentes React (MUI v6 re-estilizado) y el `ThemeProvider` de marca.
- **Fuente de verdad visual**: `src/styles/tokens.css` (espejo de `specs/system-design.md` v3.0.0).

## Instalación en una app del workspace

El paquete se consume como código fuente; las apps deben transpilarlo.

- **Next.js** (`apps/book`, `apps/store`): añade `transpilePackages: ['@foundly/ui']` en `next.config.mjs` y envuelve el layout raíz.
- **Astro** (`apps/landing`): usa componentes MUI solo dentro de islas React (`client:only="react"`); el HTML estático sigue en Astro/Tailwind.

## Theme provider

```tsx
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { FoundlyThemeProvider } from '@foundly/ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppRouterCacheProvider>
          <FoundlyThemeProvider>{children}</FoundlyThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

Extensión de valores no-core (sin redefinir tokens):

```tsx
<FoundlyThemeProvider overrides={{ brand: { store: '#...' } }}>{children}</FoundlyThemeProvider>
```

> Los tokens canónicos viven en `src/theme/tokens.json` y se exponen mediante `createFoundlyTheme`.
> El guard de ESLint prohíbe colores hex literales en `packages/ui/src/**`: usa siempre el tema.

## Componentes

Todos se exportan desde el entrypoint único `@foundly/ui`.

| Componente    | Uso principal                                                                          |
| ------------- | -------------------------------------------------------------------------------------- |
| `Button`      | `variant`: `primary` \| `secondary` \| `destructive`; `loading`, `disabled`            |
| `Card`        | `header`, `media`, `actions`, `elevated`                                               |
| `Badge`       | `status`: `positive` \| `negative` \| `warning` \| `info` \| `neutral`; `pill`, `icon` |
| `Modal`       | `open`, `onClose`, `title`, `actions`; cierre por ESC/backdrop configurable            |
| `AlertDialog` | `onConfirm`, `onCancel`, `tone`: `default` \| `destructive`                            |
| `DataTable`   | `columns`, `rows`, `emptyMessage`, `onRowClick`, `dense`                               |
| `Chip`        | `label`, `onDelete`, `selectable`, `selected`, `color`                                 |
| `TextField`   | `label`, `helperText`, `error`, `value`, `onChange`                                    |

```tsx
import { FoundlyThemeProvider, Button, Card, Badge } from '@foundly/ui';

<FoundlyThemeProvider>
  <Card header={<h3>Aplicaciones</h3>}>
    <Badge status="positive">Disponible</Badge>
    <Button variant="primary">Empezar</Button>
  </Card>
</FoundlyThemeProvider>;
```

## Tokens CSS

```css
@import '@foundly/ui/tokens.css';
```

Las apps mapean estas variables a su herramienta (Tailwind `@theme`, MUI theme, etc.). No declarar
colores de marca crudos fuera de este paquete.

## Estructura

```text
src/
├── index.ts                 # entrypoint público
├── theme/                   # tokens.json, tokens.ts, createTheme, FoundlyThemeProvider
├── components/              # Button, Card, Badge, Modal, AlertDialog, DataTable, Chip, TextField
├── styles/tokens.css        # fuente de verdad visual
└── types/theme.d.ts         # augmentation de MUI (palette.surface/border/brand/shadow)
```

## Scripts

| Comando                            | Descripción                      |
| ---------------------------------- | -------------------------------- |
| `npm run typecheck -w @foundly/ui` | `tsc --noEmit` (tipado estricto) |
| `npm run test -w @foundly/ui`      | Vitest + RTL + vitest-axe        |
| `npm run lint -w @foundly/ui`      | ESLint (guard de colores hex)    |

## Reglas

- No puede depender de ninguna app (`packages/*` nunca importa desde `apps/*`).
- Los colores deben mapear a los tokens del sistema; sin colores mágicos inline.
- Tipado estricto: sin `any`, props tipadas explícitamente.
- Suite de paridad `tokens.css` ↔ `tokens.json` en `src/theme/tokens.parity.test.ts`.
