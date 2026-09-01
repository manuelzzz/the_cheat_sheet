---
title: TypeScript
description: Practical reference for types, interfaces, generics, and type narrowing in TypeScript.
tags:
  - types
  - javascript
---

## Basic Types and Type Annotations

```ts
let name: string = 'Ada';
let age: number = 36;
let active: boolean = true;
let tags: string[] = ['admin', 'editor'];
let pair: [string, number] = ['x', 1]; // tuple

function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

## Interfaces vs Type Aliases

```ts
interface User {
  id: string;
  name: string;
  email?: string; // optional property
}

type Point = { x: number; y: number };
```

- **Interfaces** can be extended (`interface Admin extends User {}`) and
  merged by re-declaring them; conventionally used for object shapes.
- **Type aliases** (`type`) can name unions, primitives, tuples, and
  anything else — not just object shapes.
- Prefer `interface` for public object APIs, `type` for everything else.

## Generics

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

interface Box<T> {
  value: T;
}

const box: Box<string> = { value: 'hello' };
```

## Union and Intersection Types

```ts
type Id = string | number; // union: either type
type Status = 'idle' | 'loading' | 'error'; // string literal union

type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged; // intersection: both types combined
```

## Enums

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const move = Direction.Up;

// Alternative: a union of string literals avoids some enum footguns.
type DirectionLiteral = 'up' | 'down' | 'left' | 'right';
```

## Utility Types

```ts
Partial<User>; // all properties optional
Required<User>; // all properties required
Pick<User, 'id' | 'name'>; // subset of properties
Omit<User, 'email'>; // all properties except these
Readonly<User>; // all properties readonly
Record<string, number>; // object type with string keys, number values
```

## Type Narrowing

```ts
function printId(id: string | number) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase()); // narrowed to string
  } else {
    console.log(id.toFixed(2)); // narrowed to number
  }
}

function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value;
}
```

- `typeof` — narrows primitives (`string`, `number`, `boolean`, etc).
- `in` — narrows based on whether a property exists on the value.
- `is` — a custom type guard, letting a function assert a narrower type.

## References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
