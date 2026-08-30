# Contributing

Thanks for considering a contribution to **The Cheat Sheet**.

The project is intentionally simple: content lives in the repository as
Markdown files, and the filesystem structure is the source of truth. There is
no CMS, no editor, and no backend — you contribute by opening a Pull Request.

See `.rules/` for the full set of project conventions (also used by AI coding
agents working on this repo). This document is the contributor-facing
explanation of those rules — if the two ever seem to disagree, `.rules/` wins.

By participating in this project, you agree to abide by our
[Code of Conduct](./CODE_OF_CONDUCT.md).

## How do I add a new cheat sheet?

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
   category, or navigation registration is required (see
   `.rules/development.md`).

4. Add frontmatter with only the metadata that can't be derived from the
   path:

   ```markdown
   ---
   title: Flutter
   description: Quick reference for Flutter widgets, layout, and state basics.
   ---
   ```

   Do **not** add `locale`, `category`, or `slug` fields — these are derived
   from the file's path (see `.rules/architecture.md`).

5. Write the content in Markdown below the frontmatter.
6. Open a Pull Request.

## How do I improve an existing cheat sheet?

Edit the Markdown file directly — fix the mistake, add a missing command,
clarify wording — and open a Pull Request. Small, focused fixes are welcome
and don't need to be discussed in an issue first.

If you're changing the `title` or moving the file to a different category,
mention it in the PR description, since it changes the file's route.

## How do I add a new category?

Just create the folder and add a cheat sheet inside it — as soon as a
Markdown file exists, the category page and its routes are generated
automatically at build time. There's no separate registration step.

Optionally, add a `_category.md` file to the category folder to give it a
description shown on the category listing pages:

```text
content/en/frameworks/_category.md
```

```markdown
---
description: Quick references for popular application frameworks.
---
```

This file has no `title` and is not rendered as a cheat sheet itself.

## How do I add a translation?

Copy the file into the target locale folder, keeping the same category and
filename, and translate its contents (including the frontmatter `title` and
`description`):

```text
content/en/frameworks/flutter.md
content/pt-br/frameworks/flutter.md
```

A cheat sheet doesn't need to exist in every locale — partial translation
coverage is expected and fine.

## How should I structure a cheat sheet?

- **Title**: set it in frontmatter (`title:`), not as a Markdown `#` heading
  — the page renders its own `<h1>` from frontmatter.
- **Headings**: start content sections at `##`, and use `###` for
  subsections. Keep the hierarchy shallow — cheat sheets are meant to be
  scanned, not read top to bottom.
- **Code blocks**: always use fenced code blocks with a language tag (e.g.
  ` ```dart `, ` ```bash `) so syntax highlighting works.
- **Length and tone**: keep entries terse and reference-style — short
  explanations, commands, and snippets over prose. A cheat sheet is a lookup
  tool, not a tutorial or blog post.
- **Frontmatter `description`**: one sentence, used as the page's meta
  description and shown as a subtitle on listing pages.

## How do I test my changes locally?

Requires Node.js 22+.

```bash
npm install
npm run dev
```

This starts a local dev server that reflects filesystem changes to `content/`
immediately — open the route for the page you're changing (e.g.
`/en/frameworks/flutter`) and check it renders as expected.

Before opening a Pull Request, run the full validation suite (also run in CI):

```bash
npm run format    # format with Prettier
npm run lint      # lint with ESLint
npm run typecheck # type-check with astro check
npm run build     # production build
```

## How do I open a Pull Request?

- **Branch naming**: `type/short-description`, e.g. `docs/contributing-faq`,
  `feat/search-page`, `fix/flutter-typo`. Matches the commit type prefixes
  below.
- **Commit messages**: follow [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`). Reference the related
  issue in the body, e.g. `Closes #52`.
- **What reviewers look for**:
  - The change matches `.rules/` conventions (filesystem-driven content, no
    duplicated frontmatter, no unnecessary abstractions or dependencies).
  - `npm run format`, `lint`, `typecheck`, and `build` all pass.
  - The PR is focused on a single change (one cheat sheet, one fix, one
    feature) rather than bundling unrelated edits.
  - New content follows the structure guidance above.
- Fill in the PR template, linking the issue it closes (if any).
