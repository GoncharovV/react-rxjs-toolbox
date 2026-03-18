---
sidebar_position: 1
---

import { ObservableDemo } from '@site/docs-src/components/demos/observable-demo';

# useObservable

Subscribes to an RxJS `Observable` and returns its latest emitted value as React state.

The component re-renders whenever the observable emits a new value.

## Signature

```ts
function useObservable<T>(observable: Observable<T>): T | undefined;

function useObservable<T>(
  observable: Observable<T>,
  initial: T | (() => T),
): T;
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `observable` | `Observable<T>` | Any RxJS observable to subscribe to. The subscription is managed automatically and cleaned up on unmount. |
| `initial` | `T \| (() => T)` | *(optional)* A value or factory function used before the observable emits for the first time. When omitted, the return type includes `undefined`. |

## Returns

`T | undefined` – The latest value emitted by the observable.

If `initial` is provided, the return type narrows to `T` (never `undefined`).

## Behavior

- **Automatic subscription** – subscribes when the component mounts and unsubscribes on unmount.
- **Synchronous initial emit** – if the observable emits synchronously on subscribe (e.g. `BehaviorSubject`, `of()`), the value is captured immediately without an extra render.
- **Observable identity** – if the `observable` reference changes, the hook resubscribes to the new one.

## Examples

### Basic: reading an interval

```tsx
import { useObservable } from 'react-rxjs-toolbox';
import { interval } from 'rxjs';

const ticker$ = interval(1000);

const Ticker = () => {
  const value = useObservable(ticker$);
  // value: number | undefined

  return <p>Ticks: {value ?? '—'}</p>;
};
```

### With an initial value

Pass a default so the return type is always defined:

```tsx
import { useObservable } from 'react-rxjs-toolbox';
import { Subject } from 'rxjs';

const messages$ = new Subject<string>();

const MessageDisplay = () => {
  const message = useObservable(messages$, 'not emitted yet');
  // message: string (never undefined)

  return <p>{message}</p>;
};
```

### With stateful observable

Use with `BehaviorSubject` and pass its value as an initial to ensure component will receive defined value

```tsx
import { useObservable } from 'react-rxjs-toolbox';
import { BehaviorSubject } from 'rxjs';

const search$ = new BehaviorSubject<string>('');

const Component = () => {
  const search = useObservable(search$, search$.value);

  return <p>{search}</p>;
};
```

## Live demo

```tsx
import { useObservable } from 'react-rxjs-toolbox';
import { BehaviorSubject } from 'rxjs';


const count$ = new BehaviorSubject<number>(0);

const increment = () => {
  count$.next(count$.value + 1);
};

export const ObservableDemo = () => {
  const count = useObservable(count$);

  return (
    <>
      <button onClick={increment}>Increment</button>

      <p>Count: {count}</p>`
    <>
  );
};
```

<ObservableDemo />
