---
title: PostgreSQL
description: Common psql commands and PostgreSQL-specific SQL features.
---

## psql

```bash
psql -U <user> -d <database>   # connect to a database
\l                                # list databases
\dt                                 # list tables
\d <table>                           # describe a table
\q                                      # quit
```

## Useful Types

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## JSONB

```sql
SELECT payload->>'name' FROM events;
SELECT * FROM events WHERE payload @> '{"type": "signup"}';
```

## Indexes

```sql
CREATE INDEX idx_events_created_at ON events (created_at);
CREATE INDEX idx_events_payload ON events USING GIN (payload);
```

## References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [psql Reference](https://www.postgresql.org/docs/current/app-psql.html)
