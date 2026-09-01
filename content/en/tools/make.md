---
title: Make
description: Practical reference for Makefile basics, targets, variables, and phony targets.
tags:
  - build
  - cli
---

## Makefile Basics

A `Makefile` defines a set of **targets**, each with a **recipe** (shell
commands) to build it and optional **prerequisites** (other targets it
depends on):

```makefile
target: prerequisites
	command
```

- Recipe lines must be indented with a **tab**, not spaces.
- Run a specific target with `make <target>`; running plain `make` runs
  the first target in the file.

## Targets and Rules

```makefile
build: main.o utils.o
	gcc -o app main.o utils.o

main.o: main.c
	gcc -c main.c

utils.o: utils.c
	gcc -c utils.c
```

- `make build` only rebuilds `main.o`/`utils.o` if their source files
  changed — Make compares file modification times.
- `make -n <target>` — print the commands that would run, without
  running them (dry run).
- `make -B <target>` — force a rebuild, ignoring timestamps.

## Variables

```makefile
CC = gcc
CFLAGS = -Wall -O2

build: main.c
	$(CC) $(CFLAGS) -o app main.c
```

```bash
make CFLAGS=-g build   # override a variable from the command line
```

- `$(VAR)` or `${VAR}` — reference a variable.
- `VAR = value` — recursively expanded (evaluated each use).
- `VAR := value` — expanded immediately (evaluated once, at definition).

## Phony Targets

```makefile
.PHONY: clean test

clean:
	rm -rf build/

test:
	go test ./...
```

- `.PHONY` marks targets that don't produce a file of that name — without
  it, Make would skip the target if a file named `clean` or `test`
  happened to exist.

## Common Patterns

```makefile
.PHONY: install dev build

install:
	npm install

dev:
	npm run dev

build:
	npm run build

all: install build
```

```bash
make               # runs the first target (here, `install`)
make dev            # runs a specific target
make -j4 build         # run with up to 4 jobs in parallel
```

## References

- [GNU Make Manual](https://www.gnu.org/software/make/manual/make.html)
- [Makefile Tutorial](https://makefiletutorial.com/)
