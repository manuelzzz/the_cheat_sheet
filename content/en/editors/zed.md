---
title: Zed
description: Practical reference for navigation, editing, collaboration, and configuration in Zed.
tags:
  - editor
  - collaboration
---

## Navigation and Editing Commands

- `Cmd+P` / `Ctrl+P` — quick open a file.
- `Cmd+Shift+P` / `Ctrl+Shift+P` — command palette.
- `Cmd+Shift+O` / `Ctrl+Shift+O` — go to symbol in file.
- `Cmd+Shift+E` / `Ctrl+Shift+E` — toggle project panel.
- `Ctrl+\`` — toggle terminal panel.
- `Cmd+Click` / `Ctrl+Click` on a symbol — go to definition.

## Common Shortcuts

- `Cmd+D` / `Ctrl+D` — select next occurrence of the current selection.
- `Cmd+Shift+L` / `Ctrl+Shift+L` — select all occurrences.
- `Alt+Click` — add a cursor.
- `Cmd+/` / `Ctrl+/` — toggle line comment.
- `Cmd+Shift+K` / `Ctrl+Shift+K` — delete line.
- `Alt+Up` / `Alt+Down` — move line up/down.
- `Cmd+F` / `Ctrl+F` — find in file.
- `Cmd+Shift+F` / `Ctrl+Shift+F` — find in project.

## Collaboration Features

- `Cmd+Shift+P` → "collab: share project" — share the current project with
  others for real-time collaborative editing.
- Shared projects show collaborators' cursors and selections live, similar
  to a shared document.
- Built-in voice chat is available while collaborating on a shared
  project, without leaving the editor.
- `Cmd+Shift+P` → "chat panel: toggle focus" — open the chat panel for a
  shared channel.

## Configuration Basics

- `Cmd+,` / `Ctrl+,` — open user settings (`settings.json`).
- `.zed/settings.json` at a project's root — project-specific settings,
  overriding user settings for that project.
- `.zed/tasks.json` at a project's root — define reusable project tasks
  (e.g. run tests, start a dev server) runnable from the command palette.
- `Cmd+Shift+P` → "zed: open keymap" — customize keybindings via
  `keymap.json`.

## References

- [Zed Documentation](https://zed.dev/docs)
- [Zed Configuring Settings](https://zed.dev/docs/configuring-zed)
- [Zed Tasks](https://zed.dev/docs/tasks)
