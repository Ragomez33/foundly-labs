import raw from './tokens.json';

export type TokenCategory =
  'surface' | 'accent' | 'semantic' | 'domain' | 'text' | 'border' | 'shadow';

export interface DesignToken {
  /** Canonical CSS custom property name, e.g. `--accent-primary`. */
  name: string;
  /** Resolved value, matching `styles/tokens.css`. */
  value: string;
  category: TokenCategory;
  cssVariable: string;
  themeSlot: string | null;
}

const CATEGORIES: readonly TokenCategory[] = [
  'surface',
  'accent',
  'semantic',
  'domain',
  'text',
  'border',
  'shadow',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isDesignToken(value: unknown): value is DesignToken {
  if (!isRecord(value)) return false;
  return (
    typeof value.name === 'string' &&
    typeof value.value === 'string' &&
    typeof value.cssVariable === 'string' &&
    (value.themeSlot === null || typeof value.themeSlot === 'string') &&
    typeof value.category === 'string' &&
    CATEGORIES.includes(value.category as TokenCategory)
  );
}

function parseRegistry(value: unknown): DesignToken[] {
  if (!isRecord(value) || !Array.isArray(value.tokens)) {
    throw new Error('Invalid token registry: expected an object with a "tokens" array.');
  }
  const list = value.tokens;
  if (!list.every(isDesignToken)) {
    throw new Error('Invalid token registry: one or more entries are malformed.');
  }
  return list;
}

const data: unknown = raw;

/** All canonical design tokens, validated at module load. */
export const tokens: DesignToken[] = parseRegistry(data);

const byName = new Map(tokens.map((token) => [token.name, token]));

/** Resolve a design token by its canonical name. Throws if unknown. */
export function getToken(name: string): DesignToken {
  const token = byName.get(name);
  if (!token) {
    throw new Error(`Unknown design token: ${name}`);
  }
  return token;
}

/** Resolve a design token value by its canonical name. */
export function tokenValue(name: string): string {
  return getToken(name).value;
}

/** Trailing category-independent lookup used by the theme builder. */
export function tokensByCategory(category: TokenCategory): DesignToken[] {
  return tokens.filter((token) => token.category === category);
}
