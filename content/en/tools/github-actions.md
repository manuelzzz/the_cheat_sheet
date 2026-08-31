---
title: GitHub Actions
description: Practical reference for workflow syntax, triggers, jobs, common actions, and secrets.
tags:
  - ci-cd
  - github
  - automation
---

## Workflow Syntax

Workflows live at `.github/workflows/*.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Hello, world!"
```

- `name` — the workflow's display name in the Actions tab.
- `on` — the events that trigger the workflow.
- `jobs` — one or more named jobs, each running on a `runs-on` machine.
- `steps` — a job's ordered list of `uses` (an action) or `run` (a shell
  command) steps.

## Common Triggers

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * *' # daily at midnight UTC
  workflow_dispatch: # manual trigger, with optional inputs
  release:
    types: [published]
```

## Jobs and Steps

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm test

  deploy:
    needs: test # runs only after `test` succeeds
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying..."
```

- `needs` — makes a job wait for another job to finish successfully.
- `strategy.matrix` — runs a job multiple times with different inputs
  (e.g. Node versions, operating systems).
- `if` — conditionally runs a job or step, e.g. `if: github.ref == 'refs/heads/main'`.

## Common Actions

```yaml
- uses: actions/checkout@v4 # check out the repository
- uses: actions/setup-node@v4 # install Node.js
  with:
    node-version: 22
    cache: npm
- uses: actions/cache@v4 # cache dependencies/build output
  with:
    path: ~/.npm
    key: npm-${{ hashFiles('package-lock.json') }}
- uses: actions/upload-artifact@v4 # upload a build artifact
  with:
    name: build
    path: dist
```

## Secrets and Variables

```yaml
steps:
  - run: deploy.sh
    env:
      API_TOKEN: ${{ secrets.API_TOKEN }}
      ENVIRONMENT: ${{ vars.ENVIRONMENT }}
```

- **Secrets** — encrypted values set in repo/org settings, referenced via
  `${{ secrets.NAME }}`; never printed in logs.
- **Variables** — non-sensitive config set the same way, referenced via
  `${{ vars.NAME }}`.
- `${{ github.* }}` — built-in context (`github.ref`, `github.sha`,
  `github.actor`, etc), useful in `if` conditions and step inputs.

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Contexts Reference](https://docs.github.com/en/actions/learn-github-actions/contexts)
