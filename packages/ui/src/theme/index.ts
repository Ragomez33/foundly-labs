export { createFoundlyTheme, foundlyTheme, RADIUS, type FoundlyThemeOptions } from './createTheme';
export { FoundlyThemeProvider, type FoundlyThemeProviderProps } from './FoundlyThemeProvider';
export {
  getToken,
  tokenValue,
  tokens,
  tokensByCategory,
  type DesignToken,
  type TokenCategory,
} from './tokens';

// Ensure the MUI module augmentation is part of the public type surface.
export type { BrandPalette, BorderPalette, ShadowPalette, SurfacePalette } from '../types/theme';
