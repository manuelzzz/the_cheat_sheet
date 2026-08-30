# Project Rules

This directory contains the shared development rules for The Cheat Sheet.

These rules are tool-agnostic and serve as the source of truth for AI agents and contributors.

## Structure

- `project.md` — Project purpose, principles, and scope.
- `architecture.md` — Technical architecture and structural decisions.
- `development.md` — Development conventions and implementation guidelines.

## Usage

AI agent entry points such as `AGENTS.md` and `CLAUDE.md` reference this directory instead of duplicating its contents.

When modifying project conventions, update the appropriate file in `.rules/`.
