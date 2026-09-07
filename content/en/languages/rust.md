---
title: Rust
description: Core Rust syntax, ownership, structs, enums, error handling, and concurrency.
tags:
  - systems
  - memory-safety
  - performance
---

## Variables and Types

```rust
let x = 5;              // immutable by default
let mut y = 10;         // mutable binding
y += 1;

// Scalar types
let n: i32 = 42;        // signed integer
let f: f64 = 3.14;      // floating-point
let c: char = 'A';      // Unicode scalar
let b: bool = true;

// String vs &str
let owned: String = String::from("hello");
let slice: &str = "hello";  // string slice — borrows data
```

- `String` is heap-allocated and owned; `&str` is an immutable reference into existing data.

## Control Flow

```rust
let n = 10;

if n > 0 {
    // positive
} else {
    // non-positive
}

// if is an expression
let label = if n > 0 { "positive" } else { "non-positive" };

// loop, while, for
let mut i = 0;
loop {
    if i >= 5 { break; }
    i += 1;
}

let mut remaining = 10;
while remaining > 0 {
    remaining -= 1;
}

for item in [1, 2, 3] {
    // iterate values
}

// match expression
match n {
    1 => println!("one"),
    2 | 3 => println!("two or three"),
    4..=10 => println!("four to ten"),
    _ => println!("other"),
}
```

## Functions

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b   // no semicolon = return value (expression)
}

// Unit return type (implicit when no return)
fn log(message: &str) {
    println!("{message}");
}
```

- The last expression without a semicolon is the return value.

## Ownership and Borrowing

```rust
let s1 = String::from("hello");
let s2 = s1;            // ownership moves to s2
// println!("{s1}");     // compile error — s1 is no longer valid

// Immutable borrow — multiple allowed
let r = &s2;
println!("{r}");

// Mutable borrow — only one at a time
let mut s3 = String::from("world");
let r = &mut s3;
r.push_str("!");
```

- A value has exactly one owner at a time.
- You can have many immutable references (`&T`) or one mutable reference (`&mut T`), but not both.

## Structs and Enums

```rust
struct Point {
    x: f64,
    y: f64,
}

impl Point {
    fn distance(&self) -> f64 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}

// Tuple struct
struct Color(u8, u8, u8);
```

```rust
// Enums with data
enum Direction {
    North,
    South,
    East,
    West,
}

let maybe: Option<i32> = Some(42);
match maybe {
    Some(v) => println!("{v}"),
    None => println!("nothing"),
}
```

## Traits and Generics

```rust
trait Summary {
    fn summarize(&self) -> String;
}

struct Article {
    title: String,
    content: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        let preview: String = self.content.chars().take(20).collect();
        format!("{preview}...")
    }
}

// Generic function
fn first<T>(items: &[T]) -> Option<&T> {
    items.first()
}
```

## Collections

```rust
use std::collections::HashMap;

let mut names = vec!["Ada", "Grace", "Linus"];
names.push("Margaret");

let mut scores: HashMap<&str, i32> = HashMap::new();
scores.insert("Ada", 95);
scores.insert("Grace", 85);

for name in &names {
    println!("{name}");
}
```

## Error Handling

```rust
use std::fs;
use std::io;

// Result<T, E> — recoverable errors
fn read_config(path: &str) -> Result<String, io::Error> {
    fs::read_to_string(path)
}

match read_config("config.toml") {
    Ok(content) => println!("{content}"),
    Err(e) => eprintln!("Failed to read config: {e}"),
}

// ? operator — propagates errors up the call stack
fn parse_config(path: &str) -> Result<i32, io::Error> {
    let content = fs::read_to_string(path)?;   // returns Err on failure
    content.trim().parse().map_err(|_| io::Error::new(io::ErrorKind::InvalidData, "bad number"))
}
```

- Use `?` to propagate errors concisely.
- Avoid `unwrap()` for recoverable errors — it panics on `Err`.

## Lifetimes

```rust
// Lifetime annotations ensure references remain valid
fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() >= b.len() { a } else { b }
}
```

- Lifetimes are usually inferred; explicit annotations are needed when the compiler cannot deduce them.

## Common Modern Patterns

```rust
// if let — match on one pattern, ignore the rest
if let Some(value) = maybe {
    println!("Got: {value}");
}

// derive macro — generate common trait implementations
#[derive(Debug, Clone, PartialEq)]
struct User {
    name: String,
}

// Iterator methods
let sum: i32 = (1..=100).sum();

// Chained iterator methods
let even_squares: Vec<i32> = (1..=10)
    .filter(|x| x % 2 == 0)
    .map(|x| x * x)
    .collect();
```

## References

- [The Rust Programming Language](https://doc.rust-lang.org/book/)
- [Rust Reference](https://doc.rust-lang.org/reference/)
- [Rust Standard Library Documentation](https://doc.rust-lang.org/std/)
