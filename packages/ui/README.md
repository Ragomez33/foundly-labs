# @foundly/ui

Paquete de **componentes visuales compartidos** del ecosistema Foundly Labs.

## Rol

- Aloja el design system **Clean Light UI** reutilizable por `apps/landing`, `apps/book` y `apps/store`.
- Componentes React compartidos y, cuando se requiera, componentes **MUI** re-estilizados con los tokens de marca.
- **Fuente de verdad visual**: `src/styles/tokens.css` (espejo de `specs/system-design.md` v3.0.0).

## Tokens

La fuente de verdad de la paleta es `src/styles/tokens.css` y se expone como subpath:

```css
@import '@foundly/ui/tokens.css';
```

Las apps mapean estas variables a su herramienta (Tailwind `@theme`, MUI theme, etc.). No declarar
colores de marca crudos fuera de este paquete.

## Reglas

- No puede depender de ninguna app (`packages/*` nunca importa desde `apps/*`).
- Los colores deben mapear a los tokens del sistema; sin colores mágicos inline.
- Tipado estricto: sin `any`, props tipadas explícitamente.

## Estado

Scaffold inicial. El entrypoint es `src/index.ts`; los componentes se añadirán a medida que lo requieran las specs.
