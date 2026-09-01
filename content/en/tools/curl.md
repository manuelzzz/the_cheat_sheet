---
title: curl
description: Practical reference for common flags, HTTP methods, headers, and authentication with curl.
tags:
  - http
  - cli
  - api
---

## Common Flags

```bash
curl https://example.com                # GET request, print response body
curl -i https://example.com               # include response headers
curl -I https://example.com                 # HEAD request (headers only)
curl -v https://example.com                   # verbose: show the full exchange
curl -s https://example.com                     # silent: hide progress meter
curl -o file.json https://example.com             # write response to a file
curl -L https://example.com                         # follow redirects
```

## HTTP Methods

```bash
curl -X GET https://api.example.com/users
curl -X POST https://api.example.com/users -d '{"name":"Ada"}'
curl -X PUT https://api.example.com/users/1 -d '{"name":"Ada Lovelace"}'
curl -X PATCH https://api.example.com/users/1 -d '{"name":"Ada L."}'
curl -X DELETE https://api.example.com/users/1
```

- `-d` implies `POST` if no `-X` is given.
- `-d @file.json` — send the contents of a file as the request body.

## Headers and Authentication

```bash
curl -H "Content-Type: application/json" -d '{"name":"Ada"}' \
  https://api.example.com/users

curl -H "Authorization: Bearer <token>" https://api.example.com/me

curl -u username:password https://api.example.com/private   # basic auth
```

- `-H "<Header>: <value>"` — add a request header; repeat for multiple
  headers.
- `-u user:pass` — HTTP Basic authentication.

## Common Usage Patterns

```bash
# Send JSON and pretty-print a JSON response (requires jq)
curl -s https://api.example.com/users | jq .

# Save cookies and reuse them across requests
curl -c cookies.txt https://example.com/login -d 'user=ada&pass=secret'
curl -b cookies.txt https://example.com/dashboard

# Time a request's phases
curl -w "@curl-format.txt" -o /dev/null -s https://example.com

# Test a specific IP/port without changing DNS
curl --resolve example.com:443:127.0.0.1 https://example.com

# Retry on failure
curl --retry 3 --retry-delay 2 https://example.com
```

## References

- [curl Documentation](https://curl.se/docs/)
- [curl Manual](https://curl.se/docs/manpage.html)
- [Everything curl](https://everything.curl.dev/)
