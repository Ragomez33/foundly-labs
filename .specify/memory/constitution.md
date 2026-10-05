<!--
Sync Impact Report
==================
Version change: N/A (scaffold sin poblar) -> 3.0.0
Bump rationale: Población inicial del scaffold de constitución de Spec Kit a partir de la
  constitución fuente del proyecto (constitution.md v3.0.0, Estado: Binding). No existía una
  versión previa gestionada por Spec Kit, por lo que se alinea la numeración al documento
  normativo existente.

Modified principles: N/A (primera definición)
Renamed principles: N/A
Added principles:
  - I. Rule of Law (Jerarquía de Autoridad)
  - II. Spec-Driven Development (SDD)
  - III. Server-First & Zero-JS Default
  - IV. Strict Typing (Tipado Estricto)
  - V. Performance & Core Web Vitals
  - VI. Clean Light UI Design System

Added sections:
  - Technical & Platform Constraints
  - Development Workflow & Quality Gates
  - Governance

Removed sections: N/A

Deferred TODOs:
  - TODO(VERSION_CONFIRMATION): confirmar si la constitución gestionada por Spec Kit debe
    conservar el 3.0.0 del documento fuente o reiniciarse en 1.0.0 como primera versión
    ratificada bajo Spec Kit.
  - TODO(RATIFICATION_DATE): se asumió 2026-10-05 (fecha del primer commit del repositorio);
    confirmar la fecha real de ratificación.
-->

# Foundly Labs Constitution

## Core Principles

### I. Rule of Law (Jerarquía de Autoridad)

En caso de cualquier ambigüedad, contradicción o conflicto técnico o funcional durante el
desarrollo, se aplica estrictamente el siguiente orden de jerarquía de autoridad:

$$\text{specs/business-model.md} \gt \text{constitution.md} \gt \text{code-rules.md} \gt \text{specs locales de feature}$$

- `specs/business-model.md`: define el pricing, bundles, propuesta de valor de la marca y las
  reglas del ecosistema Foundly Labs.
- `constitution.md` (este documento): define los principios no negociables de arquitectura,
  calidad, diseño y flujo de trabajo.
- `code-rules.md`: define las normas de código TypeScript, Astro, CSS y estructura de componentes.
- Specs locales de feature (`specs/features/<feature>.md`): especifican el comportamiento detallado
  de cada vista, isla interactiva o flujo.

Ninguna decisión de implementación puede violar un nivel superior de esta jerarquía. Ante
conflicto entre dos documentos, prevalece el de mayor autoridad.

Rationale: garantiza una única fuente de verdad y desambigua las decisiones durante todo el ciclo
de desarrollo.

### II. Spec-Driven Development (SDD)

- "No spec, no code": ninguna línea de código de producción o refactorización mayor DEBE escribirse
  sin que exista una especificación previa aprobada en el directorio `specs/`.
- El flujo de desarrollo DEBE seguir secuencialmente: Spec (EARS) → Plan de Arquitectura → Tareas →
  Implementación.

Rationale: asegura trazabilidad requisito→implementación y evita trabajo no acordado.

### III. Server-First & Zero-JS Default

- Todo el maquetado, estructura de información, textos, ventajas SEO y activos estáticos DEBEN
  renderizarse como HTML puro generado en servidor o build time.
- Las islas de interactividad (`client:*`) DEBEN usar la directiva de hidratación mínima necesaria:
  - `client:load`: reservado únicamente para el Hero principal.
  - `client:visible`: para componentes interactivos fuera del viewport inicial (calculadoras de
    precios, modal de licencias, demos de productos).
  - `client:idle`: para widgets secundarios o analíticas.
  - `client:media`: para elementos condicionales de renderizado según el viewport.

Rationale: minimiza el JavaScript enviado al cliente y maximiza el desempeño y la accesibilidad.

### IV. Strict Typing (Tipado Estricto)

- La configuración de TypeScript DEBE mantener `strict: true` y `noImplicitAny: true`.
- Se prohíbe el uso de `any` y los casteos implícitos tipo `as targetType`; todo prop, estado o
  contrato de datos DEBE estar tipado explícitamente mediante interfaces o schemas de Zod.

Rationale: elimina errores en tiempo de ejecución y hace explícitos los contratos de datos.

### V. Performance & Core Web Vitals

- El objetivo DEBE ser 100/100 en Google Lighthouse Desktop y ≥ 98 en Mobile para Performance,
  Accessibility y SEO.
- Los lienzos 3D o interactivos DEBEN encapsularse en componentes aislados y destruir
  explícitamente sus contextos de WebGL (`dispose()`) al desmontar, para evitar fugas de memoria en
  dispositivos móviles.

Rationale: el desempeño es un requisito de producto, no una optimización posterior.

### VI. Clean Light UI Design System

- La interfaz DEBE heredar la línea de diseño limpia, clara y de alto contraste de Foundly POS
  (Lavender-to-White Body), proyectando una marca unificada.
- Superficie de tarjetas: fondo blanco puro (#FFFFFF), borde fino lavanda (1px solid #E6E4F0),
  radio de 20px y sombra suave suspendida.
- Pills y badges: radio completo (9999px), fondo lavanda claro (#F0EEF9) y texto acentuado en
  púrpura (#6C5CE7).
- Icon containers: contenedores circulares con fondo #F0EEF9 e iconos en #6C5CE7.
- Cifras y números: alineación numérica tabular (`tabular-nums`) y peso tipográfico 700.
- Los colores DEBEN mapear estrictamente al sistema de diseño (`tailwind.config.mjs`); se prohíben
  los colores mágicos inline.

Rationale: preserva la consistencia visual y la identidad de marca en todo el ecosistema.

## Technical & Platform Constraints

- **Stack base**: Astro 5 (Server-First Islands Architecture) + CSS Modules/Tokens + WebGL / Canvas
  + GSAP.
- **Metodología**: Spec-Driven Development (SDD).
- **Sistema de tokens** (Clean Light UI):

```css
:root {
  --bg-gradient-top: linear-gradient(180deg, #C8B6FF 0%, #D8B4FE 100%);
  --bg-app-body: #FAFAFC;
  --bg-card-light: #FFFFFF;
  --bg-surface-elevated: #F4F3F8;
  --bg-badge-pill: #F0EEF9;
  --accent-primary: #6C5CE7;
  --accent-primary-glow: rgba(108, 92, 231, 0.35);
  --accent-positive: #10B981;
  --accent-negative: #EF4444;
  --accent-gold: #F59E0B;
  --text-primary: #1E1B2E;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  --border-subtle: #E6E4F0;
  --border-lavender: #DCD8EC;
  --shadow-card: 0px 8px 16px rgba(108, 92, 231, 0.05);
  --shadow-fab: 0px 10px 20px rgba(108, 92, 231, 0.35);
}
```

- **Estructura del repositorio**:

```text
/
├── public/                     # Isologotipos, assets de branding y favicons
├── src/
│   ├── components/             # Componentes Astro de servidor (0 KB JS)
│   ├── islands/                # Islas de interactividad cliente (React / Vanilla TS)
│   ├── layouts/                # BaseLayout (SEO, OpenGraph, fuentes, tokens)
│   ├── pages/                  # Rutas (index.astro, pass.astro)
│   ├── styles/                 # tokens.css y global.css
│   └── utils/                  # Schemas Zod, formateadores
├── specs/                      # Documentación SDD (business-model, constitution, code-rules)
└── astro.config.mjs
```

- Las reglas detalladas de escritura de código viven en `code-rules.md` y son de cumplimiento
  obligatorio.

## Development Workflow & Quality Gates

- **Gobernanza de código**: `code-rules.md` es el archivo normativo obligatorio para la escritura
  de código. Antes de escribir o modificar código de producción, se DEBE consultar y cumplir cada
  regla aplicable.
- **Convención de commits**:
  - `feat(scope)`: implementación de nuevas vistas o islas descritas en specs.
  - `fix(scope)`: corrección de fallas o estilos.
  - `spec(scope)`: creación o modificación de especificaciones en `specs/`.
  - `style(scope)`: ajustes puramente estéticos o de tokens CSS.
- **Validación pre-commit**: todo commit DEBE pasar exitosamente el linter (eslint), la verificación
  de tipos (`astro check`) y compilar sin advertencias.

## Governance

- Esta constitución SUPERA cualquier otra práctica. `code-rules.md` se subordina a ella y a
  `specs/business-model.md` según la jerarquía de autoridad del Principio I.
- **Enmiendas**: toda enmienda DEBE documentarse, aprobarse por el responsable del proyecto e
  incluir un plan de migración cuando afecte código existente.
- **Versionado**: se aplica versionado semántico. MAJOR por eliminación o redefinición incompatible
  de principios; MINOR por adición o expansión material de principios o secciones; PATCH por
  aclaraciones o correcciones no semánticas.
- **Cumplimiento**: toda revisión (PR) DEBE verificar el cumplimiento de esta constitución y de
  `code-rules.md`; toda complejidad añadida DEBE justificarse explícitamente.

**Version**: 3.0.0 | **Ratified**: 2026-10-05 | **Last Amended**: 2026-10-05
