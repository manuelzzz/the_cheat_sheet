---
title: Ruby
description: Core Ruby syntax for variables, collections, methods, classes, blocks, and Enumerable.
tags:
  - backend
  - web
  - scripting
---

## Variables and Types

```ruby
name = "Ada"          # string
age = 36              # integer
height = 1.72         # float
active = true         # true/false (Boolean)

tags = ["ruby", "web"]              # array
profile = { "role" => "dev", "years" => 5 }   # hash

# String interpolation
message = "Hello, #{name}!"
```

- Everything in Ruby is an object; variables are dynamically typed.
- Local variables start with a lowercase letter or `_`.

## Strings and Symbols

```ruby
s = "hello"
s.upcase!      # mutates in place -> "HELLO"
s.empty?       # false

interp = "value: #{42}"

sym = :status            # symbol (identity-based, reused)
hash = { name: "Ada" }   # symbol-key syntax -> { :name => "Ada" }
hash[:name]              # "Ada"
```

- Symbols (`:name`) are immutable, interned identifiers often used as hash keys.
- Methods ending in `?` conventionally return a boolean; methods ending in `!` mutate the receiver.

## Arrays and Hashes

```ruby
nums = [1, 2, 3, 4]

nums << 5          # append -> [1, 2, 3, 4, 5]
nums[0]            # 1
nums.first         # 1
nums.last          # 5
nums.length        # 5

hash = { a: 1, b: 2 }
hash[:c] = 3       # add a key

nums.map { |n| n * 2 }      # [2, 4, 6, 8, 10]
nums.select { |n| n > 2 }   # [3, 4, 5]
nums.reduce(0) { |sum, n| sum + n }   # 15
```

- `<<` appends to an array.
- `map`, `select`, and `reduce` (via `Enumerable`) transform and select data.

## Control Flow

```ruby
n = 10

if n > 0
  # positive
elsif n < 0
  # negative
else
  # zero
end

case n
when 1
  puts "one"
when 2, 3
  puts "two or three"
else
  puts "other"
end

(1..5).each { |i| puts i }    # 1..5 inclusive
(1...5).each { |i| puts i }   # 1..4 exclusive

i = 0
while i < 5
  i += 1
end
```

- `if`, `case`, and loops end with `end`.
- `.each` iterates over a range or collection.

## Methods

```ruby
def add(a, b)
  a + b
end

# The last expression is the return value
def greet(name, punctuation = "!")
  "Hello, #{name}#{punctuation}"
end

puts add(2, 3)             # 5
puts greet("Ada")          # "Hello, Ada!"
puts greet("Ada", "?")     # "Hello, Ada?"

# Splat captures extra arguments
def sum(*nums)
  nums.sum
end

puts sum(1, 2, 3)          # 6
```

- Methods can omit `return`; the last expression is returned.
- Default parameter values and splat (`*`) arguments are supported.

## Blocks

```ruby
[1, 2, 3].each do |num|
  puts num
end

# do...end vs { }
[1, 2, 3].map { |num| num * 2 }

# Blocks with yield
def twice
  yield
  yield
end

twice { puts "hi" }
```

- A block is a chunk of code passed to a method.
- `yield` invokes the block inside the method.
- Use `do...end` for multi-line, `{ }` for single-line.

## Classes and Modules

```ruby
class User
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def greet
    "Hi, I'm #{@name}"
  end
end

ada = User.new("Ada", 36)
puts ada.greet      # "Hi, I'm Ada"
ada.name = "Grace"  # setter (from attr_accessor)
```

```ruby
module Greeter
  def hello
    "hello"
  end
end

class Person
  include Greeter
end

puts Person.new.hello   # "hello"
```

- `@name` is an instance variable.
- `attr_accessor` creates getter and setter methods.
- `include` mixes a module's methods into a class.

## Exceptions

```ruby
begin
  value = Integer("abc")
rescue ArgumentError => e
  puts "invalid: #{e.message}"
rescue => e
  puts "other error: #{e.message}"
else
  puts "no error"
ensure
  puts "always runs"
end
```

- `rescue` catches exceptions; you can bind the exception with `=>`.
- `else` runs when no exception occurred; `ensure` always runs.
- Raise with `raise SomeError, "message"`.

## Enumerable

```ruby
nums = [1, 8, 3, 6, 9]

nums.map { |n| n * 2 }          # [2, 16, 6, 12, 18]
nums.select(&:even?)            # [8, 6]
nums.sum                        # 27
nums.min                        # 1
nums.max                        # 9
nums.sort                       # [1, 3, 6, 8, 9]
nums.include?(3)                # true
nums.take(2)                    # [1, 8]

hash = { a: 1, b: 2 }
hash.map { |k, v| "#{k}=#{v}" }   # ["a=1", "b=2"]
```

- `Enumerable` provides iteration, selection, and reduction methods.
- `&:even?` is shorthand for `{ |x| x.even? }`.

## Idiomatic Modern Patterns

```ruby
# Safe navigation
user = nil
name = user&.name    # nil if user is nil

# Symbol-to-proc
["a", "b"].map(&:upcase)   # ["A", "B"]

# Multiple assignment
a, b = [1, 2]

# String formatting
sprintf("%0.2f", 3)   # "3.00"

# `each_with_index`
[10, 20].each_with_index { |v, i| puts "#{i}: #{v}" }

# keyword arguments
def configure(cpu:, ram: 0)
  [cpu, ram]
end

configure(cpu: 2)   # [2, 0]
```

- `&.` is safe navigation; `&:method` is a Symbol-to-Proc shorthand.
- Multiple assignment lets you destructure an array.
- Keyword arguments improve clarity for named options.

## References

- [Ruby Documentation](https://ruby-doc.org/)
- [Ruby Language](https://docs.ruby-lang.org/en/)
- [Ruby API Reference](https://rubyapi.org/)