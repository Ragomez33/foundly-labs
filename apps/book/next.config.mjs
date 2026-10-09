/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ['@foundly/ui'],
  /**
   * ESLint integrado de Next desactivado a propósito:
   * `eslint-config-next` (plugin que Next detecta para su panel) aún exige
   * ESLint <= 9, mientras el monorepo usa ESLint 10 (flat config) y el gate
   * real de lint es `npm run lint` en la raíz (constitution.md §8).
   * Sin esto, el overlay de Next informa "1 Issue" por el plugin no detectado.
   */
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;