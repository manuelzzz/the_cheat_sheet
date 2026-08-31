<img src="https://raw.githubusercontent.com/manuelzzz/the_cheat_sheet/refs/heads/main/public/favicon.svg" alt="favicon" width="32" height="32"></img>

[![CI](https://github.com/manuelzzz/the_cheat_sheet/actions/workflows/ci.yml/badge.svg)](https://github.com/manuelzzz/the_cheat_sheet/actions/workflows/ci.yml)
[![Deploy](https://github.com/manuelzzz/the_cheat_sheet/actions/workflows/deploy.yml/badge.svg)](https://github.com/manuelzzz/the_cheat_sheet/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**[Live site →](https://manuelzzz.github.io/the_cheat_sheet/)**

An open-source collection of practical cheat sheets for developers.

Content is stored as Markdown files in this repository and automatically
rendered as static pages. Anyone can contribute by adding or improving a
Markdown file through a Pull Request.

> A folder defines structure. A Markdown file defines content. A Pull Request
> is a contribution.

## Quick Start

Requires Node.js 22+.

```bash
git clone https://github.com/manuelzzz/the_cheat_sheet.git
cd the_cheat_sheet
npm install
npm run dev
```

Open **http://localhost:4321/the_cheat_sheet/** to view it locally.

Want to add or edit a cheat sheet? See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Core Principles

- The repository is the source of truth.
- The filesystem defines the content structure.
- A locale is represented by a folder.
- A category is represented by a folder.
- A Markdown file represents a cheat sheet.
- Routes are automatically derived from the content structure.
- The project is static-first — no backend or database.

## Content Structure

```text
content/
├── en/
│   ├── databases/
│   │   ├── postgres.md
│   │   └── sql.md
│   ├── editors/
│   │   └── vscode.md
│   ├── frameworks/
│   │   └── flutter.md
│   ├── languages/
│   │   └── dart.md
│   └── tools/
│       ├── docker.md
│       └── git.md
└── pt-br/
    └── frameworks/
        └── flutter.md
```

Which produces the routes:

```text
/en/frameworks
/en/frameworks/flutter
/en/languages/dart
/pt-br/frameworks/flutter
```

Locale, category, and slug are derived from the file path — never stored in
frontmatter. See `.rules/architecture.md` for details.

Each category folder can optionally have a `_category.md` file with a
description shown on its listing page. See
[CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add a cheat sheet. By
participating, you're expected to follow our
[Code of Conduct](./CODE_OF_CONDUCT.md).

Don't see a cheat sheet you're looking for? [Suggest one](https://github.com/manuelzzz/the_cheat_sheet/issues/new?template=suggest-cheat-sheet.yml)
instead of writing it yourself.

## Tech Stack

- [Astro](https://astro.build) — static site generation and filesystem-based
  routing.
- TypeScript
- Markdown via Astro Content Collections
- [Tailwind CSS](https://tailwindcss.com)
- [Pagefind](https://pagefind.app) — static, build-time search index with a
  client-side UI; no backend or database.

## Development

Requires Node.js 22+.

```bash
npm install
npm run dev       # local dev server
npm run build     # production build
npm run preview   # preview the production build locally
npm run format    # format with Prettier
npm run lint      # lint with ESLint
npm run typecheck # type-check with astro check
```

Every push and Pull Request runs the same checks in CI
(`.github/workflows/ci.yml`): format check, lint, typecheck, and build.

Search (`/[locale]/search`) is powered by [Pagefind](https://pagefind.app),
which indexes the built site as a `postbuild` step after `npm run build`. It
only works against a production build — `npm run dev` won't have a search
index, since nothing has been built yet.

## Deployment

The site is deployed to **GitHub Pages**, live at
**https://manuelzzz.github.io/the_cheat_sheet/**. A GitHub Actions workflow
(`.github/workflows/deploy.yml`) builds the site with `astro build` and
publishes `dist/` on every push to `main` via `actions/deploy-pages`. There
is no server runtime — the deployed site is fully static.

## Project Rules

See [`.rules/`](./.rules) for the shared project conventions used by both
human contributors and AI coding agents.

## License

Licensed under the [MIT License](./LICENSE).
