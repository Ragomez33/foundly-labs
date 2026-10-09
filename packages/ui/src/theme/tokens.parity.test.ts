// @vitest-environment node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { tokens } from './tokens';

function readTokensCss(): string {
  const cssPath = fileURLToPath(new URL('../styles/tokens.css', import.meta.url));
  return readFileSync(cssPath, 'utf8');
}

function parseCssVariables(css: string): Map<string, string> {
  const result = new Map<string, string>();
  const pattern = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(css)) !== null) {
    const name = `--${match[1] ?? ''}`;
    const value = (match[2] ?? '').trim();
    result.set(name, value);
  }
  return result;
}

function normalize(value: string): string {
  return value.replace(/\s+/g, ' ').trim().toLowerCase();
}

describe('token parity (contracts/token-parity.contract.md)', () => {
  const cssTokens = parseCssVariables(readTokensCss());
  const registry = new Map(tokens.map((token) => [token.name, token.value]));

  it('P1: every tokens.css custom property has a matching registry entry with the same value', () => {
    expect(cssTokens.size).toBeGreaterThan(0);
    for (const [name, value] of cssTokens) {
      expect(registry.has(name), `missing registry entry for ${name}`).toBe(true);
      expect(normalize(registry.get(name) ?? ''), `value mismatch for ${name}`).toBe(
        normalize(value),
      );
    }
  });

  it('P2: the registry contains no tokens absent from tokens.css', () => {
    for (const name of registry.keys()) {
      expect(cssTokens.has(name), `registry token ${name} is not declared in tokens.css`).toBe(
        true,
      );
    }
  });
});
