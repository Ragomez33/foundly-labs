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
      // Inter Variable matches the ecosystem landing's font (apps/landing).
      fontFamily:
        '"Inter Variable", Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        fontWeight: 700,
        letterSpacing: '-0.025em',
        lineHeight: 1.1,
      },
      h2: {
        fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
      },
      h3: { fontSize: '1.875rem', fontWeight: 600, letterSpacing: '-0.01em' },
      h4: { fontSize: '1.5rem', fontWeight: 600 },
      h5: { fontSize: '1.25rem', fontWeight: 600 },
      h6: { fontSize: '1.125rem', fontWeight: 600 },
      body1: { fontSize: '1rem', lineHeight: 1.6 },
      body2: { fontSize: '0.875rem', lineHeight: 1.6 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          // Pill/rounded-full buttons in sentence case, matching the landing.
          root: {
            borderRadius: `${RADIUS.pill}px`,
            textTransform: 'none',
            fontWeight: 600,
            minHeight: 44,
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          },
          containedPrimary: ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.paper,
            '&:hover': { backgroundColor: theme.palette.primary.dark },
          }),
          outlined: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.border.subtle,
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.surface.badgePill,
              borderColor: theme.palette.border.subtle,
            },
          }),
        },
      },
    },
  });
}

/** Convenience: the default theme instance used by `FoundlyThemeProvider`. */
export const foundlyTheme: Theme = createFoundlyTheme();
