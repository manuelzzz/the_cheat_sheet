---
title: Flutter
description: Referência rápida de widgets, layout e estado no Flutter.
tags:
  - mobile
  - dart
  - cross-platform
---

## Widgets

No Flutter, tudo é um widget. Os widgets podem ser:

- **Stateless** — imutáveis, reconstruídos a partir do input do pai.
- **Stateful** — mantêm estado mutável através de um objeto `State`.

```dart
class Saudacao extends StatelessWidget {
  const Saudacao({super.key, required this.nome});

  final String nome;

  @override
  Widget build(BuildContext context) {
    return Text('Olá, $nome!');
  }
}
```

## Layout

- `Row` / `Column` — organiza filhos na horizontal/vertical.
- `Expanded` / `Flexible` — controla como os filhos dividem o espaço.
- `Stack` — sobrepõe widgets uns sobre os outros.

## Gerenciamento de Estado

- `setState` — estado local do widget.
- `Provider` / `Riverpod` — estado compartilhado da aplicação.

## References

- [Documentação do Flutter](https://docs.flutter.dev)
- [Catálogo de Widgets do Flutter](https://docs.flutter.dev/ui/widgets)
