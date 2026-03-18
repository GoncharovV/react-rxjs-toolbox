---
sidebar_position: 2
---

import { UseObservableStateDemo } from '@site/docs-src/components/demos/UseObservableStateDemo';

# useObservableState

A `useState`-like hook for `BehaviorSubject`. Returns the current value and a setter function.

The component re-renders whenever the subject emits a new value.

## Signature

```ts
function useObservableState<T>(
  subject: BehaviorSubject<T>,
): [T, ObservableStateSetter<T>];

type ObservableStateSetter<T> = Dispatch<SetStateAction<T>>;
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `subject` | `BehaviorSubject<T>` | A RxJS `BehaviorSubject` to use as state source. |

## Returns

`[T, ObservableStateSetter<T>]` — a tuple, just like `useState`:

- `value` — the current value of the subject.
- `setValue` — a setter that accepts a new value or an updater function `(current) => next`. Calls `subject.next()` under the hood.

## Example

```tsx
import { useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject } from 'rxjs';

const search$ = new BehaviorSubject<string>('');

const SearchInput = () => {
  const [search, setSearch] = useObservableState(search$);

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
```

The setter also accepts an updater function:

```tsx
setSearch((current) => current.trim());
```

## Live demo

<UseObservableStateDemo />
