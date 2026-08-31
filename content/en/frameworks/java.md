---
title: Java
description: Core Java syntax for variables, classes, collections, and modern features.
---

## Variables

```java
final String name = "Ada"; // immutable reference
int age = 25;
var message = "Hello";     // type inferred (Java 10+)
```

## Classes

```java
public class User {
    private final String name;

    public User(String name) {
        this.name = name;
    }

    public void greet() {
        System.out.println("Hello, " + name);
    }
}
```

## Collections

```java
List<String> names = List.of("Ada", "Grace");

List<Integer> result = numbers.stream()
    .filter(n -> n > 0)
    .map(n -> n * 2)
    .toList();
```

## Modern Java

```java
record User(String name, int age) {}

String status = switch (code) {
    case 200 -> "OK";
    default -> "Unknown";
};
```

## Version Management

- Prefer LTS versions such as Java 17, 21, or 25.
- Use [SDKMAN!](https://sdkman.io/) to manage multiple JDK versions.
- Configure Java toolchains in Gradle or Maven.
- Prefer `./gradlew` and `./mvnw` over globally installed build tools.

```bash
sdk install java 21-tem
sdk use java 21-tem
java --version
```

## References

- [Java Documentation](https://docs.oracle.com/en/java/)
- [Dev.java](https://dev.java/)
- [SDKMAN!](https://sdkman.io/)