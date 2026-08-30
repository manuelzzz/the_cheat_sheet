---
title: Flutter
description: Quick reference for Flutter widgets, layout, and state basics.
---

## Widgets

Everything in Flutter is a widget. Widgets are either:

- **Stateless** — immutable, rebuilt from parent input.
- **Stateful** — hold mutable state via a `State` object.

```dart
class Greeting extends StatelessWidget {
  const Greeting({super.key, required this.name});

  final String name;

  @override
  Widget build(BuildContext context) {
    return Text('Hello, $name!');
  }
}
```

## Layout

- `Row` / `Column` — arrange children horizontally/vertically.
- `Expanded` / `Flexible` — control how children share space.
- `Stack` — overlay widgets on top of each other.

## State Management

- `setState` — local widget state.
- `Provider` / `Riverpod` — shared app state.
