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
