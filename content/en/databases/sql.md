---
title: SQL
description: Core SQL syntax for querying and modifying relational data.
---

## Querying

```sql
SELECT name, email FROM users;
SELECT * FROM users WHERE age > 18;
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;
```

## Joins

```sql
SELECT orders.id, users.name
FROM orders
JOIN users ON users.id = orders.user_id;
```

- `JOIN` / `INNER JOIN` — only matching rows.
- `LEFT JOIN` — all rows from the left table, matched or not.

## Aggregation

```sql
SELECT status, COUNT(*) FROM orders GROUP BY status;
SELECT AVG(price) FROM products WHERE category = 'books';
```

## Modifying Data

```sql
INSERT INTO users (name, email) VALUES ('Ada', 'ada@example.com');
UPDATE users SET email = 'new@example.com' WHERE id = 1;
DELETE FROM users WHERE id = 1;
```
