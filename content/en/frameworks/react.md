---
title: React
description: Practical reference for components, props, hooks, state, event handling, and patterns in React.
tags:
  - web
  - ui
  - javascript
  - typescript
---

## Components and Props

```jsx
// Defining a component with destructured props & default values
function UserCard({ name, role = 'Member', children }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{role}</p>
      {children}
    </div>
  );
}

// Using the component
export default function App() {
  return (
    <UserCard name="Ada Lovelace" role="Admin">
      <p>Logged in</p>
    </UserCard>
  );
}
```

- Components must start with a capital letter and return JSX.
- `props` are read-only inputs passed from parent to child.
- `children` represents nested content passed inside the component tags.

## JSX Syntax Basics

```jsx
const title = 'React Cheat Sheet';
const isOnline = true;
const customStyle = { color: 'blue', fontSize: '14px' };

return (
  <>
    {/* Expression embedding */}
    <h1 style={customStyle}>{title}</h1>

    {/* Class names and HTML attributes use camelCase */}
    <div className="container" tabIndex={0}>
      <label htmlFor="search-input">Search:</label>
      <input id="search-input" disabled={!isOnline} />
    </div>
  </>
);
```

- Use curly braces `{}` to embed any JavaScript expression.
- Wrap adjacent elements in fragments (`<>...</>`) to return a single root element without adding extra DOM nodes.
- Attribute names use camelCase (e.g. `className`, `htmlFor`, `tabIndex`, `onClick`).

## State with useState

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'Ada', age: 36 });

  // Update primitive state
  const increment = () => {
    // Use functional updater when next state depends on previous state
    setCount((prev) => prev + 1);
  };

  // Update object state immutably
  const updateAge = () => {
    setUser((prev) => ({ ...prev, age: prev.age + 1 }));
  };

  // Update array state immutably
  const [items, setItems] = useState(['a', 'b']);
  const addItem = (item) => setItems((prev) => [...prev, item]);
  const removeItem = (target) => setItems((prev) => prev.filter((i) => i !== target));

  return <button onClick={increment}>Count: {count}</button>;
}
```

- Calling the state updater triggers a re-render.
- Never mutate state directly (`user.age = 37`); always create a new copy.

## Side Effects with useEffect

```jsx
import { useState, useEffect } from 'react';

function Timer({ intervalMs }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, intervalMs);

    // Cleanup function runs on unmount or before effect re-runs
    return () => clearInterval(timerId);
  }, [intervalMs]); // Re-runs only when intervalMs changes

  return <p>Elapsed: {seconds}s</p>;
}
```

- `useEffect(fn)` — runs after **every** render.
- `useEffect(fn, [])` — runs once on **mount** (initial render).
- `useEffect(fn, [a, b])` — runs on mount and whenever `a` or `b` changes.
- Return a cleanup function to unsubscribe, clear timers, or abort fetch requests.

## Event Handling

```jsx
function Form() {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default browser form submission
    console.log('Submitted query:', query);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation(); // Stop event bubbling
    console.log('Delete item:', id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={handleChange} />
      <button type="submit">Search</button>
      <button type="button" onClick={(e) => handleDelete(42, e)}>
        Delete
      </button>
    </form>
  );
}
```

- Pass event handlers as function references (`onClick={handleClick}`), not calls (`onClick={handleClick()}`).
- Wrap in an arrow function to pass custom arguments: `onClick={() => handleDelete(id)}`.

## Conditional Rendering

```jsx
function Dashboard({ user, isLoading, error }) {
  // 1. Early return
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* 2. Ternary operator (if-else) */}
      {user ? <h2>Welcome, {user.name}!</h2> : <p>Please sign in.</p>}

      {/* 3. Logical AND (render only when truthy) */}
      {user?.isAdmin && <button>Admin Panel</button>}
    </div>
  );
}
```

- Guard against rendering `0` with `&&` (e.g. `count > 0 && <Badge />` instead of `count && <Badge />`).

## Lists and Keys

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong> — {user.email}
        </li>
      ))}
    </ul>
  );
}
```

- Always provide a stable, unique `key` prop on the top-level element returned by `.map()`.
- Use unique IDs (like database IDs) for keys. Avoid using array indexes if items can be reordered, inserted, or deleted.

## Context API

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext('light');

// 2. Provide Context
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consume Context
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
    >
      Current theme: {theme}
    </button>
  );
}
```

- Context lets you pass data deeply through the component tree without prop drilling.

## Common Hooks

```jsx
import { useRef, useMemo, useCallback } from 'react';

function HookExamples({ items, onSelect }) {
  // useRef: access DOM elements directly or persist mutable values across renders
  const inputRef = useRef(null);

  const focusInput = () => inputRef.current?.focus();

  // useMemo: cache the result of an expensive calculation
  const totalScore = useMemo(() => {
    return items.reduce((acc, item) => acc + item.score, 0);
  }, [items]);

  // useCallback: cache a function definition between renders
  const handleClick = useCallback(
    (id) => {
      onSelect(id);
    },
    [onSelect]
  );

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
      <button onClick={() => handleClick(42)}>Select</button>
      <p>Total Score: {totalScore}</p>
    </div>
  );
}
```

- `useRef` — stores DOM node references or mutable values that survive re-renders without triggering a new render.
- `useMemo` — memoizes computed values until dependencies change.
- `useCallback` — memoizes function instances passed to optimized child components.

## Custom Hooks

```jsx
import { useState, useEffect } from 'react';

// Custom hook to track window size (with SSR guard)
function useWindowSize() {
  const [size, setSize] = useState(() =>
    typeof window !== 'undefined'
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 0, height: 0 }
  );

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Usage in a component
function ResponsiveView() {
  const { width } = useWindowSize();
  return <p>Window width: {width}px ({width > 768 ? 'Desktop' : 'Mobile'})</p>;
}
```

- Custom hook names must start with `use` to allow React to enforce Rules of Hooks.
- Used to extract and share stateful logic across multiple components.

## References

- [React Documentation](https://react.dev)
- [React Hooks Reference](https://react.dev/reference/react/hooks)
- [React Quick Start](https://react.dev/learn)
