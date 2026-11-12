---
title: Svelte
description: Practical reference for components, runes, reactivity, event handling, stores, lifecycle, and directives in Svelte.
tags:
  - web
  - ui
  - javascript
  - typescript
---

## Components and Props

### Svelte 5 (Runes)

```svelte
<script>
  // Declare props with $props() and provide default values
  let { name, role = 'Member', children } = $props();
</script>

<div class="user-card">
  <h3>{name}</h3>
  <p>{role}</p>
  <!-- Render nested content -->
  {@render children?.()}
</div>
```

### Svelte 4 (Legacy)

```svelte
<script>
  export let name;
  export let role = 'Member';
</script>

<div class="user-card">
  <h3>{name}</h3>
  <p>{role}</p>
  <slot />
</div>
```

- In Svelte 5, use `$props()` to destructure props. Nested content is rendered with `{@render children?.()}`.
- In Svelte 4, props are declared with `export let`, and nested content is passed via `<slot />`.

### Rest Props and Two-Way Binding

```svelte
<!-- TextField.svelte -->
<script>
  // $bindable lets the parent use bind:value on this prop
  let { value = $bindable(''), ...rest } = $props();
</script>

<!-- Spread remaining props onto the element -->
<input bind:value {...rest} />
```

```svelte
<!-- Parent.svelte -->
<script>
  import TextField from './TextField.svelte';

  let name = $state('');
</script>

<TextField bind:value={name} placeholder="Your name" />
<p>Hello, {name}!</p>
```

- Props are meant to flow down. Use `$bindable()` only when the child needs to write back to the parent.

### Snippets

```svelte
<script>
  let items = $state([{ name: 'Apple' }, { name: 'Banana' }]);
</script>

<!-- Reusable chunk of markup, local to this component -->
{#snippet row(item)}
  <li>{item.name}</li>
{/snippet}

<ul>
  {#each items as item}
    {@render row(item)}
  {/each}
</ul>
```

- Snippets replace named slots in Svelte 5 and can be passed to components as props.

## Reactivity

### State with $state (Svelte 5)

```svelte
<script>
  let count = $state(0);
  let user = $state({ name: 'Ada', age: 36 });
  let items = $state(['apple', 'banana']);

  function increment() {
    count += 1;
  }

  function updateAge() {
    // Deep reactivity: mutating nested properties triggers updates
    user.age += 1;
  }

  function addItem(item) {
    // Array mutations trigger updates directly
    items.push(item);
  }
</script>

<button onclick={increment}>Count: {count}</button>
<button onclick={updateAge}>Age: {user.age}</button>
```

### Derived Values with $derived (Svelte 5)

```svelte
<script>
  let count = $state(2);
  let doubled = $derived(count * 2);

  let items = $state([{ price: 10 }, { price: 20 }]);

  // Use $derived.by for complex calculations
  let total = $derived.by(() => {
    return items.reduce((acc, curr) => acc + curr.price, 0);
  });
</script>

<p>{count} doubled is {doubled}</p>
<p>Total: {total}</p>
```

### Side Effects with $effect (Svelte 5)

```svelte
<script>
  let count = $state(0);

  $effect(() => {
    console.log(`Count changed to: ${count}`);

    // Optional cleanup function runs before re-running or on unmount
    return () => {
      console.log('Cleaning up effect');
    };
  });
</script>
```

- `$effect` runs in the browser after the DOM updates and re-runs when the state it reads changes.
- Do not use `$effect` to compute values. Use `$derived` instead.

### Svelte 4 Reactivity (Legacy)

```svelte
<script>
  let count = 0;

  // Reactive declaration (re-calculated when count changes)
  $: doubled = count * 2;

  // Reactive statement / side effect
  $: console.log('Count is:', count);

  function increment() {
    count += 1; // Reassignment triggers reactivity in Svelte 4
  }
</script>
```

## Template Syntax and Logic Blocks

### Conditionals

```svelte
{#if status === 'loading'}
  <p>Loading...</p>
{:else if status === 'error'}
  <p>An error occurred.</p>
{:else}
  <p>Data loaded successfully.</p>
{/if}
```

### Loops with Each

```svelte
<script>
  let users = $state([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
</script>

<ul>
  <!-- (user.id) is the unique key -->
  {#each users as user, index (user.id)}
    <li>{index + 1}: {user.name}</li>
  {:else}
    <li>No users found.</li>
  {/each}
</ul>
```

### Promises with Await

```svelte
{#await fetchUserData()}
  <p>Fetching user data...</p>
{:then user}
  <p>Welcome, {user.name}!</p>
{:catch error}
  <p class="error">Failed to load: {error.message}</p>
{/await}
```

### Key Block

```svelte
<!-- Re-creates the component whenever user.id changes -->
{#key user.id}
  <UserProfile {user} />
{/key}
```

### Const and HTML Tags

```svelte
{#each boxes as box}
  <!-- Local constant scoped to this block -->
  {@const area = box.width * box.height}
  <p>{box.width} x {box.height} = {area}</p>
{/each}

<!-- Renders raw HTML. Never use it with untrusted content -->
{@html trustedHtml}
```

## Event Handling

### DOM Events

```svelte
<script>
  function handleClick(event) {
    console.log('Button clicked:', event);
  }

  function handleSelect(id, event) {
    event.stopPropagation();
    console.log('Selected:', id);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted');
  }
</script>

<!-- Svelte 5 event attributes -->
<button onclick={handleClick}>Click me</button>
<button onclick={(e) => handleSelect(42, e)}>Select</button>
<form onsubmit={handleSubmit}>...</form>

<!-- Svelte 4 event directives -->
<!-- <button on:click={handleClick}>Click me</button> -->
<!-- <button on:click|preventDefault={handleSubmit}>Submit</button> -->
```

- Svelte 5 has no event modifiers like `|preventDefault`. Call `event.preventDefault()` inside the handler.

### Component Events

```svelte
<!-- Svelte 5: Pass callback functions as props -->
<!-- Child.svelte -->
<script>
  let { onsave } = $props();
</script>
<button onclick={() => onsave('Saved payload')}>Save</button>

<!-- Parent.svelte -->
<Child onsave={(data) => console.log(data)} />
```

```svelte
<!-- Svelte 4 (Legacy): createEventDispatcher -->
<!-- Child.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>
<button on:click={() => dispatch('save', 'Saved payload')}>Save</button>

<!-- Parent.svelte -->
<Child on:save={(e) => console.log(e.detail)} />
```

## Form Bindings

```svelte
<script>
  let text = $state('');
  let checked = $state(false);
  let selected = $state('option1');
  let picked = $state('small');
  let flavors = $state(['vanilla']);
  let number = $state(10);
</script>

<!-- Text & number inputs -->
<input bind:value={text} placeholder="Type here" />
<input type="number" bind:value={number} />

<!-- Single checkbox -->
<input type="checkbox" bind:checked />

<!-- Select dropdown -->
<select bind:value={selected}>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>

<!-- Radio buttons grouped into a single value -->
<label><input type="radio" bind:group={picked} value="small" /> Small</label>
<label><input type="radio" bind:group={picked} value="large" /> Large</label>

<!-- Multiple checkboxes grouped into an array -->
<label><input type="checkbox" bind:group={flavors} value="vanilla" /> Vanilla</label>
<label><input type="checkbox" bind:group={flavors} value="chocolate" /> Chocolate</label>
```

## Element Directives

### Classes and Styles

```svelte
<script>
  let isActive = $state(true);
  let themeColor = $state('blue');
</script>

<!-- Class toggle directive -->
<div class:active={isActive} class:disabled={!isActive}>Status</div>

<!-- Style directive -->
<p style:color={themeColor} style:font-weight="bold">Styled text</p>
```

### DOM Reference (bind:this)

```svelte
<script>
  let inputElement = $state();

  function focusInput() {
    inputElement.focus();
  }
</script>

<input bind:this={inputElement} />
<button onclick={focusInput}>Focus</button>
```

### Actions (use:action)

```svelte
<script>
  // An action runs when element is mounted into DOM
  function clickOutside(node, callback) {
    const handleClick = (e) => {
      if (!node.contains(e.target)) callback();
    };

    document.addEventListener('click', handleClick, true);

    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  let isOpen = $state(true);
</script>

{#if isOpen}
  <div use:clickOutside={() => (isOpen = false)} class="modal">
    Modal content
  </div>
{/if}
```

- Svelte 5.29+ also offers `{@attach}` as a more flexible alternative to actions.

### Transitions

```svelte
<script>
  import { fade, fly } from 'svelte/transition';

  let visible = $state(true);
</script>

<button onclick={() => (visible = !visible)}>Toggle</button>

{#if visible}
  <!-- Plays when the element enters and leaves the DOM -->
  <p transition:fade>Fades in and out</p>

  <!-- Separate in and out transitions with parameters -->
  <p in:fly={{ y: 20, duration: 300 }} out:fade>Flies in, fades out</p>
{/if}
```

## Stores

Stores provide reactive state containers usable across components or pure JavaScript modules.

### Creating Stores

```javascript
import { writable, readable, derived } from 'svelte/store';

// Writable store: can be updated and subscribed to
export const count = writable(0);
count.set(5);
count.update((n) => n + 1);

// Readable store: cannot be set from outside
export const time = readable(new Date(), (set) => {
  const interval = setInterval(() => set(new Date()), 1000);
  return () => clearInterval(interval);
});

// Derived store: depends on one or more stores
export const doubled = derived(count, ($count) => $count * 2);
```

### Auto-Subscription with $

```svelte
<script>
  import { count, doubled } from './stores.js';
</script>

<!-- Prefix store name with $ to subscribe and get its current value -->
<p>Count: {$count}</p>
<p>Doubled: {$doubled}</p>

<button onclick={() => count.update((n) => n + 1)}>Increment</button>
<button onclick={() => ($count = 0)}>Reset</button>
```

### Shared State with Runes (Svelte 5)

```javascript
// counter.svelte.js
export const counter = $state({ value: 0 });
```

```svelte
<script>
  import { counter } from './counter.svelte.js';
</script>

<button onclick={() => counter.value++}>Clicks: {counter.value}</button>
```

- Stores are still fully supported. In Svelte 5, `$state` in a `.svelte.js` file is often simpler for shared state.
- Export an object and mutate its properties. A module cannot reassign an exported `$state` variable.

## Lifecycle Functions

```svelte
<script>
  import { onMount, onDestroy, tick } from 'svelte';

  let ticks = $state(0);

  onMount(() => {
    // Runs once after component is rendered in the DOM
    const timer = setInterval(() => ticks++, 1000);

    // Optional return function runs when the component is destroyed
    return () => clearInterval(timer);
  });

  onDestroy(() => {
    // Runs on unmount (and is the only lifecycle hook that runs during SSR)
    console.log('Component destroyed');
  });

  async function reset() {
    ticks = 0;
    // Waits until pending state updates are applied to the DOM
    await tick();
  }
</script>

<button onclick={reset}>Ticks: {ticks}</button>
```

- `onMount` runs only in the browser (client-side), making it safe for DOM manipulations and API requests.
- `tick()` returns a Promise that resolves after the DOM has been updated with pending state changes.
- `$effect` is the reactive alternative for side effects, while `onMount` remains valid for one-time setup.

## Context API

Share data through the component tree without prop drilling.

```svelte
<!-- Parent.svelte -->
<script>
  import { setContext } from 'svelte';

  let { children } = $props();

  setContext('theme', { mode: 'dark', color: '#ff3e00' });
</script>

{@render children?.()}
```

```svelte
<!-- GrandChild.svelte -->
<script>
  import { getContext } from 'svelte';

  const theme = getContext('theme');
</script>

<p>Theme: {theme.mode}</p>
```

- `setContext` and `getContext` must be called during component initialization, not inside event handlers.
- Pass an object created with `$state` if the context value needs to be reactive.

## References

- [Svelte Documentation](https://svelte.dev/docs)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/runes)
- [Svelte Tutorial](https://svelte.dev/tutorial)