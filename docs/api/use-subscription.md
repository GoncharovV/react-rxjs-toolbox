---
sidebar_position: 3
---

import { UseSubscriptionDemo } from '@site/docs-src/components/demos/UseSubscriptionDemo';

# useSubscription

Subscribes to an observable and delegates emissions to the given callback or observer. Does not cause re-renders.

Useful for side effects: logging, analytics, syncing external state, etc.

## Signature

```ts
function useSubscription<T>(
  observable: Observable<T>,
  observer: ((value: T) => void) | Partial<Observer<T>>,
): MutableRefObject<Subscription | null>;
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `observable` | `Observable<T>` | The observable to subscribe to. |
| `observer` | `((value: T) => void) \| Partial<Observer<T>>` | A callback for `next`, or an object with `next`, `error`, `complete` handlers. |

## Returns

`MutableRefObject<Subscription | null>` — a ref to the underlying RxJS `Subscription` for manual control if needed.

## Example

Short form — only `next`:

```tsx
useSubscription(clicks$, (value) => {
  console.log('clicked:', value);
});
```

Full observer:

```tsx
useSubscription(data$, {
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log('done'),
});
```

## Live demo

<UseSubscriptionDemo />
