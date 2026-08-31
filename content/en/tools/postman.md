---
title: Postman
description: Practical reference for collections, environments, variables, and test scripts in Postman.
tags:
  - api
  - testing
  - http
---

## Collections and Requests

- **Collection** — a saved group of requests, organized in folders,
  shareable and exportable as JSON.
- **Request** — method + URL + headers/body, saved inside a collection for
  reuse.
- `Cmd+S` / `Ctrl+S` — save the current request.
- `Cmd+Enter` / `Ctrl+Enter` — send the current request.
- **Runner** — runs every request in a collection in sequence, useful for
  smoke-testing an API end to end.
- Right-click a request → "Generate Code" — export a request as a `curl`
  command or a snippet in another language.

## Environments and Variables

- **Environment** — a named set of key/value variables (e.g. `baseUrl`,
  `token`) swappable via the environment dropdown, top-right.
- `{{variableName}}` — reference a variable inside a URL, header, or body.
- **Variable scopes** (narrowest wins): local → data → environment →
  collection → global.
- `pm.environment.set('token', value)` — set an environment variable from
  a script.
- `pm.environment.get('token')` — read an environment variable from a
  script.

## Common Features

- **Pre-request Script** tab — runs before the request is sent (e.g. to
  compute a signature or refresh a token).
- **Tests** tab — runs after the response arrives, for assertions.
- **Mock Servers** — simulate an API's responses before the real backend
  exists, from a collection's example responses.
- **Postman Console** (bottom-left icon) — inspect the raw request/
  response, including redirects and headers.

## Testing Scripts Basics

```js
// In a request's "Tests" tab:
pm.test('Status code is 200', () => {
  pm.response.to.have.status(200);
});

pm.test('Response has an id', () => {
  const body = pm.response.json();
  pm.expect(body.id).to.exist;
});

// Chain requests by passing data forward:
pm.environment.set('userId', pm.response.json().id);
```

- `pm.response.json()` — parse the response body as JSON.
- `pm.response.to.have.status(code)` — assert the status code.
- `pm.expect(value).to.equal(expected)` — Chai-style assertions.
- Tests in a collection run automatically in the **Runner**, making a
  collection double as an API test suite.

## References

- [Postman Learning Center](https://learning.postman.com/docs/introduction/overview/)
- [Writing Scripts](https://learning.postman.com/docs/tests-and-scripts/write-scripts/intro-to-scripts/)
- [Postman Sandbox API Reference](https://learning.postman.com/docs/tests-and-scripts/scripting-references/api-reference/)
