---
title: Scala
description: Core Scala syntax for val/var, classes, case classes, pattern matching, Option, and collections.
tags:
  - jvm
  - functional
  - backend
---

## Variables and Values

> Targets Scala 3; the syntax shown also runs on Scala 2.13.

```scala
val name = "Ada"          // immutable value (cannot reassign)
var count = 0             // mutable variable
count += 1

val n: Int = 42
val f: Double = 3.14
val flag: Boolean = true

// Type is inferred unless annotated
val message: String = "Hello"

// String interpolation
val greeting = s"Hello, $name!"
val precise = f"score: $n%03d"
```

- `val` declares a non-reassignable binding; `var` a reassignable one. Neither makes a referenced object deeply immutable — a `val` may still point to a mutable object.
- Type inference is standard; annotations refine or document.

## Collections

```scala
val nums = List(1, 2, 3)          // immutable list
val vector = Vector(1, 2, 3)      // efficient immutable sequence
val set = Set(1, 2, 3)            // immutable set
val map = Map("a" -> 1, "b" -> 2) // immutable map

val mutable = scala.collection.mutable.ArrayBuffer(1, 2)
mutable += 3

nums.map(_ * 2)         // List(2, 4, 6)
nums.filter(_ > 1)      // List(2, 3)
nums.sum                // 6
nums.head               // 1

for (x <- nums) {
  println(x)
}
```

- Immutable collections are the default; use `mutable` explicitly when needed.
- `_` is a placeholder for a lambda argument.

## Control Flow

```scala
val n = 10

if (n > 0) "positive" else "non-positive"

// match (no fallthrough)
val kind = n match {
  case 1          => "one"
  case 2 | 3      => "two or three"
  case x if x > 3 => "large"
  case _          => "other"
}

for (i <- 1 to 5) {
  // 1..5 inclusive
}

var i = 0
while (i < 5) {
  i += 1
}
```

- `if` and `match` are expressions returning a value.
- `_` is the catch-all/wildcard pattern.

## Functions

```scala
def add(a: Int, b: Int): Int = a + b

// Multi-statement body
def describe(n: Int): String = {
  val doubled = n * 2
  s"$n doubled is $doubled"
}

// Default and named args
def greet(name: String, punct: String = "!") = s"Hello, $name$punct"
greet("Ada")
greet(name = "Ada", punct = "?")

// Anonymous functions / lambdas
val square = (x: Int) => x * x
val tripled = List(1, 2, 3).map(_ * 3)   // List(3, 6, 9)
```

- `def` declares a method; the last expression is the result.
- Methods can have default parameters; lambdas use the `=>` syntax.

## Classes and Objects

```scala
class User(val name: String, var age: Int) {
  def greet: String = s"Hi, I'm $name"
}

val ada = new User("Ada", 36)
println(ada.name)        // Ada

// Companion object (static-like members)
object User {
  def anonymous: User = new User("Guest", 0)
}

// Singleton
object Config {
  val timeout: Int = 30
}
```

- `class` defines a type; `object` defines a singleton.
- A companion `object` shares the name with its class and holds static-like members.

## Case Classes and Pattern Matching

```scala
case class Point(x: Int, y: Int)

// Case classes auto-provide equality, toString, copy, and pattern matching
val p = Point(1, 2)
val p2 = p.copy(y = 9)

def render(point: Point): String = point match {
  case Point(0, 0) => "origin"
  case Point(x, y) if x > 0 => "right half"
  case Point(x, y) => s"point ($x, $y)"
}
```

- `case class` is an immutable, decomposable data type.
- Pattern matching on case classes destructures fields and supports guards.

## Option

```scala
val maybe: Option[Int] = Some(42)
val nothing: Option[Int] = None

maybe.map(_ + 1)            // Some(43)
nothing.map(_ + 1)          // None
maybe.getOrElse(0)          // 42
nothing.getOrElse(0)        // 0

maybe match {
  case Some(v) => println(v)
  case None    => println("no value")
}
```

- `Option` models an optional value: `Some` or `None`.
- Prefer `map`, `flatMap`, and `getOrElse` over `.get` (which throws on `None`).

## Error Handling

```scala
// Either for recoverable failures
def parsePort(value: String): Either[String, Int] =
  value.toIntOption match {
    case Some(port) if port > 0 && port < 65536 => Right(port)
    case _ => Left("invalid port")
  }

parsePort("8080") match {
  case Right(port) => println(s"using $port")
  case Left(err)   => println(s"error: $err")
}

// Exceptions (use selectively)
def risky(): Int = throw new IllegalArgumentException("boom")
```

- `Either[L, R]` conveys failure (`Left`) or success (`Right`).
- Prefer `Option`/`Either` for anticipated failures; reserve exceptions for exceptional cases.

## Traits

```scala
trait Greeter {
  def greet: String
}

class Person(val name: String) extends Greeter {
  def greet: String = s"Hi, I'm $name"
}

val p = new Person("Ada")
println(p.greet)     // "Hi, I'm Ada"
```

- A trait is a reusable interface plus optional default implementation.
- Classes extend at most one superclass but can mix in multiple traits.

## Idiomatic Modern Patterns

```scala
// Collections pipeline
val result = List(1, 2, 3, 4)
  .filter(_ % 2 == 0)
  .map(_ * 2)         // List(4, 8)

// for-comprehensions desugar to map/flatMap/filter
val pairs = for {
  x <- List(1, 2)
  y <- List(3, 4)
} yield (x, y)        // List((1,3),(1,4),(2,3),(2,4))

// Option with for-comprehension
val all = for {
  a <- Some(2)
  b <- Some(3)
} yield a * b         // Some(6)
```

- Pipelines on collections are idiomatic.
- `for ... yield` composes `map`/`flatMap`; guards (`if`) and pattern generators translate to `withFilter`/`filter` steps.

## References

- [Scala Documentation](https://docs.scala-lang.org/)
- [Scala 3 Book](https://docs.scala-lang.org/scala3/book/)
- [Scaladoc API](https://scala-lang.org/api/)