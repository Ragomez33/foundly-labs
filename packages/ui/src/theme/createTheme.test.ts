import { describe, expect, it } from 'vitest';
import { createFoundlyTheme, RADIUS } from './createTheme';
import { tokenValue } from './tokens';

describe('createFoundlyTheme (contracts/theme.contract.md)', () => {
  const theme = createFoundlyTheme();

  it('maps every brand palette entry to its source token', () => {
    expect(theme.palette.primary.main).toBe(tokenValue('--accent-primary'));
    expect(theme.palette.primary.dark).toBe(tokenValue('--accent-primary-hover'));
    expect(theme.palette.primary.light).toBe(tokenValue('--accent-primary-soft'));
    expect(theme.palette.success.main).toBe(tokenValue('--accent-positive'));
    expect(theme.palette.error.main).toBe(tokenValue('--accent-negative'));
    expect(theme.palette.warning.main).toBe(tokenValue('--accent-warning'));
    expect(theme.palette.info.main).toBe(tokenValue('--accent-info'));
    expect(theme.palette.background.default).toBe(tokenValue('--bg-app-body'));
    expect(theme.palette.background.paper).toBe(tokenValue('--bg-card-light'));
    expect(theme.palette.text.primary).toBe(tokenValue('--text-primary'));
    expect(theme.palette.text.secondary).toBe(tokenValue('--text-secondary'));
    expect(theme.palette.divider).toBe(tokenValue('--border-subtle'));
    expect(theme.palette.surface.cardHover).toBe(tokenValue('--bg-card-hover'));
    expect(theme.palette.brand.book).toBe(tokenValue('--brand-book'));
    expect(theme.palette.brand.store).toBe(tokenValue('--brand-store'));
    expect(theme.palette.brand.pos).toBe(tokenValue('--brand-pos'));
    expect(theme.palette.shadow.card).toBe(tokenValue('--shadow-card'));
    expect(theme.palette.shadow.fab).toBe(tokenValue('--shadow-fab'));
  });

  it('uses light mode and the control radius by default', () => {
    expect(theme.palette.mode).toBe('light');
    expect(theme.shape.borderRadius).toBe(RADIUS.control);
  });

  it('applies non-core overrides without mutating core tokens (FR-003)', () => {
    const custom = createFoundlyTheme({ brand: { book: 'rebeccapurple' } });
    expect(custom.palette.brand.book).toBe('rebeccapurple');
    expect(custom.palette.primary.main).toBe(tokenValue('--accent-primary'));
  });
});
