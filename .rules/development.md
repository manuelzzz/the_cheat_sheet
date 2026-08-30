# Development Guidelines

## Keep It Simple

Do not introduce abstractions without a concrete need.

Avoid unnecessary:

- Services
- Repositories
- APIs
- State management
- Dependencies

## Static First

Prefer static rendering.

Client-side JavaScript should only be introduced when interaction requires it.

## Content Driven

The application should derive information from the content structure whenever possible.

Do not manually register:

- Categories
- Cheat sheets
- Routes

## Components

Create reusable components when:

- They are used in multiple places.
- They improve readability.
- They represent a meaningful UI concept.

Avoid creating components for trivial markup.

## TypeScript

- Avoid `any`.
- Prefer explicit types.
- Keep types close to where they are used.
- Avoid unnecessary abstractions.

## Dependencies

Before adding a dependency:

1. Check whether Astro already provides the functionality.
2. Prefer native browser or platform capabilities.
3. Add a dependency only when it provides clear value.

## Validation

Before considering work complete:

- Run formatting.
- Run linting.
- Run type checking.
- Run the production build.
