'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useMemo, type ReactNode } from 'react';
import { createFoundlyTheme, type FoundlyThemeOptions } from './createTheme';

export interface FoundlyThemeProviderProps {
  children: ReactNode;
  /** Optional non-core overrides; core tokens cannot be redefined. */
  overrides?: FoundlyThemeOptions;
}

/**
 * Applies the Clean Light UI theme to all descendants and resets base styles.
 * Provide this once at the application root.
 */
export function FoundlyThemeProvider({ children, overrides }: FoundlyThemeProviderProps) {
  const theme = useMemo(() => createFoundlyTheme(overrides), [overrides]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
