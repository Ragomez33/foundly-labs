# Foundly Labs — System Design & UI Guidelines

**Version:** 3.0.0 (Ecosystem Core: Labs, Book & Store)
**Scope:** Global Monorepo (`apps/landing`, `apps/book`, `apps/store`, `packages/ui`)
**Status:** Binding — governed by `specs/constitution.md` §1.20

---

## 1. Ecosystem Domain & Architecture

Foundly Labs es un ecosistema de aplicaciones **modular, local-first y cloud-synced**, que comparte una misma identidad visual, sistema de diseño y arquitectura de tokens bajo un **único paradigma visual**.

| App               | App Scope                                                              | UI Paradigm                         |
| ----------------- | ---------------------------------------------------------------------- | ----------------------------------- |
| **Foundly Labs**  | Landing, portal del ecosistema y licenciamiento (Foundly Pass).        | Clean Light UI (Signature Theme)    |
| **Foundly Book**  | Gestión de agendas, citas, profesionales, recursos y horarios.         | Clean Light UI (SaaS Workspace)     |
| **Foundly Store** | E-commerce, catálogo digital, carritos, pedidos e inventario.          | Clean Light UI (E-commerce & POS)   |

---

## 2. Core Philosophy & Aesthetic

- **Style:** Clean Light UI (Lavender Light Palette).
- **Vibe:** Luminoso, fresco, moderno, minimalista, de alta claridad tipográfica y diferenciador.

### Card & Surface System

- Superficies blancas / lavanda extremadamente claras (`#FFFFFF` / `#F8FAFC` / `#F1F5F9`).
- Bordes suaves lavanda/zinc (`#E2E8F0` / `#CBD5E1`).
- Sombras sutiles con elevación limpia (`shadow-sm`, `shadow-md` con tinte lavanda).

---

## 3. Color Tokens & Palette Matrix

### 3.1 Backgrounds & Surfaces (Clean Light)

```css
--bg-app-body: #FAF8FF;        /* Fondo global neutro con matiz lavanda suave */
--bg-header: #FFFFFF;          /* Header limpio blanco puro */
--bg-footer: #F1F5F9;          /* Footer claro neutro */
--bg-card-light: #FFFFFF;      /* Superficie base para tarjetas, editores y modales */
--bg-card-hover: #F8FAFC;      /* Estado hover para tarjetas e ítems interactivos */
--bg-badge-pill: #F1F5F9;      /* Fondo suave para badges y etiquetas */
--border-subtle: #E2E8F0;      /* Color de bordes y separadores globales */
--surface-glass: rgba(255, 255, 255, 0.85); /* Overlay claro con backdrop-blur */
```

### 3.2 Accents & Brand Identifiers

El ecosistema usa el **Lavender/Neon Indigo (`#6C5CE7`)** como acento maestro de marca:

```css
/* Brand Primary (Master Accent) */
--accent-primary: #6C5CE7;          /* Neon Lavender / Primary Foundly Accent */
--accent-primary-hover: #5A4AD1;
--accent-primary-soft: #EEECFE;    /* Fondo suave lavanda para selección/focus */

/* Core Semantics */
--accent-positive: #10B981;         /* Emerald: Confirmaciones, Pago Exitoso, En Stock */
--accent-positive-soft: #D1FAE5;
--accent-negative: #EF4444;         /* Crimson: Citas Canceladas, Agotado, Errores */
--accent-negative-soft: #FEE2E2;
--accent-warning: #F59E0B;          /* Amber: Pendiente de Confirmación, Poco Stock */
--accent-warning-soft: #FEF3C7;
--accent-info: #3B82F6;             /* Electric Blue: Información de Cita / Envío */
--accent-info-soft: #DBEAFE;
```

### 3.3 Domain-Specific Accents (App Identity)

Cada app dentro del panel unificado o en sus badges se identifica mediante su acento sobre fondos claros:

```css
--brand-book: #7C3AED;   /* Purple/Violet: Agendas, Reservas y Citas */
--brand-store: #059669;  /* Emerald Green: E-commerce, Ventas y Catálogo */
--brand-pos: #2563EB;    /* Royal Blue: Punto de Venta Local-First */
```

### 3.4 Typography & Text Hierarchy

```css
--text-primary: #0F172A;    /* Slate oscuro de máximo contraste sobre blanco */
--text-secondary: #475569;  /* Gris medio-oscuro para subtítulos y descripciones */
--text-muted: #94A3B8;      /* Gris claro para placeholders y labels secundarios */
```

---

## 4. UI Standards per App Domain

### 4.1 Foundly Book (Agendas & Servicios)

**Calendar & Timeline Components:**

| Estado                              | Superficie / Tratamiento                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------- |
| Slot libre                          | Superficie `#FFFFFF` con borde discreto `--border-subtle`.                       |
| Slot reservado / confirmado         | Fondo `--accent-positive-soft` con texto/borde `#059669` o violeta.              |
| Slot pendiente de aprobación        | Fondo `--accent-warning-soft` con badge ámbar.                                    |
| Horario bloqueado / No disponible   | Fondo `#F1F5F9` con opacidad reducida o patrón neutro.                           |

**Interactive Elements:**

- Selector de fechas y horas con fuentes monospaciadas (`font-mono`, `tabular-nums`).

### 4.2 Foundly Store (E-commerce & Inventario)

**Product Grid & Cards:**

- Tarjeta de producto sobre `#FFFFFF`, sombra sutil `shadow-sm`, radio de bordes de **16px** (`rounded-2xl`).
- Transición de elevación en hover (`hover:-translate-y-0.5 hover:shadow-md`).

**Badges de Stock & Estado de Orden:**

| Estado                        | Pill                                                       |
| ----------------------------- | ---------------------------------------------------------- |
| En Stock / Entregado          | Pill verde claro con texto verde oscuro.                    |
| Bajo Stock / En Camino        | Pill amarillo / azul claro.                                 |
| Agotado / Cancelado           | Pill rojo claro con texto rojo oscuro.                      |

---

## 5. Layout & Architecture Guidelines

### 5.1 App Header (AppHeader)

- **Estilo:** Estático, blanco limpio (`#FFFFFF`), con borde inferior suave `#E2E8F0`.
- **Left Slot:** Identidad del ecosistema (`FOUNDLY` en `font-bold`) + Badge de la App activa (`BOOK`, `STORE` o `LABS`).
- **Right Slot:** Contexto de usuario, selector de módulo / app y perfil de la organización (Tenant).

### 5.2 Geometry & Corner Radius Standards

| Elemento                                       | Radio                                        |
| ---------------------------------------------- | -------------------------------------------- |
| Containers & Panels                            | **16px** (`rounded-2xl`)                     |
| Dropdowns, Modals & Floating Overlays          | **12px** (`rounded-xl`)                      |
| Buttons, Badges & Pills                        | **9999px** (`rounded-full`) o **8px** (`rounded-lg`) |

### 5.3 Typography Standards

- **General Text:** Inter / System UI, antialiased.
- **Numbers, Prices, Timestamps & Dates:** `font-mono`, `tabular-nums`, peso **600** (SemiBold).

---

**Version:** 3.0.0 | **Status:** Binding | **Last Amended:** 2026-10-08
