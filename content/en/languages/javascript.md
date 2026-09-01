---
title: JavaScript
description: Practical reference for variables, functions, arrays/objects, and async patterns in JavaScript.
tags:
  - web
---

## Variables and Scoping

```js
var legacy = 'function-scoped, avoid'; // avoid: hoisted, function-scoped
let count = 0; // block-scoped, reassignable
const name = 'Ada'; // block-scoped, cannot be reassigned
```

- Prefer `const` by default, `let` when a value needs to change, and
  avoid `var`.
- `const` prevents reassignment, not mutation — `const arr = []` still
  allows `arr.push(1)`.

## Functions and Arrow Functions

```js
function add(a, b) {
  return a + b;
}

const add2 = (a, b) => a + b; // implicit return
const greet = (name) => {
  return `Hello, ${name}!`;
};
```

- Arrow functions don't bind their own `this` — they inherit it from the
  enclosing scope, which is why they're preferred for callbacks.

## Arrays and Objects

```js
const numbers = [1, 2, 3];
const user = { name: 'Ada', age: 36 };

numbers.push(4); // add to end
numbers.map((n) => n * 2); // [2, 4, 6, 8]
numbers.filter((n) => n > 1); // [2, 3]
Object.keys(user); // ['name', 'age']
Object.entries(user); // [['name', 'Ada'], ['age', 36]]
```

## Destructuring

```js
const { name, age } = user;
const [first, second] = numbers;

function greetUser({ name }) {
  return `Hi, ${name}`;
}

const { name: userName = 'Anonymous' } = {}; // default value
```

## Promises and Async/Await

```js
function fetchUser(id) {
  return fetch(`/api/users/${id}`).then((res) => res.json());
}

async function loadUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    return await res.json();
  } catch (error) {
    console.error('Failed to load user', error);
  }
}

// Run requests in parallel:
const [a, b] = await Promise.all([fetchUser(1), fetchUser(2)]);
```

## Modules (import/export)

```js
// math.js
export const PI = 3.14159;
export function square(x) {
  return x * x;
}
export default function add(a, b) {
  return a + b;
}

// app.js
import add, { PI, square } from './math.js';
```

## Common Array and String Methods

```js
[1, 2, 3].reduce((sum, n) => sum + n, 0); // 6
[1, 2, 3].find((n) => n > 1); // 2
[1, 2, 3].includes(2); // true
[1, [2, [3]]].flat(Infinity); // [1, 2, 3]

'Hello'.toUpperCase(); // 'HELLO'
'  hi  '.trim(); // 'hi'
'a,b,c'.split(','); // ['a', 'b', 'c']
`Hello, ${name}!`; // template literal
```

## References

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
