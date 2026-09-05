# Architecture

## Philosophy

The Cheat Sheet follows a static-first and content-driven architecture.

The repository is the source of truth.

```text
Markdown
   ↓
Astro
   ↓
Static Pages
   ↓
Deployment
```

## Content Structure

The filesystem defines the content hierarchy.

```text
content/
└── [locale]/
    └── [category]/
        └── [cheat-sheet].md
```

### Example

```text
content/
├── en/
│   └── frameworks/
│       └── flutter.md
│
└── pt-br/
    └── frameworks/
        └── flutter.md
```

## Routes

Routes are derived from the content structure.

```text
/[locale]
/[locale]/[category]
/[locale]/[category]/[slug]
```

Example:

```text
content/en/frameworks/flutter.md

↓

/en/frameworks/flutter
```

## Metadata

Filesystem-derived metadata should not be duplicated in frontmatter.

Do not store:

- Locale
- Category
- Slug

These values are derived from the file path.

Frontmatter should only contain metadata that cannot be inferred from the filesystem.

## References

Every cheat sheet ends with a `## References` section linking to
authoritative sources (official documentation first, reputable secondary
sources otherwise).

```markdown
## References

- [Official Documentation](https://example.com)
```

This is plain Markdown content, not frontmatter — it requires no schema
changes and is what a future content-validation check (e.g. verifying the
section exists, links resolve) would target.

The heading itself stays in English (`## References`) across all locales so
tooling can match it literally; only the linked source titles are
translated.

## Tags

Frontmatter may optionally include `tags`, a flat list of topics a cheat
sheet relates to beyond its category:

```markdown
---
title: Flutter
description: Build applications for multiple platforms.
tags:
  - mobile
  - dart
  - cross-platform
---
```

Tags are freeform (no fixed vocabulary) and not currently used for
filtering — they lay the groundwork for future tag-based discovery. A
cheat sheet without `tags` is just as valid as one with them.

## Featured

Frontmatter may optionally include `featured: true` to surface a cheat
sheet in the "Featured" section on its locale's home page:

```markdown
---
title: Git
description: Common Git commands for everyday version control.
featured: true
---
```

Keep the featured set small (a handful per locale) — it's meant to help
new visitors find a good starting point, not become a second full index.
