---
sidebar_position: 2
---

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

```tsx
import { useObservable, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject, of, switchMap } from 'rxjs';

const TODOS = [
  { id: 1, title: 'Buy groceries' },
  ...
  { id: 10, title: 'Write react DI library' },
];

function getTodos(search: string) {
  return of(TODOS.filter((todo) => todo.title.includes(search)));
}

const search$ = new BehaviorSubject<string>('');

const filteredTodos$ = search$.pipe(
  switchMap((search) => getTodos(search)),
);

export const UseObservableStateDemo = () => {
  return <>
    <SearchInput />

    <TodoList />
  </>
};

const SearchInput = () => {
  const [search, setSearch] = useObservableState(search$);

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
};

const TodoList = () => {
  const todos = useObservable(filteredTodos$, []);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};
```

import { UseObservableStateDemo } from '@site/docs-src/components/demos/observable-state-demo';

<UseObservableStateDemo />
