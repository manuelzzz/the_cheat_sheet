---
title: Dart
description: Core Dart syntax for variables, functions, and null safety.
---

## Variables

```dart
final name = 'Ada';   // single assignment, type inferred
const pi = 3.14159;   // compile-time constant
String? nickname;     // nullable type
```

## Functions

```dart
int add(int a, int b) => a + b;

void greet({required String name}) {
  print('Hello, $name!');
}
```

## Null Safety

- `?` marks a type as nullable.
- `!` asserts a value is non-null.
- `??` provides a fallback for a null value.
