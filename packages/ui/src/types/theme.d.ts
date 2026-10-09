/**
 * MUI theme module augmentation — exposes the Clean Light UI custom palette keys
 * with full typing (no `any`), per spec FR-003 and contracts/theme.contract.md.
 */

export interface SurfacePalette {
  appBody: string;
  header: string;
  footer: string;
  cardLight: string;
  cardHover: string;
  badgePill: string;
  glass: string;
}

export interface BorderPalette {
  subtle: string;
  lavender: string;
}

export interface BrandPalette {
  book: string;
  store: string;
  pos: string;
}

export interface ShadowPalette {
  card: string;
  fab: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    surface: SurfacePalette;
    border: BorderPalette;
    brand: BrandPalette;
    shadow: ShadowPalette;
  }

  interface PaletteOptions {
    surface?: SurfacePalette;
    border?: BorderPalette;
    brand?: BrandPalette;
    shadow?: ShadowPalette;
  }
}
