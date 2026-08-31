---
title: Python
description: Practical Python syntax for data types, functions, classes, and everyday tooling.
---

## Variables and Data Types

```python
name = "Ada"           # str
age = 36               # int
height = 1.72          # float
is_active = True       # bool
tags = ["python", "api"]
profile = {"role": "dev", "remote": True}
```

## Functions

```python
def greet(name: str, loud: bool = False) -> str:
    message = f"Hello, {name}"
    return message.upper() if loud else message


def add(*numbers: int) -> int:
    return sum(numbers)
```

## List and Dict Comprehensions

```python
numbers = [1, 2, 3, 4, 5]
evens_squared = [n**2 for n in numbers if n % 2 == 0]

users = [{"name": "Ada"}, {"name": "Linus"}]
indexed_names = {index: user["name"] for index, user in enumerate(users, start=1)}
```

## Classes

```python
class User:
    def __init__(self, name: str, email: str) -> None:
        self.name = name
        self.email = email

    def greet(self) -> str:
        return f"Hi, I'm {self.name}"
```

## Error Handling (`try`/`except`)

```python
def parse_port(value: str) -> int:
    try:
        port = int(value)
        if not (1 <= port <= 65535):
            raise ValueError("Port out of range")
        return port
    except ValueError as error:
        raise ValueError("Invalid port") from error
```

## Common Built-in Functions

```python
names = ["ada", "linus", "grace"]

count = len(names)
sorted_names = sorted(names)
any_short = any(len(name) < 4 for name in names)
all_lowercase = all(name.islower() for name in names)
```

## Virtual Environments Basics

```bash
python -m venv .venv
source .venv/bin/activate      # macOS/Linux
.venv\Scripts\activate         # Windows PowerShell
python -m pip install requests
python -m pip freeze > requirements.txt
```

## References

- [Python Documentation](https://docs.python.org/3/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
- [venv — Creation of virtual environments](https://docs.python.org/3/library/venv.html)
