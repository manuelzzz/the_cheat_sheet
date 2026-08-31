import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The `content/` directory at the repository root is the source of truth.
// Its filesystem path (`[locale]/[category]/[slug].md`) is parsed into
// route params elsewhere — see `src/config/content.ts`. Frontmatter only
// carries metadata that cannot be derived from the path itself.
//
// `_category.md` files are excluded from `cheatsheets` (bracket negation
// skips filenames starting with `_`) and loaded separately as `categories`,
// carrying optional category-level metadata such as a description.
const cheatsheets = defineCollection({
  loader: glob({ pattern: '**/[!_]*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Freeform topics a cheat sheet relates to, beyond its category (e.g.
    // "mobile", "cross-platform"). Optional, and not yet used for
    // filtering — see .rules/architecture.md.
    tags: z.array(z.string()).optional(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/_category.md', base: './content' }),
  schema: z.object({
    description: z.string().optional(),
  }),
});

export const collections = { cheatsheets, categories };
