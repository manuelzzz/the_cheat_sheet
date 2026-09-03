import type { CollectionEntry } from 'astro:content';

/**
 * Filesystem-derived route params for a cheat sheet.
 *
 * The `content/[locale]/[category]/[slug].md` path is the source of truth
 * for these values — see `.rules/architecture.md`. They must never be
 * duplicated in frontmatter.
 */
export interface CheatSheetParams {
  locale: string;
  category: string;
  slug: string;
}

/**
 * Derives locale, category, and slug from a `cheatsheets` collection
 * entry's id, which is its path relative to `content/` (e.g.
 * `en/frameworks/flutter`).
 */
export function parseCheatSheetId(id: string): CheatSheetParams {
  const segments = id.split('/');

  if (segments.length !== 3) {
    throw new Error(
      `Invalid cheat sheet path "${id}". Expected "[locale]/[category]/[slug].md".`,
    );
  }

  const [locale, category, slug] = segments;
  return { locale, category, slug };
}

export function toCheatSheet(entry: CollectionEntry<'cheatsheets'>) {
  return { ...parseCheatSheetId(entry.id), entry };
}

/** Filesystem-derived route params for a category (`[locale]/[category]`). */
export interface CategoryParams {
  locale: string;
  category: string;
}

/**
 * Derives locale and category from a `categories` collection entry's id
 * (e.g. `en/frameworks/_category`).
 */
export function parseCategoryId(id: string): CategoryParams {
  const segments = id.split('/');

  if (segments.length !== 3) {
    throw new Error(
      `Invalid category path "${id}". Expected "[locale]/[category]/_category.md".`,
    );
  }

  const [locale, category] = segments;
  return { locale, category };
}

/** Title-cases a filesystem-derived name for display (e.g. "operating-systems" -> "Operating Systems"). */
export function titleCase(value: string): string {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
