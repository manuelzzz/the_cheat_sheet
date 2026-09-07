---
title: Swift
description: Core Swift syntax for optionals, collections, protocols, structs/classes, and concurrency.
tags:
  - apple
  - ios
  - mobile
---

## Variables and Types

```swift
let name = "Ada"        // immutable binding (constant)
var count = 0           // mutable variable
count += 1

// Basic types
let n: Int = 42
let f: Double = 3.14
let flag: Bool = true
let ch: Character = "A"
let message: String = "Hello"

// Type inference
let inferred = "Hello"   // String

// String interpolation
let greeting = "Hello, \(name)!"
```

- `let` declares a constant; `var` a variable.
- Types are inferred, but you may annotate explicitly with `: Type`.

## Optionals

```swift
var nickname: String? = nil   // optional (may be nil)

// Optional binding
if let value = nickname {
    print(value)   // value is non-optional here
} else {
    print("no nickname")
}

// guard — early exit with a local non-optional binding
func describe(_ nickname: String?) {
    guard let shown = nickname else { return }
    print("nickname: \(shown)")
}

// nil-coalescing
let display = nickname ?? "Anonymous"

// Force unwrap (only when you know it is non-nil)
let sure = nickname!
```

- `?` marks a type as optional.
- `if let` binds the unwrapped value only when it is non-nil.
- `guard let` exits the current scope early when the value is nil.
- `??` provides a default when the optional is nil.
- Avoid `!` unless you have verified the value is non-nil.

## Control Flow

```swift
let n = 10

if n > 0 {
    // positive
} else {
    // non-positive
}

switch n {
case 1:
    print("one")
case 2, 3:
    print("two or three")
case 4...10:
    print("four to ten")
default:
    print("other")
}

for i in 1...5 {
    // 1, 2, 3, 4, 5
}

var i = 0
while i < 5 {
    i += 1
}

for item in ["a", "b", "c"] {
    // iterate values
}
```

- `switch` cases do not fall through; each case must have a body.
- `...` includes the upper bound; `..<` excludes it.

## Functions

```swift
func add(_ a: Int, to b: Int) -> Int {
    return a + b
}

print(add(2, to: 3))   // 5

// External and internal parameter names
func greet(person name: String) -> String {
    "Hello, \(name)!"
}

print(greet(person: "Ada"))

// Default values
func multiply(_ a: Int, by scale: Int = 1) -> Int {
    a * scale
}

// Closures
let square = { (x: Int) -> Int in x * x }
print(square(4))   // 16

let doubled = [1, 2, 3].map { $0 * 2 }   // [2, 4, 6]
```

- `_` omits the external label; a label before the type sets the external name.
- Single-expression functions can omit `return`.
- Closures are first-class; `$0`, `$1` are shorthand arguments.

## Structs and Classes

```swift
struct Point {
    var x: Double
    var y: Double
}

let origin = Point(x: 0, y: 0)

class User {
    var name: String
    init(name: String) {
        self.name = name
    }
    func greet() -> String {
        "Hi, I'm \(name)"
    }
}
```

- **Structs** are value types (copied on assignment); **classes** are reference types (shared).
- `init` is the initializer; classes require it before use.

## Protocols

```swift
protocol Greetable {
    var name: String { get }
    func greet() -> String
}

struct User: Greetable {
    var name: String
    func greet() -> String {
        "Hello, \(name)!"
    }
}

let u = User(name: "Ada")
print(u.greet())   // "Hello, Ada!"
```

- A protocol defines an interface; any type conforming to it must implement its requirements.
- Structs, classes, and enums can all conform to protocols.

## Extensions

```swift
extension Int {
    var doubled: Int { self * 2 }
    func isEven() -> Bool { self % 2 == 0 }
}

print(4.doubled)   // 8
print(4.isEven())  // true
```

- Extensions add methods, computed properties, and conformances to existing types.

## Enums

```swift
enum Direction {
    case north, south, east, west
}

enum PaymentStatus {
    case pending
    case paid(amount: Double)    // associated value
    case failed(reason: String)
}

let status = PaymentStatus.paid(amount: 42.0)

switch status {
case .pending:
    print("pending")
case .paid(let amount):
    print("paid \(amount)")
case .failed(let reason):
    print("failed: \(reason)")
}
```

- Enums can carry associated values and support exhaustive `switch`.

## Error Handling

```swift
enum FileError: Error {
    case notFound
    case unreadable
}

func loadFile(_ path: String) throws -> String {
    throw FileError.notFound
}

do {
    let content = try loadFile("/tmp/a")
    print(content)
} catch FileError.notFound {
    print("not found")
} catch {
    print("other error")
}

// try? -> optional; try! -> assumes success
if let data = try? loadFile("/tmp/a") {
    // data is String? (nil on failure)
}
```

- Functions that can fail are marked `throws` and called with `try`.
- `do`/`catch` handles errors; `try?` maps failure to `nil`.
- Define custom errors via an enum conforming to `Error`.

## Concurrency (async/await)

```swift
func fetchUser(id: Int) async -> String {
    // hypothetical async work
    return "user-\(id)"
}

func load() async {
    let a = await fetchUser(id: 1)
    let b = await fetchUser(id: 2)
    print("\(a) \(b)")

    // Run in parallel
    async let c = fetchUser(id: 3)
    async let d = fetchUser(id: 4)
    print("\(await c) \(await d)")
}
```

- Mark asynchronous functions `async` and await them with `await`.
- `async let` launches concurrent work; you `await` both results afterward.
- Asynchronous functions run on a Swift concurrency runtime, not a fixed thread.

## Common Modern Patterns

```swift
// Result type
enum ComputeError: Error {
    case negative
}

func compute(_ x: Int) -> Result<Int, ComputeError> {
    guard x >= 0 else { return .failure(.negative) }
    return .success(x * 2)
}

let r = compute(4)
switch r {
case .success(let value):
    print(value)
case .failure(let error):
    print(error)
}

// Property wrappers and optionals
let maybe: Int? = 5
let display = maybe.map { "value: \($0)" } ?? "none"

// Filter/map/compact
let values = [1, 2, 3, 4]
let evenSquares = values.filter { $0 % 2 == 0 }.map { $0 * $0 }   // [4, 16]
let nonNil = [1, nil, 3].compactMap { $0 }                        // [1, 3]

// A throwing test with non-optional numbers
let parsed = Int("42")
print(parsed ?? -1)   // 42
```

- `Result<Value, Error>` models success or failure without throwing.
- `map` on an optional transforms the value; `??` provides a fallback.
- `compactMap` removes `nil` values from a sequence.

## References

- [The Swift Programming Language](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/)
- [Swift API Design Guidelines](https://www.swift.org/documentation/api-design-guidelines/)
- [Swift Standard Library](https://developer.apple.com/documentation/swift/swift-standard-library)