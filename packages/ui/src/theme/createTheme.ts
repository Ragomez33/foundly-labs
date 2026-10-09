import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { BrandPalette, SurfacePalette } from '../types/theme';
import { tokenValue } from './tokens';

/** Named corner radii from specs/system-design.md §5.2. */
export const RADIUS = {
  container: 16,
  overlay: 12,
  control: 8,
  pill: 9999,
} as const;

export interface FoundlyThemeOptions {
  /** Non-core brand accent overrides (domain accents). */
  brand?: Partial<BrandPalette>;
  /** Non-core surface overrides. */
  surface?: Partial<SurfacePalette>;
}

/**
 * Build the Clean Light UI theme from the canonical design tokens.
 * Every brand value resolves to a token (FR-002); no literal colors here.
 */
export function createFoundlyTheme(overrides: FoundlyThemeOptions = {}): Theme {
  const brand: BrandPalette = {
    book: tokenValue('--brand-book'),
    store: tokenValue('--brand-store'),
    pos: tokenValue('--brand-pos'),
    ...overrides.brand,
  };

  const surface: SurfacePalette = {
    appBody: tokenValue('--bg-app-body'),
    header: tokenValue('--bg-header'),
    footer: tokenValue('--bg-footer'),
    cardLight: tokenValue('--bg-card-light'),
    cardHover: tokenValue('--bg-card-hover'),
    badgePill: tokenValue('--bg-badge-pill'),
    glass: tokenValue('--surface-glass'),
    ...overrides.surface,
  };

  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: tokenValue('--accent-primary'),
        dark: tokenValue('--accent-primary-hover'),
        light: tokenValue('--accent-primary-soft'),
      },
      success: {
        main: tokenValue('--accent-positive'),
        light: tokenValue('--accent-positive-soft'),
      },
      error: {
        main: tokenValue('--accent-negative'),
        light: tokenValue('--accent-negative-soft'),
      },
      warning: {
        main: tokenValue('--accent-warning'),
        light: tokenValue('--accent-warning-soft'),
      },
      info: {
        main: tokenValue('--accent-info'),
        light: tokenValue('--accent-info-soft'),
      },
      background: {
        default: tokenValue('--bg-app-body'),
        paper: tokenValue('--bg-card-light'),
      },
      text: {
        primary: tokenValue('--text-primary'),
        secondary: tokenValue('--text-secondary'),
        disabled: tokenValue('--text-muted'),
      },
      divider: tokenValue('--border-subtle'),
      surface,
      border: {
        subtle: tokenValue('--border-subtle'),
        lavender: tokenValue('--border-lavender'),
      },
      brand,
      shadow: {
        card: tokenValue('--shadow-card'),
        fab: tokenValue('--shadow-fab'),
      },
    },
    shape: {
      borderRadius: RADIUS.control,
    },
    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    },
  });
}

/** Convenience: the default theme instance used by `FoundlyThemeProvider`. */
export const foundlyTheme: Theme = createFoundlyTheme();
