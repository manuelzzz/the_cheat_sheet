# The Cheat Sheet

An open-source collection of practical cheat sheets for developers.

Content is stored as Markdown files in this repository and automatically
rendered as static pages. Anyone can contribute by adding or improving a
Markdown file through a Pull Request.

> A folder defines structure. A Markdown file defines content. A Pull Request
> is a contribution.

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
│   ├── frameworks/
│   │   ├── flutter.md
│   │   └── react.md
│   └── languages/
│       └── dart.md
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

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add a cheat sheet. By
participating, you're expected to follow our
[Code of Conduct](./CODE_OF_CONDUCT.md).

## Tech Stack

- [Astro](https://astro.build) — static site generation and filesystem-based
  routing.
- TypeScript
- Markdown via Astro Content Collections
- [Tailwind CSS](https://tailwindcss.com)

## Development

Requires Node.js 22+.

```bash
npm install
npm run dev       # local dev server
npm run build     # production build
npm run format    # format with Prettier
npm run lint      # lint with ESLint
npm run typecheck # type-check with astro check
```

## Deployment

The site is deployed to **GitHub Pages**. A GitHub Actions workflow
(`.github/workflows/deploy.yml`) builds the site with `astro build` and
publishes `dist/` on every push to `main`. There is no server runtime — the
deployed site is fully static.

## Project Rules

See [`.rules/`](./.rules) for the shared project conventions used by both
human contributors and AI coding agents.
