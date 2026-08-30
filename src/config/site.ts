/**
 * Prefixes an absolute path with the site's `base` (see `astro.config.mjs`),
 * so internal links keep working when the site is deployed under a
 * subpath (e.g. GitHub Pages project sites).
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
