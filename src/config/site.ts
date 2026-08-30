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

/** The repository backing this site, used to link back to GitHub. */
export const repo = {
  owner: 'manuelzzz',
  name: 'the_cheat_sheet',
  branch: 'main',
};

export const repoUrl = `https://github.com/${repo.owner}/${repo.name}`;

/**
 * Builds a GitHub "edit this file" URL for a path relative to the
 * repository root (e.g. `content/en/frameworks/flutter.md`).
 */
export function githubEditUrl(path: string): string {
  return `${repoUrl}/edit/${repo.branch}/${path}`;
}
