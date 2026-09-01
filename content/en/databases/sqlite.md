---
title: SQLite
description: Practical reference for data types, queries, tables, transactions, and CLI usage in SQLite.
tags:
  - sql
  - embedded
---

## Data Types

SQLite uses **type affinity** rather than strict fixed types — a column
still accepts most values, but prefers converting them to its affinity:

```sql
CREATE TABLE example (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price REAL,
  data BLOB,
  active NUMERIC
);
```

- `INTEGER`, `TEXT`, `REAL`, `BLOB`, `NUMERIC` — the five type affinities.
- There's no dedicated boolean type — `0`/`1` (as `INTEGER`) is the
  convention.
- `INTEGER PRIMARY KEY` is an alias for the internal `rowid`, making it a
  fast auto-incrementing key without needing `AUTOINCREMENT`.

## Basic Queries

```sql
SELECT * FROM users WHERE age > 18 ORDER BY name LIMIT 10;
SELECT name, COUNT(*) FROM orders GROUP BY name;
SELECT * FROM users WHERE name LIKE 'A%';
```

## Creating and Querying Tables

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES ('Ada', 'ada@example.com');
UPDATE users SET email = 'new@example.com' WHERE id = 1;
DELETE FROM users WHERE id = 1;

.tables                    -- list tables (in the sqlite3 CLI)
.schema users               -- show a table's schema (in the sqlite3 CLI)
```

## Transactions

```sql
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
-- or: ROLLBACK; to undo everything since BEGIN
```

- Every statement outside an explicit transaction runs in its own
  implicit transaction.
- Wrapping multiple writes in one transaction is both safer (atomic) and
  much faster (fewer disk syncs).

## Common CLI Commands

```bash
sqlite3 app.db                # open (or create) a database file
```

```sql
.help                     -- list CLI commands
.open app.db                -- open a database file
.mode column                  -- pretty-print query results as columns
.headers on                     -- show column headers
.import data.csv users            -- import a CSV file into a table
.backup backup.db                   -- back up the current database
.quit                                 -- exit the CLI
```

## References

- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [SQLite CLI Documentation](https://www.sqlite.org/cli.html)
- [Datatypes in SQLite](https://www.sqlite.org/datatype3.html)
