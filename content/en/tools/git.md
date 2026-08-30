---
title: Git
description: Common Git commands for everyday version control.
---

## Basics

```bash
git init                 # create a new repository
git clone <url>           # copy a remote repository
git status                 # show changed files
git add <file>              # stage a file
git commit -m "message"      # commit staged changes
```

## Branches

```bash
git branch                     # list branches
git branch <name>               # create a branch
git checkout <name>              # switch branches
git checkout -b <name>            # create and switch
git merge <name>                   # merge a branch into current
```

## Remotes

```bash
git remote -v                # list remotes
git push origin <branch>       # push a branch
git pull origin <branch>         # fetch and merge
git fetch                          # fetch without merging
```

## Undoing Changes

```bash
git restore <file>              # discard unstaged changes
git reset --soft HEAD~1          # undo last commit, keep changes staged
git revert <commit>                # create a new commit that undoes one
```

## References

- [Git Documentation](https://git-scm.com/doc)
- [Git Reference](https://git-scm.com/docs)
