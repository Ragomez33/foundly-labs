# Foundly Labs Web & Landing Page

**Versión:** 3.0.0
**Estado:** Binding
**Ámbito:** Repositorio de la Landing Page & Portal de Foundly Labs
**Stack Base:** Astro 5 (Server-First Islands Architecture) + CSS Modules/Tokens + WebGL / Canvas + GSAP
**Metodología:** Spec-Driven Development (SDD)

## 1. Jerarquía de Autoridad (Rule of Law)

En caso de cualquier ambigüedad, contradicción o conflicto técnico o funcional durante el desarrollo, se aplica estrictamente el siguiente orden de jerarquía de autoridad:

$$
\text{specs/business-model.md} \gt \text{constitution.md} \gt \text{code-rules.md} \gt \text{specs locales de feature}
$$

- **specs/business-model.md**: Define el pricing, bundles, propuesta de valor de la marca y las reglas del ecosistema Foundly Labs.
- **constitution.md** (este documento): Define los principios no negociables de arquitectura, calidad, diseño y flujo de trabajo.
- **code-rules.md**: Define las normas de código TypeScript, Astro, CSS y estructuras de componentes.
- **Specs locales de feature** (`specs/features/<feature>.md`): Especifican el comportamiento detallado de cada vista, isla interactiva o flujo.

## 2. Gobernanza del Código (code-rules.md)

`code-rules.md` es el archivo de gobernanza y la referencia normativa obligatoria para la escritura de código en este repositorio. Toda contribución de código debe cumplirlo estrictamente.

- **Ámbito**: Define las reglas de tipado estricto, arquitectura Astro 5 e islas, convenciones de nombres y ubicación, sistema de diseño/Tailwind, separación de contenido y componentes, desempeño y formularios.
- **Carácter**: Inviolable. Dentro de la jerarquía de autoridad se subordina únicamente a `specs/business-model.md` y a este `constitution.md`.
- **Obligación**: Antes de escribir o modificar código de producción, consulta `code-rules.md` y verifica que la implementación cumple cada regla aplicable.

## 3. Principios Técnicos & Arquitectura (Astro 5 + Islands)

### I. Spec-Driven Development (SDD) Obligatorio

- "No spec, no code": Ninguna línea de código de producción o refactorización mayor debe escribirse sin que exista una especificación previa aprobada en el directorio `specs/`.
- El flujo de desarrollo debe seguir secuencialmente: Spec (EARS) ➔ Plan de Arquitectura ➔ Tareas ➔ Implementación.

### II. Server-First & Zero-JS Default

- Todo el maquetado, estructura de información, textos, ventajas SEO y activos estáticos deben renderizarse como HTML puro generado en el servidor / build time.
- **Islas de Interactividad (`client:*`)**:
  - Se prohíbe el uso de `client:load` a menos que sea el Hero principal.
  - Usar `client:visible` para componentes interactivos fuera del viewport inicial (ej. calculadoras de precios, modal de licencias, demos de productos).
  - Usar `client:idle` para widgets secundarios o analíticas.
  - Usar `client:media` para elementos condicionales de renderizado según el viewport.

### III. Desempeño & Core Web Vitals

- **Target de Rendimiento**: Puntuación de 100/100 en Google Lighthouse Desktop y $\ge 98$ en Mobile para Performance, Accessibility y SEO.
- **Manejo de Canvas / WebGL**: Los lienzos 3D o interactivos deben encapsularse dentro de componentes aislados, destruyendo explícitamente contextos de WebGL (`dispose()`) al desmontar para evitar fugas de memoria en dispositivos móviles.

### IV. Tipado Estricto

- **TypeScript Estricto**: La configuración de TypeScript debe mantener `strict: true` y `noImplicitAny: true`.
- **Prohibición de `any`**: Todo prop, estado o contrato de datos debe estar tipado explícitamente mediante interfaces o schemas de Zod.

## 4. Guía de Diseño, Estética & Sistema de Tokens (Clean Light UI)

La landing page de Foundly Labs heredará la línea de diseño limpia, clara y de alto contraste de Foundly POS, proyectando una marca unificada, ágil y profesional (Lavender-to-White Body).

### I. Paleta de Colores & Tokens

```css
:root {
  /* Backgrounds & Surfaces */
  --bg-gradient-top: linear-gradient(180deg, #C8B6FF 0%, #D8B4FE 100%);
  --bg-app-body: #FAFAFC;
  --bg-card-light: #FFFFFF;
  --bg-surface-elevated: #F4F3F8;
  --bg-badge-pill: #F0EEF9;

  /* Brand Accents & Financial Indicators */
  --accent-primary: #6C5CE7; /* Vibrant Neon Purple */
  --accent-primary-glow: rgba(108, 92, 231, 0.35);
  --accent-positive: #10B981; /* Emerald Green */
  --accent-negative: #EF4444; /* Crimson Red */
  --accent-gold: #F59E0B; /* Amber/Warning */

  /* Typography & Text */
  --text-primary: #1E1B2E;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;

  /* Borders & Shadows */
  --border-subtle: #E6E4F0;
  --border-lavender: #DCD8EC;
  --shadow-card: 0px 8px 16px rgba(108, 92, 231, 0.05);
  --shadow-fab: 0px 10px 20px rgba(108, 92, 231, 0.35);
}
```

### II. Normas de Composición Visual & Cards

- **Superficie de Tarjetas**: Fondo blanco puro (#FFFFFF), bordes ultra-finos lavanda (1px solid #E6E4F0), bordes redondeados de 20px (rounded-3xl) y sombras suavizadas suspendidas.
- **Pills & Badges**: Bordes redondeados completos (9999px / rounded-full), fondo lavanda claro (#F0EEF9) y texto acentuado en púrpura (#6C5CE7).
- **Icon Containers**: Contenedores circulares con fondo lavanda claro (#F0EEF9) e iconos en color púrpura de marca (#6C5CE7).
- **Cifras y Números**: Alineación numérica tabular (tabular-nums), peso tipográfico 700 (Bold).

## 5. Estructura del Repositorio (Astro Project Layout)

El proyecto seguirá la estructura modular e insular nativa de Astro:

```text
/
├── public/                     # Isologotipos de Foundly, assets de branding y favicons
├── src/
│   ├── components/             # Componentes Astro de servidor (HTML/CSS estático, 0 KB JS)
│   │   ├── Header.astro        # AppHeader transparente con logo de la marca
│   │   ├── Footer.astro        # Enlaces de ecosistema, legal y SDD
│   │   ├── ProductCard.astro   # Tarjeta de producto (Foundly, POS, Trading, Studio)
│   │   └── Philosophy.astro    # Sección de pilares local-first
│   ├── islands/                # Islas de interactividad cliente (React / Vanilla TS)
│   │   ├── PricingToggle.tsx   # Switch de facturación mensual/anual y Foundly Pass
│   │   └── HeroCanvas.tsx      # Lienzo de simulación interactiva / WebGL
│   ├── layouts/
│   │   └── BaseLayout.astro    # Metadata SEO, OpenGraph, Fuentes y tokens CSS globales
│   ├── pages/
│   │   ├── index.astro         # Landing page principal
│   │   └── pass.astro          # Página dedicada al Foundly Pass & Licencias
│   ├── styles/
│   │   ├── tokens.css          # Variables de diseño (colores, bordes, sombras)
│   │   └── global.css          # Reset CSS y tipografías
│   └── utils/                  # Schemas de Zod, formateadores de moneda/centavos
├── specs/                      # Documentación del proyecto (SDD)
│   ├── business-model.md       # Precios, bundles y licencias del ecosistema
│   ├── constitution.md         # Este documento
│   └── code-rules.md           # Reglas de tipado, Astro y convención de componentes
└── astro.config.mjs
```

## 6. Convención de Commits y Flujo de Trabajo

### Convención de Commits

- `feat(scope)`: implementación de nuevas vistas o islas descritas en specs.
- `fix(scope)`: corrección de fallas o estilos.
- `spec(scope)`: creación o modificación de especificaciones en specs/.
- `style(scope)`: ajustes puramente estéticos o de tokens CSS.

### Validación Pre-Commit

- Todo commit debe pasar exitosamente el linter (eslint), la verificación de tipos de TypeScript (astro check) y compilar sin advertencias.

---

Foundly Labs Constitution — "Local-First, Agile Commerce, Zero Compromise."
