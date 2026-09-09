---
title: Jest
description: Practical reference for test structure, assertions, mocking, and running tests with Jest.
tags:
  - javascript
  - unit-testing
---

## Test Structure and Naming Conventions

```js
describe('Calculator', () => {
  test('adds two numbers', () => {
    expect(1 + 2).toBe(3);
  });

  // `it` is an alias for `test`
  it('subtracts two numbers', () => {
    expect(5 - 2).toBe(3);
  });

  beforeEach(() => {
    // runs before every test in this describe block
  });

  afterEach(() => {
    // runs after every test in this describe block
  });
});
```

- Test files are named `*.test.js` or live under a `__tests__/` folder.
- `describe` groups related tests; `test`/`it` defines an individual case.

## Common Assertions and Matchers

```js
expect(2 + 2).toBe(4); // strict equality (===)
expect({ name: 'Ada' }).toEqual({ name: 'Ada' }); // deep equality
expect([1, 2, 3]).toContain(2);
expect('hello world').toMatch(/world/);
expect(null).toBeNull();
expect(undefined).toBeUndefined();
expect(true).toBeTruthy();
expect(0).toBeFalsy();
expect(() => {
  throw new Error('fail');
}).toThrow('fail');

// Async assertions
await expect(fetchUser(1)).resolves.toEqual({ id: 1 });
await expect(fetchUser(-1)).rejects.toThrow();
```

## Mocking Basics

```js
const mockFn = jest.fn();
mockFn('a');
expect(mockFn).toHaveBeenCalledWith('a');
expect(mockFn).toHaveBeenCalledTimes(1);

// Mock a return value
const getUser = jest.fn().mockReturnValue({ id: 1, name: 'Ada' });

// Mock an entire module
jest.mock('./api');
import { fetchUser } from './api';
fetchUser.mockResolvedValue({ id: 1, name: 'Ada' });

// Spy on an existing method, keeping its real implementation optional
const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
```

## Running and Filtering Tests from the CLI

```bash
npx jest                      # run every test file
npx jest user.test.js           # run a single file
npx jest -t "adds two numbers"    # run tests matching a name pattern
npx jest --watch                    # re-run on file changes
npx jest --coverage                   # generate a coverage report
```

## References

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Expect API Reference](https://jestjs.io/docs/expect)
- [Mock Functions](https://jestjs.io/docs/mock-functions)
