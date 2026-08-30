# Contributing

Thanks for considering a contribution to **The Cheat Sheet**.

The project is intentionally simple: content lives in the repository as
Markdown files, and the filesystem structure is the source of truth. There is
no CMS, no editor, and no backend — you contribute by opening a Pull Request.

See `.rules/` for the full set of project conventions (also used by AI coding
agents working on this repo).

## Adding a Cheat Sheet

1. Pick (or create) a locale folder under `content/` (e.g. `en`, `pt-br`).
2. Pick (or create) a category folder inside it (e.g. `frameworks`,
   `languages`).
3. Add a Markdown file named after the topic, in kebab-case:

   ```text
   content/[locale]/[category]/[cheat-sheet].md
   ```

   Example:

   ```text
   content/en/frameworks/flutter.md
   ```

   This automatically becomes the route `/en/frameworks/flutter` — no route,
   category, or navigation registration is required.

4. Add frontmatter with only the metadata that can't be derived from the
   path:

   ```markdown
   ---
   title: Flutter
   description: Quick reference for Flutter widgets, layout, and state basics.
   ---
   ```

   Do **not** add `locale`, `category`, or `slug` fields — these are derived
   from the file's path.

5. Write the content in Markdown below the frontmatter.
6. Open a Pull Request.

### Adding a new locale or category

Just create the folder. As soon as a Markdown file exists inside it, the
routes are generated automatically at build time.

### Describing a category

Optionally, add a `_category.md` file to a category folder to give it a
description shown on the category listing pages:

```text
content/en/frameworks/_category.md
```

```markdown
---
description: Quick references for popular application frameworks.
---
```

This file has no title and is not rendered as a cheat sheet itself.

### Translating an existing cheat sheet

Copy the file into the target locale folder, keeping the same category and
filename, and translate its contents:

```text
content/en/frameworks/flutter.md
content/pt-br/frameworks/flutter.md
```

## Local Development

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Before opening a Pull Request:

```bash
npm run format
npm run lint
npm run typecheck
npm run build
```
