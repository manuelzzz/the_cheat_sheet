---
title: GitHub CLI
description: Practical reference for authenticating and managing repositories, issues, and PRs with gh.
tags:
  - git
  - github
  - cli
---

## Authentication

```bash
gh auth login          # authenticate interactively
gh auth status          # show current authentication state
gh auth logout            # log out of an account
gh auth token               # print the active auth token
gh auth refresh                # refresh auth to add scopes
```

## Repository Commands

```bash
gh repo clone owner/repo   # clone a repository
gh repo create my-app        # create a new repository
gh repo view                   # view the current repo in the terminal
gh repo view --web               # open the current repo in the browser
gh repo fork owner/repo             # fork a repository
```

## Issue and PR Commands

```bash
gh issue list                    # list issues in the current repo
gh issue create                    # create a new issue interactively
gh issue view 42                     # view issue #42
gh issue close 42                      # close issue #42

gh pr list                           # list pull requests
gh pr create                           # create a PR interactively
gh pr create --fill                      # create a PR from the last commit
gh pr view 10                              # view PR #10
gh pr checkout 10                            # check out PR #10 locally
gh pr merge 10                                 # merge PR #10
gh pr status                                     # PRs relevant to you
```

## Common Workflows

```bash
gh pr create --base main --head my-branch --title "..." --body "..."
gh pr review 10 --approve
gh pr review 10 --request-changes --body "..."
gh run list                # list recent GitHub Actions runs
gh run watch                 # watch the current run's progress
gh workflow run deploy.yml     # manually trigger a workflow
```

## Aliases Basics

```bash
gh alias list                              # list configured aliases
gh alias set pv 'pr view --web'              # add an alias
gh alias set co 'pr checkout'                  # e.g. `gh co 10`
gh alias delete pv                               # remove an alias
```

## References

- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [gh Manual](https://cli.github.com/manual/gh)
