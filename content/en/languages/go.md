---
title: Go
description: Core Go syntax for variables, structs, interfaces, goroutines, and error handling.
tags:
  - backend
  - concurrency
---

## Variables and Data Types

```go
var name string = "Ada"
age := 36 // short declaration, type inferred

const Pi = 3.14159

var (
	isActive bool
	count    int
	price    float64
)

// Zero values: 0, "", false, nil — every variable is initialized.
var n int // 0
```

## Structs

```go
import "fmt"

type User struct {
	Name string
	Age  int
}

u := User{Name: "Ada", Age: 36}
fmt.Println(u.Name)

// Methods attach to a type via a receiver.
func (u User) Greet() string {
	return "Hello, " + u.Name
}

// Pointer receiver — mutates the original value.
func (u *User) Birthday() {
	u.Age++
}
```

## Interfaces

```go
import "fmt"

type Speaker interface {
	Speak() string
}

type Dog struct{}

func (d Dog) Speak() string { return "Woof" }

// Any type implementing Speak() satisfies Speaker — no explicit "implements".
var s Speaker = Dog{}
fmt.Println(s.Speak())

// The empty interface accepts any type.
func describe(v any) {
	fmt.Printf("%v (%T)\n", v, v)
}
```

## Goroutines and Channels

```go
import (
	"fmt"
	"sync"
)

func worker(id int, ch chan<- string) {
	ch <- fmt.Sprintf("worker %d done", id)
}

func main() {
	ch := make(chan string)

	go worker(1, ch) // starts concurrently
	go worker(2, ch)

	fmt.Println(<-ch) // receive — blocks until a value arrives
	fmt.Println(<-ch)

	// WaitGroup to wait for multiple goroutines
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		// work
	}()
	wg.Wait()
}
```

- Channels are typed pipes for communicating between goroutines.
- `chan<-` (send-only) and `<-chan` (receive-only) document intent in
  function signatures.

## Error Handling

```go
import (
	"errors"
	"fmt"
	"log"
	"os"
)

func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}

result, err := divide(10, 0)
if err != nil {
	log.Fatal(err)
}

// Wrapping errors with context
if err != nil {
	return fmt.Errorf("divide failed: %w", err)
}

// defer runs when the surrounding function returns
func readFile(path string) error {
	f, err := os.Open(path)
	if err != nil {
		return err
	}
	defer f.Close()
	// ...
	return nil
}
```

- Go has no exceptions — functions return an `error` as their last value,
  checked explicitly with `if err != nil`.

## Slices and Maps

```go
import "fmt"

nums := []int{1, 2, 3}
nums = append(nums, 4)
sub := nums[1:3] // [2, 3]

m := map[string]int{"a": 1, "b": 2}
m["c"] = 3
value, ok := m["z"] // ok is false if the key doesn't exist

for key, val := range m {
	fmt.Println(key, val)
}
```

## Packages and Modules

```bash
go mod init example.com/myapp   # create a new module
go get github.com/some/package   # add a dependency
go mod tidy                        # sync go.mod with actual imports
go run main.go                       # run a program
go build                               # compile a binary
go test ./...                            # run tests in all packages
```

- A package is a directory of `.go` files sharing a `package` name.
- `import "example.com/myapp/utils"` imports another package in the
  module.

## References

- [The Go Programming Language Specification](https://go.dev/ref/spec)
- [A Tour of Go](https://go.dev/tour/)
- [Effective Go](https://go.dev/doc/effective_go)
