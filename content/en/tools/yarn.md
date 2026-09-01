---
title: Yarn
description: Practical reference for common commands, workspaces, and npm comparison notes for Yarn.
tags:
  - javascript
  - package-manager
---

## Common Commands

```bash
yarn install               # install dependencies from package.json
yarn add <package>           # add a dependency
yarn add -D <package>          # add a dev dependency
yarn remove <package>            # remove a dependency
yarn up <package>                  # upgrade a dependency
yarn run <script>                    # run a package.json script
yarn <script>                          # shorthand for `yarn run <script>`
yarn why <package>                       # explain why a package is installed
```

## Workspaces Basics

`package.json` at the repo root:

```json
{
  "private": true,
  "workspaces": ["packages/*"]
}
```

```bash
yarn workspaces list                          # list all workspaces
yarn workspace <name> add <package>             # add a dependency to one workspace
yarn workspace <name> run <script>                # run a script in one workspace
yarn workspaces foreach run build                   # run a script in every workspace
```

- Workspaces let a single install manage multiple packages in one repo,
  hoisting shared dependencies to the root `node_modules`.

## Comparison Notes with npm

| Task               | Yarn                | npm                |
| ------------------ | -------------------- | -------------------- |
| Install all deps    | `yarn install`         | `npm install`          |
| Add a dependency      | `yarn add <pkg>`         | `npm install <pkg>`      |
| Add a dev dependency    | `yarn add -D <pkg>`       | `npm install -D <pkg>`     |
| Remove a dependency       | `yarn remove <pkg>`         | `npm uninstall <pkg>`        |
| Run a script                | `yarn <script>`               | `npm run <script>`             |
| Lockfile                       | `yarn.lock`                      | `package-lock.json`               |

## Common Flags

```bash
yarn install --immutable          # fail if the lockfile would change (CI)
yarn add <package>@<version>        # install a specific version
yarn add <package> --peer             # add as a peer dependency
yarn install --check-cache              # verify the local cache is valid
```

## References

- [Yarn Documentation](https://yarnpkg.com/getting-started)
- [Yarn CLI Commands](https://yarnpkg.com/cli)
- [Yarn Workspaces](https://yarnpkg.com/features/workspaces)
